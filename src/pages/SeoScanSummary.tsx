import { useMemo } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, CheckCircle2, ExternalLink, FileSearch, Gauge, ListChecks, XCircle } from "lucide-react";
import PageMeta from "@/components/PageMeta";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  SEO_SCAN_FINDINGS,
  SEO_SCAN_SNAPSHOT_AT,
  type SeoFinding,
} from "@/data/seoScanSnapshot";

const stateMeta: Record<SeoFinding["state"], { label: string; tone: string; icon: typeof CheckCircle2 }> = {
  passing: { label: "OK", tone: "bg-green-500/10 text-green-700 border-green-500/30", icon: CheckCircle2 },
  failing: { label: "Falha", tone: "bg-red-500/10 text-red-700 border-red-500/30", icon: XCircle },
  ignored: { label: "Ignorado", tone: "bg-muted text-muted-foreground border-border", icon: AlertTriangle },
  pending: { label: "Pendente", tone: "bg-yellow-500/10 text-yellow-700 border-yellow-500/30", icon: AlertTriangle },
  fixed: { label: "Corrigido", tone: "bg-blue-500/10 text-blue-700 border-blue-500/30", icon: CheckCircle2 },
};

const levelLabel: Record<SeoFinding["level"], string> = {
  low: "Baixa",
  mid: "Média",
  high: "Alta",
};

export default function SeoScanSummary() {
  const { failing, passing, ignored, score, affected } = useMemo(() => {
    const failing = SEO_SCAN_FINDINGS.filter((f) => f.state === "failing");
    const passing = SEO_SCAN_FINDINGS.filter((f) => f.state === "passing");
    const ignored = SEO_SCAN_FINDINGS.filter((f) => f.state === "ignored");
    const total = SEO_SCAN_FINDINGS.length || 1;
    const score = Math.round((passing.length / total) * 100);
    const affected = Array.from(
      new Set(failing.flatMap((f) => f.affectedUrls ?? (f.link ? [f.link] : [])))
    );
    return { failing, passing, ignored, score, affected };
  }, []);

  const lastRun = new Date(SEO_SCAN_SNAPSHOT_AT).toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PageMeta
        title="Resumo do Scan SEO | Patro Seguros"
        description="Painel com o resumo do último scan SEO: métricas, achados e URLs afetadas."
        noindex
      />
      <Header />
      <main className="flex-1 container mx-auto max-w-6xl px-4 pt-28 pb-16">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
              <FileSearch className="h-4 w-4" /> Auditoria interna
            </div>
            <h1 className="text-3xl font-bold text-primary">Resumo do Scan SEO</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Snapshot da última execução: <span className="font-medium">{lastRun}</span>
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="outline" size="sm">
              <Link to="/admin/seo-tecnico">Relatório técnico</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link to="/admin/schemas">Auditoria de schemas</Link>
            </Button>
            <Button asChild variant="default" size="sm">
              <Link to="/admin/seo-monitor">Monitor contínuo</Link>
            </Button>
          </div>
        </div>

        {/* Métricas */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <MetricCard icon={Gauge} label="Saúde geral" value={`${score}%`} tone="text-primary" />
          <MetricCard icon={CheckCircle2} label="OK" value={passing.length} tone="text-green-600" />
          <MetricCard icon={XCircle} label="Falhas" value={failing.length} tone="text-red-600" />
          <MetricCard icon={ListChecks} label="Total verificado" value={SEO_SCAN_FINDINGS.length} tone="text-foreground" />
        </div>

        {/* URLs afetadas */}
        {affected.length > 0 && (
          <Card className="mb-8 border-red-500/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <ExternalLink className="h-4 w-4 text-red-600" /> Links afetados ({affected.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid gap-2 sm:grid-cols-2">
                {affected.map((url) => (
                  <li key={url} className="flex items-center gap-2 text-sm font-mono">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline truncate"
                    >
                      {url}
                    </a>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Falhas */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
            <XCircle className="h-5 w-5 text-red-600" /> Achados que precisam de atenção ({failing.length})
          </h2>
          {failing.length === 0 ? (
            <Card className="bg-green-500/5 border-green-500/30">
              <CardContent className="py-6 text-center text-sm text-green-700">
                Nenhuma falha pendente — painel zerado.
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {failing.map((f) => (
                <FindingCard key={f.finding_id} finding={f} />
              ))}
            </div>
          )}
        </section>

        {/* Passing */}
        <section>
          <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-600" /> Verificações OK ({passing.length})
          </h2>
          <div className="grid gap-3 md:grid-cols-2">
            {passing.map((f) => (
              <FindingCard key={f.finding_id} finding={f} compact />
            ))}
          </div>
        </section>

        {ignored.length > 0 && (
          <section className="mt-10">
            <h2 className="text-xl font-bold text-muted-foreground mb-4">Ignorados ({ignored.length})</h2>
            <div className="grid gap-3 md:grid-cols-2">
              {ignored.map((f) => (
                <FindingCard key={f.finding_id} finding={f} compact />
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: typeof CheckCircle2;
  label: string;
  value: string | number;
  tone: string;
}) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-wide text-muted-foreground">{label}</span>
          <Icon className={`h-4 w-4 ${tone}`} />
        </div>
        <div className={`mt-2 text-3xl font-bold ${tone}`}>{value}</div>
      </CardContent>
    </Card>
  );
}

function FindingCard({ finding, compact = false }: { finding: SeoFinding; compact?: boolean }) {
  const meta = stateMeta[finding.state];
  const Icon = meta.icon;
  return (
    <Card className={finding.state === "failing" ? "border-red-500/30" : ""}>
      <CardHeader className={compact ? "py-3" : ""}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-2">
            <Icon className={`h-4 w-4 mt-0.5 ${finding.state === "failing" ? "text-red-600" : finding.state === "passing" ? "text-green-600" : "text-muted-foreground"}`} />
            <CardTitle className="text-sm font-semibold leading-snug">{finding.name}</CardTitle>
          </div>
          <div className="flex flex-col items-end gap-1 shrink-0">
            <Badge variant="outline" className={`text-[10px] ${meta.tone}`}>{meta.label}</Badge>
            <span className="text-[10px] text-muted-foreground uppercase">{finding.category} · {levelLabel[finding.level]}</span>
          </div>
        </div>
      </CardHeader>
      {!compact && (
        <CardContent className="pt-0">
          <p className="text-sm text-muted-foreground">{finding.description}</p>
          {finding.details && (
            <div className="mt-3 rounded-md border-l-2 border-primary/40 bg-muted/30 px-3 py-2 text-xs text-foreground/80">
              {finding.details}
            </div>
          )}
          {finding.affectedUrls && finding.affectedUrls.length > 0 && (
            <div className="mt-3">
              <p className="text-[10px] font-bold uppercase text-muted-foreground mb-1">URLs afetadas</p>
              <ul className="flex flex-wrap gap-1.5">
                {finding.affectedUrls.map((u) => (
                  <li key={u} className="text-[11px] font-mono px-2 py-0.5 rounded bg-muted text-foreground/80">
                    {u}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
}