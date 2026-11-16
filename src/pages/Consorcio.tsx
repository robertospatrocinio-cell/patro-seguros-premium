import { useRef, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { ArrowRight, Lock } from "lucide-react";
import ConsorcioHubContent from "@/components/consorcio/ConsorcioHubContent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { nameSchema, whatsappSchema, firstZodMessage } from "@/lib/leadValidation";
import { showValidationError, showFriendlyError } from "@/lib/friendlyToast";
import { trackCotacaoSubmit, trackCotacaoClick } from "@/lib/tracking";
import { submitLead } from "@/lib/leadsApi";
import { safeInvoke, handleSupabaseError } from "@/lib/supabase-helpers";
import { escapeHtml } from "@/lib/utils";
import { formatConsorcioCurrency } from "@/lib/consorcioSimulation";
import { EMPRESA, WHATSAPP_URL_BASE } from "@/config/empresa";

const simulacaoSchema = z.object({
  name: nameSchema, whatsapp: whatsappSchema,
  city: z.string().trim().min(2, "Informe sua cidade").max(80),
  tipo: z.string().min(1, "Escolha o tipo de consórcio"),
  credito: z.string().trim().min(1, "Informe o crédito aproximado").max(40),
  horario: z.string().min(1, "Escolha o melhor horário"),
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
  const submittingRef = useRef(false);
  const update = (key: keyof typeof emptyForm, value: string) => {
    setForm(old => ({ ...old, [key]: value }));
    // Uma alteração manual do objetivo invalida o cenário importado do simulador.
    if (key === "tipo" || key === "credito") setScenarioSummary("");
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (submittingRef.current || loading) return;
    const parsed = simulacaoSchema.safeParse(form);
    if (!parsed.success) { showValidationError(firstZodMessage(parsed.error)); return; }
    const { name, whatsapp, city, tipo, credito, horario } = parsed.data;
    const payloadHash = hashPayload({ ...parsed.data, cenario: scenarioSummary });
    const message = `Olá, sou ${name} (${whatsapp}), de ${city}. Quero simular um consórcio de ${tipo} com crédito de ${credito}. Melhor horário: ${horario}. ${scenarioSummary}`;
    const whatsappUrl = `${WHATSAPP_URL_BASE}?text=${encodeURIComponent(message)}`;
    try {
      const raw = sessionStorage.getItem(SUBMIT_DEDUPE_KEY);
      if (raw) {
        const previous = JSON.parse(raw) as { hash: string; ts: number };
        if (previous.hash === payloadHash && Date.now() - previous.ts < SUBMIT_DEDUPE_WINDOW_MS) {
          toast.info("Já recebemos esta simulação há instantes. Vamos te chamar no WhatsApp!");
          window.open(whatsappUrl, "_blank", "noopener,noreferrer");
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
      if (emailError) {
        handleSupabaseError(emailError, "Não foi possível registrar sua simulação digitalmente.");
        toast.info(`Você pode ligar para ${EMPRESA.telefone} se o erro persistir.`, { duration: 10000 });
        return;
      }
      const popup = window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      if (!popup) showFriendlyError("Não conseguimos abrir o WhatsApp. Toque no botão para falar com a Patro.", { whatsappMessage: message });
      trackCotacaoSubmit("consorcio", { origin: "consorcio_simulacao" });
      toast.success("Recebemos sua solicitação! Um consultor da Patro responderá em breve.");
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
    document.getElementById("simulacao")?.scrollIntoView({ behavior: "smooth", block: "start" });
    trackCotacaoClick("consorcio_anchor");
  }}>
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-slate-200 p-5 md:p-7 bg-white text-slate-900" aria-label="Solicitar análise de consórcio">
      <div><label htmlFor="consorcio-name" className="block mb-2 text-sm font-medium">Nome completo</label><Input id="consorcio-name" autoComplete="name" value={form.name} onChange={e => update("name", e.target.value)} required maxLength={120} className="h-12 bg-white text-slate-900" /></div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div><label htmlFor="consorcio-phone" className="block mb-2 text-sm font-medium">WhatsApp com DDD</label><Input id="consorcio-phone" type="tel" autoComplete="tel" placeholder="(11) 99999-9999" value={form.whatsapp} onChange={e => update("whatsapp", e.target.value)} required maxLength={20} className="h-12 bg-white text-slate-900" /></div>
        <div><label htmlFor="consorcio-city" className="block mb-2 text-sm font-medium">Cidade e estado</label><Input id="consorcio-city" autoComplete="address-level2" placeholder="Sua cidade / UF" value={form.city} onChange={e => update("city", e.target.value)} required maxLength={80} className="h-12 bg-white text-slate-900" /></div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div><label htmlFor="consorcio-type" className="block mb-2 text-sm font-medium">Modalidade</label><Select value={form.tipo} onValueChange={value => update("tipo", value)} required><SelectTrigger id="consorcio-type" className="h-12 bg-white text-slate-900"><SelectValue placeholder="Selecione" /></SelectTrigger><SelectContent>{["Imóveis", "Veículos", "Pesados e agro", "Serviços"].map(value => <SelectItem key={value} value={value}>{value}</SelectItem>)}</SelectContent></Select></div>
        <div><label htmlFor="consorcio-credit" className="block mb-2 text-sm font-medium">Crédito aproximado</label><Input id="consorcio-credit" placeholder="Ex.: R$ 300.000" value={form.credito} onChange={e => update("credito", e.target.value)} required maxLength={40} className="h-12 bg-white text-slate-900" /></div>
      </div>
      <div><label htmlFor="consorcio-time" className="block mb-2 text-sm font-medium">Melhor horário para contato</label><Select value={form.horario} onValueChange={value => update("horario", value)} required><SelectTrigger id="consorcio-time" className="h-12 bg-white text-slate-900"><SelectValue placeholder="Selecione" /></SelectTrigger><SelectContent>{["Manhã", "Tarde", "Qualquer horário comercial"].map(value => <SelectItem key={value} value={value}>{value}</SelectItem>)}</SelectContent></Select></div>
      {scenarioSummary && <p className="text-xs text-slate-600 rounded-lg bg-slate-50 p-3">O cenário do simulador será enviado junto com sua solicitação.</p>}
      <Button type="submit" disabled={loading} className="w-full min-h-12 h-auto whitespace-normal bg-[#003366] hover:bg-[#00264d] text-white">{loading ? "Enviando solicitação…" : "Solicitar análise do meu consórcio"}<ArrowRight aria-hidden="true" className="ml-2 h-4 w-4 shrink-0" /></Button>
      <p className="flex gap-2 text-xs text-slate-600 leading-relaxed"><Lock aria-hidden="true" className="h-4 w-4 shrink-0" /><span>Usaremos seus dados para responder a esta solicitação. Consulte a <a href="/politica-privacidade" className="underline">Política de Privacidade</a>. Sem compromisso de contratação.</span></p>
    </form>
  </ConsorcioHubContent>;
}
