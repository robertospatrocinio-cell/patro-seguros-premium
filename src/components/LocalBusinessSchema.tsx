import { Helmet } from "react-helmet-async";
import { CANONICAL_BASE_URL } from "@/lib/canonical";

/**
 * Componente que renderiza o Schema.org (JSON-LD) para a Agência de Seguros.
 * Define dados globais como endereço, telefone, horário de funcionamento e área de atendimento.
 */
const LocalBusinessSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["InsuranceAgency"],
    "@id": `${CANONICAL_BASE_URL}/#local-business`,
    "name": "Patro Corretora de Seguros",
    "alternateName": "Patro Seguros",
    "image": [
      `${CANONICAL_BASE_URL}/images/logo-full.webp`,
      `${CANONICAL_BASE_URL}/images/selo-melhor-corretora.png`
    ],
    "url": CANONICAL_BASE_URL,
    "telephone": "+551151997500",
    "email": "contato@patroseguros.com.br",
    "description": "Corretora de seguros em Guarulhos especializada em seguros auto, vida, residencial, saúde, empresarial e frotas. Atendimento em toda Guarulhos e São Paulo.",
    "priceRange": "$$",
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
      "latitude": -23.4468661,
      "longitude": -46.5369463
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
        "@type": "City",
        "name": "São Paulo",
        "sameAs": "https://pt.wikipedia.org/wiki/S%C3%A3o_Paulo"
      },
      {
        "@type": "State",
        "name": "São Paulo"
      }
    ],
    "hasOfferCatalog": {
      "@id": `${CANONICAL_BASE_URL}/#service-catalog`
    },
    "sameAs": [
      "https://www.instagram.com/patroseguros",
      "https://www.facebook.com/patroseguros",
      "https://www.linkedin.com/company/patro-seguros"
    ],
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+551151997500",
        "contactType": "customer service",
        "areaServed": "BR",
        "availableLanguage": "Portuguese"
      }
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export default LocalBusinessSchema;
