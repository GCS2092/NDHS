"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Truck, 
  Building2, 
  Package, 
  Box, 
  Plane, 
  Ticket, 
  CreditCard, 
  Heart, 
  ShoppingBag, 
  Menu, 
  X, 
  Phone,
  Mail,
  Users,
  Home
} from 'lucide-react';
import { useCartStore } from '@/stores/cart-store';
import { useWishlistStore } from '@/stores/wishlist-store';
import { ThemeToggle } from '@/components/theme-toggle';

const services = [
  { href: '/vehicules', title: 'Véhicules', description: 'Vente et location de véhicules', icon: Truck },
  { href: '/immobilier', title: 'Immobilier', description: 'Biens immobiliers et locations', icon: Building2 },
  { href: '/materiaux', title: 'Matériaux BTP', description: 'Matériaux de construction', icon: Package },
  { href: '/logistique', title: 'Logistique', description: 'Transport et fret', icon: Box },
  { href: '/billets', title: 'Billets d\'avion', description: 'Vols et réservations', icon: Plane },
  { href: '/visa', title: 'Assistance Visa', description: 'Formalités et visas', icon: Ticket },
  { href: '/groupage', title: 'Groupage Colis', description: 'Envoi de colis', icon: CreditCard },
  { href: '/a-propos', title: 'À propos', description: 'Qui sommes-nous', icon: Users },
  { href: '/services', title: 'Tous nos services', description: 'Découvrir tous nos services', icon: Home },
];

const actionItems = [
  { href: '/wishlist', label: 'Wishlist', icon: Heart },
  { href: '/panier', label: 'Panier', icon: ShoppingBag },
];

function CartBadge({ count }: { count: number }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  
  if (count === 0) return null;

  return (
    <span className="absolute -top-0.5 -right-0.5 bg-primary text-secondary text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold shadow-sm">
      {count}
    </span>
  );
}

function WishlistBadge({ count }: { count: number }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  
  if (count === 0) return null;

  return (
    <span className="absolute -top-0.5 -right-0.5 bg-secondary text-primary text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
      {count}
    </span>
  );
}

export function Navigation() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const getWishlistCount = useWishlistStore((state) => state.items.length);

  useEffect(() => {
    setMounted(true);
  }, []);

  const cartCount = getTotalItems();
  const wishlistCount = getWishlistCount;

  return (
    <>
      {/* Desktop/Tablet Navigation - Top */}
      <nav className="hidden md:flex fixed top-0 left-0 right-0 bg-primary z-50" role="navigation" aria-label="Navigation principale">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-3 shrink-0" aria-label="NDHS Multi-Services - Accueil">
              <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                <span className="text-primary font-bold text-2xl">N</span>
              </div>
              <div className="hidden sm:block">
                <span className="font-bold text-xl text-white">NDHS</span>
                <p className="text-secondary text-xs font-medium">MULTI-SERVICES</p>
              </div>
            </Link>
            
            <div className="flex items-center gap-4 lg:gap-6 overflow-x-auto flex-1 mx-4 no-scrollbar">
              <Link
                href="/"
                className={`text-white hover:text-secondary transition-colors text-sm font-medium relative shrink-0 whitespace-nowrap ${
                  pathname === '/' ? 'text-secondary' : ''
                }`}
                aria-label="Page d'accueil"
                aria-current={pathname === '/' ? 'page' : undefined}
              >
                Accueil
                {pathname === '/' && <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-secondary" />}
              </Link>
              
              {services.map((service) => {
                const Icon = service.icon;
                const isActive = pathname === service.href;
                return (
                  <Link
                    key={service.href}
                    href={service.href}
                    className={`text-white hover:text-secondary transition-colors text-sm font-medium relative shrink-0 whitespace-nowrap ${
                      isActive ? 'text-secondary' : ''
                    }`}
                    aria-label={`Page ${service.title} - ${service.description}`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {service.title}
                    {isActive && <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-secondary" />}
                  </Link>
                );
              })}

              <Link
                href="/contact"
                className={`text-white hover:text-secondary transition-colors text-sm font-medium relative shrink-0 whitespace-nowrap ${
                  pathname === '/contact' ? 'text-secondary' : ''
                }`}
                aria-label="Page de contact"
                aria-current={pathname === '/contact' ? 'page' : undefined}
              >
                Contact
                {pathname === '/contact' && <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-secondary" />}
              </Link>
            </div>

            <div className="flex items-center gap-3 lg:gap-4 shrink-0">
              {actionItems.map((item) => {
                const Icon = item.icon;
                const count = item.href === '/panier' ? cartCount : wishlistCount;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 shrink-0 ${
                      isActive 
                        ? 'bg-secondary text-primary' 
                        : 'text-white hover:bg-white/10'
                    }`}
                    aria-label={`${item.label} ${mounted && count > 0 ? `(${count} articles)` : ''}`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <Icon className="w-5 h-5" aria-hidden="true" />
                    {item.href === '/panier' ? <CartBadge count={count} /> : <WishlistBadge count={count} />}
                  </Link>
                );
              })}
              <Link
                href="/contact"
                className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 shrink-0 ${
                  pathname === '/contact' 
                    ? 'bg-secondary text-primary' 
                    : 'text-white hover:bg-white/10'
                }`}
                aria-label="Contact"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation - Bottom */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-primary z-50 border-t border-white/10" role="navigation" aria-label="Navigation mobile">
        <div className="flex items-center justify-around py-3 px-1">
          <Link
            href="/"
            className={`flex flex-col items-center gap-1 px-1.5 py-1.5 rounded-lg transition-colors min-w-0 ${
              pathname === '/' 
                ? 'text-secondary' 
                : 'text-white hover:text-secondary'
            }`}
            aria-label="Page d'accueil"
            aria-current={pathname === '/' ? 'page' : undefined}
          >
            <Home className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
            <span className="text-[10px] font-medium leading-tight text-center truncate w-full">Accueil</span>
          </Link>
          
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="flex flex-col items-center gap-1 px-1.5 py-1.5 rounded-lg text-white hover:text-secondary min-w-0"
            aria-label="Ouvrir le menu"
            aria-expanded={isMobileMenuOpen}
          >
            <Menu className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
            <span className="text-[10px] font-medium leading-tight">Menu</span>
          </button>

          {actionItems.map((item) => {
            const Icon = item.icon;
            const count = item.href === '/panier' ? cartCount : wishlistCount;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex flex-col items-center gap-1 px-1.5 py-1.5 rounded-lg transition-colors min-w-0 ${
                  isActive 
                    ? 'text-secondary' 
                    : 'text-white hover:text-secondary'
                }`}
                aria-label={`${item.label} ${count > 0 ? `(${count} articles)` : ''}`}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                {item.href === '/panier' ? <CartBadge count={count} /> : <WishlistBadge count={count} />}
                <span className="text-[10px] font-medium leading-tight">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Mobile Menu Modal */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black/50 z-50 flex items-end justify-center" role="dialog" aria-modal="true" aria-labelledby="mobile-menu-title">
          <div className="bg-primary w-full max-h-[80vh] rounded-t-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 id="mobile-menu-title" className="text-xl font-bold text-white">Menu</h2>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Fermer le menu"
              >
                <X className="w-6 h-6 text-white" aria-hidden="true" />
              </button>
            </div>
            
            <div className="space-y-2">
              {services.map((service) => {
                const Icon = service.icon;
                const isActive = pathname === service.href;
                return (
                  <Link
                    key={service.href}
                    href={service.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-secondary text-primary' 
                        : 'text-white hover:bg-white/10'
                    }`}
                    aria-label={`${service.title} - ${service.description}`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <Icon className="w-5 h-5" aria-hidden="true" />
                    <span className="font-medium">{service.title}</span>
                  </Link>
                );
              })}
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  pathname === '/contact' 
                    ? 'bg-secondary text-primary' 
                    : 'text-white hover:bg-white/10'
                }`}
                aria-label="Page de contact"
                aria-current={pathname === '/contact' ? 'page' : undefined}
              >
                <span className="font-medium">Contact</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
