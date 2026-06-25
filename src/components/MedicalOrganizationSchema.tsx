import { Helmet } from "react-helmet-async";
import { CANONICAL_BASE_URL } from "@/lib/canonical";

const MedicalOrganizationSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${CANONICAL_BASE_URL}/planos-de-saude/#health-insurance-service`,
    "name": "Corretagem de Planos de Saúde em Guarulhos",
    "description": "Corretora especializada em planos de saúde e seguros médicos em Guarulhos — Hapvida/NotreDame, Unimed, SulAmérica, Bradesco Saúde, Amil, Omint, Porto, Prevent Senior e MedSenior.",
    "serviceType": "Health Insurance Brokerage",
    "url": `${CANONICAL_BASE_URL}/planos-de-saude`,
    "provider": {
      "@id": `${CANONICAL_BASE_URL}/#organization`
    },
    "areaServed": [
      { "@type": "City", "name": "Guarulhos" },
      { "@type": "State", "name": "São Paulo" }
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

export default MedicalOrganizationSchema;