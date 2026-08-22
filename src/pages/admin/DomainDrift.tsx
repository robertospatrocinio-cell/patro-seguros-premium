import { useEffect, useMemo, useState } from "react";
import { RefreshCw, CheckCircle2, AlertTriangle, XCircle, Globe } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

type Check = {
  id: string;
  hostname: string;
  checked_at: string;
  status: "ok" | "drifted" | "error";
  reasons: string[] | null;
  dns_a: string[] | null;
  dns_cname: string[] | null;
  txt_lovable: string[] | null;
  expected_ip: string | null;
  http_status: number | null;
  final_url: string | null;
  redirect_chain: { url: string; status: number; location: string | null }[] | null;
};

const STATUS_META = {
  ok: { label: "OK", icon: CheckCircle2, variant: "secondary" as const },
  drifted: { label: "Drifted", icon: AlertTriangle, variant: "destructive" as const },
  error: { label: "Erro", icon: XCircle, variant: "destructive" as const },
};

function fmt(iso: string) {
  return new Date(iso).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });
}

function since(iso: string) {
  const ms = Date.now() - new Date(iso).getTime();
  const h = Math.floor(ms / 3600000);
  if (h < 1) return `${Math.max(1, Math.floor(ms / 60000))} min`;
  if (h < 48) return `${h} h`;
  return `${Math.floor(h / 24)} dias`;
}

export default function DomainDrift() {
  const [checks, setChecks] = useState<Check[]>([]);
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("domain_health_checks")
      .select("*")
      .order("checked_at", { ascending: false })
      .limit(300);
    if (error) toast.error(`Erro ao carregar histórico: ${error.message}`);
    setChecks((data ?? []) as unknown as Check[]);
    setLoading(false);
  };

  useEffect(() => {
    void load();
  }, []);

  const runCheck = async () => {
    setRunning(true);
    const { error } = await supabase.functions.invoke("domain-drift-check", { body: {} });
    if (error) toast.error(`Falha na verificação: ${error.message}`);
    else toast.success("Verificação concluída");
    setRunning(false);
    void load();
  };

  // Agrupa por hostname e calcula desde quando o status atual vigora
  const hosts = useMemo(() => {
    const map = new Map<string, Check[]>();
    for (const c of checks) {
      const arr = map.get(c.hostname) ?? [];
      arr.push(c);
      map.set(c.hostname, arr);
    }
    return Array.from(map.entries()).map(([hostname, list]) => {
      const latest = list[0];
      // list está em ordem decrescente: encontra a primeira verificação
      // (mais antiga contínua) com o mesmo status do atual
      let changedAt = latest.checked_at;
      for (const c of list) {
        if (c.status !== latest.status) break;
        changedAt = c.checked_at;
      }
      const transitions = list
        .map((c, i) => ({ c, prev: list[i + 1] }))
        .filter((x) => x.prev && x.prev.status !== x.c.status)
        .map((x) => ({ at: x.c.checked_at, from: x.prev!.status, to: x.c.status, reasons: x.c.reasons ?? [] }));
      return { hostname, latest, list, changedAt, transitions };
    });
  }, [checks]);

  return (
    <div className="min-h-screen bg-background">
      <PageMeta title="Drift de domínio | Admin" description="Monitoramento de drift de DNS e hostname" noindex />
      <Header />
      <main className="container mx-auto px-4 py-10 space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Globe className="h-6 w-6" /> Detecção de drift de domínio
            </h1>
            <p className="text-muted-foreground text-sm">
              Quando e por que cada hostname saiu da configuração esperada, com histórico completo de verificações.
            </p>
          </div>
          <Button onClick={runCheck} disabled={running}>
            <RefreshCw className={`h-4 w-4 mr-2 ${running ? "animate-spin" : ""}`} />
            Verificar agora
          </Button>
        </div>

        {loading && <p className="text-muted-foreground">Carregando…</p>}
        {!loading && checks.length === 0 && (
          <p className="text-muted-foreground">Nenhuma verificação ainda. Clique em “Verificar agora”.</p>
        )}

        {hosts.map(({ hostname, latest, list, changedAt, transitions }) => {
          const meta = STATUS_META[latest.status];
          const Icon = meta.icon;
          return (
            <Card key={hostname}>
              <CardHeader className="flex flex-row items-center justify-between gap-4">
                <CardTitle className="text-lg">{hostname}</CardTitle>
                <Badge variant={meta.variant} className="gap-1">
                  <Icon className="h-3.5 w-3.5" /> {meta.label}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2 text-sm sm:grid-cols-2">
                  <p><span className="text-muted-foreground">Status desde:</span> {fmt(changedAt)} ({since(changedAt)})</p>
                  <p><span className="text-muted-foreground">Última verificação:</span> {fmt(latest.checked_at)}</p>
                  <p><span className="text-muted-foreground">Registro A:</span> {(latest.dns_a ?? []).join(", ") || "—"} (esperado {latest.expected_ip})</p>
                  <p><span className="text-muted-foreground">TXT _lovable:</span> {(latest.txt_lovable ?? []).length ? "presente" : "ausente"}</p>
                  <p><span className="text-muted-foreground">HTTP:</span> {latest.http_status ?? "—"}</p>
                  <p className="truncate"><span className="text-muted-foreground">URL final:</span> {latest.final_url ?? "—"}</p>
                </div>

                {(latest.reasons ?? []).length > 0 && (
                  <div className="rounded-md border border-destructive/40 bg-destructive/5 p-3">
                    <p className="font-medium text-sm mb-1">Por que está marcado como drifted</p>
                    <ul className="list-disc pl-5 text-sm space-y-1">
                      {(latest.reasons ?? []).map((r, i) => <li key={i}>{r}</li>)}
                    </ul>
                  </div>
                )}

                {transitions.length > 0 && (
                  <div>
                    <p className="font-medium text-sm mb-2">Mudanças de status</p>
                    <ul className="text-sm space-y-1">
                      {transitions.slice(0, 10).map((t, i) => (
                        <li key={i}>
                          <span className="text-muted-foreground">{fmt(t.at)}</span> — {STATUS_META[t.from as Check["status"]].label} → {STATUS_META[t.to as Check["status"]].label}
                          {t.reasons.length > 0 && `: ${t.reasons[0]}`}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div>
                  <p className="font-medium text-sm mb-2">Histórico de verificações</p>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Quando</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>A</TableHead>
                        <TableHead>HTTP</TableHead>
                        <TableHead>Motivos</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {list.slice(0, 25).map((c) => (
                        <TableRow key={c.id}>
                          <TableCell className="whitespace-nowrap">{fmt(c.checked_at)}</TableCell>
                          <TableCell>{STATUS_META[c.status].label}</TableCell>
                          <TableCell>{(c.dns_a ?? []).join(", ") || "—"}</TableCell>
                          <TableCell>{c.http_status ?? "—"}</TableCell>
                          <TableCell className="text-xs">{(c.reasons ?? []).join(" • ") || "—"}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </main>
      <Footer />
    </div>
  );
}
