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
      .select("destination, source, placement, anchor, session_id, created_at, event_kind")
      .gte("created_at", startA.toISOString())
      .lte("created_at", endA.toISOString())
      .limit(50000);
    if (body.placement) clicksQuery = clicksQuery.eq("placement", body.placement);
    if (body.source) clicksQuery = clicksQuery.eq("source", body.source);
    if (body.anchor) clicksQuery = clicksQuery.eq("anchor", body.anchor);

    const { data: rawEvents, error: clicksErr } = await clicksQuery;
    if (clicksErr) throw new Error(`DB read failed: ${clicksErr.message}`);

    // Separa cliques (default) de section_views (leituras confirmadas via
    // IntersectionObserver no JumpLinksNav). Ambos vivem na mesma tabela
    // para reaproveitar índices/atribuição por session_id.
    const clicksData = (rawEvents ?? []).filter(
      (r) => (r.event_kind ?? "click") === "click",
    );
    const viewsData = (rawEvents ?? []).filter(
      (r) => r.event_kind === "section-view",
    );

    // Índice de leituras por âncora → {sessions, views}. Usado abaixo
    // para enriquecer o ranking de âncoras por conversão com o funil
    // "leitura → clique → conversão".
    type AnchorView = { views: number; sessions: Set<string> };
    const viewsByAnchor = new Map<string, AnchorView>();
    for (const v of viewsData) {
      if (!v.anchor) continue;
      let entry = viewsByAnchor.get(v.anchor as string);
      if (!entry) {
        entry = { views: 0, sessions: new Set() };
        viewsByAnchor.set(v.anchor as string, entry);
      }
      entry.views += 1;
      if (v.session_id) entry.sessions.add(v.session_id as string);
    }

    // 2b) Buscar conversões (cotacao_click / whatsapp_click) no mesmo período,
    //     para atribuir por session_id às âncoras clicadas ANTES da conversão.
    const { data: convData, error: convErr } = await admin
      .from("conversion_click_events")
      .select("session_id, event_type, created_at")
      .gte("created_at", startA.toISOString())
      .lte("created_at", endA.toISOString())
      .not("session_id", "is", null)
      .limit(100000);
    if (convErr) throw new Error(`DB read conversions failed: ${convErr.message}`);

    type SessionConv = {
      firstAt: number;
      types: Set<string>;
      byType: Map<string, number[]>; // event_type -> timestamps
    };
    const convBySession = new Map<string, SessionConv>();
    for (const c of convData ?? []) {
      if (!c.session_id) continue;
      const ts = new Date(c.created_at as string).getTime();
      let s = convBySession.get(c.session_id as string);
      if (!s) {
        s = { firstAt: ts, types: new Set(), byType: new Map() };
        convBySession.set(c.session_id as string, s);
      }
      if (ts < s.firstAt) s.firstAt = ts;
      s.types.add(c.event_type as string);
      const arr = s.byType.get(c.event_type as string) ?? [];
      arr.push(ts);
      s.byType.set(c.event_type as string, arr);
    }

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

    // Atribuição de conversão por âncora — indexada aqui para reutilizar
    // o loop principal sem custo extra de I/O.
    type AnchorConv = {
      anchor: string;
      clicks: number;
      sessions: Set<string>;
      convertingSessions: Set<string>;
      whatsappConversions: number;
      cotacaoConversions: number;
      pages: Map<string, number>;
    };
    const anchorConvMap = new Map<string, AnchorConv>();

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

      // Atribuição por âncora: precisa de anchor + session_id.
      if (row.anchor && row.session_id) {
        let a = anchorConvMap.get(row.anchor);
        if (!a) {
          a = {
            anchor: row.anchor as string,
            clicks: 0,
            sessions: new Set(),
            convertingSessions: new Set(),
            whatsappConversions: 0,
            cotacaoConversions: 0,
            pages: new Map(),
          };
          anchorConvMap.set(row.anchor as string, a);
        }
        a.clicks += 1;
        a.sessions.add(row.session_id as string);
        a.pages.set(pathname, (a.pages.get(pathname) ?? 0) + 1);

        const sc = convBySession.get(row.session_id as string);
        if (sc) {
          const clickTs = new Date(row.created_at as string).getTime();
          // conta apenas conversões POSTERIORES ao clique na âncora,
          // com janela de atribuição de 30 min para evitar sessões longas
          // acumulando conversões não relacionadas.
          const windowMs = 30 * 60 * 1000;
          let counted = false;
          for (const [etype, tss] of sc.byType) {
            for (const ts of tss) {
              if (ts >= clickTs && ts - clickTs <= windowMs) {
                if (etype === "whatsapp_click") a.whatsappConversions += 1;
                else if (etype === "cotacao_click") a.cotacaoConversions += 1;
                counted = true;
                break;
              }
            }
          }
          if (counted) a.convertingSessions.add(row.session_id as string);
        }
      }
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

    // 5b') Ranking de âncoras por CONVERSÃO (whatsapp + cotação), com
    //      janela de atribuição de 30 min por sessão. Ordenado por taxa
    //      de conversão descendente, com desempate por volume.
    const anchorConversions = Array.from(anchorConvMap.values())
      .map((a) => {
        const sessions = a.sessions.size;
        const convertingSessions = a.convertingSessions.size;
        const conversionRate = sessions > 0 ? convertingSessions / sessions : 0;
        let topPage: { pathname: string; clicks: number } | null = null;
        for (const [p, c] of a.pages) if (!topPage || c > topPage.clicks) topPage = { pathname: p, clicks: c };
        const viewEntry = viewsByAnchor.get(a.anchor);
        const views = viewEntry?.views ?? 0;
        const viewSessions = viewEntry?.sessions.size ?? 0;
        // Funil de leitura → clique: qual fração das sessões que
        // *chegaram* na seção também clicou em algum jump-link.
        const clickThroughRate = viewSessions > 0 ? sessions / viewSessions : null;
        return {
          anchor: a.anchor,
          clicks: a.clicks,
          sessions,
          convertingSessions,
          whatsappConversions: a.whatsappConversions,
          cotacaoConversions: a.cotacaoConversions,
          conversionRate,
          topPage,
          views,
          viewSessions,
          clickThroughRate,
        };
      })
      .sort((a, b) => {
        if (b.conversionRate !== a.conversionRate) return b.conversionRate - a.conversionRate;
        return b.convertingSessions - a.convertingSessions;
      });

    // 5b'') Ranking de âncoras por POTENCIAL SEO:
    //       cruza anchorsGlobal (impressões atribuídas + posição média GSC)
    //       com anchorConversions (sessões e conversões) para achar âncoras
    //       que já estão expostas a muita busca mas convertem/clicam pouco.
    //
    //   potentialScore = impressionsAttributed
    //                  * positionFactor(pos)  (favorece posição 11–30)
    //                  * inefficiencyFactor   (1 / (1 + convertingSessions + clicks/5))
    //
    // Assim, uma âncora com muitas impressões, posição fora do top-3 e
    // baixa conversão / poucos cliques internos sobe no ranking.
    const positionFactorAnchor = (pos: number | null) => {
      if (pos == null) return 0.4;
      if (pos >= 11 && pos <= 30) return 1.0;
      if (pos >= 4 && pos <= 10) return 0.55;
      if (pos > 30 && pos <= 60) return 0.35;
      if (pos >= 1 && pos <= 3) return 0.1;
      return 0.15;
    };
    const convByAnchor = new Map(anchorConversions.map((c) => [c.anchor, c]));
    const anchorPotential = Array.from(anchorMap.values())
      .map((a) => {
        const impressions = Math.round(a.impressionsSum);
        const position = a.positionImprWeight > 0
          ? a.positionWeightedSum / a.positionImprWeight
          : null;
        const conv = convByAnchor.get(a.anchor);
        const convertingSessions = conv?.convertingSessions ?? 0;
        const sessions = conv?.sessions ?? 0;
        const conversionRate = conv?.conversionRate ?? 0;
        const inefficiency = 1 / (1 + convertingSessions + a.clicks / 5);
        const posFactor = positionFactorAnchor(position);
        const score = Math.round(impressions * posFactor * inefficiency * 10) / 10;
        let topPage: { pathname: string; clicks: number } | null = null;
        for (const [p, c] of a.pages) if (!topPage || c > topPage.clicks) topPage = { pathname: p, clicks: c };

        const reasonParts: string[] = [];
        reasonParts.push(`${impressions} impressões atribuídas`);
        if (position != null) reasonParts.push(`posição média ${position.toFixed(1)}`);
        if (position != null && position >= 11 && position <= 30) reasonParts.push("zona de escalada (11–30)");
        if (convertingSessions === 0) reasonParts.push("nenhuma conversão");
        else reasonParts.push(`taxa ${(conversionRate * 100).toFixed(1)}%`);
        if (a.clicks <= 3) reasonParts.push(`só ${a.clicks} clique(s) internos`);

        return {
          anchor: a.anchor,
          score,
          clicks: a.clicks,
          sessions,
          convertingSessions,
          conversionRate,
          impressions,
          position,
          topPage,
          reason: reasonParts.join(" · "),
        };
      })
      // filtra ruído: só âncoras com sinal de busca real
      .filter((a) => a.impressions >= 20)
      .sort((a, b) => b.score - a.score)
      .slice(0, 25);

    // 5c) Recomendações automáticas de linkagem interna.
    //
    // Objetivo: para cada página com alto potencial no GSC (muitas
    // impressões e posição fora do top-3), sugerir:
    //   • um DESTINO (a própria página) que merece mais links internos;
    //   • um PLACEMENT recomendado (o que já converte melhor no site
    //     ou o topPlacement da própria página);
    //   • até 3 páginas SOURCE candidatas (páginas com muitos cliques
    //     GSC — têm autoridade interna para "empurrar" o destino).
    //
    // A pontuação favorece páginas com impressão alta, posição no
    // "no-man's-land" (11-30) e baixo volume atual de cliques internos.
    const globalPlacementScore = new Map<string, number>();
    for (const r of rows) {
      if (r.topPlacement && r.gsc) {
        globalPlacementScore.set(
          r.topPlacement.key,
          (globalPlacementScore.get(r.topPlacement.key) ?? 0) + r.gsc.clicks,
        );
      }
    }
    let bestGlobalPlacement: string | null = null;
    let bestGlobalPlacementScore = -1;
    for (const [k, v] of globalPlacementScore) {
      if (v > bestGlobalPlacementScore) { bestGlobalPlacement = k; bestGlobalPlacementScore = v; }
    }

    // Fontes candidatas: páginas com mais cliques GSC (autoridade real).
    const authorityPool = rows
      .filter((r) => r.gsc && r.gsc.clicks > 0)
      .sort((a, b) => (b.gsc!.clicks - a.gsc!.clicks))
      .slice(0, 30);

    const positionFactor = (pos: number) => {
      if (pos >= 11 && pos <= 30) return 1.0;
      if (pos >= 4 && pos <= 10) return 0.55;
      if (pos > 30 && pos <= 60) return 0.35;
      if (pos >= 1 && pos <= 3) return 0.1;
      return 0.15;
    };

    // Feedback do admin: pula destinos já marcados como accepted/applied
    // (a linkagem já foi feita) e como rejected (o admin descartou a ideia).
    // O status mais recente por destino é o que vale.
    const { data: feedbackRows } = await admin
      .from("internal_link_applications")
      .select("destination, status, applied_at")
      .in("status", ["accepted", "applied", "rejected"])
      .order("applied_at", { ascending: false })
      .limit(5000);
    const feedbackByDestination = new Map<string, string>();
    for (const row of feedbackRows ?? []) {
      if (!feedbackByDestination.has(row.destination)) {
        feedbackByDestination.set(row.destination, row.status);
      }
    }
    const suppressedDestinations = new Set(feedbackByDestination.keys());

    const recommendations = rows
      .filter((r) =>
        r.gsc &&
        r.gsc.impressions >= 30 &&
        r.gsc.position >= 4 &&
        r.gsc.position <= 60 &&
        !suppressedDestinations.has(r.pathname),
      )
      .map((r) => {
        const impr = r.gsc!.impressions;
        const pos = r.gsc!.position;
        const clicksNeed = 1 / (r.internalClicks + 1);
        const score = Math.round(impr * positionFactor(pos) * clicksNeed * 10) / 10;

        // Placement sugerido: o que já performa nessa página, senão o
        // global mais forte, senão smart-text como fallback seguro.
        const suggestedPlacement =
          r.topPlacement?.key ||
          bestGlobalPlacement ||
          "smart-text";

        // Sources: top autoridade excluindo a própria página.
        const suggestedSources = authorityPool
          .filter((s) => s.pathname !== r.pathname)
          .slice(0, 3)
          .map((s) => ({
            pathname: s.pathname,
            gscClicks: s.gsc!.clicks,
            gscImpressions: s.gsc!.impressions,
          }));

        const reasonParts: string[] = [];
        reasonParts.push(`${impr} impressões`);
        reasonParts.push(`posição ${pos.toFixed(1)}`);
        if (pos >= 11 && pos <= 30) reasonParts.push("dentro da zona de escalada (11–30)");
        if (r.internalClicks === 0) reasonParts.push("sem cliques internos");
        else reasonParts.push(`apenas ${r.internalClicks} clique(s) interno(s)`);

        return {
          destination: r.pathname,
          score,
          gsc: r.gsc,
          internalClicks: r.internalClicks,
          suggestedPlacement,
          suggestedSources,
          reason: reasonParts.join(" · "),
        };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 25);

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
        anchorConversions,
        anchorPotential,
        recommendations,
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