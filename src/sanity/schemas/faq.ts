export default {
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    {
      name: 'question',
      title: 'Question',
      type: 'string',
    },
    {
      name: 'reponse',
      title: 'Réponse',
      type: 'text',
    },
    {
      name: 'service',
      title: 'Service concerné',
      type: 'string',
      options: {
        list: [
          { title: 'Général', value: 'general' },
          { title: 'Logistique', value: 'logistique' },
          { title: 'BTP', value: 'btp' },
          { title: 'Véhicules', value: 'vehicules' },
          { title: 'Immobilier', value: 'immobilier' },
          { title: 'Billets', value: 'billets' },
          { title: 'Visa', value: 'visa' },
          { title: 'Groupage', value: 'groupage' },
        ],
      },
    },
  ],
};
