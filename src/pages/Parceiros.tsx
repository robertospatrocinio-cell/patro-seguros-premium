import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

const Parceiros = () => {
  const partners = [
    { name: "Porto Seguro", description: "Líder em seguros automotivos e residenciais" },
    { name: "Tokio Marine", description: "Excelência em seguros empresariais e patrimoniais" },
    { name: "Allianz", description: "Seguradora global com soluções completas" },
    { name: "Azul Seguros", description: "Seguros acessíveis com ampla cobertura" },
    { name: "Mapfre", description: "Tradição e confiança em seguros diversos" },
    { name: "HDI Seguros", description: "Especialista em seguros corporativos" },
    { name: "Zurich", description: "Soluções globais para riscos complexos" },
    { name: "Bradesco Seguros", description: "Solidez e credibilidade nacional" },
    { name: "Liberty Seguros", description: "Flexibilidade e personalização" },
    { name: "Suhai", description: "Proteção veicular acessível" },
    { name: "Justos", description: "Seguro auto inteligente e digital" },
    { name: "Darwin", description: "Inovação em seguros" },
    { name: "Ituran", description: "Rastreamento e proteção veicular" },
    { name: "SulAmérica", description: "Tradição em seguros de saúde e vida" },
  ];

  const healthPartners = [
    { name: "Bradesco Saúde", description: "Ampla rede credenciada e cobertura nacional" },
    { name: "Amil Saúde", description: "Planos individuais e empresariais com excelente custo-benefício" },
    { name: "SulAmérica Saúde", description: "Tradição e qualidade em saúde suplementar" },
    { name: "Porto Saúde", description: "Inovação e tecnologia em planos de saúde" },
    { name: "NotreDame Intermédica", description: "Rede própria e preços acessíveis" },
    { name: "MedSenior", description: "Especialista em planos para a terceira idade" },
    { name: "Omint", description: "Planos premium com atendimento diferenciado" },
  ];

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="gradient-hero py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="mb-6">Nossos Parceiros</h1>
              <p className="text-xl text-muted-foreground">
                Trabalhamos com as maiores e mais confiáveis seguradoras do Brasil
              </p>
            </div>
          </div>
        </section>

        {/* Sobre as Parcerias */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="mb-6">Por Que Múltiplas Seguradoras?</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Trabalhar com diversas seguradoras nos permite oferecer a você o melhor custo-benefício do mercado. 
                Cada seguradora tem seus pontos fortes, e nossa expertise está em identificar qual é a melhor opção 
                para o seu perfil e necessidade específica.
              </p>
              <p className="text-lg text-muted-foreground">
                Isso significa que você não fica preso a uma única opção. Fazemos uma análise comparativa completa 
                e apresentamos as melhores alternativas, sempre com transparência total.
              </p>
            </div>

            {/* Grid de Parceiros */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {partners.map((partner, index) => (
                <Card key={index} className="hover:shadow-lg transition-base border-2" style={{ borderImage: 'linear-gradient(135deg, #C0C0C0, #E8E8E8, #A8A8A8, #D4D4D4, #B0B0B0) 1', borderStyle: 'solid' }}>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-bold mb-2 text-primary">{partner.name}</h3>
                    <p className="text-muted-foreground">{partner.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Operadoras de Saúde */}
            <h2 className="text-center mb-8 mt-16">Operadoras de Planos de Saúde</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {healthPartners.map((partner, index) => (
                <Card key={index} className="hover:shadow-lg transition-base">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-bold mb-2 text-primary">{partner.name}</h3>
                    <p className="text-muted-foreground">{partner.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefícios */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-center mb-12">Vantagens de Ter Várias Opções</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold mb-3">✅ Melhor Preço</h3>
                    <p className="text-muted-foreground">
                      Comparamos cotações de múltiplas seguradoras para garantir que você pague o menor valor possível 
                      sem comprometer coberturas.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold mb-3">✅ Coberturas Personalizadas</h3>
                    <p className="text-muted-foreground">
                      Cada seguradora tem coberturas específicas. Encontramos aquela que mais se adequa ao seu perfil 
                      e necessidades reais.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold mb-3">✅ Mais Opções de Pagamento</h3>
                    <p className="text-muted-foreground">
                      Diferentes seguradoras oferecem diferentes condições de pagamento. Escolhemos a que cabe no seu 
                      bolso.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold mb-3">✅ Especialização por Segmento</h3>
                    <p className="text-muted-foreground">
                      Algumas seguradoras são melhores em auto, outras em vida, outras em empresarial. Sabemos 
                      exatamente onde buscar.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-center mb-12">Perguntas Frequentes</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Como vocês escolhem a seguradora?</h3>
                <p className="text-muted-foreground">
                  Analisamos seu perfil, necessidades e orçamento. Em seguida, fazemos cotações em várias seguradoras 
                  e apresentamos as melhores opções com análise comparativa detalhada.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Posso escolher qualquer seguradora?</h3>
                <p className="text-muted-foreground">
                  Sim! Apresentamos as opções e você decide. Nossa recomendação é baseada em análise técnica, mas a 
                  decisão final é sempre sua.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Todas as seguradoras são confiáveis?</h3>
                <p className="text-muted-foreground">
                  Sim. Trabalhamos apenas com seguradoras regulamentadas pela SUSEP, com sólida reputação no mercado 
                  e histórico comprovado de pagamento de sinistros.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Posso trocar de seguradora depois?</h3>
                <p className="text-muted-foreground">
                  Sim. Na renovação, sempre revisamos as condições e, se necessário, migramos para outra seguradora 
                  que ofereça melhores condições.
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

export default Parceiros;
