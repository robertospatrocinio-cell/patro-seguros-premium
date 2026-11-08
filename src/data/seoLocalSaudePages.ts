import type { SeoLocalPageConfig } from "./seoLocalAutoPages";
import { buildCommercialLocalPage, type CommercialLocalSeed } from "./localCommercialContent";

/** URLs existantes conservadas. Rede, preços, estatísticas e relatos sem
 * comprovação não são reutilizados como fatos. Não expandir este catálogo.
 */
const healthSeeds: CommercialLocalSeed[] = [
  { slug: "plano-saude-centro-guarulhos", bairro: "Centro", hubSlug: "centro" },
  { slug: "plano-saude-cidade-maia", bairro: "Cidade Maia" },
  { slug: "plano-saude-picanco", bairro: "Picanço", hubSlug: "picanco" },
  { slug: "plano-saude-vila-augusta", bairro: "Vila Augusta", hubSlug: "vila-augusta" },
  { slug: "plano-saude-taboao-guarulhos", bairro: "Taboão", hubSlug: "taboao" },
  { slug: "plano-saude-macedo-guarulhos", bairro: "Macedo", hubSlug: "macedo" },
  { slug: "plano-saude-gopouva-guarulhos", bairro: "Gopoúva", hubSlug: "gopouva" },
];
const homeSeeds: CommercialLocalSeed[] = [
  { slug: "seguro-residencial-centro-guarulhos", bairro: "Centro", hubSlug: "centro" },
  { slug: "seguro-residencial-vila-augusta", bairro: "Vila Augusta", hubSlug: "vila-augusta" },
  { slug: "seguro-residencial-jardim-maia", bairro: "Jardim Maia", hubSlug: "jardim-maia" },
  { slug: "seguro-residencial-taboao-guarulhos", bairro: "Taboão", hubSlug: "taboao" },
  { slug: "seguro-residencial-gopouva-guarulhos", bairro: "Gopoúva", hubSlug: "gopouva" },
];
const businessSeeds: CommercialLocalSeed[] = [
  { slug: "seguro-empresarial-cumbica", bairro: "Cumbica", hubSlug: "cumbica", focus: "Para galpões, informe a ocupação e os interesses do proprietário e do ocupante separadamente." },
  { slug: "seguro-empresarial-bonsucesso", bairro: "Bonsucesso", hubSlug: "bonsucesso" },
  { slug: "seguro-empresarial-pimentas", bairro: "Pimentas", hubSlug: "pimentas" },
  { slug: "seguro-galpao-guarulhos", bairro: "Guarulhos", focus: "Para galpões, informe a ocupação e os interesses do proprietário e do ocupante separadamente." },
  { slug: "seguro-empresarial-taboao-guarulhos", bairro: "Taboão", hubSlug: "taboao" },
  { slug: "seguro-empresarial-macedo-guarulhos", bairro: "Macedo", hubSlug: "macedo" },
  { slug: "seguro-empresarial-gopouva-guarulhos", bairro: "Gopoúva", hubSlug: "gopouva" },
];

export const seoLocalSaudePages: Record<string, SeoLocalPageConfig> = {};
for (const [product, seeds] of [["saude", healthSeeds], ["residencial", homeSeeds], ["empresarial", businessSeeds]] as const) {
  for (const seed of seeds) {
    seoLocalSaudePages[seed.slug] = buildCommercialLocalPage(product, seed);
  }
}
export const seoLocalSaudeSlugs = Object.keys(seoLocalSaudePages);
export const seoLocalPageSlugs = seoLocalSaudeSlugs;
