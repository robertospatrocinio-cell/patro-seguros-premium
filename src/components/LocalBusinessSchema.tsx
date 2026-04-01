const LocalBusinessSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    "name": "Patro Seguros",
    "alternateName": "Patro Corretora de Seguros",
    "url": "https://patro-secures-success.lovable.app",
    "logo": "https://patro-secures-success.lovable.app/favicon.ico",
    "description": "Corretora de seguros em Guarulhos. Comparamos cotações de auto, vida, saúde, empresarial e mais entre as melhores seguradoras do mercado.",
    "telephone": "+55-11-5199-7500",
    "email": "contato@patroseguros.com.br",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Av. Salgado Filho, 2120 – Edifício Via Alameda – Sala 219 – Cidade Maia",
      "addressLocality": "Guarulhos",
      "addressRegion": "SP",
      "addressCountry": "BR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -23.4538,
      "longitude": -46.5333
    },
    "areaServed": [
      { "@type": "City", "name": "Guarulhos" },
      { "@type": "State", "name": "São Paulo" },
      { "@type": "Country", "name": "Brasil" }
    ],
    "sameAs": [
      "https://www.instagram.com/patroseguros",
      "https://www.facebook.com/patroseguros"
    ],
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "18:00"
      }
    ],
    "priceRange": "$$",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "150",
      "bestRating": "5"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default LocalBusinessSchema;
