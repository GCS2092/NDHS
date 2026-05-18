export default {
  name: 'logistique',
  title: 'Service Logistique',
  type: 'document',
  fields: [
    {
      name: 'nom',
      title: 'Nom du service',
      type: 'string',
    },
    {
      name: 'type',
      title: 'Type de transport',
      type: 'string',
      options: {
        list: [
          { title: 'Transport routier', value: 'routier' },
          { title: 'Transport maritime', value: 'maritime' },
          { title: 'Transport aérien', value: 'aerien' },
          { title: 'Transport ferroviaire', value: 'ferroviaire' },
        ],
      },
    },
    {
      name: 'tarif',
      title: 'Tarif (FCFA)',
      type: 'number',
    },
    {
      name: 'zone',
      title: 'Zone de desserte',
      type: 'string',
    },
    {
      name: 'capacite',
      title: 'Capacité (tonnes)',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
  ],
};
