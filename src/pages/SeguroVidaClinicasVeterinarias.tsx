import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const SeguroVidaClinicasVeterinarias = () => (
  <InsurancePageTemplate
    title="Seguro de Vida para Clínicas Veterinárias"
    subtitle="Proteção para sócios, veterinários e funcionários."
    icon="❤️"
    metaDescription="Seguro de vida empresarial para o setor veterinário. Cobertura para invalidez profissional, doenças graves e morte. Patro Seguros."
    description="O seguro de vida empresarial é fundamental para garantir a estabilidade financeira da sua clínica em momentos difíceis, protegendo o futuro das famílias de quem faz o negócio acontecer."
    coverages={[
      { title: "Invalidez Profissional", description: "Indenização caso o veterinário fique impossibilitado de exercer a profissão." },
      { title: "Doenças Graves", description: "Capital para tratamento de câncer, infarto, AVC e outras patologias." },
      { title: "Morte por Qualquer Causa", description: "Proteção financeira para os dependentes do segurado." },
      { title: "Auxílio Funeral", description: "Suporte completo para a família em momentos de luto." }
    ]}
    whoNeeds={[
      "Sócios de Clínicas e Hospitais",
      "Médicos Veterinários",
      "Equipe de Apoio e Administrativo",
      "Clínicas que exigem seguro via Sindicato"
    ]}
    whyPatro={[
      "Especialista em Proteção Familiar e Sucessória",
      "Análise de Capital Segurado Adequada",
      "Atendimento Especializado em Guarulhos",
      "Seguradoras com Liquidez Garantida"
    ]}
    faqs={[
      { question: "O seguro é obrigatório pela convenção coletiva?", answer: "Muitas categorias veterinárias possuem obrigatoriedade de seguro de vida. Nós analisamos a convenção do seu sindicato." }
    ]}
  />
);

export default SeguroVidaClinicasVeterinarias;
