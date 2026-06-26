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
  const { articles, allCategories, slugifyCategory } = await loadDataModule("src/lib/blogData.ts");
  const { seoLocalPageSlugs: autoSlugs } = await loadDataModule("src/data/seoLocalAutoPages.ts");
  const { seoLocalPageSlugs: saudeSlugs } = await loadDataModule("src/data/seoLocalSaudePages.ts");
  const { seoLocalPageSlugs: modeloSlugs } = await loadDataModule("src/data/seoModelosAutoPages.ts");
  const { segmentos } = await loadDataModule("src/data/segmentosEmpresariais.ts");
  const { blogAuthors } = await loadDataModule("src/lib/blogAuthors.ts");

  const blogSlugs = articles.map(a => a.slug);
  const localSlugs = [...(autoSlugs || []), ...(saudeSlugs || []), ...(modeloSlugs || [])];
  const segmentSlugs = (segmentos || []).map(s => s.slug);
  const blogCategorySlugs = (allCategories || []).map(c => slugifyCategory(c));
  const blogAuthorSlugs = (blogAuthors || []).map(a => a.slug);

  const bundle = generateSitemapBundle(blogSlugs, localSlugs, segmentSlugs, blogCategorySlugs, blogAuthorSlugs);
  
  // Collect all unique routes from sitemaps
  const routes = new Set();
  Object.values(bundle.files).forEach(xml => {
    const matches = xml.matchAll(/<loc>https:\/\/www\.patroseguros\.com\.br([^<]*)<\/loc>/g);
    for (const match of matches) {
      const loc = match[1] || "/";
      // Ignora entradas que apontam para arquivos (ex.: sitemap-*.xml dentro
      // do sitemap-index) — não devem virar pasta + index.html no dist.
      if (/\.[a-z0-9]+$/i.test(loc)) continue;
      routes.add(loc);
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

    // NOTA: o bloco #crawler-content (display:none + aria-hidden) foi REMOVIDO
    // intencionalmente. Era cloaking — conteúdo só para crawlers, com H1 oculto
    // duplicando o H1 visível do React. Causava:
    //  - 2 H1 na home (um escondido, um visível)
    //  - Sinal de "conteúdo artificial para SEO" (penalizável pelo Google)
    // O prerender-react.mjs (passo seguinte do build) sobrescreve o HTML de
    // todas as rotas indexáveis com o conteúdo real do React, então não há
    // perda de conteúdo legítimo para crawlers.

    // Write file
    if (route === "/") {
      fs.writeFileSync(INDEX_HTML, html, "utf-8");
    } else {
      const routeDir = path.join(DIST, route);
      // Defensivo: cria a pasta de saída antes de gravar o index.html.
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
