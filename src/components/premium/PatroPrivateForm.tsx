import { useState, FormEvent } from "react";
import { submitLead } from "@/lib/leadsApi";
import { trackCotacaoClick } from "@/lib/tracking";

const PROFILES = [
  "Veículo premium",
  "Residência alto padrão",
  "Empresário / Sócio",
  "Proteção familiar",
  "Empresa",
  "Outro",
] as const;

type Profile = (typeof PROFILES)[number];

export const PatroPrivateForm = () => {
  const [state, setState] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [profile, setProfile] = useState<Profile>("Veículo premium");
  const [lgpd, setLgpd] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!lgpd) return;
    setState("sending");
    const form = e.currentTarget;
    const fd = new FormData(form);
    const full_name = String(fd.get("full_name") || "").trim();
    const phone = String(fd.get("phone") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const city = String(fd.get("city") || "").trim();
    const best_time = String(fd.get("best_time") || "").trim();
    const message = String(fd.get("message") || "").trim();

    try {
      trackCotacaoClick("Patro Private", "form");
      const { error } = await submitLead({
        full_name,
        phone,
        email,
        insurance_type: "Patro Private",
        source_page: "patro-private",
        raw_data: {
          origem: "patro-private",
          perfil: profile,
          cidade: city,
          melhor_horario: best_time,
          mensagem: message,
        },
      });
      if (error) throw error;
      setState("ok");
      form.reset();
    } catch {
      setState("error");
    }
  }

  if (state === "ok") {
    return (
      <div
        className="p-10 text-center"
        style={{ background: "white", boxShadow: "var(--premium-shadow-soft)" }}
      >
        <div
          className="text-[11px] uppercase tracking-[0.22em] mb-3"
          style={{ color: "hsl(var(--premium-champagne))" }}
        >
          Solicitação recebida
        </div>
        <h3
          className="font-serif text-2xl md:text-3xl mb-3"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: "hsl(var(--premium-navy))" }}
        >
          Em breve um consultor entrará em contato.
        </h3>
        <p className="text-sm" style={{ color: "hsl(var(--premium-ink))" }}>
          Recebemos sua solicitação para análise personalizada Patro Private. Um especialista entrará em contato em horário comercial pelo canal indicado.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-8 md:p-10"
      style={{ background: "white", boxShadow: "var(--premium-shadow-soft)" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field name="full_name" label="Nome completo" required />
        <Field name="phone" label="WhatsApp" required type="tel" placeholder="(11) 9 0000-0000" />
        <Field name="email" label="E-mail" required type="email" />
        <Field name="city" label="Cidade" defaultValue="Guarulhos" />

        <div className="md:col-span-2">
          <label className="block text-[11px] uppercase tracking-[0.18em] mb-2" style={{ color: "hsl(var(--premium-navy-soft))" }}>
            Perfil
          </label>
          <div className="flex flex-wrap gap-2">
            {PROFILES.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setProfile(p)}
                className="px-4 py-2 text-sm border transition"
                style={{
                  borderColor: profile === p ? "hsl(var(--premium-navy))" : "hsl(var(--premium-rule))",
                  background: profile === p ? "hsl(var(--premium-navy))" : "transparent",
                  color: profile === p ? "white" : "hsl(var(--premium-ink))",
                }}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <Field name="best_time" label="Melhor horário de contato" placeholder="Ex: manhã, após 18h..." />

        <div className="md:col-span-2">
          <label className="block text-[11px] uppercase tracking-[0.18em] mb-2" style={{ color: "hsl(var(--premium-navy-soft))" }}>
            Mensagem (opcional)
          </label>
          <textarea
            name="message"
            rows={3}
            className="w-full border px-4 py-3 text-sm bg-transparent focus:outline-none focus:border-[hsl(var(--premium-navy))]"
            style={{ borderColor: "hsl(var(--premium-rule))" }}
          />
        </div>

        <label className="md:col-span-2 flex items-start gap-3 text-xs leading-relaxed" style={{ color: "hsl(var(--premium-ink))" }}>
          <input
            type="checkbox"
            checked={lgpd}
            onChange={(e) => setLgpd(e.target.checked)}
            required
            className="mt-1"
          />
          <span>
            Autorizo a Patro Seguros a tratar meus dados para retorno desta solicitação, conforme a{" "}
            <a href="/politica-privacidade" className="underline">Política de Privacidade</a>.
          </span>
        </label>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={state === "sending" || !lgpd}
          className="inline-flex items-center gap-2 px-7 py-3.5 text-sm tracking-wide transition disabled:opacity-50"
          style={{ background: "hsl(var(--premium-navy))", color: "white" }}
        >
          {state === "sending" ? "Enviando..." : "Solicitar análise personalizada"}
          <span aria-hidden>→</span>
        </button>
        <p className="text-xs" style={{ color: "hsl(var(--premium-navy-soft))" }}>
          Sem compromisso. Atendimento consultivo por especialista da Patro Seguros.
        </p>
      </div>

      {state === "error" && (
        <p className="mt-4 text-sm" style={{ color: "hsl(var(--destructive))" }}>
          Não foi possível enviar agora. Tente novamente ou fale via WhatsApp (11) 5199-7500.
        </p>
      )}
    </form>
  );
};

function Field({
  name,
  label,
  required,
  type = "text",
  placeholder,
  defaultValue,
}: {
  name: string;
  label: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  defaultValue?: string;
}) {
  return (
    <div>
      <label className="block text-[11px] uppercase tracking-[0.18em] mb-2" style={{ color: "hsl(var(--premium-navy-soft))" }}>
        {label}
        {required && <span aria-hidden> *</span>}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="w-full border px-4 py-3 text-sm bg-transparent focus:outline-none focus:border-[hsl(var(--premium-navy))]"
        style={{ borderColor: "hsl(var(--premium-rule))" }}
      />
    </div>
  );
}

export default PatroPrivateForm;