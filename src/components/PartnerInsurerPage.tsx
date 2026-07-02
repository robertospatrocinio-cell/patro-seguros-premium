import { useParams, Link, Navigate } from "react-router-dom";
import { MessageCircle, ArrowRight, ShieldCheck, Scale, MapPin, HelpCircle, CheckCircle2, AlertTriangle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import FAQSchema from "@/components/FAQSchema";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PARTNER_INSURERS_BY_SLUG, PARTNER_INSURERS } from "@/data/partnerInsurers";
import { CANONICAL_BASE_URL } from "@/lib/canonical";
import { trackWhatsAppClick, trackCotacaoClick } from "@/lib/tracking";
import { Helmet } from "react-helmet-async";

/**
 * Página individual consultiva por seguradora parceira.
 * Roteada em `/seguradoras/:slug` — slug ex.: `porto-seguro-guarulhos`.
 */
const PartnerInsurerPage = () => {
  const { slug = "" } = useParams<{ slug: string }>();
  const insurer = PARTNER_INSURERS_BY_SLUG[slug];
  if (!insurer) return <Navigate to="/seguradoras" replace />;

  const canonical = `${CANONICAL_BASE_URL}/seguradoras/${insurer.slug}`;
  const waMessage = encodeURIComponent(`Olá, quero cotar ${insurer.name} com a Patro Seguros em Guarulhos.`);
  const waUrl = `https://wa.me/551151997500?text=${waMessage}`;

  const relacionadas = PARTNER_INSURERS.filter((i) => i.slug !== insurer.slug).slice(0, 4);

  // Service schema — provider Patro, sobre a seguradora citada
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Cotação ${insurer.name} em Guarulhos`,
    serviceType: "Corretagem de seguros",
    provider: {
      "@type": "InsuranceAgency",
      name: "Patro Seguros",
      url: CANONICAL_BASE_URL,
      areaServed: ["Guarulhos", "São Paulo", "Grande São Paulo"],
    },
    areaServed: ["Guarulhos", "São Paulo", "Grande São Paulo"],
    description: `Cotação consultiva de seguros ${insurer.name} em Guarulhos com comparação entre seguradoras parceiras.`,
    url: canonical,
  };

  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title={`${insurer.name} em Guarulhos | Cotação com a Patro Seguros`}
        description={`Cote ${insurer.name} em Guarulhos com orientação da Patro Seguros. Compare coberturas, preço, assistência e condições antes de contratar.`}
      />
      <BreadcrumbSchema
        items={[
          { name: "Início", url: `${CANONICAL_BASE_URL}/` },
          { name: "Seguradoras", url: `${CANONICAL_BASE_URL}/seguradoras` },
          { name: insurer.name, url: canonical },
        ]}
      />
      <FAQSchema faqs={insurer.faqs.map((f) => ({ question: f.q, answer: f.a }))} />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
      </Helmet>

      <Header />

      <main>
        {/* Breadcrumb visível */}
        <nav aria-label="Breadcrumb" className="container mx-auto px-4 pt-24 pb-2 text-sm text-muted-foreground">
          <ol className="flex flex-wrap gap-1">
            <li><Link to="/" className="hover:text-primary">Início</Link></li>
            <li>/</li>
            <li><Link to="/seguradoras" className="hover:text-primary">Seguradoras</Link></li>
            <li>/</li>
            <li aria-current="page" className="text-foreground">{insurer.name}</li>
          </ol>
        </nav>

        {/* Hero */}
        <section className="container mx-auto px-4 py-8 md:py-12">
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-3">
                Seguradora parceira • Guarulhos
              </span>
              <h1 className="text-3xl md:text-5xl font-bold text-foreground leading-tight mb-4">
                Cotação {insurer.name} em Guarulhos com a Patro Seguros
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                A Patro Seguros ajuda você a entender se a {insurer.name} é uma boa opção para o seu perfil,
                comparando coberturas, preço, assistência, franquia e condições com outras seguradoras parceiras.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                  <Link to="/cotacao" onClick={() => trackCotacaoClick(`partner_${insurer.slug}_hero`)}>
                    Cotar {insurer.shortName} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackWhatsAppClick(`partner_${insurer.slug}_hero`)}
                  >
                    <MessageCircle className="mr-2 h-4 w-4" /> Cotar pelo WhatsApp
                  </a>
                </Button>
              </div>
            </div>

            <Card className="border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-bold">Cotação consultiva</h2>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                  <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /> Comparação com outras seguradoras</li>
                  <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /> Análise por perfil e cobertura</li>
                  <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /> Atendimento local em Guarulhos</li>
                  <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /> Sem custo e sem compromisso</li>
                </ul>
                <Button asChild className="w-full">
                  <Link to="/cotacao" onClick={() => trackCotacaoClick(`partner_${insurer.slug}_sidecard`)}>
                    Solicitar cotação
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Sobre */}
        <section className="container mx-auto px-4 py-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Sobre a {insurer.name}</h2>
          {insurer.sobre.map((p, i) => (
            <p key={i} className="text-muted-foreground mb-4 leading-relaxed">{p}</p>
          ))}
        </section>

        {/* Tipos de seguros */}
        <section className="container mx-auto px-4 py-8 bg-muted/30 rounded-2xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Quais seguros podem ser cotados com a {insurer.name}</h2>
          <p className="text-muted-foreground mb-4">{insurer.tiposDetalhes}</p>
          <div className="flex flex-wrap gap-2">
            {insurer.tipos.map((t) => (
              <span key={t} className="px-3 py-1 rounded-full border border-primary/30 bg-background text-sm font-medium">
                Seguro {t}
              </span>
            ))}
          </div>
        </section>

        {/* Perfis */}
        <section className="container mx-auto px-4 py-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Para quais perfis a {insurer.name} pode ser interessante?</h2>
          <ul className="space-y-3">
            {insurer.perfis.map((p, i) => (
              <li key={i} className="flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-1" />
                <span className="text-muted-foreground">{p}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* O que comparar */}
        <section className="container mx-auto px-4 py-8 bg-muted/30 rounded-2xl">
          <div className="flex items-center gap-2 mb-4">
            <Scale className="h-6 w-6 text-primary" />
            <h2 className="text-2xl md:text-3xl font-bold">O que comparar antes de contratar</h2>
          </div>
          <p className="text-muted-foreground mb-4">
            Preço isolado engana. Antes de fechar uma apólice da {insurer.name}, vale olhar cada ponto abaixo em conjunto
            com pelo menos mais duas seguradoras parceiras:
          </p>
          <ul className="grid md:grid-cols-2 gap-3">
            {insurer.pontosComparar.map((p, i) => (
              <li key={i} className="flex gap-3 p-3 bg-background rounded-lg border">
                <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-1" />
                <span className="text-sm">{p}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Vantagens x Limitações */}
        <section className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl md:text-2xl font-bold mb-3 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" /> Vantagens possíveis
              </h2>
              <ul className="space-y-2">
                {insurer.vantagens.map((v, i) => (
                  <li key={i} className="text-muted-foreground">• {v}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold mb-3 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-secondary" /> Limitações e cuidados
              </h2>
              <ul className="space-y-2">
                {insurer.limitacoes.map((v, i) => (
                  <li key={i} className="text-muted-foreground">• {v}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Como a Patro ajuda */}
        <section className="container mx-auto px-4 py-8 bg-primary/5 rounded-2xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Como a Patro Seguros ajuda na cotação {insurer.name}</h2>
          <p className="text-muted-foreground mb-3">
            A Patro é uma corretora — nosso papel não é vender a {insurer.name}, é ajudar você a decidir se ela é a melhor
            opção para o seu caso. Na prática, isso significa:
          </p>
          <ul className="space-y-2 text-muted-foreground mb-6">
            <li>• Cotamos a {insurer.name} junto com outras seguradoras parceiras compatíveis com o seu perfil.</li>
            <li>• Explicamos as diferenças de cobertura, franquia, assistência e serviços agregados.</li>
            <li>• Orientamos sobre pontos que impactam preço (rastreador, garagem, uso profissional, CEP).</li>
            <li>• Acompanhamos toda a jornada: contratação, endossos e sinistro, se necessário.</li>
          </ul>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/cotacao" onClick={() => trackCotacaoClick(`partner_${insurer.slug}_help`)}>
                Comparar {insurer.shortName} com outras seguradoras
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/contato">Falar com consultor</Link>
            </Button>
          </div>
        </section>

        {/* Atendimento local */}
        <section className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="h-5 w-5 text-primary" />
            <h2 className="text-2xl md:text-3xl font-bold">Atendimento em Guarulhos e região</h2>
          </div>
          <p className="text-muted-foreground">
            A Patro Seguros atende presencialmente em Guarulhos (Cidade Maia) e remotamente em toda a Grande São Paulo.
            Falamos a linguagem de quem mora, trabalha ou empreende na cidade — considerando particularidades de bairros
            (Cidade Maia, Vila Galvão, Vila Augusta, Bonsucesso, Cumbica, Pimentas, Centro, Taboão, Jardim São João, Gopouva)
            que impactam diretamente a cotação da {insurer.name} e das demais seguradoras.
          </p>
        </section>

        {/* FAQ */}
        <section className="container mx-auto px-4 py-8 bg-muted/30 rounded-2xl">
          <div className="flex items-center gap-2 mb-4">
            <HelpCircle className="h-6 w-6 text-primary" />
            <h2 className="text-2xl md:text-3xl font-bold">Perguntas frequentes sobre a {insurer.name}</h2>
          </div>
          <div className="space-y-3">
            {insurer.faqs.map((f, i) => (
              <details key={i} className="p-4 bg-background rounded-lg border">
                <summary className="font-semibold cursor-pointer">{f.q}</summary>
                <p className="mt-2 text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA final */}
        <section className="container mx-auto px-4 py-10">
          <div className="rounded-2xl bg-primary text-primary-foreground p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Solicite sua cotação {insurer.name}</h2>
            <p className="mb-6 opacity-90">
              Comparamos {insurer.name} com outras seguradoras parceiras para o seu perfil, com preço, franquia e cobertura lado a lado.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                <Link to="/cotacao" onClick={() => trackCotacaoClick(`partner_${insurer.slug}_footer`)}>
                  Solicitar cotação online
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <a href={waUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick(`partner_${insurer.slug}_footer`)}>
                  <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Seguradoras relacionadas */}
        <section className="container mx-auto px-4 py-8">
          <h2 className="text-xl md:text-2xl font-bold mb-4">Compare com outras seguradoras</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {relacionadas.map((r) => (
              <Link
                key={r.slug}
                to={`/seguradoras/${r.slug}`}
                className="p-4 border rounded-lg hover:border-primary hover:bg-primary/5 transition-colors"
              >
                <div className="font-semibold">{r.shortName}</div>
                <div className="text-xs text-muted-foreground mt-1">Ver página</div>
              </Link>
            ))}
          </div>
          <div className="mt-4 text-sm">
            <Link to="/seguradoras" className="text-primary hover:underline">← Voltar para todas as seguradoras parceiras</Link>
          </div>
        </section>

        {/* Disclaimer legal */}
        <section className="container mx-auto px-4 py-6">
          <p className="text-xs text-muted-foreground border-t pt-4">
            As seguradoras mencionadas são marcas de seus respectivos titulares. A disponibilidade de cotação, aceitação,
            coberturas e condições depende da análise de cada seguradora. A Patro Seguros atua como corretora, orientando
            o cliente na comparação de opções de seguro. A Patro Seguros realiza cotações com diferentes seguradoras,
            conforme disponibilidade e perfil do cliente.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PartnerInsurerPage;
