import { describe, it, expect } from "vitest";
import {
  ABS_URL_RE,
  HTTPS_URL_RE,
  isAbsUrl,
  isHttpsUrl,
  isPlainObj,
  extractImageUrl,
  hasImage,
  extractUrlLike,
} from "./url-image-helpers.mjs";

// Assegura que este módulo é a ÚNICA fonte de verdade — os validadores
// (rich-results-checkers e jsonld-validator) reexportam / importam daqui.
import * as checkers from "./rich-results-checkers.mjs";

describe("url-image-helpers — isAbsUrl / isHttpsUrl", () => {
  it.each([
    ["http://example.com", true],
    ["https://example.com", true],
    ["HTTPS://EXAMPLE.COM", true],
    ["//example.com", false],
    ["/relative", false],
    ["ftp://example.com", false],
    ["", false],
    [null, false],
    [undefined, false],
    [42, false],
    [{}, false],
  ])("isAbsUrl(%p) === %p", (input, expected) => {
    expect(isAbsUrl(input)).toBe(expected);
  });

  it("isHttpsUrl é strict (rejeita http)", () => {
    expect(isHttpsUrl("https://x")).toBe(true);
    expect(isHttpsUrl("http://x")).toBe(false);
    expect(isHttpsUrl("//x")).toBe(false);
  });

  it("ABS_URL_RE e HTTPS_URL_RE são consistentes com os predicados", () => {
    expect(ABS_URL_RE.test("http://a")).toBe(true);
    expect(ABS_URL_RE.test("https://a")).toBe(true);
    expect(HTTPS_URL_RE.test("http://a")).toBe(false);
    expect(HTTPS_URL_RE.test("https://a")).toBe(true);
  });
});

describe("url-image-helpers — isPlainObj", () => {
  it("distingue objetos puros de arrays/null/primitivos", () => {
    expect(isPlainObj({})).toBe(true);
    expect(isPlainObj({ a: 1 })).toBe(true);
    expect(isPlainObj([])).toBe(false);
    expect(isPlainObj(null)).toBe(false);
    expect(isPlainObj(undefined)).toBe(false);
    expect(isPlainObj("x")).toBe(false);
    expect(isPlainObj(0)).toBe(false);
  });
});

describe("url-image-helpers — extractImageUrl / hasImage", () => {
  it("string simples", () => {
    expect(extractImageUrl("https://a/x.jpg")).toBe("https://a/x.jpg");
    expect(hasImage("https://a/x.jpg")).toBe(true);
  });
  it("string vazia / whitespace → null", () => {
    expect(extractImageUrl("")).toBe(null);
    expect(extractImageUrl("   ")).toBe(null);
    expect(hasImage("")).toBe(false);
  });
  it("array — primeira URL válida ganha", () => {
    expect(extractImageUrl([null, "", "https://a/1.jpg", "https://a/2.jpg"]))
      .toBe("https://a/1.jpg");
    expect(hasImage([null, ""])).toBe(false);
  });
  it("ImageObject com url ou @id ou contentUrl", () => {
    expect(extractImageUrl({ "@type": "ImageObject", url: "https://a/x.jpg" })).toBe("https://a/x.jpg");
    expect(extractImageUrl({ "@type": "ImageObject", "@id": "https://a/y.jpg" })).toBe("https://a/y.jpg");
    expect(extractImageUrl({ "@type": "ImageObject", contentUrl: "https://a/z.jpg" })).toBe("https://a/z.jpg");
  });
  it("objeto sem url/@id → null", () => {
    expect(extractImageUrl({ caption: "sem url" })).toBe(null);
    expect(hasImage({})).toBe(false);
  });
  it("aceita URLs relativas (não valida esquema — só extrai)", () => {
    // extração é ortogonal à validação de esquema; isAbsUrl faz a checagem.
    expect(extractImageUrl("/local.jpg")).toBe("/local.jpg");
    expect(isAbsUrl(extractImageUrl("/local.jpg"))).toBe(false);
  });
});

describe("url-image-helpers — extractUrlLike", () => {
  it("string → [string]", () => {
    expect(extractUrlLike("https://a")).toEqual(["https://a"]);
  });
  it("array recursivo", () => {
    expect(extractUrlLike(["https://a", { url: "https://b" }, { "@id": "https://c" }]))
      .toEqual(["https://a", "https://b", "https://c"]);
  });
  it("objeto com url + @id devolve ambos", () => {
    expect(extractUrlLike({ "@id": "https://a", url: "https://b" }))
      .toEqual(["https://a", "https://b"]);
  });
  it("primitivos não-string → []", () => {
    expect(extractUrlLike(null)).toEqual([]);
    expect(extractUrlLike(undefined)).toEqual([]);
    expect(extractUrlLike(42)).toEqual([]);
  });
});

describe("url-image-helpers — unificação com rich-results-checkers", () => {
  it("rich-results-checkers reexporta EXATAMENTE os mesmos helpers", () => {
    // Fonte única da verdade: se alguém redefinir localmente, este teste quebra.
    expect(checkers.isAbsUrl).toBe(isAbsUrl);
    expect(checkers.isPlainObj).toBe(isPlainObj);
    expect(checkers.extractImageUrl).toBe(extractImageUrl);
  });
});