#!/usr/bin/env node
/**
 * Validação de elegibilidade a Google Rich Results.
 *
 * Complementa `validate-rich-snippets.mjs` (que checa presença + estrutura básica)
 * aplicando as regras específicas documentadas pelo Google Search Central para
 * elegibilidade a rich results — required + recommended por tipo. Cada bloco
 * JSON-LD extraído de dist/ recebe um verdict por tipo:
 *
 *   - eligible     → todas as required OK, sem faltar recommended crítico
 *   - eligible-warn→ required OK, recommended ausentes (ainda é elegível,
 *                    mas o Google pode ranquear pior)
 *   - ineligible   → required ausente/inválido — não vai gerar rich result
 *   - unsupported  → @type não gera rich result no Google (só reportado)
 *
 * Referências (Google Search Central – Structured data feature guides):
 *   BreadcrumbList  https://developers.google.com/search/docs/appearance/structured-data/breadcrumb
 *   FAQ             https://developers.google.com/search/docs/appearance/structured-data/faqpage
 *   HowTo           https://developers.google.com/search/docs/appearance/structured-data/how-to
 *   Article         https://developers.google.com/search/docs/appearance/structured-data/article
 *   LocalBusiness   https://developers.google.com/search/docs/appearance/structured-data/local-business
 *   Organization    https://developers.google.com/search/docs/appearance/structured-data/organization
 *   Logo            https://developers.google.com/search/docs/appearance/structured-data/logo
 *   Sitelinks SB    https://developers.google.com/search/docs/appearance/structured-data/sitelinks-searchbox
 *
 * Uso:
 *   node scripts/validate-google-rich-results.mjs                # valida dist/
 *   node scripts/validate-google-rich-results.mjs --route=/faq   # filtra 1 rota
 *   node scripts/validate-google-rich-results.mjs --allow-warn   # não falha em warn
 *
 * Exit code:
 *   0 → nenhum bloco `ineligible`
 *   1 → algum bloco marcado como `ineligible`
 *       (`eligible-warn` não falha por padrão — passa a falhar sem --allow-warn
 *        se algum tipo crítico exigir. Hoje só reportamos.)
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { extractBlocks } from "./lib/jsonld-validator.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");

const args = process.argv.slice(2);
const routeArg = args.find((a) => a.startsWith("--route="))?.split("=")[1];
const ALLOW_WARN = args.includes("--allow-warn");
const STRICT_WARN = args.includes("--strict-warn");

if (!fs.existsSync(DIST)) {
  console.error("❌ dist/ ausente. Rode `npm run build` antes.");
  process.exit(1);
}

// ---------- helpers -----------------------------------------------------------

const typeOf = (n) => {
  const t = n?.["@type"];
  return Array.isArray(t) ? t : t ? [t] : [];
};
const hasType = (n, t) => typeOf(n).includes(t);
const isPlainObj = (v) => v && typeof v === "object" && !Array.isArray(v);
const isAbsUrl = (v) => typeof v === "string" && /^https?:\/\//i.test(v);
const isIso8601Date = (v) => typeof v === "string" && /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}(:\d{2}(\.\d+)?)?(Z|[+-]\d{2}:?\d{2})?)?$/.test(v);
const isIso8601Duration = (v) => typeof v === "string" && /^P(?:\d+[YMWD])*(?:T(?:\d+[HMS])+)?$/.test(v) && v !== "P";

function flattenNodes(root, out = []) {
  if (!root) return out;
  if (Array.isArray(root)) { root.forEach((n) => flattenNodes(n, out)); return out; }
  if (!isPlainObj(root)) return out;
  if (Array.isArray(root["@graph"])) root["@graph"].forEach((n) => flattenNodes(n, out));
  if (root["@type"]) out.push(root);
  return out;
}

function extractImageUrl(image) {
  if (!image) return null;
  if (typeof image === "string") return image;
  if (Array.isArray(image)) return image.map(extractImageUrl).find(Boolean) ?? null;
  if (isPlainObj(image)) return image.url || image["@id"] || null;
  return null;
}

// ---------- checkers ----------------------------------------------------------
// Cada checker retorna { required: [msgs], recommended: [msgs] }.
// Se `required.length > 0` → ineligible. Se só recommended → eligible-warn.

function checkBreadcrumbList(n) {
  const req = [], rec = [];
  const items = n.itemListElement;
  if (!Array.isArray(items) || items.length === 0) {
    req.push("itemListElement ausente/vazio");
    return { req, rec };
  }
  if (items.length < 2) req.push("Google exige ≥ 2 itens (recebido " + items.length + ")");
  items.forEach((it, i) => {
    if (it?.position !== i + 1) req.push(`position[${i}] esperado ${i + 1}, recebido ${it?.position}`);
    const name = it?.name || it?.item?.name;
    if (!name) req.push(`item[${i}] sem name`);
    const url = typeof it?.item === "string" ? it.item : it?.item?.["@id"] || it?.item?.url;
    // último item pode omitir URL
    if (i < items.length - 1 && !isAbsUrl(url)) req.push(`item[${i}].item precisa ser URL absoluta`);
  });
  return { req, rec };
}

function checkFAQPage(n) {
  const req = [], rec = [];
  const items = n.mainEntity;
  if (!Array.isArray(items) || items.length === 0) { req.push("mainEntity vazio"); return { req, rec }; }
  if (items.length < 2) rec.push("Google recomenda ≥ 2 Question (recebido " + items.length + ")");
  items.forEach((q, i) => {
    if (!hasType(q, "Question")) req.push(`mainEntity[${i}].@type ≠ Question`);
    const name = typeof q?.name === "string" ? q.name.trim() : "";
    if (!name) req.push(`mainEntity[${i}].name ausente`);
    else if (name.length > 300) rec.push(`mainEntity[${i}].name > 300 chars (Google trunca)`);
    const ans = q?.acceptedAnswer;
    if (!ans) req.push(`mainEntity[${i}].acceptedAnswer ausente`);
    else {
      if (!hasType(ans, "Answer")) req.push(`mainEntity[${i}].acceptedAnswer.@type ≠ Answer`);
      const text = typeof ans?.text === "string" ? ans.text.trim() : "";
      if (!text) req.push(`mainEntity[${i}].acceptedAnswer.text ausente`);
    }
  });
  return { req, rec };
}

function checkHowTo(n) {
  const req = [], rec = [];
  if (!n.name || !String(n.name).trim()) req.push("name ausente");
  const steps = n.step;
  if (!Array.isArray(steps) || steps.length === 0) { req.push("step[] ausente/vazio"); return { req, rec }; }
  steps.forEach((s, i) => {
    if (!hasType(s, "HowToStep")) req.push(`step[${i}].@type ≠ HowToStep`);
    if (!s?.name) req.push(`step[${i}].name ausente`);
    if (!s?.text && !s?.itemListElement) req.push(`step[${i}] sem text nem itemListElement`);
  });
  if (n.totalTime && !isIso8601Duration(n.totalTime))
    req.push(`totalTime "${n.totalTime}" não é duração ISO 8601`);
  if (!extractImageUrl(n.image)) rec.push("image ausente (recomendado para elegibilidade)");
  return { req, rec };
}

function checkArticle(n) {
  const req = [], rec = [];
  const headline = typeof n.headline === "string" ? n.headline.trim() : "";
  if (!headline) req.push("headline ausente");
  else if (headline.length > 110) rec.push("headline > 110 chars (Google trunca)");
  if (!n.datePublished) req.push("datePublished ausente");
  else if (!isIso8601Date(n.datePublished)) req.push(`datePublished "${n.datePublished}" fora do ISO 8601`);
  if (n.dateModified && !isIso8601Date(n.dateModified))
    req.push(`dateModified "${n.dateModified}" fora do ISO 8601`);
  const author = n.author;
  const authorOk = typeof author === "string" ? !!author.trim()
    : Array.isArray(author) ? author.some((a) => a?.name)
    : isPlainObj(author) ? !!author.name : false;
  if (!authorOk) req.push("author ausente ou sem name");
  const image = extractImageUrl(n.image);
  if (!isAbsUrl(image)) req.push("image ausente ou não-absoluta (Google exige)");
  const publisher = n.publisher;
  if (!isPlainObj(publisher)) req.push("publisher ausente");
  else {
    if (!publisher.name) req.push("publisher.name ausente");
    const logo = extractImageUrl(publisher.logo);
    if (!isAbsUrl(logo)) req.push("publisher.logo (ImageObject.url) ausente/não-absoluta");
  }
  return { req, rec };
}

function checkLocalBusiness(n) {
  const req = [], rec = [];
  if (!n.name) req.push("name ausente");
  const image = extractImageUrl(n.image) || extractImageUrl(n.logo);
  if (!isAbsUrl(image)) req.push("image (ou logo) ausente / não-absoluta");
  const addr = n.address;
  if (!isPlainObj(addr)) req.push("address ausente");
  else {
    ["streetAddress", "addressLocality", "addressRegion", "postalCode", "addressCountry"].forEach((k) => {
      if (!addr[k]) req.push(`address.${k} ausente`);
    });
  }
  if (!n.telephone) req.push("telephone ausente");
  if (!n.url) rec.push("url (site oficial) recomendado");
  if (n.geo) {
    const lat = Number(n.geo.latitude), lng = Number(n.geo.longitude);
    if (Number.isNaN(lat) || lat < -90 || lat > 90) req.push("geo.latitude inválida");
    if (Number.isNaN(lng) || lng < -180 || lng > 180) req.push("geo.longitude inválida");
  } else {
    rec.push("geo (latitude/longitude) recomendado");
  }
  if (!n.priceRange) rec.push("priceRange recomendado");
  if (n.aggregateRating) {
    const r = Number(n.aggregateRating.ratingValue);
    if (Number.isNaN(r) || r < 0 || r > 5) req.push("aggregateRating.ratingValue fora de 0..5");
    if (!n.aggregateRating.reviewCount && !n.aggregateRating.ratingCount)
      req.push("aggregateRating precisa de reviewCount ou ratingCount");
  }
  return { req, rec };
}

function checkOrganization(n) {
  const req = [], rec = [];
  if (!n.name) req.push("name ausente");
  if (!isAbsUrl(n.url)) req.push("url absoluta ausente");
  const logo = extractImageUrl(n.logo);
  if (!isAbsUrl(logo)) req.push("logo absoluta ausente (bloqueia rich result de Logo)");
  if (!Array.isArray(n.sameAs) || n.sameAs.length === 0) rec.push("sameAs[] recomendado (perfis oficiais)");
  return { req, rec };
}

function checkWebSite(n) {
  const req = [], rec = [];
  if (!n.name) req.push("name ausente");
  if (!isAbsUrl(n.url)) req.push("url absoluta ausente");
  const actions = n.potentialAction
    ? (Array.isArray(n.potentialAction) ? n.potentialAction : [n.potentialAction])
    : [];
  const search = actions.find((a) => hasType(a, "SearchAction"));
  if (search) {
    const tpl = typeof search.target === "string" ? search.target : search.target?.urlTemplate;
    if (!tpl || !/\{search_term_string\}/.test(tpl))
      req.push("SearchAction.target.urlTemplate precisa conter {search_term_string}");
    if (search["query-input"] !== "required name=search_term_string")
      req.push('SearchAction["query-input"] deve ser "required name=search_term_string"');
  }
  return { req, rec };
}

// Service não é um rich-result do Google — reportamos como `unsupported` mas
// aplicamos validação leve pra manter higiene.
function checkService(n) {
  const req = [], rec = [];
  if (!n.name) req.push("name ausente");
  if (!n.provider) req.push("provider ausente");
  else if (isPlainObj(n.provider) && !n.provider.name && !n.provider["@id"])
    req.push("provider sem name/@id");
  return { req, rec, unsupported: true };
}

const CHECKERS = {
  BreadcrumbList: checkBreadcrumbList,
  FAQPage: checkFAQPage,
  HowTo: checkHowTo,
  Article: checkArticle,
  BlogPosting: checkArticle,
  NewsArticle: checkArticle,
  LocalBusiness: checkLocalBusiness,
  InsuranceAgency: checkLocalBusiness,
  Organization: checkOrganization,
  WebSite: checkWebSite,
  Service: checkService,
};

// ---------- walker ------------------------------------------------------------

function routeFromFile(file) {
  const rel = path.relative(DIST, file).replace(/\\/g, "/");
  if (rel === "index.html") return "/";
  if (rel.endsWith("/index.html")) return "/" + rel.slice(0, -"/index.html".length);
  if (rel.endsWith(".html")) return "/" + rel.slice(0, -".html".length);
  return "/" + rel;
}

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, out);
    else if (e.isFile() && e.name.endsWith(".html")) out.push(full);
  }
  return out;
}

const files = walk(DIST);
const report = { generatedAt: new Date().toISOString(), routes: {}, summary: {
  files: 0, blocks: 0, nodes: 0,
  eligible: 0, eligibleWarn: 0, ineligible: 0, unsupported: 0,
} };

let ineligibleTotal = 0;

for (const file of files) {
  const route = routeFromFile(file);
  if (routeArg && route !== routeArg) continue;
  const html = fs.readFileSync(file, "utf-8");
  const blocks = extractBlocks(html);
  if (blocks.length === 0) continue;
  report.summary.files++;
  report.summary.blocks += blocks.length;

  const routeEntry = { file: path.relative(ROOT, file), nodes: [] };

  for (let bi = 0; bi < blocks.length; bi++) {
    let parsed;
    try { parsed = JSON.parse(blocks[bi]); }
    catch (e) {
      routeEntry.nodes.push({
        block: bi, type: "(parse-error)", verdict: "ineligible",
        required: [`JSON inválido — ${e.message}`], recommended: [],
      });
      ineligibleTotal++;
      continue;
    }
    const nodes = flattenNodes(parsed);
    report.summary.nodes += nodes.length;
    for (const node of nodes) {
      const types = typeOf(node);
      // pega o primeiro tipo com checker registrado; se nenhum, marca unsupported
      const matched = types.find((t) => CHECKERS[t]);
      if (!matched) {
        report.summary.unsupported++;
        routeEntry.nodes.push({
          block: bi, type: types.join("|") || "(sem @type)",
          verdict: "unsupported", required: [], recommended: [],
        });
        continue;
      }
      const result = CHECKERS[matched](node);
      let verdict;
      if (result.unsupported) { verdict = "unsupported"; report.summary.unsupported++; }
      else if (result.req.length) { verdict = "ineligible"; report.summary.ineligible++; ineligibleTotal++; }
      else if (result.rec.length) { verdict = "eligible-warn"; report.summary.eligibleWarn++; }
      else { verdict = "eligible"; report.summary.eligible++; }
      routeEntry.nodes.push({
        block: bi, type: matched, verdict,
        required: result.req, recommended: result.rec,
      });
    }
  }
  report.routes[route] = routeEntry;
}

// ---------- output ------------------------------------------------------------

const out = path.join(DIST, "google-rich-results-report.json");
fs.writeFileSync(out, JSON.stringify(report, null, 2));

const s = report.summary;
console.log("\n🔎 Google Rich Results — elegibilidade");
console.log(`   arquivos: ${s.files}   blocos: ${s.blocks}   nodes: ${s.nodes}`);
console.log(`   ✅ eligible: ${s.eligible}   ⚠️  eligible-warn: ${s.eligibleWarn}   ❌ ineligible: ${s.ineligible}   ➖ unsupported: ${s.unsupported}`);

// Imprime só rotas com problema (verdict ineligible ou warn)
const problematic = Object.entries(report.routes).filter(([, r]) =>
  r.nodes.some((n) => n.verdict === "ineligible" || n.verdict === "eligible-warn")
);
for (const [route, r] of problematic.slice(0, 60)) {
  console.log(`\n • ${route}`);
  for (const n of r.nodes) {
    if (n.verdict === "eligible" || n.verdict === "unsupported") continue;
    const icon = n.verdict === "ineligible" ? "❌" : "⚠️ ";
    console.log(`   ${icon} ${n.type} (block#${n.block}) → ${n.verdict}`);
    n.required.forEach((m) => console.log(`      REQ  ${m}`));
    n.recommended.forEach((m) => console.log(`      REC  ${m}`));
  }
}
if (problematic.length > 60) console.log(`   … (+${problematic.length - 60} rotas omitidas)`);

console.log(`\n📝 Relatório: ${path.relative(ROOT, out)}`);

if (ineligibleTotal > 0) {
  console.error(`\n❌ ${ineligibleTotal} bloco(s) marcado(s) como INELIGIBLE — não vão gerar Google Rich Result.`);
  process.exit(1);
}
if (s.eligibleWarn > 0 && !ALLOW_WARN) {
  console.log(`\n⚠️  ${s.eligibleWarn} bloco(s) elegível(is) com recomendações pendentes (use --allow-warn para silenciar).`);
  if (STRICT_WARN) {
    console.error(`\n❌ --strict-warn ativo: falhando build por ${s.eligibleWarn} eligible-warn.`);
    process.exit(1);
  }
}
console.log("\n✅ Nenhum bloco INELIGIBLE. Rich results estão elegíveis.");