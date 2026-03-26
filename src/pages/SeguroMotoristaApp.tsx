import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-seguro-motorista-app.webp";

const SeguroMotoristaApp = () => {
  return (
    <InsurancePageTemplate
      heroImage={heroImg}
      title="Seguro para Motorista de Aplicativo"
      subtitle="Proteção especializada para quem trabalha com Uber, 99, inDrive e outros apps em Guarulhos e região"
      icon="📱"
      metaDescription="Seguro para motorista de aplicativo em Guarulhos e região. Cobertura completa para Uber, 99, inDrive: colisão, roubo, RC passageiros, assistência 24h. Cotação grátis na Patro Seguros."
      description="O Seguro para Motorista de Aplicativo é uma proteção essencial para quem depende do carro como ferramenta de trabalho. Motoristas de Uber, 99, inDrive e outros apps rodam em média 200 a 300 km por dia, enfrentando riscos significativamente maiores do que motoristas comuns — e o seguro convencional não cobre uso profissional por app."
      detailedDescription={`Em Guarulhos e região metropolitana, motoristas de aplicativo enfrentam desafios únicos: alto volume de trânsito nas marginais e rodovias (Dutra, Ayrton Senna, Fernão Dias), regiões com altos índices de roubo e furto, e o desgaste acelerado do veículo pelo uso intensivo.

Um seguro convencional que não declare o uso para aplicativo pode ter a cobertura negada no momento do sinistro — deixando o motorista desamparado justamente quando mais precisa. O seguro específico para motorista de app contempla todas as particularidades dessa atividade: quilometragem elevada, transporte de passageiros, horários de maior risco e a necessidade de voltar a trabalhar rapidamente.

Além da proteção patrimonial, o seguro para app inclui coberturas de Responsabilidade Civil para passageiros — uma obrigação legal do motorista — e assistências que minimizam o tempo parado sem gerar renda, como carro reserva estendido e guincho com quilometragem ampliada.`}
      howItWorks={[
        { step: "1", title: "Declaração do Uso Profissional", description: "O primeiro passo é declarar corretamente que o veículo é usado para transporte por aplicativo. Isso é essencial para garantir cobertura legítima. Avaliamos seu perfil: horas rodadas por dia, região de atuação, se o carro também é de uso pessoal e outros fatores específicos." },
        { step: "2", title: "Cotação Especializada", description: "Nem todas as seguradoras aceitam motoristas de app — e entre as que aceitam, as condições variam muito. Cotamos com seguradoras que possuem produtos específicos para essa categoria, garantindo cobertura real e preço justo para o perfil de uso intensivo." },
        { step: "3", title: "Comparação e Escolha", description: "Apresentamos as melhores opções com comparativo de preço, cobertura RC para passageiros, franquia, assistência e carro reserva. Orientamos sobre coberturas essenciais vs. opcionais para otimizar o investimento sem comprometer a proteção." },
        { step: "4", title: "Ativação Rápida", description: "A apólice é ativada em até 24h. Muitas seguradoras fazem vistoria por fotos do celular. Você recebe toda a documentação digital e pode continuar trabalhando sem interrupção." },
        { step: "5", title: "Suporte em Sinistros", description: "Em caso de acidente ou roubo, agilizamos todo o processo para minimizar seu tempo parado. Acompanhamos a abertura do sinistro, agendamento de oficina e liberação do carro reserva — cada dia parado é um dia sem renda." },
      ]}
      coverages={[
        { title: "Colisão e Capotamento (Uso App)", description: "Cobertura para batidas, capotamentos e tombamentos durante o trabalho por aplicativo. Diferente do seguro comum, esta cobertura é válida mesmo quando há passageiro no veículo ou o app está ativo. Franquia específica para uso profissional." },
        { title: "Roubo e Furto (Perfil App)", description: "Indenização integral pela tabela FIPE em caso de roubo ou furto. Motoristas de app são alvos frequentes, especialmente à noite e em corridas para regiões periféricas. A cobertura contempla o perfil de risco elevado desta atividade." },
        { title: "RC Passageiros (APP)", description: "Cobertura de Acidentes Pessoais de Passageiros — obrigatória para transporte remunerado. Cobre despesas médicas, invalidez e morte acidental de passageiros transportados. Protege o motorista legal e financeiramente." },
        { title: "RC Danos a Terceiros", description: "Responsabilidade Civil para danos materiais e corporais causados a terceiros durante corridas. Cobre reparos em veículos, propriedades e despesas médicas de vítimas. Limite recomendado: R$ 150 mil ou mais." },
        { title: "Assistência 24h Estendida", description: "Guincho com quilometragem ampliada (ideal para quem roda longas distâncias), socorro mecânico e elétrico, troca de pneus, chaveiro. Atendimento prioritário para minimizar o tempo parado sem trabalhar." },
        { title: "Carro Reserva Estendido", description: "Veículo substituto por até 15 ou 30 dias enquanto seu carro está na oficina. Para motoristas de app, cada dia sem carro é um dia sem renda — por isso a cobertura estendida é essencial." },
        { title: "Vidros e Acessórios", description: "Cobertura para para-brisas, vidros laterais, retrovisores, lanternas e faróis. Com o uso intensivo, esses componentes estão mais expostos a danos por pedras, objetos na via e vandalismo." },
        { title: "Fenômenos Naturais e Alagamento", description: "Proteção contra enchentes, alagamentos, granizo e vendavais — especialmente importante em Guarulhos e região, onde alagamentos são frequentes nas vias de maior movimento." },
      ]}
      coverageExclusions={[
        "Danos mecânicos ou desgaste natural por uso (motor, câmbio, suspensão, embreagem)",
        "Condução sob efeito de álcool ou drogas comprovado",
        "Motorista sem habilitação válida ou com CNH vencida",
        "Uso em competições, corridas ou provas de velocidade",
        "Transporte de mercadorias ou cargas (requer seguro de transporte)",
        "Veículo utilizado para ensino de direção",
        "Sinistros fora do território de cobertura contratado",
        "Acessórios e equipamentos não declarados na apólice (ex: suportes, câmeras)",
      ]}
      pricingInfo={{
        intro: "O seguro para motorista de aplicativo custa em média 20% a 40% mais que o seguro convencional, refletindo o maior risco pelo uso intensivo. Em Guarulhos e região, os valores variam de R$ 3.000 a R$ 7.000/ano para carros populares e de R$ 5.000 a R$ 12.000 para sedãs e SUVs.",
        factors: [
          "Modelo e ano do veículo — carros populares (Onix, HB20, Argo) têm preços mais acessíveis",
          "Horas rodadas por dia — motoristas full-time pagam mais que parciais",
          "Região de atuação — Guarulhos, São Paulo, ABCD têm sinistralidades diferentes",
          "CEP de pernoite — garagem fechada reduz significativamente o valor",
          "Plataformas utilizadas — Uber, 99, inDrive ou múltiplas",
          "Classe de bônus — até 35% de desconto por anos sem sinistro",
          "Coberturas escolhidas — RC passageiros é obrigatória, carro reserva é altamente recomendada",
          "Rastreador ou bloqueador instalado — descontos de 5% a 20%",
        ],
        note: "Na Patro, especializamos cotações para motoristas de app e encontramos diferenças de até 40% entre seguradoras. Algumas seguradoras têm produtos específicos para apps que saem mais baratos que adaptar um seguro convencional.",
      }}
      realScenarios={[
        { title: "Roubo durante corrida noturna em Guarulhos", description: "Motorista de Uber foi abordado durante corrida noturna na região de Cumbica. O seguro cobriu 100% da tabela FIPE (R$ 62 mil) e o carro reserva permitiu que ele voltasse a trabalhar em 48 horas enquanto aguardava a indenização. Sem seguro, ficaria meses sem trabalhar e sem renda." },
        { title: "Colisão com passageiro a bordo", description: "Durante corrida pela 99, motorista foi atingido por veículo que avançou o sinal. O seguro cobriu os reparos do veículo (R$ 18 mil), as despesas médicas do passageiro via RC-APP (R$ 8 mil) e forneceu carro reserva por 15 dias. Sem a RC passageiros, o motorista responderia pessoalmente pelos custos médicos." },
        { title: "Alagamento na Marginal Tietê", description: "Veículo ficou submerso em alagamento súbito durante corrida. O motor sofreu hidrolocking (perda total). O seguro indenizou R$ 55 mil pela FIPE e o motorista adquiriu outro veículo em 15 dias. Sem a cobertura de alagamento, o prejuízo seria total." },
        { title: "Pane mecânica na Rodovia Dutra", description: "Corrida para o aeroporto de Guarulhos terminou com pane elétrica na Dutra. A assistência 24h enviou guincho em 40 minutos, o passageiro foi transferido para outro motorista parceiro, e o carro foi levado à oficina. O motorista perdeu apenas 3 horas de trabalho." },
      ]}
      importantDetails={[
        { title: "Por que o seguro convencional não serve para motorista de app?", content: "Quando você contrata um seguro auto declarando uso 'lazer' ou 'ida e volta ao trabalho', mas utiliza o veículo para transporte por aplicativo, está em risco de ter o sinistro negado. As seguradoras investigam o uso do veículo no momento do sinistro — e se constatarem uso comercial não declarado, podem recusar a indenização.\n\nIsso acontece porque o perfil de risco é completamente diferente: motoristas de app rodam 5 a 10 vezes mais que motoristas comuns, circulam em horários de maior risco e transportam passageiros. Declarar corretamente é mais caro, mas garante proteção real." },
        { title: "RC Passageiros: obrigatória e essencial", content: "A legislação brasileira exige que transportadores remunerados (incluindo motoristas de app) tenham seguro de Acidentes Pessoais de Passageiros (APP). Em caso de acidente com lesão ao passageiro, o motorista responde civil e criminalmente.\n\nA cobertura RC-APP cobre despesas médicas, hospitalares, invalidez permanente e morte acidental do passageiro. Sem ela, o motorista pode enfrentar processos judiciais com indenizações de dezenas ou centenas de milhares de reais." },
        { title: "Carro reserva: cada dia parado é prejuízo", content: "Para um motorista que fatura R$ 200 a R$ 400 por dia, ficar 15 dias sem carro significa perder de R$ 3.000 a R$ 6.000 em renda. O carro reserva estendido (15 ou 30 dias) é um investimento que se paga no primeiro sinistro.\n\nAlgumas seguradoras oferecem carro reserva da mesma categoria (sedã ou hatch), permitindo que o motorista continue trabalhando normalmente pelo app enquanto seu carro é reparado." },
        { title: "Rastreador: desconto e recuperação mais rápida", content: "Instalar rastreador ou bloqueador no veículo traz duplo benefício: desconto de 5% a 20% no seguro e maior chance de recuperação em caso de roubo. Para motoristas de app, a recuperação rápida significa voltar a trabalhar mais cedo.\n\nAlgumas seguradoras exigem rastreador para aceitar motoristas de app em regiões de alta sinistralidade (como certas áreas de Guarulhos e São Paulo). Recomendamos modelos com rastreamento em tempo real e botão de pânico." },
      ]}
      tips={[
        "Declare sempre o uso para aplicativo — omitir pode anular sua cobertura no momento do sinistro.",
        "Compare com corretora especializada — diferenças de até 40% entre seguradoras para motoristas de app.",
        "Contrate RC passageiros com limite mínimo de R$ 50 mil — é obrigatório e protege seu patrimônio.",
        "Invista em carro reserva estendido (15-30 dias) — cada dia parado é renda perdida.",
        "Instale rastreador — desconto no seguro e maior chance de recuperação do veículo.",
        "Mantenha o bônus: avalie se vale acionar o seguro para pequenos reparos ou pagar do bolso.",
        "Considere franquia majorada se você é motorista experiente — economia no prêmio anual.",
        "Renove com 30 dias de antecedência — permite melhor negociação e evita ficar descoberto.",
      ]}
      whoNeeds={[
        "Motoristas de Uber em Guarulhos e Grande São Paulo",
        "Motoristas da 99, inDrive, Cabify e outros aplicativos de transporte",
        "Motoristas que trabalham em período integral (full-time) por aplicativo",
        "Motoristas parciais que complementam renda com apps",
        "Motoristas que rodam em regiões de alto risco (aeroporto, rodovias, periferia)",
        "Motoristas que financiaram o veículo e precisam de seguro obrigatório",
        "Motoristas que transportam passageiros e precisam de RC-APP",
        "Motoristas que dependem exclusivamente do carro para sustento familiar",
      ]}
      whyPatro={[
        "Especialistas em seguro para motoristas de aplicativo em Guarulhos e região",
        "Cotação com seguradoras que aceitam e possuem produtos específicos para apps",
        "Orientação sobre coberturas obrigatórias (RC-APP) e recomendadas (carro reserva)",
        "Suporte prioritário em sinistros — sabemos que cada dia parado é renda perdida",
        "Comparação real entre seguradoras: preço, franquia, assistência e carro reserva",
        "Atendimento rápido via WhatsApp — resposta em até 2 horas úteis",
        "Parcelamento em até 10x sem juros no cartão ou boleto",
        "Acompanhamento na renovação anual para garantir o melhor custo-benefício",
      ]}
      faqs={[
        { question: "Quanto custa o seguro para motorista de aplicativo em Guarulhos?", answer: "Para carros populares (Onix, HB20, Argo), o seguro com declaração de uso para app varia de R$ 3.000 a R$ 5.500/ano. Sedãs como Corolla e Civic ficam entre R$ 5.000 e R$ 8.000. O valor depende do perfil do motorista, CEP de pernoite, horas rodadas por dia e coberturas escolhidas. A cotação personalizada é a única forma de saber o valor exato." },
        { question: "Posso usar seguro convencional para rodar por aplicativo?", answer: "Não é recomendado. Se você declarou uso 'lazer' ou 'trabalho' (ida e volta) e sofrer um sinistro enquanto roda por app, a seguradora pode negar a cobertura por divergência de perfil. Algumas seguradoras investigam o uso no momento do sinistro verificando o app no celular, GPS e depoimentos de passageiros. O seguro específico para app custa mais, mas garante cobertura real." },
        { question: "Todas as seguradoras aceitam motorista de aplicativo?", answer: "Não. Apenas parte das seguradoras do mercado aceita motoristas de app, e entre as que aceitam, as condições variam bastante. Algumas exigem rastreador, outras limitam a idade do veículo ou a região de atuação. Na Patro, trabalhamos com todas as seguradoras que aceitam app e encontramos a melhor opção para cada perfil." },
        { question: "O seguro cobre acidentes com passageiro dentro do carro?", answer: "Sim, desde que a cobertura RC-APP (Acidentes Pessoais de Passageiros) esteja contratada. Essa cobertura cobre despesas médicas, invalidez e morte acidental do passageiro. É obrigatória por lei para transporte remunerado e protege o motorista de processos judiciais que podem comprometer seu patrimônio pessoal." },
        { question: "O que acontece se eu for roubado durante uma corrida?", answer: "Com seguro específico para app, o processo é o mesmo de qualquer roubo: registre o B.O., entre em contato conosco e a seguradora indeniza 100% da FIPE sem franquia. A diferença é que o seguro para app contempla o risco elevado de roubos durante corridas (especialmente noturnas), enquanto um seguro convencional poderia questionar o uso do veículo no momento do sinistro." },
        { question: "Motorista de app tem direito a bônus de renovação?", answer: "Sim! O sistema de bônus funciona da mesma forma: cada ano sem sinistro rende uma classe de bônus com desconto progressivo de até 35%. O bônus é pessoal e transferível entre seguradoras. Para motoristas de app, manter o bônus é ainda mais importante, pois o seguro já é mais caro pelo perfil de uso intensivo." },
        { question: "Preciso de seguro se rodo poucas horas por dia?", answer: "Sim. Mesmo motoristas parciais (que rodam apenas algumas horas por dia ou nos finais de semana) precisam declarar o uso para app. Se sofrer um sinistro durante uma corrida sem a declaração correta, a cobertura pode ser negada. A boa notícia é que motoristas parciais geralmente pagam menos que full-time." },
        { question: "O seguro cobre o celular e acessórios do carro?", answer: "Acessórios como suporte de celular, câmera veicular e carregadores precisam ser declarados na apólice para terem cobertura. O celular em si não é coberto pelo seguro auto — para proteger o smartphone, recomendamos um seguro de celular específico. Na Patro, oferecemos ambos e podemos fazer um pacote com condições especiais." },
      ]}
      relatedInsurances={[
        { title: "Seguro Auto", link: "/seguro-auto" },
        { title: "Seguro de Moto", link: "/seguro-moto" },
        { title: "Seguro de Vida", link: "/seguro-vida" },
        { title: "Seguro Celular", link: "/seguro-celular" },
        { title: "Seguro Acidentes Pessoais", link: "/seguro-acidentes-pessoais" },
        { title: "Seguro de Frota", link: "/seguro-frota" },
      ]}
      quoteFormFields={[
        { id: "veiculo", label: "Veículo (Marca/Modelo/Ano)", placeholder: "Ex: Chevrolet Onix 2023" },
        { id: "cep", label: "CEP de pernoite", placeholder: "Ex: 07115-000" },
        { id: "plataforma", label: "Plataforma(s)", placeholder: "Selecione", type: "select", options: ["Uber", "99", "inDrive", "Uber + 99", "Múltiplas plataformas", "Outra"] },
        { id: "horas", label: "Horas rodadas por dia", placeholder: "Selecione", type: "select", options: ["Até 4h (parcial)", "4h a 8h (meio período)", "8h a 12h (integral)", "Mais de 12h"] },
        { id: "regiao", label: "Região de atuação principal", placeholder: "Selecione", type: "select", options: ["Guarulhos", "São Paulo - Capital", "Grande São Paulo", "Guarulhos + São Paulo", "Região Metropolitana completa"] },
      ]}
    />
  );
};

export default SeguroMotoristaApp;
