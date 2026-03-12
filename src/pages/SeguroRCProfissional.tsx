import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const SeguroRCProfissional = () => {
  return (
    <InsurancePageTemplate
      title="Seguro RC Profissional (E&O)"
      subtitle="Proteção para profissionais liberais contra erros e omissões"
      icon="👔"
      metaDescription="Seguro RC Profissional (E&O) para médicos, advogados, engenheiros, contadores e arquitetos. Proteção contra erros e omissões. Cotação grátis Patro Seguros."
      description="O Seguro de Responsabilidade Civil Profissional (também chamado E&O - Errors & Omissions) protege profissionais liberais contra reclamações de clientes por erros, omissões ou negligência na prestação de serviços. Médicos, advogados, engenheiros, arquitetos, contadores e outros profissionais estão sujeitos a processos que podem comprometer todo o patrimônio pessoal. Com a Patro Seguros, você tem proteção específica para sua profissão."
      coverages={[
        {
          title: "Erros Profissionais",
          description: "Cobertura para equívocos na prestação de serviços",
        },
        {
          title: "Omissões",
          description: "Proteção por falhas em orientações ou procedimentos",
        },
        {
          title: "Negligência",
          description: "Cobertura para descuidos na execução do trabalho",
        },
        {
          title: "Imperícia",
          description: "Proteção por falta de conhecimento técnico alegado",
        },
        {
          title: "Despesas de Defesa",
          description: "Custos com advogados e processos administrativos/judiciais",
        },
        {
          title: "Indenizações",
          description: "Pagamento de condenações até o limite da apólice",
        },
        {
          title: "Danos Morais e Materiais",
          description: "Cobertura para prejuízos causados ao cliente",
        },
        {
          title: "Processos Éticos",
          description: "Defesa em conselhos profissionais (CRM, OAB, CREA, etc)",
        },
      ]}
      whoNeeds={[
        "Médicos e profissionais de saúde",
        "Advogados e escritórios de advocacia",
        "Engenheiros e arquitetos",
        "Contadores e consultores financeiros",
        "Corretores de imóveis e seguros",
        "Consultores e profissionais liberais em geral",
      ]}
      whyPatro={[
        "Apólices específicas por profissão",
        "Limites de cobertura adequados ao risco da atividade",
        "Orientação sobre exclusões e coberturas",
        "Suporte completo em processos éticos e judiciais",
        "Parcerias com seguradoras especializadas em RC Profissional",
        "Análise de histórico e especialidade profissional",
      ]}
      faqs={[
        {
          question: "Por que preciso de RC Profissional?",
          answer: "Processos por erro profissional podem resultar em indenizações milionárias e comprometer todo seu patrimônio pessoal. O seguro protege você e sua família.",
        },
        {
          question: "Quanto custa o seguro RC Profissional?",
          answer: "Varia conforme a profissão, especialidade, localização, tempo de atuação e limite de cobertura desejado. Fazemos cotação personalizada.",
        },
        {
          question: "Cobre processos antigos?",
          answer: "Geralmente cobre processos de fatos ocorridos durante a vigência da apólice, mesmo que a reclamação seja feita depois. Analisamos as cláusulas de retroatividade.",
        },
        {
          question: "Qual o limite de cobertura recomendado?",
          answer: "Depende da profissão e especialidade. Cirurgiões precisam de limites maiores que clínicos gerais, por exemplo. Orientamos conforme seu perfil.",
        },
        {
          question: "Cobre processos em conselhos profissionais?",
          answer: "Sim! A maioria das apólices cobre defesa em processos éticos nos conselhos (CRM, OAB, CREA, CRC, etc).",
        },
      ]}
      relatedInsurances={[
        { title: "Seguro Responsabilidade Civil", link: "/seguro-rc" },
        { title: "Seguro de Vida", link: "/seguro-vida" },
        { title: "Seguro Empresarial", link: "/seguro-empresarial" },
      ]}
    />
  );
};

export default SeguroRCProfissional;
