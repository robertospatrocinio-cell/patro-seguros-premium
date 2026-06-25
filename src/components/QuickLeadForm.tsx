import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, User, ShieldCheck, ArrowRight, Mail, MapPin, Lock } from "lucide-react";
import { expressLeadSchema, firstZodMessage } from "@/lib/leadValidation";
import { showFriendlyError, showValidationError } from "@/lib/friendlyToast";
import { trackCotacaoSubmit } from "@/lib/tracking";

export const QuickLeadForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    insuranceType: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsed = expressLeadSchema.safeParse(formData);
    if (!parsed.success) {
      showValidationError(firstZodMessage(parsed.error));
      return;
    }

    setLoading(true);
    try {
      const { name, phone, email, city, insuranceType } = parsed.data;
      const cidade = city?.trim() ? city : "Guarulhos";
      const extras = [email ? `E-mail: ${email}` : null].filter(Boolean).join(" • ");
      const msg = `Olá, meu nome é ${name} (${phone}). Sou de ${cidade} e gostaria de uma cotação de ${insuranceType}.${extras ? `\n${extras}` : ""}`;

      const popup = window.open(
        `https://wa.me/551151997500?text=${encodeURIComponent(msg)}`,
        "_blank",
        "noopener,noreferrer",
      );
      if (!popup) {
        showFriendlyError(
          "Não conseguimos abrir o WhatsApp automaticamente. Toque no botão abaixo para falar com a gente.",
          { whatsappMessage: msg },
        );
        return;
      }

      trackCotacaoSubmit(insuranceType, { origin: "quick_lead_form_home" });
      toast.success("Recebemos seu contato! Um consultor responderá em até 2 horas.");
      setFormData({ name: "", phone: "", email: "", city: "", insuranceType: "" });
    } catch (err) {
      console.error("QuickLeadForm submit failed", err);
      showFriendlyError();
    } finally {
      setLoading(false);
    }
  };

  const cidadePreview = formData.city?.trim() || "Guarulhos";
  const whatsappMessage = `Olá, meu nome é ${formData.name || '...'}. Sou de ${cidadePreview} e gostaria de uma cotação de ${formData.insuranceType || '...'}.`;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 -mt-12 relative z-20">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 md:p-8">
        <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8">
          <div className="text-center lg:text-left shrink-0 lg:max-w-[220px] lg:pt-1">
            <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-primary mb-2">Cotação Express</span>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 leading-tight">Resposta em até 2 horas</h2>
            <p className="text-sm text-slate-500 mt-2">Preencha 5 campos e receba propostas no WhatsApp.</p>
          </div>

          <form onSubmit={handleSubmit} className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 w-full">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                aria-label="Seu nome"
                placeholder="Seu Nome"
                className="pl-10 h-12 bg-slate-50 border-slate-200 focus:bg-white transition-all rounded-xl"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                aria-label="WhatsApp com DDD"
                inputMode="tel"
                placeholder="WhatsApp (DDD)"
                className="pl-10 h-12 bg-slate-50 border-slate-200 focus:bg-white transition-all rounded-xl"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                aria-label="E-mail (opcional)"
                type="email"
                placeholder="E-mail (opcional)"
                className="pl-10 h-12 bg-slate-50 border-slate-200 focus:bg-white transition-all rounded-xl"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                aria-label="Cidade"
                placeholder="Cidade (ex: Guarulhos)"
                className="pl-10 h-12 bg-slate-50 border-slate-200 focus:bg-white transition-all rounded-xl"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              />
            </div>

            <div className="relative">
              <Select
                value={formData.insuranceType}
                onValueChange={(v) => setFormData({ ...formData, insuranceType: v })}
              >
                <SelectTrigger className="h-12 bg-slate-50 border-slate-200 focus:bg-white transition-all rounded-xl pl-10 relative">
                  <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 z-10" />
                  <SelectValue placeholder="Tipo de Seguro" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Auto">Seguro Auto</SelectItem>
                  <SelectItem value="Uber">Seguro Uber / APP</SelectItem>
                  <SelectItem value="Saude">Plano de Saúde</SelectItem>
                  <SelectItem value="Vida">Seguro de Vida</SelectItem>
                  <SelectItem value="Residencial">Seguro Residencial</SelectItem>
                  <SelectItem value="Empresarial">Seguro Empresa</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2 md:col-span-2 lg:col-span-3">
              <Button
                type="submit"
                disabled={loading}
                className="h-12 w-full font-bold text-base bg-[#22c55e] hover:bg-[#16a34a] text-white shadow-lg shadow-green-500/20 rounded-xl"
              >
                {loading ? "Enviando..." : (
                  <span className="flex items-center gap-2">
                    Receber Cotação em 2 Horas <ArrowRight className="h-4 w-4" />
                  </span>
                )}
              </Button>

              <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Lock className="h-3 w-3" aria-hidden="true" />
                  Dados protegidos pela LGPD
                </span>
                <span className="italic line-clamp-1 max-w-[60%] text-right">"{whatsappMessage}"</span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};