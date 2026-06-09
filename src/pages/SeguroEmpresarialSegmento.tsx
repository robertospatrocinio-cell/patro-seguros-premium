import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import { segmentos } from "@/data/segmentosEmpresariais";
import { useParams, Navigate } from "react-router-dom";
import heroImg from "@/assets/hero-seguro-empresarial.webp";

interface SeguroEmpresarialSegmentoProps {
  segmento?: string;
}

const SeguroEmpresarialSegmento = ({ segmento: segmentoProp }: SeguroEmpresarialSegmentoProps) => {
  const params = useParams<{ segmento: string }>();
  const slug = segmentoProp ?? params.segmento;
  const data = slug ? segmentos.find(s => s.slug === slug) : undefined;

  if (!data) return <Navigate to="/seguro-empresarial" replace />;

  return (
    <InsurancePageTemplate
      heroImage={heroImg}
      title={`Seguro para ${data.nome} em Guarulhos`}
      subtitle={data.subtitle}
      icon={data.icon}
      metaDescription={data.metaDescription}
      description={data.description}
      detailedDescription={data.detailedDescription}
      coverages={data.coverages}
      whoNeeds={data.whoNeeds}
      whyPatro={[
        "Especialistas em seguros para lojistas de Guarulhos",
        "Comparativo entre 16+ seguradoras em até 2h úteis",
        "Atendimento presencial no Cidade Maia",
        "Suporte completo na hora do sinistro",
        "Redução de custos com coberturas sob medida"
      ]}
      faqs={data.faqs}
      howItWorks={[
        { step: "1", title: "Análise da Operação", description: "Levantamos as exigências do shopping e as necessidades da sua loja." },
        { step: "2", title: "Cotação Multi-Seguradora", description: "Comparamos preços e coberturas nas melhores companhias." },
        { step: "3", title: "Emissão da Apólice", description: "Ativamos sua proteção e enviamos o certificado para a administração do shopping." },
        { step: "4", title: "Suporte 24h", description: "Assistência completa e gestão de sinistros sempre que precisar." },
      ]}
    />
  );
};

export default SeguroEmpresarialSegmento;
