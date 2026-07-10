import { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import {
  Building2, Warehouse, Package, Zap, Cpu, ShieldCheck, Users, Truck,
  CloudRain, Flame, AlertTriangle, TrendingDown, Snowflake,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import {
  HeroSection, LpSectionHeader, LpSteps, LpFAQ, LpFinalCTA,
  useFormScroller, buildWhatsAppUrl,
} from "@/components/lp/LpShared";
import LpEnterpriseForm from "@/components/lp/LpEnterpriseForm";
import heroImg from "@/assets/hero-seguro-galpoes.webp";

const SOURCE = "lp-galpoes-centros-distribuicao";
const WA_MSG = "Olá! Vim pela landing page Patro Galpões 360 e gostaria de solicitar um diagnóstico do meu galpão.";

const riskAreas = [
  { icon: Building2, label: "Prédio e estrutura" },
  { icon: Package, label: "Estoques" },
  { icon: Warehouse, label: "Máquinas e equipamentos" },
  { icon: Zap, label: "Sistemas elétricos" },
  { icon: Cpu, label: "Equipamentos eletrônicos" },
  { icon: Truck, label: "Docas" },
  { icon: Users, label: "Escritórios" },
  { icon: Warehouse, label: "Pátio" },
  { icon: Package, label: "Carga e descarga" },
  { icon: Snowflake, label: "Climatização e refrigeração" },
];

const protections = [
  { title: "Prédio e instalações", desc: "Cobertura para a estrutura física do imóvel, conforme condições contratadas." },
  { title: "Estoques e mercadorias", desc: "Proteção das mercadorias armazenadas, considerando valor e concentração." },
  { title: "Máquinas e equipamentos", desc: "Análise dos equipamentos utilizados na operação logística." },
  { title: "Incêndio", desc: "Cobertura para incêndio, raio e explosão, conforme condições." },
  { title: "Danos elétricos", desc: "Curto-circuito, sobrecarga e falhas elétricas, quando previstas." },
  { title: "Roubo", desc: "Análise conforme as condições e cláusulas específicas contratadas." },
  { title: "Alagamento e eventos climáticos", desc: "Quando disponíveis e contratados; a disponibilidade depende do risco." },
  { title: "Responsabilidade civil", desc: "Voltada a danos causados a terceiros na operação." },
  { title: "Lucros cessantes", desc: "Quando aplicável, indeniza a paralisação do negócio." },
  { title: "Equipamentos eletrônicos", desc: "Cobertura específica para eletrônicos, servidores e periféricos." },
  { title: "Operações de carga e descarga", desc: "Análise da movimentação em docas e áreas operacionais." },
  { title: "Vida e acidentes para colaboradores", desc: "Alternativas de proteção para as equipes operacionais." },
];

const mapItems = [
  "Construção e ocupação", "Proteção contra incêndio", "Instalações elétricas",
  "Armazenamento e organização do estoque", "Valor e concentração das mercadorias",
  "Controle de acesso", "Histórico de alagamento", "Drenagem e características do entorno",
  "Manutenção preventiva", "Operações nas docas", "Movimentação de empilhadeiras",
  "Planos de emergência", "Dependência de energia e sistemas", "Impacto financeiro de uma paralisação",
];

const audience = [
  "Proprietários de galpões", "Empresas locatárias", "Centros de distribuição",
  "Operadores logísticos", "Indústrias", "Atacadistas", "Distribuidores",
  "Armazéns", "Condomínios logísticos", "E-commerces",
];

const steps = [
  { title: "Levantamento inicial", desc: "Coletamos informações sobre imóvel, ocupação e atividades." },
  { title: "Análise das instalações", desc: "Avaliamos operação, docas, estoque e equipamentos." },
  { title: "Vulnerabilidades", desc: "Identificamos os principais pontos de atenção." },
  { title: "Revisão de apólices", desc: "Organizamos as coberturas atuais e lacunas." },
  { title: "Busca de alternativas", desc: "Consultamos soluções conforme o perfil de risco." },
  { title: "Acompanhamento", desc: "Apoiamos renovações, movimentações e sinistros." },
];

const faqs = [
  { q: "O seguro pode proteger prédio e estoque?", a: "Sim, são coberturas geralmente distintas, contratadas em conjunto ou separadamente conforme a necessidade." },
  { q: "Locatários também podem contratar?", a: "Sim. Locatários costumam segurar conteúdo, equipamentos e responsabilidade, além de coberturas específicas do contrato." },
  { q: "Alagamento está automaticamente coberto?", a: "Não. Eventos climáticos e alagamentos dependem do produto, da localização, do risco e das condições da seguradora." },
  { q: "Como calcular o valor adequado dos bens?", a: "Recomenda-se avaliar valor de reposição de estoque, equipamentos e estrutura. Podemos orientar a metodologia mais adequada." },
  { q: "Lucros cessantes são automáticos?", a: "Não. Lucros cessantes é uma cobertura específica que precisa ser contratada, analisada e dimensionada." },
  { q: "Operações nas docas precisam de análise específica?", a: "Sim. Docas concentram carga, descarga e movimentação com risco próprio, o que impacta a análise." },
  { q: "O mapa de vulnerabilidades é um laudo de engenharia?", a: "Não. É um diagnóstico inicial de finalidade orientativa. Não substitui laudos, perícias ou inspeções exigidas pela seguradora." },
  { q: "A Patro realiza visitas presenciais?", a: "As visitas podem ser agendadas conforme localização, disponibilidade e condições comerciais." },
  { q: "O que pode ser solicitado pela seguradora?", a: "Documentos do imóvel, laudos elétricos, sistema de combate a incêndio, fotos, valores em risco e histórico de sinistros, entre outros." },
];

const SeguroGalpoesCentrosDistribuicao = () => {
  const { ref, scrollToForm, trackWa } = useFormScroller(SOURCE, "galpoes-cd");
  const schema = useMemo(() => ({
    "@context": "https://schema.org", "@type": "Service",
    name: "Patro Galpões 360 — Seguro para galpões e centros de distribuição",
    provider: { "@type": "InsuranceAgency", name: "Patro Seguros" },
    serviceType: "Seguro empresarial para galpões, CDs e operações logísticas",
  }), []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <PageMeta
        title="Seguro para Galpões e Centros de Distribuição"
        description="Seguro empresarial para galpões, centros de distribuição, estoques, equipamentos, instalações, responsabilidade civil e continuidade operacional."
      />
      <Helmet><script type="application/ld+json">{JSON.stringify(schema)}</script></Helmet>

      <Header />
      <main id="main-content">
        <HeroSection
          brand="Patro Galpões 360"
          title="Seu galpão concentra patrimônio, estoque e operação. Os riscos também."
          subtitle="Proteção empresarial para instalações logísticas, estoques, equipamentos e continuidade do negócio."
          description="Analisamos o imóvel, a ocupação, o estoque, os equipamentos, as docas e os processos operacionais para identificar vulnerabilidades que uma cotação convencional pode não mostrar."
          primaryCta="Solicitar diagnóstico de risco"
          image={heroImg}
          imageAlt="Centro de distribuição moderno com docas e estoque"
          source={SOURCE}
          onPrimary={() => scrollToForm("hero")}
          whatsappUrl={buildWhatsAppUrl(WA_MSG)}
          onWhatsApp={() => trackWa("hero")}
        />

        {/* O QUE ESTÁ EM RISCO */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <LpSectionHeader eyebrow="O que está em risco?" title="Áreas do galpão que merecem análise" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {riskAreas.map(({ icon: Icon, label }) => (
                <div key={label} className="rounded-xl border border-border bg-card p-5 text-center hover:border-primary transition-colors">
                  <div className="w-11 h-11 rounded-lg bg-primary/10 text-primary flex items-center justify-center mx-auto">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <p className="mt-3 text-sm font-medium">{label}</p>
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
              {protections.map((p) => (
                <div key={p.title} className="rounded-xl border border-border bg-card p-6 hover:border-primary hover:shadow-md transition-all">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-lg border-l-4 border-primary/40 bg-primary/5 p-4 text-sm text-muted-foreground max-w-4xl mx-auto flex gap-3">
              <CloudRain className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <span>
                Eventos climáticos, alagamentos e outras ocorrências não possuem cobertura automática. A
                disponibilidade depende do produto, localização, análise do risco e condições da seguradora.
              </span>
            </div>
          </div>
        </section>

        {/* MAPA DE VULNERABILIDADES */}
        <section id="diferenciais" className="py-20 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <LpSectionHeader
              eyebrow="Mapa de vulnerabilidades"
              title="Antes da cotação, enxergamos a operação."
              intro="O diagnóstico poderá considerar diferentes dimensões do galpão e da operação, gerando um mapa inicial que orienta a análise."
            />

            <div className="grid md:grid-cols-3 gap-4 mb-8">
              {[
                { level: "Ponto de atenção", color: "bg-blue-50 text-blue-700 border-blue-200", icon: AlertTriangle, desc: "Aspecto que merece observação em revisões futuras." },
                { level: "Risco relevante", color: "bg-amber-50 text-amber-700 border-amber-200", icon: Flame, desc: "Situação com potencial de impacto operacional ou financeiro." },
                { level: "Ação recomendada", color: "bg-red-50 text-red-700 border-red-200", icon: TrendingDown, desc: "Ponto que sugere providência estruturada de mitigação." },
              ].map((it) => (
                <div key={it.level} className={`rounded-xl border p-5 ${it.color}`}>
                  <it.icon className="h-5 w-5 mb-2" />
                  <p className="font-semibold text-sm">{it.level}</p>
                  <p className="mt-1 text-xs opacity-80">{it.desc}</p>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              {mapItems.map((m) => (
                <div key={m} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                  <ShieldCheck className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{m}</span>
                </div>
              ))}
            </div>

            <p className="mt-6 text-xs text-muted-foreground text-center max-w-3xl mx-auto">
              O mapa tem finalidade inicial e não substitui laudos de engenharia, perícias ou inspeções exigidas pela
              seguradora. Visitas presenciais podem ser agendadas conforme localização, disponibilidade e condições
              comerciais.
            </p>
          </div>
        </section>

        {/* PARA QUEM */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 max-w-5xl">
            <LpSectionHeader eyebrow="Para quem é" title="Perfis atendidos" />
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {audience.map((a) => (
                <div key={a} className="rounded-lg bg-card border border-border p-3 text-center text-sm font-medium">
                  {a}
                </div>
              ))}
            </div>
          </div>
        </section>

        <div id="como-funciona"><LpSteps eyebrow="Processo" title="Como funciona?" steps={steps} /></div>

        {/* FORM */}
        <section ref={ref} id="contato" className="py-20 bg-background scroll-mt-20">
          <div className="container mx-auto px-4 max-w-3xl">
            <LpSectionHeader eyebrow="Diagnóstico" title="Solicite um diagnóstico inicial do seu galpão" />
            <LpEnterpriseForm
              title=""
              source={SOURCE}
              insuranceType="galpoes-cd"
              submitLabel="Solicitar diagnóstico"
              whatsappSuccessMessage={WA_MSG}
              fields={[
                { name: "name", label: "Nome", required: true, autoComplete: "name" },
                { name: "company", label: "Empresa", required: true, autoComplete: "organization" },
                { name: "phone", label: "Telefone / WhatsApp", type: "tel", required: true, mask: "phone", placeholder: "(11) 99999-9999" },
                { name: "email", label: "E-mail", type: "email", required: true },
                { name: "cityState", label: "Cidade e estado", required: true },
                { name: "area", label: "Área aproximada (m²)", placeholder: "Ex.: 5.000" },
                { name: "activity", label: "Atividade realizada", required: true, placeholder: "Ex.: e-commerce, distribuição…" },
                { name: "ownership", label: "Tipo de ocupação", type: "select", options: ["Proprietário", "Locatário", "Operador logístico"], required: true },
                { name: "stockType", label: "Tipo de estoque", placeholder: "Ex.: eletrônicos, alimentos…" },
                { name: "stockValue", label: "Valor aproximado do estoque" },
                { name: "equipValue", label: "Valor aproximado de máquinas/equipamentos" },
                { name: "fireSystem", label: "Sistema de combate a incêndio?", type: "select", options: ["Sim", "Não", "Parcial"], required: true },
                { name: "floodHistory", label: "Histórico de alagamento?", type: "select", options: ["Sim", "Não", "Não sei"], required: true },
                { name: "hasPolicies", label: "Possui seguro vigente?", type: "select", options: ["Sim", "Não", "Não sei"], required: true },
                { name: "renewalDate", label: "Data da renovação", type: "date" },
                { name: "notes", label: "Conte brevemente como funciona a operação", type: "textarea" },
              ]}
            />
          </div>
        </section>

        <LpFAQ items={faqs} />

        <LpFinalCTA
          title="Descubra as vulnerabilidades antes que elas interrompam sua operação."
          primaryCta="Solicitar diagnóstico de risco"
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

export default SeguroGalpoesCentrosDistribuicao;