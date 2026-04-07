import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import { Card, CardContent } from "@/components/ui/card";

const Parceiros = () => {
  const partners = [
    { name: "Porto Seguro", description: "Líder em seguros automotivos e residenciais", logo: "/logos/porto.png" },
    { name: "Tokio Marine", description: "Excelência em seguros empresariais e patrimoniais", logo: "/logos/tokio-marine.png" },
    { name: "Allianz", description: "Seguradora global com soluções completas", logo: "/logos/allianz.png" },
    { name: "Azos", description: "Seguro de vida digital, simples e acessível", logo: "/logos/azos.png" },
    { name: "Azul Seguros", description: "Seguros acessíveis com ampla cobertura", logo: "/logos/azul.png" },
    { name: "Mapfre", description: "Tradição e confiança em seguros diversos", logo: "/logos/mapfre.png" },
    { name: "HDI Seguros", description: "Especialista em seguros corporativos", logo: "/logos/hdi.png" },
    { name: "Zurich", description: "Soluções globais para riscos complexos", logo: "/logos/zurich.png" },
    { name: "Bradesco Seguros", description: "Solidez e credibilidade nacional", logo: "/logos/bradesco.png" },
    { name: "Liberty Seguros", description: "Flexibilidade e personalização", logo: "/logos/liberty.png" },
    { name: "Suhai", description: "Proteção veicular acessível", logo: "/logos/suhai.png" },
    { name: "Justos", description: "Seguro auto inteligente e digital", logo: "/logos/justos.png" },
    { name: "Darwin", description: "Inovação em seguros", logo: "/logos/darwin.png" },
    { name: "Ituran", description: "Rastreamento e proteção veicular", logo: "/logos/ituran.png" },
    { name: "SulAmérica", description: "Tradição em seguros de saúde e vida", logo: "/logos/sulamerica.png" },
    { name: "Akad", description: "Soluções inovadoras em seguros corporativos e garantias", logo: "/logos/akad.png" },
    { name: "SURA", description: "Seguros corporativos e soluções de gestão de riscos", logo: "/logos/sura.png" },
    { name: "SOMPO", description: "Seguros corporativos, agrícolas e soluções especializadas", logo: "/logos/sompo.png" },
    { name: "Itaú Seguros", description: "Solidez e inovação em seguros patrimoniais e de vida", logo: "/logos/itau.png" },
    { name: "AXA", description: "Líder global em seguros e gestão de riscos", logo: "/logos/axa.png" },
    { name: "MAG Seguros", description: "Especialista em seguros de vida e previdência", logo: "/logos/mag.png" },
    { name: "Pier", description: "Seguro digital colaborativo e transparente", logo: "/logos/pier.png" },
    { name: "Youse", description: "Seguro digital personalizável para auto, vida e residencial", logo: "/logos/youse.png" },
    { name: "Ezze Seguros", description: "Soluções em seguros patrimoniais e de responsabilidade civil", logo: "/logos/ezze.png" },
    { name: "Mitsui Sumitomo", description: "Seguradora global com expertise em seguros corporativos e patrimoniais", logo: "/logos/mitsui.png" },
  ];

  const healthPartners = [
    { name: "Bradesco Saúde", description: "Ampla rede credenciada e cobertura nacional", logo: "/logos/bradesco-saude.png" },
    { name: "Amil Saúde", description: "Planos individuais e empresariais com excelente custo-benefício", logo: "/logos/amil.png" },
    { name: "SulAmérica Saúde", description: "Tradição e qualidade em saúde suplementar", logo: "/logos/sulamerica.png" },
    { name: "Porto Saúde", description: "Inovação e tecnologia em planos de saúde", logo: "/logos/porto-saude.png" },
    { name: "HapVida/NotreDame Intermédica", description: "Rede própria e preços acessíveis", logo: "/logos/hapvida.png" },
    { name: "Prevent Senior", description: "Planos acessíveis com foco no público sênior", logo: "/logos/prevent-senior.png" },
    { name: "MedSenior", description: "Especialista em planos para a terceira idade", logo: "/logos/medsenior.png" },
    { name: "Omint", description: "Planos premium com atendimento diferenciado", logo: "/logos/omint.png" },
    { name: "Unimed", description: "Maior cooperativa médica do mundo com ampla presença nacional", logo: "/logos/unimed.png" },
  ];

  return (
    <>
      <PageMeta title="Seguradoras Parceiras" description="Conheça as seguradoras parceiras da Patro Seguros: Porto, Tokio Marine, Allianz, Bradesco, HDI, Mapfre e mais. As melhores opções do mercado para você." />
      <Header />
      <main id="main-content">
        {/* Hero */}
        <section className="gradient-hero py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-white mb-6">Nossos Parceiros</h1>
              <p className="text-xl text-white/70">
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
                <Card key={index} className="hover:shadow-lg transition-base border-2 border-[#C0C0C0] shadow-[0_0_8px_rgba(192,192,192,0.3)]">
                  <CardContent className="pt-6 flex items-start gap-4">
                    <img src={partner.logo} alt={partner.name} className="h-12 w-12 object-contain flex-shrink-0" loading="lazy" />
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-primary">{partner.name}</h3>
                      <p className="text-muted-foreground">{partner.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Operadoras de Saúde */}
            <h2 className="text-center mb-8 mt-16">Operadoras de Planos de Saúde</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {healthPartners.map((partner, index) => (
                <Card key={index} className="hover:shadow-lg transition-base border-2 border-[#C0C0C0] shadow-[0_0_8px_rgba(192,192,192,0.3)]">
                  <CardContent className="pt-6 flex items-start gap-4">
                    <img src={partner.logo} alt={partner.name} className="h-12 w-12 object-contain flex-shrink-0" loading="lazy" />
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-primary">{partner.name}</h3>
                      <p className="text-muted-foreground">{partner.description}</p>
                    </div>
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
