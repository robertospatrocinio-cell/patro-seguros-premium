/**
 * guarulhosGeo — Fonte única para dados geográficos de Guarulhos e bairros.
 *
 * Usado por `InsurancePageTemplate` para injetar automaticamente
 * `neighborhood` + `geo` no `LocalAreaSchema` quando o título/URL menciona
 * um bairro conhecido. Reforça o sinal local para o Google sem exigir que
 * cada página Seo*Guarulhos.tsx passe as coordenadas manualmente.
 *
 * Coordenadas aproximadas dos centroides dos bairros. Sede da Patro fica
 * no Cidade Maia — usada como fallback quando a página é city-wide.
 */

export interface GuarulhosGeo {
  /** Nome canônico do bairro (mesma capitalização usada no schema). */
  name: string;
  latitude: number;
  longitude: number;
  /** Regex compilada usada para detectar o bairro em um título de página. */
  match: RegExp;
}

export const GUARULHOS_SEDE_GEO = {
  latitude: -23.4557,
  longitude: -46.5220,
} as const;

export const GUARULHOS_BAIRROS: GuarulhosGeo[] = [
  { name: "Cidade Maia",     latitude: -23.4557, longitude: -46.5220, match: /cidade\s*maia/i },
  { name: "Cumbica",         latitude: -23.4360, longitude: -46.4790, match: /cumbica/i },
  { name: "Bonsucesso",      latitude: -23.4210, longitude: -46.4200, match: /bonsucesso/i },
  { name: "Vila Galvão",     latitude: -23.4720, longitude: -46.5620, match: /vila\s*galv[ãa]o/i },
  { name: "Gopoúva",         latitude: -23.4600, longitude: -46.5350, match: /gopo[úu]va/i },
  { name: "Vila Augusta",    latitude: -23.4640, longitude: -46.5300, match: /vila\s*augusta/i },
  { name: "Jardim Maia",     latitude: -23.4620, longitude: -46.5250, match: /jardim\s*maia/i },
  { name: "Pimentas",        latitude: -23.4370, longitude: -46.4340, match: /pimentas/i },
  { name: "Taboão",          latitude: -23.4880, longitude: -46.5380, match: /tabo[ãa]o/i },
  { name: "Picanço",         latitude: -23.4680, longitude: -46.5140, match: /pican[çc]o/i },
  { name: "Macedo",          latitude: -23.4820, longitude: -46.5540, match: /macedo/i },
  { name: "Jardim São Paulo", latitude: -23.4750, longitude: -46.5410, match: /jardim\s*s[ãa]o\s*paulo/i },
];

/**
 * Detecta o bairro de Guarulhos referenciado em uma string (title, subtitle
 * ou pathname). Retorna `null` se nenhum bairro conhecido for encontrado.
 */
export function detectGuarulhosNeighborhood(
  ...sources: (string | undefined | null)[]
): GuarulhosGeo | null {
  const haystack = sources.filter(Boolean).join(" ");
  if (!haystack) return null;
  for (const b of GUARULHOS_BAIRROS) {
    if (b.match.test(haystack)) return b;
  }
  return null;
}

/**
 * Verifica se a string faz referência a Guarulhos (cidade, bairros ou
 * Cumbica/aeroporto). Serve para decidir se ativamos o reforço local.
 */
export function isGuarulhosContext(
  ...sources: (string | undefined | null)[]
): boolean {
  const haystack = sources.filter(Boolean).join(" ").toLowerCase();
  if (!haystack) return false;
  return /guarulhos|cumbica|bonsucesso|cidade\s*maia|gopo[úu]va|pimentas|vila\s*galv[ãa]o/.test(
    haystack,
  );
}