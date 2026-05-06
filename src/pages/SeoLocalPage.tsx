import { useParams, Navigate } from "react-router-dom";
import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import { seoLocalPages } from "@/data/seoLocalAutoPages";
import heroImg from "@/assets/hero-seguro-auto.webp";

interface SeoLocalPageProps {
  slug?: string;
}

const SeoLocalPage = ({ slug: slugProp }: SeoLocalPageProps) => {
  const params = useParams();
  const slug = slugProp ?? params.slug;
  if (!slug) return <Navigate to="/404" replace />;
  const config = seoLocalPages[slug];
  if (!config) return <Navigate to="/404" replace />;

  return (
    <InsurancePageTemplate
      heroImage={heroImg}
      title={config.title}
      subtitle={config.subtitle}
      description={config.description}
      detailedDescription={config.detailedDescription}
      metaDescription={config.metaDescription}
      icon={config.icon}
      coverages={config.coverages}
      whoNeeds={config.whoNeeds}
      whyPatro={config.whyPatro}
      faqs={config.faqs}
      pricingInfo={{
        intro: config.pricingIntro,
        factors: config.pricingFactors,
        note: config.pricingNote,
      }}
      realScenarios={config.realScenarios}
      tips={config.tips}
      relatedInsurances={config.relatedInsurances}
    />
  );
};

export default SeoLocalPage;