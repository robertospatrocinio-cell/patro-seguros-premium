import { expect, test } from "@playwright/test";

for (const width of [390, 1280]) {
  test(`hub aeroportuário: descoberta e contato em ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/seguros-aeroportuarios");
    const main = page.getByRole("main").filter({ has: page.getByRole("heading", { level: 1, name: "Seguros para Empresas e Prestadores de Serviços em Aeroportos" }) });
    await expect(main).toBeVisible();
    await expect(page.locator('link[rel="canonical"]').first()).toHaveAttribute("href", "https://www.patroseguros.com.br/seguros-aeroportuarios");
    await expect(main.getByRole("link", { name: "Consultar Seguro E&O Engenharia" })).toHaveAttribute("href", "/seguro-eo-engenharia-aeroportos");
    await expect(main.getByRole("link", { name: "Falar com um especialista", exact: true })).toHaveAttribute("href", `https://wa.me/551151997500?text=${encodeURIComponent("Olá! Minha empresa vai prestar serviços em um aeroporto e gostaria de orientação sobre os seguros exigidos no contrato.")}`);
    await expect(main.locator("#perguntas details")).toHaveCount(16);
    await main.getByText("RC Geral cobre danos a aeronaves?", { exact: true }).click();
    await expect(main.getByText(/^Não presuma essa cobertura/)).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await main.getByRole("link", { name: "Solicitar cotação", exact: true }).click();
    await expect(page).toHaveURL(/#cotacao-aeroportuaria$/);
    await expect(main.getByRole("form", { name: "Solicitar Seguros aeroportuários" })).toBeVisible();
  });
}
