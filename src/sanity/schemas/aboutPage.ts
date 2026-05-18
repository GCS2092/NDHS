export default {
  name: 'aboutPage',
  title: 'Page À propos',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titre',
      type: 'string',
    },
    {
      name: 'subtitle',
      title: 'Sous-titre',
      type: 'text',
    },
    {
      name: 'story',
      title: 'Notre histoire',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'mission',
      title: 'Notre mission',
      type: 'text',
    },
    {
      name: 'vision',
      title: 'Notre vision',
      type: 'text',
    },
    {
      name: 'values',
      title: 'Nos valeurs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Titre',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
            },
          ],
        },
      ],
    },
    {
      name: 'team',
      title: 'Notre équipe',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Nom',
              type: 'string',
            },
            {
              name: 'role',
              title: 'Rôle',
              type: 'string',
            },
            {
              name: 'photo',
              title: 'Photo',
              type: 'image',
            },
          ],
        },
      ],
    },
    {
      name: 'stats',
      title: 'Statistiques',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Label',
              type: 'string',
            },
            {
              name: 'value',
              title: 'Valeur',
              type: 'string',
            },
          ],
        },
      ],
    },
    {
      name: 'image',
      title: 'Image principale',
      type: 'image',
    },
  ],
};
