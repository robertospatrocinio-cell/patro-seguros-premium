import { useEffect, useMemo, useState } from "react";
import { RefreshCw, Download, Link2, TrendingUp, TrendingDown, Minus, ExternalLink, Sparkles, Copy, Check, CheckCircle2, X, XCircle, Zap } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import { supabase } from "@/integrations/supabase/client";
import { useAnchorPriorities } from "@/hooks/useAnchorPriorities";
import { ANCHOR_CLUSTERS, anchorClusterLabel, getAnchorCluster, type AnchorClusterId } from "@/lib/anchorClusters";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

type Row = {
  pathname: string;
  internalClicks: number;
  internalSessions: number;
  topSource: { key: string; count: number } | null;
  topPlacement: { key: string; count: number } | null;
  topAnchor: { key: string; count: number } | null;
  anchors: Array<{ anchor: string; clicks: number }>;
  gsc: {
    clicks: number;
    impressions: number;
    ctr: number;
    position: number;
    url: string;
  } | null;
};
type AnchorGlobal = {
  anchor: string;
  clicks: number;
  pages: number;
  topPage: { pathname: string; clicks: number } | null;
  gscImpressionsAttributed: number;
  gscAveragePosition: number | null;
};
type AnchorConversion = {
  anchor: string;
  clicks: number;
  sessions: number;
  convertingSessions: number;
  whatsappConversions: number;
  cotacaoConversions: number;
  conversionRate: number;
  topPage: { pathname: string; clicks: number } | null;
  views?: number;
  viewSessions?: number;
  clickThroughRate?: number | null;
};
type AnchorPotential = {
  anchor: string;
  score: number;
  clicks: number;
  sessions: number;
  convertingSessions: number;
  conversionRate: number;
  impressions: number;
  position: number | null;
  topPage: { pathname: string; clicks: number } | null;
  reason: string;
};
type Recommendation = {
  destination: string;
  score: number;
  gsc: { clicks: number; impressions: number; ctr: number; position: number; url: string } | null;
  internalClicks: number;
  suggestedPlacement: string;
  suggestedSources: Array<{ pathname: string; gscClicks: number; gscImpressions: number }>;
  reason: string;
};
type Resp = {
  siteUrl: string;
  period: { startDate: string; endDate: string; days: number };
  totals: {
    internalClicksTotal: number;
    gscImpressionsTotal: number;
    gscClicksTotal: number;
    pagesWithInternalClicks: number;
    pagesWithGsc: number;
    overlap: number;
    correlationInternalClicksVsImpressions: number | null;
    correlationInternalClicksVsPosition: number | null;
  };
  rows: Row[];
  anchorsGlobal: AnchorGlobal[];
  anchorConversions?: AnchorConversion[];
  anchorPotential?: AnchorPotential[];
  recommendations?: Recommendation[];
};

const fmtInt = (n: number) => new Intl.NumberFormat("pt-BR").format(Math.round(n));
const fmtPct = (n: number | null | undefined, d = 2) =>
  n == null ? "—" : `${(n * 100).toFixed(d)}%`;
const fmtPos = (n: number | null | undefined) => (n == null ? "—" : n.toFixed(1));
const fmtCorr = (n: number | null) => (n == null ? "—" : n.toFixed(3));

type SortKey = "internalClicks" | "impressions" | "gscClicks" | "position" | "ctr";

export default function InternalLinkCorrelation() {
  const [days, setDays] = useState(28);
  const [placement, setPlacement] = useState("");
  const [source, setSource] = useState("");
  const [anchor, setAnchor] = useState("");
  const [filter, setFilter] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("internalClicks");
  const [onlyOverlap, setOnlyOverlap] = useState(true);
  const [data, setData] = useState<Resp | null>(null);
  const [loading, setLoading] = useState(false);
  const [applying, setApplying] = useState<string | null>(null);
  type FeedbackEntry = { id: string; status: string; applied_at: string };
  const [applied, setApplied] = useState<Record<string, FeedbackEntry>>({});
  const [refreshingPriorities, setRefreshingPriorities] = useState(false);
  const queryClient = useQueryClient();
  const { data: priorities } = useAnchorPriorities();
  const [clusterFilter, setClusterFilter] = useState<AnchorClusterId | "all">("all");
  const [convTypeFilter, setConvTypeFilter] = useState<"all" | "whatsapp" | "cotacao">("all");

  const refreshPriorities = async () => {
    setRefreshingPriorities(true);
    try {
      const { data: res, error } = await supabase.functions.invoke(
        "refresh-anchor-priorities",
        { body: { days } },
      );
      if (error) throw error;
      const upserted = (res as { upserted?: number })?.upserted ?? 0;
      await queryClient.invalidateQueries({ queryKey: ["anchor-priorities"] });
      toast.success("Prioridades recalculadas", {
        description: `${upserted} âncora(s) publicadas para "Próximas leituras".`,
      });
    } catch (e) {
      toast.error("Falha ao recalcular prioridades", { description: (e as Error).message });
    } finally {
      setRefreshingPriorities(false);
    }
  };

  const applyKey = (destination: string, placement: string, sources: string[]) =>
    `${destination}|${placement}|${sources.slice().sort().join(",")}`;

  const loadApplied = async () => {
    const { data: rows, error } = await supabase
      .from("internal_link_applications")
      .select("id, destination, placement, sources, status, applied_at")
      .order("applied_at", { ascending: false })
      .limit(2000);
    if (error) return;
    const map: Record<string, FeedbackEntry> = {};
    for (const r of rows ?? []) {
      const key = applyKey(r.destination, r.placement, r.sources ?? []);
      if (!map[key]) {
        map[key] = { id: r.id, status: r.status ?? "planned", applied_at: r.applied_at };
      }
    }
    setApplied(map);
  };

  const setFeedback = async (
    rec: Recommendation,
    status: "accepted" | "rejected",
  ) => {
    const sources = rec.suggestedSources.map((s) => s.pathname);
    const key = applyKey(rec.destination, rec.suggestedPlacement, sources);
    setApplying(key);
    try {
      const { data: res, error } = await supabase.functions.invoke(
        "apply-internal-link-recommendation",
        {
          body: {
            destination: rec.destination,
            placement: rec.suggestedPlacement,
            sources,
            score: rec.score,
            reason: rec.reason,
            periodDays: days,
            status,
          },
        },
      );
      if (error) throw error;
      const app = (res as { application?: FeedbackEntry })?.application;
      if (app) {
        setApplied((prev) => ({
          ...prev,
          [key]: { id: app.id, status: app.status ?? status, applied_at: app.applied_at },
        }));
      }
      toast.success(
        status === "accepted" ? "Recomendação aceita" : "Recomendação rejeitada",
        { description: `${rec.destination} · ${rec.suggestedPlacement}` },
      );
    } catch (e) {
      toast.error("Falha ao salvar feedback", { description: (e as Error).message });
    } finally {
      setApplying(null);
    }
  };

  const load = async () => {
    setLoading(true);
    try {
      const { data: res, error } = await supabase.functions.invoke("internal-link-correlation", {
        body: {
          days,
          placement: placement || undefined,
          source: source || undefined,
          anchor: anchor || undefined,
          limit: 1000,
        },
      });
      if (error) throw error;
      setData(res as Resp);
      await loadApplied();
    } catch (e) {
      toast.error("Falha ao carregar correlação de links internos", {
        description: (e as Error).message,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); /* eslint-disable-next-line */ }, []);

  const rows = useMemo(() => {
    if (!data) return [];
    let list = data.rows.slice();
    if (onlyOverlap) list = list.filter((r) => r.internalClicks > 0 && r.gsc);
    if (filter) {
      const f = filter.toLowerCase();
      list = list.filter((r) => r.pathname.toLowerCase().includes(f));
    }
    list.sort((x, y) => {
      const gv = (r: Row): number => {
        switch (sortKey) {
          case "internalClicks": return r.internalClicks;
          case "impressions": return r.gsc?.impressions ?? 0;
          case "gscClicks": return r.gsc?.clicks ?? 0;
          case "position": return -(r.gsc?.position ?? 999);
          case "ctr": return r.gsc?.ctr ?? 0;
        }
      };
      return gv(y) - gv(x);
    });
    return list;
  }, [data, filter, onlyOverlap, sortKey]);

  const exportCsv = () => {
    if (!data) return;
    const header = [
      "pathname",
      "internal_clicks", "internal_sessions",
      "top_source", "top_placement",
      "gsc_clicks", "gsc_impressions", "gsc_ctr", "gsc_position",
    ];
    const lines = [header.join(",")];
    for (const r of rows) {
      lines.push([
        JSON.stringify(r.pathname),
        r.internalClicks, r.internalSessions,
        JSON.stringify(r.topSource?.key ?? ""), JSON.stringify(r.topPlacement?.key ?? ""),
        r.gsc?.clicks ?? "", r.gsc?.impressions ?? "",
        r.gsc?.ctr != null ? (r.gsc.ctr * 100).toFixed(3) : "",
        r.gsc?.position?.toFixed(2) ?? "",
      ].join(","));
    }
    const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `links-internos-vs-gsc-${data.period.startDate}_to_${data.period.endDate}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const CorrBadge = ({ n }: { n: number | null }) => {
    if (n == null) return <Badge variant="outline">n/a</Badge>;
    const abs = Math.abs(n);
    const color = abs >= 0.6 ? "default" : abs >= 0.3 ? "secondary" : "outline";
    const Icon = n > 0.1 ? TrendingUp : n < -0.1 ? TrendingDown : Minus;
    return (
      <Badge variant={color as "default" | "secondary" | "outline"} className="gap-1">
        <Icon className="w-3 h-3" />
        {n.toFixed(2)}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title="Links Internos × GSC — Correlação (Admin)"
        description="Cliques em links internos rastreados vs impressões e posições do Google Search Console"
        noindex
      />
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
              <Link2 className="w-6 h-6" /> Links Internos × Search Console
            </h1>
            <p className="text-sm text-muted-foreground">
              Cliques em links internos capturados via <code>trackInternalLinkClick</code> agregados
              por página destino, correlacionados com impressões e posição média no GSC.
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Select value={String(days)} onValueChange={(v) => setDays(Number(v))}>
              <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="7">7 dias</SelectItem>
                <SelectItem value="14">14 dias</SelectItem>
                <SelectItem value="28">28 dias</SelectItem>
                <SelectItem value="60">60 dias</SelectItem>
                <SelectItem value="90">90 dias</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder="Placement…"
              value={placement}
              onChange={(e) => setPlacement(e.target.value)}
              className="w-36"
            />
            <Input
              placeholder="Source…"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="w-36"
            />
            <Input
              placeholder="Anchor…"
              value={anchor}
              onChange={(e) => setAnchor(e.target.value)}
              className="w-36"
            />
            <Button onClick={load} disabled={loading} size="sm">
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
              Atualizar
            </Button>
            <Button variant="outline" size="sm" onClick={exportCsv} disabled={!data}>
              <Download className="w-4 h-4 mr-2" /> CSV
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={refreshPriorities}
              disabled={refreshingPriorities}
              title="Recalcula anchor_priorities e reordena 'Próximas leituras' no site público"
            >
              <Zap className={`w-4 h-4 mr-2 ${refreshingPriorities ? "animate-pulse" : ""}`} />
              Recalcular prioridades
            </Button>
          </div>
        </div>

        {data && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <Kpi title="Cliques internos" value={data.totals.internalClicksTotal} />
              <Kpi title="Impressões GSC" value={data.totals.gscImpressionsTotal} />
              <Kpi title="Páginas com overlap" value={data.totals.overlap} />
              <Kpi title="Páginas com GSC" value={data.totals.pagesWithGsc} />
            </div>

            <Card className="mb-6">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Coeficiente de correlação (Pearson)</CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-6 text-sm">
                <div className="flex items-center justify-between border rounded-lg p-3">
                  <span>Cliques internos × Impressões GSC</span>
                  <CorrBadge n={data.totals.correlationInternalClicksVsImpressions} />
                </div>
                <div className="flex items-center justify-between border rounded-lg p-3">
                  <span>Cliques internos × Posição média (invertida)</span>
                  <CorrBadge n={
                    data.totals.correlationInternalClicksVsPosition == null
                      ? null
                      : -data.totals.correlationInternalClicksVsPosition
                  } />
                </div>
                <p className="text-xs text-muted-foreground md:col-span-2">
                  |r| ≥ 0,6 forte · 0,3–0,6 moderada · &lt; 0,3 fraca. Amostra: {data.totals.overlap} páginas
                  com cliques internos e presença no GSC no período de {data.period.days} dias.
                </p>
              </CardContent>
            </Card>

            <p className="text-xs text-muted-foreground mb-4">
              Período: {data.period.startDate} → {data.period.endDate} · Propriedade: {data.siteUrl}
            </p>

            {data.recommendations && data.recommendations.length > 0 && (
              <Card className="mb-6 border-primary/40 bg-primary/[0.02]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    Recomendações automáticas de links internos ({data.recommendations.length})
                  </CardTitle>
                  <p className="text-xs text-muted-foreground">
                    Páginas com alta impressão no GSC, posição fora do top-3 e pouca linkagem interna atual.
                    Cada card sugere um <strong>destino</strong>, um <strong>placement</strong> e até 3
                    <strong> páginas source</strong> com autoridade (cliques GSC) para empurrar o destino.
                    Score = impressões × fator de posição ÷ (cliques internos + 1).
                  </p>
                </CardHeader>
                <CardContent className="space-y-3">
                  {data.recommendations.slice(0, 12).map((rec) => {
                    const sourcesList = rec.suggestedSources.map((s) => s.pathname);
                    const key = applyKey(rec.destination, rec.suggestedPlacement, sourcesList);
                    const isApplying = applying === key;
                    return (
                    <div
                      key={rec.destination}
                      className="rounded-lg border border-border bg-background p-3"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <a
                              href={rec.destination}
                              target="_blank"
                              rel="noreferrer"
                              className="font-mono text-sm text-primary hover:underline truncate max-w-[420px]"
                              title={rec.destination}
                            >
                              {rec.destination}
                            </a>
                            <ExternalLink className="h-3 w-3 text-muted-foreground" />
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{rec.reason}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <Badge variant="secondary" className="tabular-nums">
                            score {fmtInt(rec.score)}
                          </Badge>
                          <Badge variant="outline" className="tabular-nums text-[10px]">
                            pos {rec.gsc ? rec.gsc.position.toFixed(1) : "—"}
                          </Badge>
                          {(() => {
                            const fb = applied[key];
                            const status = fb?.status;
                            const isAccepted = status === "accepted" || status === "applied";
                            const isRejected = status === "rejected";
                            const stamp = fb
                              ? `Salvo em ${new Date(fb.applied_at).toLocaleString("pt-BR")}`
                              : "";
                            return (
                              <div className="flex items-center gap-1">
                                <Button
                                  size="sm"
                                  variant={isAccepted ? "default" : "outline"}
                                  disabled={isApplying}
                                  onClick={() => setFeedback(rec, "accepted")}
                                  className="h-7 px-2 text-xs gap-1"
                                  title={isAccepted ? `Aceita · ${stamp}` : "Marcar como aceita"}
                                >
                                  {isApplying ? (
                                    <RefreshCw className="h-3 w-3 animate-spin" />
                                  ) : isAccepted ? (
                                    <CheckCircle2 className="h-3 w-3" />
                                  ) : (
                                    <Check className="h-3 w-3" />
                                  )}
                                  Aceitar
                                </Button>
                                <Button
                                  size="sm"
                                  variant={isRejected ? "destructive" : "outline"}
                                  disabled={isApplying}
                                  onClick={() => setFeedback(rec, "rejected")}
                                  className="h-7 px-2 text-xs gap-1"
                                  title={isRejected ? `Rejeitada · ${stamp}` : "Marcar como rejeitada"}
                                >
                                  {isRejected ? (
                                    <XCircle className="h-3 w-3" />
                                  ) : (
                                    <X className="h-3 w-3" />
                                  )}
                                  Rejeitar
                                </Button>
                              </div>
                            );
                          })()}
                        </div>
                      </div>

                      <div className="grid gap-2 md:grid-cols-[auto,1fr] text-xs">
                        <div className="flex items-center gap-1.5 text-muted-foreground md:pr-3 md:border-r md:border-border">
                          <span>Placement:</span>
                          <Badge variant="outline" className="text-[11px]">
                            {rec.suggestedPlacement}
                          </Badge>
                        </div>
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="text-muted-foreground">Sources sugeridas:</span>
                            {rec.suggestedSources.length === 0 && (
                              <span className="text-muted-foreground italic">
                                nenhuma página com cliques GSC no período
                              </span>
                            )}
                            {rec.suggestedSources.map((s) => (
                              <button
                                key={s.pathname}
                                type="button"
                                onClick={() => {
                                  navigator.clipboard?.writeText(
                                    `${s.pathname} → ${rec.destination} [${rec.suggestedPlacement}]`,
                                  );
                                  toast.success("Sugestão copiada");
                                }}
                                className="inline-flex items-center gap-1 rounded-full border border-border px-2 py-0.5 hover:border-primary hover:text-primary"
                                title={`${s.gscClicks} cliques GSC · ${s.gscImpressions} impressões · clique para copiar`}
                              >
                                <Copy className="h-3 w-3" />
                                <code className="text-[11px]">{s.pathname}</code>
                                <span className="text-muted-foreground">({s.gscClicks})</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    );
                  })}
                  {data.recommendations.length > 12 && (
                    <p className="text-xs text-muted-foreground text-center pt-1">
                      +{data.recommendations.length - 12} recomendações adicionais ocultas
                    </p>
                  )}
                </CardContent>
              </Card>
            )}

            {data.anchorPotential && data.anchorPotential.length > 0 && (
              <Card className="mb-6 border-amber-500/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-amber-600" />
                    Âncoras com maior potencial ({data.anchorPotential.length})
                  </CardTitle>
                  <p className="text-xs text-muted-foreground">
                    Âncoras expostas a muitas impressões no Search Console mas com
                    baixa eficiência (poucas conversões e/ou poucos cliques internos).
                    Score = impressões × fator de posição (favorece 11–30) × fator de
                    ineficiência. Priorize essas âncoras na trilha recomendada, teste
                    novos rótulos e reforce links internos até elas.
                  </p>
                </CardHeader>
                <CardContent className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="min-w-[180px]">Âncora</TableHead>
                        <TableHead className="text-right">Score</TableHead>
                        <TableHead className="text-right">Impressões</TableHead>
                        <TableHead className="text-right">Posição</TableHead>
                        <TableHead className="text-right">Cliques</TableHead>
                        <TableHead className="text-right">Conv.</TableHead>
                        <TableHead className="text-right">Taxa</TableHead>
                        <TableHead>Página top</TableHead>
                        <TableHead>Motivo</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data.anchorPotential.slice(0, 25).map((a) => (
                        <TableRow
                          key={a.anchor}
                          className="cursor-pointer"
                          onClick={() => { setAnchor(a.anchor); load(); }}
                        >
                          <TableCell><code className="text-xs">#{a.anchor}</code></TableCell>
                          <TableCell className="text-right tabular-nums">
                            <Badge variant="default">{fmtInt(a.score)}</Badge>
                          </TableCell>
                          <TableCell className="text-right tabular-nums">{fmtInt(a.impressions)}</TableCell>
                          <TableCell className="text-right tabular-nums">{fmtPos(a.position)}</TableCell>
                          <TableCell className="text-right tabular-nums">{fmtInt(a.clicks)}</TableCell>
                          <TableCell className="text-right tabular-nums">{fmtInt(a.convertingSessions)}</TableCell>
                          <TableCell className="text-right tabular-nums">{fmtPct(a.conversionRate, 1)}</TableCell>
                          <TableCell className="text-xs">
                            {a.topPage ? (
                              <span>{a.topPage.pathname} <span className="text-muted-foreground">({a.topPage.clicks})</span></span>
                            ) : <span className="text-muted-foreground">—</span>}
                          </TableCell>
                          <TableCell className="text-[11px] text-muted-foreground max-w-[280px]">
                            {a.reason}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <p className="text-[11px] text-muted-foreground mt-2">
                    Filtro: âncoras com ≥ 20 impressões atribuídas no período.
                  </p>
                </CardContent>
              </Card>
            )}

            {priorities && Object.keys(priorities).length > 0 && (() => {
              const rows = Object.values(priorities)
                .map((r) => ({
                  ...r,
                  weight:
                    (Number(r.score) || 0) *
                    (1 + Math.max(0, Math.min(1, Number(r.conversion_rate) || 0)) * 10),
                }))
                .sort((a, b) => b.weight - a.weight)
                .slice(0, 25);
              const latest = rows.reduce(
                (acc, r) => (new Date(r.updated_at) > new Date(acc) ? r.updated_at : acc),
                rows[0].updated_at,
              );
              return (
                <Card className="mb-6 border-primary/40 bg-primary/[0.02]">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Zap className="h-4 w-4 text-primary" />
                      Prioridades ativas em "Próximas leituras" ({Object.keys(priorities).length})
                    </CardTitle>
                    <p className="text-xs text-muted-foreground">
                      Snapshot publicado em <code>anchor_priorities</code> — o front usa
                      essa tabela para <strong>reordenar automaticamente</strong> os itens
                      do bloco "Próximas leituras" nas long-tails. Peso final ={" "}
                      <code>score × (1 + taxa × 10)</code>: potencial SEO amplificado pela
                      conversão real medida. Atualizado em{" "}
                      {new Date(latest).toLocaleString("pt-BR")}.
                    </p>
                  </CardHeader>
                  <CardContent className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-12 text-right">#</TableHead>
                          <TableHead className="min-w-[180px]">Âncora</TableHead>
                          <TableHead className="text-right">Peso final</TableHead>
                          <TableHead className="text-right">Score SEO</TableHead>
                          <TableHead className="text-right">Taxa conv.</TableHead>
                          <TableHead className="text-right">Sessões</TableHead>
                          <TableHead className="text-right">Conv.</TableHead>
                          <TableHead className="text-right">Impr.</TableHead>
                          <TableHead className="text-right">Pos.</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {rows.map((r, i) => (
                          <TableRow
                            key={r.anchor}
                            className="cursor-pointer"
                            onClick={() => { setAnchor(r.anchor); load(); }}
                          >
                            <TableCell className="text-right tabular-nums text-muted-foreground">
                              {i + 1}
                            </TableCell>
                            <TableCell><code className="text-xs">#{r.anchor}</code></TableCell>
                            <TableCell className="text-right tabular-nums">
                              <Badge variant="default">{fmtInt(r.weight)}</Badge>
                            </TableCell>
                            <TableCell className="text-right tabular-nums">{fmtInt(r.score)}</TableCell>
                            <TableCell className="text-right tabular-nums">
                              {fmtPct(r.conversion_rate, 1)}
                            </TableCell>
                            <TableCell className="text-right tabular-nums">{fmtInt(r.sessions)}</TableCell>
                            <TableCell className="text-right tabular-nums">
                              {fmtInt(r.converting_sessions)}
                            </TableCell>
                            <TableCell className="text-right tabular-nums">{fmtInt(r.impressions)}</TableCell>
                            <TableCell className="text-right tabular-nums">{fmtPos(r.position)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <p className="text-[11px] text-muted-foreground mt-2">
                      Clique em "Recalcular prioridades" para gerar um novo snapshot com
                      a janela atual ({days} dias).
                    </p>
                  </CardContent>
                </Card>
              );
            })()}

            {data.anchorConversions && data.anchorConversions.length > 0 && (
              <Card className="mb-6 border-primary/40">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    Âncoras por conversão ({data.anchorConversions.length})
                  </CardTitle>
                  <p className="text-xs text-muted-foreground">
                    Atribuição por <code>session_id</code>: uma âncora é creditada
                    quando o mesmo visitante dispara <code>whatsapp_click</code> ou{" "}
                    <code>cotacao_click</code> em até 30 min após clicar nela.
                    Ordenado por taxa de conversão; use para priorizar âncoras
                    na trilha recomendada e cortar as que só geram cliques sem conversão.
                  </p>
                </CardHeader>
                <CardContent className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="min-w-[180px]">Âncora</TableHead>
                        <TableHead className="text-right">Leituras</TableHead>
                        <TableHead className="text-right">Cliques</TableHead>
                        <TableHead className="text-right">Sessões</TableHead>
                        <TableHead className="text-right">Leitura→Clique</TableHead>
                        <TableHead className="text-right">Sessões c/ conv.</TableHead>
                        <TableHead className="text-right">WhatsApp</TableHead>
                        <TableHead className="text-right">Cotação</TableHead>
                        <TableHead className="text-right">Taxa</TableHead>
                        <TableHead>Página top</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data.anchorConversions
                        .filter((a) => a.sessions >= 3)
                        .slice(0, 40)
                        .map((a) => (
                          <TableRow
                            key={a.anchor}
                            className="cursor-pointer"
                            onClick={() => { setAnchor(a.anchor); load(); }}
                          >
                            <TableCell><code className="text-xs">#{a.anchor}</code></TableCell>
                            <TableCell className="text-right tabular-nums">
                              {a.views != null && a.views > 0 ? (
                                <span title={`${a.viewSessions ?? 0} sessões distintas`}>
                                  {fmtInt(a.views)}
                                </span>
                              ) : <span className="text-muted-foreground">—</span>}
                            </TableCell>
                            <TableCell className="text-right tabular-nums">{fmtInt(a.clicks)}</TableCell>
                            <TableCell className="text-right tabular-nums">{fmtInt(a.sessions)}</TableCell>
                            <TableCell className="text-right tabular-nums">
                              {a.clickThroughRate == null
                                ? <span className="text-muted-foreground">—</span>
                                : <Badge variant={a.clickThroughRate >= 0.2 ? "default" : "secondary"}>
                                    {fmtPct(a.clickThroughRate, 1)}
                                  </Badge>}
                            </TableCell>
                            <TableCell className="text-right tabular-nums">{fmtInt(a.convertingSessions)}</TableCell>
                            <TableCell className="text-right tabular-nums">{fmtInt(a.whatsappConversions)}</TableCell>
                            <TableCell className="text-right tabular-nums">{fmtInt(a.cotacaoConversions)}</TableCell>
                            <TableCell className="text-right tabular-nums">
                              <Badge variant={a.conversionRate >= 0.05 ? "default" : "secondary"}>
                                {fmtPct(a.conversionRate, 1)}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-xs">
                              {a.topPage ? (
                                <span>{a.topPage.pathname} <span className="text-muted-foreground">({a.topPage.clicks})</span></span>
                              ) : <span className="text-muted-foreground">—</span>}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                  <p className="text-[11px] text-muted-foreground mt-2">
                    Exibe apenas âncoras com ≥ 3 sessões no período para evitar viés de amostra pequena.
                    <br />
                    <strong>Leituras</strong>: <code>section_view</code> disparado pelo IntersectionObserver quando o usuário chega na seção (≥25% visível). <strong>Leitura→Clique</strong>: fração das sessões que, após ler a seção, clicaram em algum jump-link.
                  </p>
                </CardContent>
              </Card>
            )}

            {data.anchorsGlobal && data.anchorsGlobal.length > 0 && (
              <Card className="mb-6">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">
                    Drilldown por âncora ({data.anchorsGlobal.length})
                  </CardTitle>
                  <p className="text-xs text-muted-foreground">
                    Cliques agregados por âncora (jump link / hash), com impressões
                    do GSC atribuídas proporcionalmente à página onde a âncora foi clicada.
                    Clique numa linha para filtrar a tabela abaixo por essa âncora.
                  </p>
                </CardHeader>
                <CardContent className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="min-w-[180px]">Âncora</TableHead>
                        <TableHead className="text-right">Cliques</TableHead>
                        <TableHead className="text-right">Páginas</TableHead>
                        <TableHead>Página top</TableHead>
                        <TableHead className="text-right">Impressões atribuídas</TableHead>
                        <TableHead className="text-right">Posição média</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data.anchorsGlobal.slice(0, 40).map((a) => (
                        <TableRow
                          key={a.anchor}
                          className="cursor-pointer"
                          onClick={() => { setAnchor(a.anchor); load(); }}
                        >
                          <TableCell>
                            <code className="text-xs">#{a.anchor}</code>
                          </TableCell>
                          <TableCell className="text-right tabular-nums">{fmtInt(a.clicks)}</TableCell>
                          <TableCell className="text-right tabular-nums">{fmtInt(a.pages)}</TableCell>
                          <TableCell className="text-xs">
                            {a.topPage ? (
                              <span>{a.topPage.pathname} <span className="text-muted-foreground">({a.topPage.clicks})</span></span>
                            ) : <span className="text-muted-foreground">—</span>}
                          </TableCell>
                          <TableCell className="text-right tabular-nums">{fmtInt(a.gscImpressionsAttributed)}</TableCell>
                          <TableCell className="text-right tabular-nums">{fmtPos(a.gscAveragePosition)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader className="flex flex-row items-center justify-between gap-4 flex-wrap">
                <CardTitle className="text-base">Páginas ({rows.length})</CardTitle>
                <div className="flex items-center gap-2">
                  <Input placeholder="Filtrar URL…" value={filter} onChange={(e) => setFilter(e.target.value)} className="w-52" />
                  <Button variant={onlyOverlap ? "default" : "outline"} size="sm" onClick={() => setOnlyOverlap((v) => !v)}>
                    Só overlap
                  </Button>
                  <Select value={sortKey} onValueChange={(v) => setSortKey(v as SortKey)}>
                    <SelectTrigger className="w-52"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="internalClicks">Cliques internos</SelectItem>
                      <SelectItem value="impressions">Impressões GSC</SelectItem>
                      <SelectItem value="gscClicks">Cliques GSC</SelectItem>
                      <SelectItem value="ctr">CTR GSC</SelectItem>
                      <SelectItem value="position">Posição GSC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[260px]">Página destino</TableHead>
                      <TableHead className="text-right">Cliques internos</TableHead>
                      <TableHead className="text-right">Sessões</TableHead>
                      <TableHead>Origem/Placement top</TableHead>
                      <TableHead>Âncoras (top)</TableHead>
                      <TableHead className="text-right">Impressões GSC</TableHead>
                      <TableHead className="text-right">Cliques GSC</TableHead>
                      <TableHead className="text-right">CTR</TableHead>
                      <TableHead className="text-right">Posição</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rows.slice(0, 300).map((r) => (
                      <TableRow key={r.pathname}>
                        <TableCell className="font-medium">
                          <a
                            href={r.pathname}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 hover:text-primary"
                          >
                            {r.pathname}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </TableCell>
                        <TableCell className="text-right tabular-nums">{fmtInt(r.internalClicks)}</TableCell>
                        <TableCell className="text-right tabular-nums">{fmtInt(r.internalSessions)}</TableCell>
                        <TableCell className="text-xs">
                          {r.topSource ? (
                            <div>
                              <span className="text-muted-foreground">source:</span> {r.topSource.key} ({r.topSource.count})
                            </div>
                          ) : <span className="text-muted-foreground">—</span>}
                          {r.topPlacement && (
                            <div>
                              <span className="text-muted-foreground">placement:</span> {r.topPlacement.key} ({r.topPlacement.count})
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="text-xs">
                          {r.anchors && r.anchors.length > 0 ? (
                            <div className="flex flex-wrap gap-1 max-w-[220px]">
                              {r.anchors.slice(0, 4).map((a) => (
                                <button
                                  key={a.anchor}
                                  type="button"
                                  onClick={() => { setAnchor(a.anchor); load(); }}
                                  className="inline-flex items-center gap-1 rounded-full border border-border px-2 py-0.5 text-[11px] hover:border-primary hover:text-primary"
                                  title={`Filtrar por âncora #${a.anchor}`}
                                >
                                  <code>#{a.anchor}</code>
                                  <span className="text-muted-foreground">{a.clicks}</span>
                                </button>
                              ))}
                            </div>
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right tabular-nums">{r.gsc ? fmtInt(r.gsc.impressions) : "—"}</TableCell>
                        <TableCell className="text-right tabular-nums">{r.gsc ? fmtInt(r.gsc.clicks) : "—"}</TableCell>
                        <TableCell className="text-right tabular-nums">{r.gsc ? fmtPct(r.gsc.ctr) : "—"}</TableCell>
                        <TableCell className="text-right tabular-nums">{r.gsc ? fmtPos(r.gsc.position) : "—"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {rows.length > 300 && (
                  <p className="text-xs text-muted-foreground mt-2">Mostrando 300 de {rows.length}. Use o filtro ou exporte o CSV.</p>
                )}
              </CardContent>
            </Card>
          </>
        )}

        {!data && !loading && (
          <p className="text-sm text-muted-foreground">Sem dados. Clique em Atualizar.</p>
        )}

        <p className="text-xs text-muted-foreground mt-6">
          Coef. de correlação: {fmtCorr(data?.totals.correlationInternalClicksVsImpressions ?? null)} (impressões) ·
          {" "}{fmtCorr(data?.totals.correlationInternalClicksVsPosition ?? null)} (posição — quanto mais negativo, melhor).
        </p>
      </main>
      <Footer />
    </div>
  );
}

function Kpi({ title, value }: { title: string; value: number }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold tabular-nums">{fmtInt(value)}</div>
      </CardContent>
    </Card>
  );
}