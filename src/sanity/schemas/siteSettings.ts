export default {
  name: 'siteSettings',
  title: 'Paramètres du site',
  type: 'document',
  fields: [
    {
      name: 'companyName',
      title: 'Nom de l\'entreprise',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slogan',
      title: 'Slogan',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description de l\'entreprise',
      type: 'text',
    },
    {
      name: 'heroBackgroundImage',
      title: "Image de fond du hero",
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'heroTitle',
      title: 'Titre du hero',
      type: 'string',
    },
    {
      name: 'heroSubtitle',
      title: 'Sous-titre du hero',
      type: 'text',
    },
    {
      name: 'contactPhone',
      title: 'Numéro de téléphone',
      type: 'string',
    },
    {
      name: 'contactEmail',
      title: 'Email de contact',
      type: 'string',
    },
    {
      name: 'whatsappNumber',
      title: 'Numéro WhatsApp',
      type: 'string',
    },
    {
      name: 'contactPerson',
      title: 'Personne de contact',
      type: 'string',
    },
    {
      name: 'address',
      title: 'Adresse',
      type: 'text',
    },
    {
      name: 'socialMedia',
      title: 'Réseaux sociaux',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'platform',
              title: 'Plateforme',
              type: 'string',
              options: {
                list: [
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'Twitter', value: 'twitter' },
                  { title: 'TikTok', value: 'tiktok' },
                  { title: 'YouTube', value: 'youtube' },
                ],
              },
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
            },
          ],
        },
      ],
    },
    {
      name: 'businessHours',
      title: 'Horaires d\'ouverture',
      type: 'text',
    },
    {
      name: 'servicesCount',
      title: 'Nombre de services',
      type: 'number',
    },
    {
      name: 'externalLinks',
      title: 'Liens externes',
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
              name: 'url',
              title: 'URL',
              type: 'url',
            },
            {
              name: 'icon',
              title: 'Icône (Lucide)',
              type: 'string',
            },
          ],
        },
      ],
    },
    {
      name: 'legalPages',
      title: 'Pages légales',
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
              name: 'slug',
              title: 'Slug',
              type: 'string',
            },
            {
              name: 'content',
              title: 'Contenu',
              type: 'array',
              of: [{ type: 'block' }],
            },
          ],
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Paramètres du site',
      };
    },
  },
};
