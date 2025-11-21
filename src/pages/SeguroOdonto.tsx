import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const SeguroOdonto = () => {
  return (
    <InsurancePageTemplate
      title="Seguro Odontológico"
      subtitle="Cuide da saúde bucal da sua família com tranquilidade"
      icon="🦷"
      description="O Seguro Odontológico (Plano Dentário) oferece acesso a consultas, procedimentos preventivos e tratamentos odontológicos com valores acessíveis. Manter a saúde bucal em dia é fundamental para a saúde geral e evita gastos elevados com tratamentos emergenciais. Com a Patro Seguros, você encontra planos completos com ampla rede credenciada e coberturas que vão de limpezas a implantes."
      coverages={[
        {
          title: "Consultas Odontológicas",
          description: "Consultas de rotina e emergenciais com dentistas",
        },
        {
          title: "Procedimentos Preventivos",
          description: "Limpeza, aplicação de flúor e orientação de higiene",
        },
        {
          title: "Tratamentos de Canal",
          description: "Endodontia completa para salvar dentes comprometidos",
        },
        {
          title: "Restaurações",
          description: "Tratamento de cáries e recuperação de dentes",
        },
        {
          title: "Periodontia",
          description: "Tratamento de gengivas e doenças periodontais",
        },
        {
          title: "Cirurgias Odontológicas",
          description: "Extração de dentes, incluindo sisos",
        },
        {
          title: "Ortodontia",
          description: "Aparelhos dentários (conforme plano)",
        },
        {
          title: "Próteses e Implantes",
          description: "Recuperação total da dentição (conforme plano)",
        },
      ]}
      whoNeeds={[
        "Famílias que querem cuidar da saúde bucal preventivamente",
        "Pessoas que precisam de tratamentos odontológicos regulares",
        "Quem busca economia em procedimentos dentários",
        "Pais que querem acompanhamento ortodôntico para filhos",
        "Idosos que necessitam de próteses e manutenção",
        "Profissionais que querem manter sorriso saudável",
      ]}
      whyPatro={[
        "Planos individuais, familiares e empresariais",
        "Comparação entre operadoras e coberturas",
        "Verificação de rede credenciada próxima a você",
        "Planos com e sem carência para urgências",
        "Orientação sobre ortodontia e procedimentos estéticos",
        "Valores acessíveis com pagamento facilitado",
      ]}
      faqs={[
        {
          question: "Quanto custa um plano odontológico?",
          answer: "Os valores variam de acordo com o tipo de cobertura e operadora, mas são bem acessíveis, geralmente a partir de valores muito baixos mensais. Fazemos cotação comparativa para você.",
        },
        {
          question: "Tem carência?",
          answer: "Geralmente há carências de 24h para urgências, 30 a 90 dias para procedimentos simples e até 12 meses para ortodontia. Existem planos sem carência para emergências.",
        },
        {
          question: "Cobre aparelho ortodôntico?",
          answer: "Alguns planos cobrem ortodontia parcial ou totalmente. Analisamos as opções conforme sua necessidade.",
        },
        {
          question: "Posso escolher o dentista?",
          answer: "Você escolhe entre os dentistas da rede credenciada. Verificamos quais profissionais atendem na sua região.",
        },
        {
          question: "Vale a pena contratar?",
          answer: "Sim! Uma simples limpeza semestral, mais uma restauração já paga o plano anual. Tratamentos de canal, cirurgias e ortodontia representam grande economia.",
        },
      ]}
      relatedInsurances={[
        { title: "Seguro Saúde", link: "/seguro-saude" },
        { title: "Seguro de Vida", link: "/seguro-vida" },
        { title: "Seguro Viagem", link: "/seguro-viagem" },
      ]}
    />
  );
};

export default SeguroOdonto;
