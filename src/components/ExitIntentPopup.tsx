import { useState, useEffect, useCallback } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, CheckCircle, X } from "lucide-react";

const EBOOK_URL = "/downloads/guia-seguro-auto-guarulhos.pdf";
const STORAGE_KEY = "patro_exit_popup_dismissed";

const formatWhatsApp = (value: string): string => {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
};

const isValidWhatsApp = (value: string): boolean => {
  const digits = value.replace(/\D/g, "");
  return digits.length === 11 && digits[2] === "9";
};

const ExitIntentPopup = () => {
  const [open, setOpen] = useState(false);
  const [whatsapp, setWhatsapp] = useState("");
  const [sent, setSent] = useState(false);

  const canSubmit = isValidWhatsApp(whatsapp);

  const dismiss = useCallback(() => {
    setOpen(false);
    try { sessionStorage.setItem(STORAGE_KEY, "1"); } catch {}
  }, []);

  const wasDismissed = useCallback(() => {
    try { return sessionStorage.getItem(STORAGE_KEY) === "1"; } catch { return false; }
  }, []);

  useEffect(() => {
    if (wasDismissed()) return;

    // Exit intent (desktop)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !wasDismissed()) {
        setOpen(true);
      }
    };

    // Timer fallback (15s scroll)
    const timer = setTimeout(() => {
      if (!wasDismissed()) setOpen(true);
    }, 15000);

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      clearTimeout(timer);
    };
  }, [wasDismissed]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    try {
      (window as any).fbq?.("track", "Lead", { content_name: "ebook-exit-intent" });
      (window as any).gtag?.("event", "generate_lead", { event_category: "lead_magnet", event_label: "ebook-exit-intent" });
    } catch {}

    setSent(true);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) dismiss(); }}>
      <DialogContent className="max-w-md p-0 gap-0 rounded-2xl overflow-hidden border-0 bg-gradient-to-b from-[hsl(210,100%,14%)] to-[hsl(210,100%,20%)]">
        <DialogTitle className="sr-only">E-book Gratuito - Seguro Auto</DialogTitle>
        <button
          onClick={dismiss}
          className="absolute right-4 top-4 z-10 text-white/40 hover:text-white transition-colors"
          aria-label="Fechar"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-8 text-center">
          {!sent ? (
            <>
              <div className="text-4xl mb-4">🛑</div>
              <h3 className="text-xl font-extrabold text-white mb-2">
                Espere! Não feche seu seguro antes de ler isso.
              </h3>
              <p className="text-white/60 text-sm mb-6 leading-relaxed">
                Descubra como motoristas de Guarulhos estão <strong className="text-white/80">economizando até 30%</strong> na renovação.
              </p>

              <form onSubmit={handleSubmit} className="space-y-3">
                <Input
                  placeholder="Seu WhatsApp (DDD + número)"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(formatWhatsApp(e.target.value))}
                  className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/40 text-center focus-visible:ring-amber-400"
                  required
                  inputMode="tel"
                  maxLength={16}
                />
                <Button
                  type="submit"
                  disabled={!canSubmit}
                  className="w-full h-12 rounded-xl bg-amber-500 hover:bg-amber-400 text-primary font-bold text-sm shadow-lg shadow-amber-500/20 disabled:opacity-40"
                >
                  <Download className="mr-2 h-4 w-4" /> Quero meu E-book Grátis
                </Button>
              </form>

              <p className="text-white/30 text-[11px] mt-4">
                🔒 Odiamos spam. Seu contato está seguro.
              </p>
            </>
          ) : (
            <div className="py-4 space-y-4">
              <CheckCircle className="h-14 w-14 text-green-400 mx-auto" />
              <p className="text-white font-semibold text-lg">Sucesso!</p>
              <p className="text-white/60 text-sm">O link para baixar o seu Guia está pronto.</p>
              <a href={EBOOK_URL} download>
                <Button className="bg-amber-500 hover:bg-amber-400 text-primary font-bold rounded-xl h-12 px-8">
                  <Download className="mr-2 h-4 w-4" /> Baixar E-book Agora
                </Button>
              </a>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExitIntentPopup;
