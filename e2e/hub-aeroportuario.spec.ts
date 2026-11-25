import { expect, test } from "@playwright/test";

for (const width of [390, 1280]) {
  test(`hub aeroportuário: descoberta e contato em ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/seguros-aeroportuarios");
    const main = page.locator("main").filter({ has: page.locator("#hub-titulo") }).last();
    await expect(main.getByRole("heading", { level: 1, name: "Seguros para Empresas e Prestadores de Serviços em Aeroportos" })).toBeVisible();
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

test("a vertical é navegável do hub empresarial até E&O e seu guia público", async ({ page }) => {
  await page.goto("/seguros-empresariais");
  const entry = page.getByRole("main").getByRole("link", { name: /Seguros para Aeroportos/ });
  await expect(entry).toHaveAttribute("href", "/seguros-aeroportuarios");
  await entry.click();
  const topics = page.getByRole("navigation", { name: "Encontre o próximo passo para o seu contrato" });
  await expect(topics.getByRole("link")).toHaveCount(4);
  await topics.getByRole("link", { name: "Modalidades de seguro" }).click();
  await expect(page).toHaveURL(/#modalidades-aeroportuarias$/);
  await page.getByRole("link", { name: "Consultar Seguro E&O Engenharia", exact: true }).click();
  const crumbs = page.getByRole("navigation", { name: "Breadcrumb", exact: true });
  await expect(crumbs.getByRole("link", { name: "Seguros aeroportuários" })).toHaveAttribute("href", "/seguros-aeroportuarios");
  await page.getByRole("link", { name: /Interpretar a cláusula de E&O Engenharia/ }).click();
  await expect(page.locator("#eo-artigo h1")).toBeVisible();
  await expect(page.locator("#eo-artigo").getByRole("link", { name: "Compare os seguros para prestadores em aeroportos" })).toHaveAttribute("href", "/seguros-aeroportuarios#modalidades-aeroportuarias");
});

test("triagem e cotação: consentimento, classificação e anexo opcional", async ({ page }) => {
  const sends: string[] = [];
  await page.route("**/functions/v1/submit-lead", async route => {
    if (route.request().method() !== "POST") return route.fulfill({ status: 204, headers: { "access-control-allow-origin": "*", "access-control-allow-headers": "*", "access-control-allow-methods": "POST, OPTIONS" } });
    sends.push(route.request().postData() ?? "");
    await route.fulfill({ headers: { "access-control-allow-origin": "*" }, json: { success: true, intake: "airport-v1", uploaded: true } });
  });
  await page.setViewportSize({ width: 390, height: 840 });
  await page.goto("/seguros-aeroportuarios?utm_source=teste&utm_term=aeroporto#orientacao-aeroportuaria");
  const triage = page.locator("#orientacao-aeroportuaria");
  await expect(triage.locator("label")).toHaveCount(10);
  await triage.getByLabel(/qual aeroporto/i).fill("Guarulhos (GRU)");
  await triage.getByLabel(/qual serviço/i).selectOption({ label: "Projetos, laudos ou consultoria técnica" });
  await triage.getByLabel(/exigência de Seguro Garantia/i).selectOption("Sim");
  await triage.getByRole("button", { name: "Ver orientação preliminar" }).click();
  await expect(triage.getByRole("heading", { name: "Modalidades para avaliar" })).toBeFocused();
  await expect(triage.getByRole("listitem").filter({ hasText: "Seguro Garantia" })).toBeVisible();
  await triage.getByRole("button", { name: "Revisar respostas" }).click();
  await expect(triage.getByLabel(/qual aeroporto/i)).toHaveValue("Guarulhos (GRU)");
  await triage.getByRole("button", { name: "Ver orientação preliminar" }).click();
  await triage.getByRole("link", { name: "Continuar com estas respostas" }).click();
  const quote = page.locator("#cotacao-aeroportuaria");
  await quote.getByText("Confira as respostas que acompanham o pedido", { exact: true }).click();
  await expect(quote.getByText("Guarulhos (GRU)", { exact: true })).toBeVisible();
  await quote.getByLabel("Nome do responsável").fill("Pessoa Teste");
  await quote.getByLabel("Nome da empresa").fill("Empresa Teste");
  await quote.getByLabel("WhatsApp com DDD").fill("11999990000");
  await quote.getByLabel("E-mail").fill("teste@example.com");
  await quote.getByRole("button", { name: "Continuar" }).click();
  await quote.getByLabel("Modalidade de interesse").selectOption("garantia");
  await quote.getByRole("button", { name: "Continuar" }).click();
  const submit = quote.getByRole("button", { name: "Solicitar análise e cotação" });
  await submit.click();
  await expect(quote.getByRole("checkbox")).toBeFocused();
  expect(sends).toHaveLength(0);
  await quote.getByLabel("Anexar cláusula contratual").setInputFiles({ name: "teste.pdf", mimeType: "application/pdf", buffer: Buffer.from("%PDF-1.7\n%%EOF") });
  await quote.getByRole("checkbox").check();
  await submit.click();
  await expect(quote.getByRole("heading", { name: "Solicitação recebida" })).toBeVisible();
  expect(sends).toHaveLength(1);
  for (const part of ['"intake":"airport-v1"', '"consent":true', '"product":"garantia"', '"airport":"Guarulhos (GRU)"', '"utm_term":"aeroporto"', 'filename="clausula.pdf"']) expect(sends[0]).toContain(part);
  const wa = new URL((await quote.getByRole("link", { name: "Falar pelo WhatsApp da Patro" }).getAttribute("href"))!);
  expect(wa.origin + wa.pathname).toBe("https://wa.me/551151997500");
  expect(wa.searchParams.get("text")).not.toContain("Guarulhos (GRU)");
});

test("analytics do hub mede a triagem uma vez e não expõe respostas nem parâmetros da URL", async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem("patro-cookies-accepted", "true");
  });
  await page.goto("/seguros-aeroportuarios?utm_content=marcador-privado-url#orientacao-aeroportuaria");
  const triage = page.locator("#orientacao-aeroportuaria");
  await triage.getByLabel(/qual aeroporto/i).fill("marcador-privado-resposta");
  await triage.getByLabel(/exigência de Seguro Garantia/i).selectOption("Sim");
  await triage.getByRole("button", { name: "Ver orientação preliminar" }).click();
  await triage.getByRole("button", { name: "Revisar respostas" }).click();
  await triage.getByRole("button", { name: "Ver orientação preliminar" }).click();
  const events = await page.evaluate(() => (window.dataLayer ?? []).flatMap(entry => {
    const obj = entry as Record<string, unknown>;
    const name = obj.event ?? obj[1];
    return typeof name === "string" && name.startsWith("airport_") ? [{ name, params: obj.event ? obj : obj[2] }] : [];
  }));
  expect(events.filter(({ name }) => name === "airport_hub_view")).toHaveLength(1);
  expect(events.filter(({ name }) => name === "airport_needs_assessment_start")).toHaveLength(1);
  expect(events.filter(({ name }) => name === "airport_needs_assessment_complete")).toEqual([
    { name: "airport_needs_assessment_complete", params: expect.objectContaining({ modality: "garantia", page_location: "https://www.patroseguros.com.br/seguros-aeroportuarios" }) },
  ]);
  expect(JSON.stringify(events)).not.toContain("marcador-privado");
});
