/* AUTO-GENERATED por scripts/generate-og-images.mjs — não editar. */
/**
 * Mapa pathname → URL absoluto da imagem OG gerada automaticamente.
 * Consumido por src/components/PageMeta.tsx para popular og:image /
 * twitter:image em páginas de bairro e produto×bairro sem intervenção manual.
 */
export const GENERATED_OG_IMAGES: Record<string, string> = {
  "/seguros-guarulhos/jardim-maia": "https://www.patroseguros.com.br/images/og/bairro-jardim-maia.jpg",
  "/seguros-guarulhos/vila-augusta": "https://www.patroseguros.com.br/images/og/bairro-vila-augusta.jpg",
  "/seguros-guarulhos/cumbica": "https://www.patroseguros.com.br/images/og/bairro-cumbica.jpg",
  "/seguros-guarulhos/centro": "https://www.patroseguros.com.br/images/og/bairro-centro.jpg",
  "/seguros-guarulhos/picanco": "https://www.patroseguros.com.br/images/og/bairro-picanco.jpg",
  "/seguros-guarulhos/macedo": "https://www.patroseguros.com.br/images/og/bairro-macedo.jpg",
  "/seguros-guarulhos/gopouva": "https://www.patroseguros.com.br/images/og/bairro-gopouva.jpg",
  "/seguros-guarulhos/bonsucesso": "https://www.patroseguros.com.br/images/og/bairro-bonsucesso.jpg",
  "/seguros-guarulhos/paraventi": "https://www.patroseguros.com.br/images/og/bairro-paraventi.jpg",
  "/seguros-guarulhos/continental": "https://www.patroseguros.com.br/images/og/bairro-continental.jpg",
  "/seguros-guarulhos/pimentas": "https://www.patroseguros.com.br/images/og/bairro-pimentas.jpg",
  "/seguros-guarulhos/taboao": "https://www.patroseguros.com.br/images/og/bairro-taboao.jpg",
  "/seguros-guarulhos/vila-galvao": "https://www.patroseguros.com.br/images/og/bairro-vila-galvao.jpg",
  "/seguros-guarulhos/aeroporto-guarulhos": "https://www.patroseguros.com.br/images/og/bairro-aeroporto-guarulhos.jpg",
  "/seguros-guarulhos/cidade-industrial-satelite": "https://www.patroseguros.com.br/images/og/bairro-cidade-industrial-satelite.jpg",
  "/seguros-guarulhos/jardim-cumbica": "https://www.patroseguros.com.br/images/og/bairro-jardim-cumbica.jpg",
  "/seguros-guarulhos/vila-rio": "https://www.patroseguros.com.br/images/og/bairro-vila-rio.jpg",
  "/seguros-guarulhos/ponte-grande": "https://www.patroseguros.com.br/images/og/bairro-ponte-grande.jpg",
  "/seguros-guarulhos/agua-chata": "https://www.patroseguros.com.br/images/og/bairro-agua-chata.jpg",
  "/seguros-guarulhos/jardim-sao-joao": "https://www.patroseguros.com.br/images/og/bairro-jardim-sao-joao.jpg",
  "/seguros-guarulhos/cocaia": "https://www.patroseguros.com.br/images/og/bairro-cocaia.jpg",
  "/seguros-guarulhos/jardim-fatima": "https://www.patroseguros.com.br/images/og/bairro-jardim-fatima.jpg"
};

export function getGeneratedOgImage(pathname: string): string | undefined {
  const clean = pathname.replace(/\/+$/, "") || "/";
  return GENERATED_OG_IMAGES[clean];
}
