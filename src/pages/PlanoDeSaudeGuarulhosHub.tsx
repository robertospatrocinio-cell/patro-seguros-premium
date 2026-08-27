import { Link } from "react-router-dom";
import {
  CheckCircle,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  HeartPulse,
  Building2,
  Users,
} from "lucide-react";
import Header from "@/components/Header";
import ExternalLink from "@/components/ExternalLink";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import Breadcrumb from "@/components/Breadcrumb";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import FAQSchema from "@/components/FAQSchema";
import ServiceSchema from "@/components/ServiceSchema";
import LocalBusinessSchema from "@/components/LocalBusinessSchema";
import { Button } from "@/components/ui/button";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { CANONICAL_BASE_URL } from "@/lib/canonical";
import {
  trackWhatsAppClick,
  trackInternalLinkClick,
  buildInternalLinkSource,
} from "@/lib/tracking";
import {
  HUB_PATH,
  HUB_FAQS,
  SAUDE_SUBTYPES,
  SAUDE_OPERADORAS,
} from "@/data/saudeVertical";

const HUB_TITLE = "Plano de Saúde em Guarulhos | Compare com a Patro Seguros";
const HUB_DESCRIPTION =
  "Compare planos de saúde em Guarulhos com a Patro Seguros. Cotação para individual, familiar, MEI, PME e empresarial com operadoras parceiras.";

const CONTRACT_TYPES = [
  { label: "Individual", description: "Pessoa física com contrato em nome próprio." },
  { label: "Familiar", description: "Titular, cônjuge, filhos e dependentes." },
  { label: "Coletivo por adesão", description: "Contrato via entidade de classe compatível." },
  { label: "MEI", description: "Microempreendedor Individual com CNPJ ativo." },
  { label: "PME", description: "Empresas de 2 a 99 vidas." },
  { label: "Empresarial", description: "Corporativo acima de 100 vidas." },
];

const WHAT_TO_COMPARE = [
  "Preço mensal por faixa etária",
  "Coparticipação e teto",
  "Carência (consultas, exames, internação, parto)",
  "Acomodação (enfermaria ou apartamento)",
  "Cobertura obstétrica",
  "Abrangência (municipal, estadual ou nacional)",
  "Rede credenciada",
  "Reembolso",
  "Regras de reajuste anual",
  "Idade dos beneficiários",
  "Regras específicas da operadora",
];

const NETWORK_HIGHLIGHTS = [
  "Hospital Carlos Chagas",
  "Hospital Stella Maris",
  "Hospital e Maternidade Guarulhos",
  "Hospital São Luiz (região)",
  "Laboratórios e clínicas em Cidade Maia, Centro e Vila Galvão",
];

const BAIRROS = [
  "Cidade Maia",
  "Centro",
  "Vila Galvão",
  "Cumbica",
  "Pimentas",
  "Bonsucesso",
  "Macedo",
  "Gopoúva",
  "Jardim Maia",
  "Vila Augusta",
  "Taboão",
];

const PlanoDeSaudeGuarulhosHub = () => {
  const canonicalUrl = `${CANONICAL_BASE_URL}${HUB_PATH}`;
  const source = buildInternalLinkSource("hub", "plano-de-saude-guarulhos");
  const whatsappUrl = buildWhatsAppUrl({
    origem: "saude_hub_guarulhos",
    extraLines: ["Olá, quero comparar planos de saúde em Guarulhos pela Patro Seguros."],
  });

  const itemListPlanos = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${canonicalUrl}#planos`,
    name: "Tipos de plano de saúde em Guarulhos",
    numberOfItems: SAUDE_SUBTYPES.length,
    itemListElement: SAUDE_SUBTYPES.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${CANONICAL_BASE_URL}${s.path}`,
      name: s.cardTitle,
    })),
  };

  const itemListOperadoras = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${canonicalUrl}#operadoras`,
    name: "Operadoras de planos de saúde em Guarulhos",
    numberOfItems: SAUDE_OPERADORAS.length,
    itemListElement: SAUDE_OPERADORAS.map((o, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${CANONICAL_BASE_URL}${o.path}`,
      name: o.name,
    })),
  };

  return (
    <>
      <PageMeta title={HUB_TITLE} description={HUB_DESCRIPTION} />
      <FAQSchema faqs={HUB_FAQS} />
      <BreadcrumbSchema
        items={[
          { name: "Início", url: CANONICAL_BASE_URL },
          { name: "Planos de Saúde em Guarulhos", url: canonicalUrl },
        ]}
      />
      <ServiceSchema
        name="Plano de Saúde em Guarulhos"
        serviceType="Plano de Saúde"
        description={HUB_DESCRIPTION}
      />
      <LocalBusinessSchema />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListPlanos) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListOperadoras) }}
      />
      <Header />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <div className="container mx-auto px-4 pt-6">
          <Breadcrumb items={[{ label: "Planos de Saúde em Guarulhos" }]} />
        </div>

        <section className="gradient-hero py-16 md:py-20">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 border border-white/20 text-white/90 mb-4">
              Corretora em Guarulhos • 20+ operadoras
            </span>
            <h1 className="text-white mb-4">Plano de Saúde em Guarulhos</h1>
            <p className="text-lg text-white/85 max-w-2xl mx-auto mb-8">
              Compare planos de saúde individuais, familiares, MEI, PME e empresariais com atendimento consultivo da Patro Seguros em Guarulhos e São Paulo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#planos">
                <Button size="lg" className="text-base px-6">
                  Comparar planos de saúde <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
              <ExternalLink href={whatsappUrl} onClick={() => trackWhatsAppClick("saude_hub_guarulhos")}
              >
                <Button size="lg" variant="cta" className="text-base px-6">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Falar com especialista
                </Button>
              </a>
            </div>
          </div>
        </section>

        <section id="planos" className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Qual plano de saúde você procura?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Escolha o tipo de contratação para ver o comparativo consultivo específico da Patro Seguros.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {SAUDE_SUBTYPES.map((s) => (
                <Link
                  key={s.slug}
                  to={s.path}
                  onClick={() =>
                    trackInternalLinkClick({
                      placement: "hub-grid",
                      source,
                      destination: s.path,
                      label: s.cardTitle,
                    })
                  }
                  className="block p-6 rounded-lg border bg-white hover:border-primary/60 hover:shadow-md transition"
                >
                  <div className="flex items-center gap-2 mb-2 text-primary">
                    <HeartPulse className="h-5 w-5" />
                    <span className="text-xs uppercase tracking-wider font-bold">{s.label}</span>
                  </div>
                  <h3 className="font-bold text-lg mb-2">{s.cardTitle}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{s.cardDescription}</p>
                  <span className="inline-flex items-center gap-1 text-sm text-primary font-medium">
                    Ver detalhes <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Operadoras parceiras</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Comparamos operadoras nacionais e especializadas com atuação em Guarulhos. A disponibilidade de produtos varia por perfil, faixa etária e CEP.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {SAUDE_OPERADORAS.map((op) => (
                <Link
                  key={op.slug}
                  to={op.path}
                  onClick={() =>
                    trackInternalLinkClick({
                      placement: "hub-grid",
                      source,
                      destination: op.path,
                      label: op.name,
                    })
                  }
                  className="block p-5 rounded-lg border bg-white hover:border-primary/60 hover:shadow-md transition"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="inline-block w-3 h-3 rounded-full"
                      style={{ backgroundColor: op.accentColor }}
                    />
                    <h3 className="font-bold">{op.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-2">
                    {op.shortDescription}
                  </p>
                  <p className="text-xs text-muted-foreground italic mb-3">
                    Perfil: {op.profileFit}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm text-primary font-medium">
                    Ver opções <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Como a Patro ajuda você a escolher</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                "Análise do perfil (idade, dependentes, condições existentes)",
                "Cálculo por quantidade de vidas e faixa etária",
                "Comparação de rede credenciada por bairro e cidade",
                "Verificação de hospitais e laboratórios de interesse",
                "Análise de carência, coparticipação, reembolso e abrangência",
                "Orientação sobre contratação individual, familiar, adesão, MEI, PME e empresarial",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 p-4 bg-muted rounded-lg">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-sm">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Rede credenciada em Guarulhos</h2>
            <p className="text-muted-foreground mb-6">
              A Patro avalia caso a caso a rede disponível para o CEP do beneficiário, considerando hospitais como {NETWORK_HIGHLIGHTS.join(", ")}, além de laboratórios e clínicas espalhados pelos principais bairros: {BAIRROS.join(", ")}.
            </p>
            <div className="p-4 bg-white border-l-4 border-primary rounded text-sm text-muted-foreground">
              A disponibilidade de hospitais, laboratórios e clínicas varia conforme a operadora, categoria do plano, rede contratada e regras vigentes. A Patro verifica a rede antes da contratação.
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Tipos de contratação</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {CONTRACT_TYPES.map((t) => (
                <div key={t.label} className="p-5 border rounded-lg bg-white">
                  <div className="flex items-center gap-2 mb-2">
                    <Building2 className="h-4 w-4 text-primary" />
                    <h3 className="font-bold">{t.label}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{t.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">O que comparar antes de contratar</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {WHAT_TO_COMPARE.map((item) => (
                <div key={item} className="flex items-start gap-2 p-3 bg-white rounded border text-sm">
                  <ShieldCheck className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-3xl" data-speakable="faq">
            <h2 id="faq-heading" className="text-center text-2xl md:text-3xl font-bold mb-10">
              Perguntas frequentes sobre plano de saúde em Guarulhos
            </h2>
            <div className="space-y-6">
              {HUB_FAQS.map((f) => (
                <div key={f.question}>
                  <h3 className="text-lg font-semibold mb-2">{f.question}</h3>
                  <p className="text-muted-foreground">{f.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Users className="h-6 w-6 text-primary" /> Fontes oficiais
            </h2>
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li>
                Regras de portabilidade, carência e segmentação:{" "}
                <ExternalLink href="https://www.gov.br/ans/pt-br" className="text-primary underline">
                  ANS — Agência Nacional de Saúde Suplementar
                </a>
                .
              </li>
              <li>
                Lei dos Planos de Saúde (Lei nº 9.656/98) — direitos e deveres do beneficiário.
              </li>
              <li>
                Conteúdo consultivo e comercial, revisado pela equipe Patro Seguros. Não constitui aconselhamento médico.
              </li>
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default PlanoDeSaudeGuarulhosHub;