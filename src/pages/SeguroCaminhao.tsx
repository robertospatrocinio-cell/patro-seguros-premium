import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const SeguroCaminhao = () => {
  return (
    <InsurancePageTemplate
      title="Seguro de Caminhão"
      subtitle="Proteção completa para caminhões, carretas e veículos pesados"
      icon="🚛"
      metaDescription="Seguro de Caminhão para autônomos e transportadoras. Cobertura contra roubo, colisão, tombamento e RC. Proteção para carretas e cavalos mecânicos. Cotação grátis."
      description="O Seguro de Caminhão é fundamental para proteger o patrimônio de caminhoneiros autônomos, transportadoras e empresas que dependem de veículos pesados. Caminhões estão expostos a riscos específicos como roubo de carga, tombamento, colisões em rodovias e danos a terceiros. A Patro Seguros oferece coberturas completas e personalizadas, comparando as melhores seguradoras do mercado para garantir a proteção ideal para o seu caminhão, carreta ou cavalo mecânico."
      coverages={[
        { title: "Colisão e Capotamento", description: "Cobertura para danos ao caminhão em acidentes de trânsito e tombamentos" },
        { title: "Roubo e Furto", description: "Indenização integral ou parcial em caso de roubo ou furto do veículo" },
        { title: "Incêndio e Explosão", description: "Proteção contra danos causados por fogo, raio e explosão" },
        { title: "Responsabilidade Civil", description: "Cobertura para danos materiais e corporais causados a terceiros" },
        { title: "Assistência 24 Horas", description: "Guincho, troca de pneu, socorro mecânico e hospedagem em rodovias" },
        { title: "Vidros e Faróis", description: "Cobertura para para-brisas, vidros laterais e faróis" },
        { title: "Acessórios e Implementos", description: "Proteção para baú, carroceria, equipamentos e acessórios instalados" },
        { title: "Danos a Carga", description: "Cobertura complementar para mercadorias transportadas em caso de sinistro" },
      ]}
      whoNeeds={[
        "Caminhoneiros autônomos e agregados",
        "Transportadoras de todos os portes",
        "Empresas com frota de veículos pesados",
        "Proprietários de carretas e cavalos mecânicos",
        "Operadores logísticos e distribuidores",
        "Empresas de mudança e transporte de cargas especiais",
      ]}
      whyPatro={[
        "Especialistas em seguros para veículos pesados",
        "Cotação com múltiplas seguradoras especializadas",
        "Coberturas personalizadas por tipo de carga e operação",
        "Assistência 24h em rodovias de todo o Brasil",
        "Suporte ágil em sinistros para minimizar paradas",
        "Condições especiais para frotas de caminhões",
      ]}
      faqs={[
        { question: "Quanto custa o seguro de caminhão?", answer: "O valor depende do modelo, ano, tipo de carga transportada, região de operação e perfil do motorista. Caminhões mais novos e rotas menos arriscadas tendem a ter valores menores. Solicite uma cotação gratuita." },
        { question: "Seguro de caminhão cobre a carga?", answer: "O seguro do veículo pode incluir cobertura complementar para carga, mas para proteção completa de mercadorias recomendamos o Seguro de Transporte (RCTR-C), que é específico para cargas." },
        { question: "Caminhoneiro autônomo consegue contratar?", answer: "Sim! Trabalhamos com seguradoras que atendem tanto caminhoneiros autônomos quanto frotas empresariais, com condições adequadas para cada perfil." },
        { question: "O seguro cobre tombamento?", answer: "Sim, tombamento é coberto pela cobertura de colisão/capotamento. É um dos sinistros mais comuns em caminhões e está incluído nas coberturas básicas." },
        { question: "Existe desconto para frota de caminhões?", answer: "Sim! Seguradoras oferecem condições especiais para frotas. Quanto maior a frota e melhor o histórico de sinistros, melhores as condições." },
      ]}
      relatedInsurances={[
        { title: "Seguro de Frota", link: "/seguro-frota" },
        { title: "Seguro de Transporte", link: "/seguro-transporte" },
        { title: "Seguro Auto", link: "/seguro-auto" },
        { title: "Seguro RC", link: "/seguro-rc" },
      ]}
    />
  );
};

export default SeguroCaminhao;
