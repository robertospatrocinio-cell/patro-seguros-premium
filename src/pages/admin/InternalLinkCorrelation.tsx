import { useEffect, useMemo, useState } from "react";
import { RefreshCw, Download, Link2, TrendingUp, TrendingDown, Minus, ExternalLink } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import { supabase } from "@/integrations/supabase/client";
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