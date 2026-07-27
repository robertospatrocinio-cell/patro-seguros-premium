// Edge Function: next-section-cta-report
// Compara conversão entre placements de CTA de "próxima seção":
//   - next-section-inline  (NextSectionCta ao final de uma seção)
//   - next-section-list    (ProximasLeiturasCluster no rodapé)
//   - next-section-mobile  (MobileClusterNextCta — pill flutuante mobile)
//
// Métricas por placement:
//   - clicks         : total de cliques no período
//   - sessions       : sessões únicas que clicaram
//   - conversions    : sessões que registraram um evento em
//                      conversion_click_events APÓS o clique (attribution
//                      "last non-direct click" dentro da sessão)
//   - conversion_rate: conversions / sessions
//   - top_destination: destino mais clicado (com âncora)
//
// Segurança: exige JWT do Supabase Auth cujo user_id tenha role 'admin'.
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const VARIANTS = ["next-section-inline", "next-section-list", "next-section-mobile"] as const;
type Variant = (typeof VARIANTS)[number];

interface Body {
  days?: number;
}

interface ClickRow {
  placement: string;
  destination: string;
  session_id: string | null;
  created_at: string;
}

interface ConversionRow {
  session_id: string | null;
  created_at: string;
  event_type: string;
}

interface PlacementAgg {
  placement: Variant;
  clicks: number;
  sessions: Set<string>;
  convertingSessions: Set<string>;
  destinations: Map<string, number>;
  firstClickAt: Map<string, string>; // sessionId → ISO ts do primeiro clique nesse placement
}

const emptyAgg = (placement: Variant): PlacementAgg => ({
  placement,
  clicks: 0,
  sessions: new Set(),
  convertingSessions: new Set(),
  destinations: new Map(),
  firstClickAt: new Map(),
});

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const jwt = req.headers.get("Authorization")?.replace(/^Bearer\s+/i, "").trim();
    if (!jwt) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;

    const userClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: `Bearer ${jwt}` } },
    });
    const { data: userData, error: userErr } = await userClient.auth.getUser();
    if (userErr || !userData?.user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const admin = createClient(supabaseUrl, serviceKey);
    const { data: isAdmin, error: roleErr } = await admin.rpc("has_role", {
      _user_id: userData.user.id, _role: "admin",
    });
    if (roleErr || !isAdmin) {
      return new Response(JSON.stringify({ error: "Forbidden" }), {
        status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body: Body = req.method === "POST" ? await req.json().catch(() => ({})) : {};
    const days = Math.max(7, Math.min(90, body.days ?? 30));
    const end = new Date();
    const start = new Date(end);
    start.setDate(end.getDate() - (days - 1));

    // 1) Cliques em placements next-section-* no período.
    const { data: rawClicks, error: clicksErr } = await admin
      .from("internal_link_click_events")
      .select("placement, destination, session_id, created_at")
      .in("placement", VARIANTS as unknown as string[])
      .eq("event_kind", "click")
      .gte("created_at", start.toISOString())
      .lte("created_at", end.toISOString())
      .limit(50000);
    if (clicksErr) throw new Error(`clicks read failed: ${clicksErr.message}`);
    const clicks = (rawClicks ?? []) as ClickRow[];

    // 2) Conversões no período (mesma janela), indexadas por sessão.
    const { data: rawConversions, error: convErr } = await admin
      .from("conversion_click_events")
      .select("session_id, created_at, event_type")
      .gte("created_at", start.toISOString())
      .lte("created_at", end.toISOString())
      .not("session_id", "is", null)
      .limit(100000);
    if (convErr) throw new Error(`conversions read failed: ${convErr.message}`);
    const conversions = (rawConversions ?? []) as ConversionRow[];

    // Índice: session_id → menor timestamp de conversão.
    const firstConversionBySession = new Map<string, string>();
    for (const c of conversions) {
      if (!c.session_id) continue;
      const prev = firstConversionBySession.get(c.session_id);
      if (!prev || c.created_at < prev) firstConversionBySession.set(c.session_id, c.created_at);
    }

    // 3) Agrega por placement + atribui conversão POR sessão QUANDO o
    //    primeiro clique naquele placement acontece ANTES da conversão.
    const aggs = new Map<Variant, PlacementAgg>();
    for (const v of VARIANTS) aggs.set(v, emptyAgg(v));

    for (const row of clicks) {
      if (!VARIANTS.includes(row.placement as Variant)) continue;
      const agg = aggs.get(row.placement as Variant)!;
      agg.clicks += 1;
      agg.destinations.set(row.destination, (agg.destinations.get(row.destination) ?? 0) + 1);
      if (row.session_id) {
        agg.sessions.add(row.session_id);
        const prev = agg.firstClickAt.get(row.session_id);
        if (!prev || row.created_at < prev) {
          agg.firstClickAt.set(row.session_id, row.created_at);
        }
      }
    }

    for (const agg of aggs.values()) {
      for (const [sessionId, firstClickAt] of agg.firstClickAt) {
        const convAt = firstConversionBySession.get(sessionId);
        if (convAt && convAt >= firstClickAt) agg.convertingSessions.add(sessionId);
      }
    }

    const placements = Array.from(aggs.values()).map((agg) => {
      const sessions = agg.sessions.size;
      const conversionsCount = agg.convertingSessions.size;
      const topDestination = [...agg.destinations.entries()]
        .sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;
      return {
        placement: agg.placement,
        clicks: agg.clicks,
        sessions,
        conversions: conversionsCount,
        conversion_rate: sessions > 0 ? conversionsCount / sessions : 0,
        top_destination: topDestination,
      };
    });

    // Winner (maior conversion_rate com pelo menos 5 sessões — evita
    // vencedores por ruído em amostras pequenas).
    const eligible = placements.filter((p) => p.sessions >= 5);
    const winner = eligible.sort((a, b) => b.conversion_rate - a.conversion_rate)[0]?.placement ?? null;

    return new Response(
      JSON.stringify({
        window: { start: start.toISOString(), end: end.toISOString(), days },
        placements,
        winner,
        total_clicks: placements.reduce((s, p) => s + p.clicks, 0),
        total_conversions: placements.reduce((s, p) => s + p.conversions, 0),
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("next-section-cta-report failed:", message);
    return new Response(JSON.stringify({ error: message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});