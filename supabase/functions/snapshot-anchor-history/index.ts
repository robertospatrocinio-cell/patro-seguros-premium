// Edge Function: snapshot-anchor-history
// Copia o estado atual de `public.anchor_priorities` para
// `public.anchor_priority_history` com a data de hoje. Executada 1x/dia
// pelo pg_cron. Idempotente: ON CONFLICT (anchor, snapshot_date) atualiza.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const url = Deno.env.get("SUPABASE_URL")!;
    const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const admin = createClient(url, key);

    const { data: rows, error } = await admin
      .from("anchor_priorities")
      .select("anchor, score, conversion_rate, sessions, converting_sessions, clicks, impressions, position, top_pathname, whatsapp_conversions, cotacao_conversions");
    if (error) throw error;

    const today = new Date().toISOString().slice(0, 10);
    const snapshot = (rows ?? []).map((r) => ({ ...r, snapshot_date: today }));

    let inserted = 0;
    if (snapshot.length > 0) {
      const { error: upErr } = await admin
        .from("anchor_priority_history")
        .upsert(snapshot, { onConflict: "anchor,snapshot_date" });
      if (upErr) throw upErr;
      inserted = snapshot.length;
    }

    // Chaina detecção de alertas — mantém o fluxo diário atômico.
    fetch(`${url}/functions/v1/detect-anchor-alerts`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: "{}",
    }).catch(() => {});

    return new Response(JSON.stringify({ ok: true, snapshotDate: today, inserted }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err instanceof Error ? err.message : String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});