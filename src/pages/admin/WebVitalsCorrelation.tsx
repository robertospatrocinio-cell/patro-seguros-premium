import { useEffect, useMemo, useState } from "react";
import { RefreshCw } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip as RTooltip,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";

type CorrelationRow = {
  page: string;
  device_type: string | null;
  sessions: number;
  p75_lcp: number | null;
  p75_cls: number | null;
  p75_inp: number | null;
  good_lcp_pct: number | null;
  good_cls_pct: number | null;
  good_inp_pct: number | null;
  conversions: number;
  leads_count: number;
  conversion_rate: number | null;
  lead_rate: number | null;
};

type TimeseriesPoint = { day: string; p75_value: number | null; samples: number };

type SortKey =
  | "sessions"
  | "p75_lcp"
  | "p75_cls"
  | "p75_inp"
  | "conversions"
  | "conversion_rate"
  | "leads_count"
  | "lead_rate";

const DEVICES = ["all", "mobile", "desktop", "tablet"] as const;
const METRICS = ["LCP", "CLS", "INP"] as const;

function fmtMs(v: number | null) {
  if (v == null) return "—";
  return `${Math.round(v)} ms`;
}
function fmtCls(v: number | null) {
  if (v == null) return "—";
  return v.toFixed(3);
}
function fmtPct(v: number | null) {
  if (v == null) return "—";
  return `${Number(v).toFixed(1)}%`;
}

function lcpTone(v: number | null) {
  if (v == null) return "outline" as const;
  if (v <= 2500) return "default" as const;
  if (v <= 4000) return "secondary" as const;
  return "destructive" as const;
}
function clsTone(v: number | null) {
  if (v == null) return "outline" as const;
  if (v <= 0.1) return "default" as const;
  if (v <= 0.25) return "secondary" as const;
  return "destructive" as const;
}
function inpTone(v: number | null) {
  if (v == null) return "outline" as const;
  if (v <= 200) return "default" as const;
  if (v <= 500) return "secondary" as const;
  return "destructive" as const;
}

const WebVitalsCorrelation = () => {
  const [days, setDays] = useState<number>(30);
  const [device, setDevice] = useState<(typeof DEVICES)[number]>("all");
  const [rows, setRows] = useState<CorrelationRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>("sessions");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const [tsMetric, setTsMetric] = useState<(typeof METRICS)[number]>("LCP");
  const [tsPage, setTsPage] = useState<string>("");
  const [ts, setTs] = useState<TimeseriesPoint[]>([]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase.rpc("get_web_vitals_correlation" as any, {
      p_days: days,
      p_device: device === "all" ? null : device,
    });
    if (error) setError(error.message);
    setRows((data as CorrelationRow[]) || []);
    setLoading(false);
  };

  const fetchTs = async () => {
    const { data } = await supabase.rpc("get_web_vitals_timeseries" as any, {
      p_metric: tsMetric,
      p_page: tsPage || null,
      p_device: device === "all" ? null : device,
      p_days: days,
    });
    setTs((data as TimeseriesPoint[]) || []);
  };

  useEffect(() => {
    fetchData();
     
  }, [days, device]);

  useEffect(() => {
    fetchTs();
     
  }, [tsMetric, tsPage, device, days]);

  const totals = useMemo(() => {
    const totalSessions = rows.reduce((s, r) => s + (r.sessions || 0), 0);
    const totalConv = rows.reduce((s, r) => s + (r.conversions || 0), 0);
    const totalLeads = rows.reduce((s, r) => s + (r.leads_count || 0), 0);
    const weightedP75 = (key: "p75_lcp" | "p75_cls" | "p75_inp") => {
      let num = 0;
      let den = 0;
      rows.forEach((r) => {
        const v = r[key];
        if (v != null && r.sessions) {
          num += v * r.sessions;
          den += r.sessions;
        }
      });
      return den ? num / den : null;
    };
    return {
      totalSessions,
      totalConv,
      totalLeads,
      lcp: weightedP75("p75_lcp"),
      cls: weightedP75("p75_cls"),
      inp: weightedP75("p75_inp"),
      convRate: totalSessions ? (100 * totalConv) / totalSessions : 0,
      leadRate: totalSessions ? (100 * totalLeads) / totalSessions : 0,
    };
  }, [rows]);

  const sortedRows = useMemo(() => {
    const arr = [...rows];
    arr.sort((a, b) => {
      const av = (a[sortKey] as number | null) ?? -1;
      const bv = (b[sortKey] as number | null) ?? -1;
      return sortDir === "asc" ? av - bv : bv - av;
    });
    return arr;
  }, [rows, sortKey, sortDir]);

  const scatterData = useMemo(
    () =>
      rows
        .filter((r) => r.p75_lcp != null && r.conversion_rate != null && r.sessions > 0)
        .map((r) => ({
          page: r.page,
          lcp: r.p75_lcp,
          conv: Number(r.conversion_rate) || 0,
          sessions: r.sessions,
        })),
    [rows],
  );

  const topPages = useMemo(
    () => [...rows].sort((a, b) => (b.sessions || 0) - (a.sessions || 0)).slice(0, 30),
    [rows],
  );

  const toggleSort = (k: SortKey) => {
    if (sortKey === k) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else {
      setSortKey(k);
      setSortDir("desc");
    }
  };

  const SortHead = ({ k, children }: { k: SortKey; children: React.ReactNode }) => (
    <TableHead>
      <button className="text-left font-medium hover:text-primary" onClick={() => toggleSort(k)}>
        {children} {sortKey === k ? (sortDir === "asc" ? "↑" : "↓") : ""}
      </button>
    </TableHead>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Web Vitals × Conversões × Leads</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Correlação entre performance real (RUM) e resultados de negócio por página e dispositivo.
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <Select value={String(days)} onValueChange={(v) => setDays(Number(v))}>
              <SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Últimos 7 dias</SelectItem>
                <SelectItem value="30">Últimos 30 dias</SelectItem>
                <SelectItem value="90">Últimos 90 dias</SelectItem>
              </SelectContent>
            </Select>
            <Select value={device} onValueChange={(v) => setDevice(v as any)}>
              <SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                {DEVICES.map((d) => (
                  <SelectItem key={d} value={d}>{d === "all" ? "Todos" : d}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon" onClick={fetchData} aria-label="Recarregar">
              <RefreshCw className={loading ? "h-4 w-4 animate-spin" : "h-4 w-4"} />
            </Button>
          </div>
        </div>

        {error && (
          <Card className="mb-6 border-destructive">
            <CardContent className="pt-6 text-sm text-destructive">Erro: {error}</CardContent>
          </Card>
        )}

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          <Card><CardHeader className="pb-2"><CardTitle className="text-xs text-muted-foreground">Sessões</CardTitle></CardHeader><CardContent className="text-2xl font-semibold">{totals.totalSessions.toLocaleString("pt-BR")}</CardContent></Card>
          <Card><CardHeader className="pb-2"><CardTitle className="text-xs text-muted-foreground">p75 LCP</CardTitle></CardHeader><CardContent className="text-2xl font-semibold">{fmtMs(totals.lcp)}</CardContent></Card>
          <Card><CardHeader className="pb-2"><CardTitle className="text-xs text-muted-foreground">p75 CLS</CardTitle></CardHeader><CardContent className="text-2xl font-semibold">{fmtCls(totals.cls)}</CardContent></Card>
          <Card><CardHeader className="pb-2"><CardTitle className="text-xs text-muted-foreground">p75 INP</CardTitle></CardHeader><CardContent className="text-2xl font-semibold">{fmtMs(totals.inp)}</CardContent></Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-xs text-muted-foreground">Conversões / Leads</CardTitle></CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">{totals.totalConv.toLocaleString("pt-BR")} / {totals.totalLeads.toLocaleString("pt-BR")}</div>
              <div className="text-xs text-muted-foreground mt-1">Taxa: {totals.convRate.toFixed(2)}% / {totals.leadRate.toFixed(2)}%</div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-base">LCP × Taxa de conversão por página</CardTitle>
            <p className="text-xs text-muted-foreground">Cada bolha é uma página. Raio proporcional ao volume de sessões. Faixas ideais: LCP ≤ 2500 ms.</p>
          </CardHeader>
          <CardContent>
            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 10, right: 20, bottom: 20, left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" dataKey="lcp" name="p75 LCP" unit=" ms" />
                  <YAxis type="number" dataKey="conv" name="Taxa conv." unit="%" />
                  <ZAxis type="number" dataKey="sessions" range={[40, 400]} name="Sessões" />
                  <RTooltip
                    cursor={{ strokeDasharray: "3 3" }}
                    formatter={(v: any, name: any) => [v, name]}
                    labelFormatter={() => ""}
                    content={({ payload }) => {
                      const p: any = payload?.[0]?.payload;
                      if (!p) return null;
                      return (
                        <div className="rounded-md border bg-background p-2 text-xs shadow">
                          <div className="font-medium">{p.page}</div>
                          <div>LCP p75: {fmtMs(p.lcp)}</div>
                          <div>Taxa conv.: {p.conv?.toFixed?.(2)}%</div>
                          <div>Sessões: {p.sessions}</div>
                        </div>
                      );
                    }}
                  />
                  <Scatter data={scatterData} fill="hsl(var(--primary))" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between gap-3 flex-wrap">
            <CardTitle className="text-base">Série diária p75</CardTitle>
            <div className="flex gap-2">
              <Select value={tsMetric} onValueChange={(v) => setTsMetric(v as any)}>
                <SelectTrigger className="w-[110px]"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {METRICS.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={tsPage || "__all__"} onValueChange={(v) => setTsPage(v === "__all__" ? "" : v)}>
                <SelectTrigger className="w-[280px]"><SelectValue placeholder="Todas as páginas" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="__all__">Todas as páginas</SelectItem>
                  {topPages.map((r) => (
                    <SelectItem key={r.page + r.device_type} value={r.page}>{r.page}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={ts}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <RTooltip />
                  <Line type="monotone" dataKey="p75_value" stroke="hsl(var(--primary))" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Detalhamento por página e dispositivo</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Página</TableHead>
                  <TableHead>Device</TableHead>
                  <SortHead k="sessions">Sessões</SortHead>
                  <SortHead k="p75_lcp">p75 LCP</SortHead>
                  <SortHead k="p75_cls">p75 CLS</SortHead>
                  <SortHead k="p75_inp">p75 INP</SortHead>
                  <SortHead k="conversions">Cliques</SortHead>
                  <SortHead k="conversion_rate">Conv. %</SortHead>
                  <SortHead k="leads_count">Leads</SortHead>
                  <SortHead k="lead_rate">Lead %</SortHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedRows.length === 0 && !loading && (
                  <TableRow><TableCell colSpan={10} className="text-center text-sm text-muted-foreground py-8">Sem dados no período.</TableCell></TableRow>
                )}
                {sortedRows.map((r) => (
                  <TableRow key={`${r.page}-${r.device_type}`}>
                    <TableCell className="max-w-[280px] truncate" title={r.page}>{r.page}</TableCell>
                    <TableCell><Badge variant="outline">{r.device_type || "—"}</Badge></TableCell>
                    <TableCell>{r.sessions.toLocaleString("pt-BR")}</TableCell>
                    <TableCell><Badge variant={lcpTone(r.p75_lcp)}>{fmtMs(r.p75_lcp)}</Badge></TableCell>
                    <TableCell><Badge variant={clsTone(r.p75_cls)}>{fmtCls(r.p75_cls)}</Badge></TableCell>
                    <TableCell><Badge variant={inpTone(r.p75_inp)}>{fmtMs(r.p75_inp)}</Badge></TableCell>
                    <TableCell>{r.conversions.toLocaleString("pt-BR")}</TableCell>
                    <TableCell>{fmtPct(r.conversion_rate)}</TableCell>
                    <TableCell>{r.leads_count.toLocaleString("pt-BR")}</TableCell>
                    <TableCell>{fmtPct(r.lead_rate)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default WebVitalsCorrelation;