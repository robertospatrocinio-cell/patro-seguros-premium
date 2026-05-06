#!/usr/bin/env node
/**
 * audit-canonical.mjs
 *
 * Crawls every product/SEO/local route and validates:
 *  - Apex (patroseguros.com.br)        -> 301 to https://www.patroseguros.com.br
 *  - http://www.patroseguros.com.br    -> 301 to https://www.patroseguros.com.br
 *  - https://www.patroseguros.com.br   -> 200 OK
 *  - <link rel="canonical">            -> exactly https://www.patroseguros.com.br + path
 *  - <meta property="og:url">          -> same as canonical
 *
 * Usage:
 *   node scripts/audit-canonical.mjs
 *   node scripts/audit-canonical.mjs --base=https://www.patroseguros.com.br
 *   node scripts/audit-canonical.mjs --routes=src/lib/insuranceHubLinks.ts
 *
 * Exit code: 0 if all good, 1 if any failure. Saves a CSV + JSON in ./audit-output.
 */

import fs from "node:fs";
import path from "node:path";

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, "").split("=");
    return [k, v ?? true];
  })
);

const BASE = (args.base || "https://www.patroseguros.com.br").replace(/\/$/, "");
const APEX = BASE.replace("https://www.", "https://");
const HTTP_WWW = BASE.replace("https://", "http://");
const OUT_DIR = path.resolve("audit-output");
fs.mkdirSync(OUT_DIR, { recursive: true });

// --- Collect routes from the hub map (single source of truth) -----------------
function collectRoutes() {
  const set = new Set(["/"]);
  try {
    const src = fs.readFileSync(path.resolve("src/lib/insuranceHubLinks.ts"), "utf-8");
    const re = /href:\s*"(\/[^"]+)"/g;
    let m;
    while ((m = re.exec(src)) !== null) set.add(m[1]);
  } catch (e) {
    console.warn("⚠️  Could not read insuranceHubLinks.ts:", e.message);
  }
  // Also pull from sitemap if present
  try {
    const sm = fs.readFileSync(path.resolve("public/sitemap.xml"), "utf-8");
    const re = /<loc>https:\/\/www\.patroseguros\.com\.br(\/[^<]*)<\/loc>/g;
    let m;
    while ((m = re.exec(sm)) !== null) set.add(m[1] || "/");
  } catch {}
  return [...set].sort();
}

const ROUTES = collectRoutes();
console.log(`🔎 Auditing ${ROUTES.length} routes against ${BASE}\n`);

// --- HTTP helpers -------------------------------------------------------------
async function fetchNoFollow(url) {
  try {
    const res = await fetch(url, { redirect: "manual", headers: { "User-Agent": "PatroAuditBot/1.0" } });
    return { status: res.status, location: res.headers.get("location"), ok: true };
  } catch (e) {
    return { status: 0, location: null, ok: false, error: e.message };
  }
}

async function fetchHtml(url) {
  try {
    const res = await fetch(url, { redirect: "follow", headers: { "User-Agent": "PatroAuditBot/1.0" } });
    const html = await res.text();
    return { status: res.status, finalUrl: res.url, html };
  } catch (e) {
    return { status: 0, finalUrl: url, html: "", error: e.message };
  }
}

function pick(re, html) {
  const m = re.exec(html);
  return m ? m[1] : null;
}

// --- Per-route audit ----------------------------------------------------------
async function auditRoute(routePath) {
  const expected = `${BASE}${routePath === "/" ? "" : routePath}`;

  const [apexProbe, httpProbe, httpsProbe] = await Promise.all([
    fetchNoFollow(`${APEX}${routePath}`),
    fetchNoFollow(`${HTTP_WWW}${routePath}`),
    fetchHtml(`${BASE}${routePath}`),
  ]);

  const issues = [];

  // 1. Apex must 301 -> www
  if (apexProbe.status !== 301 && apexProbe.status !== 308) {
    issues.push(`apex returned ${apexProbe.status} (expected 301)`);
  } else if (apexProbe.location && !apexProbe.location.startsWith(BASE)) {
    issues.push(`apex redirects to ${apexProbe.location} (expected ${BASE}…)`);
  }

  // 2. http://www must 301 -> https://www
  if (httpProbe.status !== 301 && httpProbe.status !== 308) {
    issues.push(`http://www returned ${httpProbe.status} (expected 301 to https)`);
  } else if (httpProbe.location && !httpProbe.location.startsWith("https://")) {
    issues.push(`http→ redirects to non-https: ${httpProbe.location}`);
  }

  // 3. Canonical URL must match
  if (httpsProbe.status !== 200) {
    issues.push(`https://www returned ${httpsProbe.status}`);
  }
  const canonical = pick(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i, httpsProbe.html);
  const ogUrl = pick(/<meta[^>]+property=["']og:url["'][^>]+content=["']([^"']+)["']/i, httpsProbe.html);

  if (!canonical) {
    issues.push("canonical tag missing");
  } else if (canonical.replace(/\/$/, "") !== expected.replace(/\/$/, "")) {
    issues.push(`canonical=${canonical} (expected ${expected})`);
  }
  if (ogUrl && ogUrl.replace(/\/$/, "") !== expected.replace(/\/$/, "")) {
    issues.push(`og:url=${ogUrl} (expected ${expected})`);
  }

  return {
    path: routePath,
    expected,
    apexStatus: apexProbe.status,
    apexLocation: apexProbe.location,
    httpStatus: httpProbe.status,
    httpLocation: httpProbe.location,
    httpsStatus: httpsProbe.status,
    canonical,
    ogUrl,
    pass: issues.length === 0,
    issues: issues.join(" | "),
  };
}

// --- Run with concurrency limit ----------------------------------------------
const CONCURRENCY = 6;
const results = [];
let i = 0, done = 0;

async function worker() {
  while (i < ROUTES.length) {
    const idx = i++;
    const r = await auditRoute(ROUTES[idx]);
    results[idx] = r;
    done++;
    const tag = r.pass ? "✅" : "❌";
    process.stdout.write(`${tag} [${done}/${ROUTES.length}] ${r.path}${r.pass ? "" : "  ← " + r.issues}\n`);
  }
}

await Promise.all(Array.from({ length: CONCURRENCY }, worker));

// --- Reports ------------------------------------------------------------------
const fails = results.filter((r) => !r.pass);
const csvHeader = "path,expected,apex_status,apex_location,http_status,http_location,https_status,canonical,og_url,pass,issues";
const csvRows = results.map((r) => [
  r.path, r.expected, r.apexStatus, r.apexLocation ?? "", r.httpStatus, r.httpLocation ?? "",
  r.httpsStatus, r.canonical ?? "", r.ogUrl ?? "", r.pass, r.issues,
].map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","));

const stamp = new Date().toISOString().replace(/[:.]/g, "-");
fs.writeFileSync(path.join(OUT_DIR, `canonical-audit-${stamp}.csv`), [csvHeader, ...csvRows].join("\n"));
fs.writeFileSync(path.join(OUT_DIR, `canonical-audit-${stamp}.json`), JSON.stringify({ base: BASE, total: results.length, failed: fails.length, results }, null, 2));

console.log(`\n— Summary —`);
console.log(`Total: ${results.length}  ✅ Pass: ${results.length - fails.length}  ❌ Fail: ${fails.length}`);
console.log(`Reports: audit-output/canonical-audit-${stamp}.{csv,json}`);

process.exit(fails.length > 0 ? 1 : 0);
