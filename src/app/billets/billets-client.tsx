"use client"

import { useState } from 'react';
import { BackButton } from '@/components/back-button';
import { PageHeader } from '@/components/page-header';
import { ContactButtons } from '@/components/contact-buttons';
import { BilletCard } from '@/components/billet-card';
import { SearchBar } from '@/components/search-bar';
import { ReservationModal } from '@/components/reservation-modal';
import { Plane, Plus } from 'lucide-react';
import { PremiumCard } from '@/components/premium-card';
import { ShimmerButton } from '@/components/magic/shimmer-button';

interface BilletsClientProps {
  initialBillets: any[];
  email: string;
  whatsappNumber: string;
}

export function BilletsClient({ initialBillets, email, whatsappNumber }: BilletsClientProps) {
  const [filteredBillets, setFilteredBillets] = useState(initialBillets);
  const [selectedBillet, setSelectedBillet] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = (query: string) => {
    if (!query) {
      setFilteredBillets(initialBillets);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filtered = initialBillets.filter((billet: any) => {
      return (
        billet.destination?.toLowerCase().includes(lowerQuery) ||
        billet.description?.toLowerCase().includes(lowerQuery) ||
        billet.compagnie?.toLowerCase().includes(lowerQuery)
      );
    });
    setFilteredBillets(filtered);
  };

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Billets d'avion"
        description="Recherche et réservation de vols avec accompagnement personnalisé."
        icon={<Plane className="w-8 h-8" />}
      />
      
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <BackButton href="/" label="Retour à l'accueil" />
          
          <div className="my-6">
            <SearchBar 
              onSearch={handleSearch} 
              placeholder="Rechercher un billet (destination, compagnie, description)..."
            />
          </div>
          
          {/* Available Tickets Section */}
          {filteredBillets && filteredBillets.length > 0 ? (
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-6 text-primary">Billets disponibles</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBillets.map((billet: any, index: number) => (
                  <BilletCard 
                    key={billet._id} 
                    billet={billet} 
                    index={index} 
                    onClick={() => {
                      setSelectedBillet(billet);
                      setIsModalOpen(true);
                    }}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-foreground/70">Aucun billet trouvé correspondant à votre recherche.</p>
            </div>
          )}
          
          <div className="mt-12 max-w-4xl mx-auto">
            <PremiumCard className="p-6 sm:p-8 hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-bold mb-4">Besoin d'aide pour votre voyage ?</h3>
              <p className="text-foreground/70 mb-6">
                Contactez-nous pour obtenir de l'aide avec vos réservations de billets d'avion et vos formalités de voyage.
              </p>
              <div className="flex gap-3 flex-wrap">
                <ShimmerButton
                  onClick={() => {
                    setSelectedBillet(null);
                    setIsModalOpen(true);
                  }}
                  className="flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Réservation personnalisée
                </ShimmerButton>
                <ContactButtons 
                  subject="Demande de billets d'avion"
                  message="Bonjour, je souhaite obtenir des informations sur les billets d'avion disponibles."
                  email={email}
                  whatsappNumber={whatsappNumber}
                />
              </div>
            </PremiumCard>
          </div>
        </div>
      </div>

      <ReservationModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedBillet(null);
        }}
        billet={selectedBillet}
      />
    </div>
  );
}
