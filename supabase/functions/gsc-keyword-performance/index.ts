// Edge Function: gsc-keyword-performance
// Compara performance por keyword (query) entre dois períodos consecutivos
// (A = últimos N dias, B = N dias anteriores). Retorna clicks, impressões,
// CTR, posição e deltas para avaliar A vs B em 30 dias (default).
//
// Segurança: exige JWT do Supabase Auth cujo user_id tenha role 'admin'.
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const GATEWAY = "https://connector-gateway.lovable.dev/google_search_console";

interface Body {
  days?: number;                                     // default 30
  siteUrl?: string;                                  // override
  limit?: number;                                    // default 500
  device?: "MOBILE" | "DESKTOP" | "TABLET" | "ALL";
  pageContains?: string;                             // filtra por URL contém
}

interface GscRow {
  keys: string[];
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

async function gscFetch(path: string, lovableKey: string, gscKey: string, init: RequestInit = {}) {
  const res = await fetch(`${GATEWAY}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": gscKey,
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
  });
  const text = await res.text();
  let json: unknown;
  try { json = text ? JSON.parse(text) : {}; } catch { json = { raw: text }; }
  if (!res.ok) {
    const err = typeof json === "object" && json !== null && "error" in json
      ? (json as { error: unknown }).error : json;
    throw new Error(`GSC ${path} ${res.status}: ${JSON.stringify(err).slice(0, 400)}`);
  }
  return json;
}

const fmt = (d: Date) => d.toISOString().slice(0, 10);

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

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const GSC_API_KEY = Deno.env.get("GOOGLE_SEARCH_CONSOLE_API_KEY");
    if (!LOVABLE_API_KEY || !GSC_API_KEY) {
      return new Response(JSON.stringify({ error: "GSC connector not configured" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body: Body = req.method === "POST" ? await req.json().catch(() => ({})) : {};
    const days = Math.max(7, Math.min(90, body.days ?? 30));
    const limit = Math.max(50, Math.min(1000, body.limit ?? 500));

    // 1) Descobrir siteUrl verificado
    let siteUrl = body.siteUrl;
    if (!siteUrl) {
      const sites = await gscFetch("/webmasters/v3/sites", LOVABLE_API_KEY, GSC_API_KEY) as {
        siteEntry?: Array<{ siteUrl: string; permissionLevel?: string }>;
      };
      const entries = (sites.siteEntry ?? []).filter((s) =>
        s.permissionLevel && s.permissionLevel !== "siteUnverifiedUser"
      );
      siteUrl = entries.find((s) => s.siteUrl.includes("patroseguros.com.br"))?.siteUrl
        ?? entries[0]?.siteUrl;
      if (!siteUrl) {
        return new Response(JSON.stringify({ error: "No verified GSC property found" }), {
          status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    // 2) Janelas A (últimos N dias) e B (N anteriores)
    // GSC final data tem ~2 dias de atraso; começamos endA 2 dias atrás.
    const endA = new Date();
    endA.setDate(endA.getDate() - 2);
    const startA = new Date(endA);
    startA.setDate(endA.getDate() - (days - 1));

    const endB = new Date(startA);
    endB.setDate(startA.getDate() - 1);
    const startB = new Date(endB);
    startB.setDate(endB.getDate() - (days - 1));

    const encodedSite = encodeURIComponent(siteUrl);
    const filterGroups: Array<{ filters: Array<Record<string, string>> }> = [];
    if (body.device && body.device !== "ALL") {
      filterGroups.push({
        filters: [{ dimension: "device", operator: "equals", expression: body.device }],
      });
    }
    if (body.pageContains) {
      filterGroups.push({
        filters: [{ dimension: "page", operator: "contains", expression: body.pageContains }],
      });
    }

    const buildQuery = (s: Date, e: Date) => {
      const q: Record<string, unknown> = {
        startDate: fmt(s),
        endDate: fmt(e),
        dimensions: ["query"],
        rowLimit: limit,
        dataState: "final",
      };
      if (filterGroups.length) q.dimensionFilterGroups = filterGroups;
      return q;
    };

    const [respA, respB] = await Promise.all([
      gscFetch(
        `/webmasters/v3/sites/${encodedSite}/searchAnalytics/query`,
        LOVABLE_API_KEY, GSC_API_KEY,
        { method: "POST", body: JSON.stringify(buildQuery(startA, endA)) },
      ) as Promise<{ rows?: GscRow[] }>,
      gscFetch(
        `/webmasters/v3/sites/${encodedSite}/searchAnalytics/query`,
        LOVABLE_API_KEY, GSC_API_KEY,
        { method: "POST", body: JSON.stringify(buildQuery(startB, endB)) },
      ) as Promise<{ rows?: GscRow[] }>,
    ]);

    type Metrics = { clicks: number; impressions: number; ctr: number; position: number };
    const toMap = (rows?: GscRow[]) => {
      const m = new Map<string, Metrics>();
      for (const r of rows ?? []) {
        m.set(r.keys[0], {
          clicks: r.clicks, impressions: r.impressions, ctr: r.ctr, position: r.position,
        });
      }
      return m;
    };
    const mapA = toMap(respA.rows);
    const mapB = toMap(respB.rows);
    const keys = new Set<string>([...mapA.keys(), ...mapB.keys()]);

    const rows = Array.from(keys).map((query) => {
      const a = mapA.get(query);
      const b = mapB.get(query);
      const inTop10A = a ? a.position <= 10 : false;
      const inTop10B = b ? b.position <= 10 : false;
      // Delta de posição: negativo = subiu (melhorou); B - A porque posição menor é melhor
      const positionDelta = a && b ? b.position - a.position : null;
      const clicksDelta = (a?.clicks ?? 0) - (b?.clicks ?? 0);
      const impressionsDelta = (a?.impressions ?? 0) - (b?.impressions ?? 0);
      const ctrDelta = a && b ? a.ctr - b.ctr : null;
      let trend: "up" | "down" | "new" | "lost" | "flat" = "flat";
      if (!b && a) trend = "new";
      else if (b && !a) trend = "lost";
      else if (positionDelta != null && positionDelta < -0.5) trend = "up";
      else if (positionDelta != null && positionDelta > 0.5) trend = "down";
      return {
        query,
        a,
        b,
        deltas: { clicks: clicksDelta, impressions: impressionsDelta, ctr: ctrDelta, position: positionDelta },
        inTop10A,
        inTop10B,
        trend,
      };
    });

    const sumOf = (rs: GscRow[] | undefined) => {
      const t = { clicks: 0, impressions: 0 };
      for (const r of rs ?? []) { t.clicks += r.clicks; t.impressions += r.impressions; }
      return { ...t, ctr: t.impressions ? t.clicks / t.impressions : 0, queries: (rs ?? []).length };
    };

    const totalsA = sumOf(respA.rows);
    const totalsB = sumOf(respB.rows);
    const top10A = rows.filter((r) => r.inTop10A).length;
    const top10B = rows.filter((r) => r.inTop10B).length;

    return new Response(
      JSON.stringify({
        siteUrl,
        periodA: { startDate: fmt(startA), endDate: fmt(endA), days },
        periodB: { startDate: fmt(startB), endDate: fmt(endB), days },
        totals: {
          a: totalsA,
          b: totalsB,
          top10: { a: top10A, b: top10B, delta: top10A - top10B },
          clicksDelta: totalsA.clicks - totalsB.clicks,
          impressionsDelta: totalsA.impressions - totalsB.impressions,
          ctrDelta: totalsA.ctr - totalsB.ctr,
        },
        rows,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("gsc-keyword-performance error:", err);
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});