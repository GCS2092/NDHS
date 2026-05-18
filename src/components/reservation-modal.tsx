"use client"

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plane, Calendar, Users, CreditCard, Mail, MessageCircle, CheckCircle } from 'lucide-react';
import { PremiumCard } from '@/components/premium-card';
import { getBilletReservationMessage } from '@/lib/message-templates';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  billet?: {
    destination: string;
    pays: string;
    compagnie: string;
    tarif: number;
    duree: string;
    escales: string;
    description: string;
  };
}

export function ReservationModal({ isOpen, onClose, billet }: ReservationModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    destination: billet?.destination || '',
    departureDate: '',
    returnDate: '',
    passengers: '1',
    flightClass: 'economique',
    customRequest: '',
    budget: '',
    flexibility: ''
  });

  const [isCustom, setIsCustom] = useState(!billet);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form when billet changes or modal opens
  useEffect(() => {
    if (isOpen) {
      setIsCustom(!billet);
      setIsSubmitted(false);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        destination: billet?.destination || '',
        departureDate: '',
        returnDate: '',
        passengers: '1',
        flightClass: 'economique',
        customRequest: '',
        budget: '',
        flexibility: ''
      });
    }
  }, [isOpen, billet]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/reservation-billets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, isCustom }),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
      } else {
        alert('Erreur lors de l\'envoi : ' + result.error);
      }
    } catch (error) {
      alert('Erreur lors de l\'envoi de la réservation');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      destination: billet?.destination || '',
      departureDate: '',
      returnDate: '',
      passengers: '1',
      flightClass: 'economique',
      customRequest: '',
      budget: '',
      flexibility: ''
    });
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <PremiumCard className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Plane className="w-6 h-6 text-primary" />
                  {isCustom ? 'Réservation Personnalisée' : 'Réserver ce Vol'}
                </h2>
                <button
                  onClick={handleClose}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Réservation envoyée avec succès !</h3>
                  <p className="text-foreground/70 mb-6">
                    {isCustom
                      ? 'Votre demande de réservation personnalisée a été envoyée. Pour finaliser votre réservation, veuillez nous contacter par WhatsApp ou email avec les détails suivants :'
                      : 'Votre réservation a été envoyée. Nous vous contacterons bientôt pour confirmer les détails.'}
                  </p>

                  {isCustom && (
                    <div className="bg-primary/5 border border-primary/10 rounded-lg p-4 mb-6 text-left">
                      <p className="text-sm font-semibold mb-2">Informations à fournir :</p>
                      <ul className="text-sm text-foreground/70 space-y-1">
                        <li>• Copie de votre passeport</li>
                        <li>• Préférences de vol (horaires, escales)</li>
                        <li>• Services additionnels souhaités</li>
                        <li>• Mode de paiement préféré</li>
                      </ul>
                    </div>
                  )}

                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={() => {
                        const message = getBilletReservationMessage({ ...formData, compagnie: billet?.compagnie, tarif: billet?.tarif }, isCustom);
                        const encodedMessage = encodeURIComponent(message);
                        window.open(`https://wa.me/221771234567?text=${encodedMessage}`, '_blank');
                      }}
                      className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors"
                    >
                      <MessageCircle className="w-5 h-5" />
                      WhatsApp
                    </button>
                    <button
                      onClick={() => {
                        const message = getBilletReservationMessage({ ...formData, compagnie: billet?.compagnie, tarif: billet?.tarif }, isCustom);
                        const subject = encodeURIComponent('Réservation ' + (isCustom ? 'personnalisée' : '') + ' - ' + formData.destination);
                        const body = encodeURIComponent(message);
                        window.location.href = `mailto:contact@ndhs.sn?subject=${subject}&body=${body}`;
                      }}
                      className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                    >
                      <Mail className="w-5 h-5" />
                      Email
                    </button>
                  </div>

                  <button
                    onClick={handleClose}
                    className="mt-6 text-sm text-foreground/50 hover:text-foreground transition-colors"
                  >
                    Fermer
                  </button>
                </div>
              ) : (
                <>
                  {billet && !isCustom && (
                    <div className="bg-primary/5 border border-primary/10 rounded-lg p-4 mb-6">
                      <h3 className="font-semibold text-primary mb-2">{billet.destination}, {billet.pays}</h3>
                      <p className="text-sm text-foreground/70 mb-2">{billet.description}</p>
                      <div className="flex gap-4 text-sm">
                        <span className="font-medium">{billet.compagnie}</span>
                        <span>•</span>
                        <span>{billet.duree}</span>
                        <span>•</span>
                        <span>{billet.escales}</span>
                        <span>•</span>
                        <span className="font-bold text-primary">{billet.tarif?.toLocaleString()} FCFA</span>
                      </div>
                      <button
                        onClick={() => setIsCustom(true)}
                        className="mt-3 text-sm text-primary hover:underline"
                      >
                        Ce n'est pas ce que je cherche → Faire une réservation personnalisée
                      </button>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Nom complet *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                      placeholder="Votre nom"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Téléphone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                      placeholder="+221 XX XX XX XX"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Destination *</label>
                    <input
                      type="text"
                      name="destination"
                      value={formData.destination}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                      placeholder="Paris, France"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Date de départ *
                    </label>
                    <input
                      type="date"
                      name="departureDate"
                      value={formData.departureDate}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Date de retour</label>
                    <input
                      type="date"
                      name="returnDate"
                      value={formData.returnDate}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      Passagers *
                    </label>
                    <select
                      name="passengers"
                      value={formData.passengers}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                        <option key={n} value={n}>{n} passager{n > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 flex items-center gap-1">
                      <CreditCard className="w-4 h-4" />
                      Classe
                    </label>
                    <select
                      name="flightClass"
                      value={formData.flightClass}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                    >
                      <option value="economique">Économique</option>
                      <option value="business">Business</option>
                      <option value="premiere">Première</option>
                    </select>
                  </div>
                </div>

                {isCustom && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Budget estimé (FCFA)</label>
                        <input
                          type="text"
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-border rounded-lg bg-background hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                          placeholder="Ex: 500000"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Flexibilité des dates</label>
                        <select
                          name="flexibility"
                          value={formData.flexibility}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-border rounded-lg bg-background hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                        >
                          <option value="">Sélectionnez...</option>
                          <option value="flexible">Dates flexibles (+/- 3 jours)</option>
                          <option value="tres-flexible">Très flexible (+/- 7 jours)</option>
                          <option value="rigide">Dates fixes uniquement</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Demande personnalisée</label>
                      <textarea
                        name="customRequest"
                        value={formData.customRequest}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none"
                        placeholder="Décrivez vos besoins spécifiques : préférences d'horaire, escales souhaitées, services à bord, etc."
                      />
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  className="w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Envoi en cours...' : (isCustom ? 'Envoyer ma demande personnalisée' : 'Confirmer la réservation')}
                </button>
              </form>
                </>
              )}
            </PremiumCard>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
