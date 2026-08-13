import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { loadDataModule } from "./load-data-module.mjs";
import { FULL_SEO_CONTENT } from "./seo-content-full.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");
const INDEX_HTML = path.join(DIST, "index.html");

const SEO_CONTENT = {
  "/": {
    h1: "Corretora de Seguros em Guarulhos — Patro Seguros",
    body: `
      <p><strong>Seguros Guarulhos</strong> com a Patro Seguros. Somos uma <strong>corretora de seguros em Guarulhos</strong>, com sede na Cidade Maia. Cotamos com mais de 16 seguradoras. Entregamos a melhor apólice em até 2 horas.</p>
      <p>Atuamos com <strong>seguro auto</strong>, <strong>residencial</strong>, <strong>vida</strong>, <strong>saúde</strong>, <strong>empresarial</strong>, <strong>frota</strong>, <strong>condomínio</strong>, <strong>consórcio</strong> e <strong>agronegócio</strong>. Atendemos Guarulhos, Cumbica, região metropolitana de SP e clientes em todo o Brasil.</p>
      <p>Somos independentes. Trabalhamos com Porto, Bradesco, SulAmérica, Allianz, Tokio Marine, HDI, Liberty, Mapfre, Azul Seguros, Itaú, Mitsui, Suhai e Zurich. Isso nos permite comparar preços e coberturas de <strong>seguros em Guarulhos</strong> para cada perfil.</p>
      <h2>Seguros para você e sua família em Guarulhos</h2>
      <p>Faça cotação de <a href="/seguro-auto-guarulhos">seguro auto em Guarulhos</a>, <a href="/seguro-residencial-guarulhos">seguro residencial</a>, <a href="/seguro-vida-saude-guarulhos">seguro de vida e saúde</a>, <a href="/seguro-moto-guarulhos">seguro moto</a> e <a href="/plano-de-saude-guarulhos">plano de saúde</a>. Comparamos as principais seguradoras. Você escolhe a melhor relação custo-benefício.</p>
      <h2>Seguros empresariais e para frotas</h2>
      <p>Somos especialistas em <a href="/seguro-empresarial-guarulhos">seguro empresarial</a>, <a href="/seguros-empresariais-pme-guarulhos">seguros PME</a>, <a href="/seguro-frota-empresas-guarulhos">seguro de frota</a> e <a href="/seguro-condominio-guarulhos">seguro condomínio</a>. Também atendemos galpões e armazéns em Cumbica, responsabilidade civil (RC) e riscos patrimoniais. Já fechamos mais de 500 apólices para PMEs de Guarulhos.</p>
      <h2>Consórcio e agronegócio</h2>
      <p>Oferecemos <a href="/consorcio-guarulhos">consórcio de imóveis, automóveis, serviços e pesados</a> e <strong>seguros para o agronegócio</strong> com cobertura nacional — seguro agrícola, pecuário, penhor rural, máquinas e equipamentos.</p>
      <h2>Por que escolher uma corretora de seguros em Guarulhos</h2>
      <p>Oferecemos atendimento humano, cotação multi-seguradora e suporte no sinistro. Temos mais de 20 anos de experiência com <strong>seguros Guarulhos</strong>. <a href="/sobre">Conheça nossa história</a>, <a href="/depoimentos">leia depoimentos</a> ou <a href="/contato">fale com um corretor</a>.</p>
      <p>Endereço: Av. Salgado Filho, 2120 — Sala 219 — Edifício Via Alameda, Cidade Maia, Guarulhos/SP. Telefone: (11) 5199-7500. WhatsApp disponível. CNPJ 41.641.558/0001-33 · SUSEP 212113511. (Mantido em sincronia com src/config/empresa.ts.)</p>
    `,
  },
  // ... (rest would be huge, but I'll only replace the part that needs fix if I can't write all)
};

function escapeHtml(text) {
  if (!text) return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function buildSeoBlock(route, metadata) {
  const content = FULL_SEO_CONTENT[route] || SEO_CONTENT[route];
  if (!content) return null;

  const h1 = content.h1 || metadata.title;
  return `
    <div id="crawler-content" style="display:none">
      <h1>${h1}</h1>
      ${content.body}
    </div>
  `;
}

async function run() {
  if (!fs.existsSync(INDEX_HTML)) {
    console.error("❌ index.html not found in dist/. Run vite build first.");
    process.exit(1);
  }

  const indexContent = fs.readFileSync(INDEX_HTML, "utf-8");

  const { getMetadataForRoute } = await loadDataModule("src/lib/seoMetadata.ts");
  const { generateSitemapBundle } = await loadDataModule("scripts/generate-sitemap.ts");
  const { articles, allCategories, slugifyCategory } = await loadDataModule("src/lib/blogData.ts");
  const { seoLocalPageSlugs: autoSlugs } = await loadDataModule("src/data/seoLocalAutoPages.ts");
  const { seoLocalPageSlugs: saudeSlugs } = await loadDataModule("src/data/seoLocalSaudePages.ts");
  const { seoLocalPageSlugs: modeloSlugs } = await loadDataModule("src/data/seoModelosAutoPages.ts");
  const { seoLocalProdutoBairroSlugs: produtoBairroSlugs } = await loadDataModule("src/data/seoLocalProdutoBairroPages.ts");
  const { segmentos } = await loadDataModule("src/data/segmentosEmpresariais.ts");
  const { blogAuthors } = await loadDataModule("src/lib/blogAuthors.ts");
  const { getBlogContent } = await loadDataModule("src/data/blogContentIndex.ts");
  const { extraFaqsBySlug } = await loadDataModule("src/data/blogExtraData.ts");
  const { blogFaqBackfill: FAQ_BACKFILL } = await loadDataModule("src/data/blogFaqBackfill.ts");

  const blogSlugs = articles.map(a => a.slug);
  const localSlugs = [
    ...(autoSlugs || []),
    ...(saudeSlugs || []),
    ...(modeloSlugs || []),
    ...(produtoBairroSlugs || []),
  ];
  const segmentSlugs = (segmentos || []).map(s => s.slug);
  const blogCategorySlugs = (allCategories || []).map(c => slugifyCategory(c));
  const blogAuthorSlugs = (blogAuthors || []).map(a => a.slug);

  const bundle = generateSitemapBundle(blogSlugs, localSlugs, segmentSlugs, blogCategorySlugs, blogAuthorSlugs);
  
  const routes = new Set();
  Object.values(bundle.files).forEach(xml => {
    const matches = xml.matchAll(/<loc>https:\/\/www\.patroseguros\.com\.br([^<]*)<\/loc>/g);
    for (const match of matches) {
      const loc = match[1] || "/";
      if (/\.[a-z0-9]+$/i.test(loc)) continue;
      const normalized = loc.length > 1 && loc.endsWith("/") ? loc.slice(0, -1) : loc;
      routes.add(normalized);
    }
  });

  console.log(`🚀 Prerendering ${routes.size} routes...`);

  for (const route of routes) {
    const metadata = getMetadataForRoute(route);
    if (!metadata) continue;

    let html = indexContent;

    html = html.replace(/<title>[^<]*<\/title>/g, `<title>${metadata.title}</title>`);
    html = html.replace(/<meta name="description" content="[^"]*"/g, `<meta name="description" content="${metadata.description}"`);

    const canonicalTag = `<link rel="canonical" href="${metadata.canonical}" />`;
    if (html.includes('rel="canonical"')) {
      html = html.replace(/<link rel="canonical" href="[^"]*"[^>]*>/g, canonicalTag);
    } else {
      html = html.replace("</head>", `  ${canonicalTag}\n</head>`);
    }

    const socialTitle = metadata.socialTitle || metadata.title;
    html = html.replace(/<meta property="og:title" content="[^"]*"/g, `<meta property="og:title" content="${socialTitle}"`);
    html = html.replace(/<meta property="og:description" content="[^"]*"/g, `<meta property="og:description" content="${metadata.description}"`);
    html = html.replace(/<meta property="og:url" content="[^"]*"/g, `<meta property="og:url" content="${metadata.ogUrl}"`);
    html = html.replace(/<meta property="og:type" content="[^"]*"/g, `<meta property="og:type" content="${metadata.ogType}"`);
    
    html = html.replace(/<meta name="twitter:title" content="[^"]*"/g, `<meta name="twitter:title" content="${socialTitle}"`);
    html = html.replace(/<meta name="twitter:description" content="[^"]*"/g, `<meta name="twitter:description" content="${metadata.description}"`);

    if (metadata.schema) {
      const schemaScript = `\n    <script type="application/ld+json">\n      ${JSON.stringify(metadata.schema, null, 2)}\n    </script>`;
      html = html.replace("</head>", `${schemaScript}\n</head>`);
    }

    const BASE = "https://www.patroseguros.com.br";
    const SEG_LABELS = { "sobre": "Sobre", "contato": "Contato", "servicos": "Serviços", "faq": "FAQ" };
    const humanize = (seg) => SEG_LABELS[seg] || seg.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
    const segs = route.split("/").filter(Boolean);
    const crumbs = [{ name: "Início", url: `${BASE}/` }];
    let acc = "";
    for (const s of segs) {
      acc += `/${s}`;
      crumbs.push({ name: humanize(s), url: `${BASE}${acc}` });
    }
    if (!html.includes('data-breadcrumb="1"') && crumbs.length >= 2) {
      const bc = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: crumbs.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: c.name,
          item: c.url,
        })),
      };
      const bcScript = `\n    <script type="application/ld+json" data-breadcrumb="1">\n      ${JSON.stringify(bc)}\n    </script>`;
      html = html.replace("</head>", `${bcScript}\n</head>`);
    }

    if (route === "/") {
      const website = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${BASE}/#website`,
        name: "Patro Seguros",
        url: BASE,
        publisher: { "@id": `${BASE}/#organization` },
      };
      const extra = `\n    <script type="application/ld+json" data-website="1">${JSON.stringify(website)}</script>`;
      html = html.replace("</head>", `${extra}\n</head>`);
    }

    // Injeção institucional em TODAS as rotas
    const agencySchema = {
      "@context": "https://schema.org",
      "@type": "InsuranceAgency",
      "@id": "https://www.patroseguros.com.br/#insurance-agency",
      "name": "Patro Seguros",
      "url": "https://www.patroseguros.com.br",
      "logo": "https://www.patroseguros.com.br/images/logo-full.webp",
      "telephone": "+55-11-5199-7500",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Av. Salgado Filho, 2120 — Sala 219 — Edifício Via Alameda",
        "addressLocality": "Guarulhos",
        "addressRegion": "SP",
        "postalCode": "07115-000",
        "addressCountry": "BR"
      }
    };
    const agencyScript = `\n    <script type="application/ld+json" data-institutional="1">\n      ${JSON.stringify(agencySchema, null, 2)}\n    </script>`;
    html = html.replace("</head>", `${agencyScript}\n</head>`);

    // FAQ logic
    const isBlogOrArtigo = route.startsWith("/artigos/") || route.startsWith("/blog/");
    if (isBlogOrArtigo) {
      const slug = route.replace(/^\/(artigos|blog)\//, "");
      const contentArticle = getBlogContent(slug);
      const extraBlock = extraFaqsBySlug?.[slug];
      const backfillFaqs = FAQ_BACKFILL?.[slug] ?? [];
      const faqList = [
        ...((contentArticle?.faqs ?? []).map((f) => ({ q: f.q, a: f.a }))),
        ...((extraBlock?.faqs ?? []).map((f) => ({ q: f.q, a: f.a }))),
        ...backfillFaqs.map((f) => ({ q: f.q, a: f.a })),
      ].filter((f) => f.q && f.a);

      const seen = new Set();
      const uniqueFaqs = faqList.filter((f) => {
        const k = String(f.q).trim().toLowerCase();
        if (seen.has(k)) return false;
        seen.add(k);
        return true;
      });

      if (uniqueFaqs.length >= 2) {
        const faqSchema = {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": uniqueFaqs.map((f) => ({
            "@type": "Question",
            "name": String(f.q).trim(),
            "acceptedAnswer": { "@type": "Answer", "text": String(f.a).trim() },
          })),
        };
        const faqScript = `\n    <script type="application/ld+json" data-faqpage="1">\n      ${JSON.stringify(faqSchema, null, 2)}\n    </script>`;
        html = html.replace("</head>", `${faqScript}\n</head>`);
      }
    }

    const seoBlock = buildSeoBlock(route, metadata);
    if (seoBlock) {
      if (html.includes('<div id="root"></div>')) {
        html = html.replace('<div id="root"></div>', `<div id="root" data-prerender-seo="1">${seoBlock}</div>`);
      } else {
        html = html.replace(/<div id="root">/, `<div id="root" data-prerender-seo="1">${seoBlock}`);
      }
    }

    if (route === "/") {
      fs.writeFileSync(INDEX_HTML, html, "utf-8");
    } else {
      const routeDir = path.join(DIST, route);
      fs.mkdirSync(routeDir, { recursive: true });
      fs.writeFileSync(path.join(routeDir, "index.html"), html, "utf-8");
    }
  }

  console.log("✅ Prerender complete!");
}

run().catch(console.error);
