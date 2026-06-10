import { Helmet } from "react-helmet-async";
import { CANONICAL_BASE_URL } from "@/lib/canonical";

/**
 * Componente que renderiza o Schema.org (JSON-LD) para a Organização (Patro Corretora).
 */
const OrganizationSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${CANONICAL_BASE_URL}/#organization`,
    "name": "Patro Corretora de Seguros",
    "alternateName": "Patro Seguros",
    "url": CANONICAL_BASE_URL,
    "logo": {
      "@type": "ImageObject",
      "@id": `${CANONICAL_BASE_URL}/#logo`,
      "url": `${CANONICAL_BASE_URL}/images/logo-full.webp`,
      "width": "300",
      "height": "60"
    },
    "image": `${CANONICAL_BASE_URL}/images/logo-full.webp`,
    "description": "Corretora de seguros em Guarulhos com atendimento personalizado. Seguros auto, vida, residencial, saúde, empresarial e frotas para famílias e PMEs.",
    "foundingDate": "2020-01-01",
    "location": {
      "@type": "Place",
      "name": "Guarulhos, SP, Brasil",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Guarulhos",
        "addressRegion": "SP",
        "addressCountry": "BR"
      }
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+551151997500",
        "contactType": "customer service",
        "areaServed": "BR",
        "availableLanguage": "Portuguese",
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
      },
      {
        "@type": "ContactPoint",
        "telephone": "+551151997500",
        "contactType": "emergency",
        "areaServed": "BR",
        "availableLanguage": "Portuguese",
        "description": "Central de Sinistro 24h para Roubo, Furto e Colisão"
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
    "brand": {
      "@type": "Brand",
      "name": "Patro Seguros",
      "logo": `${CANONICAL_BASE_URL}/images/logo-full.webp`
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export default OrganizationSchema;
