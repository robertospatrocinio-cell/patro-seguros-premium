import { Helmet } from "react-helmet-async";
import { CANONICAL_BASE_URL } from "@/lib/canonical";

const MedicalOrganizationSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    "@id": `${CANONICAL_BASE_URL}/#medical-organization`,
    "name": "Patro Seguros - Especialista em Saúde",
    "description": "Corretora especializada em planos de saúde e seguros médicos em Guarulhos.",
    "url": `${CANONICAL_BASE_URL}/planos-de-saude`,
    "parentOrganization": {
      "@id": `${CANONICAL_BASE_URL}/#organization`
    },
    "medicalSpecialty": [
      "HealthInsurance",
      "MedicalBrokerage"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Guarulhos",
      "addressRegion": "SP",
      "addressCountry": "BR"
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

export default MedicalOrganizationSchema;