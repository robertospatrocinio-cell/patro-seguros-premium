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

test("Guia técnico: escopo, tabela e FAQ utilizáveis em tela estreita", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto(path);
  const section = (id: string) => page.locator(`section[aria-labelledby="${id}-heading"]`);
  const definicao = await section("produto").locator("p").first().innerText();
  const palavras = definicao.trim().split(/\s+/).length;
  expect(palavras).toBeGreaterThanOrEqual(50);
  expect(palavras).toBeLessThanOrEqual(80);
  await expect(section("segmentos").getByRole("heading", { level: 4 })).toHaveCount(21);
  await expect(section("exemplos").getByRole("article")).toHaveCount(6);
  const tabela = section("comparativo").getByRole("table");
  await expect(tabela.getByRole("rowheader")).toHaveCount(6);
  await expect(tabela.getByRole("columnheader")).toHaveCount(6);
  await expect(section("retroatividade").locator("time")).toHaveCount(6);
  const faq = section("faq").locator("details");
  await expect(faq).toHaveCount(25);
  const pergunta = faq.filter({ has: page.locator("summary", { hasText: "A GRU Airport exige E&O de todos os fornecedores?" }) });
  const resposta = pergunta.locator("p");
  await expect(resposta).toHaveText(/Não se pode afirmar que exista uma exigência única/);
  await pergunta.locator("summary").focus();
  await pergunta.locator("summary").press("Enter");
  await expect(resposta).toBeVisible();
  await pergunta.locator("summary").press("Enter");
  await expect(resposta).toBeHidden();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(360);
});

for (const hub of ["/seguros-empresariais", "/seguro-rc-profissional"]) {
  test(`Acesso a partir de ${hub}`, async ({ page }) => {
    await page.goto(hub);
    const link = page.getByRole("link", { name: /E&O Engenharia para Aeroportos/i }).first();
    await expect(link).toHaveAttribute("href", path);
    await link.click();
    await expect(page.getByRole("heading", { level: 1, name: title, exact: true })).toBeVisible();
  });
}
