import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import PetPlanConversion from "./PetPlanConversion";
import { getCaptacaoProduto } from "@/data/captacaoProdutos";
import { safeInvoke } from "@/lib/supabase-helpers";
import { trackCotacaoSubmit, trackWhatsAppClick } from "@/lib/tracking";

vi.mock("@/lib/supabase-helpers", () => ({ safeInvoke: vi.fn() }));
vi.mock("@/lib/tracking", () => ({ trackCotacaoSubmit: vi.fn(), trackWhatsAppClick: vi.fn() }));
afterEach(cleanup);
beforeEach(() => {
  vi.clearAllMocks();
  window.history.replaceState({}, "", "/plano-pet?utm_source=teste");
});

async function showForm() {
  const result = render(<PetPlanConversion />);
  await screen.findByRole("form", { name: "Solicitar Plano Pet (Petlove)" });
  return result;
}
function fillRequired() {
  fireEvent.change(screen.getByLabelText("Nome *"), { target: { value: "Ana Tutora" } });
  fireEvent.change(screen.getByLabelText("WhatsApp com DDD *"), { target: { value: "11999999999" } });
  fireEvent.click(screen.getByRole("checkbox"));
}

describe("Conversão de Plano Pet", () => {
  it("usa condições e campos de plano veterinário, sem o perfil genérico de seguros", () => {
    const profile = getCaptacaoProduto("/plano-pet");
    expect(profile?.intro).toContain("Petlove");
    expect(profile?.checklist.join(" ")).toContain("coparticipações");
    expect(profile?.note).toContain("não contrata o plano");
    expect(profile?.fields.map(field => field.id)).toEqual(["localOperacao", "pet", "necessidade"]);
    expect(profile?.fields[0].label).toBe("Cidade e UF de atendimento");
    expect(getCaptacaoProduto("/rota-inexistente")).toBeNull();
  });

  it("oferece contato antecipado com detalhes opcionais e uma alternativa por WhatsApp", async () => {
    const { container } = await showForm();
    expect(container.querySelector("#opcoes-plano-pet")).not.toBeNull();
    expect(container.querySelectorAll("[required]")).toHaveLength(3);
    expect(screen.queryByLabelText("E-mail (opcional)")).toBeNull();
    expect(screen.getByRole("button", { name: "Quero comparar opções para meu pet" })).toBeEnabled();
    for (const field of getCaptacaoProduto("/plano-pet")!.fields) {
      expect(screen.getByLabelText(field.label)).not.toBeRequired();
    }
    const link = screen.getByRole("link", { name: "Prefiro tirar minhas dúvidas pelo WhatsApp" });
    expect(decodeURIComponent(link.getAttribute("href")!)).toContain("Petlove");
    fireEvent.click(link);
    expect(trackWhatsAppClick).toHaveBeenCalledWith("plano-pet:comparacao", expect.objectContaining({ insuranceType: "Plano Pet (Petlove)" }));
  });

  it("envia o contato pelo fluxo existente com a origem de Plano Pet", async () => {
    vi.mocked(safeInvoke).mockResolvedValue({ data: { success: true }, error: null });
    await showForm();
    fillRequired();
    fireEvent.submit(screen.getByRole("form"));
    await screen.findByText("Solicitação enviada");
    expect(safeInvoke).toHaveBeenCalledWith("send-form-email", expect.objectContaining({
      lead: expect.objectContaining({
        full_name: "Ana Tutora", phone: "11999999999", email: null,
        insurance_type: "Plano Pet (Petlove)", source_page: "/plano-pet", utm_source: "teste",
        raw_data: expect.objectContaining({ product_path: "/plano-pet", consent: true }),
      }),
    }));
    expect(trackCotacaoSubmit).toHaveBeenCalledWith("Plano Pet (Petlove)", expect.objectContaining({ origin: "captacao-produto" }));
  });

  it("mantém o contato e permite continuar pelo WhatsApp se o envio falhar", async () => {
    vi.mocked(safeInvoke).mockResolvedValue({ data: null, error: new Error("offline") });
    await showForm();
    fillRequired();
    fireEvent.submit(screen.getByRole("form"));
    await screen.findByRole("alert");
    expect(screen.getByLabelText("Nome *")).toHaveValue("Ana Tutora");
    expect(screen.getByRole("link", { name: "Continuar pelo WhatsApp" })).toBeInTheDocument();
    expect(screen.queryByText("Solicitação enviada")).toBeNull();
    expect(trackCotacaoSubmit).not.toHaveBeenCalled();
  });
});
