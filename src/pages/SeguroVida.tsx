import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const SeguroVida = () => {
  return (
    <InsurancePageTemplate
      title="Seguro de Vida"
      subtitle="Proteção financeira para você e sua família em momentos difíceis"
      icon="❤️"
      description="O Seguro de Vida é fundamental para garantir a tranquilidade e o bem-estar financeiro da sua família caso algo aconteça com você. Com a Patro Seguros, você tem acesso a coberturas completas que incluem morte, invalidez, doenças graves e assistências variadas. É o investimento mais importante que você pode fazer para proteger quem você ama."
      coverages={[
        {
          title: "Morte Natural ou Acidental",
          description: "Indenização para os beneficiários em caso de falecimento",
        },
        {
          title: "Invalidez Permanente",
          description: "Cobertura para invalidez total ou parcial por acidente ou doença",
        },
        {
          title: "Doenças Graves",
          description: "Indenização em caso de diagnóstico de doenças como câncer, AVC, infarto",
        },
        {
          title: "Assistência Funeral",
          description: "Cobertura de despesas com funeral e translado",
        },
        {
          title: "Diária por Internação",
          description: "Pagamento de diária em caso de internação hospitalar",
        },
        {
          title: "Cesta Alimentação",
          description: "Auxílio financeiro mensal para alimentação da família",
        },
      ]}
      whoNeeds={[
        "Pessoas com dependentes financeiros (filhos, cônjuge, pais)",
        "Profissionais autônomos e liberais",
        "Quem tem dívidas ou financiamentos",
        "Casais que dependem da renda de um ou ambos",
        "Pessoas que querem garantir qualidade de vida aos beneficiários",
        "Qualquer adulto responsável financeiramente",
      ]}
      whyPatro={[
        "Coberturas personalizadas para seu perfil familiar",
        "Valores de indenização adequados às suas necessidades",
        "Processo de contratação simplificado",
        "Suporte total aos beneficiários em momentos difíceis",
        "Comparação entre várias seguradoras",
        "Revisão periódica das coberturas conforme mudanças na vida",
      ]}
      faqs={[
        {
          question: "Quanto custa um seguro de vida?",
          answer: "O valor depende da idade, saúde, profissão e das coberturas escolhidas. Temos opções a partir de valores muito acessíveis, compatíveis com qualquer orçamento.",
        },
        {
          question: "Qual o valor ideal de cobertura?",
          answer: "Recomendamos uma cobertura que cubra de 5 a 10 anos das despesas familiares, mais dívidas existentes. Fazemos essa análise com você.",
        },
        {
          question: "Quem pode ser beneficiário?",
          answer: "Você pode indicar qualquer pessoa: cônjuge, filhos, pais, irmãos ou até amigos. É possível ter múltiplos beneficiários com percentuais definidos.",
        },
        {
          question: "Preciso fazer exames médicos?",
          answer: "Na maioria dos casos, não. Apenas para coberturas muito altas ou idades avançadas pode ser solicitado algum exame.",
        },
        {
          question: "O seguro cobre suicídio?",
          answer: "Após 2 anos de vigência da apólice, sim. Antes disso, não há cobertura conforme determina a legislação brasileira.",
        },
      ]}
      relatedInsurances={[
        { title: "Seguro Saúde", link: "/seguro-saude" },
        { title: "Previdência Privada", link: "/previdencia-privada" },
        { title: "Seguro Residencial", link: "/seguro-residencial" },
      ]}
    />
  );
};

export default SeguroVida;
