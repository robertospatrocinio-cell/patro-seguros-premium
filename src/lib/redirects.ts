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
 */
export const EXACT_REDIRECTS: RedirectRule[] = [
  {
    from: "/seguros-cidade-maia-guarulhos",
    to: "/seguros-shopping-maia-cidade-maia-guarulhos",
    reason: "Redirecionamento técnico para URL canônica do bairro Cidade Maia.",
  },
  {
    from: "/seguros-guarulhos",
    to: "/seguros-em-guarulhos",
    reason: "Consolidação de hub geográfico principal para a versão 'em-guarulhos'.",
  },
  {
    from: "/seguro-auto-corolla-guarulhos",
    to: "/seguro-auto-toyota-corolla-guarulhos",
    reason: "Redirecionamento para a URL canônica com a marca incluída.",
  },
  {
    from: "/seguro-auto-hb20-guarulhos",
    to: "/seguro-auto-hyundai-hb20-guarulhos",
    reason: "Redirecionamento para a URL canônica com a marca incluída.",
  },
  {
    from: "/seguro-auto-onix-guarulhos",
    to: "/seguro-auto-chevrolet-onix-guarulhos",
    reason: "Redirecionamento para a URL canônica com a marca incluída.",
  },
  {
    from: "/seguro-auto-compass-guarulhos",
    to: "/seguro-auto-jeep-compass-guarulhos",
    reason: "Redirecionamento para a URL canônica com a marca incluída.",
  },
  {
    from: "/seguro-auto-hilux-guarulhos",
    to: "/seguro-auto-toyota-hilux-guarulhos",
    reason: "Redirecionamento para a URL canônica com a marca incluída.",
  },
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
    from: "/seguros-em-guarulhos",
    to: "/seguros-guarulhos",
    reason: "Consolidação de hub geográfico principal.",
  },
  {
    from: "/corretora-de-seguros-em-guarulhos",
    to: "/seguros-guarulhos",
    reason: "Migração da página institucional para o hub pilar de autoridade local.",
  },
  {
    from: "/seguro-transporte",
    to: "/seguro-transporte-carga-guarulhos",
    reason: "Foco na vertical de transporte e carga local.",
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
  }
];

/**
 * Padrões de redirect baseados em Regex.
 */
export const PATTERN_REDIRECTS = [
  {
    pattern: /^\/bairro\/(.*)/,
    replace: (match: RegExpMatchArray) => `/seguros-${match[1]}-guarulhos`,
    reason: "Migração de estrutura legada de bairros para padrão /seguros-BAIRRO-guarulhos."
  }
];

/**
 * Padrões de conteúdo removido sem substituto (410 Gone).
 */
export const GONE_PATTERNS: GoneRule[] = [
  {
    pattern: /\/old-wp-content\/.*/,
    reason: "Conteúdo legado do WordPress sem equivalência no novo site."
  }
];

/**
 * Normaliza um path para comparação.
 */
export const normalizePath = (path: string): string => {
  let p = path.trim().replace(/\/+$/, "");
  if (p === "") return "/";
  if (!p.startsWith("/")) p = "/" + p;
  return p;
};

export type ResolveResult =
  | { kind: "none" }
  | { kind: "redirect"; to: string; reason: string }
  | { kind: "gone"; reason: string };

/**
 * Lógica central de resolução de rotas.
 */
export const resolveRoute = (path: string): ResolveResult => {
  const norm = normalizePath(path);

  const exact = EXACT_REDIRECTS.find(
    (r) => normalizePath(r.from).toLowerCase() === norm.toLowerCase()
  );
  if (exact) return { kind: "redirect", to: exact.to, reason: exact.reason };

  for (const rule of PATTERN_REDIRECTS) {
    const m = norm.match(rule.pattern);
    if (m) {
      const to = rule.replace(m);
      if (normalizePath(to).toLowerCase() !== norm.toLowerCase()) {
        return { kind: "redirect", to, reason: rule.reason };
      }
    }
  }

  const gone = GONE_PATTERNS.find((g) => g.pattern.test(norm));
  if (gone) return { kind: "gone", reason: gone.reason };

  return { kind: "none" };
};
