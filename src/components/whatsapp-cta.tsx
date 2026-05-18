"use client"

import { MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'

interface WhatsAppCTAProps {
  whatsappNumber?: string;
}

export function WhatsAppCTA({ whatsappNumber = "+221771234567" }: WhatsAppCTAProps) {
  const handleClick = () => {
    const message = encodeURIComponent("Bonjour, je souhaite avoir plus d'informations sur vos services.")
    // Nettoyer le numéro pour ne garder que les chiffres
    const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanNumber}?text=${message}`, '_blank')
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <button
        onClick={handleClick}
        className="flex items-center gap-2 px-4 py-3 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition-all hover:scale-105 active:scale-95"
        aria-label="Contactez-nous sur WhatsApp"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="font-medium hidden sm:inline">WhatsApp</span>
      </button>
    </motion.div>
  )
}
