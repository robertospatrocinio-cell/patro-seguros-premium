import { useRef, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { ArrowRight, Lock } from "lucide-react";
import ConsorcioHubContent from "@/components/consorcio/ConsorcioHubContent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { nameSchema, whatsappSchema } from "@/lib/leadValidation";
import { showValidationError, showFriendlyError } from "@/lib/friendlyToast";
import { trackCotacaoSubmit, trackCotacaoClick, trackWhatsAppClick } from "@/lib/tracking";
import { submitLead } from "@/lib/leadsApi";
import { safeInvoke, handleSupabaseError } from "@/lib/supabase-helpers";
import { escapeHtml } from "@/lib/utils";
import { formatConsorcioCurrency } from "@/lib/consorcioSimulation";
import { EMPRESA, WHATSAPP_URL_BASE } from "@/config/empresa";

const simulacaoSchema = z.object({
  name: nameSchema, whatsapp: whatsappSchema,
  city: z.string().trim().min(2, "Informe sua cidade").max(80),
  tipo: z.enum(["Imóveis", "Veículos", "Pesados e agro", "Serviços"], { errorMap: () => ({ message: "Escolha a modalidade" }) }),
  credito: z.string().trim().max(40).refine(value => {
    if (!/^(?:R\$\s*)?(?:\d{1,3}(?:\.\d{3})+|\d+)(?:,\d{1,2})?$/.test(value)) return false;
    const amount = Number(value.replace(/R\$|\s|\./g, "").replace(",", "."));
    return amount > 0 && amount <= 100000000;
  }, "Informe um crédito válido, como R$ 300.000,00, maior que zero e até R$ 100 milhões"),
  horario: z.enum(["Manhã", "Tarde", "Qualquer horário comercial"], { errorMap: () => ({ message: "Escolha o melhor horário" }) }),
});
const SUBMIT_DEDUPE_KEY = "consorcio:lastSubmit";
const SUBMIT_DEDUPE_WINDOW_MS = 5 * 60 * 1000;
const emptyForm = { name: "", whatsapp: "", city: "", tipo: "", credito: "", horario: "" };
const hashPayload = (obj: Record<string, string>): string => {
  const str = JSON.stringify(obj, Object.keys(obj).sort());
  let h = 0;
  for (let i = 0; i < str.length; i++) { h = (h << 5) - h + str.charCodeAt(i); h |= 0; }
  return `h${h}`;
};

export default function Consorcio() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [scenarioSummary, setScenarioSummary] = useState("");
  const [errors, setErrors] = useState<Partial<Record<keyof typeof emptyForm, string>>>({});
  const [confirmation, setConfirmation] = useState<{ message: string; url: string } | null>(null);
  const submittingRef = useRef(false);
  const fieldIds = { name: "consorcio-name", whatsapp: "consorcio-phone", city: "consorcio-city", tipo: "consorcio-type", credito: "consorcio-credit", horario: "consorcio-time" };
  const fieldA11y = (key: keyof typeof emptyForm) => ({ name: key, "aria-invalid": !!errors[key], "aria-describedby": errors[key] ? `error-${key}` : undefined });
  const update = (key: keyof typeof emptyForm, value: string) => {
    setErrors(old => ({ ...old, [key]: undefined }));
    setConfirmation(null);
    setForm(old => ({ ...old, [key]: value }));
    // Uma alteração manual do objetivo invalida o cenário importado do simulador.
    if (key === "tipo" || key === "credito") setScenarioSummary("");
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (submittingRef.current || loading) return;
    const parsed = simulacaoSchema.safeParse(form);
    if (!parsed.success) {
      const nextErrors: Partial<Record<keyof typeof emptyForm, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof typeof emptyForm;
        if (!nextErrors[key]) nextErrors[key] = issue.message;
      }
      setErrors(nextErrors);
      const firstKey = parsed.error.issues[0].path[0] as keyof typeof emptyForm;
      document.getElementById(fieldIds[firstKey])?.focus();
      showValidationError(parsed.error.issues[0].message);
      return;
    }
    setErrors({});
    setConfirmation(null);
    const { name, whatsapp, city, tipo, credito, horario } = parsed.data;
    const payloadHash = hashPayload({ ...parsed.data, cenario: scenarioSummary });
    const message = `Olá, sou ${name} (${whatsapp}), de ${city}. Quero simular um consórcio de ${tipo} com crédito de ${credito}. Melhor horário: ${horario}. ${scenarioSummary}`;
    const whatsappUrl = `${WHATSAPP_URL_BASE}?text=${encodeURIComponent(message)}`;
    try {
      const raw = sessionStorage.getItem(SUBMIT_DEDUPE_KEY);
      if (raw) {
        const previous = JSON.parse(raw) as { hash: string; ts: number };
        if (previous.hash === payloadHash && Date.now() - previous.ts < SUBMIT_DEDUPE_WINDOW_MS) {
          setConfirmation({ message: "Esta solicitação já foi recebida há instantes. Se desejar, continue a conversa pelo WhatsApp.", url: whatsappUrl });
          toast.info("Esta solicitação já foi recebida. Você pode continuar pelo WhatsApp no botão abaixo.");
          return;
        }
      }
    } catch { /* Armazenamento indisponível não impede o atendimento. */ }
    submittingRef.current = true;
    setLoading(true);
    try {
      const { error: crmError } = await submitLead({
        full_name: name, phone: whatsapp, email: null, insurance_type: "Consórcio", source_page: "/consorcio",
        raw_data: { cidade: city, tipo_consorcio: tipo, credito_aproximado: credito, melhor_horario: horario, origem: "consorcio_simulacao", cenario_educativo: scenarioSummary || null },
      });
      if (crmError) console.error("Erro ao registrar lead de consórcio no CRM:", crmError);
      const rows = [
        ["Nome", name], ["WhatsApp", whatsapp], ["Cidade", city], ["Tipo de consórcio", tipo],
        ["Crédito aproximado", credito], ["Melhor horário", horario], ["Origem", "/consorcio"],
        ["Cenário educativo", scenarioSummary || "Não informado"],
      ];
      const { error: emailError } = await safeInvoke("send-form-email", {
        subject: `Nova Simulação — Consórcio (${tipo})`,
        textBody: `Nova solicitação de simulação de consórcio.\n\n${rows.map(([label, value]) => `${label}: ${value}`).join("\n")}`,
        htmlBody: `<h2>Nova Simulação de Consórcio — ${escapeHtml(tipo)}</h2><table>${rows.map(([label, value]) => `<tr><th>${escapeHtml(label)}</th><td>${escapeHtml(value)}</td></tr>`).join("")}</table>`,
      });
      if (emailError && crmError) {
        handleSupabaseError(emailError, "Não foi possível registrar sua simulação digitalmente.");
        setConfirmation({ message: `O envio digital falhou. Seus campos foram mantidos: tente novamente ou fale com a Patro pelo WhatsApp ou telefone ${EMPRESA.telefone}.`, url: whatsappUrl });
        return;
      }
      // Um canal confirmado basta para receber a solicitação; não incentivar
      // reenvios e registros duplicados quando apenas o outro canal falha.
      setConfirmation({ message: "Recebemos sua solicitação para análise. Se desejar, continue a conversa pelo WhatsApp. Não é uma proposta nem confirmação de contratação.", url: whatsappUrl });
      trackCotacaoSubmit("consorcio", { origin: "consorcio_simulacao" });
      toast.success("Recebemos sua solicitação! A Patro dará continuidade ao atendimento.");
      try { sessionStorage.setItem(SUBMIT_DEDUPE_KEY, JSON.stringify({ hash: payloadHash, ts: Date.now() })); } catch { /* Opcional. */ }
      setForm(emptyForm);
      setScenarioSummary("");
    } catch (error) {
      console.error("Consorcio submit failed", error);
      showFriendlyError();
    } finally {
      setLoading(false);
      submittingRef.current = false;
    }
  };

  return <ConsorcioHubContent onRequest={(credit, summary, modality) => {
    setScenarioSummary(summary);
    setForm(old => ({ ...old, credito: formatConsorcioCurrency(credit), tipo: modality === "Pesados & Agro" ? "Pesados e agro" : modality }));
    document.getElementById("simulacao")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
    document.getElementById("consorcio-name")?.focus({ preventScroll: true });
    trackCotacaoClick("consorcio_anchor");
  }}>
    <form onSubmit={handleSubmit} noValidate data-analytics-form="consorcio_simulacao" className="space-y-5 rounded-2xl border border-slate-200 p-5 md:p-8 bg-white text-slate-900" aria-label="Solicitar análise de consórcio" aria-busy={loading}>
      <fieldset disabled={loading} className="space-y-5">
        <legend className="sr-only">Dados para receber orientação da Patro</legend>
        <div><label htmlFor="consorcio-name" className="block mb-2 text-sm font-medium">Nome completo</label><Input {...fieldA11y("name")} id="consorcio-name" autoComplete="name" value={form.name} onChange={e => update("name", e.target.value)} required maxLength={120} className="h-12 bg-white text-slate-900" />{errors.name && <p id="error-name" className="mt-2 text-sm text-red-700">{errors.name}</p>}</div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div><label htmlFor="consorcio-phone" className="block mb-2 text-sm font-medium">WhatsApp com DDD</label><Input {...fieldA11y("whatsapp")} id="consorcio-phone" type="tel" autoComplete="tel" placeholder="(11) 99999-9999" value={form.whatsapp} onChange={e => update("whatsapp", e.target.value)} required maxLength={20} className="h-12 bg-white text-slate-900" />{errors.whatsapp && <p id="error-whatsapp" className="mt-2 text-sm text-red-700">{errors.whatsapp}</p>}</div>
          <div><label htmlFor="consorcio-city" className="block mb-2 text-sm font-medium">Cidade e estado</label><Input {...fieldA11y("city")} id="consorcio-city" autoComplete="address-level2" placeholder="Sua cidade / UF" value={form.city} onChange={e => update("city", e.target.value)} required maxLength={80} className="h-12 bg-white text-slate-900" />{errors.city && <p id="error-city" className="mt-2 text-sm text-red-700">{errors.city}</p>}</div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div><label htmlFor="consorcio-type" className="block mb-2 text-sm font-medium">Modalidade</label><Select name="tipo" value={form.tipo} onValueChange={value => update("tipo", value)} required disabled={loading}><SelectTrigger {...fieldA11y("tipo")} id="consorcio-type" className="h-12 bg-white text-slate-900"><SelectValue placeholder="Selecione" /></SelectTrigger><SelectContent>{["Imóveis", "Veículos", "Pesados e agro", "Serviços"].map(value => <SelectItem key={value} value={value}>{value}</SelectItem>)}</SelectContent></Select>{errors.tipo && <p id="error-tipo" className="mt-2 text-sm text-red-700">{errors.tipo}</p>}</div>
          <div><label htmlFor="consorcio-credit" className="block mb-2 text-sm font-medium">Crédito aproximado</label><Input {...fieldA11y("credito")} id="consorcio-credit" inputMode="decimal" placeholder="Ex.: R$ 300.000,00" value={form.credito} onChange={e => update("credito", e.target.value)} required maxLength={40} className="h-12 bg-white text-slate-900" />{errors.credito && <p id="error-credito" className="mt-2 text-sm text-red-700">{errors.credito}</p>}</div>
        </div>
        <div><label htmlFor="consorcio-time" className="block mb-2 text-sm font-medium">Melhor horário para contato</label><Select name="horario" value={form.horario} onValueChange={value => update("horario", value)} required disabled={loading}><SelectTrigger {...fieldA11y("horario")} id="consorcio-time" className="h-12 bg-white text-slate-900"><SelectValue placeholder="Selecione" /></SelectTrigger><SelectContent>{["Manhã", "Tarde", "Qualquer horário comercial"].map(value => <SelectItem key={value} value={value}>{value}</SelectItem>)}</SelectContent></Select>{errors.horario && <p id="error-horario" className="mt-2 text-sm text-red-700">{errors.horario}</p>}</div>
        {Object.values(errors).some(Boolean) && <p role="alert" className="text-sm text-red-700">Revise os campos indicados antes de enviar.</p>}
        {scenarioSummary && <p className="text-xs text-slate-600 rounded-lg bg-slate-50 p-3">O cenário do simulador será enviado junto com sua solicitação.</p>}
        <Button type="submit" disabled={loading} className="w-full min-h-12 h-auto whitespace-normal bg-[#003366] hover:bg-[#00264d] text-white">{loading ? "Enviando solicitação…" : "Solicitar análise do meu consórcio"}<ArrowRight aria-hidden="true" className="ml-2 h-4 w-4 shrink-0" /></Button>
      </fieldset>
      <div role="status" aria-live="polite" aria-atomic="true">{confirmation && <div className="space-y-3 rounded-xl border border-slate-300 bg-slate-50 p-4"><p className="text-sm leading-relaxed">{confirmation.message}</p><a href={confirmation.url} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick("consorcio_confirmacao", { insuranceType: "consorcio", origin: "consorcio_simulacao" })} className="inline-flex min-h-12 items-center rounded-md px-3 font-semibold text-[#003366] underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">Continuar pelo WhatsApp</a></div>}</div>
      <p className="flex gap-2 text-xs text-slate-600 leading-relaxed"><Lock aria-hidden="true" className="h-4 w-4 shrink-0" /><span>Usaremos seus dados para responder a esta solicitação. Consulte a <a href="/politica-privacidade" className="underline">Política de Privacidade</a>. Sem compromisso de contratação.</span></p>
    </form>
  </ConsorcioHubContent>;
}
