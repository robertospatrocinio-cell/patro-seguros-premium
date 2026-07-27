import { describe, it, expect } from "vitest";
import {
  checkBreadcrumbList,
  checkFAQPage,
  checkOrganization,
  checkCollectionPage,
  CHECKERS,
} from "./rich-results-checkers.mjs";

/**
 * Testes de regressão para as regras de Google Rich Results.
 *
 * Cobertura: BreadcrumbList, FAQPage e Organization — os três tipos
 * emitidos globalmente pelo site (em quase todas as rotas). Uma
 * regressão silenciosa aqui invalidaria centenas de páginas nos
 * relatórios de elegibilidade, então travamos o contrato explicitamente.
 */

const ok = (r) => r.req.length === 0;

describe("CHECKERS registry", () => {
  it("expõe os três tipos globais + aliases", () => {
    expect(CHECKERS.BreadcrumbList).toBe(checkBreadcrumbList);
    expect(CHECKERS.FAQPage).toBe(checkFAQPage);
    expect(CHECKERS.QAPage).toBe(checkFAQPage);
    expect(CHECKERS.Organization).toBe(checkOrganization);
    // InsuranceAgency é usado em todas as rotas locais — deve resolver
    // para o checker de LocalBusiness (não Organization).
    expect(typeof CHECKERS.InsuranceAgency).toBe("function");
  });
});

// ---------- BreadcrumbList ---------------------------------------------------

describe("checkBreadcrumbList", () => {
  const validItems = [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.patroseguros.com.br/" },
    { "@type": "ListItem", position: 2, name: "Seguros", item: "https://www.patroseguros.com.br/seguros" },
    { "@type": "ListItem", position: 3, name: "Auto" }, // último pode omitir URL
  ];

  it("aprova breadcrumb válido de 3 níveis", () => {
    const r = checkBreadcrumbList({ itemListElement: validItems });
    expect(ok(r)).toBe(true);
    expect(r.rec).toEqual([]);
  });

  it("rejeita itemListElement ausente ou vazio", () => {
    expect(checkBreadcrumbList({}).req[0]).toMatch(/itemListElement/);
    expect(checkBreadcrumbList({ itemListElement: [] }).req[0]).toMatch(/itemListElement/);
  });

  it("rejeita menos de 2 itens (Google exige ≥ 2)", () => {
    const r = checkBreadcrumbList({ itemListElement: [validItems[0]] });
    expect(r.req.some((m) => /≥ 2 itens/.test(m))).toBe(true);
  });

  it("rejeita position fora da ordem", () => {
    const bad = [
      { "@type": "ListItem", position: 1, name: "A", item: "https://x.com/a" },
      { "@type": "ListItem", position: 3, name: "B", item: "https://x.com/b" },
    ];
    expect(checkBreadcrumbList({ itemListElement: bad }).req.some((m) => /position\[1\]/.test(m))).toBe(true);
  });

  it("rejeita item sem name", () => {
    const bad = [
      { "@type": "ListItem", position: 1, item: "https://x.com/a" },
      { "@type": "ListItem", position: 2, name: "B" },
    ];
    expect(checkBreadcrumbList({ itemListElement: bad }).req.some((m) => /sem name/.test(m))).toBe(true);
  });

  it("rejeita URL relativa/não-absoluta em item não-terminal", () => {
    const bad = [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      { "@type": "ListItem", position: 2, name: "Auto", item: "https://x.com/auto" },
    ];
    expect(checkBreadcrumbList({ itemListElement: bad }).req.some((m) => /URL absoluta/.test(m))).toBe(true);
  });

  it("aceita item como objeto com @id absoluto", () => {
    const items = [
      { "@type": "ListItem", position: 1, name: "Home", item: { "@id": "https://x.com/", name: "Home" } },
      { "@type": "ListItem", position: 2, name: "Auto" },
    ];
    expect(ok(checkBreadcrumbList({ itemListElement: items }))).toBe(true);
  });
});

// ---------- FAQPage ----------------------------------------------------------

describe("checkFAQPage", () => {
  const q = (name, text) => ({
    "@type": "Question",
    name,
    acceptedAnswer: { "@type": "Answer", text },
  });

  it("aprova FAQPage com ≥ 2 Question válidas", () => {
    const r = checkFAQPage({ mainEntity: [q("P1?", "R1"), q("P2?", "R2")] });
    expect(ok(r)).toBe(true);
    expect(r.rec).toEqual([]);
  });

  it("rejeita mainEntity vazio (required)", () => {
    expect(checkFAQPage({ mainEntity: [] }).req[0]).toMatch(/mainEntity vazio/);
    expect(checkFAQPage({}).req[0]).toMatch(/mainEntity vazio/);
  });

  it("emite warn (não required) quando há só 1 Question — Google recomenda ≥ 2", () => {
    const r = checkFAQPage({ mainEntity: [q("P1?", "R1")] });
    expect(r.req).toEqual([]);
    expect(r.rec.some((m) => /≥ 2 Question/.test(m))).toBe(true);
  });

  it("rejeita @type diferente de Question / Answer", () => {
    const bad = { mainEntity: [
      { "@type": "Thing", name: "P1?", acceptedAnswer: { "@type": "Answer", text: "R" } },
      q("P2?", "R2"),
    ] };
    expect(checkFAQPage(bad).req.some((m) => /≠ Question/.test(m))).toBe(true);

    const bad2 = { mainEntity: [
      { "@type": "Question", name: "P1?", acceptedAnswer: { "@type": "Comment", text: "R" } },
      q("P2?", "R2"),
    ] };
    expect(checkFAQPage(bad2).req.some((m) => /≠ Answer/.test(m))).toBe(true);
  });

  it("rejeita name ou acceptedAnswer.text vazio", () => {
    expect(checkFAQPage({ mainEntity: [q("", "R"), q("P2?", "R2")] })
      .req.some((m) => /name ausente/.test(m))).toBe(true);
    expect(checkFAQPage({ mainEntity: [q("P1?", "   "), q("P2?", "R2")] })
      .req.some((m) => /text ausente/.test(m))).toBe(true);
  });

  it("emite warn quando name > 300 chars", () => {
    const long = "x".repeat(301);
    const r = checkFAQPage({ mainEntity: [q(long, "R"), q("P2?", "R2")] });
    expect(r.req).toEqual([]);
    expect(r.rec.some((m) => /> 300 chars/.test(m))).toBe(true);
  });
});

// ---------- Organization -----------------------------------------------------

describe("checkOrganization", () => {
  const valid = {
    "@type": "Organization",
    name: "Patro Seguros",
    url: "https://www.patroseguros.com.br",
    logo: "https://www.patroseguros.com.br/logo.png",
    sameAs: ["https://www.instagram.com/patroseguros"],
  };

  it("aprova Organization completa", () => {
    const r = checkOrganization(valid);
    expect(ok(r)).toBe(true);
    expect(r.rec).toEqual([]);
  });

  it("rejeita name ausente", () => {
    expect(checkOrganization({ ...valid, name: undefined })
      .req.some((m) => /name ausente/.test(m))).toBe(true);
  });

  it("rejeita url relativa ou ausente", () => {
    expect(checkOrganization({ ...valid, url: "/" })
      .req.some((m) => /url absoluta/.test(m))).toBe(true);
    expect(checkOrganization({ ...valid, url: undefined })
      .req.some((m) => /url absoluta/.test(m))).toBe(true);
  });

  it("rejeita logo ausente/relativa (bloqueia rich result de Logo)", () => {
    expect(checkOrganization({ ...valid, logo: undefined })
      .req.some((m) => /logo absoluta/.test(m))).toBe(true);
    expect(checkOrganization({ ...valid, logo: "/logo.png" })
      .req.some((m) => /logo absoluta/.test(m))).toBe(true);
  });

  it("aceita logo como ImageObject com url absoluta", () => {
    const r = checkOrganization({
      ...valid,
      logo: { "@type": "ImageObject", url: "https://www.patroseguros.com.br/logo.png" },
    });
    expect(ok(r)).toBe(true);
  });

  it("emite warn (não required) quando sameAs está ausente ou vazio", () => {
    const r1 = checkOrganization({ ...valid, sameAs: undefined });
    expect(r1.req).toEqual([]);
    expect(r1.rec.some((m) => /sameAs/.test(m))).toBe(true);

    const r2 = checkOrganization({ ...valid, sameAs: [] });
    expect(r2.rec.some((m) => /sameAs/.test(m))).toBe(true);
  });
});

// ---------- CollectionPage --------------------------------------------------

describe("checkCollectionPage", () => {
  const base = { name: "Hub RC", url: "https://www.patroseguros.com.br/hub-rc" };

  it("rejeita name ausente", () => {
    expect(checkCollectionPage({ url: base.url }).req[0]).toMatch(/name/);
  });

  it("aprova coleção com hasPart", () => {
    const r = checkCollectionPage({ ...base, hasPart: [{ "@type": "WebPage", url: base.url }] });
    expect(ok(r)).toBe(true);
    expect(r.rec).toEqual([]);
  });

  it("aprova coleção com mainEntity ItemList", () => {
    const r = checkCollectionPage({
      ...base,
      mainEntity: { "@type": "ItemList", itemListElement: [{ "@type": "ListItem", position: 1 }] },
    });
    expect(r.rec).toEqual([]);
  });

  it("emite warn quando a URL é de hub (/hub-*) e faltam hasPart/mainEntity", () => {
    const r = checkCollectionPage(base);
    expect(r.rec.some((m) => /hasPart ou mainEntity/.test(m))).toBe(true);
  });

  it("emite warn quando há sinais de coleção (numberOfItems) mas faltam hasPart/mainEntity", () => {
    const r = checkCollectionPage({
      name: "X",
      url: "https://www.patroseguros.com.br/qualquer-rota",
      numberOfItems: 12,
    });
    expect(r.rec.some((m) => /hasPart ou mainEntity/.test(m))).toBe(true);
  });

  it("NÃO emite warn quando a rota não parece hub e não há sinais de coleção", () => {
    const r = checkCollectionPage({
      name: "Landing genérica",
      url: "https://www.patroseguros.com.br/depoimentos-clientes",
    });
    expect(r.req).toEqual([]);
    expect(r.rec).toEqual([]);
  });

  it("reconhece /seguradoras, /seguradoras-parceiras e /artigos como hub", () => {
    for (const p of ["/seguradoras", "/seguradoras-parceiras", "/artigos"]) {
      const r = checkCollectionPage({ name: "X", url: `https://www.patroseguros.com.br${p}` });
      expect(r.rec.some((m) => /hasPart ou mainEntity/.test(m))).toBe(true);
    }
  });
});