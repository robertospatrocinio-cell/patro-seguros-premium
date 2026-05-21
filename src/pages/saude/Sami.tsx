import HealthPlanTemplate from "@/components/HealthPlanTemplate";

const SamiGuarulhos = () => {
  return (
    <HealthPlanTemplate 
      operator="Sami"
      accentColor="#01d1c1"
      description="A Sami é um plano de saúde focado em empresas e MEIs, com um modelo inovador de 'Time de Saúde' e foco em atenção primária para reduzir custos e aumentar a qualidade."
      benefits={[
        "Foco em atenção primária com seu próprio Time de Saúde",
        "Atendimento Digital de alta qualidade via aplicativo",
        "Rede credenciada selecionada com foco em eficiência",
        "Academia e benefícios de bem-estar inclusos (Gympass)",
        "Preços competitivos para pequenas empresas e MEIs"
      ]}
      faqs={[
        {
          q: "A Sami atende em Guarulhos?",
          a: "Sim, a Sami possui parceiros credenciados estratégicos em Guarulhos e em toda a região metropolitana de SP."
        },
        {
          q: "Como funciona o Time de Saúde?",
          a: "Você tem um médico e enfermeiros dedicados que conhecem seu histórico e orientam toda a sua jornada de saúde."
        }
      ]}
    />
  );
};

export default SamiGuarulhos;