import { useState, useCallback, useEffect } from "react";
import PageMeta from "@/components/PageMeta";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { checkPageSchemas, type SchemaCheckResult } from "@/lib/schemaValidator";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Loader2, Search, History, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const PAGES_TO_CHECK = [
  "/seguro-auto",
  "/seguro-bmw",
  "/seguro-vida",
  "/seguro-residencial",
  "/seguro-empresarial",
  "/seguro-moto",
  "/seguro-porsche",
  "/seguro-audi",
  "/seguro-land-rover",
  "/seguro-mercedes",
  "/seguro-volvo"
];

export default function SchemaDashboard() {
  const [results, setResults] = useState<SchemaCheckResult[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchHistory = useCallback(async () => {
    const { data } = await supabase
      .from('schema_audits')
      .select('*')
      .order('executed_at', { ascending: false })
      .limit(50);
    
    if (data) setHistory(data);
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const runAudit = useCallback(async () => {
    setLoading(true);
    const newResults: SchemaCheckResult[] = [];
    
    for (const path of PAGES_TO_CHECK) {
      const res = await checkPageSchemas(path);
      newResults.push(res);
    }
    
    setResults(newResults);
    await fetchHistory();
    setLoading(false);
  }, [fetchHistory]);

  return (
    <div className="min-h-screen bg-background">
      <PageMeta 
        title="Painel de Auditoria de SEO | Patro Seguros" 
        description="Painel interno para validação técnica de schemas e dados estruturados."
      />
      <Header />
      
      <main className="container max-w-5xl mx-auto pt-28 pb-16 px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary mb-2 flex items-center gap-2">
              <Search className="h-8 w-8" /> Auditoria de Dados Estruturados
            </h1>
            <p className="text-muted-foreground">
              Verifica a presença e validade dos schemas JSON-LD (Breadcrumb, FAQ, Rating) nas páginas de cotação.
            </p>
          </div>
          <Button onClick={runAudit} disabled={loading} size="lg" className="rounded-xl">
            {loading ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verificando...</>
            ) : (
              "Executar Auditoria Agora"
            )}
          </Button>
        </div>

        <div className="grid gap-4">
          {results.length > 0 ? (
            results.map((res, i) => (
              <div key={i} className="premium-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1 truncate">{res.url.replace("https://www.patroseguros.com.br", "")}</h3>
                  <p className="text-xs text-muted-foreground font-mono">{res.url}</p>
                </div>
                
                <div className="flex flex-wrap gap-6">
                  <StatusItem label="Breadcrumb" active={res.hasBreadcrumb} />
                  <StatusItem label="FAQPage" active={res.hasFAQ} />
                  <StatusItem label="Rating" active={res.hasAggregateRating} />
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-muted/20 rounded-2xl border-2 border-dashed">
              <p className="text-muted-foreground">Nenhuma auditoria executada recentemente.</p>
              <Button variant="link" onClick={runAudit} className="mt-2">Iniciar primeira verificação</Button>
            </div>
          )}
        </div>
        
        {results.some(r => r.errors.length > 0) && (
          <div className="mt-8 p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-xl text-red-600 dark:text-red-400 text-sm">
            <h4 className="font-bold mb-2 uppercase text-xs tracking-widest">Erros Detectados:</h4>
            <ul className="list-disc pl-5 space-y-1">
              {results.flatMap(r => r.errors).map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-16">
          <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
            <History className="h-6 w-6" /> Histórico de Auditorias
          </h2>
          
          <div className="grid gap-4">
            {history.length > 0 ? (
              history.map((item) => (
                <Card key={item.id} className="bg-muted/30 border-none">
                  <CardHeader className="py-4 flex flex-row items-center justify-between space-y-0">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">
                        {format(new URL(item.executed_at), "dd 'de' MMMM, HH:mm", { locale: ptBR })}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-muted-foreground">{item.page_path}</span>
                  </CardHeader>
                  <CardContent className="pb-4 pt-0">
                    <div className="flex gap-4">
                      <StatusBadge active={item.has_breadcrumb} label="Breadcrumb" />
                      <StatusBadge active={item.has_faq} label="FAQ" />
                      <StatusBadge active={item.has_rating} label="Rating" />
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-muted-foreground text-center py-10 italic">Nenhum histórico disponível.</p>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function StatusBadge({ active, label }: { active: boolean, label: string }) {
  return (
    <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase ${active ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-600'}`}>
      {active ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
      {label}
    </div>
  );
}

function StatusItem({ label, active }: { label: string, active: boolean }) {
  return (
    <div className="flex items-center gap-2">
      {active ? (
        <CheckCircle className="h-5 w-5 text-green-500" />
      ) : (
        <XCircle className="h-5 w-5 text-red-500" />
      )}
      <span className={`text-sm font-semibold ${active ? "text-foreground" : "text-red-500"}`}>
        {label}
      </span>
    </div>
  );
}
