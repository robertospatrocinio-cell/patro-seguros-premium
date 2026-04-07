const LocalBusinessSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["InsuranceAgency", "LocalBusiness"],
    "@id": "https://www.patroseguros.com.br/#insurance-agency",
    "name": "Patro Seguros",
    "alternateName": "Patro Corretora de Seguros",
    "image": [
      "https://www.patroseguros.com.br/images/logo-full.webp",
      "https://www.patroseguros.com.br/images/selo-melhor-corretora.webp"
    ],
    "url": "https://www.patroseguros.com.br",
    "telephone": "+551151997500",
    "email": "contato@patroseguros.com.br",
    "foundingDate": "2020",
    "description": "Corretora de seguros em Guarulhos especializada em seguros auto, residencial, vida, saúde, empresarial e frotas. Atendimento personalizado para famílias e PMEs com cotação online grátis.",
    "slogan": "Proteção sob medida para você e sua empresa",
    "currenciesAccepted": "BRL",
    "paymentAccepted": "Cartão de Crédito, Boleto, PIX, Débito em Conta",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Av. Salgado Filho, 2120, Ed. Via Alameda – Sala 219",
      "addressLocality": "Guarulhos",
      "addressRegion": "SP",
      "postalCode": "07115-000",
      "addressCountry": "BR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -23.4550,
      "longitude": -46.5333
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "09:00",
        "closes": "13:00"
      }
    ],
    "areaServed": [
      {
        "@type": "City",
        "name": "Guarulhos",
        "sameAs": "https://pt.wikipedia.org/wiki/Guarulhos"
      },
      {
        "@type": "State",
        "name": "São Paulo"
      },
      {
        "@type": "Country",
        "name": "Brasil"
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Seguros e Planos",
      "itemListElement": [
        {
          "@type": "OfferCatalog",
          "name": "Seguros para Você",
          "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Seguro Auto", "url": "https://www.patroseguros.com.br/seguro-auto" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Seguro Residencial", "url": "https://www.patroseguros.com.br/seguro-residencial" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Seguro de Vida", "url": "https://www.patroseguros.com.br/seguro-vida" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Plano de Saúde", "url": "https://www.patroseguros.com.br/planos-de-saude" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Seguro Viagem", "url": "https://www.patroseguros.com.br/seguro-viagem" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Seguro Celular", "url": "https://www.patroseguros.com.br/seguro-celular" } }
          ]
        },
        {
          "@type": "OfferCatalog",
          "name": "Seguros para Empresa",
          "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Seguro Empresarial", "url": "https://www.patroseguros.com.br/seguro-empresarial" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Seguro de Frota", "url": "https://www.patroseguros.com.br/seguro-frota" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Seguro Cyber", "url": "https://www.patroseguros.com.br/seguro-cyber" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Seguro RC Profissional", "url": "https://www.patroseguros.com.br/seguro-rc-profissional" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Seguro Condomínio", "url": "https://www.patroseguros.com.br/seguro-condominio" } }
          ]
        },
        {
          "@type": "OfferCatalog",
          "name": "Seguros Rural e Agro",
          "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Seguro Rural", "url": "https://www.patroseguros.com.br/seguro-rural" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Seguro Máquinas Agrícolas", "url": "https://www.patroseguros.com.br/seguro-maquinas-agricolas" } },
            { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Seguro Pecuário", "url": "https://www.patroseguros.com.br/seguro-pecuario" } }
          ]
        }
      ]
    },
    "knowsAbout": [
      "Seguro Automóvel", "Seguro Residencial", "Seguro de Vida", "Plano de Saúde",
      "Seguro Empresarial", "Seguro de Frota", "Consórcio", "Previdência Privada",
      "Seguro Rural", "Seguro Cyber", "Seguro RC Profissional", "Seguro Condomínio",
      "Seguro Viagem", "Seguro Moto", "Seguro Caminhão", "Seguro Transporte"
    ],
    "sameAs": [
      "https://www.instagram.com/patroseguros",
      "https://www.facebook.com/patroseguros",
      "https://www.linkedin.com/company/patro-seguros"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": "150",
      "reviewCount": "150"
    },
    "review": [
      {
        "@type": "Review",
        "author": { "@type": "Person", "name": "Cliente Guarulhos" },
        "datePublished": "2025-01-15",
        "reviewBody": "Excelente atendimento! A equipe da Patro foi muito atenciosa e conseguiu o melhor preço para meu seguro auto.",
        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
      },
      {
        "@type": "Review",
        "author": { "@type": "Person", "name": "Empresário PME" },
        "datePublished": "2025-03-10",
        "reviewBody": "Profissionais competentes que entendem as necessidades de pequenas empresas. Recomendo!",
        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
      }
    ],
    "identifier": [
      {
        "@type": "PropertyValue",
        "name": "SUSEP",
        "value": "212113511"
      }
    ],
    "potentialAction": [
      {
        "@type": "QuoteAction",
        "name": "Solicitar Cotação de Seguro",
        "target": "https://www.patroseguros.com.br/cotacao",
        "description": "Faça uma cotação gratuita de seguro online"
      },
      {
        "@type": "CommunicateAction",
        "name": "Falar pelo WhatsApp",
        "target": "https://wa.me/551151997500"
      }
    ],
    "priceRange": "$$"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default LocalBusinessSchema;
