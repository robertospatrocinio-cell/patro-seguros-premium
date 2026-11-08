import type { SeoLocalPageConfig } from "@/data/seoLocalAutoPages";
import { buildCommercialLocalPage, type CommercialLocalSeed } from "./localCommercialContent";

/** Catálogo existente: não ampliar sem revisão de demanda e conteúdo próprio.
 * As páginas compartilham orientação de contratação, não prova de originalidade local.
 * Preços, classificações de risco e casos sem documentação foram retirados.
 */
const seeds: (Omit<CommercialLocalSeed, "slug"> & { suffix: string })[] = [
  { bairro: "Cidade Maia", suffix: "cidade-maia", focus: "Informe o CEP para confirmar a localização de atendimento." },
  { bairro: "Cumbica", suffix: "cumbica", hubSlug: "cumbica" },
  { bairro: "Centro", suffix: "centro-guarulhos", hubSlug: "centro" },
  { bairro: "Vila Augusta", suffix: "vila-augusta", hubSlug: "vila-augusta" },
  { bairro: "Jardim Maia", suffix: "jardim-maia", hubSlug: "jardim-maia" },
  { bairro: "Bonsucesso", suffix: "bonsucesso", hubSlug: "bonsucesso" },
  { bairro: "Pimentas", suffix: "pimentas", hubSlug: "pimentas" },
  { bairro: "Taboão", suffix: "taboao-guarulhos", hubSlug: "taboao" },
  { bairro: "Macedo", suffix: "macedo-guarulhos", hubSlug: "macedo" },
  { bairro: "Gopoúva", suffix: "gopouva-guarulhos", hubSlug: "gopouva" },
  { bairro: "Picanço", suffix: "picanco-guarulhos", hubSlug: "picanco" },
];

// Preserva as exclusões e a precedência das fontes do catálogo anterior.
// Não preenche rotas sem conteúdo nem substitui configurações de outros catálogos.
const alreadyDefined = new Set([
  "seguro-residencial-centro-guarulhos", "seguro-residencial-vila-augusta",
  "seguro-residencial-jardim-maia", "seguro-residencial-taboao-guarulhos",
  "seguro-residencial-gopouva-guarulhos", "seguro-empresarial-cumbica",
  "seguro-empresarial-bonsucesso", "seguro-empresarial-pimentas",
  "seguro-empresarial-taboao-guarulhos", "seguro-empresarial-macedo-guarulhos",
  "seguro-empresarial-gopouva-guarulhos", "seguro-vida-centro-guarulhos",
  "seguro-vida-gopouva-guarulhos", "seguro-vida-jardim-maia",
  "seguro-vida-taboao-guarulhos", "seguro-vida-vila-augusta",
  "seguro-vida-cidade-maia", "seguro-empresarial-centro-guarulhos",
  "seguro-empresarial-jardim-maia", "seguro-empresarial-vila-augusta",
  "seguro-empresarial-cidade-maia",
]);

function build(): Record<string, SeoLocalPageConfig> {
  const pages: Record<string, SeoLocalPageConfig> = {};
  for (const seed of seeds) {
    for (const product of ["residencial", "vida", "empresarial"] as const) {
      const slug = `seguro-${product}-${seed.suffix}`;
      if (!alreadyDefined.has(slug)) {
        pages[slug] = buildCommercialLocalPage(product, { ...seed, slug });
      }
    }
  }
  return pages;
}

export const seoLocalProdutoBairroPages = build();
export const seoLocalProdutoBairroSlugs = Object.keys(seoLocalProdutoBairroPages);
