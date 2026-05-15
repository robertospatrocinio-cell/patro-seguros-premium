export interface SegmentoEmpresarial {
  slug: string;
  nome: string;
  icon: string;
  subtitle: string;
  description: string;
  detailedDescription: string;
  metaDescription: string;
  coverages: { title: string; description: string }[];
  whoNeeds: string[];
  faqs: { question: string; answer: string }[];
}

const baseCoverages = [
  { title: "Incêndio, Raio e Explosão", description: "Cobertura para danos ao imóvel, estoque e equipamentos por fogo, descargas elétricas e explosões." },
  { title: "Roubo e Furto Qualificado", description: "Proteção para mercadorias, equipamentos e valores em caso de arrombamento ou assalto." },
  { title: "Danos Elétricos", description: "Cobertura para máquinas e equipamentos danificados por curto-circuito ou picos de energia." },
  { title: "Responsabilidade Civil", description: "Proteção contra danos causados a clientes, fornecedores e terceiros dentro do estabelecimento." },
  { title: "Vendaval, Furacão e Granizo", description: "Cobertura para danos provocados por fenômenos da natureza." },
  { title: "Quebra de Vidros", description: "Reposição de vitrines, espelhos e fachadas em vidro." },
  { title: "Lucros Cessantes", description: "Indenização pela perda de faturamento durante a paralisação do negócio após sinistro coberto." },
  { title: "Assistência 24h", description: "Chaveiro, eletricista, encanador, vidraceiro e desentupimento sem custo adicional." },
];

export const baseWhyPatroEmpresarial = [
  "Mais de 16 seguradoras parceiras para garantir o melhor preço",
  "Atendimento humanizado e consultivo em Guarulhos/SP",
  "Cotação gratuita em até 2h úteis",
  "Suporte completo na hora do sinistro",
  "Especialistas em PMEs do comércio e serviços",
];

export const segmentos: SegmentoEmpresarial[] = [
  {
    slug: "roupas-e-sapatos",
    nome: "Lojas de Roupas e Sapatos",
    icon: "👗",
    subtitle: "Proteção sob medida para o varejo de moda e calçados",
    description: "Seguro Empresarial para lojas de roupas, calçados e acessórios. Proteja estoque, vitrines e ponto comercial contra incêndio, roubo e responsabilidade civil.",
    detailedDescription: "Lojas de moda concentram alto valor em estoque sazonal: coleções, calçados, bolsas e acessórios que podem se perder em poucos minutos com um incêndio, alagamento ou assalto. O seguro empresarial garante a reposição integral das mercadorias declaradas, além de cobrir vitrines quebradas, equipamentos de PDV e a interrupção do faturamento durante a recuperação da loja.\n\nPara o varejo de moda, recomendamos especial atenção à cobertura de Roubo e Furto Qualificado e à Quebra de Vidros (vitrines representam o cartão de visitas e o maior risco diário). Lojas em shopping também precisam de RC, pois acidentes com clientes dentro da loja são frequentes.",
    metaDescription: "Seguro para Lojas de Roupas e Sapatos: incêndio, roubo, vitrines, RC e lucros cessantes. Cotação grátis Patro Seguros.",
    coverages: baseCoverages,
    whoNeeds: ["Lojas de roupas femininas, masculinas e infantis", "Sapatarias e calçadistas", "Lojas de bolsas e acessórios", "Boutiques e multimarcas", "Franquias de moda"],
    faqs: [
      { question: "O seguro cobre o estoque sazonal?", answer: "Sim. Declare o valor médio do estoque mantido na loja para garantir indenização integral." },
      { question: "Vitrines quebradas estão cobertas?", answer: "Sim, com a cobertura de Quebra de Vidros incluímos vitrines, espelhos e fachadas." },
      { question: "E se a loja for assaltada durante o expediente?", answer: "A cobertura de Roubo Qualificado garante a reposição das mercadorias e dinheiro em caixa subtraídos com violência." },
    ],
  },
  {
    slug: "bares",
    nome: "Bares",
    icon: "🍻",
    subtitle: "Seguro Empresarial para bares, pubs e cervejarias",
    description: "Proteção completa para bares: incêndio, roubo, RC para clientes, equipamentos de refrigeração e estoque de bebidas.",
    detailedDescription: "Bares operam com alto fluxo de pessoas, álcool e equipamentos sensíveis (chopeiras, freezers, geladeiras, som). Brigas, acidentes com clientes, intoxicações e furtos são riscos diários. O seguro empresarial protege o estabelecimento contra esses cenários e garante a continuidade do negócio.\n\nA cobertura de Responsabilidade Civil é essencial: clientes que escorregam, se machucam ou passam mal podem processar o estabelecimento. Já a cobertura de Lucros Cessantes garante o faturamento durante reformas após um sinistro coberto.",
    metaDescription: "Seguro para Bares: incêndio, roubo, RC, equipamentos e lucros cessantes. Cotação grátis Patro Seguros.",
    coverages: baseCoverages,
    whoNeeds: ["Bares e botecos", "Pubs e cervejarias", "Choperias e brewpubs", "Bares temáticos e karaokês", "Estabelecimentos com música ao vivo"],
    faqs: [
      { question: "Cobre brigas entre clientes?", answer: "Danos materiais ao estabelecimento causados por tumulto podem ser cobertos. Lesões a terceiros entram na RC." },
      { question: "Cobre intoxicação alimentar?", answer: "Sim, com a cobertura de RC Produtos contratada à parte." },
      { question: "Equipamentos como chopeira têm cobertura?", answer: "Sim, com Danos Elétricos e cobertura específica de equipamentos." },
    ],
  },
  {
    slug: "restaurantes",
    nome: "Restaurantes",
    icon: "🍽️",
    subtitle: "Seguro Empresarial para restaurantes, lanchonetes e cafeterias",
    description: "Proteja seu restaurante contra incêndio na cozinha, roubo, intoxicação alimentar e perda de alimentos por falta de refrigeração.",
    detailedDescription: "Restaurantes têm o maior risco de incêndio entre os negócios PME — cozinhas com gás, fritadeiras e fogões industriais. Um pequeno incêndio pode interditar o estabelecimento por semanas, gerando prejuízo duplo: reformas + faturamento perdido.\n\nO seguro inclui ainda RC para clientes (escorregões, queimaduras, intoxicação alimentar), perda de alimentos por queda de energia prolongada e quebra de equipamentos como fornos combinados, chapas e câmaras frias.",
    metaDescription: "Seguro para Restaurantes e Lanchonetes: incêndio, RC, intoxicação alimentar, equipamentos. Patro Seguros.",
    coverages: baseCoverages,
    whoNeeds: ["Restaurantes a la carte e self-service", "Lanchonetes e fast-food", "Cafeterias e padarias", "Pizzarias e hamburguerias", "Dark kitchens e delivery"],
    faqs: [
      { question: "Incêndio na cozinha está coberto?", answer: "Sim, é o sinistro mais comum em restaurantes. A apólice cobre estrutura, equipamentos e mercadorias." },
      { question: "E se um cliente passar mal?", answer: "A cobertura de RC Produtos cobre indenizações por intoxicação alimentar comprovada." },
      { question: "Perda de alimentos por queda de energia?", answer: "Sim, com a cobertura específica de Deterioração de Mercadorias em Câmara Frigorífica." },
    ],
  },
  {
    slug: "materiais-de-construcao",
    nome: "Lojas de Materiais de Construção",
    icon: "🧱",
    subtitle: "Seguro Empresarial para lojas de materiais de construção e home centers",
    description: "Proteção para depósitos, pátios e showrooms: incêndio, roubo, danos a equipamentos e RC para clientes.",
    detailedDescription: "Lojas de materiais de construção concentram estoque volumoso e de alto valor: cimento, ferro, tintas, ferramentas elétricas, louças e revestimentos. Os riscos vão desde furto de ferramentas até incêndio em áreas com tintas e solventes.\n\nO seguro contempla pátios cobertos e descobertos, equipamentos de empilhadeira, mercadorias em trânsito interno e RC para clientes que se machucam durante a visita ao depósito.",
    metaDescription: "Seguro para Lojas de Material de Construção: depósito, pátio, ferramentas, RC. Patro Seguros.",
    coverages: baseCoverages,
    whoNeeds: ["Lojas de materiais de construção", "Home centers e depósitos", "Lojas de tintas e acabamento", "Ferragens e ferramentaria", "Distribuidores de materiais hidráulicos e elétricos"],
    faqs: [
      { question: "Cobre estoque em pátio descoberto?", answer: "Sim, com cobertura específica para mercadorias em pátio (cimento, ferro, areia)." },
      { question: "Furto de ferramentas é coberto?", answer: "Sim, com Roubo e Furto Qualificado, declarando o valor médio das ferramentas em estoque." },
      { question: "Empilhadeiras têm cobertura?", answer: "Sim, com cobertura de equipamentos móveis e RC para operação." },
    ],
  },
  {
    slug: "escritorios",
    nome: "Escritórios",
    icon: "💼",
    subtitle: "Seguro Empresarial para escritórios e empresas de serviços",
    description: "Proteja seu escritório: computadores, mobiliário, documentos e responsabilidade profissional contra incêndio, roubo e danos elétricos.",
    detailedDescription: "Escritórios concentram equipamentos eletrônicos caros (notebooks, servidores, monitores) e documentação física crítica. Incêndios elétricos, alagamentos do andar superior e furto de equipamentos são os principais sinistros.\n\nIndicamos contratar também cobertura de Cyber para empresas que armazenam dados de clientes, e RC Profissional para consultorias, contadores, advogados e empresas de TI.",
    metaDescription: "Seguro para Escritórios: equipamentos, mobiliário, RC profissional, cyber e danos elétricos. Patro Seguros.",
    coverages: baseCoverages,
    whoNeeds: ["Escritórios de advocacia e contabilidade", "Consultorias e empresas de TI", "Imobiliárias e corretoras", "Agências de marketing e design", "Coworkings e salas comerciais"],
    faqs: [
      { question: "Notebooks e equipamentos eletrônicos estão cobertos?", answer: "Sim, com Roubo Qualificado e Danos Elétricos. Para uso fora do escritório, contrate Equipamentos Portáteis." },
      { question: "Documentos físicos são cobertos?", answer: "Sim, com cobertura específica para Reconstituição de Documentos." },
      { question: "Posso incluir RC Profissional?", answer: "Sim, recomendamos para advogados, contadores, engenheiros e consultores." },
    ],
  },
  {
    slug: "farmacias",
    nome: "Farmácias",
    icon: "💊",
    subtitle: "Seguro Empresarial para farmácias e drogarias",
    description: "Proteção para o estoque farmacêutico, equipamentos de refrigeração, automação e RC para clientes.",
    detailedDescription: "Farmácias têm estoque de alto valor agregado, com medicamentos termolábeis (vacinas, insulinas) que exigem refrigeração contínua. Os principais riscos são furto qualificado, perda de medicamentos por queda de energia e RC por dispensação incorreta.\n\nO seguro contempla equipamentos como geladeiras farmacêuticas, sistemas de automação e câmeras, além de cobertura específica para perda de medicamentos refrigerados.",
    metaDescription: "Seguro para Farmácias e Drogarias: estoque, refrigeração de medicamentos, roubo, RC. Patro Seguros.",
    coverages: baseCoverages,
    whoNeeds: ["Farmácias independentes", "Drogarias de bairro", "Farmácias de manipulação", "Franquias farmacêuticas", "Drogarias 24h"],
    faqs: [
      { question: "Perda de medicamentos refrigerados é coberta?", answer: "Sim, com cobertura específica de Deterioração por Falta de Energia." },
      { question: "Furto de medicamentos controlados?", answer: "Sim, com Roubo Qualificado. Declare corretamente o valor do estoque." },
      { question: "Cobre erro de dispensação?", answer: "Sim, com RC Profissional contratada à parte." },
    ],
  },
  {
    slug: "perfumaria",
    nome: "Perfumarias",
    icon: "🧴",
    subtitle: "Seguro Empresarial para lojas de perfumaria e cosméticos",
    description: "Proteja perfumes importados, cosméticos e equipamentos contra incêndio, roubo e danos por água.",
    detailedDescription: "Perfumarias trabalham com produtos de alto valor unitário (perfumes importados podem custar centenas de reais por unidade) e são alvo frequente de furto. O seguro empresarial cobre o estoque, vitrines de exposição, equipamentos de PDV e RC para clientes.\n\nProdutos cosméticos são sensíveis a temperatura e umidade — alagamentos podem inutilizar lotes inteiros. Recomendamos a cobertura de Danos por Água sempre.",
    metaDescription: "Seguro para Perfumarias e Cosméticos: estoque importado, vitrines, roubo, RC. Patro Seguros.",
    coverages: baseCoverages,
    whoNeeds: ["Perfumarias e lojas de cosméticos", "Franquias de beleza", "Lojas de produtos importados", "Distribuidores de cosméticos", "Lojas em shopping e rua"],
    faqs: [
      { question: "Perfumes importados têm cobertura integral?", answer: "Sim, declarando o valor real do estoque na apólice." },
      { question: "Cobre roubo de produtos da vitrine?", answer: "Sim, com Roubo Qualificado e Quebra de Vidros." },
      { question: "Alagamento estraga cosméticos. É coberto?", answer: "Sim, com cobertura de Danos por Água e Alagamento." },
    ],
  },
  {
    slug: "salao-de-beleza",
    nome: "Salões de Beleza",
    icon: "💇",
    subtitle: "Seguro Empresarial para salões, barbearias e estúdios de beleza",
    description: "Proteção para equipamentos, cadeiras, produtos e RC profissional contra incêndio, roubo e danos a clientes.",
    detailedDescription: "Salões de beleza usam equipamentos elétricos de alta potência (secadores, chapinhas, lavatórios) e produtos químicos (tinturas, alisamentos) que podem causar incêndios ou reações alérgicas em clientes. O seguro protege o estabelecimento e oferece RC para situações de queimaduras, alergias ou danos capilares.\n\nIndicamos cobertura específica de RC Profissional para o salão e seus profissionais, evitando que processos de clientes insatisfeitos comprometam o negócio.",
    metaDescription: "Seguro para Salões de Beleza e Barbearias: equipamentos, RC profissional, incêndio e roubo. Patro Seguros.",
    coverages: baseCoverages,
    whoNeeds: ["Salões de cabeleireiros", "Barbearias modernas", "Esmalterias e studios de unhas", "Estúdios de sobrancelha e estética", "Studios de tatuagem e piercing"],
    faqs: [
      { question: "Cobre alergia ou queimadura em cliente?", answer: "Sim, com RC Profissional para o salão e seus profissionais contratados." },
      { question: "Equipamentos como secadores e chapinhas?", answer: "Sim, com Danos Elétricos e Roubo Qualificado." },
      { question: "E se houver incêndio causado por produto químico?", answer: "Coberto pela apólice de Incêndio do Seguro Empresarial." },
    ],
  },
  {
    slug: "pet-shops",
    nome: "Pet Shops",
    icon: "🐶",
    subtitle: "Seguro Empresarial para pet shops, banho e tosa e clínicas veterinárias",
    description: "Proteção para estoque, equipamentos de banho e tosa, animais sob guarda e RC para tutores.",
    detailedDescription: "Pet shops combinam varejo (rações, brinquedos, acessórios) com prestação de serviços (banho, tosa, hospedagem). Os principais riscos são furto, incêndio em estoque de ração, fugas/lesões em animais sob guarda e processos de tutores.\n\nO seguro pode incluir cobertura específica de Animais sob Guarda — fundamental para hotéis para pets, day cares e clínicas com internação.",
    metaDescription: "Seguro para Pet Shops e Clínicas Veterinárias: estoque, equipamentos, animais sob guarda. Patro Seguros.",
    coverages: baseCoverages,
    whoNeeds: ["Pet shops e agropecuárias", "Banho e tosa", "Clínicas e hospitais veterinários", "Hotéis e day cares para pets", "Franquias pet"],
    faqs: [
      { question: "Cobre fuga ou morte de animal sob guarda?", answer: "Sim, com cobertura específica de Animais sob Guarda." },
      { question: "Equipamentos de banho e tosa têm cobertura?", answer: "Sim, com Danos Elétricos e Roubo Qualificado." },
      { question: "Posso contratar RC veterinária junto?", answer: "Sim, recomendamos RC Profissional para clínicas com atendimento e cirurgia." },
    ],
  },
  {
    slug: "consultorios-e-clinicas",
    nome: "Consultórios e Clínicas",
    icon: "🩺",
    subtitle: "Seguro Empresarial para consultórios médicos, odontológicos e clínicas",
    description: "Proteja equipamentos médicos, mobiliário, prontuários e RC profissional contra incêndio, roubo e processos de pacientes.",
    detailedDescription: "Consultórios e clínicas têm equipamentos de altíssimo valor (cadeiras odontológicas, raio-X, equipamentos cirúrgicos) e operam sob risco constante de processos por erro médico. O seguro empresarial protege o patrimônio físico, e a RC Profissional Médica/Odontológica cobre indenizações por erro técnico.\n\nClínicas que armazenam medicamentos refrigerados (vacinas, biológicos) precisam de cobertura específica de Deterioração por Falta de Energia.",
    metaDescription: "Seguro para Consultórios e Clínicas: equipamentos médicos, RC profissional, incêndio e roubo. Patro Seguros.",
    coverages: baseCoverages,
    whoNeeds: ["Consultórios médicos", "Clínicas multidisciplinares", "Consultórios odontológicos", "Clínicas de estética e dermatologia", "Clínicas de fisioterapia e psicologia"],
    faqs: [
      { question: "Equipamentos médicos caros estão cobertos?", answer: "Sim, declarando o valor de cada equipamento na apólice." },
      { question: "RC Médica está incluída?", answer: "Pode ser contratada à parte como RC Profissional Médica ou Odontológica." },
      { question: "Prontuários físicos têm cobertura?", answer: "Sim, com cobertura de Reconstituição de Documentos." },
    ],
  },
  {
    slug: "escolas",
    nome: "Escolas",
    icon: "🎓",
    subtitle: "Seguro Empresarial para escolas, creches e cursos",
    description: "Proteção para infraestrutura, equipamentos pedagógicos, alunos e RC para acidentes durante atividades escolares.",
    detailedDescription: "Escolas precisam proteger não apenas o patrimônio físico (laboratórios, biblioteca, equipamentos audiovisuais) mas também responsabilidade civil pelos alunos durante o expediente escolar. Acidentes em quadras esportivas, escadas e durante atividades extracurriculares são frequentes.\n\nRecomendamos cobertura ampla de RC para alunos, professores e visitantes, além de Acidentes Pessoais Coletivo para os alunos.",
    metaDescription: "Seguro para Escolas, Creches e Cursos: infraestrutura, equipamentos, RC alunos. Patro Seguros.",
    coverages: baseCoverages,
    whoNeeds: ["Escolas de educação infantil e fundamental", "Creches e berçários", "Escolas de ensino médio", "Cursos profissionalizantes", "Escolas de idiomas e reforço"],
    faqs: [
      { question: "Cobre acidentes com alunos?", answer: "Sim, com RC para alunos e Acidentes Pessoais Coletivo (recomendado)." },
      { question: "Equipamentos de laboratório e informática?", answer: "Sim, com Danos Elétricos e Roubo Qualificado." },
      { question: "Atividades fora da escola (passeios) são cobertas?", answer: "Sim, com cobertura específica para Atividades Extracurriculares." },
    ],
  },
  {
    slug: "hoteis-e-pousadas",
    nome: "Hotéis e Pousadas",
    icon: "🏨",
    subtitle: "Seguro Empresarial para hotéis, pousadas e hospedagens",
    description: "Proteção para estrutura, mobiliário, hóspedes e RC para acidentes nas dependências.",
    detailedDescription: "Hotéis e pousadas concentram alto valor em mobiliário, eletrodomésticos, roupas de cama e equipamentos de cozinha. Os principais riscos incluem incêndio, roubo, danos por hóspedes e acidentes em piscinas, escadas e áreas comuns.\n\nA RC Hoteleira é fundamental e cobre situações de furto de pertences de hóspedes em quartos e cofres, intoxicação alimentar e acidentes durante a hospedagem.",
    metaDescription: "Seguro para Hotéis e Pousadas: estrutura, mobiliário, RC hoteleira e hóspedes. Patro Seguros.",
    coverages: baseCoverages,
    whoNeeds: ["Hotéis urbanos e resorts", "Pousadas e hostels", "Apart-hotéis e flats", "Hotéis-fazenda", "Hospedagem por temporada"],
    faqs: [
      { question: "Furto de pertences de hóspedes é coberto?", answer: "Sim, com cobertura de Bens de Hóspedes na RC Hoteleira." },
      { question: "E acidente em piscina ou escada?", answer: "Sim, com Responsabilidade Civil Hoteleira ampla." },
      { question: "Cobre intoxicação alimentar no restaurante do hotel?", answer: "Sim, com RC Produtos contratada." },
    ],
  },
  {
    slug: "outros",
    nome: "Outros Segmentos",
    icon: "🏢",
    subtitle: "Seguro Empresarial customizado para o seu segmento",
    description: "Não encontrou seu ramo? Montamos uma apólice sob medida para o seu negócio. Atendemos comércio, serviços e indústria.",
    detailedDescription: "Cada negócio tem riscos únicos. Atendemos centenas de segmentos não listados acima: oficinas mecânicas, autopeças, papelarias, livrarias, lojas de departamento, distribuidoras, transportadoras, postos de combustível, lavanderias, gráficas, indústrias e muito mais.\n\nNossos especialistas analisam o seu negócio e montam uma cobertura sob medida com até 16 seguradoras parceiras, garantindo o melhor custo-benefício.",
    metaDescription: "Seguro Empresarial para todos os segmentos: comércio, serviços e indústria. Patro Seguros.",
    coverages: baseCoverages,
    whoNeeds: ["Comércio em geral", "Prestadores de serviço", "Pequenas indústrias", "Distribuidoras e atacadistas", "Franquias de qualquer segmento"],
    faqs: [
      { question: "Qual valor mínimo para contratar?", answer: "A partir de R$ 59/mês para pequenos negócios. O valor varia conforme o ramo, estoque e coberturas." },
      { question: "Quanto tempo demora a cotação?", answer: "Em média 2 horas úteis após o envio dos dados do negócio." },
      { question: "Posso contratar mesmo sem CNPJ?", answer: "MEIs e profissionais autônomos também podem contratar coberturas adequadas ao porte." },
    ],
  },
];

export const findSegmento = (slug: string) =>
  segmentos.find((s) => s.slug === slug);
