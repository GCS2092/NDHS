import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, serviceType, origin, destination, weight, dimensions, pickupDate, specialRequirements, message } = body;

    if (!name || !email || !phone || !serviceType || !origin || !destination) {
      return NextResponse.json({ error: 'Tous les champs requis doivent être remplis' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Email invalide' }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ success: true, message: 'Demande reçue (email désactivé)' }, { status: 200 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: 'NDHS Logistique <logistique@ndhs.sn>',
      to: process.env.CONTACT_EMAIL || 'contact@ndhs.sn',
      subject: `[Devis Logistique] ${serviceType} - ${name}`,
      html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Nouvelle demande de devis logistique</h2>
        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Nom:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Téléphone:</strong> ${phone}</p>
          <p><strong>Type de service:</strong> ${serviceType}</p>
          <p><strong>Origine:</strong> ${origin}</p>
          <p><strong>Destination:</strong> ${destination}</p>
          ${weight ? `<p><strong>Poids:</strong> ${weight}</p>` : ''}
          ${dimensions ? `<p><strong>Dimensions:</strong> ${dimensions}</p>` : ''}
          ${pickupDate ? `<p><strong>Date de prise en charge:</strong> ${pickupDate}</p>` : ''}
          ${specialRequirements ? `<p><strong>Exigences spéciales:</strong> ${specialRequirements}</p>` : ''}
        </div>
        ${message ? `<div style="background: #fff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
          <h3 style="margin-top: 0;">Message additionnel:</h3>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>` : ''}
      </div>`,
    });

    if (error) {
      return NextResponse.json({ error: 'Erreur lors de l\'envoi de la demande' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Demande de devis logistique envoyée avec succès' }, { status: 200 });
  } catch (error) {
    console.error('Devis Logistique API error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}