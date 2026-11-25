import { expect, test } from "@playwright/test";
import { GARANTIA_AEROPORTUARIA_PATH, garantiaAeroportuariaTitle } from "../src/data/garantiaAeroportuaria";

const previewOrigin = process.env.AIRPORT_EDITORIAL_PREVIEW_ORIGIN;
const publicOrigin = process.env.AIRPORT_EDITORIAL_PUBLIC_ORIGIN;
const cover = "/images/seguro-garantia-contratos-aeroportuarios.jpg";

for (const width of [390, 1280]) {
  test(`prévia de Seguro Garantia: leitura e validação em ${width}px`, async ({ page }) => {
    test.skip(!previewOrigin, "Defina AIRPORT_EDITORIAL_PREVIEW_ORIGIN com a origem da prévia Lovable ou local.");
    await page.setViewportSize({ width, height: 900 });
    await page.goto(new URL("/seguros-aeroportuarios", previewOrigin!).href);
    const entry = page.getByRole("link", { name: "Seguro Garantia para contratos aeroportuários", exact: true });
    await expect(entry).toHaveAttribute("href", GARANTIA_AEROPORTUARIA_PATH);
    await entry.click();
    const article = page.getByRole("article", { name: garantiaAeroportuariaTitle });
    await expect(article.getByRole("heading", { level: 1 })).toHaveText(garantiaAeroportuariaTitle);
    await expect(article.getByText("Publicação condicionada à revisão técnica.", { exact: false })).toBeVisible();
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://www.patroseguros.com.br${GARANTIA_AEROPORTUARIA_PATH}`);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", `https://www.patroseguros.com.br${cover}`);
    await expect.poll(() => article.locator(`img[src="${cover}"]`).evaluate((img: HTMLImageElement) => img.naturalWidth)).toBe(1536);

    const index = article.getByRole("navigation", { name: "Índice do artigo" });
    const targets = await index.getByRole("link").evaluateAll(links => links.map(link => link.getAttribute("href")));
    expect(new Set(targets).size).toBe(10);
    for (const target of targets) {
      expect(target).toMatch(/^#/);
      await expect(article.locator(`${target} > h2`)).toHaveCount(1);
    }
    const tableLink = index.getByRole("link", { name: "Seguro Garantia, caução e fiança bancária" });
    await tableLink.focus();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#comparacao$/);
    await expect(article.getByRole("table")).toBeVisible();
    await expect(article.getByRole("rowheader")).toHaveCount(3);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    const tableRegion = article.getByRole("region", { name: "Tabela comparativa de garantias contratuais" });
    if (width === 390) {
      await expect(tableRegion).toHaveAttribute("tabindex", "0");
      expect(await tableRegion.evaluate(el => el.scrollWidth > el.clientWidth)).toBe(true);
    }

    await expect(article.getByRole("link", { name: "E&O Engenharia em aeroportos" })).toHaveAttribute("href", "/seguro-eo-engenharia-aeroportos");
    await expect(article.getByRole("link", { name: "hub de seguros aeroportuários" })).toHaveAttribute("href", "/seguros-aeroportuarios");
    const wa = new URL((await article.getByRole("link", { name: "WhatsApp oficial: (11) 5199-7500" }).getAttribute("href"))!);
    expect(wa.origin + wa.pathname).toBe("https://wa.me/551151997500");
    await article.getByText("O aeroporto sempre exige Seguro Garantia?", { exact: true }).click();
    await expect(article.locator("#faq details[open] p")).toContainText("O fato de prestar serviços em um aeroporto não define por si só");
    const jsonLd = await page.locator('script[type="application/ld+json"]').filter({ hasText: "BlogPosting" }).last().textContent();
    const graph = JSON.parse(jsonLd!)["@graph"];
    expect(graph.find((item: { "@type": string }) => item["@type"] === "BlogPosting").headline).toBe(garantiaAeroportuariaTitle);
    expect(graph.find((item: { "@type": string }) => item["@type"] === "FAQPage").mainEntity).toHaveLength(await article.locator("#faq details").count());
  });
}

test("rascunho não fica disponível no site público nem entra no sitemap editorial", async ({ page, request }) => {
  test.skip(!publicOrigin, "Defina AIRPORT_EDITORIAL_PUBLIC_ORIGIN com a origem pública que recebeu o build.");
  await page.goto(new URL(GARANTIA_AEROPORTUARIA_PATH, publicOrigin!).href);
  await expect(page.getByRole("heading", { name: garantiaAeroportuariaTitle })).toHaveCount(0);
  const sitemap = await request.get(new URL("/sitemap-blog.xml", publicOrigin!).href);
  expect(sitemap.ok()).toBe(true);
  expect(await sitemap.text()).not.toContain(GARANTIA_AEROPORTUARIA_PATH);
  await page.goto(new URL("/seguros-aeroportuarios", publicOrigin!).href);
  await expect(page.getByRole("heading", { name: "Leituras para quem administra o contrato" })).toBeVisible();
  await expect(page.locator(`a[href="${GARANTIA_AEROPORTUARIA_PATH}"]`)).toHaveCount(0);
});
