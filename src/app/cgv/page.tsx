import { PageHeader } from '@/components/page-header';
import { FileText } from 'lucide-react';
import { PremiumCard } from '@/components/premium-card';

export default function CGVPage() {
  return (
    <div className="min-h-screen">
      <PageHeader
        title="Conditions Générales de Vente"
        description="Nos conditions de vente et de service."
        icon={<FileText className="w-8 h-8" />}
      />
      
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <PremiumCard className="p-8">
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <h2 className="text-2xl font-bold text-primary mb-6">1. Introduction</h2>
              <p className="text-foreground/80 mb-6">
                Les présentes Conditions Générales de Vente (CGV) régissent les relations commerciales entre NDHS Niaye Dany Henry Services et ses clients. En utilisant nos services, vous acceptez ces conditions.
              </p>

              <h2 className="text-2xl font-bold text-primary mb-6">2. Services proposés</h2>
              <p className="text-foreground/80 mb-4">
                NDHS propose les services suivants :
              </p>
              <ul className="list-disc pl-6 text-foreground/80 mb-6 space-y-2">
                <li>Vente et location de véhicules</li>
                <li>Transactions immobilières</li>
                <li>Vente de matériaux de construction</li>
                <li>Services logistiques et de fret</li>
                <li>Groupage de colis</li>
                <li>Réservation de billets d'avion</li>
                <li>Assistance visa</li>
              </ul>

              <h2 className="text-2xl font-bold text-primary mb-6">3. Commandes et réservations</h2>
              <p className="text-foreground/80 mb-4">
                Toute commande ou réservation doit être confirmée par notre équipe. Les prix indiqués sont en FCFA et peuvent être sujets à modification sans préavis.
              </p>

              <h2 className="text-2xl font-bold text-primary mb-6">4. Paiement</h2>
              <p className="text-foreground/80 mb-4">
                Le paiement peut être effectué par :
              </p>
              <ul className="list-disc pl-6 text-foreground/80 mb-6 space-y-2">
                <li>Virement bancaire</li>
                <li>Mobile money (Wave, Orange Money)</li>
                <li>Espèces (dans nos bureaux)</li>
              </ul>

              <h2 className="text-2xl font-bold text-primary mb-6">5. Annulation et remboursement</h2>
              <p className="text-foreground/80 mb-6">
                Les conditions d'annulation et de remboursement varient selon le type de service. Pour plus d'informations, veuillez nous contacter directement.
              </p>

              <h2 className="text-2xl font-bold text-primary mb-6">6. Responsabilité</h2>
              <p className="text-foreground/80 mb-6">
                NDHS s'engage à fournir des services de qualité. Cependant, notre responsabilité est limitée aux dommages directs résultant de notre faute ou négligence avérée.
              </p>

              <h2 className="text-2xl font-bold text-primary mb-6">7. Données personnelles</h2>
              <p className="text-foreground/80 mb-6">
                Vos données personnelles sont traitées conformément à notre Politique de Confidentialité.
              </p>

              <h2 className="text-2xl font-bold text-primary mb-6">8. Contact</h2>
              <p className="text-foreground/80 mb-6">
                Pour toute question concernant ces CGV, n'hésitez pas à nous contacter via :
              </p>
              <ul className="list-disc pl-6 text-foreground/80 space-y-2">
                <li>Email : contact@ndhs.sn</li>
                <li>Téléphone : +221 77 123 45 67</li>
                <li>Adresse : Dakar, Sénégal</li>
              </ul>
            </div>
          </PremiumCard>
        </div>
      </div>
    </div>
  );
}
