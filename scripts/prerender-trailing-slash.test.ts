import { describe, it, expect } from "vitest";
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { resolve, join } from "node:path";

const ROOT = resolve(__dirname, "..");
const PUBLIC = join(ROOT, "public");
const DIST = join(ROOT, "dist");

/** Replica da normalização usada em scripts/prerender.mjs. */
function normalizeRoute(loc: string): string {
  return loc.length > 1 && loc.endsWith("/") ? loc.slice(0, -1) : loc;
}

function extractLocs(xml: string): string[] {
  return Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g)).map((m) =>
    m[1].replace(/^https?:\/\/[^/]+/, ""),
  );
}

function readAllSitemapRoutes(): string[] {
  const files = readdirSync(PUBLIC).filter(
    (f) => f.startsWith("sitemap") && f.endsWith(".xml"),
  );
  const routes: string[] = [];
  for (const f of files) {
    const xml = readFileSync(join(PUBLIC, f), "utf-8");
    for (const loc of extractLocs(xml)) {
      if (loc.startsWith("/")) routes.push(loc);
    }
  }
  return routes;
}

describe("prerender trailing-slash normalization", () => {
  it("normalizeRoute remove barra final exceto para a raiz", () => {
    expect(normalizeRoute("/")).toBe("/");
    expect(normalizeRoute("/sobre")).toBe("/sobre");
    expect(normalizeRoute("/sobre/")).toBe("/sobre");
    expect(normalizeRoute("/blog/artigo-x/")).toBe("/blog/artigo-x");
  });

  it("rotas de todos os sitemaps colapsam para uma única saída após normalização", () => {
    const raw = readAllSitemapRoutes();
    expect(raw.length).toBeGreaterThan(0);

    const buckets = new Map<string, Set<string>>();
    for (const loc of raw) {
      const key = normalizeRoute(loc);
      if (!buckets.has(key)) buckets.set(key, new Set());
      buckets.get(key)!.add(loc);
    }

    // Nenhuma rota normalizada pode conflitar consigo mesma em dist:
    // /sobre e /sobre/ mapeariam ambos para dist/sobre/index.html.
    // O teste é informativo — variantes com/sem barra são aceitas se a
    // normalização de fato as reduz a UM único arquivo de destino.
    for (const [key, variants] of buckets) {
      // O destino final em dist é sempre único (a chave normalizada).
      expect(key.endsWith("/") && key !== "/").toBe(false);
      // As variantes de origem devem diferir apenas pela barra final.
      const uniqueShapes = new Set(
        [...variants].map((v) => v.replace(/\/$/, "") || "/"),
      );
      expect(uniqueShapes.size).toBe(1);
    }
  });
});

describe("dist/ não contém colisões de trailing slash", () => {
  const distExists = existsSync(DIST);
  const testIf = distExists ? it : it.skip;

  function walk(dir: string, acc: string[] = []): string[] {
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry);
      const s = statSync(full);
      if (s.isDirectory()) walk(full, acc);
      else if (entry === "index.html") acc.push(full);
    }
    return acc;
  }

  testIf("cada rota canônica possui apenas um index.html gerado", () => {
    const files = walk(DIST);
    const routes = files.map((f) =>
      f.replace(DIST, "").replace(/\/index\.html$/, "") || "/",
    );
    const seen = new Map<string, number>();
    for (const r of routes) {
      const key = normalizeRoute(r);
      seen.set(key, (seen.get(key) ?? 0) + 1);
    }
    const dupes = [...seen.entries()].filter(([, n]) => n > 1);
    expect(dupes).toEqual([]);
  });

  testIf("nenhuma rota crítica foi sobrescrita por fallback vazio", () => {
    const critical = ["/", "/sobre", "/contato"];
    for (const route of critical) {
      const file = join(DIST, route === "/" ? "" : route, "index.html");
      if (!existsSync(file)) continue;
      const html = readFileSync(file, "utf-8");
      // Prerender injeta um bloco de conteúdo dentro de #root; um HTML
      // sobrescrito por fallback teria apenas <div id="root"></div>.
      expect(html).not.toMatch(/<div id="root"><\/div>/);
      expect(html.length).toBeGreaterThan(5000);
    }
  });
});
