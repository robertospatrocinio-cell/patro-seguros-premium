import { safeAttributionPath } from "@/lib/leadAttribution";

export interface CommercialLead {
  id: string;
  created_at: string;
  insurance_type: string | null;
  source_page: string | null;
  source_origin: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  lead_status: string | null;
  kanban_stage_id: string | null;
  raw_data: unknown;
}
export interface CommercialClick {
  id: string;
  created_at: string;
  event_type: string;
  page_path: string | null;
  analytics_loaded: boolean;
}
export interface CommercialPolicy {
  id: string;
  created_at: string | null;
  policy_number: string | null;
  status: string | null;
  premium_amount: number | null;
  commission_amount: number | null;
}
export interface CommercialData {
  leads: CommercialLead[];
  clicks: CommercialClick[];
  stages: { id: string; name: string }[];
  policies: CommercialPolicy[];
  start: string;
  end: string;
}

export function commercialWindow(days: number, now = new Date()) {
  const end = now.toISOString();
  return { start: new Date(now.getTime() - days * 86400000).toISOString(), end };
}

function attribution(lead: CommercialLead): Record<string, unknown> {
  const raw = lead.raw_data;
  if (!raw || typeof raw !== "object") return {};
  const value = (raw as Record<string, unknown>).attribution;
  return value && typeof value === "object" ? value as Record<string, unknown> : {};
}

export function landingForLead(lead: CommercialLead): string | undefined {
  const raw = lead.raw_data;
  const legacy = raw && typeof raw === "object" ? (raw as Record<string, unknown>).landing_page : undefined;
  return safeAttributionPath(attribution(lead).landing_page) ?? safeAttributionPath(legacy);
}

function group(rows: CommercialLead[], key: (lead: CommercialLead) => string) {
  const counts = new Map<string, number>();
  rows.forEach(row => counts.set(key(row), (counts.get(key(row)) ?? 0) + 1));
  return [...counts].map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
}

export function buildCommercialMetrics(data: CommercialData) {
  const inside = (date: string | null) => !!date && date >= data.start && date < data.end;
  const leads = data.leads.filter(row => inside(row.created_at));
  const clicks = data.clicks.filter(row => inside(row.created_at));
  const policies = data.policies.filter(row => inside(row.created_at));
  const stageNames = new Map(data.stages.map(stage => [stage.id, stage.name]));
  // The board writes kanban_stage_id, not lead_status. Never let a stale status override it.
  const stageFor = (lead: CommercialLead) => lead.kanban_stage_id
    ? stageNames.get(lead.kanban_stage_id) ?? "Etapa não reconhecida"
    : lead.lead_status ?? "Sem status";
  const pages = new Map<string, { label: string; leads: number; whatsapp: number; quote: number }>();
  const page = (label: string) => {
    if (!pages.has(label)) pages.set(label, { label, leads: 0, whatsapp: 0, quote: 0 });
    return pages.get(label)!;
  };
  leads.forEach(lead => { page(safeAttributionPath(lead.source_page) ?? "Página não informada").leads++; });
  clicks.forEach(click => {
    const row = page(safeAttributionPath(click.page_path) ?? "Página não informada");
    if (click.event_type === "whatsapp_click") row.whatsapp++;
    if (click.event_type === "cotacao_click") row.quote++;
  });
  return {
    total: leads.length,
    whatsapp: clicks.filter(row => row.event_type === "whatsapp_click").length,
    quote: clicks.filter(row => row.event_type === "cotacao_click").length,
    beforeAnalytics: clicks.filter(row => !row.analytics_loaded).length,
    proposalStage: leads.filter(lead => stageFor(lead) === "Proposta Enviada").length,
    wonStage: leads.filter(lead => stageFor(lead) === "Fechado / Ganho").length,
    policies: policies.filter(row => !!row.policy_number?.trim()).length,
    withLanding: leads.filter(lead => !!landingForLead(lead)).length,
    withCampaign: leads.filter(lead => !!lead.utm_campaign || !!attribution(lead).utm_campaign).length,
    byType: group(leads, lead => lead.insurance_type || "Modalidade não informada"),
    byStage: group(leads, stageFor),
    byChannel: group(leads, lead => {
      const attr = attribution(lead);
      return `${lead.utm_source || attr.utm_source || "Origem não informada"} / ${lead.utm_medium || attr.utm_medium || "Mídia não informada"}`;
    }),
    byOrigin: group(leads, lead => lead.source_origin || "Não informada"),
    byCampaign: group(leads, lead => lead.utm_campaign || String(attribution(lead).utm_campaign || "Campanha não informada")),
    byLanding: group(leads, lead => landingForLead(lead) || "Entrada não informada"),
    byPage: [...pages.values()].sort((a, b) => b.leads - a.leads || b.whatsapp - a.whatsapp),
  };
}
