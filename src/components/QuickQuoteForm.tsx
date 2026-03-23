import { useState } from "react";
import { Send, CheckCircle, MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
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
  const [form, setForm] = useState<Record<string, string>>({ nome: "", telefone: "", email: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const update = (key: string, value: string) => setForm(prev => ({ ...prev, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nome?.trim() || !form.telefone?.trim()) return;

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

    setTimeout(() => {
      setSending(false);
      setSent(true);
      window.open(
        `https://wa.me/551151997500?text=${encodeURIComponent(parts)}`,
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
      <p className="text-sm text-muted-foreground mb-6">
        Preencha os dados abaixo e receba sua cotação personalizada em até 2 horas.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor={`qq-nome-${trackingLabel}`}>Nome *</Label>
            <Input
              id={`qq-nome-${trackingLabel}`}
              placeholder="Seu nome completo"
              value={form.nome}
              onChange={e => update("nome", e.target.value)}
              maxLength={100}
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor={`qq-tel-${trackingLabel}`}>WhatsApp *</Label>
            <Input
              id={`qq-tel-${trackingLabel}`}
              placeholder="(11) 99999-9999"
              value={form.telefone}
              onChange={e => update("telefone", e.target.value)}
              maxLength={20}
              required
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor={`qq-email-${trackingLabel}`}>E-mail</Label>
          <Input
            id={`qq-email-${trackingLabel}`}
            type="email"
            placeholder="seu@email.com"
            value={form.email || ""}
            onChange={e => update("email", e.target.value)}
            maxLength={255}
          />
        </div>

        {extraFields.map(field => (
          <div key={field.id} className="space-y-1.5">
            <Label htmlFor={`qq-${field.id}-${trackingLabel}`}>{field.label}</Label>
            {field.type === "select" && field.options ? (
              <Select value={form[field.id] || ""} onValueChange={v => update(field.id, v)}>
                <SelectTrigger id={`qq-${field.id}-${trackingLabel}`}>
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
                maxLength={200}
              />
            )}
          </div>
        ))}

        <Button type="submit" variant="cta" className="w-full" disabled={sending}>
          {sending ? "Enviando..." : <><Send className="mr-2 h-4 w-4" /> Solicitar Cotação Gratuita</>}
        </Button>
        <p className="text-xs text-muted-foreground text-center">
          Ao enviar, você será redirecionado ao WhatsApp para atendimento imediato.
        </p>
      </form>
    </div>
  );
};

export default QuickQuoteForm;
