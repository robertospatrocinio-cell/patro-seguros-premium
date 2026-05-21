import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle, MessageCircle, ListChecks } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { trackCotacaoSubmit } from "@/lib/tracking";
 import { safeInvoke, handleSupabaseError } from "@/lib/supabase-helpers";
import { escapeHtml, validateEmail, validatePhone } from "@/lib/utils";
import { toast } from "sonner";

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
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [checkboxGroups, setCheckboxGroups] = useState<Record<string, string[]>>({});
  const [consent, setConsent] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [finalMsg, setFinalMsg] = useState("");
  const [showChecklist, setShowChecklist] = useState(false);
  const [checklistItems, setChecklistItems] = useState<Record<string, boolean>>({});

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
        if (!(checkboxGroups[field.id]?.length > 0)) return "Selecione ao menos uma opção";
      } else if (!value.trim()) {
        return "Campo obrigatório";
      }
    }

    if (value.trim()) {
      if (field.type === "email" && !validateEmail(value)) return "E-mail inválido";
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

  const isValid = () => {
    for (const field of config.fields) {
      if (!field.required) continue;
      if (field.type === "checkbox-group") {
        if (!(checkboxGroups[field.id]?.length > 0)) return false;
      } else {
        if (!formData[field.id]?.trim()) return false;
      }
    }
    return consent;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all as touched
    const allTouched: Record<string, boolean> = {};
    config.fields.forEach(f => { allTouched[f.id] = true });
    setTouched(allTouched);

    const firstError = config.fields.find(f => getFieldError(f));
    if (firstError || !consent) {
      toast.error(
        !consent 
          ? "Por favor, aceite os termos para continuar." 
          : `Por favor, corrija o campo: ${firstError?.label}`
      );
      return;
    }

    if (!showChecklist) {
      setShowChecklist(true);
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

    const { error } = await safeInvoke("send-form-email", { 
      subject, 
      textBody: parts, 
      htmlBody 
    });

     if (error) {
       // The user might be frustrated, so we provide a clear path forward
       handleSupabaseError(error, "Não foi possível registrar seu pedido digitalmente.");
       
       // Fallback: invite user to call or try WhatsApp directly
       toast.info("Você pode ligar para (11) 5199-7500 se o erro persistir.", { duration: 10000 });
       
       setSending(false);
       return;
     }

    setTimeout(() => {
      setSending(false);
      setSent(true);
      setFinalMsg(finalParts);
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
      <div className="flex items-center gap-3 mb-1">
        <span className="text-2xl" aria-hidden="true">{config.emoji}</span>
        <h3 className="text-lg font-bold">{compact ? `Cotação de ${config.type}` : config.title}</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-6">{config.subtitle}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {config.fields.map(field => {
          const error = getFieldError(field);
          return (
            <div key={field.id} className="space-y-1.5">
              <Label htmlFor={`iq-${field.id}`} className={error ? "text-destructive" : ""}>
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
                    className={error ? "border-destructive focus-visible:ring-destructive" : ""}
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
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border cursor-pointer transition-colors text-sm ${
                        formData[field.id] === opt
                          ? "border-primary bg-primary/5 text-foreground"
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
                      <span>{opt}</span>
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
                        className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border cursor-pointer transition-colors text-sm ${
                          checked 
                            ? "border-primary bg-primary/5" 
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
                        <span>{opt}</span>
                      </label>
                    );
                  })}
                </div>
              )}

              {field.type === "tel" && (
                <Input
                  id={`iq-${field.id}`}
                  type="tel"
                  placeholder={field.placeholder || "(11) 99999-9999"}
                  value={formData[field.id] || ""}
                  onChange={e => update(field.id, formatPhone(e.target.value))}
                  onBlur={() => handleBlur(field.id)}
                  maxLength={16}
                  className={error ? "border-destructive focus-visible:ring-destructive" : ""}
                />
              )}

              {field.type === "email" && (
                <Input
                  id={`iq-${field.id}`}
                  type="text"
                  placeholder={field.placeholder || "seu@email.com"}
                  value={formData[field.id] || ""}
                  onChange={e => update(field.id, e.target.value)}
                  onBlur={() => handleBlur(field.id)}
                  maxLength={255}
                  className={error ? "border-destructive focus-visible:ring-destructive" : ""}
                />
              )}

              {field.type === "text" && (
                <Input
                  id={`iq-${field.id}`}
                  placeholder={field.placeholder}
                  value={formData[field.id] || ""}
                  onChange={e => update(field.id, e.target.value)}
                  onBlur={() => handleBlur(field.id)}
                  maxLength={200}
                  className={error ? "border-destructive focus-visible:ring-destructive" : ""}
                />
              )}

              {field.type === "date" && (
                <Input
                  id={`iq-${field.id}`}
                  type="date"
                  value={formData[field.id] || ""}
                  onChange={e => update(field.id, e.target.value)}
                  onBlur={() => handleBlur(field.id)}
                  className={error ? "border-destructive focus-visible:ring-destructive" : ""}
                />
              )}

              {field.type === "currency" && (
                <Input
                  id={`iq-${field.id}`}
                  placeholder={field.placeholder || "R$ 0,00"}
                  value={formData[field.id] || ""}
                  onChange={e => update(field.id, e.target.value)}
                  onBlur={() => handleBlur(field.id)}
                  maxLength={30}
                  className={error ? "border-destructive focus-visible:ring-destructive" : ""}
                />
              )}

              {error && (
                <p className="text-xs text-destructive animate-in fade-in slide-in-from-top-1">{error}</p>
              )}
            </div>
          );
        })}

        {/* Checklist de Validação */}
        {showChecklist && (
          <div className="bg-white/80 border border-primary/20 rounded-xl p-4 space-y-3 animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-2 text-primary font-semibold text-sm mb-1">
              <ListChecks className="h-4 w-4" />
              <span>Confirme seus dados antes de enviar:</span>
            </div>
            {checklistOptions.map(item => (
              <label key={item.id} className="flex items-start gap-3 cursor-pointer group">
                <Checkbox 
                  id={item.id}
                  checked={checklistItems[item.id] || false}
                  onCheckedChange={() => toggleChecklistItem(item.id)}
                  className="mt-1"
                />
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  {item.label}
                </span>
              </label>
            ))}
          </div>
        )}

        {/* Consent */}
        <label className="flex items-start gap-2 cursor-pointer">
          <Checkbox checked={consent} onCheckedChange={(v) => setConsent(v === true)} className="mt-0.5" />
          <span className="text-xs text-muted-foreground">Concordo em receber contato via WhatsApp/Email</span>
        </label>

        <Button type="submit" variant="cta" className="w-full h-12 text-base" disabled={sending || !isValid() || (showChecklist && !isChecklistComplete)}>
          {sending ? "Enviando..." : showChecklist ? <><Send className="mr-2 h-4 w-4" /> Confirmar e Enviar</> : <><Send className="mr-2 h-4 w-4" /> Receber Cotação Grátis</>}
        </Button>
        <p className="text-xs text-muted-foreground text-center">
          100% gratuito · Resposta em até 2 horas · Sem compromisso
        </p>
      </form>
    </div>
  );
};

export default InsuranceQuoteForm;
