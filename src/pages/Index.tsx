import { Link } from "react-router-dom";
import { Shield, Users, Clock, Award, CheckCircle, Phone, MessageCircle, ArrowRight, Car, Heart, Home, Building2, Truck, Tractor, Factory, Leaf, UserCheck, GraduationCap, Key, Star, Quote } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import FAQSchema from "@/components/FAQSchema";
import { Button } from "@/components/ui/button";

const WHATSAPP_URL = "https://wa.me/551151997500?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Patro%20Seguros%20e%20gostaria%20de%20solicitar%20uma%20cota%C3%A7%C3%A3o%20de%20seguro.";

const seguradoras = ["Porto", "HDI", "Allianz", "Tokio Marine", "Mapfre", "Bradesco", "Azul", "Zurich", "Liberty", "Suhai", "Justos", "Darwin", "Ituran", "Akad"];

const operadoras = ["Bradesco Saúde", "Amil", "SulAmérica Saúde", "Porto Saúde", "HapVida/NotreDame", "MedSenior", "Omint", "Unimed", "Prevent Senior", "Alice", "Care Plus"];

const solutions = [
  { title: "Seguro Auto", desc: "Proteção completa para seu veículo", icon: Car, link: "/seguro-auto" },
  { title: "Plano de Saúde", desc: "As melhores operadoras do mercado", icon: Heart, link: "/planos-de-saude" },
  { title: "Seguro Empresarial", desc: "Proteja seu negócio com segurança", icon: Building2, link: "/seguro-empresarial" },
  { title: "Seguro Residencial", desc: "Sua casa segura e protegida", icon: Home, link: "/seguro-residencial" },
  { title: "Seguro de Vida", desc: "Proteção financeira para sua família", icon: Shield, link: "/seguro-vida" },
  { title: "Máquinas Agrícolas", desc: "Especialistas em seguro rural e agro", icon: Tractor, link: "/seguro-maquinas-agricolas" },
  { title: "Galpões Industriais", desc: "Proteção para instalações industriais", icon: Factory, link: "/seguro-galpoes-industriais" },
  { title: "Seguro Ambiental", desc: "Cobertura contra riscos ambientais", icon: Leaf, link: "/seguro-ambiental" },
  { title: "Acidentes Pessoais", desc: "Indenização por acidentes e invalidez", icon: UserCheck, link: "/seguro-acidentes-pessoais" },
  { title: "Seguro Estagiário", desc: "Obrigatório por lei para estagiários", icon: GraduationCap, link: "/seguro-estagiario" },
  { title: "Seguro Caminhão", desc: "Proteção para veículos pesados e cargas", icon: Truck, link: "/seguro-caminhao" },
  { title: "Fiança Locatícia", desc: "Alugue sem fiador com segurança", icon: Key, link: "/seguro-fianca-locaticia" },
];

const diferenciais = [
  { icon: Clock, title: "Cotação em até 2h", desc: "Envie seus dados e receba propostas comparativas de várias seguradoras em até 2 horas úteis." },
  { icon: Users, title: "Consultoria Personalizada", desc: "Nossos especialistas analisam seu perfil e recomendam a proteção exata que você precisa — sem vender o que não faz sentido." },
  { icon: Shield, title: "+14 Seguradoras Comparadas", desc: "Porto, Tokio Marine, Allianz, HDI, Bradesco, Mapfre e mais — comparamos todas para você pagar menos." },
  { icon: Award, title: "Suporte Total em Sinistro", desc: "Se acontecer um imprevisto, a Patro cuida de todo o processo: abertura, acompanhamento e resolução junto à seguradora." },
];

const testimonials = [
  { name: "Maria Silva", role: "Empresária", content: "Atendimento excepcional! A equipe da Patro me ajudou a encontrar o seguro perfeito para minha empresa. Super recomendo!", rating: 5 },
  { name: "João Santos", role: "Autônomo", content: "Rapidez e eficiência. Em menos de 24h tinha minha cotação e pude contratar o melhor seguro auto do mercado.", rating: 5 },
  { name: "Ana Paula", role: "Advogada", content: "Profissionais que realmente entendem do assunto. Me orientaram sobre o seguro RC profissional e fiquei muito satisfeita.", rating: 5 },
];

const faqs = [
  { question: "Por que devo contratar um seguro?", answer: "O seguro protege você e sua família contra imprevistos que podem comprometer seu patrimônio e sua saúde financeira. É a forma mais inteligente de garantir tranquilidade." },
  { question: "Quanto tempo leva para receber uma cotação?", answer: "Em até 2 horas úteis você recebe sua cotação personalizada. Em casos urgentes, podemos acelerar ainda mais." },
  { question: "A cotação é gratuita?", answer: "Sim! Todas as nossas cotações são 100% gratuitas e sem compromisso." },
  { question: "Vocês atendem empresas?", answer: "Sim! Atendemos empresas de todos os portes com seguros empresariais, de frota, responsabilidade civil, e muito mais." },
  { question: "Como funciona o atendimento?", answer: "Você pode nos contatar por WhatsApp, telefone, e-mail ou pelo site. Nosso time está pronto para te atender." },
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
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsla(215,100%,60%,0.15),transparent)]" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="container mx-auto px-4 relative">
            <div className="py-24 md:py-36 max-w-3xl mx-auto text-center">
              <div className="animate-fade-up">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-semibold bg-white/[0.07] text-white/80 border border-white/[0.08] mb-8 backdrop-blur-sm tracking-wide">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" aria-hidden="true" />
                  Corretora registrada SUSEP nº 211112427
                </span>
              </div>
              <h1 className="text-white text-balance mb-6 animate-fade-up-delay-1">
                Seguro para você, sua empresa e o agro — com cotação gratuita em até 2 horas
              </h1>
              <p className="text-base md:text-lg text-white/60 mb-6 text-balance animate-fade-up-delay-2 max-w-2xl mx-auto font-normal">
                A Patro compara mais de 14 seguradoras e 11 operadoras de saúde para encontrar a proteção certa pelo menor preço. Atendimento consultivo e sem burocracia.
              </p>

              {/* Proof bar */}
              <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mb-10 animate-fade-up-delay-2">
                {["Cotação grátis", "Resposta em 2h", "Sem compromisso"].map((item) => (
                  <span key={item} className="text-white/40 text-sm flex items-center gap-2">
                    <CheckCircle className="h-3.5 w-3.5 text-accent/70" aria-hidden="true" />
                    {item}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center animate-fade-up-delay-3">
                <Link to="/cotacao" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto text-sm px-8 rounded-xl bg-white text-primary hover:bg-white/90 h-12 font-semibold shadow-lg shadow-white/10">
                    Solicitar Cotação Grátis
                  </Button>
                </Link>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto text-sm px-8 rounded-xl h-12 bg-white/[0.06] border border-white/10 text-white/80 hover:bg-white/[0.12] backdrop-blur-sm font-medium">
                    <MessageCircle className="mr-2 h-4 w-4" aria-hidden="true" />
                    Falar no WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Parceiros — faixa compacta */}
        <section className="py-10 bg-background border-b" aria-label="Seguradoras e operadoras parceiras">
          <div className="container mx-auto px-4">
            <div className="flex flex-col gap-6">
              <div>
                <p className="text-center text-[10px] text-muted-foreground/60 mb-3 uppercase tracking-[0.2em] font-semibold">Seguradoras Parceiras</p>
                <div className="flex flex-wrap justify-center gap-2 items-center">
                  {seguradoras.map((name) => (
                    <span key={name} className="px-3 py-1.5 rounded-lg bg-muted/50 text-[11px] font-medium text-muted-foreground/70 border border-transparent hover:border-primary/20 hover:text-primary transition-base cursor-default">
                      {name}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-center text-[10px] text-muted-foreground/60 mb-3 uppercase tracking-[0.2em] font-semibold">Operadoras de Saúde</p>
                <div className="flex flex-wrap justify-center gap-2 items-center">
                  {operadoras.map((name) => (
                    <span key={name} className="px-3 py-1.5 rounded-lg bg-muted/50 text-[11px] font-medium text-muted-foreground/70 border border-transparent hover:border-primary/20 hover:text-primary transition-base cursor-default">
                      {name}
                    </span>
                  ))}
                </div>
                <div className="text-center mt-4">
                  <Link to="/planos-de-saude">
                    <Button variant="ghost" size="sm" className="text-primary rounded-xl text-xs font-medium">
                      Simular Plano de Saúde <ArrowRight className="ml-1 h-3 w-3" aria-hidden="true" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Diferenciais */}
        <section className="py-24 bg-background" aria-labelledby="diferenciais-heading">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="section-label">Como Trabalhamos</span>
              <h2 id="diferenciais-heading" className="mt-4 mb-4">Corretor de seguros de verdade, não um robô</h2>
              <p className="text-muted-foreground max-w-lg mx-auto text-[15px]">Na Patro, cada cliente tem um especialista dedicado. Não vendemos seguro — encontramos a proteção certa para o seu momento.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {diferenciais.map((item, i) => (
                <div key={i} className="premium-card p-7 text-center">
                  <div className="w-12 h-12 rounded-2xl bg-primary/[0.06] flex items-center justify-center mx-auto mb-5">
                    <item.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Soluções */}
        <section className="py-24 gradient-surface" aria-labelledby="solucoes-heading">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="section-label">O Que Protegemos</span>
              <h2 id="solucoes-heading" className="mt-4 mb-4">Auto, saúde, empresa, agro e muito mais</h2>
              <p className="text-muted-foreground max-w-lg mx-auto text-[15px]">Clique em qualquer seguro para entender as coberturas e pedir sua cotação gratuita.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {solutions.map((s, i) => (
                <Link key={i} to={s.link} className="group">
                  <article className="premium-card p-6 h-full flex flex-col">
                    <div className="w-10 h-10 rounded-xl bg-primary/[0.06] flex items-center justify-center mb-4 group-hover:bg-primary transition-base">
                      <s.icon className="h-5 w-5 text-primary group-hover:text-primary-foreground transition-base" aria-hidden="true" />
                    </div>
                    <h3 className="text-[15px] font-semibold mb-1">{s.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 flex-1">{s.desc}</p>
                    <span className="text-xs font-semibold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                      Saiba mais <ArrowRight className="h-3 w-3" aria-hidden="true" />
                    </span>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Cotação Auto */}
        <section className="py-24 bg-background" aria-labelledby="cotacao-auto-heading">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="w-14 h-14 rounded-2xl bg-primary/[0.06] flex items-center justify-center mx-auto mb-6" aria-hidden="true">
                <Car className="h-7 w-7 text-primary" />
              </div>
              <h2 id="cotacao-auto-heading" className="mb-4">Cotação de Seguro Auto Online</h2>
              <p className="text-muted-foreground mb-10 max-w-lg mx-auto text-[15px]">
                Faça sua cotação de Seguro Auto, Moto, Caminhão e Vans direto pelo nosso sistema online. Resultado em minutos.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="https://villa.segfy.com/Publico/Segurados/Orcamentos/SolicitarCotacao?e=t6RDiR%2F1ioARkspweLWOgQ%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" variant="cta" className="text-sm px-8 rounded-xl h-12">
                    Fazer Cotação Online <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Button>
                </a>
                <Link to="/planos-de-saude">
                  <Button size="lg" variant="outline" className="text-sm px-8 rounded-xl h-12">
                    Simular Plano de Saúde
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Benefícios */}
        <section className="py-24 bg-primary/[0.03]" aria-labelledby="beneficios-heading">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="section-label">Benefícios</span>
              <h2 id="beneficios-heading" className="mt-4 mb-4">O que você ganha com a Patro</h2>
            </div>
            <ul className="grid md:grid-cols-2 gap-3 max-w-3xl mx-auto list-none">
              {[
                "Cotação gratuita e sem compromisso",
                "Comparação entre várias seguradoras",
                "Atendimento humanizado e próximo",
                "Consultoria preventiva para evitar sinistros",
                "Ajuda completa em caso de sinistro",
                "Renovação automática com revisão de coberturas",
                "WhatsApp direto com seu corretor",
                "Análise de risco personalizada",
              ].map((b, i) => (
                <li key={i} className="flex items-center gap-3 bg-card rounded-xl p-4 border hover:border-primary/15 transition-base">
                  <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" aria-hidden="true" />
                  <p className="text-sm font-medium text-foreground/80">{b}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Depoimentos */}
        <section className="py-24 bg-background" aria-labelledby="depoimentos-heading">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="section-label">Depoimentos</span>
              <h2 id="depoimentos-heading" className="mt-4">O que nossos clientes dizem</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {testimonials.map((t, i) => (
                <article key={i} className="premium-card p-7 flex flex-col">
                  <Quote className="h-6 w-6 text-primary/20 mb-4" aria-hidden="true" />
                  <blockquote className="text-sm text-muted-foreground mb-6 leading-relaxed flex-1">
                    {t.content}
                  </blockquote>
                  <div className="flex gap-0.5 mb-4" role="img" aria-label={`Avaliação: ${t.rating} de 5 estrelas`}>
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
                    ))}
                  </div>
                  <div className="flex items-center gap-3 pt-4 border-t">
                    <div className="w-9 h-9 rounded-full bg-primary/[0.06] flex items-center justify-center text-primary font-semibold text-sm" aria-hidden="true">
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Quem Somos */}
        <section className="py-24 gradient-surface" aria-labelledby="sobre-heading">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <span className="section-label">Quem é a Patro</span>
              <h2 id="sobre-heading" className="mt-4 mb-6">Corretora de seguros com atendimento de gente, não de máquina</h2>
              <p className="text-muted-foreground leading-relaxed mb-4 text-[15px]">
                A Patro é uma corretora de seguros registrada na SUSEP (nº 211112427), com sede em Guarulhos/SP, que atende pessoas físicas, famílias, empresas de todos os portes e produtores rurais em todo o Brasil.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-10 text-[15px]">
                Nosso diferencial é simples: cada cliente conversa direto com um especialista, recebe propostas comparativas de múltiplas seguradoras e tem suporte completo — da cotação ao sinistro.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/sobre"><Button variant="outline" className="rounded-xl text-sm">Conheça Nossa História</Button></Link>
                <Link to="/indique-um-amigo"><Button variant="ghost" className="rounded-xl text-primary text-sm">Indique um Amigo <ArrowRight className="ml-1 h-3.5 w-3.5" aria-hidden="true" /></Button></Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-28 gradient-hero relative overflow-hidden" aria-label="Solicitar cotação">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,hsla(215,100%,60%,0.12),transparent)]" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="container mx-auto px-4 text-center relative">
            <h2 className="text-white mb-4">Peça sua cotação agora — é grátis e sem compromisso</h2>
            <p className="text-base text-white/50 mb-12 max-w-lg mx-auto">
              Nosso time responde em até 2 horas com propostas de várias seguradoras. Você compara e decide.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/cotacao" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto text-sm px-8 rounded-xl h-12 bg-white text-primary hover:bg-white/90 font-semibold shadow-lg shadow-white/10">
                  Pedir Cotação Gratuita
                </Button>
              </Link>
              <a href="tel:1151997500" aria-label="Ligar para (11) 5199-7500" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto text-sm px-8 rounded-xl h-12 bg-white/[0.06] border border-white/10 text-white/70 hover:bg-white/[0.12]">
                  <Phone className="mr-2 h-4 w-4" aria-hidden="true" />
                  (11) 5199-7500
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 bg-background" aria-labelledby="faq-heading">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-16">
              <span className="section-label">FAQ</span>
              <h2 id="faq-heading" className="mt-4">Perguntas Frequentes</h2>
            </div>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <details key={i} className="premium-card group" open={i === 0}>
                  <summary className="flex items-center justify-between p-5 cursor-pointer text-[15px] font-semibold text-foreground hover:text-primary transition-base select-none list-none [&::-webkit-details-marker]:hidden">
                    {faq.question}
                    <span className="text-primary/40 ml-4 group-open:rotate-45 transition-transform text-lg font-light flex-shrink-0">+</span>
                  </summary>
                  <div className="px-5 pb-5 -mt-1">
                    <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
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
