import { createClient } from 'next-sanity';
import { createImageUrlBuilder } from '@sanity/image-url';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  stega: {
    studioUrl: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || '/studio',
  },
});

const builder = createImageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

// Queries Sanity
export async function getVehicules() {
  return await client.fetch(`*[_type == "vehicule"] | order(_createdAt desc)`);
}

export async function getVehiculeBySlug(slug: string) {
  return await client.fetch(`*[_type == "vehicule" && slug.current == $slug][0]`, { slug });
}

export async function getBiensImmobiliers() {
  return await client.fetch(`*[_type == "bienImmobilier"] | order(_createdAt desc)`);
}

export async function getBienImmobilierBySlug(slug: string) {
  return await client.fetch(`*[_type == "bienImmobilier" && slug.current == $slug][0]`, { slug });
}

export async function getProduitsBTP() {
  const produits = await client.fetch(`*[_type == "produitBTP"] | order(_createdAt desc)`);
  if (produits && produits.length > 0) return produits;
  
  // Mock data for testing
  return [
    {
      _id: 'mock-btp-1',
      nom: 'Ciment Portland 42.5',
      categorie: 'ciment',
      prix: 8500,
      unite: 'sac',
      stock: 500,
      description: 'Ciment Portland de haute qualité pour tous vos travaux de construction.',
    },
    {
      _id: 'mock-btp-2',
      nom: 'Carreaux grès cérame 60x60',
      categorie: 'carreaux',
      prix: 12000,
      unite: 'm²',
      stock: 200,
      description: 'Carreaux grès cérame antidérapants, idéaux pour sols intérieurs et extérieurs.',
    },
    {
      _id: 'mock-btp-3',
      nom: 'Fer à béton HA12',
      categorie: 'fer',
      prix: 4500,
      unite: 'tonne',
      stock: 50,
      description: 'Fer à béton haute adhérence pour armatures de construction.',
    },
    {
      _id: 'mock-btp-4',
      nom: 'Sable de carrière lavé',
      categorie: 'sable',
      prix: 2500,
      unite: 'm³',
      stock: 100,
      description: 'Sable fin lavé, idéal pour maçonnerie et enduits.',
    },
    {
      _id: 'mock-btp-5',
      nom: 'Gravier 10/20',
      categorie: 'sable',
      prix: 3000,
      unite: 'm³',
      stock: 80,
      description: 'Gravier concassé pour béton et fondations.',
    },
    {
      _id: 'mock-btp-6',
      nom: 'Briques creuses 20x20x40',
      categorie: 'autre',
      prix: 350,
      unite: 'unite',
      stock: 2000,
      description: 'Briques creuses légères pour murs de cloison et remplissage.',
    },
  ];
}

export async function getProduitBTPBySlug(slug: string) {
  return await client.fetch(`*[_type == "produitBTP" && slug.current == $slug][0]`, { slug });
}

export async function getServices() {
  return await client.fetch(`*[_type == "service"] | order(ordre asc)`);
}

export async function getDestinationsGroupage() {
  const destinations = await client.fetch(`*[_type == "destinationGroupage"] | order(ville asc)`);
  if (destinations && destinations.length > 0) return destinations;
  
  // Mock data for testing
  return [
    {
      _id: 'mock-groupage-1',
      ville: 'Paris',
      pays: 'France',
      tarifKilo: 8500,
      delai: '7-10 jours',
      frequenceDepart: '2 fois par semaine',
      description: 'Envoi de colis vers Paris avec suivi en temps réel.',
    },
    {
      _id: 'mock-groupage-2',
      ville: 'New York',
      pays: 'États-Unis',
      tarifKilo: 12000,
      delai: '10-14 jours',
      frequenceDepart: '1 fois par semaine',
      description: 'Envoi de colis vers New York avec assurance incluse.',
    },
    {
      _id: 'mock-groupage-3',
      ville: 'Madrid',
      pays: 'Espagne',
      tarifKilo: 7000,
      delai: '5-7 jours',
      frequenceDepart: '3 fois par semaine',
      description: 'Envoi rapide vers Madrid avec livraison à domicile.',
    },
    {
      _id: 'mock-groupage-4',
      ville: 'Dakar',
      pays: 'Sénégal',
      tarifKilo: 3000,
      delai: '2-3 jours',
      frequenceDepart: 'Quotidien',
      description: 'Livraison locale à Dakar et banlieue.',
    },
  ];
}

export async function getVisas() {
  const visas = await client.fetch(`*[_type == "visa"] | order(pays asc)`);
  if (visas && visas.length > 0) return visas;
  
  // Mock data for testing
  return [
    {
      _id: 'mock-visa-1',
      type: 'Visa Schengen',
      pays: 'France',
      documentsRequis: ['Passeport', 'Photos d\'identité', 'Justificatif de domicile', 'Assurance voyage', 'Preuve de moyens'],
      tarif: 85000,
      delai: '15-20 jours',
      description: 'Visa Schengen pour voyager dans les pays de l\'espace Schengen. Valable 90 jours.',
    },
    {
      _id: 'mock-visa-2',
      type: 'Visa Touriste',
      pays: 'États-Unis',
      documentsRequis: ['Passeport biométrique', 'Formulaire DS-160', 'Photo visa', 'Preuve de moyens financiers'],
      tarif: 185000,
      delai: '3-4 semaines',
      description: 'Visa touristique pour les États-Unis. Entretien obligatoire à l\'ambassade.',
    },
    {
      _id: 'mock-visa-3',
      type: 'Visa Étudiant',
      pays: 'Canada',
      documentsRequis: ['Lettre d\'admission', 'Preuve de fonds', 'Passeport', 'Photos', 'Certificat médical'],
      tarif: 150000,
      delai: '4-6 semaines',
      description: 'Visa étudiant pour le Canada. Permis d\'études requis.',
    },
  ];
}

export async function getFAQ() {
  return await client.fetch(`*[_type == "faq"] | order(service asc)`);
}

export async function getAnnoncesFeatured() {
  return await client.fetch(`*[_type == "annonceFeatured"] | order(ordre asc)`);
}

export async function getSiteSettings() {
  return await client.fetch(`*[_type == "siteSettings"][0]`);
}

export async function getBillets() {
  const billets = await client.fetch(`*[_type == "billet"] | order(destination asc)`);
  if (billets && billets.length > 0) return billets;
  
  // Mock data for testing
  return [
    {
      _id: 'mock-billet-1',
      destination: 'Paris',
      pays: 'France',
      compagnie: 'Air France',
      tarif: 350000,
      duree: '6h 30',
      escales: 'Direct',
      description: 'Vol direct Dakar-Paris avec Air France. Bagages inclus.',
    },
    {
      _id: 'mock-billet-2',
      destination: 'New York',
      pays: 'États-Unis',
      compagnie: 'Delta Airlines',
      tarif: 550000,
      duree: '12h 45',
      escales: '1 escale (Paris)',
      description: 'Vol Dakar-New York avec escale à Paris. Repas inclus.',
    },
    {
      _id: 'mock-billet-3',
      destination: 'Madrid',
      pays: 'Espagne',
      compagnie: 'Iberia',
      tarif: 280000,
      duree: '4h 15',
      escales: 'Direct',
      description: 'Vol direct Dakar-Madrid avec Iberia.',
    },
  ];
}

export async function getServicesLogistique() {
  const services = await client.fetch(`*[_type == "logistique"] | order(nom asc)`);
  if (services && services.length > 0) return services;
  
  // Mock data for testing
  return [
    {
      _id: 'mock-logistique-1',
      nom: 'Transport routier national',
      type: 'routier',
      tarif: 150000,
      zone: 'Sénégal et sous-région',
      capacite: '20 tonnes',
      description: 'Transport de marchandises par route dans tout le Sénégal et les pays voisins.',
    },
    {
      _id: 'mock-logistique-2',
      nom: 'Fret maritime international',
      type: 'maritime',
      tarif: 500000,
      zone: 'Europe, Asie, Amérique',
      capacite: 'Conteneur 20ft/40ft',
      description: 'Expédition par bateau vers les principaux ports du monde.',
    },
    {
      _id: 'mock-logistique-3',
      nom: 'Transport aérien express',
      type: 'aerien',
      tarif: 800000,
      zone: 'Mondial',
      capacite: '500kg',
      description: 'Transport rapide par avion pour les urgences et colis légers.',
    },
  ];
}

export async function getAboutPage() {
  const aboutPage = await client.fetch(`*[_type == "aboutPage"][0]`);
  if (aboutPage) return aboutPage;
  
  // Mock data for testing
  return {
    _id: 'mock-about-page',
    title: 'À propos de NDHS',
    subtitle: 'Votre partenaire multiservices de confiance au Sénégal',
    story: [
      {
        _type: 'block',
        children: [
          { _type: 'span', text: 'Fondée en 2020, NDHS (Niaye Dany Henry Services) est née de la vision d\'offrir des services de qualité supérieure aux particuliers et entreprises du Sénégal et de la sous-région.' }
        ]
      },
      {
        _type: 'block',
        children: [
          { _type: 'span', text: 'Notre expertise couvre plusieurs domaines : transport, logistique, immobilier, construction, et services d\'assistance pour les voyages.' }
        ]
      }
    ],
    mission: 'Faciliter la vie de nos clients en offrant des solutions multiservices innovantes, fiables et accessibles.',
    vision: 'Devenir le leader des services multiservices au Sénégal et en Afrique de l\'Ouest.',
    values: [
      { title: 'Qualité', description: 'Excellence dans chaque service rendu' },
      { title: 'Confiance', description: 'Transparence et intégrité dans nos relations' },
      { title: 'Innovation', description: 'Solutions modernes adaptées à vos besoins' },
      { title: 'Engagement', description: 'Satisfaction client garantie' }
    ],
    team: [
      { name: 'Niaye Dany Henry', role: 'Fondateur & Directeur Général' },
      { name: 'Équipe NDHS', role: 'Professionnels dévoués' }
    ],
    stats: [
      { label: 'Clients satisfaits', value: '500+' },
      { label: 'Services proposés', value: '8' },
      { label: 'Années d\'expérience', value: '4+' },
      { label: 'Pays desservis', value: '10+' }
    ]
  };
}
