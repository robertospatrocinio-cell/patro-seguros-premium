import { useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { catalogoSeguros } from "@/data/catalogoSeguros";
import { getCaptacaoProduto, type CaptacaoField } from "@/data/captacaoProdutos";
import { safeInvoke } from "@/lib/supabase-helpers";
import { trackCotacaoSubmit, trackWhatsAppClick } from "@/lib/tracking";
import { WHATSAPP_URL_BASE } from "@/config/empresa";

type Props = { productName?: string; productPath?: string; fields?: CaptacaoField[] };

export default function ProductQuoteForm({ productName, productPath, fields }: Props) {
  const [selected, setSelected] = useState("/seguro-maquinas-agricolas");
  const profile = getCaptacaoProduto(productPath ?? selected);
  const name = productName ?? profile?.label ?? "Seguro";
  const product = productPath ?? selected;
  const extraFields = fields ?? profile?.fields ?? [];
  const prefix = `produto-${product.replace(/[^a-z0-9]/gi, "-")}`;
  const [contact, setContact] = useState({ name: "", phone: "", email: "" });
  const [details, setDetails] = useState<Record<string, string>>({});
  const [consent, setConsent] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const pending = useRef(false);
  const simulation = product.includes("consorcio") || product.includes("previdencia");
  const detailLines = extraFields.filter(field => details[field.id]?.trim()).map(field => `${field.label}: ${details[field.id].trim()}`);
  const message = [`Olá! Gostaria de ${simulation ? "uma simulação" : "uma cotação"} de ${name}.`, `Nome: ${contact.name.trim()}`, ...detailLines, `Produto: ${product}`].join("\n");
  const waUrl = `${WHATSAPP_URL_BASE}?text=${encodeURIComponent(message)}`;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending.current || sent) return;
    if (contact.name.trim().length < 2) return setError("Informe seu nome com pelo menos 2 letras.");
    if (!/^(?:55)?\d{10,11}$/.test(contact.phone.replace(/\D/g, ""))) return setError("Informe seu WhatsApp com DDD. Ex.: (11) 99999-9999.");
    if (!consent) return setError("Autorize o contato para solicitar sua análise.");
    pending.current = true;
    setSending(true);
    setError("");
    try {
      const params = new URLSearchParams(window.location.search);
      const source = window.location.pathname;
      const raw = { product_path: product, details: Object.fromEntries(extraFields.map(field => [field.id, details[field.id]?.trim() || ""])), consent: true, consent_at: new Date().toISOString(), consent_text: "Autorizo a Patro Seguros a usar estes dados para responder à minha solicitação.", utm_term: params.get("utm_term"), utm_content: params.get("utm_content") };
      const { data, error: failure } = await safeInvoke<{ success?: boolean }>("send-form-email", {
        subject: `Solicitação de ${name}`,
        textBody: [message, `WhatsApp: ${contact.phone}`, `E-mail: ${contact.email || "Não informado"}`, `Origem: ${source}`, ...["utm_source", "utm_medium", "utm_campaign"].map(key => `${key}: ${params.get(key) || "Não informado"}`), raw.consent_text].join("\n"),
        lead: { full_name: contact.name.trim(), phone: contact.phone.trim(), email: contact.email.trim() || null, insurance_type: name, source_page: source, source_origin: "captacao-produto", utm_source: params.get("utm_source"), utm_medium: params.get("utm_medium"), utm_campaign: params.get("utm_campaign"), raw_data: raw },
      });
      if (failure || !data?.success) throw new Error("Não confirmado");
      setSent(true);
      trackCotacaoSubmit(name, { origin: "captacao-produto", insuranceType: name });
    } catch {
      setError("Não foi possível confirmar o envio. Seus dados continuam aqui: tente novamente ou envie a solicitação pelo WhatsApp abaixo.");
    } finally {
      pending.current = false;
      setSending(false);
    }
  }

  const whatsapp = <a href={waUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-sm font-semibold text-primary underline underline-offset-4" onClick={() => trackWhatsAppClick("captacao-produto", { origin: "captacao-produto", insuranceType: name })}>Continuar pelo WhatsApp</a>;
  if (sent) return (
    <div className="rounded-2xl border bg-card p-6 md:p-8" role="status">
      <h3 className="text-xl font-bold mb-3">Solicitação enviada</h3>
      <p className="text-muted-foreground mb-4">A equipe recebeu seu pedido de {name} e entrará em contato para avaliar os detalhes. Este envio não representa contratação nem início de cobertura.</p>
      {whatsapp}
    </div>
  );

  return (
    <form onSubmit={submit} className="rounded-2xl border bg-card p-6 md:p-8 space-y-5" aria-label={`Solicitar ${name}`}>
      {!productName && (
        <div className="space-y-3">
          <Label htmlFor="captacao-produto">Qual produto você procura?</Label>
          <select id="captacao-produto" value={selected} disabled={sending} className="w-full min-h-12 rounded-md border bg-background p-3 text-sm" onChange={event => { setSelected(event.target.value); setDetails({}); setError(""); }}>
            {catalogoSeguros.map(group => <optgroup key={group.id} label={group.title}>{group.items.map(item => <option key={item.to} value={item.to}>{item.label}</option>)}</optgroup>)}
          </select>
          <p className="text-sm text-muted-foreground">{profile?.intro}</p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">{profile?.checklist.map(item => <li key={item}>{item}</li>)}</ul>
        </div>
      )}
      <div>
        <h3 className="text-xl font-bold">{simulation ? "Solicite sua simulação" : "Peça uma análise para sua cotação"}</h3>
        <p className="text-sm text-muted-foreground mt-2">Comece com nome e WhatsApp. Os detalhes são opcionais e ajudam a equipe a entender seu caso.</p>
      </div>
      <fieldset disabled={sending} className="space-y-4">
        <legend className="sr-only">Dados para contato</legend>
        <div className="space-y-2"><Label htmlFor={`${prefix}-nome`}>Nome *</Label><Input id={`${prefix}-nome`} autoComplete="name" required minLength={2} maxLength={100} value={contact.name} onChange={e => setContact({ ...contact, name: e.target.value })} /></div>
        <div className="space-y-2"><Label htmlFor={`${prefix}-telefone`}>WhatsApp com DDD *</Label><Input id={`${prefix}-telefone`} type="tel" autoComplete="tel" required maxLength={20} placeholder="(11) 99999-9999" value={contact.phone} onChange={e => setContact({ ...contact, phone: e.target.value })} /></div>
        <div className="space-y-2"><Label htmlFor={`${prefix}-email`}>E-mail (opcional)</Label><Input id={`${prefix}-email`} type="email" autoComplete="email" maxLength={200} value={contact.email} onChange={e => setContact({ ...contact, email: e.target.value })} /></div>
      </fieldset>
      <details className="border-y py-4">
        <summary className="cursor-pointer min-h-11 text-sm font-semibold">Adicionar detalhes de {name} (opcional)</summary>
        <fieldset disabled={sending} className="space-y-4 mt-3">
          <legend className="sr-only">Detalhes do produto</legend>
          {extraFields.map(field => <div key={field.id} className="space-y-2">
            <Label htmlFor={`${prefix}-${field.id}`}>{field.label}</Label>
            {field.type === "select" ? (
              <select id={`${prefix}-${field.id}`} value={details[field.id] || ""} onChange={e => setDetails({ ...details, [field.id]: e.target.value })} className="w-full min-h-11 rounded-md border bg-background p-2 text-sm">
                <option value="">{field.placeholder || "Selecione se souber"}</option>
                {field.options?.map(option => <option key={option} value={option}>{option}</option>)}
              </select>
            ) : <Input id={`${prefix}-${field.id}`} maxLength={200} placeholder={field.placeholder} value={details[field.id] || ""} onChange={e => setDetails({ ...details, [field.id]: e.target.value })} />}
          </div>)}
        </fieldset>
      </details>
      <div className="flex items-start gap-3">
        <input id={`${prefix}-consent`} type="checkbox" required checked={consent} disabled={sending} onChange={e => setConsent(e.target.checked)} className="mt-1 h-5 w-5 shrink-0 accent-primary" />
        <Label htmlFor={`${prefix}-consent`} className="text-sm leading-relaxed">Autorizo a Patro Seguros a usar estes dados para responder à minha solicitação. Consulte a <a href="/politica-privacidade" target="_blank" rel="noopener noreferrer" className="underline">Política de Privacidade</a>.</Label>
      </div>
      {!productName && <p className="text-xs text-muted-foreground">{profile?.note}</p>}
      {error && <div role="alert" className="text-sm text-destructive">{error}<div>{whatsapp}</div></div>}
      <Button type="submit" variant="cta" disabled={sending} className="w-full min-h-12 h-auto py-3 whitespace-normal">{sending ? "Enviando solicitação…" : simulation ? "Solicitar simulação sem compromisso" : "Solicitar cotação sem compromisso"}</Button>
      <p className="text-xs text-muted-foreground">Não envie CPF, documentos ou informações médicas aqui. A equipe solicitará o que for necessário na próxima etapa.</p>
    </form>
  );
}
