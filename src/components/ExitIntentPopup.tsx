import { useState, useEffect, useCallback } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, CheckCircle } from "lucide-react";
import { showFriendlyError, showValidationError } from "@/lib/friendlyToast";
import { whatsappSchema, firstZodMessage } from "@/lib/leadValidation";

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

    const parsed = whatsappSchema.safeParse(whatsapp);
    if (!parsed.success) {
      showValidationError(firstZodMessage(parsed.error));
      return;
    }

    try {
      window.fbq?.("track", "Lead", { content_name: "ebook-exit-intent" });
      window.gtag?.("event", "generate_lead", { event_category: "lead_magnet", event_label: "ebook-exit-intent" });
    } catch (err) {
      console.error("ExitIntentPopup tracking failed", err);
    }

    try {
      setSent(true);
    } catch (err) {
      console.error("ExitIntentPopup submit failed", err);
      showFriendlyError();
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) dismiss(); }}>
      <DialogContent aria-describedby="exit-popup-description" className="max-w-md p-0 gap-0 rounded-2xl overflow-y-auto border-0 bg-gradient-to-b from-[hsl(210,100%,14%)] to-[hsl(210,100%,20%)]">
        <DialogTitle className="sr-only">E-book Gratuito - Seguro Auto</DialogTitle>
        <div className="p-8 text-center">
          {!sent ? (
            <>
              <div className="text-4xl mb-4" aria-hidden="true">🛑</div>
              <h3 className="text-xl font-extrabold text-white mb-2">
                Espere! Não feche seu seguro antes de ler isso.
              </h3>
              <p id="exit-popup-description" className="text-white/80 text-sm mb-6 leading-relaxed">
                Descubra como motoristas de Guarulhos estão <strong className="text-white/90">economizando até 30%</strong> na renovação.
              </p>
              <form onSubmit={handleSubmit} className="space-y-3" aria-label="Receber e-book gratuito">
                <label htmlFor="ebook-whatsapp" className="sr-only">Seu WhatsApp com DDD</label>
                <Input
                  id="ebook-whatsapp"
                  name="whatsapp"
                  type="tel"
                  autoComplete="tel"
                  placeholder="(11) 99999-9999…"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(formatWhatsApp(e.target.value))}
                  className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/70 text-center focus-visible:ring-amber-400"
                  required
                  inputMode="tel"
                  pattern="\([0-9]{2}\) 9[0-9]{4}-[0-9]{4}"
                  title="Informe um celular com DDD, no formato (11) 99999-9999."
                  maxLength={16}
                />
                <Button type="submit" className="w-full h-auto min-h-12 py-3 whitespace-normal rounded-xl bg-amber-500 hover:bg-amber-400 text-primary font-bold text-sm shadow-lg shadow-amber-500/20">
                  <Download className="mr-2 h-4 w-4 shrink-0" aria-hidden="true" /> Quero meu E-book Grátis
                </Button>
              </form>
              <p className="text-white/75 text-[11px] mt-4">
                🔒 Odiamos spam. Seu contato está seguro.
              </p>
            </>
          ) : (
            <div className="py-4 space-y-4" role="status">
              <CheckCircle className="h-14 w-14 text-green-400 mx-auto" aria-hidden="true" />
              <p className="text-white font-semibold text-lg">Sucesso!</p>
              <p id="exit-popup-description" className="text-white/80 text-sm">O link para baixar o seu Guia está pronto.</p>
              <Button asChild className="bg-amber-500 hover:bg-amber-400 text-primary font-bold rounded-xl min-h-12 h-auto py-3 px-8 whitespace-normal">
                <a href={EBOOK_URL} download>
                  <Download className="mr-2 h-4 w-4 shrink-0" aria-hidden="true" /> Baixar E-book Agora
                </a>
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExitIntentPopup;
