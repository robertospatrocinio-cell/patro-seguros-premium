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
import { seoLocalProdutoBairroPages } from "@/data/seoLocalProdutoBairroPages";
import { seoLocalGuarulhosHub } from "@/data/seoLocalGuarulhosHub";
import { seoLocalBairrosGuarulhos, BAIRROS_MATRIZ } from "@/data/seoLocalBairrosGuarulhos";
import { guarulhosBairrosBlogArticles } from "@/data/blogGuarulhosBairrosData";


import { DEFAULT_INSURERS, DEFAULT_TESTIMONIALS } from "@/data/localDefaults";
import heroImg from "@/assets/hero-seguro-auto.webp";
import LazySection from "@/components/LazySection";
import { PATRO_SOCIAL_PROOF } from "@/lib/patroSocialProof";

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
  const slug = slugProp ?? params.slug ?? (params.bairro ? `seguros-${params.bairro}-guarulhos` : undefined);
  if (!slug) return <Navigate to="/404" replace />;
  const config =
    seoLocalPages[slug] ||
    seoLocalSaudePages[slug] ||
    seoLocalProdutoBairroPages[slug] ||
    seoModeloAutoPages[slug] ||
    (slug === "seguros-guarulhos" ? seoLocalGuarulhosHub : null) ||
    seoLocalBairrosGuarulhos[slug];

  if (!config) return <Navigate to="/404" replace />;

  // Tipos requerem tuplas mínimas — fazemos cast seguro pois validamos em runtime/dev.
  const faqs = config.faqs as unknown as [LocalFAQ, LocalFAQ, LocalFAQ, LocalFAQ, LocalFAQ, ...LocalFAQ[]];
  const insurers = (config.insurers ?? DEFAULT_INSURERS).slice(0, 9) as unknown as [
    LocalInsurer, LocalInsurer, LocalInsurer, LocalInsurer, ...LocalInsurer[],
  ];
  const testimonials = (config.testimonials ?? DEFAULT_TESTIMONIALS).slice(0, 4) as unknown as [
    LocalTestimonial, LocalTestimonial, ...LocalTestimonial[],
  ];
  const realScenarios = (config.realScenarios ?? [
    { title: "Case de Sucesso", description: "Atendimento ágil com cotação em 2 horas." },
    { title: "Suporte em Sinistro", description: "Acompanhamento completo até a indenização." }
  ]) as unknown as [
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
      whoNeeds={config.whoNeeds ?? ["Moradores de Guarulhos", "Empresários locais"]}
      whyPatro={config.whyPatro ?? [`Nota ${PATRO_SOCIAL_PROOF.googleRating} no Google`, "Comparativo de 16+ seguradoras"]}
      tips={config.tips ?? ["Compare sempre", "Fale com um especialista"]}
      nearbyAreas={config.nearbyAreas}
      relatedInsurances={config.relatedInsurances}
      heroImage={config.slug.includes("volvo")
        ? "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop"
        : config.slug.includes("land-rover") 
        ? "https://images.unsplash.com/photo-1734364147225-19185de620e4?q=80&w=2070&auto=format&fit=crop"
        : config.slug.includes("jaguar")
        ? "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2070&auto=format&fit=crop"
        : config.slug.includes("audi")
        ? "https://images.unsplash.com/photo-1549416878-b9ca95e26903?q=80&w=2070&auto=format&fit=crop"
        : config.slug.includes("byd")
        ? "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2070&auto=format&fit=crop"
        : config.slug.includes("gwm")
        ? "https://images.unsplash.com/photo-1549416878-b9ca95e26903?q=80&w=2070&auto=format&fit=crop"
        : config.slug.includes("jeep")
        ? "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=2070&auto=format&fit=crop"
        : config.slug.includes("bmw")
        ? "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070&auto=format&fit=crop"
        : config.slug.includes("mercedes")
        ? "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2070&auto=format&fit=crop"
        : config.slug.includes("porsche")
        ? "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=2070&auto=format&fit=crop"
        : config.slug.includes("ferrari")
        ? "https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=2070&auto=format&fit=crop"
        : config.slug.includes("lexus")
        ? "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070&auto=format&fit=crop"
        : config.slug.includes("ford")
        ? "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2070&auto=format&fit=crop"
        : config.slug.includes("honda")
        ? "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070&auto=format&fit=crop"
        : config.slug.includes("toyota")
        ? "https://images.unsplash.com/photo-1621135802920-133df287f89c?q=80&w=2070&auto=format&fit=crop"
        : config.slug.includes("volkswagen")
        ? "https://images.unsplash.com/photo-1621135802920-133df287f89c?q=80&w=2070&auto=format&fit=crop"
        : config.slug.includes("chevrolet")
        ? "https://images.unsplash.com/photo-1621135802920-133df287f89c?q=80&w=2000&auto=format&fit=crop"
        : config.slug.includes("fiat")
        ? "https://images.unsplash.com/photo-1541443131876-44b03de101c5?q=80&w=2000&auto=format&fit=crop"
        : config.slug.includes("hyundai")
        ? "https://images.unsplash.com/photo-1621135802920-133df287f89c?q=80&w=2000&auto=format&fit=crop"
        : heroImg}
      whatsappMessage={`Olá! Vim pela página "${config.title}" e gostaria de falar com um especialista sobre meu seguro.`}
    />
    
    {/* Seção de Blog Contextual por Bairro (apenas se for uma página de bairro da matriz) */}
    {config.neighborhood && BAIRROS_MATRIZ.some(b => b.nome === config.neighborhood) && (
      <section className="py-16 bg-muted/20 border-t">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
            <div className="max-w-2xl text-left">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary">
                Dicas de Seguros para {config.neighborhood}
              </h2>
              <p className="text-muted-foreground">
                Conteúdo exclusivo sobre proteção, economia e prevenção de riscos em {config.neighborhood}, Guarulhos.
              </p>
            </div>
            <Link to="/blog">
              <Button variant="outline" className="group">
                Ver todo o blog
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Tenta achar artigos que mencionam o bairro ou pega os mais recentes da vertical de bairros */}
            {guarulhosBairrosBlogArticles
              .filter(a => a.tags.some(t => t.toLowerCase().includes((config.neighborhood || "").toLowerCase())))
              .concat(guarulhosBairrosBlogArticles)
              .slice(0, 3)
              .map((art) => (
                <Link key={art.slug} to={`/blog/${art.slug}`} className="group">
                  <Card className="h-full hover:shadow-lg transition-base border-primary/5">
                    <CardContent className="p-6 text-left">
                      <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-widest mb-3">
                        <Clock className="h-3 w-3" />
                        {art.readTime} min de leitura
                      </div>
                      <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors leading-tight">
                        {art.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                        {art.excerpt}
                      </p>
                      <div className="flex items-center text-sm font-semibold text-primary">
                        Continuar lendo
                        <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>
        </div>
      </section>
    )}

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