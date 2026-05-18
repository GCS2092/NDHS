import Link from 'next/link';

export default function ServicesPage() {
  const services = [
    {
      title: 'Logistique & Fret',
      description: 'Transport de marchandises à Dakar et vers les régions du Sénégal. Demande de devis en ligne.',
      href: '/logistique',
    },
    {
      title: 'BTP & Construction',
      description: 'Travaux de bâtiment, rénovation, construction neuve. Galerie de réalisations et devis gratuit.',
      href: '/btp',
    },
    {
      title: 'Matériaux BTP',
      description: 'Catalogue produits avec images (ciment, carreaux, matériaux divers).',
      href: '/materiaux',
    },
    {
      title: 'Véhicules',
      description: 'Vente et location de voitures, camions et utilitaires.',
      href: '/vehicules',
    },
    {
      title: 'Immobilier',
      description: 'Annonces vente et location de biens à Dakar avec photos et prix.',
      href: '/immobilier',
    },
    {
      title: 'Billets d\'avion',
      description: 'Recherche et réservation de vols avec accompagnement personnalisé.',
      href: '/billets',
    },
    {
      title: 'Assistance Visa',
      description: 'Accompagnement complet dans la constitution du dossier de demande de visa.',
      href: '/visa',
    },
    {
      title: 'Groupage Colis',
      description: 'Service d\'expédition internationale avec vente de kilos bagages.',
      href: '/groupage',
    },
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-primary mb-4 sm:mb-6">
          Nos Services
        </h1>
        <p className="text-lg sm:text-xl text-foreground/80 mb-8 sm:mb-12">
          Découvrez nos 8 secteurs d'activité pour répondre à tous vos besoins au Sénégal.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {services.map((service) => (
            <Link
              key={service.href}
              href={service.href}
              className="p-6 sm:p-8 bg-card rounded-lg border border-border hover:border-primary transition-all hover:shadow-lg group"
            >
              <h2 className="text-xl sm:text-2xl font-semibold text-foreground group-hover:text-primary transition-colors mb-4">
                {service.title}
              </h2>
              <p className="text-sm sm:text-base text-foreground/70">
                {service.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
