import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

const PUBLIC_DIR = path.resolve("public");
const CANONICAL_ORIGIN = "https://www.patroseguros.com.br";

const TYPE_SITEMAPS = [
  "sitemap-pages.xml",
  "sitemap-blog.xml",
  "sitemap-seguros.xml",
];
const INDEX_FILE = "sitemap-index.xml";

function readXml(name: string): string {
  const fp = path.join(PUBLIC_DIR, name);
  expect(fs.existsSync(fp), `${name} deve existir em public/`).toBe(true);
  return fs.readFileSync(fp, "utf-8");
}

function extractLocs(xml: string): string[] {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

/** Regras de canonicidade compartilhadas por index e sitemaps de tipo. */
function assertCanonicalUrl(url: string, source: string) {
  // 1) Deve parsear como URL absoluta
  let parsed: URL;
  expect(
    () => (parsed = new URL(url)),
    `[${source}] URL inválida: ${url}`,
  ).not.toThrow();
  parsed = new URL(url);

  // 2) Origin exatamente https://www.patroseguros.com.br
  expect(parsed.origin, `[${source}] origem não-canônica em ${url}`).toBe(
    CANONICAL_ORIGIN,
  );

  // 3) Proibido hosts de preview / staging
  expect(url, `[${source}] host de preview em ${url}`).not.toMatch(
    /lovable\.app/i,
  );
  expect(url, `[${source}] host apex sem www em ${url}`).not.toMatch(
    /^https?:\/\/patroseguros\.com\.br/i,
  );
  expect(url, `[${source}] http:// em vez de https:// em ${url}`).not.toMatch(
    /^http:\/\//i,
  );

  // 4) Sem query, hash ou trailing slash (exceto raiz)
  expect(parsed.search, `[${source}] querystring em ${url}`).toBe("");
  expect(parsed.hash, `[${source}] fragmento em ${url}`).toBe("");
  if (parsed.pathname !== "/") {
    expect(
      parsed.pathname.endsWith("/"),
      `[${source}] trailing slash não canônico em ${url}`,
    ).toBe(false);
  }
}

describe("sitemap-index.xml", () => {
  const xml = readXml(INDEX_FILE);
  const locs = extractLocs(xml);

  it("é um <sitemapindex> não vazio", () => {
    expect(xml).toMatch(/<sitemapindex\b/);
    expect(locs.length).toBeGreaterThan(0);
  });

  it.each(TYPE_SITEMAPS)("referencia %s no host canônico", (name) => {
    expect(locs).toContain(`${CANONICAL_ORIGIN}/${name}`);
  });

  it("todas as entradas apontam para o host canônico e arquivos existentes", () => {
    for (const loc of locs) {
      assertCanonicalUrl(loc, INDEX_FILE);
      const fname = new URL(loc).pathname.slice(1);
      expect(
        fs.existsSync(path.join(PUBLIC_DIR, fname)),
        `[${INDEX_FILE}] arquivo referenciado não existe: ${fname}`,
      ).toBe(true);
    }
  });
});

describe.each(TYPE_SITEMAPS)("%s", (name) => {
  const xml = readXml(name);
  const locs = extractLocs(xml);

  it("é um <urlset> não vazio", () => {
    expect(xml).toMatch(/<urlset\b/);
    expect(locs.length).toBeGreaterThan(0);
  });

  it("todas as URLs são canônicas de https://www.patroseguros.com.br", () => {
    for (const loc of locs) assertCanonicalUrl(loc, name);
  });

  it("não contém URLs duplicadas", () => {
    const dup = locs.filter((u, i) => locs.indexOf(u) !== i);
    expect(dup, `duplicadas em ${name}: ${dup.join(", ")}`).toEqual([]);
  });
});

describe("cobertura entre sitemaps por tipo", () => {
  it("não há URL repetida entre sitemap-pages / -blog / -seguros", () => {
    const map = new Map<string, string>();
    const collisions: string[] = [];
    for (const name of TYPE_SITEMAPS) {
      for (const loc of extractLocs(readXml(name))) {
        const prev = map.get(loc);
        if (prev && prev !== name) {
          collisions.push(`${loc} em ${prev} e ${name}`);
        } else {
          map.set(loc, name);
        }
      }
    }
    expect(collisions).toEqual([]);
  });
});