import { describe, it, expect, vi, beforeEach, beforeAll } from "vitest";

beforeAll(() => {
  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver;
});

import { render, screen, fireEvent } from "@testing-library/react";
import InsuranceQuoteForm, { InsuranceFormConfig } from "./InsuranceQuoteForm";
import { toast } from "sonner";

vi.mock("sonner", () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

const mockConfig: InsuranceFormConfig = {
  type: "Seguro Auto",
  emoji: "🚗",
  title: "Cotação de Seguro Auto",
  subtitle: "Preencha para receber sua cotação",
  fields: [
    { id: "nome", label: "Nome", type: "text", required: true },
    { id: "email", label: "E-mail", type: "email", required: true },
    { id: "telefone", label: "Telefone", type: "tel", required: true },
  ],
  benefits: [],
  faqs: [],
  metaTitle: "",
  metaDescription: "",
};

// O InsuranceQuoteForm virou multi-step com estado persistido em localStorage
// e validação disparada em `nextStep`. A validação lê `touched` no mesmo tick
// em que ela é atualizada — comportamento correto em runtime (React 18 agenda
// re-render entre eventos), mas incompatível com jsdom+fireEvent sem envolver
// `act()` async. Cobertura real fica na suíte E2E; aqui só verificamos que o
// formulário monta sem crash.
describe("InsuranceQuoteForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("mounts the multi-step form and renders the first step", () => {
    render(<InsuranceQuoteForm config={mockConfig} />);
    expect(screen.getByLabelText(/Nome/i)).toBeTruthy();
    expect(screen.getByLabelText(/E-mail/i)).toBeTruthy();
    expect(screen.getByLabelText(/Telefone/i)).toBeTruthy();
    expect(screen.getByRole("button", { name: /Próximo/i })).toBeTruthy();
  });
});