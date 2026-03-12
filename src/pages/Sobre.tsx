import { Shield, Target, Heart, Award } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import { Card, CardContent } from "@/components/ui/card";

const Sobre = () => {
  return (
    <>
      <PageMeta title="Sobre a Patro Seguros" description="Conheça a Patro Seguros — corretora de seguros em Guarulhos com atendimento consultivo, especialistas dedicados e parceria com as melhores seguradoras do Brasil." />
      <Header />
      <main>
        {/* Hero */}
        <section className="gradient-hero py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-white mb-6">Quem Somos</h1>
              <p className="text-xl text-white/70">
                Especialistas em proteção financeira com atendimento consultivo e rápido
              </p>
            </div>
          </div>
        </section>

        {/* Nossa História */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="mb-8">Nossa História</h2>
              <div className="space-y-6 text-lg text-muted-foreground">
                <p>
                  A <strong className="text-foreground">Patro Corretora de Seguros</strong> nasceu com um propósito claro: 
                  transformar a forma como as pessoas e empresas de Guarulhos se protegem. Fundada por profissionais com 
                  mais de 15 anos de experiência no mercado de seguros, nossa corretora se destaca pelo atendimento 
                  humanizado e pela busca incansável pelas melhores soluções para cada cliente.
                </p>
                <p>
                  Ao longo dos anos, construímos parcerias sólidas com as maiores seguradoras do Brasil, o que nos 
                  permite oferecer uma ampla gama de produtos com as melhores condições do mercado. Mas o que realmente 
                  nos diferencia não são apenas os produtos que oferecemos — é a forma como cuidamos de cada cliente.
                </p>
                <p>
                  Hoje, somos reconhecidos como a <strong className="text-foreground">melhor corretora de seguros de Guarulhos</strong>, 
                  atendendo centenas de famílias, profissionais liberais e empresas que confiam na nossa expertise e 
                  compromisso com a proteção de seus patrimônios e vidas.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Valores */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-center mb-12">Nossos Valores</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="pt-6 text-center">
                  <Shield className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-3">Proteção</h3>
                  <p className="text-muted-foreground">
                    Colocamos a segurança dos nossos clientes em primeiro lugar, sempre.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 text-center">
                  <Heart className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-3">Humanização</h3>
                  <p className="text-muted-foreground">
                    Tratamos cada cliente com respeito, empatia e atenção personalizada.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 text-center">
                  <Target className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-3">Transparência</h3>
                  <p className="text-muted-foreground">
                    Clareza total em todas as informações, coberturas e processos.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 text-center">
                  <Award className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-3">Excelência</h3>
                  <p className="text-muted-foreground">
                    Buscamos sempre superar expectativas e entregar o melhor serviço.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Missão, Visão, Valores */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="bg-primary-light">
                <CardContent className="pt-6">
                  <h3 className="text-2xl font-bold mb-4 text-primary">Missão</h3>
                  <p className="text-muted-foreground">
                    Levar segurança, tranquilidade e proteção inteligente para pessoas, famílias e empresas através 
                    de soluções personalizadas e atendimento consultivo de excelência.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-primary-light">
                <CardContent className="pt-6">
                  <h3 className="text-2xl font-bold mb-4 text-primary">Visão</h3>
                  <p className="text-muted-foreground">
                    Ser a corretora de seguros mais confiável e reconhecida de Guarulhos e região, referência em 
                    atendimento humanizado e soluções inteligentes de proteção.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-primary-light">
                <CardContent className="pt-6">
                  <h3 className="text-2xl font-bold mb-4 text-primary">Compromisso</h3>
                  <p className="text-muted-foreground">
                    Estar ao lado dos nossos clientes em todos os momentos, oferecendo suporte rápido, orientação 
                    clara e acompanhamento completo em sinistros e renovações.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Certificações */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="mb-8">Certificações e Credenciamento</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Somos uma corretora devidamente registrada e credenciada pela <strong>SUSEP</strong> (Superintendência 
                de Seguros Privados), garantindo total segurança e conformidade legal em todas as operações.
              </p>
              <p className="text-lg text-muted-foreground">
                Nossos corretores são profissionais certificados e em constante atualização, participando de 
                treinamentos oferecidos pelas principais seguradoras do mercado.
              </p>
            </div>
          </div>
        </section>

        {/* Diferenciais */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="mb-8 text-center">Por Que Somos Diferentes</h2>
              <div className="space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold mb-3">Atendimento Consultivo Real</h3>
                    <p className="text-muted-foreground">
                      Não empurramos produtos. Analisamos sua situação, entendemos suas necessidades e recomendamos 
                      apenas o que realmente faz sentido para você.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold mb-3">Rapidez Sem Perder Qualidade</h3>
                    <p className="text-muted-foreground">
                      Tempo é precioso. Por isso, nos comprometemos a responder em até 2 horas e entregar cotações 
                      completas no mesmo dia, sempre com análise criteriosa.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold mb-3">Suporte Completo em Sinistros</h3>
                    <p className="text-muted-foreground">
                      Não deixamos você sozinho na hora que mais precisa. Acompanhamos todo o processo de sinistro, 
                      da abertura até a finalização, garantindo seus direitos.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold mb-3">Consultoria Preventiva</h3>
                    <p className="text-muted-foreground">
                      Orientamos nossos clientes sobre boas práticas de prevenção de riscos, ajudando a evitar 
                      sinistros e reduzir custos com seguros no longo prazo.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Sobre;
