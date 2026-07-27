import { useEffect, useMemo, useState } from "react";
import { RefreshCw, TrendingUp, TrendingDown, Minus, Sparkles, XCircle, Download, Target } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

type Metrics = { clicks: number; impressions: number; ctr: number; position: number };
type Row = {
  query: string;
  a?: Metrics;
  b?: Metrics;
  deltas: { clicks: number; impressions: number; ctr: number | null; position: number | null };
  inTop10A: boolean;
  inTop10B: boolean;
  trend: "up" | "down" | "new" | "lost" | "flat";
};
type Resp = {
  siteUrl: string;
  periodA: { startDate: string; endDate: string; days: number };
  periodB: { startDate: string; endDate: string; days: number };
  totals: {
    a: { clicks: number; impressions: number; ctr: number; queries: number };
    b: { clicks: number; impressions: number; ctr: number; queries: number };
    top10: { a: number; b: number; delta: number };
    clicksDelta: number;
    impressionsDelta: number;
    ctrDelta: number;
  };
  rows: Row[];
};

const fmtInt = (n: number) => new Intl.NumberFormat("pt-BR").format(Math.round(n));
const fmtPct = (n: number | null | undefined, d = 2) =>
  n == null ? "—" : `${(n * 100).toFixed(d)}%`;
const fmtPos = (n: number | null | undefined) => (n == null ? "—" : n.toFixed(1));
const fmtDelta = (n: number, kind: "int" | "pct" | "pos" = "int") => {
  if (!Number.isFinite(n)) return "—";
  const s = n > 0 ? "+" : "";
  if (kind === "int") return `${s}${fmtInt(n)}`;
  if (kind === "pct") return `${s}${(n * 100).toFixed(2)}pp`;
  return `${s}${n.toFixed(1)}`;
};

type SortKey = "impressions" | "clicks" | "ctr" | "position" | "positionDelta" | "impressionsDelta";

export default function GscKeywordPerformance() {
  const [days, setDays] = useState(30);
  const [device, setDevice] = useState<"ALL" | "MOBILE" | "DESKTOP" | "TABLET">("ALL");
  const [pageContains, setPageContains] = useState("");
  const [filter, setFilter] = useState("");
  const [onlyTop10, setOnlyTop10] = useState(false);
  const [sortKey, setSortKey] = useState<SortKey>("impressions");
  const [data, setData] = useState<Resp | null>(null);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const { data: res, error } = await supabase.functions.invoke("gsc-keyword-performance", {
        body: { days, device, pageContains: pageContains || undefined, limit: 500 },
      });
      if (error) throw error;
      setData(res as Resp);
    } catch (e) {
      toast.error("Falha ao carregar dados do GSC", { description: (e as Error).message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); /* eslint-disable-next-line */ }, []);

  const rows = useMemo(() => {
    if (!data) return [];
    let list = data.rows.slice();
    if (filter) {
      const f = filter.toLowerCase();
      list = list.filter((r) => r.query.toLowerCase().includes(f));
    }
    if (onlyTop10) list = list.filter((r) => r.inTop10A || r.inTop10B);
    list.sort((x, y) => {
      const gv = (r: Row): number => {
        switch (sortKey) {
          case "impressions": return r.a?.impressions ?? 0;
          case "clicks": return r.a?.clicks ?? 0;
          case "ctr": return r.a?.ctr ?? 0;
          case "position": return -(r.a?.position ?? 999); // menor é melhor
          case "positionDelta": return -(r.deltas.position ?? 0); // subiu = mais alto
          case "impressionsDelta": return r.deltas.impressions;
        }
      };
      return gv(y) - gv(x);
    });
    return list;
  }, [data, filter, onlyTop10, sortKey]);

  const exportCsv = () => {
    if (!data) return;
    const header = [
      "query",
      "clicks_A", "impressions_A", "ctr_A", "position_A", "top10_A",
      "clicks_B", "impressions_B", "ctr_B", "position_B", "top10_B",
      "clicks_delta", "impressions_delta", "ctr_delta_pp", "position_delta", "trend",
    ];
    const lines = [header.join(",")];
    for (const r of rows) {
      lines.push([
        JSON.stringify(r.query),
        r.a?.clicks ?? "", r.a?.impressions ?? "", r.a?.ctr ?? "", r.a?.position ?? "", r.inTop10A ? 1 : 0,
        r.b?.clicks ?? "", r.b?.impressions ?? "", r.b?.ctr ?? "", r.b?.position ?? "", r.inTop10B ? 1 : 0,
        r.deltas.clicks, r.deltas.impressions,
        r.deltas.ctr != null ? (r.deltas.ctr * 100).toFixed(3) : "",
        r.deltas.position != null ? r.deltas.position.toFixed(2) : "",
        r.trend,
      ].join(","));
    }
    const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `gsc-keywords-A-vs-B-${data.periodA.startDate}_to_${data.periodA.endDate}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const TrendIcon = ({ t }: { t: Row["trend"] }) => {
    if (t === "up") return <TrendingUp className="w-4 h-4 text-green-600" />;
    if (t === "down") return <TrendingDown className="w-4 h-4 text-red-600" />;
    if (t === "new") return <Sparkles className="w-4 h-4 text-blue-600" />;
    if (t === "lost") return <XCircle className="w-4 h-4 text-orange-600" />;
    return <Minus className="w-4 h-4 text-muted-foreground" />;
  };

  return (
    <div className="min-h-screen bg-background">
      <PageMeta title="Performance por Keyword — A vs B (Admin)" description="Comparativo GSC por keyword em 30 dias" noindex />
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
              <Target className="w-6 h-6" /> Performance por Keyword — A vs B
            </h1>
            <p className="text-sm text-muted-foreground">
              Compara os últimos {days} dias (A) com o período anterior de {days} dias (B) via Google Search Console.
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Select value={String(days)} onValueChange={(v) => setDays(Number(v))}>
              <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="7">7 dias</SelectItem>
                <SelectItem value="14">14 dias</SelectItem>
                <SelectItem value="30">30 dias</SelectItem>
                <SelectItem value="60">60 dias</SelectItem>
                <SelectItem value="90">90 dias</SelectItem>
              </SelectContent>
            </Select>
            <Select value={device} onValueChange={(v) => setDevice(v as typeof device)}>
              <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">Todos</SelectItem>
                <SelectItem value="MOBILE">Mobile</SelectItem>
                <SelectItem value="DESKTOP">Desktop</SelectItem>
                <SelectItem value="TABLET">Tablet</SelectItem>
              </SelectContent>
            </Select>
            <Input placeholder="URL contém…" value={pageContains} onChange={(e) => setPageContains(e.target.value)} className="w-40" />
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
              <Kpi title="Keywords no Top 10" value={data.totals.top10.a} delta={data.totals.top10.delta} />
              <Kpi title="Cliques (A)" value={data.totals.a.clicks} delta={data.totals.clicksDelta} />
              <Kpi title="Impressões (A)" value={data.totals.a.impressions} delta={data.totals.impressionsDelta} />
              <Kpi title="CTR (A)" value={data.totals.a.ctr} delta={data.totals.ctrDelta} kind="pct" />
            </div>
            <p className="text-xs text-muted-foreground mb-4">
              A: {data.periodA.startDate} → {data.periodA.endDate} · B: {data.periodB.startDate} → {data.periodB.endDate} · Propriedade: {data.siteUrl}
            </p>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between gap-4 flex-wrap">
                <CardTitle className="text-base">Keywords ({rows.length})</CardTitle>
                <div className="flex items-center gap-2">
                  <Input placeholder="Filtrar keyword…" value={filter} onChange={(e) => setFilter(e.target.value)} className="w-52" />
                  <Button variant={onlyTop10 ? "default" : "outline"} size="sm" onClick={() => setOnlyTop10((v) => !v)}>
                    Só Top 10
                  </Button>
                  <Select value={sortKey} onValueChange={(v) => setSortKey(v as SortKey)}>
                    <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="impressions">Impressões (A)</SelectItem>
                      <SelectItem value="clicks">Cliques (A)</SelectItem>
                      <SelectItem value="ctr">CTR (A)</SelectItem>
                      <SelectItem value="position">Posição (A)</SelectItem>
                      <SelectItem value="positionDelta">Δ Posição</SelectItem>
                      <SelectItem value="impressionsDelta">Δ Impressões</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[220px]">Keyword</TableHead>
                      <TableHead className="text-right">Cliques A / B</TableHead>
                      <TableHead className="text-right">Impressões A / B</TableHead>
                      <TableHead className="text-right">CTR A / B</TableHead>
                      <TableHead className="text-right">Posição A / B</TableHead>
                      <TableHead className="text-right">Δ Posição</TableHead>
                      <TableHead className="text-right">Top 10</TableHead>
                      <TableHead className="text-center">Tendência</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rows.slice(0, 300).map((r) => (
                      <TableRow key={r.query}>
                        <TableCell className="font-medium">{r.query}</TableCell>
                        <TableCell className="text-right tabular-nums">
                          {fmtInt(r.a?.clicks ?? 0)} <span className="text-muted-foreground">/ {fmtInt(r.b?.clicks ?? 0)}</span>
                          <div className="text-xs text-muted-foreground">{fmtDelta(r.deltas.clicks)}</div>
                        </TableCell>
                        <TableCell className="text-right tabular-nums">
                          {fmtInt(r.a?.impressions ?? 0)} <span className="text-muted-foreground">/ {fmtInt(r.b?.impressions ?? 0)}</span>
                          <div className="text-xs text-muted-foreground">{fmtDelta(r.deltas.impressions)}</div>
                        </TableCell>
                        <TableCell className="text-right tabular-nums">
                          {fmtPct(r.a?.ctr)} <span className="text-muted-foreground">/ {fmtPct(r.b?.ctr)}</span>
                          <div className="text-xs text-muted-foreground">{r.deltas.ctr != null ? fmtDelta(r.deltas.ctr, "pct") : "—"}</div>
                        </TableCell>
                        <TableCell className="text-right tabular-nums">
                          {fmtPos(r.a?.position)} <span className="text-muted-foreground">/ {fmtPos(r.b?.position)}</span>
                        </TableCell>
                        <TableCell className={`text-right tabular-nums ${r.deltas.position == null ? "" : r.deltas.position < 0 ? "text-green-600" : r.deltas.position > 0 ? "text-red-600" : ""}`}>
                          {r.deltas.position == null ? "—" : fmtDelta(-r.deltas.position, "pos")}
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge variant={r.inTop10A ? "default" : "outline"} className="mr-1">A</Badge>
                          <Badge variant={r.inTop10B ? "default" : "outline"}>B</Badge>
                        </TableCell>
                        <TableCell className="text-center"><TrendIcon t={r.trend} /></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {rows.length > 300 && (
                  <p className="text-xs text-muted-foreground mt-2">Mostrando 300 de {rows.length}. Use o filtro ou exporte o CSV para o conjunto completo.</p>
                )}
              </CardContent>
            </Card>
          </>
        )}

        {!data && !loading && (
          <p className="text-sm text-muted-foreground">Sem dados. Clique em Atualizar.</p>
        )}
      </main>
      <Footer />
    </div>
  );
}

function Kpi({ title, value, delta, kind = "int" }: { title: string; value: number; delta: number; kind?: "int" | "pct" }) {
  const positive = delta > 0;
  const negative = delta < 0;
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold tabular-nums">
          {kind === "pct" ? fmtPct(value) : fmtInt(value)}
        </div>
        <div className={`text-xs flex items-center gap-1 ${positive ? "text-green-600" : negative ? "text-red-600" : "text-muted-foreground"}`}>
          {positive ? <TrendingUp className="w-3 h-3" /> : negative ? <TrendingDown className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
          {fmtDelta(delta, kind === "pct" ? "pct" : "int")} vs período B
        </div>
      </CardContent>
    </Card>
  );
}