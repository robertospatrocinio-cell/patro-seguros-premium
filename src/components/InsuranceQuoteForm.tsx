/** Execute esta instrucao no projeto: Otimizar os CTAs persistentes (WhatsApp e formulário) para ficarem visíveis em todas as seções da página de obrigado sem atrapalhar a leitura. */
import { useState, useEffect, useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { debounce } from "@/lib/debounce";
import { Send, CheckCircle, MessageCircle, ListChecks, ChevronRight, ChevronLeft, Save, RotateCcw, AlertCircle, Mail, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import ExternalLink from "@/components/ExternalLink";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { trackCotacaoSubmit, trackWhatsAppClick } from "@/lib/tracking";
import { safeInvoke, handleSupabaseError } from "@/lib/supabase-helpers";
import { escapeHtml, validateEmail, validatePhone } from "@/lib/utils";
import { toast } from "sonner";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { usePersistentForm } from "@/hooks/usePersistentForm";
import { logForgottenQuote } from "@/lib/quoteHistory";
import { submitLead, savePartialQuote } from "@/lib/leadsApi";




const WHATSAPP_NUMBER = "551151997500";

/* ── Form field config types ────────────────────────────── */
export interface FormFieldConfig {
  id: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  type: "text" | "email" | "tel" | "select" | "radio" | "checkbox-group" | "date" | "currency";
  options?: string[];
  mask?: string;
}

export interface InsuranceFormConfig {
  type: string;
  emoji: string;
  title: string;
  subtitle: string;
  fields: FormFieldConfig[];
  benefits: { icon: string; title: string; desc: string }[];
  faqs: { question: string; answer: string }[];
  metaTitle: string;
  metaDescription: string;
}

/* ── Masking helpers ──────────────────────────────────── */
const formatPhone = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length === 0) return "";
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
};

const formatCEP = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  if (digits.length <= 5) return digits;
  return `${digits.slice(0, 5)}-${digits.slice(5)}`;
};

const formatCurrency = (value: string) => {
  const digits = value.replace(/\D/g, "");
  if (!digits) return "";
  const amount = (parseInt(digits) / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
  return amount;
};

/* ── The Form Component ─────────────────────────────────── */
interface Props {
  config: InsuranceFormConfig;
  compact?: boolean;
}

const InsuranceQuoteForm = ({ config, compact = false }: Props) => {
  const storageKey = `quote-form-${config.type.toLowerCase().replace(/\s+/g, "-")}`;
  
  const [formData, setFormData, clearFormData, isRestored] = usePersistentForm<Record<string, string>>(storageKey, {});
  const [checkboxGroups, setCheckboxGroups, clearCheckboxes] = usePersistentForm<Record<string, string[]>>(`${storageKey}-checkboxes`, {});
  const [currentStep, setCurrentStep, clearStep] = usePersistentForm<number>(`${storageKey}-step`, 1);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [consent, setConsent] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [finalMsg, setFinalMsg] = useState("");
  const [showChecklist, setShowChecklist] = useState(false);
  const [checklistItems, setChecklistItems] = useState<Record<string, boolean>>({});
  const [showRestoreNotice, setShowRestoreNotice] = useState(false);
  const [partialId, setPartialId] = useState<string | null>(localStorage.getItem(`${storageKey}-partial-id`));
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const captchaRef = useRef<HCaptcha>(null);

  // Handle restoration notice
  useEffect(() => {
    if (isRestored && Object.keys(formData).length > 0 && !sent) {
      setShowRestoreNotice(true);
      // Auto-hide notice after 8 seconds
      const timer = setTimeout(() => setShowRestoreNotice(false), 8000);
      return () => clearTimeout(timer);
    }
  }, [isRestored, sent]);

  // Debounced cloud save for automatic recovery
  const saveToCloud = useCallback(
    debounce(async (values: Record<string, string>, checkboxes: Record<string, string[]>, step: number) => {
      const dataToSave = {
        name: values.nome || values.name || null,
        email: values.email || null,
        phone: values.whatsapp || values.telefone || values.phone || null,
        insurance_type: config.type,
        current_step: step,
        data: { ...values, checkboxGroups: checkboxes },
        last_activity: new Date().toISOString()
      };

      try {
        if (partialId) {
          await savePartialQuote({ id: partialId, ...dataToSave });
        } else if (dataToSave.name || dataToSave.email || dataToSave.phone) {
          const { id, error } = await savePartialQuote(dataToSave);
          if (id && !error) {
            setPartialId(id);
            localStorage.setItem(`${storageKey}-partial-id`, id);
          }
        }
      } catch (err) {
        console.error("Cloud save failed", err);
      }
    }, 3000),
    [partialId, config.type, storageKey]
  );

  // Sync to cloud on form changes
  useEffect(() => {
    if (Object.keys(formData).length > 0 || Object.keys(checkboxGroups).length > 0) {
      saveToCloud(formData, checkboxGroups, currentStep);
    }
  }, [formData, checkboxGroups, currentStep, saveToCloud]);

  const startOver = () => {
    if (!window.confirm("Limpar os dados desta cotação? Você precisará preenchê-los novamente.")) return;
    logForgottenQuote(config.type, currentStep, storageKey);
    clearFormData();
    clearCheckboxes();
    clearStep();
    localStorage.removeItem(`${storageKey}-partial-id`);
    setPartialId(null);
    setTouched({});
    setShowRestoreNotice(false);
    toast.success("Formulário reiniciado com sucesso.");
  };



  // Group fields into steps
  // Inclui campos de tipo de imóvel se não presentes
  const contactFieldIds = ["nome", "email", "telefone", "whatsapp", "phone", "name"];
  
  // Toda solicitação permite informar cidade e mensagem, sem perder os campos do produto.
  const fields: FormFieldConfig[] = [...config.fields];
  if (!fields.some(field => /^(cidade|city)$/.test(field.id))) {
    fields.push({ id: "cidade", label: "Cidade (opcional)", type: "text", placeholder: "Ex.: Guarulhos / SP" });
  }
  if (!fields.some(field => /^(mensagem|message)$/.test(field.id))) {
    fields.push({ id: "mensagem", label: "Mensagem (opcional)", type: "text", placeholder: "Conte o que precisa proteger" });
  }

  const contactFields = fields.filter(f => contactFieldIds.includes(f.id.toLowerCase()));
  const coverageFields = fields.filter(f => f.type === "checkbox-group");
  const technicalFields = fields.filter(f => !contactFields.includes(f) && !coverageFields.includes(f));


  // Define dynamic steps
  const steps = [
    { id: "contact", title: "Dados de Contato", fields: contactFields },
    ...(technicalFields.length > 0 ? [{ id: "technical", title: "Detalhes do Seguro", fields: technicalFields }] : []),
    ...(coverageFields.length > 0 ? [{ id: "coverage", title: "Coberturas e Extras", fields: coverageFields }] : []),
    { id: "review", title: "Termos e Revisão", fields: [] }
  ];

  const totalSteps = steps.length;
  const progress = (currentStep / totalSteps) * 100;

  const checklistOptions = [
    { id: "correct_phone", label: "Meu WhatsApp está correto para receber a cotação." },
    { id: "essential_info", label: "Forneci as informações básicas necessárias." },
    { id: "ready_to_talk", label: "Estou pronto para conversar com um especialista." }
  ];

  const isChecklistComplete = checklistOptions.every(item => checklistItems[item.id]);

  const toggleChecklistItem = (id: string) => {
    setChecklistItems(prev => ({ ...prev, [id]: !prev[id] }));
  };


  const getFieldError = (field: FormFieldConfig, force = false) => {
    if (!force && !touched[field.id]) return "";
    const value = formData[field.id] || "";
    
    if (field.required) {
      if (field.type === "checkbox-group") {
        if (!(checkboxGroups[field.id]?.length > 0)) return "Este dado é fundamental para sua cotação.";
      } else if (!value.trim()) {
        return "Campo obrigatório para prosseguir.";
      }
    }

    if (value.trim()) {
      if (field.type === "email" && !validateEmail(value)) return "E-mail inválido. Ex: nome@email.com";
      if (field.type === "tel" && !validatePhone(value)) return "WhatsApp inválido. Ex: (11) 99999-9999";
      if (field.id.toLowerCase().includes("cep") && value.replace(/\D/g, "").length !== 8) return "CEP deve ter 8 dígitos.";
    }

    return "";
  };


  const update = (key: string, value: string) => setFormData(prev => ({ ...prev, [key]: value }));

  const handleBlur = (key: string) => {
    setTouched(prev => ({ ...prev, [key]: true }));
  };

  const toggleCheckboxOption = (fieldId: string, option: string) => {
    setCheckboxGroups(prev => {
      const current = prev[fieldId] || [];
      if (option === "Todos") {
        const field = config.fields.find(f => f.id === fieldId);
        const allOpts = field?.options?.filter(o => o !== "Todos") || [];
        return { ...prev, [fieldId]: current.length === allOpts.length ? [] : allOpts };
      }
      return {
        ...prev,
        [fieldId]: current.includes(option) ? current.filter(o => o !== option) : [...current, option],
      };
    });
  };

  const isStepValid = (stepIndex: number) => {
    const step = steps[stepIndex - 1];
    if (!step) return true;
    
    for (const field of step.fields) {
      if (getFieldError(field, true)) return false;
    }

    if (step.id === "review") {
      return consent && isChecklistComplete && !!captchaToken;
    }

    return true;
  };

  const nextStep = () => {
    // Mark current step fields as touched to trigger validation UI
    const currentStepFields = steps[currentStep - 1]?.fields || [];
    const newTouched = { ...touched };
    currentStepFields.forEach(f => { newTouched[f.id] = true });
    setTouched(newTouched);

    if (!isStepValid(currentStep)) {
      const firstErrorField = steps[currentStep - 1].fields.find(f => getFieldError(f, true));
      if (firstErrorField) {
        toast.error(`Por favor, verifique o campo: ${firstErrorField.label}`);
        const element = document.getElementById(`iq-${firstErrorField.id}`);
        const control = element?.matches('input, button, select, textarea')
          ? element
          : element?.querySelector<HTMLElement>('input, button, select, textarea');
        control?.focus({ preventScroll: true });
        element?.scrollIntoView({ behavior: 'auto', block: 'center' });
      } else if (steps[currentStep - 1].id === "review") {
        if (!captchaToken) {
          toast.error("Por favor, complete o desafio de segurança (CAPTCHA).");
        } else {
          toast.error("Confirme todos os itens e aceite os termos para continuar.");
        }
      }
      return;
    }

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      requestAnimationFrame(() => {
        const heading = document.getElementById("iq-step-title");
        heading?.focus({ preventScroll: true });
        heading?.scrollIntoView({ behavior: "auto", block: "center" });
      });
    }
    // Set captcha as touched when reaching review step
    if (currentStep === totalSteps - 1) {
      setTouched(prev => ({ ...prev, captcha: true }));
    }
  };


  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      requestAnimationFrame(() => {
        const heading = document.getElementById("iq-step-title");
        heading?.focus({ preventScroll: true });
        heading?.scrollIntoView({ behavior: "auto", block: "center" });
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentStep < totalSteps) {
      nextStep();
      return;
    }

    setTouched(prev => ({ ...prev, review: true }));
    if (!consent || !isChecklistComplete) {
      const message = !consent
        ? "Por favor, aceite os termos para continuar."
        : "Por favor, confirme todos os itens do checklist antes de enviar.";
      toast.error(message);
      const control = document.getElementById(!consent ? "iq-consent" : checklistOptions.find(item => !checklistItems[item.id])!.id);
      control?.focus({ preventScroll: true });
      control?.scrollIntoView({ behavior: "auto", block: "center" });
      return;
    }


    setSending(true);

    const leadName = formData.nome || formData.name || "Cliente";
    const leadPhone = formData.whatsapp || formData.telefone || formData.phone || "";
    
    const parts = [
      `*Solicitação de Cotação - Patro Seguros*`,
      `*Lead:* ${leadName}`,
      `*Contato:* ${leadPhone}`,
      `*Produto:* ${config.type}`,
      `Cidade: ${formData.cidade?.trim() || formData.city?.trim() || "Não informada"}`,
      `Mensagem: ${formData.mensagem?.trim() || formData.message?.trim() || "Não informada"}`,
      `---`,
      ...config.fields.map(f => {
        if (f.type === "checkbox-group") {
          const vals = checkboxGroups[f.id];
          return vals?.length ? `*${f.label}:* ${vals.join(", ")}` : null;
        }
        const val = formData[f.id]?.trim();
        return val ? `*${f.label}:* ${val}` : null;
      }).filter(Boolean),
      `---`,
      `Olá! Acabei de enviar minha cotação pelo site e gostaria de agilizar o atendimento.`
    ].join("\n");

    trackCotacaoSubmit(config.type);

    const lastErrorId = (window as any).lastErrorId;
    const finalParts = lastErrorId 
      ? `${parts}\n\n_Ref. Erro anterior: ${lastErrorId}_`
      : parts;

    window.fbq?.("track", "Lead", {
      content_name: `formulario-${config.type}`,
      content_category: config.type,
    });
    window.gtag?.("event", "generate_lead", {
      event_category: "formulario-especifico",
      event_label: config.type,
    });

    const subject = `Nova Cotação — ${config.type}`;
    const htmlBody = `
      <h2>Nova Cotação de ${escapeHtml(config.type)}</h2>
      <table style="border-collapse:collapse;width:100%">
        ${config.fields.map(f => {
          if (f.type === "checkbox-group") {
            const vals = checkboxGroups[f.id];
            return vals?.length ? `<tr><td style="padding:6px;border:1px solid #ddd"><strong>${escapeHtml(f.label)}</strong></td><td style="padding:6px;border:1px solid #ddd">${vals.map(v => escapeHtml(v)).join(", ")}</td></tr>` : "";
          }
          return formData[f.id]?.trim() ? `<tr><td style="padding:6px;border:1px solid #ddd"><strong>${escapeHtml(f.label)}</strong></td><td style="padding:6px;border:1px solid #ddd">${escapeHtml(formData[f.id].trim())}</td></tr>` : "";
        }).join("")}
      </table>
    `;

    // 1. Integrar com o CRM via Edge Function (service role)
    const { error: crmError } = await submitLead({
      full_name: formData.nome || formData.name || "Cliente Interessado",
      phone: formData.whatsapp || formData.telefone || formData.phone || "",
      email: formData.email || "",
      insurance_type: config.type,
      raw_data: { ...formData, checkboxGroups },
    });

    if (crmError) {
      console.error("Erro ao registrar lead no CRM:", crmError);
      // Continuamos o processo mesmo se falhar no CRM, para não bloquear o usuário, 
      // mas o email servirá de backup.
    }

    // 2. Enviar e-mail de notificação
    const { data, error } = await safeInvoke<{ success?: boolean }>("send-form-email", { 
      subject, 
      textBody: parts, 
      htmlBody 
    });

      if (error || !data?.success) {
        console.error("Erro no envio:", error);
        handleSupabaseError(error || new Error("Envio não confirmado"), "Não foi possível confirmar o envio por e-mail. Seus dados foram mantidos.");
        toast.error("Ocorreu um erro no servidor. Por favor, tente novamente ou fale conosco via WhatsApp.", { 
          duration: 10000,
          action: {
            label: "WhatsApp",
            onClick: () => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=Olá! Tentei enviar o formulário de ${config.type} mas deu erro.`, "_blank")
          }
        });
        setSending(false);
        return;
      }

    setTimeout(() => {
      setSending(false);
      setSent(true);
      setFinalMsg(finalParts);
      clearFormData();
      clearCheckboxes();
      clearStep();
      localStorage.removeItem(`${storageKey}-partial-id`);
    }, 600);



  };

  if (sent) {
    return (
      <div role="status" className="bg-primary/[0.03] border border-primary/10 rounded-2xl p-8 text-center animate-in zoom-in-95 duration-300">
        <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="font-bold text-2xl mb-3 text-foreground">Solicitação Enviada!</h3>
        <p className="text-muted-foreground mb-8 max-w-xs mx-auto">
          Para agilizar sua cotação, você pode continuar o atendimento agora mesmo pelo WhatsApp.
        </p>
        
        <div className="space-y-4">
          <Button
            asChild
            className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-6 text-lg h-auto gap-3 whitespace-normal"
          >
            <ExternalLink href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(finalMsg)}`}>
              <MessageCircle className="h-6 w-6 shrink-0" aria-hidden="true" />
              Continuar no WhatsApp
            </ExternalLink>
          </Button>

          <div className="bg-white/50 rounded-xl p-4 border border-dashed border-primary/20">
            <h4 className="font-semibold text-sm mb-2 text-primary">Próximos Passos:</h4>
            <ul className="text-xs text-left text-muted-foreground space-y-2">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1 shrink-0" />
                <span>Nossa equipe analisará seu perfil em até 2 horas úteis.</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1 shrink-0" />
                <span>Um especialista entrará em contato para apresentar as melhores propostas.</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1 shrink-0" />
                <span>Você poderá tirar todas as suas dúvidas e personalizar seu plano.</span>
              </li>
            </ul>
          </div>

          <Button 
            variant="ghost" 
            size="sm"
            className="text-muted-foreground hover:text-primary"
            onClick={() => { setSent(false); setFormData({}); setCheckboxGroups({}); setConsent(false); setFinalMsg(""); setShowChecklist(false); setChecklistItems({}); }}
          >
            Fazer outra simulação
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-primary/[0.03] border border-primary/10 rounded-2xl ${compact ? "p-5" : "p-6 md:p-8"}`}>
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center text-xs text-muted-foreground mb-2">
          <span className="font-semibold text-primary uppercase tracking-wider">Passo {currentStep} de {totalSteps}</span>
          <span>{Math.round(progress)}% completo</span>
        </div>
        <Progress value={progress} className="h-1.5 bg-primary/10" />
      </div>

      {showRestoreNotice && (
        <div className="mb-6 animate-in slide-in-from-top-4 duration-500">
          <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                <AlertCircle className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-bold text-primary">Sessão recuperada</p>
                <p className="text-xs text-muted-foreground">Retomamos seus dados anteriores.</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-9 gap-2 border-primary/30 text-primary hover:bg-primary/10"
              onClick={startOver}
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reiniciar
            </Button>
          </div>
        </div>
      )}


      <div className="flex items-center gap-3 mb-1">
        <span className="text-2xl" aria-hidden="true">{config.emoji}</span>
        <h3 id="iq-step-title" tabIndex={-1} className="text-lg font-bold">{steps[currentStep - 1].title}</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-6">
        {currentStep === 1 ? config.subtitle : `Preencha os detalhes para sua cotação de ${config.type}`}
      </p>

      <form onSubmit={handleSubmit} noValidate aria-label={`Cotação de ${config.type}`} aria-busy={sending} className="space-y-6">
        <p role="status" className="sr-only">Passo {currentStep} de {totalSteps}: {steps[currentStep - 1].title}</p>
        {/* Step Content */}
        <div className="space-y-4 animate-in fade-in slide-in-from-right-2 duration-300">
          {steps[currentStep - 1].id === "review" ? (
            <div className="space-y-6">
              <div className="bg-white/80 border border-primary/20 rounded-xl p-5 space-y-4 shadow-sm">
                <div className="flex items-center gap-2 text-primary font-bold text-sm mb-2">
                  <ListChecks className="h-5 w-5" />
                  <span>Confirmação Final:</span>
                </div>
                {checklistOptions.map(item => (
                  <label key={item.id} className="flex items-start gap-3 cursor-pointer group">
                    <Checkbox 
                      id={item.id}
                      name={item.id}
                      aria-required="true"
                      aria-invalid={!!touched.review && !checklistItems[item.id]}
                      aria-describedby={touched.review && !isChecklistComplete ? "iq-checklist-error" : undefined}
                      checked={checklistItems[item.id] || false}
                      onCheckedChange={() => toggleChecklistItem(item.id)}
                      className="mt-1"
                    />
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors leading-tight">
                      {item.label}
                    </span>
                  </label>
                ))}
                {touched.review && !isChecklistComplete && (
                  <p id="iq-checklist-error" className="text-xs text-destructive" aria-live="polite">Confirme todos os itens acima antes de enviar.</p>
                )}
              </div>

              <div className="bg-primary/5 rounded-xl p-4 border border-primary/10">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <Checkbox id="iq-consent" name="consent" checked={consent} onCheckedChange={(v) => setConsent(v === true)} className="mt-1" aria-required="true" aria-invalid={!!touched.review && !consent} aria-describedby={touched.review && !consent ? "iq-consent-error" : undefined} />
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors leading-tight">
                    Concordo em receber contato especializado da Patro Seguros via WhatsApp ou E-mail para tratar desta cotação.
                  </span>
                </label>
                {touched.review && !consent && (
                  <p id="iq-consent-error" className="text-xs text-destructive mt-2" aria-live="polite">Aceite o contato para receber esta cotação.</p>
                )}
              </div>

              <div className="flex flex-col items-center justify-center p-4 bg-white rounded-xl border border-primary/10 shadow-sm overflow-hidden">
                <div className="flex items-center gap-2 mb-3 text-xs text-muted-foreground font-medium">
                  <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                  <span>Proteção Anti-Spam</span>
                </div>
                <HCaptcha
                  sitekey="10000000-ffff-ffff-ffff-000000000001" // hCaptcha Test Key
                  onVerify={(token) => setCaptchaToken(token)}
                  ref={captchaRef}
                  theme="light"
                  size="normal"
                />
                {!captchaToken && touched["captcha"] && (
                  <p className="text-[11px] text-destructive mt-2 font-medium">Validação obrigatória para segurança.</p>
                )}
              </div>
            </div>
          ) : (
            steps[currentStep - 1].fields.map(field => {
              const error = getFieldError(field);
              return (
                <div key={field.id} className="space-y-2">
                  <Label id={`label-iq-${field.id}`} htmlFor={field.type === "radio" || field.type === "checkbox-group" ? undefined : `iq-${field.id}`} className={error ? "text-destructive font-semibold" : "font-semibold"}>
                    {field.label} {field.required && <span className="text-destructive">*</span>}
                  </Label>

                  {field.type === "select" && field.options && (
                    <Select 
                      value={formData[field.id] || ""} 
                      onValueChange={v => {
                        update(field.id, v);
                        handleBlur(field.id);
                      }}
                    >
                      <SelectTrigger 
                        id={`iq-${field.id}`}
                        aria-label={field.label}
                        className={`h-11 ${error ? "border-destructive focus-visible:ring-destructive" : ""}`}
                        aria-invalid={!!error}
                        aria-describedby={error ? `error-iq-${field.id}` : undefined}
                        aria-required={field.required}
                      >
                        <SelectValue placeholder={field.placeholder || "Selecione"} />
                      </SelectTrigger>
                      <SelectContent>
                        {field.options.map(opt => (
                          <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}

                  {field.type === "radio" && field.options && (
                    <div id={`iq-${field.id}`} role="radiogroup" aria-labelledby={`label-iq-${field.id}`} aria-required={field.required} aria-invalid={!!error} aria-describedby={error ? `error-iq-${field.id}` : undefined} className="grid grid-cols-1 sm:grid-cols-2 gap-2 [&>label:focus-within]:ring-2 [&>label:focus-within]:ring-primary [&>label:focus-within]:ring-offset-2">
                      {field.options.map(opt => (
                        <label
                          key={opt}
                          className={`flex items-center gap-2 px-3 py-3 rounded-xl border cursor-pointer transition-colors text-sm ${
                            formData[field.id] === opt
                              ? "border-primary bg-primary/5 text-primary-foreground font-medium ring-1 ring-primary"
                              : error 
                                ? "border-destructive hover:border-destructive/80"
                                : "border-input hover:border-primary/30"
                          }`}
                        >
                          <input
                            type="radio"
                            name={field.id}
                            value={opt}
                            checked={formData[field.id] === opt}
                            onChange={() => {
                              update(field.id, opt);
                              handleBlur(field.id);
                            }}
                            className="sr-only"
                          />
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                            formData[field.id] === opt 
                              ? "border-primary" 
                              : error ? "border-destructive" : "border-muted-foreground/40"
                          }`}>
                            {formData[field.id] === opt && <div className="w-2 h-2 rounded-full bg-primary" />}
                          </div>
                          <span className={formData[field.id] === opt ? "text-foreground" : ""}>{opt}</span>
                        </label>
                      ))}
                    </div>
                  )}

                  {field.type === "checkbox-group" && field.options && (
                    <div id={`iq-${field.id}`} role="group" aria-labelledby={`label-iq-${field.id}`} aria-invalid={!!error} aria-describedby={error ? `error-iq-${field.id}` : undefined} className="grid grid-cols-1 sm:grid-cols-2 gap-2 [&>label:focus-within]:ring-2 [&>label:focus-within]:ring-primary [&>label:focus-within]:ring-offset-2">
                      {field.options.map(opt => {
                        const checked = opt === "Todos"
                          ? (checkboxGroups[field.id]?.length === (field.options!.filter(o => o !== "Todos").length))
                          : checkboxGroups[field.id]?.includes(opt);
                        return (
                          <label
                            key={opt}
                            className={`flex items-center gap-2 px-3 py-3 rounded-xl border cursor-pointer transition-colors text-sm ${
                              checked 
                                ? "border-primary bg-primary/5 ring-1 ring-primary" 
                                : error 
                                  ? "border-destructive hover:border-destructive/80"
                                  : "border-input hover:border-primary/30"
                            }`}
                          >
                            <Checkbox 
                              checked={checked} 
                              onCheckedChange={() => {
                                toggleCheckboxOption(field.id, opt);
                                handleBlur(field.id);
                              }} 
                            />
                            <span className={checked ? "text-foreground font-medium" : ""}>{opt}</span>
                          </label>
                        );
                      })}
                    </div>
                  )}

                  {(field.type === "tel" || field.type === "email" || field.type === "text" || field.type === "date" || field.type === "currency") && (
                    <Input
                      id={`iq-${field.id}`}
                      name={field.id}
                      type={field.type === "email" ? "email" : field.type === "tel" ? "tel" : field.type === "date" ? "date" : "text"}
                      inputMode={field.type === "tel" ? "tel" : field.type === "email" ? "email" : field.type === "currency" || field.id.toLowerCase().includes("cep") ? "numeric" : undefined}
                      autoComplete={field.type === "tel" ? "tel" : field.type === "email" ? "email" : /^(nome|name)$/.test(field.id) ? "name" : field.id.toLowerCase().includes("cep") ? "postal-code" : "off"}
                      spellCheck={field.type === "email" ? false : undefined}
                      placeholder={field.placeholder || (field.type === "tel" ? "(11) 99999-9999…" : field.type === "email" ? "seu@email.com…" : "")}
                      value={formData[field.id] || ""}
                      onChange={e => {
                        let val = e.target.value;
                        if (field.type === "tel") val = formatPhone(val);
                        else if (field.type === "currency") val = formatCurrency(val);
                        else if (field.id.toLowerCase().includes("cep")) val = formatCEP(val);
                        update(field.id, val);
                      }}
                      onBlur={() => handleBlur(field.id)}
                      className={`h-11 ${error ? "border-destructive focus-visible:ring-destructive" : ""}`}
                      aria-invalid={!!error}
                      aria-describedby={error ? `error-iq-${field.id}` : undefined}
                      aria-required={field.required}
                    />
                  )}

                  {error && (
                    <p id={`error-iq-${field.id}`} aria-live="polite" className="text-xs text-destructive animate-in fade-in slide-in-from-top-1">
                      {error}
                    </p>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          {currentStep > 1 && (
            <Button 
              type="button" 
              variant="outline" 
              onClick={prevStep} 
              className="h-12 order-2 sm:order-1"
              disabled={sending}
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Voltar
            </Button>
          )}
          
          <span role="status" className="sr-only">{sending ? "Enviando cotação…" : ""}</span>
          <Button
            type="submit"
            variant="cta"
            className={`h-auto min-h-12 py-3 whitespace-normal font-bold text-base flex-1 order-1 sm:order-2 ${currentStep === 1 ? "w-full" : ""}`}
            disabled={sending}
          >
            {sending ? (
              <><svg viewBox="0 0 24 24" className="mr-2 h-4 w-4 shrink-0 animate-spin" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="3" opacity="0.25" /><path d="M12 3a9 9 0 0 1 9 9" fill="none" stroke="currentColor" strokeWidth="3" /></svg>Enviando…</>
            ) : currentStep < totalSteps ? (
              <>Próximo Passo <ChevronRight className="ml-2 h-4 w-4" aria-hidden="true" /></>
            ) : (
              <><Send className="mr-2 h-4 w-4 shrink-0" aria-hidden="true" /> Finalizar e Receber Cotação</>
            )}
          </Button>
        </div>

        <div className="flex flex-col items-center gap-4 pt-4 border-t border-primary/10 mt-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
            <ExternalLink href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Olá! Estou preenchendo o formulário de ${config.type} e gostaria de tirar uma dúvida.`)}`} className="flex items-center gap-2 text-xs font-semibold text-green-600 hover:text-green-700 transition-colors" onClick={() => trackWhatsAppClick(`form-help:${config.type.toLowerCase()}`)}
            >
              <MessageCircle className="h-4 w-4" />
              Dúvidas? Chamar no WhatsApp
            </ExternalLink>
            <div className="hidden sm:block w-px h-3 bg-slate-300" />
            <a 
              href="mailto:atendimento@patroseguros.com.br"
              className="flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-primary transition-colors"
            >
              <Mail className="h-4 w-4" />
              Enviar por E-mail
            </a>
          </div>

          <p className="text-[10px] text-muted-foreground text-center flex items-center gap-1.5">
            <Save className="h-3 w-3 text-primary" />
            Progresso salvo automaticamente · 100% gratuito e sem compromisso
          </p>
          {currentStep === totalSteps && (
            <p className="text-[10px] text-muted-foreground text-center">
              Ao enviar, nossos especialistas analisarão seu perfil em até 2 horas úteis.
            </p>
          )}
        </div>
      </form>
    </div>
  );
};


export default InsuranceQuoteForm;

