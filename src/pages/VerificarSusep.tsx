import { Fragment } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, ExternalLink, CheckCircle, Search, FileText, AlertTriangle, MessageCircle, BadgeCheck } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import Breadcrumb from "@/components/Breadcrumb";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import HowToSchema from "@/components/HowToSchema";
import FAQSchema from "@/components/FAQSchema";
import SpeakableSchema from "@/components/SpeakableSchema";
import PersonAuthorsSchema from "@/components/PersonAuthorsSchema";
import { Button } from "@/components/ui/button";
import { trackWhatsAppClick } from "@/lib/tracking";

const CANONICAL = "https://www.patroseguros.com.br/verificar-susep";
const SUSEP_URL = "https://www2.susep.gov.br/safe/menumercado/regcorretores/pesquisa.asp";
const CNPJ_URL = "https://solucoes.receita.fazenda.gov.br/servicos/cnpjreva/cnpjreva_solicitacao.asp";
const WHATSAPP_URL = "https://wa.me/551151997500?text=Ol%C3%A1%2C%20quero%20confirmar%20o%20registro%20SUSEP%20da%20Patro.";

const passos = [
  {
    name: "Abra o portal oficial da SUSEP",
    text: "Acesse a página pública de consulta de corretores da Superintendência de Seguros Privados (autarquia federal ligada ao Ministério da Fazenda).",
    url: SUSEP_URL,
  },
  {
    name: "Selecione a opção 'Corretor de Seguros Pessoa Jurídica'",
    text: "Corretoras são registradas como PJ. No formulário, escolha a opção correspondente e informe o CNPJ 41.641.558/0001-33 ou o número SUSEP 212113511.",
  },
  {
    name: "Confirme os dados retornados",
    text: "Devem constar: razão social 'Patro Corretora de Seguros', CNPJ 41.641.558/0001-33, registro SUSEP 212113511, situação 'Ativo' e sede em Guarulhos/SP.",
  },
  {
    name: "(Opcional) Consulte também o CNPJ na Receita Federal",
    text: "No cartão CNPJ oficial da Receita Federal, confirme a atividade principal 6622-3-00 (Corretores e agentes de seguros) e a situação cadastral 'Ativa'.",
    url: CNPJ_URL,
  },
  {
    name: "Ver perfis públicos e reputação",
    text: "Cruze com fontes independentes: perfil no Google Business (4.7★, 27+ avaliações), LinkedIn corporativo e Reclame Aqui — todos abertos e verificáveis.",
  },
];

const faqs = [
  {
    question: "O que é o registro SUSEP e por que ele importa?",
    answer: "SUSEP é a Superintendência de Seguros Privados, autarquia federal vinculada ao Ministério da Fazenda que autoriza e fiscaliza corretoras de seguro no Brasil. Contratar apólice com corretora sem registro SUSEP ativo é ilegal e deixa o consumidor sem proteção regulatória — o registro é o mínimo de confiança exigido pela Lei 4.594/1964.",
  },
  {
    question: "Qual é o número SUSEP e o CNPJ da Patro?",
    answer: "Patro Corretora de Seguros — CNPJ 41.641.558/0001-33, registro SUSEP nº 212113511, situação ativa, sede em Cidade Maia (Guarulhos/SP). Ambos são conferíveis nas fontes oficiais linkadas nesta página.",
  },
  {
    question: "Os sócios Roberto e Sandra Patrocínio também têm habilitação SUSEP?",
    answer: "Sim. Roberto Patrocínio e Sandra Patrocínio atuam sob o registro SUSEP 212113511 da Patro Corretora de Seguros e são corretores habilitados. O certificado individual do corretor responsável pode ser solicitado à Patro por qualquer cliente.",
  },
  {
    question: "O que fazer se a consulta SUSEP retornar 'inativo' ou 'não encontrado'?",
    answer: "Se você fez a consulta em uma corretora qualquer e o retorno for 'inativo', 'cassado' ou 'não encontrado', não contrate. Denuncie o CNPJ à SUSEP em www.gov.br/susep e no Procon local. No caso da Patro, o registro é ativo e permanente — se houver dúvida, fale conosco no WhatsApp que enviamos o print da consulta.",
  },
  {
    question: "Preciso pagar algo para consultar?",
    answer: "Não. As consultas SUSEP e Receita Federal são 100% gratuitas, públicas e sem cadastro. Desconfie de qualquer serviço pago que ofereça 'validação SUSEP' — não existe.",
  },
];

const VerificarSusep = () => {
  return (
    <Fragment>
      <PageMeta
        title="Como Verificar o Registro SUSEP da Patro Seguros | Passo a Passo Oficial"
        description="Passo a passo para conferir o registro SUSEP 212113511 e o CNPJ 41.641.558/0001-33 da Patro Corretora nas fontes oficiais. Links diretos, FAQ e evidências públicas."
      />
      <BreadcrumbSchema
        items={[
          { name: "Início", url: "/" },
          { name: "Sobre", url: "/sobre" },
          { name: "Verificar habilitação SUSEP", url: "/verificar-susep" },
        ]}
      />
      <FAQSchema faqs={faqs} />
      <HowToSchema
        name="Como verificar o registro SUSEP da Patro Corretora de Seguros"
        description="Passo a passo público e gratuito para confirmar o registro SUSEP 212113511 e o CNPJ 41.641.558/0001-33 da Patro Corretora."
        totalTime="PT5M"
        tool={["Navegador web", "Consulta pública SUSEP", "Consulta pública Receita Federal"]}
        steps={passos}
        url={CANONICAL}
      />
      <SpeakableSchema url={CANONICAL} />
      <PersonAuthorsSchema />

      <Header />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <Breadcrumb items={[{ label: "Sobre", href: "/sobre" }, { label: "Verificar habilitação SUSEP" }]} />

        {/* Hero */}
        <section className="gradient-hero py-20 md:py-24">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
              <BadgeCheck className="h-4 w-4" /> Transparência regulatória
            </div>
            <h1 className="text-white mb-4">Verifique o registro SUSEP da Patro Seguros</h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto" data-speakable="answer">
              A Patro Corretora de Seguros opera sob o registro SUSEP nº <strong>212113511</strong> e CNPJ
              <strong> 41.641.558/0001-33</strong>. Nesta página você confere em menos de 5 minutos, nas fontes oficiais,
              que o registro está ativo — e como fazer o mesmo com qualquer outra corretora antes de contratar.
            </p>
          </div>
        </section>

        {/* Cards com os 2 links oficiais */}
        <section className="py-12 -mt-10">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="grid md:grid-cols-2 gap-5">
              <a
                href={SUSEP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-background border-2 border-primary/20 hover:border-primary rounded-2xl p-6 shadow-lg transition-all hover:shadow-xl"
              >
                <div className="flex items-start justify-between mb-3">
                  <ShieldCheck className="h-8 w-8 text-primary" />
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h2 className="text-lg font-bold mb-1">Consulta SUSEP</h2>
                <p className="text-sm text-muted-foreground mb-3">Portal oficial da Superintendência de Seguros Privados.</p>
                <p className="text-xs font-mono bg-muted/60 px-2 py-1 rounded inline-block">SUSEP 212113511</p>
              </a>

              <a
                href={CNPJ_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-background border-2 border-primary/20 hover:border-primary rounded-2xl p-6 shadow-lg transition-all hover:shadow-xl"
              >
                <div className="flex items-start justify-between mb-3">
                  <FileText className="h-8 w-8 text-primary" />
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h2 className="text-lg font-bold mb-1">Cartão CNPJ (Receita Federal)</h2>
                <p className="text-sm text-muted-foreground mb-3">Situação cadastral e atividade principal.</p>
                <p className="text-xs font-mono bg-muted/60 px-2 py-1 rounded inline-block">41.641.558/0001-33</p>
              </a>
            </div>
          </div>
        </section>

        {/* Passo a passo */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full mb-3">
                <Search className="h-4 w-4" /> 5 minutos · totalmente gratuito
              </div>
              <h2 className="mb-2">Passo a passo para conferir</h2>
              <p className="text-sm text-muted-foreground">Use este roteiro para validar qualquer corretora antes de contratar — não só a Patro.</p>
            </div>

            <ol className="space-y-4">
              {passos.map((p, i) => (
                <li
                  key={p.name}
                  data-speakable="faq"
                  className="bg-background border rounded-xl p-5 flex gap-4"
                >
                  <span className="shrink-0 w-9 h-9 rounded-full bg-primary text-white font-bold text-sm flex items-center justify-center">
                    {i + 1}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-semibold text-base mb-1">{p.name}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed" data-speakable-answer>
                      {p.text}
                    </p>
                    {p.url && (
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline mt-2"
                      >
                        Abrir portal oficial <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Ficha de verificação rápida */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-center mb-2">O que deve constar na consulta</h2>
            <p className="text-center text-sm text-muted-foreground mb-8">
              Compare cada item abaixo com o retorno da consulta SUSEP. Todos devem bater — se algo divergir, fale conosco.
            </p>
            <div className="bg-background border rounded-2xl overflow-hidden">
              <dl>
                {[
                  { k: "Razão social", v: "Patro Corretora de Seguros" },
                  { k: "Nome fantasia", v: "Patro Seguros" },
                  { k: "CNPJ", v: "41.641.558/0001-33" },
                  { k: "Registro SUSEP", v: "212113511 — Ativo" },
                  { k: "Atividade principal (CNAE)", v: "6622-3-00 · Corretores e agentes de seguros" },
                  { k: "Sede", v: "Cidade Maia · Guarulhos/SP" },
                  { k: "Corretores responsáveis", v: "Roberto Patrocínio · Sandra Patrocínio" },
                ].map((row, i) => (
                  <div key={row.k} className={`flex flex-col sm:flex-row sm:justify-between gap-1 px-5 py-4 ${i % 2 ? "bg-muted/40" : ""}`}>
                    <dt className="text-sm font-semibold text-foreground">{row.k}</dt>
                    <dd className="text-sm text-muted-foreground font-mono">
                      <CheckCircle className="inline h-4 w-4 text-emerald-600 mr-1.5 align-text-bottom" />
                      {row.v}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* Cross-links E-E-A-T */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-center mb-8">Outras evidências públicas</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { label: "Ficha técnica completa da corretora", href: "/sobre#ficha-tecnica", internal: true },
                { label: "Credenciais dos autores (Roberto e Sandra)", href: "/sobre#credenciais-autores", internal: true },
                { label: "Página no Google Maps (4.7★)", href: "https://www.google.com/maps?cid=273879799324962533" },
                { label: "LinkedIn corporativo", href: "https://www.linkedin.com/company/patro-seguros" },
                { label: "Site oficial da SUSEP", href: "https://www.gov.br/susep" },
                { label: "Lei 4.594/1964 (regulamento do corretor)", href: "https://www.planalto.gov.br/ccivil_03/leis/l4594.htm" },
              ].map((l) =>
                l.internal ? (
                  <Link key={l.label} to={l.href} className="border rounded-xl p-4 text-sm hover:border-primary transition-colors flex items-center justify-between gap-2">
                    <span>{l.label}</span>
                    <span className="text-primary">→</span>
                  </Link>
                ) : (
                  <a
                    key={l.label}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border rounded-xl p-4 text-sm hover:border-primary transition-colors flex items-center justify-between gap-2"
                  >
                    <span>{l.label}</span>
                    <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                  </a>
                )
              )}
            </div>
          </div>
        </section>

        {/* FAQ visível */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-center mb-8">Perguntas frequentes sobre habilitação</h2>
            <div className="space-y-3">
              {faqs.map((f) => (
                <details
                  key={f.question}
                  data-speakable="faq"
                  className="group bg-background border rounded-xl p-4 [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="cursor-pointer font-semibold text-sm flex items-center justify-between gap-3">
                    <span>{f.question}</span>
                    <span className="text-primary group-open:rotate-180 transition-transform">▾</span>
                  </summary>
                  <p className="text-sm text-muted-foreground mt-3 leading-relaxed" data-speakable-answer>
                    {f.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA + alerta */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="border border-amber-200 bg-amber-50 rounded-2xl p-5 mb-8 flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-900">
                <strong>Denúncia de irregularidade:</strong> se você identificar uma corretora atuando sem SUSEP,
                denuncie gratuitamente pelo portal <a href="https://www.gov.br/susep" target="_blank" rel="noopener noreferrer" className="underline">gov.br/susep</a>
                {" "}ou pelo Procon do seu município. Contratar seguro fora da regulação é crime previsto pela Lei 4.594/1964.
              </p>
            </div>

            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Quer que a Patro envie o print da consulta SUSEP direto no seu WhatsApp?
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("verificar-susep-cta")}
              >
                <Button variant="cta" size="lg" className="rounded-lg">
                  <MessageCircle className="mr-2 h-5 w-5" /> Receber comprovante no WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </Fragment>
  );
};

export default VerificarSusep;