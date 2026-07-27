import { describe, it, expect, beforeAll } from "vitest";
import fs from "node:fs";
import path from "node:path";

const HUBS = [
  "/hub-empresarial",
  "/hub-patrimonio",
  "/hub-rc",
  "/hub-veiculos",
  "/hub-vida-saude",
];
const CANONICAL_ORIGIN = "https://www.patroseguros.com.br";
const DIST = path.resolve(process.cwd(), "dist");
const DIST_EXISTS = fs.existsSync(DIST);

function readHubHtml(route) {
  return fs.readFileSync(path.join(DIST, route.replace(/^\//, ""), "index.html"), "utf-8");
}

function extractJsonLd(html) {
  const out = [];
  const re = /<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/g;
  let m;
  while ((m = re.exec(html)) !== null) {
    try {
      const parsed = JSON.parse(m[1]);
      if (Array.isArray(parsed)) out.push(...parsed);
      else if (parsed?.["@graph"]) out.push(...parsed["@graph"]);
      else out.push(parsed);
    } catch {
      // deixamos o teste `parseia` explodir para expor o snippet malformado
      out.push({ __parseError: true, raw: m[1].slice(0, 200) });
    }
  }
  return out;
}

function findCollectionPage(nodes) {
  return nodes.find((n) => {
    if (!n || typeof n !== "object") return false;
    const t = n["@type"];
    return t === "CollectionPage" || (Array.isArray(t) && t.includes("CollectionPage"));
  });
}

describe.skipIf(!DIST_EXISTS)("hubs — CollectionPage.hasPart & mainEntity (dist/)", () => {
  const cache = new Map();
  beforeAll(() => {
    for (const route of HUBS) cache.set(route, extractJsonLd(readHubHtml(route)));
  });

  it.each(HUBS)("%s: JSON-LD parseia sem erro", (route) => {
    const nodes = cache.get(route);
    expect(nodes.some((n) => n.__parseError)).toBe(false);
    expect(nodes.length).toBeGreaterThan(0);
  });

  it.each(HUBS)("%s: expõe exatamente 1 CollectionPage canônica", (route) => {
    const nodes = cache.get(route);
    const pages = nodes.filter((n) => {
      const t = n?.["@type"];
      return t === "CollectionPage" || (Array.isArray(t) && t.includes("CollectionPage"));
    });
    expect(pages).toHaveLength(1);
    expect(pages[0].url).toBe(`${CANONICAL_ORIGIN}${route}`);
  });

  it.each(HUBS)("%s: hasPart é array não-vazio de WebPage com url absoluta canônica", (route) => {
    const cp = findCollectionPage(cache.get(route));
    expect(cp).toBeDefined();
    expect(Array.isArray(cp.hasPart)).toBe(true);
    expect(cp.hasPart.length).toBeGreaterThanOrEqual(3);

    const urls = new Set();
    for (const part of cp.hasPart) {
      expect(part["@type"]).toBe("WebPage");
      expect(typeof part.url).toBe("string");
      expect(part.url.startsWith(`${CANONICAL_ORIGIN}/`)).toBe(true);
      // @id deve bater com url (evita duplicidade de nó no grafo)
      expect(part["@id"]).toBe(part.url);
      expect(typeof part.name).toBe("string");
      expect(part.name.length).toBeGreaterThan(0);
      urls.add(part.url);
    }
    // sem duplicatas
    expect(urls.size).toBe(cp.hasPart.length);
  });

  it.each(HUBS)("%s: mainEntity é ItemList consistente com hasPart", (route) => {
    const cp = findCollectionPage(cache.get(route));
    expect(cp.mainEntity).toBeDefined();
    const list = cp.mainEntity;
    expect(list["@type"]).toBe("ItemList");
    expect(list["@id"]).toBe(`${CANONICAL_ORIGIN}${route}#itemlist`);
    expect(typeof list.name).toBe("string");
    expect(list.name.length).toBeGreaterThan(0);
    expect(Array.isArray(list.itemListElement)).toBe(true);
    expect(list.itemListElement.length).toBe(cp.hasPart.length);
    expect(list.numberOfItems).toBe(cp.itemListElement?.length ?? list.itemListElement.length);

    // positions começam em 1, crescem e são únicas; urls batem 1:1 com hasPart
    const positions = list.itemListElement.map((li) => li.position);
    expect(positions).toEqual([...positions].sort((a, b) => a - b));
    expect(new Set(positions).size).toBe(positions.length);
    expect(positions[0]).toBe(1);

    const hasPartUrls = cp.hasPart.map((p) => p.url);
    for (const li of list.itemListElement) {
      expect(li["@type"]).toBe("ListItem");
      expect(typeof li.url).toBe("string");
      expect(li.url.startsWith(`${CANONICAL_ORIGIN}/`)).toBe(true);
      expect(hasPartUrls).toContain(li.url);
    }
  });
});