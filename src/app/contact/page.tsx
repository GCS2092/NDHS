"use client"

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BackButton } from '@/components/back-button';
import { PageHeader } from '@/components/page-header';
import { PremiumCard } from '@/components/premium-card';
import { ShimmerButton } from '@/components/magic/shimmer-button';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, CheckCircle } from 'lucide-react';
import { getSiteSettings } from '@/sanity/client';
import { getDevisMessage } from '@/lib/message-templates';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [siteSettings, setSiteSettings] = useState<any>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function fetchSiteSettings() {
      try {
        const settings = await getSiteSettings();
        setSiteSettings(settings);
      } catch (error) {
        console.error('Error fetching site settings:', error);
      }
    }
    fetchSiteSettings();
  }, []);

  const whatsappNumber = siteSettings?.whatsappNumber || '+221777777777';
  const email = siteSettings?.contactEmail || 'contact@ndhs.sn';
  const contactPhone = siteSettings?.contactPhone || '+221 XX XX XX XX';
  const cleanWhatsAppNumber = whatsappNumber.replace(/[^0-9]/g, '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        }),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
      } else {
        alert('Erreur lors de l\'envoi : ' + result.error);
      }
    } catch (error) {
      alert('Erreur lors de l\'envoi du formulaire');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Adresse',
      value: siteSettings?.address || 'Dakar, Sénégal'
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Téléphone',
      value: contactPhone
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email',
      value: email
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Horaires',
      value: siteSettings?.businessHours || 'Lun - Ven: 8h - 18h'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        title="Contact"
        description="Contactez-nous pour toute demande d'information."
        icon={<Mail className="w-8 h-8" />}
      />
      
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <BackButton href="/" label="Retour à l'accueil" />
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mt-8"
          >
            {/* Contact Info Grid */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-4 gap-4 mb-8"
            >
              {contactInfo.map((info, index) => (
                <PremiumCard key={index} className="text-center">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-2 text-primary">
                      {info.icon}
                    </div>
                    <h3 className="font-semibold mb-1 text-sm">{info.title}</h3>
                    <p className="text-foreground/70 text-xs">{info.value}</p>
                  </div>
                </PremiumCard>
              ))}
            </motion.div>

            {/* Main Contact Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Contact Form */}
              <motion.div variants={itemVariants}>
                <PremiumCard className="h-full">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Send className="w-5 h-5 text-primary" />
                    Envoyer un message
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-foreground/90">Nom complet</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-sm"
                        placeholder="Votre nom"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-foreground/90">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-sm"
                        placeholder="votre@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-foreground/90">Téléphone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-sm"
                        placeholder="+221 XX XX XX XX"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-foreground/90">Sujet</label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-sm"
                        placeholder="Sujet de votre message"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-foreground/90">Message</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background h-24 hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none text-sm"
                        placeholder="Votre message..."
                      />
                    </div>
                    <ShimmerButton className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
                    </ShimmerButton>
                  </form>

                  {isSubmitted && (
                    <div className="mt-6 text-center py-6">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">Message envoyé avec succès !</h3>
                      <p className="text-foreground/70 mb-4 text-sm">
                        Pour faciliter le suivi, vous pouvez nous contacter directement via WhatsApp ou email avec toutes les informations pré-remplies.
                      </p>
                      <div className="flex gap-3 justify-center">
                        <button
                          onClick={() => {
                            const message = getDevisMessage({ fullName: formData.name, email: formData.email, phone: formData.phone, subject: formData.subject, message: formData.message });
                            const encodedMessage = encodeURIComponent(message);
                            window.open(`https://wa.me/${cleanWhatsAppNumber}?text=${encodedMessage}`, '_blank');
                          }}
                          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors text-sm"
                        >
                          <MessageCircle className="w-4 h-4" />
                          WhatsApp
                        </button>
                        <button
                          onClick={() => {
                            const message = getDevisMessage({ fullName: formData.name, email: formData.email, phone: formData.phone, subject: formData.subject, message: formData.message });
                            const subject = encodeURIComponent(formData.subject);
                            const body = encodeURIComponent(message);
                            window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
                          }}
                          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors text-sm"
                        >
                          <Mail className="w-4 h-4" />
                          Email
                        </button>
                      </div>
                    </div>
                  )}
                </PremiumCard>
              </motion.div>

              {/* Quick Contact Options */}
              <motion.div variants={itemVariants}>
                <PremiumCard className="h-full">
                  <h2 className="text-xl font-semibold mb-4">Contact rapide</h2>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={() => window.location.href = `mailto:${email}?subject=Contact depuis le site web&body=Bonjour, je vous contacte depuis le site web NDHS.`}
                      className="flex-1 flex flex-col items-center justify-center p-3 rounded-lg bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-colors"
                    >
                      <Mail className="w-5 h-5 text-primary mb-2" />
                      <span className="text-sm font-semibold">Email</span>
                    </button>

                    <button
                      onClick={() => window.open(`https://wa.me/${cleanWhatsAppNumber}?text=Bonjour, je vous contacte par WhatsApp depuis le site web NDHS.`, '_blank')}
                      className="flex-1 flex flex-col items-center justify-center p-3 rounded-lg bg-accent/5 border border-accent/10 hover:bg-accent/10 transition-colors"
                    >
                      <Phone className="w-5 h-5 text-accent mb-2" />
                      <span className="text-sm font-semibold">WhatsApp</span>
                    </button>
                  </div>

                  <div className="mt-4 p-3 rounded-lg bg-muted/50 border border-border">
                    <ul className="space-y-1 text-xs text-foreground/70">
                      <li className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-primary" />
                        Réponse garantie sous 24h
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-primary" />
                        Support multilingue
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-primary" />
                        Confidentialité assurée
                      </li>
                    </ul>
                  </div>
                </PremiumCard>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
