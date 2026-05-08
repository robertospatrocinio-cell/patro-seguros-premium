import { lazy, Suspense } from "react";
import { Check, Info, ArrowRight, Hospital, Building, HeartPulse, Clock, ShieldCheck, Search, HelpCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
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
        description="Compare planos de saúde em Guarulhos: tabelas de preços e hospitais credenciados (Stella Maris, Carlos Chagas) da Amil, Bradesco e muito mais."
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

        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="mb-4">Guia Prático: Carência e Rede Credenciada</h2>
              <p className="text-muted-foreground">Tudo o que você precisa saber antes de contratar seu plano em Guarulhos.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 mb-20">
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-primary">
                  <Clock className="h-6 w-6" />
                  <h3 className="text-2xl font-bold m-0">Entenda as Carências</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  A carência é o tempo que você precisa esperar para usar determinados serviços após contratar o plano. Em Guarulhos, a Patro Seguros negocia a <strong>redução de carências</strong> para empresas e planos vindos de outras operadoras.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 bg-muted/30 p-3 rounded-lg">
                    <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded">24h</span>
                    <span className="text-sm font-medium">Urgência e Emergência</span>
                  </li>
                  <li className="flex items-center gap-3 bg-muted/30 p-3 rounded-lg">
                    <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded">30 dias</span>
                    <span className="text-sm font-medium">Consultas e Exames Simples</span>
                  </li>
                  <li className="flex items-center gap-3 bg-muted/30 p-3 rounded-lg">
                    <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded">180 dias</span>
                    <span className="text-sm font-medium">Exames Complexos e Internações</span>
                  </li>
                  <li className="flex items-center gap-3 bg-muted/30 p-3 rounded-lg">
                    <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded">300 dias</span>
                    <span className="text-sm font-medium">Parto e Pré-natal</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-3 text-primary">
                  <ShieldCheck className="h-6 w-6" />
                  <h3 className="text-2xl font-bold m-0">Rede Credenciada</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  A rede credenciada são os hospitais, laboratórios e médicos que o seu plano atende. Para quem mora em Guarulhos, é vital conferir a cobertura no <strong>Stella Maris, Carlos Chagas e Ipiranga</strong>.
                </p>
                <div className="bg-primary/5 border border-primary/10 p-6 rounded-2xl">
                  <h4 className="flex items-center gap-2 font-bold mb-4">
                    <Search className="h-4 w-4" /> Como conferir sua cobertura?
                  </h4>
                  <ol className="space-y-4 text-sm list-decimal list-inside">
                    <li><strong>Defina seu bairro:</strong> A cobertura pode variar por região (Ex: Cidade Maia vs Cumbica).</li>
                    <li><strong>Acesse o app da operadora:</strong> Use o "Busca de Rede" filtrando por especialidade.</li>
                    <li><strong>Consulte a Patro Seguros:</strong> Nós temos o livro de rede atualizado de todas as operadoras de Guarulhos.</li>
                  </ol>
                </div>
              </div>
            </div>

            <div className="bg-muted/30 p-8 md:p-12 rounded-3xl">
              <div className="flex items-center gap-3 mb-8">
                <HelpCircle className="h-8 w-8 text-primary" />
                <h3 className="text-3xl font-bold m-0">FAQ Planos de Saúde</h3>
              </div>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left font-semibold">Como funciona a portabilidade de carências?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Você pode trocar de operadora sem cumprir carências se o seu plano atual tiver mais de 2 anos e o novo plano for de preço compatível. Nós cuidamos de todo o processo burocrático para você.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left font-semibold">O que é coparticipação e como ela reduz o valor?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Na coparticipação, você paga uma mensalidade fixa muito menor e uma pequena taxa apenas quando usar o plano (ex: R$ 25 por consulta). É ideal para quem busca economia mensal.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left font-semibold">Qual o melhor plano para quem mora no Centro de Guarulhos?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    Para o Centro, planos como Amil e SulAmérica oferecem a melhor cobertura no Hospital Carlos Chagas e laboratórios como o Delboni, que ficam na região central.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
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