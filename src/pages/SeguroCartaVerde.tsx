import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-seguro-auto.webp";

const SeguroCartaVerde = () => {
  return (
    <InsurancePageTemplate
      heroImage={heroImg}
      title="Seguro Carta Verde"
      subtitle="Proteção obrigatória para viagens de carro aos países do Mercosul"
      icon="🌎"
      metaDescription="Seguro Carta Verde obrigatório para viagens de carro ao Mercosul — Argentina, Uruguai, Paraguai e Chile. Contratação rápida e online. Cotação grátis Patro Seguros."
      description="O Seguro Carta Verde é obrigatório para todos os veículos brasileiros que cruzam as fronteiras terrestres com países do Mercosul e associados."
      detailedDescription={`Planejar uma viagem de carro para a Argentina, Uruguai, Paraguai ou Chile é empolgante, mas sem o Seguro Carta Verde, seu veículo pode ser impedido de entrar no país — e você pode responder pessoalmente por qualquer acidente que causar no exterior.

O Seguro Carta Verde (oficialmente chamado de "Seguro de Responsabilidade Civil do Proprietário e/ou Condutor de Veículos Terrestres") é exigido por tratados internacionais do Mercosul. Ele garante que, em caso de acidente no exterior, as vítimas (terceiros) receberão indenização por danos materiais e corporais.

É importante entender: o Carta Verde NÃO protege seu veículo — ele cobre apenas os danos que você causar a terceiros. Para proteger seu próprio carro durante a viagem internacional, seria necessário verificar com sua seguradora se a apólice auto tem extensão para o Mercosul.

A contratação na Patro Seguros é rápida — muitas vezes em menos de 1 hora — e o certificado é enviado digitalmente para seu e-mail, pronto para apresentar na fronteira.`}
      howItWorks={[
        { step: "1", title: "Informe a Viagem", description: "Diga os países de destino, datas de ida e volta, e dados do veículo e condutor" },
        { step: "2", title: "Escolha o Período", description: "Contrate por 8, 15, 30, 60 ou 90 dias — adequado à duração da sua viagem" },
        { step: "3", title: "Emissão Rápida", description: "Receba o certificado Carta Verde por e-mail em minutos, pronto para imprimir ou mostrar digital" },
        { step: "4", title: "Viaje Tranquilo", description: "Apresente na fronteira e circule legalmente. Em caso de acidente, acione a assistência 24h" },
      ]}
      coverages={[
        { title: "Responsabilidade Civil por Danos Materiais", description: "Cobertura para danos materiais causados a terceiros em acidentes no exterior" },
        { title: "Responsabilidade Civil por Danos Corporais", description: "Indenização por lesões corporais ou morte de terceiros decorrentes de acidente" },
        { title: "Despesas Médicas e Hospitalares", description: "Cobertura de despesas médicas para terceiros envolvidos no acidente" },
        { title: "Assistência 24h no Mercosul", description: "Guincho, socorro mecânico e assistência em estradas nos países cobertos" },
        { title: "Danos ao Veículo de Terceiros", description: "Reparo ou indenização do veículo de terceiros atingidos no acidente" },
        { title: "Despesas com Advogado", description: "Cobertura para honorários advocatícios e custas judiciais no país do sinistro" },
      ]}
      coverageExclusions={[
        "Danos ao seu próprio veículo (o Carta Verde cobre apenas terceiros)",
        "Despesas médicas do condutor segurado e seus passageiros",
        "Danos causados intencionalmente",
        "Condutor sem habilitação válida",
        "Veículo utilizado em competições ou provas de velocidade",
        "Eventos de guerra, revolução ou confisco",
      ]}
      pricingInfo={{
        intro: "O custo do Carta Verde é acessível e varia conforme o período de cobertura e o tipo de veículo.",
        factors: [
          "Período de cobertura (8, 15, 30, 60 ou 90 dias)",
          "Tipo de veículo (passeio, utilitário, caminhão, moto)",
          "Países de destino",
          "Número de condutores adicionais",
        ],
        note: "Para veículos de passeio, o Carta Verde custa em média R$ 100 a R$ 200 para 15 dias, e R$ 200 a R$ 400 para 30 dias. Valores muito acessíveis considerando a obrigatoriedade e a proteção oferecida.",
      }}
      realScenarios={[
        { title: "Acidente na Argentina", description: "Um turista brasileiro bateu em um carro na Ruta 2, na Argentina. Sem Carta Verde, teria que pagar do próprio bolso R$ 35.000 em reparos ao veículo argentino. Com o seguro, a cobertura foi integral." },
        { title: "Barrado na fronteira", description: "Uma família foi impedida de entrar no Uruguai por não ter Carta Verde. Perdeu a reserva do hotel e teve que voltar 200 km para contratar o seguro. Contrate antes de sair!" },
        { title: "Assistência em estrada no Paraguai", description: "Um carro brasileiro teve pane mecânica em Assunção. A assistência 24h do Carta Verde providenciou guincho e oficina, resolvendo o problema sem custo adicional." },
      ]}
      importantDetails={[
        { title: "Obrigatoriedade legal", content: "O Carta Verde é exigido por lei em todos os países do Mercosul e associados. Circular sem ele pode resultar em multa, apreensão do veículo e responsabilidade pessoal integral por acidentes." },
        { title: "Países cobertos", content: "Argentina, Uruguai, Paraguai, Venezuela (quando aplicável), e países associados como Chile, Bolívia, Peru, Colômbia e Equador. Verifique os países incluídos na sua apólice." },
        { title: "Não substitui seguro viagem", content: "O Carta Verde cobre danos a terceiros no trânsito. Para cobertura médica pessoal, bagagem e outras proteções de viagem, contrate também um Seguro Viagem." },
      ]}
      tips={[
        "Contrate o Carta Verde antes de sair de casa — na fronteira, a contratação pode ser mais cara e burocrática",
        "Imprima o certificado e leve no porta-luvas — alguns países exigem o documento físico",
        "Se sua viagem ultrapassar o período contratado, renove antes do vencimento para não circular ilegal",
        "Combine com Seguro Viagem para proteção completa (médica, bagagem, cancelamento)",
        "Verifique se seu seguro auto brasileiro tem extensão para o Mercosul — o Carta Verde é obrigatório de qualquer forma",
      ]}
      whoNeeds={[
        "Motoristas que viajam para a Argentina",
        "Viajantes com destino ao Uruguai e Paraguai",
        "Caminhoneiros e transportadoras internacionais",
        "Turistas que cruzam fronteiras terrestres do Mercosul",
        "Empresas com frotas que operam em países vizinhos",
      ]}
      whyPatro={[
        "Emissão rápida — receba sua Carta Verde em minutos",
        "Contratação flexível por período de viagem",
        "Atendimento em português durante toda a viagem",
        "Parceria com seguradoras especializadas em Mercosul",
        "Suporte completo em caso de sinistro no exterior",
      ]}
      faqs={[
        { question: "O Seguro Carta Verde é obrigatório?", answer: "Sim, é obrigatório por lei para todos os veículos que cruzam as fronteiras terrestres com países do Mercosul e associados." },
        { question: "Qual o período mínimo de contratação?", answer: "O período mínimo é geralmente de 8 dias. É possível contratar por 15, 30, 60 ou 90 dias." },
        { question: "O seguro auto comum cobre viagens ao exterior?", answer: "Não. O seguro auto brasileiro não tem validade fora do Brasil. O Carta Verde é obrigatório para circular legalmente nos países do Mercosul." },
        { question: "O que acontece se eu for pego sem Carta Verde na fronteira?", answer: "O veículo pode ser impedido de entrar no país, multado e até apreendido. Em caso de acidente, o motorista responderá pessoalmente por todos os danos." },
        { question: "Quanto custa o Carta Verde?", answer: "Para veículos de passeio, de R$ 100 a R$ 400 dependendo do período. Um custo muito baixo comparado ao risco de viajar sem proteção." },
      ]}
      relatedInsurances={[
        { title: "Seguro Auto", link: "/seguro-auto" },
        { title: "Seguro Viagem", link: "/seguro-viagem" },
        { title: "Seguro Caminhão", link: "/seguro-caminhao" },
        { title: "Seguro de Frota", link: "/seguro-frota" },
      ]}
    />
  );
};

export default SeguroCartaVerde;
