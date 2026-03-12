import { Link } from "react-router-dom";
import { Shield, Users, Clock, Award, CheckCircle, Phone, MessageCircle, ArrowRight, Car, Heart, Home, Building2, Truck, Tractor, Factory, Leaf, UserCheck, GraduationCap, Key } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import FAQSchema from "@/components/FAQSchema";
import { Button } from "@/components/ui/button";

const WHATSAPP_URL = "https://wa.me/551151997500?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Patro%20Seguros%20e%20gostaria%20de%20solicitar%20uma%20cota%C3%A7%C3%A3o%20de%20seguro.";

const seguradoras = ["Porto", "HDI", "Allianz", "Tokio Marine", "Mapfre", "Bradesco", "Azul", "Zurich", "Liberty", "Suhai", "Justos", "Darwin", "Ituran", "Akad"];

const operadoras = ["Bradesco Saúde", "Amil", "SulAmérica Saúde", "Porto Saúde", "HapVida/NotreDame Intermédica", "MedSenior", "Omint", "Unimed", "Prevent Senior", "Alice", "Care Plus"];

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
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsla(215,100%,60%,0.15),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,hsla(215,100%,70%,0.1),transparent_50%)]" />
          <div className="container mx-auto px-4 relative">
            <div className="py-24 md:py-36 max-w-3xl mx-auto text-center">
              <div className="animate-fade-up">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium bg-white/10 text-white/90 border border-white/10 mb-8 backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" aria-hidden="true" />
                  Corretora de Seguros em Guarulhos
                </span>
              </div>
              <h1 className="text-white text-balance mb-6 animate-fade-up-delay-1">
                Proteção inteligente para você, sua família e sua empresa
              </h1>
              <p className="text-lg md:text-xl text-white/70 mb-10 text-balance animate-fade-up-delay-2 max-w-2xl mx-auto">
                Comparamos as principais seguradoras do mercado para encontrar a melhor proteção com o menor custo.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center animate-fade-up-delay-3">
                <Link to="/cotacao" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto text-base px-8 rounded-xl bg-white text-primary hover:bg-white/90 h-12">
                    <Shield className="mr-2 h-4 w-4" aria-hidden="true" />
                    Solicitar Cotação Grátis
                  </Button>
                </Link>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto text-base px-8 rounded-xl h-12 bg-white/10 border border-white/20 text-white hover:bg-white/20 backdrop-blur-sm">
                    <MessageCircle className="mr-2 h-4 w-4" aria-hidden="true" />
                    Falar no WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Seguradoras */}
        <section className="py-14 bg-background border-b" aria-label="Seguradoras parceiras">
          <div className="container mx-auto px-4">
            <h2 className="text-center text-xs text-muted-foreground mb-8 uppercase tracking-[0.2em] font-medium">Seguradoras Parceiras</h2>
            <ul className="flex flex-wrap justify-center gap-3 items-center list-none" role="list">
              {seguradoras.map((name) => (
                <li key={name} className="px-5 py-2.5 rounded-xl bg-background text-sm font-medium text-muted-foreground border border-[hsl(0,0%,75%)] shadow-[0_0_6px_0_hsla(0,0%,70%,0.3)] hover:border-primary/30 hover:text-primary hover:shadow-[0_0_8px_0_hsla(var(--primary),0.2)] hover:font-bold hover:scale-[1.15] transition-all duration-200 cursor-default">
                  {name}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Operadoras */}
        <section className="py-10 bg-muted/50 border-b" aria-label="Operadoras de saúde">
          <div className="container mx-auto px-4">
            <h2 className="text-center text-xs text-muted-foreground mb-6 uppercase tracking-[0.2em] font-medium">Operadoras de Planos de Saúde</h2>
            <ul className="flex flex-wrap justify-center gap-3 items-center list-none" role="list">
              {operadoras.map((name) => (
                <li key={name} className="px-4 py-2 rounded-xl bg-background text-sm font-medium text-muted-foreground border border-[hsl(0,0%,75%)] shadow-[0_0_6px_0_hsla(0,0%,70%,0.3)] hover:border-primary/30 hover:text-primary hover:shadow-[0_0_8px_0_hsla(var(--primary),0.2)] hover:font-bold hover:scale-[1.15] transition-all duration-200">
                  {name}
                </li>
              ))}
            </ul>
            <div className="text-center mt-6">
              <Link to="/planos-de-saude">
                <Button variant="ghost" size="sm" className="text-primary rounded-xl">
                  Simular Plano de Saúde <ArrowRight className="ml-1 h-3.5 w-3.5" aria-hidden="true" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Diferenciais */}
        <section className="py-20 bg-background" aria-labelledby="diferenciais-heading">
          <div className="container mx-auto px-4">
            <div className="text-center mb-14">
              <span className="text-xs font-medium text-primary uppercase tracking-[0.2em]">Diferenciais</span>
              <h2 id="diferenciais-heading" className="mt-3 mb-4">Por que escolher a Patro Seguros?</h2>
              <p className="text-muted-foreground max-w-lg mx-auto">Atendimento consultivo e personalizado que faz a diferença na hora de proteger o que importa.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {diferenciais.map((item, i) => (
                <div key={i} className="premium-card p-6 text-center">
                  <div className="w-12 h-12 rounded-2xl bg-primary-light flex items-center justify-center mx-auto mb-4">
                    <item.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Soluções */}
        <section className="py-20 gradient-surface" aria-labelledby="solucoes-heading">
          <div className="container mx-auto px-4">
            <div className="text-center mb-14">
              <span className="text-xs font-medium text-primary uppercase tracking-[0.2em]">Soluções</span>
              <h2 id="solucoes-heading" className="mt-3 mb-4">Seguros para todas as necessidades</h2>
              <p className="text-muted-foreground max-w-lg mx-auto">Proteção completa para pessoas, famílias, empresas e agronegócio.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {solutions.map((s, i) => (
                <Link key={i} to={s.link} className="group">
                  <article className="premium-card p-6 h-full">
                    <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-base">
                      <s.icon className="h-5 w-5 text-primary group-hover:text-white transition-base" aria-hidden="true" />
                    </div>
                    <h3 className="text-base font-semibold mb-1">{s.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{s.desc}</p>
                    <span className="text-xs font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                      Saiba mais <ArrowRight className="h-3 w-3" aria-hidden="true" />
                    </span>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Cotação Auto */}
        <section className="py-20 bg-background" aria-labelledby="cotacao-auto-heading">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="w-14 h-14 rounded-2xl bg-primary-light flex items-center justify-center mx-auto mb-6" aria-hidden="true">
                <Car className="h-7 w-7 text-primary" />
              </div>
              <h2 id="cotacao-auto-heading" className="mb-4">Cotação de Seguro Auto Online</h2>
              <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                Faça sua cotação de Seguro Auto, Moto, Caminhão e Vans direto pelo nosso sistema online. Resultado em minutos.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="https://villa.segfy.com/Publico/Segurados/Orcamentos/SolicitarCotacao?e=t6RDiR%2F1ioARkspweLWOgQ%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" variant="cta" className="text-base px-8 rounded-xl h-12">
                    Fazer Cotação Online <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Button>
                </a>
                <Link to="/planos-de-saude">
                  <Button size="lg" variant="outline" className="text-base px-8 rounded-xl h-12">
                    Simular Plano de Saúde
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Benefícios */}
        <section className="py-20 bg-primary-light" aria-labelledby="beneficios-heading">
          <div className="container mx-auto px-4">
            <div className="text-center mb-14">
              <span className="text-xs font-medium text-primary uppercase tracking-[0.2em]">Benefícios</span>
              <h2 id="beneficios-heading" className="mt-3 mb-4">O que você ganha com a Patro</h2>
            </div>
            <ul className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto list-none">
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
                <li key={i} className="flex items-center gap-3 bg-card rounded-xl p-4 border">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" aria-hidden="true" />
                  <p className="text-sm font-medium">{b}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Depoimentos */}
        <section className="py-20 bg-background" aria-labelledby="depoimentos-heading">
          <div className="container mx-auto px-4">
            <div className="text-center mb-14">
              <span className="text-xs font-medium text-primary uppercase tracking-[0.2em]">Depoimentos</span>
              <h2 id="depoimentos-heading" className="mt-3">O que nossos clientes dizem</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {testimonials.map((t, i) => (
                <article key={i} className="premium-card p-6">
                  <div className="flex gap-0.5 mb-4" role="img" aria-label={`Avaliação: ${t.rating} de 5 estrelas`}>
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <span key={j} className="text-amber-400 text-sm" aria-hidden="true">★</span>
                    ))}
                  </div>
                  <blockquote className="text-sm text-muted-foreground mb-5 leading-relaxed italic">"{t.content}"</blockquote>
                  <div className="flex items-center gap-3 pt-4 border-t">
                    <div className="w-9 h-9 rounded-full bg-primary-light flex items-center justify-center text-primary font-semibold text-sm" aria-hidden="true">
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Quem Somos */}
        <section className="py-20 gradient-surface" aria-labelledby="sobre-heading">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-xs font-medium text-primary uppercase tracking-[0.2em]">Sobre</span>
              <h2 id="sobre-heading" className="mt-3 mb-6">A melhor corretora de seguros de Guarulhos</h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                A Patro Corretora de Seguros é especialista em proteção financeira e patrimonial para pessoas físicas,
                famílias, profissionais liberais e empresas de todos os portes. Nossa missão é levar segurança,
                tranquilidade e proteção inteligente através de um atendimento consultivo e totalmente personalizado.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/sobre"><Button variant="outline" className="rounded-xl">Conheça Nossa História</Button></Link>
                <Link to="/indique-um-amigo"><Button variant="ghost" className="rounded-xl text-primary">Indique um Amigo <ArrowRight className="ml-1 h-3.5 w-3.5" aria-hidden="true" /></Button></Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-24 gradient-hero relative overflow-hidden" aria-label="Solicitar cotação">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsla(215,100%,60%,0.2),transparent_70%)]" />
          <div className="container mx-auto px-4 text-center relative">
            <h2 className="text-white mb-4">Pronto para proteger o que importa?</h2>
            <p className="text-lg text-white/70 mb-10 max-w-xl mx-auto">
              Fale com nossos especialistas e receba sua cotação gratuita em até 2 horas.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/cotacao" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto text-base px-8 rounded-xl h-12 bg-white text-primary hover:bg-white/90">
                  Pedir Cotação Gratuita
                </Button>
              </Link>
              <a href="tel:1151997500" aria-label="Ligar para (11) 5199-7500" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto text-base px-8 rounded-xl h-12 bg-white/10 border border-white/20 text-white hover:bg-white/20">
                  <Phone className="mr-2 h-4 w-4" aria-hidden="true" />
                  (11) 5199-7500
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-background" aria-labelledby="faq-heading">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-14">
              <span className="text-xs font-medium text-primary uppercase tracking-[0.2em]">FAQ</span>
              <h2 id="faq-heading" className="mt-3">Perguntas Frequentes</h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="premium-card p-5">
                  <h3 className="text-base font-semibold mb-2">{faq.question}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                </div>
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