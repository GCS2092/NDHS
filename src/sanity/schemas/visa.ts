export default {
  name: 'visa',
  title: 'Visa',
  type: 'document',
  fields: [
    {
      name: 'type',
      title: 'Type de visa',
      type: 'string',
    },
    {
      name: 'pays',
      title: 'Pays de destination',
      type: 'string',
    },
    {
      name: 'documentsRequis',
      title: 'Documents requis',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'tarif',
      title: 'Tarif (FCFA)',
      type: 'number',
    },
    {
      name: 'delai',
      title: 'Délai de traitement',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
  ],
};
