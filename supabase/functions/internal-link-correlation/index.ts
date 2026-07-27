// Edge Function: internal-link-correlation
// Correlaciona cliques em links internos (trackInternalLinkClick →
// internal_link_click_events) com impressões, cliques e posição média
// das páginas destino no Google Search Console.
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
  days?: number;
  siteUrl?: string;
  limit?: number;
  placement?: string;
  source?: string;
  anchor?: string;
}

interface GscRow {
  keys: string[];
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

const fmt = (d: Date) => d.toISOString().slice(0, 10);

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

/**
 * Normaliza uma URL/destino para o formato de "page" que o GSC devolve:
 * mantém apenas o pathname (sem query/hash) começando com "/".
 * Aceita destinos absolutos (https://…) ou relativos ("/foo?x=1").
 */
function toPathname(destination: string): string | null {
  const raw = destination?.trim();
  if (!raw) return null;
  try {
    const u = raw.startsWith("http") ? new URL(raw) : new URL(raw, "https://x.local");
    let p = u.pathname || "/";
    if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
    return p;
  } catch {
    return null;
  }
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
    const days = Math.max(7, Math.min(90, body.days ?? 28));
    const limit = Math.max(50, Math.min(2000, body.limit ?? 1000));

    // 1) Descobrir siteUrl verificado (preferindo patroseguros.com.br)
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

    // 2) Buscar cliques agregados por destino no período
    const endA = new Date();
    const startA = new Date(endA);
    startA.setDate(endA.getDate() - (days - 1));

    let clicksQuery = admin
      .from("internal_link_click_events")
      .select("destination, source, placement, anchor, session_id, created_at")
      .gte("created_at", startA.toISOString())
      .lte("created_at", endA.toISOString())
      .limit(50000);
    if (body.placement) clicksQuery = clicksQuery.eq("placement", body.placement);
    if (body.source) clicksQuery = clicksQuery.eq("source", body.source);
    if (body.anchor) clicksQuery = clicksQuery.eq("anchor", body.anchor);

    const { data: clicksData, error: clicksErr } = await clicksQuery;
    if (clicksErr) throw new Error(`DB read failed: ${clicksErr.message}`);

    type Agg = {
      destination: string;
      pathname: string;
      clicks: number;
      sessions: Set<string>;
      sourcesTop: Map<string, number>;
      placementsTop: Map<string, number>;
      anchorsTop: Map<string, number>;
    };
    const byDest = new Map<string, Agg>();

    for (const row of clicksData ?? []) {
      const pathname = toPathname(row.destination);
      if (!pathname) continue;
      let agg = byDest.get(pathname);
      if (!agg) {
        agg = {
          destination: row.destination,
          pathname,
          clicks: 0,
          sessions: new Set(),
          sourcesTop: new Map(),
          placementsTop: new Map(),
          anchorsTop: new Map(),
        };
        byDest.set(pathname, agg);
      }
      agg.clicks += 1;
      if (row.session_id) agg.sessions.add(row.session_id);
      if (row.source) agg.sourcesTop.set(row.source, (agg.sourcesTop.get(row.source) ?? 0) + 1);
      if (row.placement) agg.placementsTop.set(row.placement, (agg.placementsTop.get(row.placement) ?? 0) + 1);
      if (row.anchor) agg.anchorsTop.set(row.anchor, (agg.anchorsTop.get(row.anchor) ?? 0) + 1);
    }

    // 3) Buscar performance por página no GSC (janela alinhada com A)
    // GSC final data tem ~2 dias de atraso; usamos dataState 'all' para
    // maximizar sobreposição com nossa janela de cliques (que é em tempo
    // real). A leve imprecisão é aceitável para correlação.
    const encodedSite = encodeURIComponent(siteUrl);
    const buildQuery = () => ({
      startDate: fmt(startA),
      endDate: fmt(endA),
      dimensions: ["page"],
      rowLimit: limit,
      dataState: "all",
    });

    const gscResp = await gscFetch(
      `/webmasters/v3/sites/${encodedSite}/searchAnalytics/query`,
      LOVABLE_API_KEY, GSC_API_KEY,
      { method: "POST", body: JSON.stringify(buildQuery()) },
    ) as { rows?: GscRow[] };

    const gscByPath = new Map<string, { clicks: number; impressions: number; ctr: number; position: number; url: string }>();
    for (const r of gscResp.rows ?? []) {
      const url = r.keys[0];
      const p = toPathname(url);
      if (!p) continue;
      // Se houver duplicatas (http/https/www), somamos cliques/impressões
      // e re-calculamos ctr/position ponderada por impressões.
      const cur = gscByPath.get(p);
      if (!cur) {
        gscByPath.set(p, { clicks: r.clicks, impressions: r.impressions, ctr: r.ctr, position: r.position, url });
      } else {
        const impressions = cur.impressions + r.impressions;
        const clicks = cur.clicks + r.clicks;
        const position = impressions > 0
          ? (cur.position * cur.impressions + r.position * r.impressions) / impressions
          : r.position;
        gscByPath.set(p, {
          clicks, impressions,
          ctr: impressions > 0 ? clicks / impressions : 0,
          position,
          url: cur.url,
        });
      }
    }

    // 4) União: linhas com cliques internos + linhas com dados GSC
    const allPaths = new Set<string>([...byDest.keys(), ...gscByPath.keys()]);
    const rows = Array.from(allPaths).map((pathname) => {
      const agg = byDest.get(pathname);
      const gsc = gscByPath.get(pathname);
      const top = (m: Map<string, number> | undefined) => {
        if (!m) return null;
        let best: [string, number] | null = null;
        for (const [k, v] of m) if (!best || v > best[1]) best = [k, v];
        return best ? { key: best[0], count: best[1] } : null;
      };
      const anchorBreakdown = (m: Map<string, number> | undefined) => {
        if (!m || m.size === 0) return [] as Array<{ anchor: string; clicks: number }>;
        return Array.from(m.entries())
          .map(([anchor, clicks]) => ({ anchor, clicks }))
          .sort((a, b) => b.clicks - a.clicks)
          .slice(0, 8);
      };
      return {
        pathname,
        internalClicks: agg?.clicks ?? 0,
        internalSessions: agg?.sessions.size ?? 0,
        topSource: top(agg?.sourcesTop),
        topPlacement: top(agg?.placementsTop),
        topAnchor: top(agg?.anchorsTop),
        anchors: anchorBreakdown(agg?.anchorsTop),
        gsc: gsc ? {
          clicks: gsc.clicks,
          impressions: gsc.impressions,
          ctr: gsc.ctr,
          position: gsc.position,
          url: gsc.url,
        } : null,
      };
    });

    // 5b) Ranking global de âncoras (drilldown independente de página):
    //     agrega TODAS as âncoras clicadas no período com um snapshot de
    //     performance GSC da página onde cada clique foi disparado.
    type AnchorRow = {
      anchor: string;
      clicks: number;
      sessions: Set<string>;
      pages: Map<string, number>;
      impressionsSum: number;
      positionWeightedSum: number;
      positionImprWeight: number;
    };
    const anchorMap = new Map<string, AnchorRow>();
    for (const [pathname, agg] of byDest) {
      const gsc = gscByPath.get(pathname);
      for (const [anchor, clicks] of agg.anchorsTop) {
        let a = anchorMap.get(anchor);
        if (!a) {
          a = {
            anchor, clicks: 0, sessions: new Set(),
            pages: new Map(), impressionsSum: 0,
            positionWeightedSum: 0, positionImprWeight: 0,
          };
          anchorMap.set(anchor, a);
        }
        a.clicks += clicks;
        a.pages.set(pathname, (a.pages.get(pathname) ?? 0) + clicks);
        if (gsc) {
          // Atribui as impressões da página proporcionalmente aos cliques
          // internos vindos dessa âncora nessa página.
          const shareWeight = clicks;
          a.impressionsSum += gsc.impressions * (clicks / Math.max(1, agg.clicks));
          a.positionWeightedSum += gsc.position * shareWeight;
          a.positionImprWeight += shareWeight;
        }
      }
    }
    const anchorsGlobal = Array.from(anchorMap.values())
      .map((a) => ({
        anchor: a.anchor,
        clicks: a.clicks,
        pages: a.pages.size,
        topPage: (() => {
          let best: [string, number] | null = null;
          for (const [p, c] of a.pages) if (!best || c > best[1]) best = [p, c];
          return best ? { pathname: best[0], clicks: best[1] } : null;
        })(),
        gscImpressionsAttributed: Math.round(a.impressionsSum),
        gscAveragePosition: a.positionImprWeight > 0
          ? a.positionWeightedSum / a.positionImprWeight
          : null,
      }))
      .sort((a, b) => b.clicks - a.clicks);

    // 5) Totais + coeficiente de correlação de Pearson entre cliques
    //    internos e impressões/posição (apenas onde os dois lados existem).
    const paired = rows.filter((r) => r.gsc && r.internalClicks > 0);
    const pearson = (xs: number[], ys: number[]): number | null => {
      const n = xs.length;
      if (n < 3) return null;
      const mx = xs.reduce((a, b) => a + b, 0) / n;
      const my = ys.reduce((a, b) => a + b, 0) / n;
      let num = 0, dx = 0, dy = 0;
      for (let i = 0; i < n; i++) {
        const a = xs[i] - mx, b = ys[i] - my;
        num += a * b; dx += a * a; dy += b * b;
      }
      const denom = Math.sqrt(dx * dy);
      return denom > 0 ? num / denom : null;
    };
    const xClicks = paired.map((r) => r.internalClicks);
    const yImpr = paired.map((r) => r.gsc!.impressions);
    const yPos = paired.map((r) => r.gsc!.position);

    const totals = {
      internalClicksTotal: rows.reduce((s, r) => s + r.internalClicks, 0),
      gscImpressionsTotal: rows.reduce((s, r) => s + (r.gsc?.impressions ?? 0), 0),
      gscClicksTotal: rows.reduce((s, r) => s + (r.gsc?.clicks ?? 0), 0),
      pagesWithInternalClicks: rows.filter((r) => r.internalClicks > 0).length,
      pagesWithGsc: rows.filter((r) => r.gsc).length,
      overlap: paired.length,
      correlationInternalClicksVsImpressions: pearson(xClicks, yImpr),
      correlationInternalClicksVsPosition: pearson(xClicks, yPos),
    };

    return new Response(
      JSON.stringify({
        siteUrl,
        period: { startDate: fmt(startA), endDate: fmt(endA), days },
        totals,
        rows,
        anchorsGlobal,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("internal-link-correlation error:", err);
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});