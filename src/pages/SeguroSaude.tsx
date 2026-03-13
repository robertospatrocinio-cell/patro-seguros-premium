import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const SeguroSaude = () => {
  return (
    <InsurancePageTemplate
      title="Seguro Saúde / Plano de Saúde"
      subtitle="Acesso a atendimento médico de qualidade quando você mais precisa"
      icon="🏥"
      metaDescription="Plano de Saúde e Seguro Saúde. Compare Bradesco, Amil, SulAmérica, Porto Saúde e mais. Individual, familiar e empresarial. Cotação grátis Patro Seguros."
      description="O Seguro Saúde (Plano de Saúde) garante acesso a consultas, exames, internações e procedimentos médicos com qualidade e rapidez. É fundamental para evitar comprometer suas economias em situações de emergência."
      detailedDescription={`Escolher um plano de saúde é uma das decisões financeiras mais importantes da vida. Um plano inadequado pode significar rede credenciada longe de casa, coparticipações caras ou coberturas insuficientes. Por outro lado, o plano certo garante tranquilidade para toda a família.

No Brasil, existem mais de 700 operadoras de saúde suplementar registradas na ANS (Agência Nacional de Saúde Suplementar), cada uma com dezenas de planos. Navegar nesse universo sozinho é complexo e arriscado. A Patro Seguros faz a análise comparativa completa, considerando sua região, necessidades médicas, orçamento e perfil familiar.

Trabalhamos com as maiores operadoras — Bradesco Saúde, Amil, SulAmérica, Porto Saúde, HapVida/NotreDame Intermédica, Prevent Senior, entre outras — e negociamos as melhores condições. Nossa consultoria é gratuita: você não paga nada a mais por ter nosso suporte especializado.`}
      howItWorks={[
        { step: "1", title: "Análise do Perfil", description: "Entendemos suas necessidades: quantidade de beneficiários, faixas etárias, região, médicos e hospitais preferidos" },
        { step: "2", title: "Comparação de Planos", description: "Comparamos planos de múltiplas operadoras, analisando rede credenciada, coberturas, carências e preços" },
        { step: "3", title: "Recomendação Personalizada", description: "Apresentamos as melhores opções com análise detalhada de custo-benefício para seu perfil" },
        { step: "4", title: "Contratação e Suporte", description: "Cuidamos de toda a documentação e acompanhamos você durante toda a vigência do plano" },
      ]}
      coverages={[
        { title: "Consultas Médicas", description: "Acesso a clínicos gerais e especialistas" },
        { title: "Exames e Diagnósticos", description: "Cobertura para exames laboratoriais e de imagem" },
        { title: "Internações Hospitalares", description: "Cobertura para internações clínicas e cirúrgicas" },
        { title: "Cirurgias", description: "Procedimentos cirúrgicos de pequeno, médio e grande porte" },
        { title: "Urgência e Emergência", description: "Atendimento imediato em situações críticas" },
        { title: "Tratamentos", description: "Quimioterapia, radioterapia, hemodiálise e mais" },
        { title: "Parto e Obstetrícia", description: "Acompanhamento gestacional e parto" },
        { title: "Reembolso", description: "Opção de reembolso em alguns planos" },
      ]}
      coverageExclusions={[
        "Procedimentos estéticos sem indicação médica comprovada",
        "Tratamentos experimentais não aprovados pela ANS",
        "Internação em acomodação superior à contratada (sem upgrade)",
        "Medicamentos de uso domiciliar (salvo exceções contratuais)",
        "Próteses e órteses não ligadas ao ato cirúrgico",
        "Inseminação artificial e fertilização in vitro (depende do plano)",
        "Transplantes não previstos no rol da ANS",
      ]}
      pricingInfo={{
        intro: "O valor do plano de saúde varia significativamente conforme a faixa etária, tipo de acomodação, abrangência e operadora.",
        factors: [
          "Faixa etária dos beneficiários (reajustes a cada faixa até 59 anos)",
          "Tipo de acomodação: enfermaria ou apartamento",
          "Abrangência: municipal, estadual ou nacional",
          "Coparticipação vs mensalidade fixa",
          "Com ou sem obstetrícia",
          "Rede credenciada disponível na região",
        ],
        note: "Um plano individual para pessoa de 30 anos pode custar de R$ 350 a R$ 2.000/mês dependendo da operadora e cobertura. Planos empresariais (a partir de 2 vidas) costumam ter valores 30% a 50% menores que individuais.",
      }}
      realScenarios={[
        { title: "Cirurgia de urgência", description: "Um cliente de 45 anos precisou de cirurgia cardíaca de emergência. Sem plano, o custo seria superior a R$ 150.000. Com o plano contratado via Patro, a cobertura foi integral, sem nenhum desembolso adicional." },
        { title: "Gestação tranquila", description: "Uma família contratou plano com obstetrícia. Durante a gestação, foram realizados mais de 20 exames, consultas mensais e o parto cesárea em hospital particular. O custo total seria de R$ 35.000 — coberto integralmente." },
        { title: "Portabilidade inteligente", description: "Um cliente insatisfeito com a rede credenciada do plano anterior migrou para outra operadora com portabilidade de carências. Nossa equipe cuidou de todo o processo, garantindo zero carência no novo plano." },
      ]}
      importantDetails={[
        { title: "Carências regulamentadas pela ANS", content: "Urgência e emergência: 24 horas. Consultas e exames simples: 30 dias. Internações e cirurgias: 180 dias. Partos: 300 dias. Doenças preexistentes: 24 meses (cobertura parcial temporária)." },
        { title: "Reajustes anuais", content: "Planos individuais têm reajuste definido pela ANS. Planos empresariais são reajustados conforme sinistralidade do grupo. Planos coletivos por adesão seguem regras específicas." },
        { title: "Portabilidade de carências", content: "Se você já tem plano há mais de 2 anos (ou 3 anos com doença preexistente), pode trocar de operadora levando as carências cumpridas. Orientamos sobre todas as regras." },
      ]}
      tips={[
        "Compare sempre 3 a 5 operadoras antes de decidir — o preço mais baixo nem sempre é o melhor custo-benefício",
        "Verifique se seus médicos e hospitais preferidos estão na rede credenciada antes de contratar",
        "Considere plano com coparticipação se você é jovem e usa pouco — a mensalidade fica até 40% menor",
        "Planos empresariais (mesmo para MEI com 2 vidas) costumam ser muito mais baratos que individuais",
        "Guarde todos os pedidos médicos e relatórios — eles são fundamentais em caso de negativa de cobertura",
        "Não esconda doenças preexistentes na declaração de saúde — isso pode causar perda de cobertura futura",
      ]}
      whoNeeds={[
        "Pessoas que querem evitar filas do SUS",
        "Famílias que buscam atendimento rápido e qualidade",
        "Profissionais autônomos sem plano corporativo",
        "Idosos que precisam de acompanhamento médico regular",
        "Gestantes que querem pré-natal e parto particular",
        "Qualquer pessoa que valorize saúde preventiva",
      ]}
      whyPatro={[
        "Análise comparativa entre diversas operadoras e planos",
        "Orientação sobre coparticipação vs mensalidade fixa",
        "Verificação de rede credenciada na sua região",
        "Auxílio em carências e portabilidade",
        "Negociação de condições especiais",
        "Suporte em caso de negativas de cobertura",
      ]}
      faqs={[
        { question: "Qual a diferença entre coparticipação e mensalidade fixa?", answer: "Na coparticipação você paga uma mensalidade menor, mas paga um valor por cada uso. Na mensalidade fixa, você paga um valor fixo e usa sem custos adicionais (exceto materiais específicos)." },
        { question: "O que são carências?", answer: "São períodos de espera para usar determinados serviços após a contratação. Urgências têm carência de 24h, partos de 300 dias. Doenças preexistentes podem ter carências especiais." },
        { question: "Posso incluir meus pais?", answer: "Sim! É possível incluir pais, cônjuge, filhos e dependentes legais. Analisamos a melhor configuração familiar para você." },
        { question: "Como funciona portabilidade de carências?", answer: "Se você já tem plano e quer trocar, pode levar as carências cumpridas. Orientamos sobre regras e prazos para portabilidade." },
        { question: "Posso usar em qualquer lugar do Brasil?", answer: "Depende do plano. Alguns têm abrangência nacional, outros regional ou municipal. Analisamos suas necessidades de deslocamento." },
        { question: "Plano empresarial é mais barato que individual?", answer: "Sim, significativamente! Planos empresariais podem custar de 30% a 50% menos que individuais. Mesmo MEIs com 2 beneficiários já conseguem acesso." },
      ]}
      relatedInsurances={[
        { title: "Seguro Odonto", link: "/seguro-odonto" },
        { title: "Seguro de Vida", link: "/seguro-vida" },
        { title: "Seguro Viagem", link: "/seguro-viagem" },
      ]}
    />
  );
};

export default SeguroSaude;
