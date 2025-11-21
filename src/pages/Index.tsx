import { Link } from "react-router-dom";
import { Shield, Users, Clock, Award, CheckCircle, Phone, MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  const testimonials = [
    {
      name: "Maria Silva",
      role: "Empresária",
      content: "Atendimento excepcional! A equipe da Patro me ajudou a encontrar o seguro perfeito para minha empresa. Super recomendo!",
    },
    {
      name: "João Santos",
      role: "Autônomo",
      content: "Rapidez e eficiência. Em menos de 24h tinha minha cotação e pude contratar o melhor seguro auto do mercado.",
    },
    {
      name: "Ana Paula",
      role: "Advogada",
      content: "Profissionais que realmente entendem do assunto. Me orientaram sobre o seguro RC profissional e fiquei muito satisfeita.",
    },
  ];

  const insuranceTypes = [
    { title: "Seguro Auto", icon: "🚗", link: "/seguro-auto" },
    { title: "Seguro Vida", icon: "❤️", link: "/seguro-vida" },
    { title: "Seguro Empresarial", icon: "🏢", link: "/seguro-empresarial" },
    { title: "Seguro Residencial", icon: "🏠", link: "/seguro-residencial" },
    { title: "Seguro Viagem", icon: "✈️", link: "/seguro-viagem" },
    { title: "Seguro Saúde", icon: "🏥", link: "/seguro-saude" },
  ];

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
                A Corretora de Seguros Nº1 de Guarulhos — Atendimento Consultivo, Rápido e Personalizado
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link to="/cotacao">
                  <Button size="lg" className="text-lg px-8">
                    <Shield className="mr-2 h-5 w-5" />
                    Pedir Cotação Agora
                  </Button>
                </Link>
                <a href="https://wa.me/5511519975000" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="cta" className="text-lg px-8">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    WhatsApp - Atendimento Imediato
                  </Button>
                </a>
              </div>
              <p className="mt-6 text-sm text-muted-foreground">
                📞 (11) 5199-7500 | 📧 contato@patroseguros.com.br | 📍 Guarulhos/SP
              </p>
            </div>
          </div>
        </section>

        {/* Diferenciais */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-center mb-12">Por Que Escolher a Patro Seguros?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center hover:shadow-lg transition-base">
                <CardContent className="pt-6">
                  <Clock className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-2">Atendimento Rápido</h3>
                  <p className="text-muted-foreground">
                    Resposta em até 2 horas. Cotação expressa e sem burocracia.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-base">
                <CardContent className="pt-6">
                  <Users className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-2">Atendimento Consultivo</h3>
                  <p className="text-muted-foreground">
                    Análise personalizada das suas necessidades. Você não é só um número.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-base">
                <CardContent className="pt-6">
                  <Shield className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-2">Maiores Seguradoras</h3>
                  <p className="text-muted-foreground">
                    Parceria com Porto Seguro, Tokio Marine, Allianz e mais.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-base">
                <CardContent className="pt-6">
                  <Award className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-2">Suporte em Sinistro</h3>
                  <p className="text-muted-foreground">
                    Não deixamos você sozinho. Acompanhamento completo em todo processo.
                  </p>
                </CardContent>
              </Card>
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
              <p className="text-lg text-muted-foreground mb-8">
                Com parcerias estratégicas com as maiores seguradoras do Brasil, garantimos as melhores coberturas 
                pelo melhor custo-benefício. Não vendemos seguros — oferecemos soluções de proteção sob medida.
              </p>
              <Link to="/sobre">
                <Button variant="outline" size="lg">Conheça Nossa História</Button>
              </Link>
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
              <div>
                <h3 className="text-lg font-semibold mb-2">Por que devo contratar um seguro?</h3>
                <p className="text-muted-foreground">
                  O seguro protege você e sua família contra imprevistos que podem comprometer seu patrimônio e sua saúde financeira. 
                  É a forma mais inteligente de garantir tranquilidade.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Quanto tempo leva para receber uma cotação?</h3>
                <p className="text-muted-foreground">
                  Em até 2 horas úteis você recebe sua cotação personalizada. Em casos urgentes, podemos acelerar ainda mais.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">A cotação é gratuita?</h3>
                <p className="text-muted-foreground">
                  Sim! Todas as nossas cotações são 100% gratuitas e sem compromisso. Você só contrata se quiser.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Vocês atendem empresas?</h3>
                <p className="text-muted-foreground">
                  Sim! Atendemos empresas de todos os portes com seguros empresariais, de frota, responsabilidade civil, e muito mais.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Como funciona o atendimento?</h3>
                <p className="text-muted-foreground">
                  Você pode nos contatar por WhatsApp, telefone, e-mail ou através do nosso site. Nosso time está pronto para te atender.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Index;
