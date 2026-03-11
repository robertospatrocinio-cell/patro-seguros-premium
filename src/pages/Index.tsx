import { Link } from "react-router-dom";
import { Shield, Users, Clock, Award, CheckCircle, Phone, MessageCircle, ArrowRight, Car, Heart, Home, Building2, Truck, Smartphone, Plane, Tractor, Factory, Leaf, UserCheck, GraduationCap, Key } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const WHATSAPP_URL = "https://wa.me/551151997500?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Patro%20Seguros%20e%20gostaria%20de%20solicitar%20uma%20cota%C3%A7%C3%A3o%20de%20seguro.";

const seguradoras = ["Porto", "HDI", "Allianz", "Tokio Marine", "Mapfre", "Bradesco", "Azul", "Zurich", "Liberty", "Suhai", "Justos", "Darwin", "Ituran", "Akad"];

const operadoras = ["Bradesco Saúde", "Amil", "SulAmérica Saúde", "Porto Saúde", "NotreDame Intermédica", "MedSenior", "Omint", "Unimed"];

const solutions = [
  { title: "Seguro Auto", desc: "Proteção completa para seu veículo", icon: Car, link: "/seguro-auto" },
  { title: "Plano de Saúde", desc: "As melhores operadoras do mercado", icon: Heart, link: "/planos-de-saude" },
  { title: "Seguro Empresarial", desc: "Proteja seu negócio com segurança", icon: Building2, link: "/seguro-empresarial" },
  { title: "Seguro Residencial", desc: "Sua casa segura e protegida", icon: Home, link: "/seguro-residencial" },
  { title: "Seguro de Vida", desc: "Proteção para quem você ama", icon: Shield, link: "/seguro-vida" },
  { title: "Máquinas Agrícolas", desc: "Especialistas em agronegócio", icon: Tractor, link: "/seguro-maquinas-agricolas" },
  { title: "Galpões Industriais", desc: "Proteção industrial completa", icon: Factory, link: "/seguro-galpoes-industriais" },
  { title: "Seguro Ambiental", desc: "Proteção contra riscos ambientais", icon: Leaf, link: "/seguro-ambiental" },
  { title: "Acidentes Pessoais", desc: "Proteção financeira contra acidentes", icon: UserCheck, link: "/seguro-acidentes-pessoais" },
  { title: "Seguro Estagiário", desc: "Obrigatório por lei para estagiários", icon: GraduationCap, link: "/seguro-estagiario" },
  { title: "Seguro Caminhão", desc: "Proteção para veículos pesados", icon: Truck, link: "/seguro-caminhao" },
  { title: "Fiança Locatícia", desc: "Alugue sem fiador com segurança", icon: Key, link: "/seguro-fianca-locaticia" },
];

const diferenciais = [
  { icon: Clock, title: "Resposta em 2h", desc: "Cotação expressa sem burocracia. Resposta em até 2 horas úteis." },
  { icon: Users, title: "Atendimento Consultivo", desc: "Análise personalizada das suas necessidades por especialistas." },
  { icon: Shield, title: "Maiores Seguradoras", desc: "Comparamos Porto, Tokio Marine, Allianz, HDI e mais." },
  { icon: Award, title: "Suporte em Sinistro", desc: "Acompanhamento completo em todo o processo de sinistro." },
];

const testimonials = [
  { name: "Maria Silva", role: "Empresária", content: "Atendimento excepcional! A equipe da Patro me ajudou a encontrar o seguro perfeito para minha empresa. Super recomendo!", rating: 5 },
  { name: "João Santos", role: "Autônomo", content: "Rapidez e eficiência. Em menos de 24h tinha minha cotação e pude contratar o melhor seguro auto do mercado.", rating: 5 },
  { name: "Ana Paula", role: "Advogada", content: "Profissionais que realmente entendem do assunto. Me orientaram sobre o seguro RC profissional e fiquei muito satisfeita.", rating: 5 },
];

const Index = () => {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative gradient-hero overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsla(215,100%,60%,0.15),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,hsla(215,100%,70%,0.1),transparent_50%)]" />
          <div className="container mx-auto px-4 relative">
            <div className="py-24 md:py-36 max-w-3xl mx-auto text-center">
              <div className="animate-fade-up">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium bg-white/10 text-white/90 border border-white/10 mb-8 backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  Corretora de Seguros em Guarulhos
                </span>
              </div>
              <h1 className="text-white text-balance mb-6 animate-fade-up-delay-1">
                Proteção inteligente para você, sua família e sua empresa
              </h1>
              <p className="text-lg md:text-xl text-white/70 mb-10 text-balance animate-fade-up-delay-2 max-w-2xl mx-auto">
                A Patro Seguros compara as principais seguradoras do mercado para encontrar sempre a melhor proteção.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center animate-fade-up-delay-3">
                <Link to="/cotacao">
                  <Button size="lg" className="text-base px-8 rounded-xl bg-white text-primary hover:bg-white/90 h-12">
                    <Shield className="mr-2 h-4 w-4" />
                    Solicitar Cotação
                  </Button>
                </Link>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="text-base px-8 rounded-xl h-12 bg-white/10 border border-white/20 text-white hover:bg-white/20 backdrop-blur-sm">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Falar no WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Seguradoras */}
        <section className="py-14 bg-background border-b">
          <div className="container mx-auto px-4">
            <p className="text-center text-xs text-muted-foreground mb-8 uppercase tracking-[0.2em] font-medium">Seguradoras Parceiras</p>
            <div className="flex flex-wrap justify-center gap-3 items-center">
              {seguradoras.map((name) => (
                <div key={name} className="px-5 py-2.5 rounded-xl bg-muted text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary-light transition-base cursor-default">
                  {name}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Operadoras */}
        <section className="py-10 bg-muted/50 border-b">
          <div className="container mx-auto px-4">
            <p className="text-center text-xs text-muted-foreground mb-6 uppercase tracking-[0.2em] font-medium">Operadoras de Planos de Saúde</p>
            <div className="flex flex-wrap justify-center gap-3 items-center">
              {operadoras.map((name) => (
                <div key={name} className="px-4 py-2 rounded-xl bg-background text-sm font-medium text-muted-foreground border hover:border-primary/30 hover:text-primary transition-base">
                  {name}
                </div>
              ))}
            </div>
            <div className="text-center mt-6">
              <Link to="/planos-de-saude">
                <Button variant="ghost" size="sm" className="text-primary rounded-xl">
                  Simular Plano de Saúde <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Diferenciais */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-14">
              <span className="text-xs font-medium text-primary uppercase tracking-[0.2em]">Diferenciais</span>
              <h2 className="mt-3 mb-4">Por que escolher a Patro?</h2>
              <p className="text-muted-foreground max-w-lg mx-auto">Atendimento consultivo e personalizado que faz a diferença na hora de proteger o que importa.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {diferenciais.map((item, i) => (
                <div key={i} className="premium-card p-6 text-center">
                  <div className="w-12 h-12 rounded-2xl bg-primary-light flex items-center justify-center mx-auto mb-4">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Soluções */}
        <section className="py-20 gradient-surface">
          <div className="container mx-auto px-4">
            <div className="text-center mb-14">
              <span className="text-xs font-medium text-primary uppercase tracking-[0.2em]">Soluções</span>
              <h2 className="mt-3 mb-4">Seguros para todas as necessidades</h2>
              <p className="text-muted-foreground max-w-lg mx-auto">Proteção completa para pessoas, famílias, empresas e agronegócio.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {solutions.map((s, i) => (
                <Link key={i} to={s.link} className="group">
                  <div className="premium-card p-6 h-full">
                    <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-base">
                      <s.icon className="h-5 w-5 text-primary group-hover:text-white transition-base" />
                    </div>
                    <h3 className="text-base font-semibold mb-1">{s.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{s.desc}</p>
                    <span className="text-xs font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                      Saiba mais <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Cotação Auto */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="w-14 h-14 rounded-2xl bg-primary-light flex items-center justify-center mx-auto mb-6">
                <Car className="h-7 w-7 text-primary" />
              </div>
              <h2 className="mb-4">Cotação de Seguro Auto Online</h2>
              <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                Faça sua cotação de Seguro Auto, Moto, Caminhão e Vans direto pelo nosso sistema online.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="https://villa.segfy.com/Publico/Segurados/Orcamentos/SolicitarCotacao?e=t6RDiR%2F1ioARkspweLWOgQ%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" variant="cta" className="text-base px-8 rounded-xl h-12">
                    Fazer Cotação Online <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
                <a href="https://www.patroseguros.com" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="text-base px-8 rounded-xl h-12">
                    Simular Plano de Saúde
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Benefícios */}
        <section className="py-20 bg-primary-light">
          <div className="container mx-auto px-4">
            <div className="text-center mb-14">
              <span className="text-xs font-medium text-primary uppercase tracking-[0.2em]">Benefícios</span>
              <h2 className="mt-3 mb-4">O que você ganha com a Patro</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
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
                <div key={i} className="flex items-center gap-3 bg-card rounded-xl p-4 border">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <p className="text-sm font-medium">{b}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Depoimentos */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-14">
              <span className="text-xs font-medium text-primary uppercase tracking-[0.2em]">Depoimentos</span>
              <h2 className="mt-3">O que nossos clientes dizem</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {testimonials.map((t, i) => (
                <div key={i} className="premium-card p-6">
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <span key={j} className="text-amber-400 text-sm">★</span>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mb-5 leading-relaxed italic">"{t.content}"</p>
                  <div className="flex items-center gap-3 pt-4 border-t">
                    <div className="w-9 h-9 rounded-full bg-primary-light flex items-center justify-center text-primary font-semibold text-sm">
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quem Somos */}
        <section className="py-20 gradient-surface">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-xs font-medium text-primary uppercase tracking-[0.2em]">Sobre</span>
              <h2 className="mt-3 mb-6">A melhor corretora de seguros de Guarulhos</h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                A Patro Corretora de Seguros é especialista em proteção financeira e patrimonial para pessoas físicas,
                famílias, profissionais liberais e empresas de todos os portes. Nossa missão é levar segurança,
                tranquilidade e proteção inteligente através de um atendimento consultivo e totalmente personalizado.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/sobre"><Button variant="outline" className="rounded-xl">Conheça Nossa História</Button></Link>
                <Link to="/indique-um-amigo"><Button variant="ghost" className="rounded-xl text-primary">Indique um Amigo <ArrowRight className="ml-1 h-3.5 w-3.5" /></Button></Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-24 gradient-hero relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsla(215,100%,60%,0.2),transparent_70%)]" />
          <div className="container mx-auto px-4 text-center relative">
            <h2 className="text-white mb-4">Pronto para se proteger?</h2>
            <p className="text-lg text-white/70 mb-10 max-w-xl mx-auto">
              Fale com nossos especialistas e descubra a melhor solução de seguro para você.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/cotacao">
                <Button size="lg" className="text-base px-8 rounded-xl h-12 bg-white text-primary hover:bg-white/90">
                  Pedir Cotação Gratuita
                </Button>
              </Link>
              <a href="tel:1151997500">
                <Button size="lg" className="text-base px-8 rounded-xl h-12 bg-white/10 border border-white/20 text-white hover:bg-white/20">
                  <Phone className="mr-2 h-4 w-4" />
                  (11) 5199-7500
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-14">
              <span className="text-xs font-medium text-primary uppercase tracking-[0.2em]">FAQ</span>
              <h2 className="mt-3">Perguntas Frequentes</h2>
            </div>
            <div className="space-y-4">
              {[
                { q: "Por que devo contratar um seguro?", a: "O seguro protege você e sua família contra imprevistos que podem comprometer seu patrimônio e sua saúde financeira. É a forma mais inteligente de garantir tranquilidade." },
                { q: "Quanto tempo leva para receber uma cotação?", a: "Em até 2 horas úteis você recebe sua cotação personalizada. Em casos urgentes, podemos acelerar ainda mais." },
                { q: "A cotação é gratuita?", a: "Sim! Todas as nossas cotações são 100% gratuitas e sem compromisso." },
                { q: "Vocês atendem empresas?", a: "Sim! Atendemos empresas de todos os portes com seguros empresariais, de frota, responsabilidade civil, e muito mais." },
                { q: "Como funciona o atendimento?", a: "Você pode nos contatar por WhatsApp, telefone, e-mail ou pelo site. Nosso time está pronto para te atender." },
              ].map((faq, i) => (
                <div key={i} className="premium-card p-5">
                  <h3 className="text-base font-semibold mb-2">{faq.q}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
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
