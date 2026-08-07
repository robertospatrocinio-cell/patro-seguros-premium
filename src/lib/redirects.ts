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
