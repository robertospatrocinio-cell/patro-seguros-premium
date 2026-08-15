import { useParams } from "react-router-dom";
import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const SeoSeguroAutoPorModeloGuarulhos = () => {
  const { modelo } = useParams();
  
  const models: Record<string, { title: string; headline: string; description: string; metaDescription: string }> = {
    "toyota-corolla": {
      title: "Seguro Auto Toyota Corolla em Guarulhos — Cotação com 16+ seguradoras",
      headline: "Seguro Auto Toyota Corolla em Guarulhos — Cotação com 16+ seguradoras",
      description: "O Toyota Corolla é o sedã médio mais vendido do Brasil e um dos modelos mais visados para roubo em Guarulhos, especialmente nas regiões de Cumbica e Pimentas.",
      metaDescription: "Seguro Toyota Corolla em Guarulhos comparado em 16+ seguradoras. Faixa média de R$ 2.800 a R$ 4.800/ano. Cotação em até 2h com atendimento consultivo especializado."
    },
    "hyundai-hb20": {
      title: "Seguro Auto Hyundai HB20 em Guarulhos — Cotação com 16+ seguradoras",
      headline: "Seguro Auto Hyundai HB20 em Guarulhos — Cotação com 16+ seguradoras",
      description: "O Hyundai HB20 é um dos hatches mais populares de Guarulhos, com excelente relação custo-benefício e peças de reposição acessíveis.",
      metaDescription: "Seguro Hyundai HB20 em Guarulhos comparado em 16+ seguradoras. Faixa média de R$ 1.900 a R$ 3.600/ano. Cotação em até 2h com foco em motoristas de aplicativo."
    },
    "chevrolet-onix": {
      title: "Seguro Auto Chevrolet Onix em Guarulhos — Cotação com 16+ seguradoras",
      headline: "Seguro Auto Chevrolet Onix em Guarulhos — Cotação com 16+ seguradoras",
      description: "O Chevrolet Onix é o hatch mais vendido do país e também um dos mais roubados em Guarulhos.",
      metaDescription: "Seguro Chevrolet Onix em Guarulhos comparado em 16+ seguradoras. Faixa média de R$ 1.900 a R$ 3.700/ano. Cotação em até 2h com proteção contra roubo e furto."
    },
    "jeep-compass": {
      title: "Seguro Auto Jeep Compass em Guarulhos — Cotação com 16+ seguradoras",
      headline: "Seguro Auto Jeep Compass em Guarulhos — Cotação com 16+ seguradoras",
      description: "O Jeep Compass é o SUV médio mais vendido do Brasil e muito presente em Guarulhos, principalmente no Cidade Maia e na Vila Augusta.",
      metaDescription: "Seguro Jeep Compass em Guarulhos comparado em 16+ seguradoras. Faixa média de R$ 3.000 a R$ 5.400/ano. Cotação em até 2h com assistência VIP especializada."
    },
    "toyota-hilux": {
      title: "Seguro Auto Toyota Hilux em Guarulhos — Cotação com 16+ seguradoras",
      headline: "Seguro Auto Toyota Hilux em Guarulhos — Cotação com 16+ seguradoras",
      description: "A Toyota Hilux é a picape mais desejada do Brasil e um dos veículos mais visados para roubo em Guarulhos, sobretudo nas áreas de Cumbica e Bonsucesso.",
      metaDescription: "Seguro Toyota Hilux em Guarulhos comparado em 16+ seguradoras. Faixa média de R$ 3.500 a R$ 6.500/ano. Cotação em até 2h com proteção robusta e rastreamento."
    }
  };

  const modelKey = modelo?.toLowerCase() || "toyota-corolla";
  const data = models[modelKey] || models["toyota-corolla"];

  return (
    <InsurancePageTemplate
      title={data.title}
      headline={data.headline}
      subtitle={data.description}
      metaDescription={data.metaDescription}
      description={data.description}
      icon="🚗"
      coverages={[
        { title: "Roubo e Furto", description: "Proteção total em caso de perda do veículo por crime." },
        { title: "Colisão e Danos", description: "Cobertura para reparos em oficinas referenciadas em Guarulhos." },
        { title: "Danos a Terceiros", description: "Garantia para danos materiais e corporais causados a outros." },
        { title: "Assistência 24h", description: "Guincho, socorro mecânico e chaveiro em todo o Brasil." },
      ]}
      whoNeeds={[
        `Proprietários de ${modelKey.toUpperCase().replace("-", " ")} em Guarulhos`,
        "Quem busca renovar o seguro com melhor custo-benefício",
        "Motoristas que trafegam diariamente pela Dutra e Fernão Dias",
      ]}
      whyPatro={[
        "Especialistas em modelos de alto volume em Guarulhos",
        "Cotação simultânea em Porto, Tokio, Allianz e outras",
        "Atendimento humano e suporte real no sinistro",
      ]}
      faqs={[
        { question: `Quanto custa o seguro do ${modelKey.toUpperCase().replace("-", " ")}?`, answer: "O valor depende do perfil do motorista e CEP, mas temos opções competitivas para o mercado de Guarulhos." },
        { question: "A Patro Seguros aceita motoristas de app?", answer: "Sim, temos seguradoras parceiras com aceitação específica para quem trabalha com aplicativos." },
      ]}
    />
  );
};

export default SeoSeguroAutoPorModeloGuarulhos;