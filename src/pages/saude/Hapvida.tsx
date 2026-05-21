import HealthPlanTemplate from "@/components/HealthPlanTemplate";

const HapvidaGuarulhos = () => {
  return (
    <HealthPlanTemplate 
      operator="Hapvida NotreDame Intermédica"
      accentColor="#006738"
      description="Líder absoluta em planos de saúde em Guarulhos, a GNDI/Hapvida oferece a maior rede própria da cidade, com hospitais e centros clínicos modernos e acessíveis."
      benefits={[
        "Maior rede própria de Guarulhos e região",
        "Hospitais de referência como o Hospital e Maternidade Guarulhos",
        "Planos com excelente custo-benefício para famílias e empresas",
        "Rede odontológica integrada opcional",
        "Sistemas de atendimento digital rápidos e eficientes"
      ]}
      faqs={[
        {
          q: "Qual o melhor plano da Intermédica em Guarulhos?",
          a: "A linha Smart oferece o melhor custo-benefício com foco na rede própria de Guarulhos, enquanto a linha Advance amplia o atendimento para redes de elite em SP."
        },
        {
          q: "A Intermédica atende no Centro de Guarulhos?",
          a: "Sim, a operadora possui centros clínicos e hospitais estrategicamente localizados no Centro, Maia e arredores."
        }
      ]}
    />
  );
};

export default HapvidaGuarulhos;