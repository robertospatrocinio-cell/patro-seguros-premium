import { useEffect, useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { getLeadAttribution } from "@/lib/leadAttribution";
import { EO_WHATSAPP, trackEo } from "@/lib/eoEngenhariaContact";

const titles = ["Contato da empresa", "Serviço e prazo", "Cláusula e detalhes"];
const motives = ["Preciso contratar um novo seguro", "Preciso renovar minha apólice", "Preciso adequar uma apólice existente", "Estou participando de uma concorrência", "Preciso esclarecer uma exigência contratual"];
const phases = ["Contrato aprovado", "Contrato em negociação", "Exigência identificada", "Exigência em definição", "Pesquisa inicial ou projeto futuro"];
const control = "mt-1.5 block min-h-11 w-full min-w-0 rounded-md border border-slate-400 bg-white px-3 py-2 text-base text-slate-900 focus:border-primary focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-primary";
export default function EoIntakeForm() {
  const [step,setStep] = useState<1|2|3>(1), [f,setFields] = useState<Record<string,string>>({});
  const [file,setFile] = useState<File|null>(null), [consent,setConsent] = useState(false), [error,setError] = useState("");
  const [busy,setBusy] = useState(false), [done,setDone] = useState(false);
  const started = useRef(false), completed = useRef(new Set<number>()), lock = useRef(false), id = useRef("");
  const heading = useRef<HTMLHeadingElement>(null), upload = useRef<HTMLInputElement>(null), didNavigate = useRef(false);
  useEffect(() => { if (didNavigate.current) heading.current?.focus(); },[step,done]);
  function change(key:string,v:string) { setFields(prev=>({...prev,[key]:v})); setError(""); }
  function start() { if (!started.current) { started.current = true; trackEo("form_start"); } }
  function finishStep(n:1|2|3) { if (!completed.current.has(n)) { completed.current.add(n); trackEo("form_step_complete",n); } }
  function field(key:string,label:string,max:number,type="text",auto="off",required=false) {
    return <label className="block min-w-0 text-sm font-medium">{label}<input className={control} type={type} value={f[key] ?? ""} autoComplete={auto} required={required} minLength={required && type === "text" ? 3 : undefined} maxLength={max} pattern={key === "email" ? "[A-Za-z0-9._%+\\-]+@[A-Za-z0-9.\\-]+\\.[A-Za-z]{2,}" : undefined} onChange={e=>change(key,e.target.value)} /></label>;
  }
  function select(key:string,label:string,options:string[]) { return <label className="block min-w-0 text-sm font-medium">{label}<select className={control} value={f[key] || ""} onChange={e=>change(key,e.target.value)}><option value="">Ainda não sei informar</option>{options.map(o=><option key={o}>{o}</option>)}</select></label>; }
  async function submit(e:FormEvent) {
    e.preventDefault(); if (lock.current || done) return; start();
    if (step === 1 && ((f.name || "").trim().length < 3 || (f.company || "").trim().length < 3)) { setError("Informe o nome do responsável e da empresa com pelo menos três caracteres."); return; }
    if (step === 1 && !/^(55)?\d{10,11}$/.test((f.phone || "").replace(/[\s()+-]/g,""))) { setError("Confira o WhatsApp: informe o DDD e o número completo."); return; }
    if (step < 3) { finishStep(step); didNavigate.current = true; setStep(step === 1 ? 2 : 3); setError(""); return; }
    if (f.cnpj && !/^\d{14}$/.test(f.cnpj.trim().replace(/[./-]/g,""))) { setError("Confira os 14 dígitos do CNPJ ou deixe o campo em branco."); return; }
    lock.current = true; setBusy(true); setError("");
    try {
      if (file && (file.type !== "application/pdf" || !/\.pdf$/i.test(file.name) || file.size > 2097152 || (await file.slice(0,5).text()) !== "%PDF-" || !(await file.slice(-1024).text()).includes("%%EOF"))) { setError("O anexo precisa ser um PDF válido de até 2 MB. Substitua ou remova o arquivo para continuar."); return; }
      const { supabase } = await import("@/integrations/supabase/client");
      id.current ||= crypto.randomUUID();
      const attribution = getLeadAttribution(), extra = new URLSearchParams(window.location.search);
      const body = new FormData(); body.set("request",JSON.stringify({...f, website:f.website || "", consent, requestId:id.current, attribution:{...attribution,utm_term:extra.get("utm_term"),utm_content:extra.get("utm_content")}}));
      if (file) body.set("clause",file,"clausula.pdf");
      const { data,error:failure } = await supabase.functions.invoke("submit-lead",{ body });
      if (failure || data?.success !== true || data?.intake !== "eo-v1") {
        const status = failure?.context?.status;
        setError(status === 429 ? "Muitas solicitações em pouco tempo. Aguarde cinco minutos antes de tentar novamente." : status === 422 || status === 413 ? "Não foi possível aceitar o PDF. Substitua ou remova o anexo e tente novamente." : "Não conseguimos confirmar o recebimento. Seus campos continuam aqui: tente novamente ou fale pelo WhatsApp."); return;
      }
      finishStep(3); if (file) trackEo("contract_upload"); trackEo("form_submit"); trackEo("quote_request");
      setDone(true); setFile(null); setFields({});
    } catch { setError("Não foi possível confirmar o envio. Confira sua conexão e tente novamente."); }
    finally { setBusy(false); lock.current=false; }
  }
  return <section id="analise-contratual" aria-labelledby="eo-form-title" className="scroll-mt-24 border-y border-slate-200 bg-slate-50"><div className="mx-auto grid max-w-7xl items-start gap-8 px-5 py-14 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
    <div><p className="text-sm font-semibold uppercase tracking-widest text-primary">Atendimento consultivo</p><h2 id="eo-form-title" className="mt-3 text-balance text-3xl font-semibold tracking-tight text-slate-900">Envie a cláusula de seguro do seu contrato para análise.</h2><p className="mt-5">Sua empresa recebeu uma exigência de Seguro E&amp;O Engenharia para prestar serviços em um aeroporto?</p><p className="mt-3">A Patro Seguros ajuda a compreender os requisitos apresentados e busca alternativas de contratação compatíveis com as atividades da sua empresa.</p><p className="mt-5 border-l-2 border-primary pl-4 text-sm text-slate-700">A orientação é securitária. Não é parecer jurídico nem garantia de aprovação contratual. Você pode solicitar atendimento mesmo sem a cláusula.</p></div>
    <div className="min-w-0 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">{done ? <div role="status"><h3 tabIndex={-1} ref={heading} className="text-2xl font-semibold">Solicitação recebida</h3><p className="mt-3">A Patro recebeu os dados da sua empresa para analisar as exigências e dar continuidade ao atendimento pelos contatos informados.</p></div> : <form onSubmit={submit} onChange={start} data-private="true" aria-busy={busy}>
      <p className="text-sm font-medium text-primary">Etapa {step} de 3</p><div aria-hidden="true" className="my-3 flex gap-1">{titles.map((t,i)=><span key={t} className={i<step ? "h-1 flex-1 rounded bg-primary" : "h-1 flex-1 rounded bg-slate-200"}/>)}</div>
      <h3 ref={heading} tabIndex={-1} className="text-xl font-semibold">{titles[step-1]}</h3><p className="mb-5 mt-1 text-sm text-slate-600">{step===1 ? "Precisamos destes quatro dados para identificar sua empresa e retornar o contato." : "Informe apenas o que já souber. Os dados do contrato são opcionais."}</p>
      <input hidden tabIndex={-1} aria-hidden="true" autoComplete="off" value={f.website || ""} onChange={e=>change("website",e.target.value)} />
      <fieldset disabled={busy} className="grid min-w-0 gap-4 sm:grid-cols-2">
        {step === 1 && <>{field("name","Nome do responsável",120,"text","name",true)}{field("company","Nome da empresa",180,"text","organization",true)}{field("phone","WhatsApp com DDD",24,"tel","tel",true)}{field("email","E-mail",200,"email","email",true)}</>}
        {step === 2 && <>{field("service","Tipo de serviço",250)}{field("airport","Aeroporto onde serão realizados os serviços",160)}{field("deadline","Prazo para apresentação da apólice",10,"date")}{select("phase","Fase do contrato",phases)}<div className="sm:col-span-2">{select("motive","O que sua empresa precisa?",motives)}</div></>}
        {step === 3 && <>{field("cnpj","CNPJ",18)}{field("client","Nome da contratante",160)}{field("limit","Limite de cobertura exigido",80)}{field("value","Valor do contrato",80)}<label className="text-sm font-medium sm:col-span-2">Observações<textarea className={control} rows={2} maxLength={1200} value={f.notes || ""} onChange={e=>change("notes",e.target.value)}/></label><div className="rounded-md border border-slate-300 bg-slate-50 p-4 sm:col-span-2"><label className="block text-sm font-semibold">Anexar cláusula contratual<input ref={upload} type="file" accept=".pdf,application/pdf" className="mt-2 block w-full min-w-0 text-sm" aria-describedby="eo-file-help" onChange={e=>{setFile(e.target.files?.[0] || null);setError("");}}/></label><p id="eo-file-help" className="mt-2 text-xs text-slate-700">PDF de até 2 MB, em área privada da Patro. Envie apenas a cláusula, sem assinaturas nem dados de terceiros.</p>{file && <button type="button" className="mt-2 text-sm underline" onClick={()=>{setFile(null);setError("");if(upload.current) upload.current.value="";}}>Remover anexo selecionado</button>}</div><label className="flex items-start gap-3 text-sm sm:col-span-2"><input type="checkbox" className="mt-1" required checked={consent} onChange={e=>setConsent(e.target.checked)}/><span>Autorizo a Patro a usar os dados informados para analisar esta solicitação e entrar em contato. <Link to="/politica-privacidade" target="_blank" rel="noopener noreferrer" className="underline">Política de privacidade</Link>.</span></label></>}
      </fieldset>
      {error && <p role="alert" className="mt-4 text-sm text-red-800">{error} <a href={EO_WHATSAPP} onClick={()=>trackEo("whatsapp_click")} className="underline">Falar pelo WhatsApp</a></p>}
      <div className="mt-6 flex flex-wrap items-center justify-end gap-3">{step>1 && <Button variant="outline" type="button" disabled={busy} onClick={()=>{setStep(step===3?2:1);setError("");}}>Voltar</Button>}<Button type="submit" disabled={busy}>{busy ? "Enviando…" : step===3 ? "Solicitar análise e cotação" : "Continuar"}</Button></div>
    </form>}</div></div></section>;
}
