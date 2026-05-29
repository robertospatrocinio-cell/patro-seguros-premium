import { Link } from "react-router-dom";
import { lazy, Suspense } from "react";
import { CheckCircle, Phone, MessageCircle, ArrowRight, Building2, FlaskConical, Stethoscope, UserPlus, Users } from "lucide-react";
import StickyQuoteBar from "@/components/StickyQuoteBar";
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-center mb-4">Rede Credenciada em Guarulhos e Região</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Trabalhamos com operadoras que oferecem atendimento nos melhores estabelecimentos de saúde da região. Confira alguns exemplos:
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-primary mb-2">
                  <Building2 className="h-6 w-6" />
                  <h3 className="text-xl font-bold">Hospitais</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-semibold">Hospital Stella Maris</span>
                      <p className="text-sm text-muted-foreground">Referência em Guarulhos com atendimento completo.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-semibold">Hospital Carlos Chagas</span>
                      <p className="text-sm text-muted-foreground">Excelência em pronto-atendimento e internação.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-semibold">Hospital Ipiranga Guarulhos</span>
                      <p className="text-sm text-muted-foreground">Rede própria de grandes operadoras como a GNDI.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-semibold">Hospitais Premium (SP)</span>
                      <p className="text-sm text-muted-foreground">Sírio-Libanês e Einstein (conforme plano escolhido).</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-3 text-primary mb-2">
                  <FlaskConical className="h-6 w-6" />
                  <h3 className="text-xl font-bold">Laboratórios</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-semibold">Laboratório Delboni</span>
                      <p className="text-sm text-muted-foreground">Unidades modernas em Guarulhos e São Paulo.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-semibold">Lavoisier</span>
                      <p className="text-sm text-muted-foreground">Capilaridade com diversas unidades na região.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-semibold">Fleury</span>
                      <p className="text-sm text-muted-foreground">Medicina diagnóstica de alta precisão (Planos Premium).</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-semibold">CDB / Salomão Zoppi</span>
                      <p className="text-sm text-muted-foreground">Ampla rede de exames de imagem e laboratoriais.</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-3 text-primary mb-2">
                  <Stethoscope className="h-6 w-6" />
                  <h3 className="text-xl font-bold">Clínicas e Especialidades</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-semibold">Centros Médicos Próprios</span>
                      <p className="text-sm text-muted-foreground">Estruturas exclusivas da Amil, GNDI e Porto Saúde.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-semibold">Clínicas de Especialidades</span>
                      <p className="text-sm text-muted-foreground">Atendimento em todas as áreas médicas no Cidade Maia.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-semibold">Telemedicina 24h</span>
                      <p className="text-sm text-muted-foreground">Consultas online imediatas em qualquer lugar.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

import ExitIntentPopup from "@/components/ExitIntentPopup";
import { trackWhatsAppClick } from "@/lib/tracking";
const QuickQuoteForm = lazy(() => import("@/components/QuickQuoteForm"));
import heroImg from "@/assets/hero-planos-saude.webp";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import FAQSchema from "@/components/FAQSchema";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const WHATSAPP_URL = "https://wa.me/551151997500?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Patro%20Seguros%20e%20gostaria%20de%20solicitar%20uma%20cota%C3%A7%C3%A3o%20de%20plano%20de%20sa%C3%BAde.";

const operadoras = [
  { name: "Bradesco Saúde", desc: "Ampla rede credenciada e cobertura nacional", slug: "bradesco-saude-guarulhos" },
  { name: "Amil Saúde", desc: "Planos individuais e empresariais com excelente custo-benefício", slug: "amil-saude-guarulhos" },
  { name: "SulAmérica Saúde", desc: "Tradição e qualidade em saúde suplementar", slug: "sulamerica-saude-guarulhos" },
  { name: "Porto Saúde", desc: "Inovação e tecnologia em planos de saúde", slug: "porto-saude-guarulhos" },
  { name: "Hapvida", desc: "Rede própria e preços acessíveis em Guarulhos", slug: "hapvida-guarulhos" },
  { name: "Prevent Senior", desc: "Planos acessíveis com foco no público sênior", slug: "prevent-senior-guarulhos" },
  { name: "MedSenior", desc: "Especialista em planos para a terceira idade", slug: "medsenior-guarulhos" },
  { name: "Sami", desc: "Plano digital focado em PME e MEI", slug: "sami-guarulhos" },
  { name: "Unimed", desc: "Forte atuação regional com hospital próprio", slug: "unimed-guarulhos" },
  { name: "Alice", desc: "Gestora de saúde com foco em prevenção", slug: "alice-guarulhos" },
];

const faqs = [
  { question: "Quanto custa um plano de saúde em Guarulhos?", answer: "Os valores variam conforme operadora, faixa etária e tipo de plano (individual, familiar ou empresarial). Em Guarulhos, planos individuais começam em torno de R$ 280/mês para jovens adultos e podem ultrapassar R$ 2.500/mês para 59+. Solicite cotação gratuita comparando Bradesco, Amil, SulAmérica, Porto, HapVida, Prevent Senior e MedSenior." },
  { question: "Quais operadoras de plano de saúde atendem Guarulhos?", answer: "A Patro Seguros é parceira de 20+ operadoras, incluindo Bradesco Saúde, Amil, SulAmérica, Porto Saúde, HapVida/NotreDame Intermédica, Prevent Senior, MedSenior, Omint e Alice. Todas com rede credenciada em Guarulhos, Cidade Maia, Aeroporto e região." },
  { question: "Qual a diferença entre plano individual e empresarial?", answer: "O plano empresarial (PME) costuma ser 30% a 50% mais barato que o individual, exige no mínimo 2 vidas (CNPJ ativo) e tem reajustes coletivos. O individual permite contratação direta pela pessoa física, mas tem reajustes anuais regulados pela ANS, geralmente mais altos." },
  { question: "Plano de saúde tem carência?", answer: "Sim. As carências padrão da ANS são: 24h para urgência/emergência, 30 dias para consultas e exames simples, 180 dias para internações, exames complexos e cirurgias e 300 dias para parto. Algumas operadoras oferecem isenção parcial em planos empresariais." },
  { question: "Posso incluir dependentes no plano de saúde?", answer: "Sim. Cônjuge, filhos até 24 anos (se estudantes) e, em alguns planos, pais e enteados podem ser incluídos. Os valores são acrescidos por faixa etária. A inclusão de novo dependente normalmente respeita carências da ANS." },
  { question: "A Patro Seguros cobra para fazer a cotação?", answer: "Não. A cotação e o atendimento consultivo são 100% gratuitos. Recebemos comissão diretamente da operadora — você paga o mesmo valor que pagaria contratando direto, mas com o suporte completo de uma corretora especializada em Guarulhos." },
  { 
    question: "Quais são as regras de portabilidade de carências para Jovens em Guarulhos?", 
    answer: "Para jovens de 18 a 30 anos em Guarulhos, a portabilidade é ideal para migrar de planos individuais caros para planos empresariais (via MEI) mantendo a rede credenciada de hospitais como o Stella Maris. Os requisitos incluem estar no plano atual há pelo menos 2 anos e escolher um plano de destino em faixa de preço compatível." 
  },
  { 
    question: "Como funciona a redução de carência para Famílias em Guarulhos?", 
    answer: "Famílias em Guarulhos podem unificar planos de operadoras diferentes em um único contrato PME (empresarial), garantindo economia de até 40%. A portabilidade permite que todos os membros mantenham as coberturas para consultas e exames simples imediatamente, desde que o plano anterior tenha sido mantido por pelo menos 24 meses." 
  },
  { 
    question: "Existe portabilidade de plano de saúde para Idosos (60+) em Guarulhos?", 
    answer: "Sim, idosos em Guarulhos podem realizar a portabilidade para operadoras especialistas como Prevent Senior ou MedSenior. Isso garante atendimento imediato para tratamentos contínuos e acesso a redes focadas na terceira idade, desde que o plano de origem esteja ativo e tenha sido mantido pelo prazo mínimo exigido pela ANS (2 a 3 anos)." 
  },
];

const PlanosDeSaude = () => {
  return (
    <>
      <PageMeta title="Plano de Saúde em Guarulhos | Compare Opções | Patro Seguros" description="Planos de saúde em Guarulhos com as melhores operadoras. Compare Bradesco, Amil, SulAmérica e mais. Cotação grátis para pessoa física e empresas." />
      <FAQSchema faqs={faqs} />
      <Header />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <section className="gradient-hero py-20 relative overflow-hidden">
          <img src={heroImg} alt="Consultoria para plano de saúde em Guarulhos" width={1280} height={720} className="absolute inset-0 w-full h-full object-cover opacity-20" loading="eager" />
          <div className="container mx-auto px-4 text-center max-w-4xl relative z-10">
            <div className="text-6xl mb-6">🏥</div>
             <h1 className="text-white mb-6">Plano de Saúde em Guarulhos</h1>
             <p className="text-xl text-white/70 mb-8">
               Trabalhamos com as principais operadoras de Guarulhos e do Brasil para encontrar o plano de saúde ideal para você, sua família (individual) ou sua empresa (PME/MEI).
             </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/comparativo-planos-saude-guarulhos" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto text-lg px-8">
                  Ver Comparativo de Preços <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                </Button>
              </Link>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto" onClick={() => trackWhatsAppClick("planos-saude-hero")}>
                <Button size="lg" variant="cta" className="w-full sm:w-auto text-lg px-8">
                  <MessageCircle className="mr-2 h-5 w-5" aria-hidden="true" /> WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-center mb-12">Operadoras Parceiras</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {operadoras.map((op, i) => (
                <Link key={i} to={`/planos-de-saude/${op.slug}`} className="block h-full group">
                  <Card className="h-full hover:shadow-lg transition-base border-slate-100 group-hover:border-primary/50">
                    <CardContent className="pt-6">
                      <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">{op.name}</h3>
                      <p className="text-sm text-muted-foreground">{op.desc}</p>
                      <div className="mt-4 flex items-center text-[11px] font-bold text-primary uppercase tracking-wider">
                        Ver detalhes <ArrowRight className="ml-1 h-3 w-3" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-center mb-8">Por Que Contratar Plano de Saúde com a Patro?</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Comparação entre todas as operadoras",
                "Análise do melhor custo-benefício para seu perfil",
                "Suporte na hora de usar o plano",
                "Planos individuais, familiares e empresariais",
                "Sem custo adicional para o cliente",
                "Atendimento consultivo e humanizado",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 gradient-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-6 text-white">Encontre o Plano de Saúde Ideal</h2>
            <p className="text-xl mb-8 text-white/90">Use nosso simulador ou fale com um especialista</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://wa.me/551151997500?text=Ol%C3%A1%2C%20gostaria%20de%20simular%20um%20plano%20de%20sa%C3%BAde." target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">Simular Agora</Button>
              </a>
              <a href="tel:1151997500" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white/10 border-white text-white hover:bg-white hover:text-primary">
                  <Phone className="mr-2 h-5 w-5" aria-hidden="true" /> (11) 5199-7500
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Formulário de Cotação Rápida Segmentado */}
        <section id="cotacao-saude" className="py-16 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
                  <UserPlus className="h-8 w-8 text-primary" />
                </div>
                <h2 className="mb-4">Receba um Comparativo Personalizado</h2>
                <p className="text-muted-foreground text-lg">
                  Informe o perfil dos beneficiários para recebermos a rede credenciada e os valores exatos em minutos.
                </p>
              </div>
              
              <div className="grid md:grid-cols-1 max-w-2xl mx-auto">
                <Suspense fallback={<div className="h-[500px] rounded-xl border bg-muted/30 animate-pulse" />}>
                  <QuickQuoteForm
                    insuranceType="Plano de Saúde Segmentado"
                    trackingLabel="plano-saude-premium"
                    extraFields={[
                      { id: "tipo", label: "Tipo de Plano", placeholder: "Selecione", type: "select", options: ["Individual / Familiar", "Empresarial (MEI / PME)", "Adesão / Profissional Liberal", "Idosos (Sênior)"] },
                      { id: "bairro", label: "Seu Bairro em Guarulhos ou Cidade", placeholder: "Ex: Cidade Maia, Guarulhos" },
                      { id: "idades", label: "Faixas Etárias / Composição Familiar", placeholder: "Ex: 1 adulto (35 anos) + 1 criança (5 anos)" },
                    ]}
                  />
                </Suspense>
              </div>
            </div>
          </div>
        </section>


        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-center mb-12">Perguntas Frequentes sobre Planos de Saúde</h2>
            <div className="space-y-6">
              {[
                { q: "Quanto custa um plano de saúde?", a: "O valor varia conforme a operadora, faixa etária, tipo de acomodação e cobertura. Fazemos uma análise personalizada para encontrar o melhor custo-benefício." },
                { q: "Posso contratar plano de saúde individual?", a: "Sim! Oferecemos opções de planos individuais, familiares e empresariais com diversas operadoras." },
                { q: "Qual o melhor plano de saúde em Guarulhos?", a: "Depende do perfil de cada cliente. Comparamos todas as operadoras para indicar a melhor opção para sua necessidade." },
                { q: "Existe carência no plano de saúde?", a: "A maioria dos planos tem períodos de carência regulados pela ANS. Podemos orientar sobre planos com carência reduzida." },
              ].map((faq, i) => (
                <div key={i}>
                  <h3 className="text-lg font-semibold mb-2">{faq.q}</h3>
                  <p className="text-muted-foreground">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <StickyQuoteBar 
        source="planos-saude" 
        quoteHref="#cotacao-saude" 
        ctaLabel="Cotação Rápida" 
        whatsappMessage="Olá! Gostaria de uma cotação de Plano de Saúde em Guarulhos para minha família."
      />
      <Footer />
      <ExitIntentPopup />
    </>
  );
};

export default PlanosDeSaude;
