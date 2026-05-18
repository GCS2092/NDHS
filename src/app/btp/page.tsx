import { getSiteSettings, getProduitsBTP } from '@/sanity/client';
import { BTPClient } from './btp-client';

export default async function BTPPage() {
  const siteSettings = await getSiteSettings();
  const email = siteSettings?.contactEmail || 'contact@ndhs.sn';
  const whatsappNumber = siteSettings?.whatsappNumber || '+221771234567';
  const produits = await getProduitsBTP();

  return <BTPClient initialProduits={produits} email={email} whatsappNumber={whatsappNumber} />;
}
