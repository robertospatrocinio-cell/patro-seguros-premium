import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import DroneCascoVsReta from "@/components/DroneCascoVsReta";
import heroImg from "@/assets/hero-seguro-drone-comparativo.jpg";

const faqs = [
  {
    question: "Qual seguro de drone eu preciso: casco ou RETA?",
    answer: "Depende do que você quer proteger. O seguro casco protege o próprio drone contra quedas, colisões e roubo. O Seguro RETA é responsabilidade civil: cobre danos que o drone cause a terceiros. Operações profissionais costumam precisar dos dois, e a Patro analisa as duas modalidades em conjunto.",
  },
  {
    question: "Seguro de drone é obrigatório no Brasil?",
    answer: "O RBAC-E nº 94 prevê seguro com cobertura de danos a terceiros para operações de aeronaves não tripuladas acima de 250 gramas, com exceções regulatórias. O seguro casco do equipamento é facultativo. O enquadramento exato depende do peso, da classe e do uso do drone.",
  },
  {
    question: "O seguro cobre drones agrícolas de pulverização?",
    answer: "Sim. Drones de pulverização e mapeamento podem ser segurados na modalidade casco, que protege o equipamento, e na modalidade RETA, que cobre danos a terceiros — incluindo lavouras vizinhas, conforme as condições da apólice.",
  },
  {
    question: "Quanto custa o seguro de drone?",
    answer: "O valor depende do enquadramento do equipamento, da operação, dos limites contratados e da seguradora. A Patro não publica preço fixo sem uma condição comercial vigente e confirmada. A cotação é feita após a análise dos dados do risco, sem compromisso.",
  },
  {
    question: "Quais documentos são necessários para cotar?",
    answer: "Normalmente são solicitados dados do proprietário ou operador, marca, modelo, série, peso e uso do drone, além dos comprovantes de cadastro e homologação aplicáveis. A lista final depende da seguradora e da operação informada.",
  },
  {
    question: "A Patro atende operadores de drone de qualquer estado?",
    answer: "Sim. A Patro realiza atendimento consultivo e remoto para operadores de drones em todo o Brasil, sujeito à disponibilidade e à aceitação das seguradoras para cada risco.",
  },
];

const SeguroDrone = () => (
  <InsurancePageTemplate
    localSeo={{ skip: true }}
    heroImage={heroImg}
    title="Seguro para Drone: casco e responsabilidade civil (RETA)"
    headline="Seguro para Drone"
    subtitle="Proteção para o equipamento e para terceiros, com orientação sobre o enquadramento da operação e atendimento em todo o Brasil."
    icon="🚁"
    badge="Casco e Responsabilidade Civil"
    metaDescription="Seguro para Drone: compare casco (proteção do equipamento) e RETA (responsabilidade civil a terceiros). Cotação por WhatsApp com a Patro, em todo o Brasil."
    description="O seguro de drone reúne duas proteções complementares: o casco, que cobre o próprio equipamento contra quedas, colisões e roubo, e o RETA, a responsabilidade civil aeronáutica que ampara danos causados a terceiros. A Patro orienta sobre o enquadramento da sua operação e cota as duas modalidades."
    detailedDescription={`## Duas proteções, finalidades diferentes

Drones são aeronaves não tripuladas usadas em pulverização agrícola, mapeamento, filmagem, inspeção e topografia. Cada operação expõe dois riscos distintos: perder ou danificar um equipamento de alto valor, e causar dano a pessoas ou bens de terceiros.

O seguro casco responde pelo primeiro risco. O Seguro RETA (responsabilidade civil do explorador ou transportador aéreo) responde pelo segundo — e é previsto pelo RBAC-E nº 94 para operações de aeronaves não tripuladas acima de 250 gramas, com as exceções regulatórias aplicáveis.

## Sem promessa de preço ou aceitação automática

Esta página não publica preço, limite de indenização nem garantia de aceitação. Esses elementos dependem da seguradora, do peso e da classe do drone, do uso declarado e das condições vigentes na proposta e na apólice. A cotação é feita após a análise dos dados do risco.`}
    howItWorks={[
      { step: "1", title: "Informe o drone e a operação", description: "Envie marca, modelo, série, peso, proprietário, finalidade de uso e locais habituais de voo." },
      { step: "2", title: "Defina as proteções", description: "Analisamos em conjunto a necessidade de casco (equipamento) e RETA (terceiros) para a sua operação." },
      { step: "3", title: "Analise a proposta", description: "Confira seguradora, vigência, limites, exclusões, obrigações do segurado e forma de pagamento antes de contratar." },
      { step: "4", title: "Receba e mantenha a apólice", description: "Após aceitação e emissão, guarde a apólice e acompanhe a vigência para não operar com a proteção vencida." },
    ]}
    coverages={[
      { title: "Danos físicos ao drone (casco)", description: "Quedas, colisões, pousos forçados e acidentes operacionais, conforme as condições da apólice." },
      { title: "Roubo e furto qualificado (casco)", description: "Proteção do drone, controle remoto e acessórios, observadas as condições contratadas." },
      { title: "Danos pessoais a terceiros (RETA)", description: "Responsabilidade por lesões causadas a pessoas que não participam da operação, dentro dos limites da apólice." },
      { title: "Danos materiais a terceiros (RETA)", description: "Danos causados pelo drone a veículos, imóveis, lavouras vizinhas e outros bens de terceiros." },
      { title: "Equipamentos embarcados (casco)", description: "Câmeras, sensores multiespectrais, tanques de pulverização e baterias, conforme a cobertura contratada." },
      { title: "Transporte do drone (casco)", description: "Cobertura durante o transporte terrestre entre propriedades e bases de operação, quando prevista." },
    ]}
    coverageExclusions={[
      "Desgaste natural e manutenção preventiva (baterias, hélices)",
      "Operação sem o registro ou a homologação exigidos pela regulamentação vigente",
      "Voo em áreas proibidas ou restritas sem autorização",
      "Atos ilícitos, dolo e descumprimento das obrigações da apólice",
      "Coberturas que não constem expressamente da proposta aceita",
    ]}
    importantDetails={[
      { title: "Casco e RETA são apólices diferentes", content: "Proteger o equipamento não cobre terceiros, e vice-versa. Avalie as duas modalidades em conjunto para não ficar exposto em nenhum dos riscos." },
      { title: "Seguro não autoriza o voo", content: "A emissão da apólice não substitui cadastros, homologações e autorizações. Antes de cada operação, verifique as regras atuais da ANAC, do DECEA e da Anatel." },
      { title: "Leia a apólice emitida", content: "As condições gerais e particulares definem riscos cobertos, limites, exclusões e procedimentos de sinistro. Em caso de divergência, prevalece o contrato emitido pela seguradora." },
    ]}
    tips={[
      "Declare exatamente o uso do drone: agrícola, audiovisual, inspeção ou outro",
      "Mantenha cadastros, homologações e autorizações aplicáveis atualizados",
      "Informe todos os drones e operadores que participam da atividade",
      "Avalie casco e RETA em conjunto quando precisar proteger equipamento e terceiros",
      "Confira vigência e identificação dos equipamentos antes de cada operação",
    ]}
    whoNeeds={[
      "Produtores rurais que operam drones de pulverização ou mapeamento",
      "Empresas de aviação agrícola com frota de drones",
      "Fotógrafos e produtoras que realizam filmagens aéreas profissionais",
      "Empresas de engenharia, inspeção, topografia e mapeamento",
      "Prestadores de serviços com drones para o agronegócio",
      "Profissionais autônomos remunerados por imagens ou dados aéreos",
      "Operadores que precisam comprovar regularidade em contratos com clientes",
    ]}
    whyPatro={[
      "Atendimento consultivo em todo o Brasil",
      "Análise conjunta do casco e do Seguro RETA",
      "Orientação clara sobre dados e documentos para cotação",
      "Comparação das condições disponíveis para o risco informado",
      "Acompanhamento humano antes e depois da contratação",
      "Corretora registrada na SUSEP sob o código 212113511",
    ]}
    faqs={faqs}
    relatedInsurances={[
      { title: "Seguro Drone Agrícola (Casco)", link: "/seguro-drone-agricola" },
      { title: "Seguro RETA Drone", link: "/seguro-reta-drone" },
      { title: "Seguro Equipamentos Agrícolas", link: "/seguro-equipamentos-agricolas" },
      { title: "Seguro Aeronáutico", link: "/seguro-avioes" },
    ]}
    jumpLinks={[
      { label: "Como funciona", href: "#como-funciona-heading" },
      { label: "Coberturas", href: "#coberturas-heading" },
      { label: "Comparativo", href: "#comparativo-drone-heading" },
      { label: "Perguntas", href: "#faq-heading" },
    ]}
    quoteUrl="/cotacao?tipo=outros"
    quoteCtaText="Solicitar cotação de drone"
    extraSections={<DroneCascoVsReta />}
  />
);

export default SeguroDrone;
