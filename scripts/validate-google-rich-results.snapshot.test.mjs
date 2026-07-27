/**
 * Snapshot test para dist/google-rich-results-report.json
 *
 * Congela o breakdown por @type e as contagens de summary
 * (eligible / eligible-warn / ineligible / unsupported). Qualquer drift
 * — por regressão de schema ou por conteúdo novo indexado — quebra o
 * snapshot e força revisão explícita (via `bunx vitest -u`).
 *
 * O relatório vive em dist/ e só existe depois de:
 *   npm run build && node scripts/validate-google-rich-results.mjs
 *
 * Se dist/ não estiver presente (dev local sem build), o teste faz
 * soft-skip — não queremos travar `bunx vitest run` em máquinas limpas.
 * No CI o build roda sempre antes, então a checagem é obrigatória lá.
 */
import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPORT = path.resolve(__dirname, "..", "dist", "google-rich-results-report.json");
const HAS_REPORT = fs.existsSync(REPORT);

// Force presence quando rodando em CI (evita silenciar drift acidentalmente)
const REQUIRE_REPORT = process.env.CI === "true" || process.env.RR_SNAPSHOT_REQUIRE === "1";

describe("dist/google-rich-results-report.json — snapshot", () => {
  if (!HAS_REPORT && !REQUIRE_REPORT) {
    it.skip("relatório não encontrado (rode `npm run build` antes)", () => {});
    return;
  }

  it("relatório existe (obrigatório em CI)", () => {
    expect(HAS_REPORT).toBe(true);
  });

  const report = JSON.parse(fs.readFileSync(REPORT, "utf-8"));

  // ------- invariantes duros: baseline atual do site (0 warn / 0 inel) -----
  it("summary não pode ter ineligible", () => {
    expect(report.summary.ineligible).toBe(0);
  });

  it("summary não pode ter eligible-warn", () => {
    expect(report.summary.eligibleWarn).toBe(0);
  });

  // ------- snapshots: contagem por @type -----------------------------------
  // Ordena chaves para tornar o snapshot determinístico independente da
  // ordem em que os arquivos foram lidos do disco.
  const byTypeSorted = Object.fromEntries(
    Object.entries(report.byType).sort(([a], [b]) => a.localeCompare(b)),
  );
  it("breakdown por @type — snapshot", () => {
    expect(byTypeSorted).toMatchSnapshot();
  });

  // Snapshot dos totais (files/blocks/nodes/verdicts). Sem timestamps.
  it("summary — snapshot", () => {
    expect(report.summary).toMatchSnapshot();
  });

  // Snapshot da lista de @types cobertos (só as chaves).
  // Serve como radar de novos schemas introduzidos sem revisão.
  it("conjunto de @types cobertos — snapshot", () => {
    expect(Object.keys(byTypeSorted)).toMatchSnapshot();
  });
});