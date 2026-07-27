// Edge Function: gsc-performance
// Retorna performance agregada por página (URL) para o site verificado no Google Search Console.
// Autenticação: exige um JWT do Supabase Auth cujo user_id tenha role 'admin' em public.user_roles.
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const GATEWAY = "https://connector-gateway.lovable.dev/google_search_console";

interface Body {
  days?: number;                  // default 28
  siteUrl?: string;               // override; default: primeira propriedade verificada
  limit?: number;                 // default 100
  device?: "MOBILE" | "DESKTOP" | "TABLET" | "ALL";
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

    // Valida usuário via JWT
    const userClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: `Bearer ${jwt}` } },
    });
    const { data: userData, error: userErr } = await userClient.auth.getUser();
    if (userErr || !userData?.user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Verifica papel admin (SECURITY DEFINER RPC)
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
    const days = Math.max(1, Math.min(90, body.days ?? 28));
    const limit = Math.max(10, Math.min(500, body.limit ?? 200));

    // 1) Descobrir siteUrl verificado
    let siteUrl = body.siteUrl;
    if (!siteUrl) {
      const sites = await gscFetch("/webmasters/v3/sites", LOVABLE_API_KEY, GSC_API_KEY) as {
        siteEntry?: Array<{ siteUrl: string; permissionLevel?: string }>;
      };
      const entries = (sites.siteEntry ?? []).filter((s) =>
        s.permissionLevel && s.permissionLevel !== "siteUnverifiedUser"
      );
      // Preferir a propriedade que bate com patroseguros.com.br
      siteUrl = entries.find((s) => s.siteUrl.includes("patroseguros.com.br"))?.siteUrl
        ?? entries[0]?.siteUrl;
      if (!siteUrl) {
        return new Response(JSON.stringify({ error: "No verified GSC property found" }), {
          status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    // 2) searchAnalytics.query — agregado por page
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - days);
    const fmt = (d: Date) => d.toISOString().slice(0, 10);

    const encodedSite = encodeURIComponent(siteUrl);
    const queryBody: Record<string, unknown> = {
      startDate: fmt(startDate),
      endDate: fmt(endDate),
      dimensions: ["page"],
      rowLimit: limit,
      dataState: "final",
    };
    if (body.device && body.device !== "ALL") {
      queryBody.dimensionFilterGroups = [{
        filters: [{ dimension: "device", operator: "equals", expression: body.device }],
      }];
    }

    const perf = await gscFetch(
      `/webmasters/v3/sites/${encodedSite}/searchAnalytics/query`,
      LOVABLE_API_KEY, GSC_API_KEY,
      { method: "POST", body: JSON.stringify(queryBody) },
    ) as { rows?: Array<{ keys: [string]; clicks: number; impressions: number; ctr: number; position: number }> };

    const rows = (perf.rows ?? []).map((r) => ({
      page: r.keys[0],
      clicks: r.clicks,
      impressions: r.impressions,
      ctr: r.ctr,
      position: r.position,
    }));

    const totals = rows.reduce(
      (acc, r) => {
        acc.clicks += r.clicks;
        acc.impressions += r.impressions;
        return acc;
      },
      { clicks: 0, impressions: 0 },
    );
    const totalCtr = totals.impressions > 0 ? totals.clicks / totals.impressions : 0;

    return new Response(
      JSON.stringify({
        siteUrl,
        range: { startDate: fmt(startDate), endDate: fmt(endDate), days },
        totals: { ...totals, ctr: totalCtr, pages: rows.length },
        rows,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("gsc-performance error:", err);
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
