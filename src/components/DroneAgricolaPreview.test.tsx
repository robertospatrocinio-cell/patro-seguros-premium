import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import ProductQuoteForm from "./ProductQuoteForm";
import { safeInvoke } from "@/lib/supabase-helpers";
import { trackCotacaoSubmit } from "@/lib/tracking";
import { droneQuoteFields, droneFaqs, droneComparison, isDronePreviewHost } from "@/data/droneAgricolaPreview";

vi.mock("@/lib/supabase-helpers", () => ({ safeInvoke: vi.fn() }));
vi.mock("@/lib/tracking", () => ({ trackCotacaoSubmit: vi.fn(), trackWhatsAppClick: vi.fn() }));
afterEach(cleanup);
beforeEach(() => {
  vi.clearAllMocks();
  window.history.replaceState({}, "", "/previa/drones-agricolas");
});

function showForm() {
  return render(<ProductQuoteForm compactContact productName="Drone agrícola" productPath="/seguro-drone-agricola" fields={droneQuoteFields} />);
}
function fillRequired() {
  fireEvent.change(screen.getByLabelText("Nome *"), { target: { value: "Ana Produtora" } });
  fireEvent.change(screen.getByLabelText("WhatsApp com DDD *"), { target: { value: "66999999999" } });
  fireEvent.click(screen.getByRole("checkbox"));
}

describe("Prévia de drones agrícolas", () => {
  it("permite o editor e bloqueia os domínios publicados", () => {
    for (const host of ["localhost", "id-preview--abc.lovable.app", "preview--patro.lovable.app", "id-preview--abc.lovableproject.com", "abc.lovableproject-dev.com"]) {
      expect(isDronePreviewHost(host)).toBe(true);
    }
    for (const host of ["www.patroseguros.com.br", "patroseguros.com.br", "patro-seguros-premium.lovable.app", "id-preview--abc.lovable.app.exemplo.com"]) {
      expect(isDronePreviewHost(host)).toBe(false);
    }
  });

  it("tem dez respostas, duas modalidades e apenas atividades agrícolas", () => {
    expect(droneFaqs).toHaveLength(10);
    expect(droneComparison.some(row => row.label === "Quem recebe a indenização")).toBe(true);
    expect(droneQuoteFields.find(field => field.id === "atividade")?.options).toEqual(["Pulverização", "Mapeamento agrícola", "Pulverização e mapeamento agrícola"]);
    expect(droneQuoteFields.find(field => field.id === "interesse")?.options).toEqual(["Casco", "RETA", "Casco e RETA", "Preciso de orientação"]);
  });

  it("reduz o contato inicial sem exigir detalhes, documentos ou e-mail", async () => {
    vi.mocked(safeInvoke).mockResolvedValue({ data: { success: true }, error: null });
    const { container } = showForm();
    expect(screen.queryByLabelText("E-mail (opcional)")).toBeNull();
    expect(container.querySelector('input[type="file"]')).toBeNull();
    expect(container.querySelectorAll("[required]")).toHaveLength(3);
    for (const field of droneQuoteFields) {
      expect(screen.getByLabelText(field.label)).not.toBeRequired();
    }
    fillRequired();
    fireEvent.submit(screen.getByRole("form"));
    await screen.findByRole("status");
    expect(safeInvoke).toHaveBeenCalledWith("send-form-email", expect.objectContaining({
      lead: expect.objectContaining({
        full_name: "Ana Produtora", insurance_type: "Drone agrícola", source_page: "/previa/drones-agricolas",
        raw_data: expect.objectContaining({ consent: true, product_path: "/seguro-drone-agricola" }),
      }),
    }));
  });

  it("valida o WhatsApp e direciona o foco ao campo", () => {
    showForm();
    fillRequired();
    fireEvent.change(screen.getByLabelText("WhatsApp com DDD *"), { target: { value: "123" } });
    fireEvent.submit(screen.getByRole("form"));
    expect(screen.getByLabelText("WhatsApp com DDD *")).toHaveFocus();
    expect(screen.getByLabelText("WhatsApp com DDD *")).toHaveAttribute("aria-invalid", "true");
    expect(safeInvoke).not.toHaveBeenCalled();
  });

  it("mantém os dados e não simula sucesso quando a integração falha", async () => {
    vi.mocked(safeInvoke).mockResolvedValue({ data: null, error: new Error("offline") });
    showForm();
    fillRequired();
    fireEvent.change(screen.getByLabelText("Marca e modelo"), { target: { value: "DJI Agras" } });
    fireEvent.submit(screen.getByRole("form"));
    await screen.findByRole("alert");
    expect(screen.queryByRole("status")).toBeNull();
    expect(screen.getByLabelText("Marca e modelo")).toHaveValue("DJI Agras");
    expect(screen.getByRole("link", { name: "Continuar pelo WhatsApp" }).getAttribute("href")).toContain("Drone%20agr%C3%ADcola");
    expect(trackCotacaoSubmit).not.toHaveBeenCalled();
  });
});
