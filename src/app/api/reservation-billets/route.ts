import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { client } from '@/sanity/client';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      fullName, 
      email, 
      phone, 
      destination, 
      departureDate, 
      returnDate,
      passengers,
      flightClass,
      customRequest,
      budget,
      flexibility,
      isCustom = false
    } = body;

    // Validation
    if (!fullName || !email || !phone || !destination || !departureDate || !passengers) {
      return NextResponse.json(
        { error: 'Tous les champs requis doivent être remplis' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email invalide' },
        { status: 400 }
      );
    }

    // Save to Sanity
    try {
      const sanityDoc = {
        _type: 'reservationBillet',
        fullName,
        email,
        phone,
        destination,
        departureDate,
        returnDate,
        passengers: parseInt(passengers),
        flightClass: flightClass || 'economique',
        customRequest,
        budget: budget ? parseInt(budget.replace(/\D/g, '')) : undefined,
        flexibility,
        isCustom,
        status: 'pending',
      };

      const result = await client.create(sanityDoc);
      console.log('Reservation saved to Sanity:', result._id);
    } catch (sanityError) {
      console.error('Sanity error:', sanityError);
      // Continue with email even if Sanity fails
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'NDHS Billets <billets@ndhs.sn>',
      to: process.env.CONTACT_EMAIL || 'contact@ndhs.sn',
      subject: isCustom 
        ? `[Réservation Personnalisée] ${destination} - ${fullName}`
        : `[Réservation Billets] ${destination} - ${fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">
            ${isCustom ? 'Nouvelle réservation personnalisée' : 'Nouvelle réservation de billets d\'avion'}
          </h2>
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Nom complet:</strong> ${fullName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Téléphone:</strong> ${phone}</p>
            <p><strong>Destination:</strong> ${destination}</p>
            <p><strong>Date de départ:</strong> ${departureDate}</p>
            ${returnDate ? `<p><strong>Date de retour:</strong> ${returnDate}</p>` : ''}
            <p><strong>Nombre de passagers:</strong> ${passengers}</p>
            ${flightClass ? `<p><strong>Classe:</strong> ${flightClass}</p>` : ''}
            ${budget ? `<p><strong>Budget estimé:</strong> ${budget} FCFA</p>` : ''}
            ${flexibility ? `<p><strong>Flexibilité:</strong> ${flexibility}</p>` : ''}
          </div>
          ${customRequest ? `
          <div style="background: #fff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <h3 style="margin-top: 0;">Demande personnalisée:</h3>
            <p style="white-space: pre-wrap;">${customRequest}</p>
          </div>
          ` : ''}
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Erreur lors de l\'envoi de la réservation' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: isCustom ? 'Réservation personnalisée envoyée avec succès' : 'Réservation de billets envoyée avec succès' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Reservation Billets API error:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
