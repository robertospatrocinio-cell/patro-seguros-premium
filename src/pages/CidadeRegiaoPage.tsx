import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { MapPin, Phone, Mail, Clock, Building2, ArrowRight, CheckCircle2, MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import FAQSchema from "@/components/FAQSchema";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { EMPRESA, ENDERECO_LINHA, TELEFONE_DIGITS } from "@/config/empresa";
import { CANONICAL_BASE_URL } from "@/lib/canonical";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { trackWhatsAppClick } from "@/lib/tracking";
import {
  getCidadeRegiao,
  cidadesRegiao,
  cidadeRegiaoPath,
  CIDADES_REGIAO_HUB_PATH,
  type CidadeRegiao,
} from "@/data/cidadesRegiao";

const MAPS_URL = EMPRESA.redesSociais.google;

const CidadeRegiaoPage = () => {
  const { cidade } = useParams<{ cidade: string }>();
  const data = getCidadeRegiao(cidade);

  if (!data) return <Navigate to="/404" replace />;

  return <CidadeRegiaoContent data={data} />;
};

const CidadeRegiaoContent = ({ data }: { data: CidadeRegiao }) => {
  const url = `${CANONICAL_BASE_URL}${cidadeRegiaoPath(data.slug)}`;
  const isSede = data.slug === "guarulhos";

  const whatsappUrl = buildWhatsAppUrl({
    origem: `cidade-${data.slug}`,
    extraLines: [`Sou de ${data.nome}/${data.uf} e gostaria de uma cotação.`],
  });

  /**
   * LocalBusiness da unidade física (NAP completo + geo + horário).
   * O `@id` é próprio da página para não colidir com o `#insurance-agency`
   * global emitido em index.html.
   */
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${url}#localbusiness`,
    name: `${EMPRESA.nomeFantasia} — Corretora de Seguros em ${data.nome}`,
    legalName: EMPRESA.razaoSocial,
    description: `Corretora de seguros que atende ${data.nome}/${data.uf}. ${data.resumo}`,
    url,
    telephone: EMPRESA.telefoneE164,
    email: EMPRESA.email,
    image: `${CANONICAL_BASE_URL}/images/og-cover.webp`,
    hasMap: MAPS_URL,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: `${EMPRESA.endereco.logradouro}, ${EMPRESA.endereco.numero} — ${EMPRESA.endereco.complemento}`,
      addressLocality: EMPRESA.endereco.cidade,
      addressRegion: EMPRESA.endereco.estadoSigla,
      postalCode: EMPRESA.endereco.cep,
      addressCountry: "BR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: EMPRESA.geo.latitude,
      longitude: EMPRESA.geo.longitude,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:30",
        closes: "18:00",
      },
    ],
    areaServed: {
      "@type": "City",
      name: data.nome,
      address: {
        "@type": "PostalAddress",
        addressLocality: data.nome,
        addressRegion: data.uf,
        addressCountry: "BR",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: data.geo.latitude,
        longitude: data.geo.longitude,
      },
    },
    sameAs: [
      EMPRESA.redesSociais.google,
      EMPRESA.redesSociais.instagram,
      EMPRESA.redesSociais.facebook,
      EMPRESA.redesSociais.linkedin,
    ],
  };

  const outrasCidades = cidadesRegiao.filter((c) => c.slug !== data.slug).slice(0, 6);

  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title={`Corretora de Seguros em ${data.nome} | Patro Seguros`}
        absoluteTitle
        description={`Corretora de seguros atendendo ${data.nome}/${data.uf}. ${data.resumo} Cotação comparada em ${EMPRESA.metricas.seguradorasParceiras} seguradoras, endereço e telefone para contato.`}
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
      </Helmet>
      <FAQSchema faqs={data.faqs.map((f) => ({ question: f.pergunta, answer: f.resposta }))} />

      <Header />

      <main id="main-content">
        {/* Hero */}
        <section className="pt-32 pb-16 bg-primary text-primary-foreground" aria-labelledby="cidade-hero-heading">
          <div className="container mx-auto px-4 max-w-5xl">
            <nav aria-label="Você está aqui" className="text-sm opacity-90 mb-6">
              <Link to="/" className="hover:underline">Início</Link>
              <span className="mx-2">/</span>
              <Link to={CIDADES_REGIAO_HUB_PATH} className="hover:underline">Cidades atendidas</Link>
              <span className="mx-2">/</span>
              <span>{data.nome}</span>
            </nav>
            <p className="inline-flex items-center gap-2 text-sm font-medium bg-primary-foreground/10 rounded-full px-4 py-1.5 mb-5">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              {data.regiao}
            </p>
            <h1 id="cidade-hero-heading" className="text-3xl md:text-5xl font-bold leading-tight mb-4">
              Corretora de Seguros em {data.nome}
            </h1>
            <p className="text-lg md:text-xl opacity-95 max-w-3xl">{data.intro}</p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Button asChild size="lg" variant="secondary">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick(`cidade-${data.slug}`)}
                >
                  <MessageCircle className="h-5 w-5" aria-hidden="true" />
                  Falar no WhatsApp
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10">
                <a href={`tel:+55${TELEFONE_DIGITS}`}>
                  <Phone className="h-5 w-5" aria-hidden="true" />
                  {EMPRESA.telefone}
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* NAP */}
        <section className="py-16" aria-labelledby="nap-heading">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 id="nap-heading" className="text-2xl md:text-3xl font-bold mb-3">
              Onde estamos e como falar com a gente
            </h2>
            <p className="text-muted-foreground mb-8 max-w-3xl">
              O atendimento a {data.nome} é feito a partir do nosso escritório em Guarulhos
              {isSede ? "" : ` (${data.distancia})`}, presencialmente ou por WhatsApp, telefone e videochamada.
            </p>

            <Card>
              <CardContent className="p-6 md:p-8 grid gap-6 md:grid-cols-2">
                <div className="space-y-5">
                  <div className="flex gap-3">
                    <Building2 className="h-5 w-5 text-primary shrink-0 mt-1" aria-hidden="true" />
                    <div>
                      <p className="font-semibold">{EMPRESA.nomeFantasia}</p>
                      <p className="text-sm text-muted-foreground">{EMPRESA.razaoSocial}</p>
                      <p className="text-sm text-muted-foreground">CNPJ {EMPRESA.cnpj} · SUSEP {EMPRESA.susep}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <MapPin className="h-5 w-5 text-primary shrink-0 mt-1" aria-hidden="true" />
                    <address className="not-italic text-sm leading-relaxed">
                      {ENDERECO_LINHA}
                      <br />
                      CEP {EMPRESA.endereco.cep} — {EMPRESA.endereco.pais}
                    </address>
                  </div>
                  <div className="flex gap-3">
                    <Phone className="h-5 w-5 text-primary shrink-0 mt-1" aria-hidden="true" />
                    <a href={`tel:+55${TELEFONE_DIGITS}`} className="text-sm hover:underline">
                      {EMPRESA.telefone}
                    </a>
                  </div>
                  <div className="flex gap-3">
                    <Mail className="h-5 w-5 text-primary shrink-0 mt-1" aria-hidden="true" />
                    <a href={`mailto:${EMPRESA.email}`} className="text-sm hover:underline">
                      {EMPRESA.email}
                    </a>
                  </div>
                  <div className="flex gap-3">
                    <Clock className="h-5 w-5 text-primary shrink-0 mt-1" aria-hidden="true" />
                    <p className="text-sm">{EMPRESA.horario}</p>
                  </div>
                </div>

                <div className="flex flex-col justify-center gap-4 rounded-lg bg-muted/40 p-6">
                  <p className="text-sm text-muted-foreground">
                    Veja a localização exata do escritório, o traçado da rota a partir de {data.nome} e as
                    avaliações de clientes no Google.
                  </p>
                  <Button asChild size="lg">
                    <a href={MAPS_URL} target="_blank" rel="noopener noreferrer">
                      <MapPin className="h-5 w-5" aria-hidden="true" />
                      Ver no Google Maps
                      <span className="sr-only"> (abre em nova aba)</span>
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${EMPRESA.geo.latitude},${EMPRESA.geo.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Traçar rota de {data.nome} até nós
                      <span className="sr-only"> (abre em nova aba)</span>
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Contexto local */}
        <section className="py-16 bg-muted/30" aria-labelledby="contexto-heading">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 id="contexto-heading" className="text-2xl md:text-3xl font-bold mb-4">
              Como o seguro funciona em {data.nome}
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-3xl mb-8">{data.contexto}</p>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">Regiões atendidas</h3>
                  <ul className="flex flex-wrap gap-2">
                    {data.bairros.map((b) => (
                      <li key={b} className="text-sm bg-secondary rounded-full px-3 py-1">{b}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">Principais vias de acesso</h3>
                  <ul className="space-y-2">
                    {data.vias.map((v) => (
                      <li key={v} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                        {v}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Destaques */}
        <section className="py-16" aria-labelledby="destaques-heading">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 id="destaques-heading" className="text-2xl md:text-3xl font-bold mb-8">
              Seguros mais procurados em {data.nome}
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              {data.destaques.map((d) => (
                <Card key={d.titulo} className="h-full">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">{d.titulo}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{d.texto}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-muted/30" aria-labelledby="faq-heading">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 id="faq-heading" className="text-2xl md:text-3xl font-bold mb-8">
              Perguntas frequentes de quem é de {data.nome}
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {data.faqs.map((f, i) => (
                <AccordionItem key={f.pergunta} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left">{f.pergunta}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {f.resposta}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Outras cidades */}
        <section className="py-16" aria-labelledby="outras-cidades-heading">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 id="outras-cidades-heading" className="text-2xl md:text-3xl font-bold mb-6">
              Outras cidades e regiões atendidas
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {outrasCidades.map((c) => (
                <li key={c.slug}>
                  <Link
                    to={cidadeRegiaoPath(c.slug)}
                    className="flex items-center justify-between rounded-lg border p-4 hover:border-primary transition-colors"
                  >
                    <span className="font-medium">{c.nome}</span>
                    <ArrowRight className="h-4 w-4 text-primary" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted-foreground">
              Veja a lista completa em{" "}
              <Link to={CIDADES_REGIAO_HUB_PATH} className="text-primary hover:underline">
                cidades e regiões atendidas
              </Link>
              .
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CidadeRegiaoPage;
