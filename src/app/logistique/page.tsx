import { getSiteSettings, getServicesLogistique } from '@/sanity/client';
import { LogistiqueClient } from './logistique-client';

export default async function LogistiquePage() {
  const siteSettings = await getSiteSettings();
  const email = siteSettings?.contactEmail || 'contact@ndhs.sn';
  const whatsappNumber = siteSettings?.whatsappNumber || '+221771234567';
  const services = await getServicesLogistique();

  return <LogistiqueClient initialServices={services} email={email} whatsappNumber={whatsappNumber} />;
}
