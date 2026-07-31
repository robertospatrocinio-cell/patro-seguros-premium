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
