import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

declare global {
  interface Window {
    activateAnalytics?: (reason: string) => void;
  }
}

const COOKIE_KEY = "patro-cookies-accepted";

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem(COOKIE_KEY);
    if (!accepted) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(COOKIE_KEY, "true");
    setVisible(false);
    
    // Trigger analytics loading immediately after consent
    if (window.activateAnalytics) {
      window.activateAnalytics("consent_given");
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] p-4 animate-fade-in">
      <div className="container mx-auto max-w-3xl">
        <div className="bg-card border rounded-xl shadow-xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <p className="text-[13px] text-muted-foreground leading-relaxed flex-1">
            Utilizamos cookies para melhorar sua experiência, personalizar anúncios e analisar o tráfego do site. 
            Ao clicar em "Aceitar", você concorda com o uso de cookies de analytics e marketing conforme nossa{" "}
            <Link to="/politica-privacidade" className="text-primary hover:underline font-medium">Política de Privacidade</Link>.
          </p>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => setVisible(false)} 
              size="sm" 
              className="rounded-lg text-[12px] h-8 px-4"
            >
              Recusar
            </Button>
            <Button 
              onClick={accept} 
              size="sm" 
              className="rounded-lg text-[12px] h-8 px-5 flex-shrink-0"
            >
              Aceitar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
