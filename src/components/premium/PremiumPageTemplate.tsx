import { lazy, Suspense } from "react";
import PageMeta from "@/components/PageMeta";
import Breadcrumb from "@/components/Breadcrumb";
import PremiumShell from "./PremiumShell";
import PremiumHero from "./PremiumHero";
import PremiumSection from "./PremiumSection";
import PremiumTrustBlock from "./PremiumTrustBlock";
import type { PremiumPageContent } from "@/data/premiumPagesContent";
import { getMetadataForRoute } from "@/lib/seoMetadata";

const Header = lazy(() => import("@/components/Header"));
const Footer = lazy(() => import("@/components/Footer"));
const PatroPrivateForm = lazy(() => import("./PatroPrivateForm"));

interface Props {
  content: PremiumPageContent;
}

export const PremiumPageTemplate = ({ content }: Props) => {
  const meta = getMetadataForRoute(content.slug);
  const title = meta?.title || content.eyebrow;
  const description = meta?.description || content.heroSubtitle;
  const h1 = meta?.h1 || content.eyebrow;

  return (
    <>
      <PageMeta title={title} description={description} />
      <Suspense fallback={null}>
        <Header />
      </Suspense>
      <PremiumShell>
        <PremiumHero
          eyebrow={content.eyebrow}
          title={h1}
          subtitle={content.heroSubtitle}
          primaryCta={{ label: "Solicitar análise personalizada", href: "/patro-private#analise" }}
          secondaryCta={{ label: "Falar com um consultor", href: "https://wa.me/551151997500" }}
        />

        <div className="bg-white">
          <div className="mx-auto max-w-5xl px-6 py-6">
            <Breadcrumb
              items={[
                { label: "Início", href: "/" },
                { label: "Patro Private", href: "/patro-private" },
                { label: content.eyebrow.replace(/^.*?·\s*/, "") },
              ]}
            />
          </div>
        </div>

        <PremiumSection title={content.eyebrow.split("·").pop()?.trim() || "Visão geral"} bg="white">
          <p className="text-lg leading-relaxed max-w-3xl" style={{ color: "hsl(var(--premium-ink))" }}>
            {content.intro}
          </p>
        </PremiumSection>

        <PremiumSection eyebrow="Audiência" title={content.audience.title}>
          <ul className="grid md:grid-cols-2 gap-x-10 gap-y-4">
            {content.audience.items.map((i) => (
              <li
                key={i}
                className="flex gap-3 text-base leading-relaxed"
                style={{ color: "hsl(var(--premium-ink))" }}
              >
                <span aria-hidden style={{ color: "hsl(var(--premium-champagne))" }}>—</span>
                <span>{i}</span>
              </li>
            ))}
          </ul>
        </PremiumSection>

        <PremiumSection eyebrow="Coberturas" title={content.coverages.title} bg="white">
          <div className="grid md:grid-cols-2 gap-x-10 gap-y-8">
            {content.coverages.items.map((c) => (
              <div key={c.name}>
                <h3 className="text-base font-semibold mb-1.5" style={{ color: "hsl(var(--premium-navy))" }}>
                  {c.name}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "hsl(var(--premium-ink))" }}>
                  {c.desc}
                </p>
              </div>
            ))}
          </div>
        </PremiumSection>

        <PremiumSection eyebrow="O que comparar" title={content.compareChecklist.title}>
          <ul className="space-y-3 max-w-3xl">
            {content.compareChecklist.items.map((i) => (
              <li key={i} className="flex gap-3 text-base" style={{ color: "hsl(var(--premium-ink))" }}>
                <span aria-hidden style={{ color: "hsl(var(--premium-champagne))" }}>·</span>
                <span>{i}</span>
              </li>
            ))}
          </ul>
        </PremiumSection>

        <PremiumSection eyebrow="Atenção" title={content.commonMistakes.title} bg="white">
          <ul className="space-y-3 max-w-3xl">
            {content.commonMistakes.items.map((i) => (
              <li key={i} className="flex gap-3 text-base" style={{ color: "hsl(var(--premium-ink))" }}>
                <span aria-hidden style={{ color: "hsl(var(--premium-champagne))" }}>·</span>
                <span>{i}</span>
              </li>
            ))}
          </ul>
        </PremiumSection>

        <PremiumSection eyebrow="Perguntas frequentes" title="Dúvidas que recebemos com frequência">
          <div className="space-y-8 max-w-3xl">
            {content.faqs.map((f) => (
              <div key={f.question}>
                <h3 className="text-lg font-medium mb-2" style={{ color: "hsl(var(--premium-navy))" }}>
                  {f.question}
                </h3>
                <p className="text-base leading-relaxed" style={{ color: "hsl(var(--premium-ink))" }}>
                  {f.answer}
                </p>
              </div>
            ))}
          </div>
        </PremiumSection>

        <PremiumSection eyebrow="Patro Private" title="Solicitar análise personalizada" bg="white">
          <Suspense fallback={null}>
            <PatroPrivateForm />
          </Suspense>
        </PremiumSection>

        <PremiumSection eyebrow="Sobre a Patro" title="Confiança em números reais">
          <PremiumTrustBlock />
          {content.relatedCta && content.relatedCta.length > 0 && (
            <div className="mt-12 flex flex-wrap gap-3">
              {content.relatedCta.map((c) => (
                <a
                  key={c.href}
                  href={c.href}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm border transition"
                  style={{
                    borderColor: "hsl(var(--premium-navy))",
                    color: "hsl(var(--premium-navy))",
                  }}
                >
                  {c.label} <span aria-hidden>→</span>
                </a>
              ))}
            </div>
          )}
        </PremiumSection>
      </PremiumShell>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  );
};

export default PremiumPageTemplate;