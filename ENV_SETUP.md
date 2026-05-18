# Configuration des variables d'environnement

Créez un fichier `.env.local` à la racine du projet avec les variables suivantes :

## Variables Sanity CMS

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=votre_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_STUDIO_URL=/studio
```

Pour obtenir ces valeurs :
1. Allez sur [sanity.io/manage](https://www.sanity.io/manage)
2. Sélectionnez votre projet
3. Copiez le Project ID depuis les paramètres du projet
4. Le dataset est généralement "production" par défaut

## Variables Resend (Emails)

```bash
RESEND_API_KEY=votre_cle_api_resend
```

Pour obtenir cette clé :
1. Allez sur [resend.com](https://resend.com)
2. Créez un compte et générez une API key
3. Copiez la clé dans votre fichier .env.local

## Variables WhatsApp (Optionnel)

```bash
WHATSAPP_NUMBER=221771234567
```

Numéro WhatsApp avec indicatif pays (221 pour le Sénégal)

## Notes importantes

- Le fichier `.env.local` est déjà gitignored pour des raisons de sécurité
- Ne partagez jamais votre fichier `.env.local` ou vos clés API
- Redémarrez le serveur de développement après avoir modifié les variables d'environnement
