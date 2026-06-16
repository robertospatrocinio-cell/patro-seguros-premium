import { lazy, Suspense } from "react";
import PageMeta from "@/components/PageMeta";
import Breadcrumb from "@/components/Breadcrumb";
import PremiumShell from "@/components/premium/PremiumShell";
import PremiumHero from "@/components/premium/PremiumHero";
import PremiumSection from "@/components/premium/PremiumSection";
import PremiumTrustBlock from "@/components/premium/PremiumTrustBlock";
import { getMetadataForRoute } from "@/lib/seoMetadata";

const Header = lazy(() => import("@/components/Header"));
const Footer = lazy(() => import("@/components/Footer"));
const PatroPrivateForm = lazy(() => import("@/components/premium/PatroPrivateForm"));

const solutions = [
  { title: "Veículos premium", body: "Importados, SUVs de alto valor, executivos e veículos de coleção. Casco compreensivo, rede de oficinas autorizadas e RC compatível." },
  { title: "Residências de alto padrão", body: "Casas em condomínio e apartamentos com bens de valor, obras, áreas de lazer e RC familiar adequada." },
  { title: "Empresários e executivos", body: "Vida, saúde, D&O, RC profissional e proteção da remuneração. Continuidade pessoal e patrimonial." },
  { title: "Proteção familiar e sucessória", body: "Arquitetura integrada de vida, previdência e liquidez sucessória para herdeiros." },
  { title: "Responsabilidade civil", body: "RC familiar, profissional e operacional, com limites compatíveis com o patrimônio." },
  { title: "Cyber e riscos digitais", body: "Proteção contra vazamento de dados, sequestro de dados e responsabilidade LGPD." },
  { title: "Empresas e patrimônio corporativo", body: "Galpões, indústrias, frota, lucros cessantes e estrutura sucessória da empresa familiar." },
];

const howItWorks = [
  { step: "01", title: "Diagnóstico", body: "Conversa inicial com o consultor para mapear patrimônio, dependentes, dívidas e exposições." },
  { step: "02", title: "Análise de riscos", body: "Leitura técnica das exposições pessoais, familiares e corporativas." },
  { step: "03", title: "Comparação técnica", body: "Cotação simultânea entre seguradoras parceiras, linha a linha das coberturas." },
  { step: "04", title: "Recomendação consultiva", body: "Apresentação da estrutura recomendada, sem foco em preço isolado." },
  { step: "05", title: "Acompanhamento", body: "Revisão periódica, suporte em sinistro e ajuste anual da apólice." },
];

const PatroPrivate = () => {
  const meta = getMetadataForRoute("/patro-private");
  return (
    <>
      <PageMeta
        title={meta?.title || "Patro Private | Seguros Premium em Guarulhos"}
        description={
          meta?.description ||
          "Consultoria em seguros premium para veículos de alto valor, residências, empresários e proteção patrimonial em Guarulhos."
        }
      />
      <Suspense fallback={null}>
        <Header />
      </Suspense>
      <PremiumShell>
        <PremiumHero
          eyebrow="Patro Private"
          title="Proteção Patrimonial e Seguros Premium"
          subtitle="Uma vertical da Patro Seguros dedicada a clientes que buscam mais do que preço: análise técnica, atendimento consultivo e proteção sob medida."
          primaryCta={{ label: "Solicitar análise personalizada", href: "#analise" }}
          secondaryCta={{ label: "Falar com um consultor", href: "https://wa.me/551151997500" }}
        />

        <div className="bg-white">
          <div className="mx-auto max-w-5xl px-6 py-6">
            <Breadcrumb items={[{ label: "Início", href: "/" }, { label: "Patro Private" }]} />
          </div>
        </div>

        <PremiumSection title="Por que a Patro Private existe" bg="white">
          <p
            className="text-lg md:text-xl leading-relaxed max-w-3xl"
            style={{ color: "hsl(var(--premium-ink))" }}
          >
            A Patro Private foi criada para clientes com patrimônio relevante — pessoas e famílias para quem uma apólice mal desenhada não é um aborrecimento, é um risco real. Trabalhamos com análise técnica, comparação consultiva entre seguradoras parceiras e acompanhamento contínuo.
          </p>
        </PremiumSection>

        <PremiumSection eyebrow="Soluções" title="O que estruturamos">
          <div className="grid md:grid-cols-2 gap-x-10 gap-y-10">
            {solutions.map((s) => (
              <div key={s.title}>
                <h3
                  className="font-serif text-2xl mb-3"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: "hsl(var(--premium-navy))" }}
                >
                  {s.title}
                </h3>
                <p className="text-base leading-relaxed" style={{ color: "hsl(var(--premium-ink))" }}>
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </PremiumSection>

        <PremiumSection eyebrow="Processo" title="Como funciona o atendimento" bg="white">
          <div className="space-y-10 max-w-3xl">
            {howItWorks.map((h) => (
              <div key={h.step} className="grid grid-cols-[auto_1fr] gap-6">
                <div
                  className="font-serif text-3xl pt-1"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: "hsl(var(--premium-champagne))" }}
                >
                  {h.step}
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1.5" style={{ color: "hsl(var(--premium-navy))" }}>
                    {h.title}
                  </h3>
                  <p className="text-base leading-relaxed" style={{ color: "hsl(var(--premium-ink))" }}>
                    {h.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </PremiumSection>

        <PremiumSection eyebrow="Confiança" title="Por que clientes de Guarulhos escolhem a Patro">
          <PremiumTrustBlock />
          <ul className="mt-10 grid md:grid-cols-2 gap-x-10 gap-y-3 max-w-3xl">
            {[
              "Atendimento local em Guarulhos / Cidade Maia",
              "Comparação entre 16+ seguradoras parceiras",
              "Consultoria na escolha das coberturas",
              "Apoio em renovação e sinistro",
              "Especialização em pessoas, empresas e patrimônio",
              "Sem foco em preço isolado: foco em adequação técnica",
            ].map((i) => (
              <li key={i} className="flex gap-3 text-base" style={{ color: "hsl(var(--premium-ink))" }}>
                <span aria-hidden style={{ color: "hsl(var(--premium-champagne))" }}>—</span>
                <span>{i}</span>
              </li>
            ))}
          </ul>
        </PremiumSection>

        <div id="analise" />
        <PremiumSection eyebrow="Análise personalizada" title="Solicitar uma conversa consultiva" bg="white">
          <p
            className="text-base leading-relaxed max-w-2xl mb-8"
            style={{ color: "hsl(var(--premium-ink))" }}
          >
            Preencha os campos abaixo para que um consultor entre em contato. A análise inicial é sem compromisso.
          </p>
          <Suspense fallback={null}>
            <PatroPrivateForm />
          </Suspense>
        </PremiumSection>
      </PremiumShell>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  );
};

export default PatroPrivate;