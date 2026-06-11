import { useState, useEffect } from "react";
import { diagnosticLogs } from "@/lib/monitoring";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle, 
  RefreshCcw, 
  Wifi, 
  WifiOff, 
  ShieldAlert, 
  Trash2, 
  History,
  FileSearch,
  CheckCircle2
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const DiagnosticPage = () => {
  const [logs, setLogs] = useState([...diagnosticLogs]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleStatusChange = () => setIsOnline(navigator.onLine);
    window.addEventListener('online', handleStatusChange);
    window.addEventListener('offline', handleStatusChange);

    const interval = setInterval(() => {
      setLogs([...diagnosticLogs]);
    }, 2000);

    return () => {
      window.removeEventListener('online', handleStatusChange);
      window.removeEventListener('offline', handleStatusChange);
      clearInterval(interval);
    };
  }, []);

  const clearLogs = () => {
    diagnosticLogs.length = 0;
    setLogs([]);
    toast.success("Logs de diagnóstico limpos.");
  };

  const handleReload = () => {
    window.location.reload();
  };

  const suggestCorrections = (log: any) => {
    const msg = log.message.toLowerCase();
    if (msg.includes("failed to fetch") || msg.includes("networkerror")) {
      return "Problema de conexão com a internet ou firewall bloqueando o acesso. Verifique sua rede.";
    }
    if (msg.includes("404")) {
      return "Arquivo não encontrado no servidor. Tente limpar o cache do navegador.";
    }
    if (msg.includes("cors")) {
      return "Bloqueio de segurança (CORS). Tente recarregar ou acessar em modo anônimo.";
    }
    if (msg.includes("undefined") || msg.includes("null")) {
      return "Erro interno de processamento de dados. Nossa equipe já foi notificada.";
    }
    return "Tente recarregar a página para resolver falhas temporárias.";
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <ShieldAlert className="w-8 h-8 text-primary" />
              Diagnóstico do Sistema
            </h1>
            <p className="text-muted-foreground mt-2">
              Análise técnica em tempo real para identificar problemas de carregamento.
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleReload} variant="outline" className="gap-2">
              <RefreshCcw className="w-4 h-4" /> Atualizar App
            </Button>
            <Button onClick={clearLogs} variant="destructive" className="gap-2" disabled={logs.length === 0}>
              <Trash2 className="w-4 h-4" /> Limpar Logs
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Status da Rede</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                {isOnline ? (
                  <>
                    <Wifi className="w-5 h-5 text-green-500" />
                    <span className="font-semibold text-green-600">Online</span>
                  </>
                ) : (
                  <>
                    <WifiOff className="w-5 h-5 text-destructive" />
                    <span className="font-semibold text-destructive">Offline</span>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Erros Detectados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">
                {logs.filter(l => l.type === 'error').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Lentidão de Rede</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-500">
                {logs.filter(l => l.type === 'network' && (l.message.includes('Slow') || l.message.includes('HTTP'))).length}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="w-5 h-5" />
              Histórico de Eventos Recentes
            </CardTitle>
            <CardDescription>
              Últimas 50 atividades técnicas registradas no seu navegador.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {logs.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <CheckCircle2 className="w-12 h-12 mx-auto mb-4 text-green-500 opacity-20" />
                <p>Nenhum erro registrado até o momento.</p>
                <p className="text-sm">O sistema está operando normalmente.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {logs.map((log, index) => (
                  <div key={index} className="border rounded-lg p-4 bg-muted/30">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <Badge variant={log.type === 'error' ? 'destructive' : log.type === 'network' ? 'outline' : 'secondary'}>
                          {log.type === 'error' ? 'ERRO JS' : log.type === 'network' ? 'REDE' : 'CONSOLE'}
                        </Badge>
                        <span className="text-xs text-muted-foreground font-mono">
                          {new Date(log.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground italic flex items-center gap-1">
                        <FileSearch className="w-3 h-3" /> Sugestão de correção
                      </div>
                    </div>
                    <p className="text-sm font-mono break-all mb-3 bg-background p-2 rounded border border-border/50">
                      {log.message}
                    </p>
                    <div className="bg-primary/5 p-3 rounded-md border border-primary/10">
                      <p className="text-xs font-medium text-primary flex items-center gap-2">
                        <AlertTriangle className="w-3 h-3" />
                        {suggestCorrections(log)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <section className="bg-muted p-6 rounded-xl border">
          <h2 className="text-lg font-bold mb-4">Dicas Gerais de Resolução</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <li className="flex gap-3">
              <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 font-bold">1</div>
              <p><strong>Limpe o Cache:</strong> Pressione Ctrl+F5 (Windows) ou Cmd+Shift+R (Mac) para forçar o recarregamento total.</p>
            </li>
            <li className="flex gap-3">
              <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 font-bold">2</div>
              <p><strong>Modo Incógnito:</strong> Tente acessar o site em uma janela anônima para descartar conflitos com extensões.</p>
            </li>
            <li className="flex gap-3">
              <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 font-bold">3</div>
              <p><strong>DNS Alternativo:</strong> Se estiver com falhas constantes de rede, tente usar o DNS do Google (8.8.8.8) ou Cloudflare (1.1.1.1).</p>
            </li>
            <li className="flex gap-3">
              <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 font-bold">4</div>
              <p><strong>Suporte Técnico:</strong> Se os erros persistirem, envie um print desta tela para nossa equipe no WhatsApp.</p>
            </li>
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default DiagnosticPage;