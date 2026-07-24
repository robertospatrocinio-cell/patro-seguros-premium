import { useEffect, useState } from "react";
import { RefreshCw, CheckCircle2, AlertTriangle, Clock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

type StatusRow = {
  url: string;
  coverage_state: string | null;
  verdict: string | null;
  last_crawl_time: string | null;
  checked_at: string;
};

type AlertRow = {
  id: string;
  url: string;
  previous_state: string | null;
  new_state: string;
  transition_type: string;
  notified_at: string;
};

function coverageBadge(c: string | null) {
  if (!c) return <Badge variant="outline">Sem dados</Badge>;
  const s = c.toLowerCase();
  if (s.includes("submitted and indexed") || s === "indexed")
    return <Badge className="bg-green-600"><CheckCircle2 className="w-3 h-3 mr-1" />Indexada</Badge>;
  if (s.includes("discovered")) return <Badge className="bg-amber-500"><Clock className="w-3 h-3 mr-1" />Descoberta</Badge>;
  if (s.includes("crawled")) return <Badge className="bg-blue-500">Rastreada, não indexada</Badge>;
  if (s.includes("failed")) return <Badge variant="destructive"><AlertTriangle className="w-3 h-3 mr-1" />Falha</Badge>;
  return <Badge variant="secondary">{c}</Badge>;
}

export default function MonitorIndexacao() {
  const [rows, setRows] = useState<StatusRow[]>([]);
  const [alerts, setAlerts] = useState<AlertRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [running, setRunning] = useState(false);

  async function load() {
    setLoading(true);
    // Última leitura por URL
    const { data: status } = await supabase
      .from("gsc_indexation_status")
      .select("url,coverage_state,verdict,last_crawl_time,checked_at")
      .order("checked_at", { ascending: false })
      .limit(500);
    const latest = new Map<string, StatusRow>();
    (status ?? []).forEach((r) => { if (!latest.has(r.url)) latest.set(r.url, r as StatusRow); });
    setRows(Array.from(latest.values()));

    const { data: al } = await supabase
      .from("gsc_indexation_alerts")
      .select("*")
      .order("notified_at", { ascending: false })
      .limit(30);
    setAlerts((al ?? []) as AlertRow[]);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function runNow() {
    setRunning(true);
    try {
      const { error } = await supabase.functions.invoke("monitor-gsc-indexation", { body: {} });
      if (error) throw error;
      toast.success("Verificação executada. Recarregando dados…");
      await load();
    } catch (e) {
      toast.error("Falha ao executar verificação (verifique permissões).");
    } finally { setRunning(false); }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Monitor de Indexação (GSC)</h1>
            <p className="text-muted-foreground text-sm">
              Verificação diária automática · alerta por e-mail em transições Descoberta → Indexada.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={load} disabled={loading}>
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} /> Recarregar
            </Button>
            <Button onClick={runNow} disabled={running}>
              {running ? "Executando…" : "Rodar agora"}
            </Button>
          </div>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader><CardTitle>Status atual por URL</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>URL</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Último crawl</TableHead>
                    <TableHead>Verificado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.length === 0 && (
                    <TableRow><TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                      Sem leituras ainda. Clique em “Rodar agora”.
                    </TableCell></TableRow>
                  )}
                  {rows.map((r) => (
                    <TableRow key={r.url}>
                      <TableCell className="max-w-md truncate">
                        <a href={r.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                          {r.url.replace("https://www.patroseguros.com.br", "")}
                        </a>
                      </TableCell>
                      <TableCell>{coverageBadge(r.coverage_state)}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {r.last_crawl_time ? new Date(r.last_crawl_time).toLocaleDateString("pt-BR") : "—"}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(r.checked_at).toLocaleString("pt-BR")}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Últimos alertas de transição</CardTitle></CardHeader>
            <CardContent>
              {alerts.length === 0 ? (
                <p className="text-sm text-muted-foreground">Nenhuma transição registrada ainda.</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data</TableHead>
                      <TableHead>URL</TableHead>
                      <TableHead>De</TableHead>
                      <TableHead>Para</TableHead>
                      <TableHead>Tipo</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {alerts.map((a) => (
                      <TableRow key={a.id}>
                        <TableCell className="text-sm">{new Date(a.notified_at).toLocaleString("pt-BR")}</TableCell>
                        <TableCell className="max-w-xs truncate">{a.url.replace("https://www.patroseguros.com.br", "")}</TableCell>
                        <TableCell className="text-xs">{a.previous_state ?? "—"}</TableCell>
                        <TableCell className="text-xs">{a.new_state}</TableCell>
                        <TableCell>
                          <Badge variant={a.transition_type === "discovered_to_indexed" ? "default" : a.transition_type === "deindexed" ? "destructive" : "secondary"}>
                            {a.transition_type}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}