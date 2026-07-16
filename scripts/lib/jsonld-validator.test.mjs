import { describe, it, expect } from "vitest";
import {
  extractBlocks,
  validateBreadcrumb,
  validateLocalBusiness,
  validateOrganization,
  validateFAQ,
  validateArticle,
  validateNode,
  validateJsonLdBlock,
  validateHtml,
  validateUrls,
  validateWebSite,
  validateSiteNavigation,
} from "./jsonld-validator.mjs";

const breadcrumb = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items,
});

describe("validateWebSite — SearchAction / Sitelinks Search Box", () => {
  const validSearch = {
    "@type": "WebSite",
    name: "Patro",
    url: "https://www.patroseguros.com.br",
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: "https://www.patroseguros.com.br/?q={search_term_string}" },
      "query-input": "required name=search_term_string",
    },
  };

  it("passa com SearchAction bem-formado", () => {
    const errors = []; validateWebSite(validSearch, errors, "L", { strict: true });
    expect(errors).toEqual([]);
  });

  it("flagra name/url ausentes", () => {
    const errors = []; validateWebSite({ "@type": "WebSite" }, errors, "L");
    expect(errors.some((e) => e.includes("website.name"))).toBe(true);
    expect(errors.some((e) => e.includes("website.url"))).toBe(true);
  });

  it("strict: exige https em url", () => {
    const errors = []; validateWebSite({ ...validSearch, url: "http://x" }, errors, "L", { strict: true });
    expect(errors.some((e) => e.includes("website.url.https"))).toBe(true);
  });

  it("flagra urlTemplate sem {search_term_string}", () => {
    const errors = []; validateWebSite({
      ...validSearch,
      potentialAction: { ...validSearch.potentialAction, target: { urlTemplate: "https://x/?q=" } },
    }, errors, "L");
    expect(errors.some((e) => e.includes("searchAction.placeholder"))).toBe(true);
  });

  it("flagra query-input malformado", () => {
    const errors = []; validateWebSite({
      ...validSearch,
      potentialAction: { ...validSearch.potentialAction, "query-input": "name=q" },
    }, errors, "L");
    expect(errors.some((e) => e.includes("searchAction.queryInput"))).toBe(true);
  });

  it("é despachado por validateNode via @type WebSite", () => {
    const errors = []; validateNode({
      "@context": "https://schema.org", "@type": "WebSite", name: "X", url: "https://x",
    }, errors, "root");
    expect(errors).toEqual([]);
  });
});

describe("validateSiteNavigation", () => {
  it("aceita array de itens com name+url absoluta", () => {
    const errors = []; validateSiteNavigation([
      { "@type": "SiteNavigationElement", name: "Início", url: "https://x/" },
      { "@type": "SiteNavigationElement", name: "Sobre", url: "https://x/sobre" },
    ], errors, "L");
    expect(errors).toEqual([]);
  });

  it("flagra url relativa", () => {
    const errors = []; validateSiteNavigation(
      { "@type": "SiteNavigationElement", name: "X", url: "/x" }, errors, "L");
    expect(errors.some((e) => e.includes("siteNav.url.absolute"))).toBe(true);
  });

  it("flagra item sem name/url", () => {
    const errors = []; validateSiteNavigation(
      { "@type": "SiteNavigationElement" }, errors, "L");
    expect(errors.some((e) => e.includes("siteNav.name"))).toBe(true);
    expect(errors.some((e) => e.includes("siteNav.url"))).toBe(true);
  });

  it("é despachado via validateNode em @graph", () => {
    const errors = []; validateNode({
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "SiteNavigationElement", name: "A", url: "https://x/a" },
        { "@type": "SiteNavigationElement", name: "B", url: "/b" },
      ],
    }, errors, "root");
    expect(errors.some((e) => e.includes("siteNav.url.absolute"))).toBe(true);
  });
});

describe("extractBlocks", () => {
  it("captures every ld+json script in order", () => {
    const html = `
      <script type="application/ld+json">{"a":1}</script>
      <script>ignored</script>
      <script type='application/ld+json'>{"b":2}</script>`;
    expect(extractBlocks(html)).toEqual(['{"a":1}', '{"b":2}']);
  });

  it("returns empty array when no blocks", () => {
    expect(extractBlocks("<html></html>")).toEqual([]);
  });

  it("is reusable across calls (no stale lastIndex)", () => {
    const html = `<script type="application/ld+json">{"x":1}</script>`;
    expect(extractBlocks(html)).toHaveLength(1);
    expect(extractBlocks(html)).toHaveLength(1);
  });
});

describe("validateBreadcrumb — posições contíguas", () => {
  it("aceita 1..N contínuo", () => {
    const errors = [];
    validateBreadcrumb(breadcrumb([
      { "@type": "ListItem", position: 1, name: "Início", item: "https://x/" },
      { "@type": "ListItem", position: 2, name: "Guarulhos", item: "https://x/g" },
      { "@type": "ListItem", position: 3, name: "Aeroporto" },
    ]), errors);
    expect(errors).toEqual([]);
  });

  it("rejeita posição inicial diferente de 1", () => {
    const errors = [];
    validateBreadcrumb(breadcrumb([
      { position: 2, name: "Início", item: "https://x/" },
      { position: 3, name: "Fim" },
    ]), errors);
    expect(errors.some((e) => e.includes("position[0] esperado 1"))).toBe(true);
  });

  it("rejeita gap no meio (1,3)", () => {
    const errors = [];
    validateBreadcrumb(breadcrumb([
      { position: 1, name: "A", item: "https://x/a" },
      { position: 3, name: "C" },
    ]), errors);
    expect(errors.some((e) => e.includes("position[1] esperado 2"))).toBe(true);
  });

  it("rejeita ordem invertida (2,1)", () => {
    const errors = [];
    validateBreadcrumb(breadcrumb([
      { position: 2, name: "A", item: "https://x/a" },
      { position: 1, name: "B" },
    ]), errors);
    expect(errors.length).toBeGreaterThanOrEqual(2);
  });

  it("rejeita itemListElement vazio ou ausente", () => {
    const a = []; validateBreadcrumb({ itemListElement: [] }, a);
    const b = []; validateBreadcrumb({}, b);
    expect(a[0]).toMatch(/vazio ou ausente/);
    expect(b[0]).toMatch(/vazio ou ausente/);
  });

  it("exige name em todos e URL em todos menos o último", () => {
    const errors = [];
    validateBreadcrumb(breadcrumb([
      { position: 1, item: "https://x/" },              // sem name
      { position: 2, name: "Meio" },                     // sem URL (não é último → erro)
      { position: 3, name: "Fim" },                      // sem URL (último → ok)
    ]), errors);
    expect(errors.some((e) => e.includes("item[0] sem name"))).toBe(true);
    expect(errors.some((e) => e.includes("item[1] sem URL"))).toBe(true);
    expect(errors.some((e) => e.includes("item[2] sem URL"))).toBe(false);
  });
});

describe("validateLocalBusiness", () => {
  const base = {
    "@type": "InsuranceAgency",
    name: "Patro",
    address: { streetAddress: "Rua X, 1" },
    telephone: "+551199",
  };

  it("passa com campos mínimos", () => {
    const errors = []; validateLocalBusiness(base, errors, "L");
    expect(errors).toEqual([]);
  });

  it("flagra address.streetAddress ausente", () => {
    const errors = []; validateLocalBusiness({ ...base, address: {} }, errors, "L");
    expect(errors[0]).toMatch(/streetAddress ausente/);
  });

  it("flagra ratingValue inválido", () => {
    const errors = [];
    validateLocalBusiness({ ...base, aggregateRating: { ratingValue: "abc" } }, errors, "L");
    expect(errors[0]).toMatch(/ratingValue inválido/);
  });

  it("flagra review sem author", () => {
    const errors = [];
    validateLocalBusiness({ ...base, review: [{ reviewRating: { ratingValue: 5 } }] }, errors, "L");
    expect(errors.some((e) => e.includes("sem author"))).toBe(true);
  });
});

describe("validateFAQ", () => {
  it("exige name + acceptedAnswer.text em cada Q", () => {
    const errors = [];
    validateFAQ({
      mainEntity: [
        { name: "OK?", acceptedAnswer: { text: "sim" } },
        { acceptedAnswer: { text: "x" } },
        { name: "Faltando resposta?" },
      ],
    }, errors, "L");
    expect(errors.some((e) => e.includes("question[1] sem name"))).toBe(true);
    expect(errors.some((e) => e.includes("question[2] sem acceptedAnswer.text"))).toBe(true);
  });
});

describe("validateNode / validateJsonLdBlock", () => {
  it("exige @context e @type", () => {
    const e1 = []; validateNode({ "@type": "Thing" }, e1);
    expect(e1[0]).toMatch(/@context/);
    const e2 = []; validateNode({ "@context": "https://schema.org" }, e2);
    expect(e2[0]).toMatch(/@type/);
  });

  it("aceita arrays de nós", () => {
    const errors = [];
    validateNode([
      { "@context": "https://schema.org", "@type": "WebSite" },
      breadcrumb([
        { position: 1, name: "Início", item: "https://x/" },
        { position: 2, name: "Fim" },
      ]),
    ], errors);
    expect(errors).toEqual([]);
  });

  it("retorna erro de parse para JSON quebrado", () => {
    const errors = validateJsonLdBlock("{ not json", "x");
    expect(errors[0]).toMatch(/JSON inválido/);
  });
});

describe("validateHtml — integração", () => {
  it("conta blocos e propaga erros", () => {
    const html = `
      <script type="application/ld+json">${JSON.stringify(breadcrumb([
        { position: 1, name: "Início", item: "https://x/" },
        { position: 2, name: "Fim" },
      ]))}</script>
      <script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [] })}</script>`;
    const { blocks, errors } = validateHtml(html, "test.html");
    expect(blocks).toBe(2);
    expect(errors.some((e) => e.includes("FAQPage: mainEntity vazio"))).toBe(true);
  });

  it("retorna zero erros para página válida", () => {
    const html = `<script type="application/ld+json">${JSON.stringify({
      "@context": "https://schema.org",
      "@type": "InsuranceAgency",
      name: "Patro",
      address: { streetAddress: "Rua X" },
      telephone: "+5511",
    })}</script>`;
    expect(validateHtml(html).errors).toEqual([]);
  });
});

describe("validateArticle / BlogPosting", () => {
  const base = {
    "@type": "BlogPosting",
    headline: "Como contratar seguro de galpão em Guarulhos",
    author: { "@type": "Person", name: "Roberto Patrocínio" },
    datePublished: "2026-06-26",
    image: "https://x/cover.webp",
  };

  it("passa com campos mínimos", () => {
    const errors = []; validateArticle(base, errors, "L");
    expect(errors).toEqual([]);
  });

  it("aceita author como string", () => {
    const errors = []; validateArticle({ ...base, author: "Sandra" }, errors, "L");
    expect(errors).toEqual([]);
  });

  it("aceita author como array de objetos", () => {
    const errors = []; validateArticle({ ...base, author: [{ name: "A" }, { name: "B" }] }, errors, "L");
    expect(errors).toEqual([]);
  });

  it("aceita image como array ou ImageObject", () => {
    const e1 = []; validateArticle({ ...base, image: ["https://x/a.webp"] }, e1, "L");
    const e2 = []; validateArticle({ ...base, image: { "@type": "ImageObject", url: "https://x/b.webp" } }, e2, "L");
    expect(e1).toEqual([]); expect(e2).toEqual([]);
  });

  it("flagra headline ausente", () => {
    const errors = []; validateArticle({ ...base, headline: "" }, errors, "L");
    expect(errors[0]).toMatch(/faltando headline/);
  });

  it("flagra headline > 110 chars", () => {
    const errors = []; validateArticle({ ...base, headline: "x".repeat(111) }, errors, "L");
    expect(errors.some((e) => e.includes("> 110 chars"))).toBe(true);
  });

  it("flagra author ausente ou objeto sem name", () => {
    const e1 = []; validateArticle({ ...base, author: undefined }, e1, "L");
    const e2 = []; validateArticle({ ...base, author: { "@type": "Person" } }, e2, "L");
    expect(e1.some((e) => e.includes("faltando author"))).toBe(true);
    expect(e2.some((e) => e.includes("faltando author"))).toBe(true);
  });

  it("flagra datePublished ausente ou em formato inválido", () => {
    const e1 = []; validateArticle({ ...base, datePublished: undefined }, e1, "L");
    const e2 = []; validateArticle({ ...base, datePublished: "26/06/2026" }, e2, "L");
    expect(e1.some((e) => e.includes("faltando datePublished"))).toBe(true);
    expect(e2.some((e) => e.includes("ISO 8601"))).toBe(true);
  });

  it("aceita datePublished com timezone", () => {
    const errors = []; validateArticle({ ...base, datePublished: "2026-06-26T10:00:00-03:00" }, errors, "L");
    expect(errors).toEqual([]);
  });

  it("flagra dateModified inválido quando presente", () => {
    const errors = []; validateArticle({ ...base, dateModified: "ontem" }, errors, "L");
    expect(errors.some((e) => e.includes("dateModified"))).toBe(true);
  });

  it("flagra image ausente", () => {
    const errors = []; validateArticle({ ...base, image: undefined }, errors, "L");
    expect(errors.some((e) => e.includes("faltando image"))).toBe(true);
  });

  it("é despachado por validateNode via @type BlogPosting/Article/NewsArticle", () => {
    const post = { "@context": "https://schema.org", ...base };
    const news = { "@context": "https://schema.org", ...base, "@type": "NewsArticle" };
    const art = { "@context": "https://schema.org", ...base, "@type": "Article", headline: undefined };
    const e1 = []; validateNode(post, e1);
    const e2 = []; validateNode(news, e2);
    const e3 = []; validateNode(art, e3);
    expect(e1).toEqual([]); expect(e2).toEqual([]);
    expect(e3.some((e) => e.includes("faltando headline"))).toBe(true);
  });
});

describe("Rich results — modo estrito (eligibility)", () => {
  it("Breadcrumb: exige ao menos 2 itens", () => {
    const errors = [];
    validateBreadcrumb(breadcrumb([{ position: 1, name: "Só" }]), errors);
    expect(errors.some((e) => e.includes("ao menos 2 itens"))).toBe(true);
  });

  it("Breadcrumb: rejeita item.item não absoluto", () => {
    const errors = [];
    validateBreadcrumb(breadcrumb([
      { position: 1, name: "A", item: "/relative" },
      { position: 2, name: "B" },
    ]), errors);
    expect(errors.some((e) => e.includes("URL absoluta"))).toBe(true);
  });

  it("LocalBusiness estrito: exige url, image/logo, addressLocality/Region/Country", () => {
    const errors = [];
    validateLocalBusiness({
      "@type": "InsuranceAgency",
      name: "X", telephone: "+55", address: { streetAddress: "R" },
    }, errors, "L", { strict: true });
    expect(errors.some((e) => e.includes("exigem url"))).toBe(true);
    expect(errors.some((e) => e.includes("image ou logo"))).toBe(true);
    expect(errors.some((e) => e.includes("addressLocality"))).toBe(true);
    expect(errors.some((e) => e.includes("addressRegion"))).toBe(true);
    expect(errors.some((e) => e.includes("addressCountry"))).toBe(true);
  });

  it("LocalBusiness estrito: geo fora de faixa é rejeitado", () => {
    const errors = [];
    validateLocalBusiness({
      "@type": "InsuranceAgency", name: "X", telephone: "+55",
      url: "https://x", image: "https://x/i.png",
      address: { streetAddress: "R", addressLocality: "G", addressRegion: "SP", addressCountry: "BR" },
      geo: { latitude: 999, longitude: 0 },
    }, errors, "L", { strict: true });
    expect(errors.some((e) => e.includes("geo.latitude"))).toBe(true);
  });

  it("LocalBusiness estrito: openingHours HH:MM inválido é rejeitado", () => {
    const errors = [];
    validateLocalBusiness({
      "@type": "InsuranceAgency", name: "X", telephone: "+55",
      url: "https://x", image: "https://x/i.png",
      address: { streetAddress: "R", addressLocality: "G", addressRegion: "SP", addressCountry: "BR" },
      openingHoursSpecification: [{ opens: "9h", closes: "18:00" }],
    }, errors, "L", { strict: true });
    expect(errors.some((e) => e.includes("opens formato inválido"))).toBe(true);
  });

  it("Organization estrito: exige url, logo e sameAs", () => {
    const errors = [];
    validateOrganization({ "@type": "Organization", name: "X" }, errors, "L", { strict: true });
    expect(errors.some((e) => e.includes("exigem url"))).toBe(true);
    expect(errors.some((e) => e.includes("logo"))).toBe(true);
    expect(errors.some((e) => e.includes("sameAs"))).toBe(true);
  });

  it("Organization estrito: contactPoint incompleto é rejeitado", () => {
    const errors = [];
    validateOrganization({
      "@type": "Organization", name: "X", url: "https://x",
      logo: "https://x/logo.png", sameAs: ["https://x"],
      contactPoint: [{ telephone: "+55" }],
    }, errors, "L", { strict: true });
    expect(errors.some((e) => e.includes("contactType"))).toBe(true);
  });

  it("validateNode passa options.strict aos validadores", () => {
    const errors = [];
    validateNode({
      "@context": "https://schema.org", "@type": "Organization", name: "X",
    }, errors, "root", { strict: true });
    expect(errors.some((e) => e.includes("Organization"))).toBe(true);
  });

  it("Modo não-estrito preserva compat: LocalBusiness mínimo continua válido", () => {
    const errors = [];
    validateLocalBusiness({
      "@type": "InsuranceAgency", name: "X", telephone: "+55",
      address: { streetAddress: "R" },
    }, errors, "L");
    expect(errors).toEqual([]);
  });
});

describe("validateUrls — URLs absolutas https e host canônico", () => {
  const H = "www.patroseguros.com.br";

  it("aceita URLs https absolutas com host canônico", () => {
    const errors = [];
    validateUrls({
      "@id": "https://www.patroseguros.com.br/#org",
      url: "https://www.patroseguros.com.br/sobre",
      logo: "https://www.patroseguros.com.br/logo.png",
      sameAs: ["https://facebook.com/patro", "https://instagram.com/patro"],
    }, errors, "L", { strict: true, canonicalHost: H });
    expect(errors).toEqual([]);
  });

  it("aceita fragmentos e URNs em @id", () => {
    const errors = [];
    validateUrls({ "@id": "#organization" }, errors, "L", { strict: true, canonicalHost: H });
    expect(errors).toEqual([]);
  });

  it("rejeita URL relativa em url/logo/@id", () => {
    const errors = [];
    validateUrls({ url: "/sobre", logo: "images/logo.png", "@id": "//x.com" }, errors, "L");
    expect(errors.some((e) => e.includes("url.absolute"))).toBe(true);
    expect(errors.filter((e) => e.includes("url.absolute")).length).toBeGreaterThanOrEqual(2);
  });

  it("strict: rejeita http:// (exige https)", () => {
    const errors = [];
    validateUrls({ url: "http://www.patroseguros.com.br/x" }, errors, "L",
      { strict: true, canonicalHost: H });
    expect(errors.some((e) => e.includes("url.https"))).toBe(true);
  });

  it("canonicalHost: rejeita host irmão (apex sem www)", () => {
    const errors = [];
    validateUrls({ url: "https://patroseguros.com.br/sobre" }, errors, "L",
      { strict: true, canonicalHost: H });
    expect(errors.some((e) => e.includes("url.canonicalHost"))).toBe(true);
  });

  it("canonicalHost: aceita hosts externos (schema.org, redes sociais)", () => {
    const errors = [];
    validateUrls({
      "@context": "https://schema.org",
      sameAs: ["https://linkedin.com/company/patro"],
    }, errors, "L", { strict: true, canonicalHost: H });
    // schema.org está em @context (não em URL_FIELDS), então nem é checado.
    // linkedin.com não é host irmão → aceito.
    expect(errors).toEqual([]);
  });

  it("valida item[] dentro de itemListElement (Breadcrumb) via URL_FIELDS", () => {
    const errors = [];
    validateUrls({
      "@type": "BreadcrumbList",
      itemListElement: [
        { position: 1, name: "A", item: "http://patroseguros.com.br/" },
        { position: 2, name: "B", item: "https://www.patroseguros.com.br/b" },
      ],
    }, errors, "L", { strict: true, canonicalHost: H });
    expect(errors.some((e) => e.includes("url.https"))).toBe(true);
    expect(errors.some((e) => e.includes("url.canonicalHost"))).toBe(true);
  });

  it("valida logo como ImageObject (extrai url interna)", () => {
    const errors = [];
    validateUrls({
      logo: { "@type": "ImageObject", url: "/logo.png" },
    }, errors, "L", { strict: true, canonicalHost: H });
    expect(errors.some((e) => e.includes("url.absolute"))).toBe(true);
  });

  it("integra em validateNode com strict/canonicalHost", () => {
    const errors = [];
    validateNode({
      "@context": "https://schema.org",
      "@type": "WebSite",
      url: "http://patroseguros.com.br",
    }, errors, "root", { strict: true, canonicalHost: H });
    expect(errors.some((e) => e.includes("url.https"))).toBe(true);
    expect(errors.some((e) => e.includes("url.canonicalHost"))).toBe(true);
  });
});