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
import LocalAreaSchema from "@/components/LocalAreaSchema";
import AggregateRatingSchema from "@/components/AggregateRatingSchema";
import ServiceSchema from "@/components/ServiceSchema";
import ProvaSocialPatro from "@/components/ProvaSocialPatro";
import AutoridadePatro from "@/components/AutoridadePatro";
import ComoPatroAjuda from "@/components/ComoPatroAjuda";
import { PATRO_SOCIAL_PROOF } from "@/lib/patroSocialProof";
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
    question: "Qual o valor médio de um seguro auto em Guarulhos?",
    answer: "Não há um valor único para Guarulhos. O preço depende do veículo, do CEP de pernoite, dos condutores, do uso e das coberturas solicitadas. Peça uma cotação atualizada e compare propostas com limites e franquias equivalentes; a comparação não garante desconto.",
  },
  {
    question: "O seguro cobre carro de aplicativo (Uber/99)?",
    answer: "O uso por aplicativo precisa ser declarado e aceito expressamente pela seguradora. Confira coberturas para o veículo, terceiros e Acidentes Pessoais de Passageiros (APP), quando contratadas, além das exigências legais aplicáveis à atividade. Uma apólice de uso particular não deve ser presumida suficiente.",
  },
  {
    question: "O que é a franquia do seguro?",
    answer: "É a participação do segurado prevista no contrato para determinados danos cobertos. Em reparos parciais do veículo, costuma haver franquia de casco; vidros e outros serviços podem ter franquias próprias. Confira as regras da proposta, inclusive para indenização integral.",
  },
  {
    question: "A cotação com a Patro Seguros tem algum custo?",
    answer: "Não. A solicitação de cotação é gratuita e sem compromisso de contratação.",
  },
  {
    question: "Qual a diferença entre cobertura básica, intermediária e compreensiva?",
    answer: "Esses nomes não definem pacotes iguais em todas as seguradoras. Confira os eventos previstos no casco e se há contratação de responsabilidade civil para terceiros, vidros, carro reserva e assistência. Nenhum desses adicionais deve ser presumido incluído. Consulte também o comparativo de coberturas no site.",
  },
  {
    question: "Preciso de rastreador para contratar seguro auto em Guarulhos?",
    answer: "A exigência depende do veículo, do CEP, do produto e da análise da seguradora, não apenas do nome do bairro. Verifique instalação, mensalidade e demais condições na proposta. Ter rastreador não garante aceitação nem redução do preço.",
  },
  {
    question: "Posso pedir uma análise da minha apólice de outra corretora?",
    answer: "Envie a apólice atual pelos contatos oficiais para avaliar renovação ou eventual alteração de corretagem. As regras dependem da seguradora. Confirme o aproveitamento do bônus, as coberturas e a vigência da nova proposta antes de alterar ou cancelar o seguro vigente; não há economia garantida.",
  },
  {
    question: "Em quanto tempo recebo a cotação?",
    answer: "O prazo depende da disponibilidade dos sistemas das seguradoras, dos dados enviados e de eventuais análises adicionais. Consulte a previsão no atendimento. Solicitar uma cotação não confirma aceitação nem início da cobertura.",
  },
  {
    question: "Como comparar seguro auto e proteção patrimonial mutualista?",
    answer: "São modalidades com contratos e regras distintos. Antes de contratar, consulte a situação da entidade nos canais oficiais da SUSEP e compare obrigações financeiras, limites, exclusões e critérios de indenização. No seguro, o valor indenizável segue a apólice; o uso da tabela FIPE não é universal nem implica pagamento automático.",
  },
  {
    question: "Quais seguradoras podem apresentar propostas?",
    answer: "A Patro consulta as seguradoras parceiras disponíveis para o produto e o perfil informado. A quantidade de propostas e a aceitação variam conforme a análise de cada companhia. Compare as condições efetivamente recebidas, sem presumir que todas as parceiras aceitarão o risco.",
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
        title="Seguro Auto em Guarulhos: Compare Cotações | Patro Seguros"
        description="Compare coberturas, franquias e assistência para seu seguro auto em Guarulhos. Peça uma cotação à Patro e escolha com orientação de um corretor."
      
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
      <LocalAreaSchema
        serviceName="Seguro Auto"
        url="https://www.patroseguros.com.br/seguro-auto"
        description="Seguro auto em Guarulhos: compare propostas conforme seu veículo e perfil. Confira coberturas, franquias e assistências com orientação da Patro Seguros."
        city="Guarulhos"
        faqs={faqs}
      />
      <ServiceSchema 
        name="Seguro Auto" 
        description="Compare propostas de seguro auto conforme seu perfil com a Patro Seguros. Colisão, roubo, furto, danos a terceiros e assistências dependem da contratação e das condições da apólice. Aceitação, franquias, limites e vigência devem ser conferidos na proposta."
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
                Seguro Auto em Guarulhos | Patro Seguros — Compare Propostas
              </h1>
              <p className="text-base md:text-lg text-white/60 mb-6 animate-fade-up-delay-2 max-w-2xl mx-auto">
                Compare as propostas disponíveis para seu veículo e perfil com orientação sobre coberturas, franquias e assistências.
              </p>
              
              {/* BLOCO RESPOSTA RÁPIDA (ANSWER-READY) */}
              <div className="max-w-2xl mx-auto bg-white/5 backdrop-blur-sm p-5 rounded-xl border border-white/10 mb-8 animate-fade-up-delay-2">
                <p className="text-white/90 text-sm leading-relaxed text-left">
                  <strong>Resposta rápida:</strong> O preço depende do veículo, dos condutores, do CEP de pernoite e da utilização. Solicite uma cotação personalizada à Patro e confira limites, exclusões e início da vigência. O prazo de retorno e a aceitação dependem das seguradoras; enviar o formulário não ativa cobertura.
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
              {/* Prova Social */}
              <div className="mt-8 flex items-center justify-center gap-2 text-white/60 text-sm animate-fade-up-delay-3">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span>Nota {PATRO_SOCIAL_PROOF.googleRating}/5 no Google | Mais de 2.500 clientes atendidos e 20+ anos de experiência dos sócios</span>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 2. AGITAÇÃO / PROBLEMA ===== */}
        <LazySection minHeight="400px">
          <section className="py-24" aria-labelledby="problema-heading">
            <div className="container mx-auto px-4 max-w-4xl">
              <div className="text-center mb-12">
                <h2 id="problema-heading">Por que fazer seu Seguro de Carro com uma Corretora de Guarulhos?</h2>
                <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-[15px]">
                  O trânsito da Grande São Paulo é imprevisível. Você não precisa de um 0800 demorado quando ocorre um imprevisto na Dutra ou na Fernão Dias. Você precisa de quem resolve.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="premium-card p-7 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-primary/[0.08] flex items-center justify-center mx-auto mb-5">
                    <Search className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-[15px] font-semibold mb-2">Comparação de Propostas Disponíveis</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Porto Seguro, Tokio Marine, Allianz, HDI e muito mais. Nós fazemos o trabalho duro de comparar os preços para você.
                  </p>
                </div>
                <div className="premium-card p-7 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-primary/[0.08] flex items-center justify-center mx-auto mb-5">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-[15px] font-semibold mb-2">Orientação para seu Perfil</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Informe o CEP de pernoite e a utilização do veículo. Comparamos as propostas disponíveis sem presumir um preço ou nível de risco apenas pelo bairro.
                  </p>
                </div>
                <div className="premium-card p-7 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-primary/[0.08] flex items-center justify-center mx-auto mb-5">
                    <Handshake className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-[15px] font-semibold mb-2">Apoio em Caso de Sinistro</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Orientamos o aviso e a documentação do sinistro. Guincho, carro reserva, reparos e indenização seguem as coberturas contratadas e a análise da seguradora.
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
              <p className="text-muted-foreground mt-3 max-w-xl mx-auto text-[15px]">Monte o plano ideal para o seu bolso. Você escolhe o que é prioridade:</p>
            </div>

            {/* Essenciais */}
            <div className="mb-10">
              <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" /> Coberturas Essenciais
              </h3>
              <ul className="grid md:grid-cols-1 gap-4 list-none">
                {[
                  { title: "Colisão, Roubo e Furto", desc: "Eventos cobertos, franquia e critério de indenização dependem da apólice. O percentual de uma tabela de referência ou o valor determinado devem constar na proposta." },
                  { title: "Danos a Terceiros (RCF-V)", desc: "Depende de contratação específica e dos limites por tipo de dano. Danos morais podem exigir cobertura adicional. Confira exclusões e responsabilidades previstas no contrato." },
                  { title: "Assistência 24 Horas", desc: "Quando contratada, pode incluir guincho e serviços emergenciais. Confira quilometragem, área de atendimento e limite de utilizações; não presuma atendimento ilimitado." },
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
                <Star className="h-5 w-5 text-yellow-500" /> Coberturas Adicionais (Recomendadas)
              </h3>
              <ul className="grid md:grid-cols-1 gap-4 list-none">
                {[
                  { title: "Carro Reserva", desc: "Sujeito à contratação, ao evento coberto, às diárias previstas e às exigências da locadora. Não é disponibilizado automaticamente para qualquer reparo." },
                  { title: "Vidros, Faróis e Lanternas", desc: "Confira quais peças estão incluídas, os limites de atendimento, a rede de prestadores e as franquias específicas." },
                  { title: "Proteção para Acessórios", desc: "Declare acessórios, blindagem e modificações na cotação. A cobertura depende de aceitação expressa e dos valores e itens previstos na apólice." },
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

        {/* ===== 4. AUTORIDADE (Parceiros) ===== */}
        <LazySection minHeight="250px">
          <section className="py-20" aria-labelledby="autoridade-heading">
            <div className="container mx-auto px-4 max-w-4xl text-center">
              <h2 id="autoridade-heading" className="mb-3">Compare as propostas disponíveis para seu perfil</h2>
              <p className="text-muted-foreground text-[15px] mb-10">A disponibilidade de cada produto depende da seguradora e da análise do risco informado.</p>
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
              <h2 id="processo-heading" className="mt-4">Como solicitar seu seguro em 3 passos</h2>
            </div>
            <ol className="grid md:grid-cols-3 gap-6 list-none">
              {[
                {
                  step: "1",
                  title: "Você nos chama no WhatsApp",
                  desc: "Informe o modelo do carro, os condutores, o CEP de pernoite e a utilização real do veículo.",
                },
                {
                  step: "2",
                  title: "Compare as condições",
                  desc: "Analisamos as propostas disponíveis, considerando preço total, franquias, limites, exclusões e assistências.",
                },
                {
                  step: "3",
                  title: "Revise a proposta antes de contratar",
                  desc: "Confirme a aceitação, eventuais exigências de vistoria ou rastreador e o início da vigência. A cotação não ativa cobertura.",
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
                Páginas dedicadas por marca, modelo e nível de cobertura para você comparar antes de cotar.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <Link to="/seguro-auto/marcas" className="group premium-card p-6 text-left hover:border-primary/30 transition-colors block">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Gem className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-[15px] font-semibold mb-1">Por marca</h3>
                <p className="text-sm text-muted-foreground">Volkswagen, Toyota, Honda, BMW, Mercedes, BYD e mais — com a melhor seguradora para cada uma.</p>
                <span className="mt-3 inline-flex items-center text-sm font-medium text-primary">
                  Ver hub de marcas <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
              <Link to="/seguro-auto/modelos" className="group premium-card p-6 text-left hover:border-primary/30 transition-colors block">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Search className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-[15px] font-semibold mb-1">Por modelo</h3>
                <p className="text-sm text-muted-foreground">Onix, HB20, Corolla, Civic, T-Cross, Hilux, Compass, Strada e 40+ modelos com faixa de preço e dicas.</p>
                <span className="mt-3 inline-flex items-center text-sm font-medium text-primary">
                  Ver hub de modelos <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
              <Link to="/seguro-auto/comparativo-coberturas" className="group premium-card p-6 text-left hover:border-primary/30 transition-colors block">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-[15px] font-semibold mb-1">Comparativo de coberturas</h3>
                <p className="text-sm text-muted-foreground">Básica, intermediária e compreensiva lado a lado — entenda o que entra em cada nível antes de cotar.</p>
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
                  Sua casa também pode precisar de proteção: no <Link to="/seguro-residencial" className="text-primary hover:underline font-medium">seguro residencial</Link>, compare os eventos cobertos, os bens declarados e os limites. O preço depende do imóvel e da proposta; contratar junto com o auto não garante desconto.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  O <Link to="/seguro-vida" className="text-primary hover:underline font-medium">seguro de vida</Link> pode prever indenizações para eventos contratados, com capitais e exclusões próprios. Para outros veículos, consulte o <Link to="/seguro-moto" className="text-primary hover:underline font-medium">seguro de moto</Link> ou o <Link to="/seguro-frota" className="text-primary hover:underline font-medium">seguro de frota</Link> e solicite uma análise específica.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Motoristas de aplicativo precisam declarar o uso e confirmar <Link to="/seguro-motorista-app" className="text-primary hover:underline font-medium">cobertura para uso profissional</Link>. Conheça também as opções de <Link to="/planos-de-saude" className="text-primary hover:underline font-medium">plano de saúde</Link>, verificando rede, carências e condições de contratação.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Consulte as <Link to="/seguradoras-parceiras" className="text-primary hover:underline font-medium">seguradoras parceiras</Link> e nosso guia de <Link to="/como-comparar-seguradoras-guarulhos" className="text-primary hover:underline font-medium">como comparar seguradoras em Guarulhos</Link>. A escolha deve considerar as propostas disponíveis para seu perfil.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Para avaliar outras necessidades, consulte o <Link to="/lp/seguro-acidentes-pessoais" className="text-primary hover:underline font-medium">seguro de acidentes pessoais</Link> e o <Link to="/planos-saude-senior-guarulhos" className="text-primary hover:underline font-medium">plano de saúde sênior em Guarulhos</Link>. Cada produto tem regras e análise próprias.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Para modelos elétricos, consulte o guia de <Link to="/valor-seguro-byd-dolphin" className="text-primary hover:underline font-medium">seguro BYD Dolphin</Link> e peça uma proposta atualizada. Motoristas de aplicativo podem consultar o comparativo de <Link to="/melhor-seguro-para-uber-guarulhos" className="text-primary hover:underline font-medium">seguro para Uber em Guarulhos</Link>, sem presumir um preço ou uma seguradora ideal para todos.
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

        {/* Hub de Bairros em Guarulhos */}
        <section className="py-20 bg-white border-t border-slate-100">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              Seguro Auto em todos os Bairros de Guarulhos
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {[
                "Cidade Maia", "Cumbica", "Pimentas", "Bonsucesso", 
                "Vila Augusta", "Centro", "Taboão", "Vila Galvão", 
                "Macedo", "Gopoúva", "Jardim Maia", "Picanço",
                "Continental", "Paraventi", "Cocaia", "Ponte Grande",
                "Torres Tibagy", "Jardim Vila Galvão", "Monte Carmelo", "Presidente Dutra"
              ].sort().map((bairro, i) => (
                <Link 
                  key={i}
                  to={`/seguro-auto-${bairro.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-")}`}
                  className="px-4 py-2 rounded-lg bg-slate-50 border border-slate-200 text-sm text-slate-600 hover:bg-primary/5 hover:border-primary/20 hover:text-primary transition-all text-center"
                >
                  {bairro}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <Suspense fallback={null}>
        <ExitIntentPopup />
      </Suspense>
    </>
  );
};

export default SeguroAuto;
