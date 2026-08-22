import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackCotacaoClick } from "@/lib/tracking";

interface ComparisonTableProps {
  title?: string;
  subtitle?: string;
}

const ComparisonTableResidencial = ({ 
  title = "Compare Casa, Apartamento e Flat", 
  subtitle = "Entenda qual a melhor proteção para o seu perfil e garanta o melhor custo-benefício." 
}: ComparisonTableProps) => {
  
  const options = [
    {
      name: "Seguro Casa",
      description: "Proteção completa para residências térreas ou sobrados.",
      price: "A partir de R$ 25/mês",
      ctaUrl: "https://www.patroseguros.com.br/cotacao-auto",
      features: [
        { label: "Incêndio e Explosão", value: true },
        { label: "Danos Elétricos (Raios/Rede)", value: true },
        { label: "Roubo e Furto Qualificado", value: true },
        { label: "Vendaval e Granizo", value: true },
        { label: "Alagamento e Inundação", value: "Opcional" },
        { label: "RC Familiar (Danos a Terceiros)", value: true },
        { label: "Assistência 24h (Chaveiro/Encanador)", value: "Completa" },
        { label: "Cobertura de Estrutura", value: true },
      ],
      recommended: false
    },
    {
      name: "Seguro Apartamento",
      description: "Foco no conteúdo e responsabilidade civil (vizinhos).",
      price: "A partir de R$ 15/mês",
      ctaUrl: "https://www.patroseguros.com.br/cotacao-auto",
      features: [
        { label: "Incêndio e Explosão", value: true },
        { label: "Danos Elétricos (Raios/Rede)", value: true },
        { label: "Roubo e Furto Qualificado", value: true },
        { label: "Vendaval e Granizo", value: "Baixo Risco" },
        { label: "Alagamento e Inundação", value: false },
        { label: "RC Familiar (Danos a Terceiros)", value: "Essencial" },
        { label: "Assistência 24h (Chaveiro/Encanador)", value: "Completa" },
        { label: "Cobertura de Estrutura", value: "Pelo Condomínio" },
      ],
      recommended: true
    },
    {
      name: "Seguro Flat / Airbnb",
      description: "Ideal para investidores e locações de curta duração.",
      price: "Sob consulta",
      ctaUrl: "https://www.patroseguros.com.br/cotacao-auto",
      features: [
        { label: "Incêndio e Explosão", value: true },
        { label: "Danos Elétricos (Raios/Rede)", value: true },
        { label: "Roubo e Furto Qualificado", value: true },
        { label: "Danos Causados por Hóspedes", value: "Incluso" },
        { label: "Perda de Aluguel (Lucros Cessantes)", value: "Opcional" },
        { label: "RC Familiar (Danos a Terceiros)", value: true },
        { label: "Assistência 24h (Chaveiro/Encanador)", value: "Prioritária" },
        { label: "Cobertura de Estrutura", value: "Pelo Condomínio" },
      ],
      recommended: false
    }
  ];

  const allFeatures = Array.from(new Set(options.flatMap(o => o.features.map(f => f.label))));

  return (
    <section className="py-20 bg-slate-50 overflow-hidden" id="tabela-comparativa">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{title}</h2>
          <p className="text-lg text-slate-600">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-4 relative">
          {options.map((option, idx) => (
            <div 
              key={idx} 
              className={`flex flex-col bg-white rounded-2xl shadow-xl transition-all duration-300 hover:scale-[1.02] border-2 ${
                option.recommended ? "border-primary lg:-translate-y-4 z-10" : "border-transparent"
              }`}
            >
              {option.recommended && (
                <div className="bg-primary text-white text-xs font-bold uppercase tracking-widest text-center py-2 rounded-t-lg">
                  Melhor Custo-Benefício
                </div>
              )}
              
              <div className="p-8 text-center border-b border-slate-100">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{option.name}</h3>
                <p className="text-sm text-slate-500 mb-6 h-10 line-clamp-2">{option.description}</p>
                <div className="text-3xl font-extrabold text-primary mb-6">{option.price}</div>
                <a 
                  href={option.ctaUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => trackCotacaoClick(`comparativo-${option.name.toLowerCase().replace(/ /g, '-')}`)}
                  className="block"
                >
                  <Button className={`w-full py-6 text-lg font-bold rounded-xl ${option.recommended ? 'bg-primary hover:bg-primary/90' : 'bg-slate-800 hover:bg-slate-900'}`}>
                    Cotar {option.name}
                  </Button>
                </a>
              </div>

              <div className="flex-1 p-8 space-y-4">
                {allFeatures.map((featureLabel, fIdx) => {
                  const feature = option.features.find(f => f.label === featureLabel);
                  return (
                    <div key={fIdx} className="flex items-center justify-between text-sm py-2 border-b border-slate-50 last:border-0">
                      <span className="text-slate-600 font-medium">{featureLabel}</span>
                      <span className="flex items-center">
                        {feature ? (
                          typeof feature.value === 'boolean' ? (
                            feature.value ? (
                              <Check className="h-5 w-5 text-green-500" />
                            ) : (
                              <X className="h-5 w-5 text-red-300" />
                            )
                          ) : (
                            <span className="text-xs font-bold px-2 py-1 bg-slate-100 text-slate-700 rounded-full">
                              {feature.value}
                            </span>
                          )
                        ) : (
                          <X className="h-5 w-5 text-slate-200" />
                        )}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="p-8 mt-auto border-t border-slate-50 text-center">
                <p className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
                  Cotação em até 2 horas úteis
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <p className="text-center mt-12 text-sm text-slate-500 italic max-w-2xl mx-auto">
          * Os preços acima são estimativas baseadas em perfis médios de Guarulhos e variam conforme CEP, coberturas escolhidas e valor dos bens declarados.
        </p>
      </div>
    </section>
  );
};

export default ComparisonTableResidencial;
