const WebSiteSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.patroseguros.com.br/#website",
    "name": "Patro Seguros",
    "alternateName": "Patro Corretora de Seguros",
    "url": "https://www.patroseguros.com.br",
    "description": "Corretora de seguros em Guarulhos — cotação online grátis para auto, vida, residencial, saúde, empresarial e frotas.",
    "publisher": {
      "@id": "https://www.patroseguros.com.br/#organization"
    },
    "inLanguage": "pt-BR",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://www.patroseguros.com.br/?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default WebSiteSchema;
