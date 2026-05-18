"use client"

import { BackButton } from '@/components/back-button';
import { PageHeader } from '@/components/page-header';
import { HelpCircle } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FAQPage() {
  const faqs = [
    {
      question: 'Comment commander des matériaux BTP ?',
      answer: 'Vous pouvez commander des matériaux BTP via notre catalogue en ligne ou en nous contactant directement.',
    },
    {
      question: 'Quels sont les délais de livraison pour le groupage ?',
      answer: 'Les délais de livraison varient selon la destination. Contactez-nous pour plus d\'informations.',
    },
    {
      question: 'Proposez-vous un accompagnement pour les visas ?',
      answer: 'Oui, nous proposons un accompagnement complet pour la constitution de votre dossier de demande de visa.',
    },
    {
      question: 'Comment réserver un billet d\'avion ?',
      answer: 'Remplissez le formulaire de recherche sur notre page billets ou contactez-nous pour un accompagnement personnalisé.',
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen">
      <PageHeader
        title="FAQ"
        description="Questions fréquentes sur nos services."
        icon={<HelpCircle className="w-8 h-8" />}
      />
      
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <BackButton href="/" label="Retour à l'accueil" />
          
          <div className="mt-8 space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-all duration-300">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-6 sm:p-8 text-left flex items-center justify-between"
                >
                  <h3 className="text-lg sm:text-xl font-semibold pr-4">{faq.question}</h3>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 sm:px-8 pb-6 sm:pb-8">
                        <p className="text-foreground/70">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
