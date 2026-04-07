const OrganizationSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Patro Seguros",
    "url": "https://www.patroseguros.com.br",
    "logo": "https://www.patroseguros.com.br/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+551151997500",
      "contactType": "customer service",
      "areaServed": "BR",
      "availableLanguage": "Portuguese"
    },
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
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default OrganizationSchema;
