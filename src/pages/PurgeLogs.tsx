import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { RefreshCw, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface PurgeLog {
  id: string;
  action: string;
  tags: string[] | null;
  total_urls: number;
  purged_urls: string[] | null;
  results: unknown;
  success: boolean;
  error_message: string | null;
  created_at: string;
}

const PurgeLogs = () => {
  const [logs, setLogs] = useState<PurgeLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [urlsInput, setUrlsInput] = useState("");
  const [purgeSecret, setPurgeSecret] = useState("");
  const [purging, setPurging] = useState(false);

  const handlePurgeUrls = async () => {
    if (!purgeSecret.trim()) {
      toast.error("Informe o token de autenticação (PURGE_SECRET).");
      return;
    }
    const urls = urlsInput
      .split("\n")
      .map((u) => u.trim())
      .filter((u) => u.length > 0);
    if (urls.length === 0) {
      toast.error("Informe ao menos uma URL ou path (ex: / ou /seguro-auto).");
      return;
    }
    setPurging(true);
    try {
      const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
      const res = await fetch(
        `https://${projectId}.supabase.co/functions/v1/purge-cache`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${purgeSecret}`,
          },
          body: JSON.stringify({ urls }),
        }
      );
      const data = await res.json();
      if (res.ok && data.action) {
        toast.success(`Purga concluída: ${data.total_urls} URL(s) invalidadas.`);
        setUrlsInput("");
        fetchLogs();
      } else {
        toast.error(data.error || "Erro ao purgar cache.");
      }
    } catch (err: any) {
      toast.error("Falha na requisição: " + (err.message || "erro desconhecido"));
    } finally {
      setPurging(false);
    }
  };

  const fetchLogs = async () => {
    if (!purgeSecret.trim()) {
      setLogs([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
      const res = await fetch(`https://${projectId}.supabase.co/functions/v1/purge-cache`, {
        method: "GET",
        headers: { Authorization: `Bearer ${purgeSecret}` },
      });
      const data = await res.json();
      if (res.ok) {
        setLogs((data.logs || []) as PurgeLog[]);
      } else {
        setLogs([]);
        toast.error(data.error || "Não foi possível carregar os logs.");
      }
    } catch (err: any) {
      setLogs([]);
      toast.error("Falha ao carregar logs: " + (err.message || "erro desconhecido"));
    }
    setLoading(false);
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "medium" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-[hsl(var(--primary))]">
            Logs de Purga do Cache
          </h1>
          <Button variant="outline" size="sm" onClick={fetchLogs} disabled={loading || !purgeSecret.trim()}>
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Atualizar
          </Button>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg">Purgar URLs Específicas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Token (PURGE_SECRET)</label>
              <Input
                type="password"
                placeholder="Cole seu PURGE_SECRET aqui"
                value={purgeSecret}
                onChange={(e) => setPurgeSecret(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Necessário para purgar cache e consultar os logs operacionais.
              </p>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">URLs / Paths (uma por linha)</label>
              <Textarea
                placeholder={"/ \n/seguro-auto\n/planos-de-saude\nhttps://www.patroseguros.com.br/blog"}
                value={urlsInput}
                onChange={(e) => setUrlsInput(e.target.value)}
                rows={5}
                className="font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Paths relativos (ex: /seguro-auto) serão prefixados com https://www.patroseguros.com.br
              </p>
            </div>
            <Button onClick={handlePurgeUrls} disabled={purging}>
              {purging ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Send className="w-4 h-4 mr-2" />}
              {purging ? "Purgando..." : "Purgar Cache"}
            </Button>
          </CardContent>
        </Card>

        {logs.length === 0 && !loading && purgeSecret.trim() && (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              Nenhum log de purga encontrado. Execute uma purga para ver os resultados aqui.
            </CardContent>
          </Card>
        )}

        {logs.length === 0 && !loading && !purgeSecret.trim() && (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              Informe o PURGE_SECRET acima e clique em Atualizar para carregar os logs.
            </CardContent>
          </Card>
        )}

        {logs.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Últimas 50 purgas</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="w-full">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[160px]">Data</TableHead>
                      <TableHead className="w-[120px]">Ação</TableHead>
                      <TableHead className="w-[100px]">Status</TableHead>
                      <TableHead>Tags</TableHead>
                      <TableHead className="w-[80px] text-center">URLs</TableHead>
                      <TableHead className="w-[100px]">Detalhes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {logs.map((log) => (
                      <>
                        <TableRow key={log.id} className="cursor-pointer hover:bg-muted/50" onClick={() => setExpandedId(expandedId === log.id ? null : log.id)}>
                          <TableCell className="text-sm">{formatDate(log.created_at)}</TableCell>
                          <TableCell>
                            <Badge variant={log.action === "purge_all" ? "destructive" : "secondary"}>
                              {log.action === "purge_all" ? "Purge Total" : log.action === "purge_by_tag" ? "Por Tags" : log.action === "purge_by_url" ? "Por URLs" : log.action}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={log.success ? "default" : "destructive"} className={log.success ? "bg-green-600" : ""}>
                              {log.success ? "Sucesso" : "Erro"}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm">
                            {log.tags?.join(", ") || "—"}
                          </TableCell>
                          <TableCell className="text-center text-sm font-medium">
                            {log.total_urls}
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              {expandedId === log.id ? "Fechar" : "Ver"}
                            </Button>
                          </TableCell>
                        </TableRow>
                        {expandedId === log.id && (
                          <TableRow key={`${log.id}-detail`}>
                            <TableCell colSpan={6} className="bg-muted/30 p-4">
                              {log.error_message && (
                                <p className="text-destructive text-sm mb-2">
                                  <strong>Erro:</strong> {log.error_message}
                                </p>
                              )}
                              {log.purged_urls && log.purged_urls.length > 0 && (
                                <div className="mb-2">
                                  <p className="text-sm font-semibold mb-1">URLs purgadas:</p>
                                  <div className="max-h-40 overflow-y-auto text-xs font-mono bg-background rounded p-2 border">
                                    {log.purged_urls.map((url, i) => (
                                      <div key={i} className="py-0.5">{url}</div>
                                    ))}
                                  </div>
                                </div>
                              )}
                              {log.results && (
                                <div>
                                  <p className="text-sm font-semibold mb-1">Resultado Cloudflare:</p>
                                  <pre className="text-xs bg-background rounded p-2 border overflow-x-auto max-h-40">
                                    {JSON.stringify(log.results, null, 2)}
                                  </pre>
                                </div>
                              )}
                            </TableCell>
                          </TableRow>
                        )}
                      </>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default PurgeLogs;