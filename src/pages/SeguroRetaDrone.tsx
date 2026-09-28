import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import RetaDroneDetails from "@/components/RetaDroneDetails";
import heroImg from "@/assets/hero-seguro-drone.webp";

const faqs = [
  {
    question: "O que é o Seguro RETA para drone?",
    answer: "É um seguro de responsabilidade civil voltado aos danos que uma aeronave não tripulada possa causar a terceiros. Ele não protege automaticamente o próprio drone. Limites e condições constam na proposta e na apólice emitida.",
  },
  {
    question: "Quando o Seguro RETA é obrigatório?",
    answer: "O RBAC-E nº 94 prevê seguro com cobertura de danos a terceiros para operações de aeronaves não tripuladas acima de 250 gramas, exceto operações de aeronaves pertencentes a entidades controladas pelo Estado. O uso, o peso, a classe e as características da operação devem ser verificados conforme a regulamentação vigente.",
  },
  {
    question: "O RETA cobre queda, roubo ou dano no meu drone?",
    answer: "Não como finalidade principal. O RETA protege terceiros. Para dano acidental, queda, roubo ou furto qualificado do equipamento, é necessário avaliar um seguro casco separado, sujeito à aceitação e às condições da seguradora.",
  },
  {
    question: "Drone agrícola precisa de Seguro RETA?",
    answer: "Operações agrícolas não recreativas devem ter o enquadramento regulatório e securitário analisado. Drones de pulverização podem exigir avaliação específica conforme peso, classe, atividade e região de operação. A proteção do equipamento deve ser cotada separadamente no Seguro Drone Agrícola.",
  },
  {
    question: "Quais documentos são necessários para cotar?",
    answer: "Normalmente são solicitados dados do proprietário ou operador, marca, modelo, série, peso e uso do drone, além dos comprovantes de cadastro e homologação aplicáveis. A lista final depende da seguradora e da operação informada.",
  },
  {
    question: "Preciso de uma apólice para cada drone?",
    answer: "A identificação dos equipamentos segurados e a forma de contratação dependem do produto oferecido pela seguradora. Informe todos os drones da operação para que a proposta indique corretamente quais equipamentos e riscos estão contemplados.",
  },
  {
    question: "Quanto custa o Seguro RETA Drone?",
    answer: "O valor depende do enquadramento do drone, da operação, dos limites contratados e da seguradora. A Patro não publica um preço fixo sem uma condição comercial vigente e confirmada. A cotação é feita após a análise dos dados do risco.",
  },
  {
    question: "O seguro substitui as autorizações de voo?",
    answer: "Não. O seguro não substitui cadastro, homologação, autorização de acesso ao espaço aéreo nem outras obrigações aplicáveis. O operador deve cumprir as regras vigentes da ANAC, do DECEA e da Anatel.",
  },
  {
    question: "A Patro atende operadores de qualquer estado?",
    answer: "Sim. A Patro realiza atendimento consultivo e remoto para operadores de drones em todo o Brasil, sujeito à disponibilidade e à aceitação das seguradoras para cada risco.",
  },
];

const SeguroRetaDrone = () => (
  <InsurancePageTemplate
    localSeo={{ skip: true }}
    heroImage={heroImg}
    title="Seguro RETA Drone: responsabilidade civil para operações profissionais"
    headline="Seguro RETA Drone"
    subtitle="Proteção de responsabilidade civil para danos a terceiros, com orientação sobre o enquadramento da operação e atendimento em todo o Brasil."
    icon="🚁"
    badge="Responsabilidade Civil Aeronáutica"
    metaDescription="Seguro RETA Drone para operações profissionais: entenda obrigatoriedade, coberturas para terceiros, diferença para casco, documentos e cotação com a Patro."
    description="O Seguro RETA Drone é uma proteção de responsabilidade civil aeronáutica para danos causados a terceiros. Ele atende uma finalidade diferente do seguro casco: enquanto o RETA se volta às pessoas e aos bens que podem ser atingidos durante uma operação, o casco pode proteger o próprio equipamento."
    detailedDescription={`## O que significa RETA

RETA é a sigla usada para a responsabilidade do explorador ou transportador aéreo. Como drones são aeronaves não tripuladas, determinadas operações precisam manter seguro de responsabilidade civil compatível com as regras aplicáveis.

## Obrigatoriedade e operação regular

O Código Brasileiro de Aeronáutica e o RBAC-E nº 94 integram a base regulatória do produto. O RBAC-E nº 94 prevê seguro com cobertura de danos a terceiros para operações de aeronaves não tripuladas acima de 250 gramas, com a exceção regulatória indicada para aeronaves pertencentes a entidades controladas pelo Estado. Cadastro, homologação do equipamento, acesso ao espaço aéreo e demais autorizações continuam sendo responsabilidades do operador.

## Limites e aceitação

Não existe nesta página promessa de preço, limite de indenização ou aceitação automática. Esses elementos dependem da seguradora, do peso e da classe do drone, do uso declarado e das condições vigentes na proposta e na apólice.`}
    howItWorks={[
      { step: "1", title: "Informe o drone e a operação", description: "Envie marca, modelo, série, peso, proprietário, finalidade de uso e locais habituais de voo." },
      { step: "2", title: "Confirme a documentação", description: "Avaliamos os registros e comprovantes aplicáveis, além das informações necessárias para a seguradora." },
      { step: "3", title: "Analise a proposta", description: "Confira seguradora, vigência, limites, exclusões, obrigações do segurado e forma de pagamento antes de contratar." },
      { step: "4", title: "Receba e mantenha a apólice", description: "Após aceitação e emissão, guarde a apólice e acompanhe a vigência para não operar com a proteção vencida." },
    ]}
    coverages={[
      { title: "Danos pessoais a terceiros", description: "Pode amparar a responsabilidade por lesões causadas a pessoas que não participam da operação, conforme limites e condições da apólice." },
      { title: "Danos materiais a terceiros", description: "Pode indenizar danos causados pelo drone a veículos, imóveis e outros bens de terceiros, conforme a cobertura contratada." },
      { title: "Danos na superfície", description: "Abrange eventos envolvendo pessoas e bens no solo, dentro dos riscos e limites previstos no contrato." },
      { title: "Abalroamento", description: "Pode contemplar responsabilidade decorrente de colisão com outra aeronave, observadas as condições e os limites contratados." },
    ]}
    coverageExclusions={[
      "Danos ao próprio drone, quando não houver seguro casco separado",
      "Roubo, furto ou desaparecimento do equipamento no RETA",
      "Operações fora do uso, locais, limites ou condições declarados na proposta",
      "Atos ilícitos, dolo e descumprimento das obrigações previstas na apólice",
      "Coberturas adicionais que não constem expressamente da proposta aceita",
      "Recomposição automática de limite após sinistro, salvo previsão expressa da apólice",
    ]}
    pricingInfo={{
      intro: "O preço é definido após o enquadramento do equipamento e da operação. A Patro confirma a condição vigente antes da contratação e não utiliza preços de outras corretoras como referência comercial.",
      factors: [
        "Peso, classe, marca e modelo do drone",
        "Uso profissional declarado e tipo de operação",
        "Quantidade de equipamentos a incluir",
        "Limites de responsabilidade escolhidos",
        "Histórico do operador e informações do risco",
        "Critérios de aceitação da seguradora",
      ],
      note: "A proposta deve ser conferida antes do pagamento. Vigência, prêmio, parcelamento, limites e coberturas podem variar.",
    }}
    importantDetails={[
      { title: "RETA não é casco", content: "O RETA é voltado à responsabilidade por danos a terceiros. Para proteger o investimento no equipamento contra riscos como queda, dano acidental, roubo ou furto qualificado, solicite também a análise de seguro casco." },
      { title: "Seguro não autoriza o voo", content: "A emissão da apólice não substitui os cadastros, as homologações e as autorizações necessárias. Antes de cada operação, verifique as regras atuais da ANAC, do DECEA e da Anatel." },
      { title: "Leia a apólice emitida", content: "As condições gerais e particulares definem riscos cobertos, limites, exclusões, obrigações e procedimentos de sinistro. Em caso de divergência, prevalece o contrato emitido pela seguradora." },
    ]}
    tips={[
      "Declare exatamente o uso do drone, incluindo atividades remuneradas, agrícolas, audiovisuais ou de inspeção",
      "Mantenha cadastros, homologações e autorizações aplicáveis atualizados",
      "Informe todos os drones e operadores que participam da atividade",
      "Confira vigência e identificação dos equipamentos antes de iniciar uma operação",
      "Avalie RETA e casco em conjunto quando também precisar proteger o equipamento",
    ]}
    whoNeeds={[
      "Fotógrafos e produtoras que realizam filmagens aéreas profissionais",
      "Empresas de engenharia, inspeção, topografia e mapeamento",
      "Operadores de monitoramento, segurança e infraestrutura",
      "Prestadores de serviços com drones para o agronegócio",
      "Produtores rurais que operam drones em atividades não recreativas",
      "Empresas com um ou mais drones utilizados em sua operação",
      "Profissionais autônomos remunerados por imagens ou dados aéreos",
      "Operadores que precisam comprovar regularidade em contratos com clientes",
    ]}
    whyPatro={[
      "Atendimento consultivo em todo o Brasil",
      "Análise conjunta do RETA e do seguro casco",
      "Orientação clara sobre dados e documentos para cotação",
      "Comparação das condições disponíveis para o risco informado",
      "Acompanhamento humano antes e depois da contratação",
      "Corretora registrada na SUSEP sob o código 212113511",
    ]}
    faqs={faqs}
    relatedInsurances={[
      { title: "Seguro Drone Agrícola", link: "/seguro-drone-agricola" },
      { title: "Responsabilidade Civil", link: "/seguro-rc" },
      { title: "Seguro Equipamentos Agrícolas", link: "/seguro-equipamentos-agricolas" },
      { title: "Seguro Aeronáutico", link: "/seguro-avioes" },
    ]}
    jumpLinks={[
      { label: "Como funciona", href: "#como-funciona-heading" },
      { label: "Coberturas", href: "#coberturas-heading" },
      { label: "Exclusões", href: "#exclusoes-heading" },
      { label: "Preço", href: "#preco-heading" },
      { label: "Perguntas", href: "#faq-heading" },
    ]}
    quoteUrl="/cotacao?tipo=outros"
    quoteCtaText="Solicitar cotação RETA"
    extraSections={<RetaDroneDetails />}
  />
);

export default SeguroRetaDrone;