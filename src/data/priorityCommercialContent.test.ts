import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { servicePagesContent } from "./seoServiceContent";
import { seoLocalPages } from "./seoLocalAutoPages";

const source = (path: string) => readFileSync(path, "utf8");
const auto = source("src/pages/SeguroAuto.tsx");
const localAuto = source("src/pages/SeoSeguroAutoGuarulhos.tsx");
const residential = source("src/pages/SeoSeguroResidencialGuarulhos.tsx");
const initialHtml = source("scripts/seo-content-full.mjs");
const routeContent = (slug: string, nextSlug: string) => initialHtml.slice(
  initialHtml.indexOf(`  "/${slug}": {`),
  initialHtml.indexOf(`  "/${nextSlug}": {`),
);

const staticAuto = routeContent("seguro-auto-guarulhos", "seguro-residencial-guarulhos");
const staticResidential = routeContent("seguro-residencial-guarulhos", "seguro-vida-saude-guarulhos");

const prioritySources = [
  ["auto principal", auto],
  ["auto Guarulhos", localAuto],
  ["residencial Guarulhos", residential],
  ["auto HTML inicial", staticAuto],
  ["residencial HTML inicial", staticResidential],
  ["auto texto complementar", servicePagesContent["seguro-auto-guarulhos"].content],
  ["residencial texto complementar", servicePagesContent["seguro-residencial-guarulhos"].content],
] as const;

describe("Informações comerciais prioritárias", () => {
  it.each(prioritySources)("não publica preços ou descontos sem referência em %s", (_, text) => {
    expect(text).not.toMatch(/R\$/);
    // Percentuais dentro de classes CSS de gradientes não são informações comerciais.
    expect(text).not.toMatch(/(?:econom\w*|desconto|redu[çc][ãa]o|prêmio|FIPE)[^.\n]{0,60}\d+\s*%/i);
    expect(text).not.toMatch(/guincho ilimitado|carro reserva garantido|menor preço do mercado/i);
    expect(text).not.toMatch(/\bwith\b/);
  });

  it.each([localAuto, residential])("não apresenta casos sem comprovação como reais", text => {
    expect(text).toContain("realScenarios={[]}");
    expect(text).not.toMatch(/\d+ horas úteis|\d+ minutos|\d+ dias úteis/);
    expect(text).toContain("aceitação");
    expect(text).toContain("franquias");
  });

  it.each([staticAuto, staticResidential])("preserva conteúdo inicial suficiente sem depoimentos não verificados", text => {
    expect(text.length).toBeGreaterThan(1000);
    expect(text).not.toContain("DEPOIMENTOS([");
    const words = text.replace(/<[^>]+>/g, " ").trim().split(/\s+/).length;
    expect(words).toBeGreaterThanOrEqual(600);
  });

  it("mantém os caminhos de cotação e componentes existentes", () => {
    expect(auto).toContain("<QuickQuoteForm");
    expect(auto).toContain("trackWhatsAppClick");
    expect(localAuto).toContain("<InsurancePageTemplate");
    expect(localAuto).toContain("<StickyQuoteBar");
    expect(localAuto).toContain("/cotacao?tipo=auto");
    expect(residential).toContain("/cotacao?tipo=residencial");
    expect(residential).toContain("<InsurancePageTemplate");
  });

  it.each([
    "seguro-auto-pimentas", "seguro-auto-pimentas-guarulhos",
    "seguro-auto-bonsucesso-guarulhos", "seguro-auto-bonsucesso-guarulhos-v2",
  ])("preserva a revisão existente de %s", slug => {
    const page = seoLocalPages[slug];
    expect(page).toBeDefined();
    expect(JSON.stringify(page)).not.toMatch(/R\$|\d+\s*%/);
    expect(page.realScenarios).toEqual([]);
    expect(page.testimonials).toEqual([]);
    expect(page.detailedDescription).toContain("não uma unidade física");
  });

  it.each([auto, localAuto, residential])("mantém metadados dentro dos limites", text => {
    for (const match of text.matchAll(/(?:title|metaDescription|description)="([^"]+)"/g)) {
      const maxLength = match[0].startsWith("title=") ? 70 : 165;
      expect(match[1].length).toBeLessThanOrEqual(maxLength);
    }
  });
});
