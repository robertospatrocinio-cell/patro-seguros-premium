// Edge Function: refresh-anchor-priorities
//
// Chama `internal-link-correlation` (com o JWT admin do chamador),
// extrai o array `anchorPotential` + `anchorConversions` e faz UPSERT
// em `public.anchor_priorities`.
//
// A tabela é lida publicamente pelo front (`useAnchorPriorities`) para
// reordenar automaticamente os itens de "Próximas leituras" segundo o
// maior potencial e a maior taxa de conversão medida.
//
// Segurança: exige JWT do Supabase Auth com role 'admin' (a checagem é
// feita pela função `internal-link-correlation`, que é chamada com o
// mesmo Authorization header do usuário).

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface RefreshBody {
  days?: number;
  siteUrl?: string;
}

interface AnchorPotential {
  anchor: string;
  score: number;
  clicks: number;
  sessions: number;
  convertingSessions: number;
  conversionRate: number;
  impressions: number;
  position: number | null;
}

interface AnchorConversion {
  anchor: string;
  sessions: number;
  convertingSessions: number;
  conversionRate: number;
  clicks: number;
}

interface CorrelationPayload {
  anchorPotential?: AnchorPotential[];
  anchorConversions?: AnchorConversion[];
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const authHeader = req.headers.get("Authorization") || "";
  if (!authHeader.toLowerCase().startsWith("bearer ")) {
    return new Response(JSON.stringify({ error: "Missing bearer token" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const body: RefreshBody = await req.json().catch(() => ({}));
    const days = Number.isFinite(body.days) ? Math.min(Math.max(Number(body.days), 1), 180) : 30;

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // 1) Chama internal-link-correlation herdando o JWT do usuário (a
    //    checagem de role 'admin' fica lá — evita duplicar lógica).
    const correlationRes = await fetch(`${supabaseUrl}/functions/v1/internal-link-correlation`, {
      method: "POST",
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ days, siteUrl: body.siteUrl }),
    });
    if (!correlationRes.ok) {
      const errText = await correlationRes.text();
      return new Response(
        JSON.stringify({ error: `internal-link-correlation ${correlationRes.status}: ${errText.slice(0, 400)}` }),
        { status: correlationRes.status, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
    const payload = (await correlationRes.json()) as CorrelationPayload;

    // 2) Cruza os dois rankings por âncora — o de potencial (score SEO)
    //    e o de conversão (rate observado). Uma âncora pode aparecer só
    //    em um dos dois; nesse caso o outro campo fica zerado.
    const merged = new Map<string, {
      anchor: string;
      score: number;
      conversion_rate: number;
      sessions: number;
      converting_sessions: number;
      clicks: number;
      impressions: number;
      position: number | null;
    }>();

    for (const p of payload.anchorPotential ?? []) {
      merged.set(p.anchor, {
        anchor: p.anchor,
        score: Number(p.score) || 0,
        conversion_rate: Number(p.conversionRate) || 0,
        sessions: p.sessions | 0,
        converting_sessions: p.convertingSessions | 0,
        clicks: p.clicks | 0,
        impressions: p.impressions | 0,
        position: p.position ?? null,
      });
    }
    for (const c of payload.anchorConversions ?? []) {
      const cur = merged.get(c.anchor);
      if (cur) {
        // O rank de conversão tem números de sessões mais recentes.
        cur.conversion_rate = Number(c.conversionRate) || cur.conversion_rate;
        cur.sessions = Math.max(cur.sessions, c.sessions | 0);
        cur.converting_sessions = Math.max(cur.converting_sessions, c.convertingSessions | 0);
        cur.clicks = Math.max(cur.clicks, c.clicks | 0);
      } else {
        merged.set(c.anchor, {
          anchor: c.anchor,
          score: 0,
          conversion_rate: Number(c.conversionRate) || 0,
          sessions: c.sessions | 0,
          converting_sessions: c.convertingSessions | 0,
          clicks: c.clicks | 0,
          impressions: 0,
          position: null,
        });
      }
    }

    const rows = Array.from(merged.values()).map((r) => ({
      ...r,
      updated_at: new Date().toISOString(),
    }));

    // 3) Upsert usando service_role. Substituímos o snapshot inteiro: a
    //    ordem em "Próximas leituras" precisa refletir os últimos N dias,
    //    então âncoras que sumiram do ranking também devem sumir daqui.
    const admin = createClient(supabaseUrl, serviceKey);
    if (rows.length > 0) {
      const { error } = await admin
        .from("anchor_priorities")
        .upsert(rows, { onConflict: "anchor" });
      if (error) throw error;

      // Remove âncoras que não vieram no snapshot atual (stale)
      const anchors = rows.map((r) => r.anchor);
      await admin.from("anchor_priorities").delete().not(
        "anchor",
        "in",
        `(${anchors.map((a) => `"${a.replace(/"/g, '""')}"`).join(",")})`,
      );
    } else {
      // sem dados no período — limpa tudo para não segurar snapshot velho
      await admin.from("anchor_priorities").delete().neq("anchor", "__none__");
    }

    return new Response(
      JSON.stringify({
        ok: true,
        days,
        upserted: rows.length,
        sample: rows.slice(0, 5),
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
