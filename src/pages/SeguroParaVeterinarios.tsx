import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const SeguroParaVeterinarios = () => (
  <InsurancePageTemplate
    title="Seguro para Veterinários"
    subtitle="Proteção individual para o médico veterinário autônomo ou sócio."
    icon="🩺"
    metaDescription="Seguro de vida, acidentes pessoais e RC profissional para médicos veterinários. Proteja sua renda e seu patrimônio."
    description="O Seguro para Veterinários foi desenhado para proteger o profissional que atua de forma autônoma ou como sócio de clínicas. Ele garante suporte financeiro em caso de afastamento do trabalho e proteção contra processos."
    coverages={[
      { title: "Diária de Incapacidade Temporária", description: "Garante sua renda diária caso precise se afastar do trabalho por doença ou acidente." },
      { title: "Responsabilidade Civil Profissional", description: "Defesa jurídica e pagamento de indenizações por alegações de erro profissional." },
      { title: "Seguro de Vida", description: "Proteção financeira para sua família em caso de morte ou invalidez." },
      { title: "Doenças Graves", description: "Indenização em dinheiro para custear tratamentos de câncer, infarto e outras doenças." }
    ]}
    whoNeeds={[
      "Médicos Veterinários Autônomos",
      "Sócios de Clínicas e Hospitais",
      "Veterinários de Grandes Animais",
      "Consultores e Peritos Veterinários"
    ]}
    whyPatro={[
      "Especialista em Seguros para Profissionais da Saúde",
      "Análise de Risco Individualizada",
      "Atendimento Humanizado em Guarulhos",
      "Melhores Seguradoras do Mercado"
    ]}
    faqs={[
      { question: "O seguro cobre afastamento por mordida de animal?", answer: "Sim, se a mordida resultar em incapacidade temporária de trabalho, o seguro paga as diárias contratadas." },
      { question: "O RC protege contra processos no CRMV?", answer: "Sim, as apólices de RC Profissional incluem custos de defesa em processos éticos." }
    ]}
  />
);

export default SeguroParaVeterinarios;
