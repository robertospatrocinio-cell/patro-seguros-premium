import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-seguro-vida.webp";
import RhOperationalSupport from "@/components/RhOperationalSupport";

const SeguroVidaPME = () => {
  return (
    <InsurancePageTemplate
      heroImage={heroImg}
      title="Seguro de Vida PME"
      subtitle="Proteção coletiva para pequenas e médias empresas"
      icon="🏢"
      metaDescription="Seguro de Vida PME para pequenas e médias empresas. Conheça coberturas e condições conforme o produto e a seguradora. Cotação com a Patro Seguros."
      description="O Seguro de Vida PME pode ser uma alternativa para pequenas e médias empresas que desejam oferecer proteção aos colaboradores. A elegibilidade, o número mínimo de pessoas, as coberturas, os capitais e as assistências dependem do produto, da seguradora e do contrato."
      coverages={[
        { title: "Morte", description: "Pode prever indenização aos beneficiários conforme a cobertura contratada, os limites e as condições da apólice" },
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
        "Comparamos alternativas de diversas seguradoras conforme o perfil e as condições do produto",
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
          answer: "O tratamento tributário depende do regime da empresa, da natureza da despesa e da legislação vigente. Consulte a contabilidade antes de afirmar dedutibilidade ou economia tributária.",
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
          answer: "Em caso de sinistro, a empresa ou os beneficiários podem comunicar a seguradora com a documentação aplicável. A Patro pode orientar e acompanhar o envio, mas a regulação, a decisão e o prazo dependem da seguradora, da apólice e do caso concreto.",
        },
      ]}
      extraSections={<RhOperationalSupport trackingContext="seguro-vida-pme-rh" />}
    />
  );
};

export default SeguroVidaPME;
