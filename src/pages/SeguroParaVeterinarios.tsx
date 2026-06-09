import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const SeguroClinicaVeterinariaIndividual = () => (
  <InsurancePageTemplate
    title="Seguro para Veterinários"
    subtitle="Proteção completa para médicos veterinários autônomos ou com clínica própria."
    icon="🐾"
    metaDescription="Seguro para veterinários: RC profissional, seguro de vida, equipamentos e plano de saúde. Proteja sua carreira."
    description="Desenvolvemos uma solução modular para o médico veterinário, permitindo que você contrate apenas o que faz sentido para o seu momento de carreira."
    coverages={[
      { title: "RC Profissional", description: "Proteção contra processos por erro médico." },
      { title: "DIT - Diária de Incapacidade", description: "Garante sua renda se você não puder trabalhar." },
      { title: "Seguro de Equipamentos", description: "Proteção para seus aparelhos portáteis." },
      { title: "Seguro de Vida", description: "Proteção para sua família." }
    ]}
    whoNeeds={["Veterinários Autônomos", "Clínicos Gerais", "Especialistas", "Veterinários de Campo"]}
    whyPatro={["Especialista no setor pet", "Consultoria 360", "Atendimento em Guarulhos"]}
    faqs={[]}
  />
);

export default SeguroClinicaVeterinariaIndividual;
