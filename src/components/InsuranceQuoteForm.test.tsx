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

// A validação de envio deve funcionar já no primeiro clique, mesmo antes
// de qualquer campo perder o foco e atualizar o estado `touched`.
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

  it("shows the first required error and focuses it on the first submit", () => {
    render(<InsuranceQuoteForm config={mockConfig} />);
    const name = screen.getByLabelText(/Nome/i);
    name.scrollIntoView = vi.fn();
    fireEvent.click(screen.getByRole("button", { name: /Próximo/i }));
    expect(name.getAttribute("aria-invalid")).toBe("true");
    expect(document.activeElement).toBe(name);
    expect(toast.error).toHaveBeenCalledWith("Por favor, verifique o campo: Nome");
    expect(screen.getByRole("form", { name: /Cotação de Seguro Auto/i }).textContent).toContain("Passo 1 de");
  });
});