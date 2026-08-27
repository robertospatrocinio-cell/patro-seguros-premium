import { Link } from "react-router-dom";
import { Handshake, MessageCircle, ArrowRight, CheckCircle, FileText, TrendingUp } from "lucide-react";
import Header from "@/components/Header";
import ExternalLink from "@/components/ExternalLink";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import Breadcrumb from "@/components/Breadcrumb";
import FAQSchema from "@/components/FAQSchema";
import ServiceSchema from "@/components/ServiceSchema";
import { Button } from "@/components/ui/button";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { CANONICAL_BASE_URL } from "@/lib/canonical";
import {
  trackWhatsAppClick,
  trackInternalLinkClick,
  buildInternalLinkSource,
} from "@/lib/tracking";
import {
  CREDITO_HUB_PATH,
  CREDITO_LOCAL_PATH,
  CREDITO_HUB_FAQS,
  CREDITO_INTENT_PAGES,
  B2B_INSURERS_CREDITO,
  B2B_INSURER_PAGES,
  TRANSPARENCY_NOTICE,
} from "@/data/b2bVertical";

const PUBLICOS = [
  "Indústrias com carteira PJ",
  "Distribuidores e atacadistas",
  "Importadoras e exportadoras",
  "Empresas B2B com vendas a prazo",
  "Fornecedores recorrentes",
  "Empresas com carteira concentrada",
  "Transportadoras que concedem prazo",
  "Empresas em expansão comercial",
];

const COBRE = [
  "Inadimplência prolongada de clientes PJ dentro dos limites aprovados",
  "Apoio à recuperação/cobrança em atraso (conforme apólice)",
  "Riscos de crédito na carteira segurada",
  "Em produtos específicos: risco político em exportação",
];

const NAO_COBRE = [
  "Disputas comerciais (mercadoria não entregue, avaria) — o pagamento cobrado deve ser inconteste",
  "Vendas fora dos limites aprovados",
  "Clientes fora da carteira submetida à análise",
  "Perdas anteriores ao início da apólice",
  "Exceções previstas nas condições contratadas",
];

const DOCUMENTOS = [
  "Cartão CNPJ e contrato social",
  "Últimos balanços",
  "Faturamento a prazo por cliente",
  "Base de clientes PJ (razão social, CNPJ, limite atual, prazo médio)",
  "Histórico de inadimplência",
  "Política de crédito interna, se houver",
];

const SeguroDeCredito = () => {
  const canonicalUrl = `${CANONICAL_BASE_URL}${CREDITO_HUB_PATH}`;
  const source = buildInternalLinkSource("hub", "seguro-de-credito");
  const whatsappUrl = buildWhatsAppUrl({
    origem: "b2b_credito_hub",
    extraLines: [
      "Olá, quero entender Seguro de Crédito para proteger vendas a prazo da minha empresa.",
    ],
  });

  const insurerPages = B2B_INSURER_PAGES.filter((p) => p.line === "credito");

  return (
    <>
      <PageMeta
        title="Seguro de Crédito para Empresas | Proteja Vendas a Prazo | Patro"
        description="Seguro de Crédito para empresas que vendem a prazo e querem reduzir risco de inadimplência. Cotação com seguradoras parceiras pela Patro Seguros."
      />
      <FAQSchema faqs={CREDITO_HUB_FAQS} />
      <ServiceSchema
        name="Seguro de Crédito"
        serviceType="Seguro de Crédito"
        description="Seguro de Crédito para proteger vendas a prazo e reduzir inadimplência — intermediação pela Patro Seguros."
      />
      <Header />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <div className="container mx-auto px-4 pt-6">
          <Breadcrumb items={[{ label: "Seguro de Crédito" }]} />
        </div>

        <section className="gradient-hero py-16 md:py-20">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 border border-white/20 text-white/90 mb-4">
              Vendas B2B • Nacional e Exportação
            </span>
            <h1 className="text-white mb-4">Seguro de Crédito para proteger vendas a prazo e reduzir inadimplência</h1>
            <p className="text-lg text-white/85 max-w-2xl mx-auto mb-8">
              A Patro Seguros ajuda empresas a avaliar Seguro de Crédito para proteger recebíveis, vender com mais segurança e reduzir perdas por inadimplência de clientes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ExternalLink href={whatsappUrl} onClick={() => trackWhatsAppClick("b2b_credito_hub")}
              >
                <Button size="lg" variant="cta" className="text-base px-6">
                  <MessageCircle className="mr-2 h-5 w-5" /> Cotar Seguro de Crédito
                </Button>
              </ExternalLink>
              <Link
                to={CREDITO_LOCAL_PATH}
                onClick={() =>
                  trackInternalLinkClick({
                    placement: "cta-block",
                    source,
                    destination: CREDITO_LOCAL_PATH,
                    label: "Guarulhos e SP",
                  })
                }
              >
                <Button size="lg" variant="outline" className="text-base px-6 bg-white/10 border-white/40 text-white hover:bg-white/20">
                  Empresa em Guarulhos <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-14">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">O que é Seguro de Crédito</h2>
            <p className="text-muted-foreground leading-relaxed">
              O Seguro de Crédito é uma solução voltada para empresas que vendem a prazo e desejam proteção contra o risco de não pagamento por parte de seus clientes, conforme análise de crédito, limites aprovados e condições da apólice.
            </p>
          </div>
        </section>

        <section className="py-14 bg-muted">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold mb-4">Como funciona</h2>
            <ol className="grid gap-4 sm:grid-cols-2 text-sm">
              {[
                "A seguradora analisa a carteira de clientes PJ e define limites individuais.",
                "Vendas dentro dos limites ficam cobertas conforme a apólice.",
                "Em caso de inadimplência prolongada, a seguradora indeniza dentro dos limites.",
                "A apólice acompanha o crescimento e a rotação da carteira ao longo do ano.",
              ].map((step, i) => (
                <li key={step} className="p-4 bg-white border rounded-lg">
                  <span className="text-xs uppercase font-bold text-primary">Passo {i + 1}</span>
                  <p className="mt-1">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="py-14">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl font-bold mb-4">Para quem é indicado</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 text-sm">
              {PUBLICOS.map((p) => (
                <div key={p} className="flex items-start gap-2 p-3 bg-muted rounded">
                  <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-1" />
                  <span>{p}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 bg-muted">
          <div className="container mx-auto px-4 max-w-5xl grid gap-6 md:grid-cols-2">
            <div>
              <h2 className="text-xl font-bold mb-3">O que pode cobrir</h2>
              <ul className="space-y-2 text-sm">
                {COBRE.map((c) => (
                  <li key={c} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-1" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-bold mb-3">O que geralmente não cobre</h2>
              <ul className="space-y-2 text-sm">
                {NAO_COBRE.map((n) => (
                  <li key={n} className="flex items-start gap-2">
                    <span className="h-4 w-4 text-primary flex-shrink-0 mt-1">•</span>
                    <span>{n}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-muted-foreground italic mt-3">Conforme condições e exclusões da apólice.</p>
            </div>
          </div>
        </section>

        <section className="py-14">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl font-bold mb-6">Páginas dedicadas por perfil de empresa</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {CREDITO_INTENT_PAGES.map((p) => (
                <Link
                  key={p.slug}
                  to={p.path}
                  onClick={() =>
                    trackInternalLinkClick({
                      placement: "hub-grid",
                      source,
                      destination: p.path,
                      label: p.h1,
                    })
                  }
                  className="p-4 bg-white border rounded-lg hover:border-primary/60 transition"
                >
                  <span className="text-xs uppercase text-primary font-bold">{p.navLabel}</span>
                  <h3 className="font-bold mt-1 mb-1 text-sm">{p.h1}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-3">{p.subtitle}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 bg-muted">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-primary" /> Benefícios para o fluxo de caixa
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2 text-sm">
              {[
                "Menor volatilidade de recebíveis",
                "Possibilidade de ampliar prazos com segurança",
                "Suporte estruturado à análise de clientes",
                "Apoio à cobrança em atraso",
                "Maior previsibilidade financeira",
                "Melhor argumentação com bancos para desconto de recebíveis",
              ].map((b) => (
                <li key={b} className="flex items-start gap-2 p-3 bg-white border rounded">
                  <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-1" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-14">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold mb-4">Diferença entre Seguro de Crédito, cobrança e análise cadastral</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-muted">
                    <th className="text-left p-3 border">Solução</th>
                    <th className="text-left p-3 border">Objetivo</th>
                    <th className="text-left p-3 border">Quem contrata</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border font-medium">Seguro de Crédito</td>
                    <td className="p-3 border">Indenização por inadimplência dentro dos limites</td>
                    <td className="p-3 border">Empresa vendedora</td>
                  </tr>
                  <tr>
                    <td className="p-3 border font-medium">Empresa de cobrança</td>
                    <td className="p-3 border">Recuperação ativa do crédito em atraso</td>
                    <td className="p-3 border">Empresa credora</td>
                  </tr>
                  <tr>
                    <td className="p-3 border font-medium">Análise cadastral</td>
                    <td className="p-3 border">Suporte à decisão de conceder crédito</td>
                    <td className="p-3 border">Empresa credora</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="py-14 bg-muted">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" /> Documentos necessários
            </h2>
            <ul className="grid gap-2 sm:grid-cols-2 text-sm">
              {DOCUMENTOS.map((d) => (
                <li key={d} className="flex items-start gap-2 p-3 bg-white border rounded">
                  <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-1" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-muted-foreground italic mt-3">Lista varia por seguradora.</p>
          </div>
        </section>

        <section className="py-14">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl font-bold mb-4">Seguradoras parceiras</h2>
            <div className="flex flex-wrap gap-2 mb-6">
              {B2B_INSURERS_CREDITO.map((i) => (
                <span key={i} className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">
                  {i}
                </span>
              ))}
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {insurerPages.map((p) => (
                <Link
                  key={p.slug}
                  to={p.path}
                  onClick={() =>
                    trackInternalLinkClick({
                      placement: "hub-grid",
                      source,
                      destination: p.path,
                      label: `${p.insurer} — ${p.lineLabel}`,
                    })
                  }
                  className="p-3 bg-white border rounded hover:border-primary/60 transition text-sm"
                >
                  <span className="font-bold">{p.insurer}</span>
                  <span className="text-muted-foreground block text-xs">Página dedicada</span>
                </Link>
              ))}
            </div>
            <p className="text-xs text-muted-foreground italic mt-4">
              A disponibilidade de seguradoras pode variar conforme apetite de risco, faturamento, carteira de clientes e análise técnica. {TRANSPARENCY_NOTICE}
            </p>
          </div>
        </section>

        <section className="py-14 bg-muted">
          <div className="container mx-auto px-4 max-w-3xl" data-speakable="faq">
            <h2 className="text-center text-2xl md:text-3xl font-bold mb-10">Perguntas frequentes</h2>
            <div className="space-y-6">
              {CREDITO_HUB_FAQS.map((f) => (
                <div key={f.question}>
                  <h3 className="text-lg font-semibold mb-2">{f.question}</h3>
                  <p className="text-muted-foreground">{f.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 text-center">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl font-bold mb-4">Avaliar Seguro de Crédito para sua empresa</h2>
            <p className="text-muted-foreground mb-6">
              Envie uma amostra da sua carteira PJ. Nós retornamos com propostas comparadas das seguradoras parceiras.
            </p>
            <ExternalLink href={whatsappUrl} onClick={() => trackWhatsAppClick("b2b_credito_hub_cta_final")}
            >
              <Button size="lg" variant="cta" className="text-base px-8">
                <MessageCircle className="mr-2 h-5 w-5" /> Falar no WhatsApp
              </Button>
            </ExternalLink>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default SeguroDeCredito;