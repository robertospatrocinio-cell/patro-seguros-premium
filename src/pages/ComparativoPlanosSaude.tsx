import { lazy, Suspense } from "react";
import { Check, Info, ArrowRight, Hospital, Building, HeartPulse } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import StickyQuoteBar from "@/components/StickyQuoteBar";
const QuickQuoteForm = lazy(() => import("@/components/QuickQuoteForm"));

const comparativoData = [
  {
    categoria: "Econômico / Regional",
    precos: "A partir de R$ 280,00",
    operadoras: "HapVida, GNDI (Intermédica), BioSaúde",
    hospitais: "Hospital Ipiranga, Hospital 8 de Maio, Rede Própria GNDI",
    caracteristicas: [
      "Foco em rede própria",
      "Atendimento regional Guarulhos/SP",
      "Melhor custo-benefício",
      "Ideal para MEI e famílias"
    ],
    indicado: "Quem busca o menor preço com atendimento local garantido."
  },
  {
    categoria: "Intermediário / Nacional",
    precos: "A partir de R$ 450,00",
    operadoras: "Amil, SulAmérica Direto, Porto Saúde",
    hospitais: "Hospital Stella Maris, Carlos Chagas, Hospital Luz",
    caracteristicas: [
      "Ampla rede credenciada",
      "Opção de reembolso",
      "Atendimento nacional para urgências",
      "Telemedicina 24h inclusa"
    ],
    indicado: "Famílias e empresas que buscam equilíbrio entre preço e ampla rede."
  },
  {
    categoria: "Premium / Especial",
    precos: "A partir de R$ 850,00",
    operadoras: "Bradesco Saúde, SulAmérica Especial, Omint",
    hospitais: "Sírio-Libanês, Albert Einstein, Samaritano",
    caracteristicas: [
      "Reembolso elevado",
      "Rede dos melhores hospitais do Brasil",
      "Coleta domiciliar de exames",
      "Seguro viagem internacional incluso"
    ],
    indicado: "Executivos e famílias que não abrem mão da máxima excelência médica."
  }
];

const ComparativoPlanosSaude = () => {
  return (
    <>
      <PageMeta 
        title="Comparativo de Planos de Saúde Guarulhos | Preços e Hospitais" 
        description="Compare os melhores planos de saúde em Guarulhos. Veja tabelas de preços, hospitais credenciados (Stella Maris, Carlos Chagas) e coberturas de Amil, Bradesco e mais." 
      />
      <Header />
      <main id="main-content">
        <section className="bg-primary/5 py-16">
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <h1 className="mb-6">Comparativo de Planos de Saúde em Guarulhos</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Analisamos as principais operadoras para ajudar você a escolher entre custo-benefício regional ou excelência nacional.
            </p>
            <div className="flex justify-center gap-4">
              <a href="#tabela-comparativa">
                <Button size="lg">Ver Comparativo</Button>
              </a>
              <a href="#cotacao-saude">
                <Button size="lg" variant="cta">Pedir Cotação Personalizada</Button>
              </a>
            </div>
          </div>
        </section>

        <section id="tabela-comparativa" className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {comparativoData.map((item, i) => (
                <Card key={i} className={`flex flex-col border-t-4 ${i === 1 ? 'border-t-primary shadow-xl scale-105 z-10' : 'border-t-muted-foreground/20'}`}>
                  <CardHeader className="text-center pb-2">
                    <CardTitle className="text-2xl">{item.categoria}</CardTitle>
                    <CardDescription className="text-primary font-bold text-xl">{item.precos}*</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow space-y-6 pt-4">
                    <div>
                      <div className="flex items-center gap-2 font-bold mb-2 text-sm uppercase tracking-wider opacity-70">
                        <Building className="h-4 w-4" /> Principais Operadoras
                      </div>
                      <p className="text-sm font-medium">{item.operadoras}</p>
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2 font-bold mb-2 text-sm uppercase tracking-wider opacity-70">
                        <Hospital className="h-4 w-4" /> Rede em Guarulhos/SP
                      </div>
                      <p className="text-sm">{item.hospitais}</p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 font-bold mb-3 text-sm uppercase tracking-wider opacity-70">
                        <HeartPulse className="h-4 w-4" /> Diferenciais
                      </div>
                      <ul className="space-y-2">
                        {item.caracteristicas.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-muted/50 p-4 rounded-lg">
                      <p className="text-xs italic text-muted-foreground">
                        <strong>Ideal para:</strong> {item.indicado}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="text-center text-xs text-muted-foreground mt-12 max-w-2xl mx-auto">
              *Valores médios para plano individual (faixa 0-18 anos) com coparticipação. Os preços variam conforme faixa etária, CNPJ e tipo de contratação. Consulte nossa tabela atualizada.
            </p>
          </div>
        </section>

        <section id="cotacao-saude" className="py-16 bg-muted">
          <div className="container mx-auto px-4 max-w-2xl">
            <div className="text-center mb-10">
              <h2>Receba a Tabela de Preços Completa</h2>
              <p className="text-muted-foreground mt-2">
                Nossos especialistas enviam um comparativo detalhado em PDF via WhatsApp em minutos.
              </p>
            </div>
            <Suspense fallback={<div className="h-[500px] rounded-xl border bg-background animate-pulse" />}>
              <QuickQuoteForm
                insuranceType="Comparativo Saúde Guarulhos"
                trackingLabel="comparativo-saude"
                extraFields={[
                  { id: "perfil", label: "Seu Perfil", placeholder: "Selecione", type: "select", options: ["Pessoa Física", "MEI", "Empresa (PME)", "Idoso"] },
                  { id: "vidas", label: "Vidas", placeholder: "Ex: 2 adultos + 2 crianças" }
                ]}
              />
            </Suspense>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="flex items-start gap-4 p-6 bg-blue-50 rounded-2xl border border-blue-100">
              <Info className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-blue-900 mb-2">Dica da Patro Seguros: Economize com o MEI</h3>
                <p className="text-blue-800 text-sm leading-relaxed">
                  Você sabia que planos de saúde para quem possui CNPJ (inclusive MEI) são até 40% mais baratos que os planos de pessoa física? Em Guarulhos, operadoras como Bradesco e Amil aceitam MEI a partir de 2 ou 3 vidas com tabelas extremamente agressivas.
                </p>
                <Button variant="link" className="text-blue-900 font-bold p-0 mt-2 h-auto">
                  Saber mais sobre Plano MEI <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <StickyQuoteBar 
        source="comparativo-saude" 
        quoteHref="#cotacao-saude" 
        ctaLabel="Tabela Completa" 
        whatsappMessage="Olá! Gostaria de receber a tabela de preços comparativa dos planos de saúde em Guarulhos." 
      />
      <Footer />
    </>
  );
};

export default ComparativoPlanosSaude;