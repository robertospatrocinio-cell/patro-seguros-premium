import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync } from "fs";
import { resolve } from "path";

const publicDir = resolve(process.cwd(), "public");
const robots = readFileSync(resolve(publicDir, "robots.txt"), "utf-8");
const sitemaps = readdirSync(publicDir).filter((f) => /^sitemap.*\.xml$/i.test(f));

describe("robots.txt", () => {
  it("nunca referencia URLs do ambiente lovable.app", () => {
    expect(robots).not.toMatch(/lovable\.app/i);
  });

  it("só publica diretivas Sitemap: apontando para www.patroseguros.com.br", () => {
    const sitemapLines = robots
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => /^sitemap:/i.test(l));
    expect(sitemapLines.length).toBeGreaterThan(0);
    for (const line of sitemapLines) {
      expect(line).toMatch(/^Sitemap:\s+https:\/\/www\.patroseguros\.com\.br\/sitemap[\w-]*\.xml$/i);
    }
  });
});

describe("sitemaps estáticos", () => {
  it(`nenhum dos ${sitemaps.length} sitemaps contém URLs de lovable.app`, () => {
    for (const file of sitemaps) {
      const content = readFileSync(resolve(publicDir, file), "utf-8");
      expect(content, `${file} contém URL de preview`).not.toMatch(
        /https?:\/\/[^<\s"']*lovable\.app/i,
      );
    }
  });
});