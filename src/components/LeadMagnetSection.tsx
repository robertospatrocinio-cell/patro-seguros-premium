import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, CheckCircle } from "lucide-react";
import ebookMockup from "@/assets/ebook-mockup-seguro-auto.png";

const EBOOK_URL = "/downloads/guia-seguro-auto-guarulhos.pdf";

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

const LeadMagnetSection = () => {
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [sent, setSent] = useState(false);

  const canSubmit = name.trim().length >= 2 && isValidWhatsApp(whatsapp);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    // Fire tracking
    try {
      if (typeof window !== "undefined") {
        (window as any).fbq?.("track", "Lead", { content_name: "ebook-seguro-auto" });
        (window as any).gtag?.("event", "generate_lead", { event_category: "lead_magnet", event_label: "ebook-seguro-auto" });
      }
    } catch {}

    setSent(true);
  };

  return (
    <section className="py-16 md:py-24" aria-labelledby="lead-magnet-heading">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto rounded-2xl overflow-hidden bg-gradient-to-br from-[hsl(210,100%,14%)] to-[hsl(210,100%,22%)] shadow-2xl">
          <div className="grid md:grid-cols-2 items-center">
            {/* Left — Text + Form */}
            <div className="p-8 md:p-12 lg:p-16">
              <span className="inline-block text-sm font-semibold text-amber-400 mb-3">🎁 Material Gratuito</span>
              <h2 id="lead-magnet-heading" className="text-2xl md:text-3xl font-extrabold text-white mb-3 leading-tight">
                Quer baixar o preço do seu Seguro Auto em até 30%?
              </h2>
              <p className="text-white/70 text-sm mb-8 leading-relaxed">
                Baixe nosso guia definitivo para motoristas de Guarulhos e descubra <strong className="text-white/90">5 segredos que as seguradoras não te contam</strong>.
              </p>

              {!sent ? (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <Input
                    placeholder="Seu nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-amber-400"
                    required
                    maxLength={80}
                  />
                  <Input
                    placeholder="WhatsApp (DDD + número)"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(formatWhatsApp(e.target.value))}
                    className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-amber-400"
                    required
                    inputMode="tel"
                    maxLength={16}
                  />
                  <Button
                    type="submit"
                    disabled={!canSubmit}
                    className="w-full h-12 rounded-xl bg-amber-500 hover:bg-amber-400 text-primary font-bold text-sm shadow-lg shadow-amber-500/20 disabled:opacity-40"
                  >
                    <Download className="mr-2 h-4 w-4" /> Baixar Guia Gratuito Agora
                  </Button>
                </form>
              ) : (
                <div className="text-center py-4 space-y-4">
                  <CheckCircle className="h-12 w-12 text-green-400 mx-auto" />
                  <p className="text-white font-semibold">Sucesso! Seu guia está pronto.</p>
                  <a href={EBOOK_URL} download>
                    <Button className="bg-amber-500 hover:bg-amber-400 text-primary font-bold rounded-xl h-12 px-8">
                      <Download className="mr-2 h-4 w-4" /> Baixar E-book Agora
                    </Button>
                  </a>
                </div>
              )}
            </div>

            {/* Right — Mockup */}
            <div className="hidden md:flex items-center justify-center p-8 lg:p-12">
              <img
                src={ebookMockup}
                alt="E-book Guia Definitivo - Como Baixar o Preço do Seguro Auto"
                width={400}
                height={400}
                loading="lazy"
                className="w-full max-w-[340px] drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadMagnetSection;
