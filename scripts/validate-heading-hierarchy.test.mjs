import { describe, it, expect } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {
  auditSourceFile,
  extractHeadingsOrdered,
  auditHierarchy,
  auditJumplinksInHtml,
} from "./validate-heading-hierarchy.mjs";

function tmp(src, ext = ".tsx") {
  const f = path.join(
    os.tmpdir(),
    `hh-${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`,
  );
  fs.writeFileSync(f, src, "utf-8");
  return f;
}

/* --------------------------- Layer 1: fonte -------------------------------- */

describe("auditSourceFile — id='*-heading' precisa estar em <h1|h2|h3>", () => {
  it("aceita id de heading em h1/h2/h3", () => {
    const f = tmp(
      `<h1 id="intro-heading">Título</h1>
       <h2 id="preco-heading">Preço</h2>
       <h3 id="faq-heading">FAQ</h3>`,
    );
    expect(auditSourceFile(f)).toEqual([]);
  });

  it("flagra id de heading em <div>", () => {
    const f = tmp(`<div id="preco-heading">Preço</div>`);
    const issues = auditSourceFile(f);
    expect(issues).toHaveLength(1);
    expect(issues[0]).toMatch(/id="preco-heading".*<div>/);
  });

  it("flagra id de heading em <section> e <span>", () => {
    const f = tmp(
      `<section id="cenarios-heading">x</section>
       <span id="faq-heading">y</span>`,
    );
    const issues = auditSourceFile(f);
    expect(issues).toHaveLength(2);
    expect(issues.join("\n")).toMatch(/<section>/);
    expect(issues.join("\n")).toMatch(/<span>/);
  });

  it("flagra h4/h5/h6 (só h1..h3 são âncoras válidas)", () => {
    const f = tmp(`<h4 id="detalhe-heading">x</h4>`);
    const issues = auditSourceFile(f);
    expect(issues).toHaveLength(1);
    expect(issues[0]).toMatch(/<h4>/);
  });

  it("ignora ids que não terminam em -heading", () => {
    const f = tmp(`<div id="banner">x</div><section id="cta-box">y</section>`);
    expect(auditSourceFile(f)).toEqual([]);
  });
});

/* --------------------------- Layer 2: hierarquia --------------------------- */

describe("auditHierarchy — sem pular níveis", () => {
  it("aceita h1 → h2 → h3 → h2 → h3", () => {
    const headings = extractHeadingsOrdered(
      `<h1>a</h1><h2>b</h2><h3>c</h3><h2>d</h2><h3>e</h3>`,
    );
    expect(auditHierarchy(headings)).toEqual([]);
  });

  it("flagra salto h1 → h3", () => {
    const headings = extractHeadingsOrdered(`<h1>a</h1><h3 id="x">b</h3>`);
    const issues = auditHierarchy(headings);
    expect(issues).toHaveLength(1);
    expect(issues[0]).toMatch(/pula de <h1> para <h3>.*id=x/);
  });

  it("flagra salto h2 → h4 (id ausente vira '—')", () => {
    const headings = extractHeadingsOrdered(`<h2>a</h2><h4>b</h4>`);
    const issues = auditHierarchy(headings);
    expect(issues).toHaveLength(1);
    expect(issues[0]).toMatch(/pula de <h2> para <h4>.*id=—/);
  });

  it("aceita descidas de qualquer distância (h3 → h1)", () => {
    const headings = extractHeadingsOrdered(`<h3>a</h3><h1>b</h1>`);
    expect(auditHierarchy(headings)).toEqual([]);
  });

  it("aceita primeiro heading em qualquer nível (h2 inicial)", () => {
    const headings = extractHeadingsOrdered(`<h2>a</h2><h3>b</h3>`);
    expect(auditHierarchy(headings)).toEqual([]);
  });

  it("acumula múltiplos saltos", () => {
    const headings = extractHeadingsOrdered(
      `<h1>a</h1><h3>b</h3><h2>c</h2><h5>d</h5>`,
    );
    expect(auditHierarchy(headings)).toHaveLength(2);
  });
});

describe("extractHeadingsOrdered", () => {
  it("ignora headings dentro de <noscript>", () => {
    const headings = extractHeadingsOrdered(
      `<h1>a</h1><noscript><h4>skip</h4></noscript><h2>b</h2>`,
    );
    expect(headings.map((h) => h.tag)).toEqual(["h1", "h2"]);
  });

  it("preserva ordem e extrai id quando presente", () => {
    const headings = extractHeadingsOrdered(
      `<h1 id="hero">a</h1><h2 class="x" id="preco">b</h2><h2>c</h2>`,
    );
    expect(headings).toEqual([
      { tag: "h1", level: 1, id: "hero" },
      { tag: "h2", level: 2, id: "preco" },
      { tag: "h2", level: 2, id: null },
    ]);
  });
});

/* --------------------------- Layer 3: jumplinks ---------------------------- */

describe("auditJumplinksInHtml — cada href aponta para h1|h2|h3", () => {
  const navFor = (hrefs) =>
    `<nav aria-label="Ir para a seção">${hrefs
      .map((h) => `<a href="#${h}">${h}</a>`)
      .join("")}</nav>`;

  it("retorna [] quando não há nav de jumplinks", () => {
    const headings = extractHeadingsOrdered(`<h1 id="a">a</h1>`);
    expect(auditJumplinksInHtml(`<h1 id="a">a</h1>`, headings)).toEqual([]);
  });

  it("aceita hrefs que apontam para h2/h3", () => {
    const html = `${navFor(["preco", "faq"])}
      <h2 id="preco">p</h2><h3 id="faq">f</h3>`;
    expect(auditJumplinksInHtml(html, extractHeadingsOrdered(html))).toEqual([]);
  });

  it("flagra href apontando para id inexistente", () => {
    const html = `${navFor(["fantasma"])}<h2 id="real">r</h2>`;
    const issues = auditJumplinksInHtml(html, extractHeadingsOrdered(html));
    expect(issues).toEqual(["jumplink #fantasma → id inexistente no HTML"]);
  });

  it("flagra href apontando para id que existe mas está em tag inválida", () => {
    // O id existe num <div> — auditSourceFile pega isso na camada 1, mas
    // aqui provamos que o validador de dist/ também detecta em runtime.
    const html = `${navFor(["preco"])}<div id="preco">p</div>`;
    // extractHeadingsOrdered não pega <div>, então precisamos incluí-lo manualmente.
    const headings = [
      ...extractHeadingsOrdered(html),
      { tag: "div", level: 0, id: "preco" },
    ];
    const issues = auditJumplinksInHtml(html, headings);
    expect(issues).toEqual([
      "jumplink #preco → id existe mas não está em <h1|h2|h3>",
    ]);
  });

  it("flagra href apontando para id em h4 (fora de h1|h2|h3)", () => {
    const html = `${navFor(["detalhe"])}<h4 id="detalhe">d</h4>`;
    const issues = auditJumplinksInHtml(html, extractHeadingsOrdered(html));
    expect(issues).toEqual([
      "jumplink #detalhe → id existe mas não está em <h1|h2|h3>",
    ]);
  });
});
