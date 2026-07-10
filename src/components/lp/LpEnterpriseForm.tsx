import { useState, FormEvent } from "react";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { submitLead } from "@/lib/leadsApi";
import { trackCotacaoSubmit, trackWhatsAppClick } from "@/lib/tracking";
import { maskPhone } from "@/lib/utils";
import { maskCNPJ, buildWhatsAppUrl } from "@/components/lp/LpShared";

// ---------- Types ----------
export type FieldDef =
  | { name: string; label: string; type?: "text" | "email" | "tel" | "cnpj" | "date"; required?: boolean; placeholder?: string; mask?: "phone" | "cnpj"; autoComplete?: string }
  | { name: string; label: string; type: "select"; options: string[]; required?: boolean }
  | { name: string; label: string; type: "textarea"; required?: boolean; placeholder?: string; maxLength?: number }
  | { name: string; label: string; type: "checkboxGroup"; options: string[]; required?: boolean };

export interface LpEnterpriseFormProps {
  title: string;
  source: string;
  insuranceType: string;
  submitLabel: string;
  successMessage?: string;
  fields: FieldDef[];
  whatsappSuccessMessage?: string;
}

const defaultSuccess =
  "Recebemos suas informações. Nossa equipe entrará em contato para compreender melhor sua necessidade. O envio do formulário não representa proposta, contratação, aceitação do risco ou garantia de cobertura.";

/**
 * Formulário empresarial configurável para as landing pages de soluções B2B.
 * Aplica validação básica, máscaras e envia ao Supabase via submitLead.
 * Preparado para integração futura com CRM/webhook (basta trocar submitLead).
 */
export const LpEnterpriseForm = ({
  title,
  source,
  insuranceType,
  submitLabel,
  successMessage = defaultSuccess,
  fields,
  whatsappSuccessMessage,
}: LpEnterpriseFormProps) => {
  const initial: Record<string, string | string[]> = {};
  fields.forEach((f) => (initial[f.name] = f.type === "checkboxGroup" ? [] : ""));
  const [values, setValues] = useState<Record<string, string | string[]>>(initial);
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState(""); // honeypot
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const setValue = (name: string, val: string | string[]) => {
    setValues((p) => ({ ...p, [name]: val }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const toggleMulti = (name: string, opt: string) => {
    const current = (values[name] as string[]) || [];
    setValue(name, current.includes(opt) ? current.filter((x) => x !== opt) : [...current, opt]);
  };

  const validate = () => {
    const e: Record<string, string> = {};
    for (const f of fields) {
      if (!("required" in f) || !f.required) continue;
      const v = values[f.name];
      if (f.type === "checkboxGroup") {
        if (!Array.isArray(v) || v.length === 0) e[f.name] = "Selecione ao menos uma opção";
      } else if (typeof v !== "string" || !v.trim()) {
        e[f.name] = "Campo obrigatório";
      } else if (f.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
        e[f.name] = "E-mail inválido";
      } else if (f.type === "tel" && v.replace(/\D/g, "").length < 10) {
        e[f.name] = "Telefone inválido";
      }
    }
    if (!consent) e.consent = "É necessário autorizar o contato";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    if (website) return; // honeypot
    if (!validate()) {
      toast.error("Verifique os campos do formulário.");
      return;
    }

    setIsSubmitting(true);
    try {
      const raw: Record<string, unknown> = {};
      for (const f of fields) {
        if (["name", "email", "phone"].includes(f.name)) continue;
        raw[f.name] = values[f.name];
      }
      const { error } = await submitLead({
        full_name: String(values.name || ""),
        email: String(values.email || ""),
        phone: String(values.phone || ""),
        insurance_type: insuranceType,
        source_page: source,
        raw_data: raw,
      });
      if (error) throw error;
      trackCotacaoSubmit(insuranceType, { origin: source });
      setSubmitted(true);
      toast.success("Solicitação enviada com sucesso!");
    } catch (err) {
      console.error(err);
      toast.error("Não foi possível enviar agora. Tente novamente ou fale no WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-xl border border-primary/20 bg-primary/5 p-8 text-center">
        <CheckCircle2 className="h-12 w-12 text-primary mx-auto mb-4" />
        <h3 className="text-xl font-semibold">Recebemos suas informações.</h3>
        <p className="mt-3 text-muted-foreground">{successMessage}</p>
        <div className="mt-6">
          <a
            href={buildWhatsAppUrl(whatsappSuccessMessage || "Olá! Acabei de enviar um formulário no site da Patro Seguros e gostaria de continuar o atendimento.")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick(`${source}-form-success`, { insuranceType, origin: source })}
            className="inline-flex items-center gap-2 rounded-md bg-accent hover:bg-[hsl(var(--accent-hover))] text-accent-foreground font-semibold px-6 py-3"
          >
            <MessageCircle className="h-5 w-5" /> Falar pelo WhatsApp agora
          </a>
        </div>
      </div>
    );
  }

  const cls = (err?: string) =>
    `w-full rounded-md border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:ring-2 focus:ring-primary/40 ${
      err ? "border-destructive" : "border-input focus:border-primary"
    }`;

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm space-y-5">
      {title && <h3 className="text-xl font-semibold mb-2">{title}</h3>}

      {/* Honeypot */}
      <input
        type="text"
        name="website"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="grid md:grid-cols-2 gap-4">
        {fields.map((f) => {
          const err = errors[f.name];
          const v = values[f.name];
          const label = (
            <span className="block text-sm font-medium mb-1.5">
              {f.label} {"required" in f && f.required && <span className="text-destructive">*</span>}
            </span>
          );

          const fullWidth = f.type === "textarea" || f.type === "checkboxGroup";
          return (
            <label key={f.name} className={`block ${fullWidth ? "md:col-span-2" : ""}`}>
              {label}
              {f.type === "select" ? (
                <select value={v as string} onChange={(e) => setValue(f.name, e.target.value)} className={cls(err)}>
                  <option value="">Selecione</option>
                  {f.options.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              ) : f.type === "textarea" ? (
                <textarea
                  value={v as string}
                  onChange={(e) => setValue(f.name, e.target.value)}
                  className={cls(err) + " min-h-[100px] resize-y"}
                  maxLength={f.maxLength ?? 1500}
                  placeholder={f.placeholder}
                />
              ) : f.type === "checkboxGroup" ? (
                <div className="flex flex-wrap gap-2">
                  {f.options.map((o) => {
                    const selected = (v as string[]).includes(o);
                    return (
                      <button
                        type="button"
                        key={o}
                        onClick={() => toggleMulti(f.name, o)}
                        aria-pressed={selected}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                          selected
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-background border-border hover:border-primary"
                        }`}
                      >
                        {o}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <input
                  type={f.type === "cnpj" ? "text" : f.type || "text"}
                  value={v as string}
                  autoComplete={f.autoComplete}
                  inputMode={f.type === "tel" || f.mask === "phone" || f.mask === "cnpj" || f.type === "cnpj" ? "numeric" : undefined}
                  placeholder={f.placeholder}
                  onChange={(e) => {
                    const raw = e.target.value;
                    if (f.mask === "phone" || f.type === "tel") setValue(f.name, maskPhone(raw));
                    else if (f.mask === "cnpj" || f.type === "cnpj") setValue(f.name, maskCNPJ(raw));
                    else setValue(f.name, raw);
                  }}
                  className={cls(err)}
                />
              )}
              {err && <span className="mt-1 block text-xs text-destructive">{err}</span>}
            </label>
          );
        })}
      </div>

      <label className="flex items-start gap-3 text-sm text-muted-foreground">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1 h-4 w-4"
        />
        <span>
          Autorizo o contato da Patro Seguros e declaro que li a{" "}
          <a href="/politica-de-privacidade" className="text-primary underline" target="_blank" rel="noreferrer">
            Política de Privacidade
          </a>.
        </span>
      </label>
      {errors.consent && <p className="text-xs text-destructive -mt-3">{errors.consent}</p>}

      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="w-full bg-accent hover:bg-[hsl(var(--accent-hover))] text-accent-foreground font-semibold"
      >
        {isSubmitting ? "Enviando…" : submitLabel}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        O envio do formulário não representa proposta, contratação, aceitação do risco ou garantia de cobertura.
      </p>
    </form>
  );
};

export default LpEnterpriseForm;