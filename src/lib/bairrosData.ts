import imgJardimMaia from "@/assets/bairros/jardim-maia.webp";
import imgVilaAugusta from "@/assets/bairros/vila-augusta.webp";
import imgCumbica from "@/assets/bairros/cumbica.webp";
import imgCentro from "@/assets/bairros/centro.webp";
import imgPicanco from "@/assets/bairros/picanco.webp";
import imgMacedo from "@/assets/bairros/macedo.webp";
import imgGopouva from "@/assets/bairros/gopouva.webp";
import imgBonsucesso from "@/assets/bairros/bonsucesso.webp";
import imgParaventi from "@/assets/bairros/paraventi.webp";
import imgContinental from "@/assets/bairros/continental.webp";

export interface BairroFAQ {
  question: string;
  answer: string;
}

export interface BairroData {
  id: string;
  nome: string;
  foco: string;
  subtitulo: string;
  descricao: string;
  image: string;
  faqs: BairroFAQ[];
}

export const bairros: BairroData[] = [
  {
    id: "jardim-maia",
    nome: "Jardim Maia",
    foco: "Seguros de Alto Padrão e Vida",
    subtitulo: "Proteção premium para quem vive no coração verde de Guarulhos",
    descricao: "No Jardim Maia, onde o Bosque Maia e a Av. Paulo Faccini atraem moradores de alto padrão e valorizam imóveis, a Patro Seguros oferece soluções sob medida: seguro residencial completo para apartamentos de luxo, seguro auto para veículos premium e proteção patrimonial à altura do bairro mais nobre de Guarulhos. Nossa equipe conhece a região e atende com a agilidade que você merece.",
    image: imgJardimMaia,
    faqs: [
      { question: "Qual o melhor seguro residencial para o Jardim Maia?", answer: "O Jardim Maia é uma região de alto padrão com imóveis valorizados. Recomendamos seguros residenciais com cobertura ampla incluindo danos elétricos, roubo e responsabilidade civil, adequados ao valor dos imóveis próximos ao Bosque Maia e à Av. Paulo Faccini." },
      { question: "Seguro auto no Jardim Maia custa mais caro?", answer: "O valor do seguro auto varia conforme o veículo, perfil do motorista e CEP. No Jardim Maia, por ser um bairro com boa infraestrutura e segurança, os valores podem ser competitivos. A Patro compara entre as melhores seguradoras para encontrar o melhor custo-benefício." },
      { question: "A Patro Seguros atende presencialmente no Jardim Maia?", answer: "Sim! Nossa sede fica na Av. Salgado Filho, a poucos minutos do Jardim Maia. Atendemos presencialmente e também via WhatsApp com resposta em até 2 horas." },
    ],
  },
  {
    id: "vila-augusta",
    nome: "Vila Augusta",
    foco: "Seguro Auto e Apartamentos",
    subtitulo: "Seguros para o bairro que mais cresce em Guarulhos",
    descricao: "A Vila Augusta vive um verdadeiro boom imobiliário. Entre o Parque Fracalanza, o acesso rápido à Dutra e a proximidade do Shopping Internacional, novos moradores e investidores chegam todos os dias. A Patro Seguros acompanha essa transformação com seguros auto competitivos, seguro residencial para novos empreendimentos e proteção completa para quem está construindo vida na Vila Augusta.",
    image: imgVilaAugusta,
    faqs: [
      { question: "Preciso de seguro para apartamento novo na Vila Augusta?", answer: "Sim, é fundamental. Com o boom imobiliário na Vila Augusta, proteger seu novo apartamento contra incêndio, roubo e danos elétricos é essencial. O seguro residencial também cobre responsabilidade civil e assistência 24h." },
      { question: "Qual seguro auto mais indicado para quem mora na Vila Augusta?", answer: "Pela proximidade com a Dutra e o Shopping Internacional, recomendamos seguro auto com cobertura completa incluindo colisão, roubo/furto e assistência 24h. A Patro compara cotações entre diversas seguradoras." },
      { question: "A Patro Seguros cobre seguros para investidores imobiliários na Vila Augusta?", answer: "Sim! Oferecemos seguro imobiliário, seguro fiança locatícia e seguro de condomínio para investidores e proprietários de imóveis na Vila Augusta." },
    ],
  },
  {
    id: "cumbica",
    nome: "Cumbica",
    foco: "Logística, Carga e Frota",
    subtitulo: "Proteção especializada para o polo logístico de Guarulhos",
    descricao: "Cumbica é sinônimo de logística. Com o Aeroporto Internacional de Guarulhos e o maior Polo Industrial do estado, a região demanda seguros empresariais robustos. A Patro Seguros é referência em seguro de carga, seguro de galpões, RC para transportadoras e proteção patrimonial para empresas que operam no coração logístico do Brasil.",
    image: imgCumbica,
    faqs: [
      { question: "Quais seguros empresariais são essenciais em Cumbica?", answer: "Para empresas em Cumbica, recomendamos seguro empresarial com cobertura para galpões, seguro de carga/transporte, RC para transportadoras e seguro de frota. A Patro é especialista em proteção para o polo logístico do Aeroporto." },
      { question: "A Patro Seguros faz seguro de carga para empresas de Cumbica?", answer: "Sim! Somos especialistas em seguro de transporte e carga, atendendo transportadoras e operadores logísticos da região de Cumbica e do Aeroporto Internacional de Guarulhos." },
      { question: "Seguro de galpão em Cumbica, como funciona?", answer: "O seguro de galpão protege contra incêndio, roubo, danos elétricos e responsabilidade civil. Para galpões no polo logístico de Cumbica, oferecemos coberturas especiais para mercadorias armazenadas e lucros cessantes." },
    ],
  },
  {
    id: "centro",
    nome: "Centro",
    foco: "RC Profissional e Comércio",
    subtitulo: "Sua corretora no coração comercial de Guarulhos",
    descricao: "O Centro de Guarulhos pulsa com comércio e serviços. Na Av. Salgado Filho — onde fica nossa sede — e nas imediações do Poli Shopping, advogados, dentistas, médicos e comerciantes precisam de proteção profissional. A Patro Seguros oferece RC Profissional, seguro empresarial para lojas e consultórios, além de planos de saúde corporativos, tudo com atendimento presencial a poucos passos de você.",
    image: imgCentro,
    faqs: [
      { question: "Onde fica a sede da Patro Seguros no Centro de Guarulhos?", answer: "Nossa sede fica na Av. Salgado Filho, 2120 – Sala 219, no Centro de Guarulhos, próximo ao Poli Shopping. Atendemos presencialmente de segunda a sexta, das 8h às 18h." },
      { question: "A Patro faz seguro RC para profissionais liberais do Centro?", answer: "Sim! Oferecemos Responsabilidade Civil Profissional para advogados, médicos, dentistas, engenheiros e outros profissionais que atuam no Centro de Guarulhos." },
      { question: "Quais seguros para lojas no Centro de Guarulhos?", answer: "Para lojistas do Centro e Poli Shopping, oferecemos seguro empresarial completo com cobertura contra incêndio, roubo, danos elétricos, RC e lucros cessantes." },
    ],
  },
  {
    id: "picanco",
    nome: "Picanço",
    foco: "Seguro Auto Familiar",
    subtitulo: "Proteção para famílias no coração residencial de Guarulhos",
    descricao: "O Picanço é um bairro de famílias. Com acesso fácil pela Avenida Transguarulhense e vizinhança tranquila, quem mora aqui busca segurança no dia a dia. A Patro Seguros entende essa necessidade: seguro auto com assistência 24h, seguro residencial com cobertura ampla e seguro de vida para proteger quem você ama. Atendimento rápido e humano para a família do Picanço.",
    image: imgPicanco,
    faqs: [
      { question: "Seguro auto no Picanço tem bom custo-benefício?", answer: "Sim! O Picanço é um bairro residencial tranquilo, o que pode contribuir para valores competitivos de seguro auto. A Patro compara entre diversas seguradoras para encontrar a melhor proposta." },
      { question: "Qual seguro de vida indicado para famílias do Picanço?", answer: "Recomendamos seguro de vida individual ou familiar com cobertura por morte, invalidez e assistência funeral. Proteja sua família com planos a partir de valores acessíveis." },
      { question: "A Patro atende rápido moradores do Picanço?", answer: "Sim! Estamos a poucos minutos do Picanço, com atendimento via WhatsApp em até 2 horas e suporte presencial na nossa sede na Av. Salgado Filho." },
    ],
  },
  {
    id: "macedo",
    nome: "Macedo",
    foco: "Saúde PME e Clínicas",
    subtitulo: "Planos de saúde e seguros empresariais para o Macedo",
    descricao: "Próximo ao Hospital Bom Clima e com forte presença de pequenas e médias empresas, o Macedo é um bairro que une saúde e empreendedorismo. A Patro Seguros é especialista em planos de saúde empresariais para PMEs da região, seguro empresarial sob medida e seguro de vida em grupo para equipes. Proteja sua empresa e seus colaboradores com quem conhece o Macedo.",
    image: imgMacedo,
    faqs: [
      { question: "Qual o melhor plano de saúde empresarial para PMEs do Macedo?", answer: "A Patro trabalha com as principais operadoras (Amil, Bradesco Saúde, SulAmérica, etc.) e encontra o plano ideal para PMEs do Macedo, considerando o número de colaboradores e o orçamento da empresa." },
      { question: "Seguro empresarial para pequenos negócios no Macedo vale a pena?", answer: "Sim! Protege seu patrimônio contra incêndio, roubo e responsabilidade civil. Para PMEs do Macedo, oferecemos planos acessíveis e personalizados." },
      { question: "A Patro faz seguro de vida em grupo para empresas do Macedo?", answer: "Sim! O seguro de vida em grupo é um benefício valorizado pelos colaboradores e pode ser contratado a custos acessíveis para empresas de todos os portes no Macedo." },
    ],
  },
  {
    id: "gopouva",
    nome: "Gopouva",
    foco: "Seguros de Vida e Tradição",
    subtitulo: "Seguros com a tradição que Gopouva merece",
    descricao: "Gopouva é tradição. Desde a histórica Igreja de Santo Antônio até o comércio consolidado, o bairro respira comunidade. A Patro Seguros honra essa tradição com atendimento personalizado, seguro residencial para casas e apartamentos do bairro, seguro auto e planos de saúde individuais e familiares. Confiança construída ao longo dos anos, assim como Gopouva.",
    image: imgGopouva,
    faqs: [
      { question: "Seguro residencial em Gopouva cobre casas antigas?", answer: "Sim! O seguro residencial cobre tanto casas quanto apartamentos, independentemente da idade do imóvel. Para casas mais antigas em Gopouva, recomendamos coberturas extras para danos elétricos e hidráulicos." },
      { question: "Plano de saúde individual em Gopouva, onde contratar?", answer: "A Patro Seguros oferece planos de saúde individuais e familiares das melhores operadoras, com atendimento próximo ao Gopouva. Compare opções e valores conosco." },
      { question: "A Patro Seguros é de confiança?", answer: "Sim! Somos uma corretora registrada na SUSEP com nota 4.9 no Google e centenas de avaliações positivas. Atendemos Gopouva e toda Guarulhos com transparência e agilidade." },
    ],
  },
  {
    id: "bonsucesso",
    nome: "Bonsucesso",
    foco: "Empresarial e Logística",
    subtitulo: "Seguros para o bairro em expansão de Guarulhos",
    descricao: "Bonsucesso cresce com o Shopping Bonsucesso como âncora e acesso direto à Dutra, com novos empreendimentos surgindo a cada mês. A região combina logística, comércio e residências. A Patro Seguros acompanha essa expansão com seguro empresarial para novos negócios, seguro auto para moradores e proteção patrimonial para investidores que apostam no futuro de Bonsucesso.",
    image: imgBonsucesso,
    faqs: [
      { question: "Quais seguros para novas empresas em Bonsucesso?", answer: "Para novos negócios em Bonsucesso, recomendamos seguro empresarial com cobertura contra incêndio e roubo, RC, e seguro de vida para sócios. A região em expansão demanda proteção desde o primeiro dia." },
      { question: "Seguro auto em Bonsucesso é caro?", answer: "Os valores dependem do veículo e perfil do motorista. A Patro compara cotações entre diversas seguradoras para encontrar o melhor preço para moradores de Bonsucesso." },
      { question: "A Patro cobre seguro para lojas no Shopping Bonsucesso?", answer: "Sim! Oferecemos seguro empresarial específico para lojas em shopping, com cobertura contra incêndio, roubo, danos a terceiros e lucros cessantes." },
    ],
  },
  {
    id: "paraventi",
    nome: "Paraventi",
    foco: "Auto e Saúde Individual",
    subtitulo: "Proteção acessível para moradores do Paraventi",
    descricao: "O Paraventi, com a região do SESI como referência local, reúne famílias trabalhadoras que buscam proteção inteligente. A Patro Seguros oferece seguro auto com excelente custo-benefício, planos de saúde individuais acessíveis e seguro residencial completo. Atendimento ágil via WhatsApp e presencial para toda a comunidade do Paraventi.",
    image: imgParaventi,
    faqs: [
      { question: "Seguro auto barato no Paraventi, como encontrar?", answer: "A Patro Seguros compara cotações entre diversas seguradoras para encontrar o seguro auto mais acessível para moradores do Paraventi, sem abrir mão da qualidade de cobertura." },
      { question: "Plano de saúde individual acessível no Paraventi existe?", answer: "Sim! Trabalhamos com operadoras que oferecem planos individuais a partir de valores acessíveis, com boa rede de atendimento na região do Paraventi e Guarulhos." },
      { question: "Como contratar seguro pelo WhatsApp no Paraventi?", answer: "Basta enviar uma mensagem para nosso WhatsApp (11) 5199-7500 informando seu interesse. Respondemos em até 2 horas com uma cotação personalizada para moradores do Paraventi." },
    ],
  },
  {
    id: "continental",
    nome: "Continental",
    foco: "Residencial e Proteção Familiar",
    subtitulo: "Seguros para a maior densidade populacional de Guarulhos",
    descricao: "O Continental é um dos bairros mais populosos de Guarulhos. Com alta densidade de condomínios e apartamentos, a demanda por seguro residencial, seguro de condomínio e seguro auto é enorme. A Patro Seguros atende o Continental com agilidade: cotações rápidas, sinistros resolvidos com prioridade e planos que cabem no bolso de quem vive nesta região vibrante.",
    image: imgContinental,
    faqs: [
      { question: "Seguro de condomínio no Continental é obrigatório?", answer: "Sim! O seguro de condomínio é obrigatório por lei (Lei 4.591/64). No Continental, com alta concentração de edifícios, a Patro ajuda síndicos a encontrar a melhor cobertura com preço justo." },
      { question: "Seguro residencial para apartamento no Continental, quanto custa?", answer: "O seguro residencial para apartamentos costuma ter valores acessíveis. No Continental, cotamos entre diversas seguradoras para encontrar o melhor preço com cobertura completa." },
      { question: "A Patro atende todo o Continental de Guarulhos?", answer: "Sim! Atendemos todas as regiões do Continental com agilidade via WhatsApp e presencialmente na nossa sede na Av. Salgado Filho, com resposta em até 2 horas." },
    ],
  },
];