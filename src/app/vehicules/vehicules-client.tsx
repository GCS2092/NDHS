"use client"

import { useState } from 'react';
import { BackButton } from '@/components/back-button';
import { PageHeader } from '@/components/page-header';
import { PremiumCard } from '@/components/premium-card';
import { ActionButtons } from '@/components/action-buttons';
import { ImageZoom } from '@/components/image-zoom';
import { SearchBar } from '@/components/search-bar';
import { SocialShare } from '@/components/social-share';
import { ContactButtons } from '@/components/contact-buttons';
import { Car, Plus } from 'lucide-react';
import { getVehiculeMessage } from '@/lib/message-templates';

interface VehiculesClientProps {
  initialVehicules: any[];
}

export function VehiculesClient({ initialVehicules }: VehiculesClientProps) {
  const [filteredVehicules, setFilteredVehicules] = useState(initialVehicules);

  const handleSearch = (query: string) => {
    if (!query) {
      setFilteredVehicules(initialVehicules);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filtered = initialVehicules.filter((vehicule: any) => {
      return (
        vehicule.titre?.toLowerCase().includes(lowerQuery) ||
        vehicule.description?.toLowerCase().includes(lowerQuery) ||
        vehicule.type?.toLowerCase().includes(lowerQuery)
      );
    });
    setFilteredVehicules(filtered);
  };

  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        title="Véhicules"
        description="Vente et location de véhicules neufs et d'occasion."
        icon={<Car className="w-8 h-8" />}
      />
      
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <BackButton href="/" label="Retour à l'accueil" />
          
          <div className="my-6">
            <SearchBar 
              onSearch={handleSearch} 
              placeholder="Rechercher un véhicule (titre, description, type)..."
            />
          </div>

          {filteredVehicules.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-foreground/70">Aucun véhicule trouvé correspondant à votre recherche.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVehicules.map((vehicule: any) => (
                <PremiumCard key={vehicule._id} className="h-full">
                  <div className="flex flex-col h-full">
                    <div className="relative aspect-video mb-4 rounded-xl overflow-hidden bg-muted">
                      <ImageZoom
                        src={(() => {
                          if (!vehicule.photos || vehicule.photos.length === 0) {
                            return 'https://placehold.co/600x400/2563eb/white?text=NDHS';
                          }
                          const photo = vehicule.photos[0];
                          if (typeof photo === 'string') {
                            return photo;
                          }
                          if (photo?.asset?.url) {
                            return photo.asset.url;
                          }
                          return 'https://placehold.co/600x400/2563eb/white?text=NDHS';
                        })()}
                        alt={vehicule.titre || 'Véhicule'}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{vehicule.titre}</h3>
                      <p className="text-foreground/70 text-sm mb-4 line-clamp-2">
                        {vehicule.description}
                      </p>
                      {vehicule.prix && (
                        <p className="text-2xl font-bold text-primary mb-4">
                          {vehicule.prix.toLocaleString()} FCFA
                        </p>
                      )}
                      <div className="flex items-center gap-4 text-sm text-foreground/70 mb-4">
                        {vehicule.kilometrage && (
                          <span>{Number(vehicule.kilometrage).toLocaleString()} km</span>
                        )}
                        {vehicule.annee && (
                          <span>{vehicule.annee}</span>
                        )}
                        {vehicule.type && (
                          <span className="capitalize">{vehicule.type}</span>
                        )}
                      </div>
                      {vehicule.location && (
                        <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs mb-4">
                          Disponible à la location
                        </span>
                      )}
                      <SocialShare 
                        title={vehicule.titre}
                        description={vehicule.description}
                      />
                    </div>
                    <ActionButtons
                      id={vehicule._id}
                      title={vehicule.titre || 'Véhicule'}
                      type="vehicule"
                      price={vehicule.prix}
                      imageUrl={(() => {
                        if (!vehicule.photos || vehicule.photos.length === 0) {
                          return undefined;
                        }
                        const photo = vehicule.photos[0];
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
              <h3 className="text-xl font-bold mb-4">Intéressé par un véhicule ?</h3>
              <p className="text-foreground/70 mb-6">
                Contactez-nous pour obtenir plus d'informations ou pour organiser une visite/essai.
              </p>
              <ContactButtons 
                subject="Intérêt véhicule"
                message="Bonjour, je suis intéressé par un véhicule."
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
