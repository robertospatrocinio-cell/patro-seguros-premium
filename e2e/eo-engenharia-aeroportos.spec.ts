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
    await expect(contract).toHaveAttribute("href", "#analise-contratual");
    const wa = main.getByRole("link", { name: "Enviar cláusula pelo WhatsApp" });
    const url = new URL((await wa.getAttribute("href"))!);
    expect(url.origin + url.pathname).toBe("https://wa.me/551151997500");
    expect(url.searchParams.get("text")).toContain("Posso enviar as exigências do contrato?");
    await contract.focus();
    await contract.press("Enter");
    await expect(page).toHaveURL(/#analise-contratual$/);
    const form = main.locator("#analise-contratual form");
    await form.getByRole("button", {name:"Continuar"}).click();
    await expect(form.getByLabel("Nome do responsável")).toBeVisible();
    await form.getByLabel("Nome do responsável").fill("Pessoa Fictícia");
    await form.getByLabel("Nome da empresa").fill("Empresa de Teste");
    await form.getByLabel("WhatsApp com DDD").fill("123");
    await form.getByLabel("E-mail").fill("qa@example.invalid");
    await form.getByRole("button", {name:"Continuar"}).click();
    await expect(form.getByRole("alert")).toContainText("DDD");
    await expect(form.getByLabel("WhatsApp com DDD")).toBeFocused();
    await expect(form.getByLabel("WhatsApp com DDD")).toHaveAttribute("aria-describedby", "eo-form-error");
    await form.getByLabel("WhatsApp com DDD").fill("11000000000");
    await form.getByRole("button", {name:"Continuar"}).click();
    await form.getByRole("button", {name:"Continuar"}).click();
    await form.getByRole('checkbox').check();
    const send = form.getByRole('button',{name:'Solicitar análise e cotação'});
    const file = form.getByLabel('Anexar cláusula contratual');
    await file.setInputFiles({ name:'teste.pdf', mimeType:'application/pdf', buffer:Buffer.from('não é PDF') });
    await send.click();
    await expect(form.getByRole('alert')).toContainText('PDF válido');
    await form.getByRole('button',{name:'Remover anexo selecionado'}).click();
    const pdf = { name:'teste.pdf', mimeType:'application/pdf', buffer:Buffer.from('%PDF-1.4\n% fixture\n%%EOF') };
    await file.setInputFiles(pdf);
    await form.getByRole('button', {name:'Voltar'}).click();
    await form.getByRole('button', {name:'Continuar'}).click();
    await expect(file).toHaveValue('');
    await expect(form.getByRole('checkbox')).not.toBeChecked();
    await expect(form.getByRole('button',{name:'Remover anexo selecionado'})).toHaveCount(0);
    await form.getByRole('checkbox').check();
    if (width === 360) await file.setInputFiles(pdf);
    let requests=0;
    await page.route('**/functions/v1/submit-lead', async route=>{
      requests++;
      const requestBody = route.request().postDataBuffer()?.toString() || '';
      expect(requestBody).toContain('Empresa de Teste');
      expect(requestBody.includes('filename="clausula.pdf"')).toBe(width === 360);
      await route.fulfill({status:requests===1?503:200,contentType:'application/json',body:JSON.stringify(requests===1?{error:'crm'}:{success:true,intake:'eo-v1'})});
    });
    await send.click();
    await expect(form.getByRole('alert')).toContainText('confirmar');
    await send.click();
    await expect(main.getByRole('heading',{name:'Solicitação recebida'})).toBeVisible();
    expect(requests).toBe(2);
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
  await expect(faq).toHaveCount(27);
  await expect(faq.locator('summary').filter({ hasText: 'Quem faz Seguro E&O Engenharia em Guarulhos?' })).toHaveCount(1);
  await expect(page).toHaveTitle('Seguro E&O Engenharia para Aeroportos | Patro Seguros');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://www.patroseguros.com.br${path}`);
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
