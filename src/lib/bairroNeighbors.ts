/**
 * Interlinking de bairros vizinhos + landing pages verticais.
 *
 * Fonte única para:
 *   - Seção "Bairros vizinhos" no hub `/seguros-guarulhos/:bairro`
 *   - Campo `nearbyAreas` das páginas produto×bairro (LocalPageTemplate)
 *
 * Chaves = `hubSlug` (mesmo id usado em `src/lib/bairrosData.ts`).
 * Cada bairro lista 3-4 vizinhos geograficamente próximos em Guarulhos.
 * Ordem manual (não alfabética) — mais relevante primeiro.
 */

import { bairros } from "@/lib/bairrosData";

export const BAIRRO_NEIGHBORS: Record<string, string[]> = {
  "jardim-maia": ["centro", "vila-augusta", "macedo", "gopouva"],
  "vila-augusta": ["jardim-maia", "centro", "macedo", "picanco"],
  "cumbica": ["aeroporto-guarulhos", "jardim-cumbica", "cidade-industrial-satelite", "bonsucesso"],
  "centro": ["jardim-maia", "vila-augusta", "gopouva", "macedo"],
  "picanco": ["vila-augusta", "gopouva", "taboao", "macedo"],
  "macedo": ["jardim-maia", "vila-augusta", "picanco", "centro"],
  "gopouva": ["centro", "jardim-maia", "taboao", "picanco"],
  "bonsucesso": ["cumbica", "jardim-cumbica", "cidade-industrial-satelite", "aeroporto-guarulhos"],
  "paraventi": ["pimentas", "cocaia", "jardim-sao-joao", "taboao"],
  "continental": ["taboao", "gopouva", "vila-galvao", "macedo"],
  "pimentas": ["paraventi", "cocaia", "agua-chata", "jardim-sao-joao"],
  "taboao": ["gopouva", "picanco", "continental", "vila-galvao"],
  "vila-galvao": ["taboao", "ponte-grande", "continental", "jardim-maia"],
  "aeroporto-guarulhos": ["cumbica", "bonsucesso", "jardim-cumbica", "cidade-industrial-satelite"],
  "cidade-industrial-satelite": ["cumbica", "bonsucesso", "aeroporto-guarulhos", "jardim-cumbica"],
  "jardim-cumbica": ["cumbica", "bonsucesso", "cidade-industrial-satelite", "aeroporto-guarulhos"],
  "vila-rio": ["ponte-grande", "vila-galvao", "agua-chata", "jardim-sao-joao"],
  "ponte-grande": ["vila-galvao", "vila-rio", "jardim-fatima", "continental"],
  "agua-chata": ["pimentas", "cocaia", "vila-rio", "jardim-sao-joao"],
  "jardim-sao-joao": ["pimentas", "paraventi", "cocaia", "agua-chata"],
  "cocaia": ["pimentas", "paraventi", "agua-chata", "jardim-sao-joao"],
  "jardim-fatima": ["ponte-grande", "vila-galvao", "vila-rio", "taboao"],
};

/**
 * Bairros vizinhos resolvidos com nome de exibição.
 * Filtra ids ausentes em `bairros` para nunca quebrar links.
 */
export function getNeighborBairros(
  hubSlug: string,
): { id: string; nome: string; href: string }[] {
  const ids = BAIRRO_NEIGHBORS[hubSlug] ?? [];
  return ids
    .map((id) => {
      const b = bairros.find((x) => x.id === id);
      if (!b) return null;
      return { id: b.id, nome: b.nome, href: `/seguros-guarulhos/${b.id}` };
    })
    .filter((x): x is { id: string; nome: string; href: string } => Boolean(x));
}

/**
 * Ids brutos dos vizinhos (uso em builders de dados SEO que precisam
 * mapear para slugs de landing pages produto×bairro).
 */
export function getNeighborIds(hubSlug: string): string[] {
  return BAIRRO_NEIGHBORS[hubSlug] ?? [];
}
