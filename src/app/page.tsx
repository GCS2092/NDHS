import Link from 'next/link';
import { PremiumCard } from '@/components/premium-card';
import { WhatsAppCTA } from '@/components/whatsapp-cta';
import { 
  Truck, 
  HardHat, 
  Package, 
  Car, 
  Building2, 
  Plane, 
  Ticket, 
  CreditCard,
  Shield,
  Clock,
  Users,
  Heart,
  MessageCircle
} from 'lucide-react';
import { getSiteSettings } from '@/sanity/client';

export default async function Home() {
  const siteSettings = await getSiteSettings();
  
  const services = [
    { 
      title: 'Logistique & Fret', 
      href: '/logistique',
      description: 'Transport de marchandises à Dakar et vers les régions du Sénégal'
    },
    { 
      title: 'BTP & Construction', 
      href: '/btp',
      description: 'Travaux de bâtiment, rénovation, construction neuve'
    },
    { 
      title: 'Matériaux BTP', 
      href: '/materiaux',
      description: 'Vente de matériaux de construction et carrelage'
    },
    { 
      title: 'Véhicules', 
      href: '/vehicules',
      description: 'Vente et location de véhicules neufs et d\'occasion'
    },
    { 
      title: 'Immobilier', 
      href: '/immobilier',
      description: 'Achat, vente et location de biens immobiliers'
    },
    { 
      title: 'Billets d\'avion', 
      href: '/billets',
      description: 'Recherche et réservation de vols avec accompagnement'
    },
    { 
      title: 'Assistance Visa', 
      href: '/visa',
      description: 'Accompagnement complet pour vos demandes de visa'
    },
    { 
      title: 'Groupage Colis', 
      href: '/groupage',
      description: 'Service d\'expédition internationale avec vente de kilos'
    },
  ];

  const trustBadges = [
    { icon: Shield, label: 'Fiabilité et Sécurité' },
    { icon: Clock, label: 'Réponse rapide' },
    { icon: Users, label: 'Accompagnement personnalisé' },
    { icon: Heart, label: 'Satisfaction client' },
  ];

  const whatsappNumber = siteSettings?.whatsappNumber || '+221771234567';
  const cleanWhatsAppNumber = whatsappNumber.replace(/[^0-9]/g, '');

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Column - Text */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary leading-tight">
                8 SERVICES,<br />
                <span className="text-primary">UNE SEULE SOLUTION</span>
              </h1>
              <p className="text-lg text-foreground/70 max-w-xl">
                Votre partenaire multi-services de confiance au Sénégal. Logistique, BTP, véhicules, immobilier, et bien plus encore.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/services">
                  <button className="bg-secondary text-primary px-6 py-2.5 rounded-full font-semibold hover:bg-yellow-400 transition-colors w-full sm:w-auto text-sm">
                    Découvrir nos services
                  </button>
                </Link>
                <a href={`https://wa.me/${cleanWhatsAppNumber}?text=${encodeURIComponent('Bonjour, je souhaite avoir plus d\'informations sur vos services.')}`} target="_blank" rel="noopener noreferrer">
                  <button className="border-2 border-primary text-primary px-6 py-2.5 rounded-full font-semibold hover:bg-primary hover:text-white transition-colors flex items-center justify-center gap-2 w-full sm:w-auto text-sm">
                    <MessageCircle className="w-4 h-4" />
                    Nous écrire sur WhatsApp
                  </button>
                </a>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-6">
                {trustBadges.map((badge, index) => {
                  const Icon = badge.icon;
                  return (
                    <div key={index} className="flex flex-col items-center text-center">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-1.5">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-xs font-medium text-foreground/80">{badge.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column - Images */}
            <div className="relative">
              <div className="aspect-[4/3] md:aspect-square lg:aspect-[4/3] bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl overflow-hidden relative max-h-[400px]">
                <div className="absolute inset-0">
                  <img 
                    src="https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=800&q=80"
                    alt="Dakar Sénégal - Monument de la Renaissance"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-1.5 drop-shadow-lg">NDHS</div>
                    <div className="text-secondary font-semibold text-lg md:text-xl drop-shadow-lg">Multi-Services</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">
              Nos 8 Services
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Des solutions complètes pour tous vos besoins professionnels et personnels
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Link key={service.href} href={service.href}>
                <PremiumCard className="h-full relative">
                  <div className="absolute top-4 left-4 w-8 h-8 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center z-10">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <div className="flex flex-col items-center text-center h-full pt-8">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 text-primary">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-primary font-bold">{index + 1}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                    <p className="text-foreground/70 text-sm">{service.description}</p>
                  </div>
                </PremiumCard>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="bg-primary py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 divide-y md:divide-y-0 md:divide-x divide-white/20">
            <div className="flex flex-col items-center md:items-start text-center md:text-left pt-4 md:pt-0">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <span className="text-3xl font-bold text-white">+1000</span>
              </div>
              <span className="text-white/80 text-sm">Clients satisfaits</span>
            </div>
            <div className="flex flex-col items-center md:items-start text-center md:text-left pt-4 md:pt-0">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                  <Package className="w-5 h-5 text-primary" />
                </div>
                <span className="text-3xl font-bold text-white">8</span>
              </div>
              <span className="text-white/80 text-sm">Services complets</span>
            </div>
            <div className="flex flex-col items-center md:items-start text-center md:text-left pt-4 md:pt-0">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <span className="text-3xl font-bold text-white">+5 ans</span>
              </div>
              <span className="text-white/80 text-sm">D'expérience</span>
            </div>
            <div className="flex flex-col items-center md:items-start text-center md:text-left pt-4 md:pt-0">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-primary" />
                </div>
                <span className="text-xl font-bold text-white">Dakar Sénégal</span>
              </div>
              <span className="text-white/80 text-sm">Présence locale</span>
            </div>
            <div className="flex flex-col items-center md:items-start text-center md:text-left pt-4 md:pt-0">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 text-primary" />
                </div>
                <span className="text-lg font-bold text-white">Support 7j/7</span>
              </div>
              <span className="text-white/80 text-sm">Toujours à votre écoute</span>
            </div>
          </div>
        </div>
      </section>

      <WhatsAppCTA />
    </div>
  );
}
