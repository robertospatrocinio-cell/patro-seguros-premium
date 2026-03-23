import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { trackCotacaoSubmit } from "@/lib/tracking";
import { supabase } from "@/integrations/supabase/client";

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
  const [checkboxGroups, setCheckboxGroups] = useState<Record<string, string[]>>({});
  const [consent, setConsent] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const update = (key: string, value: string) => setFormData(prev => ({ ...prev, [key]: value }));

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid()) return;

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
      <h2>Nova Cotação de ${config.type}</h2>
      <table style="border-collapse:collapse;width:100%">
        ${config.fields.map(f => {
          if (f.type === "checkbox-group") {
            const vals = checkboxGroups[f.id];
            return vals?.length ? `<tr><td style="padding:6px;border:1px solid #ddd"><strong>${f.label}</strong></td><td style="padding:6px;border:1px solid #ddd">${vals.join(", ")}</td></tr>` : "";
          }
          return formData[f.id]?.trim() ? `<tr><td style="padding:6px;border:1px solid #ddd"><strong>${f.label}</strong></td><td style="padding:6px;border:1px solid #ddd">${formData[f.id].trim()}</td></tr>` : "";
        }).join("")}
      </table>
    `;

    supabase.functions.invoke("send-form-email", {
      body: { subject, textBody: parts, htmlBody },
    }).catch(err => console.error("Email send error:", err));

    setTimeout(() => {
      setSending(false);
      setSent(true);
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(parts)}`, "_blank");
    }, 600);
  };

  if (sent) {
    return (
      <div className="bg-primary/[0.03] border border-primary/10 rounded-2xl p-8 text-center">
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="h-7 w-7 text-primary" />
        </div>
        <h3 className="font-semibold text-lg mb-2">✓ Cotação recebida!</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Você receberá um contato em até 2 horas no WhatsApp (11) 5199-7500
        </p>
        <Button variant="outline" onClick={() => { setSent(false); setFormData({}); setCheckboxGroups({}); setConsent(false); }}>
          Solicitar outra cotação
        </Button>
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
        {config.fields.map(field => (
          <div key={field.id} className="space-y-1.5">
            <Label htmlFor={`iq-${field.id}`}>
              {field.label} {field.required && <span className="text-destructive">*</span>}
            </Label>

            {field.type === "select" && field.options && (
              <Select value={formData[field.id] || ""} onValueChange={v => update(field.id, v)}>
                <SelectTrigger id={`iq-${field.id}`}>
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
                        : "border-input hover:border-primary/30"
                    }`}
                  >
                    <input
                      type="radio"
                      name={field.id}
                      value={opt}
                      checked={formData[field.id] === opt}
                      onChange={() => update(field.id, opt)}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      formData[field.id] === opt ? "border-primary" : "border-muted-foreground/40"
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
                        checked ? "border-primary bg-primary/5" : "border-input hover:border-primary/30"
                      }`}
                    >
                      <Checkbox checked={checked} onCheckedChange={() => toggleCheckboxOption(field.id, opt)} />
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
                maxLength={16}
                required={field.required}
              />
            )}

            {field.type === "email" && (
              <Input
                id={`iq-${field.id}`}
                type="email"
                placeholder={field.placeholder || "seu@email.com"}
                value={formData[field.id] || ""}
                onChange={e => update(field.id, e.target.value)}
                maxLength={255}
                required={field.required}
              />
            )}

            {field.type === "text" && (
              <Input
                id={`iq-${field.id}`}
                placeholder={field.placeholder}
                value={formData[field.id] || ""}
                onChange={e => update(field.id, e.target.value)}
                maxLength={200}
                required={field.required}
              />
            )}

            {field.type === "date" && (
              <Input
                id={`iq-${field.id}`}
                type="date"
                value={formData[field.id] || ""}
                onChange={e => update(field.id, e.target.value)}
                required={field.required}
              />
            )}

            {field.type === "currency" && (
              <Input
                id={`iq-${field.id}`}
                placeholder={field.placeholder || "R$ 0,00"}
                value={formData[field.id] || ""}
                onChange={e => update(field.id, e.target.value)}
                maxLength={30}
                required={field.required}
              />
            )}

            {field.id === "cep" && field.type !== "tel" && field.type !== "text" && null}
          </div>
        ))}

        {/* Consent */}
        <label className="flex items-start gap-2 cursor-pointer">
          <Checkbox checked={consent} onCheckedChange={(v) => setConsent(v === true)} className="mt-0.5" />
          <span className="text-xs text-muted-foreground">Concordo em receber contato via WhatsApp/Email</span>
        </label>

        <Button type="submit" variant="cta" className="w-full h-12 text-base" disabled={sending || !isValid()}>
          {sending ? "Enviando..." : <><Send className="mr-2 h-4 w-4" /> Receber Cotação Grátis</>}
        </Button>
        <p className="text-xs text-muted-foreground text-center">
          100% gratuito · Resposta em até 2 horas · Sem compromisso
        </p>
      </form>
    </div>
  );
};

export default InsuranceQuoteForm;
