import { PremiumCard } from '@/components/premium-card';
import { CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';

interface GroupageCardProps {
  destination: {
    ville: string;
    pays: string;
    tarifKilo: number;
    delai: string;
    frequenceDepart: string;
    description: string;
  };
  index: number;
}

export function GroupageCard({ destination, index }: GroupageCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <PremiumCard className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <CreditCard className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-1">{destination.ville}</h3>
            <p className="text-sm text-muted-foreground">{destination.pays}</p>
          </div>
        </div>

        <p className="text-sm text-foreground/70 mb-4 line-clamp-2">{destination.description}</p>

        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Tarif :</span>
            <span className="font-semibold text-primary">FCFA {destination.tarifKilo?.toLocaleString()} / kg</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Délai :</span>
            <span className="font-medium">{destination.delai}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Fréquence :</span>
            <span className="font-medium">{destination.frequenceDepart}</span>
          </div>
        </div>
      </PremiumCard>
    </motion.div>
  );
}
