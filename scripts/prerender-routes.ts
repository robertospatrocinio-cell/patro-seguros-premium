/**
 * Lista de rotas que serão pré-renderizadas em HTML estático no `vite build`.
 *
 * Estratégia em fases — começamos com as ~40 rotas de maior valor SEO (Fase 1).
 * As demais 200+ rotas continuam funcionando como SPA (fallback do index.html).
 *
 * Rotas EXCLUÍDAS de propósito:
 *  - /cotacao, /cotacao-seguro-auto, /formulario-*: efeitos de analytics no mount
 *  - /indique-um-amigo, /ebook-consorcio: conversão, não descoberta
 *  - /admin/*, /crm: protegidas / privadas
 *  - /avaliar-no-google: redireciona para Google
 */
export const PRERENDER_ROUTES_PHASE_1: string[] = [
  // Institucional + topo de funil
  "/",
  "/sobre",
  "/sobre-guarulhos",
  "/contato",
  "/parceiros",
  "/parceiros-locais",
  "/depoimentos",
  "/imprensa",
  "/faq",
  "/glossario-seguros",
  "/blog",
  "/central-de-sinistro",
  "/politica-privacidade",
  "/termos-de-uso",

  // Pilares de produto (auto)
  "/seguro-auto",
  "/seguro-auto/marcas",
  "/seguro-auto/modelos",
  "/seguro-auto/comparativo-coberturas",
  "/seguro-moto",
  "/seguro-frota",
  "/seguro-transporte",

  // Pilares de produto (pessoa/família)
  "/seguro-vida",
  "/seguro-residencial",
  "/seguro-viagem",
  "/seguro-fianca",
  "/seguro-celular",
  "/seguro-saude",
  "/seguro-odonto",
  "/planos-de-saude",
  "/previdencia-privada",

  // Pilares de produto (empresa/agro)
  "/seguro-empresarial",
  "/seguros-empresariais",
  "/seguro-agro",
  "/seguro-rural",
  "/seguro-maquinas",
  "/seguro-maquinas-agricolas",
  "/seguro-condominio",
  "/seguro-engenharia",
  "/seguro-cyber",

  // Responsabilidade Civil
  "/seguro-rc",
  "/seguro-rc-profissional",

  // Consórcio
  "/consorcio",
  "/consorcio-carro",
  "/consorcio-imoveis",
  "/consorcio-veiculos-pesados",

  // Hubs locais Guarulhos (alta autoridade local)
  "/seguros-em-guarulhos",
  "/seguros-guarulhos",
  "/seguro-auto-guarulhos",
  "/comparativo-planos-saude-guarulhos",

  // Fase 4 SEO — Nichos defensáveis
  "/seguro-galpao-cumbica",
  "/seguro-fianca-guarulhos",
  "/seguro-taxi-guarulhos",

  // Páginas pilares locais (Fases 1 e 3 SEO Guarulhos)
  "/corretora-de-seguros-em-guarulhos",
  "/consorcio-guarulhos",
  "/seguro-empresarial-guarulhos",
  "/seguro-frota-empresas-guarulhos",
  "/seguros-empresariais-pme-guarulhos",
  "/seguro-condominio-guarulhos",
  "/seguro-residencial-guarulhos",
  "/seguro-vida-saude-guarulhos",
  "/seguro-moto-guarulhos",
  "/plano-saude-guarulhos",
];

/**
 * FASE 2 — Conteúdo de cauda longa (blog + bairros).
 *
 * As listas reais são extraídas dinamicamente em `scripts/prerender-react.mjs`
 * lendo `src/lib/blogData.ts` (posts) e `src/lib/bairrosData.ts` (bairros).
 * Mantemos aqui apenas as âncoras fixas adicionais.
 */
export const PRERENDER_ROUTES_PHASE_2_EXTRA: string[] = [
  "/seguros-guarulhos-bairros",
];

/**
 * Validação leve — garante que não haja duplicatas nem strings vazias.
 */
export function dedupeRoutes(routes: string[]): string[] {
  return [...new Set(routes.map((r) => r.trim()).filter(Boolean))];
}