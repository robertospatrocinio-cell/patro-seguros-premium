import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Loader2, RefreshCw } from "lucide-react";
import { toast } from "sonner";

type Audit = {
  id: string;
  url: string;
  strategy: "mobile" | "desktop";
  performance_score: number | null;
  accessibility_score: number | null;
  best_practices_score: number | null;
  seo_score: number | null;
  lcp_ms: number | null;
  cls: number | null;
  tbt_ms: number | null;
  created_at: string;
};

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

export default function PagespeedHistory() {
  useEffect(() => {
    document.title = "Histórico PageSpeed | Patro Seguros";
    let m = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    if (!m) {
      m = document.createElement("meta");
      m.name = "robots";
      document.head.appendChild(m);
    }
    m.content = "noindex,nofollow";
  }, []);

  const [rows, setRows] = useState<Audit[]>([]);
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);
  const [url, setUrl] = useState<string>("https://www.patroseguros.com.br/");
  const [strategy, setStrategy] = useState<"mobile" | "desktop">("mobile");

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("pagespeed_audits")
      .select("*")
      .order("created_at", { ascending: true })
      .limit(1000);
    if (error) toast.error("Falha ao carregar histórico");
    setRows((data as Audit[]) ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const urls = useMemo(
    () => Array.from(new Set(rows.map((r) => r.url))).sort(),
    [rows],
  );

  const filtered = useMemo(
    () =>
      rows
        .filter((r) => r.url === url && r.strategy === strategy)
        .map((r) => ({
          date: fmtDate(r.created_at),
          Performance: r.performance_score,
          Acessibilidade: r.accessibility_score,
          "Best Practices": r.best_practices_score,
          SEO: r.seo_score,
          LCP: r.lcp_ms ? Math.round(r.lcp_ms) : null,
          CLS: r.cls != null ? Number(r.cls.toFixed(3)) : null,
          TBT: r.tbt_ms ? Math.round(r.tbt_ms) : null,
        })),
    [rows, url, strategy],
  );

  const latest = filtered[filtered.length - 1];

  const runNow = async () => {
    setRunning(true);
    toast.info("Auditoria iniciada — pode levar 1-2 minutos.");
    try {
      const { data, error } = await supabase.functions.invoke("run-pagespeed-audit");
      if (error) throw error;
      toast.success(`Auditoria concluída: ${data?.results?.length ?? 0} sucessos`);
      await load();
    } catch (e) {
      toast.error("Falha ao executar auditoria");
      console.error(e);
    } finally {
      setRunning(false);
    }
  };

  return (
    <main className="container mx-auto px-4 py-10 max-w-6xl">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold">Histórico PageSpeed Insights</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Auditoria diária automática (06:00 UTC) das páginas-chave em mobile e desktop.
            </p>
          </div>
          <Button onClick={runNow} disabled={running}>
            {running ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
            Rodar agora
          </Button>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          <Select value={url} onValueChange={setUrl}>
            <SelectTrigger className="w-[400px] max-w-full">
              <SelectValue placeholder="URL" />
            </SelectTrigger>
            <SelectContent>
              {(urls.length ? urls : ["https://www.patroseguros.com.br/"]).map((u) => (
                <SelectItem key={u} value={u}>{u}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={strategy} onValueChange={(v) => setStrategy(v as "mobile" | "desktop")}>
            <SelectTrigger className="w-[160px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mobile">Mobile</SelectItem>
              <SelectItem value="desktop">Desktop</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin" /></div>
        ) : filtered.length === 0 ? (
          <Card><CardContent className="py-10 text-center text-muted-foreground">
            Nenhuma auditoria registrada ainda. Clique em <strong>Rodar agora</strong> para a primeira coleta.
          </CardContent></Card>
        ) : (
          <>
            {latest && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[
                  ["Performance", latest.Performance],
                  ["Acessibilidade", latest.Acessibilidade],
                  ["Best Practices", latest["Best Practices"]],
                  ["SEO", latest.SEO],
                ].map(([label, value]) => (
                  <Card key={label as string}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className={`text-3xl font-bold ${
                        (value as number) >= 90 ? "text-green-600" :
                        (value as number) >= 50 ? "text-yellow-600" : "text-red-600"
                      }`}>{value ?? "—"}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            <Card className="mb-6">
              <CardHeader><CardTitle>Evolução dos scores (0-100)</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={320}>
                  <LineChart data={filtered}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" fontSize={11} />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="Performance" stroke="#003366" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="Acessibilidade" stroke="#10b981" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="Best Practices" stroke="#8b5cf6" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="SEO" stroke="#F2994A" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Core Web Vitals — LCP (ms) e TBT (ms)</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={filtered}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" fontSize={11} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="LCP" stroke="#003366" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="TBT" stroke="#F2994A" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </>
        )}
    </main>
  );
}