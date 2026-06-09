import { useState, useEffect } from "react";
import { Send, CheckCircle, MessageCircle, TrendingDown, Save, ChevronRight, ChevronLeft } from "lucide-react";
import { safeInvoke, handleSupabaseError } from "@/lib/supabase-helpers";
import { escapeHtml, validateEmail, validatePhone, maskPhone } from "@/lib/utils";
import { toast } from "sonner";
import { usePersistentForm } from "@/hooks/usePersistentForm";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";


import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface QuickQuoteFormProps {
  /** Insurance product name shown in the heading */
  insuranceType: string;
  /** Extra fields specific to the insurance type */
  extraFields?: { id: string; label: string; placeholder: string; type?: "text" | "select"; options?: string[] }[];
  /** Tracking label for analytics */
  trackingLabel: string;
}

const QuickQuoteForm = ({ insuranceType, extraFields = [], trackingLabel }: QuickQuoteFormProps) => {
  const storageKey = `quick-quote-${trackingLabel.toLowerCase().replace(/\s+/g, "-")}`;
  const [form, setForm, clearForm] = usePersistentForm<Record<string, string>>(storageKey, { nome: "", telefone: "", email: "" });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);


  const validateField = (key: string, value: string) => {
    if (key === "nome") {
      if (!value.trim()) return "Nome é obrigatório";
      if (value.trim().length < 3) return "Nome muito curto";
    }
    if (key === "telefone") {
      if (!value.trim()) return "WhatsApp é obrigatório";
      if (!validatePhone(value)) return "Formato: (11) 99999-9999";
    }
    if (key === "email" && value.trim()) {
      if (!validateEmail(value)) return "E-mail inválido";
    }
    return "";
  };

  const getFieldError = (key: string) => {
    if (!touched[key]) return "";
    return validateField(key, form[key] || "");
  };

  const update = (key: string, value: string) => {
    let finalValue = value;
    if (key === "telefone") {
      finalValue = maskPhone(value);
    }
    setForm(prev => ({ ...prev, [key]: finalValue }));
  };

  const handleBlur = (key: string) => {
    setTouched(prev => ({ ...prev, [key]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all as touched to show errors
    const allTouched = { nome: true, telefone: true, email: true };
    extraFields.forEach(f => { (allTouched as any)[f.id] = true });
    setTouched(allTouched);

    // Final check
    const nomeError = validateField("nome", form.nome);
    const telError = validateField("telefone", form.telefone);
    const emailError = validateField("email", form.email || "");

    if (nomeError || telError || emailError) {
      toast.error(nomeError || telError || emailError || "Por favor, corrija os erros no formulário.");
      return;
    }

    setSending(true);

    const parts = [
      `Olá! Gostaria de uma cotação de *${insuranceType}*.`,
      `Nome: ${form.nome.trim()}`,
      `Telefone: ${form.telefone.trim()}`,
      form.email?.trim() && `E-mail: ${form.email.trim()}`,
      ...extraFields
        .filter(f => form[f.id]?.trim())
        .map(f => `${f.label}: ${form[f.id].trim()}`),
    ].filter(Boolean).join("\n");

    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "Lead", {
        content_name: `formulario-${trackingLabel}`,
        content_category: insuranceType,
      });
    }
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "generate_lead", {
        event_category: "formulario",
        event_label: trackingLabel,
      });
    }

    const subject = `Nova Cotação — ${insuranceType}`;
    const htmlBody = `
      <h2>Nova Cotação de ${escapeHtml(insuranceType)}</h2>
      <table style="border-collapse:collapse;width:100%">
        <tr><td style="padding:6px;border:1px solid #ddd"><strong>Nome</strong></td><td style="padding:6px;border:1px solid #ddd">${escapeHtml(form.nome.trim())}</td></tr>
        <tr><td style="padding:6px;border:1px solid #ddd"><strong>Telefone</strong></td><td style="padding:6px;border:1px solid #ddd">${escapeHtml(form.telefone.trim())}</td></tr>
        ${form.email?.trim() ? `<tr><td style="padding:6px;border:1px solid #ddd"><strong>E-mail</strong></td><td style="padding:6px;border:1px solid #ddd">${escapeHtml(form.email.trim())}</td></tr>` : ""}
        ${extraFields.filter(f => form[f.id]?.trim()).map(f => `<tr><td style="padding:6px;border:1px solid #ddd"><strong>${escapeHtml(f.label)}</strong></td><td style="padding:6px;border:1px solid #ddd">${escapeHtml(form[f.id].trim())}</td></tr>`).join("")}
      </table>
    `;

    const { error } = await safeInvoke("send-form-email", {
      subject,
      textBody: parts,
      htmlBody
    });

    if (error) {
      handleSupabaseError(error, "Ops! Ocorreu um erro ao processar seu pedido de cotação.");
      setSending(false);
      return;
    }

    const lastErrorId = (window as any).lastErrorId;
    const finalParts = lastErrorId 
      ? `${parts}\n\n_Ref. Erro anterior: ${lastErrorId}_`
      : parts;

    setTimeout(() => {
      setSending(false);
      setSent(true);
      clearForm();
      window.open(
        `https://wa.me/551151997500?text=${encodeURIComponent(finalParts)}`,
        "_blank"
      );
    }, 500);

  };

  if (sent) {
    return (
      <div className="bg-primary/[0.03] border border-primary/10 rounded-2xl p-8 text-center">
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="h-7 w-7 text-primary" />
        </div>
        <h3 className="font-semibold text-lg mb-2">Cotação enviada!</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Você foi redirecionado ao WhatsApp. Retornaremos em até 2h úteis.
        </p>
        <Button
          variant="outline"
          onClick={() => {
            setSent(false);
            setForm({ nome: "", telefone: "", email: "" });
          }}
        >
          Solicitar outra cotação
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-primary/[0.03] border border-primary/10 rounded-2xl p-6 md:p-8">
      <div className="flex items-center gap-3 mb-1">
        <MessageCircle className="h-5 w-5 text-primary" aria-hidden="true" />
        <h3 className="text-lg font-bold">Cotação Rápida de {insuranceType}</h3>
      </div>
      <p className="text-sm text-foreground/80 mb-6">
        Preencha os dados abaixo e receba sua cotação personalizada em até 2 horas.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor={`qq-nome-${trackingLabel}`} className={getFieldError("nome") ? "text-destructive" : ""}>
              Nome *
            </Label>
            <Input
              id={`qq-nome-${trackingLabel}`}
              placeholder="Seu nome completo"
              value={form.nome}
              onChange={e => update("nome", e.target.value)}
              onBlur={() => handleBlur("nome")}
              maxLength={100}
              className={getFieldError("nome") ? "border-destructive focus-visible:ring-destructive" : ""}
              aria-invalid={!!getFieldError("nome")}
              aria-describedby={getFieldError("nome") ? `error-qq-nome-${trackingLabel}` : undefined}
              aria-required="true"
            />
            {getFieldError("nome") && (
              <p id={`error-qq-nome-${trackingLabel}`} className="text-xs text-destructive animate-in fade-in slide-in-from-top-1">{getFieldError("nome")}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor={`qq-tel-${trackingLabel}`} className={getFieldError("telefone") ? "text-destructive" : ""}>
              WhatsApp *
            </Label>
            <Input
              id={`qq-tel-${trackingLabel}`}
              placeholder="(11) 99999-9999"
              value={form.telefone}
              onChange={e => update("telefone", e.target.value)}
              onBlur={() => handleBlur("telefone")}
               maxLength={20}
              className={getFieldError("telefone") ? "border-destructive focus-visible:ring-destructive" : ""}
              aria-invalid={!!getFieldError("telefone")}
              aria-describedby={getFieldError("telefone") ? `error-qq-tel-${trackingLabel}` : undefined}
              aria-required="true"
            />
            {getFieldError("telefone") && (
              <p id={`error-qq-tel-${trackingLabel}`} className="text-xs text-destructive animate-in fade-in slide-in-from-top-1">{getFieldError("telefone")}</p>
            )}
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor={`qq-email-${trackingLabel}`} className={getFieldError("email") ? "text-destructive" : ""}>
            E-mail
          </Label>
          <Input
            id={`qq-email-${trackingLabel}`}
            type="text"
            placeholder="seu@email.com"
            value={form.email || ""}
            onChange={e => update("email", e.target.value)}
             onBlur={() => handleBlur("email")}
            maxLength={255}
            className={getFieldError("email") ? "border-destructive focus-visible:ring-destructive" : ""}
            aria-invalid={!!getFieldError("email")}
            aria-describedby={getFieldError("email") ? `error-qq-email-${trackingLabel}` : undefined}
          />
          {getFieldError("email") && (
            <p id={`error-qq-email-${trackingLabel}`} className="text-xs text-destructive animate-in fade-in slide-in-from-top-1">{getFieldError("email")}</p>
          )}
        </div>

        {extraFields.map(field => {
          const fieldError = getFieldError(field.id);
          return (
            <div key={field.id} className="space-y-1.5">
              <Label htmlFor={`qq-${field.id}-${trackingLabel}`} className={fieldError ? "text-destructive" : ""}>
                {field.label}
              </Label>
              {field.type === "select" && field.options ? (
                <Select 
                  value={form[field.id] || ""} 
                  onValueChange={v => {
                    update(field.id, v);
                    handleBlur(field.id);
                  }}
                >
                   <SelectTrigger 
                    id={`qq-${field.id}-${trackingLabel}`}
                    className={fieldError ? "border-destructive focus-visible:ring-destructive" : ""}
                    aria-invalid={!!fieldError}
                    aria-describedby={fieldError ? `error-qq-${field.id}-${trackingLabel}` : undefined}
                  >
                    <SelectValue placeholder={field.placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options.map(opt => (
                      <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  id={`qq-${field.id}-${trackingLabel}`}
                  placeholder={field.placeholder}
                  value={form[field.id] || ""}
                  onChange={e => update(field.id, e.target.value)}
                   onBlur={() => handleBlur(field.id)}
                  maxLength={200}
                  className={fieldError ? "border-destructive focus-visible:ring-destructive" : ""}
                  aria-invalid={!!fieldError}
                  aria-describedby={fieldError ? `error-qq-${field.id}-${trackingLabel}` : undefined}
                />
              )}
              {fieldError && (
                <p id={`error-qq-${field.id}-${trackingLabel}`} className="text-xs text-destructive animate-in fade-in slide-in-from-top-1">{fieldError}</p>
              )}
            </div>
          );
        })}

        <Button type="submit" variant="cta" className="w-full h-12 font-bold text-sm" disabled={sending}>
          {sending ? "Enviando..." : <><Send className="mr-2 h-4 w-4" /> Cotar meu seguro agora</>}
        </Button>
        <div className="flex flex-col items-center gap-2 mt-4">
          <div className="flex items-center justify-center gap-2 text-[10px] text-foreground/70">
            <TrendingDown className="h-3 w-3 text-green-600" />
            <span>Nota 4.9 no Google | Comparativo de 16+ seguradoras</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground/60">
            <Save className="h-3 w-3" />
            <span>Progresso salvo automaticamente</span>
          </div>
        </div>

      </form>
    </div>
  );
};

export default QuickQuoteForm;
