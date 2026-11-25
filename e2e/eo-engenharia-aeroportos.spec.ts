import { expect, test } from "@playwright/test";

const path = "/seguro-eo-engenharia-aeroportos";
const title = "Seguro E&O Engenharia para Empresas que Prestam Serviços em Aeroportos";

for (const [width, height] of [[360, 800], [768, 1024], [1440, 900]]) {
  test(`E&O aeroportos: conteúdo e CTAs em ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height });
    await page.goto(path);
    const main = page.locator("main#main-content").last();
    await expect(main.getByRole("heading", { level: 1, name: title, exact: true })).toBeVisible();
    const image = main.getByRole("img", { name: /revisam uma planta/ });
    await expect.poll(() => image.evaluate(el => (el as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    const contract = main.getByRole("link", { name: "Enviar exigências do meu contrato" });
    await expect(contract).toHaveAttribute("href", /^https:\/\/wa\.me\/5511948101000\?text=/);
    await expect(main.getByRole("link", { name: "Enviar cláusula pelo WhatsApp" })).toHaveAttribute("href", (await contract.getAttribute("href"))!);
    const quote = main.getByRole("link", { name: "Solicitar cotação de E&O Engenharia" });
    await quote.focus();
    await expect(quote).toBeFocused();
    await quote.press("Enter");
    await expect(page).toHaveURL(/\/cotacao\/?\?tipo=rc/);
  });
}

for (const hub of ["/seguros-empresariais", "/seguro-rc-profissional"]) {
  test(`Acesso a partir de ${hub}`, async ({ page }) => {
    await page.goto(hub);
    const link = page.getByRole("link", { name: /E&O Engenharia para Aeroportos/i }).first();
    await expect(link).toHaveAttribute("href", path);
    await link.click();
    await expect(page.getByRole("heading", { level: 1, name: title, exact: true })).toBeVisible();
  });
}
