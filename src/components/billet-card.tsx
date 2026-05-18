"use client"

import { PremiumCard } from '@/components/premium-card';
import { Plane } from 'lucide-react';
import { motion } from 'framer-motion';

interface BilletCardProps {
  billet: {
    destination: string;
    pays: string;
    compagnie: string;
    tarif: number;
    duree: string;
    escales: string;
    description: string;
  };
  index: number;
  onClick?: () => void;
}

export function BilletCard({ billet, index, onClick }: BilletCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={onClick}
      className="cursor-pointer"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <PremiumCard className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Plane className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-1">{billet.destination}</h3>
            <p className="text-sm text-muted-foreground">{billet.pays}</p>
          </div>
        </div>

        <p className="text-sm text-foreground/70 mb-4 line-clamp-2">{billet.description}</p>

        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Compagnie :</span>
            <span className="font-medium">{billet.compagnie}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Tarif :</span>
            <span className="font-semibold text-primary">FCFA {billet.tarif?.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Durée :</span>
            <span className="font-medium">{billet.duree}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Escales :</span>
            <span className="font-medium">{billet.escales}</span>
          </div>
        </div>
      </PremiumCard>
    </motion.div>
  );
}
