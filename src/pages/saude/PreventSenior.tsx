import HealthPlanTemplate from "@/components/HealthPlanTemplate";

const PreventSeniorGuarulhos = () => {
  return (
    <HealthPlanTemplate 
      operator="Prevent Senior"
      accentColor="#004a8e"
      description="Referência em medicina preventiva para o público 50+, a Prevent Senior oferece rede própria de alta qualidade e custos competitivos em Guarulhos e São Paulo."
      benefits={[
        "Foco exclusivo em medicina preventiva para a melhor idade",
        "Rede Hospitalar Sancta Maggiore de excelência",
        "Programas de promoção à saúde e longevidade",
        "Preços competitivos para faixas etárias avançadas",
        "Atendimento especializado em geriatria e especialidades relacionadas"
      ]}
      faqs={[
        {
          q: "A Prevent Senior tem atendimento em Guarulhos?",
          a: "Sim, a Prevent Senior atende moradores de Guarulhos através de sua rede própria Sancta Maggiore em São Paulo (fácil acesso pela Dutra/Fernão Dias) e parceiros credenciados na região."
        },
        {
          q: "Qual a idade mínima para contratar?",
          a: "Embora seja focada no público 50+, a operadora possui planos para diversas faixas etárias com o DNA de prevenção."
        }
      ]}
    />
  );
};

export default PreventSeniorGuarulhos;