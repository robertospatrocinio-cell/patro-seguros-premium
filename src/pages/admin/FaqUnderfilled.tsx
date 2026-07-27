import { useEffect, useMemo, useState } from "react";
import { RefreshCw, CheckCircle2, Clipboard, Terminal, FileText, AlertTriangle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

type SuggestedFaq = { q: string; a: string };
type UnderfilledItem = {
  slug: string;
  title: string;
  category: string | null;
  currentCount: number;
  suggested: SuggestedFaq[];
};
type Report = { generatedAt: string; total: number; items: UnderfilledItem[] };

const REPORT_URL = "/admin/faq-underfilled.json";
const APPLY_CMD = "node scripts/detect-faq-underfilled.mjs --apply";

/** Serializa apenas as entradas aprovadas no mesmo formato de `blogFaqBackfill.ts`. */
function serializeApproved(approved: Record<string, SuggestedFaq[]>): string {
  const slugs = Object.keys(approved).sort();
  if (slugs.length === 0) return "// (nenhuma sugestão aprovada)";
  const body = slugs
    .map((slug) => {
      const rows = approved[slug]
        .map((f) => `    { q: ${JSON.stringify(f.q)}, a: ${JSON.stringify(f.a)} },`)
        .join("\n");
      return `  ${JSON.stringify(slug)}: [\n${rows}\n  ],`;
    })
    .join("\n");
  return `// Cole dentro do objeto exportado em src/data/blogFaqBackfill.ts:\n${body}`;
}

async function copy(text: string, label: string) {
  try {
    await navigator.clipboard.writeText(text);
    toast.success(`${label} copiado para a área de transferência`);
  } catch {
    toast.error("Falha ao copiar. Selecione manualmente.");
  }
}

export default function FaqUnderfilled() {
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Chave por slug -> Set de índices aprovados. Padrão: todos marcados.
  const [approvals, setApprovals] = useState<Record<string, Set<number>>>({});

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${REPORT_URL}?t=${Date.now()}`, { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: Report = await res.json();
      setReport(data);
      const init: Record<string, Set<number>> = {};
      for (const it of data.items) {
        init[it.slug] = new Set(it.suggested.map((_, i) => i));
      }
      setApprovals(init);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const approvedMap = useMemo<Record<string, SuggestedFaq[]>>(() => {
    if (!report) return {};
    const out: Record<string, SuggestedFaq[]> = {};
    for (const it of report.items) {
      const picks = approvals[it.slug] ?? new Set<number>();
      const arr = it.suggested.filter((_, i) => picks.has(i));
      if (arr.length > 0) out[it.slug] = arr;
    }
    return out;
  }, [report, approvals]);

  const approvedTotal = useMemo(
    () => Object.values(approvedMap).reduce((n, arr) => n + arr.length, 0),
    [approvedMap],
  );

  const toggle = (slug: string, idx: number) => {
    setApprovals((prev) => {
      const cur = new Set(prev[slug] ?? []);
      if (cur.has(idx)) cur.delete(idx);
      else cur.add(idx);
      return { ...prev, [slug]: cur };
    });
  };

  const setAll = (slug: string, item: UnderfilledItem, on: boolean) => {
    setApprovals((prev) => ({
      ...prev,
      [slug]: on ? new Set(item.suggested.map((_, i) => i)) : new Set(),
    }));
  };

  return (
    <>
      <Header />
      <main className="container mx-auto max-w-5xl px-4 py-24">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">FAQ Underfilled</h1>
            <p className="text-muted-foreground mt-1">
              Posts do blog com menos de 2 Q&A no <code>FAQPage</code> — aprove as sugestões e aplique com um clique.
            </p>
          </div>
          <Button variant="outline" onClick={load} disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Recarregar
          </Button>
        </div>

        {error && (
          <Card className="mb-6 border-destructive">
            <CardContent className="pt-6 flex gap-3 items-start">
              <AlertTriangle className="text-destructive w-5 h-5 mt-0.5" />
              <div>
                <p className="font-medium">Não foi possível carregar o relatório.</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Gere-o com <code>node scripts/detect-faq-underfilled.mjs</code> — o script grava{" "}
                  <code>public/admin/faq-underfilled.json</code>.
                </p>
                <p className="text-xs text-muted-foreground mt-2">Erro: {error}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {report && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Resumo
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground">Posts underfilled</div>
                <div className="text-2xl font-semibold">{report.total}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Q&A aprovadas</div>
                <div className="text-2xl font-semibold">{approvedTotal}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Gerado em</div>
                <div className="text-xs">{new Date(report.generatedAt).toLocaleString("pt-BR")}</div>
              </div>
            </CardContent>
          </Card>
        )}

        {report && report.total === 0 && !error && (
          <Card>
            <CardContent className="pt-6 flex items-center gap-3">
              <CheckCircle2 className="text-green-600 w-6 h-6" />
              <p>Nenhum post com FAQPage abaixo do mínimo. 🎉</p>
            </CardContent>
          </Card>
        )}

        {report && report.total > 0 && (
          <>
            <Card className="mb-4 bg-muted/40">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Terminal className="w-4 h-4" /> Aplicar as sugestões
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p className="text-muted-foreground">
                  Por segurança, o navegador não pode escrever em <code>src/data/blogFaqBackfill.ts</code>. Escolha uma das
                  opções:
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button
                    onClick={() => copy(serializeApproved(approvedMap), "Snippet TS das aprovadas")}
                    disabled={approvedTotal === 0}
                  >
                    <Clipboard className="w-4 h-4 mr-2" />
                    Copiar snippet TS ({approvedTotal})
                  </Button>
                  <Button variant="outline" onClick={() => copy(APPLY_CMD, "Comando --apply")}>
                    <Terminal className="w-4 h-4 mr-2" />
                    Copiar comando --apply
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  O comando <code>--apply</code> regenera <code>blogFaqBackfill.ts</code> a partir do mesmo relatório —
                  sempre com dedupe e sem sobrescrever entradas existentes.
                </p>
              </CardContent>
            </Card>

            <div className="space-y-4">
              {report.items.map((item) => {
                const picks = approvals[item.slug] ?? new Set<number>();
                const allOn = picks.size === item.suggested.length;
                return (
                  <Card key={item.slug}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <CardTitle className="text-base">{item.title}</CardTitle>
                          <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-muted-foreground">
                            <code className="bg-muted px-1.5 py-0.5 rounded">{item.slug}</code>
                            {item.category && <Badge variant="secondary">{item.category}</Badge>}
                            <Badge variant="outline">{item.currentCount} Q&A atuais</Badge>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setAll(item.slug, item, !allOn)}
                        >
                          {allOn ? "Desmarcar todas" : "Marcar todas"}
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {item.suggested.map((s, idx) => {
                        const id = `${item.slug}-${idx}`;
                        const on = picks.has(idx);
                        return (
                          <label
                            key={id}
                            htmlFor={id}
                            className={`flex gap-3 p-3 rounded-md border cursor-pointer transition-colors ${
                              on ? "border-primary bg-primary/5" : "border-muted"
                            }`}
                          >
                            <Checkbox id={id} checked={on} onCheckedChange={() => toggle(item.slug, idx)} />
                            <div className="flex-1 space-y-1">
                              <p className="font-medium text-sm">Q: {s.q}</p>
                              <p className="text-sm text-muted-foreground">A: {s.a}</p>
                            </div>
                          </label>
                        );
                      })}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}