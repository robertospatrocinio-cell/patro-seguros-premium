import { useParams, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import LocalPageTemplate, {
  type LocalFAQ,
  type LocalInsurer,
  type LocalTestimonial,
} from "@/components/LocalPageTemplate";
import { seoLocalPages } from "@/data/seoLocalAutoPages";
import { seoLocalSaudePages } from "@/data/seoLocalSaudePages";
import { seoModeloAutoPages } from "@/data/seoModelosAutoPages";

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
  const config = seoLocalPages[slug] || seoLocalSaudePages[slug] || seoModeloAutoPages[slug];
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
      heroImage={config.slug.includes("volvo")
        ? "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop"
        : config.slug.includes("land-rover") 
        ? "https://images.unsplash.com/photo-1734364147225-19185de620e4?q=80&w=2070&auto=format&fit=crop"
        : config.slug.includes("jaguar")
        ? "https://images.unsplash.com/photo-1574044536224-037048a609d0?q=80&w=2070&auto=format&fit=crop"
        : config.slug.includes("audi")
        ? "https://images.unsplash.com/photo-1549416878-b9ca95e26903?q=80&w=2070&auto=format&fit=crop"
        : config.slug.includes("byd")
        ? "https://images.unsplash.com/photo-1718042457813-f4702f2323e2?q=80&w=2070&auto=format&fit=crop"
        : config.slug.includes("gwm")
        ? "https://images.unsplash.com/photo-1702525790471-ef6652c42171?q=80&w=2070&auto=format&fit=crop"
        : config.slug.includes("jeep")
        ? "https://images.unsplash.com/photo-1620248430635-f0cc71871239?q=80&w=2070&auto=format&fit=crop"
        : config.slug.includes("bmw")
        ? "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070&auto=format&fit=crop"
        : config.slug.includes("mercedes")
        ? "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2070&auto=format&fit=crop"
        : config.slug.includes("porsche")
        ? "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=2070&auto=format&fit=crop"
        : config.slug.includes("ferrari")
        ? "https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=2070&auto=format&fit=crop"
        : config.slug.includes("lexus")
        ? "https://images.unsplash.com/photo-1707026563720-40e8a7da0e8f?q=80&w=2070&auto=format&fit=crop"
        : config.slug.includes("ford")
        ? "https://images.unsplash.com/photo-1707255198045-814ca55260f9?q=80&w=2070&auto=format&fit=crop"
        : config.slug.includes("honda")
        ? "https://images.unsplash.com/photo-1707172798935-773a4b910e97?q=80&w=2070&auto=format&fit=crop"
        : config.slug.includes("toyota")
        ? "https://images.unsplash.com/photo-1621135802920-133df287f89c?q=80&w=2070&auto=format&fit=crop"
        : config.slug.includes("volkswagen")
        ? "https://images.unsplash.com/photo-1621135802920-133df287f89c?q=80&w=2070&auto=format&fit=crop"
        : config.slug.includes("chevrolet")
        ? "https://images.unsplash.com/photo-1695642646639-661788775f0a?q=80&w=2000&auto=format&fit=crop"
        : config.slug.includes("fiat")
        ? "https://images.unsplash.com/photo-1621285853634-713b8dd1b2ff?q=80&w=2000&auto=format&fit=crop"
        : config.slug.includes("hyundai")
        ? "https://images.unsplash.com/photo-1695642646639-661788775f0a?q=80&w=2000&auto=format&fit=crop"
        : heroImg}
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