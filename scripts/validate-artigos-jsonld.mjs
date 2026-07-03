#!/usr/bin/env node
/**
 * Post-build validator específico para /artigos/*.
 *
 * Garante que cada página pré-renderizada em dist/artigos/<slug>/index.html
 * emite os schemas obrigatórios:
 *   - Article (ou BlogPosting/NewsArticle) com headline, image, datePublished, author
 *   - Organization
 *   - Todos os blocos JSON-LD parseáveis
 *
 * Falha o build (exit 1) se qualquer artigo estiver fora do contrato.
 *
 * Uso:
 *   node scripts/validate-artigos-jsonld.mjs
 *
 * Acionado automaticamente no build quando ENABLE_BUILD_VALIDATORS=1
 * (ver vite.config.ts).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const ARTIGOS_DIR = path.join(ROOT, "dist", "artigos");

const ARTICLE_TYPES = new Set(["Article", "BlogPosting", "NewsArticle"]);
const REQUIRED_ARTICLE_FIELDS = ["headline", "image", "datePublished", "author"];

if (!fs.existsSync(ARTIGOS_DIR)) {
  console.error("❌ dist/artigos não encontrado — rode o build antes.");
  process.exit(1);
}

function extractJsonLd(html) {
  const blocks = [...html.matchAll(
    /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
  )];
  const parsed = [];
  const parseErrors = [];
  for (const [, raw] of blocks) {
    try {
      parsed.push(JSON.parse(raw.trim()));
    } catch (e) {
      parseErrors.push(e.message);
    }
  }
  return { parsed, parseErrors, count: blocks.length };
}

function collectNodes(json) {
  // Achata @graph e arrays.
  const arr = Array.isArray(json) ? json : (json?.["@graph"] || [json]);
  const out = [];
  for (const node of arr) {
    if (!node || typeof node !== "object") continue;
    out.push(node);
  }
  return out;
}

function nodeTypeMatches(node, set) {
  const t = node?.["@type"];
  if (!t) return false;
  return Array.isArray(t) ? t.some((x) => set.has(x)) : set.has(t);
}

function validateArticle(node) {
  const missing = REQUIRED_ARTICLE_FIELDS.filter((f) => !node[f]);
  return missing;
}

const slugs = fs
  .readdirSync(ARTIGOS_DIR, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

if (slugs.length === 0) {
  console.error("❌ dist/artigos está vazio — prerender não gerou artigos.");
  process.exit(1);
}

const failures = [];
let checked = 0;

for (const slug of slugs) {
  const file = path.join(ARTIGOS_DIR, slug, "index.html");
  if (!fs.existsSync(file)) {
    failures.push(`/artigos/${slug}: index.html ausente`);
    continue;
  }
  const html = fs.readFileSync(file, "utf-8");
  const { parsed, parseErrors, count } = extractJsonLd(html);

  if (count === 0) {
    failures.push(`/artigos/${slug}: nenhum bloco JSON-LD`);
    continue;
  }
  if (parseErrors.length) {
    failures.push(`/artigos/${slug}: JSON-LD inválido — ${parseErrors[0]}`);
    continue;
  }

  const nodes = parsed.flatMap(collectNodes);
  const articles = nodes.filter((n) => nodeTypeMatches(n, ARTICLE_TYPES));
  const orgs = nodes.filter((n) => nodeTypeMatches(n, new Set(["Organization", "InsuranceAgency"])));
  const breadcrumbs = nodes.filter((n) => nodeTypeMatches(n, new Set(["BreadcrumbList"])));

  if (articles.length === 0) {
    failures.push(`/artigos/${slug}: sem schema Article/BlogPosting`);
  } else {
    for (const a of articles) {
      const missing = validateArticle(a);
      if (missing.length) {
        failures.push(`/artigos/${slug}: Article faltando campos: ${missing.join(", ")}`);
        break;
      }
    }
  }

  if (orgs.length === 0) {
    failures.push(`/artigos/${slug}: sem schema Organization/InsuranceAgency`);
  }

  if (breadcrumbs.length === 0) {
    failures.push(`/artigos/${slug}: sem schema BreadcrumbList no HTML pré-renderizado`);
  } else {
    const bc = breadcrumbs[0];
    const items = Array.isArray(bc.itemListElement) ? bc.itemListElement : [];
    if (items.length < 3) {
      failures.push(`/artigos/${slug}: BreadcrumbList com menos de 3 itens (${items.length})`);
    } else {
      const bad = items.find(
        (it, i) =>
          it?.["@type"] !== "ListItem" ||
          it?.position !== i + 1 ||
          !it?.name ||
          !it?.item
      );
      if (bad) {
        failures.push(`/artigos/${slug}: BreadcrumbList com item inválido (position/name/item)`);
      }
    }
  }

  checked++;
}

console.log(`🔎 /artigos/*: validados ${checked}/${slugs.length} arquivos.`);

if (failures.length) {
  console.error(`❌ ${failures.length} problema(s) encontrados:`);
  failures.slice(0, 30).forEach((f) => console.error("   • " + f));
  if (failures.length > 30) console.error(`   … (+${failures.length - 30} omitidos)`);
  process.exit(1);
}

console.log("✅ Todos os artigos têm Article + Organization JSON-LD válidos.");