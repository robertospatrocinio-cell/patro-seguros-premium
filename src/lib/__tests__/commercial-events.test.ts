import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";
import { readFileSync } from "node:fs";
import {
  initCommercialInteractions,
  trackCotacaoSubmit,
  trackWhatsAppClick,
  trackCotacaoClick,
} from "@/lib/tracking";

const gtag = vi.fn();
let cleanup: (() => void) | undefined;
const eventCount = (name: string) => gtag.mock.calls.filter(call => call[1] === name).length;

beforeEach(() => {
  localStorage.clear();
  window.history.replaceState({}, "", "/seguro-empresarial");
  window.gtag = gtag;
  window.fbq = vi.fn();
  window.activateAnalytics = vi.fn();
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true }));
  gtag.mockClear();
});
afterEach(() => {
  cleanup?.();
  document.body.innerHTML = "";
  vi.unstubAllGlobals();
});

describe("Mensuração comercial sem valores dos campos", () => {
  it("conta apenas um início por formulário, mesmo com vários campos", () => {
    document.body.innerHTML = '<form aria-label="Cotação empresarial"><input><input></form>';
    cleanup = initCommercialInteractions();
    const fields = document.querySelectorAll("input");
    fields.forEach(field => field.dispatchEvent(new Event("input", { bubbles: true })));
    expect(eventCount("form_start")).toBe(1);
    expect(eventCount("generate_lead")).toBe(0);
  });

  it("não mede formulários administrativos", () => {
    window.history.replaceState({}, "", "/crm");
    document.body.innerHTML = '<form><input></form>';
    cleanup = initCommercialInteractions();
    document.querySelector("input")!.dispatchEvent(new Event("input", { bubbles: true }));
    expect(gtag).not.toHaveBeenCalled();
  });

  it("mede telefone sem enviar número, texto do link ou parâmetros", () => {
    document.body.innerHTML = '<a href="tel:+5511999999999"><span>Ligar</span></a>';
    cleanup = initCommercialInteractions();
    document.querySelector("span")!.click();
    expect(eventCount("click_phone")).toBe(1);
    expect(JSON.stringify(gtag.mock.calls)).not.toContain("999999999");
  });

  it("emite um sucesso e um lead por chamada confirmada", () => {
    trackCotacaoSubmit("Seguro Empresarial", { origin: "teste-confirmado" });
    expect(eventCount("form_submit_success")).toBe(1);
    expect(eventCount("generate_lead")).toBe(1);
  });

  it("usa nomes canônicos sem emitir também os aliases antigos no GA4", () => {
    trackWhatsAppClick("teste");
    trackCotacaoClick("teste");
    expect(eventCount("click_whatsapp")).toBe(1);
    expect(eventCount("click_quote")).toBe(1);
    expect(eventCount("whatsapp_click")).toBe(0);
    expect(eventCount("cotacao_click")).toBe(0);
    expect(eventCount("generate_lead")).toBe(0);
  });

  it("não pede carregamento de terceiros após recusa", () => {
    localStorage.setItem("patro-cookies-accepted", "false");
    trackCotacaoSubmit("Auto");
    expect(window.activateAnalytics).not.toHaveBeenCalled();
  });
});

describe("Regressões estáticas dos dois formulários de cotação", () => {
  for (const component of ["InsuranceQuoteForm", "QuickQuoteForm"]) {
    it(`${component}: conta o envio apenas depois da confirmação do e-mail`, () => {
      const source = readFileSync(`src/components/${component}.tsx`, "utf8");
      const handler = source.slice(source.indexOf("const handleSubmit ="));
      expect(handler.indexOf("trackCotacaoSubmit(")).toBeGreaterThan(handler.indexOf("if (error || !data?.success)"));
      expect(handler).not.toContain('"generate_lead"');
      expect(handler).not.toContain('"track", "Lead"');
      expect(handler).not.toContain("encodeURIComponent(parts)");
      expect(handler).toContain("const finalParts = `Olá! Enviei uma solicitação");
    });
  }
});
