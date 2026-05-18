export default {
  name: 'reservationBillet',
  title: 'Réservation de billet d\'avion',
  type: 'document',
  fields: [
    {
      name: 'fullName',
      title: 'Nom complet',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'phone',
      title: 'Téléphone',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'destination',
      title: 'Destination',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'departureDate',
      title: 'Date de départ',
      type: 'date',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'returnDate',
      title: 'Date de retour',
      type: 'date',
    },
    {
      name: 'passengers',
      title: 'Nombre de passagers',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(1),
    },
    {
      name: 'flightClass',
      title: 'Classe de vol',
      type: 'string',
      options: {
        list: [
          { title: 'Économique', value: 'economique' },
          { title: 'Business', value: 'business' },
          { title: 'Première', value: 'premiere' },
        ],
      },
      initialValue: 'economique',
    },
    {
      name: 'customRequest',
      title: 'Demande personnalisée',
      type: 'text',
    },
    {
      name: 'budget',
      title: 'Budget estimé (FCFA)',
      type: 'number',
    },
    {
      name: 'flexibility',
      title: 'Flexibilité des dates',
      type: 'string',
      options: {
        list: [
          { title: 'Dates flexibles (+/- 3 jours)', value: 'flexible' },
          { title: 'Très flexible (+/- 7 jours)', value: 'tres-flexible' },
          { title: 'Dates fixes uniquement', value: 'rigide' },
        ],
      },
    },
    {
      name: 'status',
      title: 'Statut',
      type: 'string',
      options: {
        list: [
          { title: 'En attente', value: 'pending' },
          { title: 'En cours', value: 'in-progress' },
          { title: 'Confirmé', value: 'confirmed' },
          { title: 'Annulé', value: 'cancelled' },
        ],
      },
      initialValue: 'pending',
    },
    {
      name: 'isCustom',
      title: 'Réservation personnalisée',
      type: 'boolean',
      initialValue: false,
    },
  ],
  orderings: [
    {
      title: 'Date de création (récent)',
      name: 'createdAtDesc',
      by: [{ field: '_createdAt', direction: 'desc' }],
    },
  ],
};
