import React from "react";
import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import { CONSORCIO_INTENT_PAGES } from "@/data/consorcioVertical";
import { useParams, Navigate } from "react-router-dom";

const ConsorcioGuarulhosVertical = () => {
  const { slug } = useParams();
  const page = CONSORCIO_INTENT_PAGES.find(p => p.slug === slug);

  if (!page) {
    return <Navigate to="/consorcio" replace />;
  }

  return (
    <InsurancePageTemplate
      title={page.title}
      headline={page.h1}
      subtitle={page.subtitle}
      description={page.intro}
      metaDescription={page.metaDescription}
      icon="Award"
      coverages={page.bullets.map(b => ({ title: b, description: "" }))}
      whoNeeds={page.audience}
      whyPatro={[
        "Consultoria imparcial entre diversas administradoras",
        "Estratégias de lance baseadas em dados reais",
        "Atendimento local em Guarulhos/SP",
        "Acompanhamento desde a adesão até a contemplação"
      ]}
      faqs={page.faqs}
      detailedDescription={page.sections.map(s => `### ${s.heading}\n\n${s.body}`).join("\n\n")}
      localSeo={{ city: "Guarulhos", neighborhood: "Cidade Maia" }}
    />
  );
};

export default ConsorcioGuarulhosVertical;
