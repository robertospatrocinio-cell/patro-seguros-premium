/**
 * Teste de integração: mini-prerender + validador de rich results.
 *
 * Reproduz o pipeline do build (React → HTML → validador) num diretório
 * dist temporário, com um conjunto mínimo de rotas cobrindo os três
 * schemas globais do site:
 *
 *   /              → Organization (bloco estático do index.html)
 *   /seguro-auto   → BreadcrumbList (mesma forma emitida por BreadcrumbSchema.tsx)
 *   /faq           → FAQPage (mesma forma emitida por FAQSchema.tsx)
 *
 * Depois roda o script real `scripts/validate-google-rich-results.mjs`
 * apontado para o dist temporário e afirma:
 *   - exit 0 (mesmo com --strict-warn)
 *   - summary.ineligible === 0
 *   - summary.eligibleWarn === 0
 *   - cada schema esperado foi de fato validado como `eligible`
 *
 * Isolamos em /tmp/prerender-validate-integration-* para não interferir
 * no dist real do projeto — o teste roda mesmo sem `npm run build`.
 */

import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const VALIDATOR = path.join(ROOT, "scripts", "validate-google-rich-results.mjs");
const BASE = "https://www.patroseguros.com.br";

// ---------- geradores de JSON-LD (paridade com os componentes React) ---------

/** Mesmo shape que `src/components/BreadcrumbSchema.tsx` emite. */
function breadcrumbListJsonLd(pathname, trail) {
  const currentAbs = `${BASE}${pathname === "/" ? "" : pathname.replace(/\/+$/, "")}`;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${currentAbs}#breadcrumb`,
    itemListElement: trail.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url.startsWith("http") ? it.url : `${BASE}${it.url === "/" ? "" : it.url}`,
    })),
  };
}

/** Mesmo shape que `src/components/FAQSchema.tsx` emite (só ≥ 2 Q válidas). */
function faqPageJsonLd(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** Cópia do bloco Organization estático em `index.html` (linhas 217-286). */
const ORGANIZATION_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${BASE}/#organization`,
  name: "Patro Corretora de Seguros",
  url: BASE,
  logo: {
    "@type": "ImageObject",
    url: `${BASE}/images/logo-full.webp`,
    width: 300,
    height: 60,
  },
  sameAs: [
    "https://www.instagram.com/patroseguros",
    "https://www.linkedin.com/company/patroseguros",
  ],
};

function htmlWith(...blocks) {
  const scripts = blocks
    .map((b) => `<script type="application/ld+json">${JSON.stringify(b)}</script>`)
    .join("\n");
  return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">${scripts}</head><body><div id="root"></div></body></html>`;
}

// ---------- fixture dist temporário ------------------------------------------

let TMP_DIST;

beforeAll(() => {
  TMP_DIST = fs.mkdtempSync(path.join(os.tmpdir(), "prerender-validate-integration-"));

  const write = (relDir, html) => {
    const dir = path.join(TMP_DIST, relDir);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "index.html"), html, "utf-8");
  };

  // ROOT `/` — Organization + BreadcrumbList mínimo
  write("", htmlWith(
    ORGANIZATION_JSONLD,
    breadcrumbListJsonLd("/", [
      { name: "Início", url: "/" },
      { name: "Home", url: "/" },
    ]),
  ));

  // `/seguro-auto` — BreadcrumbList 3 níveis + Organization propagado
  write("seguro-auto", htmlWith(
    ORGANIZATION_JSONLD,
    breadcrumbListJsonLd("/seguro-auto", [
      { name: "Início", url: "/" },
      { name: "Seguros", url: "/seguros" },
      { name: "Seguro Auto", url: "/seguro-auto" },
    ]),
  ));

  // `/faq` — FAQPage com ≥ 2 perguntas + BreadcrumbList + Organization
  write("faq", htmlWith(
    ORGANIZATION_JSONLD,
    breadcrumbListJsonLd("/faq", [
      { name: "Início", url: "/" },
      { name: "FAQ", url: "/faq" },
    ]),
    faqPageJsonLd([
      { q: "Como faço uma cotação?", a: "Preencha o formulário no site ou fale via WhatsApp." },
      { q: "Vocês atendem fora de Guarulhos?", a: "Sim, atendemos em todo o Brasil via canais digitais." },
      { q: "Qual o horário de atendimento?", a: "Segunda a sexta, das 9h às 18h, e sábado das 9h às 13h." },
    ]),
  ));
});

afterAll(() => {
  if (TMP_DIST && fs.existsSync(TMP_DIST)) fs.rmSync(TMP_DIST, { recursive: true, force: true });
});

// ---------- rodada do validador real -----------------------------------------

function runValidator(extraArgs = []) {
  return spawnSync(
    "node",
    [VALIDATOR, `--dist=${TMP_DIST}`, ...extraArgs],
    { encoding: "utf-8", cwd: ROOT },
  );
}

// ---------- assertions -------------------------------------------------------

describe("prerender + validador: bundle mínimo com breadcrumb/FAQ/organization", () => {
  it("valida sem ineligible nem warn (--strict-warn passa)", () => {
    const res = runValidator(["--strict-warn"]);
    expect(
      res.status,
      `validador falhou:\nSTDOUT:\n${res.stdout}\nSTDERR:\n${res.stderr}`,
    ).toBe(0);
  });

  it("relatório: summary.ineligible === 0 e eligibleWarn === 0", () => {
    runValidator(); // regenera o report neste dist
    const reportPath = path.join(TMP_DIST, "google-rich-results-report.json");
    expect(fs.existsSync(reportPath)).toBe(true);
    const report = JSON.parse(fs.readFileSync(reportPath, "utf-8"));
    expect(report.summary.ineligible).toBe(0);
    expect(report.summary.eligibleWarn).toBe(0);
    expect(report.summary.eligible).toBeGreaterThan(0);
  });

  it("byType: BreadcrumbList / FAQPage / Organization todos 100% eligible", () => {
    const report = JSON.parse(
      fs.readFileSync(path.join(TMP_DIST, "google-rich-results-report.json"), "utf-8"),
    );
    for (const t of ["BreadcrumbList", "FAQPage", "Organization"]) {
      const stats = report.byType[t];
      expect(stats, `byType[${t}] ausente no relatório`).toBeDefined();
      expect(stats.total, `${t} sem ocorrências`).toBeGreaterThan(0);
      expect(stats.ineligible, `${t}: ${stats.ineligible} ineligible`).toBe(0);
      expect(stats.eligible_warn ?? stats.eligibleWarn ?? 0,
        `${t}: warn > 0`).toBe(0);
      expect(stats.eligible, `${t}: 0 eligible`).toBeGreaterThan(0);
    }
  });

  it("cobertura de rotas: as 3 rotas do fixture aparecem no relatório", () => {
    const report = JSON.parse(
      fs.readFileSync(path.join(TMP_DIST, "google-rich-results-report.json"), "utf-8"),
    );
    const routes = Object.keys(report.routes);
    // routeFromFile mapeia dist/x/index.html → /x — casamos por sufixo
    for (const expected of ["/", "/seguro-auto", "/faq"]) {
      const found = routes.some((r) => r === expected);
      expect(found, `rota ${expected} ausente. routes=${JSON.stringify(routes)}`).toBe(true);
    }
  });

  it("regressão: se injetarmos breadcrumb com URL relativa, validador falha", () => {
    // Prova negativa: o pipeline realmente detecta um bug de prerender.
    const bogusDir = fs.mkdtempSync(path.join(os.tmpdir(), "prv-neg-"));
    try {
      fs.writeFileSync(
        path.join(bogusDir, "index.html"),
        htmlWith(
          ORGANIZATION_JSONLD,
          breadcrumbListJsonLd("/x", [
            { name: "Início", url: "/" },
            { name: "X", url: "/x" },
          ]),
        ),
        "utf-8",
      );
      // Sobrescreve o penúltimo item com URL relativa (bug simulado)
      const bad = JSON.parse(fs.readFileSync(path.join(bogusDir, "index.html"), "utf-8")
        .match(/<script type="application\/ld\+json">(.+?)<\/script>/g)[1]
        .replace(/^<script[^>]*>|<\/script>$/g, ""));
      bad.itemListElement[0].item = "/apenas-relativa";
      fs.writeFileSync(
        path.join(bogusDir, "index.html"),
        htmlWith(ORGANIZATION_JSONLD, bad),
        "utf-8",
      );

      const res = spawnSync(
        "node",
        [VALIDATOR, `--dist=${bogusDir}`],
        { encoding: "utf-8", cwd: ROOT },
      );
      expect(res.status, "validador aprovou breadcrumb com URL relativa").not.toBe(0);
    } finally {
      fs.rmSync(bogusDir, { recursive: true, force: true });
    }
  });
});