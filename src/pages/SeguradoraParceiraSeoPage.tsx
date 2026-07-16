import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowRight, MessageCircle, ShieldCheck, HelpCircle, MapPin, CheckCircle2, Info, Building2,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import FAQSchema from "@/components/FAQSchema";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CANONICAL_BASE_URL } from "@/lib/canonical";
import { trackCotacaoClick, trackWhatsAppClick } from "@/lib/tracking";
import {
  SEGURADORAS_PARCEIRAS,
  SEGURADORAS_PARCEIRAS_BY_SLUG,
  buildDefaultFaqs,
  AVISO_TRANSPARENCIA,
  AVISO_DISPONIBILIDADE,
} from "@/data/seguradorasParceirasSeo";

interface Props {
  slug?: string;
}

const SeguradoraParceiraSeoPage = ({ slug: propSlug }: Props) => {
  const params = useParams<{ slug: string }>();
  const slug = propSlug ?? params.slug ?? "";
  const insurer = SEGURADORAS_PARCEIRAS_BY_SLUG[slug];
  if (!insurer) return <Navigate to="/seguradoras-parceiras" replace />;

  const canonical = `${CANONICAL_BASE_URL}/${insurer.slug}`;
  const waMessage = encodeURIComponent(
    `Olá, quero cotar seguro da ${insurer.name} em Guarulhos pela Patro Seguros.`
  );
  const waUrl = `https://wa.me/551151997500?text=${waMessage}`;
  const faqs = [...insurer.faqs, ...buildDefaultFaqs(insurer.name)];

  const relacionadas = SEGURADORAS_PARCEIRAS.filter((s) => s.slug !== insurer.slug).slice(0, 4);

  // JSON-LD
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${insurer.name} em Guarulhos | Cotação pela Patro Seguros`,
    url: canonical,
    inLanguage: "pt-BR",
    isPartOf: { "@type": "WebSite", name: "Patro Seguros", url: CANONICAL_BASE_URL },
  };
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Cotação ${insurer.name} em Guarulhos pela Patro Seguros`,
    serviceType: "Corretagem de seguros / Cotação de seguros",
    provider: {
      "@type": "InsuranceAgency",
      name: "Patro Seguros",
      url: CANONICAL_BASE_URL,
      areaServed: ["Guarulhos", "São Paulo", "Grande São Paulo"],
    },
    areaServed: "Guarulhos, São Paulo e região",
    description: `Corretora parceira / intermediadora de cotações da ${insurer.name} para clientes de Guarulhos e região.`,
    url: canonical,
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

  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title={`${insurer.name} em Guarulhos | Cotação Patro`}
        description={`Cote seguros da ${insurer.name} em Guarulhos com atendimento da Patro Seguros. Compare opções para auto, residencial, empresarial, vida e outros produtos.`}
        ogImage={`${CANONICAL_BASE_URL}/images/og-seguradoras-parceiras.jpg`}
        ogImageAlt={`Cotação ${insurer.name} em Guarulhos com a Patro Seguros — corretora parceira em Guarulhos/SP com atendimento consultivo.`}
      />
      <BreadcrumbSchema
        items={[
          { name: "Início", url: `${CANONICAL_BASE_URL}/` },
          { name: "Seguradoras Parceiras", url: `${CANONICAL_BASE_URL}/seguradoras-parceiras` },
          { name: insurer.name, url: canonical },
        ]}
      />
      <FAQSchema faqs={faqs.map((f) => ({ question: f.q, answer: f.a }))} />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(webPageSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(insuranceAgencySchema)}</script>
      </Helmet>

      <Header />

      <main>
        {/* Breadcrumb visível */}
        <nav aria-label="Breadcrumb" className="container mx-auto px-4 pt-24 pb-2 text-sm text-muted-foreground">
          <ol className="flex flex-wrap gap-1">
            <li><Link to="/" className="hover:text-primary">Início</Link></li>
            <li>/</li>
            <li><Link to="/seguradoras-parceiras" className="hover:text-primary">Seguradoras Parceiras</Link></li>
            <li>/</li>
            <li aria-current="page" className="text-foreground">{insurer.name}</li>
          </ol>
        </nav>

        {/* Hero */}
        <section className="container mx-auto px-4 py-8 md:py-12">
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-3">
                <Building2 className="h-4 w-4" /> Corretora parceira • Guarulhos/SP
              </span>
              <h1 className="text-3xl md:text-5xl font-bold text-foreground leading-tight mb-4">
                {insurer.name} em Guarulhos com atendimento da Patro Seguros
              </h1>
              <p className="text-lg text-muted-foreground mb-4">
                A Patro Seguros ajuda clientes de Guarulhos, São Paulo e região a cotar seguros da{" "}
                {insurer.name} com orientação consultiva, comparação de opções e atendimento próximo.
              </p>
              <div className="flex items-start gap-2 text-xs text-muted-foreground bg-muted/50 border rounded-lg p-3 mb-6">
                <Info className="h-4 w-4 shrink-0 mt-0.5" />
                <span>
                  A Patro Seguros não é o site oficial da {insurer.name}. Atuamos como corretora
                  parceira/intermediadora de cotações.
                </span>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link to="/cotacao" onClick={() => trackCotacaoClick(`parceira_${insurer.slug}_hero`)}>
                    Cotar com a Patro <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackWhatsAppClick(`parceira_${insurer.slug}_hero`)}
                  >
                    <MessageCircle className="mr-2 h-4 w-4" /> Falar pelo WhatsApp
                  </a>
                </Button>
              </div>
            </div>

            <Card className="border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-bold">Atendimento consultivo</h2>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                  <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /> Comparação entre seguradoras parceiras</li>
                  <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /> Orientação por perfil e cobertura</li>
                  <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /> Atendimento local em Guarulhos</li>
                  <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /> Sem custo e sem compromisso</li>
                </ul>
                <Button asChild className="w-full">
                  <Link to="/cotacao" onClick={() => trackCotacaoClick(`parceira_${insurer.slug}_sidecard`)}>
                    Solicitar cotação
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Seção 1 - Sobre */}
        <section className="container mx-auto px-4 py-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Sobre a {insurer.name}</h2>
          {insurer.sobre.map((p, i) => (
            <p key={i} className="text-muted-foreground mb-4 leading-relaxed">{p}</p>
          ))}
          <ul className="mt-4 grid md:grid-cols-3 gap-3">
            {insurer.destaques.map((d, i) => (
              <li key={i} className="p-3 bg-muted/40 border rounded-lg text-sm text-muted-foreground">
                {d}
              </li>
            ))}
          </ul>
        </section>

        {/* Seção 2 - Produtos */}
        <section className="container mx-auto px-4 py-8 bg-muted/30 rounded-2xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Quais seguros da {insurer.name} a Patro pode cotar?
          </h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {insurer.produtos.map((p) => (
              <span key={p} className="px-3 py-1 rounded-full border border-primary/30 bg-background text-sm font-medium">
                {p}
              </span>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">{AVISO_DISPONIBILIDADE}</p>
        </section>

        {/* Seção 3 - Por que Patro */}
        <section className="container mx-auto px-4 py-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Por que cotar {insurer.name} com a Patro Seguros?</h2>
          <ul className="grid md:grid-cols-2 gap-3">
            {[
              "Atendimento humano e consultivo, sem robôs decidindo pelo cliente.",
              "Atendimento local em Guarulhos, com equipe que conhece a região.",
              "Comparação entre seguradoras parceiras compatíveis com o perfil.",
              "Orientação antes da contratação — coberturas, franquia, exclusões.",
              "Suporte na escolha da cobertura ideal para o cliente.",
              "Cotação e atendimento facilitados pelo WhatsApp.",
              "Experiência com seguros pessoais e empresariais.",
              "Acompanhamento próximo após a cotação e no sinistro.",
            ].map((v, i) => (
              <li key={i} className="flex gap-3 p-3 bg-background border rounded-lg">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
                <span className="text-sm">{v}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Seção 4 - Atendimento local */}
        <section className="container mx-auto px-4 py-8 bg-muted/30 rounded-2xl">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="h-5 w-5 text-primary" />
            <h2 className="text-2xl md:text-3xl font-bold">Atendimento em Guarulhos, São Paulo e região</h2>
          </div>
          <p className="text-muted-foreground mb-3">
            A Patro Seguros atende clientes de Guarulhos, São Paulo e região que desejam cotar
            seguros da {insurer.name} com orientação de uma corretora local. O atendimento pode ser
            feito online, por telefone ou WhatsApp, com foco em agilidade, clareza e escolha
            adequada ao perfil do cliente.
          </p>
          <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
            {insurer.keywords.map((k) => (
              <span key={k} className="px-2 py-1 bg-background border rounded">{k}</span>
            ))}
          </div>
        </section>

        {/* Seção 5 - Como funciona */}
        <section className="container mx-auto px-4 py-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Como funciona a cotação</h2>
          <ol className="grid md:grid-cols-2 lg:grid-cols-5 gap-3 counter-reset">
            {[
              "Cliente informa o tipo de seguro desejado.",
              "A Patro coleta dados básicos para a cotação.",
              "A equipe compara opções disponíveis nas seguradoras parceiras.",
              "Cliente recebe orientação consultiva sobre as opções.",
              "Contratação segue conforme aceitação e regras da seguradora.",
            ].map((step, i) => (
              <li key={i} className="p-4 border rounded-lg bg-background">
                <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center mb-2">
                  {i + 1}
                </div>
                <p className="text-sm text-muted-foreground">{step}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* CTA meio */}
        <section className="container mx-auto px-4 py-8">
          <div className="rounded-2xl bg-primary/5 border p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-1">Comparar {insurer.shortName} com outras seguradoras</h3>
              <p className="text-muted-foreground text-sm">Cotamos com as parceiras compatíveis com o seu perfil.</p>
            </div>
            <div className="flex gap-3 flex-wrap">
              <Button asChild>
                <Link to="/cotacao" onClick={() => trackCotacaoClick(`parceira_${insurer.slug}_mid`)}>
                  Comparar seguradoras
                </Link>
              </Button>
              <Button asChild variant="outline">
                <a href={waUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick(`parceira_${insurer.slug}_mid`)}>
                  <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Seção 6 - Aviso de transparência */}
        <section className="container mx-auto px-4 py-8">
          <div className="bg-muted/40 border rounded-2xl p-6">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-primary shrink-0 mt-1" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                {AVISO_TRANSPARENCIA(insurer.name)}
              </p>
            </div>
          </div>
        </section>

        {/* Seção 7 - FAQ */}
        <section className="container mx-auto px-4 py-8 bg-muted/30 rounded-2xl">
          <div className="flex items-center gap-2 mb-4">
            <HelpCircle className="h-6 w-6 text-primary" />
            <h2 className="text-2xl md:text-3xl font-bold">Perguntas frequentes sobre a {insurer.name}</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <details key={i} className="p-4 bg-background rounded-lg border">
                <summary className="font-semibold cursor-pointer">{f.q}</summary>
                <p className="mt-2 text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Veja também */}
        <section className="container mx-auto px-4 py-8">
          <h2 className="text-xl md:text-2xl font-bold mb-4">Veja também</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            <Link to="/seguro-auto-guarulhos" className="p-3 border rounded-lg hover:border-primary hover:bg-primary/5 transition-colors text-sm font-semibold">
              Seguro Auto Guarulhos
            </Link>
            <Link to="/seguro-empresarial-guarulhos" className="p-3 border rounded-lg hover:border-primary hover:bg-primary/5 transition-colors text-sm font-semibold">
              Seguro Empresarial
            </Link>
            <Link to="/seguro-residencial-guarulhos" className="p-3 border rounded-lg hover:border-primary hover:bg-primary/5 transition-colors text-sm font-semibold">
              Seguro Residencial
            </Link>
            <Link to="/consorcio" className="p-3 border rounded-lg hover:border-primary hover:bg-primary/5 transition-colors text-sm font-semibold">
              Consórcio
            </Link>
            <Link to="/como-comparar-seguradoras-guarulhos" className="p-3 border rounded-lg hover:border-primary hover:bg-primary/5 transition-colors text-sm font-semibold">
              Como comparar seguradoras
            </Link>
            <Link to="/contato" className="p-3 border rounded-lg hover:border-primary hover:bg-primary/5 transition-colors text-sm font-semibold">
              Falar com consultor
            </Link>
          </div>
        </section>

        {/* Compare com outras */}
        <section className="container mx-auto px-4 py-8">
          <h2 className="text-xl md:text-2xl font-bold mb-4">Compare com outras seguradoras parceiras</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {relacionadas.map((r) => (
              <Link
                key={r.slug}
                to={`/${r.slug}`}
                className="p-4 border rounded-lg hover:border-primary hover:bg-primary/5 transition-colors"
              >
                <div className="font-semibold">{r.shortName}</div>
                <div className="text-xs text-muted-foreground mt-1">Ver página</div>
              </Link>
            ))}
          </div>
          <div className="mt-4 text-sm">
            <Link to="/seguradoras-parceiras" className="text-primary hover:underline">
              ← Voltar para todas as seguradoras parceiras
            </Link>
          </div>
        </section>

        {/* CTA final */}
        <section className="container mx-auto px-4 py-10">
          <div className="rounded-2xl bg-primary text-primary-foreground p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Solicite sua cotação {insurer.name} com a Patro
            </h2>
            <p className="mb-6 opacity-90">
              Comparamos {insurer.name} com outras seguradoras parceiras conforme o seu perfil.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                <Link to="/cotacao" onClick={() => trackCotacaoClick(`parceira_${insurer.slug}_footer`)}>
                  Solicitar cotação online
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick(`parceira_${insurer.slug}_footer`)}
                >
                  <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Disclaimer final */}
        <section className="container mx-auto px-4 py-6">
          <p className="text-xs text-muted-foreground border-t pt-4">
            {AVISO_TRANSPARENCIA(insurer.name)}
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SeguradoraParceiraSeoPage;
