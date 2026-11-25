import { expect, test } from "@playwright/test";
import { GUIA_AEROPORTUARIO_PATH, guiaAeroportuarioTitle } from "../src/data/guiaAeroportuarioRoute";
import { guiaChapters, guiaDescription, guiaImage, guiaMetaTitle } from "../src/data/guiaAeroportuario";
import { guiaFaqs } from "../src/data/guiaAeroportuarioFaq";
import { APOLICE_CONTRATOS_PATH } from "../src/data/apoliceContratosRoute";
import { GARANTIA_AEROPORTUARIA_PATH } from "../src/data/garantiaAeroportuaria";

const previewOrigin = process.env.AIRPORT_EDITORIAL_PREVIEW_ORIGIN;
const publicOrigin = process.env.AIRPORT_EDITORIAL_PUBLIC_ORIGIN;
const base = "https://www.patroseguros.com.br";
const canonical = `${base}${GUIA_AEROPORTUARIO_PATH}`;
const hub = "/seguros-aeroportuarios";
const drafts = [GUIA_AEROPORTUARIO_PATH, APOLICE_CONTRATOS_PATH, GARANTIA_AEROPORTUARIA_PATH];

for (const width of [390, 1280]) {
  test(`guia pilar na prévia em ${width}px`, async ({ page }) => {
    test.skip(!previewOrigin, "Defina AIRPORT_EDITORIAL_PREVIEW_ORIGIN com a origem da prévia Lovable ou local.");
    await page.setViewportSize({ width, height: 900 });
    await page.goto(new URL(hub, previewOrigin!).href);
    const entry = page.getByRole("link", { name: guiaAeroportuarioTitle, exact: true });
    await expect(entry).toHaveAttribute("href", GUIA_AEROPORTUARIO_PATH);
    await entry.click();

    const article = page.getByRole("article", { name: guiaAeroportuarioTitle });
    await expect(article.getByRole("heading", { level: 1 })).toHaveText(guiaAeroportuarioTitle);
    await expect(article.getByText("Publicação condicionada à revisão técnica.", { exact: false })).toBeVisible();
    await expect(page).toHaveTitle(guiaMetaTitle);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", guiaDescription);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", canonical);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", `${base}${guiaImage}`);
    const image = article.locator(`img[src="${guiaImage}"]`);
    await expect(image).toHaveAttribute("alt", /aeronave ao fundo/);
    await expect(image).toHaveAttribute("height", "1024");
    await expect.poll(() => image.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBe(1536);

    const index = article.getByRole("navigation", { name: "Índice do guia" });
    await expect(index.getByRole("link")).toHaveCount(12);
    for (const [id, title] of guiaChapters) {
      await expect(index.getByRole("link", { name: title, exact: true })).toHaveAttribute("href", `#${id}`);
      await expect(article.locator(`#${id}`).getByRole("heading", { level: 2 })).toHaveText(title);
    }
    await index.getByRole("link", { name: "Seguros por atividade" }).focus();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#atividades$/);
    await expect(article.locator("#modalidades").getByRole("rowheader")).toHaveCount(10);
    await expect(article.locator("#atividades").getByRole("rowheader")).toHaveCount(15);
    await expect(article.locator("#exemplos").getByRole("heading", { level: 3 })).toHaveCount(6);
    expect(await article.locator("#glossario dt").count()).toBeGreaterThanOrEqual(30);
    expect(await article.locator("#faq summary").count()).toBeGreaterThanOrEqual(20);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    const matrix = article.getByRole("region", { name: "Matriz consultiva de seguros por atividade aeroportuária" });
    await expect(matrix).toHaveAttribute("tabindex", "0");
    if (width === 390) expect(await matrix.evaluate(el => el.scrollWidth > el.clientWidth)).toBe(true);

    const checks = article.getByRole("checkbox");
    await expect(checks).toHaveCount(9);
    await checks.first().focus();
    await page.keyboard.press("Space");
    await expect(checks.first()).toBeChecked();
    const printButton = article.getByRole("button", { name: "Imprimir checklist" });
    await page.evaluate(() => { window.print = () => { document.body.dataset.printRequested = "true"; }; });
    await printButton.click();
    await expect(page.locator("body")).toHaveAttribute("data-print-requested", "true");
    await page.emulateMedia({ media: "print" });
    const printable = page.locator("#checklist-impresso-aeroportuario");
    await expect(printable.getByRole("heading", { name: "Checklist de seguros para contratos aeroportuários" })).toBeVisible();
    await expect(printable.getByRole("checkbox").first()).toBeChecked();
    await expect(page.locator("#riscos")).toBeHidden();
    await expect(page.getByRole("button", { name: "Imprimir checklist", includeHidden: true })).toBeHidden();
    await page.emulateMedia({ media: "screen" });

    for (const path of [hub, "/seguro-eo-engenharia-aeroportos", `${hub}#orientacao-aeroportuaria`, APOLICE_CONTRATOS_PATH, GARANTIA_AEROPORTUARIA_PATH]) {
      await expect(article.locator(`a[href="${path}"]`)).toHaveCount(1);
    }
    const wa = new URL((await article.getByRole("link", { name: "WhatsApp oficial: (11) 5199-7500" }).getAttribute("href"))!);
    expect(wa.origin + wa.pathname).toBe("https://wa.me/551151997500");
    await article.locator("#faq summary").first().focus();
    await page.keyboard.press("Enter");
    await expect(article.getByText(guiaFaqs[0][1], { exact: true })).toBeVisible();
    const jsonLd = await page.locator('script[type="application/ld+json"]').filter({ hasText: `${canonical}#artigo` }).textContent();
    const [posting, faq] = JSON.parse(jsonLd!)["@graph"];
    expect(posting).toMatchObject({ "@type": "BlogPosting", headline: guiaAeroportuarioTitle, mainEntityOfPage: canonical, inLanguage: "pt-BR" });
    expect(posting).not.toHaveProperty("datePublished");
    expect(faq.mainEntity.map((item: { name: string; acceptedAnswer: { text: string } }) => [item.name, item.acceptedAnswer.text])).toEqual(guiaFaqs);

    if (width === 1280) {
      for (const path of [APOLICE_CONTRATOS_PATH, GARANTIA_AEROPORTUARIA_PATH]) {
        await article.locator(`a[href="${path}"]`).click();
        expect(new URL(page.url()).pathname).toBe(path);
        await expect(page.getByText("Publicação condicionada à revisão técnica.", { exact: false })).toBeVisible();
        await page.goBack();
        await expect(article).toBeVisible();
      }
    }
  });
}

test("os três rascunhos não entram na navegação nem no sitemap público", async ({ page, request }) => {
  test.skip(!publicOrigin, "Defina AIRPORT_EDITORIAL_PUBLIC_ORIGIN com a origem pública que recebeu o build.");
  const sitemap = await request.get(new URL("/sitemap-blog.xml", publicOrigin!).href);
  expect(sitemap.ok()).toBe(true);
  const xml = await sitemap.text();
  await page.goto(new URL(hub, publicOrigin!).href);
  await expect(page.getByRole("heading", { name: "Leituras para quem administra o contrato" })).toBeVisible();
  for (const path of drafts) {
    expect(xml).not.toContain(path);
    await expect(page.locator(`a[href="${path}"]`)).toHaveCount(0);
  }
  await page.goto(new URL(GUIA_AEROPORTUARIO_PATH, publicOrigin!).href);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByRole("heading", { name: guiaAeroportuarioTitle, exact: true })).toHaveCount(0);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
});
