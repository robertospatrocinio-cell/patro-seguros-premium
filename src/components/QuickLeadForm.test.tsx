import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { QuickLeadForm } from "./QuickLeadForm";
import { safeInvoke } from "@/lib/supabase-helpers";
import { showFriendlyError } from "@/lib/friendlyToast";
import { toast } from "sonner";

vi.mock("@/lib/supabase-helpers", () => ({ safeInvoke: vi.fn() }));
vi.mock("@/lib/tracking", () => ({ trackCotacaoSubmit: vi.fn() }));
vi.mock("@/hooks/useWebMcpTool", () => ({ useWebMcpTool: vi.fn() }));
vi.mock("@/lib/friendlyToast", () => ({ showFriendlyError: vi.fn(), showValidationError: vi.fn() }));
vi.mock("sonner", () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

afterEach(cleanup);
beforeEach(() => vi.clearAllMocks());

function fillForm() {
  render(<QuickLeadForm prefillInsuranceType="Auto" />);
  fireEvent.change(screen.getByLabelText("Seu nome"), { target: { value: "Maria Teste" } });
  fireEvent.change(screen.getByLabelText("WhatsApp com DDD"), { target: { value: "11999999999" } });
  fireEvent.change(screen.getByLabelText("Seu e-mail"), { target: { value: "maria@example.com" } });
  fireEvent.change(screen.getByLabelText("Cidade"), { target: { value: "Guarulhos" } });
  fireEvent.change(screen.getByLabelText("Mensagem (opcional)"), { target: { value: "Quero renovar meu seguro" } });
  return screen.getByRole("button", { name: "Enviar pedido de cotação" }).closest("form")!;
}

describe("Envio da Cotação Express por e-mail", () => {
  it("envia nome, telefone, cidade, seguro e mensagem inclusive para Auto", async () => {
    vi.mocked(safeInvoke).mockResolvedValue({ data: { success: true }, error: null });
    fireEvent.submit(fillForm());
    await waitFor(() => expect(toast.success).toHaveBeenCalled());
    expect(safeInvoke).toHaveBeenCalledOnce();
    const [functionName, payload] = vi.mocked(safeInvoke).mock.calls[0];
    expect(functionName).toBe("send-form-email");
    for (const text of ["Nome: Maria Teste", "Telefone: 11999999999", "Cidade: Guarulhos", "Tipo de seguro:", "Auto", "Mensagem: Quero renovar meu seguro"]) {
      expect(payload.textBody).toContain(text);
    }
    expect(payload.lead.raw_data).toEqual({ city: "Guarulhos", message: "Quero renovar meu seguro" });
    expect(screen.getByLabelText("Seu nome")).toHaveValue("");
  });

  it("mantém os dados e não confirma sucesso quando o serviço não confirma o envio", async () => {
    vi.mocked(safeInvoke).mockResolvedValue({ data: { success: false }, error: null });
    fireEvent.submit(fillForm());
    await waitFor(() => expect(showFriendlyError).toHaveBeenCalled());
    expect(toast.success).not.toHaveBeenCalled();
    expect(screen.getByLabelText("Seu nome")).toHaveValue("Maria Teste");
    expect(screen.getByLabelText("Mensagem (opcional)")).toHaveValue("Quero renovar meu seguro");
  });

  it("impede dois envios enquanto aguarda o serviço", async () => {
    let resolve!: (value: { data: { success: boolean }; error: null }) => void;
    vi.mocked(safeInvoke).mockImplementation(() => new Promise(done => { resolve = done; }));
    const form = fillForm();
    fireEvent.submit(form);
    fireEvent.submit(form);
    expect(safeInvoke).toHaveBeenCalledOnce();
    resolve({ data: { success: true }, error: null });
    await waitFor(() => expect(toast.success).toHaveBeenCalled());
  });
});
