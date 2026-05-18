import { PremiumCard } from '@/components/premium-card';
import { HardHat } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface BTPCardProps {
  produit: {
    nom: string;
    categorie: string;
    prix: number;
    unite: string;
    stock: number;
    description: string;
    photo?: any;
  };
  index: number;
}

export function BTPCard({ produit, index }: BTPCardProps) {
  const imageUrl = produit.photo?.asset?._ref 
    ? `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${produit.photo.asset._ref.replace('image-', '').replace('-webp', '.webp').replace('-jpg', '.jpg').replace('-png', '.png').replace('-jpeg', '.jpeg')}`
    : `https://placehold.co/400x300/0D1B4B/FFC700?text=${encodeURIComponent(produit.categorie)}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <PremiumCard className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
        <div className="relative h-48 bg-muted overflow-hidden">
          <Image
            src={imageUrl}
            alt={produit.nom}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
            unoptimized
          />
          {produit.stock !== undefined && produit.stock <= 10 && (
            <div className="absolute top-2 right-2 bg-destructive text-destructive-foreground text-xs px-2 py-1 rounded-full">
              Stock limité
            </div>
          )}
        </div>

        <div className="p-4">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <HardHat className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-1">{produit.nom}</h3>
              <p className="text-xs text-muted-foreground">{produit.categorie}</p>
            </div>
          </div>

          <p className="text-sm text-foreground/70 mb-3 line-clamp-2">{produit.description}</p>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Prix :</span>
              <span className="font-semibold text-primary">FCFA {produit.prix?.toLocaleString()} / {produit.unite}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Stock :</span>
              <span className={`font-medium ${produit.stock === 0 ? 'text-destructive' : produit.stock <= 10 ? 'text-orange-500' : 'text-green-500'}`}>
                {produit.stock === 0 ? 'Rupture' : produit.stock + ' ' + produit.unite}
              </span>
            </div>
          </div>
        </div>
      </PremiumCard>
    </motion.div>
  );
}
