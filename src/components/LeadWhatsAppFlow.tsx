import React, { useState, useCallback, useMemo } from "react";
import { 
  Car, 
  HeartPulse, 
  Home, 
  Building2, 
  Truck, 
  ShieldCheck, 
  ArrowRight, 
  MessageCircle, 
  ChevronRight,
  ChevronLeft,
  User,
  Phone,
  MapPin,
  CheckCircle2,
  Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { trackWhatsAppClick, trackCotacaoSubmit } from "@/lib/tracking";
import { toast } from "sonner";
import { nameSchema, phoneSchema, firstZodMessage } from "@/lib/leadValidation";
import { cn } from "@/lib/utils";

const INSURANCE_OPTIONS = [
  { id: "auto", title: "Seguro Auto", icon: Car, color: "text-blue-600", bg: "bg-blue-50", message: "Quero cotar Seguro Auto" },
  { id: "saude", title: "Plano de Saúde", icon: HeartPulse, color: "text-emerald-600", bg: "bg-emerald-50", message: "Quero cotar Plano de Saúde" },
  { id: "vida", title: "Seguro de Vida", icon: HeartPulse, color: "text-rose-600", bg: "bg-rose-50", message: "Quero cotar Seguro de Vida" },
  { id: "residencial", title: "Residencial", icon: Home, color: "text-amber-600", bg: "bg-amber-50", message: "Quero cotar Seguro Residencial" },
  { id: "empresarial", title: "Empresarial", icon: Building2, color: "text-slate-600", bg: "bg-slate-50", message: "Quero cotar Seguro Empresa" },
  { id: "frota", title: "Seguro de Frota", icon: Truck, color: "text-indigo-600", bg: "bg-indigo-50", message: "Quero cotar Seguro de Frota" },
];

export const LeadWhatsAppFlow = () => {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState<typeof INSURANCE_OPTIONS[0] | null>(null);
  const [formData, setFormData] = useState({ name: "", phone: "", city: "", customMessage: "" });
  const [loading, setLoading] = useState(false);

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const handleSelectType = (option: typeof INSURANCE_OPTIONS[0]) => {
    setSelectedType(option);
    setStep(2);
  };

  const handleNext = () => {
    if (step === 2) {
      const nameRes = nameSchema.safeParse(formData.name);
      if (!nameRes.success) {
        toast.error(firstZodMessage(nameRes.error));
        return;
      }
      const phoneRes = phoneSchema.safeParse(formData.phone);
      if (!phoneRes.success) {
        toast.error(firstZodMessage(phoneRes.error));
        return;
      }
      setStep(3);
    }
    if (step === 3) {
      const defaultMsg = `Olá! Sou ${formData.name}. Gostaria de cotar ${selectedType?.title}${formData.city ? ` para ${formData.city}` : ""}. Pode me ajudar?`;
      setFormData(prev => ({ ...prev, customMessage: defaultMsg }));
      setStep(4);
    }
  };

  const handleFinish = async () => {
    setLoading(true);
    try {
      const lines = [
        `*Solicitação de Cotação - WhatsApp Flow*`,
        `*Produto:* ${selectedType?.title}`,
        `*Nome:* ${formData.name}`,
        `*WhatsApp:* ${formData.phone}`,
        `*Cidade:* ${formData.city || "Não informada"}`,
        `---`,
        formData.customMessage || `Olá! Iniciei minha cotação pelo fluxo de etapas do site e gostaria de agilizar o atendimento por aqui.`
      ];

      const waUrl = buildWhatsAppUrl({
        origem: `flow_whatsapp_${selectedType?.id || 'geral'}`,
        extraLines: lines
      });

      trackCotacaoSubmit(selectedType?.title || "Geral", { origin: "whatsapp_flow_step" });
      trackWhatsAppClick(`flow_${selectedType?.id}`, { origin: "whatsapp_flow_finish" });

      toast.success("Tudo pronto! Abrindo o WhatsApp...");
      
      setTimeout(() => {
        window.open(waUrl, "_blank");
        setLoading(false);
      }, 800);
    } catch (err) {
      console.error(err);
      toast.error("Ocorreu um erro. Tente novamente.");
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden transition-all duration-500">
      {/* Header Flow */}
      <div className="bg-slate-900 p-6 text-white relative">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center border border-white/25">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold leading-none text-white">Pedir Cotação</h2>
              <p className="text-[10px] text-white/70 uppercase tracking-widest mt-1">Resposta em até 2h</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs font-medium text-white/60">Passo {step} de {totalSteps}</span>
          </div>
        </div>
        <Progress value={progress} className="h-1.5 bg-white/10" />
      </div>

      <div className="p-6 md:p-8 min-h-[380px] flex flex-col justify-center">
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">Qual seguro você precisa hoje?</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {INSURANCE_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleSelectType(opt)}
                  className="flex flex-col items-center justify-center p-4 rounded-2xl border border-slate-100 bg-white hover:border-primary/40 hover:shadow-md transition-all group"
                >
                  <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform", opt.bg)}>
                    <opt.icon className={cn("w-6 h-6", opt.color)} />
                  </div>
                  <span className="text-sm font-bold text-slate-800">{opt.title}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-6">
            <div className="text-center mb-2">
              <div className={cn("inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-3", selectedType?.bg, selectedType?.color)}>
                {selectedType && <selectedType.icon className="w-3 h-3" />}
                {selectedType?.title}
              </div>
              <h3 className="text-xl font-bold text-slate-900">Como podemos te chamar?</h3>
            </div>
            
            <div className="space-y-4 max-w-sm mx-auto">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Seu Nome Completo"
                  className="pl-10 h-12 rounded-xl border-slate-200"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Seu WhatsApp (DDD)"
                  className="pl-10 h-12 rounded-xl border-slate-200"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="flex gap-3 max-w-sm mx-auto pt-2">
              <Button variant="ghost" className="rounded-xl" onClick={() => setStep(1)}>
                <ChevronLeft className="w-4 h-4 mr-1" /> Voltar
              </Button>
              <Button className="flex-1 rounded-xl bg-primary hover:bg-primary/90 h-12 font-bold" onClick={handleNext}>
                Continuar <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-slate-50 text-slate-600 flex items-center justify-center mx-auto mb-4 border border-slate-100">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Onde está o bem?</h3>
              <p className="text-sm text-slate-500 mt-2">Informe a cidade para agilizar sua cotação (Opcional)</p>
            </div>

            <div className="max-w-sm mx-auto space-y-6">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Cidade (ex: Guarulhos)"
                  className="pl-10 h-12 rounded-xl border-slate-200"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button variant="ghost" className="rounded-xl" onClick={() => setStep(2)}>
                  <ChevronLeft className="w-4 h-4 mr-1" /> Voltar
                </Button>
                <Button className="flex-1 rounded-xl bg-primary hover:bg-primary/90 h-12 font-bold" onClick={handleNext}>
                  Revisar Dados <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-100">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Confirme seus dados</h3>
              <p className="text-sm text-slate-500 mt-1">Revise as informações antes de iniciar o atendimento</p>
            </div>

            <div className="max-w-sm mx-auto space-y-4">
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-slate-200/50">
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">Seguro</span>
                  <span className="text-sm font-bold text-slate-700">{selectedType?.title}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-slate-200/50">
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">Nome</span>
                  <span className="text-sm font-bold text-slate-700">{formData.name}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-slate-200/50">
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">WhatsApp</span>
                  <span className="text-sm font-bold text-slate-700">{formData.phone}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">Cidade</span>
                  <span className="text-sm font-bold text-slate-700">{formData.city || "Não informada"}</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-wider text-slate-400 font-bold ml-1">Mensagem para o consultor</label>
                <textarea
                  className="w-full min-h-[80px] p-3 text-sm rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none"
                  value={formData.customMessage}
                  onChange={(e) => setFormData({ ...formData, customMessage: e.target.value })}
                />
              </div>

              <div className="space-y-3">
                <Button 
                  className="w-full rounded-xl bg-[#25D366] hover:bg-[#128C7E] text-white h-14 font-bold text-lg shadow-lg shadow-emerald-500/20"
                  onClick={handleFinish}
                  disabled={loading}
                >
                  {loading ? "Processando..." : (
                    <span className="flex items-center gap-2">
                      <MessageCircle className="w-5 h-5" /> Confirmar e Enviar
                    </span>
                  )}
                </Button>
                <Button variant="ghost" className="w-full text-xs text-slate-400 hover:text-slate-600" onClick={() => setStep(3)}>
                  <ChevronLeft className="w-3 h-3 mr-1" /> Corrigir informações
                </Button>
                <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                  <Lock className="w-3 h-3" /> Dados Protegidos pela LGPD
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};