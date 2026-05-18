export default {
  name: 'produitBTP',
  title: 'Produit BTP',
  type: 'document',
  fields: [
    {
      name: 'nom',
      title: 'Nom',
      type: 'string',
    },
    {
      name: 'categorie',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: [
          { title: 'Ciment', value: 'ciment' },
          { title: 'Carreaux', value: 'carreaux' },
          { title: 'Fer', value: 'fer' },
          { title: 'Sable', value: 'sable' },
          { title: 'Autre', value: 'autre' },
        ],
      },
    },
    {
      name: 'prix',
      title: 'Prix (FCFA)',
      type: 'number',
    },
    {
      name: 'unite',
      title: 'Unité',
      type: 'string',
      options: {
        list: [
          { title: 'Sac', value: 'sac' },
          { title: 'm²', value: 'm2' },
          { title: 'Tonne', value: 'tonne' },
          { title: 'Unité', value: 'unite' },
        ],
      },
    },
    {
      name: 'stock',
      title: 'Stock disponible',
      type: 'number',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'photo',
      title: 'Photo',
      type: 'image',
    },
  ],
};
