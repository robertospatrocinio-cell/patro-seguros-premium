import { useEffect, useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { getLeadAttribution } from "@/lib/leadAttribution";
import { EO_WHATSAPP, trackEo } from "@/lib/eoEngenhariaContact";
import { AIRPORT_HUB, AIRPORT_EO, AIRPORT_PRODUCTS, AIRPORT_QUESTIONS, isAirportProduct, type AirportBrief } from "../../supabase/functions/_shared/airport-qualification";
import { trackAirport } from "@/lib/airportAnalytics";

const titles = ["Contato da empresa", "Serviço e prazo", "Cláusula e detalhes"];
const motives = ["Preciso contratar um novo seguro", "Preciso renovar minha apólice", "Preciso adequar uma apólice existente", "Estou participando de uma concorrência", "Preciso esclarecer uma exigência contratual"];
const phases = ["Contrato aprovado", "Contrato em negociação", "Exigência identificada", "Exigência em definição", "Pesquisa inicial ou projeto futuro"];
const control = "mt-1.5 block min-h-11 w-full min-w-0 rounded-md border border-slate-400 bg-white px-3 py-2 text-base text-slate-900 focus:border-primary focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-primary";
export default function EoIntakeForm({ hub = false, brief, whatsapp = EO_WHATSAPP }: { hub?: boolean; brief?: AirportBrief; whatsapp?: string }) {
  const page = hub ? AIRPORT_HUB : AIRPORT_EO;
  const intake = hub ? "airport-v1" : "eo-v1";
  const [step,setStep] = useState<1|2|3>(1), [f,setFields] = useState<Record<string,string>>({});
  const [file,setFile] = useState<File|null>(null), [consent,setConsent] = useState(false), [error,setError] = useState("");
  const [busy,setBusy] = useState(false), [done,setDone] = useState(false);
  const started = useRef(false), completed = useRef(new Set<number>()), lock = useRef(false), id = useRef("");
  const heading = useRef<HTMLHeadingElement>(null), upload = useRef<HTMLInputElement>(null), didNavigate = useRef(false);
  useEffect(() => { if (didNavigate.current) heading.current?.focus(); },[step,done]);
  const [invalidField, setInvalidField] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (invalidField && !busy) formRef.current?.querySelector<HTMLElement>(`[name="${invalidField}"]`)?.focus();
  }, [invalidField, busy, error]);
  function rejectField(key: string, message: string) {
    setInvalidField(key); setError(message);
    formRef.current?.querySelector<HTMLElement>(`[name="${key}"]`)?.focus();
  }
  const product = hub ? (isAirportProduct(f.product) ? f.product : undefined) : "eo";
  function change(key:string,v:string) { setFields(prev=>({...prev,[key]:v})); setInvalidField(""); setError(""); }
  function start() { if (!started.current) { started.current = true; trackAirport("form_start", page, product); if (!hub) trackEo("form_start"); } }
  function finishStep(n:1|2|3) { if (!hub && !completed.current.has(n)) { completed.current.add(n); trackEo("form_step_complete",n); } }
  function field(key:string,label:string,max:number,type="text",auto="off",required=false) {
    return <label className="block min-w-0 text-sm font-medium">{label}<input className={control} name={key} type={type} spellCheck={type === "email" ? false : undefined} aria-invalid={invalidField === key || undefined} aria-describedby={invalidField === key ? "eo-form-error" : undefined} value={f[key] ?? ""} autoComplete={auto} required={required} minLength={required && type === "text" ? 3 : undefined} maxLength={max} pattern={key === "email" ? "[A-Za-z0-9._%+\\-]+@[A-Za-z0-9.\\-]+\\.[A-Za-z]{2,}" : undefined} onChange={e=>change(key,e.target.value)} /></label>;
  }
  function select(key:string,label:string,options:string[]) { return <label className="block min-w-0 text-sm font-medium">{label}<select className={control} value={f[key] || ""} onChange={e=>change(key,e.target.value)}><option value="">Ainda não sei informar</option>{options.map(o=><option key={o}>{o}</option>)}</select></label>; }
  async function submit(e:FormEvent) {
    e.preventDefault(); if (lock.current || done) return; start();
    if (step === 1) {
      if ((f.name || "").trim().length < 3) return rejectField("name", "Informe o nome do responsável com pelo menos três caracteres.");
      if ((f.company || "").trim().length < 3) return rejectField("company", "Informe o nome da empresa com pelo menos três caracteres.");
      if (!/^(55)?\d{10,11}$/.test((f.phone || "").replace(/[\s()+-]/g,""))) return rejectField("phone", "Confira o WhatsApp: informe o DDD e o número completo.");
    }
    if (step < 3) { finishStep(step); didNavigate.current = true; setStep(step === 1 ? 2 : 3); setInvalidField(""); setError(""); return; }
    if (f.cnpj && !/^\d{14}$/.test(f.cnpj.trim().replace(/[./-]/g,""))) return rejectField("cnpj", "Confira os 14 dígitos do CNPJ ou deixe o campo em branco.");
    lock.current = true; setBusy(true); setError("");
    try {
      if (file && (file.type !== "application/pdf" || !/\.pdf$/i.test(file.name) || file.size < 12 || file.size > 2097152 || (await file.slice(0,5).text()) !== "%PDF-" || !(await file.slice(-1024).text()).includes("%%EOF"))) return rejectField("clause", "O anexo precisa ser um PDF válido de até 2 MB. Substitua ou remova o arquivo para continuar.");
      const { supabase } = await import("@/integrations/supabase/client");
      id.current ||= crypto.randomUUID();
      const { utm_source, utm_medium, utm_campaign, utm_term, utm_content } = getLeadAttribution();
      const body = new FormData();
      body.set("request", JSON.stringify({
        ...f, intake, assessment: hub ? brief : undefined,
        service: hub && brief?.service ? undefined : f.service,
        airport: hub && brief?.airport?.trim() ? undefined : f.airport,
        website: f.website || "", consent, requestId: id.current,
        attribution: { utm_source, utm_medium, utm_campaign, utm_term, utm_content },
      }));
      if (file) body.set("clause",file,"clausula.pdf");
      const { data,error:failure } = await supabase.functions.invoke("submit-lead",{ body });
      if (failure || data?.success !== true || data?.intake !== intake) {
        const status = failure?.context?.status;
        setError(status === 429 ? "Muitas solicitações em pouco tempo. Aguarde cinco minutos antes de tentar novamente." : status === 422 || status === 413 ? "Não foi possível aceitar o PDF. Substitua ou remova o anexo e tente novamente." : "Não conseguimos confirmar o recebimento. Seus campos continuam aqui: tente novamente ou fale pelo WhatsApp."); return;
      }
      finishStep(3);
      if (data.uploaded === true) trackAirport("contract_upload", page, product);
      trackAirport("form_submit", page, product);
      trackAirport("quote_request", page, product);
      if (!hub) { if (file && data.uploaded !== false) trackEo("contract_upload"); trackEo("form_submit"); trackEo("quote_request"); }
      didNavigate.current = true;
      setDone(true); setFile(null); setFields({});
    } catch { setError("Não foi possível confirmar o envio. Confira sua conexão e tente novamente."); }
    finally { setBusy(false); lock.current=false; }
  }
  return <section id={hub ? "cotacao-aeroportuaria" : "analise-contratual"} aria-labelledby="eo-form-title" className="scroll-mt-24 border-y border-slate-200 bg-slate-50"><div className="mx-auto grid max-w-7xl items-start gap-8 px-5 py-14 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
    <div><p className="text-sm font-semibold uppercase tracking-widest text-primary">Atendimento consultivo</p><h2 id="eo-form-title" className="mt-3 text-balance text-3xl font-semibold tracking-tight text-slate-900">{hub ? "Solicite uma cotação para o seu serviço" : "Envie a cláusula de seguro do seu contrato para análise."}</h2>
      {hub ? <><p className="mt-5">Informe o que já sabe sobre o serviço. A cláusula e os dados do contrato são opcionais.</p>{!done && brief && Object.values(brief).some(answer => answer?.trim()) ? <details data-private="true" className="mt-4 rounded-md border p-3"><summary className="cursor-pointer font-semibold">Confira as respostas que acompanham o pedido</summary><dl className="mt-2 divide-y">{AIRPORT_QUESTIONS.map(({ key, label }) => brief[key]?.trim() && <div className="py-2 text-sm" key={key}><dt>{label}</dt><dd className="break-words font-medium">{brief[key]}</dd></div>)}</dl></details> : !done && <a className="mt-3 inline-flex min-h-11 items-center text-primary underline" href="#orientacao-aeroportuaria">Prefiro começar pelas perguntas da triagem</a>}</> : <><p className="mt-5">Sua empresa recebeu uma exigência de Seguro E&amp;O Engenharia para prestar serviços em um aeroporto?</p><p className="mt-3">A Patro Seguros ajuda a compreender os requisitos apresentados e busca alternativas de contratação compatíveis com as atividades da sua empresa.</p></>}
      <p className="mt-5 border-l-2 border-primary pl-4 text-sm text-slate-700">A orientação é securitária. Não é parecer jurídico nem garantia de aprovação contratual. Você pode solicitar atendimento mesmo sem a cláusula.</p>
      {hub && <a className="mt-3 inline-flex min-h-11 items-center text-primary underline" href={whatsapp}>Falar pelo WhatsApp da Patro</a>}
    </div>
    <div className="min-w-0 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">{done ? <div role="status"><h3 tabIndex={-1} ref={heading} className="text-2xl font-semibold">Solicitação recebida</h3><p className="mt-3">A Patro recebeu os dados da sua empresa para analisar as exigências e dar continuidade ao atendimento pelos contatos informados.</p></div> : <form ref={formRef} onSubmit={submit} onChange={start} data-private="true" data-eo-intake="true" aria-label={hub ? "Solicitar Seguros aeroportuários" : undefined} aria-labelledby={hub ? undefined : "eo-form-title"} aria-busy={busy}>
      <p className="text-sm font-medium text-primary">Etapa {step} de 3</p><div aria-hidden="true" className="my-3 flex gap-1">{titles.map((t,i)=><span key={t} className={i<step ? "h-1 flex-1 rounded bg-primary" : "h-1 flex-1 rounded bg-slate-200"}/>)}</div>
      <h3 ref={heading} tabIndex={-1} className="text-xl font-semibold">{titles[step-1]}</h3><p className="mb-5 mt-1 text-sm text-slate-600">{step===1 ? "Os quatro campos são obrigatórios para a Patro responder. Nada é enviado ao CRM enquanto você preenche as etapas." : step === 3 ? "Você pode pedir a cotação sem PDF. Se voltar à etapa anterior, selecione o anexo novamente e confirme a autorização antes de enviar." : "Informe apenas o que já souber. Os dados do contrato são opcionais."}</p>
      <input hidden tabIndex={-1} aria-hidden="true" autoComplete="off" value={f.website || ""} onChange={e=>change("website",e.target.value)} />
      <fieldset disabled={busy} className="grid min-w-0 gap-4 sm:grid-cols-2">
        {step === 1 && <>{field("name","Nome do responsável",120,"text","name",true)}{field("company","Nome da empresa",180,"text","organization",true)}{field("phone","WhatsApp com DDD",24,"tel","tel",true)}{field("email","E-mail",200,"email","email",true)}</>}
        {step === 2 && <>{(!hub || !brief?.service) && field("service","Tipo de serviço",250)}{(!hub || !brief?.airport) && field("airport","Aeroporto onde serão realizados os serviços",160)}{field("deadline","Prazo para apresentação da apólice",10,"date")}{select("phase","Fase do contrato",phases)}<div className="sm:col-span-2">{select("motive","O que sua empresa precisa?",motives)}</div>{hub && <label className="block text-sm font-medium sm:col-span-2">Modalidade de interesse<select name="product" className={control} value={f.product ?? ""} onChange={e=>change("product",e.target.value)}><option value="">Ainda não sei informar</option>{Object.entries(AIRPORT_PRODUCTS).map(([key,label])=><option key={key} value={key}>{label}</option>)}</select></label>}</>}

        {step === 3 && <>
          {field("cnpj","CNPJ",18)}{field("client","Nome da contratante",160)}{field("limit","Limite de cobertura exigido",80)}{field("value","Valor do contrato",80)}
          <label className="text-sm font-medium sm:col-span-2">Observações<textarea name="notes" className={control} rows={2} maxLength={1200} value={f.notes || ""} onChange={e=>change("notes",e.target.value)}/></label>
          <div className="rounded-md border border-slate-300 bg-slate-50 p-4 sm:col-span-2">
            <label className="block text-sm font-semibold">Anexar cláusula contratual<input ref={upload} name="clause" type="file" accept=".pdf,application/pdf" className="mt-2 block min-h-11 w-full min-w-0 text-sm" aria-invalid={invalidField === "clause" || undefined} aria-describedby={invalidField === "clause" ? "eo-file-help eo-form-error" : "eo-file-help"} onChange={e=>{setFile(e.target.files?.[0] || null);setInvalidField("");setError("");}}/></label>
            <p id="eo-file-help" className="mt-2 text-sm text-slate-700">PDF opcional, de até 2 MB, em área privada da Patro. Envie apenas o trecho sobre seguros. Oculte assinaturas e dados de terceiros também nas observações.</p>
            {file && <button type="button" className="mt-2 min-h-11 text-sm underline" onClick={()=>{setFile(null);setError("");setInvalidField("");if(upload.current) upload.current.value="";upload.current?.focus();}}>Remover anexo selecionado</button>}
          </div>
          <label className="flex items-start gap-3 text-sm sm:col-span-2"><input name="consent" type="checkbox" className="mt-1" required checked={consent} onChange={e=>setConsent(e.target.checked)}/><span>Autorizo a Patro a usar os dados informados para analisar esta solicitação e entrar em contato. <Link to="/politica-privacidade" target="_blank" rel="noopener noreferrer" className="underline">Política de privacidade (abre em nova aba)</Link>.</span></label>
        </>}
      </fieldset>
      {error && <p id="eo-form-error" role="alert" className="mt-4 text-sm text-red-800">{error} <a href={whatsapp} onClick={()=>{ if (!hub) trackEo("whatsapp_click"); }} className="underline">Falar pelo WhatsApp</a></p>}
      <div className="mt-6 flex flex-wrap items-center justify-end gap-3">{step>1 && <Button variant="outline" type="button" disabled={busy} onClick={()=>{if(step===3){setFile(null);setConsent(false);}setStep(step===3?2:1);setInvalidField("");setError("");}}>Voltar</Button>}<Button type="submit" disabled={busy}>{busy ? "Enviando…" : step===3 ? "Solicitar análise e cotação" : "Continuar"}</Button></div>
    </form>}</div></div></section>;
}
