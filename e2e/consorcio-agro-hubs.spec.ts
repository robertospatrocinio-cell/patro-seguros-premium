import { expect, test } from "@playwright/test";
import { consorcioModalities } from "../src/data/consorcioHub";

// Não envia formulários nem cria leads reais. PLAYWRIGHT_BASE_URL permite testar o preview/build.
test.use({ baseURL: process.env.PLAYWRIGHT_BASE_URL || "https://www.patroseguros.com.br" });
for (const width of [390, 1280]) {
  test.describe(`Hubs Consórcio e Agro — ${width}px`, () => {
    test.setTimeout(120_000);
    test.use({ viewport: { width, height: 900 } });

    test("consórcio: modalidades nacionais e retorno ao hub", async ({ page }) => {
      await page.goto("/consorcio");
      await expect(page.locator("main h1")).toHaveCount(1);
      for (const modality of consorcioModalities) {
        const link = page.locator("#modalidades").getByRole("link", { name: modality.action });
        await expect(link).toHaveAttribute("href", modality.href);
        await link.click();
        await expect(page).toHaveURL(new RegExp(`${modality.href}/?$`));
        await expect(page.locator("main h1")).toBeVisible();
        await expect(page.locator('main a[href="/consorcio"]').first()).toBeVisible();
        await page.goto("/consorcio");
      }
    });

    test("consórcio: apresentação, chamadas, dúvidas e privacidade", async ({ page }) => {
      await page.goto("/consorcio");
      await expect(page.getByRole("heading", { level: 1 })).toHaveText("Seus planos merecem uma boa estratégia.");
      const hero = page.locator("section").filter({ has: page.locator("#consorcio-title") });
      await expect(hero).toContainText("A contemplação não tem data garantida.");
      const request = hero.getByRole("link", { name: "Solicitar simulação", exact: true });
      await expect(request).toHaveAttribute("href", "#simulacao");
      await request.click();
      await expect(page.locator("#consorcio-name")).toBeInViewport();
      await expect(page.locator("#simulacao").getByRole("link", { name: "Política de Privacidade" })).toHaveAttribute("href", "/politica-privacidade");
      await expect(page.locator('#simulacao input[name="cpf"], #simulacao input[type="file"]')).toHaveCount(0);
      const whatsapp = hero.getByRole("link", { name: "Conversar com a Patro" });
      const url = new URL((await whatsapp.getAttribute("href"))!);
      expect(url.hostname).toBe("wa.me");
      expect(url.searchParams.get("text")).toContain("consórcio");
      await expect(whatsapp).toHaveAttribute("rel", /noopener/);
      const faq = page.locator("#duvidas details").filter({ hasText: "Existe garantia de contemplação" });
      await faq.locator("summary").click();
      await expect(faq.locator("p")).toBeVisible();
      await expect(faq).toContainText("Nenhum consultor pode garantir uma data");
      for (const hash of ["#modalidades", "#comparar", "#como-funciona", "#comparativo", "#duvidas"]) {
        await expect(page.locator(hash)).toHaveCount(1);
      }
    });

    test("simulador: valores válidos, entrada inválida e envio do cenário ao formulário", async ({ page }) => {
      await page.goto("/consorcio#comparar");
      const simulator = page.locator("#comparar");
      await expect(simulator.getByRole("alert")).toHaveCount(0);
      await simulator.getByRole("radio", { name: "Pesados & Agro" }).check();
      await expect(page.locator("#planning-credit")).toHaveValue("300000");
      await expect(page.locator("#planning-months")).toHaveValue("120");
      await page.locator("#planning-credit").fill("1000");
      await expect(simulator.getByRole("alert")).toBeVisible();
      await expect(simulator.getByRole("button", { name: "Prefiro receber contato da Patro" })).toHaveCount(0);
      await page.locator("#planning-credit").fill("400000");
      await expect(simulator.getByRole("alert")).toHaveCount(0);
      const whatsapp = simulator.locator('a[href*="wa.me"], a[href*="api.whatsapp.com"]').first();
      await expect(whatsapp).toHaveAttribute("href", /text=/);
      const message = new URL((await whatsapp.getAttribute("href"))!).searchParams.get("text");
      expect(message).toContain("Pesados & Agro");
      await simulator.getByRole("button", { name: "Prefiro receber contato da Patro" }).click();
      await expect(page.locator("#consorcio-credit")).toHaveValue(/400/);
      await expect(page.locator("#consorcio-type")).toContainText("Pesados e agro");
      await expect(page.getByText("O cenário do simulador será enviado junto com sua solicitação.")).toBeVisible();
      await expect(page.locator("#simulacao")).toBeInViewport();
      await page.locator("#consorcio-credit").fill("R$ 500.000");
      await expect(page.getByText("O cenário do simulador será enviado junto com sua solicitação.")).toHaveCount(0);
    });

    test("agro: cards levam a produtos existentes, sem cair na página inicial", async ({ page }) => {
      await page.goto("/seguro-agro");
      await expect(page.locator("main h1")).toBeVisible();
      const destinations = await page.locator('main a[href^="/seguro-"]').evaluateAll(links =>
        [...new Set(links.map(link => link.getAttribute("href")!))],
      );
      expect(destinations.length).toBeGreaterThan(10);
      expect(destinations).not.toContain("/seguro-agricola");
      for (const destination of destinations) {
        await page.goto(destination);
        await expect(page.locator("main h1"), destination).toBeVisible();
        await expect(page).not.toHaveURL(/\/(?:404|not-found)?$/);
        await expect(page.locator("main")).not.toContainText("Página não encontrada");
      }
    });

    for (const type of ["agro", "agronegocio", "seguro-agro"]) {
      test(`cotação preserva a modalidade ${type}`, async ({ page }) => {
        await page.goto(`/cotacao?tipo=${type}`);
        const agro = page.getByRole("button", { name: "Agro", exact: true });
        await expect(agro).toBeVisible();
        await expect(agro).toHaveClass(/\bborder-primary\b/);
        await agro.click();
        await expect(page.getByLabel("Máquina, cultura ou atividade", { exact: true })).toBeVisible();
        await expect(page.getByLabel("Município / UF da operação", { exact: true })).toBeVisible();
        await expect(page.getByLabel("Dados do bem e da operação", { exact: true })).toBeVisible();
      });
    }

    test("hubs não provocam rolagem horizontal no documento", async ({ page }) => {
      for (const path of ["/consorcio", "/seguro-agro"]) {
        await page.goto(path);
        await expect(page.locator("main h1")).toBeVisible();
        const overflow = await page.evaluate(() =>
          document.documentElement.scrollWidth > window.innerWidth + 1,
        );
        expect(overflow, path).toBe(false);
      }
    });
  });
}
