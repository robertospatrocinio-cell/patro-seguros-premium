// deno-lint-ignore-file no-explicit-any
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const URLS = [
  "https://www.patroseguros.com.br/",
  "https://www.patroseguros.com.br/seguro-auto",
  "https://www.patroseguros.com.br/seguro-empresarial",
  "https://www.patroseguros.com.br/seguro-vida",
  "https://www.patroseguros.com.br/planos-de-saude",
];

const STRATEGIES = ["mobile", "desktop"] as const;

const PSI_ENDPOINT = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";

async function auditOne(url: string, strategy: "mobile" | "desktop") {
  const apiKey = Deno.env.get("PSI_API_KEY");
  const params = new URLSearchParams({ url, strategy });
  for (const c of ["performance", "accessibility", "best-practices", "seo"]) {
    params.append("category", c);
  }
  if (apiKey) params.append("key", apiKey);

  const resp = await fetch(`${PSI_ENDPOINT}?${params.toString()}`);
  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`PSI ${resp.status}: ${text.slice(0, 300)}`);
  }
  const data = await resp.json();
  const cats = data?.lighthouseResult?.categories ?? {};
  const audits = data?.lighthouseResult?.audits ?? {};

  const score = (k: string) =>
    cats[k]?.score != null ? Math.round(cats[k].score * 100) : null;

  return {
    url,
    strategy,
    performance_score: score("performance"),
    accessibility_score: score("accessibility"),
    best_practices_score: score("best-practices"),
    seo_score: score("seo"),
    lcp_ms: audits["largest-contentful-paint"]?.numericValue ?? null,
    fcp_ms: audits["first-contentful-paint"]?.numericValue ?? null,
    tbt_ms: audits["total-blocking-time"]?.numericValue ?? null,
    cls: audits["cumulative-layout-shift"]?.numericValue ?? null,
    speed_index_ms: audits["speed-index"]?.numericValue ?? null,
  };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  // Auth: allow service role (cron) OR an authenticated admin user.
  const authHeader = req.headers.get("Authorization") ?? "";
  const token = authHeader.replace(/^Bearer\s+/i, "").trim();
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  let authorized = false;
  if (token && token === serviceKey) {
    authorized = true;
  } else if (token) {
    try {
      const authClient = createClient(
        Deno.env.get("SUPABASE_URL")!,
        Deno.env.get("SUPABASE_ANON_KEY")!,
      );
      const { data: userData } = await authClient.auth.getUser(token);
      const userId = userData?.user?.id;
      if (userId) {
        const admin = createClient(Deno.env.get("SUPABASE_URL")!, serviceKey);
        const { data: roleRow } = await admin
          .from("user_roles")
          .select("role")
          .eq("user_id", userId)
          .eq("role", "admin")
          .maybeSingle();
        if (roleRow) authorized = true;
      }
    } catch (_e) { /* fall through */ }
  }
  if (!authorized) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  const results: any[] = [];
  const errors: any[] = [];

  for (const url of URLS) {
    for (const strategy of STRATEGIES) {
      try {
        const row = await auditOne(url, strategy);
        const { error } = await supabase.from("pagespeed_audits").insert(row);
        if (error) throw error;
        results.push({ url, strategy, ok: true });
      } catch (e) {
        console.error("audit failed", url, strategy, e);
        errors.push({ url, strategy, error: String(e) });
      }
      // small delay to avoid PSI rate limit
      await new Promise((r) => setTimeout(r, 1500));
    }
  }

  return new Response(
    JSON.stringify({ ok: errors.length === 0, results, errors }),
    { headers: { ...corsHeaders, "Content-Type": "application/json" } },
  );
});
