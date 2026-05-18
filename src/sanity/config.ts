import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemas } from './schemas';

export const config = defineConfig({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  title: 'NDHS Niaye Dany Henry Services',
  apiVersion: '2024-01-01',
  basePath: '/studio',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Contenu')
          .items([
            S.listItem()
              .title('Véhicules')
              .schemaType('vehicule')
              .child(S.documentTypeList('vehicule').title('Véhicules')),
            S.listItem()
              .title('Immobilier')
              .schemaType('bienImmobilier')
              .child(S.documentTypeList('bienImmobilier').title('Biens immobiliers')),
            S.listItem()
              .title('Matériaux BTP')
              .schemaType('produitBTP')
              .child(S.documentTypeList('produitBTP').title('Produits BTP')),
            S.listItem()
              .title('Services')
              .schemaType('service')
              .child(S.documentTypeList('service').title('Services')),
            S.listItem()
              .title('Destinations Groupage')
              .schemaType('destinationGroupage')
              .child(S.documentTypeList('destinationGroupage').title('Destinations')),
            S.listItem()
              .title('Visas')
              .schemaType('visa')
              .child(S.documentTypeList('visa').title('Visas')),
            S.listItem()
              .title('FAQ')
              .schemaType('faq')
              .child(S.documentTypeList('faq').title('Questions fréquentes')),
            S.listItem()
              .title('Annonces en vedette')
              .schemaType('annonceFeatured')
              .child(S.documentTypeList('annonceFeatured').title('Annonces en vedette')),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemas,
  },
});
