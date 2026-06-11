import React, { useState, useEffect } from "react";
import { AlertCircle, RefreshCw, ShieldAlert } from "lucide-react";
import { Button } from "./ui/button";

const PageLoader = () => {
  const [isTakingTooLong, setIsTakingTooLong] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTakingTooLong(true);
    }, 5000); // Reduce from 10s to 5s for the internal diagnostic hint

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background p-4 text-center">
      <div className="relative mb-6">
        <div className="h-16 w-16 rounded-full border-4 border-primary/20" />
        <div className="absolute top-0 h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
      
      <div className="flex flex-col items-center gap-2">
        <span className="text-xl font-bold text-primary animate-pulse will-change-opacity">Patro Seguros</span>
        <span className="text-sm text-muted-foreground">Carregando cotações...</span>
      </div>

      {isTakingTooLong && (
        <div className="mt-12 max-w-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-muted p-4 rounded-xl border border-border shadow-sm">
            <div className="flex items-center justify-center gap-2 text-destructive mb-2">
              <AlertCircle className="w-5 h-5" />
              <span className="font-semibold">O carregamento está demorando</span>
            </div>
            <p className="text-xs text-muted-foreground mb-4">
              Isso pode ser causado por uma conexão instável ou bloqueio de rede.
            </p>
            <div className="flex flex-col gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => window.location.reload()}
                className="gap-2"
              >
                <RefreshCw className="w-4 h-4" /> Tentar Novamente
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => window.location.href = "/diagnostico"}
                className="gap-2 text-primary"
              >
                <ShieldAlert className="w-4 h-4" /> Diagnosticar Problema
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PageLoader;