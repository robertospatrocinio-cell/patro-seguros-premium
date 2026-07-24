#!/usr/bin/env node
/**
 * perf-audit.mjs — Snapshot Lighthouse (mobile + desktop) para uma URL,
 * salva JSON + HTML em ./perf-reports/<timestamp>/ e emite um diff resumido
 * contra o snapshot anterior (antes/depois de mudanças).
 *
 * Uso:
 *   node scripts/perf-audit.mjs                              # audita produção
 *   node scripts/perf-audit.mjs --url=https://www.patroseguros.com.br/seguro-auto
 *   node scripts/perf-audit.mjs --label=pre-refactor
 *
 * Requer lighthouse instalado (dev dep) e Chromium/Chrome no PATH.
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, "").split("=");
    return [k, v ?? true];
  }),
);

const URL = args.url || "https://www.patroseguros.com.br/";
const LABEL = args.label || "snapshot";
const STAMP = new Date().toISOString().replace(/[:.]/g, "-");
const OUT = path.resolve("perf-reports", `${STAMP}-${LABEL}`);
fs.mkdirSync(OUT, { recursive: true });

const LH = "npx";
const BASE_FLAGS = [
  "--yes", "lighthouse", URL,
  "--quiet",
  `--chrome-flags=--headless=new --no-sandbox --disable-dev-shm-usage`,
  "--only-categories=performance",
];

function run(profile, extraFlags, jsonPath, htmlPath) {
  console.log(`▶ Lighthouse ${profile} …`);
  execFileSync(LH, [...BASE_FLAGS, ...extraFlags, "--output=json", "--output=html",
    `--output-path=${jsonPath.replace(/\.json$/, "")}`], { stdio: "inherit" });
  // lighthouse escreve .report.json / .report.html quando output=json,html
  const base = jsonPath.replace(/\.json$/, "");
  if (fs.existsSync(`${base}.report.json`)) fs.renameSync(`${base}.report.json`, jsonPath);
  if (fs.existsSync(`${base}.report.html`)) fs.renameSync(`${base}.report.html`, htmlPath);
}

run("desktop", ["--preset=desktop"],
    path.join(OUT, "desktop.json"), path.join(OUT, "desktop.html"));
run("mobile", ["--form-factor=mobile", "--throttling-method=simulate"],
    path.join(OUT, "mobile.json"), path.join(OUT, "mobile.html"));

function summarize(file) {
  const d = JSON.parse(fs.readFileSync(file, "utf-8"));
  const a = d.audits;
  const pick = (k) => ({ value: a[k]?.numericValue, display: a[k]?.displayValue });
  const scripts = (a["network-requests"]?.details?.items || [])
    .filter((r) => (r.resourceType || "").toLowerCase() === "script");
  const jsBytes = scripts.reduce((s, r) => s + (r.transferSize || 0), 0);
  return {
    perf: Math.round((d.categories.performance.score || 0) * 100),
    fcp: pick("first-contentful-paint"),
    lcp: pick("largest-contentful-paint"),
    tbt: pick("total-blocking-time"),
    cls: pick("cumulative-layout-shift"),
    si:  pick("speed-index"),
    tti: pick("interactive"),
    jsTransferKB: +(jsBytes / 1024).toFixed(1),
    scriptCount: scripts.length,
  };
}

const summary = {
  url: URL, label: LABEL, timestamp: STAMP,
  desktop: summarize(path.join(OUT, "desktop.json")),
  mobile:  summarize(path.join(OUT, "mobile.json")),
};
fs.writeFileSync(path.join(OUT, "summary.json"), JSON.stringify(summary, null, 2));

// Diff vs snapshot anterior
const all = fs.readdirSync(path.resolve("perf-reports"))
  .filter((d) => d !== path.basename(OUT)).sort();
const prev = all[all.length - 1];
if (prev) {
  const prevSum = JSON.parse(fs.readFileSync(path.resolve("perf-reports", prev, "summary.json"), "utf-8"));
  console.log(`\n📊 Diff vs ${prev}`);
  for (const p of ["desktop", "mobile"]) {
    const A = prevSum[p], B = summary[p];
    const d = (k) => (B[k].value - A[k].value).toFixed(0);
    console.log(`  [${p}] perf ${A.perf}→${B.perf}  LCP Δ${d("lcp")}ms  TBT Δ${d("tbt")}ms  JS Δ${(B.jsTransferKB - A.jsTransferKB).toFixed(1)}KB`);
  }
}
console.log(`\n✅ Relatórios em ${OUT}`);