// Snapshot do último scan SEO (gerado a partir do painel de SEO & AI search).
// Atualize ao re-executar um scan para refletir o estado mais recente.

export type FindingState = "failing" | "passing" | "ignored" | "pending" | "fixed";
export type FindingLevel = "low" | "mid" | "high";

export interface SeoFinding {
  finding_id: string;
  name: string;
  category: string;
  level: FindingLevel;
  state: FindingState;
  description: string;
  details?: string;
  link?: string;
  affectedUrls?: string[];
}

export const SEO_SCAN_SNAPSHOT_AT = "2026-06-26T00:00:00.000Z";

export const SEO_SCAN_FINDINGS: SeoFinding[] = [
  {
    finding_id: "agent_content:content",
    name: "Estrutura de headings e acessibilidade adequadas",
    category: "content",
    level: "mid",
    state: "passing",
    description:
      "Hierarquia de headings clara, textos de link descritivos e nomes acessíveis em elementos interativos nas páginas avaliadas.",
  },
  {
    finding_id: "agent_metadata:metadata_quality",
    name: "Metadados das páginas são únicos e de qualidade",
    category: "meta_title",
    level: "low",
    state: "passing",
    description:
      "Title e description refletem com precisão os serviços em Guarulhos. Cada rota usa metadados únicos via componente PageMeta.",
  },
  {
    finding_id: "agent_metadata:social_preview",
    name: "Preview social configurado corretamente",
    category: "social",
    level: "low",
    state: "passing",
    description:
      "Open Graph com títulos descritivos e URLs absolutas de imagem. Previews são específicos por página (website/article).",
  },
  {
    finding_id: "agent_metadata:structured_data",
    name: "Dados estruturados abrangentes e corretos",
    category: "structured_data",
    level: "low",
    state: "passing",
    description:
      "Schemas InsuranceAgency, Article, FAQPage e LocalBusiness aplicados de forma consistente em serviços e blog.",
  },
  {
    finding_id: "http:index",
    name: "Home alcançável pelos crawlers",
    category: "indexing",
    level: "low",
    state: "passing",
    description: "A home retorna HTTP 200 e não carrega meta robots noindex.",
  },
  {
    finding_id: "http:rendering_mode",
    name: "Crawlers veem páginas totalmente renderizadas",
    category: "indexing",
    level: "low",
    state: "passing",
    description:
      "Lovable pré-renderiza cada página antes de servir para bots, garantindo conteúdo real e não um shell vazio.",
  },
  {
    finding_id: "http:markdown_rendering",
    name: "Assistentes de IA leem o site em markdown",
    category: "ai_readiness",
    level: "low",
    state: "passing",
    description:
      "Quando assistentes de IA visitam o site, recebem uma versão markdown limpa de cada página em vez do shell JS.",
  },
  {
    finding_id: "http:robots",
    name: "Regras de crawler precisam de atenção",
    category: "robots",
    level: "mid",
    state: "failing",
    description:
      "A diretiva Sitemap aponta para www.patroseguros.com.br, e não para o domínio do projeto (patroseguros.lovable.app).",
    details:
      "Atualize a linha 'Sitemap:' em /robots.txt para https://patroseguros.lovable.app/sitemap.xml.",
    link: "/robots.txt",
    affectedUrls: ["/robots.txt"],
  },
  {
    finding_id: "http:sitemap",
    name: "Sitemap precisa de atenção",
    category: "sitemap",
    level: "mid",
    state: "failing",
    description:
      "Entradas apontam para www.patroseguros.com.br em vez do domínio do projeto. Rotas reais ausentes e entradas obsoletas que retornariam 404.",
    details:
      "Use https://patroseguros.lovable.app como host base. Adicione entradas ausentes e remova entradas obsoletas que não correspondem a rotas servidas.",
    link: "/sitemap.xml",
    affectedUrls: [
      "/admin/login",
      "/crm",
      "/cotacao/obrigado",
      "/servicos",
      "/seguro-bmw",
      "/seguro-empresa-guarulhos",
      "/seguros-em-guarulhos-bairros",
      "/seguros-guarulhos-bairros",
      "/planos-de-saude/prevent-senior-guarulhos",
      "/planos-de-saude/sulamerica-saude-guarulhos",
    ],
  },
  {
    finding_id: "http:llms_txt",
    name: "Resumo para IA está publicado",
    category: "ai_readiness",
    level: "low",
    state: "passing",
    description:
      "/llms.txt é servido com um resumo markdown das páginas, para leitura rápida por assistentes de IA.",
  },
  {
    finding_id: "lint:page_basics",
    name: "Configurações básicas da página presentes",
    category: "viewport",
    level: "low",
    state: "passing",
    description:
      "Página define viewport mobile e idioma padrão, permitindo renderização correta por crawlers e tecnologias assistivas.",
    link: "index.html",
  },
];