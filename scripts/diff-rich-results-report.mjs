#!/usr/bin/env node
/**
 * Diff Markdown-friendly entre dois `google-rich-results-report.json`
 * normalizados. Usado no CI quando o teste de integração falha para
 * publicar em `$GITHUB_STEP_SUMMARY` o EXATO drift em:
 *
 *   1. summary        (blocks/files/nodes/eligible/eligibleWarn/ineligible/unsupported)
 *   2. byType[*]      (chaves adicionadas/removidas + contadores por @type)
 *   3. routes[*]      (rotas adicionadas/removidas + verdict/required/recommended por nó)
 *
 * Uso:
 *   node scripts/diff-rich-results-report.mjs \
 *     --baseline=scripts/__reports__/baseline.json \
 *     --current=scripts/__reports__/current.json
 *
 * Sempre exit 0 — este script APENAS relata; o gate de PR é o próprio
 * teste de integração + validador estrito.
 */

import fs from "node:fs";
import path from "node:path";

function parseArg(name, fallback) {
  const arg = process.argv.find((a) => a.startsWith(`--${name}=`));
  return arg ? arg.slice(name.length + 3) : fallback;
}

const baselinePath = parseArg("baseline", "scripts/__reports__/baseline.json");
const currentPath = parseArg("current", "scripts/__reports__/current.json");

function readJson(p) {
  if (!fs.existsSync(p)) return null;
  try {
    return JSON.parse(fs.readFileSync(p, "utf-8"));
  } catch (err) {
    console.error(`[diff] JSON inválido em ${p}: ${err.message}`);
    return null;
  }
}

const baseline = readJson(baselinePath);
const current = readJson(currentPath);

const out = [];
const H = (s) => out.push(s);

H("## 🔎 Rich Results — diff do relatório (baseline → current)");
H("");
H(`- **baseline**: \`${path.relative(process.cwd(), baselinePath)}\``);
H(`- **current**:  \`${path.relative(process.cwd(), currentPath)}\``);
H("");

if (!baseline || !current) {
  H(`⚠️ Não foi possível carregar ${!baseline ? "baseline" : ""}${!baseline && !current ? " e " : ""}${!current ? "current" : ""}.`);
  process.stdout.write(out.join("\n") + "\n");
  process.exit(0);
}

// ---------- 1. summary ------------------------------------------------------

H("### summary");
const summaryKeys = Array.from(
  new Set([...Object.keys(baseline.summary ?? {}), ...Object.keys(current.summary ?? {})]),
).sort();
const summaryRows = summaryKeys
  .map((k) => {
    const b = baseline.summary?.[k] ?? 0;
    const c = current.summary?.[k] ?? 0;
    const delta = typeof b === "number" && typeof c === "number" ? c - b : "-";
    const marker = b !== c ? " ⚠️" : "";
    return `| \`${k}\` | ${b} | ${c} | ${delta}${marker} |`;
  });
H("| campo | baseline | current | Δ |");
H("|---|---:|---:|---:|");
summaryRows.forEach((r) => H(r));
H("");

// ---------- 2. byType -------------------------------------------------------

H("### byType");
const byTypeKeys = Array.from(
  new Set([...Object.keys(baseline.byType ?? {}), ...Object.keys(current.byType ?? {})]),
).sort();
const addedTypes = byTypeKeys.filter((k) => !(k in (baseline.byType ?? {})));
const removedTypes = byTypeKeys.filter((k) => !(k in (current.byType ?? {})));
if (addedTypes.length) H(`- ➕ **@type adicionados**: ${addedTypes.map((t) => `\`${t}\``).join(", ")}`);
if (removedTypes.length) H(`- ➖ **@type removidos**: ${removedTypes.map((t) => `\`${t}\``).join(", ")}`);
if (!addedTypes.length && !removedTypes.length) H("- conjunto de @type inalterado.");
H("");
H("| @type | métrica | baseline | current | Δ |");
H("|---|---|---:|---:|---:|");
for (const type of byTypeKeys) {
  const b = baseline.byType?.[type] ?? {};
  const c = current.byType?.[type] ?? {};
  const metricKeys = Array.from(new Set([...Object.keys(b), ...Object.keys(c)])).sort();
  for (const m of metricKeys) {
    const bv = b[m] ?? 0;
    const cv = c[m] ?? 0;
    if (bv === cv) continue;
    H(`| \`${type}\` | \`${m}\` | ${bv} | ${cv} | ${cv - bv} ⚠️ |`);
  }
}
H("");

// ---------- 3. routes -------------------------------------------------------

H("### routes");
const routeKeys = Array.from(
  new Set([...Object.keys(baseline.routes ?? {}), ...Object.keys(current.routes ?? {})]),
).sort();
const addedRoutes = routeKeys.filter((k) => !(k in (baseline.routes ?? {})));
const removedRoutes = routeKeys.filter((k) => !(k in (current.routes ?? {})));
if (addedRoutes.length) H(`- ➕ **rotas adicionadas**: ${addedRoutes.map((r) => `\`${r}\``).join(", ")}`);
if (removedRoutes.length) H(`- ➖ **rotas removidas**: ${removedRoutes.map((r) => `\`${r}\``).join(", ")}`);
H("");

function nodeKey(n, i) {
  // Chave estável para diff pareado: type + posição
  return `${i}:${n.type}`;
}

let routeDrifts = 0;
for (const route of routeKeys) {
  const bNodes = baseline.routes?.[route]?.nodes ?? [];
  const cNodes = current.routes?.[route]?.nodes ?? [];

  const bMap = new Map(bNodes.map((n, i) => [nodeKey(n, i), n]));
  const cMap = new Map(cNodes.map((n, i) => [nodeKey(n, i), n]));
  const allKeys = Array.from(new Set([...bMap.keys(), ...cMap.keys()])).sort();

  const rows = [];
  for (const k of allKeys) {
    const b = bMap.get(k);
    const c = cMap.get(k);
    if (!b) {
      rows.push(`| ➕ \`${k}\` | — | \`${c.verdict}\` | req: ${c.required.length}, rec: ${c.recommended.length} |`);
      continue;
    }
    if (!c) {
      rows.push(`| ➖ \`${k}\` | \`${b.verdict}\` | — | — |`);
      continue;
    }
    const verdictChanged = b.verdict !== c.verdict;
    const reqDiff = JSON.stringify(b.required) !== JSON.stringify(c.required);
    const recDiff = JSON.stringify(b.recommended) !== JSON.stringify(c.recommended);
    if (!verdictChanged && !reqDiff && !recDiff) continue;
    const notes = [];
    if (verdictChanged) notes.push(`verdict: \`${b.verdict}\` → \`${c.verdict}\``);
    if (reqDiff) notes.push(`req: [${b.required.join(", ")}] → [${c.required.join(", ")}]`);
    if (recDiff) notes.push(`rec: [${b.recommended.join(", ")}] → [${c.recommended.join(", ")}]`);
    rows.push(`| ⚠️ \`${k}\` | \`${b.verdict}\` | \`${c.verdict}\` | ${notes.join("<br>")} |`);
  }

  if (rows.length === 0 && !addedRoutes.includes(route) && !removedRoutes.includes(route)) continue;

  routeDrifts += rows.length + (addedRoutes.includes(route) ? 1 : 0) + (removedRoutes.includes(route) ? 1 : 0);
  H(`#### \`${route}\``);
  H("| nó (idx:type) | baseline verdict | current verdict | detalhes |");
  H("|---|---|---|---|");
  rows.forEach((r) => H(r));
  H("");
}

if (routeDrifts === 0) H("- Nenhum drift por rota — todos os nós inalterados.");

H("");
H("_Regenere a baseline com `bun run integration:report && cp scripts/__reports__/current.json scripts/__reports__/baseline.json` após revisar._");

process.stdout.write(out.join("\n") + "\n");
process.exit(0);