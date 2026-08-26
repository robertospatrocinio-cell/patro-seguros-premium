import { test, expect } from "@playwright/test";

const EXPECTED_HREF = "https://app.clubesantuu.com/indicacao/PAGINA";
const EXPECTED_TEXT = "Cote Agora o seu Seguro Bike";

const ROUTES_WITH_CLUBE = ["/seguro-bike"];

const ROUTES_WITHOUT_CLUBE = [
  "/",
  "/seguro-auto",
  "/seguro-moto",
  "/seguro-residencial",
  "/seguro-vida",
  "/seguro-empresarial",
  "/planos-de-saude",
  "/plano-de-saude-guarulhos",
  "/consorcio-guarulhos",
  "/seguros-guarulhos",
];

test.describe("Exclusividade do CTA Clube Santuu", () => {
  for (const route of ROUTES_WITH_CLUBE) {
    test(`${route} exibe o botão do Clube Santuu com link externo em nova aba`, async ({ page }) => {
      await page.goto(`http://localhost:8080${route}`, { waitUntil: "networkidle" });

      const links = page.locator('a[href*="clubesantuu.com"]');
      await expect(links).toHaveCount(2); // hero + bottom CTA

      for (const link of await links.all()) {
        await expect(link).toHaveAttribute("href", EXPECTED_HREF);
        await expect(link).toHaveAttribute("target", "_blank");
        await expect(link).toHaveAttribute("rel", /noopener/);
        await expect(link).toHaveAttribute("rel", /noreferrer/);
        await expect(link).toContainText(EXPECTED_TEXT);
      }
    });
  }

  for (const route of ROUTES_WITHOUT_CLUBE) {
    test(`${route} não exibe nenhum link do Clube Santuu`, async ({ page }) => {
      await page.goto(`http://localhost:8080${route}`, { waitUntil: "networkidle" });
      const links = page.locator('a[href*="clubesantuu.com"]');
      await expect(links).toHaveCount(0);
    });
  }
});
