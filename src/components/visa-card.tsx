import { PremiumCard } from '@/components/premium-card';
import { Ticket } from 'lucide-react';
import { motion } from 'framer-motion';

interface VisaCardProps {
  visa: {
    type: string;
    pays: string;
    documentsRequis: string[];
    tarif: number;
    delai: string;
    description: string;
  };
  index: number;
}

export function VisaCard({ visa, index }: VisaCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <PremiumCard className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Ticket className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-1">{visa.type}</h3>
            <p className="text-sm text-muted-foreground">{visa.pays}</p>
          </div>
        </div>

        <p className="text-sm text-foreground/70 mb-4 line-clamp-2">{visa.description}</p>

        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Tarif :</span>
            <span className="font-semibold text-primary">FCFA {visa.tarif?.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Délai :</span>
            <span className="font-medium">{visa.delai}</span>
          </div>
        </div>

        {visa.documentsRequis && visa.documentsRequis.length > 0 && (
          <div className="border-t pt-3">
            <p className="text-xs text-muted-foreground mb-2">Documents requis :</p>
            <ul className="space-y-1">
              {visa.documentsRequis.slice(0, 3).map((doc, idx) => (
                <li key={idx} className="text-xs flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-primary" />
                  {doc}
                </li>
              ))}
              {visa.documentsRequis.length > 3 && (
                <li className="text-xs text-muted-foreground">+{visa.documentsRequis.length - 3} autres</li>
              )}
            </ul>
          </div>
        )}
      </PremiumCard>
    </motion.div>
  );
}
