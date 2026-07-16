import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight, MessageCircle, ShieldCheck, HelpCircle, Building2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import FAQSchema from "@/components/FAQSchema";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CANONICAL_BASE_URL } from "@/lib/canonical";
import { trackCotacaoClick, trackWhatsAppClick } from "@/lib/tracking";
import { SEGURADORAS_PARCEIRAS, AVISO_MARCAS } from "@/data/seguradorasParceirasSeo";

const CANONICAL = `${CANONICAL_BASE_URL}/seguradoras-parceiras`;

const HUB_FAQS = [
  {
    question: "A Patro Seguros é o site oficial de alguma dessas seguradoras?",
    answer:
      "Não. A Patro Seguros é uma corretora independente e atua como parceira/intermediadora de cotações junto às seguradoras listadas. As marcas, nomes e logotipos pertencem aos seus respectivos titulares.",
  },
  {
    question: "Como a Patro trabalha com as seguradoras parceiras?",
    answer:
      "Recebemos o perfil do cliente, cotamos com as seguradoras parceiras compatíveis com aquele risco e apresentamos as opções lado a lado — coberturas, franquia, assistência e condições. A contratação segue as regras de cada seguradora.",
  },
  {
    question: "A cotação com a Patro é gratuita?",
    answer: "Sim. A cotação é gratuita e sem compromisso — você só contrata se aprovar a proposta.",
  },
  {
    question: "Posso comparar várias seguradoras em uma única cotação?",
    answer:
      "Sim. Sempre que houver mais de uma seguradora com apetite para o perfil, apresentamos comparativo entre elas para você decidir com informação clara.",
  },
  {
    question: "A Patro atende em Guarulhos e São Paulo?",
    answer:
      "Sim. Atendemos presencialmente em Guarulhos (Cidade Maia) e remotamente em toda a Grande São Paulo, por telefone, WhatsApp e e-mail.",
  },
];

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Seguradoras Parceiras em Guarulhos | Patro Seguros",
  url: CANONICAL,
  description:
    "Página central das seguradoras parceiras da Patro Seguros em Guarulhos e região.",
  isPartOf: {
    "@type": "WebSite",
    name: "Patro Seguros",
    url: CANONICAL_BASE_URL,
  },
  hasPart: SEGURADORAS_PARCEIRAS.map((s) => ({
    "@type": "WebPage",
    name: `${s.name} em Guarulhos`,
    url: `${CANONICAL_BASE_URL}/${s.slug}`,
  })),
};

const insuranceAgencySchema = {
  "@context": "https://schema.org",
  "@type": "InsuranceAgency",
  name: "Patro Seguros",
  url: CANONICAL_BASE_URL,
  areaServed: ["Guarulhos", "São Paulo", "Grande São Paulo"],
  telephone: "+551151997500",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Av. Salgado Filho, 2120 - Sala 219",
    addressLocality: "Guarulhos",
    addressRegion: "SP",
    postalCode: "07115-000",
    addressCountry: "BR",
  },
};

const waMessage = encodeURIComponent(
  "Olá, quero comparar seguradoras parceiras da Patro Seguros em Guarulhos."
);
const WA_URL = `https://wa.me/551151997500?text=${waMessage}`;

const SeguradorasParceirasHub = () => {
  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title="Seguradoras Parceiras em Guarulhos"
        description="Conheça as seguradoras parceiras da Patro Seguros em Guarulhos e região. Cote Porto Seguro, Mapfre, Allianz, Tokio Marine, Azul, Suhai e outras."
        ogImage={`${CANONICAL_BASE_URL}/images/og-seguradoras-parceiras.jpg`}
        ogImageAlt="Seguradoras parceiras da Patro Seguros — corretora em Guarulhos/SP com cotação Porto Seguro, Mapfre, Allianz, Tokio Marine, Azul e outras."
      
      skipBreadcrumb
    />
      <BreadcrumbSchema
        items={[
          { name: "Início", url: `${CANONICAL_BASE_URL}/` },
          { name: "Seguradoras Parceiras", url: CANONICAL },
        ]}
      />
      <FAQSchema faqs={HUB_FAQS} />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(collectionSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(insuranceAgencySchema)}</script>
      </Helmet>

      <Header />

      <main>
        <nav aria-label="Breadcrumb" className="container mx-auto px-4 pt-24 pb-2 text-sm text-muted-foreground">
          <ol className="flex flex-wrap gap-1">
            <li><Link to="/" className="hover:text-primary">Início</Link></li>
            <li>/</li>
            <li aria-current="page" className="text-foreground">Seguradoras Parceiras</li>
          </ol>
        </nav>

        {/* Hero */}
        <section className="container mx-auto px-4 py-10 md:py-16">
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
              <Building2 className="h-4 w-4" /> Corretora parceira • Guarulhos/SP
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground leading-tight mb-4">
              Seguradoras parceiras da Patro Seguros
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              A Patro Seguros trabalha com grandes seguradoras do mercado para ajudar clientes de
              Guarulhos, São Paulo e região a comparar opções e contratar seguros com atendimento
              consultivo.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/cotacao" onClick={() => trackCotacaoClick("parceiras_hub_hero")}>
                  Cotar com a Patro <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={WA_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick("parceiras_hub_hero")}>
                  <MessageCircle className="mr-2 h-4 w-4" /> Falar pelo WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Explicação padrão */}
        <section className="container mx-auto px-4 pb-10">
          <div className="bg-muted/40 border rounded-2xl p-6 md:p-8">
            <div className="flex items-start gap-3">
              <ShieldCheck className="h-6 w-6 text-primary shrink-0 mt-1" />
              <p className="text-muted-foreground leading-relaxed">
                A Patro Seguros atua como corretora de seguros e parceira comercial de seguradoras
                reconhecidas no mercado. As marcas mencionadas pertencem às respectivas seguradoras.
                A Patro <strong>não é o site oficial</strong> dessas companhias, mas pode intermediar
                cotações, orientar clientes e apoiar na escolha da melhor opção conforme perfil,
                produto e aceitação da seguradora.
              </p>
            </div>
          </div>
        </section>

        {/* Grid de seguradoras */}
        <section className="container mx-auto px-4 py-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Seguradoras que a Patro pode cotar</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SEGURADORAS_PARCEIRAS.map((s) => (
              <Card key={s.slug} className="hover:border-primary transition-colors">
                <CardContent className="p-5 flex flex-col h-full">
                  <h3 className="text-lg font-bold mb-2">{s.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-3">{s.tagline}</p>
                  <div className="text-xs text-muted-foreground mb-4">
                    <strong className="text-foreground">Produtos:</strong> {s.produtos.slice(0, 4).join(", ")}
                    {s.produtos.length > 4 ? "…" : ""}
                  </div>
                  <div className="mt-auto flex flex-wrap gap-2">
                    <Button asChild size="sm">
                      <Link
                        to={`/${s.slug}`}
                        onClick={() => trackCotacaoClick(`parceiras_hub_card_${s.slug}`)}
                      >
                        Cotar com a Patro <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                    <Button asChild size="sm" variant="outline">
                      <Link to={`/${s.slug}`}>Ver página</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Como a Patro trabalha */}
        <section className="container mx-auto px-4 py-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Como a Patro trabalha com seguradoras parceiras</h2>
          <div className="grid md:grid-cols-2 gap-6 text-muted-foreground">
            <p>
              Como corretora regulada pela SUSEP, a Patro Seguros representa o cliente, não a
              seguradora. Isso significa que analisamos seu perfil, cotamos com as seguradoras
              parceiras compatíveis e explicamos as diferenças — preço, franquia, cobertura,
              assistência e serviços agregados — antes da contratação.
            </p>
            <p>
              Trabalhamos com marcas conhecidas do mercado brasileiro em seguro auto, residencial,
              vida, empresarial, frota, saúde, garantia e responsabilidade civil. A disponibilidade
              dos produtos e a aceitação do risco seguem sempre as regras da própria seguradora.
            </p>
          </div>
          <div className="mt-6 text-sm">
            <Link to="/como-comparar-seguradoras-guarulhos" className="text-primary hover:underline font-medium">
              Guia: como escolher e comparar seguradoras em Guarulhos →
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="container mx-auto px-4 py-8 bg-muted/30 rounded-2xl">
          <div className="flex items-center gap-2 mb-4">
            <HelpCircle className="h-6 w-6 text-primary" />
            <h2 className="text-2xl md:text-3xl font-bold">Perguntas frequentes</h2>
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
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Compare seguradoras com a Patro</h2>
            <p className="mb-6 opacity-90">
              Cotamos com as seguradoras parceiras compatíveis com o seu perfil e apresentamos as opções
              lado a lado, com atendimento consultivo em Guarulhos.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                <Link to="/cotacao" onClick={() => trackCotacaoClick("parceiras_hub_footer")}>
                  Solicitar cotação
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <a href={WA_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick("parceiras_hub_footer")}>
                  <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="container mx-auto px-4 py-6">
          <p className="text-xs text-muted-foreground border-t pt-4">{AVISO_MARCAS}</p>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SeguradorasParceirasHub;
