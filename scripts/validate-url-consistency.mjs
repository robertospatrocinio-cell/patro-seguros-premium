#!/usr/bin/env node
/**
 * validate-url-consistency.mjs
 *
 * CI gate: garante que canonical, og:url e TODA URL absoluta em
 * JSON-LD (@id, url, mainEntityOfPage, item) usem a MESMA versão
 * canônica de rota — www.patroseguros.com.br e SEM barra final
 * (exceto raiz). Não permite fallback silencioso para host errado.
 *
 * Verifica, para cada dist/**\/index.html:
 *  1. <link rel="canonical"> presente, absoluto, host esperado, sem
 *     trailing slash (exceto "/").
 *  2. <meta property="og:url"> = canonical (byte a byte).
 *  3. Todo JSON-LD com URL do domínio da marca:
 *     - usa https://www.patroseguros.com.br (nunca apex, nunca http,
 *       nunca lovable.app);
 *     - nunca termina em "/" (exceto quando a URL é a raiz).
 *  4. O canonical da página aparece em pelo menos um @id/url do
 *     JSON-LD principal — evita rich snippet apontando para rota
 *     diferente da canônica.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");
const EXPECTED_HOST = process.env.EXPECTED_HOST || "www.patroseguros.com.br";
const BASE = `https://${EXPECTED_HOST}`;
const BRAND_HOST_RE = /patroseguros\.com\.br/i;

const SKIP = new Set(["404.html"]);
const SKIP_PREFIXES = ["assets/", "admin/"];

function walk(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, acc);
    else if (entry.name === "index.html" || entry.name.endsWith(".html"))
      acc.push(full);
  }
  return acc;
}

function routeOf(file) {
  const rel = path.relative(DIST, file).replace(/\\/g, "/");
  if (rel === "index.html") return "/";
  return "/" + rel.replace(/\/index\.html$/, "").replace(/\.html$/, "");
}

function shouldSkip(file) {
  const rel = path.relative(DIST, file).replace(/\\/g, "/");
  if (SKIP.has(rel)) return true;
  return SKIP_PREFIXES.some((p) => rel.startsWith(p));
}

function extractCanonical(html) {
  const m = html.match(
    /<link\s+[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i,
  );
  return m ? m[1] : null;
}

function extractOgUrl(html) {
  const m = html.match(
    /<meta\s+[^>]*property=["']og:url["'][^>]*content=["']([^"']+)["']/i,
  );
  return m ? m[1] : null;
}

function extractJsonLd(html) {
  const out = [];
  const re =
    /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(html))) {
    const raw = m[1].trim();
    try {
      out.push(JSON.parse(raw));
    } catch {
      out.push({ __invalid: raw.slice(0, 120) });
    }
  }
  return out;
}

function collectUrls(node, acc = []) {
  if (!node || typeof node !== "object") return acc;
  if (Array.isArray(node)) {
    for (const n of node) collectUrls(n, acc);
    return acc;
  }
  for (const [k, v] of Object.entries(node)) {
    if (typeof v === "string" && BRAND_HOST_RE.test(v) && /^https?:\/\//i.test(v)) {
      acc.push({ key: k, value: v });
    } else if (v && typeof v === "object") {
      collectUrls(v, acc);
    }
  }
  return acc;
}

function isBadTrailing(u) {
  try {
    const parsed = new URL(u);
    if (parsed.pathname === "/") return false;
    return parsed.pathname.endsWith("/");
  } catch {
    return false;
  }
}

function hasWrongHost(u) {
  try {
    const parsed = new URL(u);
    if (parsed.protocol !== "https:") return true;
    return parsed.host !== EXPECTED_HOST;
  } catch {
    return true;
  }
}

function main() {
  if (!fs.existsSync(DIST)) {
    console.log("ℹ️  dist/ ausente — validação de URL consistency pulada.");
    return;
  }
  const files = walk(DIST).filter((f) => !shouldSkip(f));
  const errors = [];
  let checked = 0;

  for (const file of files) {
    const route = routeOf(file);
    const html = fs.readFileSync(file, "utf-8");
    const canonical = extractCanonical(html);
    if (!canonical) continue; // outras validações cobrem ausência
    checked++;

    // 1. host + trailing slash na canonical
    if (hasWrongHost(canonical)) {
      errors.push(`${route}: canonical com host inesperado → ${canonical}`);
    }
    if (isBadTrailing(canonical)) {
      errors.push(`${route}: canonical termina em "/" → ${canonical}`);
    }

    // 2. og:url = canonical
    const ogUrl = extractOgUrl(html);
    if (ogUrl && ogUrl !== canonical) {
      errors.push(
        `${route}: og:url divergente da canonical\n    canonical: ${canonical}\n    og:url:    ${ogUrl}`,
      );
    }

    // 3. JSON-LD urls
    const blocks = extractJsonLd(html);
    const allUrls = [];
    for (const b of blocks) {
      if (b && b.__invalid) {
        errors.push(`${route}: JSON-LD inválido → ${b.__invalid}`);
        continue;
      }
      collectUrls(b, allUrls);
    }
    for (const { key, value } of allUrls) {
      if (hasWrongHost(value)) {
        errors.push(
          `${route}: JSON-LD "${key}" com host inesperado → ${value}`,
        );
      }
      if (isBadTrailing(value)) {
        errors.push(
          `${route}: JSON-LD "${key}" termina em "/" → ${value}`,
        );
      }
    }

    // 4. canonical presente em algum @id/url do JSON-LD (quando há WebPage/Service)
    const values = allUrls.map((u) => u.value);
    const hasBrand = values.some((v) => BRAND_HOST_RE.test(v));
    if (hasBrand && !values.includes(canonical)) {
      // Aceita rota-hub via allowlist do canonical (não replicamos aqui):
      // apenas alerta se NENHUM url/@id bate com o canonical.
      const routeUrl = route === "/" ? BASE : `${BASE}${route}`;
      if (!values.includes(routeUrl)) {
        errors.push(
          `${route}: nenhum @id/url do JSON-LD casa com a canonical (${canonical})`,
        );
      }
    }
  }

  if (errors.length) {
    console.error(
      `\n❌ URL consistency: ${errors.length} problema(s) em ${checked} rota(s):\n`,
    );
    for (const e of errors.slice(0, 60)) console.error("  • " + e);
    if (errors.length > 60) console.error(`  … +${errors.length - 60}`);
    process.exit(1);
  }

  console.log(
    `✅ URL consistency: ${checked} rotas com canonical/og:url/JSON-LD alinhados a ${BASE}`,
  );
}

main();
