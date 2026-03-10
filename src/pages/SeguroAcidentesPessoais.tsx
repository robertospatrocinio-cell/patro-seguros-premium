import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const SeguroAcidentesPessoais = () => {
  return (
    <InsurancePageTemplate
      title="Seguro de Acidentes Pessoais"
      subtitle="Proteção financeira para você e sua família em caso de acidentes"
      icon="🛡️"
      description="O Seguro de Acidentes Pessoais oferece indenização em casos de morte acidental, invalidez permanente total ou parcial e despesas médico-hospitalares decorrentes de acidentes. É um seguro acessível que garante tranquilidade financeira para você e seus beneficiários diante de imprevistos do dia a dia. A Patro Seguros compara as melhores opções do mercado para encontrar a cobertura ideal para o seu perfil."
      coverages={[
        { title: "Morte Acidental", description: "Indenização aos beneficiários em caso de falecimento por acidente" },
        { title: "Invalidez Permanente Total", description: "Indenização integral em caso de invalidez total por acidente" },
        { title: "Invalidez Permanente Parcial", description: "Indenização proporcional ao grau de invalidez causada por acidente" },
        { title: "Despesas Médico-Hospitalares", description: "Reembolso de gastos com tratamentos decorrentes de acidente" },
        { title: "Diárias de Incapacidade Temporária", description: "Renda diária durante o período de afastamento por acidente" },
        { title: "Despesas Farmacêuticas", description: "Cobertura para medicamentos prescritos após acidente" },
        { title: "Fraturas", description: "Indenização específica em caso de fraturas decorrentes de acidente" },
        { title: "Auxílio Funeral", description: "Cobertura para despesas com funeral do segurado" },
      ]}
      whoNeeds={[
        "Trabalhadores autônomos e profissionais liberais",
        "Pessoas que praticam esportes e atividades físicas",
        "Quem deseja complementar o seguro de vida",
        "Profissionais com atividades de risco",
        "Famílias que querem proteção adicional",
        "Estudantes e jovens em início de carreira",
      ]}
      whyPatro={[
        "Análise personalizada do seu perfil de risco",
        "Comparação entre diversas seguradoras",
        "Coberturas flexíveis e personalizáveis",
        "Preços acessíveis com excelente custo-benefício",
        "Suporte completo em caso de sinistro",
        "Contratação rápida e sem burocracia",
      ]}
      faqs={[
        { question: "Qual a diferença entre seguro de vida e acidentes pessoais?", answer: "O seguro de vida cobre morte por qualquer causa (natural ou acidental), enquanto o de acidentes pessoais cobre exclusivamente eventos causados por acidentes. Por isso, o AP costuma ter um valor mais acessível." },
        { question: "Quanto custa um seguro de acidentes pessoais?", answer: "O valor varia conforme as coberturas escolhidas, idade, profissão e capital segurado. É um dos seguros mais acessíveis do mercado. Solicite uma cotação gratuita." },
        { question: "Posso ter seguro de vida e acidentes pessoais ao mesmo tempo?", answer: "Sim! Muitas pessoas contratam os dois para ter uma proteção mais completa. Em caso de acidente, ambos podem ser acionados." },
        { question: "O seguro cobre acidentes esportivos?", answer: "Depende da apólice e das condições contratadas. Algumas modalidades esportivas podem ter cobertura específica. Consulte-nos para verificar." },
        { question: "Existe carência?", answer: "Para acidentes pessoais geralmente não há carência, a cobertura inicia imediatamente após a contratação." },
      ]}
      relatedInsurances={[
        { title: "Seguro de Vida", link: "/seguro-vida" },
        { title: "Planos de Saúde", link: "/planos-de-saude" },
        { title: "Seguro Viagem", link: "/seguro-viagem" },
        { title: "Seguro Estagiário", link: "/seguro-estagiario" },
      ]}
    />
  );
};

export default SeguroAcidentesPessoais;
