import { getSiteSettings, getVisas } from '@/sanity/client';
import { VisaClient } from './visa-client';

export default async function VisaPage() {
  const siteSettings = await getSiteSettings();
  const email = siteSettings?.contactEmail || 'contact@ndhs.sn';
  const whatsappNumber = siteSettings?.whatsappNumber || '+221771234567';
  const visas = await getVisas();

  return <VisaClient initialVisas={visas} email={email} whatsappNumber={whatsappNumber} />;
}
