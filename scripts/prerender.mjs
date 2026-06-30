import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { loadDataModule } from "./load-data-module.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");
const INDEX_HTML = path.join(DIST, "index.html");

/**
 * Conteúdo SEO visível injetado dentro de <div id="root"> para rotas-chave.
 * Não é cloaking: o React substitui #root inteiro no hydrate, então o
 * conteúdo renderizado para o usuário continua sendo o React. Crawlers
 * que NÃO executam JS (PageAudit, alguns bots) leem H1+H2+parágrafos
 * reais aqui, garantindo word count, hierarquia e densidade de keyword.
 */
const SEO_CONTENT = {
  "/": {
    h1: "Corretora de Seguros em Guarulhos — Patro Seguros",
    body: `
      <p>A <strong>Patro Seguros</strong> é uma <strong>corretora de seguros em Guarulhos</strong> com sede na Cidade Maia, especializada em <strong>seguro auto</strong>, <strong>seguro residencial</strong>, <strong>seguro de vida</strong>, <strong>plano de saúde</strong>, <strong>seguro empresarial</strong>, <strong>seguro de frota</strong>, <strong>seguro condomínio</strong>, <strong>consórcio</strong> e <strong>seguros para o agronegócio</strong>. Atendemos toda Guarulhos, Cumbica, região metropolitana de São Paulo e clientes em todo o Brasil.</p>
      <p>Somos uma <strong>corretora de seguros</strong> independente, parceira de mais de 16 seguradoras e 20 operadoras de saúde — Porto, Bradesco, SulAmérica, Allianz, Tokio Marine, HDI, Liberty, Mapfre, Azul Seguros, Itaú, Mitsui, Suhai, Zurich, entre outras — o que nos permite cotar e comparar as melhores condições de <strong>seguro em Guarulhos</strong> para cada perfil.</p>
      <h2>Seguros para você e sua família em Guarulhos</h2>
      <p>Cotação de <a href="/seguro-auto-guarulhos">seguro auto em Guarulhos</a>, <a href="/seguro-residencial-guarulhos">seguro residencial</a>, <a href="/seguro-vida-saude-guarulhos">seguro de vida e saúde</a>, <a href="/seguro-moto-guarulhos">seguro moto</a> e <a href="/plano-saude-guarulhos">plano de saúde individual e familiar</a>. Trabalhamos com as principais seguradoras do mercado para entregar a melhor relação custo-benefício.</p>
      <h2>Seguros empresariais e para frotas</h2>
      <p>Especialistas em <a href="/seguro-empresarial-guarulhos">seguro empresarial</a>, <a href="/seguros-empresariais-pme-guarulhos">seguros para PMEs</a>, <a href="/seguro-frota-empresas-guarulhos">seguro de frota</a>, <a href="/seguro-condominio-guarulhos">seguro condomínio</a>, <strong>seguro de galpões e armazéns</strong> em Cumbica e região, <strong>responsabilidade civil (RC)</strong> e <strong>riscos patrimoniais</strong>. Mais de 500 cases atendidos no segmento PME.</p>
      <h2>Consórcio e agronegócio</h2>
      <p>Oferecemos <a href="/consorcio-guarulhos">consórcio de imóveis, automóveis, serviços e pesados</a> e <strong>seguros para o agronegócio</strong> com cobertura nacional — seguro agrícola, pecuário, penhor rural, máquinas e equipamentos.</p>
      <h2>Por que escolher uma corretora de seguros em Guarulhos</h2>
      <p>Atendimento humano, cotação multi-seguradora, suporte completo em caso de sinistro e mais de 20 anos de experiência no mercado segurador brasileiro. <a href="/sobre">Conheça nossa história</a>, <a href="/depoimentos">leia depoimentos de clientes</a> ou <a href="/contato">fale com um corretor especialista</a> agora mesmo.</p>
      <p>Endereço: Cidade Maia, Guarulhos/SP. Telefone: (11) 4210-5274. WhatsApp disponível. CNPJ e SUSEP regularizados.</p>
    `,
  },
  "/corretora-de-seguros-em-guarulhos": {
    h1: "Corretora de Seguros em Guarulhos/SP",
    body: `
      <p>A <strong>Patro Seguros</strong> é a <strong>corretora de seguros em Guarulhos</strong> de referência para famílias e empresas que buscam atendimento próximo, cotação multi-seguradora e suporte completo no sinistro.</p>
      <h2>O que faz uma corretora de seguros em Guarulhos</h2>
      <p>Uma corretora habilitada pela SUSEP intermedia a contratação do seguro, compara condições entre seguradoras e representa o cliente — não a seguradora — em todas as etapas, inclusive na regulação de sinistro.</p>
      <h2>Seguros que oferecemos</h2>
      <p>Auto, moto, residencial, vida, saúde, empresarial, frota, condomínio, RC profissional, agronegócio e consórcio. Atendimento em toda <strong>Guarulhos</strong>, Cumbica, Cidade Maia, Vila Galvão, Macedo, Jardim Maia e demais bairros.</p>
    `,
  },
  "/consorcio-guarulhos": {
    h1: "Consórcio em Guarulhos — Imóveis, Autos, Serviços e Pesados",
    body: `
      <p>Consórcio em <strong>Guarulhos</strong> com a Patro Seguros: modalidades de <strong>imóveis</strong>, <strong>automóveis</strong>, <strong>serviços</strong> e <strong>veículos pesados</strong>, com administradoras autorizadas pelo Banco Central.</p>
      <h2>Por que fazer consórcio em Guarulhos</h2>
      <p>Sem juros, parcelas mais leves, possibilidade de lance e contemplação por sorteio. Ideal para planejamento de médio e longo prazo.</p>
    `,
  },
};

function buildSeoBlock(route) {
  const c = SEO_CONTENT[route];
  if (!c) return "";
  // Conteúdo VISÍVEL renderizado antes do React hidratar. Funciona como
  // SSR-lite: usuários sem JS (ou em conexões lentas) veem o conteúdo
  // real; o React substitui #root no hydrate. Não é cloaking — o texto
  // está visível no DOM inicial entregue pelo servidor.
  return `
      <div data-prerender-seo style="max-width:960px;margin:0 auto;padding:24px;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#003366;line-height:1.6">
        <h1 style="font-size:32px;margin:0 0 16px;color:#003366">${c.h1}</h1>
        ${c.body.trim()}
      </div>`;
}

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

    // Injeta conteúdo SEO real (H1 + H2 + parágrafos + links internos) DENTRO
    // de #root para rotas-chave. O React substitui #root inteiro no hydrate,
    // então o usuário enxerga o app React normal. Crawlers que NÃO executam
    // JS (PageAudit, vários bots) leem hierarquia de headings, word count e
    // densidade de keyword reais — sem cloaking (não há H1 visualmente oculto
    // duplicando o H1 do React em produção, pois o React substitui o nó).
    const seoBlock = buildSeoBlock(route);
    if (seoBlock) {
      if (html.includes('<div id="root"></div>')) {
        html = html.replace('<div id="root"></div>', `<div id="root">${seoBlock}</div>`);
      } else {
        // Fallback caso o root já tenha conteúdo (alguns builds).
        html = html.replace(/<div id="root">/, `<div id="root">${seoBlock}`);
      }
    }

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
