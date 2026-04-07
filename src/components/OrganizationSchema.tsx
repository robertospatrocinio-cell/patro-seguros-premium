const OrganizationSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.patroseguros.com.br/#organization",
    "name": "Patro Seguros",
    "alternateName": "Patro Corretora de Seguros",
    "url": "https://www.patroseguros.com.br",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.patroseguros.com.br/images/logo-full.webp",
      "width": 300,
      "height": 60
    },
    "image": "https://www.patroseguros.com.br/images/logo-full.webp",
    "description": "Corretora de seguros em Guarulhos com atendimento personalizado. Seguros auto, vida, residencial, saúde, empresarial e frotas para famílias e PMEs.",
    "foundingDate": "2020",
    "foundingLocation": {
      "@type": "Place",
      "name": "Guarulhos, SP, Brasil"
    },
    "numberOfEmployees": {
      "@type": "QuantitativeValue",
      "minValue": 5,
      "maxValue": 20
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+551151997500",
        "contactType": "customer service",
        "areaServed": "BR",
        "availableLanguage": "Portuguese",
        "contactOption": "TollFree",
        "hoursAvailable": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "09:00",
          "closes": "18:00"
        }
      },
      {
        "@type": "ContactPoint",
        "telephone": "+551151997500",
        "contactType": "sales",
        "areaServed": "BR",
        "availableLanguage": "Portuguese"
      }
    ],
    "sameAs": [
      "https://www.instagram.com/patroseguros",
      "https://www.facebook.com/patroseguros",
      "https://www.linkedin.com/company/patro-seguros"
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Av. Salgado Filho, 2120, Ed. Via Alameda – Sala 219",
      "addressLocality": "Guarulhos",
      "addressRegion": "SP",
      "postalCode": "07115-000",
      "addressCountry": "BR"
    },
    "parentOrganization": undefined,
    "brand": {
      "@type": "Brand",
      "name": "Patro Seguros",
      "logo": "https://www.patroseguros.com.br/images/logo-full.webp"
    }
  };

  // Remove undefined keys
  const cleanSchema = JSON.parse(JSON.stringify(schema));

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(cleanSchema) }}
    />
  );
};

export default OrganizationSchema;
