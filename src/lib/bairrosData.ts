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

export interface BairroData {
  id: string;
  nome: string;
  foco: string;
  subtitulo: string;
  descricao: string;
  image: string;
}

export const bairros: BairroData[] = [
  {
    id: "jardim-maia",
    nome: "Jardim Maia",
    foco: "Alto Padrão",
    subtitulo: "Proteção premium para quem vive no coração verde de Guarulhos",
    descricao: "No Jardim Maia, onde o Bosque Maia e a Av. Paulo Faccini atraem moradores de alto padrão e valorizam imóveis, a Patro Seguros oferece soluções sob medida: seguro residencial completo para apartamentos de luxo, seguro auto para veículos premium e proteção patrimonial à altura do bairro mais nobre de Guarulhos. Nossa equipe conhece a região e atende com a agilidade que você merece.",
    image: imgJardimMaia,
  },
  {
    id: "vila-augusta",
    nome: "Vila Augusta",
    foco: "Boom Imobiliário & Auto",
    subtitulo: "Seguros para o bairro que mais cresce em Guarulhos",
    descricao: "A Vila Augusta vive um verdadeiro boom imobiliário. Entre o Parque Fracalanza, o acesso rápido à Dutra e a proximidade do Shopping Internacional, novos moradores e investidores chegam todos os dias. A Patro Seguros acompanha essa transformação com seguros auto competitivos, seguro residencial para novos empreendimentos e proteção completa para quem está construindo vida na Vila Augusta.",
    image: imgVilaAugusta,
  },
  {
    id: "cumbica",
    nome: "Cumbica",
    foco: "Logístico & Empresarial",
    subtitulo: "Proteção especializada para o polo logístico de Guarulhos",
    descricao: "Cumbica é sinônimo de logística. Com o Aeroporto Internacional de Guarulhos e o maior polo logístico do estado, a região demanda seguros empresariais robustos. A Patro Seguros é referência em seguro de carga, seguro de galpões, RC para transportadoras e proteção patrimonial para empresas que operam no coração logístico do Brasil.",
    image: imgCumbica,
  },
  {
    id: "centro",
    nome: "Centro",
    foco: "Profissional Liberal & Comércio",
    subtitulo: "Sua corretora no coração comercial de Guarulhos",
    descricao: "O Centro de Guarulhos pulsa com comércio e serviços. Na Av. Salgado Filho — onde fica nossa sede — e nas imediações do Poli Shopping, advogados, dentistas, médicos e comerciantes precisam de proteção profissional. A Patro Seguros oferece RC Profissional, seguro empresarial para lojas e consultórios, além de planos de saúde corporativos, tudo com atendimento presencial a poucos passos de você.",
    image: imgCentro,
  },
  {
    id: "picanco",
    nome: "Picanço",
    foco: "Família & Auto",
    subtitulo: "Proteção para famílias no coração residencial de Guarulhos",
    descricao: "O Picanço é um bairro de famílias. Com acesso fácil pela Transguarulhense e vizinhança tranquila, quem mora aqui busca segurança no dia a dia. A Patro Seguros entende essa necessidade: seguro auto com assistência 24h, seguro residencial com cobertura ampla e seguro de vida para proteger quem você ama. Atendimento rápido e humano para a família do Picanço.",
    image: imgPicanco,
  },
  {
    id: "macedo",
    nome: "Macedo",
    foco: "Saúde & PME",
    subtitulo: "Planos de saúde e seguros empresariais para o Macedo",
    descricao: "Próximo ao Hospital Bom Clima e com forte presença de pequenas e médias empresas, o Macedo é um bairro que une saúde e empreendedorismo. A Patro Seguros é especialista em planos de saúde empresariais para PMEs da região, seguro empresarial sob medida e seguro de vida em grupo para equipes. Proteja sua empresa e seus colaboradores com quem conhece o Macedo.",
    image: imgMacedo,
  },
  {
    id: "gopouva",
    nome: "Gopouva",
    foco: "Tradição & Comunidade",
    subtitulo: "Seguros com a tradição que Gopouva merece",
    descricao: "Gopouva é tradição. Desde a histórica Igreja de Santo Antônio até o comércio consolidado, o bairro respira comunidade. A Patro Seguros honra essa tradição com atendimento personalizado, seguro residencial para casas e apartamentos do bairro, seguro auto e planos de saúde individuais e familiares. Confiança construída ao longo dos anos, assim como Gopouva.",
    image: imgGopouva,
  },
  {
    id: "bonsucesso",
    nome: "Bonsucesso",
    foco: "Logística & Expansão",
    subtitulo: "Seguros para o bairro em expansão de Guarulhos",
    descricao: "Bonsucesso cresce com o Shopping Bonsucesso como âncora e novos empreendimentos surgindo a cada mês. A região combina logística, comércio e residências. A Patro Seguros acompanha essa expansão com seguro empresarial para novos negócios, seguro auto para moradores e proteção patrimonial para investidores que apostam no futuro de Bonsucesso.",
    image: imgBonsucesso,
  },
  {
    id: "paraventi",
    nome: "Paraventi",
    foco: "Auto & Saúde Individual",
    subtitulo: "Proteção acessível para moradores do Paraventi",
    descricao: "O Paraventi, com o SESI como referência local, reúne famílias trabalhadoras que buscam proteção inteligente. A Patro Seguros oferece seguro auto com excelente custo-benefício, planos de saúde individuais acessíveis e seguro residencial completo. Atendimento ágil via WhatsApp e presencial para toda a comunidade do Paraventi.",
    image: imgParaventi,
  },
  {
    id: "continental",
    nome: "Continental",
    foco: "Residencial Adensado",
    subtitulo: "Seguros para a maior densidade populacional de Guarulhos",
    descricao: "O Continental é um dos bairros mais populosos de Guarulhos. Com alta densidade de apartamentos e condomínios, a demanda por seguro residencial, seguro de condomínio e seguro auto é enorme. A Patro Seguros atende o Continental com agilidade: cotações rápidas, sinistros resolvidos com prioridade e planos que cabem no bolso de quem vive nesta região vibrante.",
    image: imgContinental,
  },
];
