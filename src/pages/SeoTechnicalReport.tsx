import { useCallback, useEffect, useMemo, useState } from "react";
import { AlertTriangle, CheckCircle2, FileSearch, RefreshCw, XCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type CheckStatus = "checking" | "ok" | "warn" | "fail";

interface SeoCheck {
  key: string;
  title: string;
  status: CheckStatus;
  summary: string;
  details: string[];
}

const REQUIRED_SITEMAP_ROUTES = ["/", "/cotacao", "/seguro-auto", "/faq", "/blog"];

const statusLabel: Record<CheckStatus, string> = {
  checking: "Verificando",
  ok: "OK",
  warn: "Atenção",
  fail: "Falha",
};

const statusIcon = {
  checking: RefreshCw,
  ok: CheckCircle2,
  warn: AlertTriangle,
  fail: XCircle,
};

const badgeVariant = (status: CheckStatus) => {
  if (status === "fail") return "destructive" as const;
  if (status === "ok") return "default" as const;
  return "secondary" as const;
};

const sameOriginUrl = (path: string) => `${window.location.origin}${path}`;

const SeoTechnicalReport = () => {
  const [checks, setChecks] = useState<SeoCheck[]>([]);
  const [running, setRunning] = useState(false);
  const [lastRun, setLastRun] = useState<string | null>(null);

  const overallStatus = useMemo<CheckStatus>(() => {
    if (running || checks.some((check) => check.status === "checking")) return "checking";
    if (checks.some((check) => check.status === "fail")) return "fail";
    if (checks.some((check) => check.status === "warn")) return "warn";
    return checks.length > 0 ? "ok" : "checking";
  }, [checks, running]);

  const updateCheck = useCallback((next: SeoCheck) => {
    setChecks((current) => current.map((check) => (check.key === next.key ? next : check)));
  }, []);

  const validateFaqSchema = useCallback(async () => {
    return new Promise<SeoCheck>((resolve) => {
      const iframe = document.createElement("iframe");
      iframe.src = "/faq";
      iframe.title = "Validação FAQ Schema";
      iframe.style.position = "absolute";
      iframe.style.width = "1px";
      iframe.style.height = "1px";
      iframe.style.opacity = "0";
      iframe.style.pointerEvents = "none";
      iframe.style.border = "0";

      const cleanup = () => iframe.remove();
      const timeout = window.setTimeout(() => {
        cleanup();
        resolve({
          key: "faq-schema",
          title: "FAQ Schema",
          status: "fail",
          summary: "Não foi possível carregar a página /faq para validar o JSON-LD.",
          details: ["Tempo limite excedido ao carregar /faq no validador interno."],
        });
      }, 8000);

      iframe.onload = () => {
        window.setTimeout(() => {
          window.clearTimeout(timeout);
          try {
            const doc = iframe.contentDocument;
            const scripts = Array.from(doc?.querySelectorAll('script[type="application/ld+json"]') || []);
            const parsed = scripts.flatMap((script) => {
              try {
                const data = JSON.parse(script.textContent || "{}");
                return Array.isArray(data) ? data : [data];
              } catch {
                return [];
              }
            });
            const faqSchema = parsed.find((item) => item?.["@type"] === "FAQPage");
            const questionCount = Array.isArray(faqSchema?.mainEntity) ? faqSchema.mainEntity.length : 0;

            cleanup();
            resolve({
              key: "faq-schema",
              title: "FAQ Schema",
              status: faqSchema && questionCount > 0 ? "ok" : "fail",
              summary: faqSchema && questionCount > 0
                ? `FAQPage encontrado com ${questionCount} pergunta(s).`
                : "FAQPage não encontrado ou sem perguntas válidas.",
              details: [
                `Página validada: ${sameOriginUrl("/faq")}`,
                `Scripts JSON-LD encontrados: ${scripts.length}`,
                `Perguntas em mainEntity: ${questionCount}`,
              ],
            });
          } catch (error) {
            cleanup();
            resolve({
              key: "faq-schema",
              title: "FAQ Schema",
              status: "fail",
              summary: "Erro ao inspecionar o FAQ Schema renderizado.",
              details: [error instanceof Error ? error.message : "Erro desconhecido"],
            });
          }
        }, 500);
      };

      document.body.appendChild(iframe);
    });
  }, []);

  const validateSitemap = useCallback(async (): Promise<SeoCheck> => {
    try {
      const response = await fetch("/sitemap.xml", { cache: "no-store" });
      const text = await response.text();
      const urlCount = (text.match(/<url>/g) || []).length;
      const missingRoutes = REQUIRED_SITEMAP_ROUTES.filter((route) => !text.includes(sameOriginUrl(route)) && !text.includes(`patroseguros.com.br${route}`));
      const isXml = text.includes("<urlset") || text.includes("<sitemapindex");

      return {
        key: "sitemap",
        title: "sitemap.xml",
        status: response.ok && isXml && missingRoutes.length === 0 ? "ok" : response.ok && isXml ? "warn" : "fail",
        summary: response.ok ? `HTTP ${response.status}, ${urlCount} URL(s) detectada(s).` : `HTTP ${response.status}.`,
        details: [
          `Arquivo: ${sameOriginUrl("/sitemap.xml")}`,
          `Formato XML reconhecido: ${isXml ? "sim" : "não"}`,
          missingRoutes.length ? `Rotas estratégicas ausentes: ${missingRoutes.join(", ")}` : "Rotas estratégicas encontradas.",
        ],
      };
    } catch (error) {
      return {
        key: "sitemap",
        title: "sitemap.xml",
        status: "fail",
        summary: "Não foi possível acessar o sitemap.xml.",
        details: [error instanceof Error ? error.message : "Erro desconhecido"],
      };
    }
  }, []);

  const validateRobots = useCallback(async (): Promise<SeoCheck> => {
    try {
      const response = await fetch("/robots.txt", { cache: "no-store" });
      const text = await response.text();
      const hasSitemap = /sitemap:\s*https?:\/\//i.test(text);
      const blocksAll = /disallow:\s*\/$/im.test(text);
      const hasUserAgent = /user-agent:\s*\*/i.test(text);

      return {
        key: "robots",
        title: "robots.txt",
        status: response.ok && hasSitemap && hasUserAgent && !blocksAll ? "ok" : response.ok ? "warn" : "fail",
        summary: response.ok ? `HTTP ${response.status}, ${text.split("\n").filter(Boolean).length} linha(s) úteis.` : `HTTP ${response.status}.`,
        details: [
          `Arquivo: ${sameOriginUrl("/robots.txt")}`,
          `User-agent global: ${hasUserAgent ? "presente" : "ausente"}`,
          `Sitemap declarado: ${hasSitemap ? "sim" : "não"}`,
          `Bloqueio total detectado: ${blocksAll ? "sim" : "não"}`,
        ],
      };
    } catch (error) {
      return {
        key: "robots",
        title: "robots.txt",
        status: "fail",
        summary: "Não foi possível acessar o robots.txt.",
        details: [error instanceof Error ? error.message : "Erro desconhecido"],
      };
    }
  }, []);

  const runValidation = useCallback(async () => {
    setRunning(true);
    setChecks([
      { key: "faq-schema", title: "FAQ Schema", status: "checking", summary: "Validando JSON-LD renderizado em /faq...", details: [] },
      { key: "sitemap", title: "sitemap.xml", status: "checking", summary: "Consultando /sitemap.xml...", details: [] },
      { key: "robots", title: "robots.txt", status: "checking", summary: "Consultando /robots.txt...", details: [] },
    ]);

    const [faqSchema, sitemap, robots] = await Promise.all([
      validateFaqSchema(),
      validateSitemap(),
      validateRobots(),
    ]);

    updateCheck(faqSchema);
    updateCheck(sitemap);
    updateCheck(robots);
    setLastRun(new Date().toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "medium" }));
    setRunning(false);
  }, [updateCheck, validateFaqSchema, validateRobots, validateSitemap]);

  useEffect(() => {
    runValidation();
  }, [runValidation]);

  const OverallIcon = statusIcon[overallStatus];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PageMeta
        title="Relatório SEO Técnico"
        description="Validação interna de FAQ Schema, sitemap.xml e robots.txt da Patro Seguros."
        noindex
      />
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <section className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <FileSearch className="h-4 w-4" />
              Auditoria interna
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-primary">Relatório SEO Técnico</h1>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              Validação automática dos arquivos e marcações essenciais para indexação.
            </p>
          </div>
          <Button onClick={runValidation} disabled={running}>
            <RefreshCw className={`mr-2 h-4 w-4 ${running ? "animate-spin" : ""}`} />
            {running ? "Validando..." : "Gerar relatório"}
          </Button>
        </section>

        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0">
            <CardTitle className="flex items-center gap-2 text-lg">
              <OverallIcon className={`h-5 w-5 ${overallStatus === "checking" ? "animate-spin" : ""}`} />
              Status geral
            </CardTitle>
            <Badge variant={badgeVariant(overallStatus)}>{statusLabel[overallStatus]}</Badge>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            {lastRun ? `Última validação: ${lastRun}` : "A validação será executada automaticamente ao abrir esta página."}
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-3">
          {checks.map((check) => {
            const Icon = statusIcon[check.status];
            return (
              <Card key={check.key}>
                <CardHeader className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Icon className={`h-5 w-5 ${check.status === "checking" ? "animate-spin" : ""}`} />
                      {check.title}
                    </CardTitle>
                    <Badge variant={badgeVariant(check.status)}>{statusLabel[check.status]}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{check.summary}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {check.details.length > 0 ? check.details.map((detail) => (
                      <li key={detail} className="border-l-2 border-border pl-3">{detail}</li>
                    )) : <li className="border-l-2 border-border pl-3">Aguardando resultado.</li>}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SeoTechnicalReport;