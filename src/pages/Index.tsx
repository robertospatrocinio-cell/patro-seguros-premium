import { Link } from "react-router-dom";
import { Shield, Users, Clock, Award, CheckCircle, Phone, MessageCircle, ArrowRight, Car, Heart, Home, Building2, Truck, Tractor, Factory, Leaf, UserCheck, GraduationCap, Key, Star, Quote, Zap, Headphones } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import FAQSchema from "@/components/FAQSchema";
import { Button } from "@/components/ui/button";

const WHATSAPP_URL = "https://wa.me/551151997500?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Patro%20Seguros%20e%20gostaria%20de%20solicitar%20uma%20cota%C3%A7%C3%A3o%20de%20seguro.";

const parceiros = ["Porto", "HDI", "Allianz", "Tokio Marine", "Mapfre", "Bradesco Seguros", "Azul", "Zurich", "Liberty", "Suhai", "Bradesco Saúde", "Amil", "SulAmérica", "Porto Saúde", "Unimed", "Omint", "Prevent Senior"];

const solutions = [
  { title: "Seguro Auto", desc: "Carro, moto e caminhão", icon: Car, link: "/seguro-auto" },
  { title: "Plano de Saúde", desc: "20 operadoras comparadas", icon: Heart, link: "/planos-de-saude" },
  { title: "Seguro Empresarial", desc: "PME, lojas e galpões", icon: Building2, link: "/seguro-empresarial" },
  { title: "Seguro Residencial", desc: "Casa e apartamento", icon: Home, link: "/seguro-residencial" },
  { title: "Seguro de Vida", desc: "Individual e familiar", icon: Shield, link: "/seguro-vida" },
  { title: "Agronegócio", desc: "Máquinas, safra e pecuário", icon: Tractor, link: "/seguro-maquinas-agricolas" },
  { title: "Seguro Caminhão", desc: "Carga e veículo pesado", icon: Truck, link: "/seguro-caminhao" },
  { title: "Fiança Locatícia", desc: "Alugue sem fiador", icon: Key, link: "/seguro-fianca-locaticia" },
];

const stats = [
  { value: "16+", label: "Seguradoras" },
  { value: "20", label: "Operadoras de Saúde" },
  { value: "2h", label: "Tempo de Resposta" },
  { value: "100%", label: "Cotação Gratuita" },
];

const diferenciais = [
  { icon: Zap, title: "Cotação em até 2 horas", desc: "Propostas comparativas de várias seguradoras entregues rapidamente." },
  { icon: Users, title: "Consultor dedicado", desc: "Especialista analisa seu perfil e recomenda exatamente o que faz sentido." },
  { icon: Shield, title: "16+ seguradoras", desc: "Porto, Tokio Marine, Allianz, HDI e mais — comparamos todas." },
  { icon: Headphones, title: "Suporte em sinistro", desc: "Cuidamos de todo o processo: abertura, acompanhamento e resolução." },
];

const testimonials = [
  { name: "Maria S.", role: "Empresária", content: "Atendimento excepcional. A equipe da Patro encontrou o seguro perfeito para minha empresa em poucas horas." },
  { name: "João R.", role: "Autônomo", content: "Em menos de 24h tinha minha cotação comparativa. Contratei o melhor seguro auto pagando menos." },
  { name: "Ana Paula M.", role: "Advogada", content: "Profissionais que entendem do assunto. Me orientaram sobre o RC profissional com muita clareza." },
];

const faqs = [
  { question: "Quanto tempo leva para receber uma cotação?", answer: "Em até 2 horas úteis você recebe sua cotação personalizada com propostas de múltiplas seguradoras." },
  { question: "A cotação é realmente gratuita?", answer: "Sim. Todas as nossas cotações são 100% gratuitas e sem compromisso." },
  { question: "Vocês atendem empresas?", answer: "Sim. Atendemos empresas de todos os portes com seguros empresariais, frota, RC e muito mais." },
  { question: "Como funciona o suporte em caso de sinistro?", answer: "A Patro cuida de todo o processo junto à seguradora: abertura, documentação, acompanhamento e resolução." },
];

const Index = () => {
  return (
    <>
      <PageMeta title="Corretora de Seguros em Guarulhos" description="Patro Seguros — corretora de seguros em Guarulhos. Compare cotações de auto, vida, saúde, empresarial e mais. Atendimento rápido e consultivo. Cotação grátis!" />
      <FAQSchema faqs={faqs} />
      <Header />
      <main id="main-content">
        {/* Hero */}
        <section className="relative gradient-hero overflow-hidden" aria-label="Início">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,hsla(215,100%,50%,0.08),transparent)]" />
          <div className="container mx-auto px-4 relative">
            <div className="py-28 md:py-40 max-w-[680px] mx-auto text-center">
              <div className="animate-fade-up">
                <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[11px] font-medium bg-white/[0.06] text-white/50 border border-white/[0.06] mb-8">
                  <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--accent))]" aria-hidden="true" />
                  SUSEP 211112427
                </span>
              </div>
              <h1 className="text-white text-balance mb-6 animate-fade-up-delay-1 font-extrabold">
                Protegemos você, sua família e sua empresa.
              </h1>
              <p className="text-[15px] md:text-base text-white/70 mb-10 text-balance animate-fade-up-delay-2 max-w-[520px] mx-auto leading-relaxed">
                Comparamos os melhores custos-benefícios entre as melhores seguradoras do mercado.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center animate-fade-up-delay-3">
                <Link to="/cotacao" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto text-[13px] px-7 rounded-lg bg-white text-foreground hover:bg-white/90 h-11 font-semibold tracking-tight">
                    Solicitar Cotação Grátis
                    <ArrowRight className="ml-1 h-3.5 w-3.5" aria-hidden="true" />
                  </Button>
                </Link>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto text-[13px] px-7 rounded-lg h-11 bg-white/[0.08] border border-white/[0.1] text-white/80 hover:bg-white/[0.12] hover:text-white font-medium tracking-tight">
                    <MessageCircle className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
                    WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Stats strip */}
        <section className="border-b bg-background" aria-label="Números da Patro">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
              {stats.map((s) => (
                <div key={s.label} className="py-8 md:py-10 text-center">
                  <p className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight font-heading">{s.value}</p>
                  <p className="text-[11px] text-muted-foreground mt-1 uppercase tracking-[0.1em] font-medium">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Parceiros marquee */}
        <section className="py-8 border-b bg-background overflow-hidden" aria-label="Seguradoras e operadoras parceiras">
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />
            <div className="flex animate-marquee whitespace-nowrap">
              {[...parceiros, ...parceiros].map((name, i) => (
                <span key={i} className="mx-6 text-[12px] font-medium text-muted-foreground/50 whitespace-nowrap select-none">
                  {name}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Diferenciais */}
        <section className="py-24 md:py-32 bg-background" aria-labelledby="diferenciais-heading">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center mb-16">
              <span className="section-label">Por que a Patro</span>
              <h2 id="diferenciais-heading" className="mt-3">Atendimento de especialista,<br className="hidden sm:block" /> não de robô.</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-xl overflow-hidden">
              {diferenciais.map((item, i) => (
                <div key={i} className="bg-card p-8 text-center">
                  <div className="w-10 h-10 rounded-lg bg-primary/[0.05] flex items-center justify-center mx-auto mb-5">
                    <item.icon className="h-[18px] w-[18px] text-primary" strokeWidth={1.5} aria-hidden="true" />
                  </div>
                  <h3 className="text-[15px] font-semibold mb-2 tracking-tight">{item.title}</h3>
                  <p className="text-[13px] text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Soluções */}
        <section className="py-24 md:py-32 gradient-surface" aria-labelledby="solucoes-heading">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center mb-16">
              <span className="section-label">Soluções</span>
              <h2 id="solucoes-heading" className="mt-3">Tudo que você precisa proteger.</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {solutions.map((s, i) => (
                <Link key={i} to={s.link} className="group">
                  <article className="premium-card p-6 h-full">
                    <div className="w-9 h-9 rounded-lg bg-primary/[0.05] flex items-center justify-center mb-4 group-hover:bg-primary transition-base">
                      <s.icon className="h-[18px] w-[18px] text-primary group-hover:text-primary-foreground transition-base" strokeWidth={1.5} aria-hidden="true" />
                    </div>
                    <h3 className="text-[14px] font-semibold mb-0.5 tracking-tight">{s.title}</h3>
                    <p className="text-[13px] text-muted-foreground">{s.desc}</p>
                  </article>
                </Link>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link to="/cotacao" className="inline-flex items-center gap-1.5 text-[13px] font-medium text-primary hover:text-primary-hover transition-base">
                Ver todos os seguros <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA — Cotação Auto */}
        <section className="py-20 md:py-24 bg-background" aria-labelledby="cotacao-auto-heading">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto rounded-2xl gradient-hero relative overflow-hidden p-10 md:p-16 text-center">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,hsla(215,100%,50%,0.08),transparent)]" />
              <div className="relative">
                <h2 id="cotacao-auto-heading" className="text-white mb-3 text-2xl md:text-3xl">Cotação de Seguro Auto Online</h2>
                <p className="text-white/70 mb-8 text-[14px] max-w-md mx-auto">
                  Auto, moto, caminhão e vans — resultado em minutos pelo nosso sistema.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href="https://villa.segfy.com/Publico/Segurados/Orcamentos/SolicitarCotacao?e=t6RDiR%2F1ioARkspweLWOgQ%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="lg" className="text-[13px] px-7 rounded-lg h-11 bg-white text-foreground hover:bg-white/90 font-semibold">
                      Fazer Cotação Online <ArrowRight className="ml-1.5 h-3.5 w-3.5" aria-hidden="true" />
                    </Button>
                  </a>
                  <Link to="/planos-de-saude">
                    <Button size="lg" className="text-[13px] px-7 rounded-lg h-11 bg-white/[0.06] border border-white/[0.08] text-white/60 hover:bg-white/[0.1] font-medium">
                      Simular Plano de Saúde
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Depoimentos */}
        <section className="py-24 md:py-32 gradient-surface" aria-labelledby="depoimentos-heading">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center mb-16">
              <span className="section-label">Clientes</span>
              <h2 id="depoimentos-heading" className="mt-3">Quem contrata, recomenda.</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
              {testimonials.map((t, i) => (
                <article key={i} className="premium-card p-7 flex flex-col">
                  <div className="flex gap-0.5 mb-5" role="img" aria-label="5 de 5 estrelas">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className="h-3 w-3 fill-foreground text-foreground" aria-hidden="true" />
                    ))}
                  </div>
                  <blockquote className="text-[13px] text-muted-foreground leading-relaxed flex-1 mb-6">
                    "{t.content}"
                  </blockquote>
                  <div className="flex items-center gap-3 pt-5 border-t">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-foreground font-semibold text-[11px]" aria-hidden="true">
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold text-foreground">{t.name}</p>
                      <p className="text-[11px] text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Sobre */}
        <section className="py-24 md:py-32 bg-background" aria-labelledby="sobre-heading">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <span className="section-label">Quem somos</span>
              <h2 id="sobre-heading" className="mt-3 mb-6">Corretora com atendimento<br className="hidden sm:block" /> de gente, não de máquina.</h2>
              <p className="text-[14px] text-muted-foreground leading-relaxed mb-4">
                Registrada na SUSEP (nº 211112427), com sede em Guarulhos/SP. Atendemos pessoas físicas, famílias, empresas e produtores rurais em todo o Brasil.
              </p>
              <p className="text-[14px] text-muted-foreground leading-relaxed mb-10">
                Cada cliente conversa direto com um especialista, recebe propostas comparativas e tem suporte completo — da cotação ao sinistro.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/sobre"><Button variant="outline" className="rounded-lg text-[13px] h-10">Conheça a Patro</Button></Link>
                <Link to="/indique-um-amigo"><Button variant="ghost" className="rounded-lg text-primary text-[13px] h-10">Indique um amigo <ArrowRight className="ml-1 h-3 w-3" aria-hidden="true" /></Button></Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-28 md:py-36 gradient-hero relative overflow-hidden" aria-label="Solicitar cotação">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_50%,hsla(215,100%,50%,0.06),transparent)]" />
          <div className="container mx-auto px-4 text-center relative">
            <h2 className="text-white mb-4 font-extrabold">Peça sua cotação agora.</h2>
            <p className="text-[14px] text-white/35 mb-12 max-w-md mx-auto">
              Gratuita, sem compromisso. Resposta em até 2 horas com propostas comparativas.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/cotacao" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto text-[13px] px-7 rounded-lg h-11 bg-white text-foreground hover:bg-white/90 font-semibold">
                  Pedir Cotação Gratuita
                </Button>
              </Link>
              <a href="tel:1151997500" aria-label="Ligar para (11) 5199-7500" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto text-[13px] px-7 rounded-lg h-11 bg-white/[0.05] border border-white/[0.08] text-white/50 hover:bg-white/[0.08] hover:text-white/70 font-medium">
                  <Phone className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
                  (11) 5199-7500
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 md:py-32 bg-background" aria-labelledby="faq-heading">
          <div className="container mx-auto px-4 max-w-2xl">
            <div className="text-center mb-16">
              <span className="section-label">FAQ</span>
              <h2 id="faq-heading" className="mt-3">Perguntas frequentes</h2>
            </div>
            <div className="divide-y divide-border">
              {faqs.map((faq, i) => (
                <details key={i} className="group py-5" open={i === 0}>
                  <summary className="flex items-center justify-between cursor-pointer text-[14px] font-semibold text-foreground hover:text-primary transition-base select-none list-none [&::-webkit-details-marker]:hidden">
                    {faq.question}
                    <span className="text-muted-foreground/30 ml-4 group-open:rotate-45 transition-transform text-base font-light flex-shrink-0">+</span>
                  </summary>
                  <div className="pt-3">
                    <p className="text-[13px] text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Index;
