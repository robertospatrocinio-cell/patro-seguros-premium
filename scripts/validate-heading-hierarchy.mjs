#!/usr/bin/env node
/**
 * validate-heading-hierarchy.mjs
 *
 * CI gate: garante que a hierarquia de headings do site permaneça
 * consistente para acessibilidade + SEO.
 *
 * Aplica três checagens complementares:
 *
 *  1. FONTE — em `InsurancePageTemplate.tsx` (e páginas com `id="*-heading"`
 *     inline), todo `id` que termina em `-heading` DEVE estar em uma tag
 *     <h1>, <h2> ou <h3>. Bugs comuns: colar o id em um <div>, <section>
 *     ou <span>, que quebra leitores de tela e `aria-labelledby`.
 *
 *  2. HIERARQUIA — no HTML pré-renderizado em `dist/`, a ordem de headings
 *     não pode pular níveis (ex.: h1 → h3). Skips fazem o outline colapsar
 *     e violam WCAG 1.3.1 (Info and Relationships) / 2.4.6 (Headings).
 *
 *  3. JUMPLINKS — para cada rota com `jumpLinks`, cada `href="#foo"` deve
 *     apontar, no HTML servido, para um elemento <h1|h2|h3 id="foo">.
 *     Isto complementa `validate-jumplinks.mjs` (que só verifica a
 *     existência do id, sem checar a tag).
 *
 * Flags:
 *   SKIP_DIST=1   → só valida a camada de fonte (útil pre-build).
 *   WARN_ONLY=1   → não falha o build (para inspeção local).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PAGES_DIR = path.join(ROOT, "src", "pages");
const COMPONENTS_DIR = path.join(ROOT, "src", "components");
const DIST = path.join(ROOT, "dist");
const SKIP_DIST = process.env.SKIP_DIST === "1";
const WARN_ONLY = process.env.WARN_ONLY === "1";

const HEADING_TAGS = new Set(["h1", "h2", "h3"]);
const ALLOWED_HIERARCHY_TAGS = ["h1", "h2", "h3", "h4", "h5", "h6"];

/* -------------------------------------------------------------------------- */
/* Layer 1 — Source: id="*-heading" precisa estar em h1/h2/h3                 */
/* -------------------------------------------------------------------------- */

function walkTsxFiles(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walkTsxFiles(full));
    else if (entry.isFile() && /\.tsx$/.test(entry.name)) out.push(full);
  }
  return out;
}

function auditSourceFile(file) {
  const src = fs.readFileSync(file, "utf-8");
  const issues = [];
  // Casa <tag ... id="foo-heading" ...> — captura a tag e o id.
  const re = /<([A-Za-z][A-Za-z0-9]*)\b[^>]*\bid=["']([a-z0-9-]+-heading)["'][^>]*>/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    const tag = m[1].toLowerCase();
    const id = m[2];
    if (!HEADING_TAGS.has(tag)) {
      issues.push(
        `id="${id}" está em <${tag}>, deve estar em <h1|h2|h3> (ancora de seção)`,
      );
    }
  }
  return issues;
}

/* -------------------------------------------------------------------------- */
/* Layer 2 + 3 — HTML pré-renderizado em dist/                                */
/* -------------------------------------------------------------------------- */

function walkHtml(dir) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walkHtml(full));
    else if (entry.isFile() && entry.name.endsWith(".html")) out.push(full);
  }
  return out;
}

/**
 * Extrai todos os headings do HTML na ordem em que aparecem, com o id
 * (se houver). Ignora `<noscript>` para não sujar com fallbacks.
 */
function extractHeadingsOrdered(html) {
  const cleaned = html.replace(/<noscript>[\s\S]*?<\/noscript>/gi, "");
  const re = /<(h[1-6])\b([^>]*)>/gi;
  const out = [];
  let m;
  while ((m = re.exec(cleaned)) !== null) {
    const tag = m[1].toLowerCase();
    const attrs = m[2] || "";
    const idMatch = attrs.match(/\bid=["']([^"']+)["']/);
    out.push({ tag, level: Number(tag[1]), id: idMatch ? idMatch[1] : null });
  }
  return out;
}

function auditHierarchy(headings) {
  const issues = [];
  let prev = 0;
  for (const h of headings) {
    if (prev === 0) {
      // Primeiro heading pode ser qualquer nível (páginas às vezes começam
      // com h2 quando o layout do shell já injeta um h1 fora do outlet).
      prev = h.level;
      continue;
    }
    if (h.level > prev + 1) {
      issues.push(
        `pula de <h${prev}> para <${h.tag}> (id=${h.id ?? "—"}) — hierarquia inválida`,
      );
    }
    prev = h.level;
  }
  return issues;
}

function auditJumplinksInHtml(html, headings) {
  // Rotas Long-tail passam jumpLinks para o template; o HTML servido precisa
  // conter cada id em um heading. Extraímos os hrefs do próprio HTML
  // (renderizados pelo <JumpLinksNav>) para tornar a checagem independente
  // do código-fonte da rota.
  const nav = html.match(
    /<nav[^>]*aria-label=["']Ir para a se[çc]ão["'][\s\S]*?<\/nav>/i,
  );
  if (!nav) return [];
  const hrefs = [...nav[0].matchAll(/href=["']#([a-z0-9-]+)["']/g)].map(
    (x) => x[1],
  );
  const headingIds = new Map(
    headings.filter((h) => h.id && HEADING_TAGS.has(h.tag)).map((h) => [h.id, h.tag]),
  );
  const anyId = new Set(headings.filter((h) => h.id).map((h) => h.id));
  const issues = [];
  for (const id of hrefs) {
    if (!headingIds.has(id)) {
      if (!anyId.has(id)) {
        issues.push(`jumplink #${id} → id inexistente no HTML`);
      } else {
        issues.push(
          `jumplink #${id} → id existe mas não está em <h1|h2|h3>`,
        );
      }
    }
  }
  return issues;
}

function auditHtmlFile(file) {
  const html = fs.readFileSync(file, "utf-8");
  const headings = extractHeadingsOrdered(html);
  // Shells SPA (sem SSG) podem vir sem headings — nada a validar.
  if (headings.length === 0) return [];
  return [
    ...auditHierarchy(headings),
    ...auditJumplinksInHtml(html, headings),
  ];
}

/* -------------------------------------------------------------------------- */
/* Runner                                                                      */
/* -------------------------------------------------------------------------- */

function relative(p) {
  return path.relative(ROOT, p);
}

function run() {
  const report = { source: [], dist: [] };

  // Layer 1: fonte (template + páginas)
  const sourceFiles = [
    ...walkTsxFiles(COMPONENTS_DIR),
    ...walkTsxFiles(PAGES_DIR),
  ];
  for (const f of sourceFiles) {
    const issues = auditSourceFile(f);
    if (issues.length) report.source.push({ file: relative(f), issues });
  }

  // Layers 2 + 3: dist
  if (!SKIP_DIST) {
    for (const f of walkHtml(DIST)) {
      const issues = auditHtmlFile(f);
      if (issues.length) report.dist.push({ file: relative(f), issues });
    }
  }

  const total =
    report.source.reduce((n, r) => n + r.issues.length, 0) +
    report.dist.reduce((n, r) => n + r.issues.length, 0);

  if (total === 0) {
    console.log(
      `✓ Hierarquia de headings OK (fonte: ${sourceFiles.length} arquivos, dist: ${SKIP_DIST ? "skipped" : "verificado"}).`,
    );
    return;
  }

  console.error(`\n✗ ${total} problema(s) de hierarquia de headings:\n`);
  for (const group of ["source", "dist"]) {
    for (const { file, issues } of report[group]) {
      console.error(`  ${file}`);
      for (const i of issues) console.error(`    · ${i}`);
    }
  }
  if (!WARN_ONLY) process.exit(1);
}

// Só executa como CLI quando invocado diretamente (não durante `import` em testes).
const invokedDirectly =
  process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invokedDirectly) run();

// Expor helpers para testes unitários (Vitest).
export {
  auditSourceFile,
  extractHeadingsOrdered,
  auditHierarchy,
  auditJumplinksInHtml,
  ALLOWED_HIERARCHY_TAGS,
};