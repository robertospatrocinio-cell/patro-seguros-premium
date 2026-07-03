import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { CANONICAL_BASE_URL } from "@/lib/canonical";

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  items?: BreadcrumbItem[];
}

const routeNameMap: Record<string, string> = {
  "": "Início",

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
  "saude": "Planos de Saúde",
  "seguradoras": "Seguradoras",
};

const BreadcrumbSchema = ({ items }: BreadcrumbSchemaProps) => {
  const location = useLocation();

  // Normaliza uma URL para o formato absoluto exigido pelo schema.org.
  const toAbsolute = (url: string): string => {
    if (!url) return CANONICAL_BASE_URL;
    if (url.startsWith("http")) return url.replace(/\/+$/, "") || CANONICAL_BASE_URL;
    const path = url.startsWith("/") ? url : `/${url}`;
    // remove trailing slash exceto para "/"
    const clean = path === "/" ? "" : path.replace(/\/+$/, "");
    return `${CANONICAL_BASE_URL}${clean}`;
  };

  const currentPath = location.pathname.replace(/\/+$/, "") || "/";
  const currentAbsolute = toAbsolute(currentPath);

  let raw: BreadcrumbItem[];

  if (items && items.length > 0) {
    raw = [...items];
    // Garante que "Início" seja o primeiro item (padroniza label).
    const first = raw[0];
    const firstAbs = toAbsolute(first.url);
    if (firstAbs !== CANONICAL_BASE_URL && firstAbs !== `${CANONICAL_BASE_URL}/`) {
      raw = [{ name: "Início", url: "/" }, ...raw];
    } else if (first.name !== "Início") {
      raw = [{ name: "Início", url: "/" }, ...raw.slice(1)];
    }
    // Rotas dinâmicas: força o último item a apontar para a URL real da página,
    // evitando drift entre o caminho declarado no schema e o path renderizado
    // (ex.: `/seguro/:brand` vs `/seguro-bmw`).
    const last = raw[raw.length - 1];
    if (toAbsolute(last.url) !== currentAbsolute) {
      if (import.meta.env.DEV) {
        console.warn(
          `[BreadcrumbSchema] último item ("${last.name}") tinha url=${last.url}; ` +
            `alinhando com a rota atual ${currentPath}.`,
        );
      }
      raw[raw.length - 1] = { ...last, url: currentPath };
    }
  } else {
    // Fallback: deriva breadcrumb do próprio pathname.
    const parts = currentPath.split("/").filter(Boolean);
    raw = [
      { name: "Início", url: "/" },
      ...parts.map((seg, i) => ({
        name:
          routeNameMap[seg] ||
          seg
            .split("-")
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(" "),
        url: `/${parts.slice(0, i + 1).join("/")}`,
      })),
    ];
  }

  const breadcrumbItems = raw.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: toAbsolute(item.url),
  }));

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${currentAbsolute}#breadcrumb`,
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

