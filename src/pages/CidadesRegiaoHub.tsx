import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EMPRESA, ENDERECO_LINHA, TELEFONE_DIGITS } from "@/config/empresa";
import { CANONICAL_BASE_URL } from "@/lib/canonical";
import { cidadesRegiao, cidadeRegiaoPath, CIDADES_REGIAO_HUB_PATH } from "@/data/cidadesRegiao";

const CidadesRegiaoHub = () => {
  const url = `${CANONICAL_BASE_URL}${CIDADES_REGIAO_HUB_PATH}`;

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${url}#localbusiness`,
    name: `${EMPRESA.nomeFantasia} — Corretora de Seguros`,
    legalName: EMPRESA.razaoSocial,
    description: `Corretora de seguros com escritório em Guarulhos/SP atendendo ${cidadesRegiao.length} cidades e regiões da Grande São Paulo e do Alto Tietê.`,
    url,
    telephone: EMPRESA.telefoneE164,
    email: EMPRESA.email,
    image: `${CANONICAL_BASE_URL}/images/og-cover.webp`,
    hasMap: EMPRESA.redesSociais.google,
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
    areaServed: cidadesRegiao.map((c) => ({
      "@type": "City",
      name: c.nome,
      address: {
        "@type": "PostalAddress",
        addressLocality: c.nome,
        addressRegion: c.uf,
        addressCountry: "BR",
      },
    })),
    sameAs: [
      EMPRESA.redesSociais.google,
      EMPRESA.redesSociais.instagram,
      EMPRESA.redesSociais.facebook,
      EMPRESA.redesSociais.linkedin,
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title="Cidades e Regiões Atendidas | Patro Seguros"
        absoluteTitle
        description={`Corretora de seguros em Guarulhos/SP atendendo ${cidadesRegiao.length} cidades da Grande São Paulo e do Alto Tietê. Endereço, telefone e link do Google Maps.`}
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
      </Helmet>

      <Header />

      <main id="main-content">
        <section className="pt-32 pb-16 bg-primary text-primary-foreground" aria-labelledby="hub-heading">
          <div className="container mx-auto px-4 max-w-5xl">
            <nav aria-label="Você está aqui" className="text-sm opacity-90 mb-6">
              <Link to="/" className="hover:underline">Início</Link>
              <span className="mx-2">/</span>
              <span>Cidades atendidas</span>
            </nav>
            <h1 id="hub-heading" className="text-3xl md:text-5xl font-bold mb-4">
              Cidades e regiões atendidas pela Patro Seguros
            </h1>
            <p className="text-lg opacity-95 max-w-3xl">
              Nosso escritório fica no Cidade Maia, em Guarulhos/SP, e atendemos clientes de toda a
              Grande São Paulo e do Alto Tietê — presencialmente ou por WhatsApp, telefone e
              videochamada.
            </p>
          </div>
        </section>

        <section className="py-16" aria-labelledby="nap-hub-heading">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 id="nap-hub-heading" className="text-2xl md:text-3xl font-bold mb-6">
              Nosso endereço e contato
            </h2>
            <Card>
              <CardContent className="p-6 md:p-8 grid gap-6 md:grid-cols-2">
                <div className="space-y-4 text-sm">
                  <p className="font-semibold text-base">{EMPRESA.nomeFantasia}</p>
                  <div className="flex gap-3">
                    <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                    <address className="not-italic leading-relaxed">
                      {ENDERECO_LINHA}
                      <br />
                      CEP {EMPRESA.endereco.cep}
                    </address>
                  </div>
                  <div className="flex gap-3">
                    <Phone className="h-5 w-5 text-primary shrink-0" aria-hidden="true" />
                    <a href={`tel:+55${TELEFONE_DIGITS}`} className="hover:underline">{EMPRESA.telefone}</a>
                  </div>
                  <div className="flex gap-3">
                    <Mail className="h-5 w-5 text-primary shrink-0" aria-hidden="true" />
                    <a href={`mailto:${EMPRESA.email}`} className="hover:underline">{EMPRESA.email}</a>
                  </div>
                  <div className="flex gap-3">
                    <Clock className="h-5 w-5 text-primary shrink-0" aria-hidden="true" />
                    <span>{EMPRESA.horario}</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <Button asChild size="lg" className="w-full">
                    <a href={EMPRESA.redesSociais.google} target="_blank" rel="noopener noreferrer">
                      <MapPin className="h-5 w-5" aria-hidden="true" />
                      Ver no Google Maps
                      <span className="sr-only"> (abre em nova aba)</span>
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-16 bg-muted/30" aria-labelledby="lista-cidades-heading">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 id="lista-cidades-heading" className="text-2xl md:text-3xl font-bold mb-8">
              Escolha a sua cidade
            </h2>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cidadesRegiao.map((c) => (
                <li key={c.slug}>
                  <Link
                    to={cidadeRegiaoPath(c.slug)}
                    className="flex h-full flex-col justify-between rounded-lg border bg-background p-5 hover:border-primary transition-colors"
                  >
                    <div>
                      <h3 className="font-semibold mb-1">{c.nome}</h3>
                      <p className="text-xs text-muted-foreground mb-2">{c.regiao}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{c.resumo}</p>
                    </div>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm text-primary">
                      Ver página
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CidadesRegiaoHub;
