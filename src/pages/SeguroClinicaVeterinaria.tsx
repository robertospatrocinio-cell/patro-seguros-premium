import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const SeguroClinicaVeterinaria = () => (
  <InsurancePageTemplate
    title="Seguro para Clínicas Veterinárias"
    subtitle="Proteção completa para o imóvel, equipamentos e responsabilidade da sua clínica."
    icon="🏥"
    metaDescription="Seguro empresarial para clínicas veterinárias: incêndio, roubo, danos elétricos e RC sob custódia. Cotação em Guarulhos."
    description="Sua clínica veterinária precisa de uma proteção robusta que vá além do básico. O seguro empresarial pet protege desde a estrutura física até a vida dos animais sob seus cuidados."
    coverages={[
      { title: "Incêndio e Danos Elétricos", description: "Proteção para o prédio e para aparelhos sensíveis contra curtos-circuitos." },
      { title: "RC Animais sob Custódia", description: "Cobre danos acidentais a pets durante banho, tosa, exames ou internação." },
      { title: "Roubo e Furto Qualificado", description: "Segurança para estoque de medicamentos, vacinas e equipamentos médicos." },
      { title: "Lucros Cessantes", description: "Garante o faturamento da clínica caso ela precise parar as atividades após um sinistro." }
    ]}
    whoNeeds={[
      "Clínicas Veterinárias de Pequeno Porte",
      "Centros de Diagnóstico Animal",
      "Clínicas com Banho e Tosa",
      "Consultórios Veterinários"
    ]}
    whyPatro={[
      "Expertise em Seguros Empresariais Pet",
      "Apólices Flexíveis e Customizáveis",
      "Suporte em Sinistros em Guarulhos",
      "Consultoria de Gestão de Riscos"
    ]}
    faqs={[
      { question: "O seguro cobre se um animal fugir da clínica?", answer: "Sim, a cobertura de RC sob custódia geralmente abrange fugas acidentais." },
      { question: "Cobre danos em ultrassom e raio-X?", answer: "Sim, desde que contratada a cobertura de equipamentos médicos/eletrônicos." }
    ]}
  />
);

export default SeguroClinicaVeterinaria;
