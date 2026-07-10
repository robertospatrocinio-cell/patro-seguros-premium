import { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import {
  ShieldCheck, Truck, PackageCheck, AlertTriangle, HeartPulse, Building2,
  Wrench, Route as RouteIcon, HandCoins, RotateCcw, Radar, ClipboardList,
  MapPin, ArrowRight,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import {
  HeroSection, LpSectionHeader, LpSteps, LpFAQ, LpFinalCTA,
  useFormScroller, buildWhatsAppUrl,
} from "@/components/lp/LpShared";
import LpEnterpriseForm from "@/components/lp/LpEnterpriseForm";
import heroImg from "@/assets/hero-seguro-maquinas.webp";

const SOURCE = "lp-locadoras-equipamentos";
const WA_MSG = "Olá! Vim pela landing page Patro Locadoras 360 e gostaria de solicitar uma análise da minha locadora.";

const journey = [
  { title: "Preparação", risks: ["Falta de manutenção"] },
  { title: "Transporte", risks: ["Danos no trajeto", "Avarias carga/descarga"] },
  { title: "Entrega", risks: ["Divergências na vistoria"] },
  { title: "No cliente", risks: ["Operação inadequada", "Acidentes com terceiros"] },
  { title: "Mudança de obra", risks: ["Roubo ou furto", "Paralisação"] },
  { title: "Devolução", risks: ["Devolução em condições diferentes", "Perda financeira"] },
];

const protections = [
  { icon: ShieldCheck, title: "Danos ao equipamento", desc: "Coberturas para eventos súbitos e imprevistos, conforme as condições do produto." },
  { icon: AlertTriangle, title: "Roubo e furto qualificado", desc: "Análise das ocorrências conforme as condições contratadas na apólice." },
  { icon: Building2, title: "Responsabilidade civil", desc: "Voltada a danos causados a terceiros durante a operação da locação." },
  { icon: HandCoins, title: "Equipamento em poder do cliente", desc: "Proteções pensadas para máquinas que operam em terceiros." },
  { icon: Truck, title: "Transporte entre obras", desc: "Cobertura da movimentação entre locais de utilização, quando prevista." },
  { icon: RouteIcon, title: "Lucros cessantes", desc: "Quando disponível e aplicável, indeniza a paralisação do equipamento." },
  { icon: Wrench, title: "Danos durante a operação", desc: "Considera os riscos da atividade realizada pelo locatário." },
  { icon: PackageCheck, title: "Proteção financeira da locação", desc: "Quando houver produto aplicável ao contrato de locação." },
  { icon: HeartPulse, title: "Vida e acidentes para funcionários", desc: "Alternativas de proteção para as equipes que operam a locadora." },
  { icon: Building2, title: "Seguro empresarial", desc: "Proteção da base da locadora — pátios, galpões, escritórios e equipamentos." },
];

const diffFactors = [
  "Tipo e valor dos equipamentos.",
  "Prazo médio das locações.",
  "Perfil dos clientes.",
  "Regiões atendidas.",
  "Uso em áreas próprias ou de terceiros.",
  "Qualificação dos operadores.",
  "Processo de entrega e retirada.",
  "Manutenção preventiva.",
  "Rastreamento e telemetria.",
  "Condições do contrato de locação.",
  "Histórico de ocorrências.",
];

const ecosystem = [
  "Rastreamento", "Telemetria", "Vistoria de entrega e devolução",
  "Checklists digitais", "Controle de manutenção", "Monitoramento de ativos",
  "Recuperação de equipamentos", "Análise de contratos por profissionais habilitados",
];

const steps = [
  { title: "Conhecemos a frota", desc: "Levantamos os equipamentos e valores envolvidos." },
  { title: "Entendemos a locação", desc: "Avaliamos modelo, prazos e contratos praticados." },
  { title: "Revisamos apólices", desc: "Analisamos os seguros existentes e as condições." },
  { title: "Mapeamos vulnerabilidades", desc: "Identificamos lacunas e sobreposições." },
  { title: "Consultamos alternativas", desc: "Buscamos soluções de seguro e prevenção." },
  { title: "Acompanhamos", desc: "Apoiamos renovações e comunicação de sinistros." },
];

const faqs = [
  { q: "Equipamentos em poder do cliente podem ser segurados?", a: "Sim, há produtos que consideram essa exposição. As condições dependem do contrato de locação e da aceitação da seguradora." },
  { q: "O transporte entre obras está automaticamente coberto?", a: "Nem sempre. Costuma ser uma cobertura adicional, sujeita ao produto e às características da movimentação." },
  { q: "Danos causados pelo operador podem ser analisados?", a: "Sim, dependendo da cobertura contratada e das circunstâncias do evento." },
  { q: "A cobertura muda conforme o tipo de equipamento?", a: "Sim. Máquinas diferentes têm exposição, valor e uso distintos, o que impacta a análise de risco." },
  { q: "É possível segurar apenas parte da frota?", a: "Sim. A análise pode contemplar um único equipamento, um grupo específico ou toda a frota." },
  { q: "Como funciona a proteção para equipamentos alugados?", a: "Existem produtos voltados a locadoras e locatários, com condições próprias definidas por cada seguradora." },
  { q: "O seguro substitui as responsabilidades do contrato de locação?", a: "Não. Cláusulas contratuais e coberturas de seguro têm finalidades próprias e devem ser analisadas em conjunto." },
  { q: "A Patro acompanha os sinistros?", a: "Sim. Apoiamos comunicação, documentação e interação com a seguradora. A decisão sobre a indenização cabe à seguradora." },
];

const SeguroLocadorasEquipamentos = () => {
  const { ref, scrollToForm, trackWa } = useFormScroller(SOURCE, "locadoras-equipamentos");

  const schema = useMemo(() => ({
    "@context": "https://schema.org", "@type": "Service",
    name: "Patro Locadoras 360 — Seguro para locadoras de equipamentos",
    provider: { "@type": "InsuranceAgency", name: "Patro Seguros" },
    serviceType: "Seguro e gestão de riscos para locadoras",
    description: "Análise integrada de danos, roubo, RC, transporte, operação em cliente e continuidade da locação.",
  }), []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <PageMeta
        title="Seguro para Locadoras de Equipamentos"
        description="Seguro especializado para locadoras de máquinas e equipamentos: danos, roubo, responsabilidade civil, transporte, operação no cliente e continuidade da locação."
      />
      <Helmet><script type="application/ld+json">{JSON.stringify(schema)}</script></Helmet>

      <Header />
      <main id="main-content">
        <HeroSection
          brand="Patro Locadoras 360"
          title="Seu equipamento está no cliente. A proteção precisa acompanhar toda a operação."
          subtitle="Seguro e gestão de riscos para locadoras de máquinas e equipamentos — da saída da base ao retorno do ativo."
          description="Analisamos o tipo de equipamento, a aplicação, o operador, o transporte, o local de trabalho e as responsabilidades previstas no contrato de locação."
          primaryCta="Solicitar análise da locadora"
          image={heroImg}
          imageAlt="Equipamentos de locação em operação"
          source={SOURCE}
          supportLine="Mais do que segurar o equipamento: compreender como sua locação funciona."
          onPrimary={() => scrollToForm("hero")}
          whatsappUrl={buildWhatsAppUrl(WA_MSG)}
          onWhatsApp={() => trackWa("hero")}
        />

        {/* JORNADA */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <LpSectionHeader
              eyebrow="Ciclo da locação"
              title="Os riscos não terminam na entrega."
              intro="Cada etapa da locação traz exposições próprias. Analisar o ciclo completo é essencial para uma proteção coerente."
            />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {journey.map((s, i) => (
                <div key={s.title} className="rounded-xl border border-border bg-card p-4">
                  <div className="flex items-center gap-2 text-primary">
                    <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">{i + 1}</span>
                    <h3 className="font-semibold text-sm">{s.title}</h3>
                  </div>
                  <ul className="mt-3 space-y-1.5 text-xs text-muted-foreground">
                    {s.risks.map((r) => <li key={r} className="flex gap-1.5"><span className="text-accent">•</span> {r}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROTEÇÕES */}
        <section id="solucoes" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 max-w-6xl">
            <LpSectionHeader eyebrow="Proteções" title="Proteções que podem ser analisadas" />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {protections.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="rounded-xl border border-border bg-card p-6 hover:border-primary hover:shadow-md transition-all">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-semibold">{title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-xs text-muted-foreground text-center max-w-3xl mx-auto">
              A cobertura de cada situação depende do produto contratado, das condições da apólice, do contrato de
              locação e da aceitação da seguradora.
            </p>
          </div>
        </section>

        {/* DIFERENCIAL */}
        <section id="diferenciais" className="py-20 bg-background">
          <div className="container mx-auto px-4 max-w-5xl">
            <LpSectionHeader
              eyebrow="Diferencial Patro"
              title="Duas locadoras com os mesmos equipamentos podem ter riscos diferentes."
              intro="Antes de buscar uma cotação, procuramos entender como os ativos são entregues, utilizados, controlados e recuperados."
            />
            <ul className="grid md:grid-cols-2 gap-3">
              {diffFactors.map((f) => (
                <li key={f} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                  <ClipboardList className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ECOSSISTEMA */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 max-w-5xl">
            <LpSectionHeader
              eyebrow="Ecossistema de prevenção"
              title="Prevenção estruturada com parceiros especializados"
            />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {ecosystem.map((e) => (
                <div key={e} className="rounded-lg bg-card border border-border p-4 flex items-center gap-3">
                  <Radar className="h-4 w-4 text-primary flex-shrink-0" />
                  <span className="text-sm">{e}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs text-muted-foreground text-center">
              Serviços complementares podem ser prestados por empresas parceiras e são contratados separadamente,
              conforme disponibilidade.
            </p>
          </div>
        </section>

        {/* COMO FUNCIONA */}
        <div id="como-funciona">
          <LpSteps eyebrow="Processo" title="Como funciona?" steps={steps} />
        </div>

        {/* FORM */}
        <section ref={ref} id="contato" className="py-20 bg-background scroll-mt-20">
          <div className="container mx-auto px-4 max-w-3xl">
            <LpSectionHeader eyebrow="Análise da locadora" title="Solicite uma análise da sua locadora" />
            <LpEnterpriseForm
              title=""
              source={SOURCE}
              insuranceType="locadoras-equipamentos"
              submitLabel="Solicitar análise"
              successMessage="Recebemos suas informações. Nossa equipe entrará em contato para conhecer melhor sua operação. O envio não representa proposta, contratação ou aceitação do risco."
              whatsappSuccessMessage={WA_MSG}
              fields={[
                { name: "name", label: "Nome", required: true, autoComplete: "name" },
                { name: "company", label: "Empresa", required: true, autoComplete: "organization" },
                { name: "phone", label: "Telefone / WhatsApp", type: "tel", required: true, mask: "phone", placeholder: "(11) 99999-9999", autoComplete: "tel" },
                { name: "email", label: "E-mail", type: "email", required: true, autoComplete: "email" },
                { name: "cityState", label: "Cidade e estado", required: true, placeholder: "Ex.: Guarulhos / SP" },
                { name: "equipmentTypes", label: "Tipos de equipamentos", required: true, placeholder: "Ex.: plataformas, empilhadeiras…" },
                { name: "quantity", label: "Quantidade aproximada" },
                { name: "fleetValue", label: "Valor aproximado da frota", placeholder: "Ex.: R$ 2 milhões" },
                { name: "regions", label: "Regiões atendidas", placeholder: "Ex.: SP, Sudeste…" },
                { name: "avgTerm", label: "Prazo médio das locações" },
                { name: "tracking", label: "Possui rastreamento?", type: "select", options: ["Sim", "Não", "Parcial"], required: true },
                { name: "hasPolicies", label: "Possui seguro vigente?", type: "select", options: ["Sim", "Não", "Não sei"], required: true },
                { name: "renewalDate", label: "Próxima renovação", type: "date" },
                { name: "notes", label: "Conte brevemente como funciona sua operação", type: "textarea" },
              ]}
            />
          </div>
        </section>

        <LpFAQ items={faqs} />

        <LpFinalCTA
          title="Seu patrimônio gera receita mesmo longe da sua empresa. Vamos analisar como protegê-lo?"
          primaryCta="Solicitar análise da locadora"
          onPrimary={() => scrollToForm("cta-final")}
          whatsappUrl={buildWhatsAppUrl(WA_MSG)}
          onWhatsApp={() => trackWa("cta-final")}
          legalNote="A contratação de seguros está sujeita às condições do produto e à análise e aceitação do risco pela seguradora. Coberturas, exclusões, limites, franquias e serviços variam conforme a apólice contratada."
        />
      </main>
      <Footer />
    </div>
  );
};

export default SeguroLocadorasEquipamentos;