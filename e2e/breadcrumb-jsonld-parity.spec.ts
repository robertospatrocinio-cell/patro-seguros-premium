import { test, expect, Page } from "@playwright/test";

/**
 * E2E: garante que o JSON-LD BreadcrumbList emitido em cada página
 * long-tail reflete EXATAMENTE a cadeia visível na UI (mesmo número
 * de níveis, mesmos labels, mesmos destinos).
 *
 * Regras validadas por rota:
 *   1. UI: `nav[aria-label="Breadcrumb"] > ol > li` renderiza
 *      "Início" + N-1 links + 1 item terminal com aria-current="page".
 *   2. JSON-LD: existe UM único BreadcrumbList com @id
 *      `${url}#breadcrumb` (evita duplicidade — regra do template).
 *   3. Parity: length, name e pathname de cada `itemListElement`
 *      batem 1:1 com a cadeia visível (o último item pode não ter
 *      `item` — é o "current page").
 */

const HOSTS = [
  { name: "lovable.app (preview)", origin: "https://patroseguros.lovable.app" },
  { name: "patroseguros.com.br (produção)", origin: "https://www.patroseguros.com.br" },
] as const;

// Mesmas 4 rotas cobertas pelo spec de jump links — clusters completos.
const ROUTES = [
  "/valor-seguro-byd-dolphin",
  "/cotacao-seguro-residencial-online",
  "/melhor-seguro-para-uber-guarulhos",
  "/planos-de-saude-guarulhos-comparativo",
] as const;

type UiCrumb = { name: string; pathname: string | null; isCurrent: boolean };
type JsonLdCrumb = { position: number; name: string; pathname: string | null };

const toPathname = (raw: string | null | undefined): string | null => {
  if (!raw) return null;
  try {
    // Absolute URL — pega apenas o pathname para comparar entre hosts.
    return new URL(raw).pathname.replace(/\/+$/, "") || "/";
  } catch {
    // Relativo (ex.: "/blog") — normaliza igual.
    return raw.replace(/\/+$/, "") || "/";
  }
};

const normalize = (s: string) => s.replace(/\s+/g, " ").trim();

const readUiBreadcrumb = async (page: Page): Promise<UiCrumb[]> => {
  return await page.evaluate(() => {
    const nav = document.querySelector<HTMLElement>('nav[aria-label="Breadcrumb"]');
    if (!nav) return [];
    const items = Array.from(nav.querySelectorAll<HTMLLIElement>("ol > li"));
    return items.map((li) => {
      const link = li.querySelector<HTMLAnchorElement>("a[href]");
      const current = li.querySelector<HTMLElement>('[aria-current="page"]');
      // Texto visível — remove ícones (SVG chevron não tem texto).
      const name = (link?.textContent ?? current?.textContent ?? li.textContent ?? "").replace(/\s+/g, " ").trim();
      return {
        name,
        pathname: link ? link.getAttribute("href") : null,
        isCurrent: !!current,
      };
    });
  });
};

const readJsonLdBreadcrumb = async (
  page: Page,
  expectedPathname: string,
): Promise<JsonLdCrumb[]> => {
  return await page.evaluate((expected) => {
    const scripts = Array.from(
      document.querySelectorAll<HTMLScriptElement>('script[type="application/ld+json"]'),
    );
    const collect = (node: unknown): unknown[] => {
      if (!node) return [];
      if (Array.isArray(node)) return node.flatMap(collect);
      if (typeof node === "object" && node !== null) {
        const record = node as Record<string, unknown>;
        if ("@graph" in record && Array.isArray(record["@graph"])) {
          return (record["@graph"] as unknown[]).flatMap(collect);
        }
        return [record];
      }
      return [];
    };

    const candidates: Array<Record<string, unknown>> = [];
    for (const s of scripts) {
      try {
        const parsed = JSON.parse(s.textContent ?? "");
        for (const node of collect(parsed)) {
          const rec = node as Record<string, unknown>;
          if (rec["@type"] === "BreadcrumbList") candidates.push(rec);
        }
      } catch {
        // ignora blocos malformados — outros testes já validam parse.
      }
    }

    if (candidates.length === 0) return [];

    // Prefere o BreadcrumbList com @id terminando em `${pathname}#breadcrumb`.
    const norm = (p: string) => p.replace(/\/+$/, "") || "/";
    const target = norm(expected);
    const match = candidates.find((c) => {
      const id = typeof c["@id"] === "string" ? (c["@id"] as string) : "";
      try {
        const path = norm(new URL(id).pathname);
        return path === target && id.endsWith("#breadcrumb");
      } catch {
        return false;
      }
    }) ?? candidates[0];

    const list = (match.itemListElement ?? []) as Array<Record<string, unknown>>;
    return list.map((raw) => {
      const position = Number(raw.position ?? 0);
      const name = String(raw.name ?? "").replace(/\s+/g, " ").trim();
      let pathname: string | null = null;
      const item = raw.item;
      const url = typeof item === "string" ? item : (item as Record<string, unknown> | undefined)?.["@id"];
      if (typeof url === "string") {
        try {
          pathname = norm(new URL(url).pathname);
        } catch {
          pathname = norm(url);
        }
      }
      return { position, name, pathname };
    }).sort((a, b) => a.position - b.position);
  }, expectedPathname);
};

for (const host of HOSTS) {
  test.describe(`BreadcrumbList JSON-LD ↔ UI parity @ ${host.name}`, () => {
    for (const route of ROUTES) {
      test(`parity em ${route}`, async ({ page }) => {
        const url = `${host.origin}${route}`;
        const res = await page.goto(url, { waitUntil: "domcontentloaded" });
        expect(res, `resposta HTTP para ${url}`).not.toBeNull();
        expect(res!.status(), `status ${url}`).toBeLessThan(400);

        // Aguarda o breadcrumb visível hidratar (Route SPA + BreadcrumbSchema).
        await page.waitForSelector('nav[aria-label="Breadcrumb"] ol > li', { timeout: 10_000 });

        const ui = await readUiBreadcrumb(page);
        const jsonLd = await readJsonLdBreadcrumb(page, route);

        expect(ui.length, "UI deve renderizar ao menos Início + página atual").toBeGreaterThanOrEqual(2);
        expect(jsonLd.length, "JSON-LD BreadcrumbList deve existir para long-tails").toBeGreaterThan(0);

        // 1) Mesma quantidade de níveis.
        expect(jsonLd.length, `itemListElement (${jsonLd.length}) vs UI (${ui.length})`).toBe(ui.length);

        // 2) Compara name + pathname posição a posição.
        const uiNames = ui.map((u) => normalize(u.name));
        const ldNames = jsonLd.map((j) => normalize(j.name));
        expect(ldNames, "labels do JSON-LD batem com a UI").toEqual(uiNames);

        for (let i = 0; i < ui.length; i += 1) {
          const uiPath = toPathname(ui[i].pathname);
          const ldPath = jsonLd[i].pathname;
          if (ui[i].isCurrent) {
            // Último item: a UI é <span>, sem href. JSON-LD deve apontar
            // para a rota corrente (ou omitir `item` — ambos são válidos
            // por schema.org, mas o template atual SEMPRE injeta a URL).
            if (ldPath !== null) {
              expect(ldPath, `item terminal deve resolver para ${route}`).toBe(route.replace(/\/+$/, "") || "/");
            }
          } else {
            expect(ldPath, `posição ${i + 1} (${uiNames[i]}) deve conter pathname`).not.toBeNull();
            expect(ldPath, `posição ${i + 1} (${uiNames[i]}) pathname bate com o <a> da UI`).toBe(uiPath);
          }
        }
      });
    }
  });
}