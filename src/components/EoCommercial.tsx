import { EO_WHATSAPP, EO_PHONE, trackEo } from "@/lib/eoEngenhariaContact";
const steps = [
  ["Envie as informações", "Informe os dados básicos da empresa, a atividade e as exigências contratuais."],
  ["Análise consultiva", "A Patro verifica os requisitos apresentados e identifica os pontos relevantes para a cotação."],
  ["Busca de alternativas", "A Patro consulta as seguradoras disponíveis e apresenta as condições obtidas."],
  ["Contratação e acompanhamento", "Após aprovação da proposta e aceitação do risco pela seguradora, a Patro acompanha a emissão e oferece suporte durante a vigência."],
];
const docs = ["Razão social", "CNPJ", "Nome do responsável", "Telefone", "E-mail", "Descrição dos serviços", "Aeroporto", "Contratante", "Cláusula de seguros", "Limite exigido", "Prazo para apresentação da apólice"];
export function EoWhatsApp({ children = "Falar pelo WhatsApp", className = "inline-flex min-h-11 items-center font-semibold text-primary underline underline-offset-4" }: {children?:string; className?:string}) {
  return <a href={EO_WHATSAPP} onClick={()=>trackEo("whatsapp_click")} className={className}>{children}</a>;
}
export function EoProcesso() {
  return <section className="bg-white"><div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:py-20"><p className="text-sm font-semibold uppercase tracking-widest text-primary">Da cláusula à apólice</p><h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">Como funciona a contratação</h2>
    <ol className="my-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{steps.map(([name,desc],i)=><li key={name} className="border-t-2 border-[#112c49] pt-4"><span className="font-mono text-sm text-slate-600">0{i+1} / 04</span><h3 className="my-2 text-xl font-semibold text-slate-900">{name}</h3><p className="text-sm leading-relaxed text-slate-700">{desc}</p></li>)}</ol>
    <p className="max-w-3xl border-l-4 border-primary pl-4">Você não precisa entender todos os termos técnicos do seguro. A Patro ajuda sua empresa a conduzir o processo de contratação.</p><EoWhatsApp>Conversar sobre a contratação pelo WhatsApp</EoWhatsApp>
    <details className="mt-6 rounded-lg border border-slate-300 bg-slate-50 p-5"><summary className="cursor-pointer font-semibold">Checklist de documentos e informações</summary><h3 className="mt-4 font-semibold">Para começar a conversa</h3><p className="mt-1 text-sm">Separe o que já tiver; não é necessário reunir tudo no primeiro contato.</p><ul className="my-4 grid list-disc gap-1 pl-5 text-sm sm:grid-cols-2 lg:grid-cols-3">{docs.map(d=><li key={d}>{d}</li>)}</ul><h3 className="font-semibold">O que pode ser solicitado depois?</h3><p className="mt-1 max-w-3xl text-sm">Faturamento, valor contratual, histórico de reclamações, questionário de risco, ART ou RRT (quando aplicável), apólices anteriores e escopo técnico.</p></details>
  </div></section>;
}
export function EoClosing() {
  return <section className="bg-[#112c49] text-white"><div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:py-20"><h2 className="max-w-3xl text-balance text-3xl font-semibold tracking-tight text-white">Sua empresa precisa apresentar um Seguro E&amp;O Engenharia para trabalhar em um aeroporto?</h2><p className="mt-5 max-w-2xl leading-relaxed text-slate-100">Conte com a Patro Seguros para compreender as exigências apresentadas e buscar alternativas adequadas à atividade da sua empresa.</p><p className="mt-3 text-sm text-slate-200">Atendimento em Guarulhos e em todo o Brasil.</p><div className="mt-6 flex flex-wrap items-center gap-4"><a href="#analise-contratual" className="rounded-md bg-white px-5 py-3 font-semibold text-slate-900">Solicitar cotação</a><a href="#analise-contratual" className="rounded-md border border-white/70 px-5 py-3 font-semibold text-white">Enviar cláusula contratual</a><EoWhatsApp className="inline-flex min-h-11 items-center text-white underline underline-offset-4" /></div><a href={`tel:${EO_PHONE}`} onClick={()=>trackEo("phone_click")} className="mt-4 inline-flex min-h-11 items-center text-sm text-white underline">Ligar para +55 11 5199-7500</a></div></section>;
}
