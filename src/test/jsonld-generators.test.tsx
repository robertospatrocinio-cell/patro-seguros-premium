/**
 * Unit tests para os geradores de JSON-LD.
 *
 * Garantem que as regras mínimas do Google Rich Results estão preservadas
 * antes do deploy — funcionam como um gate rápido sem precisar rebuildar
 * `dist/` para rodar `validate-google-rich-results.mjs`.
 *
 * Cobertura:
 *   1. FAQSchema        → nunca emite FAQPage com <2 Q&A, filtra strings vazias
 *   2. getMetadataForRoute (hubs)      → CollectionPage tem hasPart + mainEntity
 *      ItemList com numberOfItems e ListItem posicionados
 *   3. getMetadataForRoute (premium)   → Service com @id/serviceType/description
 *      e FAQPage com ≥2 Question quando `faqs` é definido
 */
import React from "react";
import { describe, it, expect } from "vitest";
import FAQSchema from "@/components/FAQSchema";
import { getMetadataForRoute } from "@/lib/seoMetadata";

// -------- helpers ------------------------------------------------------------

/**
 * Extrai o objeto JSON-LD do <script> renderizado dentro do <Helmet> retornado
 * por FAQSchema. Evita depender do fluxo assíncrono do react-helmet-async.
 */
function extractSchemaFromFaqComponent(el: React.ReactElement | null): unknown | null {
  if (!el) return null;
  // Helmet envolve os children; pegamos o primeiro <script type="application/ld+json">.
  const children = React.Children.toArray((el.props as any)?.children ?? []);
  const scriptEl = children.find(
    (c) => React.isValidElement(c) && (c.type as any) === "script"
  ) as React.ReactElement | undefined;
  if (!scriptEl) return null;
  const body = React.Children.toArray((scriptEl.props as any)?.children ?? []).join("");
  return JSON.parse(body);
}

function findSchemaOfType(schema: any, type: string): any | null {
  if (!schema) return null;
  const list = Array.isArray(schema) ? schema : [schema];
  return list.find((s) => s?.["@type"] === type) ?? null;
}

// -------- FAQSchema ----------------------------------------------------------

describe("FAQSchema — regras mínimas Google Rich Results", () => {
  it("retorna null quando não há FAQs", () => {
    expect(FAQSchema({ faqs: [] })).toBeNull();
  });

  it("retorna null quando há apenas 1 FAQ (Google exige ≥2)", () => {
    const el = FAQSchema({ faqs: [{ question: "Q?", answer: "A." }] });
    expect(el).toBeNull();
  });

  it("filtra Q&A com strings vazias/whitespace antes de contar", () => {
    const el = FAQSchema({
      faqs: [
        { question: "  ", answer: "só resposta" },
        { question: "Sem resposta?", answer: "" },
        { question: "Válida?", answer: "Sim." },
      ],
    });
    // Apenas 1 FAQ válida sobrou → não emite schema.
    expect(el).toBeNull();
  });

  it("emite FAQPage válido quando há ≥2 Q&A válidas", () => {
    const el = FAQSchema({
      faqs: [
        { question: "Qual a cobertura?", answer: "Completa." },
        { question: "Como cotar?", answer: "Pelo site." },
        { question: "Prazo?", answer: "24h." },
      ],
    });
    const schema = extractSchemaFromFaqComponent(el as any) as any;
    expect(schema["@context"]).toBe("https://schema.org");
    expect(schema["@type"]).toBe("FAQPage");
    expect(Array.isArray(schema.mainEntity)).toBe(true);
    expect(schema.mainEntity.length).toBeGreaterThanOrEqual(2);
    for (const q of schema.mainEntity) {
      expect(q["@type"]).toBe("Question");
      expect(typeof q.name).toBe("string");
      expect(q.name.length).toBeGreaterThan(0);
      expect(q.acceptedAnswer?.["@type"]).toBe("Answer");
      expect(typeof q.acceptedAnswer?.text).toBe("string");
      expect(q.acceptedAnswer.text.length).toBeGreaterThan(0);
    }
  });
});

// -------- Hubs (CollectionPage) ---------------------------------------------

const HUB_PATHS = ["/hub-rc", "/hub-empresarial", "/hub-patrimonio", "/hub-veiculos", "/hub-vida-saude"] as const;

describe.each(HUB_PATHS)("getMetadataForRoute(%s) — CollectionPage", (path) => {
  const meta = getMetadataForRoute(path);
  const collection = findSchemaOfType(meta?.schema, "CollectionPage");

  it("emite CollectionPage com @context e URL canônica", () => {
    expect(collection).not.toBeNull();
    expect(collection["@context"]).toBe("https://schema.org");
    expect(collection.url).toMatch(/^https:\/\/www\.patroseguros\.com\.br/);
    expect(collection.name).toBeTruthy();
    expect(collection.description?.length).toBeGreaterThan(30);
  });

  it("inclui hasPart com pelo menos 1 WebPage", () => {
    expect(Array.isArray(collection.hasPart)).toBe(true);
    expect(collection.hasPart.length).toBeGreaterThanOrEqual(1);
    for (const p of collection.hasPart) {
      expect(p["@type"]).toBe("WebPage");
      expect(p.url).toMatch(/^https:\/\//);
    }
  });

  it("inclui mainEntity ItemList com numberOfItems e ListItems posicionados", () => {
    const list = collection.mainEntity;
    expect(list?.["@type"]).toBe("ItemList");
    expect(list.numberOfItems).toBe(list.itemListElement.length);
    expect(list.numberOfItems).toBeGreaterThanOrEqual(1);
    list.itemListElement.forEach((item: any, i: number) => {
      expect(item["@type"]).toBe("ListItem");
      expect(item.position).toBe(i + 1);
      expect(item.url).toMatch(/^https:\/\//);
    });
  });
});

// -------- Premium Service + FAQPage ------------------------------------------

describe("getMetadataForRoute — premium Service + FAQPage", () => {
  const meta = getMetadataForRoute("/seguro-rc-medicos");

  it("emite Service com @id, serviceType e description", () => {
    const service = findSchemaOfType(meta?.schema, "Service");
    expect(service).not.toBeNull();
    expect(service["@id"]).toBe("https://www.patroseguros.com.br/seguro-rc-medicos#service");
    expect(service.serviceType).toBeTruthy();
    expect(service.description?.length).toBeGreaterThan(30);
    expect(service.provider?.["@type"]).toBe("InsuranceAgency");
    expect(service.url).toBe("https://www.patroseguros.com.br/seguro-rc-medicos");
  });

  it("emite FAQPage acompanhante com ≥2 Question (elegível a rich result)", () => {
    const faq = findSchemaOfType(meta?.schema, "FAQPage");
    expect(faq).not.toBeNull();
    expect(faq.mainEntity.length).toBeGreaterThanOrEqual(2);
    for (const q of faq.mainEntity) {
      expect(q["@type"]).toBe("Question");
      expect(q.acceptedAnswer?.text?.length).toBeGreaterThan(0);
    }
  });
});

// -------- Regra global: qualquer FAQPage no metadata precisa ter ≥2 Question -

describe("Contrato global: FAQPage nunca com <2 Question no metadata", () => {
  const routes = [
    "/hub-rc", "/hub-empresarial", "/hub-patrimonio", "/hub-veiculos", "/hub-vida-saude",
    "/seguro-rc-medicos", "/seguro-rc-dentistas", "/seguro-rc-advogados",
    "/seguro-residencial-alto-padrao-guarulhos", "/protecao-patrimonial-familiar-guarulhos",
    "/patro-private",
  ];
  it.each(routes)("%s — FAQPage (se existir) tem ≥2 Question", (path) => {
    const meta = getMetadataForRoute(path);
    const faq = findSchemaOfType(meta?.schema, "FAQPage");
    if (!faq) return; // rota sem FAQPage é ok
    expect(faq.mainEntity.length).toBeGreaterThanOrEqual(2);
  });
});