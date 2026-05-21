import HealthPlanTemplate from "@/components/HealthPlanTemplate";

const BradescoSaudeGuarulhos = () => {
  return (
    <HealthPlanTemplate 
      operator="Bradesco Saúde"
      accentColor="#d51d2e"
      description="Referência absoluta no mercado corporativo, o Bradesco Saúde oferece uma das redes mais completas do Brasil e um sistema de reembolso ágil para os clientes de Guarulhos."
      benefits={[
        "Acesso aos melhores hospitais de Guarulhos e São Paulo",
        "Livre escolha com sistema de reembolso em todos os planos",
        "Seguro Viagem Bradesco incluso (conforme categoria)",
        "Atendimento diferenciado e exclusivo para empresas (PME e Corporate)",
        "Clube de vantagens Bradesco com descontos em diversos parceiros"
      ]}
      faqs={[
        {
          q: "Empresas com 3 pessoas podem contratar Bradesco Saúde?",
          a: "Sim, o Bradesco Saúde possui planos específicos para PMEs a partir de 3 vidas, oferecendo a mesma qualidade de grandes corporações."
        },
        {
          q: "O Bradesco Saúde atende no Hospital Sírio-Libanês?",
          a: "Sim, dependendo da categoria do plano (Nacional Plus ou superior), o atendimento em hospitais de elite está garantido."
        }
      ]}
    />
  );
};

export default BradescoSaudeGuarulhos;