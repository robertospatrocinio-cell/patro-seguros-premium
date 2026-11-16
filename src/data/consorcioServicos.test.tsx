import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { consorcioServicos as copy, consorcioServicosFields } from "./consorcioServicos";
import { consorcioServicosSchema, getConsorcioServicosStaticContent } from "./consorcioServicosSeo";
import { CONSORCIO_NATIONAL_PAGES, getConsorcioNationalStaticContent } from "./consorcioNacional";
import ProductQuoteForm from "@/components/ProductQuoteForm";
import { safeInvoke } from "@/lib/supabase-helpers";

vi.mock("@/lib/supabase-helpers", () => ({ safeInvoke: vi.fn() }));
vi.mock("@/lib/tracking", () => ({ trackCotacaoSubmit: vi.fn(), trackWhatsAppClick: vi.fn() }));
afterEach(() => { cleanup(); vi.clearAllMocks(); });

describe("Página nacional de consórcio de serviços", () => {
  it("mantém metadados e conteúdo nacional sincronizados", () => {
    const page = CONSORCIO_NATIONAL_PAGES.find(item => item.path === copy.path)!;
    expect(copy.title.length).toBeLessThanOrEqual(60);
    expect(copy.description.length).toBeLessThanOrEqual(155);
    expect(page.title).toBe(copy.title);
    expect(page.h1).toBe(copy.h1);
    expect(page.metaDescription).toBe(copy.description);
    expect(getConsorcioNationalStaticContent(page)).toEqual(getConsorcioServicosStaticContent());
    expect(getConsorcioServicosStaticContent().body).not.toMatch(/guarulhos|cumbica|pimentas/i);
  });

  it("publica seis usos, comparação, quatro passos e as mesmas cinco respostas sem JavaScript", () => {
    const { body } = getConsorcioServicosStaticContent();
    expect(copy.projects).toHaveLength(6);
    expect(copy.steps).toHaveLength(4);
    expect(copy.faqs).toHaveLength(5);
    for (const project of copy.projects) expect(body).toContain(project.title);
    for (const faq of copy.faqs) {
      expect(body).toContain(faq.question);
      expect(body).toContain(faq.answer);
    }
    for (const path of ["/consorcio", "/consorcio-imoveis", "/consorcio-veiculos", "/consorcio-pesados-maquinas", "/seguro-residencial", "/seguro-viagem"]) {
      expect(body).toContain(`href="${path}"`);
    }
    expect(body).toContain("Tabela Price");
    expect(body).toContain("Não são ofertas nem médias de mercado");
    expect(body).toContain("sem data garantida");
  });

  it("descreve produto financeiro nacional sem inventar taxas ou ofertas", () => {
    expect(consorcioServicosSchema["@type"]).toBe("FinancialProduct");
    expect(consorcioServicosSchema.areaServed).toBe("BR");
    expect(consorcioServicosSchema).not.toHaveProperty("offers");
    expect(consorcioServicosSchema).not.toHaveProperty("aggregateRating");
    expect(consorcioServicosSchema.feesAndCommissionsSpecification).toBe(copy.warning);
  });

  it("envia a qualificação pelo fluxo existente com consentimento e origem correta", async () => {
    window.history.replaceState({}, "", copy.path);
    vi.mocked(safeInvoke).mockResolvedValue({ data: { success: true }, error: null });
    render(<ProductQuoteForm productName="Consórcio de Serviços" productPath={copy.path} fields={consorcioServicosFields} compactContact expandDetails nameLabel="Nome completo" heading="Estudo de Consórcio de Serviços" submitLabel="Receber Simulação Personalizada" />);
    expect(screen.getByText("Detalhes do seu projeto (opcional)").closest("details")).toHaveAttribute("open");
    expect(screen.queryByLabelText("E-mail (opcional)")).toBeNull();
    fireEvent.change(screen.getByLabelText("Nome completo *"), { target: { value: "Maria Teste" } });
    fireEvent.change(screen.getByLabelText("WhatsApp com DDD *"), { target: { value: "11999999999" } });
    const details: Record<string, string> = {};
    for (const field of consorcioServicosFields) {
      details[field.id] = field.options[0];
      fireEvent.change(screen.getByLabelText(field.label), { target: { value: field.options[0] } });
    }
    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.click(screen.getByRole("button", { name: "Receber Simulação Personalizada" }));
    await screen.findByRole("status");
    expect(safeInvoke).toHaveBeenCalledWith("send-form-email", expect.objectContaining({
      lead: expect.objectContaining({
        insurance_type: "Consórcio de Serviços", source_page: copy.path,
        raw_data: expect.objectContaining({ product_path: copy.path, consent: true, details }),
      }),
    }));
  });
});
