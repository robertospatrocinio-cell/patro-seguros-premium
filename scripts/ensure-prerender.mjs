#!/usr/bin/env node
/**
 * Garante que os HTMLs estáticos necessários para validação SEO existam antes
 * do postbuild. O plugin do Vite também roda o prerender, mas este guard evita
 * falso negativo quando o postbuild é executado sobre um dist incompleto.
 */
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { FULL_SEO_CONTENT } from "./seo-content-full.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");
const INDEX_HTML = path.join(DIST, "index.html");

const REQUIRED_ROUTES = [
  "/",
  "/sobre",
  "/servicos",
  "/contato",
  "/faq",
  "/verificar-susep",
  "/como-comparar-seguradoras-guarulhos",
  "/seguro-auto-guarulhos",
  "/plano-de-saude-guarulhos",
  "/seguro-empresarial-guarulhos",
  "/consorcio-guarulhos",
];

// Rotas legadas que existem apenas como redirect no React Router não geram
// artefato estático próprio. Para o guard de build, valide sempre a URL
// canônica final, evitando falso negativo em aliases antigos de SEO.
const CANONICAL_ROUTE_ALIASES = new Map([
  ["/plano-saude-guarulhos", "/plano-de-saude-guarulhos"],
]);

// InsuranceAgency é um subtipo de LocalBusiness e Organization no Schema.org.
// A home publica a entidade institucional como InsuranceAgency (mais específica),
// portanto exigir também um nó Organization separado gerava falso negativo e
// incentivava duplicidade da mesma empresa no JSON-LD.
const REQUIRED_HOME_TYPES = ["InsuranceAgency", "WebSite", "SiteNavigationElement"];

// Rotas cujo HTML precisa ter o bloco SEO COMPLETO (não o fallback) injetado
// por scripts/prerender.mjs — são as mesmas rotas validadas por
// scripts/validate-word-count.mjs (mínimo 600 palavras).
const canonicalizeRoute = (route) => CANONICAL_ROUTE_ALIASES.get(route) || route;

const FULL_CONTENT_ROUTES = [
  ...new Set(Object.keys(FULL_SEO_CONTENT).map(canonicalizeRoute)),
];

function routeToFile(route) {
  return route === "/"
    ? path.join(DIST, "index.html")
    : path.join(DIST, route.replace(/^\/+/, ""), "index.html");
}

function collectTypes(node, acc = new Set()) {
  if (!node || typeof node !== "object") return acc;
  if (Array.isArray(node)) {
    node.forEach((item) => collectTypes(item, acc));
    return acc;
  }
  if (Array.isArray(node["@graph"])) node["@graph"].forEach((item) => collectTypes(item, acc));
  const type = node["@type"];
  if (type) (Array.isArray(type) ? type : [type]).forEach((item) => acc.add(item));
  return acc;
}

function getJsonLdTypes(file) {
  if (!fs.existsSync(file)) return new Set();
  const html = fs.readFileSync(file, "utf-8");
  const types = new Set();
  const scriptRegex = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = scriptRegex.exec(html)) !== null) {
    try {
      collectTypes(JSON.parse(match[1]), types);
    } catch {
      // O validador principal reporta JSON-LD inválido com localização exata.
    }
  }
  return types;
}

function missingArtifacts() {
  const missing = [];
  for (const route of REQUIRED_ROUTES) {
    const file = routeToFile(route);
    if (!fs.existsSync(file)) {
      missing.push(`${route}: HTML ausente`);
      continue;
    }

    const homeTypes = getJsonLdTypes(file);
    const requiredTypes = route === "/" ? REQUIRED_HOME_TYPES : ["InsuranceAgency"];
    for (const type of requiredTypes) {
      if (!homeTypes.has(type)) {
        missing.push(`${route}: schema ${type} ausente`);
      }
    }
  }

  // Detecta rotas críticas em fallback (SEO_CONTENT não aplicado): força
  // re-run do prerender.mjs para injetar o conteúdo completo antes dos
  // validadores de word-count/schemas rodarem.
  for (const route of FULL_CONTENT_ROUTES) {
    const file = routeToFile(route);
    if (!fs.existsSync(file)) {
      missing.push(`${route}: HTML ausente`);
      continue;
    }
    const html = fs.readFileSync(file, "utf-8");
    if (!html.includes("data-prerender-seo") || html.includes('data-fallback="1"')) {
      missing.push(`${route}: bloco SEO completo ausente (fallback ou vazio)`);
    }
  }

  return missing;
}

const args = process.argv.slice(2);

if (args.includes("--build") || !fs.existsSync(DIST)) {
  console.log("🔨 Gerando build antes de validar schemas críticos…");
  try {
    execSync("npm run build", { cwd: ROOT, stdio: "inherit" });
  } catch (err) {
    console.error("❌ Falha no build ao tentar gerar artefatos. Abortando.");
    process.exit(1);
  }
}

if (!fs.existsSync(DIST)) {
  console.error("❌ dist/ ausente. Abortando.");
  process.exit(1);
}

// Injeção dinâmica do InsuranceAgency para evitar falha no prerender.mjs
// se por algum motivo o nó institucional não foi emitido no index.html base.
function patchIndexHtmlWithInsuranceAgency() {
  if (!fs.existsSync(INDEX_HTML)) return;
  const html = fs.readFileSync(INDEX_HTML, "utf-8");
  if (!html.includes('"@type": "InsuranceAgency"') && !html.includes('"@type":"InsuranceAgency"')) {
    console.warn("⚠️  index.html sem InsuranceAgency. Injetando nó de emergência para o prerender...");
    const schema = {
      "@context": "https://schema.org",
      "@type": "InsuranceAgency",
      "@id": "https://www.patroseguros.com.br/#insurance-agency",
      "name": "Patro Seguros",
      "url": "https://www.patroseguros.com.br",
      "logo": "https://www.patroseguros.com.br/images/logo-full.webp",
      "image": "https://www.patroseguros.com.br/images/logo-full.webp",
      "telephone": "+551151997500",
      "priceRange": "$$",
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": -23.446,
        "longitude": -46.522
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Avenida Salgado Filho, 2120 — Sala 219 — Edifício Via Alameda",
        "addressLocality": "Guarulhos",
        "addressRegion": "SP",
        "postalCode": "07115-000",
        "addressCountry": "BR"
      }
    };
    const script = `\n<script type="application/ld+json">${JSON.stringify(schema)}</script>\n`;
    fs.writeFileSync(INDEX_HTML, html.replace("</head>", `${script}</head>`), "utf-8");
  }
}

patchIndexHtmlWithInsuranceAgency();

let missing = missingArtifacts();

if (missing.length > 0) {
  console.warn("⚠️  Prerender incompleto antes da validação:");
  missing.forEach((item) => console.warn(`   • ${item}`));
  console.warn("🚀 Rodando prerender.mjs novamente antes dos validadores...");
  execSync("node scripts/prerender.mjs", { cwd: ROOT, stdio: "inherit" });
  missing = missingArtifacts();
}

if (missing.length > 0) {
  console.error("❌ Prerender ainda incompleto após nova tentativa:");
  missing.forEach((item) => console.error(`   • ${item}`));
  process.exit(1);
}

console.log("✅ Prerender confirmado para rotas críticas e schemas da home.");
