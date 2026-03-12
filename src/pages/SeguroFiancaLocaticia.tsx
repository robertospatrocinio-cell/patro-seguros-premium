import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const SeguroFiancaLocaticia = () => {
  return (
    <InsurancePageTemplate
      title="Seguro Fiança Locatícia"
      subtitle="A substituição inteligente do fiador para aluguel de imóveis residenciais e comerciais"
      icon="🏠"
      metaDescription="Seguro Fiança Locatícia — substitui fiador e caução no aluguel. Aprovação rápida para residencial e comercial. Proteção para proprietário e inquilino. Cotação grátis."
      description="O Seguro Fiança Locatícia é a solução moderna e segura que substitui a figura do fiador e a caução em contratos de locação. Garantido por grandes seguradoras, ele protege o proprietário contra inadimplência e danos ao imóvel, enquanto o inquilino aluga sem depender de terceiros. Ideal para imóveis residenciais e comerciais, o seguro fiança locatícia é aceito pela maioria das imobiliárias e garante tranquilidade para todas as partes envolvidas. A Patro Seguros oferece as melhores condições com aprovação rápida e atendimento consultivo."
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
        { question: "Qual a diferença entre seguro fiança e caução?", answer: "A caução exige o depósito de até 3 aluguéis antecipados, imobilizando capital. O seguro fiança é pago mensalmente ou anualmente e oferece coberturas muito mais amplas, incluindo encargos, danos e despesas judiciais." },
        { question: "Quanto custa o seguro fiança locatícia?", answer: "Em média, o custo equivale a 1 a 1,5 aluguel por ano, podendo ser parcelado. O valor depende do perfil do locatário, valor do aluguel e coberturas escolhidas." },
        { question: "Autônomos e MEIs conseguem aprovação?", answer: "Sim! Trabalhamos com seguradoras que aceitam diferentes perfis de renda, incluindo autônomos, MEIs e profissionais liberais. Analisamos cada caso individualmente." },
        { question: "O seguro vale para imóvel comercial?", answer: "Sim! O seguro fiança locatícia pode ser contratado tanto para imóveis residenciais quanto comerciais, com coberturas adaptadas a cada tipo." },
        { question: "Se eu rescindir o contrato, perco o valor pago?", answer: "O valor pago pelo seguro não é reembolsável, similar a qualquer apólice de seguro. Porém, a cobertura é válida durante todo o período pago." },
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
