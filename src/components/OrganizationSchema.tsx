/**
 * OrganizationSchema — NO-OP.
 *
 * O bloco Organization (@id = #organization) agora é emitido estaticamente
 * em `index.html` e copiado para todas as rotas pelo prerender. Emitir aqui
 * via Helmet criava um segundo nó com mesmo @id mas dados ligeiramente
 * diferentes — Google reporta como conflito no URL Inspection.
 *
 * Mantemos o componente exportado para não quebrar os ~40 imports
 * existentes; pode ser removido em refactor futuro.
 */
const OrganizationSchema = () => null;

export default OrganizationSchema;
      "@type": "Place",
      "name": "Guarulhos, SP, Brasil",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Av. Salgado Filho, 2120, Ed. Via Alameda – Sala 219",
        "addressLocality": "Guarulhos",
        "addressRegion": "SP",
        "postalCode": "07115-000",
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
