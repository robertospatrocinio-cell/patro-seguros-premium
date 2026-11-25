import { useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { solutions } from "@/data/aeroportosHub";

const services = ["Projetos, laudos ou consultoria técnica", "Obras, instalações ou montagem", "Manutenção, limpeza ou facilities", "Logística ou transporte", "Serviços ambientais", "Outra atividade"];
const noRequest = "Não foi solicitado seguro específico";
const unsure = "Ainda não sei";
const questions = [
  { key: "airport", label: "Em qual aeroporto a empresa irá atuar?", hint: "Ex.: Guarulhos (GRU) ou local a confirmar." },
  { key: "service", label: "Qual serviço será prestado?", options: services },
  { key: "contract", label: "Existe contrato ou edital de contratação?", options: ["Sim, tenho o documento", "Ainda não recebi", unsure] },
  { key: "requested", label: "A contratante solicitou algum seguro específico?", options: [...solutions.map(s => s.name), "Outra exigência ou mais de uma modalidade", noRequest, unsure] },
  { key: "deadline", label: "Existe prazo para apresentação da apólice?", hint: "Informe a data, “sem prazo definido” ou “a confirmar”." },
  { key: "policy", label: "A empresa possui algum seguro atualmente?", options: ["Sim", "Não", unsure] },
] as const;

type Answers = Record<(typeof questions)[number]["key"], string>;
export type AirportBrief = Record<string, string>;
const initial: Answers = { airport: "", service: "", contract: "", requested: "", deadline: "", policy: "" };
const possibilities: Record<string, string[]> = {
  [services[0]]: ["Seguro E&O Engenharia", "Responsabilidade Civil Geral"],
  [services[1]]: ["Riscos de Engenharia", "Responsabilidade Civil Geral"],
  [services[2]]: ["Responsabilidade Civil Geral", "Seguro de Equipamentos"],
  [services[3]]: ["RC Aeroportuário", "Responsabilidade Civil Geral"],
  [services[4]]: ["Responsabilidade Civil Ambiental", "Responsabilidade Civil Geral"],
};
const control = "block min-h-12 w-full min-w-0 rounded-md border border-input bg-background px-3 py-2 text-base text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary";

export default function AirportTriage({ onReview }: { onReview: (brief: AirportBrief | undefined) => void }) {
  const [answers, setAnswers] = useState<Answers>(initial);
  const [reviewing, setReviewing] = useState(false);
  const result = useRef<HTMLHeadingElement>(null);
  const first = useRef<HTMLInputElement>(null);
  const modes = new Set([answers.requested, ...(possibilities[answers.service] ?? ["Responsabilidade Civil Geral"])]);
  function review(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onReview(Object.fromEntries(questions.map(q => [q.label, answers[q.key].trim()])));
    setReviewing(true);
    requestAnimationFrame(() => result.current?.focus());
  }
  function edit() {
    onReview(undefined);
    setReviewing(false);
    requestAnimationFrame(() => first.current?.focus());
  }
  return <section id="orientacao-aeroportuaria" aria-labelledby="triagem-heading" className="scroll-mt-24 border-y bg-muted/40">
    <div className="mx-auto grid max-w-7xl items-start gap-7 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
      <div><h2 id="triagem-heading" className="text-balance text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">Descubra quais seguros sua empresa pode precisar</h2>
        <p className="mt-4 max-w-prose leading-relaxed">Responda seis perguntas para identificar o que vale discutir com a corretora. Você pode consultar a orientação sem informar nome ou telefone.</p>
        <p className="mt-4 max-w-prose text-sm text-muted-foreground">Não inclua dados pessoais nem copie cláusulas sigilosas. As respostas só são enviadas se você concluir o pedido de contato.</p>
      </div>
      {!reviewing ? <form aria-label="Orientação preliminar para contratos aeroportuários" onSubmit={review} className="grid min-w-0 gap-5 rounded-xl border bg-card p-5 sm:grid-cols-2 sm:p-7">
        {questions.map((q, i) => <div key={q.key} className="flex min-w-0 flex-col gap-2">
          <label htmlFor={`triagem-${q.key}`} className="flex-1 text-sm font-semibold">{i + 1}. {q.label}</label>
          {"options" in q ? <select required id={`triagem-${q.key}`} value={answers[q.key]} className={control} onChange={e => setAnswers({ ...answers, [q.key]: e.target.value })}><option value="">Selecione uma opção</option>{q.options.map(o => <option key={o}>{o}</option>)}</select>
            : <><p id={`triagem-${q.key}-hint`} className="text-xs text-muted-foreground">{q.hint}</p><input required pattern={".*\\S.*"} maxLength={100} ref={q.key === "airport" ? first : undefined} id={`triagem-${q.key}`} aria-describedby={`triagem-${q.key}-hint`} className={control} value={answers[q.key]} onChange={e => setAnswers({ ...answers, [q.key]: e.target.value })} /></>}
        </div>)}
        <Button type="submit" className="min-h-11 sm:col-span-2 sm:justify-self-start">Ver orientação preliminar</Button>
      </form> : <div className="min-w-0 rounded-xl border bg-card p-5 sm:p-7">
        <h3 tabIndex={-1} ref={result} className="scroll-mt-24 text-xl font-semibold">Modalidades para avaliar</h3>
        <p className="mt-2 break-words text-sm">{answers.airport.trim()} · {answers.service}</p>
        <ul className="mt-4 divide-y border-y">{solutions.filter(s => modes.has(s.name)).map(s => <li key={s.name} className="py-3"><strong>{s.name}</strong><p className="text-sm leading-relaxed text-muted-foreground">{s.note}</p></li>)}</ul>
        <p className="mt-4 text-sm leading-relaxed">{answers.contract === "Sim, tenho o documento" ? "Separe a cláusula e os anexos para conferir limites e vigência." : "Antes de contratar, peça a cláusula de seguros à contratante."} {answers.policy === "Sim" && "Compare a apólice vigente com a atividade e o local declarados antes de solicitar uma nova."}</p>
        <p className="mt-3 text-sm leading-relaxed">Esta orientação não é um diagnóstico nem confirma cobertura. Disponibilidade, prazo e aceitação dependem da análise da seguradora.</p>
        <div className="mt-5 flex flex-wrap items-center gap-4"><Button asChild className="min-h-11"><a href="#cotacao-aeroportuaria">Continuar com estas respostas</a></Button><button type="button" onClick={edit} className="min-h-11 font-semibold text-primary underline">Revisar respostas</button></div>
      </div>}
    </div>
  </section>;
}
