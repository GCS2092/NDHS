import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      name, 
      email, 
      phone, 
      service, 
      description, 
      budget,
      urgency 
    } = body;

    // Validation
    if (!name || !email || !phone || !service || !description) {
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
      from: 'NDHS Devis <devis@ndhs.sn>',
      to: process.env.CONTACT_EMAIL || 'contact@ndhs.sn',
      subject: `[Demande Devis] ${service} - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Nouvelle demande de devis</h2>
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Nom:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Téléphone:</strong> ${phone}</p>
            <p><strong>Service:</strong> ${service}</p>
            ${budget ? `<p><strong>Budget estimé:</strong> ${budget}</p>` : ''}
            ${urgency ? `<p><strong>Urgence:</strong> ${urgency}</p>` : ''}
          </div>
          <div style="background: #fff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <h3 style="margin-top: 0;">Description du projet:</h3>
            <p style="white-space: pre-wrap;">${description}</p>
          </div>
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
      { success: true, message: 'Demande de devis envoyée avec succès' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Devis API error:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
