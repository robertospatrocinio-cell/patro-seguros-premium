import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const PrevidenciaPrivada = () => {
  return (
    <InsurancePageTemplate
      title="Previdência Privada"
      subtitle="Construa seu futuro com tranquilidade e segurança financeira"
      icon="💰"
      metaDescription="Previdência Privada VGBL e PGBL. Planeje sua aposentadoria com benefícios fiscais e rentabilidade. Compare planos. Cotação grátis Patro Seguros."
      description="A Previdência Privada é um investimento de longo prazo focado em garantir renda na aposentadoria ou realizar objetivos futuros. É uma alternativa ou complemento à previdência oficial, oferecendo mais flexibilidade, rendimentos potencialmente melhores e benefícios fiscais. Com a Patro Seguros, você tem acesso aos melhores planos do mercado, com análise completa para escolher a opção ideal para seu perfil."
      coverages={[
        {
          title: "PGBL - Plano Gerador de Benefício Livre",
          description: "Ideal para quem faz declaração completa do IR e busca dedução fiscal",
        },
        {
          title: "VGBL - Vida Gerador de Benefício Livre",
          description: "Indicado para quem faz declaração simplificada ou é isento",
        },
        {
          title: "Portabilidade Sem Custo",
          description: "Possibilidade de migrar para planos melhores sem perder rentabilidade",
        },
        {
          title: "Resgate Programado",
          description: "Defina como e quando resgatar seu dinheiro",
        },
        {
          title: "Benefício por Sobrevivência",
          description: "Receba renda vitalícia ou por período determinado",
        },
        {
          title: "Cobertura por Morte",
          description: "Garante que os beneficiários recebam o patrimônio acumulado",
        },
      ]}
      whoNeeds={[
        "Profissionais liberais e autônomos sem INSS",
        "Pessoas que querem complementar a aposentadoria oficial",
        "Quem busca benefícios fiscais e redução de IR",
        "Pais que querem garantir recursos para filhos no futuro",
        "Pessoas com renda variável que querem disciplina financeira",
        "Quem planeja aposentadoria antecipada",
      ]}
      whyPatro={[
        "Análise comparativa entre PGBL e VGBL para seu perfil",
        "Simulações realistas de acúmulo e rendimento",
        "Orientação sobre melhores fundos e gestoras",
        "Acompanhamento periódico da rentabilidade",
        "Auxílio em portabilidade quando necessário",
        "Consultoria sobre estratégias de resgate e sucessão",
      ]}
      faqs={[
        {
          question: "Qual a diferença entre PGBL e VGBL?",
          answer: "PGBL permite deduzir até 12% da renda bruta anual do IR (melhor para declaração completa). VGBL não permite dedução, mas o IR incide apenas sobre os rendimentos no resgate (melhor para declaração simplificada).",
        },
        {
          question: "Quanto devo investir mensalmente?",
          answer: "Não há valor mínimo ou máximo obrigatório. Recomendamos de 10% a 20% da renda, mas depende dos seus objetivos e capacidade financeira. Simulamos cenários para você.",
        },
        {
          question: "Posso resgatar antes da aposentadoria?",
          answer: "Sim, mas há períodos de carência e pode haver cobrança de taxas conforme o prazo. Analisamos o melhor momento para resgates.",
        },
        {
          question: "Tem garantia de rentabilidade?",
          answer: "Não há garantia, mas você pode escolher fundos mais conservadores ou arrojados conforme seu perfil de risco. Acompanhamos a performance para você.",
        },
        {
          question: "O que acontece se eu falecer?",
          answer: "O patrimônio acumulado vai para os beneficiários indicados, sem passar por inventário. É uma excelente ferramenta de sucessão patrimonial.",
        },
      ]}
      relatedInsurances={[
        { title: "Seguro de Vida", link: "/seguro-vida" },
        { title: "Seguro Saúde", link: "/seguro-saude" },
        { title: "Seguro Empresarial", link: "/seguro-empresarial" },
      ]}
    />
  );
};

export default PrevidenciaPrivada;
