import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-seguro-celular.webp";

const SeguroCelular = () => {
  return (
    <InsurancePageTemplate
      title="Seguro Celular — Proteção Completa para Seu Smartphone"
      subtitle="Cobertura contra roubo, furto, quebra acidental, danos por líquidos e defeitos elétricos. Proteção para iPhone, Samsung, Xiaomi e todos os modelos."
      icon="📱"
      badge="Proteção Imediata"
      metaDescription="Seguro Celular contra roubo, furto, quebra acidental e danos por líquidos. Proteção para iPhone, Samsung e todos os smartphones. Cotação grátis Patro Seguros."
      description="Seu celular é muito mais do que um telefone: é sua carteira digital, seu banco, seu escritório e sua conexão com o mundo. Um smartphone de R$ 3.000 a R$ 10.000 merece proteção. O Seguro Celular cobre os riscos mais comuns do dia a dia — roubo, furto qualificado, quebra de tela por queda, danos causados por água e problemas elétricos. Com a apólice, você usa seu aparelho com tranquilidade, sabendo que está protegido financeiramente."
      detailedDescription="Na Patro Seguros, comparamos planos de seguradoras especializadas em eletrônicos para encontrar a melhor proteção para o seu smartphone. Analisamos o modelo do aparelho, seu valor de mercado, perfil de uso e os riscos mais relevantes para recomendar a cobertura ideal. Diferente das 'garantias estendidas' de loja, o seguro celular dedicado oferece coberturas reais contra roubo e quebra, com indenização justa e processo de sinistro ágil. Atendemos proprietários de todas as marcas: Apple (iPhone), Samsung (Galaxy), Xiaomi, Motorola e outros."
      howItWorks={[
        {
          step: "1",
          title: "Informe os dados do aparelho",
          description: "Nos diga a marca, modelo, número de série (IMEI) e nota fiscal de compra. Aparelhos novos e usados podem ser segurados."
        },
        {
          step: "2",
          title: "Escolha o plano ideal",
          description: "Apresentamos opções com diferentes coberturas e valores de franquia. Você escolhe o que faz mais sentido para seu perfil e orçamento."
        },
        {
          step: "3",
          title: "Ativação imediata",
          description: "Após a contratação, a cobertura é ativada rapidamente. Você recebe a apólice digital com todas as orientações."
        },
        {
          step: "4",
          title: "Sinistro simplificado",
          description: "Em caso de sinistro, basta registrar o B.O. (para roubo/furto), acionar a seguradora e acompanhar o processo de indenização."
        },
      ]}
      coverages={[
        {
          title: "Roubo e Furto Qualificado",
          description: "Indenização integral (descontada a franquia) em caso de roubo (com violência ou ameaça) ou furto qualificado (com arrombamento). É a cobertura mais acionada e essencial para quem transita em grandes cidades."
        },
        {
          title: "Quebra Acidental de Tela e Carcaça",
          description: "Cobertura para danos causados por quedas e impactos acidentais, incluindo tela trincada, display danificado e carcaça quebrada. Cobre reparo ou substituição do aparelho."
        },
        {
          title: "Danos por Líquidos",
          description: "Proteção contra danos causados por contato com água, café, refrigerante e outros líquidos. Inclui imersão acidental (queda na piscina, vaso sanitário, etc.)."
        },
        {
          title: "Danos Elétricos",
          description: "Cobertura para problemas internos causados por oscilação de energia, curto-circuito e sobrecarga durante o carregamento. Protege contra panes na placa e bateria."
        },
        {
          title: "Roubo/Furto com Uso de Apps Bancários",
          description: "Em alguns planos, cobertura adicional para prejuízos financeiros causados por acesso indevido a apps bancários após roubo do celular, até um limite determinado."
        },
        {
          title: "Garantia Estendida",
          description: "Extensão da garantia do fabricante por até 12 meses adicionais, cobrindo defeitos de fabricação que surjam após o período original de garantia."
        },
      ]}
      coverageExclusions={[
        "Perda simples do aparelho (esqueceu em algum lugar, sem violência ou arrombamento)",
        "Furto simples (sem arrombamento ou violência — apenas furto qualificado é coberto)",
        "Danos estéticos que não comprometam o funcionamento (riscos superficiais, pequenas marcas)",
        "Aparelhos com IMEI bloqueado, irregulares ou sem nota fiscal",
        "Sinistros não comunicados dentro do prazo da apólice (geralmente 48h)",
        "Vírus, malware ou problemas de software",
        "Desgaste natural do aparelho e bateria",
        "Uso comercial intensivo (locação de celulares, por exemplo) sem cobertura específica",
      ]}
      pricingInfo={{
        intro: "O custo do Seguro Celular varia conforme o valor do aparelho e geralmente representa entre 8% e 15% do preço do smartphone por ano — um investimento pequeno para proteger um bem de alto valor.",
        factors: [
          "Valor de mercado do aparelho: iPhones Pro e Samsung Galaxy Ultra custam mais para segurar",
          "Modelo e marca: aparelhos com peças mais caras (Apple, Samsung topo) têm seguro mais alto",
          "Coberturas escolhidas: plano básico (só roubo) é mais barato que cobertura completa",
          "Franquia: planos com franquia menor custam mais na mensalidade, mas você paga menos no sinistro",
          "Idade do aparelho: celulares novos (até 6 meses) costumam ter melhores condições",
          "Região: cidades com alto índice de roubo podem ter valores maiores",
        ],
        note: "Exemplo prático: um iPhone 15 Pro (valor ~R$ 8.000) pode ser segurado a partir de R$ 50/mês com cobertura contra roubo e quebra. Compare isso com o custo de trocar a tela (R$ 1.500+) ou comprar outro aparelho."
      }}
      realScenarios={[
        {
          title: "Roubo de iPhone no transporte público",
          description: "Cliente teve o iPhone 14 Pro roubado dentro do metrô em São Paulo. Após registrar o B.O. e acionar o seguro, recebeu a indenização de R$ 6.200 em 15 dias úteis para adquirir um novo aparelho."
        },
        {
          title: "Queda do celular na calçada",
          description: "Celular Samsung Galaxy S23 caiu do bolso durante caminhada e a tela trincou completamente. O seguro cobriu o reparo da tela (R$ 1.800), descontando apenas a franquia de R$ 250."
        },
        {
          title: "Celular caiu na piscina",
          description: "Durante um churrasco, o celular caiu na piscina e parou de funcionar. A cobertura contra danos por líquidos garantiu a substituição do aparelho, com indenização de R$ 4.500."
        },
        {
          title: "Curto-circuito durante carregamento",
          description: "Celular Xiaomi apresentou defeito na placa após oscilação de energia durante carregamento noturno. A cobertura de danos elétricos garantiu reparo completo coberto pelo seguro."
        },
      ]}
      importantDetails={[
        {
          title: "IMEI e nota fiscal são obrigatórios",
          content: "Para contratar o seguro, é necessário informar o número IMEI (digite *#06# no celular) e apresentar a nota fiscal de compra. Esses documentos comprovam a propriedade e regularidade do aparelho. Sem eles, não é possível emitir a apólice."
        },
        {
          title: "Diferença entre furto simples e furto qualificado",
          content: "O seguro cobre furto qualificado (com arrombamento, escalada ou chave falsa — ex: tiraram do bolso com violência) e roubo (com ameaça ou agressão). Furto simples (ex: esqueceu na mesa do restaurante e alguém pegou) geralmente NÃO é coberto. Essa distinção é importante para entender sua proteção."
        },
        {
          title: "Franquia: como funciona no seguro celular",
          content: "A franquia é o valor que você paga do próprio bolso em caso de sinistro. Exemplo: se a franquia é R$ 300 e o reparo da tela custa R$ 1.500, o seguro paga R$ 1.200 e você paga R$ 300. Planos com franquia menor têm mensalidade mais alta, mas você desembolsa menos na hora do problema."
        },
        {
          title: "B.O. é obrigatório para roubo e furto",
          content: "Em caso de roubo ou furto, é obrigatório registrar o Boletim de Ocorrência (pode ser online) em até 24-48h. Sem o B.O., a seguradora pode negar a indenização. Também é importante bloquear o IMEI na operadora e o aparelho remotamente."
        },
      ]}
      tips={[
        "Anote o IMEI do seu celular (*#06#) e guarde em local seguro — você vai precisar para o seguro e para bloqueio em caso de roubo",
        "Contrate o seguro logo após a compra do aparelho — quanto mais novo, melhores as condições e menos burocracia",
        "Em caso de roubo, faça o B.O. imediatamente (pode ser online) e bloqueie o IMEI na operadora",
        "Ative o rastreamento remoto do celular (Find My iPhone / Encontre Meu Dispositivo) como camada extra de proteção",
        "Use capa protetora e película — além de proteger no dia a dia, algumas seguradoras avaliam o cuidado com o aparelho",
        "Guarde a nota fiscal digital do celular no e-mail ou nuvem — é documento obrigatório para acionar o seguro",
        "Evite usar o celular de forma ostensiva em locais de risco — prevenção é sempre o melhor seguro",
      ]}
      whoNeeds={[
        "Quem possui smartphone de alto valor (acima de R$ 2.000)",
        "Quem depende do celular para trabalhar (vendedores, motoristas, freelancers)",
        "Pessoas que transitam em grandes cidades e áreas de risco",
        "Quem usa o celular como ferramenta bancária e financeira",
        "Pais que dão smartphones aos filhos (maior risco de quebra)",
        "Profissionais de campo que expõem o aparelho a condições adversas",
        "Quem já quebrou ou teve celular roubado anteriormente",
      ]}
      whyPatro={[
        "Comparamos planos de seguradoras especializadas em eletrônicos",
        "Orientação clara sobre o que é e o que não é coberto — sem surpresas",
        "Processo de sinistro acompanhado do início ao fim por um corretor de verdade",
        "Cobertura sob medida para seu modelo e perfil de uso",
        "Atendimento rápido e sem burocracia — nada de filas de call center",
        "Análise de custo-benefício real: mostramos quando vale ou não a pena segurar",
      ]}
      faqs={[
        {
          question: "O seguro cobre tela quebrada?",
          answer: "Sim! A quebra acidental de tela é uma das coberturas mais utilizadas. O seguro cobre o reparo ou, caso não seja viável, a substituição do aparelho. Aplica-se a franquia contratada."
        },
        {
          question: "Quanto custa o seguro de celular?",
          answer: "O valor varia de 8% a 15% do preço do aparelho por ano. Um iPhone 15 Pro (~R$ 8.000) pode ser segurado a partir de R$ 50/mês. Um Samsung Galaxy A54 (~R$ 2.000) a partir de R$ 20/mês. Solicite uma cotação personalizada."
        },
        {
          question: "Posso segurar celular usado?",
          answer: "Sim, é possível contratar seguro para celulares usados, desde que estejam em bom funcionamento, com IMEI regular e nota fiscal. Algumas seguradoras exigem que o aparelho tenha até 12 meses de uso."
        },
        {
          question: "Se meu celular for roubado, recebo o valor total?",
          answer: "Você recebe o valor de mercado do aparelho no momento do sinistro, descontada a franquia. Não é o valor de compra, mas sim a tabela de referência atualizada. Por isso, é importante contratar o seguro enquanto o aparelho é novo."
        },
        {
          question: "Qual a diferença entre seguro celular e garantia estendida da loja?",
          answer: "A garantia estendida cobre apenas defeitos de fabricação. O seguro celular cobre roubo, furto, quebra acidental e danos por líquidos — riscos muito mais comuns e que a garantia da loja não protege."
        },
        {
          question: "Preciso de B.O. para acionar o seguro?",
          answer: "Para roubo e furto, sim — o Boletim de Ocorrência é obrigatório e deve ser feito em até 48h (pode ser online). Para quebra e danos por líquidos, normalmente não é necessário B.O."
        },
        {
          question: "O seguro cobre se meu celular cair na água?",
          answer: "Sim, a cobertura contra danos por líquidos protege contra imersão acidental (piscina, vaso sanitário) e contato com líquidos (café, chuva). É uma das coberturas mais importantes para o dia a dia."
        },
      ]}
      relatedInsurances={[
        { title: "Seguro Residencial", link: "/seguro-residencial" },
        { title: "Seguro Viagem", link: "/seguro-viagem" },
        { title: "Seguro de Vida", link: "/seguro-vida" },
        { title: "Seguro Bike", link: "/seguro-bike" },
      ]}
    />
  );
};

export default SeguroCelular;
