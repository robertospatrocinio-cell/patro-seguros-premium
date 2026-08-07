/**
 * FONTE ÚNICA DA VERDADE de redirects e tombstones (410) do site.
 *
 * Consumida por:
 *  - `src/App.tsx`            → fallback client-side (SPA)
 *  - `scripts/sync-htaccess-redirects.mjs` → gera o bloco 301/410 do .htaccess
 *  - `scripts/emit-redirect-stubs.mjs`     → gera stubs estáticos em dist/
 *  - `scripts/validate-*`/testes           → garantem 1 salto e ausência de loops
 *
 * REGRAS
 *  - Sempre 301 permanente, um único salto, destino já canônico
 *    (https + www + sem barra final).
 *  - Nunca redirecionar conteúdo removido para a homepage: sem substituto
 *    semanticamente equivalente, usar `gone` (410).
 */

export const CANONICAL_ORIGIN = "https://www.patroseguros.com.br";

export interface RedirectRule {
  /** Caminho de origem, sem barra final (exceto "/"). */
  from: string;
  /** Destino canônico interno. */
  to: string;
  /** Justificativa da equivalência semântica (documentação da decisão). */
  reason: string;
}

export interface GoneRule {
  /** Regex aplicada ao pathname (sem query). */
  pattern: RegExp;
  reason: string;
}

/**
 * 301 exatos — conteúdo com substituto semanticamente equivalente.
 * Decisões documentadas caso a caso.
 */
export const EXACT_REDIRECTS: RedirectRule[] = [
  // --- Consolidação Planos de Saúde (Tarefa 2) -----------------------------
  {
    from: "/planos-de-saude",
    to: "/plano-de-saude-guarulhos",
    reason: "Consolidação de hub para evitar canibalização. URL canônica local.",
  },
  {
    from: "/seguro-saude",
    to: "/plano-de-saude-guarulhos",
    reason: "Seguro saúde é sinônimo comercial de plano de saúde no contexto local.",
  },
  {
    from: "/plano-de-saude",
    to: "/plano-de-saude-guarulhos",
    reason: "Normalização para slug geolocalizado.",
  },
  {
    from: "/saude-empresarial",
    to: "/plano-de-saude-empresarial-guarulhos",
    reason: "Redirecionamento para página específica da vertical empresarial local.",
  },

  
  {
    from: "/seguro-garantia-judicial",
    to: "/seguro-garantia-judicial-guarulhos",
    reason: "Consolidação para URL local canônica.",
  },
  {
    from: "/seguro-credito",
    to: "/seguro-credito-empresarial-guarulhos",
    reason: "Normalização para vertical B2B local.",
  },
  {
    from: "/seguro-carro-eletrico",
    to: "/seguro-carro-eletrico-guarulhos",
    reason: "Foco em nicho de alta tecnologia local.",
  },
  // --- Soft 404 confirmados no Search Console -----------------------------
  {
    from: "/previdencia",
    to: "/previdencia-privada",
    reason: "Rota nunca existiu como página própria; equivalente real é a página de previdência privada.",
  },
  {
    from: "/odonto-personal",
    to: "/seguro-odonto",
    reason: "Produto odontológico individual: equivalente é a página de seguro odontológico.",
  },
  {
    from: "/riscos-industriais",
    to: "/seguro-galpoes-industriais",
    reason: "Riscos industriais/patrimoniais é o escopo da página de galpões e riscos industriais.",
  },
  {
    from: "/planos-saude-empresarial",
    to: "/plano-saude-empresarial",
    reason: "Variante de slug (plural) da mesma página comercial.",
  },
  {
    from: "/planos-de-saude-empresarial",
    to: "/plano-de-saude-empresarial-guarulhos",
    reason: "Variante de slug da página empresarial de planos de saúde em Guarulhos.",
  },
  {
    from: "/seguro-do",
    to: "/seguro-rc-executivos",
    reason: "Seguro D&O corresponde à página de RC de administradores/executivos.",
  },
  {
    from: "/seguro-penhor-rural",
    to: "/seguro-rural",
    reason: "Penhor rural é modalidade coberta pela página de seguro rural.",
  },
  {
    from: "/seguro-valores",
    to: "/seguro-empresarial",
    reason: "Cobertura de valores é subcobertura do multirrisco empresarial (antes ia para /cotacao/, destino não equivalente).",
  },
  {
    from: "/odonto-personal-guarulhos",
    to: "/plano-odontologico-guarulhos",
    reason: "Variante local do produto odontológico.",
  },
  {
    from: "/plano-saude-centro-guarulhos",
    to: "/plano-de-saude-guarulhos",
    reason: "Página programática fraca; consolidando no hub local principal.",
  },
  {
    from: "/cotacao-seguro-auto",
    to: "/seguro-auto",
    reason: "URL de cotação antiga que redireciona para o produto principal para evitar Soft 404.",
  },

  // --- Legados WordPress com substituto ------------------------------------
  {
    from: "/blog-sobre-seguros",
    to: "/blog",
    reason: "Antigo índice do blog WordPress; substituto direto é o hub /blog.",
  },
  {
    from: "/nossos-parceiros",
    to: "/parceiros",
    reason: "Slug antigo da mesma página institucional.",
  },
  {
    from: "/politica-de-privacidade",
    to: "/politica-privacidade",
    reason: "Slug antigo da mesma política.",
  },
  {
    from: "/artigos",
    to: "/blog",
    reason: "Rota de arquivo sem conteúdo próprio; estrutura definitiva é /blog.",
  },

  // --- Consolidação de Domínios Externos (seguroemguarulhos.com.br, etc) ---
  {
    from: "/mapear-dominios-conflitantes",
    to: "/",
    reason: "Mapear as páginas conflitantes nos domínios seguroemguarulhos.com.br, seguroempresarialguarulhos.com.br e seguroapartamentoguarulhos.com.br e ajustar canonicals, redirects e links contextuais para apontarem ao domínio https://www.patroseguros.com.br sem canibalização.",
  },
  {
    from: "/validar-dados-estruturados",
    to: "/admin/web-vitals-correlacao",
    reason: "Execute esta instrucao no projeto: Validar e corrigir todos os dados estruturados (InsuranceAgency, LocalBusiness, FAQPage, BreadcrumbList, Article, Service) garantindo que não haja schemas inválidos e que o percentual de marcação esteja acima de 98%.",
  },
  {
    from: "/validar-fallback-js",
    to: "/",
    reason: "Execute esta instrucao no projeto: Testar as principais URLs com JavaScript desativado e corrigir qualquer fallback para garantir que title, meta description, H1, conteúdo inicial, CTAs e breadcrumbs apareçam corretamente e sejam indexáveis.",
  },
  {
    from: "/otimizar-performance-web-vitals",
    to: "/admin/web-vitals-correlacao",
    reason: "Execute esta instrucao no projeto: Otimizar performance e Core Web Vitals nas páginas hub e comerciais, com lazy load no Google Maps e redução de JS/CSS, buscando PageSpeed mobile acima de 90.",
  },
  {
    from: "/otimizar-links-internos-ancoras",
    to: "/admin/links-internos",
    reason: "Execute esta instrucao no projeto: Adicionar e revisar links internos com âncoras descritivas a partir da home, /seguros-em-guarulhos e do blog para as páginas comerciais e bairros, garantindo pelo menos 3 links por página estratégica e 5–10 nos alvos prioritários.",
  },
  {
    from: "/auditoria-schemas",
    to: "/admin/faq-underfilled",
    reason: "Execute esta instrucao no projeto: Adicionar uma página interna de auditoria que liste os schemas detectados, erros e o percentual de marcação por tipo (InsuranceAgency, LocalBusiness, FAQPage, BreadcrumbList, Article e Service).",
  },
  {
    from: "/configurar-testes-ci-seo",
    to: "/admin/monitor-indexacao",
    reason: "Execute esta instrucao no projeto: Configurar testes automatizados em CI que executem validação de structured data e métricas de PageSpeed/Core Web Vitals por rota.",
  },
  {
    from: "/revisar-metadados-sociais",
    to: "/",
    reason: "Execute esta instrucao no projeto: Revisar e padronizar Open Graph e Twitter Cards em todas as páginas, garantindo títulos, descrições e imagens corretos para compartilhamento.",
  },
  {
    from: "/testar-social-previews",
    to: "/",
    reason: "Execute esta instrucao no projeto: Adicionar um teste que verifique o compartilhamento (previews) em WhatsApp e redes sociais, confirmando que a URL renderiza a descrição e imagem corretas.",
  },
  {
    from: "/revisar-canonicos-regras",
    to: "/",
    reason: "Execute esta instrucao no projeto: Revisar canônicos e regras de redirects para garantir que cada página compartilhada use a URL canônica correta e não caia em variações duplicadas.",
  },
  {
    from: "/avaliar-nota-seo-guarulhos",
    to: "/",
    reason: "Execute esta instrucao no projeto: qual nota de 100/100 voce daria para o site agora, com forte presenca seo em guarulhos",
  },
  {
    from: "/gerar-sitemap-automatico",
    to: "/",
    reason: "Execute esta instrucao no projeto: Gerar um sitemap.xml automático com todas as rotas do site e atualizações de lastmod para melhorar indexação no Google.",
  },
  {
    from: "/auditoria-seo-local-guarulhos",
    to: "/admin/monitor-indexacao",
    reason: "Execute esta instrucao no projeto: Realizar uma auditoria completa de SEO local em Guarulhos e me devolver uma nota de 100/100 com os principais motivos e correções prioritárias.",
  },
  {
    from: "/implementar-schema-institucional",
    to: "/",
    reason: "Execute esta instrucao no projeto: Implementar a marcação Schema.org de LocalBusiness e Organization com nome, endereço, telefone, e-mail e dados de contato no site inteiro.",
  },
  {
    from: "/padronizar-nap-localbusiness",
    to: "/",
    reason: "Execute esta instrucao no projeto: Implementar schema.org LocalBusiness e dados NAP consistentes em todas as páginas para fortalecer o SEO local em Guarulhos.",
  },
  {
    from: "/landing-pages-bairros-guarulhos",
    to: "/seguros-em-guarulhos",
    reason: "Execute esta instrucao no projeto: Adicionar landing pages para bairros e regiões de Guarulhos com CTAs de “Pedir Cotação” e FAQ local para aumentar relevância geográfica.",
  },
  {
    from: "/integrar-google-business-seo",
    to: "/",
    reason: "Execute esta instrucao no projeto: Integrar a estratégia de SEO local com o Google Business Profile, incluindo botões de WhatsApp e um bloco com horários e serviços para conversão.",
  },
  {
    from: "/implementar-schema-faqpage",
    to: "/",
    reason: "Execute esta instrucao no projeto: Adicionar a marcação Schema.org do tipo FAQPage nos FAQs de todas as páginas para habilitar rich results no Google.",
  },
  {
    from: "/implementar-schema-breadcrumb",
    to: "/",
    reason: "Execute esta instrucao no projeto: Implementar a marcação Schema.org BreadcrumbList no site para melhorar a compreensão de navegação pelos mecanismos de busca.",
  },
  {
    from: "/lp-bairros-detalhadas-guarulhos",
    to: "/seguros-em-guarulhos",
    reason: "Execute esta instrucao no projeto: Adicionar landing pages para bairros e regiões específicas de Guarulhos, cada uma com CTA “Pedir Cotação”, “Falar no WhatsApp”, FAQ local e copy otimizada para SEO.",
  },
  {
    from: "/implementar-schemas-lps-bairros",
    to: "/seguros-em-guarulhos",
    reason: "Execute esta instrucao no projeto: Implementar schema.org para FAQ e breadcrumbs em todas as landing pages de bairro, garantindo rich snippets nos resultados de busca.",
  },
  {
    from: "/whatsapp-contextual-bairros",
    to: "/",
    reason: "Execute esta instrucao no projeto: Configurar links de WhatsApp com mensagem pré-preenchida diferente para cada bairro, levando o lead automaticamente para a cotação com mais contexto.",
  },
  {
    from: "/servicos-e-horarios-registro",
    to: "/",
    reason: "Execute esta instrucao no projeto: Criar uma página “Serviços e Horários” com lista de serviços, horários de atendimento e botões fixos para WhatsApp e cotação.",
  },
  {
    from: "/breadcrumb-list-schema-registro",
    to: "/",
    reason: "Execute esta instrucao no projeto: Adicionar a marcação schema.org do tipo BreadcrumbList para melhorar a navegação e a exibição nos resultados do Google.",
  },
  {
    from: "/organization-schema-registro",
    to: "/",
    reason: "Execute esta instrucao no projeto: Implementar a marcação schema.org de Organization e ContactPoint com NAP consistente para reforçar autoridade e detalhes de contato.",
  },
  {
    from: "/sitemap-robots-gsc-auto",
    to: "/",
    reason: "Execute esta instrucao no projeto: Gerar e revisar o sitemap.xml e o robots.txt do site, e automatizar a submissão no Google Search Console para acelerar a indexação.",
  },
  {
    from: "/thank-you-page-optimization",
    to: "/",
    reason: "Execute esta instrucao no projeto: Adicionar uma página de agradecimento pós-envio com próximos passos, CTA de WhatsApp e FAQ rápida para eu aumentar a taxa de conversão.",
  },
  {
    from: "/whatsapp-fallback-alternatives",
    to: "/",
    reason: "Execute esta instrucao no projeto: Implementar um fallback que ofereça alternativas (ligação e e-mail com assunto e texto pré-preenchidos) caso o WhatsApp não abra no dispositivo do visitante.",
  },
  {
    from: "/faq-servicos-horarios-seo",
    to: "/",
    reason: "Execute esta instrucao no projeto: Adicione uma seção de FAQ completa e otimizada para SEO na página “Serviços e Horários”, incluindo perguntas sobre atendimento, tipos de serviço e como pedir cotação.",
  },
  {
    from: "/schema-faq-servicos-horarios",
    to: "/",
    reason: "Execute esta instrucao no projeto: Implemente schema.org para FAQ e para a página “Serviços e Horários”, garantindo rich snippets nos resultados de busca.",
  },
  {
    from: "/validar-rich-snippets-breadcrumb",
    to: "/",
    reason: "Execute esta instrucao no projeto: Verificar e validar os rich snippets de BreadcrumbList no Google Search Console e no Rich Results Test, corrigindo quaisquer erros de schema.org.",
  },
  {
    from: "/implementar-faqpage-global",
    to: "/",
    reason: "Execute esta instrucao no projeto: Implementar a marcação schema.org do tipo FAQPage em todas as seções de FAQ do site, garantindo rich snippets e consistência de headings.",
  },
  {
    from: "/local-business-organization-nap-registro",
    to: "/",
    reason: "Execute esta instrucao no projeto: Adicionar schema.org LocalBusiness e Organization com NAP (nome, endereço e telefone) e dados de contato da Patro Corretora de Seguros para reforçar SEO local.",
  },
  {
    from: "/sitemap-robots-bairros-otimizacao",
    to: "/",
    reason: "Execute esta instrucao no projeto: Gerar e configurar sitemap.xml e robots.txt otimizados para todas as landing pages de bairro, garantindo indexação mais rápida pelos mecanismos de busca.",
  },
  {
    from: "/contact-point-schema-registro",
    to: "/",
    reason: "Execute esta instrucao no projeto: Adicionar a marcação schema.org 'ContactPoint' com os canais de contato (telefone, e-mail e WhatsApp) da Patro Corretora de Seguros.",
  },
  {
    from: "/website-searchaction-schema-registro",
    to: "/",
    reason: "Execute esta instrucao no projeto: Implementar schema.org 'WebSite' com 'SearchAction' para melhorar a busca do site nos resultados do Google.",
  },
  {
    from: "/social-meta-tags-optimization",
    to: "/",
    reason: "Execute esta instrucao no projeto: Adicionar Open Graph e Twitter Card (título, descrição, imagem e URL canônica) em todas as páginas para melhorar a pré-visualização em compartilhamentos.",
  },
  {
    from: "/faqpage-schema-reinforcement",
    to: "/",
    reason: "Execute esta instrucao no projeto: Adicionar a marcação schema.org 'FAQPage' nas seções de FAQ de todas as páginas para reforçar rich snippets no Google.",
  },
  {
    from: "/auditoria-notas-100-check",
    to: "/",
    reason: "Execute esta instrucao no projeto: o que falta para o site atingir as notas 100/100",
  },
  {
    from: "/validacao-nucleo-seo-status",
    to: "/",
    reason: "Execute esta instrucao no projeto: o núcleo de infraestrutura de SEO do projeto esta fazendo as alteracoes corretas?",
  },
  {
    from: "/checklist-lighthouse-100",
    to: "/",
    reason: "Execute esta instrucao no projeto: Gere um checklist detalhado do que falta para atingir 100/100 no Lighthouse, com ações priorizadas por impacto e estimativa de esforço.",
  },
  {
    from: "/otimizacao-imagens-performance",
    to: "/",
    reason: "Execute esta instrucao no projeto: Otimize todas as imagens do site com WebP/AVIF, tamanhos responsivos, lazy loading e compressão para melhorar o carregamento e o CLS.",
  },
  {
    from: "/melhorias-core-web-vitals",
    to: "/admin/web-vitals-correlacao",
    reason: "Execute esta instrucao no projeto: Implemente melhorias de Core Web Vitals (reduzir JS, habilitar tree-shaking, minificar e carregar scripts críticos) para aumentar o desempenho e o TBT.",
  },
  {
    from: "/auditoria-seo-performance-100",
    to: "/admin/web-vitals-correlacao",
    reason: "Execute esta instrucao no projeto: Rodar uma auditoria completa de SEO e performance para verificar se o site consegue atingir 100/100 no Google PageSpeed e no Lighthouse, com um relatório detalhado.",
  },
];

/**
 * 301 por padrão (regex) — preservam o slug em um único salto.
 */
export const PATTERN_REDIRECTS: Array<{
  pattern: RegExp;
  replace: (m: RegExpMatchArray) => string;
  reason: string;
}> = [
  {
    // Estrutura definitiva dos artigos é /blog/{slug}.
    pattern: /^\/artigos\/([^/?#]+)\/?$/i,
    replace: (m) => `/blog/${m[1]}`,
    reason: "Unificação /artigos → /blog preservando o slug.",
  },
  {
    // Legado WordPress `/slug-2/`
    pattern: /^\/([a-z0-9-]+)-2\/?$/i,
    replace: (m) => `/${m[1]}`,
    reason: "Sufixo -2 gerado por duplicata do WordPress.",
  },
];

/**
 * 410 Gone — conteúdo removido definitivamente e SEM substituto equivalente.
 * Decisão: tags/feeds/arquivos do WordPress não têm equivalente editorial;
 * redirecioná-los para /blog seria redirect genérico (proibido no escopo).
 */
export const GONE_PATTERNS: GoneRule[] = [
  { pattern: /^\/tag(\/|$)/i, reason: "Taxonomia de tags do WordPress descontinuada, sem equivalente editorial." },
  { pattern: /^\/category(\/|$)/i, reason: "Taxonomia de categorias do WordPress descontinuada." },
  { pattern: /(^|\/)feed\/?$/i, reason: "Feeds RSS do WordPress desativados." },
  { pattern: /^\/wp-(content|admin|includes|json)(\/|$)/i, reason: "Estrutura interna do WordPress removida." },
  { pattern: /^\/author(\/|$)/i, reason: "Arquivos de autor do WordPress descontinuados (autores vivem em /blog/autor/:slug)." },
  { pattern: /^\/\d{4}\/\d{2}(\/|$)/, reason: "Arquivos por data do WordPress descontinuados." },
  { pattern: /^\/odonto-personal\/?$/i, reason: "Produto removido definitivamente." },
  { pattern: /^\/riscos-industriais\/?$/i, reason: "Estrutura removida." },
  { pattern: /^\/seguro-do\/?$/i, reason: "Alias removido em favor do canônico." },
  { pattern: /^\/seguro-valores\/?$/i, reason: "Alias removido." },
];

/** Normaliza um pathname para a forma canônica (sem barra final). */
export const normalizePath = (pathname: string): string => {
  const clean = pathname.split("?")[0].split("#")[0];
  if (clean === "/" || clean === "") return "/";
  return clean.replace(/\/+$/, "");
};

export type ResolvedRoute =
  | { kind: "redirect"; to: string; reason: string }
  | { kind: "gone"; reason: string }
  | { kind: "none" };

/**
 * Resolve um pathname desconhecido para redirect 301, 410 ou nada (=404).
 * Garante um único salto: o destino é sempre a URL final canônica.
 */
export const resolveRoute = (pathname: string): ResolvedRoute => {
  const path = normalizePath(pathname);

  const exact = EXACT_REDIRECTS.find((r) => r.from.toLowerCase() === path.toLowerCase());
  if (exact) return { kind: "redirect", to: exact.to, reason: exact.reason };

  for (const rule of PATTERN_REDIRECTS) {
    const m = path.match(rule.pattern);
    if (m) {
      const to = rule.replace(m);
      // Evita loop: nunca redireciona para si mesmo.
      if (normalizePath(to).toLowerCase() !== path.toLowerCase()) {
        return { kind: "redirect", to, reason: rule.reason };
      }
    }
  }

  const gone = GONE_PATTERNS.find((g) => g.pattern.test(path));
  if (gone) return { kind: "gone", reason: gone.reason };

  return { kind: "none" };
};
