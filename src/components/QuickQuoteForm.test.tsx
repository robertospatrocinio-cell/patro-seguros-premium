import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import QuickQuoteForm from "./QuickQuoteForm";
import { toast } from "sonner";

vi.mock("sonner", () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

const windowOpenMock = vi.fn();
vi.stubGlobal("open", windowOpenMock);

describe("QuickQuoteForm Validation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("shows an error toast when the name is empty", () => {
    render(<QuickQuoteForm insuranceType="Seguro Auto" trackingLabel="test" />);
    fireEvent.click(screen.getByRole("button", { name: /Cotar agora/i }));
    expect(toast.error).toHaveBeenCalledWith("Seu nome é necessário para o orçamento");
  });

  it("shows an error toast when the phone number is invalid", () => {
    render(<QuickQuoteForm insuranceType="Seguro Auto" trackingLabel="test" />);
    fireEvent.change(screen.getByLabelText(/Nome \*/i), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByLabelText(/WhatsApp \*/i), { target: { value: "123" } });
    fireEvent.click(screen.getByRole("button", { name: /Cotar agora/i }));
    expect(toast.error).toHaveBeenCalledWith("Use o formato (11) 99999-9999");
  });

  it("shows an error toast when an invalid e-mail is provided", () => {
    render(<QuickQuoteForm insuranceType="Seguro Auto" trackingLabel="test" />);
    fireEvent.change(screen.getByLabelText(/Nome \*/i), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByLabelText(/WhatsApp \*/i), { target: { value: "11999999999" } });
    fireEvent.change(screen.getByLabelText(/E-mail/i), { target: { value: "invalid-email" } });
    fireEvent.click(screen.getByRole("button", { name: /Cotar agora/i }));
    expect(toast.error).toHaveBeenCalledWith("Formato de e-mail inválido. Ex: nome@email.com");
  });
});