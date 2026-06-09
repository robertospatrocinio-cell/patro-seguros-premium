import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { debounce } from "lodash";
import { Send, CheckCircle, MessageCircle, ListChecks, ChevronRight, ChevronLeft, Save, RotateCcw, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { trackCotacaoSubmit } from "@/lib/tracking";
import { safeInvoke, handleSupabaseError } from "@/lib/supabase-helpers";
import { escapeHtml, validateEmail, validatePhone } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { usePersistentForm } from "@/hooks/usePersistentForm";
import { logForgottenQuote } from "@/lib/quoteHistory";




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

/* ── Phone mask helper ──────────────────────────────────── */
const formatPhone = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
};

const formatCEP = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  if (digits.length <= 5) return digits;
  return `${digits.slice(0, 5)}-${digits.slice(5)}`;
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
          await supabase.from("partial_quotes").update(dataToSave).eq("id", partialId);
        } else if (dataToSave.name || dataToSave.email || dataToSave.phone) {
          const { data, error } = await supabase.from("partial_quotes").insert(dataToSave).select("id").single();
          if (data && !error) {
            setPartialId(data.id);
            localStorage.setItem(`${storageKey}-partial-id`, data.id);
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

  const contactFieldIds = ["nome", "email", "telefone", "whatsapp", "phone", "name"];
  const contactFields = config.fields.filter(f => contactFieldIds.includes(f.id.toLowerCase()));
  const coverageFields = config.fields.filter(f => f.type === "checkbox-group");
  const technicalFields = config.fields.filter(f => !contactFields.includes(f) && !coverageFields.includes(f));

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


  const getFieldError = (field: FormFieldConfig) => {
    if (!touched[field.id]) return "";
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
      if (field.type === "tel" && !validatePhone(value)) return "Formato: (11) 99999-9999";
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
      if (!field.required) continue;
      if (field.type === "checkbox-group") {
        if (!(checkboxGroups[field.id]?.length > 0)) return false;
      } else {
        if (!formData[field.id]?.trim()) return false;
      }
      if (getFieldError(field)) return false;
    }

    if (step.id === "review") {
      return consent && isChecklistComplete;
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
      const firstErrorField = steps[currentStep - 1].fields.find(f => getFieldError(f));
      if (firstErrorField) {
        toast.error(`Por favor, verifique o campo: ${firstErrorField.label}`);
        // Scroll to the error field
        const element = document.getElementById(`iq-${firstErrorField.id}`);
        element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else if (steps[currentStep - 1].id === "review") {
        toast.error("Confirme todos os itens e aceite os termos para continuar.");
      }
      return;
    }

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };


  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentStep < totalSteps) {
      nextStep();
      return;
    }

    if (!consent) {
      toast.error("Por favor, aceite os termos para continuar.");
      return;
    }

    if (!isChecklistComplete) {
      toast.error("Por favor, confirme todos os itens do checklist antes de enviar.");
      return;
    }


    setSending(true);

    const parts = [
      `Olá! Gostaria de uma cotação de *${config.type}*.`,
      ...config.fields.map(f => {
        if (f.type === "checkbox-group") {
          const vals = checkboxGroups[f.id];
          return vals?.length ? `${f.label}: ${vals.join(", ")}` : null;
        }
        return formData[f.id]?.trim() ? `${f.label}: ${formData[f.id].trim()}` : null;
      }).filter(Boolean),
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

    // 1. Integrar com o CRM (Tabela de Leads do Supabase)
    const { error: crmError } = await supabase
      .from("leads")
      .insert({
        full_name: formData.nome || formData.name || "Cliente Interessado",
        phone: formData.whatsapp || formData.telefone || formData.phone || "",
        email: formData.email || "",
        insurance_type: config.type,
        raw_data: {
          ...formData,
          checkboxGroups
        }
      });

    if (crmError) {
      console.error("Erro ao registrar lead no CRM:", crmError);
      // Continuamos o processo mesmo se falhar no CRM, para não bloquear o usuário, 
      // mas o email servirá de backup.
    }

    // 2. Enviar e-mail de notificação
    const { error } = await safeInvoke("send-form-email", { 
      subject, 
      textBody: parts, 
      htmlBody 
    });

     if (error) {
       handleSupabaseError(error, "Não foi possível registrar seu pedido digitalmente.");
       toast.info("Você pode ligar para (11) 5199-7500 se o erro persistir.", { duration: 10000 });
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
      <div className="bg-primary/[0.03] border border-primary/10 rounded-2xl p-8 text-center animate-in zoom-in-95 duration-300">
        <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="font-bold text-2xl mb-3 text-foreground">Solicitação Enviada!</h3>
        <p className="text-muted-foreground mb-8 max-w-xs mx-auto">
          Para agilizar sua cotação, você pode continuar o atendimento agora mesmo pelo WhatsApp.
        </p>
        
        <div className="space-y-4">
          <Button 
            className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-6 text-lg h-auto gap-3"
            onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(finalMsg)}`, "_blank")}
          >
            <MessageCircle className="h-6 w-6" />
            Continuar no WhatsApp
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
        <h3 className="text-lg font-bold">{steps[currentStep - 1].title}</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-6">
        {currentStep === 1 ? config.subtitle : `Preencha os detalhes para sua cotação de ${config.type}`}
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
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
                      checked={checklistItems[item.id] || false}
                      onCheckedChange={() => toggleChecklistItem(item.id)}
                      className="mt-1"
                    />
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors leading-tight">
                      {item.label}
                    </span>
                  </label>
                ))}
              </div>

              <div className="bg-primary/5 rounded-xl p-4 border border-primary/10">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <Checkbox checked={consent} onCheckedChange={(v) => setConsent(v === true)} className="mt-1" />
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors leading-tight">
                    Concordo em receber contato especializado da Patro Seguros via WhatsApp ou E-mail para tratar desta cotação.
                  </span>
                </label>
              </div>
            </div>
          ) : (
            steps[currentStep - 1].fields.map(field => {
              const error = getFieldError(field);
              return (
                <div key={field.id} className="space-y-2">
                  <Label htmlFor={`iq-${field.id}`} className={error ? "text-destructive font-semibold" : "font-semibold"}>
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {field.options.map(opt => (
                        <label
                          key={opt}
                          className={`flex items-center gap-2 px-3 py-3 rounded-xl border cursor-pointer transition-all text-sm ${
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {field.options.map(opt => {
                        const checked = opt === "Todos"
                          ? (checkboxGroups[field.id]?.length === (field.options!.filter(o => o !== "Todos").length))
                          : checkboxGroups[field.id]?.includes(opt);
                        return (
                          <label
                            key={opt}
                            className={`flex items-center gap-2 px-3 py-3 rounded-xl border cursor-pointer transition-all text-sm ${
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
                      type={field.type === "email" ? "text" : field.type === "tel" ? "tel" : field.type === "date" ? "date" : "text"}
                      placeholder={field.placeholder || (field.type === "tel" ? "(11) 99999-9999" : field.type === "email" ? "seu@email.com" : "")}
                      value={formData[field.id] || ""}
                      onChange={e => update(field.id, field.type === "tel" ? formatPhone(e.target.value) : field.type === "currency" ? e.target.value : e.target.value)}
                      onBlur={() => handleBlur(field.id)}
                      className={`h-11 ${error ? "border-destructive focus-visible:ring-destructive" : ""}`}
                      aria-invalid={!!error}
                      aria-describedby={error ? `error-iq-${field.id}` : undefined}
                      aria-required={field.required}
                    />
                  )}

                  {error && (
                    <p id={`error-iq-${field.id}`} className="text-xs text-destructive animate-in fade-in slide-in-from-top-1">
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
          
          <Button 
            type="submit" 
            variant="cta" 
            className={`h-12 font-bold text-base flex-1 order-1 sm:order-2 ${currentStep === 1 ? "w-full" : ""}`}
            disabled={sending}
          >
            {sending ? (
              "Enviando..."
            ) : currentStep < totalSteps ? (
              <>Próximo Passo <ChevronRight className="ml-2 h-4 w-4" /></>
            ) : (
              <><Send className="mr-2 h-4 w-4" /> Finalizar e Receber Cotação</>
            )}
          </Button>
        </div>

        <div className="flex flex-col items-center gap-3">
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

