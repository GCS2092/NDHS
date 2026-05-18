"use client"

import { useState } from 'react';
import { BackButton } from '@/components/back-button';
import { PageHeader } from '@/components/page-header';
import { ContactButtons } from '@/components/contact-buttons';
import { GroupageCard } from '@/components/groupage-card';
import { SearchBar } from '@/components/search-bar';
import { CreditCard, Plus } from 'lucide-react';
import { PremiumCard } from '@/components/premium-card';
import { ShimmerButton } from '@/components/magic/shimmer-button';
import { getGroupageMessage } from '@/lib/message-templates';

interface GroupageClientProps {
  initialDestinations: any[];
  email: string;
  whatsappNumber: string;
}

export function GroupageClient({ initialDestinations, email, whatsappNumber }: GroupageClientProps) {
  const [filteredDestinations, setFilteredDestinations] = useState(initialDestinations);

  const handleSearch = (query: string) => {
    if (!query) {
      setFilteredDestinations(initialDestinations);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filtered = initialDestinations.filter((destination: any) => {
      return (
        destination.pays?.toLowerCase().includes(lowerQuery) ||
        destination.ville?.toLowerCase().includes(lowerQuery) ||
        destination.description?.toLowerCase().includes(lowerQuery)
      );
    });
    setFilteredDestinations(filtered);
  };

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Groupage de Colis"
        description="Service d'expédition internationale avec vente de kilos bagages."
        icon={<CreditCard className="w-8 h-8" />}
      />
      
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <BackButton href="/" label="Retour à l'accueil" />
          
          <div className="my-6">
            <SearchBar 
              onSearch={handleSearch} 
              placeholder="Rechercher une destination (pays, ville, description)..."
            />
          </div>
          
          {/* Available Destinations Section */}
          {filteredDestinations && filteredDestinations.length > 0 ? (
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-6 text-primary">Destinations disponibles</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDestinations.map((destination: any, index: number) => (
                  <GroupageCard key={destination._id} destination={destination} index={index} />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-foreground/70">Aucune destination trouvée correspondant à votre recherche.</p>
            </div>
          )}
          
          <div className="mt-12 max-w-4xl mx-auto">
            <PremiumCard className="p-6 sm:p-8 hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-bold mb-4">Besoin d'envoyer un colis ?</h3>
              <p className="text-foreground/70 mb-6">
                Contactez-nous pour obtenir un devis personnalisé pour l'expédition de vos colis.
              </p>
              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={() => {
                    const message = getGroupageMessage({
                      fullName: '',
                      email: '',
                      phone: '',
                      destination: '',
                      weight: '',
                      content: '',
                      urgency: '',
                      message: 'Bonjour, je souhaite envoyer un colis par groupage.'
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
                  subject="Demande de groupage"
                  message="Bonjour, je souhaite envoyer un colis par groupage."
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
