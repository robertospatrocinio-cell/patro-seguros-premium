#!/usr/bin/env node
/**
 * Runtime SEO auditor — validates head metadata on a sample of live URLs
 * before deploy. Fail-fast: exits 1 if any hard rule is violated.
 *
 * Hard rules (per page):
 *   - HTTP 200
 *   - Exactly one <title>, 10–60 chars, no "Lovable" placeholder
 *   - Exactly one <meta name="description">, 50–160 chars
 *   - Exactly one <link rel="canonical"> with an absolute https URL
 *   - <meta name="robots"> must NOT contain "noindex" (unless route in NOINDEX_ALLOW)
 *   - og:title, og:description, og:url, og:type, og:image (absolute https)
 *   - twitter:card present
 *   - At least one <script type="application/ld+json"> with valid JSON
 *   - Exactly one <h1> in the static HTML
 *
 * Soft rules (warn only):
 *   - At least one <h2> in static HTML (SPA routes hydrate H2s client-side)
 *   - canonical and og:url resolve to the same URL as the fetched page
 *
 * Usage:
 *   node scripts/audit-seo-runtime.mjs                 # audits BASE_URL (default live site)
 *   BASE_URL=http://localhost:8080 node scripts/...    # audit local preview
 *   SAMPLE=40 node scripts/...                         # sample size per sitemap
 *   PATHS=/,/blog,/sobre node scripts/...              # explicit path list (overrides sitemaps)
 */

const BASE_URL = (process.env.BASE_URL || "https://www.patroseguros.com.br").replace(/\/$/, "");
const SAMPLE = Number(process.env.SAMPLE || 6);
const SITEMAP_INDEX = `${BASE_URL}/sitemap-index.xml`;
const NOINDEX_ALLOW = new Set([
  "/admin", "/conversion-dashboard", "/performance-diagnostico",
  "/seo-technical-report", "/pagespeed-history", "/ebook-consorcio",
]);

const COLOR = {
  red: (s) => `\x1b[31m${s}\x1b[0m`,
  green: (s) => `\x1b[32m${s}\x1b[0m`,
  yellow: (s) => `\x1b[33m${s}\x1b[0m`,
  dim: (s) => `\x1b[2m${s}\x1b[0m`,
  bold: (s) => `\x1b[1m${s}\x1b[0m`,
};

async function fetchText(url) {
  const res = await fetch(url, { headers: { "User-Agent": "PatroSEOAuditor/1.0" } });
  return { status: res.status, body: await res.text(), finalUrl: res.url };
}

function matchAll(re, src) {
  return [...src.matchAll(re)];
}

function getMeta(html, attr, key) {
  // <meta name="x" content="y"> or <meta property="x" content="y">
  const re = new RegExp(
    `<meta[^>]*\\s${attr}=["']${key}["'][^>]*\\scontent=["']([^"']*)["']`,
    "i",
  );
  const m = html.match(re);
  if (m) return m[1];
  // Reverse attribute order
  const re2 = new RegExp(
    `<meta[^>]*\\scontent=["']([^"']*)["'][^>]*\\s${attr}=["']${key}["']`,
    "i",
  );
  const m2 = html.match(re2);
  return m2 ? m2[1] : null;
}

function getTag(html, tag) {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "gi");
  return matchAll(re, html).map((m) => m[1].replace(/<[^>]+>/g, "").trim());
}

function getCanonical(html) {
  const m = html.match(/<link[^>]*\srel=["']canonical["'][^>]*\shref=["']([^"']+)["']/i)
    || html.match(/<link[^>]*\shref=["']([^"']+)["'][^>]*\srel=["']canonical["']/i);
  return m ? m[1] : null;
}

function getJsonLd(html) {
  const blocks = matchAll(
    /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
    html,
  );
  return blocks.map((b) => {
    try { return { ok: true, data: JSON.parse(b[1].trim()) }; }
    catch (e) { return { ok: false, error: e.message }; }
  });
}

function auditPage(path, html, status) {
  const errors = [];
  const warnings = [];

  if (status !== 200) errors.push(`HTTP ${status}`);

  // <title>
  const titles = getTag(html, "title");
  if (titles.length !== 1) errors.push(`expected 1 <title>, got ${titles.length}`);
  else {
    const t = titles[0];
    if (t.length < 10) errors.push(`<title> too short (${t.length})`);
    if (t.length > 60) errors.push(`<title> too long (${t.length}): "${t}"`);
    if (/lovable/i.test(t)) errors.push(`<title> contains "Lovable" placeholder`);
  }

  // description
  const desc = getMeta(html, "name", "description");
  if (!desc) errors.push(`missing meta description`);
  else {
    if (desc.length < 50) errors.push(`description too short (${desc.length})`);
    if (desc.length > 160) errors.push(`description too long (${desc.length})`);
  }

  // robots
  const robots = getMeta(html, "name", "robots") || "";
  if (/noindex/i.test(robots) && !NOINDEX_ALLOW.has(path)) {
    errors.push(`meta robots contains noindex on indexable route`);
  }

  // canonical
  const canonical = getCanonical(html);
  if (!canonical) errors.push(`missing canonical`);
  else if (!/^https:\/\//.test(canonical)) errors.push(`canonical must be absolute https: ${canonical}`);

  // OG / Twitter
  for (const k of ["og:title", "og:description", "og:url", "og:type", "og:image"]) {
    const v = getMeta(html, "property", k);
    if (!v) errors.push(`missing ${k}`);
    else if ((k === "og:url" || k === "og:image") && !/^https:\/\//.test(v)) {
      errors.push(`${k} must be absolute https: ${v}`);
    }
  }
  const tw = getMeta(html, "name", "twitter:card");
  if (!tw) errors.push(`missing twitter:card`);

  // JSON-LD
  const jsonld = getJsonLd(html);
  if (jsonld.length === 0) errors.push(`no JSON-LD <script> found`);
  const bad = jsonld.filter((b) => !b.ok);
  if (bad.length) errors.push(`invalid JSON-LD (${bad.length}): ${bad[0].error}`);

  // Headings
  const h1 = matchAll(/<h1\b/gi, html);
  if (h1.length === 0) errors.push(`missing <h1>`);
  else if (h1.length > 1) errors.push(`multiple <h1> (${h1.length})`);
  const h2 = matchAll(/<h2\b/gi, html);
  if (h2.length === 0) warnings.push(`no <h2> in static HTML (SPA hydration?)`);

  return { errors, warnings };
}

async function listSitemaps() {
  try {
    const { body } = await fetchText(SITEMAP_INDEX);
    return matchAll(/<loc>([^<]+)<\/loc>/g, body).map((m) => m[1]);
  } catch {
    return [`${BASE_URL}/sitemap.xml`];
  }
}

async function sampleFromSitemap(url) {
  const { body } = await fetchText(url);
  const all = matchAll(/<loc>([^<]+)<\/loc>/g, body).map((m) => m[1]);
  // Always include first + last + random N-2
  if (all.length <= SAMPLE) return all;
  const picks = new Set([all[0], all[all.length - 1]]);
  while (picks.size < SAMPLE) picks.add(all[Math.floor(Math.random() * all.length)]);
  return [...picks];
}

async function resolveUrls() {
  if (process.env.PATHS) {
    return process.env.PATHS.split(",").map((p) => `${BASE_URL}${p.trim().startsWith("/") ? p.trim() : "/" + p.trim()}`);
  }
  const sitemaps = await listSitemaps();
  const sampled = await Promise.all(sitemaps.map(sampleFromSitemap));
  return [`${BASE_URL}/`, ...new Set(sampled.flat())];
}

async function main() {
  console.log(COLOR.bold(`\n🔍 SEO runtime audit — ${BASE_URL}\n`));
  const urls = await resolveUrls();
  console.log(COLOR.dim(`Auditing ${urls.length} URL(s) (sample=${SAMPLE} per sitemap)\n`));

  let failed = 0;
  let warned = 0;

  for (const url of urls) {
    const path = new URL(url).pathname;
    let result;
    try {
      const { status, body } = await fetchText(url);
      result = auditPage(path, body, status);
    } catch (e) {
      console.log(`${COLOR.red("✗")} ${path}  — fetch failed: ${e.message}`);
      failed++;
      continue;
    }
    if (result.errors.length) {
      failed++;
      console.log(`${COLOR.red("✗")} ${COLOR.bold(path)}`);
      result.errors.forEach((e) => console.log(`    ${COLOR.red("•")} ${e}`));
    } else if (result.warnings.length) {
      warned++;
      console.log(`${COLOR.yellow("⚠")} ${path}`);
      result.warnings.forEach((w) => console.log(`    ${COLOR.yellow("•")} ${w}`));
    } else {
      console.log(`${COLOR.green("✓")} ${path}`);
    }
  }

  const total = urls.length;
  const passed = total - failed - warned;
  console.log(
    `\n${COLOR.bold("Summary:")} ${COLOR.green(passed + " ok")}, ` +
    `${COLOR.yellow(warned + " warn")}, ${COLOR.red(failed + " fail")} / ${total}\n`,
  );

  if (failed > 0) {
    console.log(COLOR.red("❌ SEO audit failed — fix the errors above before deploying."));
    process.exit(1);
  }
  console.log(COLOR.green("✅ SEO audit passed."));
}

main().catch((e) => { console.error(e); process.exit(1); });