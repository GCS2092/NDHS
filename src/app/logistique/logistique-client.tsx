"use client"

import { useState } from 'react';
import { BackButton } from '@/components/back-button';
import { PageHeader } from '@/components/page-header';
import { ContactButtons } from '@/components/contact-buttons';
import { LogistiqueCard } from '@/components/logistique-card';
import { SearchBar } from '@/components/search-bar';
import { Truck, Plus } from 'lucide-react';
import { PremiumCard } from '@/components/premium-card';
import { getDevisLogistiqueMessage } from '@/lib/message-templates';

interface LogistiqueClientProps {
  initialServices: any[];
  email: string;
  whatsappNumber: string;
}

export function LogistiqueClient({ initialServices, email, whatsappNumber }: LogistiqueClientProps) {
  const [filteredServices, setFilteredServices] = useState(initialServices);

  const handleSearch = (query: string) => {
    if (!query) {
      setFilteredServices(initialServices);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filtered = initialServices.filter((service: any) => {
      return (
        service.titre?.toLowerCase().includes(lowerQuery) ||
        service.description?.toLowerCase().includes(lowerQuery) ||
        service.type?.toLowerCase().includes(lowerQuery)
      );
    });
    setFilteredServices(filtered);
  };

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Logistique & Fret"
        description="Solutions de transport et logistique pour vos marchandises."
        icon={<Truck className="w-8 h-8" />}
      />
      
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <BackButton href="/" label="Retour à l'accueil" />
          
          <div className="my-6">
            <SearchBar 
              onSearch={handleSearch} 
              placeholder="Rechercher un service (titre, description, type)..."
            />
          </div>
          
          {/* Available Services Section */}
          {filteredServices && filteredServices.length > 0 ? (
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-6 text-primary">Services disponibles</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredServices.map((service: any, index: number) => (
                  <LogistiqueCard key={service._id} service={service} index={index} />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-foreground/70">Aucun service trouvé correspondant à votre recherche.</p>
            </div>
          )}
          
          <div className="mt-12 max-w-4xl mx-auto">
            <PremiumCard className="p-6 sm:p-8 hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-bold mb-4">Besoin d'un devis personnalisé ?</h3>
              <p className="text-foreground/70 mb-6">
                Contactez-nous pour obtenir un devis personnalisé pour vos besoins en logistique et transport.
              </p>
              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={() => {
                    const message = getDevisLogistiqueMessage({
                      fullName: '',
                      email: '',
                      phone: '',
                      serviceType: '',
                      origin: '',
                      destination: '',
                      weight: '',
                      dimensions: '',
                      urgency: '',
                      message: 'Bonjour, je souhaite obtenir un devis pour un service de logistique.'
                    });
                    const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
                    window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`, '_blank');
                  }}
                  className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Demande personnalisée WhatsApp
                </button>
                <ContactButtons
                  subject="Demande de devis - Logistique"
                  message="Bonjour, je souhaite obtenir un devis pour un service de logistique."
                  email={email}
                  whatsappNumber={whatsappNumber}
                />
              </div>
            </PremiumCard>
          </div>
        </div>
      </div>
    </div>
  );
}
