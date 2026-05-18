"use client"

import { useState, useEffect } from 'react';
import { BackButton } from '@/components/back-button';
import { PageHeader } from '@/components/page-header';
import { PremiumCard } from '@/components/premium-card';
import { FilterBar } from '@/components/filter-bar';
import { ActionButtons } from '@/components/action-buttons';
import { ImageZoom } from '@/components/image-zoom';
import { Package } from 'lucide-react';
import { getProduitsBTP, urlFor } from '@/sanity/client';

export default function MateriauxPage() {
  const [produits, setProduits] = useState<any[]>([]);
  const [filteredProduits, setFilteredProduits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduits() {
      try {
        const data = await getProduitsBTP();
        setProduits(data);
        setFilteredProduits(data);
      } catch (error) {
        console.error('Error fetching materials:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProduits();
  }, []);

  const handleSearch = (query: string) => {
    const filtered = produits.filter((p) =>
      p.titre?.toLowerCase().includes(query.toLowerCase()) ||
      p.description?.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProduits(filtered);
  };

  const handleFilter = (filter: string) => {
    if (filter === 'all') {
      setFilteredProduits(produits);
    } else {
      const filtered = produits.filter((p) => p.categorie === filter);
      setFilteredProduits(filtered);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <PageHeader
          title="Matériaux BTP"
          description="Vente de matériaux de construction et carrelage."
          icon={<Package className="w-8 h-8" />}
        />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        title="Matériaux BTP"
        description="Vente de matériaux de construction et carrelage."
        icon={<Package className="w-8 h-8" />}
      />
      
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <BackButton href="/" label="Retour à l'accueil" />
          
          <FilterBar
            onSearch={handleSearch}
            onFilter={handleFilter}
            filters={['Carrelage', 'Ciment', 'Fer', 'Bois']}
            placeholder="Rechercher des matériaux..."
          />

          {filteredProduits.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-foreground/70">Aucun matériau trouvé.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProduits.map((produit) => (
                <PremiumCard key={produit._id} className="h-full">
                  <div className="flex flex-col h-full">
                    <div className="relative aspect-video mb-4 rounded-xl overflow-hidden bg-muted">
                      <ImageZoom
                        src={produit.photos && produit.photos.length > 0 ? urlFor(produit.photos[0]).url() : 'https://placehold.co/600x400/2563eb/white?text=NDHS'}
                        alt={produit.titre || 'Matériau'}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{produit.titre}</h3>
                      <p className="text-foreground/70 text-sm mb-4 line-clamp-2">
                        {produit.description}
                      </p>
                      {produit.prix && (
                        <p className="text-2xl font-bold text-primary mb-4">
                          {produit.prix.toLocaleString()} FCFA
                        </p>
                      )}
                      {produit.categorie && (
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full mb-4 inline-block">
                          {produit.categorie}
                        </span>
                      )}
                    </div>
                    <ActionButtons
                      id={produit._id}
                      title={produit.titre || 'Matériau'}
                      type="materiaux"
                      price={produit.prix}
                      imageUrl={produit.photos && produit.photos.length > 0 ? urlFor(produit.photos[0]).url() : undefined}
                    />
                  </div>
                </PremiumCard>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

