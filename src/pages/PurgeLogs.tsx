import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
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
  const [purging, setPurging] = useState(false);
  const [purgingAll, setPurgingAll] = useState(false);

  const handlePurgeUrls = async () => {
    const urls = urlsInput.split("\n").map((url) => url.trim()).filter(Boolean);
    if (!urls.length || urls.length > 300) {
      toast.error("Informe entre 1 e 300 URLs do site, uma por linha.");
      return;
    }
    setPurging(true);
    try {
      const { data, error } = await supabase.functions.invoke("purge-cache", { body: { urls } });
      if (error || data?.error || !data?.action) throw new Error("Não foi possível purgar o cache. Verifique sua sessão e tente novamente.");
      if (!data.results?.every((result: { success: boolean }) => result.success)) {
        throw new Error("Uma ou mais URLs não foram invalidadas. Consulte os logs antes de tentar novamente.");
      }
      toast.success(`Purga concluída: ${data.total_urls} URL(s) invalidadas.`);
      setUrlsInput("");
      void fetchLogs();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Falha ao purgar cache.");
    } finally {
      setPurging(false);
    }
  };

  const handlePurgeAll = async () => {
    if (!window.confirm("Deseja limpar todo o cache do site? Esta ação afeta todas as páginas.")) return;
    setPurgingAll(true);
    try {
      const { data, error } = await supabase.functions.invoke("purge-cache", {
        body: { purgeEverything: true },
      });
      if (error || data?.action !== "purge_all" || data?.success !== true) {
        throw new Error("Não foi possível limpar todo o cache. Verifique sua sessão e consulte os logs.");
      }
      toast.success("Limpeza total do cache confirmada.");
      void fetchLogs();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Falha ao limpar cache.");
    } finally {
      setPurgingAll(false);
    }
  };

  const fetchLogs = async () => {
    setLoading(true);
    try {
      // The database independently enforces administrator-only access.
      const { data, error } = await supabase.from("purge_logs")
        .select("id, action, tags, total_urls, purged_urls, results, success, error_message, created_at")
        .order("created_at", { ascending: false }).limit(50);
      if (error) throw error;
      setLogs((data || []) as PurgeLog[]);
    } catch {
      setLogs([]);
      toast.error("Não foi possível carregar os logs. Verifique sua sessão administrativa.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchLogs();
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
          <Button variant="outline" size="sm" onClick={fetchLogs} disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Atualizar
          </Button>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg">Purgar URLs Específicas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Acesso autorizado pela sua conta administrativa. Não é necessário informar nenhum segredo do servidor.
            </p>
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
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button onClick={handlePurgeUrls} disabled={purging || purgingAll}>
                {purging ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Send className="w-4 h-4 mr-2" />}
                {purging ? "Purgando..." : "Purgar URLs"}
              </Button>
              <Button variant="destructive" onClick={handlePurgeAll} disabled={purging || purgingAll}>
                {purgingAll ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <RefreshCw className="w-4 h-4 mr-2" />}
                {purgingAll ? "Limpando tudo..." : "Purgar tudo após atualizar site"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {logs.length === 0 && !loading && (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              Nenhum log de purga disponível. Clique em Atualizar para consultar novamente.
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