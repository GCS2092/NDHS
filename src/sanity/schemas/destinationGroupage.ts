export default {
  name: 'destinationGroupage',
  title: 'Destination Groupage',
  type: 'document',
  fields: [
    {
      name: 'ville',
      title: 'Ville',
      type: 'string',
    },
    {
      name: 'pays',
      title: 'Pays',
      type: 'string',
    },
    {
      name: 'tarifKilo',
      title: 'Tarif par kilo (FCFA)',
      type: 'number',
    },
    {
      name: 'delai',
      title: 'Délai de livraison',
      type: 'string',
    },
    {
      name: 'frequenceDepart',
      title: 'Fréquence des départs',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
  ],
};
