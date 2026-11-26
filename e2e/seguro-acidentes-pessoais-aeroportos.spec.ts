import { expect, test } from "@playwright/test";

const path = "/seguro-acidentes-pessoais-aeroportos";
const domain = "https://www.patroseguros.com.br";
const title = "Seguro de Acidentes Pessoais para Aeroportos | Patro Seguros";

for (const width of [360, 1280]) {
  test(`Acidentes Pessoais em aeroportos: descoberta e layout em ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/seguros-aeroportuarios");
    const entry = page.locator(`main a[href="${path}"]`).first();
    await expect(entry).toBeVisible();
    await entry.click();
    await expect(page).toHaveURL(new RegExp(`${path}$`));
    await expect(page).toHaveTitle(title);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", domain + path);
    const main = page.locator("main").filter({ has: page.locator("#ap-hero-title") });
    await expect(main.getByRole("heading", { level: 1 })).toHaveCount(1);
    await expect(main.getByRole("link", { name: "Falar com um especialista" })).toHaveAttribute("href", "https://wa.me/551151997500");
    await expect(main.locator("#perguntas summary")).toHaveCount(25);
    const faq = main.getByText("O seguro cobre trabalhos em altura?", { exact: true });
    await faq.focus();
    await faq.press("Enter");
    await expect(main.getByText(/^Não automaticamente\. Informe altura/)).toBeVisible();
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    const schema = await page.locator('script[type="application/ld+json"]').evaluateAll(nodes => nodes.flatMap(node => {
      const value = JSON.parse(node.textContent || "{}");
      return (value["@graph"] ?? [value]).flatMap((entry: { "@type"?: string | string[] }) => entry["@type"] ?? []);
    }));
    expect(schema).toEqual(expect.arrayContaining(["WebPage", "Service", "FAQPage", "BreadcrumbList"]));
  });
}

for (const profile of ["individual", "company"] as const) {
  test(`cotação progressiva de Acidentes Pessoais: ${profile}`, async ({ page }) => {
    const sent: string[] = [];
    await page.route("**/functions/v1/submit-lead", async route => {
      const headers = { "access-control-allow-origin": "*", "access-control-allow-headers": "*", "access-control-allow-methods": "POST, OPTIONS" };
      if (route.request().method() !== "POST") return route.fulfill({ status: 204, headers });
      sent.push(route.request().postData() ?? "");
      return route.fulfill({ headers, json: { success: true, intake: "airport-ap-v1", uploaded: profile === "company" } });
    });
    await page.goto(path);
    await page.getByRole("link", { name: "Solicitar cotação de Acidentes Pessoais", exact: true }).click();
    const form = page.locator("#cotacao-acidentes-pessoais");
    await form.getByLabel("Quem pretende contratar?").selectOption(profile);
    if (profile === "company") await form.getByLabel("Razão social").fill("Empresa Teste");
    else await expect(form.getByLabel("Razão social")).toHaveCount(0);
    await form.getByLabel("Nome do responsável").fill("Pessoa Teste");
    await form.getByLabel("WhatsApp com DDD").fill("11999990000");
    await form.getByLabel("E-mail").fill("teste@example.com");
    const next = form.getByRole("button", { name: "Continuar" });
    await next.click();
    await form.getByLabel("Atividade profissional").fill("Manutenção predial");
    await form.getByLabel(/Aeroporto onde/).fill("Guarulhos (GRU)");
    await form.getByLabel("Quantidade de profissionais").fill("0");
    await next.click();
    await expect(form.getByRole("alert")).toContainText("quantidade válida");
    await form.getByLabel("Quantidade de profissionais").fill(profile === "company" ? "12" : "1");
    await form.getByLabel("Vigência desejada").fill("12 meses");
    await next.click();
    const submit = form.getByRole("button", { name: "Solicitar cotação de Seguro de Acidentes Pessoais" });
    await submit.click();
    expect(sent).toHaveLength(0);
    await form.getByRole("checkbox").check();
    if (profile === "company") {
      const upload = form.getByLabel("Anexar cláusula contratual");
      await upload.setInputFiles({ name: "teste.pdf", mimeType: "application/pdf", buffer: Buffer.from("arquivo inválido") });
      await submit.click();
      await expect(form.getByRole("alert")).toContainText("PDF válido");
      expect(sent).toHaveLength(0);
      await upload.setInputFiles({ name: "clausula-teste.pdf", mimeType: "application/pdf", buffer: Buffer.from("%PDF-1.7\n%%EOF\n") });
    }
    await submit.click();
    await expect(form.getByRole("heading", { name: "Solicitação recebida" })).toBeVisible();
    expect(sent).toHaveLength(1);
    expect(sent[0]).toContain('"intake":"airport-ap-v1"');
    expect(sent[0]).toContain(`"profile":"${profile}"`);
    expect(sent[0]).toContain('"consent":true');
    expect(sent[0].includes('filename="clausula.pdf"')).toBe(profile === "company");
  });
}
