import { describe, it, expect, vi, beforeEach, beforeAll } from "vitest";
// Mock ResizeObserver
beforeAll(() => {
  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

import { render, screen, fireEvent } from "@testing-library/react";
import InsuranceQuoteForm, { InsuranceFormConfig } from "./InsuranceQuoteForm";
import { toast } from "sonner";

// Mock sonner toast
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
    { id: "tel", label: "Telefone", type: "tel", required: true }
  ],
  benefits: [],
  faqs: [],
  metaTitle: "",
  metaDescription: ""
};

describe("InsuranceQuoteForm Validation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should show error toast if email is invalid", async () => {
    render(<InsuranceQuoteForm config={mockConfig} />);
    
    // Fill name
    fireEvent.change(screen.getByLabelText(/Nome/i), { target: { value: "John Doe" } });
    // Fill invalid email
    fireEvent.change(screen.getByLabelText(/E-mail/i), { target: { value: "invalid-email" } });
    // Fill phone
    fireEvent.change(screen.getByLabelText(/Telefone/i), { target: { value: "11999999999" } });
    
    // Accept consent
    const consentCheckbox = screen.getByRole("checkbox");
    fireEvent.click(consentCheckbox);
    
    const submitButton = screen.getByRole("button", { name: /Receber Cotação Grátis/i });
    fireEvent.click(submitButton);
    
    expect(toast.error).toHaveBeenCalledWith("Por favor, informe um e-mail válido.");
  });

  it("should show error toast if phone is invalid", async () => {
    render(<InsuranceQuoteForm config={mockConfig} />);
    
    // Fill name
    fireEvent.change(screen.getByLabelText(/Nome/i), { target: { value: "John Doe" } });
    // Fill email
    fireEvent.change(screen.getByLabelText(/E-mail/i), { target: { value: "john@example.com" } });
    // Fill invalid phone
    fireEvent.change(screen.getByLabelText(/Telefone/i), { target: { value: "123" } });
    
    // Accept consent
    const consentCheckbox = screen.getByRole("checkbox");
    fireEvent.click(consentCheckbox);
    
    const submitButton = screen.getByRole("button", { name: /Receber Cotação Grátis/i });
    fireEvent.click(submitButton);
    
    expect(toast.error).toHaveBeenCalledWith("Por favor, informe um telefone válido com DDD.");
  });
});