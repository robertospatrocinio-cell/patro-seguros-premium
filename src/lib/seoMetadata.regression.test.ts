import { describe, expect, it, vi } from "vitest";
import { getMetadataForRoute } from "./seoMetadata";

vi.mock("@/lib/blogData", () => ({
  articles: [
    {
      slug: "guia-de-coberturas-para-empresas",
      title: "Seguro empresarial: como comparar coberturas, franquias e assistência para sua empresa",
      excerpt: 'Entenda a cobertura de "danos elétricos" e compare opções para proteger sua empresa sem confundir limites, franquias e exclusões.',
      date: "2026-01-10",
      updatedAt: "2026-02-12",
      author: "Equipe Patro Seguros",
    },
  ],
}));

vi.mock("@/lib/blogImages", () => ({
  getArticleImage: () => "https://cdn.example.com/seguro-empresarial.webp",
}));

describe("Metadados estáticos dos artigos", () => {
  const path = "/blog/guia-de-coberturas-para-empresas";

  it("preserva o título editorial completo, sem cortes arbitrários", () => {
    const metadata = getMetadataForRoute(path);
    expect(metadata?.title).toBe(
      "Seguro empresarial: como comparar coberturas, franquias e assistência para sua empresa | Patro Seguros",
    );
    expect(metadata?.schema.headline).toBe(metadata?.h1);
    expect(metadata?.description).toContain('"danos elétricos"');
  });

  it("mantém uma URL canônica comum ao compartilhamento e aos dados do artigo", () => {
    const metadata = getMetadataForRoute(path);
    expect(metadata?.canonical).toBe(`https://www.patroseguros.com.br${path}`);
    expect(metadata?.ogUrl).toBe(metadata?.canonical);
    expect(metadata?.schema.mainEntityOfPage["@id"]).toBe(metadata?.canonical);
  });

  it("preserva imagens externas e a data real da atualização", () => {
    const metadata = getMetadataForRoute(path);
    expect(metadata?.schema.image).toEqual(["https://cdn.example.com/seguro-empresarial.webp"]);
    expect(metadata?.schema.datePublished).toBe("2026-01-10T09:00:00-03:00");
    expect(metadata?.schema.dateModified).toBe("2026-02-12T09:00:00-03:00");
  });
});

describe("Metadados regionais sem títulos genéricos ou cortes", () => {
  it("individualiza as regiões, as 27 UFs e todas as cidades do atendimento nacional", async () => {
    const { regioesNacionais, estadosNacionais, cidadesNacionais, regiaoPath, estadoPath, cidadePath } = await import("@/data/atendimentoNacional");
    const entries = [
      ...regioesNacionais.map((r) => ({ path: regiaoPath(r.slug), name: r.titulo })),
      ...estadosNacionais.map((e) => ({ path: estadoPath(e.slug), name: e.nome })),
      ...cidadesNacionais.map((c) => ({ path: cidadePath(c.slug), name: `${c.nome} - ${c.estado.uf}` })),
    ];
    const titles = new Set<string>();
    const descriptions = new Set<string>();
    for (const { path, name } of entries) {
      const metadata = getMetadataForRoute(path)!;
      expect(metadata.title).toContain(name);
      expect(metadata.h1).toContain(name);
      expect(metadata.description).toContain(name);
      expect(metadata.title).not.toContain("em Guarulhos");
      expect(metadata.title).not.toContain("...");
      expect(metadata.description).not.toContain("...");
      expect(metadata.canonical).toBe(`https://www.patroseguros.com.br${path}`);
      expect(metadata.ogUrl).toBe(metadata.canonical);
      titles.add(metadata.title);
      descriptions.add(metadata.description);
    }
    expect(titles.size).toBe(entries.length);
    expect(descriptions.size).toBe(entries.length);
  });

  it("preserva o atendimento nacional e títulos completos dos bairros", () => {
    expect(getMetadataForRoute("/atendimento-nacional")?.h1).toBe("Seguros com atendimento em todo o Brasil");
    expect(getMetadataForRoute("/vila-nova-conceicao")?.title).toBe(
      "Seguros em Vila Nova Conceição | Auto, Residencial e Empresarial | Patro Seguros",
    );
  });
});
