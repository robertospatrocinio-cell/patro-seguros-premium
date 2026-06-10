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
    "name": name,
    "description": description,
    "provider": {
      "@id": `${CANONICAL_BASE_URL}/#organization`
    },
    "areaServed": {
      "@type": "City",
      "name": "Guarulhos"
    },
    "serviceType": serviceType,
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Serviços de Corretagem de Seguros",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Cotação de Seguros"
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