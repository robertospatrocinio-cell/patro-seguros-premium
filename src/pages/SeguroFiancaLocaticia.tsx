import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const SeguroFiancaLocaticia = () => {
  return (
    <InsurancePageTemplate
      title="Seguro Fiança Locatícia"
      subtitle="A substituição inteligente do fiador para aluguel de imóveis residenciais e comerciais"
      icon="🏠"
      metaDescription="Seguro Fiança Locatícia — substitui fiador e caução no aluguel. Aprovação rápida para residencial e comercial. Proteção para proprietário e inquilino. Cotação grátis."
      description="O Seguro Fiança Locatícia é a solução moderna e segura que substitui a figura do fiador e a caução em contratos de locação."
      detailedDescription={`O mercado imobiliário brasileiro está mudando: cada vez menos pessoas aceitam ser fiadoras, e a caução (depósito de 3 aluguéis) imobiliza capital precioso. O Seguro Fiança Locatícia é a evolução natural da garantia locatícia, oferecendo vantagens tanto para inquilinos quanto para proprietários.

Para o inquilino, as vantagens são claras: não precisa pedir favor a ninguém, a aprovação é rápida e o custo é menor que a caução. Para o proprietário, a vantagem é ainda maior: a cobertura do seguro fiança é muito mais ampla que a de um fiador pessoa física — que pode não ter bens suficientes para honrar a garantia ou pode dificultar a execução judicial.

Com o Seguro Fiança, uma seguradora de grande porte garante o pagamento de aluguéis atrasados, condomínio, IPTU, danos ao imóvel, multa rescisória, pintura e até custos de despejo. É a garantia mais completa do mercado.

Na Patro Seguros, trabalhamos com análise de crédito em múltiplas seguradoras simultaneamente, aumentando as chances de aprovação e buscando as melhores condições para cada perfil.`}
      howItWorks={[
        { step: "1", title: "Envio de Documentos", description: "O locatário envia documentos pessoais e comprovantes de renda para análise de crédito" },
        { step: "2", title: "Análise Multicanal", description: "Submetemos a análise em múltiplas seguradoras para maximizar chances de aprovação e melhores condições" },
        { step: "3", title: "Aprovação e Emissão", description: "Aprovação em até 24h na maioria dos casos. Emitimos o certificado que substitui o fiador" },
        { step: "4", title: "Vigência Contínua", description: "Cobertura alinhada ao contrato de locação com renovação automática anual" },
      ]}
      coverages={[
        { title: "Aluguel em Atraso", description: "Indenização ao proprietário pelos aluguéis não pagos pelo inquilino" },
        { title: "Encargos Locatícios (IPTU e Condomínio)", description: "Cobertura para IPTU, condomínio, água, luz e gás não pagos" },
        { title: "Danos ao Imóvel", description: "Reparos por danos causados pelo inquilino durante a ocupação" },
        { title: "Multa por Rescisão Contratual", description: "Cobertura da multa em caso de quebra antecipada do contrato" },
        { title: "Despesas Judiciais de Despejo", description: "Custos com honorários advocatícios e ações judiciais de despejo" },
        { title: "Pintura Interna e Externa", description: "Custos de repintura para devolução do imóvel nas condições originais" },
        { title: "Contas de Consumo", description: "Cobertura para contas de água, energia e gás em atraso" },
        { title: "Danos a Móveis Planejados", description: "Proteção para armários e móveis planejados que pertencem ao imóvel" },
      ]}
      coverageExclusions={[
        "Inadimplência anterior à contratação do seguro",
        "Danos causados por caso fortuito ou força maior ao imóvel",
        "Reformas e modificações estruturais não autorizadas",
        "Desgaste natural pelo uso normal do imóvel",
        "Valores superiores aos limites contratados na apólice",
      ]}
      pricingInfo={{
        intro: "O custo é calculado como percentual do valor do aluguel, geralmente equivalente a 1 a 1,5 aluguel por ano.",
        factors: [
          "Valor do aluguel e encargos mensais",
          "Score de crédito do locatário",
          "Renda comprovada em relação ao aluguel",
          "Tipo de imóvel (residencial ou comercial)",
          "Pessoa física ou jurídica",
          "Coberturas adicionais escolhidas",
        ],
        note: "Para aluguel de R$ 1.500/mês: seguro fiança de R$ 1.500 a R$ 2.250/ano (R$ 125 a R$ 187/mês). Para R$ 3.000/mês: R$ 3.000 a R$ 4.500/ano. Parcelável em até 12x sem juros no cartão.",
      }}
      realScenarios={[
        { title: "MEI aprovado sem fiador", description: "Um microempreendedor individual que não conseguia fiador teve seu seguro fiança aprovado em 6 horas com comprovação de renda por extratos bancários e declaração de faturamento." },
        { title: "Proprietário protegido no despejo", description: "Um inquilino parou de pagar após 6 meses de contrato. O seguro cobriu R$ 15.000 em aluguéis atrasados, R$ 4.000 em condomínio e R$ 8.000 em custos de despejo judicial." },
        { title: "Aluguel comercial garantido", description: "Uma empresa alugou sala comercial de R$ 5.000/mês com seguro fiança empresarial. Após mudança de sede, o seguro cobriu a multa rescisória de R$ 15.000 e danos ao imóvel de R$ 6.000." },
      ]}
      importantDetails={[
        { title: "Seguro fiança vs caução vs fiador", content: "Seguro fiança: custo anual, cobertura ampla, aprovação rápida. Caução: imobiliza 3 aluguéis, cobertura limitada ao valor depositado. Fiador: gratuito, mas difícil de encontrar e execução judicial complexa." },
        { title: "Documentação necessária", content: "Pessoa física: RG/CPF, comprovante de renda (3 últimos), comprovante de residência. Pessoa jurídica: contrato social, balanço, faturamento. Autônomos: extratos bancários e IR." },
        { title: "Valor não reembolsável", content: "Assim como qualquer seguro, o valor pago pelo seguro fiança não é devolvido ao final do contrato. Porém, a proteção oferecida durante toda a vigência justifica o investimento." },
      ]}
      tips={[
        "Mantenha seu score de crédito saudável — scores mais altos resultam em aprovação mais rápida e prêmio menor",
        "Se é autônomo, organize extratos bancários dos últimos 3 meses antes de solicitar a análise",
        "Proprietários: incluam a exigência de seguro fiança como garantia preferencial na divulgação do imóvel",
        "Parcele o seguro em até 12x no cartão para diluir o custo — o impacto mensal é muito baixo",
        "Renove com antecedência para evitar gaps de cobertura entre vigências",
      ]}
      whoNeeds={[
        "Inquilinos residenciais que não possuem fiador",
        "Locatários de imóveis comerciais e salas corporativas",
        "Proprietários que querem garantia financeira sólida",
        "Imobiliárias que buscam agilizar processos de locação",
        "Profissionais liberais e autônomos que alugam consultórios",
        "Empresas que alugam espaços para filiais ou escritórios",
      ]}
      whyPatro={[
        "Aprovação em até 24 horas na maioria dos casos",
        "Análise de crédito facilitada com múltiplas seguradoras",
        "Parcelamento em até 12x sem juros no cartão",
        "Orientação completa sobre documentação e processo",
        "Atendimento tanto para locador quanto para locatário",
        "Renovação automática alinhada ao contrato de locação",
      ]}
      faqs={[
        { question: "Qual a diferença entre seguro fiança e caução?", answer: "A caução exige depósito de até 3 aluguéis, imobilizando capital. O seguro fiança é pago anualmente e oferece coberturas muito mais amplas." },
        { question: "Quanto custa o seguro fiança locatícia?", answer: "Em média, 1 a 1,5 aluguel por ano, parcelável. Depende do perfil e coberturas escolhidas." },
        { question: "Autônomos e MEIs conseguem aprovação?", answer: "Sim! Trabalhamos com seguradoras que aceitam diferentes perfis de renda." },
        { question: "O seguro vale para imóvel comercial?", answer: "Sim! Pode ser contratado para residenciais e comerciais." },
        { question: "Se eu rescindir o contrato, perco o valor pago?", answer: "O valor pago não é reembolsável, similar a qualquer seguro. A cobertura é válida durante todo o período pago." },
      ]}
      relatedInsurances={[
        { title: "Seguro Residencial", link: "/seguro-residencial" },
        { title: "Seguro Condomínio", link: "/seguro-condominio" },
        { title: "Seguro Empresarial", link: "/seguro-empresarial" },
        { title: "Seguro de Vida", link: "/seguro-vida" },
      ]}
    />
  );
};

export default SeguroFiancaLocaticia;
