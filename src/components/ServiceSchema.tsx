import { Helmet } from "react-helmet-async";
import { CANONICAL_BASE_URL } from "@/lib/canonical";

interface ServiceSchemaProps {
  name: string;
  description: string;
  serviceType?: string;
}

const ServiceSchema = ({ name, description, serviceType = "Insurance" }: ServiceSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${CANONICAL_BASE_URL}${window.location.pathname}/#service`,
    "name": name,
    "description": description,
    "provider": {
      "@id": `${CANONICAL_BASE_URL}/#organization`
    },
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
      }
    ],
    "serviceType": serviceType,
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Serviços de Corretagem de Seguros",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": name,
            "description": `Cotação de ${name} personalizada.`
          }
        }
      ]
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

export default ServiceSchema;