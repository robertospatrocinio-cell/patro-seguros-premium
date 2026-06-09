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
  const [loading, setLoading] = useState(false);

  const runAudit = useCallback(async () => {
    setLoading(true);
    const newResults: SchemaCheckResult[] = [];
    
    for (const path of PAGES_TO_CHECK) {
      const res = await checkPageSchemas(path);
      newResults.push(res);
    }
    
    setResults(newResults);
    setLoading(false);
  }, []);

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
      </main>

      <Footer />
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
