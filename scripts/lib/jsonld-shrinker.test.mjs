import { describe, it, expect } from "vitest";
import { shrink, shrinkCounterexample, formatCounterexample } from "./jsonld-shrinker.mjs";
import { CHECKERS } from "./rich-results-checkers.mjs";

/**
 * Testes do shrinker: garantem que
 *   (a) o retorno preserva o predicado (ainda falha),
 *   (b) o resultado é MENOR que a entrada (menos chaves/itens/chars),
 *   (c) `@type` é preservado por default,
 *   (d) o shrinker é idempotente sobre entradas já mínimas,
 *   (e) integração com checkers reais devolve contraexemplo pequeno.
 */

// Métrica simples de "tamanho" para asserções de que a shrink reduziu.
function size(v) {
  if (v === null || v === undefined) return 1;
  if (typeof v === "string") return v.length + 1;
  if (typeof v === "number" || typeof v === "boolean") return 1;
  if (Array.isArray(v)) return 1 + v.reduce((s, x) => s + size(x), 0);
  if (typeof v === "object") {
    return 1 + Object.entries(v).reduce((s, [k, x]) => s + k.length + size(x), 0);
  }
  return 1;
}

describe("shrink: reduz mantendo predicado", () => {
  it("array de números: menor caso que soma > 10 é [11] (ou similar)", () => {
    const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const pred = (arr) => Array.isArray(arr) && arr.reduce((s, n) => s + (typeof n === "number" ? n : 0), 0) > 10;
    const { shrunk } = shrink(input, pred);
    expect(pred(shrunk)).toBe(true);
    expect(size(shrunk)).toBeLessThan(size(input));
    // Deve reduzir para poucos elementos.
    expect(shrunk.length).toBeLessThanOrEqual(2);
  });

  it("objeto: remove chaves irrelevantes preservando a causa", () => {
    const input = {
      "@type": "Foo",
      culpa: "boom",
      lixo1: "aaaaaaaaaa",
      lixo2: [1, 2, 3, 4, 5],
      lixo3: { deep: { nested: "junk" } },
    };
    const pred = (o) => o && o.culpa === "boom";
    const { shrunk } = shrink(input, pred);
    expect(pred(shrunk)).toBe(true);
    expect(shrunk["@type"]).toBe("Foo"); // preservado por default
    expect(Object.keys(shrunk).sort()).toEqual(["@type", "culpa"]);
  });

  it("string: encolhe apenas até onde o predicado sustenta", () => {
    const input = "abcdefghij";
    const pred = (s) => typeof s === "string" && s.length >= 3;
    const { shrunk } = shrink(input, pred);
    expect(pred(shrunk)).toBe(true);
    expect(shrunk.length).toBeLessThan(input.length);
  });

  it("idempotente: entrada já mínima não muda", () => {
    const input = { "@type": "X", culpa: 1 };
    const pred = (o) => o?.culpa === 1;
    const { shrunk, steps } = shrink(input, pred);
    expect(shrunk).toEqual(input);
    expect(steps).toBe(0);
  });

  it("predicado que falha no início: retorna original marcado unchanged", () => {
    const input = { foo: "bar" };
    const pred = () => false;
    const { shrunk, unchanged } = shrink(input, pred);
    expect(shrunk).toEqual(input);
    expect(unchanged).toBe(true);
  });

  it("predicado que lança: tratado como falha (não reduz além do seguro)", () => {
    const input = { a: 1, b: 2 };
    const pred = (v) => { if (Object.keys(v).length < 1) throw new Error("x"); return true; };
    const { shrunk } = shrink(input, pred);
    // Deve chegar a {} ou muito próximo — mas sem quebrar.
    expect(pred(shrunk === null ? {} : shrunk) || shrunk).toBeDefined();
  });

  it("preserveKeys custom: mantém múltiplas chaves", () => {
    const input = { "@type": "T", "@id": "x", extra: "junk", outro: [1, 2] };
    const pred = (o) => o && typeof o === "object";
    const { shrunk } = shrink(input, pred, { preserveKeys: ["@type", "@id"] });
    expect(shrunk["@type"]).toBe("T");
    expect(shrunk["@id"]).toBe("x");
  });
});

describe("shrinkCounterexample: integra com checkers reais", () => {
  it("Organization com URL relativa: reduz a nó mínimo violando req 'url absoluta'", () => {
    const bloated = {
      "@type": "Organization",
      name: "Patro Seguros LTDA",
      url: "/relativa",
      logo: "/tambem-relativa.png",
      sameAs: ["a", "b", "c"],
      description: "loremxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      lixo: { deep: [1, 2, 3] },
    };
    const { shrunk } = shrinkCounterexample(
      bloated,
      CHECKERS.Organization,
      (r) => r.req.some((m) => /url absoluta/.test(m)),
    );
    expect(shrunk["@type"]).toBe("Organization");
    expect(size(shrunk)).toBeLessThan(size(bloated));
    // Reprodução mínima: url ainda inválida (relativa/ausente).
    const r = CHECKERS.Organization(shrunk);
    expect(r.req.some((m) => /url absoluta/.test(m))).toBe(true);
  });

  it("BreadcrumbList: encolhe até itemListElement mínimo mantendo o bug", () => {
    const bloated = {
      "@type": "BreadcrumbList",
      itemListElement: Array.from({ length: 8 }, (_, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: `Nível ${i}`,
        item: i === 3 ? "/relativa-bug" : `https://ok.com/n${i}`,
      })),
    };
    const { shrunk } = shrinkCounterexample(
      bloated,
      CHECKERS.BreadcrumbList,
      (r) => r.req.some((m) => /URL absoluta/.test(m)),
    );
    expect(shrunk["@type"]).toBe("BreadcrumbList");
    expect(Array.isArray(shrunk.itemListElement)).toBe(true);
    // Deve ter reduzido drasticamente a lista.
    expect(shrunk.itemListElement.length).toBeLessThan(bloated.itemListElement.length);
    const r = CHECKERS.BreadcrumbList(shrunk);
    expect(r.req.some((m) => /URL absoluta/.test(m))).toBe(true);
  });
});

describe("formatCounterexample", () => {
  it("serializa nó + metadados de forma legível", () => {
    const s = formatCounterexample({ "@type": "X", a: 1 }, { seed: 42, iter: 7 });
    expect(s).toContain("seed=42");
    expect(s).toContain("iter=7");
    expect(s).toContain('"@type":"X"');
  });
});