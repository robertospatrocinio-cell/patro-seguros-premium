import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HealthPlanDecisionGuide from "./HealthPlanDecisionGuide";
import AutoQuoteDecisionGuide from "./AutoQuoteDecisionGuide";
import { HUB_FAQS } from "@/data/saudeVertical";

describe("Guias comerciais com referências e limites explícitos", () => {
  it("apresenta hospitais como itens de conferência, não como rede confirmada", () => {
    render(<MemoryRouter><HealthPlanDecisionGuide /></MemoryRouter>);
    const table = screen.getByRole("table");
    expect(within(table).getAllByText("Credenciamento não confirmado por produto.")).toHaveLength(5);
    expect(within(table).getByRole("rowheader", { name: "Hospital Stella Maris" })).toBeInTheDocument();
    expect(within(table).getByRole("rowheader", { name: "Lavoisier e Sanitas" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "PME com 2 vidas" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "MEI" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Individual ou familiar" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Guia ANS de Planos de Saúde" })).toHaveAttribute("href", "https://www.ans.gov.br/gpw-beneficiario/");
    expect(screen.getByRole("link", { name: "Veja os critérios do comparativo de planos de saúde" })).toHaveAttribute("href", "/comparativo-planos-saude-guarulhos");
  });

  it("oferece comparação equivalente de auto e preserva o caminho da cotação", () => {
    render(<MemoryRouter><AutoQuoteDecisionGuide /></MemoryRouter>);
    const table = screen.getByRole("table");
    expect(within(table).getAllByRole("rowheader")).toHaveLength(6);
    expect(within(table).getByRole("rowheader", { name: "Franquia" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Tabela FIPE oficial" })).toHaveAttribute("href", "https://veiculos.fipe.org.br/");
    expect(screen.getByRole("link", { name: "Pedir propostas para meu perfil" })).toHaveAttribute("href", "/cotacao?tipo=auto");
    expect(screen.getByText(/solicitar cotação não inicia cobertura/)).toBeInTheDocument();
  });

  it("não divulga preço nem percentual de economia sem base no FAQ de saúde", () => {
    const answers = HUB_FAQS.map(({ answer }) => answer).join(" ");
    expect(answers).not.toMatch(/R\$|\d+\s*%/);
    expect(answers).toContain("Não há economia garantida");
    expect(answers).toContain("não é confirmação de credenciamento");
  });
});
