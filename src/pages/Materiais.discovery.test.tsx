import { describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import CentralDeMateriais from "./CentralDeMateriais";
import MaterialDetalhe from "./MaterialDetalhe";
import { materiais } from "@/data/materiaisData";
import { materiaisConteudo } from "@/data/materiaisConteudoData";
import { CANONICAL_BASE_URL } from "@/lib/canonical";

vi.mock("@/components/PageMeta", () => ({ default: () => null }));
vi.mock("@/lib/leadsApi", () => ({ submitLead: vi.fn() }));
vi.mock("@/lib/tracking", () => ({ trackCotacaoSubmit: vi.fn() }));

const parse = (html: string) => new DOMParser().parseFromString(html, "text/html");
const schemas = (document: Document) => Array.from(
  document.querySelectorAll('script[type="application/ld+json"]'),
  (script) => JSON.parse(script.textContent!),
);

describe("Descoberta dos materiais gratuitos", () => {
  it("oferece no HTML um link direto para cada material descrito na coleção", () => {
    const document = parse(renderToStaticMarkup(
      <MemoryRouter><CentralDeMateriais /></MemoryRouter>,
    ));
    const collection = schemas(document).find((schema) => schema["@type"] === "CollectionPage");
    expect(collection.inLanguage).toBe("pt-BR");
    expect(collection.mainEntity.numberOfItems).toBe(materiais.length);
    expect(collection.mainEntity.itemListElement).toEqual(materiais.map((material, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: material.title,
      description: material.description,
      url: `${CANONICAL_BASE_URL}${material.href}`,
    })));
    expect(document.querySelectorAll("h1")).toHaveLength(1);
    expect(document.querySelectorAll("ol > li")).toHaveLength(materiais.length);
    for (const material of materiais) {
      expect(document.querySelector(`h3 a[href="${material.href}"]`)?.textContent).toBe(material.title);
      expect(document.querySelector(`a[aria-label="Abrir ${material.title}"]`)?.getAttribute("href")).toBe(material.href);
    }
  });

  it.each(materiais)("mantém itens, respostas e destinos no HTML: $slug", (material) => {
    const document = parse(renderToStaticMarkup(
      <MemoryRouter initialEntries={[material.href]}>
        <Routes><Route path="/materiais/:slug" element={<MaterialDetalhe />} /></Routes>
      </MemoryRouter>,
    ));
    const content = materiaisConteudo[material.slug];
    const structured = schemas(document);
    const howTo = structured.find((schema) => schema["@type"] === "HowTo");
    const faq = structured.find((schema) => schema["@type"] === "FAQPage");
    expect(document.querySelectorAll("h1")).toHaveLength(1);
    expect(howTo.totalTime).toBeUndefined();
    expect(howTo.step).toHaveLength(content.checklist.length);
    content.checklist.forEach((section, si) => {
      const stepSection = howTo.step[si];
      expect(stepSection.name).toBe(section.title);
      expect(document.getElementById(new URL(stepSection.url).hash.slice(1))).not.toBeNull();
      expect(stepSection.itemListElement).toHaveLength(section.items.length);
      section.items.forEach((item, ii) => {
        const step = stepSection.itemListElement[ii];
        expect(step.text).toBe(item);
        expect(document.getElementById(new URL(step.url).hash.slice(1))?.textContent).toContain(item);
      });
    });
    expect(document.querySelectorAll("details")).toHaveLength(content.faqs.length);
    expect(faq.mainEntity).toHaveLength(content.faqs.length);
    content.faqs.forEach((answer, index) => {
      const question = faq.mainEntity[index];
      const details = document.getElementById(new URL(question.url).hash.slice(1));
      expect(question.name).toBe(answer.q);
      expect(question.acceptedAnswer.text).toBe(answer.a);
      expect(details?.querySelector("h3")?.textContent).toBe(answer.q);
      expect(details?.querySelector("p")?.textContent).toBe(answer.a);
      expect(details?.querySelector("a")?.getAttribute("href")).toBe(new URL(question.url).hash);
    });
    for (const link of document.querySelectorAll('nav[aria-label="Nesta página"] a')) {
      expect(document.getElementById(link.getAttribute("href")!.slice(1))).not.toBeNull();
    }
    expect(document.querySelector('a[href="/materiais-gratuitos-seguros"]')).not.toBeNull();
  });
});
