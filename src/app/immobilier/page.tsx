import { getBiensImmobiliers } from '@/sanity/client';
import { ImmobilierClient } from './immobilier-client';

export default async function ImmobilierPage() {
  let biens = [];

  try {
    biens = await getBiensImmobiliers();
  } catch (error) {
    console.error('Error fetching real estate:', error);
    // Fallback to demo data on error
    biens = [
      {
        _id: 'demo-1',
        titre: 'Villa Dakar Plateau',
        description: 'Belle villa moderne avec piscine dans le quartier prestigieux de Dakar Plateau.',
        prix: 250000000,
        type: 'Vente',
        surface: 350,
        quartier: 'Dakar Plateau',
        photos: [{ asset: { url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80' } }],
        chambres: 5,
        sallesDeBain: 4,
      },
      {
        _id: 'demo-2',
        titre: 'Appartement Almadies',
        description: 'Appartement haut standing avec vue mer dans le quartier des Almadies.',
        prix: 85000000,
        type: 'Vente',
        surface: 120,
        quartier: 'Almadies',
        photos: [{ asset: { url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80' } }],
        chambres: 3,
        sallesDeBain: 2,
      },
      {
        _id: 'demo-3',
        titre: 'Bureau Mermoz',
        description: 'Bureau de 100m² dans immeuble moderne avec parking.',
        prix: 120000000,
        type: 'Location',
        surface: 100,
        quartier: 'Mermoz',
        photos: [{ asset: { url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80' } }],
        chambres: 0,
        sallesDeBain: 2,
      },
      {
        _id: 'demo-4',
        titre: 'Terrain Sacré-Cœur',
        description: 'Terrain constructible de 500m² dans le quartier de Sacré-Cœur.',
        prix: 75000000,
        type: 'Terrain',
        surface: 500,
        quartier: 'Sacre-Cœur',
        photos: [{ asset: { url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80' } }],
        chambres: 0,
        sallesDeBain: 0,
      },
    ];
  }

  return <ImmobilierClient initialBiens={biens} />;
}
