  import React, { Component, ErrorInfo, ReactNode } from "react";
  import { captureException } from "@/lib/monitoring";
  import { toast } from "sonner";
 import { Button } from "@/components/ui/button";
  import { AlertTriangle, RefreshCcw, Home, ArrowLeft, Copy, Check } from "lucide-react";
 
 interface Props {
   children: ReactNode;
   fallback?: ReactNode;
 }
 
  interface State {
    hasError: boolean;
    error?: Error;
    errorId: string;
    copied: boolean;
  }
 
  class ErrorBoundary extends Component<Props, State> {
    public state: State = {
      hasError: false,
      errorId: "",
      copied: false,
    };

    public static getDerivedStateFromError(error: Error): State {
      const errorId = Math.random().toString(36).substring(2, 9).toUpperCase();
      return { hasError: true, error, errorId, copied: false };
    }
 
    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
      console.error("Uncaught error:", error, errorInfo);
      captureException(error, {
        componentStack: errorInfo.componentStack,
        url: window.location.href,
        timestamp: new Date().toISOString()
      });
    }
 
    private handleReset = () => {
      this.setState({ hasError: false, error: undefined, errorId: "" });
    };

    private handleBack = () => {
      this.handleReset();
      window.history.back();
    };

    private copyErrorId = () => {
      navigator.clipboard.writeText(this.state.errorId);
      this.setState({ copied: true });
      toast.success("Código copiado!");
      setTimeout(() => this.setState({ copied: false }), 2000);
    };
 
   public render() {
     if (this.state.hasError) {
       if (this.props.fallback) return this.props.fallback;
 
       return (
         <div className="min-h-screen flex items-center justify-center bg-background p-4">
           <div className="max-w-md w-full text-center space-y-6">
             <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-destructive/10">
               <AlertTriangle className="w-10 h-10 text-destructive" />
             </div>
              <div className="space-y-2">
                <h1 className="text-2xl font-bold tracking-tight">Ops! Algo deu errado.</h1>
                <p className="text-muted-foreground">
                  Ocorreu um erro inesperado ao carregar esta página.
                </p>
                
                <div className="mt-4 p-3 bg-muted/50 rounded-lg inline-flex items-center gap-2 text-xs font-mono border border-border/30">
                  <span className="text-muted-foreground">ID do Erro:</span>
                  <span className="font-bold">{this.state.errorId}</span>
                  <button 
                    onClick={this.copyErrorId}
                    className="ml-1 p-1 hover:bg-muted rounded transition-colors"
                    title="Copiar código de referência"
                  >
                    {this.state.copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>

                {this.state.error && (
                  <pre className="mt-4 p-4 bg-muted rounded-lg text-xs overflow-auto max-h-32 text-left border border-border/50">
                    {this.state.error.message}
                  </pre>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Button onClick={this.handleReset} variant="default" className="gap-2 w-full">
                  <RefreshCcw className="w-4 h-4" /> Tentar Novamente
                </Button>
                <Button onClick={this.handleBack} variant="outline" className="gap-2 w-full">
                  <ArrowLeft className="w-4 h-4" /> Voltar Anterior
                </Button>
                <Button onClick={() => window.location.href = "/"} variant="ghost" className="gap-2 w-full sm:col-span-2">
                  <Home className="w-4 h-4" /> Ir para o Início
                </Button>
              </div>
           </div>
         </div>
       );
     }
 
     return this.props.children;
   }
 }
 
 export default ErrorBoundary;