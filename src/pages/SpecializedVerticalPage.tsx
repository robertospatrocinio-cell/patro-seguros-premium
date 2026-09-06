import React from "react";
import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import { SPECIALIZED_PAGES } from "@/data/specializedVerticals";
import { useParams, useLocation, Navigate } from "react-router-dom";

const SpecializedVerticalPage = () => {
  const { slug } = useParams();
  const { pathname } = useLocation();
  // Rotas fixas (sem :slug) resolvem o slug pelo próprio pathname.
  const resolvedSlug = slug ?? pathname.replace(/^\/+|\/+$/g, "");
  const page = SPECIALIZED_PAGES.find(p => p.slug === resolvedSlug);

  if (!page) return <Navigate to="/" replace />;

  const related = SPECIALIZED_PAGES.filter(p => p.slug !== page.slug).map(p => ({
    title: p.h1,
    link: `/${p.slug}`,
  }));

  return (
    <InsurancePageTemplate
      title={page.title}
      headline={page.h1}
      subtitle={page.subtitle}
      description={page.intro}
      metaDescription={page.metaDescription}
      icon="Shield"
      coverages={page.coverages}
      whoNeeds={page.whoNeeds}
      whyPatro={[
        "Cotação simultânea entre seguradoras com apetite para o seu risco",
        "Análise técnica de coberturas, franquias e exclusões",
        "Atendimento local em Guarulhos/SP, com corretor responsável",
        "Acompanhamento em renovações e em caso de sinistro",
      ]}
      faqs={page.faqs}
      detailedDescription={page.sections
        .map(s => `### ${s.heading}\n\n${s.body}`)
        .join("\n\n")}
      relatedInsurances={[
        ...related,
        { title: "Seguro Empresarial Guarulhos", link: "/seguro-empresarial-guarulhos" },
      ]}
      localSeo={{ city: "Guarulhos" }}
    />
  );
};

export default SpecializedVerticalPage;
