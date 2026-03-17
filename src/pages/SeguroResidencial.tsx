import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-seguro-residencial.webp";

const SeguroResidencial = () => {
  return (
    <InsurancePageTemplate
      heroImage={heroImg}
      title="Seguro Residencial"
      subtitle="Proteção completa para seu lar, seus bens e sua tranquilidade"
      icon="🏠"
      metaDescription="Seguro Residencial a partir de R$ 150/ano. Cobertura contra incêndio, roubo, danos elétricos e assistência 24h com encanador, eletricista e chaveiro. Cotação grátis."
      description="O Seguro Residencial é o seguro com melhor custo-benefício do mercado brasileiro. Com valores a partir de R$ 150/ano para apartamentos, ele protege o patrimônio que você construiu ao longo de anos — e ainda oferece assistências práticas que se pagam na primeira utilização."
      detailedDescription={`Diferente do que muitos pensam, o seguro residencial vai muito além da proteção contra incêndio. Ele cobre roubo de bens, danos elétricos em eletrodomésticos, vendavais, alagamentos, responsabilidade civil e oferece assistência 24h com encanador, eletricista, chaveiro e vidraceiro — serviços que, se contratados avulsamente, custariam muito mais do que a apólice inteira.

Um dado importante: segundo a Superintendência de Seguros Privados (SUSEP), apenas 15% dos domicílios brasileiros possuem seguro residencial. Isso significa que a maioria das famílias está desprotegida contra riscos que podem causar prejuízos de dezenas ou centenas de milhares de reais.

O seguro residencial protege tanto a estrutura do imóvel quanto os bens móveis dentro dele — eletrodomésticos, eletrônicos, móveis, roupas, joias e objetos de valor. Para inquilinos, existe a modalidade específica que protege apenas os bens, sem cobrir a estrutura (que é responsabilidade do proprietário).`}
      howItWorks={[
        { step: "1", title: "Avaliação do Imóvel e Bens", description: "Analisamos o tipo de imóvel (casa ou apartamento), localização, metragem, padrão de construção e o valor estimado dos bens internos. Para apartamentos em andares altos, os riscos são diferentes de casas térreas — e o preço reflete isso." },
        { step: "2", title: "Escolha das Coberturas", description: "Definimos juntos quais coberturas fazem sentido para seu perfil: incêndio (obrigatória), roubo, danos elétricos, vendaval, alagamento, RC familiar e mais. Orientamos sobre valores adequados para cada cobertura." },
        { step: "3", title: "Cotação e Contratação", description: "Cotamos com diversas seguradoras e apresentamos as melhores opções. A contratação é rápida, sem vistoria na maioria dos casos, e a apólice começa a valer em 24 horas." },
        { step: "4", title: "Uso da Assistência e Sinistros", description: "Durante toda a vigência, você pode acionar a assistência 24h sempre que precisar. Em caso de sinistro, fazemos todo o acompanhamento do processo de indenização." },
      ]}
      coverages={[
        { title: "Incêndio, Raio e Explosão", description: "Cobertura básica obrigatória. Protege a estrutura e conteúdo contra fogo, queda de raio (mesmo sem incêndio) e explosão de qualquer natureza. Inclui danos por fumaça e calor decorrentes do incêndio." },
        { title: "Roubo e Furto Qualificado", description: "Cobre a subtração de bens de dentro do imóvel mediante arrombamento, escalada ou uso de chave falsa. Joias, obras de arte e objetos de alto valor podem exigir declaração específica com comprovante." },
        { title: "Danos Elétricos", description: "Uma das coberturas mais acionadas. Protege eletrodomésticos e eletrônicos contra curto-circuito, sobrecarga e variação de tensão. Se uma queda de energia queimar sua TV, geladeira ou computador, o seguro indeniza o reparo ou a substituição." },
        { title: "Vendaval, Granizo e Ciclone", description: "Cobre danos à estrutura e bens causados por ventos fortes, chuva de granizo, ciclones e tornados. Inclui destelhamento, quebra de vidros por granizo e infiltrações decorrentes." },
        { title: "Alagamento e Inundação", description: "Proteção contra danos causados pela entrada de água no imóvel por enchentes, transbordamento de rios ou falha na drenagem urbana. Essencial para imóveis em regiões de risco." },
        { title: "Responsabilidade Civil Familiar", description: "Cobre danos que você ou sua família causem involuntariamente a terceiros: vazamento que danifica o apartamento do vizinho de baixo, queda de objetos da janela, danos causados por empregados domésticos." },
        { title: "Quebra de Vidros, Espelhos e Mármores", description: "Cobertura para quebra acidental de vidros de janelas, portas, box de banheiro, espelhos e tampos de mármore/granito. Não exige causa específica — cobre quebra acidental." },
        { title: "Desmoronamento e Impacto de Veículos", description: "Cobre danos causados por desmoronamento parcial ou total do imóvel e por impacto de veículos terrestres contra a estrutura (carro desgovernado, por exemplo)." },
      ]}
      coverageExclusions={[
        "Danos estéticos, desgaste natural e falta de manutenção do imóvel",
        "Bens não declarados na apólice (joias e objetos de alto valor precisam ser especificados)",
        "Danos causados intencionalmente pelo segurado ou beneficiários",
        "Imóvel desocupado por mais de 30 dias consecutivos sem aviso à seguradora",
        "Danos por infiltração crônica (diferente de alagamento súbito)",
        "Animais de estimação — danos causados por pets não são cobertos",
        "Reformas e obras — danos durante reforma exigem seguro específico",
      ]}
      pricingInfo={{
        intro: "O seguro residencial é surpreendentemente acessível. Para apartamentos, os valores começam a partir de R$ 150 a R$ 400 por ano. Para casas, variam de R$ 250 a R$ 800 por ano. Considerando que uma única visita de encanador ou eletricista custa entre R$ 150 e R$ 400, o seguro se paga na primeira utilização da assistência 24h.",
        factors: [
          "Tipo de imóvel — apartamentos são mais baratos que casas (menor exposição a riscos)",
          "Localização — CEP influencia o risco de roubo, alagamento e outros sinistros",
          "Valor dos bens declarados — quanto maior o conteúdo, maior o prêmio",
          "Coberturas escolhidas — pacotes básicos são muito acessíveis",
          "Material de construção — alvenaria é mais barato que madeira",
          "Andar do apartamento — andares altos têm menor risco de roubo e alagamento",
        ],
        note: "Dica: o seguro residencial é o produto com menor índice de recusa pelas seguradoras. A maioria dos imóveis é aceita sem vistoria e com contratação imediata.",
      }}
      realScenarios={[
        { title: "Queda de energia queimou 3 eletrodomésticos", description: "Uma oscilação de energia queimou a placa do ar-condicionado (R$ 1.200), a fonte do computador (R$ 350) e o módulo da geladeira (R$ 800). O seguro residencial cobriu os R$ 2.350 em reparos. A apólice anual havia custado R$ 280 — se pagou mais de 8 vezes." },
        { title: "Vazamento do andar de cima danificou teto e móveis", description: "Um vazamento no apartamento acima causou infiltração que danificou o forro de gesso, um guarda-roupa e o piso laminado do quarto. O seguro da vizinha (via RC) cobriu R$ 4.800 em reparos no apartamento do segurado. Sem seguro, seriam meses de conflito entre vizinhos." },
        { title: "Roubo durante viagem de férias", description: "Ao retornar de viagem, o segurado encontrou o apartamento arrombado com TV, notebook, câmera e joias subtraídos. O seguro indenizou R$ 12.500 pelos bens declarados. A troca da fechadura foi feita pela assistência 24h no mesmo dia." },
        { title: "Cano estourado às 23h de domingo", description: "Cano rompeu na cozinha causando alagamento interno. A assistência 24h enviou encanador em 40 minutos, resolveu a emergência e o seguro cobriu os danos ao piso e móveis da cozinha." },
      ]}
      importantDetails={[
        { title: "Assistência 24h — O Benefício Mais Usado", content: "A assistência 24h é o recurso mais acionado do seguro residencial e inclui: chaveiro (porta trancada, troca de fechadura), encanador (vazamentos, entupimentos, troca de torneiras), eletricista (curto-circuito, troca de tomadas, reparo em chuveiro), vidraceiro (troca de vidros) e desentupimento profissional.\n\nNa maioria das apólices, não há limite de acionamentos por ano. Cada chamado tem limite de valor de mão de obra e materiais básicos, mas resolve a grande maioria dos problemas domésticos do dia a dia." },
        { title: "Seguro para Proprietário vs Inquilino", content: "Se você é proprietário, o seguro deve cobrir a estrutura do imóvel E os bens internos. Se é inquilino, contrate seguro apenas para os seus bens (conteúdo) — a estrutura é responsabilidade do proprietário.\n\nImportante: muitos contratos de locação exigem que o inquilino tenha seguro residencial. Além de ser uma exigência, é uma proteção inteligente — seus móveis, eletrônicos e pertences são SEU patrimônio." },
        { title: "Como Declarar o Valor dos Bens", content: "Some mentalmente o valor de reposição (comprar novos) de todos os seus bens: móveis, eletrodomésticos, eletrônicos, roupas, utensílios. A maioria das pessoas se surpreende: o conteúdo de um apartamento de classe média facilmente ultrapassa R$ 50.000 a R$ 100.000.\n\nNão subdeclare para pagar menos — em caso de sinistro, a indenização será proporcional ao valor declarado. Se declarou R$ 30 mil mas perdeu R$ 60 mil, recebe apenas 50% do prejuízo." },
      ]}
      tips={[
        "Contrate junto com o seguro auto — muitas seguradoras oferecem desconto de 5% a 15% no pacote combinado.",
        "Inclua sempre a cobertura de danos elétricos — é a mais acionada e protege eletrodomésticos caros.",
        "Declare o valor real dos seus bens para evitar indenização parcial em caso de sinistro.",
        "Use a assistência 24h sem medo — cada chamado de encanador ou eletricista economiza R$ 150 a R$ 400.",
        "Para apartamentos, priorize RC familiar — vazamentos entre vizinhos são extremamente comuns.",
      ]}
      whoNeeds={[
        "Proprietários de casas e apartamentos — protege o maior patrimônio da família",
        "Inquilinos que querem proteger seus bens pessoais dentro do imóvel",
        "Moradores de regiões sujeitas a enchentes, vendavais ou alta criminalidade",
        "Proprietários com imóveis alugados — protege a estrutura e garante a renda do aluguel",
        "Famílias com eletrodomésticos e eletrônicos de valor — a cobertura de danos elétricos é essencial",
        "Quem mora em apartamento — a RC familiar protege contra problemas com vizinhos",
        "Pessoas que viajam com frequência e deixam o imóvel desocupado",
      ]}
      whyPatro={[
        "Cotação com múltiplas seguradoras para encontrar o melhor preço — diferenças de 30% a 40% são comuns",
        "Análise precisa do valor dos bens para evitar sub ou sobre seguro",
        "Orientação sobre coberturas essenciais vs opcionais para seu perfil específico",
        "Assistência no acionamento da assistência 24h e em sinistros — sem burocracia",
        "Revisão anual das coberturas conforme mudanças no patrimônio",
        "Atendimento via WhatsApp — resposta em até 2 horas úteis",
      ]}
      faqs={[
        { question: "Quanto custa um seguro residencial?", answer: "Para apartamentos: de R$ 150 a R$ 400/ano. Para casas: de R$ 250 a R$ 800/ano. O valor depende do tipo de imóvel, localização, valor dos bens e coberturas escolhidas. É o seguro com melhor custo-benefício do mercado — uma visita de encanador já custa o valor da apólice anual." },
        { question: "Inquilino pode e deve contratar seguro residencial?", answer: "Sim! E é altamente recomendado. O seguro do proprietário (quando existe) cobre apenas a estrutura — NÃO protege seus pertences. Como inquilino, contrate seguro de conteúdo para proteger móveis, eletrônicos, roupas e objetos pessoais. Muitos contratos de locação já exigem esse seguro." },
        { question: "O seguro cobre eletrodomésticos queimados por queda de energia?", answer: "Sim, com a cobertura de danos elétricos. Se uma oscilação de energia, curto-circuito ou queda de raio queimar seu ar-condicionado, geladeira, TV, computador ou qualquer equipamento elétrico, o seguro indeniza o reparo ou a substituição. É a cobertura mais acionada — recomendamos sempre incluir." },
        { question: "A assistência 24h tem limite de uso?", answer: "Na maioria das apólices, não há limite de acionamentos por ano. Cada chamado tem um limite de tempo de mão de obra (geralmente 1 a 2 horas) e cobre materiais básicos. Se o serviço exceder o limite, você paga apenas a diferença. Na prática, resolve a grande maioria dos problemas domésticos sem custo adicional." },
        { question: "O que é RC familiar e por que é importante?", answer: "Responsabilidade Civil Familiar cobre danos que você ou sua família causem involuntariamente a terceiros. O exemplo mais comum: vazamento no seu apartamento que danifica o teto e móveis do vizinho de baixo. Sem RC, você paga do bolso (facilmente R$ 5.000 a R$ 20.000). Com RC, o seguro cobre. Também protege contra queda de objetos da janela e danos causados por empregados domésticos." },
        { question: "Preciso fazer vistoria para contratar?", answer: "Na grande maioria dos casos, não. O seguro residencial é contratado com base nas informações declaradas, sem necessidade de vistoria prévia. Apenas imóveis de altíssimo valor ou com características especiais podem exigir inspeção. A contratação é rápida e a cobertura começa em 24 horas." },
        { question: "O seguro residencial cobre enchente?", answer: "Sim, desde que a cobertura de alagamento/inundação seja contratada — não é automática na apólice básica. Se você mora em região com histórico de enchentes, essa cobertura é essencial. O custo adicional é relativamente baixo comparado ao potencial de prejuízo de um alagamento." },
      ]}
      relatedInsurances={[
        { title: "Seguro Condomínio", link: "/seguro-condominio" },
        { title: "Seguro Fiança Locatícia", link: "/seguro-fianca-locaticia" },
        { title: "Seguro Auto", link: "/seguro-auto" },
        { title: "Seguro de Vida", link: "/seguro-vida" },
      ]}
    />
  );
};

export default SeguroResidencial;
