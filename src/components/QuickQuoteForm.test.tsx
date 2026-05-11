import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import QuickQuoteForm from "./QuickQuoteForm";
import { toast } from "sonner";

// Mock sonner toast
vi.mock("sonner", () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

// Mock window.open
const windowOpenMock = vi.fn();
vi.stubGlobal("open", windowOpenMock);

describe("QuickQuoteForm Validation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should show error toast if name is empty", async () => {
    render(<QuickQuoteForm insuranceType="Seguro Auto" trackingLabel="test" />);
    
    const submitButton = screen.getByRole("button", { name: /Solicitar Cotação Gratuita/i });
    fireEvent.click(submitButton);
    
    expect(toast.error).toHaveBeenCalledWith("Por favor, informe seu nome.");
  });

  it("should show error toast if phone is invalid", async () => {
    render(<QuickQuoteForm insuranceType="Seguro Auto" trackingLabel="test" />);
    
    // Fill name
    const nameInput = screen.getByLabelText(/Nome \*/i);
    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    
    // Fill invalid phone
    const phoneInput = screen.getByLabelText(/WhatsApp \*/i);
    fireEvent.change(phoneInput, { target: { value: "123" } });
    
    const submitButton = screen.getByRole("button", { name: /Solicitar Cotação Gratuita/i });
    fireEvent.click(submitButton);
    
    expect(toast.error).toHaveBeenCalledWith("Por favor, informe um telefone válido com DDD.");
  });

  it("should show error toast if email is provided but invalid", async () => {
    render(<QuickQuoteForm insuranceType="Seguro Auto" trackingLabel="test" />);
    
    // Fill name
    fireEvent.change(screen.getByLabelText(/Nome \*/i), { target: { value: "John Doe" } });
    
    // Fill valid phone
    fireEvent.change(screen.getByLabelText(/WhatsApp \*/i), { target: { value: "11999999999" } });
    
    // Fill invalid email
    fireEvent.change(screen.getByLabelText(/E-mail/i), { target: { value: "invalid-email" } });
    
    const submitButton = screen.getByRole("button", { name: /Solicitar Cotação Gratuita/i });
    fireEvent.click(submitButton);
    
    expect(toast.error).toHaveBeenCalledWith("Por favor, informe um e-mail válido.");
  });
});