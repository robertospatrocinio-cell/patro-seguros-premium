/**
 * Mapeamento centralizado de slugs LEGADOS → slug canônico atual
 * para páginas de bairros e produto×bairro em Guarulhos.
 *
 * Contexto: durante a expansão SEO local, alguns bairros passaram
 * a exigir sufixo "-guarulhos" (para desambiguar de homônimos em
 * outras cidades) e outros perderam o sufixo. Este arquivo garante
 * 301 (client-side via <Navigate replace>) para preservar equity de
 * SEO e evitar 404 em links externos/GSC.
 *
 * As mesmas rotas são espelhadas server-side em public/.htaccess.
 */

type Produto = "residencial" | "vida" | "empresarial";
const PRODUTOS: Produto[] = ["residencial", "vida", "empresarial"];

/** Hubs de bairro: /seguros-guarulhos/<slug> */
const HUB_ALIASES: Record<string, string> = {
  "centro-guarulhos": "centro",
  "taboao-guarulhos": "taboao",
  "macedo-guarulhos": "macedo",
  "gopouva-guarulhos": "gopouva",
  "picanco-guarulhos": "picanco",
  "jardim-cidade-maia": "cidade-maia",
  "cidade-jardim-maia": "jardim-maia",
};

/**
 * Bairros publicados COM sufixo "-guarulhos" no slug de produto×bairro.
 * Legacy = mesma URL SEM o sufixo.
 */
const CANON_WITH_SUFFIX = [
  "centro-guarulhos",
  "taboao-guarulhos",
  "macedo-guarulhos",
  "gopouva-guarulhos",
  "picanco-guarulhos",
];

/**
 * Bairros publicados SEM sufixo "-guarulhos" no slug de produto×bairro.
 * Legacy = mesma URL COM o sufixo adicionado.
 */
const CANON_WITHOUT_SUFFIX = [
  "cumbica",
  "bonsucesso",
  "pimentas",
  "vila-augusta",
  "jardim-maia",
  "cidade-maia",
];

export type LegacyRedirect = { from: string; to: string };

function buildProdutoBairroRedirects(): LegacyRedirect[] {
  const out: LegacyRedirect[] = [];
  for (const produto of PRODUTOS) {
    for (const canon of CANON_WITH_SUFFIX) {
      const stripped = canon.replace(/-guarulhos$/, "");
      out.push({
        from: `/seguro-${produto}-${stripped}`,
        to: `/seguro-${produto}-${canon}`,
      });
    }
    for (const canon of CANON_WITHOUT_SUFFIX) {
      out.push({
        from: `/seguro-${produto}-${canon}-guarulhos`,
        to: `/seguro-${produto}-${canon}`,
      });
    }
  }
  return out;
}

function buildHubRedirects(): LegacyRedirect[] {
  return Object.entries(HUB_ALIASES).map(([from, to]) => ({
    from: `/seguros-guarulhos/${from}`,
    to: `/seguros-guarulhos/${to}`,
  }));
}

/**
 * Lista completa de redirects legados (hubs + produto×bairro), sem duplicatas.
 * Consumida por App.tsx (SPA <Navigate>) e por scripts de auditoria.
 */
export const LEGACY_BAIRRO_REDIRECTS: LegacyRedirect[] = (() => {
  const all = [...buildHubRedirects(), ...buildProdutoBairroRedirects()];
  const seen = new Set<string>();
  return all.filter((r) => {
    if (seen.has(r.from)) return false;
    seen.add(r.from);
    return true;
  });
})();