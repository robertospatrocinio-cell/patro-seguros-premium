import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { getCanonicalUrl, CANONICAL_BASE_URL } from "@/lib/canonical";
import { clampDescription, getMetadataForRoute } from "@/lib/seoMetadata";
import { materiais } from "@/data/materiaisData";
import { GUIAS_PILARES } from "@/data/guiasPilaresData";
import { faqCategories } from "@/data/perguntasHubData";
import { blogAuthors } from "@/lib/blogAuthors";
import { articles } from "@/lib/blogData";
import { generateSitemapBundle } from "../../scripts/generate-sitemap";

const editorialPaths = [
  "/blog",
  ...articles.slice(0, 3).map((item) => `/blog/${item.slug}`),
  "/materiais-gratuitos-seguros",
  "/guias-seguros",
  "/perguntas-frequentes-seguros",
  ...materiais.map((item) => item.href),
  ...GUIAS_PILARES.map((item) => `/guias/${item.slug}`),
  ...faqCategories.map((item) => `/perguntas-frequentes-seguros/${item.id}`),
  ...blogAuthors.map((item) => `/blog/autor/${item.slug}`),
];

const locations = (xml: string) => [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

describe("Consistência de descoberta editorial", () => {
  it.each(editorialPaths)("usa o mesmo canonical e Open Graph em %s", (path) => {
    const expected = getCanonicalUrl(path);
    for (const input of [path, `${path}/`, `${path}?utm_source=teste#resposta`, path.toUpperCase(), `https://preview.lovable.app${path}/?origem=teste#resposta`]) {
      const meta = getMetadataForRoute(input);
      expect(meta?.canonical).toBe(expected);
      expect(meta?.ogUrl).toBe(expected);
      expect(expected).toBe(`${CANONICAL_BASE_URL}${path}`);
    }
  });

  it("preserva o título e o resumo editorial ao normalizar endereços de artigos", () => {
    const article = articles[0];
    const path = `/blog/${article.slug}`;
    const expected = getMetadataForRoute(path);
    expect(expected?.title).toBe(article.seoTitle || `${article.title} | Patro Seguros`);
    expect(expected?.description).toBe(article.excerpt);
    for (const input of [path.toUpperCase(), `${path}/?origem=teste#resposta`, `https://preview.lovable.app${path}`]) {
      const meta = getMetadataForRoute(input);
      expect(meta?.title).toBe(expected?.title);
      expect(meta?.description).toBe(expected?.description);
    }
  });

  it("descreve os materiais e os guias a partir do conteúdo publicado", () => {
    for (const item of materiais) {
      const meta = getMetadataForRoute(item.href);
      expect(meta?.h1).toBe(item.title);
      expect(meta?.description).toBe(clampDescription(item.description));
    }
    for (const item of GUIAS_PILARES) {
      const meta = getMetadataForRoute(`/guias/${item.slug}`);
      expect(meta?.h1).toBe(item.h1);
      expect(meta?.ogType).toBe("article");
    }
  });

  it("inclui cada documento editorial uma vez no mapa gerado", () => {
    const bundle = generateSitemapBundle(articles.map((item) => item.slug), [], [], [], blogAuthors.map((item) => item.slug));
    const urls = locations(bundle.files["sitemap.xml"]);
    for (const path of editorialPaths) {
      expect(urls.filter((url) => url === getCanonicalUrl(path))).toHaveLength(1);
    }
    expect(urls.every((url) => !/[?#]/.test(url))).toBe(true);
    expect(urls.some((url) => url.includes("/artigos/"))).toBe(false);
  });

  it("não promove busca, filtros ou âncoras a documentos no sitemap", () => {
    const invalidSlugs = ["teste?busca=auto", "teste#resposta-1", "teste/?pagina=2"];
    const bundle = generateSitemapBundle(invalidSlugs, [], [], [], []);
    const urls = locations(bundle.files["sitemap.xml"]);
    expect(urls.every((url) => !/[?#]/.test(url))).toBe(true);
    expect(urls.some((url) => url.includes("/blog/teste"))).toBe(false);
  });

  it("preserva as regras públicas de rastreamento no build", () => {
    const config = readFileSync("vite.config.ts", "utf8");
    expect(config).toMatch(/fs\.copyFileSync\(\s*path\.resolve\(__dirname, "public\/robots\.txt"\),\s*path\.join\(outDir, "robots\.txt"\)/);
    expect(config).not.toContain("const robotsTxt = [");
  });

  it("permite rastrear o conteúdo editorial sem remover as restrições privadas", () => {
    const robots = readFileSync("public/robots.txt", "utf8");
    // O primeiro grupo reúne * e os mecanismos de descoberta; os seguintes
    // continuam bloqueando os scrapers definidos pelo projeto.
    const discovery = robots.split("# Scrapers")[0];
    const disallowed = [...discovery.matchAll(/^Disallow:\s*(\S+)/gm)].map((match) => match[1]);
    for (const path of editorialPaths) {
      expect(disallowed.some((prefix) => path.startsWith(prefix))).toBe(false);
    }
    expect(disallowed).toContain("/admin/");
    expect(disallowed).toContain("/crm");
    const sitemaps = [...robots.matchAll(/^Sitemap:\s*(\S+)/gm)].map((match) => match[1]);
    expect(sitemaps).toEqual([`${CANONICAL_BASE_URL}/sitemap-index.xml`]);
  });
});
