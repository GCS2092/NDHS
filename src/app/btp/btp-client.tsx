"use client"

import { useState } from 'react';
import { BackButton } from '@/components/back-button';
import { PageHeader } from '@/components/page-header';
import { ContactButtons } from '@/components/contact-buttons';
import { BTPCard } from '@/components/btp-card';
import { SearchBar } from '@/components/search-bar';
import { HardHat, Plus } from 'lucide-react';
import { PremiumCard } from '@/components/premium-card';
import { getDevisBTPMessage } from '@/lib/message-templates';

interface BTPClientProps {
  initialProduits: any[];
  email: string;
  whatsappNumber: string;
}

export function BTPClient({ initialProduits, email, whatsappNumber }: BTPClientProps) {
  const [filteredProduits, setFilteredProduits] = useState(initialProduits);

  const handleSearch = (query: string) => {
    if (!query) {
      setFilteredProduits(initialProduits);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filtered = initialProduits.filter((produit: any) => {
      return (
        produit.titre?.toLowerCase().includes(lowerQuery) ||
        produit.description?.toLowerCase().includes(lowerQuery) ||
        produit.categorie?.toLowerCase().includes(lowerQuery)
      );
    });
    setFilteredProduits(filtered);
  };

  return (
    <div className="min-h-screen">
      <PageHeader
        title="BTP & Construction"
        description="Matériaux de construction et services pour vos projets."
        icon={<HardHat className="w-8 h-8" />}
      />
      
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <BackButton href="/" label="Retour à l'accueil" />
          
          <div className="my-6">
            <SearchBar 
              onSearch={handleSearch} 
              placeholder="Rechercher un produit ou service (titre, description, catégorie)..."
            />
          </div>
          
          {/* Available Products Section */}
          {filteredProduits && filteredProduits.length > 0 ? (
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-6 text-primary">Produits disponibles</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProduits.map((produit: any, index: number) => (
                  <BTPCard key={produit._id} produit={produit} index={index} />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-foreground/70">Aucun produit trouvé correspondant à votre recherche.</p>
            </div>
          )}
          
          <div className="mt-12 max-w-4xl mx-auto">
            <PremiumCard className="p-6 sm:p-8 hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-bold mb-4">Besoin d'un devis personnalisé ?</h3>
              <p className="text-foreground/70 mb-6">
                Contactez-nous pour obtenir un devis personnalisé pour vos projets de construction.
              </p>
              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={() => {
                    const message = getDevisBTPMessage({
                      fullName: '',
                      email: '',
                      phone: '',
                      projectType: '',
                      location: '',
                      materials: '',
                      budget: '',
                      timeline: '',
                      message: 'Bonjour, je souhaite obtenir un devis pour des matériaux de construction.'
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
                  subject="Demande de devis - BTP"
                  message="Bonjour, je souhaite obtenir un devis pour des matériaux de construction."
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
