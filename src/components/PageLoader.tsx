import React from "react";

const PageLoader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background">
      <div className="relative">
        <div className="h-16 w-16 rounded-full border-4 border-primary/20" />
        <div className="absolute top-0 h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
      <div className="mt-6 flex flex-col items-center gap-2">
        <span className="text-xl font-bold text-primary animate-pulse will-change-opacity">Patro Seguros</span>
        <span className="text-sm text-muted-foreground">Carregando cotações...</span>
      </div>
    </div>
  );
};

export default PageLoader;