#!/usr/bin/env node
/**
 * Breadcrumb JSON-LD auditor
 *
 * Validates the BreadcrumbList JSON-LD that <Breadcrumb /> generates for every
 * insurance product route in the site, plus optionally fetches live HTML and
 * re-validates the actually-served markup.
 *
 * Static mode (default):
 *   node scripts/audit-breadcrumb-jsonld.mjs
 *
 * Live mode — also fetches each URL and validates the served JSON-LD:
 *   node scripts/audit-breadcrumb-jsonld.mjs --live
 *   node scripts/audit-breadcrumb-jsonld.mjs --live --base=https://patroseguros.lovable.app
 *
 * Exit codes: 0 = all valid, 1 = at least one issue found.
 * Reports are written to audit-output/breadcrumb-<timestamp>.{json,csv}.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "audit-output");

const args = process.argv.slice(2);
const LIVE = args.includes("--live");
const BASE = (args.find((a) => a.startsWith("--base=")) ?? "--base=https://www.patroseguros.com.br").slice("--base=".length).replace(/\/$/, "");
const CANONICAL_BASE = "https://www.patroseguros.com.br";

// ---- 1. Read the route → category map (mirrors src/lib/breadcrumbCategory.ts) ----

const hubSrc = fs.readFileSync(path.join(ROOT, "src/lib/insuranceHubLinks.ts"), "utf-8");
const SKIP_CATEGORY_TITLES = new Set(["Seguros em Guarulhos"]);
const CATEGORY_HREF = "/seguros-em-guarulhos";

/**
 * Naively parse INSURANCE_HUB[] out of the TS source. The structure is
 * { title: "...", links: [{ label, href }, ...] }.
 */
function parseHub(src) {
  const cats = [];
  const catRe = /title:\s*"([^"]+)",\s*links:\s*\[([\s\S]*?)\]\s*,?\s*\}/g;
  let m;
  while ((m = catRe.exec(src))) {
    const title = m[1];
    const block = m[2];
    const links = [];
    const linkRe = /href:\s*"([^"]+)"/g;
    let lm;
    while ((lm = linkRe.exec(block))) links.push(lm[1]);
    cats.push({ title, links });
  }
  return cats;
}

const HUB = parseHub(hubSrc);

function getCategory(pathname) {
  const norm = pathname.replace(/\/+$/, "") || "/";
  for (const c of HUB) {
    if (SKIP_CATEGORY_TITLES.has(c.title)) continue;
    if (c.links.includes(norm)) return { label: c.title, href: CATEGORY_HREF };
  }
  return null;
}

// ---- 2. Discover insurance routes from App.tsx ----

const appSrc = fs.readFileSync(path.join(ROOT, "src/App.tsx"), "utf-8");
const ROUTES = [
  ...new Set(
    [...appSrc.matchAll(/path="([^"]+)"/g)]
      .map((m) => m[1])
      .filter((p) => p.startsWith("/") && !p.includes(":") && p !== "*")
      .filter((p) => /seguro|consorcio|plano|previdencia|investimento|seguros\//.test(p)),
  ),
];

// ---- 3. Title resolver (uses the page-file's <PageMeta title="..."> when possible) ----

const titleCache = new Map();
function resolvePageTitle(routePath) {
  if (titleCache.has(routePath)) return titleCache.get(routePath);
  // Best-effort: read the lazy import filename from App.tsx and grep its title prop.
  const re = new RegExp(`path="${routePath.replace(/[/]/g, "\\/")}"\\s+element=\\{<(\\w+)`);
  const m = re.exec(appSrc);
  let title = routePath;
  if (m) {
    const comp = m[1];
    const importRe = new RegExp(`const\\s+${comp}\\s*=\\s*lazy\\(\\(\\)\\s*=>\\s*import\\(["']\\.\\/(pages\\/[^"']+)["']\\)\\)`);
    const im = importRe.exec(appSrc);
    if (im) {
      const file = path.join(ROOT, "src", `${im[1]}.tsx`);
      if (fs.existsSync(file)) {
        const src = fs.readFileSync(file, "utf-8");
        const t = src.match(/title:\s*["']([^"']+)["']/) ?? src.match(/title=["']([^"']+)["']/);
        if (t) title = t[1];
      }
    }
  }
  titleCache.set(routePath, title);
  return title;
}

// ---- 4. Build expected BreadcrumbList JSON-LD (mirrors src/components/Breadcrumb.tsx) ----

function canonical(p) {
  if (!p || p === "/") return CANONICAL_BASE;
  let x = p.split("?")[0].split("#")[0];
  if (!x.startsWith("/")) x = "/" + x;
  if (x.length > 1 && x.endsWith("/")) x = x.slice(0, -1);
  return CANONICAL_BASE + x;
}

function buildExpected(routePath) {
  const title = resolvePageTitle(routePath);
  const cat = getCategory(routePath);
  const items = cat ? [{ label: cat.label, href: cat.href }, { label: title }] : [{ label: title }];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: CANONICAL_BASE },
      ...items.map((it, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: it.label,
        ...(it.href ? { item: canonical(it.href) } : {}),
      })),
    ],
  };
}

// ---- 5. Validators ----

function validate(jsonld, ctx) {
  const errs = [];
  if (!jsonld || typeof jsonld !== "object") {
    errs.push("missing or non-object JSON-LD");
    return errs;
  }
  if (jsonld["@context"] !== "https://schema.org") errs.push(`@context !== schema.org (got ${jsonld["@context"]})`);
  if (jsonld["@type"] !== "BreadcrumbList") errs.push(`@type !== BreadcrumbList (got ${jsonld["@type"]})`);
  const items = jsonld.itemListElement;
  if (!Array.isArray(items) || items.length === 0) {
    errs.push("itemListElement empty or not an array");
    return errs;
  }
  if (items.length < 2) errs.push("breadcrumb has fewer than 2 items (missing parent or current)");
  let lastPos = 0;
  for (const [i, it] of items.entries()) {
    if (it["@type"] !== "ListItem") errs.push(`#${i + 1}: @type !== ListItem`);
    if (typeof it.position !== "number") errs.push(`#${i + 1}: position not number`);
    else if (it.position !== lastPos + 1) errs.push(`#${i + 1}: position ${it.position} not sequential (expected ${lastPos + 1})`);
    lastPos = it.position;
    if (typeof it.name !== "string" || !it.name.trim()) errs.push(`#${i + 1}: name missing/empty`);
    if (it.item !== undefined) {
      if (typeof it.item !== "string") errs.push(`#${i + 1}: item not a string`);
      else if (!/^https:\/\/www\.patroseguros\.com\.br(\/|$)/.test(it.item)) errs.push(`#${i + 1}: item not on canonical https+www host: ${it.item}`);
    }
  }
  // The last item is the current page → Google recommends it have NO `item`.
  const last = items[items.length - 1];
  if (last && last.item !== undefined && ctx?.routePath) {
    // soft-warn only — Google accepts it but recommends omitting.
    errs.push(`#${items.length}: current page should omit "item" (has ${last.item})`);
  }
  return errs;
}

// ---- 6. Optional live fetch ----

async function fetchLiveJsonLd(url) {
  const res = await fetch(url, { redirect: "follow", headers: { "User-Agent": "patro-breadcrumb-audit/1.0" } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const html = await res.text();
  const blocks = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].map((m) => m[1]);
  for (const raw of blocks) {
    try {
      const j = JSON.parse(raw);
      if (j && j["@type"] === "BreadcrumbList") return j;
    } catch {
      // skip malformed blocks
    }
  }
  return null;
}

// ---- 7. Run ----

const results = [];
let failures = 0;

for (const routePath of ROUTES) {
  const expected = buildExpected(routePath);
  const staticErrs = validate(expected, { routePath });
  let liveErrs = [];
  let liveStatus = "skipped";
  if (LIVE) {
    try {
      const url = `${BASE}${routePath}`;
      const live = await fetchLiveJsonLd(url);
      if (!live) {
        liveErrs.push("no BreadcrumbList JSON-LD found in served HTML");
        liveStatus = "missing";
      } else {
        liveErrs = validate(live, { routePath });
        liveStatus = liveErrs.length ? "invalid" : "ok";
      }
    } catch (e) {
      liveErrs.push(`fetch error: ${e.message}`);
      liveStatus = "error";
    }
  }
  const ok = staticErrs.length === 0 && liveErrs.length === 0;
  if (!ok) failures++;
  results.push({ route: routePath, category: getCategory(routePath)?.label ?? null, expectedDepth: expected.itemListElement.length, staticErrs, liveStatus, liveErrs, ok });
}

// ---- 8. Report ----

fs.mkdirSync(OUT_DIR, { recursive: true });
const stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
const jsonPath = path.join(OUT_DIR, `breadcrumb-${stamp}.json`);
const csvPath = path.join(OUT_DIR, `breadcrumb-${stamp}.csv`);
fs.writeFileSync(jsonPath, JSON.stringify({ base: BASE, live: LIVE, total: results.length, failures, results }, null, 2));
const csv = ["route,category,depth,liveStatus,ok,errors"];
for (const r of results) {
  const errs = [...r.staticErrs, ...r.liveErrs].join(" | ").replace(/"/g, "'");
  csv.push(`"${r.route}","${r.category ?? ""}",${r.expectedDepth},${r.liveStatus},${r.ok},"${errs}"`);
}
fs.writeFileSync(csvPath, csv.join("\n"));

console.log(`\nBreadcrumb JSON-LD audit (${LIVE ? "static + live" : "static only"})`);
console.log(`Routes scanned: ${results.length}`);
console.log(`Failures:       ${failures}`);
console.log(`Reports:        ${path.relative(ROOT, jsonPath)}\n                ${path.relative(ROOT, csvPath)}`);
if (failures > 0) {
  console.log("\nFirst 10 failures:");
  for (const r of results.filter((x) => !x.ok).slice(0, 10)) {
    console.log(`  ✗ ${r.route} → ${[...r.staticErrs, ...r.liveErrs].join("; ")}`);
  }
}
process.exit(failures > 0 ? 1 : 0);
