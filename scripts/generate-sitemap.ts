// Build-time sitemap generator — called by Vite plugin
//
// Generates a sitemap-index.xml plus cluster-specific sitemaps so Google can
// discover and prioritize each topical area independently:
//   - sitemap-guarulhos.xml   → hubs e páginas comerciais cidade-wide de Guarulhos
//   - sitemap-bairros.xml     → bairros + páginas locais hyper-segmentadas
//                               (auto-descoberto a partir de seoLocalPages)
//   - sitemap-auto.xml        → veículos (auto, moto, frota, caminhão, etc.)
//   - sitemap-vida-saude.xml  → vida, saúde, planos, odonto, viagem, etc.
//   - sitemap-empresarial.xml → empresarial, RC, cyber, engenharia, garantia
//   - sitemap-geral.xml       → home, agro, consórcio, blog, institucional
//
// The legacy public/sitemap.xml is also regenerated as an equivalent flat
// sitemap for backward compatibility with already-submitted URLs.

const DOMAIN = "https://www.patroseguros.com.br";
const TODAY = new Date().toISOString().slice(0, 10);

interface SitemapEntry {
  loc: string;
  priority: string;
  changefreq: string;
  lastmod?: string;
}

// Priority tiers based on search intent
// 1.0 = homepage
// 0.9 = high-intent transactional (cotação, SEO local, core products)
// 0.8 = core product pages (seguros principais)
// 0.7 = secondary products, nichos, blog hub
// 0.6 = blog articles, tertiary products
// 0.5 = informational (depoimentos, parceiros)
// 0.3 = legal pages

const highIntentTransactional: SitemapEntry[] = [
  { loc: "/", priority: "1.0", changefreq: "daily" },
  { loc: "/cotacao", priority: "1.0", changefreq: "daily" },
  { loc: "/cotacao-seguro-auto", priority: "0.9", changefreq: "weekly" },
  { loc: "/contato", priority: "0.8", changefreq: "monthly" },
];

const seoLocalGuarulhos: SitemapEntry[] = [
  "/seguro-auto-guarulhos",
  "/seguro-moto-guarulhos",
  "/seguro-residencial-guarulhos",
  "/seguro-vida-saude-guarulhos",
  "/seguro-empresarial-guarulhos",
  "/seguro-frota-empresas-guarulhos",
  "/seguros-empresariais-pme-guarulhos",
  "/plano-saude-guarulhos",
  "/corretora-seguros-guarulhos",
  "/seguro-condominio-guarulhos",
  "/seguros-shopping-maia-cidade-maia-guarulhos",
  "/seguro-vida-guarulhos",
  "/seguro-uber-guarulhos",
  "/seguro-empresa-guarulhos",
  "/seguro-para-motorista-app-guarulhos",
  "/seguro-auto-por-modelo-guarulhos",
  "/seguros-guarulhos-bairros",
  "/seguros-em-guarulhos-bairros",
].map(loc => ({ loc, priority: "0.9", changefreq: "weekly" }));

const coreProducts: SitemapEntry[] = [
  "/seguro-auto",
  "/seguro-moto",
  "/seguro-vida",
  "/seguro-residencial",
  "/seguro-saude",
  "/planos-de-saude",
  "/seguro-empresarial",
  "/seguro-frota",
].map(loc => ({ loc, priority: "0.9", changefreq: "weekly" }));

const secondaryProducts: SitemapEntry[] = [
  "/seguro-viagem", "/seguro-celular", "/seguro-odonto",
  "/seguro-motorista-app", "/seguro-acidentes-pessoais",
  "/seguro-condominio", "/seguro-transporte", "/seguro-rc",
  "/seguro-rc-profissional", "/seguro-cyber", "/seguro-engenharia",
  "/seguro-fianca", "/seguro-fianca-locaticia", "/seguro-caminhao",
  "/seguro-vida-pme", "/seguro-galpao", "/seguro-galpoes-industriais", "/seguro-maquinas",
  "/seguro-rural", "/seguro-maquinas-agricolas", "/seguro-granja",
  "/consorcio", "/previdencia-privada", "/plano-saude-empresarial",
  "/seguro-vida/formulario",
].map(loc => ({ loc, priority: "0.7", changefreq: "monthly" }));

const tertiaryProducts: SitemapEntry[] = [
  "/seguro-bike", "/seguro-funeral", "/seguro-decesso",
  "/seguro-carta-verde", "/seguro-garantia", "/seguro-estagiario",
  "/seguro-imobiliario", "/seguro-lojas-shopping", "/seguro-armazenagem",
  "/seguro-placa-solar", "/seguro-maquinas-industriais",
  "/seguro-maquinas-linha-amarela", "/seguro-equipamentos-agricolas",
  "/seguro-drone-agricola", "/seguro-transporte-agro", "/seguro-pecuario",
  "/seguro-cafe", "/seguro-geada", "/seguro-ambiental",
  "/seguro-propriedade-rural", "/seguro-jetski", "/seguro-embarcacoes",
  "/seguro-avioes", "/seguro-helicopteros",
  "/seguro-rc-medicos", "/seguro-rc-dentistas", "/seguro-rc-advogados",
  "/seguro-rc-engenheiros", "/seguro-rc-veterinarios", "/seguro-rc-executivos",
  "/seguro-rc-obras", "/seguro-rc-prestacao-servicos", "/seguro-rc-eventos",
  "/plano-pet", "/consorcio-carro", "/consorcio-imoveis",
  "/consorcio-veiculos-pesados",
].map(loc => ({ loc, priority: "0.6", changefreq: "monthly" }));

const nichos: SitemapEntry[] = [
  "/seguros/medicos-e-clinicas",
  "/seguros/transportadoras",
  "/seguros/empresarios",
  "/seguros/profissionais-liberais",
  "/seguros/motoristas-app",
].map(loc => ({ loc, priority: "0.7", changefreq: "monthly" }));

const informational: SitemapEntry[] = [
  { loc: "/blog", priority: "0.7", changefreq: "weekly" },
  { loc: "/faq", priority: "0.7", changefreq: "weekly" },
  { loc: "/sobre", priority: "0.6", changefreq: "monthly" },
  { loc: "/depoimentos", priority: "0.5", changefreq: "monthly" },
  { loc: "/parceiros", priority: "0.5", changefreq: "monthly" },
  { loc: "/parceiros-locais", priority: "0.5", changefreq: "monthly" },
  { loc: "/imprensa", priority: "0.5", changefreq: "monthly" },
  { loc: "/indique-um-amigo", priority: "0.5", changefreq: "monthly" },
  { loc: "/sobre-guarulhos", priority: "0.7", changefreq: "monthly" },
  { loc: "/seguros-guarulhos", priority: "0.8", changefreq: "monthly" },
];

const guarulhosHub: SitemapEntry[] = [
  { loc: "/seguros-em-guarulhos", priority: "0.9", changefreq: "weekly" },
];

const investments: SitemapEntry[] = [
  { loc: "/investimentos", priority: "0.7", changefreq: "monthly" },
  { loc: "/planejamento-patrimonial", priority: "0.7", changefreq: "monthly" },
];

const bairroIds = [
  "jardim-maia", "vila-augusta", "cumbica", "centro", "picanco",
   "macedo", "gopouva", "bonsucesso", "paraventi", "continental", "taboao", "pimentas",
];
const bairroEntries: SitemapEntry[] = bairroIds.map(b => ({
  loc: `/seguros-guarulhos/${b}`,
  priority: "0.7",
  changefreq: "monthly",
}));

const legal: SitemapEntry[] = [
  { loc: "/politica-privacidade", priority: "0.3", changefreq: "yearly" },
  { loc: "/termos-de-uso", priority: "0.3", changefreq: "yearly" },
];

 /**
  * Escapes XML special characters and strips control characters.
  */
 function cleanXmlString(str: string): string {
   return str
     .replace(/&/g, '&amp;')
     .replace(/</g, '&lt;')
     .replace(/>/g, '&gt;')
     .replace(/"/g, '&quot;')
     .replace(/'/g, '&apos;')
     // Strip C0 and C1 control characters (except CR, LF, Tab)
     .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, '');
 }
 
 function entryToXml(e: SitemapEntry): string {
   const lastmod = e.lastmod || TODAY;
   const loc = cleanXmlString(`${DOMAIN}${e.loc}`);
   return `  <url>\n    <loc>${loc}</loc>\n    <priority>${e.priority}</priority>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${e.changefreq}</changefreq>\n  </url>`;
 }
 
 function urlsetFor(entries: SitemapEntry[]): string {
   return [
     '<?xml version="1.0" encoding="UTF-8"?>',
     '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
     ...entries.map(entryToXml),
     '</urlset>',
     '' // Final newline
   ].join('\n');
 }

export interface SitemapBundle {
  /** sitemap-index.xml content */
  index: string;
  /** filename → xml content (cluster sitemaps + legacy sitemap.xml) */
  files: Record<string, string>;
}

export function generateSitemap(blogSlugs: string[]): string {
  // Backward-compatible API: returns the flat sitemap.xml content.
  return generateSitemapBundle(blogSlugs, []).files["sitemap.xml"];
}

export function generateSitemapBundle(
  blogSlugs: string[],
  localPageSlugs: string[] = [],
): SitemapBundle {
  const blogEntries: SitemapEntry[] = blogSlugs.map(slug => ({
    loc: `/blog/${slug}`,
    priority: "0.6",
    changefreq: "monthly",
  }));

  // High-intent blog articles (guarulhos-focused) get higher priority
  blogEntries.forEach(e => {
    if (e.loc.includes("guarulhos") || e.loc.includes("corretora-de-seguros")) {
      e.priority = "0.7";
    }
  });

  // Local SEO pages auto-discovered from `src/data/seoLocalAutoPages.ts`.
  // Includes bairro pages (seguro-auto-vila-galvao, ...), modelo pages
  // (seguro-corolla-guarulhos, ...) and city-wide commercial slugs.
  const localPageEntries: SitemapEntry[] = localPageSlugs.map(slug => ({
    loc: `/${slug}`,
    priority: "0.8",
    changefreq: "weekly",
  }));

  // ---- Cluster definitions -------------------------------------------------

  const autoRoutes = new Set([
    "/seguro-auto", "/seguro-moto", "/seguro-caminhao", "/seguro-frota",
    "/seguro-motorista-app", "/seguro-bike", "/seguro-carta-verde",
    "/seguro-jetski", "/seguro-embarcacoes", "/seguro-avioes",
    "/seguro-helicopteros", "/cotacao-seguro-auto",
  ]);

  const vidaSaudeRoutes = new Set([
    "/seguro-vida", "/seguro-vida-pme", "/seguro-vida/formulario",
    "/seguro-saude", "/planos-de-saude", "/plano-saude-empresarial",
    "/seguro-odonto", "/seguro-acidentes-pessoais", "/seguro-funeral",
    "/seguro-decesso", "/seguro-viagem", "/previdencia-privada",
    "/plano-pet",
  ]);

  const empresarialRoutes = new Set([
    "/seguro-empresarial", "/seguro-galpao", "/seguro-galpoes-industriais",
    "/seguro-lojas-shopping", "/seguro-maquinas",
    "/seguro-maquinas-industriais", "/seguro-maquinas-linha-amarela",
    "/seguro-transporte", "/seguro-armazenagem", "/seguro-engenharia",
    "/seguro-garantia", "/seguro-cyber", "/seguro-estagiario",
    "/seguro-ambiental", "/seguro-rc", "/seguro-rc-profissional",
    "/seguro-rc-medicos", "/seguro-rc-dentistas", "/seguro-rc-advogados",
    "/seguro-rc-engenheiros", "/seguro-rc-veterinarios",
    "/seguro-rc-executivos", "/seguro-rc-obras",
    "/seguro-rc-prestacao-servicos", "/seguro-rc-eventos",
    "/seguros/empresarios", "/seguros/profissionais-liberais",
    "/seguros/medicos-e-clinicas", "/seguros/transportadoras",
    "/seguro-fianca", "/seguro-fianca-locaticia", "/seguro-imobiliario",
    "/seguro-condominio", "/seguro-residencial", "/seguro-celular",
    "/seguro-placa-solar",
  ]);

  const flat = [
    ...highIntentTransactional,
    ...seoLocalGuarulhos,
    ...coreProducts,
    ...secondaryProducts,
    ...tertiaryProducts,
    ...nichos,
    ...informational,
    ...investments,
    ...guarulhosHub,
    ...bairroEntries,
    ...localPageEntries,
    ...blogEntries,
    ...legal,
  ];

  // Dedupe by loc, keeping the highest priority entry.
  const dedup = new Map<string, SitemapEntry>();
  for (const e of flat) {
    const prev = dedup.get(e.loc);
    if (!prev || parseFloat(e.priority) > parseFloat(prev.priority)) {
      dedup.set(e.loc, e);
    }
  }
  const allEntries = [...dedup.values()];

  // ---- Split by cluster ----------------------------------------------------

  // Bairros / hyper-local long-tail go to dedicated sitemap-bairros.xml so
  // Google Search Console can track indexação por cluster local separadamente.
  const localSlugSet = new Set(localPageSlugs.map(s => `/${s}`));
  const isBairroOrLocal = (loc: string) =>
    loc.startsWith("/seguros-guarulhos/") || localSlugSet.has(loc);

  const isGuarulhosHub = (loc: string) =>
    loc.includes("guarulhos") || loc === "/seguros-em-guarulhos" ||
    loc === "/sobre-guarulhos";

  const guarulhosEntries: SitemapEntry[] = [];
  const bairrosEntries: SitemapEntry[] = [];
  const autoEntries: SitemapEntry[] = [];
  const vidaSaudeEntries: SitemapEntry[] = [];
  const empresarialEntries: SitemapEntry[] = [];
  const geralEntries: SitemapEntry[] = [];

  for (const e of allEntries) {
    if (isBairroOrLocal(e.loc)) bairrosEntries.push(e);
    else if (isGuarulhosHub(e.loc)) guarulhosEntries.push(e);
    else if (autoRoutes.has(e.loc)) autoEntries.push(e);
    else if (vidaSaudeRoutes.has(e.loc)) vidaSaudeEntries.push(e);
    else if (empresarialRoutes.has(e.loc)) empresarialEntries.push(e);
    else geralEntries.push(e);
  }

  const files: Record<string, string> = {
    "sitemap-guarulhos.xml": urlsetFor(guarulhosEntries),
    "sitemap-bairros.xml": urlsetFor(bairrosEntries),
    "sitemap-auto.xml": urlsetFor(autoEntries),
    "sitemap-vida-saude.xml": urlsetFor(vidaSaudeEntries),
    "sitemap-empresarial.xml": urlsetFor(empresarialEntries),
    "sitemap-geral.xml": urlsetFor(geralEntries),
    // Legacy flat sitemap kept for backward compatibility with already-submitted URLs
    "sitemap.xml": urlsetFor(allEntries),
  };

  // ---- Sitemap index -------------------------------------------------------
  // Order matters: bairros & Guarulhos first (highest local commercial priority).
  const indexOrder = [
    "sitemap-guarulhos.xml",
    "sitemap-bairros.xml",
    "sitemap-auto.xml",
    "sitemap-vida-saude.xml",
    "sitemap-empresarial.xml",
    "sitemap-geral.xml",
  ];

   const index = [
     '<?xml version="1.0" encoding="UTF-8"?>',
     '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
     ...indexOrder.map(name => {
       const loc = cleanXmlString(`${DOMAIN}/${name}`);
       return `  <sitemap>\n    <loc>${loc}</loc>\n    <lastmod>${TODAY}</lastmod>\n  </sitemap>`;
     }),
     '</sitemapindex>',
     '' // Final newline
   ].join('\n');

  return { index, files };
}