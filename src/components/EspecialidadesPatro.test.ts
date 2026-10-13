import { describe, expect, it } from "vitest";
import { buildCatalogCollectionSchema } from "./EspecialidadesPatro";
import { catalogoSeguros, CATALOGO_PATH } from "@/data/catalogoSeguros";
import { CANONICAL_BASE_URL, getCanonicalUrl } from "@/lib/canonical";
import { EXACT_REDIRECTS } from "@/lib/redirects";
import appSource from "../App.tsx?raw";
import sectionSource from "./EspecialidadesPatro.tsx?raw";

it("usa rotas registradas nos links editoriais das especialidades", () => {
  const routes = new Set([...appSource.matchAll(/<Route\s[^>]*path="([^"]+)"/g)].map((match) => match[1]));
  const paths = [...sectionSource.matchAll(/\bto(?::\s*|=)"(\/[^"\s]+)"/g)].map((match) => match[1]);
  expect(paths.length).toBeGreaterThan(10);
  for (const path of paths) expect(routes.has(path), path).toBe(true);
});

const items = catalogoSeguros.flatMap((group) => group.items);

describe("Descoberta do catálogo da Patro", () => {
  it("descreve a coleção visível sem inventar preços ou avaliações", () => {
    const schema = buildCatalogCollectionSchema();
    expect(schema["@type"]).toBe("CollectionPage");
    expect(schema.url).toBe(getCanonicalUrl(CATALOGO_PATH));
    expect(schema.publisher["@id"]).toBe(`${CANONICAL_BASE_URL}/#insurance-agency`);
    expect(schema.mainEntity.numberOfItems).toBe(items.length);
    expect(JSON.stringify(schema)).not.toContain("aggregateRating");
    expect(JSON.stringify(schema)).not.toContain('"price"');
  });

  it("mantém nomes e ordem do catálogo e usa destinos canônicos conhecidos", () => {
    const entries = buildCatalogCollectionSchema().mainEntity.itemListElement;
    entries.forEach((entry, index) => {
      const item = items[index];
      const destination = EXACT_REDIRECTS.find((rule) => rule.from === item.to)?.to ?? item.to;
      expect(entry.position).toBe(index + 1);
      expect(entry.name).toBe(item.label);
      expect(entry.url).toBe(getCanonicalUrl(destination));
      expect(entry.url).not.toMatch(/[?#]/);
    });
  });

  it("inclui as especialidades e separa casco de drone e RETA", () => {
    const urls = buildCatalogCollectionSchema().mainEntity.itemListElement.map((entry) => entry.url);
    for (const path of [
      "/seguro-maquinas-agricolas", "/seguro-maquinas-linha-amarela",
      "/seguro-drone", "/seguro-drone-agricola", "/seguro-reta-drone",
      "/plano-de-saude-guarulhos", "/consorcio",
    ]) expect(urls).toContain(getCanonicalUrl(path));
  });
});
