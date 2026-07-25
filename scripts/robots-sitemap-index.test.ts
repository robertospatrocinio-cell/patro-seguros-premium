import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const ROBOTS = readFileSync(resolve("public/robots.txt"), "utf-8");
const CANONICAL_SITEMAP = "https://www.patroseguros.com.br/sitemap-index.xml";

describe("robots.txt — Sitemap directive", () => {
  const sitemapLines = ROBOTS
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => /^sitemap\s*:/i.test(l));

  it("declara pelo menos uma diretiva Sitemap:", () => {
    expect(sitemapLines.length).toBeGreaterThan(0);
  });

  it("aponta exclusivamente para /sitemap-index.xml no host canônico", () => {
    // Só uma linha Sitemap: — nada de clusters legados
    expect(sitemapLines).toHaveLength(1);
    expect(sitemapLines[0]).toBe(`Sitemap: ${CANONICAL_SITEMAP}`);
  });

  it("não referencia sitemaps por categoria (auto/bairros/empresarial/etc)", () => {
    for (const legacy of [
      "sitemap-auto.xml",
      "sitemap-bairros.xml",
      "sitemap-empresarial.xml",
      "sitemap-geral.xml",
      "sitemap-guarulhos.xml",
      "sitemap-vida-saude.xml",
    ]) {
      expect(ROBOTS, `robots.txt não deve citar ${legacy}`).not.toContain(legacy);
    }
  });
});

describe("robots.txt — sem hosts de preview", () => {
  it("nunca contém lovable.app (nem em URL, comentário ou diretiva)", () => {
    expect(ROBOTS).not.toMatch(/lovable\.app/i);
  });

  it("nenhuma diretiva Sitemap: aponta para host que não seja www.patroseguros.com.br", () => {
    const urls = [...ROBOTS.matchAll(/^\s*sitemap\s*:\s*(\S+)\s*$/gim)].map(
      (m) => m[1],
    );
    for (const u of urls) {
      const parsed = new URL(u);
      expect(parsed.origin, `host não canônico em robots: ${u}`).toBe(
        "https://www.patroseguros.com.br",
      );
    }
  });
});