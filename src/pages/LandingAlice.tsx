import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle, Phone, CheckCircle, Shield, Clock, Star, Award, Building2, Stethoscope, Smartphone, Heart, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageMeta from "@/components/PageMeta";
import OptimizedImage from "@/components/OptimizedImage";
import { trackWhatsAppClick } from "@/lib/tracking";
import heroImg from "@/assets/lp-alice.webp";

const WHATSAPP_URL = "https://wa.me/551151997500?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Patro%20Seguros%20e%20gostaria%20de%20saber%20mais%20sobre%20o%20plano%20Alice%20Sa%C3%BAde.";
const logoUrl = "/images/logo-full.webp";

const hospitais = [
  "Hosp. Israelita Albert Einstein (Principais unidades)",
  "Hosp. Alemão Oswaldo Cruz e Samaritano",
  "BP Mirante e BP Paulista",
  "Maternidades Santa Joana e Pro-Matre",
  "Hospital Infantil Sabará",
];

const laboratorios = [
  "Laboratórios Fleury",
  "A+",
  "Alta",
  "Delboni",
];

const vantagens = [
  { icon: "🎯", title: "Foco em Prevenção", description: "Menos faltas e colaboradores mais saudáveis. O Time de Saúde atua proativamente." },
  { icon: "📱", title: "Alta Resolutividade", description: "83% dos casos resolvidos digitalmente pelo app, sem filas e sem espera." },
  { icon: "💰", title: "Controle de Custos", description: "Tecnologia que reduz desperdícios e controla o reajuste — menor reajuste do mercado pelo 4º ano consecutivo." },
  { icon: "🏥", title: "Rede Premium", description: "Acesso aos melhores hospitais do país: Einstein, Oswaldo Cruz, BP Mirante e mais." },
  { icon: "✅", title: "Fácil Contratação", description: "Contratação simplificada a partir de 1 vida (CNPJ/MEI). CLTs, PJs e estagiários." },
  { icon: "🕐", title: "Atendimento 24h", description: "Time de Saúde disponível 24h via app — dúvidas médicas resolvidas em 60 segundos." },
];

const objections = [
  { question: "Quantas vidas são necessárias para contratar?", answer: "A Alice permite contratação a partir de 1 vida, ideal para MEIs, PJs e empresas de qualquer porte. CLTs, PJs e estagiários podem ser incluídos." },
  { question: "Como funciona o atendimento digital?", answer: "O Time de Saúde da Alice está disponível 24h via app. 83% dos casos são resolvidos digitalmente, sem necessidade de deslocamento. Quando necessário, você é direcionado ao especialista certo." },
  { question: "A rede realmente inclui os melhores hospitais?", answer: "Sim! A rede credenciada inclui Einstein, Oswaldo Cruz, Samaritano, BP Mirante, BP Paulista, Santa Joana, Pro-Matre, Sabará, além de laboratórios Fleury, A+, Alta e Delboni." },
  { question: "Como a Alice consegue o menor reajuste?", answer: "A tecnologia da Alice foca em prevenção e resolução digital, reduzindo sinistralidade e desperdícios. Isso se traduz no menor reajuste do mercado pelo 4º ano consecutivo." },
  { question: "A Patro cobra alguma taxa pelo serviço?", answer: "Não! Nossa remuneração vem da operadora. Para você, o serviço é 100% gratuito e o preço é o mesmo que comprando direto." },
];

const testimonials = [
  { name: "Ricardo S.", role: "CEO, Startup de tecnologia", stars: 5, content: "Trocamos para a Alice e a sinistralidade caiu 30%. Os colaboradores adoram o atendimento pelo app e o RH quase não tem chamados sobre plano de saúde." },
  { name: "Fernanda M.", role: "Sócia, Escritório de advocacia", stars: 5, content: "Contratamos com apenas 3 vidas e temos acesso ao Einstein e Oswaldo Cruz. A contratação foi super simples, tudo pelo app." },
  { name: "Carlos A.", role: "Diretor de RH, Indústria", stars: 5, content: "O reajuste foi o menor que já tivemos em 10 anos. A equipe da Patro apresentou o comparativo e a Alice foi disparada a melhor opção." },
];

const LandingAlice = () => {
  const CtaButton = ({ variant = "primary" }: { variant?: "primary" | "whatsapp" }) => {
    if (variant === "whatsapp") {
      return (
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto" onClick={() => trackWhatsAppClick("lp-alice")}>
          <Button size="lg" className="w-full sm:w-auto rounded-xl h-12 px-8 text-sm bg-[hsl(142,70%,45%)] hover:bg-[hsl(142,70%,40%)] text-white font-semibold shadow-lg">
            <MessageCircle className="mr-2 h-4 w-4" aria-hidden="true" /> Fale com nosso consultor
          </Button>
        </a>
      );
    }
    return (
      <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
        <Button size="lg" className="w-full sm:w-auto rounded-xl bg-[hsl(340,80%,55%)] hover:bg-[hsl(340,80%,48%)] text-white h-12 px-8 text-sm font-bold shadow-lg animate-pulse hover:animate-none">
          <ArrowRight className="mr-2 h-4 w-4" aria-hidden="true" /> Simular Tabela de Preços
        </Button>
      </a>
    );
  };

  return (
    <>
      <PageMeta
        title="Alice Saúde Empresarial — Plano de Saúde | Patro Seguros"
        description="Alice Saúde: plano empresarial com menor reajuste do mercado. Rede premium Einstein, Oswaldo Cruz, BP. A partir de 1 vida (CNPJ/MEI). Cotação gratuita."
        noindex
      />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b">
        <div className="container mx-auto px-4 flex items-center justify-between h-14">
          <Link to="/">
            <img src={logoUrl} alt="Patro Seguros" width={180} height={40} className="h-10" />
          </Link>
          <a href="tel:1151997500" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            <Phone className="h-4 w-4" /> (11) 5199-7500
          </a>
        </div>
      </header>

      <main className="pt-14">
        {/* HERO */}
        <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, hsl(340,40%,18%) 0%, hsl(340,50%,25%) 50%, hsl(350,40%,20%) 100%)" }}>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsla(340,80%,55%,0.15),transparent)]" />
          <div className="container mx-auto px-4 relative">
            <div className="py-16 md:py-24 flex flex-col md:flex-row items-center gap-10">
              <div className="flex-1 text-center md:text-left max-w-xl">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[hsl(340,80%,55%)]/20 border border-[hsl(340,80%,55%)]/40 text-[hsl(340,80%,75%)] font-bold text-[11px] uppercase tracking-wider mb-6">
                  <Award className="h-3.5 w-3.5" /> Menor Reajuste do Mercado — 4º ano consecutivo
                </div>

                <h1 className="text-white text-balance mb-4 font-extrabold leading-tight">
                  Sinistralidade alta? Veja como a Alice "cura" o reajuste da sua empresa.
                </h1>
                <p className="text-base md:text-lg text-white/70 mb-4 max-w-xl leading-relaxed">
                  A <strong className="text-white">Alice</strong> atua como uma Gestora de Saúde conectando tecnologia aos melhores hospitais. Dúvidas médicas resolvidas digitalmente e sem esperas.
                </p>
                <p className="text-white/40 text-sm mb-8">
                  A partir de 1 vida · CNPJ/MEI · CLTs, PJs e estagiários
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start mb-8">
                  <CtaButton />
                  <CtaButton variant="whatsapp" />
                </div>

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-white/50 text-[11px] uppercase tracking-wider">
                  <span className="flex items-center gap-1.5"><Building2 className="h-3.5 w-3.5" /> Rede Einstein, Sírio</span>
                  <span className="flex items-center gap-1.5"><Smartphone className="h-3.5 w-3.5" /> 24h em 60s no App</span>
                  <span className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5" /> CLTs, PJs, Estagiários</span>
                </div>
              </div>

              <div className="flex-1 max-w-md w-full">
                <OptimizedImage
                  src={heroImg}
                  alt="Alice Saúde — Plano de Saúde Empresarial"
                  eager
                  className="w-full h-auto rounded-2xl shadow-2xl shadow-black/30 aspect-[4/3]"
                  width={448}
                  height={336}
                  fetchPriority="high"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Pain Points */}
        <section className="py-16 bg-background" aria-labelledby="problemas">
          <div className="container mx-auto px-4 max-w-2xl">
            <h2 id="problemas" className="text-center mb-10">
              Sua empresa sofre com alguma dessas situações?
            </h2>
            <ul className="space-y-4 list-none">
              {[
                "Reajustes anuais altíssimos que comprometem o orçamento da empresa?",
                "Sinistralidade elevada e sem nenhum controle sobre os custos do plano?",
                "Colaboradores insatisfeitos com filas, demora e burocracia no plano atual?",
                "Dificuldade em contratar plano de saúde com poucas vidas ou como MEI/PJ?",
              ].map((pain, i) => (
                <li key={i} className="flex items-start gap-4 bg-destructive/[0.04] border border-destructive/10 rounded-xl p-5">
                  <span className="text-destructive font-bold text-lg mt-0.5" aria-hidden="true">⚠️</span>
                  <p className="text-[15px] text-muted-foreground leading-relaxed">{pain}</p>
                </li>
              ))}
            </ul>
            <p className="text-center mt-8 text-muted-foreground text-sm">
              Se respondeu "sim" para qualquer uma, a <strong className="text-foreground">Alice pode ser a solução</strong>.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="border-y bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
              {[
                { value: "83%", label: "Resolvidos Digital" },
                { value: "60s", label: "Resposta no App" },
                { value: "4 anos", label: "Menor Reajuste" },
                { value: "1 vida", label: "Mínimo p/ Contratar" },
              ].map((s) => (
                <div key={s.label} className="py-8 text-center">
                  <p className="text-2xl md:text-3xl font-extrabold text-[hsl(340,80%,55%)] tracking-tight font-heading">{s.value}</p>
                  <p className="text-[11px] text-muted-foreground mt-1 uppercase tracking-[0.1em] font-medium">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Muito mais que um plano de saúde */}
        <section className="py-20 bg-background" aria-labelledby="conceito">
          <div className="container mx-auto px-4 max-w-2xl text-center">
            <h2 id="conceito" className="text-[hsl(340,80%,55%)] mb-6">Muito mais que um plano de saúde.</h2>
            <p className="text-muted-foreground leading-relaxed text-base">
              A Alice atua como uma <strong className="text-foreground">Gestora de Saúde</strong> conectando tecnologia aos melhores hospitais. Graças ao Time de Saúde disponível 24h via app, as dúvidas médicas são resolvidas digitalmente e sem esperas.
            </p>
          </div>
        </section>

        {/* Vantagens */}
        <section className="py-20 bg-muted/30" aria-labelledby="vantagens">
          <div className="container mx-auto px-4">
            <div className="text-center mb-14">
              <span className="section-label">Vantagens para sua empresa</span>
              <h2 id="vantagens" className="mt-3">Por que escolher a Alice?</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
              {vantagens.map((b, i) => (
                <div key={i} className="premium-card p-7 text-center">
                  <div className="text-3xl mb-4">{b.icon}</div>
                  <h3 className="text-[15px] font-semibold mb-2">{b.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{b.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Rede Médica */}
        <section className="py-20 bg-background" aria-labelledby="rede">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-14">
              <h2 id="rede" className="text-[hsl(340,80%,55%)]">Rede Médica de Referência</h2>
              <p className="text-sm text-muted-foreground mt-2">Sua equipe atendida nos melhores centros médicos do país</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="premium-card p-7">
                <h3 className="text-[15px] font-bold mb-4 flex items-center gap-2 uppercase tracking-wider text-[hsl(340,80%,55%)]">
                  <Building2 className="h-4 w-4" /> Hospitais
                </h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {hospitais.map((h) => (
                    <li key={h} className="flex items-center gap-2 pb-3 border-b border-dashed border-border last:border-0 last:pb-0">
                      <CheckCircle className="h-3 w-3 text-[hsl(340,80%,55%)] flex-shrink-0" />
                      <span className="font-medium text-foreground">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="premium-card p-7">
                <h3 className="text-[15px] font-bold mb-4 flex items-center gap-2 uppercase tracking-wider text-[hsl(340,80%,55%)]">
                  <Stethoscope className="h-4 w-4" /> Laboratórios
                </h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {laboratorios.map((l) => (
                    <li key={l} className="flex items-center gap-2 pb-3 border-b border-dashed border-border last:border-0 last:pb-0">
                      <CheckCircle className="h-3 w-3 text-[hsl(340,80%,55%)] flex-shrink-0" />
                      <span className="font-medium text-foreground">{l}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Mid CTA */}
        <section className="py-14 relative overflow-hidden" style={{ background: "linear-gradient(135deg, hsl(340,40%,18%) 0%, hsl(340,50%,25%) 100%)" }}>
          <div className="container mx-auto px-4 text-center relative">
            <h2 className="text-white mb-3 text-xl md:text-2xl font-bold">Quer reduzir custos sem abrir mão da qualidade?</h2>
            <p className="text-white/60 text-sm mb-8 max-w-md mx-auto">Simulação gratuita e sem compromisso. Atendimento personalizado.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <CtaButton />
              <CtaButton variant="whatsapp" />
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-background" aria-labelledby="depoimentos">
          <div className="container mx-auto px-4">
            <div className="text-center mb-14">
              <span className="section-label">Depoimentos</span>
              <h2 id="depoimentos" className="mt-3">Empresas que escolheram a Alice</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
              {testimonials.map((t, i) => (
                <article key={i} className="premium-card p-7 flex flex-col">
                  <div className="flex gap-0.5 mb-4" role="img" aria-label={`${t.stars} de 5 estrelas`}>
                    {Array.from({ length: t.stars }).map((_, j) => (
                      <Star key={j} className="h-3.5 w-3.5 fill-[hsl(340,80%,55%)] text-[hsl(340,80%,55%)]" aria-hidden="true" />
                    ))}
                  </div>
                  <blockquote className="text-[13px] text-muted-foreground leading-relaxed flex-1 mb-5">
                    "{t.content}"
                  </blockquote>
                  <div className="flex items-center gap-3 pt-4 border-t">
                    <div className="w-8 h-8 rounded-full bg-[hsl(340,80%,55%)]/10 flex items-center justify-center text-[hsl(340,80%,55%)] font-bold text-[11px]">
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold">{t.name}</p>
                      <p className="text-[11px] text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Objections */}
        <section className="py-20 gradient-surface" aria-labelledby="duvidas">
          <div className="container mx-auto px-4 max-w-2xl">
            <div className="text-center mb-14">
              <h2 id="duvidas" className="mt-3">Dúvidas frequentes</h2>
            </div>
            <div className="space-y-3">
              {objections.map((obj, i) => (
                <details key={i} className="premium-card group" open={i === 0}>
                  <summary className="flex items-center justify-between p-5 cursor-pointer text-[15px] font-semibold hover:text-[hsl(340,80%,55%)] transition-colors select-none list-none [&::-webkit-details-marker]:hidden">
                    {obj.question}
                    <span className="text-[hsl(340,80%,55%)]/40 ml-4 group-open:rotate-45 transition-transform text-lg font-light flex-shrink-0">+</span>
                  </summary>
                  <div className="px-5 pb-5 -mt-1">
                    <p className="text-sm text-muted-foreground leading-relaxed">{obj.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Guarantee */}
        <section className="py-14 bg-background">
          <div className="container mx-auto px-4 max-w-xl text-center">
            <Award className="h-10 w-10 text-[hsl(340,80%,55%)] mx-auto mb-4" />
            <h3 className="text-lg font-bold mb-2">Nossa Garantia</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Apresentamos comparativo completo com outras operadoras para que você veja que a Alice oferece o melhor custo-benefício com a menor sinistralidade. Você decide sem pressão.
            </p>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 relative overflow-hidden" style={{ background: "linear-gradient(135deg, hsl(340,40%,18%) 0%, hsl(340,50%,25%) 100%)" }}>
          <div className="container mx-auto px-4 text-center relative">
            <h2 className="text-white mb-3 text-2xl md:text-3xl font-extrabold">
              Simule a tabela de preços agora
            </h2>
            <p className="text-white/60 text-sm mb-4 max-w-lg mx-auto">
              Descubra como ter Einstein, Oswaldo Cruz e BP pagando menos que o seu plano atual.
            </p>
            <p className="text-[hsl(340,80%,75%)] text-xs font-bold uppercase tracking-wider mb-8">
              ⏰ Reajustes anuais se aproximam — garanta o melhor preço agora
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
              <CtaButton />
              <CtaButton variant="whatsapp" />
            </div>
            <a href="tel:1151997500" className="text-white/40 text-sm hover:text-white/60 transition-colors">
              Prefere ligar? <strong className="text-white/60">(11) 5199-7500</strong>
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 bg-background border-t">
          <div className="container mx-auto px-4 text-center">
            <img src={logoUrl} alt="Patro Seguros" width={144} height={32} className="h-8 mx-auto mb-3" />
            <p className="text-[11px] text-muted-foreground">
              Patro Corretora de Seguros — SUSEP nº 212113511 — Guarulhos/SP
            </p>
            <p className="text-[11px] text-muted-foreground mt-1">
              © {new Date().getFullYear()} Todos os direitos reservados.
            </p>
          </div>
        </footer>
      </main>
    </>
  );
};

export default LandingAlice;
