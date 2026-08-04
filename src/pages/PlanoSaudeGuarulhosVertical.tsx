import React from "react";
import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import { SAUDE_PAGES } from "@/data/saudeConsolidada";
import { useParams, Navigate } from "react-router-dom";

const PlanoSaudeGuarulhosVertical = () => {
  const { slug } = useParams();
  // Fallback to hub if no slug (for /plano-de-saude-guarulhos)
  const currentSlug = slug || "plano-de-saude-guarulhos";
  const page = SAUDE_PAGES.find(p => p.slug === currentSlug);

  if (!page) {
    return <Navigate to="/plano-de-saude-guarulhos" replace />;
  }

  return (
    <InsurancePageTemplate
      title={page.title}
      headline={page.h1}
      subtitle={page.subtitle || "A melhor rede credenciada em Guarulhos com as menores carências."}
      description={page.metaDescription}
      metaDescription={page.metaDescription}
      icon="Heart"
      coverages={[
        { title: "Rede Credenciada Premium", description: "Hospitais Carlos Chagas, Stella Maris e rede em SP." },
        { title: "Redução de Carências", description: "Troque de plano com aproveitamento total de carências." },
        { title: "Atendimento Empresarial", description: "Planos a partir de 2 vidas com preços de atacado." }
      ]}
      whoNeeds={[
        "Empresas de Guarulhos (PME e Grandes)",
        "Microempreendedores Individuais (MEI)",
        "Famílias que buscam segurança médica",
        "Profissionais Liberais"
      ]}
      whyPatro={[
        "Consultoria multimarca (Porto, Bradesco, Amil, SulAmérica)",
        "Suporte pós-venda especializado",
        "Estudo de redução de custos sem perda de cobertura",
        "Especialista local em Guarulhos"
      ]}
      localSeo={{ city: "Guarulhos", neighborhood: "Centro" }}
    />
  );
};

export default PlanoSaudeGuarulhosVertical;
