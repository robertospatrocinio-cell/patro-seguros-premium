// Edge Function: detect-anchor-alerts
//
// Lê os últimos 14 dias de `anchor_priority_history` e gera alertas em
// `anchor_alerts` para dois cenários:
//
// 1) sustained_potential: âncora com score alto (>= SUSTAINED_SCORE_MIN)
//    em pelo menos 7 dias corridos consecutivos até hoje.
//
// 2) efficiency_drop: âncora cuja taxa de conversão média dos últimos
//    3 dias caiu >= 50% em relação à média dos 7 dias anteriores, com
//    mínimo de amostra em ambas as janelas.
//
// Alertas são deduplicados por (anchor, kind) enquanto ainda estão
// abertos — se já existe um aberto, apenas atualiza `streak_days`,
// `last_detected_at` e as métricas atuais.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const SUSTAINED_SCORE_MIN = 60;          // score mínimo para "alto potencial"
const SUSTAINED_STREAK_DAYS = 7;
const DROP_RATIO = 0.5;                  // <=50% da média anterior
const DROP_MIN_SESSIONS_RECENT = 5;
const DROP_MIN_SESSIONS_PREVIOUS = 10;
const LOOKBACK_DAYS = 14;

type Row = {
  anchor: string;
  snapshot_date: string;
  score: number;
  conversion_rate: number;
  sessions: number;
  converting_sessions: number;
  clicks: number;
  impressions: number;
  position: number | null;
  top_pathname: string | null;
  whatsapp_conversions: number;
  cotacao_conversions: number;
};

function ymd(d: Date) {
  return d.toISOString().slice(0, 10);
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const url = Deno.env.get("SUPABASE_URL")!;
    const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const admin = createClient(url, key);

    const today = new Date();
    const since = new Date(today);
    since.setUTCDate(since.getUTCDate() - LOOKBACK_DAYS);

    const { data, error } = await admin
      .from("anchor_priority_history")
      .select("*")
      .gte("snapshot_date", ymd(since))
      .order("snapshot_date", { ascending: false });
    if (error) throw error;

    const rows = (data ?? []) as Row[];
    // agrupa por âncora, ordenado desc por data
    const byAnchor = new Map<string, Row[]>();
    for (const r of rows) {
      const arr = byAnchor.get(r.anchor) ?? [];
      arr.push(r);
      byAnchor.set(r.anchor, arr);
    }

    type AlertUpsert = {
      anchor: string;
      kind: "sustained_potential" | "efficiency_drop";
      streak_days: number;
      current_score: number | null;
      current_conversion_rate: number | null;
      previous_conversion_rate: number | null;
      top_pathname: string | null;
      reason: string;
      metrics: Record<string, unknown>;
    };
    const detected: AlertUpsert[] = [];

    for (const [anchor, snaps] of byAnchor.entries()) {
      snaps.sort((a, b) => (a.snapshot_date < b.snapshot_date ? 1 : -1));
      const latest = snaps[0];

      // ---- Sustained potential ----
      let streak = 0;
      const wantDate = new Date(today);
      for (const s of snaps) {
        const expected = ymd(wantDate);
        if (s.snapshot_date !== expected) break;
        if (Number(s.score) >= SUSTAINED_SCORE_MIN) {
          streak += 1;
          wantDate.setUTCDate(wantDate.getUTCDate() - 1);
        } else break;
      }
      if (streak >= SUSTAINED_STREAK_DAYS) {
        detected.push({
          anchor,
          kind: "sustained_potential",
          streak_days: streak,
          current_score: Number(latest.score),
          current_conversion_rate: Number(latest.conversion_rate),
          previous_conversion_rate: null,
          top_pathname: latest.top_pathname,
          reason: `Score ≥ ${SUSTAINED_SCORE_MIN} há ${streak} dias consecutivos — âncora com alto potencial SEO sem ação`,
          metrics: {
            score: latest.score,
            impressions: latest.impressions,
            position: latest.position,
            sessions: latest.sessions,
            conversion_rate: latest.conversion_rate,
          },
        });
      }

      // ---- Efficiency drop ----
      const recent = snaps.slice(0, 3);
      const previous = snaps.slice(3, 10);
      const sumSessions = (arr: Row[]) => arr.reduce((s, r) => s + (r.sessions | 0), 0);
      const sumConverting = (arr: Row[]) => arr.reduce((s, r) => s + (r.converting_sessions | 0), 0);
      const recentSessions = sumSessions(recent);
      const prevSessions = sumSessions(previous);
      if (
        recent.length >= 2 &&
        previous.length >= 3 &&
        recentSessions >= DROP_MIN_SESSIONS_RECENT &&
        prevSessions >= DROP_MIN_SESSIONS_PREVIOUS
      ) {
        const recentRate = sumConverting(recent) / recentSessions;
        const prevRate = sumConverting(previous) / prevSessions;
        if (prevRate > 0 && recentRate <= prevRate * DROP_RATIO) {
          detected.push({
            anchor,
            kind: "efficiency_drop",
            streak_days: recent.length,
            current_score: Number(latest.score),
            current_conversion_rate: recentRate,
            previous_conversion_rate: prevRate,
            top_pathname: latest.top_pathname,
            reason: `Conversão caiu de ${(prevRate * 100).toFixed(2)}% (7d) para ${(recentRate * 100).toFixed(2)}% (3d) — queda ≥ ${((1 - DROP_RATIO) * 100).toFixed(0)}%`,
            metrics: {
              recent_sessions: recentSessions,
              previous_sessions: prevSessions,
              recent_rate: recentRate,
              previous_rate: prevRate,
            },
          });
        }
      }
    }

    // Upsert por (anchor, kind) enquanto status='open'.
    // Sem constraint direta em upsert (parcial), usamos manual:
    let opened = 0;
    let refreshed = 0;
    const nowIso = new Date().toISOString();

    for (const d of detected) {
      const { data: existing } = await admin
        .from("anchor_alerts")
        .select("id, streak_days, first_detected_at")
        .eq("anchor", d.anchor)
        .eq("kind", d.kind)
        .eq("status", "open")
        .maybeSingle();

      if (existing) {
        await admin
          .from("anchor_alerts")
          .update({
            streak_days: d.streak_days,
            last_detected_at: nowIso,
            current_score: d.current_score,
            current_conversion_rate: d.current_conversion_rate,
            previous_conversion_rate: d.previous_conversion_rate,
            top_pathname: d.top_pathname,
            reason: d.reason,
            metrics: d.metrics,
          })
          .eq("id", existing.id);
        refreshed += 1;
      } else {
        await admin.from("anchor_alerts").insert({
          anchor: d.anchor,
          kind: d.kind,
          status: "open",
          streak_days: d.streak_days,
          first_detected_at: nowIso,
          last_detected_at: nowIso,
          current_score: d.current_score,
          current_conversion_rate: d.current_conversion_rate,
          previous_conversion_rate: d.previous_conversion_rate,
          top_pathname: d.top_pathname,
          reason: d.reason,
          metrics: d.metrics,
        });
        opened += 1;
      }
    }

    return new Response(
      JSON.stringify({ ok: true, detected: detected.length, opened, refreshed }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: err instanceof Error ? err.message : String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});