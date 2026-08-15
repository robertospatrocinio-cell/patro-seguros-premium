import { EXACT_REDIRECTS, PATTERN_REDIRECTS, GONE_PATTERNS } from "./redirects";

/**
 * Normaliza um path para comparação:
 * - Remove espaços.
 * - Garante barra inicial única.
 * - Remove barra final (exceto para a raiz "/").
 */
export const normalizePath = (path: string): string => {
  let p = path.trim().replace(/\/+$/, "");
  if (p === "") return "/";
  if (!p.startsWith("/")) p = "/" + p;
  return p;
};

export const CANONICAL_ORIGIN = "https://www.patroseguros.com.br";

export type ResolveResult =
  | { kind: "none" }
  | { kind: "redirect"; to: string; reason: string }
  | { kind: "gone"; reason: string };

/**
 * Lógica central de resolução de rotas.
 * Chamada por App.tsx (SPA), scripts de build e post-build.
 */
export const resolveRoute = (path: string): ResolveResult => {
  const norm = normalizePath(path);

  // 1. Busca exata (case-insensitive)
  const exact = EXACT_REDIRECTS.find(
    (r) => normalizePath(r.from).toLowerCase() === norm.toLowerCase()
  );
  if (exact) {
    return { kind: "redirect", to: exact.to, reason: exact.reason };
  }

  // 2. Busca por Regex
  for (const rule of PATTERN_REDIRECTS) {
    const m = norm.match(rule.pattern);
    if (m) {
      const to = rule.replace(m);
      // Evita loop infinito: se o destino normalizado for igual à origem
      if (normalizePath(to).toLowerCase() !== norm.toLowerCase()) {
        return { kind: "redirect", to, reason: rule.reason };
      }
    }
  }

  // 3. Busca por padrões removidos (410 Gone)
  const gone = GONE_PATTERNS.find((g) => g.pattern.test(norm));
  if (gone) {
    return { kind: "gone", reason: gone.reason };
  }

  return { kind: "none" };
};
