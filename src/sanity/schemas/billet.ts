export default {
  name: 'billet',
  title: 'Billet d\'avion',
  type: 'document',
  fields: [
    {
      name: 'destination',
      title: 'Destination',
      type: 'string',
    },
    {
      name: 'pays',
      title: 'Pays',
      type: 'string',
    },
    {
      name: 'compagnie',
      title: 'Compagnie aérienne',
      type: 'string',
    },
    {
      name: 'tarif',
      title: 'Tarif (FCFA)',
      type: 'number',
    },
    {
      name: 'duree',
      title: 'Durée du vol',
      type: 'string',
    },
    {
      name: 'escales',
      title: 'Escales',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
  ],
};
