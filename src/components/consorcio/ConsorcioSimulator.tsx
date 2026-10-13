import { useState } from "react";
import { Calculator, ArrowRight, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { calculateConsorcioScenario, formatConsorcioCurrency as money, type ConsorcioScenario } from "@/lib/consorcioSimulation";

type Props = { onRequest: (credit: number, summary: string) => void };
const initial: Record<keyof ConsorcioScenario, string> = {
  credit: "300000", consortiumMonths: "180", administrationPercent: "20", reservePercent: "2",
  consortiumOtherCosts: "0", financingMonths: "180", downPayment: "60000",
  monthlyInterestPercent: "1", financingOtherCosts: "0",
};
const fields: { key: keyof ConsorcioScenario; label: string; min: number; max: number; step: number }[] = [
  { key: "credit", label: "Valor do bem / carta de crédito (R$)", min: 1000, max: 100000000, step: 1000 },
  { key: "consortiumMonths", label: "Prazo do consórcio (meses)", min: 1, max: 480, step: 1 },
  { key: "administrationPercent", label: "Taxa de administração total (%)", min: 0, max: 100, step: 0.1 },
  { key: "reservePercent", label: "Fundo de reserva total (%)", min: 0, max: 100, step: 0.1 },
  { key: "consortiumOtherCosts", label: "Outros custos do consórcio no prazo (R$)", min: 0, max: 100000000, step: 100 },
  { key: "financingMonths", label: "Prazo do financiamento (meses)", min: 1, max: 480, step: 1 },
  { key: "downPayment", label: "Entrada do financiamento (R$)", min: 0, max: 100000000, step: 1000 },
  { key: "monthlyInterestPercent", label: "Juros do financiamento ao mês (%)", min: 0, max: 10, step: 0.01 },
  { key: "financingOtherCosts", label: "Outros custos do financiamento no prazo (R$)", min: 0, max: 100000000, step: 100 },
];

export default function ConsorcioSimulator({ onRequest }: Props) {
  const [values, setValues] = useState(initial);
  const [attempted, setAttempted] = useState(false);
  const input = Object.fromEntries(Object.entries(values).map(([key, value]) => [key, value.trim() === "" ? NaN : Number(value)])) as unknown as ConsorcioScenario;
  const result = calculateConsorcioScenario(input);
  const request = () => {
    setAttempted(true);
    if (!result) return;
    const summary = `Cenário educativo, não é proposta: carta ${money(input.credit)}; consórcio ${input.consortiumMonths} meses, administração total ${input.administrationPercent}%, reserva ${input.reservePercent}%, outros custos ${money(input.consortiumOtherCosts)}, parcela-base ${money(result.consortiumPayment)}, total nominal ${money(result.consortiumTotal)}; financiamento Price ${input.financingMonths} meses, entrada ${money(input.downPayment)}, juros ${input.monthlyInterestPercent}% a.m., outros custos ${money(input.financingOtherCosts)}, parcela ${money(result.financingPayment)}, total nominal ${money(result.financingTotal)}. Sem reajustes, lance ou previsão de contemplação.`;
    onRequest(input.credit, summary);
  };

  return (
    <section id="comparar" aria-labelledby="comparar-title" className="scroll-mt-24 bg-slate-50 py-16 md:py-20 text-slate-900">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-8">
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#003366]"><Calculator className="h-4 w-4" /> Simulador educativo • sem cadastro</span>
          <h2 id="comparar-title" className="mt-3 text-3xl md:text-4xl font-heading font-semibold">Consórcio ou financiamento? Compare seus números.</h2>
          <p className="mt-4 text-slate-600">Defina o mesmo valor de aquisição e ajuste as condições de cada modalidade. Os valores iniciais são exemplos hipotéticos, não ofertas da Porto, MAPFRE ou de outra empresa.</p>
        </div>
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-6 items-start">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-7">
            <h3 className="font-semibold text-xl mb-5">Personalize o cenário</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {fields.map(({ key, label, min, max, step }) => (
                <div key={key} className={key === "credit" ? "sm:col-span-2" : ""}>
                  <label htmlFor={`scenario-${key}`} className="block text-sm font-medium mb-2">{label}</label>
                  <Input id={`scenario-${key}`} type="number" inputMode="decimal" min={min} max={max} step={step}
                    value={values[key]} onChange={(event) => setValues((old) => ({ ...old, [key]: event.target.value }))}
                    aria-describedby="scenario-help" className="h-12 bg-white text-slate-900 border-slate-300" />
                </div>
              ))}
            </div>
            <p id="scenario-help" className="mt-4 text-xs text-slate-600">Administração e reserva são percentuais totais, não mensais. Inclua seguros, tarifas e tributos conhecidos nos outros custos de cada modalidade. Prazo: 1 a 480 meses; entrada até o valor do bem.</p>
          </div>
          <div className="rounded-2xl bg-[#003366] text-white p-5 md:p-7">
            <h3 className="text-xl font-semibold mb-5">Resultado do cenário nominal</h3>
            {result ? (
              <>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="rounded-xl border border-white/20 p-4">
                    <h4 className="font-semibold text-[#ffc18b]">Consórcio</h4>
                    <p className="text-2xl font-semibold mt-3 break-words">{money(result.consortiumPayment)}</p>
                    <p className="text-xs text-white/80">parcela-base média • {input.consortiumMonths} meses</p>
                    <p className="mt-4 text-sm">Total nominal: <strong>{money(result.consortiumTotal)}</strong></p>
                    <p className="mt-2 text-xs text-white/80">Inclui {money(result.administration)} de administração e {money(result.reserve)} de reserva.</p>
                  </div>
                  <div className="rounded-xl border border-white/20 p-4">
                    <h4 className="font-semibold text-[#ffc18b]">Financiamento</h4>
                    <p className="text-2xl font-semibold mt-3 break-words">{money(result.financingPayment)}</p>
                    <p className="text-xs text-white/80">parcela Price • {input.financingMonths} meses</p>
                    <p className="mt-4 text-sm">Total com entrada: <strong>{money(result.financingTotal)}</strong></p>
                    <p className="mt-2 text-xs text-white/80">Entrada: {money(input.downPayment)}. Outros custos entram no total, não na parcela.</p>
                  </div>
                </div>
                <p className="mt-5 font-medium">{result.nominalDifference === 0 ? "Totais nominais iguais neste cenário." : `Neste cenário, o total nominal do ${result.nominalDifference > 0 ? "consórcio" : "financiamento"} é ${money(Math.abs(result.nominalDifference))} menor.`}</p>
                <p className="mt-2 text-sm text-white/80">Isso não representa economia garantida: o momento de acesso ao bem e os reajustes podem mudar a decisão.</p>
                <Button onClick={request} className="mt-6 w-full h-auto min-h-12 whitespace-normal bg-[#F2994A] hover:bg-[#e58a3b] text-[#14243d] font-semibold">Pedir análise deste cenário <ArrowRight className="ml-2 h-4 w-4 shrink-0" /></Button>
              </>
            ) : <p role="alert" className="rounded-xl bg-white/10 p-4">Preencha todos os campos com números válidos. O crédito deve ser de R$ 1.000 a R$ 100 milhões; percentuais totais até 100%, juros mensais até 10% e entrada não superior ao crédito.</p>}
            {attempted && result && <p className="mt-3 text-xs text-white/80">O cenário será enviado junto com sua solicitação ao preencher o formulário.</p>}
          </div>
        </div>
        <div className="mt-6 flex gap-3 rounded-xl border border-slate-200 bg-white p-5 text-sm text-slate-600">
          <Info className="h-5 w-5 shrink-0 text-[#003366]" />
          <p><strong>Como calculamos:</strong> consórcio = crédito + administração + reserva + outros custos, divididos pelo prazo. Financiamento = parcelas constantes pela Tabela Price sobre o valor após a entrada, mais entrada e custos adicionais no total. Não é CET nem comparação a valor presente; não inclui inflação, reajustes, lance, rentabilidade, aluguel durante a espera ou devolução eventual de reserva. A contratação pode usar outra distribuição de parcelas ou amortização, como SAC. A contemplação depende de sorteio ou lance e das regras do grupo; não há data garantida.</p>
        </div>
      </div>
    </section>
  );
}
