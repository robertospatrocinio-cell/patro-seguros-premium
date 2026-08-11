import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import ServiceSchema from "@/components/ServiceSchema";
import ComparisonTableResidencial from "@/components/ComparisonTableResidencial";
import { trilhaResidencial } from "@/lib/trilhaSeoRecomendacoes";
import heroImg from "@/assets/hero-seguro-residencial.webp";


const SeguroResidencial = () => {
  return (
    <>
      <ServiceSchema
        name="Seguro Residencial"
        description="O seguro residencial em Guarulhos protege sua casa, apartamento ou flat contra incêndio, roubo, danos elétricos e mais, com assistência 24h. A Patro Seguros, corretora com mais de 20 anos de experiência e registro SUSEP 212113511, compara propostas de 16 seguradoras para você encontrar a melhor cobertura com cotação em até 2 horas úteis."
        serviceType="HomeInsurance"
      />
    <InsurancePageTemplate
      heroImage={heroImg}
      title="Seguro Residencial em Guarulhos | Cotação em 2h | Patro Seguros"
      quoteUrl="https://patro.seucorretor.digital/#/formularios/residencial"
      headline="Seguro residencial em Guarulhos para casa e apartamento"
      subtitle="Consultoria dedicada para proteger seu lar, seus bens e a rotina da sua família"
      icon="🏠"
      metaDescription="Seguro residencial em Guarulhos: proteja sua casa ou apartamento contra incêndio, roubo e danos elétricos. Assistência 24h e cotação em 2h na Patro Seguros."
      description="Poucos contratos entregam tanto valor por tão pouco quanto o Seguro Residencial. A partir de R$ 150/ano para apartamentos, ele resguarda o patrimônio que sua família levou anos para construir — e inclui um pacote de assistências que, na prática, se paga já no primeiro chamado de encanador ou eletricista."
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
        { question: "Seguro residencial para casa em Guarulhos é muito caro?", answer: "Pelo contrário, o seguro residencial é o mais barato do mercado. Em Guarulhos, uma casa média tem seguro a partir de R$ 250 por ano, garantindo proteção contra incêndio e roubo." },
        { question: "Inquilino pode contratar seguro residencial para apartamento?", answer: "Sim, e é altamente recomendado. O seguro do proprietário (quando existe) cobre apenas o prédio. O seguro do inquilino protege seus móveis, eletrônicos e oferece assistência 24h." },
        { question: "O que é a cobertura de Responsabilidade Civil Familiar?", answer: "É a cobertura que paga danos que você, sua família ou seus pets causem a vizinhos ou terceiros, como um vazamento que estraga o teto do vizinho de baixo." },
        { question: "A assistência 24h tem limite de uso?", answer: "Na maioria das nossas apólices, o uso de chaveiro, eletricista e encanador é ilimitado para mão de obra emergencial, garantindo tranquilidade total." },
        { question: "Seguro residencial cobre quebra de vidros?", answer: "Sim, oferecemos cobertura para quebra de vidros de janelas, tampos de mesa e até box de banheiro, garantindo a reposição rápida em caso de acidentes." }
      ]}

      contextualLinks={{
        heading: "Conversemos sobre proteger mais do que o imóvel",
        paragraphs: [
          "O seguro residencial é apenas uma parte da proteção completa que sua família merece. Se você já protege seu lar, considere também proteger quem mora nele com um seguro de vida — que garante estabilidade financeira em caso de imprevistos graves.",
          "Se você tem veículo, o seguro auto complementa a proteção do patrimônio familiar. E para quem mora em condomínio, o seguro condominial é obrigatório por lei e protege as áreas comuns do prédio. Já pensou também em um plano de saúde para toda a família — inclusive um plano específico para idosos 60+ em Guarulhos? Para autônomos e profissionais liberais, complemente com um seguro de acidentes pessoais de contratação rápida.",
          "Como corretora independente, cotamos sua apólice com as principais seguradoras parceiras (Porto Seguro, Tokio Marine, Allianz, Mapfre, Bradesco e outras) para você comparar preços e coberturas. Confira também nosso guia de como escolher e comparar seguradoras em Guarulhos.",
        ],
        links: [
          { text: "Seguro de Vida", href: "/seguro-vida" },
          { text: "Seguro Auto", href: "/seguro-auto" },
          { text: "Seguro Condomínio", href: "/seguro-condominio" },
          { text: "Planos de Saúde", href: "/planos-de-saude" },
          { text: "Plano Saúde Sênior em Guarulhos", href: "/planos-saude-senior-guarulhos" },
          { text: "Acidentes Pessoais (Contratar)", href: "/lp/seguro-acidentes-pessoais" },
          { text: "Seguro Fiança Locatícia", href: "/seguro-fianca-locaticia" },
          { text: "Seguradoras Parceiras", href: "/seguradoras-parceiras" },
          { text: "Como comparar seguradoras em Guarulhos", href: "/como-comparar-seguradoras-guarulhos" },
          { text: "Cotação Gratuita", href: "https://patro.seucorretor.digital/#/formularios/residencial" },
        ],
      }}
      relatedInsurances={[
        { title: "Seguros em Guarulhos", link: "/seguros-guarulhos" },
        { title: "Seguro Condomínio", link: "/seguro-condominio" },
        { title: "Seguro Fiança Locatícia", link: "/seguro-fianca-locaticia" },
        { title: "Seguro Auto", link: "/seguro-auto" },
        { title: "Seguro de Vida", link: "/seguro-vida" },
        { title: "Cotação de Seguro Residencial Online (2h)", link: "/cotacao-seguro-residencial-online" },
        { title: "Seguro para Flats e Imóveis Mobiliados", link: "/seguro-flat-guarulhos" },
      ]}

      extraSections={<ComparisonTableResidencial />}
      quoteFormFields={[
        { id: "tipo", label: "Tipo de imóvel", placeholder: "Selecione", type: "select", options: ["Casa", "Apartamento", "Flat", "Casa em Condomínio", "Chácara / Lazer"] },
        { id: "condicao", label: "Condição de uso", placeholder: "Selecione", type: "select", options: ["Moradia Própria", "Alugado (Inquilino)", "Alugado (Proprietário)", "Temporada / Airbnb"] },
        { id: "cep", label: "CEP do imóvel", placeholder: "Ex: 07115-000", type: "text" },
        { id: "valor_bens", label: "Valor estimado dos bens", placeholder: "Selecione", type: "select", options: ["Até R$ 50 mil", "R$ 50 mil a R$ 100 mil", "R$ 100 mil a R$ 250 mil", "Acima de R$ 250 mil"] }
      ]}



      canonicalUrl="https://www.patroseguros.com.br/seguro-residencial"
      howto={{
        name: "Como contratar seguro residencial em Guarulhos",
        description: "Passo a passo para proteger casa ou apartamento com incêndio, roubo, danos elétricos e RC familiar.",
        totalTime: "PT24H",
        supply: ["Endereço completo com CEP", "Metragem construída", "Valor aproximado do conteúdo (móveis + eletrônicos)"],
        tool: ["WhatsApp Patro Seguros", "Formulário online"],
        steps: [
          { name: "Some o valor do conteúdo", text: "Liste móveis, eletrônicos, eletrodomésticos e itens de valor. A soma vira o LMI (Limite Máximo Indenizável) do item conteúdo — subseguro é a principal causa de indenização parcial." },
          { name: "Escolha as coberturas certas para Guarulhos", text: "Além do incêndio (obrigatório), inclua danos elétricos (a mais acionada na cidade, ticket médio R$ 1.850) e RC Familiar (dano ao vizinho, R$ 20 mil mínimo)." },
          { name: "Solicite cotação em 5 seguradoras", text: "Envie CEP + metragem + valor do conteúdo pela Patro (WhatsApp ou site). Comparamos Porto, Bradesco, Allianz, Tokio Marine e Liberty em até 2h úteis." },
          { name: "Reveja franquia e assistência 24h", text: "A assistência (chaveiro, encanador, eletricista) evita gasto do bolso em pequenos incidentes. Franquia costuma ser 10% do prejuízo, com mínimo entre R$ 400 e R$ 800." },
          { name: "Contrate e agende inspeção (se exigida)", text: "Casas acima de R$ 800 mil de conteúdo ou em condomínio fechado podem exigir foto de portaria/alarme. Apólice ativa em até 24h após pagamento." },
        ],
      }}
      trilhaSeo={{
        subtitle:
          "Complementos que quem contrata seguro residencial em Guarulhos costuma avaliar em seguida.",
        items: trilhaResidencial,
      }}
    />
    <ExitIntentPopup />
    </>
  );
};

export default SeguroResidencial;
