import { expect, test } from "@playwright/test";
import { insuranceEditorials, INSURANCE_EDITORIALS_PATH } from "../src/data/insuranceEditorials";

test.use({ viewport: { width: 390, height: 844 } });

test("catálogo apresenta os artigos por modalidade no celular", async ({ page }) => {
  await page.goto("/todos-os-seguros");
  const section = page.getByRole("region", { name: "Artigos por modalidade de seguro" });
  await expect(section).toBeVisible();
  for (const article of insuranceEditorials) {
    await expect(section.getByRole("link", { name: new RegExp(article.title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")) })).toHaveAttribute("href", article.path);
  }
  await section.getByRole("link", { name: "Todos os artigos" }).click();
  await expect(page).toHaveURL(new RegExp(`${INSURANCE_EDITORIALS_PATH}$`));
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Artigos sobre seguros por modalidade");
});

for (const article of insuranceEditorials) {
  test(`${article.modality}: artigo, índice e retorno ao produto`, async ({ page }) => {
    await page.goto(article.path);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(article.title);
    const main = page.getByRole("main");
    const productLink = main.getByRole("link", { name: `Ver coberturas e cotação de ${article.modality}` });
    await expect(productLink).toHaveAttribute("href", article.productPath);
    const index = page.getByRole("navigation", { name: "Neste artigo" });
    await expect(index.getByRole("link")).toHaveCount(article.sections.length);
    for (const section of article.sections) {
      await expect(main.getByRole("heading", { name: section.title, exact: true })).toBeVisible();
    }
    await index.getByRole("link").first().click();
    await expect(page).toHaveURL(new RegExp(`${article.path}#topico-1$`));
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    expect(overflow).toBe(false);
    await productLink.click();
    await expect(page).toHaveURL(new RegExp(`${article.productPath}$`));
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
}
