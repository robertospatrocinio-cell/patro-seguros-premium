import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { trackCotacaoClick } from "@/lib/tracking";

interface ComparisonTableProps {
  title?: string;
  subtitle?: string;
}

const options = [
  {
    name: "Seguro Casa",
    description: "Avalie construção, conteúdo e responsabilidades do morador.",
    points: [
      "Informe se é moradia habitual, imóvel de lazer ou imóvel desocupado.",
      "Confira a aceitação de eventos como vendaval, danos por água e subtração de bens.",
      "Compare limites, franquias e regras dos serviços de assistência.",
    ],
  },
  {
    name: "Seguro Apartamento",
    description: "Compare a apólice do condomínio com a proteção da sua unidade.",
    points: [
      "Não presuma que móveis e eletrônicos estão cobertos pelo seguro do condomínio.",
      "Avalie responsabilidade civil por danos a vizinhos conforme os eventos previstos.",
      "Confira se a construção e as benfeitorias precisam de cobertura complementar.",
    ],
  },
  {
    name: "Seguro Flat / locação temporária",
    description: "Declare o uso comercial ou temporário antes de solicitar a proposta.",
    points: [
      "A locação por temporada precisa ser informada e aceita pelo produto.",
      "Danos de hóspedes e perda de aluguel não devem ser presumidos como incluídos.",
      "Confira bens, ocupação, responsabilidades e eventuais exigências do condomínio.",
    ],
  },
];

const ComparisonTableResidencial = ({
  title = "Compare Casa, Apartamento e Flat",
  subtitle = "Cada uso exige uma análise. As opções abaixo são orientações para cotação, não pacotes com coberturas garantidas.",
}: ComparisonTableProps) => (
  <section className="py-20 bg-slate-50 overflow-hidden" id="tabela-comparativa">
    <div className="container mx-auto px-4">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{title}</h2>
        <p className="text-lg text-slate-600">{subtitle}</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {options.map((option) => (
          <article key={option.name} className="flex flex-col bg-white rounded-2xl shadow-xl border border-slate-200">
            <div className="p-8 border-b border-slate-100">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">{option.name}</h3>
              <p className="text-sm text-slate-600">{option.description}</p>
              <p className="text-lg font-bold text-primary mt-5">Valor sob cotação</p>
            </div>
            <ul className="flex-1 p-8 space-y-4 text-sm text-slate-700 list-disc list-inside">
              {option.points.map((point) => <li key={point}>{point}</li>)}
            </ul>
            <div className="p-8 pt-0">
              <Button asChild className="w-full rounded-xl">
                <Link
                  to="/cotacao?tipo=residencial"
                  onClick={() => trackCotacaoClick(`comparativo-${option.name.toLowerCase().replace(/ /g, "-")}`)}
                >
                  Cotar {option.name}
                </Link>
              </Button>
            </div>
          </article>
        ))}
      </div>
      <p className="text-center mt-10 text-sm text-slate-600 max-w-3xl mx-auto">
        Disponibilidade, coberturas, limites, exclusões, franquias e assistências dependem da proposta e da aceitação da seguradora.
        Confira as condições antes de contratar. Não há promessa de preço mínimo ou prazo de retorno.
      </p>
    </div>
  </section>
);

export default ComparisonTableResidencial;
