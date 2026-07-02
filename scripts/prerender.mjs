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
  "/seguro-empresarial-guarulhos": {
    h1: "Seguro Empresarial em Guarulhos",
    body: `
      <p><strong>Seguro empresarial em Guarulhos</strong> sob medida para indústrias, comércios, escritórios e prestadores de serviço. A <strong>Patro Seguros</strong>, corretora com sede na Cidade Maia, cota com 16+ seguradoras para entregar a melhor cobertura para sua empresa em Guarulhos, Cumbica e região.</p>
      <h2>Coberturas do seguro empresarial</h2>
      <p>Incêndio, raio e explosão; danos elétricos; vendaval; roubo e furto qualificado; responsabilidade civil (RC); lucros cessantes; equipamentos eletrônicos; vidros; tumultos. Coberturas adicionais sob medida para o seu CNAE.</p>
      <h2>Para quem é o seguro empresarial</h2>
      <p>Indústrias, galpões, depósitos, escritórios, lojas, restaurantes, clínicas e prestadores de serviço em <strong>Guarulhos</strong>. Veja também <a href="/seguros-empresariais-pme-guarulhos">seguro PME</a>, <a href="/seguro-frota-empresas-guarulhos">seguro de frota</a> e <a href="/seguro-condominio-guarulhos">seguro condomínio</a>.</p>
    `,
  },
  "/seguros-empresariais-pme-guarulhos": {
    h1: "Seguros Empresariais para PMEs em Guarulhos",
    body: `
      <p><strong>Seguro empresarial para PMEs em Guarulhos</strong> com a Patro Seguros: pacotes acessíveis para pequenas e médias empresas, com mais de 500 cases atendidos no segmento.</p>
      <h2>Por que sua PME em Guarulhos precisa de seguro</h2>
      <p>Proteção patrimonial, continuidade do negócio em caso de sinistro, RC frente a terceiros e tranquilidade para focar no crescimento. Cotação multi-seguradora em até 24h.</p>
      <h2>Coberturas para PMEs</h2>
      <p>Incêndio, roubo, RC, danos elétricos, equipamentos, vidros e lucros cessantes. Veja também <a href="/seguro-empresarial-guarulhos">seguro empresarial completo</a> e <a href="/seguro-frota-empresas-guarulhos">seguro de frota</a>.</p>
    `,
  },
  "/seguro-frota-empresas-guarulhos": {
    h1: "Seguro de Frota para Empresas em Guarulhos",
    body: `
      <p><strong>Seguro de frota em Guarulhos</strong> para empresas com 4 ou mais veículos. A Patro Seguros cota com as principais seguradoras (Porto, Bradesco, Allianz, HDI, Mapfre, Tokio Marine, Sompo) e entrega economia média de 15% a 30% vs. apólices individuais.</p>
      <h2>Vantagens do seguro frota</h2>
      <p>Gestão centralizada, prêmio único, indicadores de sinistralidade, renovação simplificada e atendimento dedicado em caso de sinistro em <strong>Guarulhos</strong> e em todo o Brasil.</p>
      <h2>Tipos de frota atendidos</h2>
      <p>Frotas leves (passeio/utilitário), pesadas (caminhões e cavalos mecânicos), locadoras, transportadoras e frotas mistas. Veja também <a href="/seguro-empresarial-guarulhos">seguro empresarial</a>.</p>
    `,
  },
  "/seguro-condominio-guarulhos": {
    h1: "Seguro Condomínio em Guarulhos",
    body: `
      <p><strong>Seguro condomínio em Guarulhos</strong> obrigatório pela Lei 4.591/64 e essencial para proteger áreas comuns, condôminos e síndico. A Patro Seguros atende condomínios residenciais e comerciais em toda Guarulhos.</p>
      <h2>Coberturas obrigatórias e adicionais</h2>
      <p>Incêndio, raio, explosão e queda de aeronave (obrigatórias); vendaval, danos elétricos, RC do síndico, RC condomínio, equipamentos, vidros e portões automáticos.</p>
      <h2>Para quais condomínios em Guarulhos</h2>
      <p>Residenciais (apartamentos, casas em condomínio fechado), comerciais e mistos. Cotação com 10+ seguradoras. Veja também <a href="/seguro-residencial-guarulhos">seguro residencial</a>.</p>
    `,
  },
  "/seguro-residencial-guarulhos": {
    h1: "Seguro Residencial em Guarulhos",
    body: `
      <p><strong>Seguro residencial em Guarulhos</strong> a partir de R$ 25/mês com cobertura completa para casas e apartamentos. A Patro Seguros cota com Porto, Bradesco, SulAmérica, Allianz, Tokio Marine, HDI, Liberty, Mapfre e Itaú.</p>
      <h2>Coberturas do seguro residencial</h2>
      <p>Incêndio, raio, explosão; roubo e furto qualificado; danos elétricos; vendaval; RC familiar; despesas extras; vazamento de tubulação; quebra de vidros. Serviços de assistência 24h (chaveiro, eletricista, encanador).</p>
      <h2>Por que contratar com corretora em Guarulhos</h2>
      <p>Cotação multi-seguradora, atendimento próximo na Cidade Maia e suporte completo em caso de sinistro. Veja também <a href="/seguro-condominio-guarulhos">seguro condomínio</a> e <a href="/seguro-vida-saude-guarulhos">seguro de vida</a>.</p>
    `,
  },
  "/seguro-vida-saude-guarulhos": {
    h1: "Seguro de Vida e Saúde em Guarulhos",
    body: `
      <p><strong>Seguro de vida e plano de saúde em Guarulhos</strong> com a Patro Seguros: parceira de 16+ seguradoras de vida e 20+ operadoras de saúde para entregar a melhor proteção para você e sua família.</p>
      <h2>Seguro de vida individual e empresarial</h2>
      <p>Morte natural e acidental, invalidez por acidente, doenças graves, assistência funeral, diárias por internação. Análise detalhada de perfil para cobertura ideal.</p>
      <h2>Plano de saúde individual, familiar e empresarial</h2>
      <p>Cotação com Bradesco Saúde, SulAmérica, Amil, Hapvida-NotreDame, Porto Saúde, Unimed e Omint. Veja também <a href="/plano-saude-guarulhos">plano de saúde em Guarulhos</a>.</p>
    `,
  },
  "/seguro-moto-guarulhos": {
    h1: "Seguro Moto em Guarulhos",
    body: `
      <p><strong>Seguro moto em Guarulhos</strong> com a Patro Seguros: cotação online com Porto, Bradesco, Allianz, HDI, Mapfre, Tokio Marine, Suhai e Mitsui.</p>
      <h2>Coberturas do seguro moto</h2>
      <p>Roubo e furto, colisão, incêndio, danos a terceiros (RCFV), APP (acidentes pessoais ao passageiro), assistência 24h (guincho, socorro mecânico) e carro reserva conforme plano.</p>
      <h2>Seguro moto para motoboys e entregadores em Guarulhos</h2>
      <p>Apólices específicas para uso comercial (motoboy, delivery, iFood, Rappi). Veja também <a href="/seguro-auto-guarulhos">seguro auto em Guarulhos</a>.</p>
    `,
  },
  "/plano-saude-guarulhos": {
    h1: "Plano de Saúde em Guarulhos",
    body: `
      <p><strong>Plano de saúde em Guarulhos</strong> com a Patro Seguros: parceira de 20+ operadoras (Bradesco Saúde, SulAmérica, Amil, Hapvida-NotreDame, Porto Saúde, Unimed, Omint, Care Plus, Prevent Senior).</p>
      <h2>Tipos de plano de saúde</h2>
      <p>Individual e familiar, empresarial (PJ a partir de 2 vidas), coletivo por adesão, odontológico e seguro saúde reembolso. Cobertura ambulatorial, hospitalar com obstetrícia e plano referência.</p>
      <h2>Rede credenciada em Guarulhos e SP</h2>
      <p>Hospital Stella Maris, Bom Clima, Albert Einstein, Sírio-Libanês, Oswaldo Cruz e demais hospitais de referência conforme plano contratado. Veja também <a href="/seguro-vida-saude-guarulhos">seguro de vida e saúde</a>.</p>
    `,
  },
  "/seguro-auto-guarulhos": {
    h1: "Seguro Auto em Guarulhos",
    body: `
      <p><strong>Seguro auto em Guarulhos</strong> com a Patro Seguros: cotação online em 1 minuto com 12+ seguradoras (Porto, Bradesco, Allianz, HDI, Liberty, Mapfre, Tokio Marine, Azul, Mitsui, Itaú, Sompo, Suhai).</p>
      <h2>Coberturas do seguro auto</h2>
      <p>Colisão, incêndio, roubo e furto, RCFV (danos a terceiros), APP (acidentes pessoais ao passageiro), vidros, carro reserva, assistência 24h em todo o Brasil.</p>
      <h2>Por que cotar seguro auto com corretora em Guarulhos</h2>
      <p>Comparação multi-seguradora, perfil tarifado corretamente, suporte completo em caso de sinistro e renovação automática. Veja também <a href="/seguro-moto-guarulhos">seguro moto</a> e <a href="/seguro-frota-empresas-guarulhos">seguro de frota</a>.</p>
    `,
  },
};

/**
 * Hub /seguradoras e páginas por seguradora parceira em Guarulhos.
 * Injeta H1+H2+parágrafos no HTML cru para PageAudit/bots sem JS.
 */
const PARTNER_INSURERS_PRERENDER = [
  { slug: "porto-seguro-guarulhos", name: "Porto Seguro", foco: "tradição, ampla rede de assistência e portfólio completo" },
  { slug: "tokio-marine-guarulhos", name: "Tokio Marine", foco: "análise técnica cuidadosa em auto, empresarial e vida" },
  { slug: "suhai-guarulhos", name: "Suhai Seguradora", foco: "alternativa em auto e moto com foco em roubo e furto" },
  { slug: "allianz-guarulhos", name: "Allianz", foco: "solidez internacional em auto, residencial e empresarial" },
  { slug: "azul-seguros-guarulhos", name: "Azul Seguros", foco: "preço competitivo em auto, especialmente em populares" },
  { slug: "bradesco-seguros-guarulhos", name: "Bradesco Seguros", foco: "estrutura de grande grupo em auto, vida e saúde" },
  { slug: "mapfre-guarulhos", name: "Mapfre", foco: "assistência 24h robusta em auto, residencial e empresarial" },
  { slug: "hdi-guarulhos", name: "HDI Seguros", foco: "boa aceitação em auto, residencial e empresarial" },
  { slug: "yelum-guarulhos", name: "Yelum Seguradora", foco: "sucessora da Liberty no Brasil em auto e residencial" },
  { slug: "sompo-guarulhos", name: "Sompo Seguros", foco: "forte em auto, empresarial e transporte de cargas" },
  { slug: "mitsui-guarulhos", name: "Mitsui Sumitomo", foco: "análise técnica em empresarial e transporte" },
  { slug: "sulamerica-guarulhos", name: "SulAmérica", foco: "referência em saúde, vida individual e Vida Grupo" },
];

SEO_CONTENT["/seguradoras"] = {
  h1: "Seguradoras parceiras da Patro Seguros em Guarulhos",
  body: `
    <p>A <strong>Patro Seguros</strong> é uma corretora consultiva em <strong>Guarulhos</strong> que compara seguradoras, orienta o cliente e ajuda a contratar a melhor opção de seguro conforme perfil, cobertura, franquia e custo-benefício. Cada seguradora tem apetite e tabela diferentes — comparar é essencial.</p>
    <h2>Como a Patro compara seguradoras para você</h2>
    <p>Coletamos seu perfil, cotamos com as seguradoras parceiras compatíveis e apresentamos as opções lado a lado: preço, franquia, cobertura, assistência e condições. Você decide com informação clara.</p>
    <h2>Seguradoras para seguro auto, residencial, vida e empresa</h2>
    <p>Trabalhamos com ${PARTNER_INSURERS_PRERENDER.map((i) => `<a href="/seguradoras/${i.slug}">${i.name}</a>`).join(", ")} e outras seguradoras parceiras conforme disponibilidade e perfil.</p>
    <h2>Atendimento em Guarulhos e região</h2>
    <p>Atendimento presencial em Guarulhos (Cidade Maia) e remoto em toda a Grande São Paulo. Cotação gratuita e sem compromisso — <a href="/cotacao">solicite agora</a> ou <a href="/contato">fale com um consultor</a>.</p>
    <p>As seguradoras mencionadas são marcas de seus respectivos titulares. A disponibilidade de cotação, aceitação, coberturas e condições depende da análise de cada seguradora.</p>
  `,
};

for (const i of PARTNER_INSURERS_PRERENDER) {
  SEO_CONTENT[`/seguradoras/${i.slug}`] = {
    h1: `Cotação ${i.name} em Guarulhos com a Patro Seguros`,
    body: `
      <p>A <strong>Patro Seguros</strong> ajuda você a entender se a <strong>${i.name}</strong> é uma boa opção para o seu perfil em <strong>Guarulhos</strong>, comparando coberturas, preço, assistência, franquia e condições com outras seguradoras parceiras. Foco editorial: ${i.foco}.</p>
      <h2>Sobre a ${i.name}</h2>
      <p>A ${i.name} é uma das seguradoras que a Patro utiliza em cotações para clientes de Guarulhos, com produtos que fazem sentido para perfis específicos. O resultado final depende do perfil (idade, CEP, veículo/imóvel/empresa, uso e histórico) e da análise da seguradora.</p>
      <h2>Quais seguros podem ser cotados com a ${i.name}</h2>
      <p>Cotamos com a ${i.name} conforme disponibilidade e perfil do cliente — seguro auto, residencial, vida, empresarial, frota, transporte, saúde e outros, quando aplicável ao portfólio da seguradora.</p>
      <h2>O que comparar antes de contratar</h2>
      <p>Preço, franquia obrigatória e reduzida, coberturas essenciais e adicionais (vidros, faróis, carro reserva, RCF-V), pacote de assistência 24h, rede referenciada em Guarulhos e regras específicas de aceitação. Comparamos com pelo menos duas outras seguradoras.</p>
      <h2>Como a Patro Seguros ajuda na cotação</h2>
      <p>Somos corretora. Nosso papel é comparar a ${i.name} com outras seguradoras parceiras e ajudar você a decidir com base em preço, cobertura, assistência e condições — não em pressão de venda. Cotação gratuita e sem compromisso.</p>
      <h2>Atendimento em Guarulhos e região</h2>
      <p>Presencial em Guarulhos (Cidade Maia) e remoto em toda a Grande São Paulo. Considere bairros como Cidade Maia, Vila Galvão, Vila Augusta, Bonsucesso, Cumbica, Pimentas, Centro, Taboão, Jardim São João e Gopouva — o CEP impacta diretamente a cotação da ${i.name}.</p>
      <h2>Solicite sua cotação</h2>
      <p><a href="/cotacao">Solicitar cotação online</a>, <a href="/contato">falar com consultor</a> ou voltar para <a href="/seguradoras">todas as seguradoras parceiras</a>.</p>
      <p><em>As marcas citadas pertencem aos seus respectivos titulares. A disponibilidade de cotação, aceitação, coberturas e condições depende da análise de cada seguradora. A Patro Seguros atua como corretora, orientando o cliente na comparação de opções de seguro.</em></p>
    `,
  };
}

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
