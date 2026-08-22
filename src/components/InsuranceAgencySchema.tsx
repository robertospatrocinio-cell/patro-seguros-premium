import { Helmet } from "react-helmet-async";
import { EMPRESA } from "@/config/empresa";

/**
 * InsuranceAgencySchema
 * Emite o nó institucional InsuranceAgency em TODAS as páginas.
 * Centralizado aqui para evitar duplicidade e garantir que o postbuild valide OK.
 */
const InsuranceAgencySchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    "@id": `${EMPRESA.dominioCanonico}/#insurance-agency`,
    "name": EMPRESA.nomeFantasia,
    "legalName": EMPRESA.razaoSocial,
    "url": EMPRESA.dominioCanonico,
    "logo": `${EMPRESA.dominioCanonico}/images/logo-full.webp`,
    "image": `${EMPRESA.dominioCanonico}/images/logo-full.webp`,
    "telephone": EMPRESA.telefoneE164,
    "email": EMPRESA.email,
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": `${EMPRESA.endereco.logradouro}, ${EMPRESA.endereco.numero}`,
      "addressLocality": EMPRESA.endereco.cidade,
      "addressRegion": EMPRESA.endereco.estadoSigla,
      "postalCode": EMPRESA.endereco.cep,
      "addressCountry": "BR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": EMPRESA.geo.latitude,
      "longitude": EMPRESA.geo.longitude
    },
    // aggregateRating REMOVIDO: sem integração automática com o Google Business
    // não há reviewCount verificável, e o Google exige reviewCount/ratingCount.
    // Publicar estrelas sem fonte auditável seria dado não comprovado.
    "founder": [
      {
        "@type": "Person",
        "name": EMPRESA.socios.roberto.nome,
        "sameAs": [EMPRESA.socios.roberto.linkedin]
      },
      {
        "@type": "Person",
        "name": EMPRESA.socios.sandra.nome,
        "sameAs": [EMPRESA.socios.sandra.linkedin]
      }
    ],
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:30",
        "closes": "18:00"
      }
    ],
    "sameAs": [
      EMPRESA.redesSociais.instagram,
      EMPRESA.redesSociais.facebook,
      EMPRESA.redesSociais.linkedin
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

export default InsuranceAgencySchema;
