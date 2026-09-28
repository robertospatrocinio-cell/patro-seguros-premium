import { Link } from "react-router-dom";
import { lazy, Suspense, useState, useEffect } from "react";
import { Search, Shield, Handshake, CheckCircle, MessageCircle, ArrowRight, Star, Gem } from "lucide-react";
import { trackWhatsAppClick, trackCotacaoClick } from "@/lib/tracking";
import OptimizedImage from "@/components/OptimizedImage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import FAQSchema from "@/components/FAQSchema";
import Breadcrumb from "@/components/Breadcrumb";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import FAQBlock from "@/components/FAQBlock";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import LazySection from "@/components/LazySection";
import { Button } from "@/components/ui/button";
import TrilhaSeoRelacionados from "@/components/TrilhaSeoRelacionados";
import { trilhaAuto } from "@/lib/trilhaSeoRecomendacoes";
import OrganizationSchema from "@/components/OrganizationSchema";
import LocalBusinessSchema from "@/components/LocalBusinessSchema";
import AggregateRatingSchema from "@/components/AggregateRatingSchema";
import ServiceSchema from "@/components/ServiceSchema";
import ProvaSocialPatro from "@/components/ProvaSocialPatro";
import AutoridadePatro from "@/components/AutoridadePatro";
import ComoPatroAjuda from "@/components/ComoPatroAjuda";
import heroImg from "@/assets/hero-seguro-auto.webp";

const QuickQuoteForm = lazy(() => import("@/components/QuickQuoteForm"));
const ExitIntentPopup = lazy(() => import("@/components/ExitIntentPopup"));

const WHATSAPP_URL = buildWhatsAppLink({
  origem: "hub-auto:hero",
  produto: "Seguro Auto",
  mensagem:
    "Olá! Vim pelo site da Patro Seguros e gostaria de simular meu seguro auto em Guarulhos.",
});

const faqs = [
  {
    question: "Como é definido o preço do Seguro Auto?",
    answer: "O prêmio depende do veículo, perfil de uso, local de pernoite, coberturas, limites, franquias, produto e análise da seguradora. Não há preço médio universal.",
  },
  {
    question: "O seguro cobre carro de aplicativo (Uber/99)?",
    answer: "Depende da seguradora, do produto e das condições contratadas. O uso profissional para Uber, 99 ou outro aplicativo deve ser informado na avaliação do risco. Quando contratada, a cobertura de Acidentes Pessoais de Passageiros (APP) deve observar os limites e as condições da apólice.",
  },
  {
    question: "O que é a Franquia do seguro?",
    answer: "A franquia é a participação do segurado nos prejuízos indenizáveis quando houver previsão de aplicação na cobertura contratada. O valor e as hipóteses de cobrança devem constar da proposta e da apólice; não é correto presumir uma regra única para todo evento.",
  },
  {
    question: "A cotação com a Patro Seguros tem algum custo?",
    answer: "A solicitação de análise pode ser feita pelos canais da Patro. As condições comerciais e a eventual contratação são apresentadas conforme o produto e a seguradora.",
  },
  {
    question: "Qual a diferença entre cobertura básica, intermediária e compreensiva?",
    answer: "As coberturas variam conforme o produto, a seguradora e o que foi efetivamente contratado. Uma proposta pode prever responsabilidade civil, danos ao veículo, roubo, furto, incêndio, vidros, carro reserva ou assistência, mas cada item depende das condições da apólice. Veja o comparativo em /seguro-auto/comparativo-coberturas.",
  },
  {
    question: "Preciso de rastreador para contratar seguro auto em Guarulhos?",
    answer: "A necessidade de rastreador depende do veículo, do risco, do produto e das exigências da seguradora. A corretora pode orientar a consulta, mas não há regra universal para todos os modelos ou regiões.",
  },
  {
    question: "Posso transferir minha apólice de outra corretora para a Patro?",
    answer: "Sim, a qualquer momento. Envie sua apólice atual pelo WhatsApp (11) 5199-7500 para que a equipe analise as alternativas disponíveis. O resultado depende do perfil e das condições apresentadas.",
  },
  {
    question: "Em quanto tempo recebo a cotação?",
    answer: "O prazo depende da complexidade do risco, dos dados recebidos e da disponibilidade das seguradoras. O atendimento pode ocorrer por WhatsApp ou presencialmente no Cidade Maia.",
  },
  {
    question: "Vale a pena seguro auto ou proteção veicular?",
    answer: "Seguro Auto é comercializado por seguradoras autorizadas e deve observar as condições do produto e da apólice. A modalidade de indenização pode ser por valor de mercado referenciado, valor determinado ou outra forma prevista contratualmente; a Tabela FIPE não é sinônimo universal de indenização.",
  },
  {
    question: "Com quantas seguradoras a Patro trabalha?",
    answer: "A Patro Seguros trabalha com 16 seguradoras. A quantidade efetivamente consultada pode variar conforme produto, perfil, risco, critérios de aceitação, disponibilidade e integração de cada companhia.",
  },
];

const parceiros = [
  "Porto Seguro", "Allianz", "Tokio Marine", "HDI", "SulAmérica",
  "Bradesco Seguros", "Mapfre", "Azul Seguros", "Sompo", "Suhai",
];

const SeguroAuto = () => {
  return (
    <>
      <PageMeta
        title="Seguro Auto: como funciona, coberturas e cotação | Patro Seguros"
        description="Entenda como funciona o Seguro Auto, quais coberturas podem ser contratadas, como funciona a franquia e como solicitar uma análise com a Patro Seguros."
      
      skipBreadcrumb
    />
      <OrganizationSchema />
      <LocalBusinessSchema />
      <BreadcrumbSchema
        items={[
          { name: "Início", url: "/" },
          { name: "Seguro Auto", url: "/seguro-auto" },
        ]}
      />
      <ServiceSchema 
        name="Seguro Auto" 
        description="O Seguro Auto pode reunir coberturas e serviços conforme o veículo, o perfil, o risco e as condições contratadas. A Patro Seguros atua como corretora."
        serviceType="AutoInsurance"
      />
      <Header />
      <main id="main-content" className="outline-none">
        <Breadcrumb items={[{ label: "Seguro Auto" }]} />

        {/* ===== 1. HERO ===== */}
        <section className="relative gradient-hero overflow-hidden" aria-label="Seguro Auto — cotação gratuita">
          {heroImg && (
            <div className="absolute inset-0">
              <OptimizedImage src={heroImg} alt="" className="w-full h-full" eager aria-hidden="true" placeholderClass="bg-transparent" style={{ opacity: 0.15 }} />
            </div>
          )}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsla(215,100%,60%,0.12),transparent)]" />
          <div className="container mx-auto px-4 relative">
            <div className="py-24 md:py-32 max-w-3xl mx-auto text-center">
              <div className="text-5xl mb-6 animate-fade-up" role="img" aria-label="Seguro Auto">🚗</div>
              <h1 className="text-white text-balance mb-5 animate-fade-up-delay-1">
                Seguro Auto: entenda como funciona e como contratar
              </h1>
              <p className="text-base md:text-lg text-white/60 mb-6 animate-fade-up-delay-2 max-w-2xl mx-auto">
                Compare alternativas de proteção para seu carro com atendimento consultivo da Patro Seguros.
              </p>
              
              {/* BLOCO RESPOSTA RÁPIDA (ANSWER-READY) */}
              <div className="max-w-2xl mx-auto bg-white/5 backdrop-blur-sm p-5 rounded-xl border border-white/10 mb-8 animate-fade-up-delay-2">
                <p className="text-white/90 text-sm leading-relaxed text-left">
                  <strong>O que é Seguro Auto e como funciona?</strong> É um produto que pode reunir coberturas e serviços conforme o veículo, o risco, o perfil, a seguradora, os limites, as franquias e as condições da apólice.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center animate-fade-up-delay-3">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto" onClick={() => trackWhatsAppClick("seguro-auto-hero")}>
                  <Button size="lg" className="w-full sm:w-auto rounded-xl bg-white text-primary hover:bg-white/90 h-12 px-8 text-sm font-semibold shadow-lg shadow-white/10">
                    📲 Solicitar análise personalizada
                  </Button>
                </a>
                <a href="#coberturas" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto rounded-xl h-12 px-8 text-sm bg-white/[0.06] border border-white/10 text-white/70 hover:bg-white/[0.12]">
                    📄 Ver Coberturas
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 2. AGITAÇÃO / PROBLEMA ===== */}
        <LazySection minHeight="400px">
          <section className="py-24" aria-labelledby="problema-heading">
            <div className="container mx-auto px-4 max-w-4xl">
              <div className="text-center mb-12">
                <h2 id="problema-heading">Por que analisar o Seguro Auto com uma corretora?</h2>
                <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-[15px]">
                  O trânsito da Grande São Paulo é imprevisível. Você não precisa de um 0800 demorado quando ocorre um imprevisto na Dutra ou na Fernão Dias. Você precisa de quem resolve.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="premium-card p-7 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-primary/[0.08] flex items-center justify-center mx-auto mb-5">
                    <Search className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-[15px] font-semibold mb-2">Análise de alternativas</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    A corretora organiza informações e alternativas disponíveis conforme o seu perfil e o produto.
                  </p>
                </div>
                <div className="premium-card p-7 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-primary/[0.08] flex items-center justify-center mx-auto mb-5">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-[15px] font-semibold mb-2">Orientação sobre o risco</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Veículo, uso, local de pernoite e perfil influenciam a análise; a decisão depende da seguradora e da apólice.
                  </p>
                </div>
                <div className="premium-card p-7 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-primary/[0.08] flex items-center justify-center mx-auto mb-5">
                    <Handshake className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-[15px] font-semibold mb-2">Acompanhamento</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    A corretora pode orientar a contratação e o encaminhamento de solicitações durante a vigência, conforme o contrato.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </LazySection>

        {/* ===== 3. COBERTURAS ===== */}
        <section id="coberturas" className="py-24 gradient-surface" aria-labelledby="coberturas-heading">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-16">
              <span className="section-label">Coberturas</span>
              <h2 id="coberturas-heading" className="mt-4">O que o seu Seguro Auto pode cobrir?</h2>
              <p className="text-muted-foreground mt-3 max-w-xl mx-auto text-[15px]">As coberturas disponíveis dependem do produto, da seguradora, do perfil do risco e do que for contratado na apólice.</p>
            </div>

            {/* Essenciais */}
            <div className="mb-10">
              <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" /> Coberturas Essenciais
              </h3>
              <ul className="grid md:grid-cols-1 gap-4 list-none">
                {[
                  { title: "Colisão, Roubo e Furto", desc: "Quando contratadas, essas coberturas seguem a modalidade de indenização e as condições previstas na apólice." },
                  { title: "Danos a Terceiros (RCF-V)", desc: "Pode ser contratada para danos previstos a terceiros, conforme limites, condições e exclusões da apólice." },
                  { title: "Assistências", desc: "Serviços como guincho, socorro mecânico, pane seca, troca de pneu ou chaveiro dependem do produto contratado." },
                ].map((c, i) => (
                  <li key={i} className="premium-card p-6 flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-[15px] font-semibold mb-1">{c.title}</h4>
                      <p className="text-sm text-muted-foreground">{c.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Adicionais */}
            <div>
              <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" /> Serviços e coberturas adicionais
              </h3>
              <ul className="grid md:grid-cols-1 gap-4 list-none">
                {[
                  { title: "Carro Reserva", desc: "Pode ser contratado quando previsto no produto, com limites, condições e período definidos na apólice." },
                  { title: "Vidros, Faróis e Lanternas", desc: "Podem ter cobertura específica, sujeita às condições, limites e eventual franquia aplicáveis." },
                  { title: "Acessórios", desc: "Itens como equipamentos, blindagem ou kit gás dependem da declaração, aceitação e cobertura contratada." },
                ].map((c, i) => (
                  <li key={i} className="premium-card p-6 flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-[15px] font-semibold mb-1">{c.title}</h4>
                      <p className="text-sm text-muted-foreground">{c.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center mt-12">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick("seguro-auto-coberturas")}>
                <Button size="lg" variant="cta" className="rounded-xl h-12 px-8 text-sm">
                  💬 Conversar com um consultor
                </Button>
              </a>
            </div>
          </div>
        </section>

        <section className="py-20" aria-labelledby="conceitos-auto-heading">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 id="conceitos-auto-heading" className="mb-10">Conceitos importantes do Seguro Auto</h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-2">Como funciona a franquia?</h3>
                <p className="text-muted-foreground leading-relaxed">Franquia é a participação do segurado nos prejuízos indenizáveis quando houver previsão de aplicação na cobertura contratada. O valor e as hipóteses de cobrança devem constar da proposta e da apólice.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Como funciona a indenização integral?</h3>
                <p className="text-muted-foreground leading-relaxed">A indenização integral e seus critérios dependem da modalidade contratada, do evento, dos limites e das condições da apólice. O valor de mercado referenciado e o valor determinado são formas contratuais distintas; a Tabela FIPE não é regra universal de pagamento.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Uso profissional e motorista de aplicativo</h3>
                <p className="text-muted-foreground leading-relaxed">O uso profissional deve ser informado na análise do risco. Uber, 99 e outras plataformas podem ter exigências e produtos diferentes; consulte o <Link to="/seguro-motorista-app" className="text-primary hover:underline font-medium">seguro para motorista de aplicativo</Link> sem presumir aceitação ou cobertura automática.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">O que fazer em caso de sinistro?</h3>
                <p className="text-muted-foreground leading-relaxed">Comunique o evento pelos canais indicados, preserve documentos e evidências e siga o procedimento da apólice. A decisão sobre cobertura cabe à seguradora, conforme o contrato e a regulação aplicável. A Patro pode orientar o atendimento pelo <Link to="/central-de-sinistro" className="text-primary hover:underline font-medium">canal de sinistros</Link>.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Como fazer uma cotação?</h3>
                <p className="text-muted-foreground leading-relaxed">Envie os dados do veículo, do condutor, do uso e do local de pernoite. A corretora pode comparar alternativas disponíveis entre as seguradoras com as quais trabalha, conforme produto, perfil, risco, aceitação e disponibilidade. <Link to="/cotacao" className="text-primary hover:underline font-medium">Solicite uma análise de cotação</Link>.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 4. AUTORIDADE (Parceiros) ===== */}
        <LazySection minHeight="250px">
          <section className="py-20" aria-labelledby="autoridade-heading">
            <div className="container mx-auto px-4 max-w-4xl text-center">
              <h2 id="autoridade-heading" className="mb-3">Seguradoras disponíveis conforme o produto</h2>
              <p className="text-muted-foreground text-[15px] mb-10">A Patro Seguros trabalha com 16 seguradoras. A consulta efetiva varia conforme produto, perfil, risco, aceitação e disponibilidade.</p>
              <div className="flex flex-wrap justify-center gap-4">
                {parceiros.map((nome, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center px-5 py-3 rounded-xl bg-muted/60 border border-border text-sm font-medium text-muted-foreground"
                  >
                    {nome}
                  </span>
                ))}
              </div>
            </div>
          </section>
        </LazySection>

        {/* ===== 5. PROCESSO (Como Funciona) ===== */}
        <section className="py-24 gradient-surface" aria-labelledby="processo-heading">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-16">
              <span className="section-label">Passo a Passo</span>
              <h2 id="processo-heading" className="mt-4">Como funciona a contratação do Seguro Auto</h2>
            </div>
            <ol className="grid md:grid-cols-3 gap-6 list-none">
              {[
                {
                  step: "1",
                  title: "Você nos chama no WhatsApp",
                  desc: "Uma conversa rápida para entendermos o modelo do seu carro e o seu perfil de uso.",
                },
                {
                  step: "2",
                  title: "Analisamos as alternativas",
                  desc: "A equipe analisa o perfil e as alternativas disponíveis entre as seguradoras aplicáveis ao risco.",
                },
                {
                  step: "3",
                  title: "Você escolhe e contrata",
                  desc: "Apresentamos as condições para decisão do cliente. A contratação e o início da vigência dependem da proposta, aceitação e emissão da apólice.",
                },
              ].map((item, i) => (
                <li key={i} className="premium-card p-7 text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/[0.08] flex items-center justify-center mx-auto mb-4">
                    <span className="text-lg font-bold text-primary">{item.step}</span>
                  </div>
                  <h3 className="text-[15px] font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ===== 6. FAQ ===== */}
        <FAQBlock
          eyebrow="Tire suas dúvidas"
          title="Dúvidas Frequentes sobre Seguro Auto"
          items={faqs}
          headingId="faq-heading"
          className="py-24"
          skipSchema
        />

        {/* ===== Formulário Rápido ===== */}
        <section className="py-24 gradient-surface" aria-labelledby="formulario-heading">
          <div className="container mx-auto px-4 max-w-xl">
            <div className="mb-8">
              <ProvaSocialPatro variant="default" trackingContext="hub-auto:form" />
            </div>
            <div className="mb-8">
              <AutoridadePatro />
            </div>
            <div className="mb-8">
              <ComoPatroAjuda
                product="Seguro Auto"
                trackingContext="hub-auto:como-ajuda"
                quoteHref="#formulario"
                pageUrl="https://www.patroseguros.com.br/seguro-auto"
              />
            </div>
            <Suspense fallback={null}>
              <QuickQuoteForm
                insuranceType="Seguro Auto"
                extraFields={[
                  { id: "veiculo", label: "Veículo (Marca/Modelo/Ano)", placeholder: "Ex: Honda Civic 2023" },
                  { id: "cep", label: "CEP de pernoite", placeholder: "Ex: 07115-000" },
                  { id: "uso", label: "Uso do veículo", placeholder: "Selecione", type: "select" as const, options: ["Lazer e ida ao trabalho", "Visita a clientes", "Motorista de app", "Outro"] },
                ]}
                trackingLabel="seguro-auto"
              />
            </Suspense>
          </div>
        </section>

        {/* ===== 7. RODAPÉ DE CONVERSÃO ===== */}
        <section className="py-28 gradient-hero relative overflow-hidden" aria-label="Solicitar cotação">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,hsla(215,100%,60%,0.12),transparent)]" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="container mx-auto px-4 text-center relative max-w-2xl">
            <h2 className="text-white mb-4">Vamos desenhar a proteção certa para o seu veículo.</h2>
            <p className="text-base text-white/60 mb-12">
              Antes de contratar qualquer apólice, vale uma conversa de 10 minutos com quem entende de cada seguradora. Receba uma análise comparativa, sem custo e sem compromisso.
            </p>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick("seguro-auto-rodape")}>
              <Button size="lg" variant="cta" className="rounded-xl h-14 px-10 text-base animate-pulse">
                <MessageCircle className="mr-2 h-5 w-5" /> Falar com Especialista no WhatsApp
              </Button>
            </a>
          </div>
        </section>

        {/* ===== Linkagem Interna Contextual ===== */}
        {/* ===== Hubs Auto (modelos, marcas, comparativo) ===== */}
        <section className="py-16" aria-labelledby="hubs-auto-heading">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-10">
              <span className="section-label">Aprofundar</span>
              <h2 id="hubs-auto-heading" className="mt-3">Explore o seguro auto pelo caminho que faz sentido pra você</h2>
              <p className="text-muted-foreground text-[15px] mt-3 max-w-2xl mx-auto">
                Páginas dedicadas por marca, modelo e nível de cobertura aprofundam temas específicos sem substituir este pilar.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <Link to="/seguro-auto/marcas" className="group premium-card p-6 text-left hover:border-primary/30 transition-colors block">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Gem className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-[15px] font-semibold mb-1">Por marca</h3>
                <p className="text-sm text-muted-foreground">Conteúdos específicos por marca e perfil de veículo, quando disponíveis.</p>
                <span className="mt-3 inline-flex items-center text-sm font-medium text-primary">
                  Ver hub de marcas <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
              <Link to="/seguro-auto/modelos" className="group premium-card p-6 text-left hover:border-primary/30 transition-colors block">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Search className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-[15px] font-semibold mb-1">Por modelo</h3>
                <p className="text-sm text-muted-foreground">Conteúdos específicos por modelo, sem presumir preço, aceitação ou cobertura.</p>
                <span className="mt-3 inline-flex items-center text-sm font-medium text-primary">
                  Ver hub de modelos <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
              <Link to="/seguro-auto/comparativo-coberturas" className="group premium-card p-6 text-left hover:border-primary/30 transition-colors block">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-[15px] font-semibold mb-1">Comparativo de coberturas</h3>
                <p className="text-sm text-muted-foreground">Compare conceitos e condições de coberturas antes de solicitar uma cotação.</p>
                <span className="mt-3 inline-flex items-center text-sm font-medium text-primary">
                  Ver comparativo <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 gradient-surface" aria-labelledby="protecao-completa-heading">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="premium-card p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-20 h-20 rounded-2xl bg-blue-600/10 flex items-center justify-center flex-shrink-0">
                  <Gem className="h-10 w-10 text-blue-600" />
                </div>
                <div className="flex-grow text-center md:text-left">
                  <h3 className="text-xl font-bold mb-2">Possui um veículo Premium?</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Conheça nosso seguro exclusivo para proprietários de BMW, com coberturas sob medida e atendimento de elite.
                  </p>
                  <Link to="/seguro-bmw">
                    <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                      Explorar Seguro BMW <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16" aria-labelledby="links-relacionados-heading">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="premium-card p-6 md:p-8">
              <h2 id="protecao-completa-heading" className="text-base font-semibold mb-4">Seu carro está protegido — e o resto?</h2>
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Proteger o veículo é uma frente da proteção patrimonial. Para conhecer outra categoria, veja o <Link to="/seguro-residencial" className="text-primary hover:underline font-medium">seguro residencial</Link> e consulte as coberturas previstas no produto contratado.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Se você tem família, conheça o <Link to="/seguro-vida" className="text-primary hover:underline font-medium">seguro de vida</Link>. Para outro veículo, veja o <Link to="/seguro-moto" className="text-primary hover:underline font-medium">seguro de moto</Link>. Empresas com vários veículos podem avaliar o <Link to="/seguro-frota" className="text-primary hover:underline font-medium">seguro de frota</Link>.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Motoristas de aplicativo precisam de <Link to="/seguro-motorista-app" className="text-primary hover:underline font-medium">cobertura específica para uso profissional</Link>. E não esqueça do <Link to="/planos-de-saude" className="text-primary hover:underline font-medium">plano de saúde</Link> — proteção completa é cuidar do patrimônio e de quem dirige.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  A Patro trabalha com <Link to="/seguradoras-parceiras" className="text-primary hover:underline font-medium">seguradoras parceiras</Link> e pode orientar a comparação de condições conforme o perfil do risco. Veja também o guia de <Link to="/como-comparar-seguradoras-guarulhos" className="text-primary hover:underline font-medium">como comparar seguradoras</Link>.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Motoristas rodam mais e se expõem a mais riscos: complemente com o <Link to="/lp/seguro-acidentes-pessoais" className="text-primary hover:underline font-medium">seguro de acidentes pessoais</Link> (contratação em poucos minutos) e, se você cuida dos pais, conheça nosso <Link to="/planos-saude-senior-guarulhos" className="text-primary hover:underline font-medium">plano de saúde sênior em Guarulhos</Link>.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Para um modelo específico, consulte o conteúdo correspondente, como o <Link to="/valor-seguro-byd-dolphin" className="text-primary hover:underline font-medium">guia do BYD Dolphin</Link>. Motoristas de aplicativo podem conhecer o conteúdo específico sobre <Link to="/seguro-motorista-app" className="text-primary hover:underline font-medium">uso profissional</Link>.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mt-5">
                {[
                  { title: "Seguro Residencial", link: "/seguro-residencial" },
                  { title: "Seguro de Vida", link: "/seguro-vida" },
                  { title: "Seguro de Moto", link: "/seguro-moto" },
                  { title: "Seguro de Frota", link: "/seguro-frota" },
                  { title: "Planos de Saúde", link: "/planos-de-saude" },
                  { title: "Seguradoras Parceiras", link: "/seguradoras-parceiras" },
                  { title: "Como comparar seguradoras", link: "/como-comparar-seguradoras-guarulhos" },
                  { title: "Acidentes Pessoais (Contratar)", link: "/lp/seguro-acidentes-pessoais" },
                  { title: "Plano Saúde Sênior Guarulhos", link: "/planos-saude-senior-guarulhos" },
                  { title: "Cotação Gratuita", link: "/cotacao" },
                ].map((item, i) => (
                  <Link key={i} to={item.link} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/[0.06] text-primary text-sm font-medium hover:bg-primary/[0.12] transition-colors">
                    <ArrowRight className="h-3 w-3" aria-hidden="true" /> {item.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Seguros Relacionados */}
        <section className="py-16" aria-labelledby="relacionados-heading">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 id="relacionados-heading" className="text-lg font-semibold mb-6">Seguros Relacionados</h2>
            <div className="flex flex-wrap gap-3">
              {[
                { title: "Seguro de Vida", link: "/seguro-vida" },
                { title: "Seguro Residencial", link: "/seguro-residencial" },
                { title: "Seguro de Moto", link: "/seguro-moto" },
                { title: "Seguro de Frota", link: "/seguro-frota" },
              ].map((item, i) => (
                <Link key={i} to={item.link} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-muted/50 border border-border text-sm text-muted-foreground hover:border-primary/20 transition-base">
                  <ArrowRight className="h-3 w-3" /> {item.title}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <TrilhaSeoRelacionados
          subtitle="Motoristas que contratam Seguro Auto em Guarulhos frequentemente avançam para estas coberturas."
          items={trilhaAuto}
        />

      </main>
      <Footer />
      <Suspense fallback={null}>
        <ExitIntentPopup />
      </Suspense>
    </>
  );
};

export default SeguroAuto;
