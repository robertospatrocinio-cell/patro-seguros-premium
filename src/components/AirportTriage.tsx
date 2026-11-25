import { useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { AIRPORT_HUB, AIRPORT_PRODUCTS, AIRPORT_QUESTIONS, airportPossibilities, type AirportBrief } from "../../supabase/functions/_shared/airport-qualification";
import { trackAirport } from "@/lib/airportAnalytics";

const control = "block min-h-12 w-full min-w-0 rounded-md border border-input bg-background px-3 py-2 text-base text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary";

export default function AirportTriage({ onReview }: { onReview: (brief: AirportBrief | undefined) => void }) {
  const [answers, setAnswers] = useState<AirportBrief>({});
  const [reviewing, setReviewing] = useState(false);
  const result = useRef<HTMLHeadingElement>(null);
  const first = useRef<HTMLInputElement>(null);
  const started = useRef(false), completed = useRef(false);
  const modes = airportPossibilities(answers);
  function start() {
    if (!started.current) { started.current = true; trackAirport("needs_assessment_start", AIRPORT_HUB); }
  }
  function review(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    start();
    if (!completed.current) { completed.current = true; trackAirport("needs_assessment_complete", AIRPORT_HUB, modes.length === 1 ? modes[0] : undefined); }
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
      <div><h2 id="triagem-heading" className="text-balance text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">Quais seguros vale avaliar para o seu contrato?</h2>
        <p className="mt-4 max-w-prose leading-relaxed">Responda o que já souber para montar um resumo preliminar. Você pode consultar a orientação sem informar nome ou telefone.</p>
        <p className="mt-4 max-w-prose text-sm text-muted-foreground">Não inclua dados pessoais nem copie cláusulas. As respostas ficam nesta página até você optar por incluí-las no pedido de atendimento.</p>
      </div>
      {!reviewing ? <form data-private="true" aria-label="Orientação preliminar para contratos aeroportuários" onChange={start} onSubmit={review} className="grid min-w-0 gap-5 rounded-xl border bg-card p-5 sm:grid-cols-2 sm:p-7">
        {AIRPORT_QUESTIONS.map((q, i) => <div key={q.key} className="flex min-w-0 flex-col gap-2">
          <label htmlFor={`triagem-${q.key}`} className="flex-1 text-sm font-semibold">{i + 1}. {q.label}</label>
          {"options" in q ? <select id={`triagem-${q.key}`} value={answers[q.key] ?? ""} className={control} onChange={e => setAnswers({ ...answers, [q.key]: e.target.value })}><option value="">Não informado</option>{q.options.map(o => <option key={o}>{o}</option>)}</select>
            : <><p id={`triagem-${q.key}-hint`} className="text-xs text-muted-foreground">{q.hint}</p><input maxLength={q.max} ref={q.key === "airport" ? first : undefined} id={`triagem-${q.key}`} aria-describedby={`triagem-${q.key}-hint`} className={control} value={answers[q.key] ?? ""} onChange={e => setAnswers({ ...answers, [q.key]: e.target.value })} /></>}
        </div>)}
        <Button type="submit" className="min-h-11 sm:col-span-2 sm:justify-self-start">Ver orientação preliminar</Button>
      </form> : <div className="min-w-0 rounded-xl border bg-card p-5 sm:p-7">
        <h3 tabIndex={-1} ref={result} className="scroll-mt-24 text-xl font-semibold">Modalidades para avaliar</h3>
        {modes.length ? <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">{modes.map(mode => <li key={mode}>{AIRPORT_PRODUCTS[mode]}</li>)}</ul> : <p className="mt-3 text-sm">Ainda não há informações suficientes para sugerir modalidades. Você pode pedir orientação mesmo assim.</p>}
        <p className="mt-3 text-sm leading-relaxed">São pontos para avaliação humana, não uma confirmação de cobertura, aceitação ou atendimento ao contrato. {answers.policy === "Sim" && "Separe as apólices vigentes para comparar com a cláusula."}</p>
        <h4 className="mt-5 font-semibold">Resumo preliminar</h4>
        <dl className="mt-2 grid gap-3 border-y py-3 text-sm sm:grid-cols-2">{AIRPORT_QUESTIONS.map(({ key, label }) => <div key={key}><dt className="text-muted-foreground">{label}</dt><dd className="break-words font-medium">{answers[key]?.trim() || "Não informado"}</dd></div>)}</dl>
        <div className="mt-5 flex flex-wrap items-center gap-4"><Button asChild className="min-h-11"><a href="#cotacao-aeroportuaria" onClick={() => onReview(answers)}>Continuar com estas respostas</a></Button><button type="button" onClick={edit} className="min-h-11 font-semibold text-primary underline">Revisar respostas</button></div>
      </div>}
    </div>
  </section>;
}
