import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const SeguroRC = () => {
  return (
    <InsurancePageTemplate
      title="Seguro Responsabilidade Civil"
      subtitle="Proteção contra danos causados a terceiros nas suas operações"
      icon="⚖️"
      description="O Seguro de Responsabilidade Civil (RC) protege sua empresa contra reclamações por danos materiais ou corporais causados a terceiros durante suas operações. Acidentes, erros e imprevistos podem gerar processos caros. Este seguro cobre indenizações e despesas judiciais, protegendo o patrimônio da empresa. Com a Patro Seguros, você tem coberturas personalizadas para seu ramo de atividade."
      coverages={[
        {
          title: "Danos Materiais a Terceiros",
          description: "Cobertura para prejuízos materiais causados a outras pessoas",
        },
        {
          title: "Danos Corporais a Terceiros",
          description: "Proteção para lesões físicas causadas durante operações",
        },
        {
          title: "Danos Morais",
          description: "Cobertura para danos à honra e imagem de terceiros",
        },
        {
          title: "Despesas de Defesa",
          description: "Custos com advogados e processos judiciais",
        },
        {
          title: "RC Operações",
          description: "Cobertura durante execução das atividades da empresa",
        },
        {
          title: "RC Empregador",
          description: "Proteção para acidentes com funcionários",
        },
        {
          title: "RC Produtos",
          description: "Cobertura para danos causados por produtos fabricados/vendidos",
        },
        {
          title: "RC Cruzada",
          description: "Proteção entre empresas do mesmo grupo econômico",
        },
      ]}
      whoNeeds={[
        "Empresas de construção civil",
        "Prestadores de serviços diversos",
        "Indústrias e fabricantes",
        "Comércios varejistas",
        "Empresas de eventos",
        "Qualquer empresa que trabalha com público ou terceiros",
      ]}
      whyPatro={[
        "Análise de riscos específicos do seu segmento",
        "Limites de indenização adequados à sua operação",
        "Orientação sobre RC Empregador e outras modalidades",
        "Suporte jurídico em caso de reclamações",
        "Parcerias com seguradoras especializadas em RC",
        "Revisão conforme crescimento e mudanças na empresa",
      ]}
      faqs={[
        {
          question: "Quando o seguro RC é acionado?",
          answer: "Quando terceiros (clientes, fornecedores, visitantes, público em geral) sofrem danos materiais ou corporais decorrentes das suas operações e fazem reclamação ou processo.",
        },
        {
          question: "Qual limite de cobertura devo contratar?",
          answer: "Depende do ramo de atividade, porte da operação e riscos envolvidos. Analisamos sua exposição e recomendamos limites adequados.",
        },
        {
          question: "RC Empregador substitui o seguro de acidentes de trabalho?",
          answer: "Não. RC Empregador complementa, cobrindo situações não contempladas pelo seguro obrigatório de acidentes de trabalho.",
        },
        {
          question: "Cobre danos causados por funcionários?",
          answer: "Sim! Se um funcionário causar danos a terceiros durante o trabalho, a RC da empresa é acionada.",
        },
        {
          question: "E se eu receber um processo?",
          answer: "Entre em contato imediatamente. A seguradora assume a defesa jurídica e cobre as indenizações até o limite da apólice.",
        },
      ]}
      relatedInsurances={[
        { title: "Seguro RC Profissional", link: "/seguro-rc-profissional" },
        { title: "Seguro Empresarial", link: "/seguro-empresarial" },
        { title: "Seguro Engenharia", link: "/seguro-engenharia" },
      ]}
    />
  );
};

export default SeguroRC;
