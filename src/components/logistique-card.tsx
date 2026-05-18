import { PremiumCard } from '@/components/premium-card';
import { Truck } from 'lucide-react';
import { motion } from 'framer-motion';

interface LogistiqueCardProps {
  service: {
    nom: string;
    type: string;
    tarif: number;
    zone: string;
    capacite: string;
    description: string;
  };
  index: number;
}

export function LogistiqueCard({ service, index }: LogistiqueCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <PremiumCard className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Truck className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-1">{service.nom}</h3>
            <p className="text-sm text-muted-foreground capitalize">{service.type}</p>
          </div>
        </div>

        <p className="text-sm text-foreground/70 mb-4 line-clamp-2">{service.description}</p>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Tarif :</span>
            <span className="font-semibold text-primary">FCFA {service.tarif?.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Zone :</span>
            <span className="font-medium">{service.zone}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Capacité :</span>
            <span className="font-medium">{service.capacite}</span>
          </div>
        </div>
      </PremiumCard>
    </motion.div>
  );
}
