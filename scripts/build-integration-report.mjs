#!/usr/bin/env node
/**
 * Gera o `google-rich-results-report.json` sobre o fixture canônico do
 * teste de integração e o copia para `scripts/__reports__/current.json`
 * para ser publicado como artefato do CI.
 *
 * Roda independente do vitest — quando um teste falhar, o CI ainda
 * consegue produzir o relatório atual e um diff contra a baseline
 * comitada em `scripts/__reports__/baseline.json`.
 *
 * O relatório é normalizado (chaves ordenadas, `generatedAt` removido,
 * `required`/`recommended` ordenados) para ser 100% determinístico.
 */

import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { writeCanonicalFixture } from "./lib/integration-fixture.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const VALIDATOR = path.join(ROOT, "scripts", "validate-google-rich-results.mjs");
const REPORTS_DIR = path.join(ROOT, "scripts", "__reports__");
const OUT_FILE = path.join(REPORTS_DIR, "current.json");

function normalizeReport(report) {
  const sortKeys = (obj) =>
    Object.fromEntries(
      Object.entries(obj)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([k, v]) => [k, v]),
    );

  return {
    summary: sortKeys(report.summary ?? {}),
    byType: Object.fromEntries(
      Object.entries(report.byType ?? {})
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([type, stats]) => [type, sortKeys(stats)]),
    ),
    routes: Object.fromEntries(
      Object.entries(report.routes ?? {})
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([route, entry]) => [
          route,
          {
            nodes: (entry.nodes ?? []).map((n) => ({
              type: n.type,
              verdict: n.verdict,
              required: [...(n.required ?? [])].sort(),
              recommended: [...(n.recommended ?? [])].sort(),
            })),
          },
        ]),
    ),
  };
}

function main() {
  const dist = fs.mkdtempSync(path.join(os.tmpdir(), "prv-report-"));
  try {
    writeCanonicalFixture(dist);

    const res = spawnSync("node", [VALIDATOR, `--dist=${dist}`], {
      encoding: "utf-8",
      cwd: ROOT,
    });
    // Não abortamos em erro do validador — queremos o relatório
    // atual mesmo quando ele acusar ineligible/warn, é o CASO que
    // motiva o diff no PR.
    if (res.status !== 0) {
      process.stderr.write(
        `[build-integration-report] validador exit=${res.status} (o relatório abaixo reflete a saída atual).\n`,
      );
    }

    const raw = fs.readFileSync(path.join(dist, "google-rich-results-report.json"), "utf-8");
    const normalized = normalizeReport(JSON.parse(raw));
    fs.mkdirSync(REPORTS_DIR, { recursive: true });
    fs.writeFileSync(OUT_FILE, JSON.stringify(normalized, null, 2) + "\n", "utf-8");
    process.stdout.write(`[build-integration-report] wrote ${path.relative(ROOT, OUT_FILE)}\n`);
  } finally {
    fs.rmSync(dist, { recursive: true, force: true });
  }
}

main();