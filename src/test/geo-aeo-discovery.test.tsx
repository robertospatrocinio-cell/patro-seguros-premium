import { readFileSync } from "node:fs";
import { URL } from "node:url";
import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import ArticleSchema from "@/components/ArticleSchema";
import { EMPRESA, NAP_STREET_ADDRESS } from "@/config/empresa";
import { perguntasPrioritarias } from "@/data/perguntasPrioritarias";

const read = (path: string) => readFileSync(new URL(`../../${path}`, import.meta.url), "utf8");
const html = read("index.html");
const schemas = Array.from(html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g),
  (match) => JSON.parse(match[1]));
const nodes = schemas.flatMap((schema) => schema["@graph"] || [schema]);

describe("GEO/AEO: identidade e descoberta no código-fonte", () => {
  it("mantém os dois nós institucionais estáticos alinhados ao cadastro", () => {
    for (const type of ["Organization", "InsuranceAgency"]) {
      const matches = nodes.filter((node) => node["@type"] === type);
      expect(matches).toHaveLength(1);
      const node = matches[0];
      expect(node.legalName).toBe(EMPRESA.razaoSocial);
      expect(node.taxID).toBe(EMPRESA.cnpj);
      expect(node.address.streetAddress).toBe(NAP_STREET_ADDRESS);
      expect(node.sameAs).toContain(EMPRESA.redesSociais.linkedin);
      expect(node.identifier.some((item: { value: string }) => item.value === EMPRESA.susep)).toBe(true);
      expect(node).not.toHaveProperty("aggregateRating");
      expect(node).not.toHaveProperty("review");
      expect(node).not.toHaveProperty("priceRange");
    }
  });

  it("usa identifier na Organization e não additionalProperty", () => {
    expect(nodes.find((node) => node["@type"] === "Organization")).not.toHaveProperty("additionalProperty");
  });

  it("liga as 12 categorias revisadas no índice complementar", () => {
    const index = read("public/llms.txt");
    expect(perguntasPrioritarias).toHaveLength(12);
    for (const category of perguntasPrioritarias) {
      expect(index).toContain(`${EMPRESA.dominioCanonico}/perguntas-frequentes-seguros/${category.id}`);
    }
    expect(index).toContain(`${EMPRESA.dominioCanonico}/politica-privacidade`);
    expect(index).not.toContain("/politica-de-privacidade");
    expect(index).toContain("Não é requisito oficial");
  });

  it("mantém a apresentação institucional e os principais serviços no índice complementar", () => {
    const index = read("public/llms.txt");
    for (const value of [EMPRESA.nomeFantasia, EMPRESA.razaoSocial, EMPRESA.cnpj, EMPRESA.susep, EMPRESA.email]) {
      expect(index).toContain(value);
    }
    for (const path of ["/servicos", "/seguros-guarulhos", "/seguro-auto", "/plano-de-saude-guarulhos", "/seguro-empresarial", "/seguro-residencial", "/seguro-agro", "/central-de-sinistro"]) {
      expect(index).toContain(`](${EMPRESA.dominioCanonico}${path})`);
    }
    expect(index).not.toContain(`](${EMPRESA.dominioCanonico}/agronegocio)`);
    expect(index).not.toContain(`](${EMPRESA.dominioCanonico}/plano-de-saude)`);
    expect(index).toContain("não há consulta automática ao Google");
    expect(index).toContain("não é prazo de assistência emergencial");
  });

  it("não reintroduz faixas de preço ou horários divergentes nos arquivos de IA", () => {
    for (const path of ["public/llms.txt", "public/llms-full.txt"]) {
      const text = read(path);
      expect(text).toContain(EMPRESA.cnpj);
      expect(text).toContain(EMPRESA.susep);
      expect(text).toContain("8h30 às 18h");
      expect(text).not.toMatch(/R\$|9h às 18h|elegível para AI Overviews/i);
      const links = text.match(/https:\/\/www\.patroseguros\.com\.br[^\s)]+/g) || [];
      expect(links.length).toBeGreaterThan(5);
      for (const link of links) expect(link).not.toMatch(/[?#]|\/$/);
    }
  });

  it("confere cada link do llms.txt contra rotas reais ou arquivos públicos", () => {
    const router = read("src/App.tsx");
    const routes = new Set(Array.from(router.matchAll(/<Route\b[^>]*\bpath="([^"]+)"/g), (match) => match[1]));
    const links = Array.from(read("public/llms.txt").matchAll(/\]\((https:\/\/www\.patroseguros\.com\.br[^)]*)\)/g), (match) => new URL(match[1]));
    expect(links.length).toBeGreaterThan(5);
    for (const { pathname } of links) {
      if (pathname.endsWith(".txt")) {
        expect(read(`public${pathname}`).trim()).not.toBe("");
      } else if (pathname.startsWith("/perguntas-frequentes-seguros/")) {
        expect(routes.has("/perguntas-frequentes-seguros/:categoria")).toBe(true);
        expect(perguntasPrioritarias.map((category) => category.id)).toContain(pathname.split("/")[2]);
      } else {
        expect(routes.has(pathname), `Rota inexistente no llms.txt: ${pathname}`).toBe(true);
      }
    }
  });

  it("preserva a descoberta pública e as restrições administrativas do grupo compartilhado", () => {
    const robots = read("public/robots.txt");
    const shared = robots.split("# Scrapers")[0];
    for (const agent of ["*", "Googlebot", "GPTBot", "OAI-SearchBot", "PerplexityBot", "ClaudeBot", "Google-Extended"]) {
      expect(shared.split("\n")).toContain(`User-agent: ${agent}`);
    }
    expect(shared.split("\n")).toContain("Allow: /");
    expect(shared).toContain("Disallow: /admin/");
    expect(shared).not.toMatch(/^Disallow: \/\s*$/m);
    expect(robots.split("\n")).toContain(`Sitemap: ${EMPRESA.dominioCanonico}/sitemap.xml`);
    expect(robots).toContain(`Sitemap: ${EMPRESA.dominioCanonico}/sitemap-index.xml`);
    expect(read("public/sitemap.xml")).toContain("<sitemapindex");
    expect(read("public/_headers")).toContain("/llms.txt\n  Content-Type: text/plain; charset=utf-8");
  });
});

describe("BlogPosting: paridade editorial e identidade do autor", () => {
  it("preserva o título completo e não fabrica habilitação nem perfis pessoais", () => {
    const headline = "Título editorial longo sobre critérios de contratação e comparação responsável de coberturas de seguro para empresas e famílias";
    const markup = renderToStaticMarkup(<ArticleSchema
      url={`${EMPRESA.dominioCanonico}/blog/exemplo`}
      headline={headline} description="Descrição editorial" image={`${EMPRESA.dominioCanonico}/images/og-cover.webp`}
      datePublished="2026-01-01" authorName="Autor de teste" authorUrl={`${EMPRESA.dominioCanonico}/blog/autor/teste`}
    />);
    const schema = JSON.parse(markup.match(/<script[^>]*>([\s\S]*?)<\/script>/)![1]);
    expect(schema["@type"]).toBe("BlogPosting");
    expect(schema.headline).toBe(headline);
    expect(schema.author).not.toHaveProperty("jobTitle");
    expect(schema.author).not.toHaveProperty("identifier");
    expect(schema.author).not.toHaveProperty("sameAs");
    expect(schema.author.worksFor).toEqual({ "@id": `${EMPRESA.dominioCanonico}/#organization` });
    expect(schema.dateModified).toBe(schema.datePublished);
  });
});
