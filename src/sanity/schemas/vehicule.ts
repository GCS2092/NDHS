export default {
  name: 'vehicule',
  title: 'Véhicule',
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
          { title: 'Voiture', value: 'voiture' },
          { title: 'Camion', value: 'camion' },
          { title: 'Utilitaire', value: 'utilitaire' },
        ],
      },
    },
    {
      name: 'prix',
      title: 'Prix (FCFA)',
      type: 'number',
    },
    {
      name: 'kilometrage',
      title: 'Kilométrage',
      type: 'number',
    },
    {
      name: 'annee',
      title: 'Année',
      type: 'number',
    },
    {
      name: 'disponible',
      title: 'Disponible',
      type: 'boolean',
      defaultValue: true,
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
      name: 'location',
      title: 'Location',
      type: 'boolean',
      defaultValue: false,
    },
  ],
};
