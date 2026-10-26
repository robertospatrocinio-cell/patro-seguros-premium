import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { CANONICAL_BASE_URL, getCanonicalUrl } from "@/lib/canonical";

interface ServiceSchemaProps {
  name: string;
  description: string;
  serviceType?: string;
  scope?: "regional" | "national";
}

const ServiceSchema = ({ name, description, serviceType = "Insurance", scope = "regional" }: ServiceSchemaProps) => {
  const { pathname } = useLocation();
  const url = getCanonicalUrl(pathname);
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    "url": url,
    "name": name,
    "description": description,
    "provider": {
      "@type": "InsuranceAgency",
      "@id": `${CANONICAL_BASE_URL}/#insurance-agency`
    },
    // Área de atendimento não equivale à localização de uma filial.
    "areaServed": scope === "national"
      ? [{ "@type": "Country", "name": "Brasil" }]
      : [
          { "@type": "City", "name": "Guarulhos" },
          { "@type": "AdministrativeArea", "name": "Região Metropolitana de São Paulo" }
        ],
    "serviceType": serviceType
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