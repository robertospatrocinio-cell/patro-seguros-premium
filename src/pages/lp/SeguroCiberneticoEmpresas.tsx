import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  ShieldCheck, Server, Mail, KeyRound, Lock, Cloud, AlertTriangle,
  DatabaseBackup, Users, FileWarning, Scale, LifeBuoy, GraduationCap,
  Radar, ClipboardCheck, ExternalLink,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import { Button } from "@/components/ui/button";
import {
  HeroSection, LpSectionHeader, LpSteps, LpFAQ, LpFinalCTA,
  useFormScroller, buildWhatsAppUrl,
} from "@/components/lp/LpShared";
import LpEnterpriseForm from "@/components/lp/LpEnterpriseForm";
import heroImg from "@/assets/hero-seguro-cyber.webp";

const SOURCE = "lp-cibernetico-empresas";
const WA_MSG = "Olá! Vim pela landing page Patro Cyber PME e gostaria de solicitar um diagnóstico cibernético inicial.";
// TODO: substituir pelo link oficial da Susep sobre cibernético.
const SUSEP_LINK = "";

const routineRisks = [
  { icon: Mail, title: "E-mail corporativo comprometido" },
  { icon: Users, title: "Golpes e engenharia social" },
  { icon: Lock, title: "Sequestro de dados" },
  { icon: FileWarning, title: "Vazamento de informações" },
  { icon: Server, title: "Indisponibilidade de sistemas" },
  { icon: Cloud, title: "Ataques a fornecedores" },
  { icon: KeyRound, title: "Acessos indevidos" },
  { icon: DatabaseBackup, title: "Falhas de backup" },
  { icon: FileWarning, title: "Perda de documentos" },
  { icon: AlertTriangle, title: "Interrupção da operação" },
];

const pillars = [
  { icon: ShieldCheck, title: "Seguro cibernético", desc: "Consulta de alternativas para transferência do risco." },
  { icon: Radar, title: "Diagnóstico básico de vulnerabilidades", desc: "Levantamento inicial de pontos de atenção." },
  { icon: Scale, title: "Adequação à LGPD", desc: "Encaminhamento a parceiros jurídicos especializados." },
  { icon: GraduationCap, title: "Treinamento contra golpes", desc: "Ações educativas para colaboradores." },
  { icon: ClipboardCheck, title: "Plano de resposta a incidentes", desc: "Estruturação de resposta e comunicação." },
  { icon: DatabaseBackup, title: "Backup, monitoramento e segurança", desc: "Encaminhamento a parceiros técnicos especializados." },
];

const coverages = [
  "Resposta a incidentes",
  "Investigação técnica",
  "Recuperação de dados",
  "Comunicação a titulares e autoridades",
  "Responsabilidade por dados de terceiros",
  "Defesa e despesas jurídicas",
  "Interrupção do negócio",
  "Extorsão cibernética, quando disponível",
  "Gestão de crise",
  "Responsabilidade por falhas de segurança",
];

const audience = [
  "Transportadoras", "Indústrias", "Distribuidores", "Escritórios profissionais",
  "Clínicas", "E-commerces", "Empresas de serviços", "Escolas",
  "Administradoras", "Empresas com dados de clientes", "Dependentes de sistemas de gestão",
];

const diagQuestions = [
  "Autenticação em dois fatores?",
  "Backups frequentes?",
  "Backups testados?",
  "Treinamento contra golpes?",
  "Controle de acesso por usuário?",
  "Plano de resposta a incidentes?",
  "Suporte especializado?",
  "Armazena dados pessoais ou financeiros?",
  "Depende de sistemas para faturar?",
  "Já sofreu incidente?",
];

const steps = [
  { title: "Dependência digital", desc: "Entendemos a operação e sistemas críticos." },
  { title: "Levantamento inicial", desc: "Aplicamos um diagnóstico básico." },
  { title: "Pontos de atenção", desc: "Identificamos vulnerabilidades relevantes." },
  { title: "Soluções disponíveis", desc: "Consultamos alternativas de seguro." },
  { title: "Parceiros especializados", desc: "Conectamos serviços quando necessário." },
  { title: "Contratação e sinistros", desc: "Apoiamos renovação e comunicação." },
];

const faqs = [
  { q: "Seguro cibernético é apenas para grandes empresas?", a: "Não. Há produtos voltados a PMEs, com condições ajustadas ao porte e ao perfil da empresa." },
  { q: "O seguro substitui controles de segurança?", a: "Não. O seguro complementa os controles, mas não substitui backup, autenticação, treinamento e demais boas práticas." },
  { q: "Ataques anteriores precisam ser informados?", a: "Sim. Informações omitidas podem prejudicar a aceitação do risco e a análise de futuros sinistros." },
  { q: "A LGPD exige a contratação de seguro?", a: "A LGPD não exige seguro. Ela impõe obrigações relativas ao tratamento de dados pessoais, avaliadas por profissionais jurídicos." },
  { q: "Todos os ataques estão cobertos?", a: "Não. Coberturas, exclusões, limites, carências e franquias variam entre seguradoras e produtos." },
  { q: "O que é resposta a incidentes?", a: "Conjunto de ações técnicas e jurídicas para conter, investigar e comunicar um incidente cibernético." },
  { q: "Backup garante a recuperação?", a: "Não. Backups precisam ser testados e protegidos. Sem verificação periódica, a recuperação pode falhar." },
  { q: "O diagnóstico inicial é uma auditoria?", a: "Não. É um levantamento educativo e orientativo, sem valor de auditoria ou certificação." },
  { q: "Quem presta os serviços técnicos?", a: "Serviços técnicos e jurídicos são prestados por parceiros especializados, mediante contratação separada." },
  { q: "Como funciona um sinistro cibernético?", a: "O incidente é comunicado à seguradora, que analisa cobertura, documentação e conduz a regulação conforme a apólice." },
];

// ---------- Simple diagnostic quiz ----------
function useDiagnosticQuiz() {
  const [answers, setAnswers] = useState<boolean[]>(new Array(diagQuestions.length).fill(false));
  const score = answers.filter(Boolean).length;
  const level =
    score <= 3 ? { label: "Atenção inicial", desc: "Alguns controles básicos podem estar faltando. Vale um diagnóstico estruturado.", tone: "border-red-200 bg-red-50 text-red-700" }
    : score <= 6 ? { label: "Estrutura intermediária", desc: "A empresa possui parte dos controles, mas há espaço para amadurecer a resposta.", tone: "border-amber-200 bg-amber-50 text-amber-700" }
    : { label: "Controles mais desenvolvidos", desc: "A operação demonstra controles em evolução. A revisão periódica segue recomendada.", tone: "border-emerald-200 bg-emerald-50 text-emerald-700" };
  const toggle = (i: number) => setAnswers((a) => a.map((v, idx) => (idx === i ? !v : v)));
  return { answers, toggle, score, level };
}

const SeguroCiberneticoEmpresas = () => {
  const { ref, scrollToForm, trackWa } = useFormScroller(SOURCE, "cibernetico-empresas");
  const { answers, toggle, score, level } = useDiagnosticQuiz();

  const schema = useMemo(() => ({
    "@context": "https://schema.org", "@type": "Service",
    name: "Patro Cyber PME — Seguro cibernético para pequenas e médias empresas",
    provider: { "@type": "InsuranceAgency", name: "Patro Seguros" },
    serviceType: "Seguro cibernético e serviços preventivos",
  }), []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <PageMeta
        title="Seguro Cibernético para PMEs"
        description="Seguro cibernético e prevenção para empresas que dependem de sistemas, dados e operações digitais, com diagnóstico inicial e parceiros especializados."
      />
      <Helmet><script type="application/ld+json">{JSON.stringify(schema)}</script></Helmet>

      <Header />
      <main id="main-content">
        <HeroSection
          brand="Patro Cyber PME"
          title="Se o sistema parar, quanto tempo sua empresa consegue operar?"
          subtitle="Seguro cibernético e serviços preventivos para pequenas e médias empresas."
          description="Um incidente digital pode interromper vendas, faturamento, emissão de documentos, produção, logística e atendimento. A proteção começa antes do ataque."
          primaryCta="Solicitar diagnóstico cibernético"
          secondaryCta="Falar com um especialista"
          image={heroImg}
          imageAlt="Equipe trabalhando com computadores e sistemas em ambiente corporativo"
          source={SOURCE}
          onPrimary={() => scrollToForm("hero")}
          whatsappUrl={buildWhatsAppUrl(WA_MSG)}
          onWhatsApp={() => trackWa("hero")}
        />

        {/* RISCO NA ROTINA */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <LpSectionHeader eyebrow="Rotina digital" title="O risco digital está na rotina" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {routineRisks.map(({ icon: Icon, title }) => (
                <div key={title} className="rounded-xl border border-border bg-card p-5 text-center">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mx-auto">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <p className="mt-3 text-sm font-medium">{title}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs text-muted-foreground text-center">
              As situações acima ilustram exposições comuns e não implicam cobertura automática.
            </p>
          </div>
        </section>

        {/* SOLUÇÃO INTEGRADA */}
        <section id="solucoes" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 max-w-6xl">
            <LpSectionHeader eyebrow="Solução integrada" title="Seis pilares para reduzir a exposição" />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {pillars.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="rounded-xl border border-border bg-card p-6 hover:border-primary hover:shadow-md transition-all">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold">{title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs text-muted-foreground text-center max-w-3xl mx-auto">
              Os serviços técnicos e jurídicos complementares podem ser prestados por parceiros especializados,
              mediante contratação separada.
            </p>
          </div>
        </section>

        {/* COBERTURAS */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 max-w-5xl">
            <LpSectionHeader eyebrow="Coberturas" title="O que pode ser analisado no seguro" />
            <div className="grid md:grid-cols-2 gap-3">
              {coverages.map((c) => (
                <div key={c} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                  <ShieldCheck className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{c}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-lg border-l-4 border-primary/40 bg-primary/5 p-5 text-sm text-muted-foreground">
              As coberturas variam significativamente entre seguradoras e produtos. Incidentes anteriores, controles
              de segurança, atividades da empresa, limites, carências, franquias e exclusões devem ser avaliados antes
              da contratação.
            </div>
          </div>
        </section>

        {/* PARA QUEM */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 max-w-5xl">
            <LpSectionHeader eyebrow="Para quem é" title="Perfis mais expostos" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {audience.map((a) => (
                <div key={a} className="rounded-lg bg-card border border-border p-3 text-center text-sm font-medium">{a}</div>
              ))}
            </div>
          </div>
        </section>

        {/* DIAGNÓSTICO INTERATIVO */}
        <section id="diferenciais" className="py-20 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <LpSectionHeader
              eyebrow="Diagnóstico rápido"
              title="Como está a maturidade digital da sua empresa?"
              intro="Marque as afirmações que se aplicam. É um resultado educativo, não uma auditoria."
            />
            <div className="grid md:grid-cols-2 gap-3">
              {diagQuestions.map((q, i) => (
                <label key={q} className={`flex items-start gap-3 rounded-lg border p-4 cursor-pointer transition-colors ${answers[i] ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/40"}`}>
                  <input
                    type="checkbox"
                    checked={answers[i]}
                    onChange={() => toggle(i)}
                    className="mt-1 h-4 w-4"
                  />
                  <span className="text-sm">{q}</span>
                </label>
              ))}
            </div>

            <div className={`mt-8 rounded-xl border p-6 ${level.tone}`}>
              <p className="text-xs font-semibold uppercase tracking-wide">Resultado indicativo</p>
              <p className="mt-2 text-xl font-bold">{level.label} <span className="opacity-70 text-base">({score}/{diagQuestions.length})</span></p>
              <p className="mt-2 text-sm opacity-90">{level.desc}</p>
            </div>

            <p className="mt-4 text-xs text-muted-foreground text-center">
              Este resultado é apenas educativo e não constitui auditoria, laudo, certificação de segurança ou
              garantia de aceitação do seguro.
            </p>
          </div>
        </section>

        <div id="como-funciona"><LpSteps eyebrow="Processo" title="Como funciona?" steps={steps} /></div>

        {/* FORM */}
        <section ref={ref} id="contato" className="py-20 bg-background scroll-mt-20">
          <div className="container mx-auto px-4 max-w-3xl">
            <LpSectionHeader eyebrow="Diagnóstico cibernético" title="Solicite um diagnóstico cibernético inicial" />
            <LpEnterpriseForm
              title=""
              source={SOURCE}
              insuranceType="cibernetico-empresas"
              submitLabel="Solicitar diagnóstico"
              whatsappSuccessMessage={WA_MSG}
              fields={[
                { name: "name", label: "Nome", required: true, autoComplete: "name" },
                { name: "company", label: "Empresa", required: true, autoComplete: "organization" },
                { name: "phone", label: "Telefone / WhatsApp", type: "tel", required: true, mask: "phone" },
                { name: "email", label: "E-mail corporativo", type: "email", required: true },
                { name: "cityState", label: "Cidade e estado", required: true },
                { name: "sector", label: "Setor de atividade", required: true, placeholder: "Ex.: e-commerce, indústria…" },
                { name: "employees", label: "Quantidade de colaboradores" },
                { name: "personalData", label: "Armazena dados pessoais?", type: "select", options: ["Sim", "Não", "Não sei"], required: true },
                { name: "cloud", label: "Utiliza sistemas em nuvem?", type: "select", options: ["Sim", "Não", "Parcial"], required: true },
                { name: "backup", label: "Possui backup?", type: "select", options: ["Sim", "Não", "Não sei"], required: true },
                { name: "mfa", label: "Autenticação em dois fatores?", type: "select", options: ["Sim", "Não", "Parcial"], required: true },
                { name: "priorIncident", label: "Já enfrentou incidente?", type: "select", options: ["Sim", "Não", "Prefiro não informar"], required: true },
                { name: "hasCyberPolicy", label: "Possui seguro cibernético?", type: "select", options: ["Sim", "Não", "Não sei"], required: true },
                { name: "notes", label: "Espaço livre (sem senhas, credenciais ou detalhes técnicos sensíveis)", type: "textarea" },
              ]}
            />
          </div>
        </section>

        {/* SUSEP / REG */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <LpSectionHeader
              eyebrow="Referência regulatória"
              title="O risco cibernético está na agenda do mercado segurador."
              intro="A Susep mantém estudos e orientações relacionados à segurança cibernética, aos seguros e aos desafios criados pela economia digital. A evolução desse ambiente reforça a importância de combinar prevenção, resposta e transferência de riscos."
            />
            {SUSEP_LINK ? (
              <a
                href={SUSEP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary underline"
              >
                Acessar referência oficial <ExternalLink className="h-4 w-4" />
              </a>
            ) : (
              <p className="text-xs text-muted-foreground">
                Espaço reservado para inserir posteriormente o link oficial da Susep.
              </p>
            )}
            <p className="mt-6 text-xs text-muted-foreground max-w-2xl mx-auto">
              A referência regulatória não implica endosso da Patro Seguros pela Susep.
            </p>
          </div>
        </section>

        <LpFAQ items={faqs} />

        <LpFinalCTA
          title="Proteja a continuidade da empresa, não apenas os computadores."
          primaryCta="Solicitar diagnóstico cibernético"
          onPrimary={() => scrollToForm("cta-final")}
          whatsappUrl={buildWhatsAppUrl(WA_MSG)}
          onWhatsApp={() => trackWa("cta-final")}
          legalNote="A contratação de seguros está sujeita às condições do produto e à análise e aceitação do risco pela seguradora."
        />
      </main>
      <Footer />
    </div>
  );
};

export default SeguroCiberneticoEmpresas;