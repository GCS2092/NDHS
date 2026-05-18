export default {
  name: 'bienImmobilier',
  title: 'Bien Immobilier',
  type: 'document',
  fields: [
    {
      name: 'titre',
      title: 'Titre',
      type: 'string',
    },
    {
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Vente', value: 'vente' },
          { title: 'Location', value: 'location' },
        ],
      },
    },
    {
      name: 'prix',
      title: 'Prix (FCFA)',
      type: 'number',
    },
    {
      name: 'surface',
      title: 'Surface (m²)',
      type: 'number',
    },
    {
      name: 'quartier',
      title: 'Quartier',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'photos',
      title: 'Photos',
      type: 'array',
      of: [{ type: 'image' }],
    },
    {
      name: 'chambres',
      title: 'Nombre de chambres',
      type: 'number',
    },
    {
      name: 'sallesDeBain',
      title: 'Salles de bain',
      type: 'number',
    },
  ],
};
