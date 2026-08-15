import { useParams } from "react-router-dom";
import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const SeoSeguroAutoPorModeloGuarulhos = () => {
  const { modelo } = useParams();
  
  const models: Record<string, { title: string; headline: string; description: string }> = {
    "corolla": {
      title: "Seguro Auto Toyota Corolla em Guarulhos",
      headline: "Seguro Corolla em Guarulhos",
      description: "Proteção completa para o seu Toyota Corolla com as melhores taxas de Guarulhos."
    },
    "hb20": {
      title: "Seguro Auto Hyundai HB20 em Guarulhos",
      headline: "Seguro HB20 em Guarulhos",
      description: "Seguro sob medida para o Hyundai HB20, um dos modelos mais populares em Guarulhos."
    },
    "onix": {
      title: "Seguro Auto Chevrolet Onix em Guarulhos",
      headline: "Seguro Onix em Guarulhos",
      description: "Cotação de seguro para Chevrolet Onix com cobertura total contra roubo e furto."
    },
    "compass": {
      title: "Seguro Auto Jeep Compass em Guarulhos",
      headline: "Seguro Compass em Guarulhos",
      description: "Seguro Premium para o seu Jeep Compass com assistência 24h VIP em Guarulhos."
    },
    "hilux": {
      title: "Seguro Auto Toyota Hilux em Guarulhos",
      headline: "Seguro Hilux em Guarulhos",
      description: "Seguro robusto para Toyota Hilux, ideal para quem trafega pelas rodovias de Guarulhos."
    }
  };

  const modelKey = modelo?.toLowerCase() || "corolla";
  const data = models[modelKey] || models.corolla;

  return (
    <InsurancePageTemplate
      title={data.title}
      headline={data.headline}
      subtitle={`Cotação de seguro para ${modelKey.toUpperCase()} com as melhores seguradoras.`}
      metaDescription={`Procurando seguro para seu ${modelKey.toUpperCase()} em Guarulhos? A Patro Seguros oferece cotação em 16+ seguradoras com foco em preço e suporte.`}
      description={data.description}
      icon="🚗"
      coverages={[
        { title: "Roubo e Furto", description: "Proteção total em caso de perda do veículo por crime." },
        { title: "Colisão e Danos", description: "Cobertura para reparos em oficinas referenciadas em Guarulhos." },
        { title: "Danos a Terceiros", description: "Garantia para danos materiais e corporais causados a outros." },
        { title: "Assistência 24h", description: "Guincho, socorro mecânico e chaveiro em todo o Brasil." },
      ]}
      whoNeeds={[
        `Proprietários de ${modelKey.toUpperCase()} em Guarulhos`,
        "Quem busca renovar o seguro com melhor custo-benefício",
        "Motoristas que trafegam diariamente pela Dutra e Fernão Dias",
      ]}
      whyPatro={[
        "Especialistas em modelos de alto volume em Guarulhos",
        "Cotação simultânea em Porto, Tokio, Allianz e outras",
        "Atendimento humano e suporte real no sinistro",
      ]}
      faqs={[
        { question: `Quanto custa o seguro do ${modelKey.toUpperCase()}?`, answer: "O valor depende do perfil do motorista e CEP, mas temos opções competitivas para o mercado de Guarulhos." },
        { question: "A Patro Seguros aceita motoristas de app?", answer: "Sim, temos seguradoras parceiras com aceitação específica para quem trabalha com aplicativos." },
      ]}
    />
  );
};

export default SeoSeguroAutoPorModeloGuarulhos;