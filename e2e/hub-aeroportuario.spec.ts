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

test("triagem: revisar sem enviar e encaminhar o resumo com consentimento e origem", async ({ page }) => {
  const sends: { lead: { source_origin: string; raw_data: { triagem: Record<string, string>; consent: boolean } }; textBody: string }[] = [];
  await page.route("**/functions/v1/send-form-email", async route => {
    sends.push(route.request().postDataJSON());
    await route.fulfill({ json: { success: true, leadId: "teste" } });
  });
  await page.setViewportSize({ width: 390, height: 840 });
  await page.goto("/seguros-aeroportuarios#orientacao-aeroportuaria");
  const triage = page.locator("#orientacao-aeroportuaria");
  const review = triage.getByRole("button", { name: "Ver orientação preliminar" });
  await review.click();
  await expect(triage.getByLabel(/qual aeroporto/i)).toBeFocused();
  await triage.getByLabel(/qual aeroporto/i).fill("Guarulhos (GRU)");
  await triage.getByLabel(/qual serviço/i).selectOption({ label: "Projetos, laudos ou consultoria técnica" });
  await triage.getByLabel(/existe contrato/i).selectOption("Sim, tenho o documento");
  await triage.getByLabel(/algum seguro específico/i).selectOption("Seguro Garantia");
  await triage.getByLabel(/existe prazo/i).fill("A confirmar");
  await triage.getByLabel(/algum seguro atualmente/i).selectOption("Sim");
  await review.click();
  await expect(triage.getByRole("heading", { name: "Modalidades para avaliar" })).toBeFocused();
  await expect(triage.getByText("Seguro E&O Engenharia", { exact: true })).toBeVisible();
  await expect(triage.getByText("Seguro Garantia", { exact: true })).toBeVisible();
  await triage.getByRole("button", { name: "Revisar respostas" }).click();
  await expect(triage.getByLabel(/qual aeroporto/i)).toHaveValue("Guarulhos (GRU)");
  await triage.getByLabel(/existe prazo/i).fill("Antes da mobilização");
  await review.click();
  await triage.getByRole("link", { name: "Continuar com estas respostas" }).click();
  const quote = page.locator("#cotacao-aeroportuaria");
  await expect(quote.getByText("Antes da mobilização", { exact: true })).toBeVisible();
  await quote.getByRole("textbox", { name: /^Nome/ }).fill("Teste de triagem");
  await quote.getByLabel(/WhatsApp com DDD/).fill("11000000000");
  const submit = quote.getByRole("button", { name: "Enviar informações para análise da Patro Seguros" });
  await submit.click();
  await expect(quote.getByRole("checkbox")).toBeFocused();
  expect(sends).toHaveLength(0);
  await quote.getByRole("checkbox").check();
  await submit.click();
  await expect(quote.getByRole("heading", { name: "Solicitação enviada" })).toBeVisible();
  expect(sends).toHaveLength(1);
  expect(sends[0].lead.source_origin).toBe("Hub Aeroportuário");
  expect(sends[0].lead.raw_data.consent).toBe(true);
  expect(Object.values(sends[0].lead.raw_data.triagem)).toEqual(["Guarulhos (GRU)", "Projetos, laudos ou consultoria técnica", "Sim, tenho o documento", "Seguro Garantia", "Antes da mobilização", "Sim"]);
  expect(sends[0].textBody).toContain("Origem comercial: Hub Aeroportuário");
  const wa = new URL((await quote.getByRole("link", { name: "Continuar pelo WhatsApp" }).getAttribute("href"))!);
  expect(wa.origin + wa.pathname).toBe("https://wa.me/551151997500");
  expect(wa.searchParams.get("text")).not.toContain("mobilização");
});
