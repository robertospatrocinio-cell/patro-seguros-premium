import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { commercialWindow, type CommercialData } from "@/lib/commercialMetrics";

// Fail closed instead of silently treating PostgREST's row limit as the full total.
export async function collectCommercialPages<T>(
  fetchPage: (from: number, to: number) => PromiseLike<{ data: T[] | null; error: unknown }>,
): Promise<T[]> {
  const rows: T[] = [];
  const size = 500;
  for (let from = 0; from <= 20000; from += size) {
    const { data, error } = await fetchPage(from, from + size - 1);
    if (error) throw new Error("Não foi possível consultar os indicadores. Verifique sua sessão e tente novamente.");
    const page = data ?? [];
    if (rows.length + page.length > 20000) {
      throw new Error("O período excede 20 mil registros por fonte. Selecione um período menor; totais parciais não são exibidos.");
    }
    rows.push(...page);
    if (page.length < size) return rows;
  }
  throw new Error("Selecione um período menor para consultar todos os registros.");
}

export function useCommercialMetrics(days: number) {
  return useQuery({
    queryKey: ["commercial-metrics", days],
    staleTime: 60000,
    retry: 1,
    queryFn: async (): Promise<CommercialData> => {
      const { start, end } = commercialWindow(days);
      const [leadRows, clicks, stages, policies] = await Promise.all([
        collectCommercialPages(from => supabase.from("leads")
          // Do not download names, contact details or the full quote payload.
          .select("id,created_at,insurance_type,source_page,source_origin,utm_source,utm_medium,utm_campaign,lead_status,kanban_stage_id,attribution:raw_data->attribution,landing_page:raw_data->>landing_page")
          .gte("created_at", start).lt("created_at", end).order("id").range(from, from + 499)),
        collectCommercialPages(from => supabase.from("conversion_click_events")
          .select("id,created_at,event_type,page_path,analytics_loaded")
          .gte("created_at", start).lt("created_at", end).order("id").range(from, from + 499)),
        collectCommercialPages(from => supabase.from("kanban_stages")
          .select("id,name").order("id").range(from, from + 499)),
        collectCommercialPages(from => supabase.from("policies")
          .select("id,created_at,policy_number,status,premium_amount,commission_amount")
          .gte("created_at", start).lt("created_at", end).order("id").range(from, from + 499)),
      ]);
      return {
        start, end, clicks, stages, policies,
        leads: leadRows.map(({ attribution, landing_page, ...lead }) => ({
          ...lead, raw_data: { attribution, landing_page },
        })),
      };
    },
  });
}
