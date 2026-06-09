import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const SeguroEquipamentosVeterinarios = () => (
  <InsurancePageTemplate
    title="Seguro para Equipamentos Veterinários"
    subtitle="Proteja o investimento em tecnologia da sua clínica."
    icon="📷"
    metaDescription="Seguro para raio-X, ultrassom, scanners e equipamentos laboratoriais veterinários. Reposição garantida contra roubo e quebra."
    description="Seus equipamentos médicos são caros e indispensáveis. O seguro de equipamentos veterinários garante que você não fique parado em caso de acidentes ou crimes."
    coverages={[
      { title: "Roubo e Furto Qualificado", description: "Indenização rápida para reposição do equipamento em caso de crime." },
      { title: "Danos Elétricos", description: "Proteção contra queima por picos de energia ou raios." },
      { title: "Danos por Quedas e Impactos", description: "Cobre a quebra acidental do equipamento durante o manuseio ou transporte." },
      { title: "Equipamentos Portáteis", description: "Proteção para equipamentos levados para atendimentos domiciliares ou a campo." }
    ]}
    whoNeeds={[
      "Clínicas com Equipamentos de Imagem",
      "Laboratórios Veterinários",
      "Veterinários que fazem Atendimento em Campo",
      "Hospitais Veterinários"
    ]}
    whyPatro={[
      "Apólices Específicas para Tecnologia Médica",
      "Agilidade na Regulação de Sinistros",
      "Melhores Taxas do Mercado em Guarulhos",
      "Suporte Especializado em Hardware Médico"
    ]}
    faqs={[
      { question: "Preciso de nota fiscal para segurar?", answer: "Sim, para a contratação e para a indenização é necessária a comprovação da propriedade via nota fiscal ou documento de importação." }
    ]}
  />
);

export default SeguroEquipamentosVeterinarios;
