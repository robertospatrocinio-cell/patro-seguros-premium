import { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import {
  Briefcase, Users, Scale, Leaf, ShieldCheck, HeartPulse, ExternalLink,
  GraduationCap, Building2,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import {
  HeroSection, LpSectionHeader, LpSteps, LpFAQ, LpFinalCTA,
  useFormScroller,
} from "@/components/lp/LpShared";
import LpEnterpriseForm from "@/components/lp/LpEnterpriseForm";
import { buildLpWhatsAppUrl, getLpWhatsAppMessage } from "@/lib/whatsapp";
import heroImg from "@/assets/hero-seguro-empresarial.webp";

const SOURCE = "lp-responsabilidade-admin-profissionais";
// Templates de WhatsApp por CTA vivem em `src/lib/whatsapp.ts`
// (`LP_WHATSAPP_TEMPLATES["lp-responsabilidade-admin-profissionais"]`).
// TODO: substituir pelo link oficial da Susep sobre seguros de responsabilidade.
const SUSEP_LINK = "";

const audience = [
  "Sócios", "Diretores", "Conselheiros", "Administradores", "Gestores",
  "Engenheiros", "Consultores", "Profissionais liberais", "Prestadores de serviços",
  "Empresas com exposição ambiental", "Empresas que atendem terceiros", "Empresas com foco em sucessão",
];

const solutions = [
  { icon: Briefcase, name: "D&O — Administradores", desc: "Voltada à análise de reclamações relacionadas a atos de gestão praticados por administradores no exercício de suas funções, conforme as condições contratadas. A cobertura pertence ao produto e não protege automaticamente qualquer conduta." },
  { icon: GraduationCap, name: "RC Profissional", desc: "Proteção relacionada a reclamações por falhas, erros ou omissões na prestação de serviços profissionais, conforme atividade e condições da apólice." },
  { icon: Leaf, name: "RC Ambiental", desc: "Solução para empresas expostas a responsabilidades relacionadas a danos ambientais, custos emergenciais e outras consequências previstas no produto contratado." },
  { icon: Building2, name: "RC Geral", desc: "Proteção relacionada a danos involuntários causados a terceiros durante atividades, operações ou uso de instalações, conforme a cobertura contratada." },
  { icon: HeartPulse, name: "Vida Empresarial", desc: "Alternativas de proteção para sócios, administradores e colaboradores, com coberturas e assistências definidas na contratação." },
];

const comparison = [
  { name: "D&O", focus: "Decisões e atos de gestão", audience: "Administradores e executivos", example: "Reclamação relacionada a uma decisão administrativa" },
  { name: "RC Profissional", focus: "Prestação de serviços profissionais", audience: "Empresas e profissionais", example: "Alegação de erro ou omissão profissional" },
  { name: "RC Geral", focus: "Danos involuntários a terceiros na operação", audience: "Empresas", example: "Ocorrência envolvendo cliente, visitante ou operação" },
  { name: "RC Ambiental", focus: "Responsabilidades ambientais", audience: "Empresas com exposição ambiental", example: "Evento de poluição ou contaminação, conforme cobertura" },
  { name: "Vida Empresarial", focus: "Proteção de pessoas", audience: "Sócios, administradores e colaboradores", example: "Eventos relacionados à vida e acidentes, conforme o plano" },
];

const reasons = [
  "Crescimento da complexidade empresarial.",
  "Contratos com clientes e fornecedores.",
  "Decisões de gestão.",
  "Prestação de serviços técnicos.",
  "Exposição a reclamações de terceiros.",
  "Riscos ambientais.",
  "Proteção de pessoas-chave.",
  "Continuidade e planejamento empresarial.",
];

const steps = [
  { title: "Conhecemos a empresa", desc: "Entendemos atividade, porte e estrutura societária." },
  { title: "Identificamos funções", desc: "Mapeamos administradores e responsabilidades assumidas." },
  { title: "Avaliamos contratos", desc: "Analisamos exposições contratuais e operacionais." },
  { title: "Revisamos seguros", desc: "Organizamos coberturas existentes e lacunas." },
  { title: "Buscamos alternativas", desc: "Consultamos soluções adequadas ao perfil." },
  { title: "Acompanhamos", desc: "Apoiamos contratação, renovação e sinistros." },
];

const faqs = [
  { q: "O que é seguro D&O?", a: "É uma modalidade voltada à análise de reclamações relacionadas a atos de gestão de administradores, conforme as condições contratadas." },
  { q: "O patrimônio pessoal do administrador fica automaticamente protegido?", a: "Não. A proteção depende da cobertura contratada, das condições da apólice e da análise do evento pela seguradora." },
  { q: "D&O cobre qualquer decisão ou conduta?", a: "Não. Existem exclusões, hipóteses de perda de cobertura e critérios de aceitação. Cada caso é avaliado pela seguradora." },
  { q: "Qual a diferença entre D&O e RC Profissional?", a: "D&O trata de atos de gestão de administradores. RC Profissional trata de falhas na prestação de serviços profissionais. São modalidades distintas." },
  { q: "Quem pode contratar RC Profissional?", a: "Profissionais e empresas prestadoras de serviços, conforme a atividade. Os produtos variam por segmento profissional." },
  { q: "RC Geral cobre danos ambientais?", a: "Em regra, não. Danos ambientais possuem produto próprio de responsabilidade civil ambiental." },
  { q: "Quais empresas devem analisar RC Ambiental?", a: "Empresas com atividades que envolvem risco ambiental, armazenamento, transporte de produtos ou operações potencialmente poluentes." },
  { q: "Seguro de vida empresarial pode incluir sócios?", a: "Sim. Sócios, administradores e colaboradores podem ser incluídos conforme o plano contratado." },
  { q: "É possível contratar mais de uma modalidade?", a: "Sim. Muitas empresas combinam D&O, RC Geral, RC Profissional e Vida Empresarial conforme sua exposição." },
  { q: "Como funciona uma reclamação ou sinistro?", a: "A reclamação é comunicada à seguradora, que avalia cobertura, documentação e conduz a regulação conforme a apólice." },
];

const ResponsabilidadeAdministradoresProfissionais = () => {
  const { ref, scrollToForm, trackWa } = useFormScroller(SOURCE, "responsabilidade-empresarial");
  const schema = useMemo(() => ({
    "@context": "https://schema.org", "@type": "Service",
    name: "Patro Responsabilidade Empresarial",
    provider: { "@type": "InsuranceAgency", name: "Patro Seguros" },
    serviceType: "D&O, RC Profissional, RC Ambiental, RC Geral e Vida Empresarial",
  }), []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <PageMeta
        title="Seguro D&O e Responsabilidade Civil Empresarial"
        description="Proteções para administradores, profissionais e empresas: D&O, responsabilidade civil profissional, ambiental, geral e seguro de vida empresarial."
      />
      <Helmet><script type="application/ld+json">{JSON.stringify(schema)}</script></Helmet>

      <Header />
      <main id="main-content">
        <HeroSection
          brand="Patro Responsabilidade Empresarial"
          title="Decisões profissionais podem gerar responsabilidades pessoais e empresariais."
          subtitle="Proteções para administradores, profissionais, empresas, colaboradores e riscos relacionados à atividade empresarial."
          description="Analisamos a atividade, as responsabilidades assumidas e a exposição da empresa para identificar as soluções que podem fazer sentido."
          primaryCta="Solicitar análise de responsabilidade"
          image={heroImg}
          imageAlt="Reunião executiva em ambiente corporativo"
          source={SOURCE}
          onPrimary={() => scrollToForm("hero")}
          whatsappUrl={buildLpWhatsAppUrl(SOURCE, "hero")}
          onWhatsApp={() => trackWa("hero")}
        />

        {/* PARA QUEM */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <LpSectionHeader eyebrow="Público" title="Quem pode precisar dessa proteção?" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {audience.map((a) => (
                <div key={a} className="rounded-lg bg-card border border-border p-4 flex items-center gap-3">
                  <Users className="h-4 w-4 text-primary flex-shrink-0" />
                  <span className="text-sm font-medium">{a}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SOLUÇÕES */}
        <section id="solucoes" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 max-w-6xl">
            <LpSectionHeader eyebrow="Soluções" title="Cinco modalidades para analisar" />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {solutions.map(({ icon: Icon, name, desc }) => (
                <div key={name} className="rounded-xl border border-border bg-card p-6 hover:border-primary hover:shadow-md transition-all">
                  <div className="w-11 h-11 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-semibold">{name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* COMPARATIVO */}
        <section id="diferenciais" className="py-20 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <LpSectionHeader
              eyebrow="Qual é a diferença?"
              title="Comparativo educativo entre as modalidades"
              intro="Cada modalidade tem foco e público próprios. A escolha depende da atividade, das responsabilidades assumidas e do perfil da empresa."
            />

            {/* Tabela desktop */}
            <div className="hidden md:block overflow-x-auto rounded-xl border border-border bg-card">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/40 text-left">
                    <th className="p-4 font-semibold">Modalidade</th>
                    <th className="p-4 font-semibold">Foco</th>
                    <th className="p-4 font-semibold">Público</th>
                    <th className="p-4 font-semibold">Exemplo ilustrativo</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((c, i) => (
                    <tr key={c.name} className={i % 2 ? "bg-muted/20" : ""}>
                      <td className="p-4 font-semibold text-primary">{c.name}</td>
                      <td className="p-4">{c.focus}</td>
                      <td className="p-4">{c.audience}</td>
                      <td className="p-4 text-muted-foreground">{c.example}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Cards mobile */}
            <div className="md:hidden space-y-3">
              {comparison.map((c) => (
                <div key={c.name} className="rounded-xl border border-border bg-card p-4">
                  <p className="font-semibold text-primary">{c.name}</p>
                  <p className="mt-2 text-xs"><strong>Foco:</strong> {c.focus}</p>
                  <p className="mt-1 text-xs"><strong>Público:</strong> {c.audience}</p>
                  <p className="mt-1 text-xs text-muted-foreground"><strong>Exemplo:</strong> {c.example}</p>
                </div>
              ))}
            </div>

            <p className="mt-6 text-xs text-muted-foreground text-center max-w-3xl mx-auto">
              Os exemplos são apenas ilustrativos e não confirmam cobertura. A caracterização de cada evento depende
              da apólice, das circunstâncias e da análise da seguradora.
            </p>
          </div>
        </section>

        {/* POR QUE ANALISAR */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 max-w-5xl">
            <LpSectionHeader eyebrow="Motivadores" title="Por que analisar essas proteções?" />
            <ul className="grid md:grid-cols-2 gap-3">
              {reasons.map((r) => (
                <li key={r} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                  <Scale className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div id="como-funciona"><LpSteps eyebrow="Processo" title="Como funciona?" steps={steps} /></div>

        {/* FORM */}
        <section ref={ref} id="contato" className="py-20 bg-background scroll-mt-20">
          <div className="container mx-auto px-4 max-w-3xl">
            <LpSectionHeader eyebrow="Análise" title="Solicite uma análise das responsabilidades da sua empresa" />
            <LpEnterpriseForm
              title=""
              source={SOURCE}
              insuranceType="responsabilidade-empresarial"
              submitLabel="Solicitar análise"
              whatsappSuccessMessage={getLpWhatsAppMessage(SOURCE, "success")}
              fields={[
                { name: "name", label: "Nome", required: true, autoComplete: "name" },
                { name: "company", label: "Empresa", required: true, autoComplete: "organization" },
                { name: "role", label: "Cargo", required: true },
                { name: "phone", label: "Telefone / WhatsApp", type: "tel", required: true, mask: "phone" },
                { name: "email", label: "E-mail corporativo", type: "email", required: true },
                { name: "cityState", label: "Cidade e estado", required: true },
                { name: "sector", label: "Setor de atividade", required: true },
                { name: "employees", label: "Quantidade de colaboradores" },
                { name: "adminCount", label: "Nº aproximado de sócios e administradores" },
                { name: "servicesProfessional", label: "Presta serviços profissionais?", type: "select", options: ["Sim", "Não", "Parcialmente"], required: true },
                { name: "environmentalExposure", label: "Possui exposição ambiental?", type: "select", options: ["Sim", "Não", "Não sei"], required: true },
                { name: "contractsThirdParties", label: "Mantém contratos relevantes com terceiros?", type: "select", options: ["Sim", "Não", "Alguns"], required: true },
                { name: "interests", label: "Quais proteções deseja analisar?", type: "checkboxGroup", options: ["D&O", "RC Profissional", "RC Ambiental", "RC Geral", "Vida Empresarial"], required: true },
                { name: "hasPolicies", label: "Possui seguros vigentes?", type: "select", options: ["Sim", "Não", "Não sei"], required: true },
                { name: "renewalDate", label: "Data de renovação", type: "date" },
                { name: "notes", label: "Conte brevemente sobre a atividade e responsabilidades", type: "textarea" },
              ]}
            />
          </div>
        </section>

        <LpFAQ items={faqs} />

        {/* REG */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <LpSectionHeader
              eyebrow="Seção regulatória"
              title="Cada responsabilidade exige uma análise própria."
              intro="O mercado supervisionado pela Susep contempla diferentes grupos de seguros de responsabilidade, incluindo modalidades relacionadas a administradores, profissionais, riscos ambientais, riscos cibernéticos e responsabilidade geral."
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
              <p className="text-xs text-muted-foreground">Espaço reservado para inserir posteriormente o link oficial da Susep.</p>
            )}
            <p className="mt-4 text-xs text-muted-foreground max-w-2xl mx-auto">
              A referência regulatória não implica endosso da Patro Seguros pela Susep.
            </p>
          </div>
        </section>

        <LpFinalCTA
          title="Proteja a empresa, quem decide e quem presta o serviço."
          primaryCta="Solicitar análise de responsabilidade"
          onPrimary={() => scrollToForm("cta-final")}
          whatsappUrl={buildLpWhatsAppUrl(SOURCE, "cta-final")}
          onWhatsApp={() => trackWa("cta-final")}
          legalNote="A contratação de seguros está sujeita às condições do produto e à análise e aceitação do risco pela seguradora."
        />
      </main>
      <Footer />
    </div>
  );
};

export default ResponsabilidadeAdministradoresProfissionais;