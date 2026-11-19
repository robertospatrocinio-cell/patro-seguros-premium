import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import ConsorcioPlanningSimulator from "./ConsorcioPlanningSimulator";
import { calculateConsorcioScenario, formatConsorcioCurrency } from "@/lib/consorcioSimulation";

vi.mock("@/lib/tracking", () => ({ trackWhatsAppClick: vi.fn() }));
afterEach(cleanup);

describe("Apresentação educativa do simulador de consórcio", () => {
  it("mantém o cálculo inicial e diferencia exemplo de proposta", () => {
    render(<ConsorcioPlanningSimulator onRequest={vi.fn()} />);
    const result = calculateConsorcioScenario({
      credit: 300000, consortiumMonths: 180, administrationPercent: 20,
      reservePercent: 2, consortiumOtherCosts: 0, financingMonths: 180,
      downPayment: 0, monthlyInterestPercent: 1, financingOtherCosts: 0,
    })!;
    expect(screen.getByText(formatConsorcioCurrency(result.consortiumPayment), { exact: false })).toBeVisible();
    expect(screen.getByText(/não taxas de mercado, ofertas ou proposta comercial/)).toBeVisible();
    expect(screen.getByText(/Comparação hipotética, sem garantia de economia/)).toBeVisible();
    expect(screen.getByText(/Não inclui reajustes ou custo da espera pelo bem/)).toBeVisible();
  });

  it("não oferece contato com cenário inválido e transmite o cenário válido sem alterações", () => {
    const request = vi.fn();
    render(<ConsorcioPlanningSimulator onRequest={request} />);
    fireEvent.click(screen.getByRole("radio", { name: "Pesados & Agro" }));
    expect(screen.getByLabelText("Prazo desejado (meses)")).toHaveValue(120);
    fireEvent.change(screen.getByLabelText("Valor da carta de crédito (R$)"), { target: { value: "1000" } });
    expect(screen.getByRole("alert")).toBeVisible();
    expect(screen.queryByRole("button", { name: "Prefiro receber contato da Patro" })).not.toBeInTheDocument();
    fireEvent.change(screen.getByLabelText("Valor da carta de crédito (R$)"), { target: { value: "400000" } });
    fireEvent.click(screen.getByRole("button", { name: "Prefiro receber contato da Patro" }));
    expect(request).toHaveBeenCalledWith(400000, expect.stringContaining("Cenário educativo, não é proposta"), "Pesados & Agro");
    const link = screen.getByRole("link", { name: /Consultar grupos e histórico/ });
    const url = new URL(link.getAttribute("href")!);
    expect(url.hostname).toBe("wa.me");
    expect(url.searchParams.get("text")).toContain("Pesados & Agro");
  });

  it("apresenta também o cenário em que o consórcio tem maior total nominal", () => {
    render(<ConsorcioPlanningSimulator onRequest={vi.fn()} />);
    fireEvent.click(screen.getByText("Ajustar taxas, entrada e outros custos"));
    fireEvent.change(screen.getByLabelText("Juros do financiamento ao mês (%)"), { target: { value: "0" } });
    expect(screen.getByText("Diferença nominal: consórcio com maior total neste exemplo")).toBeVisible();
  });
});
