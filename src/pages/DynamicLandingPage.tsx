import { useParams, Navigate } from "react-router-dom";
import { landingPagesData } from "@/data/landingPages";
import InsurancePageTemplate from "@/components/InsurancePageTemplate";

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

  return (
    <InsurancePageTemplate 
      title={pageData.title}
      subtitle={pageData.description}
      description={pageData.description}
      icon={pageData.icon || "🛡️"}
      coverages={pageData.coverages || []}
      whoNeeds={pageData.whoNeeds || []}
      whyPatro={pageData.whyPatro || []}
      faqs={pageData.faqs || []}
      heroImage={pageData.heroImage}
      mobileHeroImage={pageData.mobileHeroImage}
    />
  );
};

export default DynamicLandingPage;
