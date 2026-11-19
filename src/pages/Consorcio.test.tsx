import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import Consorcio from "./Consorcio";
import { submitLead } from "@/lib/leadsApi";
import { safeInvoke, handleSupabaseError } from "@/lib/supabase-helpers";
import { showValidationError } from "@/lib/friendlyToast";
import { toast } from "sonner";

vi.mock("@/components/consorcio/ConsorcioHubContent", () => ({ default: ({ children, onRequest }: { children: ReactNode; onRequest: (credit: number, summary: string, modality: string) => void }) => <section id="simulacao"><button onClick={() => onRequest(400000, "Cenário educativo de teste", "Pesados & Agro")}>Importar cenário</button>{children}</section> }));
vi.mock("@/components/ui/select", () => ({
  Select: ({ children, value, onValueChange, required }: { children: ReactNode; value: string; onValueChange: (value: string) => void; required?: boolean }) => <select value={value} required={required} onChange={e => onValueChange(e.target.value)}><option value="">Selecione</option>{children}</select>,
  SelectTrigger: () => null,
  SelectValue: () => null,
  SelectContent: ({ children }: { children: ReactNode }) => <>{children}</>,
  SelectItem: ({ children, value }: { children: ReactNode; value: string }) => <option value={value}>{children}</option>,
}));
vi.mock("@/lib/leadsApi", () => ({ submitLead: vi.fn() }));
vi.mock("@/lib/supabase-helpers", () => ({ safeInvoke: vi.fn(), handleSupabaseError: vi.fn() }));
vi.mock("@/lib/friendlyToast", () => ({ showValidationError: vi.fn(), showFriendlyError: vi.fn() }));
vi.mock("@/lib/tracking", () => ({ trackCotacaoSubmit: vi.fn(), trackCotacaoClick: vi.fn() }));
vi.mock("sonner", () => ({ toast: { success: vi.fn(), info: vi.fn() } }));

afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals(); });
beforeEach(() => {
  vi.clearAllMocks();
  sessionStorage.clear();
  vi.stubGlobal("matchMedia", vi.fn(() => ({ matches: true })));
  Element.prototype.scrollIntoView = vi.fn();
  vi.spyOn(window, "open").mockReturnValue({} as Window);
  vi.mocked(submitLead).mockResolvedValue({ data: { success: true }, error: null });
  vi.mocked(safeInvoke).mockResolvedValue({ data: { success: true }, error: null });
});

function fill() {
  render(<Consorcio />);
  fireEvent.click(screen.getByRole("button", { name: "Importar cenário" }));
  fireEvent.change(screen.getByLabelText("Nome completo"), { target: { value: "Maria Teste" } });
  fireEvent.change(screen.getByLabelText("WhatsApp com DDD"), { target: { value: "11999999999" } });
  fireEvent.change(screen.getByLabelText("Cidade e estado"), { target: { value: "Guarulhos / SP" } });
  fireEvent.change(screen.getAllByRole("combobox")[1], { target: { value: "Manhã" } });
  return screen.getByRole("form", { name: "Solicitar análise de consórcio" });
}

describe("Solicitação de consórcio preservada", () => {
  it("importa o cenário, transmite ao CRM, e-mail e WhatsApp e limpa após sucesso", async () => {
    fireEvent.submit(fill());
    await waitFor(() => expect(toast.success).toHaveBeenCalledOnce());
    expect(submitLead).toHaveBeenCalledWith(expect.objectContaining({
      insurance_type: "Consórcio", source_page: "/consorcio",
      raw_data: expect.objectContaining({ tipo_consorcio: "Pesados e agro", cenario_educativo: "Cenário educativo de teste" }),
    }));
    expect(safeInvoke).toHaveBeenCalledWith("send-form-email", expect.objectContaining({ textBody: expect.stringContaining("Cenário educativo de teste") }));
    const message = new URL(vi.mocked(window.open).mock.calls[0][0] as string).searchParams.get("text");
    expect(message).toContain("Pesados e agro");
    expect(message).toContain("Cenário educativo de teste");
    expect(screen.getByLabelText("Nome completo")).toHaveValue("");
  });

  it("remove o cenário importado após alteração manual do crédito", async () => {
    const form = fill();
    fireEvent.change(screen.getByLabelText("Crédito aproximado"), { target: { value: "R$ 500.000" } });
    fireEvent.submit(form);
    await waitFor(() => expect(toast.success).toHaveBeenCalled());
    expect(submitLead).toHaveBeenCalledWith(expect.objectContaining({ raw_data: expect.objectContaining({ cenario_educativo: null }) }));
  });

  it("impede envio inválido e mantém o link de privacidade sem pedir documentos", () => {
    render(<Consorcio />);
    fireEvent.submit(screen.getByRole("form"));
    expect(showValidationError).toHaveBeenCalled();
    expect(submitLead).not.toHaveBeenCalled();
    expect(screen.getByRole("link", { name: "Política de Privacidade" })).toHaveAttribute("href", "/politica-privacidade");
    expect(screen.queryByLabelText(/CPF|documentos|renda/i)).not.toBeInTheDocument();
  });

  it("não confirma sucesso e preserva os campos se o envio de e-mail falhar", async () => {
    vi.mocked(safeInvoke).mockResolvedValue({ data: null, error: new Error("Teste") });
    fireEvent.submit(fill());
    await waitFor(() => expect(handleSupabaseError).toHaveBeenCalled());
    expect(toast.success).not.toHaveBeenCalled();
    expect(window.open).not.toHaveBeenCalled();
    expect(screen.getByLabelText("Nome completo")).toHaveValue("Maria Teste");
  });
});
