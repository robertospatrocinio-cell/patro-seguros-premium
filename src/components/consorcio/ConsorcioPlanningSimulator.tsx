import { useState } from "react";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { WHATSAPP_URL_BASE } from "@/config/empresa";
import { trackWhatsAppClick } from "@/lib/tracking";
import { calculateConsorcioScenario, formatConsorcioCurrency as money, type ConsorcioScenario } from "@/lib/consorcioSimulation";

type Props = { onRequest: (credit: number, summary: string, modality: string) => void };
const modalities = [
  { label: "Imóveis", credit: "300000", months: "180" },
  { label: "Veículos", credit: "80000", months: "80" },
  { label: "Pesados & Agro", credit: "300000", months: "120" },
  { label: "Serviços", credit: "40000", months: "48" },
];
const costFields = [
  { key: "administrationPercent", label: "Administração total (%)", max: 100, step: 0.1 },
  { key: "reservePercent", label: "Fundo de reserva total (%)", max: 100, step: 0.1 },
  { key: "consortiumOtherCosts", label: "Outros custos do consórcio (R$)", max: 100000000, step: 100 },
  { key: "monthlyInterestPercent", label: "Juros do financiamento ao mês (%)", max: 10, step: 0.01 },
  { key: "downPayment", label: "Entrada do financiamento (R$)", max: 2000000, step: 1000 },
  { key: "financingOtherCosts", label: "Outros custos do financiamento (R$)", max: 100000000, step: 100 },
] as const;

export default function ConsorcioPlanningSimulator({ onRequest }: Props) {
  const [modality, setModality] = useState("Imóveis");
  const [credit, setCredit] = useState("300000");
  const [months, setMonths] = useState("180");
  const [hasResources, setHasResources] = useState(false);
  const [costs, setCosts] = useState({ administrationPercent: "20", reservePercent: "2", consortiumOtherCosts: "0", monthlyInterestPercent: "1", downPayment: "0", financingOtherCosts: "0" });
  const number = (value: string) => value.trim() === "" ? NaN : Number(value);
  const input: ConsorcioScenario = {
    ...Object.fromEntries(Object.entries(costs).map(([key, value]) => [key, number(value)])),
    credit: number(credit), consortiumMonths: number(months), financingMonths: number(months),
  } as ConsorcioScenario;
  const inRange = input.credit >= 20000 && input.credit <= 2000000 && input.consortiumMonths >= 36 && input.consortiumMonths <= 240;
  const result = inRange ? calculateConsorcioScenario(input) : null;
  const resourceText = hasResources ? "Tenho recursos para avaliar lance; FGTS somente para imóvel elegível." : "Planejo participar por sorteio, sem recursos para lance neste momento.";
  const summary = result ? `Modalidade: ${modality}. Cenário educativo, não é proposta: carta ${money(input.credit)}, prazo ${input.consortiumMonths} meses; administração total ${input.administrationPercent}%, reserva ${input.reservePercent}%, outros custos do consórcio ${money(input.consortiumOtherCosts)}, parcela-base ${money(result.consortiumPayment)}, total nominal ${money(result.consortiumTotal)}. Financiamento Price: entrada ${money(input.downPayment)}, juros ${input.monthlyInterestPercent}% a.m., outros custos ${money(input.financingOtherCosts)}, parcela ${money(result.financingPayment)}, total ${money(result.financingTotal)}. ${resourceText} Sem reajustes, lance no cálculo ou data garantida de contemplação.` : "";
  const whatsapp = `${WHATSAPP_URL_BASE}?text=${encodeURIComponent(`Olá! Quero receber a tabela dos grupos disponíveis e consultar o histórico de lances. ${summary}`)}`;
  const changeModality = (item: typeof modalities[number]) => { setModality(item.label); setCredit(item.credit); setMonths(item.months); setCosts(old => ({ ...old, downPayment: "0" })); };

  return <section id="comparar" aria-labelledby="comparar-title" className="scroll-mt-24 bg-slate-50 text-slate-900 py-16 md:py-24">
    <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
      <p className="mb-4 text-sm font-medium text-[#003366]">Simulador educativo • sem cadastro</p>
      <h2 id="comparar-title" className="text-3xl md:text-4xl font-heading font-semibold tracking-tight max-w-3xl text-[#092b4c]">Explore valores. Entenda os custos.</h2>
      <p id="planning-help" className="mt-4 max-w-3xl text-slate-600">Ajuste a carta, o prazo e as hipóteses para comparar cenários. Os valores iniciais são exemplos hipotéticos, não taxas de mercado, ofertas ou proposta comercial. A diferença de custo não é uma economia garantida.</p>
      <div className="grid lg:grid-cols-[1.1fr_1fr] gap-6 mt-8 items-start">
        <div aria-describedby="planning-help" onChangeCapture={event => {
          const target = event.target as HTMLInputElement;
          // Apenas identificadores fixos: nunca valores, texto livre ou a mensagem do WhatsApp.
          window.gtag?.("event", "consorcio_simulator_interaction", {
            modality: target.name === "planning-modality" && modalities.some(item => item.label === target.value) ? target.value : modality,
            interaction: target.name === "planning-modality" ? "modality_select" : target.type === "checkbox" ? "resource_toggle" : "scenario_edit",
            page_path: "/consorcio",
          });
        }} className="bg-white border border-slate-200 rounded-2xl p-5 md:p-7 space-y-7">
          <fieldset><legend className="font-semibold mb-3">O que você deseja conquistar?</legend><div className="grid grid-cols-2 sm:grid-cols-4 gap-2">{modalities.map(item => <label key={item.label} className={`relative flex items-center justify-center min-h-12 cursor-pointer rounded-lg border px-2 py-3 text-sm text-center ${modality === item.label ? "bg-[#003366] border-[#003366] text-white" : "bg-white border-slate-300 text-slate-700"}`}><input type="radio" name="planning-modality" value={item.label} checked={modality === item.label} onChange={() => changeModality(item)} className="peer sr-only" /><span className="peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4">{item.label}</span></label>)}</div></fieldset>
          <div><label htmlFor="planning-credit" className="block font-semibold mb-2">Valor da carta de crédito (R$)</label><Input id="planning-credit" type="number" inputMode="numeric" min={20000} max={2000000} step={1000} value={credit} onChange={e => setCredit(e.target.value)} className="h-12 bg-white text-slate-900" aria-describedby="planning-credit-help" /><input type="range" aria-label="Ajustar valor da carta de crédito" aria-valuetext={money(Number(credit) || 20000)} min={20000} max={2000000} step={1000} value={Number(credit) || 20000} onChange={e => setCredit(e.target.value)} className="w-full h-10 accent-[#003366]" /><p id="planning-credit-help" className="text-xs text-slate-600">De R$ 20 mil a R$ 2 milhões. A disponibilidade depende do grupo.</p></div>
          <div><label htmlFor="planning-months" className="block font-semibold mb-2">Prazo desejado (meses)</label><Input id="planning-months" type="number" inputMode="numeric" min={36} max={240} step={1} value={months} onChange={e => setMonths(e.target.value)} className="h-12 bg-white text-slate-900" /><input type="range" aria-label="Ajustar prazo desejado" aria-valuetext={`${months || 36} meses`} min={36} max={240} step={1} value={Number(months) || 36} onChange={e => setMonths(e.target.value)} className="w-full h-10 accent-[#003366]" /><p className="text-xs text-slate-600">36 a 240 meses para comparação; nem todo prazo está disponível em cada modalidade.</p></div>
          <label className="flex items-start gap-3 min-h-12 cursor-pointer"><input type="checkbox" role="switch" checked={hasResources} onChange={e => setHasResources(e.target.checked)} className="mt-1 h-5 w-5 accent-[#003366]" /><span><span className="block font-semibold">Possui recurso para lance ou FGTS?</span><span className="block mt-1 text-sm text-slate-600">{hasResources ? "Sim — quero avaliar uma estratégia de lance." : "Não — apenas sorteio neste momento."}</span></span></label>
          <p className="text-xs text-slate-600">Essa opção informa seu planejamento, sem reduzir parcelas ou prever contemplação. FGTS apenas para imóveis e operações elegíveis; lance embutido reduz a carta disponível.</p>
          <details className="border-t border-slate-200 pt-4"><summary className="cursor-pointer py-2 font-semibold text-[#003366]">Ajustar taxas, entrada e outros custos</summary><div className="mt-4 grid sm:grid-cols-2 gap-4">{costFields.map(field => <div key={field.key}><label htmlFor={`planning-${field.key}`} className="block text-sm font-medium mb-2">{field.label}</label><Input id={`planning-${field.key}`} type="number" inputMode="decimal" min={0} max={field.max} step={field.step} value={costs[field.key]} onChange={e => setCosts(old => ({ ...old, [field.key]: e.target.value }))} className="h-12 bg-white text-slate-900" /></div>)}</div><p className="text-xs text-slate-600 mt-4">Administração e reserva são percentuais do prazo completo, não mensais. Inclua seguros, tributos e tarifas conhecidos nos outros custos. Entrada não pode superar a carta.</p></details>
        </div>
        <div className="bg-[#003366] text-white rounded-2xl p-5 md:p-7 lg:sticky lg:top-24">
          <h3 className="text-xl font-semibold text-white">Seu planejamento em números</h3>
          <p className="text-sm mt-3 text-white/80">Hipóteses atuais: administração {costs.administrationPercent}% + reserva {costs.reservePercent}% no prazo; financiamento a {costs.monthlyInterestPercent}% ao mês.</p>
          <div aria-live="polite" aria-atomic="true" className="mt-6">
            {result ? <>
              <p className="text-sm text-white/85">Parcela estimada no consórcio</p><p className="text-3xl sm:text-4xl font-semibold tabular-nums mt-1 break-words">{money(result.consortiumPayment)}<span className="text-base font-normal"> / mês</span></p><p className="text-xs text-blue-100 mt-2">Sem juros de financiamento • inclui administração e reserva</p>
              <div className="mt-6 border-t border-white/20 pt-5"><p className="text-sm text-white/85">Parcela estimada no financiamento bancário</p><p className="text-2xl font-semibold tabular-nums mt-1">{money(result.financingPayment)}<span className="text-sm font-normal"> / mês</span></p><p className="text-xs text-white/75 mt-2">Tabela Price • entrada de {money(input.downPayment)}</p></div>
              <div className="mt-6 rounded-xl bg-white/10 p-4"><p className="text-sm">{result.nominalDifference > 0 ? "Diferença nominal: consórcio com menor total neste exemplo" : result.nominalDifference < 0 ? "Diferença nominal: consórcio com maior total neste exemplo" : "Totais nominais iguais neste exemplo"}</p><p className="text-2xl font-semibold mt-2 tabular-nums">{money(Math.abs(result.nominalDifference))}</p><p className="text-xs text-white/80 mt-3">Total consórcio: {money(result.consortiumTotal)}<br />Total financiamento com entrada: {money(result.financingTotal)}</p><p className="mt-3 text-xs leading-relaxed text-white/80">Comparação hipotética, sem garantia de economia. O custo da espera e os reajustes podem mudar sua decisão.</p></div>
            </> : <p role="alert" className="rounded-lg bg-white/10 p-4">Confira os valores: carta entre R$ 20 mil e R$ 2 milhões, prazo inteiro de 36 a 240 meses, custos não negativos e entrada até o valor da carta. Percentuais totais até 100% e juros mensais até 10%.</p>}
          </div>
          <p className="mt-5 text-xs text-white/80">Não inclui reajustes ou custo da espera pelo bem. Não é proposta comercial nem promessa de contemplação.</p>
          {result && <div className="mt-6 space-y-3"><Button asChild className="w-full min-h-12 h-auto whitespace-normal bg-white hover:bg-blue-50 text-[#003366] font-semibold py-3"><a href={whatsapp} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick("consorcio_simulador_nacional")}><MessageCircle className="h-5 w-5 shrink-0 mr-2" aria-hidden="true" />Consultar grupos e histórico disponível no WhatsApp</a></Button><Button type="button" onClick={() => onRequest(input.credit, summary, modality)} variant="outline" className="w-full min-h-12 h-auto whitespace-normal border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white">Prefiro receber contato da Patro<ArrowRight className="ml-2 h-4 w-4 shrink-0" aria-hidden="true" /></Button></div>}
        </div>
      </div>
      <details className="mt-6 rounded-xl border border-slate-200 bg-white p-5"><summary className="cursor-pointer py-2 font-semibold">Como calculamos e o que não está incluído</summary><p className="mt-3 text-sm text-slate-600 leading-relaxed">Consórcio: carta + administração + reserva + outros custos, divididos pelo prazo. Financiamento: parcelas constantes pela Tabela Price sobre o valor após a entrada; entrada e custos extras somam-se ao total, não à parcela. A comparação nominal não é CET nem valor presente e não inclui inflação, reajustes, lance, rentabilidade, aluguel durante a espera ou devolução eventual da reserva. Planos reais podem usar outras distribuições de parcelas ou SAC. A contemplação depende de sorteio ou lance e dos recursos e regras do grupo, sem data garantida.</p></details>
    </div>
  </section>;
}
