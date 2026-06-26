import { describe, it, expect } from "vitest";
import {
  extractCanonicals,
  extractHeadings,
  validateCanonical,
  validateHeadings,
  validatePage,
} from "./canonical-heading-validator.mjs";

const HOST = "www.patroseguros.com.br";

describe("extractCanonicals", () => {
  it("retorna href de cada link canonical", () => {
    const html = `
      <link rel="canonical" href="https://x/a"/>
      <link rel="stylesheet" href="https://x/s.css"/>
      <link rel='canonical' href='https://x/b'/>`;
    expect(extractCanonicals(html)).toEqual(["https://x/a", "https://x/b"]);
  });

  it("retorna null quando href ausente", () => {
    expect(extractCanonicals(`<link rel="canonical"/>`)).toEqual([null]);
  });
});

describe("validateCanonical", () => {
  it("aceita canonical self-referente com host esperado", () => {
    const html = `<link rel="canonical" href="https://${HOST}/sobre"/>`;
    expect(validateCanonical(html, "/sobre", { expectedHost: HOST })).toEqual([]);
  });

  it("trata trailing slash como equivalente", () => {
    const html = `<link rel="canonical" href="https://${HOST}/sobre/"/>`;
    expect(validateCanonical(html, "/sobre", { expectedHost: HOST })).toEqual([]);
  });

  it("flagra canonical ausente", () => {
    expect(validateCanonical(`<html></html>`, "/", { expectedHost: HOST }))
      .toEqual(["canonical ausente"]);
  });

  it("flagra canonical duplicado", () => {
    const html = `
      <link rel="canonical" href="https://${HOST}/a"/>
      <link rel="canonical" href="https://${HOST}/a"/>`;
    const errs = validateCanonical(html, "/a", { expectedHost: HOST });
    expect(errs.some((e) => e.includes("duplicado"))).toBe(true);
  });

  it("flagra host divergente", () => {
    const html = `<link rel="canonical" href="https://outro.com/a"/>`;
    const errs = validateCanonical(html, "/a", { expectedHost: HOST });
    expect(errs.some((e) => e.includes("host esperado"))).toBe(true);
  });

  it("flagra path apontando para outra rota", () => {
    const html = `<link rel="canonical" href="https://${HOST}/"/>`;
    const errs = validateCanonical(html, "/blog/post-x", { expectedHost: HOST });
    expect(errs.some((e) => e.includes("aponta para /"))).toBe(true);
  });

  it("flagra URL relativa", () => {
    const html = `<link rel="canonical" href="/sobre"/>`;
    const errs = validateCanonical(html, "/sobre", { expectedHost: HOST });
    expect(errs.some((e) => e.includes("não é URL absoluta"))).toBe(true);
  });
});

describe("extractHeadings + validateHeadings", () => {
  it("retorna texto limpo (sem tags internas)", () => {
    expect(extractHeadings(`<h1>Olá <span>mundo</span></h1>`)).toEqual([
      { level: 1, text: "Olá mundo" },
    ]);
  });

  it("aceita h1 → h2 → h3 → h2 → h3", () => {
    const html = `<h1>A</h1><h2>B</h2><h3>C</h3><h2>D</h2><h3>E</h3>`;
    expect(validateHeadings(html)).toEqual([]);
  });

  it("flagra ausência de h1", () => {
    expect(validateHeadings(`<h2>x</h2>`)).toContain("nenhum <h1> encontrado");
  });

  it("flagra múltiplos h1", () => {
    const errs = validateHeadings(`<h1>A</h1><h1>B</h1>`);
    expect(errs.some((e) => e.includes("múltiplos <h1> (2)"))).toBe(true);
  });

  it("flagra h1 vazio", () => {
    expect(validateHeadings(`<h1></h1>`)).toContain("<h1> vazio");
  });

  it("não bloqueia salto de h1 para h3 (regra relaxada em prod)", () => {
    const errs = validateHeadings(`<h1>A</h1><h3>C</h3>`);
    expect(errs.some((e) => e.includes("pula"))).toBe(false);
  });

  it("não bloqueia salto h2 → h4 quando não há h1 (regra relaxada)", () => {
    const errs = validateHeadings(`<h2>A</h2><h4>B</h4>`);
    // ainda pode falhar por falta de h1, mas não por salto de nível
    expect(errs.some((e) => e.includes("pula"))).toBe(false);
  });

  it("não conta como salto descer dois níveis (h3 → h2)", () => {
    expect(validateHeadings(`<h1>A</h1><h2>B</h2><h3>C</h3><h2>D</h2>`)).toEqual([]);
  });
});

describe("validatePage", () => {
  it("integra canonical + headings", () => {
    const html = `
      <link rel="canonical" href="https://${HOST}/x"/>
      <h1>Título</h1><h2>Sub</h2>`;
    const r = validatePage(html, "/x", { expectedHost: HOST });
    expect(r.canonical).toEqual([]);
    expect(r.headings).toEqual([]);
  });

  it("retorna canonical ausente mas headings ok com h1→h3 (regra relaxada)", () => {
    const html = `<h1>A</h1><h3>B</h3>`;
    const r = validatePage(html, "/x", { expectedHost: HOST });
    expect(r.canonical[0]).toMatch(/ausente/);
    expect(r.headings).toEqual([]);
  });
});