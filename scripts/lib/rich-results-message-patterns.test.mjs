import { describe, it, expect } from "vitest";
import { CHECKERS } from "./rich-results-checkers.mjs";
import { MESSAGE_PATTERNS, findUnknownMessages } from "./rich-results-message-patterns.mjs";

describe("rich-results-message-patterns", () => {
  it("cobre todos os @type registrados em CHECKERS", () => {
    for (const type of Object.keys(CHECKERS)) {
      expect(MESSAGE_PATTERNS[type], `sem padrão para ${type}`).toBeDefined();
    }
  });

  it("cada entrada tem os arrays req e rec", () => {
    for (const [type, spec] of Object.entries(MESSAGE_PATTERNS)) {
      expect(Array.isArray(spec.req), `${type}.req`).toBe(true);
      expect(Array.isArray(spec.rec), `${type}.rec`).toBe(true);
      for (const re of [...spec.req, ...spec.rec]) {
        expect(re, `${type} padrão não é RegExp`).toBeInstanceOf(RegExp);
      }
    }
  });

  it("findUnknownMessages devolve [] quando toda msg casa", () => {
    const msgs = ["name ausente", "url absoluta ausente"];
    expect(findUnknownMessages("Organization", "req", msgs)).toEqual([]);
  });

  it("findUnknownMessages devolve msg desconhecida", () => {
    const unknown = findUnknownMessages("Organization", "req", [
      "name ausente",
      "algum wording novo que ninguem esperava",
    ]);
    expect(unknown).toEqual(["algum wording novo que ninguem esperava"]);
  });

  it("smoke: padrões reais casam mensagens de checkers com nó vazio", () => {
    // Amostra representativa — se um destes falhar, o wording divergiu.
    const cases = [
      ["Organization", { "@type": "Organization" }, "req"],
      ["FAQPage", { "@type": "FAQPage", mainEntity: [] }, "req"],
      ["BreadcrumbList", { "@type": "BreadcrumbList" }, "req"],
      ["ImageObject", { "@type": "ImageObject" }, "req"],
      ["Article", { "@type": "Article" }, "req"],
    ];
    for (const [type, node, kind] of cases) {
      const r = CHECKERS[type](node);
      expect(r[kind].length, `${type} deveria emitir ${kind}`).toBeGreaterThan(0);
      expect(findUnknownMessages(type, kind, r[kind])).toEqual([]);
    }
  });
});