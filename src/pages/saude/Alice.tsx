import HealthPlanTemplate from "@/components/HealthPlanTemplate";

const AliceGuarulhos = () => {
  return (
    <HealthPlanTemplate 
      operator="Alice"
      accentColor="#6b33ff"
      description="Alice é a gestora de saúde que foca na sua saúde, não apenas na doença. Com tecnologia de ponta e hospitais de elite, oferece uma experiência digital única."
      benefits={[
        "Foco total em prevenção e metas de saúde personalizadas",
        "Atendimento imediato via chat 24h com enfermeiros e médicos",
        "Rede credenciada de elite em SP com fácil acesso para Guarulhos",
        "App intuitivo para gestão de toda a sua jornada de saúde",
        "Planos sem burocracia e com foco na experiência do usuário"
      ]}
      faqs={[
        {
          q: "A Alice atende moradores de Guarulhos?",
          a: "Sim, embora a rede de hospitais de elite seja em SP, os moradores de Guarulhos utilizam muito a facilidade da gestão digital e os hospitais próximos."
        },
        {
          q: "Como funciona o app da Alice?",
          a: "Pelo app você fala com seu Time de Saúde em segundos e resolve desde dúvidas simples até encaminhamentos especializados."
        }
      ]}
    />
  );
};

export default AliceGuarulhos;