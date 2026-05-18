"use client"

import { useState } from 'react';
import { BackButton } from '@/components/back-button';
import { PageHeader } from '@/components/page-header';
import { ContactButtons } from '@/components/contact-buttons';
import { VisaCard } from '@/components/visa-card';
import { SearchBar } from '@/components/search-bar';
import { Ticket, Plus } from 'lucide-react';
import { PremiumCard } from '@/components/premium-card';
import { ShimmerButton } from '@/components/magic/shimmer-button';
import { getVisaRequestMessage } from '@/lib/message-templates';

interface VisaClientProps {
  initialVisas: any[];
  email: string;
  whatsappNumber: string;
}

export function VisaClient({ initialVisas, email, whatsappNumber }: VisaClientProps) {
  const [filteredVisas, setFilteredVisas] = useState(initialVisas);

  const handleSearch = (query: string) => {
    if (!query) {
      setFilteredVisas(initialVisas);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filtered = initialVisas.filter((visa: any) => {
      return (
        visa.pays?.toLowerCase().includes(lowerQuery) ||
        visa.description?.toLowerCase().includes(lowerQuery) ||
        visa.type?.toLowerCase().includes(lowerQuery)
      );
    });
    setFilteredVisas(filtered);
  };

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Assistance Visa"
        description="Accompagnement complet dans la constitution du dossier de demande de visa."
        icon={<Ticket className="w-8 h-8" />}
      />
      
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <BackButton href="/" label="Retour à l'accueil" />
          
          <div className="my-6">
            <SearchBar 
              onSearch={handleSearch} 
              placeholder="Rechercher un visa (pays, type, description)..."
            />
          </div>
          
          {/* Available Visas Section */}
          {filteredVisas && filteredVisas.length > 0 ? (
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-6 text-primary">Visas disponibles</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVisas.map((visa: any, index: number) => (
                  <VisaCard key={visa._id} visa={visa} index={index} />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-foreground/70">Aucun visa trouvé correspondant à votre recherche.</p>
            </div>
          )}
          
          <div className="mt-12 max-w-4xl mx-auto">
            <PremiumCard className="p-6 sm:p-8 hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-bold mb-4">Besoin d'aide pour votre demande de visa ?</h3>
              <p className="text-foreground/70 mb-6">
                Contactez-nous pour obtenir de l'aide avec vos formalités de visa et vos documents de voyage.
              </p>
              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={() => {
                    const message = getVisaRequestMessage({
                      fullName: '',
                      email: '',
                      phone: '',
                      destination: '',
                      travelDate: '',
                      visaType: '',
                      passportNumber: '',
                      message: 'Bonjour, je souhaite obtenir de l\'aide pour une demande de visa.'
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
                  subject="Demande d'assistance Visa"
                  message="Bonjour, je souhaite obtenir de l'aide pour une demande de visa."
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
