import { describe, it, expect } from "vitest";
import { resolveRoute, normalizePath } from "../../src/lib/redirects";
import { getCanonicalUrl, CANONICAL_BASE_URL } from "../../src/lib/canonical";

describe("SEO Infrastructure - Redirects & 410 Gone", () => {
  it("should return 410 Gone for deprecated WordPress tags", () => {
    const result = resolveRoute("/tag/seguros");
    expect(result.kind).toBe("gone");
  });

  it("should return 410 Gone for WordPress feeds", () => {
    const result = resolveRoute("/blog/feed");
    expect(result.kind).toBe("gone");
  });

  it("should redirect /artigos/:slug to /blog/:slug in a single hop", () => {
    const slug = "5-dicas-baratear-seguro-auto";
    const result = resolveRoute(`/artigos/${slug}`);
    expect(result.kind).toBe("redirect");
    if (result.kind === "redirect") {
      expect(result.to).toBe(`/blog/${slug}`);
    }
  });

  it("should redirect /previdencia to /previdencia-privada", () => {
    const result = resolveRoute("/previdencia");
    expect(result.kind).toBe("redirect");
    if (result.kind === "redirect") {
      expect(result.to).toBe("/previdencia-privada");
    }
  });

  it("should NOT redirect valid indexable routes", () => {
    const result = resolveRoute("/seguro-auto");
    expect(result.kind).toBe("none");
  });
});

describe("SEO Infrastructure - Canonical Normalization", () => {
  it("should normalize homepage to apex domain without trailing slash", () => {
    expect(getCanonicalUrl("/")).toBe(CANONICAL_BASE_URL);
    expect(getCanonicalUrl("")).toBe(CANONICAL_BASE_URL);
  });

  it("should remove trailing slashes and lowercase pathnames", () => {
    expect(getCanonicalUrl("/Seguro-Auto/")).toBe(`${CANONICAL_BASE_URL}/seguro-auto`);
  });

  it("should strip query strings from canonical URLs", () => {
    expect(getCanonicalUrl("/cotacao?tipo=auto&origem=test")).toBe(`${CANONICAL_BASE_URL}/cotacao`);
  });

  it("should strip hash fragments from canonical URLs", () => {
    expect(getCanonicalUrl("/sobre#historia")).toBe(`${CANONICAL_BASE_URL}/sobre`);
  });
});

describe("SEO Infrastructure - Path Normalization Logic", () => {
  it("should remove trailing slashes from pathnames", () => {
    expect(normalizePath("/blog/")).toBe("/blog");
    expect(normalizePath("/seguros/auto///")).toBe("/seguros/auto");
  });

  it("should preserve the root slash", () => {
    expect(normalizePath("/")).toBe("/");
  });
});
