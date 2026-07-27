import { describe, it, expect } from "vitest";
import { CANONICAL_BASE_URL } from "@/lib/canonical";
import {
  buildSeguradorasHubCollectionSchema,
  buildSeguradorasParceirasHubCollectionSchema,
  buildSolucoesEmpresariaisCollectionSchema,
  buildBlogCollectionSchema,
  buildBlogClusterCollectionSchema,
} from "@/lib/collectionPageSchemas";
import { articles as blogArticles } from "@/lib/blogData";
import { BLOG_CLUSTERS } from "@/data/blogClusters";

/**
 * Validates every CollectionPage emitted by the app against the same rules
 * used by `scripts/lib/hubs-collectionpage.test.mjs` for the prerendered
 * hubs. Any regression that would produce a Google `eligible-warn` on a
 * CollectionPage rich result should fail here.
 *
 * Rules:
 *  - Exactly one CollectionPage node.
 *  - `url` and top-level `@id` (when present) resolve to the canonical origin.
 *  - `hasPart` (when present) is a non-empty array of WebPage items with
 *    unique absolute canonical URLs and non-empty names.
 *  - `mainEntity` is an ItemList whose `itemListElement` positions are
 *    sequential starting at 1, unique, and 1:1 with `hasPart` (when
 *    `hasPart` is present). All URLs are absolute and canonical.
 *  - `numberOfItems` matches `itemListElement.length`.
 */

type SchemaCase = {
  route: string;
  schema: Record<string, unknown>;
  hasPartRequired?: boolean;
};

const sampleSolutions = [
  { href: "/seguro-locadoras-equipamentos", title: "Locadoras" },
  { href: "/seguro-galpoes-centros-distribuicao", title: "Galpões" },
];

const sortedBlog = [...blogArticles].sort((a, b) => b.date.localeCompare(a.date));
const firstCluster = BLOG_CLUSTERS[0];

const CASES: SchemaCase[] = [
  {
    route: "/seguradoras",
    schema: buildSeguradorasHubCollectionSchema(),
    hasPartRequired: true,
  },
  {
    route: "/seguradoras-parceiras",
    schema: buildSeguradorasParceirasHubCollectionSchema(),
    hasPartRequired: true,
  },
  {
    route: "/solucoes-empresariais",
    schema: buildSolucoesEmpresariaisCollectionSchema(sampleSolutions),
    hasPartRequired: true,
  },
  {
    route: "/blog",
    schema: buildBlogCollectionSchema(sortedBlog, "desc de teste"),
    hasPartRequired: false,
  },
  {
    route: `/blog/cluster/${firstCluster.slug}`,
    schema: buildBlogClusterCollectionSchema(firstCluster, sortedBlog.slice(0, 5)),
    hasPartRequired: false,
  },
];

function isAbsoluteCanonical(url: unknown): boolean {
  return typeof url === "string" && url.startsWith(`${CANONICAL_BASE_URL}/`);
}

describe.each(CASES)("CollectionPage — $route", ({ route, schema, hasPartRequired }) => {
  it("é do tipo CollectionPage com url absoluta canônica", () => {
    expect(schema["@type"]).toBe("CollectionPage");
    expect(isAbsoluteCanonical(schema.url)).toBe(true);
    if (schema["@id"] !== undefined) {
      const id = String(schema["@id"]);
      expect(id.startsWith(CANONICAL_BASE_URL)).toBe(true);
    }
    expect(typeof schema.name).toBe("string");
    expect(String(schema.name).length).toBeGreaterThan(0);
  });

  it("hasPart (quando presente) é lista consistente de WebPage", () => {
    const hasPart = schema.hasPart as
      | Array<{ "@type": string; name?: string; url?: string }>
      | undefined;
    if (hasPartRequired) {
      expect(Array.isArray(hasPart)).toBe(true);
      expect(hasPart!.length).toBeGreaterThan(0);
    }
    if (!hasPart) return;
    const urls = new Set<string>();
    for (const part of hasPart) {
      expect(part["@type"]).toBe("WebPage");
      expect(isAbsoluteCanonical(part.url)).toBe(true);
      expect(typeof part.name).toBe("string");
      expect((part.name ?? "").length).toBeGreaterThan(0);
      urls.add(part.url as string);
    }
    expect(urls.size).toBe(hasPart.length);
  });

  it("mainEntity é ItemList consistente e enumerado a partir de 1", () => {
    const list = schema.mainEntity as {
      "@type": string;
      "@id"?: string;
      numberOfItems?: number;
      itemListElement: Array<{ "@type": string; position: number; url: string; name?: string }>;
    };
    expect(list).toBeDefined();
    expect(list["@type"]).toBe("ItemList");
    expect(Array.isArray(list.itemListElement)).toBe(true);
    expect(list.itemListElement.length).toBeGreaterThan(0);

    if (list["@id"] !== undefined) {
      expect(String(list["@id"]).startsWith(CANONICAL_BASE_URL)).toBe(true);
      expect(String(list["@id"])).toContain("#");
    }

    if (typeof list.numberOfItems === "number") {
      expect(list.numberOfItems).toBe(list.itemListElement.length);
    }

    const positions = list.itemListElement.map((li) => li.position);
    expect(positions[0]).toBe(1);
    expect(new Set(positions).size).toBe(positions.length);
    expect(positions).toEqual([...positions].sort((a, b) => a - b));

    for (const li of list.itemListElement) {
      expect(li["@type"]).toBe("ListItem");
      expect(isAbsoluteCanonical(li.url)).toBe(true);
    }

    // 1:1 com hasPart quando ambos existem
    const hasPart = schema.hasPart as Array<{ url: string }> | undefined;
    if (hasPart) {
      expect(list.itemListElement.length).toBe(hasPart.length);
      const partUrls = new Set(hasPart.map((p) => p.url));
      for (const li of list.itemListElement) {
        expect(partUrls.has(li.url)).toBe(true);
      }
    }
  });

  it(`URL bate com a rota ${route}`, () => {
    expect(schema.url).toBe(`${CANONICAL_BASE_URL}${route}`);
  });
});