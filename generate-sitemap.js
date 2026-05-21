import fs from 'fs';

const domain = "https://www.patroseguros.com.br";
const date = "2026-05-21";

// URLs already in urls.txt
const existingUrls = fs.readFileSync('urls.txt', 'utf8').split('\n').filter(Boolean);

// Additional static and dynamic routes from App.tsx
const appRoutes = [
  "/seguro-galpao",
  "/planos-de-saude/prevent-senior-guarulhos",
  "/planos-de-saude/sulamerica-saude-guarulhos",
  "/planos-de-saude/amil-saude-guarulhos",
  "/planos-de-saude/porto-saude-guarulhos",
  "/planos-de-saude/hapvida-guarulhos",
  "/planos-de-saude/medsenior-guarulhos",
  "/planos-de-saude/bradesco-saude-guarulhos",
  "/planos-de-saude/sami-guarulhos",
  "/planos-de-saude/unimed-guarulhos",
  "/planos-de-saude/alice-guarulhos",
  "/seguradoras/porto-seguro-guarulhos",
  "/seguradoras/tokio-marine-guarulhos",
  "/seguradoras/allianz-guarulhos",
  "/seguradoras/azul-seguros-guarulhos",
  "/seguradoras/mapfre-guarulhos",
  "/seguradoras/zurich-guarulhos",
  "/seguradoras/yellum-guarulhos",
  "/seguradoras/suhai-guarulhos",
  "/seguradoras/hdi-guarulhos",
  "/seguradoras/itau-seguros-guarulhos",
  "/seguradoras/bradesco-seguros-guarulhos",
  "/seguradoras/mitsui-guarulhos",
  "/seguro-empresarial-cumbica",
  "/seguro-empresarial-bonsucesso",
  "/seguro-empresarial-pimentas",
  "/seguro-residencial-centro-guarulhos",
  "/seguro-residencial-vila-augusta",
  "/seguro-residencial-jardim-maia",
  "/plano-saude-taboao-guarulhos",
  "/plano-saude-macedo-guarulhos",
  "/plano-saude-gopouva-guarulhos",
  "/seguro-residencial-taboao-guarulhos",
  "/seguro-residencial-gopouva-guarulhos",
  "/seguro-empresarial-taboao-guarulhos",
  "/seguro-empresarial-macedo-guarulhos",
  "/seguro-empresarial-gopouva-guarulhos",
  "/seguro-transportadora-guarulhos",
  "/seguro-99-guarulhos",
  "/plano-saude-empresarial-guarulhos",
  "/plano-saude-pme-guarulhos",
  "/plano-saude-familia-guarulhos",
  "/plano-odontologico-guarulhos",
  "/seguro-auto-barato-guarulhos",
  "/seguro-restaurante-guarulhos",
  "/seguro-loja-guarulhos",
  "/seguro-frota-pequena-guarulhos",
  "/seguro-galpao-guarulhos",
  "/seguro-galpao-cumbica",
  "/seguro-carro-eletrico-guarulhos",
  "/seguro-logistica-guarulhos",
  "/seguro-auto-cidade-maia",
  "/lp/seguro-auto",
  "/lp/seguro-auto-premium",
  "/lp/plano-de-saude",
  "/lp/seguro-empresarial",
  "/lp/seguro-residencial",
  "/lp/seguro-vida",
  "/lp/seguro-moto",
  "/lp/seguro-galpoes",
  "/lp/seguro-galpao-alugado",
  "/lp/consorcio",
  "/lp/seguro-celular",
  "/lp/seguro-motorista-app",
  "/lp/medsenior",
  "/lp/alice",
  "/comparativo-planos-saude-guarulhos",
  "/plano-saude-centro-guarulhos",
  "/plano-saude-cidade-maia",
  "/plano-saude-picanco",
  "/plano-saude-vila-augusta",
  "/seguros-em-guarulhos",
  "/seguros-de-veiculos",
  "/seguros-empresariais",
  "/seguros-de-patrimonio",
  "/seguros-responsabilidade-civil",
  "/vida-e-saude",
  "/seguros-guarulhos/jardim-maia",
  "/seguros-guarulhos/vila-augusta",
  "/seguros-guarulhos/cumbica",
  "/seguros-guarulhos/centro",
  "/seguros-guarulhos/picanco",
  "/seguros-guarulhos/macedo",
  "/seguros-guarulhos/gopouva",
  "/seguros-guarulhos/bonsucesso",
  "/seguros-guarulhos/paraventi",
  "/seguros-guarulhos/continental",
  "/seguro-vida/formulario",
  "/seguro-maquinas-agricolas",
  "/seguro-equipamentos-agricolas",
  "/seguro-galpoes-industriais"
];

const allUrls = new Set([...existingUrls]);
appRoutes.forEach(r => {
  const fullUrl = domain + (r.startsWith('/') ? r : '/' + r);
  allUrls.add(fullUrl);
});

const sortedUrls = Array.from(allUrls).sort();

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

sortedUrls.forEach(url => {
  let priority = 0.6;
  let changefreq = "monthly";
  
  if (url === domain + "/") {
    priority = 1.0;
    changefreq = "weekly";
  } else if (url.includes("/lp/")) {
    priority = 0.9;
    changefreq = "weekly";
  } else if (url.includes("-guarulhos")) {
    priority = 0.8;
    changefreq = "weekly";
  } else if (url.includes("/blog")) {
    priority = 0.7;
    changefreq = "weekly";
  }
  
  xml += `  <url><loc>${url}</loc><priority>${priority}</priority><lastmod>${date}</lastmod><changefreq>${changefreq}</changefreq></url>\n`;
});

xml += `</urlset>`;

fs.writeFileSync('public/sitemap.xml', xml);
console.log(`Generated sitemap.xml with ${sortedUrls.length} URLs.`);
