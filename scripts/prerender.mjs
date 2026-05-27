import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { loadDataModule } from "./load-data-module.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");
const INDEX_HTML = path.join(DIST, "index.html");

async function run() {
  if (!fs.existsSync(INDEX_HTML)) {
    console.error("❌ dist/index.html not found. Run build first.");
    process.exit(1);
  }

  const indexContent = fs.readFileSync(INDEX_HTML, "utf-8");

  // Load SEO Metadata logic
  const { getMetadataForRoute } = await loadDataModule("src/lib/seoMetadata.ts");

  // Load Sitemap logic to get all routes
  const { generateSitemapBundle } = await loadDataModule("scripts/generate-sitemap.ts");
  const { articles } = await loadDataModule("src/lib/blogData.ts");
  const { seoLocalPageSlugs: autoSlugs } = await loadDataModule("src/data/seoLocalAutoPages.ts");
  const { seoLocalPageSlugs: saudeSlugs } = await loadDataModule("src/data/seoLocalSaudePages.ts");
  const { seoLocalPageSlugs: modeloSlugs } = await loadDataModule("src/data/seoModelosAutoPages.ts");
  const { segmentos } = await loadDataModule("src/data/segmentosEmpresariais.ts");

  const blogSlugs = articles.map(a => a.slug);
  const localSlugs = [...(autoSlugs || []), ...(saudeSlugs || []), ...(modeloSlugs || [])];
  const segmentSlugs = (segmentos || []).map(s => s.slug);

  const bundle = generateSitemapBundle(blogSlugs, localSlugs, segmentSlugs);
  
  // Collect all unique routes from sitemaps
  const routes = new Set();
  Object.values(bundle.files).forEach(xml => {
    const matches = xml.matchAll(/<loc>https:\/\/www\.patroseguros\.com\.br([^<]*)<\/loc>/g);
    for (const match of matches) {
      routes.add(match[1] || "/");
    }
  });

  console.log(`🚀 Prerendering ${routes.size} routes...`);

  for (const route of routes) {
    const metadata = getMetadataForRoute(route);
    if (!metadata) {
      console.warn(`⚠️ No metadata for route: ${route}`);
      continue;
    }

    let html = indexContent;

    // Replace Title
    html = html.replace(/<title>[^<]*<\/title>/g, `<title>${metadata.title}</title>`);
    
    // Replace Meta Description
    html = html.replace(/<meta name="description" content="[^"]*"/g, `<meta name="description" content="${metadata.description}"`);

    // Replace Canonical
    const canonicalTag = `<link rel="canonical" href="${metadata.canonical}" />`;
    if (html.includes('rel="canonical"')) {
      // Robust regex to match various canonical tag formats
      html = html.replace(/<link rel="canonical" href="[^"]*"[^>]*>/g, canonicalTag);
    } else {
      html = html.replace("</head>", `  ${canonicalTag}\n</head>`);
    }

    // Replace Open Graph & Twitter
    html = html.replace(/<meta property="og:title" content="[^"]*"/g, `<meta property="og:title" content="${metadata.title}"`);
    html = html.replace(/<meta property="og:description" content="[^"]*"/g, `<meta property="og:description" content="${metadata.description}"`);
    // Robust regex for og:url
    html = html.replace(/<meta property="og:url" content="[^"]*"/g, `<meta property="og:url" content="${metadata.ogUrl}"`);
    html = html.replace(/<meta property="og:type" content="[^"]*"/g, `<meta property="og:type" content="${metadata.ogType}"`);
    
    html = html.replace(/<meta name="twitter:title" content="[^"]*"/g, `<meta name="twitter:title" content="${metadata.title}"`);
    html = html.replace(/<meta name="twitter:description" content="[^"]*"/g, `<meta name="twitter:description" content="${metadata.description}"`);

    // Inject Schema JSON-LD
    if (metadata.schema) {
      const schemaScript = `\n    <script type="application/ld+json">\n      ${JSON.stringify(metadata.schema, null, 2)}\n    </script>`;
      html = html.replace("</head>", `${schemaScript}\n</head>`);
    }

    // Inject Extensive Content for Crawlers
    const detailedDesc = metadata.detailedDescription ? `<p>${metadata.detailedDescription.replace(/\n/g, '<br>')}</p>` : '';
    const faqs = (metadata.faqs || []).map(f => `<h3>${f.question}</h3><p>${f.answer}</p>`).join('');
    const whoNeeds = (metadata.whoNeeds || []).length > 0 ? `<h2>Quem precisa?</h2><ul>${metadata.whoNeeds.map(i => `<li>${i}</li>`).join('')}</ul>` : '';
    const whyPatro = (metadata.whyPatro || []).length > 0 ? `<h2>Por que a Patro Seguros?</h2><ul>${metadata.whyPatro.map(i => `<li>${i}</li>`).join('')}</ul>` : '';

    const crawlerContent = `
      <div id="crawler-content" style="display:none">
        <h1>${metadata.h1}</h1>
        <p>${metadata.description}</p>
        ${detailedDesc}
        ${whoNeeds}
        ${whyPatro}
        ${faqs}
        <p>Patro Seguros - Especialista em Seguros em Guarulhos. Atendimento presencial no Cidade Maia e cotação em até 2 horas úteis. Compare Porto Seguro, Allianz, HDI, Tokio Marine, Bradesco, SulAmérica, Liberty, Mapfre e Azul.</p>
        <nav>
          <a href="/">Home</a> | 
          <a href="/seguro-auto">Seguro Auto</a> | 
          <a href="/planos-de-saude">Planos de Saúde</a> | 
          <a href="/seguro-empresarial">Seguro Empresarial</a> | 
          <a href="/cotacao">Solicitar Cotação</a>
        </nav>
      </div>
    `;
    html = html.replace('<div id="root">', `${crawlerContent}\n    <div id="root">`);


    // Write file
    if (route === "/") {
      fs.writeFileSync(INDEX_HTML, html, "utf-8");
    } else {
      const routeDir = path.join(DIST, route);
      fs.mkdirSync(routeDir, { recursive: true });
      fs.writeFileSync(path.join(routeDir, "index.html"), html, "utf-8");
    }
  }

  // Generate a proper 404.html
  let errorHtml = indexContent;
  errorHtml = errorHtml.replace(/<title>[^<]*<\/title>/, `<title>Página Não Encontrada (404) | Patro Seguros</title>`);
  errorHtml = errorHtml.replace(/<meta name="description" content="[^"]*"/, `<meta name="description" content="A página solicitada não foi encontrada. Explore nossos seguros auto, residenciais e de vida em Guarulhos."`);
  errorHtml = errorHtml.replace("</head>", `  <meta name="robots" content="noindex, follow">\n</head>`);
  errorHtml = errorHtml.replace('<div id="root">', `
    <div id="crawler-content" style="display:none">
      <h1>Página Não Encontrada (404)</h1>
      <p>A página que você está procurando não existe ou foi movida.</p>
    </div>
    <div id="root">`);
  
  fs.writeFileSync(path.join(DIST, "404.html"), errorHtml, "utf-8");

  console.log("✅ Prerender complete!");
}

run().catch(console.error);
