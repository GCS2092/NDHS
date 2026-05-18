import { PageHeader } from '@/components/page-header';
import { Shield } from 'lucide-react';
import { PremiumCard } from '@/components/premium-card';

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="min-h-screen">
      <PageHeader
        title="Politique de Confidentialité"
        description="Comment nous protégeons vos données personnelles."
        icon={<Shield className="w-8 h-8" />}
      />
      
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <PremiumCard className="p-8">
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <h2 className="text-2xl font-bold text-primary mb-6">1. Collecte des données</h2>
              <p className="text-foreground/80 mb-6">
                NDHS collecte les données personnelles suivantes dans le cadre de nos services :
              </p>
              <ul className="list-disc pl-6 text-foreground/80 mb-6 space-y-2">
                <li>Nom et prénom</li>
                <li>Adresse email</li>
                <li>Numéro de téléphone</li>
                <li>Adresse de livraison</li>
                <li>Informations de paiement</li>
                <li>Données de voyage (pour les services de visa et billets)</li>
              </ul>

              <h2 className="text-2xl font-bold text-primary mb-6">2. Utilisation des données</h2>
              <p className="text-foreground/80 mb-4">
                Vos données sont utilisées pour :
              </p>
              <ul className="list-disc pl-6 text-foreground/80 mb-6 space-y-2">
                <li>Traiter vos commandes et réservations</li>
                <li>Améliorer nos services</li>
                <li>Vous contacter concernant vos demandes</li>
                <li>Envoyer des communications marketing (avec votre consentement)</li>
              </ul>

              <h2 className="text-2xl font-bold text-primary mb-6">3. Protection des données</h2>
              <p className="text-foreground/80 mb-6">
                Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos données personnelles contre tout accès non autorisé, modification, divulgation ou destruction.
              </p>

              <h2 className="text-2xl font-bold text-primary mb-6">4. Partage des données</h2>
              <p className="text-foreground/80 mb-6">
                Nous ne vendons pas vos données personnelles. Nous pouvons les partager avec :
              </p>
              <ul className="list-disc pl-6 text-foreground/80 mb-6 space-y-2">
                <li>Nos partenaires de service (banques, transporteurs, etc.)</li>
                <li>Les autorités légales si requis par la loi</li>
              </ul>

              <h2 className="text-2xl font-bold text-primary mb-6">5. Vos droits</h2>
              <p className="text-foreground/80 mb-4">
                Conformément à la loi sénégalaise sur la protection des données, vous avez le droit de :
              </p>
              <ul className="list-disc pl-6 text-foreground/80 mb-6 space-y-2">
                <li>Accéder à vos données personnelles</li>
                <li>Demander la correction de vos données</li>
                <li>Demander la suppression de vos données</li>
                <li>Vous opposer au traitement de vos données</li>
              </ul>

              <h2 className="text-2xl font-bold text-primary mb-6">6. Cookies</h2>
              <p className="text-foreground/80 mb-6">
                Notre site utilise des cookies pour améliorer votre expérience de navigation. Vous pouvez configurer votre navigateur pour refuser les cookies.
              </p>

              <h2 className="text-2xl font-bold text-primary mb-6">7. Modifications</h2>
              <p className="text-foreground/80 mb-6">
                Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. Les modifications seront publiées sur cette page.
              </p>

              <h2 className="text-2xl font-bold text-primary mb-6">8. Contact</h2>
              <p className="text-foreground/80 mb-6">
                Pour toute question concernant cette politique de confidentialité ou pour exercer vos droits, contactez-nous :
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
