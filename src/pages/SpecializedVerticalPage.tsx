import React from "react";
import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import { SPECIALIZED_PAGES } from "@/data/specializedVerticals";
import { useParams, Navigate } from "react-router-dom";

const SpecializedVerticalPage = () => {
  const { slug } = useParams();
  const page = SPECIALIZED_PAGES.find(p => p.slug === slug);

  if (!page) return <Navigate to="/" replace />;

  return (
    <InsurancePageTemplate
      title={page.title}
      headline={page.h1}
      subtitle="Especialização técnica para riscos complexos e novas tecnologias."
      description={page.metaDescription}
      metaDescription={page.metaDescription}
      icon="Shield"
      coverages={[{ title: "Proteção Sob Medida", description: "Desenho de apólice conforme a necessidade do risco." }]}
      whoNeeds={["Empresas e Profissionais de Guarulhos"]}
      whyPatro={["Expertise em Riscos Patrimoniais", "Atendimento Nacional"]}
      localSeo={{ city: "Guarulhos" }}
    />
  );
};

export default SpecializedVerticalPage;
