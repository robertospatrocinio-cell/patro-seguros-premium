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
      <div id="crawler-content" style="display:none" aria-hidden="true">
        <h1>${metadata.h1}</h1>
        <p>${metadata.description}</p>
        <img src="/images/logo-full.webp" alt="Patro Seguros" />
        <img src="/images/selo-melhor-corretora@2x.webp" alt="Selo de avaliação da Patro Seguros" />
        
        <div class="seo-text-boost">
          <h2>Sobre a Patro Seguros em Guarulhos</h2>
          <p>A Patro Seguros é uma corretora de seguros estabelecida em Guarulhos, com sede estratégica no Edifício Via Alameda, em frente ao Shopping Maia (Cidade Maia). Com mais de 15 anos de experiência no mercado de seguros, nossa equipe de consultores especializados oferece atendimento humanizado e soluções personalizadas para proteger o que é mais importante para você: sua família, seu patrimônio e sua empresa.</p>
          
          <p>Diferente de contratar diretamente com um banco ou pelo site de uma única seguradora, a Patro atua como sua consultora técnica. Nós comparamos simultaneamente as cotações em mais de 16 seguradoras parceiras, incluindo gigantes como Porto Seguro, Allianz, HDI, Tokio Marine, Bradesco Seguros, SulAmérica, Liberty, Mapfre e Azul Seguros. Nosso objetivo é encontrar a melhor relação custo-benefício, garantindo que sua apólice não tenha brechas e que o preço seja justo.</p>
          
          <h3>Especialistas em Seguro Auto e Frotas</h3>
          <p>Em Guarulhos, o seguro auto exige um conhecimento profundo da geografia local. Sabemos que o CEP de pernoite e o CEP de trabalho influenciam diretamente no prêmio. Moradores de bairros como Vila Augusta, Vila Galvão, Jardim Maia, Cumbica e Pimentas possuem perfis de risco distintos, e nossa consultoria utiliza esses dados para otimizar sua cotação. Oferecemos coberturas completas contra roubo, furto, colisão, incêndio, danos a terceiros (RCF-V), além de assistência 24h com guincho ilimitado em Guarulhos e região.</p>
          
          <p>Para empresas, estruturamos seguros de frotas com descontos progressivos e gestão de sinistros dedicada. Também somos especialistas em seguros para motoristas de aplicativo (Uber/99), garantindo a cobertura APP obrigatória e suporte 24 horas para que você nunca fique parado.</p>
          
          <h3>Proteção Patrimonial e Empresarial</h3>
          <p>Além do seguro veicular, a Patro Seguros é referência em Seguro Residencial e Seguro Empresarial em Guarulhos. Protegemos sua casa ou apartamento contra incêndio, danos elétricos, vendaval e roubo de bens, com serviços de assistência residencial inclusos. Para o empresário guarulhense, oferecemos seguros para galpões logísticos (especialmente no polo de Cumbica e arredores do Aeroporto), seguros para restaurantes, lojas de shopping e indústrias, cobrindo lucros cessantes e responsabilidade civil.</p>
          
          <h3>Planos de Saúde e Vida</h3>
          <p>Cuidar da saúde é prioridade. A Patro Seguros ajuda você a comparar os melhores planos de saúde em Guarulhos e São Paulo. Trabalhamos com Bradesco Saúde, Amil, SulAmérica, Porto Saúde, MedSenior e planos regionais. Analisamos carências, rede credenciada de hospitais e laboratórios para que sua família ou seus funcionários tenham o melhor atendimento médico disponível.</p>
          
          <p>Nossa consultoria de Seguro de Vida foca no planejamento sucessório e na proteção financeira, com coberturas para doenças graves, invalidez e auxílio funeral, garantindo tranquilidade para quem você ama.</p>
          
          <h3>Por que escolher a Patro Seguros?</h3>
          <ul>
            <li>Atendimento local e presencial em Guarulhos (Cidade Maia).</li>
            <li>Cotação comparativa em 9+ seguradoras em até 2 horas úteis.</li>
            <li>Suporte real em caso de sinistro com acompanhamento de perícia.</li>
            <li>Consultoria gratuita: a corretora é remunerada pela seguradora, sem custo extra para você.</li>
            <li>Renovação otimizada: recotamos seu seguro todo ano para garantir que você continue pagando o menor preço.</li>
          </ul>
          
          <p>Entre em contato conosco hoje mesmo e descubra por que somos a corretora de seguros que mais cresce em Guarulhos. Atendemos via WhatsApp (11 5199-7500), telefone ou em nosso escritório físico.</p>
        </div>

        ${detailedDesc}
        ${whoNeeds}
        ${whyPatro}
        ${faqs}
        
        <nav>
          <a href="/">Home Patro Seguros</a> | 
          <a href="/seguro-auto">Seguro Auto Guarulhos</a> | 
          <a href="/planos-de-saude">Planos de Saúde Guarulhos</a> | 
          <a href="/seguro-empresarial">Seguro Empresarial Guarulhos</a> | 
          <a href="/cotacao">Solicitar Cotação de Seguro</a> |
          <a href="/sobre">Sobre a Corretora</a> |
          <a href="/contato">Fale Conosco</a>
        </nav>
      </div>
    `;
    html = html.replace(/<div id="root"[^>]*>/, (match) => `${crawlerContent}\n    ${match}`);



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
