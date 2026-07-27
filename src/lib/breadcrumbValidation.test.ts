import { describe, it, expect } from "vitest";
import { sanitizeBreadcrumbItems } from "./breadcrumbValidation";

describe("sanitizeBreadcrumbItems", () => {
  it("mantém itens válidos e únicos na mesma ordem", () => {
    const { items, issues } = sanitizeBreadcrumbItems([
      { name: "Início", url: "https://www.patroseguros.com.br" },
      { name: "Seguro Auto", url: "https://www.patroseguros.com.br/seguro-auto" },
      { name: "BYD Dolphin", url: "https://www.patroseguros.com.br/valor-seguro-byd-dolphin" },
    ]);
    expect(issues).toEqual([]);
    expect(items.map((i) => i.name)).toEqual(["Início", "Seguro Auto", "BYD Dolphin"]);
  });

  it("deduplica por href absoluto mantendo o primeiro", () => {
    const { items, issues } = sanitizeBreadcrumbItems([
      { name: "Início", url: "https://www.patroseguros.com.br" },
      { name: "Seguro Auto", url: "https://www.patroseguros.com.br/seguro-auto" },
      { name: "Auto (duplicado)", url: "https://www.patroseguros.com.br/seguro-auto" },
      { name: "Uber", url: "https://www.patroseguros.com.br/melhor-seguro-para-uber-guarulhos" },
    ]);
    expect(items.map((i) => i.name)).toEqual(["Início", "Seguro Auto", "Uber"]);
    expect(issues).toHaveLength(1);
    expect(issues[0]).toMatchObject({ reason: "duplicate-href", index: 2 });
  });

  it.each([
    ["string vazia", ""],
    ["path relativo", "/seguro-auto"],
    ["javascript:", "javascript:alert(1)"],
    ["mailto:", "mailto:foo@bar.com"],
    ["hash puro", "#preco"],
    ["url malformada", "http://"],
    ["whitespace", "   "],
  ])("rejeita URL inválida: %s", (_label, url) => {
    const { items, issues } = sanitizeBreadcrumbItems([
      { name: "Início", url: "https://www.patroseguros.com.br" },
      { name: "Ruim", url },
    ]);
    expect(items.map((i) => i.name)).toEqual(["Início"]);
    expect(issues).toHaveLength(1);
    expect(issues[0].reason).toBe("invalid-url");
  });

  it("rejeita itens sem name (após trim)", () => {
    const { items, issues } = sanitizeBreadcrumbItems([
      { name: "Início", url: "https://www.patroseguros.com.br" },
      { name: "   ", url: "https://www.patroseguros.com.br/blog" },
    ]);
    expect(items.map((i) => i.name)).toEqual(["Início"]);
    expect(issues[0].reason).toBe("empty-name");
  });

  it("aceita http e https, rejeita outros protocolos", () => {
    const { items } = sanitizeBreadcrumbItems([
      { name: "A", url: "https://a.com" },
      { name: "B", url: "http://b.com" },
      { name: "C", url: "ftp://c.com" },
    ]);
    expect(items.map((i) => i.name)).toEqual(["A", "B"]);
  });
});