const DOMAIN = "https://www.patroseguros.com.br";
const TODAY = new Date().toISOString().slice(0, 10);

const urls = [
  { loc: "/", priority: "1.0" },
  { loc: "/corretora-seguros-guarulhos/", priority: "0.9" },
  { loc: "/seguro-auto-guarulhos/", priority: "0.9" },
  { loc: "/seguro-residencial-guarulhos/", priority: "0.8" },
  { loc: "/seguro-vida-guarulhos/", priority: "0.8" },
  { loc: "/seguro-saude-guarulhos/", priority: "0.8" },
  { loc: "/seguro-empresarial-guarulhos/", priority: "0.8" },
  { loc: "/seguro-frota-guarulhos/", priority: "0.7" },
  { loc: "/blog/", priority: "0.7" },
  { loc: "/termos-de-uso", priority: "0.3" }
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${DOMAIN}${u.loc}</loc>
    <lastmod>${TODAY}</lastmod>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

console.log(xml);
