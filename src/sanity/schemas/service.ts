export default {
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    {
      name: 'nom',
      title: 'Nom',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'icone',
      title: 'Icône (Lucide)',
      type: 'string',
    },
    {
      name: 'ordre',
      title: 'Ordre d\'affichage',
      type: 'number',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
    },
  ],
};
