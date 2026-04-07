import { Link } from "react-router-dom";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import { Search, Shield, Handshake, CheckCircle, MessageCircle, ArrowRight, Star } from "lucide-react";
import { trackWhatsAppClick, trackCotacaoClick } from "@/lib/tracking";
import OptimizedImage from "@/components/OptimizedImage";
import QuickQuoteForm from "@/components/QuickQuoteForm";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import FAQSchema from "@/components/FAQSchema";
import Breadcrumb from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-seguro-auto.webp";

const WHATSAPP_URL = "https://wa.me/551151997500?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Patro%20Seguros%20e%20gostaria%20de%20simular%20meu%20seguro%20auto.";

const faqs = [
  {
    question: "Qual o valor médio de um seguro auto em Guarulhos?",
    answer: "O valor varia muito de acordo com o modelo do carro, ano, CEP de pernoite e perfil do condutor. Por isso, a Patro Seguros cota em mais de 16 seguradoras simultaneamente para garantir que você não pague mais caro do que deveria.",
  },
  {
    question: "O seguro cobre carro de aplicativo (Uber/99)?",
    answer: "Sim! Temos seguradoras parceiras com produtos específicos para motoristas de aplicativo, incluindo a cobertura obrigatória de Acidentes Pessoais de Passageiros (APP).",
  },
  {
    question: "O que é a Franquia do seguro?",
    answer: "A franquia é o valor de participação obrigatória do segurado em caso de perda parcial (uma batida que dá conserto, por exemplo). Em casos de perda total por roubo ou colisão, você não paga franquia.",
  },
  {
    question: "A cotação com a Patro Seguros tem algum custo?",
    answer: "Não. Nossa consultoria e o levantamento de preços são 100% gratuitos e sem compromisso.",
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
        title="Seguro Auto em Guarulhos: Cotação Rápida e Melhor Preço"
        description="Proteja seu veículo com a Patro Seguros. Comparamos preços nas 16 maiores seguradoras do mercado. Cotação rápida, grátis e atendimento humano em Guarulhos."
      />
      <FAQSchema faqs={faqs} />
      <Header />
      <main id="main-content">
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
                Seguro Auto em Guarulhos: Proteção Completa com o Melhor Custo-Benefício
              </h1>
              <p className="text-base md:text-lg text-white/60 mb-10 animate-fade-up-delay-2 max-w-2xl mx-auto">
                Pare de perder tempo ligando para várias seguradoras. Nossos especialistas comparam o seu perfil nas 16 maiores seguradoras do Brasil e entregam a melhor proposta em até 2 horas. Sem robôs, sem burocracia.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center animate-fade-up-delay-3">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto" onClick={() => trackWhatsAppClick("seguro-auto-hero")}>
                  <Button size="lg" className="w-full sm:w-auto rounded-xl bg-white text-primary hover:bg-white/90 h-12 px-8 text-sm font-semibold shadow-lg shadow-white/10">
                    📲 Simular Meu Seguro Agora
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
                <span>4.9/5 no Google | +150 clientes protegidos em Guarulhos e região</span>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 2. AGITAÇÃO / PROBLEMA ===== */}
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
                <h3 className="text-[15px] font-semibold mb-2">Análise de 16 Seguradoras</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Porto Seguro, Tokio Marine, Allianz, HDI e muito mais. Nós fazemos o trabalho duro de comparar os preços para você.
                </p>
              </div>
              <div className="premium-card p-7 text-center">
                <div className="w-14 h-14 rounded-2xl bg-primary/[0.08] flex items-center justify-center mx-auto mb-5">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-[15px] font-semibold mb-2">Especialistas na Região</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Conhecemos os índices de sinistralidade de Guarulhos e sabemos exatamente qual seguradora oferece o melhor preço para o seu CEP.
                </p>
              </div>
              <div className="premium-card p-7 text-center">
                <div className="w-14 h-14 rounded-2xl bg-primary/[0.08] flex items-center justify-center mx-auto mb-5">
                  <Handshake className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-[15px] font-semibold mb-2">Suporte de Ponta a Ponta</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Bateu o carro? Nós cuidamos de toda a papelada, do guincho até a liberação do carro reserva. Você não fala com robôs, fala com a Patro.
                </p>
              </div>
            </div>
          </div>
        </section>

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
                  { title: "Colisão, Roubo e Furto", desc: "Indenização de 100% da Tabela FIPE em caso de perda total." },
                  { title: "Danos a Terceiros (RCF-V)", desc: "Cobertura para danos materiais, corporais e morais causados a outros veículos ou pessoas." },
                  { title: "Assistência 24 Horas", desc: "Guincho, socorro mecânico, pane seca (falta de combustível), troca de pneu e chaveiro." },
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
                  { title: "Carro Reserva", desc: "Fique motorizado por 7, 15 ou 30 dias enquanto seu carro está na oficina." },
                  { title: "Vidros, Faróis e Lanternas", desc: "Reparo ou troca rápida pagando apenas uma pequena franquia." },
                  { title: "Proteção para Acessórios", desc: "Cobertura para kit multimídia, blindagem e kit gás." },
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
                  💬 Quero Cotar Minhas Coberturas
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* ===== 4. AUTORIDADE (Parceiros) ===== */}
        <section className="py-20" aria-labelledby="autoridade-heading">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 id="autoridade-heading" className="mb-3">Trabalhamos apenas com as gigantes do mercado</h2>
            <p className="text-muted-foreground text-[15px] mb-10">Sua apólice garantida pelas seguradoras mais sólidas do Brasil.</p>
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

        {/* ===== 5. PROCESSO (Como Funciona) ===== */}
        <section className="py-24 gradient-surface" aria-labelledby="processo-heading">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-16">
              <span className="section-label">Passo a Passo</span>
              <h2 id="processo-heading" className="mt-4">Seu seguro aprovado em 3 passos simples</h2>
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
                  title: "Nós comparamos os preços",
                  desc: "Nosso sistema cruza seus dados com as 16 seguradoras parceiras para encontrar o menor preço com a melhor cobertura.",
                },
                {
                  step: "3",
                  title: "Você escolhe e viaja tranquilo",
                  desc: "Apresentamos as opções, você escolhe a que cabe no bolso, assina digitalmente e seu carro já sai protegido.",
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
        <section className="py-24" aria-labelledby="faq-heading">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-16">
              <span className="section-label">Tire suas dúvidas</span>
              <h2 id="faq-heading" className="mt-4">Dúvidas Frequentes sobre Seguro Auto</h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details key={i} className="group premium-card overflow-hidden">
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                    <h3 className="text-[15px] font-semibold pr-4">{faq.question}</h3>
                    <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0 transition-transform group-open:rotate-90" />
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Formulário Rápido ===== */}
        <section className="py-24 gradient-surface" aria-labelledby="formulario-heading">
          <div className="container mx-auto px-4 max-w-xl">
            <QuickQuoteForm
              insuranceType="Seguro Auto"
              extraFields={[
                { id: "veiculo", label: "Veículo (Marca/Modelo/Ano)", placeholder: "Ex: Honda Civic 2023" },
                { id: "cep", label: "CEP de pernoite", placeholder: "Ex: 07115-000" },
                { id: "uso", label: "Uso do veículo", placeholder: "Selecione", type: "select" as const, options: ["Lazer e ida ao trabalho", "Visita a clientes", "Motorista de app", "Outro"] },
              ]}
              trackingLabel="seguro-auto"
            />
          </div>
        </section>

        {/* ===== 7. RODAPÉ DE CONVERSÃO ===== */}
        <section className="py-28 gradient-hero relative overflow-hidden" aria-label="Solicitar cotação">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,hsla(215,100%,60%,0.12),transparent)]" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="container mx-auto px-4 text-center relative max-w-2xl">
            <h2 className="text-white mb-4">Não deixe seu patrimônio exposto à sorte.</h2>
            <p className="text-base text-white/60 mb-12">
              Imprevistos não mandam aviso. Garanta a segurança do seu veículo hoje mesmo com o melhor custo-benefício de Guarulhos.
            </p>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick("seguro-auto-rodape")}>
              <Button size="lg" variant="cta" className="rounded-xl h-14 px-10 text-base animate-pulse">
                <MessageCircle className="mr-2 h-5 w-5" /> Falar com um Especialista no WhatsApp
              </Button>
            </a>
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
      </main>
      <Footer />
    </>
  );
};

export default SeguroAuto;
