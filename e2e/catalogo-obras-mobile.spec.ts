import { test, expect, type Page } from "@playwright/test";

const HOSTS = [
  { name: "preview", origin: "https://patroseguros.lovable.app" },
  { name: "produção", origin: "https://www.patroseguros.com.br" },
] as const;

const PRODUCTS = [
  { path: "/seguro-engenharia", label: "Seguro de Engenharia" },
  { path: "/seguro-garantia", label: "Seguro Garantia" },
  { path: "/seguro-rc-obras", label: "RC Obras e Montagem" },
] as const;

async function openPage(page: Page, origin: string, path: string) {
  const response = await page.goto(`${origin}${path}`, {
    waitUntil: "domcontentloaded",
  });
  expect(response?.ok(), `A página ${path} deve responder sem erro`).toBeTruthy();
  await expect(page.locator("main h1")).toBeVisible();
  await expect(page.locator("#seguros-da-obra")).toHaveCount(1);
}

async function expectNoHorizontalOverflow(page: Page) {
  await expect.poll(() => page.evaluate(() =>
    document.documentElement.scrollWidth - document.documentElement.clientWidth,
  ), { message: "A página não deve exigir rolagem horizontal no celular" }).toBeLessThanOrEqual(1);
}

for (const host of HOSTS) {
  for (const width of [320, 390]) {
    test.describe(`Catálogo e seguros de obras — ${host.name}, ${width}px`, () => {
      test.use({
        viewport: { width, height: 844 },
        isMobile: true,
        hasTouch: true,
        reducedMotion: "reduce",
        userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
      });

      test.beforeEach(async ({ page }) => {
        // Isola a navegação dos avisos de consentimento já cobertos em outros fluxos.
        await page.addInitScript(() => {
          localStorage.setItem("patro-cookies-accepted", "true");
        });
      });

      test("catálogo abre os três produtos e o atalho de obras", async ({ page }) => {
        await openPage(page, host.origin, "/todos-os-seguros");
        await expectNoHorizontalOverflow(page);
        const shortcuts = page.getByRole("navigation", { name: "Perfis", exact: true });
        for (const href of await shortcuts.locator("a").evaluateAll((links) =>
          links.map((link) => link.getAttribute("href")!),
        )) {
          await expect(page.locator(href), `O atalho ${href} deve ter um destino`).toHaveCount(1);
        }
        await shortcuts.getByRole("link", { name: "Seguros para obras", exact: true }).click();
        await expect(page).toHaveURL(/#seguros-da-obra$/);
        await expect(page.locator("#seguros-obra-heading")).toBeInViewport();

        for (const product of PRODUCTS) {
          await openPage(page, host.origin, "/todos-os-seguros");
          const card = page.locator(`main ul a[href="${product.path}"]`);
          await expect(card).toHaveCount(1);
          await expect(card).toContainText(product.label);
          await card.click();
          await expect.poll(() => new URL(page.url()).pathname).toBe(product.path);
          await expect(page.locator("main h1")).toBeVisible();
        }
      });

      for (const product of PRODUCTS) {
        test(`${product.label}: links cruzados e volta ao catálogo`, async ({ page }) => {
          await openPage(page, host.origin, product.path);
          await expectNoHorizontalOverflow(page);
          const comparison = page.locator("#seguros-da-obra");
          await expect(comparison.getByText("Você está nesta página", { exact: true })).toHaveCount(1);
          await expect(comparison.locator(`a[href="${product.path}"]`)).toHaveCount(0);

          for (const destination of PRODUCTS.filter((item) => item.path !== product.path)) {
            await comparison.locator(`a[href="${destination.path}"]`).click();
            await expect.poll(() => new URL(page.url()).pathname).toBe(destination.path);
            await expect(page.locator("main h1")).toBeVisible();
            await expectNoHorizontalOverflow(page);
            await openPage(page, host.origin, product.path);
          }

          await expect(comparison.locator("a button")).toHaveCount(0);
          await expect(page.locator('nav[aria-label="Seguros relacionados"] a button')).toHaveCount(0);
          await page.locator('main a[href="/todos-os-seguros"]').filter({ hasText: "Ver todos os seguros" }).click();
          await expect.poll(() => new URL(page.url()).pathname).toBe("/todos-os-seguros");
          await expect(page.locator("main h1")).toHaveText("Todos os seguros");
        });
      }
    });
  }
}
