import { BackButton } from '@/components/back-button';
import { PageHeader } from '@/components/page-header';
import { PremiumCard } from '@/components/premium-card';
import { ActionButtons } from '@/components/action-buttons';
import { ImageZoom } from '@/components/image-zoom';
import { Package } from 'lucide-react';
import { getProduitBTPBySlug, urlFor } from '@/sanity/client';
import { notFound } from 'next/navigation';

export default async function MateriauDetailPage({ params }: { params: { slug: string } }) {
  const produit = await getProduitBTPBySlug(params.slug);

  if (!produit) {
    notFound();
  }

  const imageUrl = produit.photos && produit.photos.length > 0 
    ? urlFor(produit.photos[0]).url() 
    : 'https://placehold.co/1200x600/2563eb/white?text=NDHS';

  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        title="Détail du Matériau"
        description="Informations détaillées sur le matériau."
        icon={<Package className="w-8 h-8" />}
      />
      
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <BackButton href="/materiaux" label="Retour aux matériaux" />
          
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Gallery */}
            <PremiumCard className="overflow-hidden">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-muted">
                <ImageZoom
                  src={imageUrl}
                  alt={produit.titre || 'Matériau'}
                  className="w-full h-full object-cover"
                />
              </div>
              {produit.photos && produit.photos.length > 1 && (
                <div className="mt-4 grid grid-cols-4 gap-2">
                  {produit.photos.slice(1, 5).map((photo: any, index: number) => (
                    <div key={index} className="aspect-square rounded-lg overflow-hidden bg-muted">
                      <ImageZoom
                        src={urlFor(photo).url()}
                        alt={`${produit.titre} - Photo ${index + 2}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </PremiumCard>

            {/* Product Details */}
            <div className="space-y-6">
              <PremiumCard>
                <h1 className="text-3xl font-bold mb-2">{produit.titre}</h1>
                {produit.categorie && (
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm mb-4">
                    {produit.categorie}
                  </span>
                )}
                {produit.prix && (
                  <p className="text-4xl font-bold text-primary mb-4">
                    {produit.prix.toLocaleString()} FCFA
                  </p>
                )}
                <p className="text-foreground/70 leading-relaxed">
                  {produit.description}
                </p>
              </PremiumCard>

              {/* Specifications */}
              {produit.specifications && (
                <PremiumCard>
                  <h2 className="text-xl font-semibold mb-4">Spécifications</h2>
                  <div className="space-y-2">
                    {Object.entries(produit.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-border last:border-0">
                        <span className="text-foreground/70 capitalize">{key}</span>
                        <span className="font-medium">{value as string}</span>
                      </div>
                    ))}
                  </div>
                </PremiumCard>
              )}

              {/* Stock Information */}
              {produit.stock !== undefined && (
                <PremiumCard>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-foreground/70">Disponibilité</p>
                      <p className={`text-lg font-semibold ${produit.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {produit.stock > 0 ? `En stock (${produit.stock} unités)` : 'Rupture de stock'}
                      </p>
                    </div>
                    {produit.stock > 0 && (
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    )}
                  </div>
                </PremiumCard>
              )}

              {/* Action Buttons */}
              <ActionButtons
                id={produit._id}
                title={produit.titre || 'Matériau'}
                type="materiaux"
                price={produit.prix}
                imageUrl={imageUrl}
              />
            </div>
          </div>

          {/* Additional Information */}
          {produit.informations && (
            <PremiumCard className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Informations supplémentaires</h2>
              <p className="text-foreground/70 leading-relaxed">
                {produit.informations}
              </p>
            </PremiumCard>
          )}
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const produit = await getProduitBTPBySlug(params.slug);
  
  if (!produit) {
    return {
      title: 'Matériau non trouvé',
    };
  }

  return {
    title: `${produit.titre} - NDHS Matériaux BTP`,
    description: produit.description?.substring(0, 160),
  };
}
