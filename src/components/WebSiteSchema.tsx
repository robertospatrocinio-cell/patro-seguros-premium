import { Helmet } from "react-helmet-async";
import { CANONICAL_BASE_URL } from "@/lib/canonical";

const WebSiteSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${CANONICAL_BASE_URL}/#website`,
    "name": "Patro Seguros",
    "alternateName": "Patro Corretora de Seguros",
    "url": CANONICAL_BASE_URL,
    "description": "Corretora de seguros em Guarulhos — cotação online grátis para auto, vida, residencial, saúde, empresarial e frotas.",
    "publisher": {
      "@id": `${CANONICAL_BASE_URL}/#organization`
    },
    "inLanguage": "pt-BR",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${CANONICAL_BASE_URL}/?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
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

export default WebSiteSchema;
