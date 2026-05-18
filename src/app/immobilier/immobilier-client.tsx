"use client"

import { useState } from 'react';
import { BackButton } from '@/components/back-button';
import { PageHeader } from '@/components/page-header';
import { PremiumCard } from '@/components/premium-card';
import { ActionButtons } from '@/components/action-buttons';
import { ImageZoom } from '@/components/image-zoom';
import { SearchBar } from '@/components/search-bar';
import { ContactButtons } from '@/components/contact-buttons';
import { Building2 } from 'lucide-react';

interface ImmobilierClientProps {
  initialBiens: any[];
}

export function ImmobilierClient({ initialBiens }: ImmobilierClientProps) {
  const [filteredBiens, setFilteredBiens] = useState(initialBiens);

  const handleSearch = (query: string) => {
    if (!query) {
      setFilteredBiens(initialBiens);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filtered = initialBiens.filter((bien: any) => {
      return (
        bien.titre?.toLowerCase().includes(lowerQuery) ||
        bien.description?.toLowerCase().includes(lowerQuery) ||
        bien.type?.toLowerCase().includes(lowerQuery) ||
        bien.quartier?.toLowerCase().includes(lowerQuery)
      );
    });
    setFilteredBiens(filtered);
  };

  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        title="Immobilier"
        description="Biens immobiliers à vendre et à louer."
        icon={<Building2 className="w-8 h-8" />}
      />
      
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <BackButton href="/" label="Retour à l'accueil" />
          
          <div className="my-6">
            <SearchBar 
              onSearch={handleSearch} 
              placeholder="Rechercher un bien (titre, description, type, quartier)..."
            />
          </div>

          {filteredBiens.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-foreground/70">Aucun bien trouvé correspondant à votre recherche.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBiens.map((bien: any) => (
                <PremiumCard key={bien._id} className="h-full">
                  <div className="flex flex-col h-full">
                    <div className="relative aspect-video mb-4 rounded-xl overflow-hidden bg-muted">
                      <ImageZoom
                        src={(() => {
                          if (!bien.photos || bien.photos.length === 0) {
                            return 'https://placehold.co/600x400/2563eb/white?text=NDHS';
                          }
                          const photo = bien.photos[0];
                          if (typeof photo === 'string') {
                            return photo;
                          }
                          if (photo?.asset?.url) {
                            return photo.asset.url;
                          }
                          return 'https://placehold.co/600x400/2563eb/white?text=NDHS';
                        })()}
                        alt={bien.titre || 'Bien immobilier'}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{bien.titre}</h3>
                      <p className="text-foreground/70 text-sm mb-4 line-clamp-2">
                        {bien.description}
                      </p>
                      {bien.prix && (
                        <p className="text-2xl font-bold text-primary mb-4">
                          {bien.prix.toLocaleString()} FCFA
                        </p>
                      )}
                      <div className="flex items-center gap-4 text-sm text-foreground/70 mb-4">
                        {bien.surface && (
                          <span>{bien.surface} m²</span>
                        )}
                        {bien.type && (
                          <span className="capitalize">{bien.type}</span>
                        )}
                        {bien.quartier && (
                          <span>{bien.quartier}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-foreground/70 mb-4">
                        {bien.chambres > 0 && (
                          <span>{bien.chambres} chambre(s)</span>
                        )}
                        {bien.sallesDeBain > 0 && (
                          <span>{bien.sallesDeBain} SDB</span>
                        )}
                      </div>
                    </div>
                    <ActionButtons
                      id={bien._id}
                      title={bien.titre || 'Bien immobilier'}
                      type="immobilier"
                      price={bien.prix}
                      imageUrl={(() => {
                        if (!bien.photos || bien.photos.length === 0) {
                          return undefined;
                        }
                        const photo = bien.photos[0];
                        if (typeof photo === 'string') {
                          return photo;
                        }
                        if (photo?.asset?.url) {
                          return photo.asset.url;
                        }
                        return undefined;
                      })()}
                    />
                  </div>
                </PremiumCard>
              ))}
            </div>
          )}

          <div className="mt-12 max-w-4xl mx-auto">
            <PremiumCard className="p-6 sm:p-8 hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-bold mb-4">Intéressé par un bien immobilier ?</h3>
              <p className="text-foreground/70 mb-6">
                Contactez-nous pour obtenir plus d'informations ou pour organiser une visite.
              </p>
              <ContactButtons
                subject="Intérêt immobilier"
                message="Bonjour, je suis intéressé par un bien immobilier."
                email="contact@ndhs.sn"
                whatsappNumber="+221771234567"
              />
            </PremiumCard>
          </div>
        </div>
      </div>
    </div>
  );
}
