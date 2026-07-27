import { describe, it, expect } from "vitest";

const EXPECTED_HOST = "www.patroseguros.com.br";
const BRAND_HOST_RE = /patroseguros\.com\.br/i;

function hasWrongHost(u: string): boolean {
  try {
    const p = new URL(u);
    if (p.protocol !== "https:") return true;
    return p.host !== EXPECTED_HOST;
  } catch {
    return true;
  }
}
function isBadTrailing(u: string): boolean {
  try {
    const p = new URL(u);
    if (p.pathname === "/") return false;
    return p.pathname.endsWith("/");
  } catch {
    return false;
  }
}
function collectUrls(node: unknown, acc: string[] = []): string[] {
  if (!node || typeof node !== "object") return acc;
  if (Array.isArray(node)) {
    for (const n of node) collectUrls(n, acc);
    return acc;
  }
  for (const v of Object.values(node as Record<string, unknown>)) {
    if (typeof v === "string" && /^https?:\/\//i.test(v) && BRAND_HOST_RE.test(v)) {
      acc.push(v);
    } else if (v && typeof v === "object") {
      collectUrls(v, acc);
    }
  }
  return acc;
}

describe("regras de consistência de URL (canonical/og/JSON-LD)", () => {
  it("rejeita apex, http e lovable.app como host", () => {
    expect(hasWrongHost("https://www.patroseguros.com.br/sobre")).toBe(false);
    expect(hasWrongHost("https://patroseguros.com.br/sobre")).toBe(true);
    expect(hasWrongHost("http://www.patroseguros.com.br/sobre")).toBe(true);
    expect(hasWrongHost("https://patroseguros.lovable.app/sobre")).toBe(true);
  });
  it("rejeita trailing slash exceto na raiz", () => {
    expect(isBadTrailing("https://www.patroseguros.com.br/")).toBe(false);
    expect(isBadTrailing("https://www.patroseguros.com.br/sobre")).toBe(false);
    expect(isBadTrailing("https://www.patroseguros.com.br/sobre/")).toBe(true);
  });
  it("coleta URLs do domínio em objetos JSON-LD aninhados", () => {
    const jsonLd = {
      "@id": "https://www.patroseguros.com.br/sobre",
      provider: { url: "https://www.patroseguros.com.br" },
      mainEntityOfPage: {
        "@id": "https://www.patroseguros.com.br/sobre",
      },
      externo: "https://google.com",
    };
    const urls = collectUrls(jsonLd);
    expect(urls).toContain("https://www.patroseguros.com.br/sobre");
    expect(urls).toContain("https://www.patroseguros.com.br");
    expect(urls).not.toContain("https://google.com");
  });
});
