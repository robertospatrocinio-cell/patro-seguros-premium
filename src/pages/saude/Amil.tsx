import HealthPlanTemplate from "@/components/HealthPlanTemplate";

const AmilGuarulhos = () => {
  return (
    <HealthPlanTemplate 
      operator="Amil"
      accentColor="#00509d"
      description="Com uma das maiores estruturas de saúde do país, a Amil oferece em Guarulhos desde planos custo-benefício até linhas premium com atendimento nos melhores hospitais do Brasil."
      benefits={[
        "Ampla rede própria e credenciada em toda Guarulhos",
        "Amil Resgate Saúde: sistema de transporte inter-hospitalar de excelência",
        "Programas de Gestão de Saúde e prevenção de doenças",
        "Opções com e sem coparticipação para empresas de todos os tamanhos",
        "Telemedicina Amil: atendimento médico por vídeo 24h"
      ]}
      faqs={[
        {
          q: "Qual o melhor plano da Amil para quem mora no Centro de Guarulhos?",
          a: "A linha Amil Fácil oferece excelente custo-benefício com foco regional, enquanto a linha Amil One oferece atendimento nos hospitais de elite de SP com fácil acesso."
        },
        {
          q: "A Amil atende no Hospital Vitória?",
          a: "Sim, o Hospital Vitória (unidade Anália Franco) é uma das referências da rede própria Amil com fácil acesso para moradores de Guarulhos."
        }
      ]}
    />
  );
};

export default AmilGuarulhos;