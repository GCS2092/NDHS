export function SchemaOrg() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "NDHS Niaye Dany Henry Services",
    "description": "Services de logistique, transport, immobilier, véhicules, matériaux BTP, billets d'avion, assistance visa et groupage de colis au Sénégal",
    "url": "https://ndhs.sn",
    "telephone": "+221 77 123 45 67",
    "email": "contact@ndhs.sn",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Dakar, Sénégal",
      "addressCountry": "SN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "14.7167",
      "longitude": "-17.4677"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "08:00",
      "closes": "18:00"
    },
    "priceRange": "$$"
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
