import { Link } from "react-router-dom";
import { ShieldCheck, MessageCircle, ArrowRight, CheckCircle, FileText, Building2 } from "lucide-react";
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
  GARANTIA_HUB_PATH,
  GARANTIA_LOCAL_PATH,
  GARANTIA_HUB_FAQS,
  GARANTIA_INTENT_PAGES,
  B2B_INSURERS_GARANTIA,
  B2B_INSURER_PAGES,
  PRUDENT_LANGUAGE,
  TRANSPARENCY_NOTICE,
} from "@/data/b2bVertical";

const TIPOS = [
  { title: "Seguro Garantia para licitação", desc: "Bid bond e performance bond em concorrências públicas e privadas." },
  { title: "Seguro Garantia contratual", desc: "Execução de contratos privados, fornecimento, prestação de serviços." },
  { title: "Seguro Garantia judicial", desc: "Substituição de depósitos e cauções em processos, quando aceito pelo juízo." },
  { title: "Adiantamento de pagamento", desc: "Garantia sobre valores adiantados pelo contratante." },
  { title: "Retenção de pagamento", desc: "Substituição da retenção contratual por apólice." },
  { title: "Execução (performance)", desc: "Garantia de execução do objeto contratado." },
  { title: "Construção civil", desc: "Modalidades específicas para obras públicas e privadas." },
  { title: "Prestação de serviços", desc: "Contratos recorrentes de serviços." },
  { title: "Fornecedores", desc: "Contratos B2B com grandes clientes." },
];

const DOCUMENTOS = [
  "Cartão CNPJ e contrato social atualizados",
  "Últimos balanços patrimoniais",
  "Faturamento dos últimos 12 meses",
  "Certidões negativas",
  "Edital ou contrato (ou minuta) a ser garantido",
  "Comprovante de endereço da empresa",
  "Referências comerciais quando solicitadas",
];

const PUBLICOS = [
  "Empresas que participam de licitações",
  "Construtoras e incorporadoras",
  "Prestadores de serviço",
  "Fornecedores B2B",
  "Indústrias e transportadoras",
  "Empresas de tecnologia com contratos relevantes",
  "Empresas de facilities e manutenção",
  "Empresas de engenharia",
  "Importadoras e exportadoras",
  "Empresas com contratos públicos ou privados",
];

const SeguroGarantia = () => {
  const canonicalUrl = `${CANONICAL_BASE_URL}${GARANTIA_HUB_PATH}`;
  const source = buildInternalLinkSource("hub", "seguro-garantia");
  const whatsappUrl = buildWhatsAppUrl({
    origem: "b2b_garantia_hub",
    extraLines: [
      "Olá, quero cotar Seguro Garantia pela Patro Seguros. Posso enviar meu edital/contrato para análise?",
    ],
  });

  const insurerPages = B2B_INSURER_PAGES.filter((p) => p.line === "garantia");

  return (
    <>
      <PageMeta
        title="Seguro Garantia em Guarulhos e SP | Cotação Patro Seguros"
        description="Cote Seguro Garantia com a Patro Seguros. Atendimento para empresas de Guarulhos, São Paulo e todo o Brasil em licitações, contratos e obrigações."
      />
      <FAQSchema faqs={GARANTIA_HUB_FAQS} />
      <ServiceSchema
        name="Seguro Garantia"
        serviceType="Seguro Garantia"
        description="Seguro Garantia para empresas, contratos e licitações — intermediação pela Patro Seguros."
      />
      <Header />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <div className="container mx-auto px-4 pt-6">
          <Breadcrumb items={[{ label: "Seguro Garantia" }]} />
        </div>

        <section className="gradient-hero py-16 md:py-20">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 border border-white/20 text-white/90 mb-4">
              Contratos • Licitações • Judicial
            </span>
            <h1 className="text-white mb-4">Seguro Garantia para empresas, contratos e licitações</h1>
            <p className="text-lg text-white/85 max-w-2xl mx-auto mb-8">
              A Patro Seguros compara opções de Seguro Garantia com seguradoras parceiras para empresas que precisam proteger contratos, participar de licitações ou substituir garantias tradicionais.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ExternalLink href={whatsappUrl} onClick={() => trackWhatsAppClick("b2b_garantia_hub")}
              >
                <Button size="lg" variant="cta" className="text-base px-6">
                  <MessageCircle className="mr-2 h-5 w-5" /> Cotar Seguro Garantia
                </Button>
              </ExternalLink>
              <Link
                to={GARANTIA_LOCAL_PATH}
                onClick={() =>
                  trackInternalLinkClick({
                    placement: "cta-block",
                    source,
                    destination: GARANTIA_LOCAL_PATH,
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
            <h2 className="text-2xl md:text-3xl font-bold mb-4">O que é Seguro Garantia</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              O Seguro Garantia é uma modalidade que pode ser utilizada para garantir o cumprimento de obrigações assumidas em contratos, licitações, processos judiciais ou administrativos, conforme as condições da apólice e exigências do contratante.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              É frequentemente utilizado como alternativa a garantias tradicionais como caução em dinheiro ou fiança bancária. {PRUDENT_LANGUAGE}
            </p>
          </div>
        </section>

        <section className="py-14 bg-muted">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl font-bold mb-4">Para que serve</h2>
            <ul className="grid gap-3 sm:grid-cols-2 text-sm">
              {[
                "Participar de licitações públicas e privadas",
                "Garantir a execução de contratos privados",
                "Substituir depósitos judiciais quando aceito pelo juízo",
                "Garantir adiantamentos recebidos do contratante",
                "Substituir retenções contratuais",
                "Garantir prestação de serviços contínuos",
                "Garantir fornecimento a grandes contas",
                "Atender exigências de manutenção pós-obra",
              ].map((u) => (
                <li key={u} className="flex items-start gap-2 p-3 bg-white border rounded">
                  <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-1" />
                  <span>{u}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-14">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl font-bold mb-6">Quem precisa contratar</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 text-sm">
              {PUBLICOS.map((p) => (
                <div key={p} className="flex items-start gap-2 p-3 bg-muted rounded">
                  <Building2 className="h-4 w-4 text-primary flex-shrink-0 mt-1" />
                  <span>{p}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 bg-muted">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-2xl font-bold mb-6">Tipos de Seguro Garantia</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {TIPOS.map((t) => (
                <div key={t.title} className="p-4 bg-white border rounded-lg">
                  <div className="flex items-center gap-2 text-primary mb-1">
                    <ShieldCheck className="h-4 w-4" />
                    <span className="text-xs uppercase tracking-wider font-bold">Modalidade</span>
                  </div>
                  <h3 className="font-bold mb-1">{t.title}</h3>
                  <p className="text-sm text-muted-foreground">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl font-bold mb-6">Páginas dedicadas por intenção</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {GARANTIA_INTENT_PAGES.map((p) => (
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
            <h2 className="text-2xl font-bold mb-4">Diferença entre Seguro Garantia, fiança bancária e caução</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-white">
                    <th className="text-left p-3 border">Aspecto</th>
                    <th className="text-left p-3 border">Seguro Garantia</th>
                    <th className="text-left p-3 border">Fiança bancária</th>
                    <th className="text-left p-3 border">Caução em dinheiro</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="p-3 border font-medium">Impacto no caixa</td>
                    <td className="p-3 border">Baixo (paga prêmio)</td>
                    <td className="p-3 border">Consome limite bancário</td>
                    <td className="p-3 border">Imobiliza capital</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="p-3 border font-medium">Emitente</td>
                    <td className="p-3 border">Seguradora</td>
                    <td className="p-3 border">Banco</td>
                    <td className="p-3 border">Empresa contratante</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="p-3 border font-medium">Prazo</td>
                    <td className="p-3 border">Definido em apólice</td>
                    <td className="p-3 border">Definido no contrato bancário</td>
                    <td className="p-3 border">Até liberação do contratante</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="p-3 border font-medium">Aceitação</td>
                    <td className="p-3 border" colSpan={3}>Depende de edital/contrato e regras do contratante.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="py-14">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" /> Documentos necessários
            </h2>
            <ul className="grid gap-2 sm:grid-cols-2 text-sm">
              {DOCUMENTOS.map((d) => (
                <li key={d} className="flex items-start gap-2 p-3 bg-muted rounded">
                  <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-1" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-muted-foreground mt-3 italic">Lista varia por seguradora, valor e modalidade.</p>
          </div>
        </section>

        <section className="py-14 bg-muted">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl font-bold mb-4">Como cotar com a Patro</h2>
            <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 text-sm">
              {[
                "Envie edital, contrato ou minuta.",
                "Analisamos o caso e o perfil da empresa.",
                "Cotamos com múltiplas seguradoras parceiras.",
                "Comparamos propostas e apoiamos a emissão.",
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
            <h2 className="text-2xl font-bold mb-4">Seguradoras parceiras</h2>
            <div className="flex flex-wrap gap-2 mb-6">
              {B2B_INSURERS_GARANTIA.map((i) => (
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
            <p className="text-xs text-muted-foreground italic mt-4">{TRANSPARENCY_NOTICE}</p>
          </div>
        </section>

        <section className="py-14 bg-muted">
          <div className="container mx-auto px-4 max-w-3xl" data-speakable="faq">
            <h2 className="text-center text-2xl md:text-3xl font-bold mb-10">Perguntas frequentes</h2>
            <div className="space-y-6">
              {GARANTIA_HUB_FAQS.map((f) => (
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
            <h2 className="text-3xl font-bold mb-4">Envie seu edital ou contrato para análise</h2>
            <p className="text-muted-foreground mb-6">
              A Patro Seguros analisa o caso e retorna com propostas comparadas de seguradoras parceiras.
            </p>
            <ExternalLink href={whatsappUrl} onClick={() => trackWhatsAppClick("b2b_garantia_hub_cta_final")}
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

export default SeguroGarantia;