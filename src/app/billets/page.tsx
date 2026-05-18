import { getSiteSettings, getBillets } from '@/sanity/client';
import { BilletsClient } from './billets-client';

export default async function BilletsPage() {
  const siteSettings = await getSiteSettings();
  const email = siteSettings?.contactEmail || 'contact@ndhs.sn';
  const whatsappNumber = siteSettings?.whatsappNumber || '+221771234567';
  const billets = await getBillets();

  return <BilletsClient initialBillets={billets} email={email} whatsappNumber={whatsappNumber} />;
}
