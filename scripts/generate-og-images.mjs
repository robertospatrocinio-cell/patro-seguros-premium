#!/usr/bin/env node
/**
 * generate-og-images.mjs
 *
 * Gera imagens Open Graph (1200×630 JPG) personalizadas para:
 *   • Cada bairro (hub /seguros-guarulhos/<id>)  → título "Seguros no <Bairro>"
 *   • Cada página produto×bairro (residencial/vida/empresarial) → título do produto
 *
 * Fluxo:
 *   1. Extrai bairros de src/lib/bairrosData.ts (regex: id + nome).
 *   2. Extrai produto×bairro de src/data/seoLocalProdutoBairroPages.ts
 *      (usa os mesmos SEEDS + regra slugFor(produto, s)).
 *   3. Renderiza SVG (Navy #003366 + accent #F2994A) → JPG via sharp.
 *   4. Grava public/images/og/<slug>.jpg  (0 KB de rebuild se o hash for igual).
 *   5. Escreve manifest src/data/generatedOgImages.ts (slug → url absoluto)
 *      consumido por PageMeta para popular og:image / twitter:image.
 *
 * Uso: node scripts/generate-og-images.mjs
 * Hookado no predev/prebuild via package.json.
 */

import fs from "fs";
import path from "path";
import crypto from "crypto";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const OUT_DIR = path.join(ROOT, "public/images/og");
const MANIFEST = path.join(ROOT, "src/data/generatedOgImages.ts");
const DOMAIN = "https://www.patroseguros.com.br";

// ---------------------------------------------------------------------------
// 1. Bairros — id + nome via regex em src/lib/bairrosData.ts
// ---------------------------------------------------------------------------
function loadBairros() {
  const src = fs.readFileSync(path.join(ROOT, "src/lib/bairrosData.ts"), "utf-8");
  // Cada bairro no array tem { id: "...", nome: "..." } — capturar em ordem.
  const re = /id:\s*"([a-z0-9-]+)"[^]*?nome:\s*"([^"]+)"/g;
  const out = [];
  let m;
  while ((m = re.exec(src)) !== null) out.push({ id: m[1], nome: m[2] });
  return out;
}

// ---------------------------------------------------------------------------
// 2. Produto×bairro — replica lógica de seoLocalProdutoBairroPages.ts
// ---------------------------------------------------------------------------
function loadProdutoBairro() {
  const src = fs.readFileSync(
    path.join(ROOT, "src/data/seoLocalProdutoBairroPages.ts"),
    "utf-8",
  );
  // Extrai os SEEDS: bairro: "X", slugBairro: "y"
  const re = /bairro:\s*"([^"]+)",\s*slugBairro:\s*"([a-z0-9-]+)"/g;
  const seeds = [];
  let m;
  while ((m = re.exec(src)) !== null) seeds.push({ bairro: m[1], slugBairro: m[2] });

  const produtos = [
    { key: "residencial", label: "Seguro Residencial" },
    { key: "vida", label: "Seguro de Vida" },
    { key: "empresarial", label: "Seguro Empresarial" },
  ];

  const pages = [];
  for (const s of seeds) {
    for (const p of produtos) {
      pages.push({
        slug: `seguro-${p.key}-${s.slugBairro}`,
        title: `${p.label} no ${s.bairro}`,
        city: `${s.bairro} · Guarulhos/SP`,
      });
    }
  }
  return pages;
}

// ---------------------------------------------------------------------------
// 3. Template SVG — Navy + accent laranja, título grande, cidade abaixo
// ---------------------------------------------------------------------------
const NAVY = "#003366";
const NAVY_DARK = "#001f3f";
const ACCENT = "#F2994A";
const WHITE = "#FFFFFF";
const MUTED = "#B8C6D6";

function escapeXml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** Word-wrap manual (SVG puro não suporta wrapping). */
function wrap(text, maxChars) {
  const words = text.split(/\s+/);
  const lines = [];
  let cur = "";
  for (const w of words) {
    if ((cur + " " + w).trim().length <= maxChars) cur = (cur + " " + w).trim();
    else {
      if (cur) lines.push(cur);
      cur = w;
    }
  }
  if (cur) lines.push(cur);
  return lines.slice(0, 3); // no máx 3 linhas
}

function buildSvg({ title, city }) {
  const lines = wrap(title, 22);
  const fontSize = lines.length >= 3 ? 68 : lines.length === 2 ? 78 : 92;
  const lineHeight = fontSize * 1.15;
  const totalTextH = lineHeight * lines.length;
  const startY = 630 / 2 - totalTextH / 2 + fontSize * 0.85 - 30;

  const tspans = lines
    .map(
      (line, i) =>
        `<tspan x="80" y="${startY + i * lineHeight}">${escapeXml(line)}</tspan>`,
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${NAVY}"/>
      <stop offset="1" stop-color="${NAVY_DARK}"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${ACCENT}"/>
      <stop offset="1" stop-color="#E67E22"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <!-- Faixa decorativa lateral -->
  <rect x="0" y="0" width="14" height="630" fill="url(#accent)"/>
  <!-- Marca -->
  <text x="80" y="90" font-family="'Helvetica Neue', Arial, sans-serif" font-size="26" font-weight="700" fill="${ACCENT}" letter-spacing="4">PATRO SEGUROS</text>
  <line x1="80" y1="110" x2="220" y2="110" stroke="${ACCENT}" stroke-width="3"/>
  <!-- Título -->
  <text font-family="'Helvetica Neue', Arial, sans-serif" font-size="${fontSize}" font-weight="800" fill="${WHITE}">${tspans}</text>
  <!-- Cidade / metadata -->
  <text x="80" y="540" font-family="'Helvetica Neue', Arial, sans-serif" font-size="30" font-weight="500" fill="${MUTED}">${escapeXml(city)}</text>
  <!-- CTA -->
  <rect x="80" y="565" width="240" height="42" rx="21" fill="${ACCENT}"/>
  <text x="200" y="594" text-anchor="middle" font-family="'Helvetica Neue', Arial, sans-serif" font-size="20" font-weight="700" fill="${NAVY_DARK}">COTAR AGORA</text>
  <!-- Selo Google no canto -->
  <text x="1120" y="570" text-anchor="end" font-family="'Helvetica Neue', Arial, sans-serif" font-size="22" font-weight="700" fill="${WHITE}">★ 4,9 no Google</text>
  <text x="1120" y="598" text-anchor="end" font-family="'Helvetica Neue', Arial, sans-serif" font-size="16" font-weight="400" fill="${MUTED}">Corretora Guarulhos/SP</text>
</svg>`;
}

// ---------------------------------------------------------------------------
// 4. Render + cache por hash (só regrava se conteúdo mudou)
// ---------------------------------------------------------------------------
async function renderOne({ slug, title, city }) {
  const svg = buildSvg({ title, city });
  const hash = crypto.createHash("sha1").update(svg).digest("hex").slice(0, 10);
  const outPath = path.join(OUT_DIR, `${slug}.jpg`);
  const hashPath = outPath + ".hash";
  if (fs.existsSync(outPath) && fs.existsSync(hashPath)) {
    if (fs.readFileSync(hashPath, "utf-8") === hash) return { slug, cached: true };
  }
  const buf = await sharp(Buffer.from(svg))
    .jpeg({ quality: 85, mozjpeg: true })
    .toBuffer();
  fs.writeFileSync(outPath, buf);
  fs.writeFileSync(hashPath, hash, "utf-8");
  return { slug, cached: false };
}

// ---------------------------------------------------------------------------
// 5. Manifest → src/data/generatedOgImages.ts
// ---------------------------------------------------------------------------
function writeManifest(entries) {
  const map = {};
  // Bairros: hub /seguros-guarulhos/<id> e slug produto×bairro
  for (const e of entries) map[e.pathname] = `${DOMAIN}/images/og/${e.slug}.jpg`;

  const body = `/* AUTO-GENERATED por scripts/generate-og-images.mjs — não editar. */
/**
 * Mapa pathname → URL absoluto da imagem OG gerada automaticamente.
 * Consumido por src/components/PageMeta.tsx para popular og:image /
 * twitter:image em páginas de bairro e produto×bairro sem intervenção manual.
 */
export const GENERATED_OG_IMAGES: Record<string, string> = ${JSON.stringify(map, null, 2)};

export function getGeneratedOgImage(pathname: string): string | undefined {
  const clean = pathname.replace(/\\/+$/, "") || "/";
  return GENERATED_OG_IMAGES[clean];
}
`;
  fs.writeFileSync(MANIFEST, body, "utf-8");
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const bairros = loadBairros();
  const produtoBairro = loadProdutoBairro();

  const jobs = [];

  // Bairros → hub
  for (const b of bairros) {
    jobs.push({
      slug: `bairro-${b.id}`,
      pathname: `/seguros-guarulhos/${b.id}`,
      title: `Seguros no ${b.nome}`,
      city: `${b.nome} · Guarulhos/SP`,
    });
  }
  // Produto×bairro
  for (const p of produtoBairro) {
    jobs.push({
      slug: p.slug,
      pathname: `/${p.slug}`,
      title: p.title,
      city: p.city,
    });
  }

  let cached = 0;
  let generated = 0;
  for (const job of jobs) {
    const res = await renderOne(job);
    if (res.cached) cached++;
    else generated++;
  }

  writeManifest(jobs);

  console.log(
    `✓ og-images: ${jobs.length} rotas (${generated} geradas, ${cached} em cache) → public/images/og/`,
  );
  console.log(`  ↳ manifest: ${path.relative(ROOT, MANIFEST)}`);
}

main().catch((err) => {
  console.error("✗ generate-og-images falhou:", err);
  process.exit(1);
});