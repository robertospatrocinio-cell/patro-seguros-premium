import { useParams, Navigate } from "react-router-dom";
import { landingPagesData } from "@/data/landingPages";
import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import FAQSchema from "@/components/FAQSchema";
import PageMeta from "@/components/PageMeta";

interface DynamicLandingPageProps {
  slug?: string;
}

const DynamicLandingPage = ({ slug: slugProp }: DynamicLandingPageProps = {}) => {
  const params = useParams();
  const slug = slugProp ?? params.slug;
  const pageData = slug ? landingPagesData[slug] : null;

  if (!pageData) {
    return <Navigate to="/404" replace />;
  }

  const faqs = pageData.faqs || [];

  return (
    <>
      <PageMeta
        title={pageData.title}
        description={pageData.metaDescription || pageData.description}
      />
      {faqs.length > 0 && <FAQSchema faqs={faqs} />}
      <InsurancePageTemplate 
        title={pageData.title}
        subtitle={pageData.description}
        description={pageData.description}
        detailedDescription={pageData.detailedDescription}
        icon={pageData.icon || "🛡️"}
        coverages={pageData.coverages || []}
        whoNeeds={pageData.whoNeeds || []}
        whyPatro={pageData.whyPatro || []}
        faqs={faqs}
        heroImage={pageData.heroImage}
        mobileHeroImage={pageData.mobileHeroImage}
      />
    </>
  );
};

export default DynamicLandingPage;