import { Helmet } from "react-helmet-async";
import { CANONICAL_BASE_URL } from "@/lib/canonical";

/**
 * SiteNavigationElement (JSON-LD) — descreve a navegação global do site.
 * Emitido uma única vez no App, junto com WebSiteSchema. Ajuda o Google a
 * mapear a arquitetura do site e habilita sitelinks nos resultados de busca.
 *
 * Regras seguidas (checadas pelo validador de rich results):
 *  - Cada item precisa ter `@type: SiteNavigationElement`, `name` e `url`.
 *  - `url` sempre absoluta https no host canônico (www.patroseguros.com.br).
 */

const NAV_ITEMS: Array<{ name: string; path: string }> = [
  { name: "Início", path: "/" },
  { name: "Serviços", path: "/servicos" },
  { name: "Sobre", path: "/sobre" },
  { name: "Blog", path: "/blog" },
  { name: "FAQ", path: "/faq" },
  { name: "Contato", path: "/contato" },
];

const SiteNavigationSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@graph": NAV_ITEMS.map((item, i) => ({
      "@type": "SiteNavigationElement",
      "@id": `${CANONICAL_BASE_URL}/#nav-${i + 1}`,
      position: i + 1,
      name: item.name,
      url: item.path === "/" ? CANONICAL_BASE_URL : `${CANONICAL_BASE_URL}${item.path}`,
      isPartOf: { "@id": `${CANONICAL_BASE_URL}/#website` },
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

export default SiteNavigationSchema;