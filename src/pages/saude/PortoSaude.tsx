import HealthPlanTemplate from "@/components/HealthPlanTemplate";

const PortoSaudeGuarulhos = () => {
  return (
    <HealthPlanTemplate 
      operator="Porto Saúde"
      accentColor="#004691"
      description="A qualidade e confiança da Porto agora na saúde. O Porto Saúde oferece atendimento humanizado e benefícios exclusivos para segurados Porto em Guarulhos."
      benefits={[
        "Acesso à rede de hospitais e laboratórios de elite",
        "App Porto Saúde: agendamentos e consultas na palma da mão",
        "Coleta domiciliar de exames (conforme categoria)",
        "Descontos exclusivos em toda a linha de serviços Porto (Seguro Auto, Casa, etc)",
        "Programas de promoção à saúde e gestão de doentes crônicos"
      ]}
      faqs={[
        {
          q: "O Porto Saúde tem rede em Guarulhos?",
          a: "Sim, o Porto Saúde conta com uma ampla rede credenciada em Guarulhos, incluindo os principais hospitais e clínicas da região Centro e Maia."
        },
        {
          q: "Existe desconto para quem já tem Seguro Auto Porto?",
          a: "Sim, clientes Porto possuem condições diferenciadas e facilidades na contratação do plano de saúde."
        }
      ]}
    />
  );
};

export default PortoSaudeGuarulhos;