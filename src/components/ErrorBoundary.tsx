 import React, { Component, ErrorInfo, ReactNode } from "react";
 import { Button } from "@/components/ui/button";
 import { AlertTriangle, RefreshCcw, Home } from "lucide-react";
 
 interface Props {
   children: ReactNode;
   fallback?: ReactNode;
 }
 
 interface State {
   hasError: boolean;
   error?: Error;
 }
 
 class ErrorBoundary extends Component<Props, State> {
   public state: State = {
     hasError: false,
   };
 
   public static getDerivedStateFromError(error: Error): State {
     return { hasError: true, error };
   }
 
   public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
     console.error("Uncaught error:", error, errorInfo);
   }
 
   private handleReset = () => {
     this.setState({ hasError: false, error: undefined });
     window.location.reload();
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
                 Sentimos muito pelo inconveniente. Ocorreu um erro inesperado ao carregar esta página.
               </p>
               {this.state.error && (
                 <pre className="mt-4 p-4 bg-muted rounded-lg text-xs overflow-auto max-h-32 text-left">
                   {this.state.error.message}
                 </pre>
               )}
             </div>
             <div className="flex flex-col sm:flex-row gap-3 justify-center">
               <Button onClick={this.handleReset} variant="default" className="gap-2">
                 <RefreshCcw className="w-4 h-4" /> Tentar Novamente
               </Button>
               <Button onClick={() => window.location.href = "/"} variant="outline" className="gap-2">
                 <Home className="w-4 h-4" /> Voltar ao Início
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