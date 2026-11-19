import { describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import CentralDeGuias from "./CentralDeGuias";
import { guiasBlocks } from "@/data/guiasHubData";
import { CANONICAL_BASE_URL } from "@/lib/canonical";

vi.mock("@/components/PageMeta", () => ({ default: () => null }));
vi.mock("@/components/GooglePreferredSource", () => ({ default: () => null }));

describe("Descoberta dos guias editoriais", () => {
  it("descreve no índice a mesma coleção disponível em links no HTML", () => {
    const html = renderToStaticMarkup(<MemoryRouter><CentralDeGuias /></MemoryRouter>);
    const document = new DOMParser().parseFromString(html, "text/html");
    const collection = JSON.parse(document.querySelector('script[type="application/ld+json"]')!.textContent!);
    const cards = guiasBlocks.flatMap((block) => block.cards);
    expect(collection["@type"]).toBe("CollectionPage");
    expect(collection.inLanguage).toBe("pt-BR");
    expect(collection.publisher).toEqual({ "@id": `${CANONICAL_BASE_URL}/#organization` });
    expect(collection.mainEntity.numberOfItems).toBe(cards.length);
    expect(collection.mainEntity.itemListElement).toEqual(cards.map((card, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: card.title,
      url: `${CANONICAL_BASE_URL}${card.href}`,
    })));
    const links = Array.from(document.querySelectorAll("a"));
    for (const card of cards) {
      expect(links.some((link) => link.getAttribute("href") === card.href &&
        link.getAttribute("aria-label") === `${card.cta ?? "Ler guia"}: ${card.title}`)).toBe(true);
    }
    expect(document.querySelectorAll("h1")).toHaveLength(1);
    for (const block of guiasBlocks) {
      expect(document.getElementById(block.id)?.querySelector("h2")?.textContent).toBe(block.title);
    }
  });
});
