import { useParams, Navigate } from "react-router-dom";
import { landingPagesData } from "@/data/landingPages";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const DynamicLandingPage = () => {
  const { slug } = useParams();
  const pageData = slug ? landingPagesData[slug] : null;

  if (!pageData) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <InsurancePageTemplate 
          title={pageData.title}
          description={pageData.description}
          insuranceType={pageData.insuranceType}
        />
      </main>
      <Footer />
    </div>
  );
};

export default DynamicLandingPage;
