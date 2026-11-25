import { expect, test } from "@playwright/test";
import { APOLICE_CONTRATOS_PATH, apoliceFaqs, apoliceMetaTitle, apoliceTitle } from "../src/data/apoliceContratosEmpresariais";
import { GARANTIA_AEROPORTUARIA_PATH } from "../src/data/garantiaAeroportuaria";

const previewOrigin = process.env.AIRPORT_EDITORIAL_PREVIEW_ORIGIN;
const publicOrigin = process.env.AIRPORT_EDITORIAL_PUBLIC_ORIGIN;
const canonical = `https://www.patroseguros.com.br${APOLICE_CONTRATOS_PATH}`;
const cover = "/images/revisao-apolice-contratos-empresariais.jpg";

for (const width of [390, 1280]) {
  test(`prévia de conferência de apólices em ${width}px`, async ({ page }) => {
    test.skip(!previewOrigin, "Defina AIRPORT_EDITORIAL_PREVIEW_ORIGIN com a origem da prévia Lovable ou local.");
    await page.setViewportSize({ width, height: 900 });
    await page.goto(new URL("/seguros-aeroportuarios", previewOrigin!).href);
    const entry = page.getByRole("link", { name: apoliceMetaTitle, exact: true });
    await expect(entry).toHaveAttribute("href", APOLICE_CONTRATOS_PATH);
    await entry.click();

    const article = page.getByRole("article", { name: apoliceTitle });
    await expect(article.getByRole("heading", { level: 1 })).toHaveText(apoliceTitle);
    await expect(article.getByText("Publicação condicionada à revisão técnica.", { exact: false })).toBeVisible();
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", canonical);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", `https://www.patroseguros.com.br${cover}`);
    const image = article.locator(`img[src="${cover}"]`);
    await expect(image).toHaveAttribute("alt", /comparando/);
    await expect.poll(() => image.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBe(1536);

    const errors = article.locator("#erros");
    await expect(errors.getByRole("heading", { level: 3 })).toHaveCount(15);
    for (const label of ["Como ocorre", "Possíveis consequências", "Como prevenir", "Como a Patro pode ajudar"]) {
      await expect(errors.getByText(label, { exact: true })).toHaveCount(15);
    }

    const index = article.getByRole("navigation", { name: "Índice do artigo" });
    const targets = await index.getByRole("link").evaluateAll(links => links.map(link => link.getAttribute("href")));
    expect(new Set(targets).size).toBe(7);
    for (const target of targets) {
      expect(target).toMatch(/^#/);
      await expect(article.locator(`${target} > h2`)).toHaveCount(1);
    }
    await index.getByRole("link", { name: "Matriz de riscos contratuais" }).focus();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#matriz$/);
    await expect(article.getByRole("rowheader")).toHaveCount(5);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    const matrix = article.getByRole("region", { name: "Tabela da matriz de riscos contratuais" });
    await expect(matrix).toHaveAttribute("tabindex", "0");
    if (width === 390) expect(await matrix.evaluate(el => el.scrollWidth > el.clientWidth)).toBe(true);

    const checks = article.getByRole("checkbox");
    await expect(checks).toHaveCount(8);
    await checks.first().focus();
    await page.keyboard.press("Space");
    await expect(checks.first()).toBeChecked();
    await expect(article.getByRole("link", { name: "Seguros aeroportuários", exact: true })).toHaveAttribute("href", "/seguros-aeroportuarios");
    await expect(article.getByRole("link", { name: "E&O Engenharia em aeroportos" })).toHaveAttribute("href", "/seguro-eo-engenharia-aeroportos");
    await expect(article.getByRole("link", { name: "Seguro Garantia para contratos aeroportuários" })).toHaveAttribute("href", GARANTIA_AEROPORTUARIA_PATH);
    const wa = new URL((await article.getByRole("link", { name: "WhatsApp oficial: (11) 5199-7500" }).getAttribute("href"))!);
    expect(wa.origin + wa.pathname).toBe("https://wa.me/551151997500");

    await article.getByText(apoliceFaqs[0].question, { exact: true }).click();
    await expect(article.getByText(apoliceFaqs[0].answer, { exact: true })).toBeVisible();
    const jsonLd = await page.locator('script[type="application/ld+json"]').filter({ hasText: `${canonical}#artigo` }).textContent();
    const [posting, faq] = JSON.parse(jsonLd!)["@graph"];
    expect(posting).toMatchObject({ "@type": "BlogPosting", headline: apoliceTitle, mainEntityOfPage: canonical });
    expect(faq.mainEntity.map((item: { name: string; acceptedAnswer: { text: string } }) => ({ question: item.name, answer: item.acceptedAnswer.text }))).toEqual(apoliceFaqs);
  });
}

test("rascunho de apólices fica fora da navegação pública e do sitemap", async ({ page, request }) => {
  test.skip(!publicOrigin, "Defina AIRPORT_EDITORIAL_PUBLIC_ORIGIN com a origem pública que recebeu o build.");
  await page.goto(new URL(APOLICE_CONTRATOS_PATH, publicOrigin!).href);
  await expect(page.getByRole("heading", { name: apoliceTitle, level: 1 })).toHaveCount(0);
  const sitemap = await request.get(new URL("/sitemap-blog.xml", publicOrigin!).href);
  expect(sitemap.ok()).toBe(true);
  expect(await sitemap.text()).not.toContain(APOLICE_CONTRATOS_PATH);
  await page.goto(new URL("/seguros-aeroportuarios", publicOrigin!).href);
  await expect(page.getByRole("heading", { name: "Leituras para quem administra o contrato" })).toBeVisible();
  await expect(page.locator(`a[href="${APOLICE_CONTRATOS_PATH}"]`)).toHaveCount(0);
});
