import { useParams, Navigate } from "react-router-dom";
import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import { findSegmento, baseWhyPatroEmpresarial } from "@/data/segmentosEmpresariais";
import heroImg from "@/assets/hero-seguro-empresarial.webp";

const SeguroEmpresarialSegmento = () => {
  const { segmento } = useParams<{ segmento: string }>();
  const data = segmento ? findSegmento(segmento) : undefined;

  if (!data) return <Navigate to="/seguro-empresarial" replace />;

  return (
    <InsurancePageTemplate
      heroImage={heroImg}
      title={`Seguro para ${data.nome}`}
      subtitle={data.subtitle}
      icon={data.icon}
      metaDescription={data.metaDescription}
      description={data.description}
      detailedDescription={data.detailedDescription}
      coverages={data.coverages}
      whoNeeds={data.whoNeeds}
      whyPatro={baseWhyPatroEmpresarial}
      faqs={data.faqs}
      howItWorks={[
        { step: "1", title: "Análise do Negócio", description: "Levantamos atividade, faturamento, estoque e equipamentos do seu estabelecimento." },
        { step: "2", title: "Cotação com 16+ Seguradoras", description: "Comparamos coberturas e preços para garantir a melhor proposta." },
        { step: "3", title: "Apólice Personalizada", description: "Montamos coberturas sob medida para o seu segmento e bolso." },
        { step: "4", title: "Suporte em Sinistro", description: "Acompanhamos o processo do início ao fim, agilizando a indenização." },
      ]}
      pricingInfo={{
        intro: "O custo do seguro empresarial varia conforme o segmento, valor do patrimônio e coberturas escolhidas.",
        factors: [
          "Atividade econômica (CNAE)",
          "Valor do imóvel, estoque e equipamentos",
          "Localização e histórico de sinistros",
          "Coberturas adicionais contratadas",
          "Valor de RC e Lucros Cessantes",
        ],
        note: "PMEs pagam a partir de R$ 59/mês. Valor muito inferior ao prejuízo de um único sinistro.",
      }}
      relatedInsurances={[
        { title: "Seguro Empresarial", link: "/seguro-empresarial" },
        { title: "Responsabilidade Civil", link: "/seguro-rc" },
        { title: "Seguro Cyber", link: "/seguro-cyber" },
        { title: "Seguro de Vida PME", link: "/seguro-vida-pme" },
      ]}
    />
  );
};

export default SeguroEmpresarialSegmento;