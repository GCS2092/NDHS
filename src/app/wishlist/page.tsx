"use client"

import { useWishlistStore } from '@/stores/wishlist-store';
import { BackButton } from '@/components/back-button';
import { HeartOff, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { PageHeader } from '@/components/page-header';

export default function WishlistPage() {
  const { items, removeFromWishlist, clearWishlist } = useWishlistStore();

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Ma Wishlist"
        description="Vos articles favoris enregistrés pour plus tard."
        icon={<HeartOff className="w-8 h-8" />}
      />
      
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <BackButton href="/" label="Retour à l'accueil" />
          
          <div className="mt-8">
            <p className="text-lg text-foreground/70 mb-8">
              {items.length} {items.length === 1 ? 'article' : 'articles'} dans votre liste de souhaits
            </p>

            {items.length === 0 ? (
              <div className="text-center py-12">
                <HeartOff className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-xl text-muted-foreground">Votre wishlist est vide</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                    >
                      {item.imageUrl && (
                        <div className="aspect-video bg-muted relative">
                          <Image
                            src={item.imageUrl}
                            alt={item.title}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                      )}
                      <div className="p-4">
                        <h3 className="font-semibold mb-2">{item.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{item.type}</p>
                        {item.price && (
                          <p className="text-lg font-bold text-primary mb-4">
                            FCFA {item.price.toLocaleString()}
                          </p>
                        )}
                        <button
                          onClick={() => removeFromWishlist(item.id)}
                          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-destructive/10 hover:bg-destructive/20 text-destructive rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                          Retirer
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {items.length > 0 && (
                  <div className="mt-8 flex justify-end">
                    <button
                      onClick={clearWishlist}
                      className="px-6 py-3 bg-destructive text-destructive-foreground rounded-lg font-semibold hover:bg-destructive/90 transition-colors"
                    >
                      Vider la wishlist
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
