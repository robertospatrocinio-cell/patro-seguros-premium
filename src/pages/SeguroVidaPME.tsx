import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const SeguroVidaPME = () => {
  return (
    <InsurancePageTemplate
      title="Seguro de Vida PME"
      subtitle="Proteção coletiva para pequenas e médias empresas"
      icon="🏢"
      description="O Seguro de Vida PME é a solução ideal para pequenas e médias empresas que desejam oferecer proteção aos seus colaboradores com custo acessível. Com contratação a partir de 3 vidas, o seguro garante coberturas de morte, invalidez e assistências, funcionando como um diferencial competitivo na retenção de talentos. A Patro Seguros compara as melhores seguradoras para encontrar o plano perfeito para o porte e o orçamento da sua empresa."
      coverages={[
        { title: "Morte Natural ou Acidental", description: "Indenização aos beneficiários do colaborador em caso de falecimento por qualquer causa" },
        { title: "Invalidez Permanente Total ou Parcial por Acidente (IPA)", description: "Indenização proporcional ao grau de invalidez causada por acidente" },
        { title: "Invalidez Funcional Permanente Total por Doença (IFPD)", description: "Cobertura para invalidez total causada por doença que impeça o colaborador de exercer qualquer atividade" },
        { title: "Despesas Médico-Hospitalares (DMH)", description: "Reembolso de gastos médicos e hospitalares em caso de acidente" },
        { title: "Diária por Incapacidade Temporária (DIT)", description: "Pagamento de diária ao colaborador afastado temporariamente por acidente" },
        { title: "Auxílio Funeral", description: "Cobertura para despesas com funeral do colaborador ou familiares, conforme contratado" },
        { title: "Cesta Básica", description: "Fornecimento de cesta básica aos dependentes do segurado por período determinado em caso de falecimento" },
        { title: "Assistência 24h", description: "Serviços de assistência como orientação médica, nutricional, psicológica e jurídica" },
      ]}
      whoNeeds={[
        "Pequenas empresas a partir de 3 funcionários",
        "Médias empresas que buscam benefício com custo reduzido",
        "Escritórios de advocacia, contabilidade e consultoria",
        "Comércios e restaurantes",
        "Startups e empresas de tecnologia",
        "Empresas que querem reter talentos com benefícios competitivos",
        "Indústrias e prestadores de serviço",
      ]}
      whyPatro={[
        "Comparamos planos de diversas seguradoras para o melhor custo-benefício",
        "Contratação a partir de 3 vidas com processo simplificado",
        "Consultoria para adequar coberturas ao perfil da empresa",
        "Gestão completa: inclusão, exclusão e sinistros",
        "Atendimento consultivo para RH e gestores",
        "Sem burocracia na contratação e renovação",
      ]}
      faqs={[
        {
          question: "Quantos funcionários preciso para contratar o Seguro de Vida PME?",
          answer: "A maioria das seguradoras exige um mínimo de 3 vidas (funcionários) para a contratação do plano PME. Consulte-nos para verificar as opções disponíveis para o porte da sua empresa.",
        },
        {
          question: "Qual a diferença entre Seguro de Vida PME e Seguro de Vida Individual?",
          answer: "O PME é um plano coletivo contratado pela empresa, com custos reduzidos por diluição de risco entre os participantes. Já o individual é contratado por pessoa física, com preço geralmente mais alto. O PME também oferece vantagens fiscais para a empresa.",
        },
        {
          question: "O Seguro de Vida PME é dedutível do Imposto de Renda?",
          answer: "Sim! O valor pago pela empresa no Seguro de Vida PME pode ser deduzido como despesa operacional no Imposto de Renda de Pessoa Jurídica (IRPJ), representando uma economia tributária significativa.",
        },
        {
          question: "Posso incluir sócios e proprietários no plano?",
          answer: "Sim, sócios, proprietários e seus familiares podem ser incluídos no plano, dependendo da seguradora e das condições contratadas.",
        },
        {
          question: "O que acontece quando um funcionário é desligado?",
          answer: "O colaborador desligado é excluído do plano na data de saída. A Patro Seguros cuida de todo o processo de exclusão junto à seguradora, sem custos adicionais para a empresa.",
        },
        {
          question: "Como funciona o pagamento da indenização?",
          answer: "Em caso de sinistro, a empresa ou os beneficiários acionam a seguradora com a documentação necessária. A Patro Seguros auxilia em todo o processo para garantir agilidade no pagamento, que geralmente ocorre em até 30 dias.",
        },
      ]}
    />
  );
};

export default SeguroVidaPME;
