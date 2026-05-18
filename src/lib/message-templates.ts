// Message templates for WhatsApp and Email
// These templates contain all necessary steps and information to help clients

export interface MessageData {
  fullName: string;
  email: string;
  phone: string;
  [key: string]: any;
}

// Billet d'avion reservation template
export const getBilletReservationMessage = (data: MessageData, isCustom: boolean = false) => {
  const { fullName, email, phone, destination, departureDate, returnDate, passengers, flightClass, customRequest, budget, flexibility, compagnie, tarif } = data;

  if (isCustom) {
    return `
🛫 *RÉSERVATION PERSONNALISÉE - BILLET D'AVION*

👤 *Informations personnelles*
• Nom complet : ${fullName}
• Email : ${email}
• Téléphone : ${phone}

✈️ *Détails du voyage*
• Destination souhaitée : ${destination || 'Non spécifiée'}
• Date de départ souhaitée : ${departureDate || 'Non spécifiée'}
${returnDate ? `• Date de retour souhaitée : ${returnDate}` : ''}
• Nombre de passagers : ${passengers || '1'}
• Classe de vol : ${flightClass || 'Économique'}

${budget ? `💰 *Budget estimé :* ${budget} FCFA` : ''}
${flexibility ? `📅 *Flexibilité des dates :* ${flexibility}` : ''}

${customRequest ? `📝 *Demande personnalisée :*\n${customRequest}` : ''}

📋 *DOCUMENTS À FOURNIR*
• Copie du passeport (page photo)
• Préférences de vol (horaires, escales souhaitées)
• Services additionnels souhaités (repas, bagages supplémentaires)
• Mode de paiement préféré

📞 *PROCHAINES ÉTAPES*
1. Envoyer les documents demandés
2. Confirmer les disponibilités de vols
3. Recevoir les options et tarifs
4. Choisir et confirmer la réservation
5. Effectuer le paiement
6. Recevoir les billets électroniques

Merci pour votre confiance ! 🙏
NDHS - Niaye Dany Henry Services
`.trim();
  } else {
    return `
🛫 *RÉSERVATION DE BILLET D'AVION*

👤 *Informations personnelles*
• Nom complet : ${fullName}
• Email : ${email}
• Téléphone : ${phone}

✈️ *Vol sélectionné*
• Destination : ${destination}
${compagnie ? `• Compagnie : ${compagnie}` : ''}
${tarif ? `• Tarif : ${tarif.toLocaleString()} FCFA` : ''}
• Date de départ : ${departureDate || 'À confirmer'}
${returnDate ? `• Date de retour : ${returnDate}` : ''}
• Nombre de passagers : ${passengers || '1'}
• Classe : ${flightClass || 'Économique'}

📋 *DOCUMENTS À FOURNIR*
• Copie du passeport (page photo)
• Informations des passagers (noms complets, dates de naissance)
• Préférences de repas (si applicable)

📞 *PROCHAINES ÉTAPES*
1. Envoyer les documents demandés
2. Confirmer la disponibilité du vol
3. Effectuer le paiement
4. Recevoir les billets électroniques

Merci pour votre confiance ! 🙏
NDHS - Niaye Dany Henry Services
`.trim();
  }
};

// Visa request template
export const getVisaRequestMessage = (data: MessageData) => {
  const { fullName, email, phone, destination, travelDate, visaType, passportNumber, message } = data;

  return `
🛂 *DEMANDE DE VISA*

👤 *Informations personnelles*
• Nom complet : ${fullName}
• Email : ${email}
• Téléphone : ${phone}

🌍 *Détails du voyage*
• Destination : ${destination}
• Date de voyage prévue : ${travelDate}
• Type de visa demandé : ${visaType}
• Numéro de passeport : ${passportNumber}

${message ? `📝 *Message additionnel :*\n${message}` : ''}

📋 *DOCUMENTS NÉCESSAIRES*
• Passeport valide (minimum 6 mois)
• Photos d'identité récentes (format biométrique)
• Justificatif de domicile
• Assurance voyage
• Preuve de moyens financiers
• Lettre d'invitation (si applicable)
• Réservation d'hôtel (si applicable)
• Billet d'avion (si applicable)

📞 *PROCHAINES ÉTAPES*
1. Préparer tous les documents listés
2. Envoyer les documents scannés
3. Remplir le formulaire de demande
4. Payer les frais de visa
5. Suivi du dossier
6. Retrait du visa

Merci pour votre confiance ! 🙏
NDHS - Niaye Dany Henry Services
`.trim();
};

// Quote request template (general)
export const getDevisMessage = (data: MessageData) => {
  const { fullName, email, phone, subject, message } = data;

  return `
📋 *DEMANDE DE DEVIS*

👤 *Informations personnelles*
• Nom complet : ${fullName}
• Email : ${email}
• Téléphone : ${phone}

📝 *Détails de la demande*
• Sujet : ${subject}
• Description : ${message}

📞 *PROCHAINES ÉTAPES*
1. Analyse de votre demande
2. Envoi du devis détaillé
3. Discussion des options
4. Validation du devis
5. Signature du contrat
6. Démarrage du projet

Merci pour votre intérêt ! 🙏
NDHS - Niaye Dany Henry Services
`.trim();
};

// BTP Quote request template
export const getDevisBTPMessage = (data: MessageData) => {
  const { fullName, email, phone, projectType, location, materials, budget, timeline, message } = data;

  return `
🏗️ *DEVIS MATÉRIAUX BTP*

👤 *Informations personnelles*
• Nom complet : ${fullName}
• Email : ${email}
• Téléphone : ${phone}

📝 *Détails du projet*
• Type de projet : ${projectType}
• Localisation : ${location}
• Matériaux nécessaires : ${materials}
${budget ? `• Budget estimé : ${budget} FCFA` : ''}
${timeline ? `• Délai souhaité : ${timeline}` : ''}

${message ? `📝 *Description additionnelle :*\n${message}` : ''}

📋 *INFORMATIONS À FOURNIR*
• Plans ou croquis du projet
• Liste détaillée des matériaux
• Quantités estimées
• Contraintes spécifiques (accès, délais)

📞 *PROCHAINES ÉTAPES*
1. Envoi des plans/détails
2. Visite sur site (si nécessaire)
3. Élaboration du devis détaillé
4. Validation et signature
5. Livraison des matériaux
6. Suivi de chantier

Merci pour votre confiance ! 🙏
NDHS - Niaye Dany Henry Services
`.trim();
};

// Logistics Quote request template
export const getDevisLogistiqueMessage = (data: MessageData) => {
  const { fullName, email, phone, serviceType, origin, destination, weight, dimensions, urgency, message } = data;

  return `
🚚 *DEVIS LOGISTIQUE*

👤 *Informations personnelles*
• Nom complet : ${fullName}
• Email : ${email}
• Téléphone : ${phone}

📝 *Détails du transport*
• Type de service : ${serviceType}
• Origine : ${origin}
• Destination : ${destination}
• Poids : ${weight}
• Dimensions : ${dimensions}
• Urgence : ${urgency}

${message ? `📝 *Message additionnel :*\n${message}` : ''}

📋 *INFORMATIONS À FOURNIR*
• Description détaillée de la marchandise
• Valeur déclarée
• Instructions spéciales de manutention
• Contraintes horaires

📞 *PROCHAINES ÉTAPES*
1. Confirmation des détails
2. Envoi du devis
3. Validation du devis
4. Organisation du transport
5. Suivi en temps réel
6. Livraison et confirmation

Merci pour votre confiance ! 🙏
NDHS - Niaye Dany Henry Services
`.trim();
};

// Kilos reservation template
export const getReservationKilosMessage = (data: MessageData) => {
  const { fullName, email, phone, destination, weight, departureDate, content, value, message } = data;

  return `
📦 *RÉSERVATION KILOS - ENVOI DE COLIS*

👤 *Informations personnelles*
• Nom complet : ${fullName}
• Email : ${email}
• Téléphone : ${phone}

📦 *Détails de l'envoi*
• Destination : ${destination}
• Poids total : ${weight}
• Date de départ souhaitée : ${departureDate}
• Contenu : ${content}
${value ? `• Valeur déclarée : ${value} FCFA` : ''}

${message ? `📝 *Message additionnel :*\n${message}` : ''}

📋 *INFORMATIONS À FOURNIR*
• Liste détaillée des articles
• Valeur de chaque article
• Photos des articles (si applicable)
• Adresse de livraison complète
• Instructions spéciales

📞 *PROCHAINES ÉTAPES*
1. Confirmer les détails de l'envoi
2. Pesage et contrôle des articles
3. Paiement des frais d'envoi
4. Étiquetage et emballage
5. Expédition
6. Suivi et livraison

Merci pour votre confiance ! 🙏
NDHS - Niaye Dany Henry Services
`.trim();
};

// Vehicules template
export const getVehiculeMessage = (data: MessageData) => {
  const { fullName, email, phone, vehicleType, brand, model, budget, timeframe, message } = data;

  return `
🚗 *INTÉRÊT VÉHICULE*

👤 *Informations personnelles*
• Nom complet : ${fullName}
• Email : ${email}
• Téléphone : ${phone}

🚗 *Détails du véhicule*
• Type de véhicule : ${vehicleType}
• Marque : ${brand}
• Modèle : ${model}
${budget ? `• Budget : ${budget} FCFA` : ''}
${timeframe ? `• Délai souhaité : ${timeframe}` : ''}

${message ? `📝 *Message additionnel :*\n${message}` : ''}

📋 *INFORMATIONS À FOURNIR*
• Préférences spécifiques (couleur, options)
• Utilisation prévue (personnelle, professionnelle)
• Mode de paiement préféré
• Lieu de livraison souhaité

📞 *PROCHAINES ÉTAPES*
1. Confirmer la disponibilité du véhicule
2. Visite/essai (si applicable)
3. Négociation du prix
4. Signature du contrat
5. Paiement
6. Livraison

Merci pour votre intérêt ! 🙏
NDHS - Niaye Dany Henry Services
`.trim();
};

// Immobilier template
export const getImmobilierMessage = (data: MessageData) => {
  const { fullName, email, phone, propertyType, location, budget, surface, bedrooms, message } = data;

  return `
🏠 *INTÉRÊT IMMOBILIER*

👤 *Informations personnelles*
• Nom complet : ${fullName}
• Email : ${email}
• Téléphone : ${phone}

🏠 *Détails du bien*
• Type de bien : ${propertyType}
• Localisation : ${location}
${budget ? `• Budget : ${budget} FCFA` : ''}
${surface ? `• Surface : ${surface} m²` : ''}
${bedrooms ? `• Nombre de chambres : ${bedrooms}` : ''}

${message ? `📝 *Message additionnel :*\n${message}` : ''}

📋 *INFORMATIONS À FOURNIR*
• Préférences spécifiques (étage, exposition)
• Critères importants (parking, ascenseur, etc.)
• Projet d'achat (résidence principale, investissement)
• Financement (apport personnel, crédit)

📞 *PROCHAINES ÉTAPES*
1. Visite du bien
2. Négociation du prix
3. Signature du compromis de vente
4. Obtention du financement
5. Signature de l'acte de vente
6. Remise des clés

Merci pour votre intérêt ! 🙏
NDHS - Niaye Dany Henry Services
`.trim();
};

// Groupage template
export const getGroupageMessage = (data: MessageData) => {
  const { fullName, email, phone, destination, weight, content, urgency, message } = data;

  return `
📦 *DEMANDE DE GROUPAGE*

👤 *Informations personnelles*
• Nom complet : ${fullName}
• Email : ${email}
• Téléphone : ${phone}

📦 *Détails de l'envoi*
• Destination : ${destination}
• Poids estimé : ${weight}
• Contenu : ${content}
• Urgence : ${urgency}

${message ? `📝 *Message additionnel :*\n${message}` : ''}

📋 *INFORMATIONS À FOURNIR*
• Liste détaillée des articles
• Dimensions des colis
• Valeur déclarée
• Adresse de ramassage
• Adresse de livraison

📞 *PROCHAINES ÉTAPES*
1. Devis gratuit sur mesure
2. Confirmation des tarifs
3. Enlèvement des colis
4. Expédition
5. Suivi en temps réel
6. Livraison

Merci pour votre confiance ! 🙏
NDHS - Niaye Dany Henry Services
`.trim();
};

// Services template
export const getServicesMessage = (data: MessageData) => {
  const { fullName, email, phone, serviceType, description, budget, timeline, message } = data;

  return `
🛎️ *DEMANDE DE SERVICE*

👤 *Informations personnelles*
• Nom complet : ${fullName}
• Email : ${email}
• Téléphone : ${phone}

🛎️ *Détails du service*
• Type de service : ${serviceType}
• Description : ${description}
${budget ? `• Budget : ${budget} FCFA` : ''}
${timeline ? `• Délai souhaité : ${timeline}` : ''}

${message ? `📝 *Message additionnel :*\n${message}` : ''}

📋 *INFORMATIONS À FOURNIR*
• Détails supplémentaires du besoin
• Contraintes spécifiques
• Préférences de communication

📞 *PROCHAINES ÉTAPES*
1. Analyse de votre demande
2. Proposition de solution
3. Validation et accord
4. Réalisation du service
5. Suivi et satisfaction

Merci pour votre confiance ! 🙏
NDHS - Niaye Dany Henry Services
`.trim();
};
