import { useEffect, useMemo, useState } from "react";
import { AlertTriangle, CheckCircle2, Loader2, PlayCircle, RefreshCw, XCircle } from "lucide-react";
import PageMeta from "@/components/PageMeta";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type Run = {
  id: string;
  started_at: string;
  finished_at: string | null;
  total_urls: number;
  passed: number;
  warned: number;
  failed: number;
  new_failures: number;
  duration_ms: number | null;
  triggered_by: string;
  alert_sent: boolean;
  error_message: string | null;
};

type Finding = {
  id: string;
  run_id: string;
  route: string;
  severity: "error" | "warn";
  rule: string;
  message: string;
  is_new: boolean;
  ignored: boolean;
  first_seen_at: string;
};

export default function AdminSeoMonitor() {
  const [runs, setRuns] = useState<Run[]>([]);
  const [selectedRunId, setSelectedRunId] = useState<string | null>(null);
  const [findings, setFindings] = useState<Finding[]>([]);
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);
  const [filterSeverity, setFilterSeverity] = useState<"all" | "error" | "warn" | "new">("new");
  const [filterRule, setFilterRule] = useState<string>("");
  const [search, setSearch] = useState("");

  async function loadRuns() {
    const { data, error } = await supabase
      .from("seo_audit_runs")
      .select("*")
      .order("started_at", { ascending: false })
      .limit(30);
    if (error) { toast.error(error.message); return; }
    setRuns((data || []) as Run[]);
    if (!selectedRunId && data && data.length) {
      const first = data.find((r) => r.finished_at) || data[0];
      setSelectedRunId(first.id);
    }
  }

  async function loadFindings(runId: string) {
    setLoading(true);
    const { data, error } = await supabase
      .from("seo_audit_findings")
      .select("*")
      .eq("run_id", runId)
      .order("is_new", { ascending: false })
      .order("severity", { ascending: true })
      .limit(2000);
    setLoading(false);
    if (error) { toast.error(error.message); return; }
    setFindings((data || []) as Finding[]);
  }

  useEffect(() => { loadRuns(); }, []);
  useEffect(() => { if (selectedRunId) loadFindings(selectedRunId); }, [selectedRunId]);

  // Deep-link support: /admin/seo-monitor?run=<id>
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("run");
    if (q) setSelectedRunId(q);
  }, []);

  const selectedRun = useMemo(() => runs.find((r) => r.id === selectedRunId), [runs, selectedRunId]);

  const ruleOptions = useMemo(() => {
    const set = new Set(findings.map((f) => f.rule));
    return [...set].sort();
  }, [findings]);

  const filtered = useMemo(() => {
    return findings.filter((f) => {
      if (filterSeverity === "error" && f.severity !== "error") return false;
      if (filterSeverity === "warn" && f.severity !== "warn") return false;
      if (filterSeverity === "new" && !f.is_new) return false;
      if (filterRule && f.rule !== filterRule) return false;
      if (search && !f.route.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [findings, filterSeverity, filterRule, search]);

  async function runNow() {
    setRunning(true);
    try {
      const { data, error } = await supabase.functions.invoke("seo-audit-crawler", {
        headers: { "x-trigger": "manual" },
      });
      if (error) throw error;
      toast.success(`Auditoria concluída: ${data?.failed || 0} falhas, ${data?.new_failures || 0} novas`);
      await loadRuns();
      if (data?.run_id) setSelectedRunId(data.run_id);
    } catch (e) {
      toast.error((e as Error).message);
    } finally { setRunning(false); }
  }

  async function toggleIgnore(f: Finding) {
    const next = !f.ignored;
    const { error } = await supabase
      .from("seo_audit_findings")
      .update({ ignored: next })
      .eq("id", f.id);
    if (error) return toast.error(error.message);
    setFindings((prev) => prev.map((x) => x.id === f.id ? { ...x, ignored: next } : x));
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PageMeta title="Monitor SEO | Admin" description="Auditoria contínua de SEO em produção." noindex />
      <Header />
      <main className="flex-1 container mx-auto max-w-7xl px-4 pt-28 pb-16">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h1 className="text-3xl font-bold">Monitor SEO</h1>
            <p className="text-sm text-muted-foreground">
              Auditoria diária de todas as rotas do sitemap. Alertas por email quando surgem regressões.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={loadRuns} disabled={running}>
              <RefreshCw className="h-4 w-4 mr-2" /> Recarregar
            </Button>
            <Button onClick={runNow} disabled={running}>
              {running ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <PlayCircle className="h-4 w-4 mr-2" />}
              Rodar agora
            </Button>
          </div>
        </div>

        {selectedRun && (
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-6">
            <StatCard label="URLs auditadas" value={selectedRun.total_urls} />
            <StatCard label="OK" value={selectedRun.passed} tone="green" />
            <StatCard label="Avisos" value={selectedRun.warned} tone="yellow" />
            <StatCard label="Falhas" value={selectedRun.failed} tone="red" />
            <StatCard label="Novas falhas" value={selectedRun.new_failures} tone={selectedRun.new_failures ? "red" : "green"} />
            <StatCard label="Duração" value={selectedRun.duration_ms ? `${Math.round(selectedRun.duration_ms / 1000)}s` : "—"} />
          </div>
        )}

        <div className="grid md:grid-cols-[280px_1fr] gap-6">
          <Card>
            <CardHeader><CardTitle className="text-base">Últimas rodadas</CardTitle></CardHeader>
            <CardContent className="max-h-[600px] overflow-y-auto space-y-1 p-2">
              {runs.map((r) => {
                const active = r.id === selectedRunId;
                const isBroken = !r.finished_at || r.error_message;
                return (
                  <button
                    key={r.id}
                    onClick={() => setSelectedRunId(r.id)}
                    className={`w-full text-left rounded-md px-3 py-2 text-xs border ${active ? "bg-primary/10 border-primary" : "border-transparent hover:bg-muted"}`}
                  >
                    <div className="font-medium">{new Date(r.started_at).toLocaleString("pt-BR")}</div>
                    <div className="text-muted-foreground flex gap-2 flex-wrap mt-1">
                      {isBroken ? (
                        <Badge variant="destructive" className="text-[10px]">interrompido</Badge>
                      ) : (
                        <>
                          <span className="text-green-700">{r.passed} ok</span>
                          <span className="text-yellow-700">{r.warned} warn</span>
                          <span className="text-red-700">{r.failed} fail</span>
                          {r.new_failures > 0 && <Badge variant="destructive" className="text-[10px]">{r.new_failures} nova(s)</Badge>}
                        </>
                      )}
                    </div>
                  </button>
                );
              })}
              {!runs.length && <div className="text-sm text-muted-foreground p-4">Nenhuma rodada ainda. Clique em "Rodar agora".</div>}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Findings</CardTitle>
              <div className="flex flex-wrap gap-2 mt-3">
                <div className="flex gap-1">
                  {(["new", "error", "warn", "all"] as const).map((k) => (
                    <Button key={k} size="sm" variant={filterSeverity === k ? "default" : "outline"} onClick={() => setFilterSeverity(k)}>
                      {k === "new" ? "Novas" : k === "error" ? "Erros" : k === "warn" ? "Avisos" : "Tudo"}
                    </Button>
                  ))}
                </div>
                <select
                  value={filterRule}
                  onChange={(e) => setFilterRule(e.target.value)}
                  className="h-9 rounded-md border border-input bg-background px-3 text-sm"
                >
                  <option value="">Todas as regras</option>
                  {ruleOptions.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
                <Input
                  placeholder="Buscar rota…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="max-w-xs h-9"
                />
                <div className="text-sm text-muted-foreground self-center ml-auto">
                  {filtered.length} de {findings.length}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center gap-2 text-sm text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" /> Carregando…</div>
              ) : filtered.length === 0 ? (
                <div className="text-sm text-muted-foreground flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-600" /> Nenhum finding com esses filtros.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-xs text-muted-foreground border-b">
                        <th className="py-2 pr-2">Sev.</th>
                        <th className="py-2 pr-2">Rota</th>
                        <th className="py-2 pr-2">Regra</th>
                        <th className="py-2 pr-2">Detalhe</th>
                        <th className="py-2 pr-2">Desde</th>
                        <th className="py-2 pr-2 text-right">Ação</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.slice(0, 500).map((f) => (
                        <tr key={f.id} className={`border-b last:border-0 ${f.ignored ? "opacity-40" : ""}`}>
                          <td className="py-2 pr-2">
                            {f.severity === "error"
                              ? <XCircle className="h-4 w-4 text-red-600" />
                              : <AlertTriangle className="h-4 w-4 text-yellow-600" />}
                          </td>
                          <td className="py-2 pr-2 font-mono text-xs">
                            <a href={`https://www.patroseguros.com.br${f.route}`} target="_blank" rel="noreferrer" className="hover:underline">
                              {f.route}
                            </a>
                            {f.is_new && <Badge variant="destructive" className="ml-2 text-[10px]">NOVO</Badge>}
                          </td>
                          <td className="py-2 pr-2 font-mono text-xs">{f.rule}</td>
                          <td className="py-2 pr-2 text-xs">{f.message}</td>
                          <td className="py-2 pr-2 text-xs text-muted-foreground whitespace-nowrap">
                            {new Date(f.first_seen_at).toLocaleDateString("pt-BR")}
                          </td>
                          <td className="py-2 pr-2 text-right">
                            <Button size="sm" variant="ghost" onClick={() => toggleIgnore(f)}>
                              {f.ignored ? "Reativar" : "Ignorar"}
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {filtered.length > 500 && (
                    <div className="text-xs text-muted-foreground mt-3">Exibindo primeiras 500 linhas de {filtered.length}.</div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function StatCard({ label, value, tone }: { label: string; value: number | string; tone?: "green" | "yellow" | "red" }) {
  const color = tone === "green" ? "text-green-700" : tone === "yellow" ? "text-yellow-700" : tone === "red" ? "text-red-700" : "text-foreground";
  return (
    <Card>
      <CardContent className="p-4">
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className={`text-2xl font-bold ${color}`}>{value}</div>
      </CardContent>
    </Card>
  );
}