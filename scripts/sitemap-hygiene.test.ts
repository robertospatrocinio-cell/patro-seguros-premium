import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

const PUBLIC = path.resolve("public");
const ORIGIN = "https://www.patroseguros.com.br";

const sitemapFiles = fs
  .readdirSync(PUBLIC)
  .filter((f) => /^sitemap.*\.xml$/i.test(f));

const locsOf = (file: string) =>
  [...fs.readFileSync(path.join(PUBLIC, file), "utf-8").matchAll(/<loc>([^<]+)<\/loc>/g)].map(
    (m) => m[1].trim(),
  );

// Sitemaps de URLs (não os índices, que apontam para outros sitemaps).
const urlsetFiles = sitemapFiles.filter((f) =>
  fs.readFileSync(path.join(PUBLIC, f), "utf-8").includes("<urlset"),
);

describe("higiene dos sitemaps", () => {
  it("existe pelo menos um urlset publicado", () => {
    expect(urlsetFiles.length).toBeGreaterThan(0);
  });

  it("toda URL é https, www e sem barra final", () => {
    for (const f of urlsetFiles) {
      for (const loc of locsOf(f)) {
        expect(loc === ORIGIN || loc.startsWith(`${ORIGIN}/`), `${loc} em ${f} não é canônica`).toBe(
          true,
        );
        // A home é a origem nua; nenhuma outra URL pode ter barra final.
        expect(loc.endsWith("/"), `${loc} em ${f} tem barra final`).toBe(false);
      }
    }
  });

  it("nenhuma URL carrega parâmetros de query ou fragmento", () => {
    for (const f of urlsetFiles) {
      for (const loc of locsOf(f)) {
        expect(loc).not.toContain("?");
        expect(loc).not.toContain("#");
        expect(loc).not.toContain("origem=");
      }
    }
  });

  it("nenhuma URL redirecionada (/artigos/) é publicada", () => {
    for (const f of urlsetFiles) {
      for (const loc of locsOf(f)) {
        expect(loc, `${loc} em ${f} responde 301`).not.toMatch(/\/artigos(\/|$)/);
      }
    }
  });

  it("cada URL aparece em um único sitemap", () => {
    const owner = new Map<string, string>();
    const dupes: string[] = [];
    for (const f of urlsetFiles) {
      if (f === "sitemap-images.xml") continue;
      for (const loc of locsOf(f)) {
        if (owner.has(loc)) dupes.push(`${loc} (${owner.get(loc)} e ${f})`);
        else owner.set(loc, f);
      }
    }
    expect(dupes, `URLs duplicadas entre sitemaps:\n${dupes.join("\n")}`).toEqual([]);
  });

  it("robots.txt declara exatamente uma referência de Sitemap", () => {
    const robots = fs.readFileSync(path.join(PUBLIC, "robots.txt"), "utf-8");
    const refs = robots.match(/^\s*Sitemap:\s*\S+/gim) ?? [];
    expect(refs).toHaveLength(1);
    expect(refs[0]).toContain(`${ORIGIN}/sitemap-index.xml`);
  });

  it("o índice referencia apenas sitemaps existentes", () => {
    const index = locsOf("sitemap-index.xml");
    for (const loc of index) {
      const name = loc.replace(`${ORIGIN}/`, "");
      expect(fs.existsSync(path.join(PUBLIC, name)), `${name} não existe`).toBe(true);
    }
  });
});
