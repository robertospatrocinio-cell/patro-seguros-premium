import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-seguro-auto.webp";

const SeguroAuto = () => {
  return (
    <InsurancePageTemplate
      heroImage={heroImg}
      title="Seguro Auto"
      subtitle="Proteção completa para seu veículo com as melhores seguradoras do mercado"
      icon="🚗"
      metaDescription="Seguro Auto com cotação grátis. Compare Porto, Tokio Marine, Allianz e mais. Coberturas contra roubo, colisão, incêndio e assistência 24h. Patro Seguros Guarulhos."
      description="O Seguro Auto é a principal ferramenta de proteção patrimonial para donos de veículos no Brasil. Em um país com mais de 800 mil ocorrências de roubo e furto de veículos por ano e milhões de acidentes de trânsito, circular sem seguro é um risco financeiro significativo."
      detailedDescription={`Um veículo representa, para a maioria dos brasileiros, o segundo maior investimento patrimonial — atrás apenas do imóvel. Perder esse bem sem proteção pode comprometer anos de economia e planejamento financeiro.

O seguro auto não protege apenas contra roubo. Ele cobre colisões (mesmo quando você é o culpado), incêndios, fenômenos naturais como enchentes e vendavais, e ainda oferece responsabilidade civil — que cobre danos que você causar a terceiros, incluindo despesas médicas e hospitalares de vítimas.

Além da proteção patrimonial, o seguro auto oferece assistência 24h que resolve problemas do dia a dia: pane mecânica ou elétrica, pneu furado, falta de combustível, perda de chave e até hospedagem em caso de sinistro durante viagem.`}
      howItWorks={[
        { step: "1", title: "Análise do Perfil", description: "Avaliamos seu perfil completo: idade, estado civil, CEP onde o carro pernoita, modelo e ano do veículo, quilometragem média, se possui garagem e outros fatores. Cada detalhe pode impactar o preço — e nós sabemos quais informações otimizam sua cotação em cada seguradora." },
        { step: "2", title: "Cotação com Múltiplas Seguradoras", description: "Enviamos seu perfil para diversas seguradoras simultaneamente. Cada uma tem sua própria fórmula de precificação, e é comum encontrar diferenças de 30% a 50% entre elas para o mesmo carro e perfil. Comparamos não apenas preço, mas também qualidade de atendimento, rede de oficinas e histórico de satisfação." },
        { step: "3", title: "Apresentação das Melhores Opções", description: "Apresentamos as melhores propostas com comparativo claro de preços, coberturas, franquias e assistências. Explicamos as diferenças e recomendamos a opção com melhor custo-benefício para o seu caso específico." },
        { step: "4", title: "Contratação e Vistoria", description: "Após a escolha, cuidamos de toda a burocracia. Em muitos casos, a vistoria é feita por fotos do celular. Sua apólice fica ativa em até 24 horas e você recebe todos os documentos digitalmente." },
        { step: "5", title: "Acompanhamento Contínuo", description: "Durante toda a vigência, estamos disponíveis para dúvidas, inclusão de coberturas, sinistros e renovação. Na renovação anual, refazemos todo o processo para garantir que você continue com a melhor opção." },
      ]}
      coverages={[
        { title: "Colisão e Capotamento", description: "Cobre reparos ou indenização integral do veículo em caso de batida, capotamento ou tombamento — mesmo quando o segurado é culpado. A franquia (valor pago pelo segurado) se aplica apenas em sinistros parciais." },
        { title: "Roubo e Furto", description: "Indenização de 100% da tabela FIPE em caso de roubo ou furto total. Se o veículo for recuperado com danos, o seguro cobre os reparos. Não há cobrança de franquia em sinistros de roubo/furto total." },
        { title: "Incêndio e Explosão", description: "Proteção contra fogo, explosão e combustão espontânea. Cobre desde incêndios acidentais até danos causados por curto-circuito no sistema elétrico do veículo." },
        { title: "Fenômenos Naturais", description: "Cobertura para danos causados por enchentes, inundações, alagamentos, vendavais, granizo, raios e queda de árvores sobre o veículo. Essencial em cidades com histórico de chuvas fortes." },
        { title: "Responsabilidade Civil (RC)", description: "Cobre danos materiais e corporais que você causar a terceiros em acidentes de trânsito. Inclui reparos em veículos de terceiros, postes, muros e despesas médicas/hospitalares de vítimas. O limite de RC é definido na apólice." },
        { title: "Assistência 24h", description: "Guincho (quilometragem conforme apólice), socorro mecânico e elétrico, troca de pneus, chaveiro, falta de combustível, hospedagem em viagem e até transporte alternativo. Disponível 24 horas, 365 dias por ano." },
        { title: "Carro Reserva", description: "Veículo substituto por até 7, 15 ou 30 dias (conforme contratação) enquanto seu carro está na oficina por sinistro coberto. Categorias variam conforme o plano escolhido." },
        { title: "Vidros, Retrovisores, Lanternas e Faróis", description: "Cobertura para substituição de para-brisas, vidros laterais, traseiro, retrovisores, lanternas e faróis. Pode ser contratada com ou sem franquia. É a cobertura mais utilizada pelos segurados." },
      ]}
      coverageExclusions={[
        "Danos mecânicos ou desgaste natural de peças (motor, câmbio, suspensão)",
        "Uso do veículo em competições, corridas ou provas de velocidade",
        "Condução sob efeito de álcool ou drogas comprovado",
        "Motorista sem habilitação válida no momento do sinistro",
        "Danos estéticos pré-existentes não declarados na vistoria",
        "Acessórios e equipamentos não declarados na apólice",
        "Uso do veículo para fins diferentes do declarado (ex: declarou lazer, usa para app)",
        "Sinistros fora do território de cobertura contratado",
      ]}
      pricingInfo={{
        intro: "O preço do seguro auto varia enormemente — de R$ 1.500 a R$ 8.000 ou mais por ano — dependendo de uma combinação de fatores do perfil do motorista e do veículo. Entender esses fatores ajuda a tomar decisões que reduzem o custo.",
        factors: [
          "Modelo, marca e ano do veículo — carros mais visados para roubo custam mais",
          "CEP de pernoite — regiões com maior sinistralidade encarecem o seguro",
          "Perfil do motorista — idade, sexo, estado civil e tempo de habilitação",
          "Uso do veículo — lazer, ida e volta ao trabalho ou uso profissional",
          "Garagem — veículo em garagem fechada é significativamente mais barato",
          "Classe de bônus — até 35% de desconto por anos sem sinistro",
          "Coberturas escolhidas — quanto mais coberturas, maior o valor",
          "Franquia — franquia maior = seguro mais barato (e vice-versa)",
        ],
        note: "Na Patro, fazemos a cotação com diversas seguradoras e encontramos diferenças de até 50% no preço para o mesmo perfil. A comparação é gratuita e sem compromisso.",
      }}
      realScenarios={[
        { title: "Enchente em Guarulhos danificou o motor", description: "Após forte chuva, um cliente teve seu veículo submerso em alagamento. O seguro cobriu a perda total do veículo (motor hidrolockado) com indenização de 100% da tabela FIPE — R$ 78 mil. Sem seguro, o prejuízo seria total, pois o reparo do motor superava o valor do carro." },
        { title: "Batida em poste com danos a terceiro", description: "Um segurado perdeu o controle e bateu em um poste de iluminação e no muro de uma residência. O seguro cobriu os R$ 15 mil de reparos no veículo (descontada a franquia), mais R$ 22 mil em danos ao poste e ao muro via Responsabilidade Civil. Sem RC, ele responderia judicialmente por esses valores." },
        { title: "Roubo do veículo com recuperação danificada", description: "Veículo roubado foi recuperado 3 semanas depois com danos significativos (vidros quebrados, painel arrancado, bancos cortados). O seguro cobriu 100% dos reparos sem cobrança de franquia, pois era sinistro de roubo. O cliente não precisou desembolsar nada." },
        { title: "Pane elétrica durante viagem", description: "Em viagem para o litoral, o veículo apresentou pane elétrica. A assistência 24h enviou guincho em 45 minutos, levou o carro à oficina mais próxima e o seguro cobriu hospedagem para a família enquanto aguardava o reparo." },
      ]}
      importantDetails={[
        { title: "Tabela FIPE e Valor de Mercado Referenciado", content: "A maioria dos seguros indeniza pela tabela FIPE vigente no mês do sinistro. Porém, algumas seguradoras oferecem a modalidade 'Valor de Mercado Referenciado', que paga a média entre FIPE e o preço praticado no mercado — podendo ser menor. Na Patro, sempre explicamos a diferença e recomendamos a opção mais vantajosa.\n\nImportante: em caso de perda total (quando o reparo supera 75% do valor do veículo), a indenização é de 100% da FIPE, sem cobrança de franquia." },
        { title: "Franquia: Normal, Reduzida ou Majorada", content: "A franquia é o valor que você paga em sinistros parciais (batidas com reparo). Existem três tipos: reduzida (menor valor, seguro mais caro), normal (padrão) e majorada (maior valor, seguro mais barato).\n\nSe você é um motorista cuidadoso e raramente aciona o seguro, a franquia majorada pode gerar economia significativa. Já se prefere tranquilidade total, a reduzida garante menor desembolso em caso de sinistro." },
        { title: "Classe de Bônus e Como Funciona", content: "A cada ano sem sinistro, você sobe uma classe de bônus (de 0 a 7). Cada classe representa um desconto progressivo que pode chegar a 35%. Esse bônus é seu — pode ser transferido entre seguradoras na renovação.\n\nAtenção: se você acionar um sinistro, perde classes de bônus (geralmente volta para a classe 0 ou 2). Por isso, avalie se vale acionar o seguro para pequenos reparos ou pagar do próprio bolso e preservar o bônus." },
        { title: "Cobertura para Terceiros (RC) — Por Que É Essencial", content: "A Responsabilidade Civil Facultativa (RCF) é talvez a cobertura mais importante do seguro auto — e muita gente não sabe. Se você causar um acidente com danos a outro veículo, propriedade ou pessoa, a RC cobre esses custos.\n\nSem RC, você responde judicialmente e pode ter salário penhorado, bens bloqueados e dívidas por anos. Recomendamos contratar pelo menos R$ 100 mil em RC de danos materiais e R$ 100 mil em RC de danos corporais." },
      ]}
      tips={[
        "Compare cotações com uma corretora — diferenças de 30% a 50% entre seguradoras são comuns para o mesmo carro e perfil.",
        "Instale rastreador ou bloqueador — descontos de 5% a 25% dependendo do equipamento e da seguradora.",
        "Opte por franquia majorada se você é motorista cuidadoso — a economia no prêmio anual pode compensar.",
        "Acumule bônus: cada ano sem sinistro vale até 35% de desconto. Avalie se vale acionar para pequenos reparos.",
        "Pague à vista se possível — muitas seguradoras oferecem 5% a 10% de desconto.",
        "Combine seguros — auto + residencial ou auto + vida podem gerar desconto por pacote.",
        "Renove com 30 dias de antecedência — evita cotações de última hora e permite melhor negociação.",
      ]}
      whoNeeds={[
        "Proprietários de veículos novos ou seminovos — a proteção preserva o investimento",
        "Motoristas que utilizam o carro diariamente no trânsito urbano",
        "Quem financiou o veículo — o banco exige seguro, mas você escolhe a seguradora",
        "Moradores de regiões com alto índice de roubo e furto",
        "Profissionais que dependem do carro para trabalhar (vendedores, representantes)",
        "Famílias que precisam de mobilidade garantida — o carro reserva é essencial",
        "Motoristas que fazem viagens frequentes — a assistência 24h cobre todo o território",
        "Donos de carros de alto valor, importados ou blindados",
      ]}
      whyPatro={[
        "Cotação simultânea com Porto, Tokio Marine, Allianz, HDI, Mapfre, Zurich, Liberty, Azul e mais",
        "Análise completa do perfil para encontrar o menor preço legítimo — sem omitir informações",
        "Transferência automática da classe de bônus na renovação ou troca de seguradora",
        "Suporte completo em sinistros — acompanhamos da abertura à conclusão, sem você precisar ligar para a seguradora",
        "Revisão anual de coberturas e valores para garantir proteção adequada ao momento",
        "Atendimento rápido via WhatsApp — resposta em até 2 horas úteis",
        "Orientação sobre quando vale (ou não) acionar o seguro para preservar o bônus",
        "Parcelamento em até 10x sem juros no cartão ou boleto",
      ]}
      faqs={[
        { question: "Quanto custa um seguro auto em média?", answer: "Para carros populares (Onix, HB20, Argo), o seguro completo varia de R$ 2.000 a R$ 4.500/ano para motoristas acima de 26 anos com garagem. SUVs e veículos de maior valor ficam entre R$ 3.500 e R$ 8.000. Porém, esses valores mudam drasticamente conforme perfil: jovens abaixo de 25 anos pagam até 100% a mais, e o CEP de pernoite pode variar o preço em até 40%. A única forma de saber seu valor real é fazendo uma cotação personalizada." },
        { question: "Posso incluir outros motoristas no seguro?", answer: "Sim! Você pode incluir outros condutores eventuais (cônjuge, filhos, pais) sem problema. Porém, é obrigatório declarar o principal condutor — a pessoa que mais utiliza o veículo. Se o principal condutor for diferente do proprietário (ex: filho usando carro dos pais), isso deve ser informado. Omitir essa informação pode causar perda de cobertura em caso de sinistro." },
        { question: "O que fazer em caso de acidente ou sinistro?", answer: "1) Garanta sua segurança e de todos os envolvidos. 2) Registre o Boletim de Ocorrência (obrigatório para roubo/furto, recomendado para colisões). 3) Tire fotos do local, dos danos e das placas dos veículos envolvidos. 4) Entre em contato conosco pelo WhatsApp — faremos toda a abertura e acompanhamento do sinistro junto à seguradora. Não assuma responsabilidade no local e não negocie diretamente com o outro motorista." },
        { question: "Posso trocar de seguradora na renovação?", answer: "Sim, e é recomendável! Na renovação anual, sempre refazemos cotações com todas as seguradoras. É comum encontrar opções melhores do que a seguradora atual, especialmente se sua classe de bônus aumentou. Seu bônus é transferível entre seguradoras — é um direito do segurado e nós cuidamos dessa transferência automaticamente." },
        { question: "O que é perda total e como funciona?", answer: "Perda total ocorre quando o custo do reparo ultrapassa 75% do valor FIPE do veículo (ou percentual definido na apólice). Nesse caso, a seguradora indeniza 100% do valor FIPE sem cobrança de franquia. O veículo fica com a seguradora (salvado). Se você preferir ficar com o veículo danificado, recebe a indenização menos o valor do salvado." },
        { question: "Seguro auto cobre enchente e alagamento?", answer: "Sim, desde que a cobertura de eventos da natureza ou alagamento/inundação esteja contratada. Esta cobertura não é automática na maioria das seguradoras — precisa ser adicionada. Em cidades como Guarulhos e São Paulo, onde alagamentos são frequentes, recomendamos fortemente incluir essa cobertura. O custo adicional é relativamente baixo comparado ao risco." },
        { question: "Meu carro está financiado. Como funciona o seguro?", answer: "Se o veículo é financiado, o banco/financeira é incluído como 'beneficiário do seguro' (cláusula beneficiária). Em caso de perda total ou roubo, a indenização é paga primeiro ao banco (quitando o financiamento) e o saldo restante vai para você. O banco exige seguro durante o financiamento, mas a escolha da seguradora e da corretora é sua — não é obrigatório contratar pelo banco." },
        { question: "Como funciona o bônus de renovação?", answer: "Cada ano sem sinistro rende uma classe de bônus: Classe 0 (sem desconto), Classe 1 (10%), Classe 2 (15%), até Classe 7 (35% de desconto). Em caso de sinistro com culpa, você perde classes (geralmente volta para 0 ou 2). O bônus é pessoal — se você vender o carro e comprar outro, mantém o bônus. Se trocar de seguradora, o bônus é transferido. Na Patro, sempre verificamos e preservamos sua classe de bônus." },
      ]}
      relatedInsurances={[
        { title: "Seguro de Vida", link: "/seguro-vida" },
        { title: "Seguro Residencial", link: "/seguro-residencial" },
        { title: "Seguro de Moto", link: "/seguro-moto" },
        { title: "Seguro de Frota", link: "/seguro-frota" },
      ]}
      quoteUrl="https://villa.segfy.com/Publico/Segurados/Orcamentos/SolicitarCotacao?e=t6RDiR%2F1ioARkspweLWOgQ%3D%3D"
    />
  );
};

export default SeguroAuto;
