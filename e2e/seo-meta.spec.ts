import { test, expect, Page } from "@playwright/test";

/**
 * Rotas reais que precisam ter meta robots + canonical corretos em ambos os hosts.
 * Inclui home, uma página de produto, uma landing e uma página local — cobertura
 * suficiente para pegar regressões no PageMeta / script inline do index.html.
 */
const ROUTES = [
  "/",
  "/seguro-auto",
  "/planos-de-saude",
  "/seguros-guarulhos",
  "/blog",
];

const HOSTS = [
  {
    name: "lovable.app (preview)",
    origin: "https://patroseguros.lovable.app",
    expectedRobots: "noindex, nofollow",
  },
  {
    name: "patroseguros.com.br (produção)",
    origin: "https://www.patroseguros.com.br",
    expectedRobots: "index, follow",
  },
] as const;

const CANONICAL_HOST = "https://www.patroseguros.com.br";

async function waitForHelmetHydration(page: Page) {
  // PageMeta atualiza <meta> num useEffect após hydration; espera até o robots
  // estar presente para evitar flake.
  await page.waitForFunction(() => !!document.querySelector('meta[name="robots"]'));
}

for (const host of HOSTS) {
  test.describe(`SEO meta @ ${host.name}`, () => {
    for (const route of ROUTES) {
      test(`${route} tem robots="${host.expectedRobots}" e canonical em www.patroseguros.com.br`, async ({
        page,
      }) => {
        const response = await page.goto(`${host.origin}${route}`, {
          waitUntil: "domcontentloaded",
        });
        expect(response, "response deve existir").not.toBeNull();
        expect(response!.ok(), `status ${response!.status()} em ${route}`).toBeTruthy();

        await waitForHelmetHydration(page);

        const robots = await page
          .locator('meta[name="robots"]')
          .first()
          .getAttribute("content");
        expect(robots?.toLowerCase().replace(/\s+/g, " ")).toBe(host.expectedRobots);

        const canonical = await page
          .locator('link[rel="canonical"]')
          .first()
          .getAttribute("href");
        expect(canonical, `canonical ausente em ${route}`).toBeTruthy();
        expect(canonical!.startsWith(CANONICAL_HOST)).toBeTruthy();
        expect(canonical).not.toContain("lovable.app");
      });
    }
  });
}