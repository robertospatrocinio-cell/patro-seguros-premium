import { describe, it, expect } from "vitest";
import {
  extractBlocks,
  validateBreadcrumb,
  validateLocalBusiness,
  validateFAQ,
  validateNode,
  validateJsonLdBlock,
  validateHtml,
} from "./jsonld-validator.mjs";

const breadcrumb = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items,
});

describe("extractBlocks", () => {
  it("captures every ld+json script in order", () => {
    const html = `
      <script type="application/ld+json">{"a":1}</script>
      <script>ignored</script>
      <script type='application/ld+json'>{"b":2}</script>`;
    expect(extractBlocks(html)).toEqual(['{"a":1}', '{"b":2}']);
  });

  it("returns empty array when no blocks", () => {
    expect(extractBlocks("<html></html>")).toEqual([]);
  });

  it("is reusable across calls (no stale lastIndex)", () => {
    const html = `<script type="application/ld+json">{"x":1}</script>`;
    expect(extractBlocks(html)).toHaveLength(1);
    expect(extractBlocks(html)).toHaveLength(1);
  });
});

describe("validateBreadcrumb — posições contíguas", () => {
  it("aceita 1..N contínuo", () => {
    const errors = [];
    validateBreadcrumb(breadcrumb([
      { "@type": "ListItem", position: 1, name: "Início", item: "https://x/" },
      { "@type": "ListItem", position: 2, name: "Guarulhos", item: "https://x/g" },
      { "@type": "ListItem", position: 3, name: "Aeroporto" },
    ]), errors);
    expect(errors).toEqual([]);
  });

  it("rejeita posição inicial diferente de 1", () => {
    const errors = [];
    validateBreadcrumb(breadcrumb([
      { position: 2, name: "Início", item: "https://x/" },
      { position: 3, name: "Fim" },
    ]), errors);
    expect(errors.some((e) => e.includes("position[0] esperado 1"))).toBe(true);
  });

  it("rejeita gap no meio (1,3)", () => {
    const errors = [];
    validateBreadcrumb(breadcrumb([
      { position: 1, name: "A", item: "https://x/a" },
      { position: 3, name: "C" },
    ]), errors);
    expect(errors.some((e) => e.includes("position[1] esperado 2"))).toBe(true);
  });

  it("rejeita ordem invertida (2,1)", () => {
    const errors = [];
    validateBreadcrumb(breadcrumb([
      { position: 2, name: "A", item: "https://x/a" },
      { position: 1, name: "B" },
    ]), errors);
    expect(errors.length).toBeGreaterThanOrEqual(2);
  });

  it("rejeita itemListElement vazio ou ausente", () => {
    const a = []; validateBreadcrumb({ itemListElement: [] }, a);
    const b = []; validateBreadcrumb({}, b);
    expect(a[0]).toMatch(/vazio ou ausente/);
    expect(b[0]).toMatch(/vazio ou ausente/);
  });

  it("exige name em todos e URL em todos menos o último", () => {
    const errors = [];
    validateBreadcrumb(breadcrumb([
      { position: 1, item: "https://x/" },              // sem name
      { position: 2, name: "Meio" },                     // sem URL (não é último → erro)
      { position: 3, name: "Fim" },                      // sem URL (último → ok)
    ]), errors);
    expect(errors.some((e) => e.includes("item[0] sem name"))).toBe(true);
    expect(errors.some((e) => e.includes("item[1] sem URL"))).toBe(true);
    expect(errors.some((e) => e.includes("item[2] sem URL"))).toBe(false);
  });
});

describe("validateLocalBusiness", () => {
  const base = {
    "@type": "InsuranceAgency",
    name: "Patro",
    address: { streetAddress: "Rua X, 1" },
    telephone: "+551199",
  };

  it("passa com campos mínimos", () => {
    const errors = []; validateLocalBusiness(base, errors, "L");
    expect(errors).toEqual([]);
  });

  it("flagra address.streetAddress ausente", () => {
    const errors = []; validateLocalBusiness({ ...base, address: {} }, errors, "L");
    expect(errors[0]).toMatch(/streetAddress ausente/);
  });

  it("flagra ratingValue inválido", () => {
    const errors = [];
    validateLocalBusiness({ ...base, aggregateRating: { ratingValue: "abc" } }, errors, "L");
    expect(errors[0]).toMatch(/ratingValue inválido/);
  });

  it("flagra review sem author", () => {
    const errors = [];
    validateLocalBusiness({ ...base, review: [{ reviewRating: { ratingValue: 5 } }] }, errors, "L");
    expect(errors.some((e) => e.includes("sem author"))).toBe(true);
  });
});

describe("validateFAQ", () => {
  it("exige name + acceptedAnswer.text em cada Q", () => {
    const errors = [];
    validateFAQ({
      mainEntity: [
        { name: "OK?", acceptedAnswer: { text: "sim" } },
        { acceptedAnswer: { text: "x" } },
        { name: "Faltando resposta?" },
      ],
    }, errors, "L");
    expect(errors.some((e) => e.includes("question[1] sem name"))).toBe(true);
    expect(errors.some((e) => e.includes("question[2] sem acceptedAnswer.text"))).toBe(true);
  });
});

describe("validateNode / validateJsonLdBlock", () => {
  it("exige @context e @type", () => {
    const e1 = []; validateNode({ "@type": "Thing" }, e1);
    expect(e1[0]).toMatch(/@context/);
    const e2 = []; validateNode({ "@context": "https://schema.org" }, e2);
    expect(e2[0]).toMatch(/@type/);
  });

  it("aceita arrays de nós", () => {
    const errors = [];
    validateNode([
      { "@context": "https://schema.org", "@type": "WebSite" },
      breadcrumb([{ position: 1, name: "Início" }]),
    ], errors);
    expect(errors).toEqual([]);
  });

  it("retorna erro de parse para JSON quebrado", () => {
    const errors = validateJsonLdBlock("{ not json", "x");
    expect(errors[0]).toMatch(/JSON inválido/);
  });
});

describe("validateHtml — integração", () => {
  it("conta blocos e propaga erros", () => {
    const html = `
      <script type="application/ld+json">${JSON.stringify(breadcrumb([
        { position: 1, name: "Início", item: "https://x/" },
        { position: 2, name: "Fim" },
      ]))}</script>
      <script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [] })}</script>`;
    const { blocks, errors } = validateHtml(html, "test.html");
    expect(blocks).toBe(2);
    expect(errors.some((e) => e.includes("FAQPage: mainEntity vazio"))).toBe(true);
  });

  it("retorna zero erros para página válida", () => {
    const html = `<script type="application/ld+json">${JSON.stringify({
      "@context": "https://schema.org",
      "@type": "InsuranceAgency",
      name: "Patro",
      address: { streetAddress: "Rua X" },
      telephone: "+5511",
    })}</script>`;
    expect(validateHtml(html).errors).toEqual([]);
  });
});