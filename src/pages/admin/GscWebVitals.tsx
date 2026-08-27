import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { RefreshCw, TrendingUp, TrendingDown, ExternalLink, AlertTriangle, Target, Zap, Search } from "lucide-react";
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

type GscRow = {
  page: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
};

type GscResponse = {
  siteUrl: string;
  range: { startDate: string; endDate: string; days: number };
  totals: { clicks: number; impressions: number; ctr: number; pages: number };
  rows: GscRow[];
};

type CorrelationRow = {
  page: string;
  device_type: string | null;
  sessions: number;
  p75_lcp: number | null;
  p75_cls: number | null;
  p75_inp: number | null;
  conversions: number;
  leads_count: number;
  conversion_rate: number | null;
  lead_rate: number | null;
};

type MergedRow = GscRow & {
  path: string;
  p75_lcp: number | null;
  p75_cls: number | null;
  p75_inp: number | null;
  sessions: number;
  conversions: number;
  leads_count: number;
  vitalsScore: number; // 0-100 (100 = perfeito)
  priority: number;    // 0-100 (100 = mais urgente)
  priorityReason: string;
};

type SortKey =
  | "priority" | "impressions" | "clicks" | "ctr" | "position"
  | "sessions" | "p75_lcp" | "p75_inp" | "conversions";

const PATRO = "https://www.patroseguros.com.br";

const fmtInt = (n: number) => new Intl.NumberFormat("pt-BR").format(Math.round(n));
const fmtPct = (n: number, d = 1) => `${(n * 100).toFixed(d)}%`;
const fmtPos = (n: number) => n.toFixed(1);
const fmtMs = (v: number | null) => (v == null ? "—" : `${Math.round(v)} ms`);
const fmtCls = (v: number | null) => (v == null ? "—" : v.toFixed(3));

function toPath(url: string): string {
  try {
    const u = new URL(url);
    return u.pathname || "/";
  } catch { return url; }
}

// LCP good ≤2500, needs 2500-4000, poor >4000
// INP good ≤200, needs 200-500, poor >500
// CLS good ≤0.1, needs 0.1-0.25, poor >0.25
function scoreVital(v: number | null, good: number, poor: number): number {
  if (v == null) return 100; // sem dados = neutro
  if (v <= good) return 100;
  if (v >= poor) return 0;
  return Math.round(100 - ((v - good) / (poor - good)) * 100);
}

function computeVitalsScore(r: { p75_lcp: number | null; p75_inp: number | null; p75_cls: number | null }): number {
  const lcp = scoreVital(r.p75_lcp, 2500, 4000);
  const inp = scoreVital(r.p75_inp, 200, 500);
  const cls = scoreVital(r.p75_cls, 0.1, 0.25);
  return Math.round((lcp + inp + cls) / 3);
}

// Priority: página com muitas impressões, CTR baixo e/ou vitals ruins deve subir.
// Também considera posição média fora do top 10 com muito volume.
function computePriority(row: {
  impressions: number; ctr: number; position: number;
  vitalsScore: number; conversions: number;
}, maxImpressions: number): { score: number; reason: string } {
  const reasons: string[] = [];
  let score = 0;

  const volumeWeight = maxImpressions > 0 ? row.impressions / maxImpressions : 0;
  score += volumeWeight * 40; // até 40 pontos por volume

  // CTR abaixo do esperado para a posição (regra prática: pos<=3 ~ >20%, 4-10 ~ >5%, 11+ ~ >1%)
  const expectedCtr = row.position <= 3 ? 0.2 : row.position <= 10 ? 0.05 : 0.01;
  if (row.impressions >= 50 && row.ctr < expectedCtr) {
    const gap = (expectedCtr - row.ctr) / expectedCtr;
    score += gap * 25;
    reasons.push(`CTR baixo (${fmtPct(row.ctr)} vs. esperado ${fmtPct(expectedCtr, 0)})`);
  }

  // Vitals ruins com tráfego
  if (row.vitalsScore < 70 && row.impressions >= 50) {
    score += ((100 - row.vitalsScore) / 100) * 25;
    reasons.push(`Core Web Vitals ${row.vitalsScore}/100`);
  }

  // Posição na 2ª página com muito impressão
  if (row.position > 10 && row.impressions >= 100) {
    score += 10;
    reasons.push(`Posição ${fmtPos(row.position)} — quase top 10`);
  }

  // Sem conversões apesar de cliques
  if (row.conversions === 0 && row.impressions >= 100) {
    reasons.push("Sem conversões registradas");
  }

  return {
    score: Math.min(100, Math.round(score)),
    reason: reasons.join(" · ") || "Estável",
  };
}

const RANGES = [7, 28, 90] as const;
const DEVICES = ["ALL", "MOBILE", "DESKTOP", "TABLET"] as const;

const GscWebVitals = () => {
  const [days, setDays] = useState<7 | 28 | 90>(28);
  const [device, setDevice] = useState<typeof DEVICES[number]>("ALL");
  const [gsc, setGsc] = useState<GscResponse | null>(null);
  const [correlation, setCorrelation] = useState<CorrelationRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("priority");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  async function loadAll() {
    setLoading(true);
    setError(null);
    try {
      const [gscRes, corrRes] = await Promise.all([
        supabase.functions.invoke<GscResponse>("gsc-performance", {
          body: { days, device },
        }),
        supabase.rpc("get_web_vitals_correlation", {
          p_days: days,
          p_device: device === "ALL" ? null : device.toLowerCase(),
        }),
      ]);

      if (gscRes.error) throw new Error(gscRes.error.message || "GSC falhou");
      if (!gscRes.data) throw new Error("GSC retornou vazio");
      setGsc(gscRes.data);

      if (corrRes.error) throw new Error(corrRes.error.message || "Correlação falhou");
      setCorrelation((corrRes.data ?? []) as CorrelationRow[]);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadAll(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [days, device]);

  // Merge por path (agregando web vitals por página em qualquer device)
  const merged: MergedRow[] = useMemo(() => {
    if (!gsc) return [];
    const vitalsByPath = new Map<string, {
      lcp: number[]; inp: number[]; cls: number[];
      sessions: number; conversions: number; leads: number;
    }>();
    for (const r of correlation) {
      const p = r.page.startsWith("/") ? r.page : `/${r.page}`;
      const acc = vitalsByPath.get(p) ?? { lcp: [], inp: [], cls: [], sessions: 0, conversions: 0, leads: 0 };
      if (r.p75_lcp != null) acc.lcp.push(r.p75_lcp);
      if (r.p75_inp != null) acc.inp.push(r.p75_inp);
      if (r.p75_cls != null) acc.cls.push(r.p75_cls);
      acc.sessions += r.sessions ?? 0;
      acc.conversions += r.conversions ?? 0;
      acc.leads += r.leads_count ?? 0;
      vitalsByPath.set(p, acc);
    }

    const rows = gsc.rows.map((g) => {
      const path = toPath(g.page);
      const v = vitalsByPath.get(path);
      const avg = (arr: number[]) => arr.length ? arr.reduce((s, x) => s + x, 0) / arr.length : null;
      const p75_lcp = v ? avg(v.lcp) : null;
      const p75_inp = v ? avg(v.inp) : null;
      const p75_cls = v ? avg(v.cls) : null;
      const vitalsScore = computeVitalsScore({ p75_lcp, p75_inp, p75_cls });
      return {
        ...g, path, p75_lcp, p75_inp, p75_cls,
        sessions: v?.sessions ?? 0,
        conversions: v?.conversions ?? 0,
        leads_count: v?.leads ?? 0,
        vitalsScore, priority: 0, priorityReason: "",
      } as MergedRow;
    });

    const maxImpr = rows.reduce((m, r) => Math.max(m, r.impressions), 0);
    for (const r of rows) {
      const p = computePriority(r, maxImpr);
      r.priority = p.score;
      r.priorityReason = p.reason;
    }
    return rows;
  }, [gsc, correlation]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let out = merged;
    if (q) out = out.filter((r) => r.path.toLowerCase().includes(q));
    out = [...out].sort((a, b) => {
      const va = a[sortKey] ?? -Infinity;
      const vb = b[sortKey] ?? -Infinity;
      const cmp = (va as number) - (vb as number);
      return sortDir === "desc" ? -cmp : cmp;
    });
    return out;
  }, [merged, search, sortKey, sortDir]);

  const top10 = useMemo(() => {
    return [...merged].sort((a, b) => b.priority - a.priority).slice(0, 10);
  }, [merged]);

  const summary = useMemo(() => {
    if (!merged.length) return null;
    const withVitals = merged.filter((r) => r.p75_lcp != null);
    const avgVitals = withVitals.length
      ? Math.round(withVitals.reduce((s, r) => s + r.vitalsScore, 0) / withVitals.length)
      : null;
    const opps = merged.filter((r) => r.priority >= 60).length;
    return {
      pages: merged.length,
      opps,
      avgVitals,
      pagesWithVitals: withVitals.length,
    };
  }, [merged]);

  const changeSort = (k: SortKey) => {
    if (k === sortKey) setSortDir((d) => (d === "desc" ? "asc" : "desc"));
    else { setSortKey(k); setSortDir("desc"); }
  };
  const SortHead = ({ k, children, align = "left" }: { k: SortKey; children: React.ReactNode; align?: "left" | "right" }) => (
    <TableHead className={align === "right" ? "text-right" : ""}>
      <button
        type="button"
        onClick={() => changeSort(k)}
        className="inline-flex items-center gap-1 hover:text-primary font-semibold"
      >
        {children}
        {sortKey === k && (sortDir === "desc" ? <TrendingDown className="h-3 w-3" /> : <TrendingUp className="h-3 w-3" />)}
      </button>
    </TableHead>
  );

  const priorityBadge = (p: number) => {
    if (p >= 70) return <Badge variant="destructive">Alta</Badge>;
    if (p >= 40) return <Badge className="bg-amber-500 hover:bg-amber-600">Média</Badge>;
    return <Badge variant="secondary">Baixa</Badge>;
  };

  const vitalsBadge = (s: number) => {
    if (s >= 90) return <Badge className="bg-green-600">{s}</Badge>;
    if (s >= 70) return <Badge className="bg-lime-600">{s}</Badge>;
    if (s >= 50) return <Badge className="bg-amber-500">{s}</Badge>;
    return <Badge variant="destructive">{s}</Badge>;
  };

  return (
    <>
      <PageMeta title="GSC × Web Vitals | Admin" description="Painel de performance SEO e Core Web Vitals." noindex canonicalPath="/admin/gsc-web-vitals" />
      <Header />
      <main className="container mx-auto px-4 py-8 min-h-[70vh]">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-[#003366] flex items-center gap-2">
              <Search className="h-7 w-7" /> GSC × Web Vitals
            </h1>
            <p className="text-muted-foreground mt-1">
              Priorize melhorias correlacionando <strong>impressões, CTR e posição do Google</strong> com <strong>Core Web Vitals</strong> reais dos usuários.
            </p>
            {gsc && (
              <p className="text-xs text-muted-foreground mt-1">
                Propriedade: <code>{gsc.siteUrl}</code> · Período: {gsc.range.startDate} → {gsc.range.endDate}
              </p>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Tabs value={String(days)} onValueChange={(v) => setDays(Number(v) as 7 | 28 | 90)}>
              <TabsList>
                {RANGES.map((r) => (<TabsTrigger key={r} value={String(r)}>{r}d</TabsTrigger>))}
              </TabsList>
            </Tabs>
            <Select value={device} onValueChange={(v) => setDevice(v as typeof DEVICES[number])}>
              <SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                {DEVICES.map((d) => (<SelectItem key={d} value={d}>{d === "ALL" ? "Todos devices" : d}</SelectItem>))}
              </SelectContent>
            </Select>
            <Button onClick={loadAll} disabled={loading} variant="outline">
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
              Atualizar
            </Button>
          </div>
        </div>

        {error && (
          <Card className="mb-6 border-destructive">
            <CardContent className="pt-6 flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-semibold text-destructive">Falha ao carregar dados</p>
                <p className="text-muted-foreground">{error}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Cards resumo */}
        <div className="grid gap-4 md:grid-cols-4 mb-6">
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-xs uppercase text-muted-foreground">Impressões</CardTitle></CardHeader>
            <CardContent><p className="text-2xl font-bold">{gsc ? fmtInt(gsc.totals.impressions) : "—"}</p></CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-xs uppercase text-muted-foreground">Cliques</CardTitle></CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{gsc ? fmtInt(gsc.totals.clicks) : "—"}</p>
              <p className="text-xs text-muted-foreground">CTR: {gsc ? fmtPct(gsc.totals.ctr) : "—"}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-xs uppercase text-muted-foreground">Web Vitals médio</CardTitle></CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{summary?.avgVitals ?? "—"} <span className="text-sm text-muted-foreground">/100</span></p>
              <p className="text-xs text-muted-foreground">{summary?.pagesWithVitals ?? 0} páginas com telemetria</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-xs uppercase text-muted-foreground">Oportunidades</CardTitle></CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-[#F2994A]">{summary?.opps ?? 0}</p>
              <p className="text-xs text-muted-foreground">páginas com prioridade ≥ 60</p>
            </CardContent>
          </Card>
        </div>

        {/* Top 10 prioridades */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#003366]">
              <Target className="h-5 w-5" /> Top 10 páginas a priorizar
            </CardTitle>
          </CardHeader>
          <CardContent>
            {top10.length === 0 ? (
              <p className="text-sm text-muted-foreground">Sem dados suficientes ainda.</p>
            ) : (
              <ol className="space-y-3">
                {top10.map((r, i) => (
                  <li key={r.path} className="flex flex-wrap items-start gap-3 border-b last:border-0 pb-3 last:pb-0">
                    <div className="w-7 h-7 rounded-full bg-[#003366] text-white text-sm font-bold flex items-center justify-center shrink-0">{i + 1}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Link to={r.path} className="font-medium text-[#003366] hover:underline truncate max-w-full">{r.path}</Link>
                        {priorityBadge(r.priority)}
                        <a href={`${PATRO}${r.path}`} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                          <ExternalLink className="h-3.5 w-3.5" />
                        </ExternalLink>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{r.priorityReason}</p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs mt-1 text-muted-foreground">
                        <span><strong>{fmtInt(r.impressions)}</strong> impr.</span>
                        <span><strong>{fmtInt(r.clicks)}</strong> cliques</span>
                        <span>CTR <strong>{fmtPct(r.ctr)}</strong></span>
                        <span>Pos. <strong>{fmtPos(r.position)}</strong></span>
                        <span>LCP <strong>{fmtMs(r.p75_lcp)}</strong></span>
                        <span>INP <strong>{fmtMs(r.p75_inp)}</strong></span>
                        <span>CLS <strong>{fmtCls(r.p75_cls)}</strong></span>
                      </div>
                    </div>
                    <div className="shrink-0 text-right">
                      <div className="text-2xl font-bold text-[#F2994A]">{r.priority}</div>
                      <div className="text-xs text-muted-foreground">prioridade</div>
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </CardContent>
        </Card>

        {/* Tabela completa */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2">
            <CardTitle className="flex items-center gap-2 text-[#003366]"><Zap className="h-5 w-5" /> Todas as páginas</CardTitle>
            <Input placeholder="Filtrar por rota..." value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-xs" />
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rota</TableHead>
                  <SortHead k="priority" align="right">Prioridade</SortHead>
                  <SortHead k="impressions" align="right">Impressões</SortHead>
                  <SortHead k="clicks" align="right">Cliques</SortHead>
                  <SortHead k="ctr" align="right">CTR</SortHead>
                  <SortHead k="position" align="right">Posição</SortHead>
                  <SortHead k="p75_lcp" align="right">LCP p75</SortHead>
                  <SortHead k="p75_inp" align="right">INP p75</SortHead>
                  <TableHead className="text-right">CLS p75</TableHead>
                  <SortHead k="sessions" align="right">Sessões</SortHead>
                  <SortHead k="conversions" align="right">Conv.</SortHead>
                  <TableHead className="text-right">Vitals</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow><TableCell colSpan={12} className="text-center text-muted-foreground py-8">Sem dados.</TableCell></TableRow>
                ) : filtered.map((r) => (
                  <TableRow key={r.path}>
                    <TableCell className="max-w-[280px] truncate">
                      <Link to={r.path} className="text-[#003366] hover:underline">{r.path}</Link>
                    </TableCell>
                    <TableCell className="text-right">{priorityBadge(r.priority)} <span className="ml-1 text-xs text-muted-foreground">{r.priority}</span></TableCell>
                    <TableCell className="text-right">{fmtInt(r.impressions)}</TableCell>
                    <TableCell className="text-right">{fmtInt(r.clicks)}</TableCell>
                    <TableCell className="text-right">{fmtPct(r.ctr)}</TableCell>
                    <TableCell className="text-right">{fmtPos(r.position)}</TableCell>
                    <TableCell className="text-right">{fmtMs(r.p75_lcp)}</TableCell>
                    <TableCell className="text-right">{fmtMs(r.p75_inp)}</TableCell>
                    <TableCell className="text-right">{fmtCls(r.p75_cls)}</TableCell>
                    <TableCell className="text-right">{fmtInt(r.sessions)}</TableCell>
                    <TableCell className="text-right">{fmtInt(r.conversions)}</TableCell>
                    <TableCell className="text-right">{vitalsBadge(r.vitalsScore)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="mt-6 text-xs text-muted-foreground space-y-1">
          <p><strong>Prioridade</strong> = volume de impressões (40%) + gap de CTR vs. esperado (25%) + gap de Core Web Vitals (25%) + posição fora do top 10 (10%).</p>
          <p>Web Vitals médio combina LCP, INP e CLS (bom / precisa melhorar / ruim) em uma nota 0–100.</p>
          <p>Fontes: Google Search Console (via connector) e telemetria RUM em <code>web_vitals_metrics</code>.</p>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default GscWebVitals;
