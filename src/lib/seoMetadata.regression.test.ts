import { describe, expect, it, vi } from "vitest";
import { getMetadataForRoute } from "./seoMetadata";

vi.mock("@/lib/blogData", () => ({
  getCategoryBySlug: (slug: string) => slug === "seguro-empresarial" ? "Seguro Empresarial" : undefined,
  articles: [
    {
      slug: "guia-de-coberturas-para-empresas",
      category: "Seguro Empresarial",
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

  it("preserva o título e a descrição editoriais, sem cortes automáticos", () => {
    const metadata = getMetadataForRoute(path);
    expect(metadata?.title).toBe(
      "Seguro empresarial: como comparar coberturas, franquias e assistência para sua empresa | Patro Seguros",
    );
    expect(metadata?.socialTitle).toBe(metadata?.title);
    expect(metadata?.schema.headline).toBe(metadata?.h1);
    expect(metadata?.description).toBe(
      'Entenda a cobertura de "danos elétricos" e compare opções para proteger sua empresa sem confundir limites, franquias e exclusões.',
    );
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

  it("usa a URL oficial, a imagem externa e a atualização também no endereço antigo", () => {
    const metadata = getMetadataForRoute("/artigos/guia-de-coberturas-para-empresas");
    expect(metadata?.canonical).toBe(`https://www.patroseguros.com.br${path}`);
    expect(metadata?.ogUrl).toBe(metadata?.canonical);
    expect(metadata?.schema.image).toEqual(["https://cdn.example.com/seguro-empresarial.webp"]);
    expect(metadata?.schema.dateModified).toBe("2026-02-12T09:00:00-03:00");
    expect(metadata?.schema.headline).toBe(metadata?.h1);
  });

  it("aponta a coleção do blog diretamente para os artigos oficiais", async () => {
    const { buildBlogCollectionSchema } = await import("./collectionPageSchemas");
    const schema = buildBlogCollectionSchema([
      { slug: "guia-de-coberturas-para-empresas", title: "Seguro empresarial" },
    ], "Guias sobre seguros");
    expect(schema.mainEntity.itemListElement[0].url).toBe(`https://www.patroseguros.com.br${path}`);
  });
});

describe("SEO de categorias, autores e compartilhamento", () => {
  it("usa o nome da categoria no HTML estático em vez do caminho da rota", () => {
    const metadata = getMetadataForRoute("/blog/categoria/seguro-empresarial")!;
    expect(metadata.title).toBe("Seguro Empresarial — Artigos | Blog Patro Seguros");
    expect(metadata.h1).toBe("Seguro Empresarial");
    expect(metadata.description).toContain("Artigos da categoria Seguro Empresarial");
    expect(metadata.title).not.toContain("Categoria/");
    expect(metadata.ogUrl).toBe(metadata.canonical);
  });

  it("individualiza os dois autores e resolve suas imagens como URLs absolutas", async () => {
    const { blogAuthors } = await import("@/lib/blogAuthors");
    const titles = new Set<string>();
    for (const author of blogAuthors) {
      const metadata = getMetadataForRoute(`/blog/autor/${author.slug}`)!;
      expect(metadata.title).toBe(`${author.name} | Blog Patro Seguros`);
      expect(metadata.description).toBe(author.shortBio);
      expect(metadata.h1).toBe(author.name);
      expect(metadata.ogImage).toBe(new URL(author.image, "https://www.patroseguros.com.br/").href);
      expect(metadata.ogImageAlt).toContain(author.name);
      expect(metadata.ogUrl).toBe(metadata.canonical);
      titles.add(metadata.title);
    }
    expect(titles.size).toBe(blogAuthors.length);
  });

  it("usa a mesma imagem no compartilhamento e nos dados do artigo", () => {
    const metadata = getMetadataForRoute("/blog/guia-de-coberturas-para-empresas")!;
    expect(metadata.ogImage).toBe(metadata.schema.image[0]);
    expect(metadata.ogImageAlt).toBe(metadata.h1);
  });

  it("não inventa uma atualização diária no perfil do autor", async () => {
    const { default: source } = await import("@/pages/BlogAuthor.tsx?raw");
    expect(source).not.toContain("dateModified: new Date()");
    expect(source).toContain("image: ogImage");
  });
});

describe("Landing de seguro para lojas em shopping", () => {
  it("mantém o snippet estático alinhado ao título, à descrição e ao H1 da página", async () => {
    const { default: pageSource } = await import("@/pages/SeguroLojasShopping.tsx?raw");
    const metadata = getMetadataForRoute("/seguro-lojas-shopping")!;

    expect(metadata.title).toBe("Seguro Loja em Shopping: Estoque, RC e Lucros Cessantes");
    expect(metadata.description).toBe("Seguro para loja em shopping: estoque, incêndio, roubo, RC e lucros cessantes. Confira as exigências do contrato de locação e peça sua cotação.");
    expect(metadata.h1).toBe("Seguro para loja em shopping: proteja estoque e operação");
    expect(pageSource).toContain(`title="${metadata.title}"`);
    expect(pageSource).toContain(`metaDescription="${metadata.description}"`);
    expect(pageSource).toContain(`headline="${metadata.h1}"`);
    expect(metadata.canonical).toBe("https://www.patroseguros.com.br/seguro-lojas-shopping");
    expect(metadata.ogUrl).toBe(metadata.canonical);
    expect(metadata.description).not.toContain("2h");
  });
});

describe("Snippets comerciais revisados para intenção de cotação", () => {
  const pages = [
    { path: "/seguro-auto", load: () => import("@/pages/SeguroAuto.tsx?raw") },
    { path: "/seguro-moto", load: () => import("@/pages/SeguroMoto.tsx?raw") },
    { path: "/seguro-vida", load: () => import("@/pages/SeguroVida.tsx?raw") },
    { path: "/seguro-residencial", load: () => import("@/pages/SeguroResidencial.tsx?raw") },
    { path: "/seguro-empresarial", load: () => import("@/pages/SeguroEmpresarial.tsx?raw") },
    { path: "/planos-de-saude", load: () => import("@/pages/PlanosDeSaude.tsx?raw") },
  ];

  it.each(pages)("mantém texto completo e coerente em $path", async ({ path, load }) => {
    const { default: source } = await load();
    const metadata = getMetadataForRoute(path)!;
    expect(source).toContain(`title="${metadata.title}"`);
    expect(source).toContain(`="${metadata.description}"`);
    expect(source).toContain(metadata.h1);
    expect(metadata.title.length).toBeLessThanOrEqual(60);
    expect(metadata.description.length).toBeLessThanOrEqual(155);
    expect(metadata.description).toMatch(/\.$/);
    expect(metadata.title).toContain("Guarulhos");
    expect(metadata.title).toMatch(/\| Patro Seguros$/);
    expect(`${metadata.title} ${metadata.description}`).not.toMatch(/\d+\s*%|\d+\s*h\b|\d+\s*horas|20\+|melhor preço/i);
    expect(metadata.canonical).toBe(`https://www.patroseguros.com.br${path}`);
    expect(getMetadataForRoute(`${path}/`)?.title).toBe(metadata.title);
  });

  it("diferencia os títulos e as descrições de todas as modalidades revisadas", () => {
    const metadata = pages.map(({ path }) => getMetadataForRoute(path)!);
    expect(new Set(metadata.map(({ title }) => title)).size).toBe(pages.length);
    expect(new Set(metadata.map(({ description }) => description)).size).toBe(pages.length);
  });
});

describe("Consistência entre páginas públicas e HTML estático", () => {
  it("mantém os metadados da home iguais aos do HTML inicial", async () => {
    const { default: html } = await import("../../index.html?raw");
    const metadata = getMetadataForRoute("/")!;
    expect(html).toContain(`<title>${metadata.title}</title>`);
    expect(html).toContain(`name="description" content="${metadata.description}"`);
  });

  it("usa o título, a descrição e o H1 reais da página de seguro auto", async () => {
    const { default: source } = await import("@/pages/SeguroAuto.tsx?raw");
    const metadata = getMetadataForRoute("/seguro-auto")!;
    expect(source).toContain(`title="${metadata.title}"`);
    expect(source).toContain(`description="${metadata.description}"`);
    expect(source).toContain(metadata.h1);
  });

  it("individualiza os quatro hubs editoriais sem usar o título genérico do endereço", async () => {
    const { BLOG_CLUSTERS } = await import("@/data/blogClusters");
    const titles = new Set<string>();
    const descriptions = new Set<string>();
    for (const cluster of BLOG_CLUSTERS) {
      const path = `/blog/cluster/${cluster.slug}`;
      const metadata = getMetadataForRoute(path)!;
      expect(metadata.title).toBe(cluster.metaTitle);
      expect(metadata.description).toBe(cluster.metaDescription);
      expect(metadata.h1).toBe(cluster.h1);
      expect(metadata.ogType).toBe("website");
      expect(metadata.ogUrl).toBe(metadata.canonical);
      expect(metadata.schema.url).toBe(metadata.canonical);
      expect(metadata.schema["@type"]).toBe("CollectionPage");
      titles.add(metadata.title);
      descriptions.add(metadata.description);
    }
    expect(titles.size).toBe(BLOG_CLUSTERS.length);
    expect(descriptions.size).toBe(BLOG_CLUSTERS.length);
  });

  it("preserva a imagem externa e aponta a coleção para os artigos canônicos", () => {
    const metadata = getMetadataForRoute("/blog/cluster/seguro-empresarial")!;
    expect(metadata.ogImage).toBe("https://cdn.example.com/seguro-empresarial.webp");
    expect(metadata.ogImageAlt).toContain("Seguro Empresarial em Guarulhos");
    expect(metadata.schema.mainEntity.itemListElement[0].url).toBe(
      "https://www.patroseguros.com.br/blog/guia-de-coberturas-para-empresas",
    );
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

  it("preserva o atendimento nacional e limita os títulos dos bairros a 60 chars", () => {
    expect(getMetadataForRoute("/atendimento-nacional")?.h1).toBe("Seguros com atendimento em todo o Brasil");
    const bairro = getMetadataForRoute("/vila-nova-conceicao");
    // Auditoria title_too_long: título individualizado, dentro do limite e sem reticências.
    expect(bairro?.title.length).toBeLessThanOrEqual(60);
    expect(bairro?.title).toContain("Seguros em Vila Nova Conceição");
    expect(bairro?.title).not.toContain("...");
  });
});
