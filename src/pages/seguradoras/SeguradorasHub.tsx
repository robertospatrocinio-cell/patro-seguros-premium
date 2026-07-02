import { Link } from "react-router-dom";
import { ArrowRight, Scale, ShieldCheck, MapPin, HelpCircle, MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import FAQSchema from "@/components/FAQSchema";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PARTNER_INSURERS } from "@/data/partnerInsurers";
import { CANONICAL_BASE_URL } from "@/lib/canonical";
import { trackCotacaoClick, trackWhatsAppClick } from "@/lib/tracking";
import { Helmet } from "react-helmet-async";

const HUB_FAQS = [
  {
    question: "Como a Patro Seguros compara seguradoras para o cliente?",
    answer: "Recebemos seu perfil (dados básicos, veículo/imóvel/empresa, uso, CEP), rodamos a cotação com as seguradoras parceiras compatíveis e apresentamos as opções lado a lado — preço, franquia, cobertura, assistência e condições. Você decide com base em informação clara.",
  },
  {
    question: "A cotação com a Patro é gratuita?",
    answer: "Sim. A cotação é gratuita e sem compromisso — você só contrata se aprovar a proposta.",
  },
  {
    question: "Por que comparar seguradoras antes de contratar?",
    answer: "Cada seguradora tem apetite e tabela diferentes conforme perfil, veículo, região, empresa, idade, cobertura e histórico. A mesma pessoa pode receber preços muito diferentes na Porto, Tokio, Azul e HDI para o mesmo carro — daí a importância de comparar.",
  },
  {
    question: "A Patro é parceira oficial das seguradoras?",
    answer: "A Patro é uma corretora regulada pela SUSEP e realiza cotações com diferentes seguradoras conforme disponibilidade e perfil do cliente. As marcas citadas pertencem aos seus respectivos titulares.",
  },
  {
    question: "O atendimento é presencial em Guarulhos?",
    answer: "Sim. Atendemos presencialmente em Guarulhos (Cidade Maia) e remotamente em toda a Grande São Paulo, com equipe consultiva por telefone, WhatsApp e e-mail.",
  },
  {
    question: "A Patro ajuda em caso de sinistro?",
    answer: "Sim, apoiamos toda a jornada — abertura, envio de documentos, acompanhamento e comunicação com a seguradora. A análise técnica é sempre da seguradora, mas facilitamos o processo.",
  },
];

const SeguradorasHub = () => {
  const canonical = `${CANONICAL_BASE_URL}/seguradoras`;
  const waMessage = encodeURIComponent("Olá, quero comparar seguradoras com a Patro Seguros em Guarulhos.");
  const waUrl = `https://wa.me/551151997500?text=${waMessage}`;

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Seguradoras parceiras em Guarulhos — Patro Seguros",
    url: canonical,
    description:
      "Hub de comparação de seguradoras parceiras da Patro Seguros para clientes de Guarulhos e região.",
    isPartOf: {
      "@type": "WebSite",
      name: "Patro Seguros",
      url: CANONICAL_BASE_URL,
    },
    hasPart: PARTNER_INSURERS.map((i) => ({
      "@type": "WebPage",
      name: `${i.name} em Guarulhos`,
      url: `${CANONICAL_BASE_URL}/seguradoras/${i.slug}`,
    })),
  };

  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title="Seguradoras Parceiras em Guarulhos | Patro Seguros"
        description="Compare seguradoras em Guarulhos com a Patro Seguros. Cotação consultiva para seguro auto, residencial, vida, saúde, empresarial, frota e consórcio."
      />
      <BreadcrumbSchema
        items={[
          { name: "Início", url: `${CANONICAL_BASE_URL}/` },
          { name: "Seguradoras", url: canonical },
        ]}
      />
      <FAQSchema faqs={HUB_FAQS} />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(collectionSchema)}</script>
      </Helmet>

      <Header />

      <main>
        <nav aria-label="Breadcrumb" className="container mx-auto px-4 pt-24 pb-2 text-sm text-muted-foreground">
          <ol className="flex flex-wrap gap-1">
            <li><Link to="/" className="hover:text-primary">Início</Link></li>
            <li>/</li>
            <li aria-current="page" className="text-foreground">Seguradoras</li>
          </ol>
        </nav>

        {/* Hero */}
        <section className="container mx-auto px-4 py-8 md:py-12">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-3">
            Corretora consultiva • Guarulhos
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-foreground leading-tight mb-4 max-w-4xl">
            Seguradoras parceiras da Patro Seguros em Guarulhos
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mb-6">
            A Patro compara seguradoras para você — preço, cobertura, franquia, assistência e condições —
            e ajuda a contratar a melhor opção de seguro conforme o seu perfil, o veículo, o imóvel ou a empresa.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
              <Link to="/cotacao" onClick={() => trackCotacaoClick("seguradoras_hub_hero")}>
                Comparar seguradoras agora <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("seguradoras_hub_hero")}
              >
                <MessageCircle className="mr-2 h-4 w-4" /> Falar no WhatsApp
              </a>
            </Button>
          </div>
        </section>

        {/* Como comparamos */}
        <section className="container mx-auto px-4 py-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Como a Patro compara seguradoras para você</h2>
          <p className="text-muted-foreground mb-6 max-w-3xl">
            Cada seguradora tem apetite e tabela diferentes para o mesmo perfil. Uma cotação que parece "boa"
            isolada pode estar 20–30% mais cara do que a melhor opção do mercado — ou vir com cobertura menor.
            Por isso o trabalho da Patro é analítico:
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-5">
                <ShieldCheck className="h-6 w-6 text-primary mb-2" />
                <h3 className="font-bold mb-1">1. Perfil e uso</h3>
                <p className="text-sm text-muted-foreground">Coletamos dados essenciais — idade, CEP, veículo/imóvel/empresa, uso, histórico — para direcionar a cotação para as seguradoras certas.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <Scale className="h-6 w-6 text-primary mb-2" />
                <h3 className="font-bold mb-1">2. Comparação técnica</h3>
                <p className="text-sm text-muted-foreground">Cotamos com as seguradoras parceiras compatíveis e comparamos preço, franquia, cobertura, assistência e condições lado a lado.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <MapPin className="h-6 w-6 text-primary mb-2" />
                <h3 className="font-bold mb-1">3. Orientação local</h3>
                <p className="text-sm text-muted-foreground">Explicamos particularidades de Guarulhos — bairros, sinistralidade, uso profissional, aceitação — que impactam a decisão.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Por que comparar */}
        <section className="container mx-auto px-4 py-8 bg-muted/30 rounded-2xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Por que comparar seguradoras antes de contratar?</h2>
          <div className="grid md:grid-cols-2 gap-4 text-muted-foreground">
            <p>Não existe "melhor seguradora" universal. Existe a melhor seguradora <strong>para o seu perfil</strong>, na <strong>sua região</strong>, no <strong>seu tipo de uso</strong>. A Porto pode ser ótima para o vizinho e ruim para você. A Suhai pode ser a única alternativa viável para uma moto em delivery — e completamente desnecessária para um sedan com bom histórico.</p>
            <p>Comparar significa evitar pagar caro por uma cobertura que você não precisa, e evitar economizar em algo que você vai lamentar em caso de sinistro. É o que fazemos em cada cotação, sem custo, e explicando cada decisão.</p>
          </div>
        </section>

        {/* Cards de seguradoras */}
        <section className="container mx-auto px-4 py-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Seguradoras para seguro auto, residencial, vida e empresa</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PARTNER_INSURERS.map((i) => (
              <Card key={i.slug} className="hover:border-primary transition-colors">
                <CardContent className="p-5">
                  <h3 className="text-lg font-bold mb-1">{i.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{i.foco}</p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {i.tipos.slice(0, 4).map((t) => (
                      <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-muted">{t}</span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button asChild size="sm" variant="outline" className="flex-1">
                      <Link to={`/seguradoras/${i.slug}`}>Ver página</Link>
                    </Button>
                    <Button asChild size="sm" className="flex-1">
                      <Link to="/cotacao" onClick={() => trackCotacaoClick(`hub_card_${i.slug}`)}>Cotar</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Links por produto */}
        <section className="container mx-auto px-4 py-8 bg-primary/5 rounded-2xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Explore seguros por tipo</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
            <Link to="/seguro-auto" className="p-3 bg-background rounded-lg hover:border-primary border">Seguro Auto</Link>
            <Link to="/seguro-empresarial" className="p-3 bg-background rounded-lg hover:border-primary border">Seguro Empresarial</Link>
            <Link to="/seguro-residencial" className="p-3 bg-background rounded-lg hover:border-primary border">Seguro Residencial</Link>
            <Link to="/seguro-vida" className="p-3 bg-background rounded-lg hover:border-primary border">Seguro de Vida</Link>
            <Link to="/seguro-saude" className="p-3 bg-background rounded-lg hover:border-primary border">Plano de Saúde</Link>
            <Link to="/consorcio" className="p-3 bg-background rounded-lg hover:border-primary border">Consórcio</Link>
          </div>
        </section>

        {/* Atendimento local */}
        <section className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="h-5 w-5 text-primary" />
            <h2 className="text-2xl md:text-3xl font-bold">Atendimento em Guarulhos e região</h2>
          </div>
          <p className="text-muted-foreground max-w-3xl">
            Atendemos presencialmente em Guarulhos (Cidade Maia) e remotamente em toda a Grande São Paulo.
            Falamos a linguagem local — considerando particularidades de Cidade Maia, Vila Galvão, Vila Augusta,
            Bonsucesso, Cumbica, Pimentas, Centro, Taboão, Jardim São João e Gopouva, que impactam diretamente a
            cotação das seguradoras parceiras.
          </p>
        </section>

        {/* FAQ */}
        <section className="container mx-auto px-4 py-8 bg-muted/30 rounded-2xl">
          <div className="flex items-center gap-2 mb-4">
            <HelpCircle className="h-6 w-6 text-primary" />
            <h2 className="text-2xl md:text-3xl font-bold">Perguntas frequentes sobre seguradoras parceiras</h2>
          </div>
          <div className="space-y-3">
            {HUB_FAQS.map((f, i) => (
              <details key={i} className="p-4 bg-background rounded-lg border">
                <summary className="font-semibold cursor-pointer">{f.question}</summary>
                <p className="mt-2 text-muted-foreground">{f.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA final */}
        <section className="container mx-auto px-4 py-10">
          <div className="rounded-2xl bg-primary text-primary-foreground p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Solicite sua cotação</h2>
            <p className="mb-6 opacity-90">Comparamos as seguradoras parceiras para o seu perfil em uma única cotação consultiva.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                <Link to="/cotacao" onClick={() => trackCotacaoClick("hub_footer")}>Solicitar cotação online</Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <a href={waUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick("hub_footer")}>
                  <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="container mx-auto px-4 py-6">
          <p className="text-xs text-muted-foreground border-t pt-4">
            As seguradoras mencionadas são marcas de seus respectivos titulares. A disponibilidade de cotação,
            aceitação, coberturas e condições depende da análise de cada seguradora. A Patro Seguros atua como
            corretora, orientando o cliente na comparação de opções de seguro.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SeguradorasHub;
