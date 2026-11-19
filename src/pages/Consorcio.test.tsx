import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import Consorcio from "./Consorcio";
import { submitLead } from "@/lib/leadsApi";
import { safeInvoke, handleSupabaseError } from "@/lib/supabase-helpers";
import { showValidationError } from "@/lib/friendlyToast";
import { trackCotacaoSubmit, trackWhatsAppClick } from "@/lib/tracking";
import { toast } from "sonner";

vi.mock("@/components/consorcio/ConsorcioHubContent", () => ({ default: ({ children, onRequest }: { children: ReactNode; onRequest: (credit: number, summary: string, modality: string) => void }) => <section id="simulacao"><button onClick={() => onRequest(400000, "Cenário educativo de teste", "Pesados & Agro")}>Importar cenário</button>{children}</section> }));
vi.mock("@/components/ui/select", () => ({
  Select: ({ children, value, onValueChange, required }: { children: ReactNode; value: string; onValueChange: (value: string) => void; required?: boolean }) => <select value={value} required={required} onChange={e => onValueChange(e.target.value)}><option value="">Selecione</option>{children}</select>,
  SelectTrigger: () => null, SelectValue: () => null,
  SelectContent: ({ children }: { children: ReactNode }) => <>{children}</>,
  SelectItem: ({ children, value }: { children: ReactNode; value: string }) => <option value={value}>{children}</option>,
}));
vi.mock("@/lib/leadsApi", () => ({ submitLead: vi.fn() }));
vi.mock("@/lib/supabase-helpers", () => ({ safeInvoke: vi.fn(), handleSupabaseError: vi.fn() }));
vi.mock("@/lib/friendlyToast", () => ({ showValidationError: vi.fn(), showFriendlyError: vi.fn() }));
vi.mock("@/lib/tracking", () => ({ trackCotacaoSubmit: vi.fn(), trackCotacaoClick: vi.fn(), trackWhatsAppClick: vi.fn() }));
vi.mock("sonner", () => ({ toast: { success: vi.fn(), info: vi.fn() } }));
afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals(); });
beforeEach(() => {
  vi.clearAllMocks(); sessionStorage.clear();
  vi.stubGlobal("matchMedia", vi.fn(() => ({ matches: true })));
  Element.prototype.scrollIntoView = vi.fn();
  vi.spyOn(window, "open").mockReturnValue(null);
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
describe("Solicitação de consórcio", () => {
  it("envia ao CRM e e-mail e confirma sem depender de popup", async () => {
    fireEvent.submit(fill());
    await waitFor(() => expect(toast.success).toHaveBeenCalledOnce());
    expect(submitLead).toHaveBeenCalledWith(expect.objectContaining({ insurance_type: "Consórcio", source_page: "/consorcio", raw_data: expect.objectContaining({ tipo_consorcio: "Pesados e agro", cenario_educativo: "Cenário educativo de teste" }) }));
    expect(safeInvoke).toHaveBeenCalledWith("send-form-email", expect.objectContaining({ textBody: expect.stringContaining("Cenário educativo de teste") }));
    const link = screen.getByRole("link", { name: "Continuar pelo WhatsApp" });
    const message = new URL(link.getAttribute("href")!).searchParams.get("text");
    expect(message).toContain("Pesados e agro");
    expect(message).toContain("Cenário educativo de teste");
    expect(window.open).not.toHaveBeenCalled();
    expect(screen.getByRole("status")).toHaveTextContent("Recebemos sua solicitação");
    expect(screen.getByLabelText("Nome completo")).toHaveValue("");
    expect(trackCotacaoSubmit).toHaveBeenCalledOnce();
    // Evita navegar durante o teste; verifica somente o handler de mensuração.
    link.addEventListener("click", event => event.preventDefault(), { once: true });
    fireEvent.click(link);
    expect(trackWhatsAppClick).toHaveBeenCalledWith("consorcio_confirmacao", expect.objectContaining({ insuranceType: "consorcio" }));
  });
  it("descarta cenário após alteração manual do objetivo", async () => {
    const form = fill();
    fireEvent.change(screen.getByLabelText("Crédito aproximado"), { target: { value: "R$ 500.000" } });
    fireEvent.submit(form);
    await waitFor(() => expect(toast.success).toHaveBeenCalled());
    expect(submitLead).toHaveBeenCalledWith(expect.objectContaining({ raw_data: expect.objectContaining({ cenario_educativo: null }) }));
  });
  it("identifica erros e foca o primeiro campo sem pedir documentos", () => {
    render(<Consorcio />); fireEvent.submit(screen.getByRole("form"));
    expect(showValidationError).toHaveBeenCalled();
    expect(submitLead).not.toHaveBeenCalled();
    expect(screen.getByLabelText("Nome completo")).toHaveFocus();
    expect(screen.getByLabelText("Nome completo")).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("alert")).toBeVisible();
    expect(screen.getByRole("link", { name: "Política de Privacidade" })).toHaveAttribute("href", "/politica-privacidade");
    expect(screen.queryByLabelText(/CPF|documentos|renda/i)).not.toBeInTheDocument();
  });
  it.each(["abc", "0", "-100", "R$ 3.00", "100000001"])("recusa crédito inválido %s", value => {
    const form = fill(); fireEvent.change(screen.getByLabelText("Crédito aproximado"), { target: { value } }); fireEvent.submit(form);
    expect(submitLead).not.toHaveBeenCalled(); expect(screen.getByLabelText("Crédito aproximado")).toHaveFocus();
  });
  it("preserva os campos e não registra conversão se ambos os canais falharem", async () => {
    vi.mocked(submitLead).mockResolvedValue({ data: null, error: new Error("CRM indisponível") });
    vi.mocked(safeInvoke).mockResolvedValue({ data: null, error: new Error("E-mail indisponível") });
    fireEvent.submit(fill()); await waitFor(() => expect(handleSupabaseError).toHaveBeenCalled());
    expect(toast.success).not.toHaveBeenCalled(); expect(trackCotacaoSubmit).not.toHaveBeenCalled();
    expect(screen.getByRole("status")).toHaveTextContent("O envio digital falhou");
    expect(screen.getByLabelText("Nome completo")).toHaveValue("Maria Teste");
  });
  it("confirma recebimento pelo CRM mesmo com falha do e-mail e impede duplicação", async () => {
    vi.mocked(safeInvoke).mockResolvedValue({ data: null, error: new Error("E-mail indisponível") });
    const form = fill(); fireEvent.submit(form); fireEvent.submit(form);
    await waitFor(() => expect(toast.success).toHaveBeenCalledOnce());
    expect(submitLead).toHaveBeenCalledOnce(); expect(trackCotacaoSubmit).toHaveBeenCalledOnce();
  });
});
