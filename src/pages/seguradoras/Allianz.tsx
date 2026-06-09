import InsurerPageTemplate from "@/components/InsurerPageTemplate";

const AllianzGuarulhos = () => (
  <InsurerPageTemplate 
    insurer="Allianz"
    accentColor="#003781"
    description="Líder global em seguros, a Allianz oferece em Guarulhos proteção robusta para veículos de passeio, frotas e automóveis premium com assistência técnica de ponta."
    keywords={["AllianzGuarulhos", "SeguroAllianzAuto", "CorretorAllianzGuarulhos", "AllianzSegurosPreço"]}
    benefits={[
      "Rede de oficinas exclusivas Allianz em Guarulhos",
      "Cobertura internacional para países do Mercosul",
      "Carro reserva por tempo indeterminado (conforme plano)",
      "App Allianz para gestão completa de sinistros e assistência",
      "Condições especiais para frotas de empresas em Cumbica"
    ]}
    history="A Allianz é uma das maiores empresas de serviços financeiros do mundo. No Brasil, herdou a tradição da antiga SulAmérica Auto e hoje foca em oferecer seguros inteligentes com tecnologia alemã, sendo ideal para quem busca segurança máxima para seu patrimônio."
    faqs={[
      {
        q: "Seguro Allianz é bom para quem mora em Guarulhos?",
        a: "Sim! A Allianz é excelente, especialmente pela agilidade nos processos digitais e pela forte rede credenciada na região metropolitana de São Paulo e Guarulhos."
      },
      {
        q: "A Allianz cobre motorista de aplicativo em Guarulhos?",
        a: "Sim, a Allianz possui coberturas específicas para quem exerce atividade remunerada (EAR), sendo uma das melhores opções para motoristas de Uber e 99 na cidade."
      },
      {
        q: "Como funciona o guincho da Allianz em Guarulhos?",
        a: "A Allianz oferece planos de guincho que vão de 200km até quilometragem ilimitada. Em Guarulhos, os prestadores são rápidos e o acionamento pode ser feito 100% pelo aplicativo."
      },
      {
        q: "Vale a pena contratar Allianz para carros de luxo?",
        a: "Com certeza. A Allianz é especialista em veículos premium, oferecendo reparos com peças originais e atendimento diferenciado para modelos de alto valor."
      }
    ]}
  />
);

export default AllianzGuarulhos;