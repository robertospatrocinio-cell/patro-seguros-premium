import { Link } from "react-router-dom";
import { Shield, Users, Clock, Award, CheckCircle, Phone, MessageCircle, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const WHATSAPP_URL = "https://wa.me/551151997500?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Patro%20Seguros%20e%20gostaria%20de%20solicitar%20uma%20cota%C3%A7%C3%A3o%20de%20seguro.";

const seguradoras = [
  "Porto", "HDI", "Allianz", "Tokio Marine", "Mapfre", "Bradesco",
  "Azul", "Zurich", "Liberty", "Suhai", "Justos", "Darwin", "Ituran"
];

const operadoras = [
  "Bradesco Saúde", "Amil Saúde", "SulAmérica Saúde", "Porto Saúde",
  "NotreDame Intermédica", "MedSenior", "Omint"
];

const insuranceTypes = [
  { title: "Seguro Auto", icon: "🚗", link: "/seguro-auto" },
  { title: "Seguro Moto", icon: "🏍️", link: "/seguro-moto" },
  { title: "Seguro Residencial", icon: "🏠", link: "/seguro-residencial" },
  { title: "Seguro Vida", icon: "❤️", link: "/seguro-vida" },
  { title: "Seguro Empresarial", icon: "🏢", link: "/seguro-empresarial" },
  { title: "Seguro Frota", icon: "🚛", link: "/seguro-frota" },
  { title: "Seguro RC", icon: "⚖️", link: "/seguro-rc" },
  { title: "Seguro Transporte", icon: "📦", link: "/seguro-transporte" },
  { title: "Seguro Condomínio", icon: "🏗️", link: "/seguro-condominio" },
  { title: "Seguro Viagem", icon: "✈️", link: "/seguro-viagem" },
  { title: "Seguro Celular", icon: "📱", link: "/seguro-celular" },
  { title: "Previdência", icon: "💰", link: "/previdencia-privada" },
];

const testimonials = [
  { name: "Maria Silva", role: "Empresária", content: "Atendimento excepcional! A equipe da Patro me ajudou a encontrar o seguro perfeito para minha empresa. Super recomendo!" },
  { name: "João Santos", role: "Autônomo", content: "Rapidez e eficiência. Em menos de 24h tinha minha cotação e pude contratar o melhor seguro auto do mercado." },
  { name: "Ana Paula", role: "Advogada", content: "Profissionais que realmente entendem do assunto. Me orientaram sobre o seguro RC profissional e fiquei muito satisfeita." },
];

const Index = () => {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="gradient-hero py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-balance mb-6">
                Proteção Inteligente para Você, Sua Família e Sua Empresa
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 text-balance">
                A Patro Seguros compara as principais seguradoras do mercado para encontrar sempre a melhor proteção.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link to="/cotacao">
                  <Button size="lg" className="text-lg px-8">
                    <Shield className="mr-2 h-5 w-5" />
                    Solicitar Cotação
                  </Button>
                </Link>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="cta" className="text-lg px-8">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Falar no WhatsApp
                  </Button>
                </a>
              </div>
              <p className="mt-6 text-sm text-muted-foreground">
                📞 (11) 5199-7500 | 📧 contato@patroseguros.com.br | 📍 Guarulhos/SP
              </p>
            </div>
          </div>
        </section>

        {/* Seguradoras Parceiras */}
        <section className="py-12 bg-background border-b">
          <div className="container mx-auto px-4">
            <p className="text-center text-sm text-muted-foreground mb-6 uppercase tracking-wider font-medium">Seguradoras Parceiras</p>
            <div className="flex flex-wrap justify-center gap-6 items-center">
              {seguradoras.map((name) => (
                <div key={name} className="bg-muted rounded-lg px-5 py-3 text-sm font-semibold text-muted-foreground">
                  {name}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Operadoras de Saúde */}
        <section className="py-10 bg-muted/50 border-b">
          <div className="container mx-auto px-4">
            <p className="text-center text-sm text-muted-foreground mb-6 uppercase tracking-wider font-medium">Operadoras de Planos de Saúde</p>
            <div className="flex flex-wrap justify-center gap-4 items-center">
              {operadoras.map((name) => (
                <div key={name} className="bg-background rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground border">
                  {name}
                </div>
              ))}
            </div>
            <div className="text-center mt-6">
              <Link to="/planos-de-saude">
                <Button variant="outline" size="sm">
                  Simular Plano de Saúde <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Diferenciais */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-center mb-12">Por Que Escolher a Patro Seguros?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Clock, title: "Atendimento Rápido", desc: "Resposta em até 2 horas. Cotação expressa e sem burocracia." },
                { icon: Users, title: "Atendimento Consultivo", desc: "Análise personalizada das suas necessidades. Você não é só um número." },
                { icon: Shield, title: "Maiores Seguradoras", desc: "Parceria com Porto Seguro, Tokio Marine, Allianz e mais." },
                { icon: Award, title: "Suporte em Sinistro", desc: "Não deixamos você sozinho. Acompanhamento completo em todo processo." },
              ].map((item, i) => (
                <Card key={i} className="text-center hover:shadow-lg transition-base">
                  <CardContent className="pt-6">
                    <item.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Tipos de Seguros */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-center mb-4">Seguros Completos para Todas as Necessidades</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Seja para sua família, seu carro, sua casa ou sua empresa — temos a solução ideal
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {insuranceTypes.map((type, index) => (
                <Link key={index} to={type.link}>
                  <Card className="hover:shadow-lg transition-base cursor-pointer h-full">
                    <CardContent className="pt-6 text-center">
                      <div className="text-4xl mb-2">{type.icon}</div>
                      <h3 className="text-sm font-semibold">{type.title}</h3>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link to="/cotacao">
                <Button size="lg">Ver Todos os Seguros</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Cotação Seguro Auto */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-4">Cotação de Seguro Auto Online</h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Faça sua cotação de Seguro Auto, Moto, Caminhão e Vans direto pelo nosso sistema online.
            </p>
            <a
              href="https://villa.segfy.com/Publico/Segurados/Orcamentos/SolicitarCotacao?e=t6RDiR%2F1ioARkspweLWOgQ%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" variant="cta" className="text-lg px-8">
                Fazer Cotação Online <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
          </div>
        </section>

        {/* Simulador Plano de Saúde */}
        <section className="py-12 bg-muted">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-4">Simule Seu Plano de Saúde</h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Compare as melhores operadoras e encontre o plano ideal para você e sua família.
            </p>
            <a href="https://www.patroseguros.com" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="text-lg px-8">
                Simular Plano de Saúde <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
          </div>
        </section>

        {/* Quem Somos */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="mb-6">A Melhor Corretora de Seguros de Guarulhos</h2>
              <p className="text-lg text-muted-foreground mb-6">
                A Patro Corretora de Seguros é especialista em proteção financeira e patrimonial para pessoas físicas, 
                famílias, profissionais liberais e empresas de todos os portes. Nossa missão é levar segurança, 
                tranquilidade e proteção inteligente através de um atendimento consultivo e totalmente personalizado.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/sobre">
                  <Button variant="outline" size="lg">Conheça Nossa História</Button>
                </Link>
                <Link to="/indique-um-amigo">
                  <Button variant="outline" size="lg">Indique um Amigo</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Benefícios */}
        <section className="py-16 bg-primary-light">
          <div className="container mx-auto px-4">
            <h2 className="text-center mb-12">O Que Você Ganha com a Patro Seguros</h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                "Cotação gratuita e sem compromisso",
                "Comparação entre várias seguradoras",
                "Atendimento humanizado e próximo",
                "Consultoria preventiva para evitar sinistros",
                "Ajuda completa em caso de sinistro",
                "Renovação automática com revisão de coberturas",
                "WhatsApp direto com seu corretor",
                "Análise de risco personalizada",
              ].map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-lg">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Depoimentos */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-center mb-12">O Que Nossos Clientes Dizem</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <p className="text-muted-foreground mb-4 italic">"{testimonial.content}"</p>
                    <div className="border-t pt-4">
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-20 gradient-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-6 text-white">Pronto Para Se Proteger?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
              Fale com nossos especialistas agora e descubra a melhor solução de seguro para você
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/cotacao">
                <Button size="lg" variant="secondary" className="text-lg px-8">
                  Pedir Cotação Gratuita
                </Button>
              </Link>
              <a href="tel:1151997500">
                <Button size="lg" variant="outline" className="text-lg px-8 bg-white/10 border-white text-white hover:bg-white hover:text-primary">
                  <Phone className="mr-2 h-5 w-5" />
                  (11) 5199-7500
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-center mb-12">Perguntas Frequentes</h2>
            <div className="space-y-6">
              {[
                { q: "Por que devo contratar um seguro?", a: "O seguro protege você e sua família contra imprevistos que podem comprometer seu patrimônio e sua saúde financeira. É a forma mais inteligente de garantir tranquilidade." },
                { q: "Quanto tempo leva para receber uma cotação?", a: "Em até 2 horas úteis você recebe sua cotação personalizada. Em casos urgentes, podemos acelerar ainda mais." },
                { q: "A cotação é gratuita?", a: "Sim! Todas as nossas cotações são 100% gratuitas e sem compromisso. Você só contrata se quiser." },
                { q: "Vocês atendem empresas?", a: "Sim! Atendemos empresas de todos os portes com seguros empresariais, de frota, responsabilidade civil, e muito mais." },
                { q: "Como funciona o atendimento?", a: "Você pode nos contatar por WhatsApp, telefone, e-mail ou através do nosso site. Nosso time está pronto para te atender." },
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
      <Footer />
    </>
  );
};

export default Index;
