import { beforeEach, describe, expect, it, vi } from "vitest";
import { buildCommercialMetrics, commercialWindow, type CommercialData, type CommercialLead } from "@/lib/commercialMetrics";
import { getLeadAttribution, sanitizeLeadAttribution } from "@/lib/leadAttribution";
import { collectCommercialPages } from "@/hooks/queries/useCommercialMetrics";
import { submitLead } from "@/lib/leadsApi";

const invoke = vi.hoisted(() => vi.fn());
vi.mock("@/integrations/supabase/client", () => ({ supabase: {} }));
vi.mock("@/lib/supabase-helpers", () => ({ safeInvoke: invoke }));

const lead: CommercialLead = {
  id: "lead-1", created_at: "2026-10-10T12:00:00.000Z", insurance_type: "Auto",
  source_page: "/seguro-auto?email=private@example.com", source_origin: "site",
  utm_source: null, utm_medium: null, utm_campaign: null,
  lead_status: "Fechado / Ganho", kanban_stage_id: "proposal", raw_data: {},
};
const fixture = (): CommercialData => ({
  start: "2026-10-01T00:00:00.000Z", end: "2026-11-01T00:00:00.000Z",
  leads: [lead], stages: [{ id: "proposal", name: "Proposta Enviada" }],
  clicks: [{ id: "click", created_at: lead.created_at, event_type: "whatsapp_click", page_path: "/seguro-auto", analytics_loaded: false }],
  policies: [{ id: "policy", created_at: lead.created_at, policy_number: "P123", status: "ativa", premium_amount: 2000, commission_amount: 200 }],
});

beforeEach(() => { sessionStorage.clear(); invoke.mockReset(); });

describe("indicadores comerciais reais", () => {
  it("separa cliques, leads, etapas e cadastros de apólice", () => {
    const result = buildCommercialMetrics(fixture());
    expect(result.total).toBe(1);
    expect(result.whatsapp).toBe(1);
    expect(result.quote).toBe(0);
    expect(result.proposalStage).toBe(1);
    expect(result.wonStage).toBe(0); // stale lead_status must not override the board
    expect(result.policies).toBe(1);
    expect(result.beforeAnalytics).toBe(1);
    expect(result.byPage).toEqual([{ label: "/seguro-auto", leads: 1, whatsapp: 1, quote: 0 }]);
    expect(result.byChannel[0].label).toBe("Origem não informada / Mídia não informada");
    expect(result).not.toHaveProperty("revenue");
    expect(result).not.toHaveProperty("conversionRate");
  });
  it("respeita o intervalo semiaberto e não inventa resultados para vazio", () => {
    const data = fixture();
    data.leads = [{ ...lead, created_at: data.end }]; data.clicks = []; data.policies = [];
    const result = buildCommercialMetrics(data);
    expect(result.total).toBe(0); expect(result.byPage).toEqual([]);
    expect(result.policies).toBe(0);
    expect(commercialWindow(7, new Date("2026-10-08T12:00:00Z"))).toEqual({ start: "2026-10-01T12:00:00.000Z", end: "2026-10-08T12:00:00.000Z" });
  });
  it("usa a entrada e UTMs preservadas sem confundir entrada com envio", () => {
    const data = fixture();
    data.leads = [{ ...lead, raw_data: { attribution: { landing_page: "/guia?cpf=123", utm_source: "google", utm_medium: "cpc", utm_campaign: "auto" } } }];
    const result = buildCommercialMetrics(data);
    expect(result.byLanding).toEqual([{ label: "/guia", count: 1 }]);
    expect(result.byChannel).toEqual([{ label: "google / cpc", count: 1 }]);
    expect(result.withCampaign).toBe(1);
  });
});

describe("atribuição minimizada no caminho existente", () => {
  it("remove query, fragmento, email, telefone e URL arbitrária", () => {
    expect(sanitizeLeadAttribution({ landing_page: "/auto?email=x#secret", referrer: "https://google.com/search?q=secret", utm_source: "x@example.com", utm_medium: "11999999999", utm_campaign: "auto-2026" }))
      .toEqual({ landing_page: "/auto", referrer: "google.com", utm_campaign: "auto-2026" });
    expect(sanitizeLeadAttribution({ landing_page: "//evil.test/", utm_source: "https://evil.test" })).toEqual({});
  });
  it("preserva primeira atribuição salva e não envia a URL completa ao CRM", async () => {
    sessionStorage.setItem("patro_attribution", JSON.stringify({ landing_page: "/entrada?phone=123", utm_source: "google", utm_medium: "cpc" }));
    invoke.mockResolvedValue({ data: { success: true }, error: null });
    await submitLead({ full_name: "Teste", phone: "11999999999", source_page: "/cotacao?secret=1", raw_data: { consent: true } });
    expect(invoke).toHaveBeenCalledTimes(1);
    expect(invoke).toHaveBeenCalledWith("submit-lead", expect.objectContaining({ source_page: "/cotacao", utm_source: "google", raw_data: { consent: true, attribution: { landing_page: "/entrada", utm_source: "google", utm_medium: "cpc" } } }));
  });
  it("não bloqueia a captação quando a atribuição está corrompida", () => {
    sessionStorage.setItem("patro_attribution", "invalid json");
    expect(getLeadAttribution()).toEqual({});
  });
});

describe("consultas completas sem totais truncados", () => {
  it("pagina além do limite usual de resposta", async () => {
    const fetch = vi.fn(async (from: number) => ({ data: from === 0 ? Array.from({ length: 500 }, (_, id) => id) : [500], error: null }));
    expect(await collectCommercialPages(fetch)).toHaveLength(501);
    expect(fetch).toHaveBeenNthCalledWith(2, 500, 999);
  });
  it("não transforma falha ou excesso de volume em zero", async () => {
    await expect(collectCommercialPages(async () => ({ data: null, error: new Error("denied") }))).rejects.toThrow("Verifique sua sessão");
    await expect(collectCommercialPages(async () => ({ data: new Array(500).fill(1), error: null }))).rejects.toThrow("20 mil");
  });
});
