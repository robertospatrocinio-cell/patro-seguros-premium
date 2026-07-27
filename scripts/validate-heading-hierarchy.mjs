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
/* Formatação de issue (string legada usada por testes)                       */
/* -------------------------------------------------------------------------- */

function formatIssue(rec) {
  switch (rec.kind) {
    case "source-wrong-tag":
      return `id="${rec.id}" está em <${rec.tag}>, deve estar em <h1|h2|h3> (ancora de seção)`;
    case "hierarchy-skip":
      return `pula de <h${rec.prevLevel}> para <${rec.tag}> (id=${rec.id ?? "—"}) — hierarquia inválida`;
    case "jumplink-missing":
      return `jumplink #${rec.id} → id inexistente no HTML`;
    case "jumplink-wrong-tag":
      return `jumplink #${rec.id} → id existe mas não está em <h1|h2|h3>`;
    default:
      return rec.message ?? "unknown issue";
  }
}

function suggestionFor(rec) {
  switch (rec.kind) {
    case "source-wrong-tag":
      return `Troque <${rec.tag} id="${rec.id}"> por <h2 id="${rec.id}"> (ou h1/h3 conforme o outline). Isso restaura o vínculo com aria-labelledby e permite que leitores de tela e crawlers reconheçam a seção.`;
    case "hierarchy-skip": {
      const suggested = `h${rec.prevLevel + 1}`;
      return `Substitua <${rec.tag}${rec.id ? ` id="${rec.id}"` : ""}> por <${suggested}${rec.id ? ` id="${rec.id}"` : ""}> ou insira um <${suggested}> intermediário. Hierarquia esperada após <h${rec.prevLevel}> é no máximo <${suggested}>.`;
    }
    case "jumplink-missing":
      return `Adicione <h2 id="${rec.id}"> na seção alvo ou remova/renomeie o href="#${rec.id}" no jumpLinks para bater com um id existente.`;
    case "jumplink-wrong-tag":
      return `Mova id="${rec.id}" para uma tag <h1|h2|h3> — atualmente está em <${rec.tag ?? "elemento não-heading"}>, que não é uma âncora de seção válida.`;
    default:
      return "Revisar manualmente.";
  }
}

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

function auditSourceFileDetailed(file) {
  const src = fs.readFileSync(file, "utf-8");
  const issues = [];
  const re = /<([A-Za-z][A-Za-z0-9]*)\b[^>]*\bid=["']([a-z0-9-]+-heading)["'][^>]*>/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    const tag = m[1].toLowerCase();
    const id = m[2];
    if (!HEADING_TAGS.has(tag)) {
      // Localiza linha para o relatório.
      const line = src.slice(0, m.index).split("\n").length;
      issues.push({
        layer: "source",
        kind: "source-wrong-tag",
        id,
        tag,
        element: m[0],
        line,
      });
    }
  }
  return issues;
}

function auditSourceFile(file) {
  return auditSourceFileDetailed(file).map(formatIssue);
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

function auditHierarchyDetailed(headings) {
  const issues = [];
  let prev = 0;
  for (const h of headings) {
    if (prev === 0) {
      prev = h.level;
      continue;
    }
    if (h.level > prev + 1) {
      issues.push({
        layer: "hierarchy",
        kind: "hierarchy-skip",
        id: h.id ?? null,
        tag: h.tag,
        level: h.level,
        prevLevel: prev,
      });
    }
    prev = h.level;
  }
  return issues;
}

function auditHierarchy(headings) {
  return auditHierarchyDetailed(headings).map(formatIssue);
}

function auditJumplinksInHtmlDetailed(html, headings) {
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
  const anyIdTag = new Map(
    headings.filter((h) => h.id).map((h) => [h.id, h.tag]),
  );
  const issues = [];
  for (const id of hrefs) {
    if (!headingIds.has(id)) {
      if (!anyIdTag.has(id)) {
        issues.push({
          layer: "jumplinks",
          kind: "jumplink-missing",
          id,
          tag: null,
        });
      } else {
        issues.push({
          layer: "jumplinks",
          kind: "jumplink-wrong-tag",
          id,
          tag: anyIdTag.get(id),
        });
      }
    }
  }
  return issues;
}

function auditJumplinksInHtml(html, headings) {
  return auditJumplinksInHtmlDetailed(html, headings).map(formatIssue);
}

function auditHtmlFileDetailed(file) {
  const html = fs.readFileSync(file, "utf-8");
  const headings = extractHeadingsOrdered(html);
  if (headings.length === 0) return [];
  return [
    ...auditHierarchyDetailed(headings),
    ...auditJumplinksInHtmlDetailed(html, headings),
  ];
}

function auditHtmlFile(file) {
  return auditHtmlFileDetailed(file).map(formatIssue);
}

/* -------------------------------------------------------------------------- */
/* Relatório (JSON + HTML)                                                    */
/* -------------------------------------------------------------------------- */

function escapeHtml(s) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function enrichIssue(rec) {
  return {
    ...rec,
    message: formatIssue(rec),
    suggestion: suggestionFor(rec),
  };
}

function buildReport({ source, dist, sourceFileCount, distSkipped }) {
  const enrich = (group) =>
    group.map((r) => ({ ...r, issues: r.issues.map(enrichIssue) }));
  const enrichedSource = enrich(source);
  const enrichedDist = enrich(dist);
  const total =
    enrichedSource.reduce((n, r) => n + r.issues.length, 0) +
    enrichedDist.reduce((n, r) => n + r.issues.length, 0);
  const byKind = {};
  for (const g of [enrichedSource, enrichedDist]) {
    for (const r of g)
      for (const i of r.issues) byKind[i.kind] = (byKind[i.kind] ?? 0) + 1;
  }
  return {
    generatedAt: new Date().toISOString(),
    summary: {
      totalIssues: total,
      sourceFilesScanned: sourceFileCount,
      distScanned: !distSkipped,
      byKind,
    },
    source: enrichedSource,
    dist: enrichedDist,
  };
}

function renderReportHtml(report) {
  const rows = (group, label) => {
    if (group.length === 0)
      return `<h2>${label}</h2><p class="ok">Sem problemas.</p>`;
    const items = group
      .map(
        ({ file, issues }) => `
        <details open>
          <summary><code>${escapeHtml(file)}</code> — ${issues.length} problema(s)</summary>
          <table>
            <thead><tr><th>#</th><th>Tipo</th><th>Id</th><th>Elemento</th><th>Mensagem</th><th>Correção sugerida</th></tr></thead>
            <tbody>
            ${issues
              .map(
                (i, idx) => `
              <tr>
                <td>${idx + 1}</td>
                <td><span class="kind kind-${i.kind}">${i.kind}</span></td>
                <td><code>${escapeHtml(i.id ?? "—")}</code></td>
                <td><code>${escapeHtml(i.element ?? (i.tag ? `<${i.tag}>` : "—"))}</code>${i.line ? ` <small>L${i.line}</small>` : ""}</td>
                <td>${escapeHtml(i.message)}</td>
                <td>${escapeHtml(i.suggestion)}</td>
              </tr>`,
              )
              .join("")}
            </tbody>
          </table>
        </details>`,
      )
      .join("");
    return `<h2>${label}</h2>${items}`;
  };
  const byKindRows = Object.entries(report.summary.byKind)
    .map(([k, n]) => `<li><code>${escapeHtml(k)}</code>: ${n}</li>`)
    .join("");
  return `<!doctype html>
<html lang="pt-br"><head><meta charset="utf-8"/>
<title>Relatório — Hierarquia de Headings</title>
<style>
  body{font-family:system-ui,sans-serif;max-width:1100px;margin:2rem auto;padding:0 1rem;color:#1a1a1a}
  h1{margin-bottom:.2rem}
  .meta{color:#666;font-size:.9rem;margin-bottom:1.5rem}
  .ok{color:#0a7d2b}
  table{border-collapse:collapse;width:100%;margin:.5rem 0 1.5rem;font-size:.9rem}
  th,td{border:1px solid #e2e2e2;padding:.4rem .6rem;text-align:left;vertical-align:top}
  th{background:#f5f5f5}
  code{background:#f0f0f0;padding:.1rem .3rem;border-radius:3px;font-size:.85rem}
  .kind{font-size:.75rem;padding:.15rem .4rem;border-radius:3px;color:#fff;background:#666}
  .kind-source-wrong-tag{background:#b45309}
  .kind-hierarchy-skip{background:#b91c1c}
  .kind-jumplink-missing{background:#7c2d12}
  .kind-jumplink-wrong-tag{background:#9333ea}
  details{margin:.5rem 0}
  summary{cursor:pointer;padding:.3rem 0}
  small{color:#888}
</style></head><body>
<h1>Relatório — Hierarquia de Headings</h1>
<p class="meta">Gerado em ${escapeHtml(report.generatedAt)} · ${report.summary.totalIssues} problema(s) · ${report.summary.sourceFilesScanned} arquivo(s) de fonte · dist ${report.summary.distScanned ? "verificado" : "pulado"}</p>
<h2>Resumo por tipo</h2>
<ul>${byKindRows || "<li>Nenhum problema.</li>"}</ul>
${rows(report.source, "Fonte (src/pages, src/components)")}
${rows(report.dist, "HTML pré-renderizado (dist/)")}
</body></html>`;
}

function writeReport(report) {
  const outDir = fs.existsSync(DIST) ? DIST : path.join(ROOT, "reports");
  fs.mkdirSync(outDir, { recursive: true });
  const jsonPath = path.join(outDir, "heading-hierarchy-report.json");
  const htmlPath = path.join(outDir, "heading-hierarchy-report.html");
  fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2));
  fs.writeFileSync(htmlPath, renderReportHtml(report));
  return { jsonPath, htmlPath };
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
    const issues = auditSourceFileDetailed(f);
    if (issues.length) report.source.push({ file: relative(f), issues });
  }

  // Layers 2 + 3: dist
  if (!SKIP_DIST) {
    for (const f of walkHtml(DIST)) {
      const issues = auditHtmlFileDetailed(f);
      if (issues.length) report.dist.push({ file: relative(f), issues });
    }
  }

  const total =
    report.source.reduce((n, r) => n + r.issues.length, 0) +
    report.dist.reduce((n, r) => n + r.issues.length, 0);

  const structured = buildReport({
    source: report.source,
    dist: report.dist,
    sourceFileCount: sourceFiles.length,
    distSkipped: SKIP_DIST,
  });
  const { jsonPath, htmlPath } = writeReport(structured);

  if (total === 0) {
    console.log(
      `✓ Hierarquia de headings OK (fonte: ${sourceFiles.length} arquivos, dist: ${SKIP_DIST ? "skipped" : "verificado"}).`,
    );
    console.log(`  Relatório: ${relative(jsonPath)} · ${relative(htmlPath)}`);
    return;
  }

  console.error(`\n✗ ${total} problema(s) de hierarquia de headings:\n`);
  for (const group of ["source", "dist"]) {
    for (const { file, issues } of report[group]) {
      console.error(`  ${file}`);
      for (const i of issues) {
        console.error(`    · ${formatIssue(i)}`);
        console.error(`      → ${suggestionFor(i)}`);
      }
    }
  }
  console.error(
    `\nRelatório detalhado: ${relative(jsonPath)} · ${relative(htmlPath)}`,
  );
  if (!WARN_ONLY) process.exit(1);
}

// Só executa como CLI quando invocado diretamente (não durante `import` em testes).
const invokedDirectly =
  process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invokedDirectly) run();

// Expor helpers para testes unitários (Vitest).
export {
  auditSourceFile,
  auditSourceFileDetailed,
  extractHeadingsOrdered,
  auditHierarchy,
  auditHierarchyDetailed,
  auditJumplinksInHtml,
  auditJumplinksInHtmlDetailed,
  formatIssue,
  suggestionFor,
  buildReport,
  renderReportHtml,
  ALLOWED_HIERARCHY_TAGS,
};