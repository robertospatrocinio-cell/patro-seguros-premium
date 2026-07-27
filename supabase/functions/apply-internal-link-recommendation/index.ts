// Edge Function: apply-internal-link-recommendation
// Persiste uma recomendação selecionada no painel /admin/links-internos
// como registro em `internal_link_applications`. Exige role 'admin'.
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface Body {
  destination?: string;
  placement?: string;
  sources?: string[];
  score?: number;
  reason?: string;
  periodDays?: number;
  notes?: string;
  status?: string;
}

function json(status: number, body: unknown) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json(405, { error: "method not allowed" });

  const authHeader = req.headers.get("Authorization") || "";
  const token = authHeader.replace(/^Bearer\s+/i, "");
  if (!token) return json(401, { error: "missing bearer token" });

  const url = Deno.env.get("SUPABASE_URL")!;
  const anon = Deno.env.get("SUPABASE_ANON_KEY")!;
  const service = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

  const authed = createClient(url, anon, { global: { headers: { Authorization: `Bearer ${token}` } } });
  const { data: userData, error: userErr } = await authed.auth.getUser();
  if (userErr || !userData?.user) return json(401, { error: "invalid token" });
  const userId = userData.user.id;

  const admin = createClient(url, service);
  const { data: roleData, error: roleErr } = await admin
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("role", "admin")
    .maybeSingle();
  if (roleErr) return json(500, { error: "role check failed" });
  if (!roleData) return json(403, { error: "admin role required" });

  let body: Body;
  try {
    body = await req.json();
  } catch {
    return json(400, { error: "invalid json" });
  }

  const destination = (body.destination || "").trim();
  const placement = (body.placement || "").trim();
  const sources = Array.isArray(body.sources)
    ? body.sources.map((s) => String(s).trim()).filter(Boolean)
    : [];

  const allowedStatus = new Set(["planned", "accepted", "rejected", "applied"]);
  const status = allowedStatus.has(String(body.status || "").toLowerCase())
    ? String(body.status).toLowerCase()
    : "planned";

  if (!destination.startsWith("/") || destination.length > 512) {
    return json(400, { error: "destination must be a site-relative path" });
  }
  if (!placement || placement.length > 64) {
    return json(400, { error: "placement is required" });
  }
  if (sources.length > 20) return json(400, { error: "too many sources" });
  for (const s of sources) {
    if (!s.startsWith("/") || s.length > 512) {
      return json(400, { error: `invalid source: ${s}` });
    }
  }

  const payload = {
    destination,
    placement,
    sources,
    score: typeof body.score === "number" ? body.score : null,
    reason: body.reason ? String(body.reason).slice(0, 1000) : null,
    period_days: typeof body.periodDays === "number" ? body.periodDays : null,
    notes: body.notes ? String(body.notes).slice(0, 2000) : null,
    status,
    applied_by: userId,
  };

  // Upsert on the unique (destination, placement, sources) index so that
  // accept/reject/apply feedback can be flipped by the same admin without
  // producing duplicate rows.
  const { data, error } = await authed
    .from("internal_link_applications")
    .upsert(payload, { onConflict: "destination,placement,sources" })
    .select()
    .single();

  if (error) return json(500, { error: error.message });
  return json(200, { ok: true, application: data });
});