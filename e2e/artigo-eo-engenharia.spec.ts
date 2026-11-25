import { test, expect } from "@playwright/test";

const articlePath = "/blog/seguro-eo-engenharia-prestadores-servicos-aeroportos";
for (const width of [360, 1440]) {
  test(`Guia E&O: leitura, navegação e impressão em ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(articlePath);
    const article = page.locator("#eo-artigo");
    await expect(article.getByRole("heading", { level: 1 })).toContainText("Sua empresa vai prestar serviços");
    await expect(page).toHaveTitle("Seguro E&O Engenharia para Aeroportos: Guia para Empresas");
    await expect(article.locator('a[href="/seguro-eo-engenharia-aeroportos"]')).toHaveCount(3);
    await expect(article.locator("#duvidas h3")).toHaveCount(13);
    await expect(article.getByRole("table").getByRole("row")).toHaveCount(7);
    await article.getByRole("navigation", { name: "Índice do artigo" }).getByRole("link", {name:"Checklist de contratação"}).click();
    await expect(page).toHaveURL(/#checklist$/);
    const checklist = article.locator("#eo-folha");
    await expect(checklist.getByRole("checkbox")).toHaveCount(12);
    await checklist.getByLabel("Tenho a cláusula contratual.").check();
    await page.evaluate(() => { window.print = () => document.body.setAttribute("data-print-tested", "true"); });
    await checklist.getByRole("button", {name:"Imprimir checklist"}).click();
    await expect(page.locator("body")).toHaveAttribute("data-print-tested", "true");
    await page.emulateMedia({ media: "print" });
    await expect(checklist).toBeVisible();
    await expect(checklist.getByLabel("Tenho a cláusula contratual.")).toBeChecked();
    await expect(article.getByRole("heading", {level:1, includeHidden:true})).toBeHidden();
  });
}
