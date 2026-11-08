import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import CommercialDashboard from "./CommercialDashboard";

const mocked = vi.hoisted(() => ({ useCommercialMetrics: vi.fn() }));
vi.mock("@/hooks/queries/useCommercialMetrics", () => mocked);

beforeEach(() => mocked.useCommercialMetrics.mockReset());

describe("painel comercial", () => {
  it("mostra ausência de registros e limitações sem inventar conversão", () => {
    mocked.useCommercialMetrics.mockReturnValue({
      isPending: false, isFetching: false, isError: false, refetch: vi.fn(),
      data: { start: "2026-10-01T00:00:00.000Z", end: "2026-10-31T00:00:00.000Z", leads: [], clicks: [], stages: [], policies: [] },
    });
    render(<CommercialDashboard />);
    expect(screen.getByText("Nenhum lead ou clique registrado neste período.")).toBeInTheDocument();
    expect(screen.getByText("Receita atribuível:")).toBeInTheDocument();
    expect(screen.getByText(/indisponíveis, sem sessões\/visitantes do GA4 integrados/)).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: "Período" })).toHaveValue("30");
  });

  it("exibe falha sem transformar erro em zero ou exibir cache antigo", () => {
    mocked.useCommercialMetrics.mockReturnValue({
      isPending: false, isFetching: false, isError: true, error: new Error("Sessão expirada"), refetch: vi.fn(),
      data: { start: "2026-10-01T00:00:00.000Z", end: "2026-10-31T00:00:00.000Z", leads: [], clicks: [], stages: [], policies: [] },
    });
    render(<CommercialDashboard />);
    expect(screen.getByRole("alert")).toHaveTextContent("Sessão expirada");
    expect(screen.queryByText("Leads registrados")).not.toBeInTheDocument();
    expect(screen.queryByText("Captação por página")).not.toBeInTheDocument();
  });

  it("distingue carregamento de um período sem resultados", () => {
    mocked.useCommercialMetrics.mockReturnValue({ isPending: true, isFetching: true, isError: false, refetch: vi.fn() });
    render(<CommercialDashboard />);
    expect(screen.getByRole("status")).toHaveTextContent("Consultando os registros");
    expect(screen.getByRole("button", { name: "Consultando…" })).toBeDisabled();
    expect(screen.queryByText("Leads registrados")).not.toBeInTheDocument();
  });
});
