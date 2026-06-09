import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const PlanoSaudeClinicasVeterinarias = () => (
  <InsurancePageTemplate
    title="Plano de Saúde para Clínicas Veterinárias"
    subtitle="O melhor benefício para atrair e reter talentos na sua clínica."
    icon="🩺"
    metaDescription="Planos de saúde empresariais para veterinários, auxiliares e equipes administrativas. Tabelas PME em Guarulhos."
    description="Oferecer um plano de saúde de qualidade é o principal diferencial competitivo para clínicas que buscam reter os melhores profissionais do mercado pet."
    coverages={[
      { title: "Atendimento Nacional", description: "Opções de planos com cobertura em todo o Brasil para sua equipe." },
      { title: "Rede Premium em Guarulhos", description: "Acesso aos melhores hospitais e laboratórios da região." },
      { title: "Redução de Carência", description: "Condições especiais para grupos acima de 3 ou 10 vidas." },
      { title: "Plano Odontológico Incluso", description: "Possibilidade de incluir proteção bucal para todos os colaboradores." }
    ]}
    whoNeeds={[
      "Clínicas Veterinárias PME",
      "Hospitais Veterinários",
      "Pet Shops com Equipes Grandes",
      "Redes de Franquias Pet"
    ]}
    whyPatro={[
      "Consultoria Especializada em Planos de Saúde",
      "Comparativo entre todas as Operadoras",
      "Gestão de Benefícios para o RH",
      "Melhores Custos PME de Guarulhos"
    ]}
    faqs={[
      { question: "Posso contratar só para os sócios?", answer: "Sim, a partir de 2 ou 3 vidas já é possível contratar um plano empresarial." }
    ]}
  />
);

export default PlanoSaudeClinicasVeterinarias;
