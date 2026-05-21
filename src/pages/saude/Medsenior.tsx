import HealthPlanTemplate from "@/components/HealthPlanTemplate";

const MedseniorGuarulhos = () => {
  return (
    <HealthPlanTemplate 
      operator="MedSênior"
      accentColor="#003566"
      description="Especialista em saúde para quem passou dos 49 anos. A MedSênior foca em um novo conceito de envelhecimento ativo com planos sem coparticipação e foco preventivo."
      benefits={[
        "Planos exclusivos para o público acima de 49 anos",
        "Atendimento focado em medicina preventiva e oficinas de saúde",
        "Opções de planos sem coparticipação (mensalidade fixa)",
        "Rede de atendimento qualificada em SP e Guarulhos",
        "Equipe multidisciplinar especializada em geriatria"
      ]}
      faqs={[
        {
          q: "A MedSênior tem carência?",
          a: "Sim, como todo plano de saúde, há períodos de carência, mas a Patro Seguros pode analisar a redução de carências caso você já venha de outro plano."
        },
        {
          q: "O plano é focado apenas em idosos?",
          a: "O foco é o público acima de 49 anos, visando oferecer um serviço especializado que planos convencionais muitas vezes não suprem."
        }
      ]}
    />
  );
};

export default MedseniorGuarulhos;