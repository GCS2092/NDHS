import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      fullName, 
      email, 
      phone, 
      destination, 
      travelDate, 
      visaType, 
      passportNumber,
      message 
    } = body;

    // Validation
    if (!fullName || !email || !phone || !destination || !travelDate || !visaType || !passportNumber) {
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

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'NDHS Visa <visa@ndhs.sn>',
      to: process.env.CONTACT_EMAIL || 'contact@ndhs.sn',
      subject: `[Demande Visa] ${fullName} - ${destination}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Nouvelle demande de visa</h2>
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Nom complet:</strong> ${fullName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Téléphone:</strong> ${phone}</p>
            <p><strong>Destination:</strong> ${destination}</p>
            <p><strong>Date de voyage:</strong> ${travelDate}</p>
            <p><strong>Type de visa:</strong> ${visaType}</p>
            <p><strong>Numéro de passeport:</strong> ${passportNumber}</p>
          </div>
          ${message ? `
          <div style="background: #fff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <h3 style="margin-top: 0;">Message additionnel:</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          ` : ''}
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Erreur lors de l\'envoi de la demande' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Demande de visa envoyée avec succès' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Visa API error:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
