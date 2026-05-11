import { useParams, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import LocalPageTemplate, {
  type LocalFAQ,
  type LocalInsurer,
  type LocalTestimonial,
} from "@/components/LocalPageTemplate";
import { seoLocalPages } from "@/data/seoLocalAutoPages";
import { seoLocalSaudePages } from "@/data/seoLocalSaudePages";
import { DEFAULT_INSURERS, DEFAULT_TESTIMONIALS } from "@/data/localDefaults";
import heroImg from "@/assets/hero-seguro-auto.webp";
import LazySection from "@/components/LazySection";

const GalpaoStickyCTABar = lazy(() => import("@/components/GalpaoStickyCTABar"));

/**
 * Slugs do cluster Seguro de Galpão que devem renderizar a barra fixa de
 * conversão dedicada (Pedir Cotação + WhatsApp visível em todos os
 * viewports). Mantém o conjunto restrito ao cluster para preservar a
 * UX de outras páginas locais que já usam o StickyQuoteBar mobile-only.
 */
const GALPAO_CLUSTER_SLUGS = new Set<string>([
  "seguro-galpao-guarulhos",
  "seguro-galpao-cumbica",
]);

interface SeoLocalPageProps {
  slug?: string;
}

const SeoLocalPage = ({ slug: slugProp }: SeoLocalPageProps) => {
  const params = useParams();
  const slug = slugProp ?? params.slug;
  if (!slug) return <Navigate to="/404" replace />;
  const config = seoLocalPages[slug] || seoLocalSaudePages[slug];
  if (!config) return <Navigate to="/404" replace />;

  // Tipos requerem tuplas mínimas — fazemos cast seguro pois validamos em runtime/dev.
  const faqs = config.faqs as unknown as [LocalFAQ, LocalFAQ, LocalFAQ, LocalFAQ, LocalFAQ, ...LocalFAQ[]];
  const insurers = (config.insurers ?? DEFAULT_INSURERS).slice(0, 9) as unknown as [
    LocalInsurer, LocalInsurer, LocalInsurer, LocalInsurer, ...LocalInsurer[],
  ];
  const testimonials = (config.testimonials ?? DEFAULT_TESTIMONIALS).slice(0, 4) as unknown as [
    LocalTestimonial, LocalTestimonial, ...LocalTestimonial[],
  ];
  const realScenarios = config.realScenarios as unknown as [
    { title: string; description: string },
    { title: string; description: string },
    ...{ title: string; description: string }[],
  ];

  return (
    <>
    <LocalPageTemplate
      slug={config.slug}
      title={config.title}
      subtitle={config.subtitle}
      metaDescription={config.metaDescription}
      icon={config.icon}
      city={config.city ?? "Guarulhos"}
      neighborhood={config.neighborhood}
      geo={config.geo}
      description={config.description}
      detailedDescription={config.detailedDescription}
      pricing={{
        intro: config.pricingIntro,
        factors: config.pricingFactors,
        note: config.pricingNote,
        range: config.priceRange,
      }}
      faqs={faqs}
      insurers={insurers}
      testimonials={testimonials}
      realScenarios={realScenarios}
      coverages={config.coverages}
      whoNeeds={config.whoNeeds}
      whyPatro={config.whyPatro}
      tips={config.tips}
      nearbyAreas={config.nearbyAreas}
      relatedInsurances={config.relatedInsurances}
      heroImage={heroImg}
      whatsappMessage={`Olá! Vim pela página ${config.title} e gostaria de uma cotação rápida.`}
    />
    {GALPAO_CLUSTER_SLUGS.has(config.slug) && (
      <Suspense fallback={null}>
        <GalpaoStickyCTABar
          source={config.slug}
          whatsappMessage={`Olá! Vim da página ${config.title} e quero cotar Seguro de Galpão.`}
        />
      </Suspense>
    )}
    </>
  );
};

export default SeoLocalPage;