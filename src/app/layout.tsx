import type { Metadata } from "next";
import { jakartaSans, dmSerif } from "@/lib/fonts";
import "./globals.css";
import { getSiteSettings } from "@/sanity/client";
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { WhatsAppCTA } from '@/components/whatsapp-cta';
import { Toast } from '@/components/toast';
import { SchemaOrg } from '@/components/schema-org';
import { ThemeProvider } from '@/components/theme-provider';
import { Analytics } from '@/components/google-analytics';
import Link from "next/link";
import { Mail } from "lucide-react";
import { defaultSEO } from '@/config/seo';

export const metadata: Metadata = {
  title: defaultSEO.title,
  description: defaultSEO.description,
  metadataBase: new URL(defaultSEO.canonical),
  openGraph: defaultSEO.openGraph,
  twitter: defaultSEO.twitter,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteSettings = await getSiteSettings();
  const whatsappNumber = siteSettings?.whatsappNumber || "+221771234567";
  const socialMedia = siteSettings?.socialMedia || [];

  return (
    <html lang="fr" className={`${jakartaSans.variable} ${dmSerif.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <SchemaOrg />
      </head>
      <body className="min-h-screen flex flex-col font-sans">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} storageKey="ndhs-theme">
          <Analytics />
          <Navigation />
          <main className="flex-1 md:pt-20 pb-16 md:pb-0 relative z-10">
            {children}
          </main>
          <Footer socialMedia={socialMedia} />
          <div className="fixed bottom-24 right-6 z-40">
            <Link
              href="/contact"
              className="bg-secondary text-primary px-4 py-3 rounded-full font-semibold hover:bg-yellow-400 transition-colors flex items-center gap-2 shadow-lg"
            >
              <Mail className="w-5 h-5" />
              <span className="hidden sm:inline">Contact</span>
            </Link>
          </div>
          <WhatsAppCTA whatsappNumber={whatsappNumber} />
          <Toast />
        </ThemeProvider>
      </body>
    </html>
  );
}
