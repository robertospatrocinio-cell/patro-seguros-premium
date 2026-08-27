import { useEffect, useMemo, useState } from "react";
import { AlertTriangle, TrendingDown, Sparkles, Check, X, RefreshCw, ExternalLink } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";

type AlertKind = "sustained_potential" | "efficiency_drop";
type AlertStatus = "open" | "reviewed" | "dismissed";
type AnchorAlert = {
  id: string;
  anchor: string;
  kind: AlertKind;
  status: AlertStatus;
  streak_days: number;
  first_detected_at: string;
  last_detected_at: string;
  reviewed_at: string | null;
  top_pathname: string | null;
  current_score: number | null;
  current_conversion_rate: number | null;
  previous_conversion_rate: number | null;
  reason: string | null;
  metrics: Record<string, unknown> | null;
};

const KIND_LABEL: Record<AlertKind, string> = {
  sustained_potential: "Alto potencial sustentado",
  efficiency_drop: "Queda de eficiência",
};

function fmtPct(n: number | null | undefined) {
  if (n == null || !Number.isFinite(n)) return "—";
  return `${(n * 100).toFixed(2)}%`;
}
function fmtDate(iso: string) {
  return new Date(iso).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });
}

export default function AnchorAlerts() {
  const [alerts, setAlerts] = useState<AnchorAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);
  const [tab, setTab] = useState<AlertStatus>("open");

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("anchor_alerts")
      .select("*")
      .order("last_detected_at", { ascending: false })
      .limit(500);
    if (error) toast.error(`Erro ao carregar alertas: ${error.message}`);
    setAlerts((data ?? []) as AnchorAlert[]);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const runDetection = async () => {
    setRunning(true);
    try {
      const snap = await supabase.functions.invoke("snapshot-anchor-history", { body: {} });
      if (snap.error) throw new Error(snap.error.message);
      const det = await supabase.functions.invoke("detect-anchor-alerts", { body: {} });
      if (det.error) throw new Error(det.error.message);
      const payload = det.data as { detected?: number; opened?: number; refreshed?: number };
      toast.success(`Detecção concluída: ${payload.detected ?? 0} âncoras, ${payload.opened ?? 0} novos alertas`);
      await load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : String(err));
    } finally {
      setRunning(false);
    }
  };

  const updateStatus = async (id: string, status: AlertStatus) => {
    const { error } = await supabase
      .from("anchor_alerts")
      .update({ status, reviewed_at: new Date().toISOString() })
      .eq("id", id);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success(status === "reviewed" ? "Marcado como revisado" : "Alerta dispensado");
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
  };

  const grouped = useMemo(() => {
    const acc: Record<AlertStatus, AnchorAlert[]> = { open: [], reviewed: [], dismissed: [] };
    for (const a of alerts) acc[a.status].push(a);
    return acc;
  }, [alerts]);

  const openCount = grouped.open.length;
  const sustainedOpen = grouped.open.filter((a) => a.kind === "sustained_potential").length;
  const dropOpen = grouped.open.filter((a) => a.kind === "efficiency_drop").length;

  return (
    <>
      <PageMeta
        title="Alertas de Âncoras — Admin"
        description="Alertas automáticos para âncoras com alto potencial sustentado ou queda de eficiência."
        canonicalPath="/admin/alertas-ancoras"
        noindex
      />
      <Header />
      <main className="container mx-auto max-w-6xl px-4 py-10 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <AlertTriangle className="w-7 h-7 text-orange-500" />
              Alertas de Âncoras
            </h1>
            <p className="text-muted-foreground mt-1">
              Detecção automática diária: alto potencial ≥ 7 dias consecutivos ou queda ≥ 50% na conversão.
            </p>
          </div>
          <Button onClick={runDetection} disabled={running}>
            <RefreshCw className={`w-4 h-4 mr-2 ${running ? "animate-spin" : ""}`} />
            Rodar detecção agora
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Alertas abertos</CardTitle></CardHeader>
            <CardContent><div className="text-3xl font-bold">{openCount}</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground flex items-center gap-2"><Sparkles className="w-4 h-4" />Potencial sustentado</CardTitle></CardHeader>
            <CardContent><div className="text-3xl font-bold">{sustainedOpen}</div></CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground flex items-center gap-2"><TrendingDown className="w-4 h-4" />Queda de eficiência</CardTitle></CardHeader>
            <CardContent><div className="text-3xl font-bold">{dropOpen}</div></CardContent>
          </Card>
        </div>

        <Tabs value={tab} onValueChange={(v) => setTab(v as AlertStatus)}>
          <TabsList>
            <TabsTrigger value="open">Abertos ({grouped.open.length})</TabsTrigger>
            <TabsTrigger value="reviewed">Revisados ({grouped.reviewed.length})</TabsTrigger>
            <TabsTrigger value="dismissed">Dispensados ({grouped.dismissed.length})</TabsTrigger>
          </TabsList>

          {(["open", "reviewed", "dismissed"] as AlertStatus[]).map((status) => (
            <TabsContent key={status} value={status} className="mt-4">
              <Card>
                <CardContent className="p-0">
                  {loading ? (
                    <div className="p-6 text-sm text-muted-foreground">Carregando…</div>
                  ) : grouped[status].length === 0 ? (
                    <div className="p-6 text-sm text-muted-foreground">Nenhum alerta.</div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Tipo</TableHead>
                          <TableHead>Âncora</TableHead>
                          <TableHead>Detalhe</TableHead>
                          <TableHead>Streak</TableHead>
                          <TableHead>Score / Conversão</TableHead>
                          <TableHead>Última detecção</TableHead>
                          <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {grouped[status].map((a) => (
                          <TableRow key={a.id}>
                            <TableCell>
                              <Badge variant={a.kind === "efficiency_drop" ? "destructive" : "default"} className="whitespace-nowrap">
                                {a.kind === "efficiency_drop" ? <TrendingDown className="w-3 h-3 mr-1" /> : <Sparkles className="w-3 h-3 mr-1" />}
                                {KIND_LABEL[a.kind]}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="font-mono text-sm">{a.anchor}</div>
                              {a.top_pathname && (
                                <a
                                  href={`${a.top_pathname}${a.anchor}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-xs text-muted-foreground hover:underline inline-flex items-center gap-1 mt-1"
                                >
                                  {a.top_pathname}
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              )}
                            </TableCell>
                            <TableCell className="max-w-[320px] text-sm">{a.reason}</TableCell>
                            <TableCell>{a.streak_days}d</TableCell>
                            <TableCell className="text-sm">
                              <div>Score: <strong>{a.current_score?.toFixed?.(1) ?? "—"}</strong></div>
                              <div>Conv. atual: {fmtPct(a.current_conversion_rate)}</div>
                              {a.previous_conversion_rate != null && (
                                <div className="text-muted-foreground">Anterior: {fmtPct(a.previous_conversion_rate)}</div>
                              )}
                            </TableCell>
                            <TableCell className="text-xs text-muted-foreground whitespace-nowrap">{fmtDate(a.last_detected_at)}</TableCell>
                            <TableCell className="text-right">
                              {a.status === "open" ? (
                                <div className="flex gap-2 justify-end">
                                  <Button size="sm" variant="outline" onClick={() => updateStatus(a.id, "reviewed")}>
                                    <Check className="w-3 h-3 mr-1" /> Revisado
                                  </Button>
                                  <Button size="sm" variant="ghost" onClick={() => updateStatus(a.id, "dismissed")}>
                                    <X className="w-3 h-3 mr-1" /> Dispensar
                                  </Button>
                                </div>
                              ) : (
                                <Button size="sm" variant="ghost" onClick={() => updateStatus(a.id, "open")}>
                                  Reabrir
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </main>
      <Footer />
    </>
  );
}