import { afterEach, describe, expect, it, vi } from "vitest";
import { getLazyMarginMultiplier } from "../monitoringSession";

function setDevice(mobile: boolean, effectiveType = "4g", saveData = false) {
  vi.stubGlobal("navigator", { connection: { effectiveType, saveData } });
  vi.stubGlobal("matchMedia", vi.fn(() => ({ matches: mobile })));
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("Carregamento por proximidade no celular", () => {
  it("reduz a antecipação mesmo quando o celular está em 4G", () => {
    setDevice(true);
    expect(getLazyMarginMultiplier()).toBe(0.75);
  });

  it("mantém a antecipação maior no computador em conexão rápida", () => {
    setDevice(false);
    expect(getLazyMarginMultiplier()).toBe(1.5);
  });

  it("limita também celulares sem informação de conexão", () => {
    setDevice(true);
    vi.stubGlobal("navigator", {});
    expect(getLazyMarginMultiplier()).toBe(0.75);
  });

  it.each([
    ["2g", false, 0.5],
    ["slow-2g", false, 0.5],
    ["4g", true, 0.35],
  ])("preserva o limite da rede %s (economia: %s)", (connection, saveData, expected) => {
    setDevice(true, connection, saveData);
    expect(getLazyMarginMultiplier()).toBe(expected);
  });
});
