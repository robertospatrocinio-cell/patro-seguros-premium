import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowRight,
  MessageCircle,
  ShieldCheck,
  Users,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  MapPin,
  BadgeCheck,
  Car,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import FAQBlock from "@/components/FAQBlock";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CANONICAL_BASE_URL } from "@/lib/canonical";
import { EMPRESA, ENDERECO_LINHA, WHATSAPP_DIGITS } from "@/config/empresa";
import { trackCotacaoClick, trackWhatsAppClick } from "@/lib/tracking";

const CANONICAL = `${CANONICAL_BASE_URL}/seguro-app-motoristas-passageiros`;

const COTACAO_URL = "https://patro.seucorretor.digital/#/formularios/acidentes-pessoais";
const CTA_LABEL = "Cotar Seguro APP para Motoristas e Passageiros";

const WHATSAPP_URL = `https://wa.me/${WHATSAPP_DIGITS}?text=${encodeURIComponent(
  "Olá, quero cotar o Seguro APP para Motoristas e Passageiros a partir de R$ 56,20 ao ano."
)}`;

const PRECO_AVISO =
  "Atenção: o valor de R$ 56,20 ao ano refere-se exclusivamente ao Seguro APP para Motoristas e Passageiros. Não se trata de seguro auto, seguro moto, seguro bike ou seguro do veículo.";

const PRECO_COMPLEMENTO =
  "Valor sujeito à aceitação da seguradora, plano contratado, limites de cobertura e condições vigentes da apólice.";

const PUBLICO = [
  "Motoristas de aplicativo que transportam passageiros",
  "Taxistas",
  "Motoristas particulares",
  "Vans",
  "Micro-ônibus",
  "Ônibus",
  "Transporte escolar, se aceito pela seguradora",
  "Transporte fretado, se aceito pela seguradora",
  "Transportadores autorizados",
  "Empresas que transportam passageiros",
  "Condutores que precisam comprovar proteção para motoristas e passageiros",
];

const COBERTURAS = [
  "Morte acidental",
  "Invalidez permanente total ou parcial por acidente",
  "Despesas médico-hospitalares, se contratadas",
  "Indenização conforme capital segurado",
  "Passageiros transportados, conforme regras da apólice",
  "Motorista/condutor, quando previsto no plano contratado",
];

const NAO_COBERTURAS = [
  "Carro",
  "Moto",
  "Bike",
  "Roubo ou furto do veículo",
  "Colisão do veículo",
  "Perda total do veículo",
  "Danos materiais ao veículo",
  "Danos a terceiros",
  "Manutenção",
  "Pane mecânica",
  "Acessórios",
  "Equipamentos",
  "Mercadorias",
  "Entregas",
];

const COMPARATIVO = [
  {
    produto: "Seguro APP para Motoristas e Passageiros",
    protege: "Protege motoristas e/ou passageiros, conforme plano",
    exemplos: "Morte acidental, invalidez e despesas médicas, conforme plano",
    isApp: "Sim, é este produto",
    destaque: true,
  },
  {
    produto: "Seguro Auto",
    protege: "Protege o carro e/ou terceiros, conforme apólice",
    exemplos: "Colisão, roubo, furto, terceiros, assistência",
    isApp: "Não",
    destaque: false,
  },
  {
    produto: "Seguro Moto",
    protege: "Protege a moto e/ou terceiros, conforme apólice",
    exemplos: "Roubo, furto, colisão, terceiros",
    isApp: "Não",
    destaque: false,
  },
  {
    produto: "Seguro Bike",
    protege: "Protege a bicicleta, conforme apólice",
    exemplos: "Roubo, danos, acessórios, conforme plano",
    isApp: "Não",
    destaque: false,
  },
  {
    produto: "Seguro RC Terceiros",
    protege: "Protege contra responsabilidade por danos a terceiros",
    exemplos: "Danos materiais/corporais a terceiros, conforme limite",
    isApp: "Não",
    destaque: false,
  },
];

const FAQS = [
  {
    question: "O que é Seguro APP?",
    answer:
      "Seguro APP significa Acidentes Pessoais para Motoristas e Passageiros. É uma proteção voltada às pessoas envolvidas no transporte, conforme limites e condições da apólice.",
  },
  {
    question: "O valor de R$ 56,20 é do Seguro APP?",
    answer:
      "Sim. O valor a partir de R$ 56,20 refere-se exclusivamente ao Seguro APP para Motoristas e Passageiros, em parcela única anual. Esse seguro não é seguro auto, não é seguro moto, não é seguro bike e não cobre o veículo. Ele é voltado à proteção de motoristas e/ou passageiros, conforme plano contratado, aceitação da seguradora e condições da apólice.",
  },
  {
    question: "Seguro APP cobre o veículo?",
    answer:
      "Não. O Seguro APP não cobre carro, moto, bike, casco, colisão, roubo, furto ou perda total do veículo. Para proteger o veículo, é necessário contratar um seguro específico.",
  },
  {
    question: "Seguro APP cobre passageiros?",
    answer:
      "Sim, o Seguro APP pode proteger passageiros transportados em caso de acidente coberto, conforme limites e condições contratadas.",
  },
  {
    question: "Seguro APP cobre motorista?",
    answer:
      "Pode cobrir o motorista/condutor quando essa proteção estiver prevista no plano contratado. É importante verificar as condições da apólice antes da contratação.",
  },
  {
    question: "Seguro APP cobre danos a terceiros?",
    answer:
      "Não necessariamente. Danos a terceiros normalmente fazem parte de coberturas de responsabilidade civil, como RCF-V ou RC, que são produtos diferentes do Seguro APP.",
  },
  {
    question: "Motorista de Uber ou 99 pode contratar Seguro APP?",
    answer:
      "Pode solicitar cotação, mas a contratação depende da aceitação da seguradora, do tipo de atividade e das condições do produto.",
  },
  {
    question: "O Seguro APP substitui o seguro auto?",
    answer:
      "Não. O Seguro APP não substitui seguro auto, seguro moto ou seguro bike. Ele protege pessoas, não o veículo.",
  },
  {
    question: "O Seguro APP vale para entregador?",
    answer:
      "O Seguro APP é voltado à proteção de motoristas e/ou passageiros transportados, conforme o plano contratado. Para entregadores, motoboys ou ciclistas que transportam mercadorias, é necessário avaliar produtos específicos para essa atividade.",
  },
  {
    question: "Como contratar Seguro APP com a Patro?",
    answer:
      "Basta acessar o formulário de cotação da Patro Seguros ou chamar pelo WhatsApp, informar o tipo de transporte, quantidade de passageiros, dados básicos e solicitar a cotação do Seguro APP para Motoristas e Passageiros.",
  },
  {
    question: "A Patro atende Seguro APP em Guarulhos?",
    answer:
      "Sim. A Patro Seguros atende clientes em Guarulhos e região, com orientação para contratação de Seguro APP para Motoristas e Passageiros.",
  },
];

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Seguro APP para Motoristas e Passageiros",
  url: CANONICAL,
  inLanguage: "pt-BR",
  description:
    "Seguro APP (Acidentes Pessoais para Motoristas e Passageiros) a partir de R$ 56,20 em parcela única anual. Produto independente de seguro auto, moto ou bike.",
  isPartOf: { "@type": "WebSite", name: EMPRESA.nomeFantasia, url: CANONICAL_BASE_URL },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${CANONICAL}#service`,
  name: "Seguro APP para Motoristas e Passageiros",
  category: "Acidentes Pessoais para Motoristas e Passageiros",
  serviceType: "Acidentes Pessoais para Motoristas e Passageiros",
  description:
    "Cobertura de Acidentes Pessoais para Motoristas e Passageiros (Seguro APP), voltada à proteção das pessoas transportadas e/ou do condutor, conforme plano contratado. Não cobre o veículo.",
  url: CANONICAL,
  provider: { "@id": `${EMPRESA.dominioCanonico}/#insurance-agency` },
  areaServed: [
    { "@type": "City", name: "Guarulhos" },
    { "@type": "City", name: "São Paulo" },
  ],
  offers: {
    "@type": "Offer",
    name: "Seguro APP para Motoristas e Passageiros",
    category: "Acidentes Pessoais para Motoristas e Passageiros",
    price: 56.2,
    priceCurrency: "BRL",
    availability: "https://schema.org/InStock",
    url: CANONICAL,
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: 56.2,
      priceCurrency: "BRL",
      billingDuration: 1,
      billingIncrement: 1,
      unitText: "Parcela única anual",
      description:
        "Valor a partir de R$ 56,20 em parcela única anual, exclusivo do Seguro APP para Motoristas e Passageiros. Não corresponde a seguro auto, moto, bike ou seguro do veículo.",
    },
  },
};

const CtaPair = ({ source }: { source: string }) => (
  <div className="flex flex-col sm:flex-row flex-wrap gap-3">
    <Button asChild size="lg">
      <a
        href={COTACAO_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={CTA_LABEL}
        onClick={() => trackCotacaoClick(source)}
      >
        {CTA_LABEL} <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
      </a>
    </Button>
    <Button asChild size="lg" variant="outline">
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar com especialista em Seguro APP pelo WhatsApp"
        onClick={() => trackWhatsAppClick(source)}
      >
        <MessageCircle className="mr-2 h-4 w-4" aria-hidden="true" /> Falar com especialista em Seguro APP
      </a>
    </Button>
  </div>
);

const PriceNotice = () => (
  <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-4 text-sm leading-relaxed">
    <p className="flex gap-2 font-semibold text-foreground">
      <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
      {PRECO_AVISO}
    </p>
    <p className="mt-2 text-muted-foreground">{PRECO_COMPLEMENTO}</p>
  </div>
);

const SeguroAppMotoristasPassageiros = () => (
  <div className="min-h-screen bg-background">
    <PageMeta
      title="Seguro APP Motoristas e Passageiros | R$ 56,20 ao ano"
      description="Seguro APP para motoristas e passageiros a partir de R$ 56,20 ao ano. Acidentes pessoais para transporte remunerado. Cote com a Patro."
      absoluteTitle
      canonicalPath="/seguro-app-motoristas-passageiros"
      skipBreadcrumb
    />
    <BreadcrumbSchema
      items={[
        { name: "Início", url: `${CANONICAL_BASE_URL}/` },
        { name: "Seguro APP para Motoristas e Passageiros", url: CANONICAL },
      ]}
    />
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(webPageSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
    </Helmet>

    <Header />

    <main>
      <nav aria-label="Breadcrumb" className="container mx-auto px-4 pt-24 pb-2 text-sm text-muted-foreground">
        <ol className="flex flex-wrap gap-1">
          <li>
            <Link to="/" className="hover:text-primary">
              Início
            </Link>
          </li>
          <li>/</li>
          <li aria-current="page" className="text-foreground">
            Seguro APP para Motoristas e Passageiros
          </li>
        </ol>
      </nav>

      {/* HERO */}
      <section className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            <Users className="h-4 w-4" aria-hidden="true" /> Acidentes Pessoais • Guarulhos/SP
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-foreground leading-tight mb-4">
            Seguro APP para Motoristas e Passageiros
          </h1>
          <p className="text-lg text-muted-foreground mb-4">
            Acidentes Pessoais para Motoristas e Passageiros com opção a partir de R$ 56,20 em
            parcela única anual. Proteção de Acidentes Pessoais para motoristas e passageiros,
            conforme plano contratado.
          </p>
          <p className="text-2xl md:text-3xl font-bold text-primary mb-3">
            A partir de R$ 56,20 em parcela única anual
          </p>
          <p className="text-base font-semibold text-foreground mb-4">
            Não é seguro auto, moto, bike ou seguro do veículo.
          </p>
          <div className="mb-6">
            <PriceNotice />
          </div>
          <CtaPair source="seguro_app_motoristas_passageiros_hero" />
        </div>
      </section>

      {/* SEÇÃO 1 */}
      <section className="container mx-auto px-4 py-10 border-t border-border">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          O que é Seguro APP para Motoristas e Passageiros?
        </h2>
        <div className="max-w-3xl space-y-4 text-muted-foreground leading-relaxed">
          <p>
            Seguro APP significa Acidentes Pessoais para Motoristas e Passageiros. É uma proteção
            voltada às pessoas envolvidas no transporte, conforme limites e condições contratadas na
            apólice.
          </p>
          <p>
            O Seguro APP para Motoristas e Passageiros é uma cobertura de Acidentes Pessoais voltada
            à proteção das pessoas transportadas e/ou do condutor, conforme previsto no plano
            contratado. Ele pode oferecer indenização em caso de acidente coberto, respeitando os
            limites da apólice. Esse produto é separado de qualquer seguro do veículo: não cobre
            carro, moto, bike, casco, colisão, roubo ou furto.
          </p>
          <ul className="grid gap-2 sm:grid-cols-2">
            {[
              "Pode proteger motoristas e/ou passageiros, conforme plano contratado",
              "Não protege o veículo",
              "Não cobre roubo/furto do veículo",
              "Não cobre colisão do veículo",
              "Não é seguro auto",
              "Não é seguro moto",
              "Não é seguro bike",
              "Não é seguro para casco",
            ].map((item) => (
              <li key={item} className="flex gap-2 text-sm">
                <ShieldCheck className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SEÇÃO 2 */}
      <section className="container mx-auto px-4 py-10 border-t border-border">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Para quem o Seguro APP é indicado?</h2>
        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl">
          {PUBLICO.map((item) => (
            <li key={item} className="flex gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* SEÇÃO 3 */}
      <section className="container mx-auto px-4 py-10 border-t border-border">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          O que o Seguro APP para Motoristas e Passageiros pode cobrir?
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-5xl">
          {COBERTURAS.map((item) => (
            <Card key={item}>
              <CardContent className="p-5 flex gap-3">
                <ShieldCheck className="h-5 w-5 text-primary flex-shrink-0" aria-hidden="true" />
                <p className="text-sm font-medium">{item}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted-foreground max-w-3xl">
          As coberturas podem variar conforme plano contratado e limites da apólice, estão sujeitas
          à aceitação da seguradora e devem ser verificadas nas condições gerais do produto.
        </p>
      </section>

      {/* SEÇÃO 4 */}
      <section className="container mx-auto px-4 py-10 border-t border-border">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">O Seguro APP cobre o veículo?</h2>
        <p className="text-lg font-semibold text-foreground mb-4">Não.</p>
        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mb-4">
          {NAO_COBERTURAS.map((item) => (
            <li key={item} className="flex gap-2 text-sm text-muted-foreground">
              <XCircle className="h-4 w-4 mt-0.5 text-destructive flex-shrink-0" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
        <p className="max-w-3xl text-muted-foreground leading-relaxed">
          Se você precisa proteger o carro, moto ou bicicleta, é necessário avaliar um seguro
          específico para o veículo. O Seguro APP trata da proteção das pessoas, não do bem
          utilizado no transporte.
        </p>
      </section>

      {/* SEÇÃO 5 — TABELA COMPARATIVA */}
      <section className="container mx-auto px-4 py-10 border-t border-border">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Seguro APP não é seguro do veículo</h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm min-w-[720px]">
            <caption className="sr-only">
              Comparativo entre Seguro APP para Motoristas e Passageiros e seguros de veículo
            </caption>
            <thead className="bg-muted">
              <tr>
                <th scope="col" className="text-left p-3 font-semibold">Produto</th>
                <th scope="col" className="text-left p-3 font-semibold">Protege quem/o quê?</th>
                <th scope="col" className="text-left p-3 font-semibold">Exemplos de cobertura</th>
                <th scope="col" className="text-left p-3 font-semibold">É o Seguro APP de R$ 56,20?</th>
              </tr>
            </thead>
            <tbody>
              {COMPARATIVO.map((row) => (
                <tr key={row.produto} className={`border-t border-border ${row.destaque ? "bg-primary/5" : ""}`}>
                  <th scope="row" className="text-left p-3 font-semibold align-top">{row.produto}</th>
                  <td className="p-3 align-top text-muted-foreground">{row.protege}</td>
                  <td className="p-3 align-top text-muted-foreground">{row.exemplos}</td>
                  <td className="p-3 align-top font-semibold">{row.isApp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6">
          <CtaPair source="seguro_app_motoristas_passageiros_tabela" />
        </div>
      </section>

      {/* SEÇÃO 6 — PREÇO */}
      <section className="container mx-auto px-4 py-10 border-t border-border">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Quanto custa o Seguro APP para Motoristas e Passageiros?
        </h2>
        <div className="max-w-3xl space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            A {EMPRESA.nomeFantasia} possui opção de Seguro APP para Motoristas e Passageiros a
            partir de <strong className="text-foreground">R$ 56,20 em parcela única anual</strong>.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            O valor pode variar conforme plano, quantidade de passageiros, capital segurado, tipo de
            transporte, aceitação da seguradora e condições vigentes.
          </p>
          <p className="font-semibold text-foreground">
            Esse preço não corresponde a seguro auto, seguro moto, seguro bike ou seguro do veículo.
          </p>
          <PriceNotice />
          <CtaPair source="seguro_app_motoristas_passageiros_preco" />
        </div>
      </section>

      {/* SEÇÃO 7 */}
      <section className="container mx-auto px-4 py-10 border-t border-border">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Seguro APP para motoristas de aplicativo</h2>
        <div className="max-w-3xl space-y-4 text-muted-foreground leading-relaxed">
          <p>
            Motoristas que transportam passageiros por aplicativos como Uber, 99 e outros podem
            precisar entender se já possuem alguma cobertura vinculada à plataforma e se precisam
            contratar proteção complementar ou própria.
          </p>
          <p>
            Dependendo da atividade e das regras aplicáveis, a proteção de Acidentes Pessoais para
            Motoristas e Passageiros pode ser exigida ou recomendada. É importante confirmar as
            condições do plano, os limites contratados e a aceitação da seguradora antes de
            contratar.
          </p>
          <p>
            Se o seu objetivo é entender a atividade profissional e o uso do veículo em aplicativos,
            veja também o conteúdo relacionado sobre{" "}
            <Link to="/seguro-motorista-app" className="text-primary underline underline-offset-4">
              seguro para motorista de aplicativo
            </Link>
            .
          </p>
        </div>
      </section>

      {/* SEÇÃO 8 — LOCAL */}
      <section className="container mx-auto px-4 py-10 border-t border-border">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Seguro APP para Motoristas e Passageiros em Guarulhos e região
        </h2>
        <div className="max-w-3xl space-y-4 text-muted-foreground leading-relaxed">
          <p>
            A {EMPRESA.nomeFantasia} atende clientes em Guarulhos e região com orientação para
            contratação de Seguro APP para Motoristas e Passageiros. A corretora está localizada na
            Cidade Maia e atende motoristas, empresas e transportadores que precisam proteger
            pessoas durante o transporte.
          </p>
          <p>
            O atendimento alcança bairros e regiões como Centro, Cumbica e o entorno do Aeroporto de
            Guarulhos, Vila Galvão, Vila Augusta, Bonsucesso e Pimentas, além de São Paulo e da
            Grande São Paulo.
          </p>
          <p>
            Veja também as opções de{" "}
            <Link to="/seguros-em-guarulhos" className="text-primary underline underline-offset-4">
              seguros em Guarulhos
            </Link>{" "}
            ou fale com a equipe pela página de{" "}
            <Link to="/contato" className="text-primary underline underline-offset-4">
              contato
            </Link>
            .
          </p>
        </div>
      </section>

      {/* SEÇÃO 9 — CONFIANÇA */}
      <section className="container mx-auto px-4 py-10 border-t border-border">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Sobre a {EMPRESA.nomeFantasia}</h2>
        <div className="grid gap-4 md:grid-cols-2 max-w-5xl">
          <Card>
            <CardContent className="p-6 space-y-2 text-sm text-muted-foreground">
              {[
                "Corretora registrada na SUSEP",
                "Atendimento consultivo",
                "Orientação sobre coberturas",
                "Cotação rápida",
                "Atendimento em Guarulhos e região",
              ].map((item) => (
                <p key={item} className="flex gap-2">
                  <BadgeCheck className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" aria-hidden="true" />
                  {item}
                </p>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 space-y-1 text-sm text-muted-foreground">
              <p className="font-semibold text-foreground">{EMPRESA.nomeFantasia}</p>
              <p>{EMPRESA.razaoSocial}</p>
              <p>CNPJ: {EMPRESA.cnpj}</p>
              <p>SUSEP: {EMPRESA.susep}</p>
              <p>WhatsApp: {EMPRESA.telefone}</p>
              <p className="flex gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
                {ENDERECO_LINHA}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* SEÇÃO 10 — FAQ */}
      <div className="border-t border-border">
        <FAQBlock
          title="Perguntas frequentes sobre Seguro APP para Motoristas e Passageiros"
          items={FAQS}
          headingId="faq-seguro-app"
        />
      </div>

      {/* CTA FINAL */}
      <section className="container mx-auto px-4 py-12 border-t border-border">
        <div className="max-w-3xl space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold">
            Solicitar cotação de APP para motoristas e passageiros
          </h2>
          <p className="text-muted-foreground">
            Informe o tipo de transporte, a quantidade de passageiros e os dados básicos. A equipe
            da {EMPRESA.nomeFantasia} orienta sobre coberturas, limites e condições do Seguro APP
            para Motoristas e Passageiros.
          </p>
          <PriceNotice />
          <CtaPair source="seguro_app_motoristas_passageiros_final" />
          <p className="text-sm text-muted-foreground flex gap-2">
            <Car className="h-4 w-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
            Para proteger o veículo em si, avalie um produto específico de seguro do veículo — o
            Seguro APP protege pessoas.
          </p>
        </div>
      </section>
    </main>

    <Footer />
  </div>
);

export default SeguroAppMotoristasPassageiros;
