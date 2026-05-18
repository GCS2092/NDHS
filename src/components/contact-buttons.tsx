"use client"

import { Mail, MessageCircle } from 'lucide-react';

interface ContactButtonsProps {
  subject?: string;
  message?: string;
  email?: string;
  whatsappNumber?: string;
}

export function ContactButtons({ 
  subject = "Demande de contact", 
  message = "Bonjour, je souhaite avoir plus d'informations.",
  email = "contact@ndhs.sn",
  whatsappNumber = "+221771234567"
}: ContactButtonsProps) {
  const handleEmailClick = () => {
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    window.location.href = mailtoLink;
  };

  const handleWhatsAppClick = () => {
    // Nettoyer le numéro pour ne garder que les chiffres
    const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
    const whatsappLink = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 mt-6">
      <button
        onClick={handleEmailClick}
        className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors hover:scale-105 transition-transform"
      >
        <Mail className="w-5 h-5" />
        <span>Envoyer par Email</span>
      </button>
      <button
        onClick={handleWhatsAppClick}
        className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors hover:scale-105 transition-transform"
      >
        <MessageCircle className="w-5 h-5" />
        <span>Contacter sur WhatsApp</span>
      </button>
    </div>
  );
}
