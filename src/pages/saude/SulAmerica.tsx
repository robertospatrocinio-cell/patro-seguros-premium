import HealthPlanTemplate from "@/components/HealthPlanTemplate";

const SulAmericaGuarulhos = () => {
  return (
    <HealthPlanTemplate 
      operator="SulAmérica Saúde"
      accentColor="#005ea8"
      description="Uma das maiores seguradoras do Brasil, a SulAmérica Saúde oferece flexibilidade, ampla rede referenciada e o melhor sistema de reembolso para empresas e famílias em Guarulhos."
      benefits={[
        "Ampla rede credenciada em Guarulhos (Hospitais Carlos Chagas, Stella Maris, etc)",
        "Excelente sistema de reembolso para consultas fora da rede",
        "Seguro Viagem Nacional e Internacional incluso em diversos planos",
        "Atendimento Digital (Telemedicina) 24h via aplicativo",
        "Descontos em farmácias e programas de bem-estar"
      ]}
      faqs={[
        {
          q: "Posso contratar SulAmérica Saúde pelo meu MEI?",
          a: "Sim! Planos empresariais a partir de 2 vidas (titular + dependente) podem ser contratados via MEI com condições muito vantajosas em relação ao plano individual."
        },
        {
          q: "A SulAmérica atende o Hospital Carlos Chagas?",
          a: "Sim, dependendo da categoria do plano contratado, o Hospital Carlos Chagas é um dos principais pontos de atendimento em Guarulhos."
        }
      ]}
    />
  );
};

export default SulAmericaGuarulhos;