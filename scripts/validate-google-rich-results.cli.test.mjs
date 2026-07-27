/**
 * CLI tests para scripts/validate-google-rich-results.mjs
 *
 * Testa contratos de exit code + stdout combinando fixtures HTML mínimas
 * (montadas em um DIST temporário via --dist=) com as flags reais:
 *   • sem flags                → falha (exit 1) se houver ineligible
 *   • --allow-warn             → silencia mensagem de warn, ainda passa
 *   • --strict-warn            → falha (exit 1) quando há eligible-warn
 *   • --route=/foo             → escopo em 1 rota (ignora as demais)
 *
 * Roda o script real com `node`, o que garante que a superfície de argv
 * é validada de ponta a ponta (não só as regras internas dos checkers,
 * que já são cobertas por scripts/lib/rich-results-checkers.test.mjs).
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SCRIPT = path.resolve(__dirname, "validate-google-rich-results.mjs");

// -------- fixture builders ---------------------------------------------------

function htmlWithLd(...blocks) {
  const scripts = blocks
    .map((b) => `<script type="application/ld+json">${JSON.stringify(b)}</script>`)
    .join("\n");
  return `<!doctype html><html><head><title>t</title>${scripts}</head><body></body></html>`;
}

// Bloco eligible: BreadcrumbList com 2 itens (não gera warn nem inelig).
const CLEAN_BREADCRUMB = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://x.test/" },
    { "@type": "ListItem", position: 2, name: "Sub",  item: "https://x.test/sub" },
  ],
};

// Bloco INELIGIBLE: FAQPage sem mainEntity → viola required do Google.
const BROKEN_FAQ = { "@context": "https://schema.org", "@type": "FAQPage" };

// Bloco eligible-warn: Organization com required OK (name/url/logo) mas
// sem `sameAs` — os checkers marcam essa lacuna como recommended.
const WARN_ORG = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Patro",
  url: "https://x.test/",
  logo: "https://x.test/logo.png",
};

// -------- fixture dir --------------------------------------------------------

let TMP;
beforeAll(() => {
  TMP = fs.mkdtempSync(path.join(os.tmpdir(), "rr-cli-"));
  fs.mkdirSync(path.join(TMP, "ok"), { recursive: true });
  fs.mkdirSync(path.join(TMP, "warn"), { recursive: true });
  fs.mkdirSync(path.join(TMP, "broken"), { recursive: true });
  fs.writeFileSync(path.join(TMP, "index.html"), htmlWithLd(CLEAN_BREADCRUMB));
  fs.writeFileSync(path.join(TMP, "ok/index.html"), htmlWithLd(CLEAN_BREADCRUMB));
  fs.writeFileSync(path.join(TMP, "warn/index.html"), htmlWithLd(WARN_ORG));
  fs.writeFileSync(path.join(TMP, "broken/index.html"), htmlWithLd(BROKEN_FAQ));
});
afterAll(() => fs.rmSync(TMP, { recursive: true, force: true }));

function run(...extra) {
  return spawnSync("node", [SCRIPT, `--dist=${TMP}`, ...extra], { encoding: "utf-8" });
}

// -------- tests --------------------------------------------------------------

describe("validate-google-rich-results CLI", () => {
  it("sem flags: falha (exit 1) quando há INELIGIBLE", () => {
    const r = run();
    expect(r.status).toBe(1);
    expect(r.stderr + r.stdout).toMatch(/INELIGIBLE/);
  });

  it("--allow-warn: continua falhando por ineligible (allow-warn não silencia inel)", () => {
    const r = run("--allow-warn");
    expect(r.status).toBe(1);
    expect(r.stderr + r.stdout).toMatch(/INELIGIBLE/);
    // não imprime a linha "use --allow-warn" quando a flag já está ativa
    expect(r.stdout).not.toMatch(/use --allow-warn para silenciar/);
  });

  it("--strict-warn: falha (exit 1) quando há apenas eligible-warn e nenhum ineligible", () => {
    // isola em /warn → só o Article com warn, sem broken
    const r = run("--route=/warn", "--strict-warn");
    expect(r.status).toBe(1);
    expect(r.stderr + r.stdout).toMatch(/strict-warn/);
  });

  it("--allow-warn (sem ineligible): passa (exit 0) e não imprime a dica de silenciar", () => {
    const r = run("--route=/warn", "--allow-warn");
    expect(r.status).toBe(0);
    expect(r.stdout).not.toMatch(/use --allow-warn para silenciar/);
    expect(r.stdout).toMatch(/Nenhum bloco INELIGIBLE/);
  });

  it("sem flags e sem ineligible: passa (exit 0) mas imprime dica de warn", () => {
    const r = run("--route=/warn");
    expect(r.status).toBe(0);
    expect(r.stdout).toMatch(/use --allow-warn para silenciar/);
  });

  it("--route=/ok: escopa em 1 rota, exit 0", () => {
    const r = run("--route=/ok");
    expect(r.status).toBe(0);
    // arquivos: 1 (só /ok/index.html entra no report)
    expect(r.stdout).toMatch(/arquivos:\s*1\b/);
  });

  it("--route= com rota inexistente: nenhum arquivo, sem falha", () => {
    const r = run("--route=/does-not-exist");
    expect(r.status).toBe(0);
    expect(r.stdout).toMatch(/arquivos:\s*0\b/);
  });
});