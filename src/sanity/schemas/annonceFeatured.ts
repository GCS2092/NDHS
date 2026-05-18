export default {
  name: 'annonceFeatured',
  title: 'Annonce en vedette',
  type: 'document',
  fields: [
    {
      name: 'type',
      title: 'Type d\'annonce',
      type: 'string',
      options: {
        list: [
          { title: 'Véhicule', value: 'vehicule' },
          { title: 'Immobilier', value: 'immobilier' },
          { title: 'Produit BTP', value: 'produitBTP' },
        ],
      },
    },
    {
      name: 'reference',
      title: 'Référence (ID du document)',
      type: 'string',
    },
    {
      name: 'ordre',
      title: 'Ordre d\'affichage',
      type: 'number',
    },
  ],
};
