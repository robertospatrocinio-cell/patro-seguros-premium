import { describe, expect, it } from "vitest";
import { CANONICAL_BASE_URL, getCanonicalPathUrl, getCanonicalUrl } from "../canonical";
import { buildBlogCollectionSchema } from "../collectionPageSchemas";

describe("canonical explícito de coleção", () => {
  it.each([
    ["/", CANONICAL_BASE_URL],
    ["", CANONICAL_BASE_URL],
    ["/BLOG/", `${CANONICAL_BASE_URL}/blog`],
    ["blog/?page=2", `${CANONICAL_BASE_URL}/blog?page=2`],
    ["/BLOG/?page=3#artigos", `${CANONICAL_BASE_URL}/blog?page=3`],
    ["/blog?tema=RCProfissional", `${CANONICAL_BASE_URL}/blog?tema=RCProfissional`],
    ["/blog#artigos", `${CANONICAL_BASE_URL}/blog`],
    ["/blog?", `${CANONICAL_BASE_URL}/blog`],
  ])("normaliza %s sem alterar os valores da consulta", (path, expected) => {
    expect(getCanonicalPathUrl(path)).toBe(expected);
  });

  it("mantém a remoção de consultas e fragmentos no helper padrão", () => {
    expect(getCanonicalUrl("/BLOG/?utm_source=Teste#artigos"))
      .toBe(`${CANONICAL_BASE_URL}/blog`);
  });
});

describe("coleção do blog por página", () => {
  const articles = [
    { slug: "seguro-auto", title: "Guia de seguro auto" },
    { slug: "seguro-vida", title: "Guia de seguro de vida" },
  ];

  it("usa o canonical paginado e somente os artigos fornecidos pela página", () => {
    const schema = buildBlogCollectionSchema(articles, "Guias da página 2", "/blog?page=2");
    expect(schema.url).toBe(`${CANONICAL_BASE_URL}/blog?page=2`);
    expect(schema["@id"]).toBe(`${schema.url}#collection`);
    expect(schema.mainEntity["@id"]).toBe(`${schema.url}#itemlist`);
    expect(schema.mainEntity.numberOfItems).toBe(2);
    expect(schema.mainEntity.itemListElement.map((item) => item.url)).toEqual([
      `${CANONICAL_BASE_URL}/blog/seguro-auto`,
      `${CANONICAL_BASE_URL}/blog/seguro-vida`,
    ]);
    expect(schema.mainEntity.itemListElement.map((item) => item.position)).toEqual([1, 2]);
  });

  it("preserva o endereço padrão para quem não fornece paginação", () => {
    expect(buildBlogCollectionSchema(articles, "Guias recentes").url)
      .toBe(`${CANONICAL_BASE_URL}/blog`);
  });
});
