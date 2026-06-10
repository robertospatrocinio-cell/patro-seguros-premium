import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { CANONICAL_BASE_URL } from "@/lib/canonical";

const routeNameMap: Record<string, string> = {
  "": "Home",
  "sobre": "Sobre Nós",
  "parceiros": "Parceiros",
  "cotacao": "Cotação Online",
  "contato": "Contato",
  "depoimentos": "Depoimentos",
  "seguro-auto": "Seguro Auto",
  "seguro-vida": "Seguro de Vida",
  "seguro-residencial": "Seguro Residencial",
  "seguro-viagem": "Seguro Viagem",
  "seguro-fianca": "Seguro Fiança",
  "previdencia-privada": "Previdência Privada",
  "seguro-moto": "Seguro de Moto",
  "seguro-saude": "Seguro Saúde",
  "seguro-odonto": "Seguro Odonto",
  "seguro-empresarial": "Seguro Empresarial",
  "planos-de-saude": "Planos de Saúde",
  "blog": "Blog",
  "central-de-sinistro": "Central de Sinistro",
  "faq": "FAQ",
  "sobre-guarulhos": "Sobre Guarulhos",
  "politica-privacidade": "Política de Privacidade",
  "termos-de-uso": "Termos de Uso",
  "consorcio": "Consórcio",
};

const BreadcrumbSchema = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const breadcrumbItems = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": CANONICAL_BASE_URL
    },
    ...pathnames.map((name, index) => {
      const routePath = `/${pathnames.slice(0, index + 1).join("/")}`;
      const displayName = routeNameMap[name] || name
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      return {
        "@type": "ListItem",
        "position": index + 2,
        "name": displayName,
        "item": `${CANONICAL_BASE_URL}${routePath}`
      };
    })
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export default BreadcrumbSchema;
