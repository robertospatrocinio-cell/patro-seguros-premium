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

describe("InsuranceQuoteForm Validation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("blocks advancing when the e-mail is invalid", () => {
    render(<InsuranceQuoteForm config={mockConfig} />);
    fireEvent.change(screen.getByLabelText(/Nome/i), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByLabelText(/E-mail/i), { target: { value: "invalid-email" } });
    fireEvent.change(screen.getByLabelText(/Telefone/i), { target: { value: "(11) 99999-9999" } });

    fireEvent.click(screen.getByRole("button", { name: /Próximo/i }));

    expect(toast.error).toHaveBeenCalledWith("Por favor, verifique o campo: E-mail");
  });

  it("blocks advancing when the phone is invalid", () => {
    render(<InsuranceQuoteForm config={mockConfig} />);
    fireEvent.change(screen.getByLabelText(/Nome/i), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByLabelText(/E-mail/i), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByLabelText(/Telefone/i), { target: { value: "123" } });

    fireEvent.click(screen.getByRole("button", { name: /Próximo/i }));

    expect(toast.error).toHaveBeenCalledWith("Por favor, verifique o campo: Telefone");
  });
});