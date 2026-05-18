import { getSiteSettings, getDestinationsGroupage } from '@/sanity/client';
import { GroupageClient } from './groupage-client';

export default async function GroupagePage() {
  const siteSettings = await getSiteSettings();
  const email = siteSettings?.contactEmail || 'contact@ndhs.sn';
  const whatsappNumber = siteSettings?.whatsappNumber || '+221771234567';
  const destinations = await getDestinationsGroupage();

  return <GroupageClient initialDestinations={destinations} email={email} whatsappNumber={whatsappNumber} />;
}
