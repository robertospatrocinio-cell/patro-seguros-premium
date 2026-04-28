// Build-time sitemap generator — called by Vite plugin
// Generates sitemap.xml with search-intent priority tiers

const DOMAIN = "https://patroseguros.com.br";
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
  { loc: "/", priority: "1.0", changefreq: "weekly" },
  { loc: "/cotacao", priority: "0.9", changefreq: "weekly" },
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
].map(loc => ({ loc, priority: "0.8", changefreq: "monthly" }));

const secondaryProducts: SitemapEntry[] = [
  "/seguro-viagem", "/seguro-celular", "/seguro-odonto",
  "/seguro-motorista-app", "/seguro-acidentes-pessoais",
  "/seguro-condominio", "/seguro-transporte", "/seguro-rc",
  "/seguro-rc-profissional", "/seguro-cyber", "/seguro-engenharia",
  "/seguro-fianca", "/seguro-fianca-locaticia", "/seguro-caminhao",
  "/seguro-vida-pme", "/seguro-galpoes-industriais", "/seguro-maquinas",
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
  { loc: "/indique-um-amigo", priority: "0.5", changefreq: "monthly" },
  { loc: "/sobre-guarulhos", priority: "0.7", changefreq: "monthly" },
  { loc: "/seguros-guarulhos", priority: "0.8", changefreq: "monthly" },
];

const bairroIds = [
  "jardim-maia", "vila-augusta", "cumbica", "centro", "picanco",
  "macedo", "gopouva", "bonsucesso", "paraventi", "continental",
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

function entryToXml(e: SitemapEntry): string {
  const lastmod = e.lastmod || TODAY;
  return `  <url><loc>${DOMAIN}${e.loc}</loc><priority>${e.priority}</priority><lastmod>${lastmod}</lastmod><changefreq>${e.changefreq}</changefreq></url>`;
}

export function generateSitemap(blogSlugs: string[]): string {
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

  const allEntries = [
    ...highIntentTransactional,
    ...seoLocalGuarulhos,
    ...coreProducts,
    ...secondaryProducts,
    ...tertiaryProducts,
    ...nichos,
    ...informational,
    ...bairroEntries,
    ...blogEntries,
    ...legal,
  ];

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...allEntries.map(entryToXml),
    '</urlset>',
  ].join('\n');

  return xml;
}