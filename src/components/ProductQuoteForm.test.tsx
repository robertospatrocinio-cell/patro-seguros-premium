import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import ProductQuoteForm from "./ProductQuoteForm";
import { catalogoSeguros } from "@/data/catalogoSeguros";
import { getCaptacaoProduto, mergeCaptacaoFields } from "@/data/captacaoProdutos";
import { safeInvoke } from "@/lib/supabase-helpers";
import { trackCotacaoSubmit } from "@/lib/tracking";

vi.mock("@/lib/supabase-helpers", () => ({ safeInvoke: vi.fn() }));
vi.mock("@/lib/tracking", () => ({ trackCotacaoSubmit: vi.fn(), trackWhatsAppClick: vi.fn() }));

afterEach(cleanup);
beforeEach(() => {
  vi.clearAllMocks();
  window.history.replaceState({}, "", "/seguro-drone-agricola?utm_source=teste&utm_campaign=agro");
});

function fillContact() {
  fireEvent.change(screen.getByLabelText("Nome *"), { target: { value: "Maria Teste" } });
  fireEvent.change(screen.getByLabelText("WhatsApp com DDD *"), { target: { value: "11999999999" } });
  fireEvent.click(screen.getByRole("checkbox"));
}

describe("Captação por produto", () => {
  it("oferece perfil e campos para cada destino do catálogo", () => {
    for (const item of catalogoSeguros.flatMap(group => group.items)) {
      const profile = getCaptacaoProduto(item.to);
      expect(profile?.label).toBe(item.label);
      expect(profile?.fields.length).toBeGreaterThan(0);
      expect(profile?.checklist.length).toBeGreaterThan(0);
      expect(new Set(profile?.fields.map(field => field.id)).size).toBe(profile?.fields.length);
    }
    expect(getCaptacaoProduto("/central-de-sinistro")).toBeNull();
    expect(getCaptacaoProduto("/lp/seguro-residencial")?.path).toBe("/seguro-residencial");
  });

  it("distingue operação agrícola, linha amarela, casco e RETA", () => {
    expect(getCaptacaoProduto("/seguro-maquinas-agricolas/")?.fields.some(field => field.id === "atividade")).toBe(true);
    expect(getCaptacaoProduto("/seguro-maquinas-linha-amarela")?.intro).toContain("terreno");
    expect(getCaptacaoProduto("/seguro-drone-agricola")?.checklist.join(" ")).toContain("deriva");
    expect(getCaptacaoProduto("/seguro-reta-drone")?.checklist.join(" ")).toContain("não cobre danos ao próprio drone");
  });

  it("qualifica passageiros, transporte agro e equipamentos veterinários conforme a operação", () => {
    expect(getCaptacaoProduto("/seguro-acidentes-pessoais-passageiros")?.fields.some(field => field.id === "passageiros")).toBe(true);
    expect(getCaptacaoProduto("/seguro-transporte-agro")?.fields.some(field => field.id === "rotas")).toBe(true);
    expect(getCaptacaoProduto("/seguro-equipamentos-veterinarios")?.fields.some(field => field.id === "equipamento")).toBe(true);
  });

  it("preserva os campos da página e evita IDs repetidos", () => {
    const existing = [{ id: "uso", label: "Uso específico", placeholder: "Informe" }];
    const result = mergeCaptacaoFields(existing, [{ id: "uso", label: "Outro", placeholder: "" }, { id: "valor", label: "Valor", placeholder: "" }]);
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual(existing[0]);
  });

  it("não envia contato sem autorização", () => {
    render(<ProductQuoteForm productName="Drone agrícola" productPath="/seguro-drone-agricola" />);
    fireEvent.change(screen.getByLabelText("Nome *"), { target: { value: "Maria Teste" } });
    fireEvent.change(screen.getByLabelText("WhatsApp com DDD *"), { target: { value: "11999999999" } });
    fireEvent.submit(screen.getByRole("form"));
    expect(safeInvoke).not.toHaveBeenCalled();
    expect(screen.getByRole("alert").textContent).toContain("Autorize o contato");
  });

  it("envia produto, origem, campanha, consentimento e detalhes pelo fluxo existente", async () => {
    vi.mocked(safeInvoke).mockResolvedValue({ data: { success: true }, error: null });
    render(<ProductQuoteForm productName="Drone agrícola" productPath="/seguro-drone-agricola" />);
    fillContact();
    fireEvent.change(screen.getByLabelText("Marca, modelo e ano"), { target: { value: "Drone de teste 2026" } });
    fireEvent.submit(screen.getByRole("form"));
    await screen.findByRole("status");
    expect(safeInvoke).toHaveBeenCalledWith("send-form-email", expect.objectContaining({
      lead: expect.objectContaining({
        insurance_type: "Drone agrícola",
        source_page: "/seguro-drone-agricola",
        utm_source: "teste",
        utm_campaign: "agro",
        raw_data: expect.objectContaining({ consent: true, product_path: "/seguro-drone-agricola", details: expect.objectContaining({ equipamento: "Drone de teste 2026" }) }),
      }),
    }));
    expect(trackCotacaoSubmit).toHaveBeenCalledOnce();
  });

  it("troca o contexto e limpa os detalhes ao selecionar outro produto", async () => {
    vi.mocked(safeInvoke).mockResolvedValue({ data: { success: true }, error: null });
    render(<ProductQuoteForm />);
    fireEvent.change(screen.getByLabelText("Marca, modelo e ano"), { target: { value: "Trator anterior" } });
    fireEvent.change(screen.getByLabelText("Qual produto você procura?"), { target: { value: "/seguro-reta-drone" } });
    expect((screen.getByLabelText("Marca, modelo e ano") as HTMLInputElement).value).toBe("");
    expect(screen.queryByLabelText("Valor aproximado do bem")).toBeNull();
    expect(screen.getByLabelText("Peso máximo de decolagem, se souber")).toBeInTheDocument();
    fillContact();
    fireEvent.submit(screen.getByRole("form"));
    await screen.findByRole("status");
    expect(safeInvoke).toHaveBeenCalledWith("send-form-email", expect.objectContaining({
      lead: expect.objectContaining({
        insurance_type: "RETA Drone — Responsabilidade Civil",
        raw_data: expect.objectContaining({ product_path: "/seguro-reta-drone", details: expect.objectContaining({ equipamento: "" }) }),
      }),
    }));
  });

  it("bloqueia envios repetidos enquanto aguarda confirmação", async () => {
    let confirm!: (value: { data: { success: boolean }; error: null }) => void;
    vi.mocked(safeInvoke).mockImplementation(() => new Promise(resolve => { confirm = resolve; }));
    render(<ProductQuoteForm productName="Drone agrícola" productPath="/seguro-drone-agricola" />);
    fillContact();
    fireEvent.submit(screen.getByRole("form"));
    fireEvent.submit(screen.getByRole("form"));
    expect(safeInvoke).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("button", { name: "Enviando solicitação…" })).toBeDisabled();
    confirm({ data: { success: true }, error: null });
    await screen.findByRole("status");
  });

  it("não confirma sucesso quando o serviço não confirma o recebimento", async () => {
    vi.mocked(safeInvoke).mockResolvedValue({ data: { success: false }, error: null });
    render(<ProductQuoteForm productName="Drone agrícola" productPath="/seguro-drone-agricola" />);
    fillContact();
    fireEvent.submit(screen.getByRole("form"));
    await screen.findByRole("alert");
    expect(screen.queryByRole("status")).toBeNull();
    expect(trackCotacaoSubmit).not.toHaveBeenCalled();
  });

  it("mantém os dados e oferece WhatsApp quando o envio não é confirmado", async () => {
    vi.mocked(safeInvoke).mockResolvedValue({ data: null, error: new Error("offline") });
    render(<ProductQuoteForm productName="Drone agrícola" productPath="/seguro-drone-agricola" />);
    fillContact();
    fireEvent.submit(screen.getByRole("form"));
    await waitFor(() => expect(screen.getByRole("alert").textContent).toContain("Não foi possível confirmar"));
    expect((screen.getByLabelText("Nome *") as HTMLInputElement).value).toBe("Maria Teste");
    expect(screen.getByRole("link", { name: "Continuar pelo WhatsApp" }).getAttribute("href")).toContain("Drone%20agr%C3%ADcola");
    expect(trackCotacaoSubmit).not.toHaveBeenCalled();
    expect(screen.queryByRole("status")).toBeNull();
  });
});
