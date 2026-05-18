"use client"

import { useCartStore } from '@/stores/cart-store';
import { ShoppingBag, Trash2, Plus, Minus, Mail, MessageCircle, X, PackagePlus } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { PageHeader } from '@/components/page-header';
import { BackButton } from '@/components/back-button';
import { getDestinationsGroupage, getVisas, getVehicules, getBiensImmobiliers, getProduitsBTP, getSiteSettings } from '@/sanity/client';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, getTotalPrice, getTotalItems, addToCart } = useCartStore();
  const [showContactModal, setShowContactModal] = useState(false);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [siteSettings, setSiteSettings] = useState<any>(null);
  const [customProduct, setCustomProduct] = useState({
    title: '',
    type: 'Autre',
    quantity: 1,
    // Dynamic fields
    subType: '',
    destination: '',
    country: '',
    surface: '',
    rooms: '',
    bathrooms: '',
    mileage: '',
    year: '',
    category: '',
    unit: '',
    stock: '',
    visaType: '',
    documents: '',
    delay: '',
    frequency: '',
    description: '',
  });

  // Fetch siteSettings
  useEffect(() => {
    async function fetchSiteSettings() {
      try {
        const settings = await getSiteSettings();
        setSiteSettings(settings);
      } catch (error) {
        console.error('Error fetching site settings:', error);
      }
    }
    fetchSiteSettings();
  }, []);

  const whatsappNumber = siteSettings?.whatsappNumber || '+221777777777';
  const email = siteSettings?.contactEmail || 'contact@ndhs-services.com';
  const cleanWhatsAppNumber = whatsappNumber.replace(/[^0-9]/g, '');

  // Fetch Sanity data for dynamic options
  const [sanityData, setSanityData] = useState({
    destinations: [],
    visas: [],
    vehicules: [],
    biens: [],
    produitsBTP: [],
  });

  useEffect(() => {
    async function fetchSanityData() {
      try {
        const [destinations, visas, vehicules, biens, produitsBTP] = await Promise.all([
          getDestinationsGroupage(),
          getVisas(),
          getVehicules(),
          getBiensImmobiliers(),
          getProduitsBTP(),
        ]);
        setSanityData({ destinations, visas, vehicules, biens, produitsBTP });
      } catch (error) {
        console.error('Error fetching Sanity data:', error);
      }
    }
    fetchSanityData();
  }, []);

  const handleContactEmail = () => {
    const subject = encodeURIComponent('Nouvelle commande - NDHS Services');
    const body = encodeURIComponent(
      `Bonjour NDHS Services,\n\nJe souhaite passer une commande pour les articles suivants :\n\n` +
      items.map(item => `- ${item.title} (${item.type}) - Quantité: ${item.quantity} - Prix: FCFA ${item.price?.toLocaleString()}`).join('\n') +
      `\n\nTotal: FCFA ${getTotalPrice().toLocaleString()}\n\nMerci de me contacter pour finaliser la commande.`
    );
    window.open(`mailto:${email}?subject=${subject}&body=${body}`);
  };

  const handleContactWhatsApp = () => {
    const message = encodeURIComponent(
      `Bonjour NDHS Services,\n\nJe souhaite passer une commande pour les articles suivants :\n\n` +
      items.map(item => `- ${item.title} (${item.type}) - Quantité: ${item.quantity} - Prix: FCFA ${item.price?.toLocaleString()}`).join('\n') +
      `\n\nTotal: FCFA ${getTotalPrice().toLocaleString()}\n\nMerci de me contacter pour finaliser la commande.`
    );
    window.open(`https://wa.me/${cleanWhatsAppNumber}?text=${message}`, '_blank');
  };

  const handleCheckout = () => {
    setShowContactModal(true);
  };

  const handleAddCustomProduct = () => {
    if (!customProduct.title) {
      return;
    }

    const customId = `custom-${Date.now()}`;
    addToCart({
      id: customId,
      title: customProduct.title,
      type: customProduct.type,
      price: undefined, // No price for custom products
      imageUrl: undefined,
    });

    // Update quantity if more than 1
    if (customProduct.quantity > 1) {
      updateQuantity(customId, customProduct.quantity);
    }

    setCustomProduct({
      title: '',
      type: 'Autre',
      quantity: 1,
      subType: '',
      destination: '',
      country: '',
      surface: '',
      rooms: '',
      bathrooms: '',
      mileage: '',
      year: '',
      category: '',
      unit: '',
      stock: '',
      visaType: '',
      documents: '',
      delay: '',
      frequency: '',
      description: '',
    });
    setShowAddProductModal(false);
  };

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Mon Panier"
        description="Vos articles sélectionnés prêts à être commandés."
        icon={<ShoppingBag className="w-8 h-8" />}
      />
      
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <BackButton href="/" label="Retour à l'accueil" />
          
          <div className="mt-8">
            <p className="text-lg text-foreground/70 mb-8">
              {getTotalItems()} {getTotalItems() === 1 ? 'article' : 'articles'} dans votre panier
            </p>

            {items.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-xl text-muted-foreground">Votre panier est vide</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-4">
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-card rounded-lg border border-border p-4 flex gap-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                      >
                        {item.imageUrl && (
                          <div className="w-24 h-24 bg-muted relative rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={item.imageUrl}
                              alt={item.title}
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">{item.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{item.type}</p>
                          <p className="text-lg font-bold text-primary mb-3">
                            FCFA {item.price?.toLocaleString()}
                          </p>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-8 h-8 flex items-center justify-center bg-secondary/10 hover:bg-secondary/20 rounded-lg transition-colors"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="w-8 text-center font-medium">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-8 h-8 flex items-center justify-center bg-secondary/10 hover:bg-secondary/20 rounded-lg transition-colors"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="flex items-center gap-2 px-3 py-2 bg-destructive/10 hover:bg-destructive/20 text-destructive rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                              Supprimer
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="lg:col-span-1">
                    <div className="bg-card rounded-lg border border-border p-6 sticky top-20 hover:shadow-lg transition-all duration-300">
                      <h2 className="text-xl font-bold mb-4">Récapitulatif</h2>
                      <div className="space-y-3 mb-6">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Sous-total</span>
                          <span className="font-medium">FCFA {getTotalPrice().toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Livraison</span>
                          <span className="font-medium">Calculé à la commande</span>
                        </div>
                        <div className="border-t pt-3">
                          <div className="flex justify-between text-lg font-bold">
                            <span>Total</span>
                            <span className="text-primary">FCFA {getTotalPrice().toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={handleCheckout}
                        className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors mb-3"
                      >
                        Passer la commande
                      </button>
                      <button
                        onClick={() => setShowAddProductModal(true)}
                        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:bg-secondary/90 transition-colors mb-3"
                      >
                        <PackagePlus className="w-4 h-4" />
                        Ajouter un produit
                      </button>
                      <button
                        onClick={clearCart}
                        className="w-full px-6 py-3 bg-destructive text-destructive-foreground rounded-lg font-semibold hover:bg-destructive/90 transition-colors"
                      >
                        Vider le panier
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      <AnimatePresence>
        {showContactModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={() => setShowContactModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-card rounded-lg border border-border p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Choisir le mode de contact</h2>
                <button
                  onClick={() => setShowContactModal(false)}
                  className="p-2 hover:bg-secondary rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <p className="text-muted-foreground mb-6">
                Nous vous contacterons pour finaliser votre commande après réception de votre message.
              </p>

              <div className="space-y-3">
                <button
                  onClick={handleContactEmail}
                  className="w-full flex items-center gap-3 px-4 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  Contacter par Email
                </button>
                <button
                  onClick={handleContactWhatsApp}
                  className="w-full flex items-center gap-3 px-4 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  Contacter par WhatsApp
                </button>
              </div>

              <div className="mt-6 p-4 bg-secondary/10 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Note :</strong> Les détails de votre panier seront inclus automatiquement dans le message.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Custom Product Modal */}
      <AnimatePresence>
        {showAddProductModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={() => setShowAddProductModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-card rounded-lg border border-border p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Ajouter un produit personnalisé</h2>
                <button
                  onClick={() => setShowAddProductModal(false)}
                  className="p-2 hover:bg-secondary rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Nom du produit</label>
                  <input
                    type="text"
                    value={customProduct.title}
                    onChange={(e) => setCustomProduct({ ...customProduct, title: e.target.value })}
                    className="w-full px-4 py-2 bg-secondary/10 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Ex: Service de consultation"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Type</label>
                  <select
                    value={customProduct.type}
                    onChange={(e) => setCustomProduct({ ...customProduct, type: e.target.value })}
                    className="w-full px-4 py-2 bg-secondary/10 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="Autre">Autre</option>
                    <option value="Véhicule">Véhicule</option>
                    <option value="Bien immobilier">Bien immobilier</option>
                    <option value="Matériau">Matériau (BTP)</option>
                    <option value="Billet">Billet</option>
                    <option value="Visa">Visa</option>
                    <option value="Groupage">Groupage</option>
                    <option value="Service">Service</option>
                    <option value="Consultation">Consultation</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Logistique">Logistique</option>
                  </select>
                </div>

                {/* Dynamic fields based on type */}
                {customProduct.type === 'Véhicule' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-2">Sous-type</label>
                      <select
                        value={customProduct.subType}
                        onChange={(e) => setCustomProduct({ ...customProduct, subType: e.target.value })}
                        className="w-full px-4 py-2 bg-secondary/10 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Sélectionner...</option>
                        {Array.from(new Set(sanityData.vehicules.map((v: any) => v.type))).map((type: any) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Kilométrage (km)</label>
                      <input
                        type="number"
                        value={customProduct.mileage}
                        onChange={(e) => setCustomProduct({ ...customProduct, mileage: e.target.value })}
                        className="w-full px-4 py-2 bg-secondary/10 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Ex: 50000"
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Année</label>
                      <input
                        type="number"
                        value={customProduct.year}
                        onChange={(e) => setCustomProduct({ ...customProduct, year: e.target.value })}
                        className="w-full px-4 py-2 bg-secondary/10 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Ex: 2020"
                        min="1900"
                        max="2099"
                      />
                    </div>
                  </>
                )}

                {customProduct.type === 'Bien immobilier' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-2">Sous-type</label>
                      <select
                        value={customProduct.subType}
                        onChange={(e) => setCustomProduct({ ...customProduct, subType: e.target.value })}
                        className="w-full px-4 py-2 bg-secondary/10 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Sélectionner...</option>
                        {Array.from(new Set(sanityData.biens.map((b: any) => b.type))).map((type: any) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Surface (m²)</label>
                      <input
                        type="number"
                        value={customProduct.surface}
                        onChange={(e) => setCustomProduct({ ...customProduct, surface: e.target.value })}
                        className="w-full px-4 py-2 bg-secondary/10 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Ex: 100"
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Quartier</label>
                      <select
                        value={customProduct.destination}
                        onChange={(e) => setCustomProduct({ ...customProduct, destination: e.target.value })}
                        className="w-full px-4 py-2 bg-secondary/10 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Sélectionner...</option>
                        {Array.from(new Set(sanityData.biens.map((b: any) => b.quartier).filter(Boolean))).map((quartier: any) => (
                          <option key={quartier} value={quartier}>{quartier}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Nombre de chambres</label>
                      <input
                        type="number"
                        value={customProduct.rooms}
                        onChange={(e) => setCustomProduct({ ...customProduct, rooms: e.target.value })}
                        className="w-full px-4 py-2 bg-secondary/10 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Ex: 3"
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Salles de bain</label>
                      <input
                        type="number"
                        value={customProduct.bathrooms}
                        onChange={(e) => setCustomProduct({ ...customProduct, bathrooms: e.target.value })}
                        className="w-full px-4 py-2 bg-secondary/10 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Ex: 2"
                        min="0"
                      />
                    </div>
                  </>
                )}

                {customProduct.type === 'Visa' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-2">Type de visa</label>
                      <select
                        value={customProduct.visaType}
                        onChange={(e) => setCustomProduct({ ...customProduct, visaType: e.target.value })}
                        className="w-full px-4 py-2 bg-secondary/10 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Sélectionner...</option>
                        {Array.from(new Set(sanityData.visas.map((v: any) => v.type).filter(Boolean))).map((type: any) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Pays de destination</label>
                      <select
                        value={customProduct.country}
                        onChange={(e) => setCustomProduct({ ...customProduct, country: e.target.value })}
                        className="w-full px-4 py-2 bg-secondary/10 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Sélectionner...</option>
                        {Array.from(new Set(sanityData.visas.map((v: any) => v.pays).filter(Boolean))).map((pays: any) => (
                          <option key={pays} value={pays}>{pays}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Documents requis</label>
                      <input
                        type="text"
                        value={customProduct.documents}
                        onChange={(e) => setCustomProduct({ ...customProduct, documents: e.target.value })}
                        className="w-full px-4 py-2 bg-secondary/10 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Ex: Passeport, Photo"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Délai de traitement</label>
                      <select
                        value={customProduct.delay}
                        onChange={(e) => setCustomProduct({ ...customProduct, delay: e.target.value })}
                        className="w-full px-4 py-2 bg-secondary/10 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Sélectionner...</option>
                        {Array.from(new Set(sanityData.visas.map((v: any) => v.delai).filter(Boolean))).map((delai: any) => (
                          <option key={delai} value={delai}>{delai}</option>
                        ))}
                      </select>
                    </div>
                  </>
                )}

                {customProduct.type === 'Billet' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-2">Destination</label>
                      <input
                        type="text"
                        value={customProduct.destination}
                        onChange={(e) => setCustomProduct({ ...customProduct, destination: e.target.value })}
                        className="w-full px-4 py-2 bg-secondary/10 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Ex: Paris"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Pays</label>
                      <input
                        type="text"
                        value={customProduct.country}
                        onChange={(e) => setCustomProduct({ ...customProduct, country: e.target.value })}
                        className="w-full px-4 py-2 bg-secondary/10 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Ex: France"
                      />
                    </div>
                  </>
                )}

                {customProduct.type === 'Matériau' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-2">Catégorie</label>
                      <select
                        value={customProduct.category}
                        onChange={(e) => setCustomProduct({ ...customProduct, category: e.target.value })}
                        className="w-full px-4 py-2 bg-secondary/10 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Sélectionner...</option>
                        {Array.from(new Set(sanityData.produitsBTP.map((p: any) => p.categorie).filter(Boolean))).map((categorie: any) => (
                          <option key={categorie} value={categorie}>{categorie}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Unité</label>
                      <select
                        value={customProduct.unit}
                        onChange={(e) => setCustomProduct({ ...customProduct, unit: e.target.value })}
                        className="w-full px-4 py-2 bg-secondary/10 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Sélectionner...</option>
                        {Array.from(new Set(sanityData.produitsBTP.map((p: any) => p.unite).filter(Boolean))).map((unite: any) => (
                          <option key={unite} value={unite}>{unite}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Stock disponible</label>
                      <input
                        type="number"
                        value={customProduct.stock}
                        onChange={(e) => setCustomProduct({ ...customProduct, stock: e.target.value })}
                        className="w-full px-4 py-2 bg-secondary/10 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Ex: 100"
                        min="0"
                      />
                    </div>
                  </>
                )}

                {customProduct.type === 'Groupage' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-2">Ville</label>
                      <select
                        value={customProduct.destination}
                        onChange={(e) => setCustomProduct({ ...customProduct, destination: e.target.value })}
                        className="w-full px-4 py-2 bg-secondary/10 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Sélectionner...</option>
                        {Array.from(new Set(sanityData.destinations.map((d: any) => d.ville).filter(Boolean))).map((ville: any) => (
                          <option key={ville} value={ville}>{ville}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Pays</label>
                      <select
                        value={customProduct.country}
                        onChange={(e) => setCustomProduct({ ...customProduct, country: e.target.value })}
                        className="w-full px-4 py-2 bg-secondary/10 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Sélectionner...</option>
                        {Array.from(new Set(sanityData.destinations.map((d: any) => d.pays).filter(Boolean))).map((pays: any) => (
                          <option key={pays} value={pays}>{pays}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Délai de livraison</label>
                      <select
                        value={customProduct.delay}
                        onChange={(e) => setCustomProduct({ ...customProduct, delay: e.target.value })}
                        className="w-full px-4 py-2 bg-secondary/10 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Sélectionner...</option>
                        {Array.from(new Set(sanityData.destinations.map((d: any) => d.delai).filter(Boolean))).map((delai: any) => (
                          <option key={delai} value={delai}>{delai}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Fréquence des départs</label>
                      <select
                        value={customProduct.frequency}
                        onChange={(e) => setCustomProduct({ ...customProduct, frequency: e.target.value })}
                        className="w-full px-4 py-2 bg-secondary/10 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Sélectionner...</option>
                        {Array.from(new Set(sanityData.destinations.map((d: any) => d.frequenceDepart).filter(Boolean))).map((frequence: any) => (
                          <option key={frequence} value={frequence}>{frequence}</option>
                        ))}
                      </select>
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    value={customProduct.description}
                    onChange={(e) => setCustomProduct({ ...customProduct, description: e.target.value })}
                    className="w-full px-4 py-2 bg-secondary/10 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary min-h-[100px]"
                    placeholder="Détails supplémentaires..."
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Quantité</label>
                  <input
                    type="number"
                    value={customProduct.quantity}
                    onChange={(e) => setCustomProduct({ ...customProduct, quantity: parseInt(e.target.value) || 1 })}
                    className="w-full px-4 py-2 bg-secondary/10 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    min="1"
                  />
                </div>

                <button
                  onClick={handleAddCustomProduct}
                  disabled={!customProduct.title}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <PackagePlus className="w-5 h-5" />
                  Ajouter au panier
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

