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
