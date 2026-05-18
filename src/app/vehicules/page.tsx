import { getVehicules } from '@/sanity/client';
import { VehiculesClient } from './vehicules-client';

export default async function VehiculesPage() {
  let vehicules = [];

  try {
    vehicules = await getVehicules();
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    // Fallback to demo data on error
    vehicules = [
      {
        _id: 'demo-1',
        titre: 'Toyota Hilux 2024',
        description: 'Pick-up robuste pour travaux BTP et transport de marchandises.',
        prix: 15000000,
        type: 'utilitaire',
        location: false,
        photos: [{ asset: { url: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80' } }],
        disponible: true,
        kilometrage: 5000,
        annee: 2024,
      },
      {
        _id: 'demo-2',
        titre: 'Mercedes-Benz Sprinter',
        description: 'Fourgonnette spacieuse pour logistique et déménagement.',
        prix: 22000000,
        type: 'utilitaire',
        location: true,
        photos: [{ asset: { url: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=800&q=80' } }],
        disponible: true,
        kilometrage: 10000,
        annee: 2023,
      },
      {
        _id: 'demo-3',
        titre: 'Toyota Land Cruiser',
        description: 'SUV tout-terrain idéal pour les routes difficiles.',
        prix: 35000000,
        type: 'voiture',
        location: false,
        photos: [{ asset: { url: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80' } }],
        disponible: true,
        kilometrage: 2000,
        annee: 2024,
      },
    ];
  }

  return <VehiculesClient initialVehicules={vehicules} />;
}

