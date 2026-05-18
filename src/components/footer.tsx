import Link from 'next/link';
import { Globe } from 'lucide-react';

interface FooterProps {
  socialMedia?: { platform: string; url: string }[];
}

export function Footer({ socialMedia = [] }: FooterProps) {
  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'facebook':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
          </svg>
        );
      case 'instagram':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
        );
      case 'linkedin':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
            <rect x="2" y="9" width="4" height="12"></rect>
            <circle cx="4" cy="4" r="2"></circle>
          </svg>
        );
      case 'tiktok':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.51 1.33-.32 2.88.59 4.02.74.93 1.94 1.53 3.12 1.44.88-.07 1.74-.49 2.35-1.16.67-.72.98-1.67.95-2.64-.03-3.16-.01-6.33-.01-9.49z"/>
          </svg>
        );
      case 'youtube':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <footer className="bg-primary py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* URL with globe icon */}
          <div className="flex items-center gap-2 text-white">
            <Globe className="w-5 h-5" />
            <span className="font-semibold">www.ndhs.sn</span>
          </div>

          {/* Legal links */}
          <div className="flex items-center gap-4 text-sm">
            <Link href="/cgv" className="text-white hover:text-secondary transition-colors">
              CGV
            </Link>
            <Link href="/politique-confidentialite" className="text-white hover:text-secondary transition-colors">
              Politique de confidentialité
            </Link>
          </div>

          {/* Social media icons from Sanity */}
          <div className="flex items-center gap-4">
            {socialMedia.length > 0 ? (
              socialMedia.map((social) => (
                <Link
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-secondary transition-colors"
                  aria-label={social.platform}
                >
                  {getSocialIcon(social.platform)}
                </Link>
              ))
            ) : (
              // Fallback to default social links if none configured in Sanity
              <>
                <Link href="#" className="text-white hover:text-secondary transition-colors" aria-label="Facebook">
                  {getSocialIcon('facebook')}
                </Link>
                <Link href="#" className="text-white hover:text-secondary transition-colors" aria-label="Instagram">
                  {getSocialIcon('instagram')}
                </Link>
                <Link href="#" className="text-white hover:text-secondary transition-colors" aria-label="LinkedIn">
                  {getSocialIcon('linkedin')}
                </Link>
                <Link href="#" className="text-white hover:text-secondary transition-colors" aria-label="TikTok">
                  {getSocialIcon('tiktok')}
                </Link>
                <Link href="#" className="text-white hover:text-secondary transition-colors" aria-label="YouTube">
                  {getSocialIcon('youtube')}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
