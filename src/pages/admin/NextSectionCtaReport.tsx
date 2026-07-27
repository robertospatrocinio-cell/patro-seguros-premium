import { useEffect, useState } from "react";
import { RefreshCw, Trophy, MousePointerClick, Target, Users } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

type PlacementRow = {
  placement: "next-section-inline" | "next-section-list" | "next-section-mobile";
  clicks: number;
  sessions: number;
  conversions: number;
  conversion_rate: number;
  top_destination: string | null;
};

type Report = {
  window: { start: string; end: string; days: number };
  placements: PlacementRow[];
  winner: PlacementRow["placement"] | null;
  total_clicks: number;
  total_conversions: number;
};

const PLACEMENT_LABEL: Record<PlacementRow["placement"], string> = {
  "next-section-inline": "Inline (final da seção)",
  "next-section-list": "Lista rodapé (Próximas leituras)",
  "next-section-mobile": "Pill flutuante mobile",
};

const pct = (v: number) => `${(v * 100).toFixed(1)}%`;
const fmt = (n: number) => n.toLocaleString("pt-BR");

const NextSectionCtaReport = () => {
  const [days, setDays] = useState(30);
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<Report | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("next-section-cta-report", {
        body: { days },
      });
      if (error) throw error;
      setReport(data as Report);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      toast.error(`Falha ao carregar relatório: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days]);

  const rows = report?.placements ?? [];
  const bestRate = Math.max(0, ...rows.map((r) => r.conversion_rate));

  return (
    <>
      <PageMeta
        title="Relatório CTA Próxima Seção · Admin"
        description="Conversão comparada entre placements de CTA de próxima seção (inline, lista, mobile)."
      />
      <Header />
      <main id="main-content" tabIndex={-1} className="min-h-screen bg-muted/20 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-6xl space-y-8">
          <header className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">CTA Próxima Seção — Conversão por placement</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Compare a taxa de conversão dos três placements de CTA que empurram o leitor para a próxima seção do cluster.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Select value={String(days)} onValueChange={(v) => setDays(Number(v))}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">Últimos 7 dias</SelectItem>
                  <SelectItem value="14">Últimos 14 dias</SelectItem>
                  <SelectItem value="30">Últimos 30 dias</SelectItem>
                  <SelectItem value="60">Últimos 60 dias</SelectItem>
                  <SelectItem value="90">Últimos 90 dias</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" onClick={load} disabled={loading}>
                <RefreshCw className={`h-4 w-4 mr-1 ${loading ? "animate-spin" : ""}`} />
                Atualizar
              </Button>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <MetricCard icon={<MousePointerClick className="h-4 w-4" />} label="Cliques totais" value={fmt(report?.total_clicks ?? 0)} />
            <MetricCard icon={<Users className="h-4 w-4" />} label="Sessões" value={fmt(rows.reduce((s, r) => s + r.sessions, 0))} />
            <MetricCard icon={<Target className="h-4 w-4" />} label="Conversões atribuídas" value={fmt(report?.total_conversions ?? 0)} />
            <MetricCard
              icon={<Trophy className="h-4 w-4" />}
              label="Placement vencedor"
              value={report?.winner ? PLACEMENT_LABEL[report.winner] : "—"}
              hint={report?.winner ? "Maior conversion rate (≥5 sessões)" : "Amostra insuficiente"}
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Comparativo por placement</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Placement</TableHead>
                    <TableHead className="text-right">Cliques</TableHead>
                    <TableHead className="text-right">Sessões</TableHead>
                    <TableHead className="text-right">Conversões</TableHead>
                    <TableHead className="text-right">Conv. rate</TableHead>
                    <TableHead>Top destino</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                        {loading ? "Carregando…" : "Sem cliques no período."}
                      </TableCell>
                    </TableRow>
                  )}
                  {rows.map((r) => {
                    const isWinner = report?.winner === r.placement;
                    const isBest = r.conversion_rate === bestRate && bestRate > 0;
                    return (
                      <TableRow key={r.placement} className={isWinner ? "bg-primary/5" : undefined}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            {PLACEMENT_LABEL[r.placement]}
                            {isWinner && (
                              <Badge variant="default" className="gap-1">
                                <Trophy className="h-3 w-3" /> vencedor
                              </Badge>
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground font-mono">{r.placement}</div>
                        </TableCell>
                        <TableCell className="text-right tabular-nums">{fmt(r.clicks)}</TableCell>
                        <TableCell className="text-right tabular-nums">{fmt(r.sessions)}</TableCell>
                        <TableCell className="text-right tabular-nums">{fmt(r.conversions)}</TableCell>
                        <TableCell className={`text-right tabular-nums ${isBest ? "font-semibold text-primary" : ""}`}>
                          {pct(r.conversion_rate)}
                        </TableCell>
                        <TableCell className="text-xs font-mono text-muted-foreground truncate max-w-[240px]">
                          {r.top_destination ?? "—"}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              {report && (
                <p className="text-xs text-muted-foreground mt-4">
                  Janela: {new Date(report.window.start).toLocaleDateString("pt-BR")} → {new Date(report.window.end).toLocaleDateString("pt-BR")}
                  {" · "}Conversão = sessão com evento em <code>conversion_click_events</code> após o clique no CTA.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
};

const MetricCard = ({ icon, label, value, hint }: { icon: React.ReactNode; label: string; value: string; hint?: string }) => (
  <Card>
    <CardContent className="pt-6">
      <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
        {icon}
        {label}
      </div>
      <div className="mt-2 text-2xl font-bold text-foreground truncate">{value}</div>
      {hint && <div className="text-xs text-muted-foreground mt-1">{hint}</div>}
    </CardContent>
  </Card>
);

export default NextSectionCtaReport;