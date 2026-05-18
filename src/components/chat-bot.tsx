"use client"

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Phone, Bot, User } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { getFAQ } from '@/sanity/client'

const SERVICES = [
  { name: "Véhicules", href: "/vehicules", description: "Vente et location de véhicules : voitures, camions et utilitaires" },
  { name: "Immobilier", href: "/immobilier", description: "Biens immobiliers à la vente et à la location" },
  { name: "Matériaux BTP", href: "/materiaux", description: "Vente de matériaux de construction (ciment, carreaux, fer, sable)" },
  { name: "Logistique", href: "/logistique", description: "Services de transport de marchandises et fret" },
  { name: "Billets d'avion", href: "/billets", description: "Réservation de billets d'avion vers différentes destinations" },
  { name: "Assistance Visa", href: "/visa", description: "Assistance dans les démarches de visa pour différents pays" },
  { name: "Groupage", href: "/groupage", description: "Services de groupage de colis vers différentes destinations" }
]

const CONTACT_PHONE = "+221 77 123 45 67"
const CONTACT_NAME = "Madame Niaye"

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{ role: 'user' | 'bot', content: string }[]>([
    { role: 'bot', content: "Bonjour ! Je suis l'assistant NDHS. Je peux vous renseigner sur nos services : véhicules, immobilier, matériaux BTP, logistique, billets d'avion, assistance visa et groupage. Comment puis-je vous aider ?" }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [faqData, setFaqData] = useState<any[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Fetch FAQ data from Sanity
    const fetchFAQ = async () => {
      try {
        const faq = await getFAQ()
        setFaqData(faq || [])
      } catch (error) {
        console.error('Error fetching FAQ:', error)
      }
    }
    fetchFAQ()
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const findAnswer = (query: string): string | null => {
    const lowerQuery = query.toLowerCase()

    // Check Sanity FAQ data first
    for (const faq of faqData) {
      const keywords = faq.question?.toLowerCase().split(' ') || []
      const answer = faq.reponse || ''
      
      // Check if query matches the question or contains keywords
      if (lowerQuery.includes(faq.question?.toLowerCase() || '') || 
          keywords.some((keyword: string) => lowerQuery.includes(keyword))) {
        return answer
      }
    }

    // Fallback to hardcoded responses
    const hardcodedFAQ: Record<string, { keywords: string[], answer: string }> = {
      "services": {
        keywords: ["services", "activités", "offre", "propos", "que faites", "que propose", "activité"],
        answer: `NDHS propose les services suivants :\n\n${SERVICES.map(s => `- ${s.name}: ${s.description}`).join('\n')}\n\nPour plus de détails, vous pouvez visiter nos pages correspondantes.`
      },
      "vehicule": {
        keywords: ["véhicule", "voiture", "camion", "utilitaire", "location", "vente", "kilométrage", "année"],
        answer: "Nous proposons la vente et la location de véhicules : voitures, camions et utilitaires. Vous pouvez consulter notre catalogue pour voir les véhicules disponibles avec leurs caractéristiques (kilométrage, année, etc.)."
      },
      "immobilier": {
        keywords: ["immobilier", "bien", "maison", "appartement", "vente", "location", "quartier", "surface"],
        answer: "Nous proposons des biens immobiliers à la vente et à la location. Vous pouvez trouver des appartements et maisons dans différents quartiers avec des surfaces variées."
      },
      "materiaux": {
        keywords: ["matériau", "btp", "ciment", "carreaux", "fer", "sable", "construction", "stock"],
        answer: "Nous vendons des matériaux de construction (BTP) : ciment, carreaux, fer, sable et autres. Contactez-nous pour connaître la disponibilité et les prix."
      },
      "logistique": {
        keywords: ["logistique", "transport", "fret", "marchandise", "livraison"],
        answer: "Nos services de logistique incluent le transport de marchandises et le fret. Nous pouvons organiser le transport selon vos besoins spécifiques."
      },
      "billet": {
        keywords: ["billet", "avion", "vol", "destination", "réservation"],
        answer: "Nous proposons des services de réservation de billets d'avion vers différentes destinations. Contactez-nous pour vos réservations."
      },
      "visa": {
        keywords: ["visa", "assistance", "formalité", "document", "pays", "délai"],
        answer: "Nous assistons dans les démarches de visa pour différents pays. Nous vous aidons à préparer les documents nécessaires et gérons les formalités."
      },
      "groupage": {
        keywords: ["groupage", "colis", "envoi", "ville", "pays", "délai"],
        answer: "Nous proposons des services de groupage de colis vers différentes villes et pays. Le délai de livraison varie selon la destination."
      },
      "contact": {
        keywords: ["contact", "téléphone", "email", "whatsapp", "adresse", "joindre"],
        answer: "Vous pouvez nous contacter par téléphone, email ou WhatsApp. Nos coordonnées sont disponibles sur la page contact."
      },
      "prix": {
        keywords: ["prix", "tarif", "coût", "combien", "cher"],
        answer: "Nos tarifs sont établis sur devis selon vos besoins spécifiques. Contactez-nous pour obtenir un devis personnalisé gratuit."
      },
      "horaire": {
        keywords: ["horaire", "ouverture", "fermeture", "disponible", "quand"],
        answer: "Nous sommes disponibles du lundi au samedi de 8h à 18h. Pour les urgences, n'hésitez pas à nous appeler."
      },
      "ndhs": {
        keywords: ["ndhs", "niaye", "henry", "société", "entreprise"],
        answer: "NDHS (Niaye Dany Henry Services) est une société de services basée au Sénégal, spécialisée dans la logistique, l'immobilier, les véhicules, les matériaux BTP, les billets d'avion, l'assistance visa et le groupage de colis."
      }
    }

    for (const [key, data] of Object.entries(hardcodedFAQ)) {
      for (const keyword of data.keywords) {
        if (lowerQuery.includes(keyword)) {
          return data.answer
        }
      }
    }
    
    return null
  }

  const handleSend = () => {
    if (!inputValue.trim()) return

    const userMessage = inputValue.trim()
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setInputValue('')
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(() => {
      const answer = findAnswer(userMessage)
      
      if (answer) {
        setMessages(prev => [...prev, { role: 'bot', content: answer }])
      } else {
        setMessages(prev => [...prev, { 
          role: 'bot', 
          content: `Je n'ai pas trouvé d'information à ce sujet. Pour plus d'informations, vous pouvez contacter ${CONTACT_NAME} au ${CONTACT_PHONE}.` 
        }])
      }
      
      setIsTyping(false)
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`fixed bottom-24 right-4 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center transition-all duration-200 ${isOpen ? 'hidden' : 'flex'}`}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-24 right-4 z-50 w-80 md:w-96 h-[500px] bg-background border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary text-primary-foreground px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5" />
                <span className="font-semibold">Assistant NDHS</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.role === 'bot' && (
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center shrink-0">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-2xl ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground rounded-br-md'
                        : 'bg-secondary text-secondary-foreground rounded-bl-md'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.content}</p>
                  </div>
                  {message.role === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2 justify-start"
                >
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-secondary text-secondary-foreground px-3 py-2 rounded-2xl rounded-bl-md">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Posez votre question..."
                  className="flex-1 px-4 py-2 bg-secondary/50 border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isTyping}
                  className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
