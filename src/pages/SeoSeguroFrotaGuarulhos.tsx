import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-seguro-frota.webp";

const SeoSeguroFrotaGuarulhos = () => (
  <InsurancePageTemplate
    heroImage={heroImg}
    title="Seguro de Frota em Guarulhos para Empresas"
    subtitle="Proteção completa para frotas empresariais em Guarulhos e região. Gestão de risco e cotação personalizada."
    description="A Patro Seguros é especialista em seguro de frota para empresas de Guarulhos e Grande São Paulo. Atendemos transportadoras, distribuidoras, empresas de logística e frotas corporativas de todos os portes. Guarulhos, por ser o maior polo logístico do estado de São Paulo e abrigar o Aeroporto Internacional, concentra milhares de empresas com frotas que precisam de proteção adequada. Desde 2020, a Patro oferece gestão de risco personalizada, negociação direta com seguradoras e acompanhamento completo de sinistros para empresas da região."
    icon="🚛"
    metaDescription="Seguro de Frota em Guarulhos para transportadoras, distribuidoras e empresas. Gestão de risco e cotação personalizada. Patro Seguros – corretora local."
    coverages={[
      { title: "Cobertura Compreensiva para Frota", description: "Proteção contra colisão, roubo, furto, incêndio e fenômenos naturais para todos os veículos." },
      { title: "Responsabilidade Civil", description: "Cobertura para danos materiais e corporais causados a terceiros por veículos da frota." },
      { title: "APP (Acidentes Pessoais de Passageiros)", description: "Proteção obrigatória para motoristas e passageiros dos veículos." },
      { title: "Assistência 24h Nacional", description: "Guincho, socorro mecânico e hospedagem para motoristas em viagem." },
      { title: "Lucros Cessantes", description: "Indenização pela parada do veículo durante conserto por sinistro coberto." },
      { title: "Rastreamento e Monitoramento", description: "Integração com sistemas de rastreamento para redução de prêmio." },
    ]}
    whoNeeds={[
      "Transportadoras e operadores logísticos em Guarulhos",
      "Distribuidoras e atacadistas da região metropolitana",
      "Empresas com frota corporativa (comercial, técnica, executiva)",
      "Locadoras de veículos e empresas de delivery",
    ]}
    whyPatro={[
      "Experiência com frotas de empresas de Guarulhos e Grande SP",
      "Negociação direta com Porto, Tokio Marine, HDI e Mapfre",
      "Gestão de sinistros ágil — redução de tempo de veículo parado",
      "Análise de risco e perfil de frota para melhor precificação",
    ]}
    faqs={[
      { question: "Quanto custa seguro de frota em Guarulhos?", answer: "O valor depende do tipo de veículos, perfil dos motoristas e rotas. Em geral, frotas obtêm descontos de 15% a 30% em relação ao seguro individual. Solicite cotação gratuita." },
      { question: "A partir de quantos veículos posso contratar seguro de frota?", answer: "A maioria das seguradoras aceita frotas a partir de 5 veículos. Para frotas menores, temos condições especiais." },
      { question: "Seguro de frota cobre roubo na Dutra e Fernão Dias?", answer: "Sim. A cobertura compreensiva inclui roubo e furto em qualquer via, incluindo as rodovias Dutra e Fernão Dias, muito utilizadas por frotas de Guarulhos." },
    ]}
    relatedInsurances={[
      { title: "Seguro Caminhão", link: "/seguro-caminhao" },
      { title: "Seguro Transporte", link: "/seguro-transporte" },
      { title: "Seguro Empresarial Guarulhos", link: "/seguro-empresarial-guarulhos" },
    ]}
  />
);

export default SeoSeguroFrotaGuarulhos;
