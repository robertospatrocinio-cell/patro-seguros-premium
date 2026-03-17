import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-seguro-frota.webp";

const SeguroCaminhao = () => {
  return (
    <InsurancePageTemplate
      heroImage={heroImg}
      title="Seguro de Caminhão"
      subtitle="Proteção completa para caminhões, carretas e veículos pesados"
      icon="🚛"
      metaDescription="Seguro de Caminhão para autônomos e transportadoras. Cobertura contra roubo, colisão, tombamento e RC. Proteção para carretas e cavalos mecânicos. Cotação grátis."
      description="O Seguro de Caminhão é fundamental para proteger o patrimônio de caminhoneiros autônomos, transportadoras e empresas que dependem de veículos pesados."
      detailedDescription={`O caminhão não é apenas um veículo — é a ferramenta de trabalho e, muitas vezes, o maior patrimônio de um caminhoneiro autônomo ou de uma transportadora. Um caminhão novo pode custar de R$ 300.000 a R$ 900.000, e sem seguro, um único sinistro pode significar a falência.

Os riscos no transporte rodoviário brasileiro são elevados: o Brasil registra mais de 70.000 roubos de carga por ano, e estradas em más condições contribuem para altos índices de tombamento e acidentes. Além disso, caminhões percorrem milhares de quilômetros mensais em condições adversas.

O Seguro de Caminhão cobre desde roubo e colisão até responsabilidade civil por danos a terceiros, assistência 24h em rodovias e até danos à carga transportada. Na Patro Seguros, trabalhamos com seguradoras que entendem as particularidades do transporte rodoviário e oferecem condições especiais para caminhoneiros autônomos e frotas empresariais.`}
      howItWorks={[
        { step: "1", title: "Perfil do Caminhão", description: "Informamos marca, modelo, ano, tipo de carroceria, região de operação e tipo de carga transportada" },
        { step: "2", title: "Análise de Risco", description: "Avaliamos rotas, frequência de viagens, histórico do motorista e medidas de segurança (rastreador, etc.)" },
        { step: "3", title: "Cotação Comparativa", description: "Comparamos propostas de seguradoras especializadas em veículos pesados para o melhor custo-benefício" },
        { step: "4", title: "Proteção na Estrada", description: "Assistência 24h em todo o Brasil, guincho pesado, hospedagem e suporte completo em sinistros" },
      ]}
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
      coverageExclusions={[
        "Desgaste natural e manutenção preventiva do veículo",
        "Danos mecânicos sem relação com sinistro coberto",
        "Condutor sem habilitação adequada (categoria C, D ou E)",
        "Veículo com carga acima do peso permitido",
        "Uso do caminhão em atividades não declaradas na apólice",
        "Danos causados por uso de combustível adulterado",
      ]}
      pricingInfo={{
        intro: "O custo do seguro de caminhão varia conforme modelo, ano, tipo de operação e perfil do motorista.",
        factors: [
          "Marca, modelo e ano do caminhão",
          "Valor de mercado FIPE do veículo",
          "Tipo de carga transportada (cargas de alto risco custam mais)",
          "Região e rotas de operação",
          "Perfil do motorista (idade, experiência, histórico)",
          "Presença de rastreador e dispositivos de segurança",
        ],
        note: "Um caminhão de R$ 400.000 em operação de média distância pode custar de R$ 12.000 a R$ 25.000/ano de seguro (3% a 6% do valor). Caminhões com rastreador e bom histórico pagam menos. Frotas têm condições especiais.",
      }}
      realScenarios={[
        { title: "Tombamento em serra", description: "Um caminhão carregado tombou em descida de serra no Paraná. O seguro cobriu R$ 280.000 em danos ao veículo, R$ 45.000 em guincho pesado e R$ 15.000 em hospedagem e transporte do motorista." },
        { title: "Roubo de cavalo mecânico", description: "Um cavalo mecânico Scania avaliado em R$ 650.000 foi roubado em posto de combustível na BR-116. O seguro indenizou o valor integral de mercado em 30 dias." },
        { title: "Colisão com veículo de passeio", description: "Um caminhão colidiu com um carro em cruzamento, causando danos significativos ao terceiro e lesões leves. O RC cobriu R$ 95.000 em reparos e indenizações ao terceiro." },
      ]}
      importantDetails={[
        { title: "Rastreamento reduz o prêmio", content: "Caminhões com rastreador homologado podem ter descontos de 10% a 30% no valor do seguro. Além de economizar, o rastreamento aumenta as chances de recuperação em caso de roubo." },
        { title: "Implementos e carroceria", content: "Baú, carroceria, tanque, plataforma e outros implementos podem ter cobertura específica. Declare o valor de todos os itens agregados para garantir indenização completa." },
        { title: "Motorista cadastrado", content: "É fundamental que os motoristas habituais estejam cadastrados na apólice. Condutor não declarado pode resultar em perda de cobertura ou aplicação de franquia agravada." },
      ]}
      tips={[
        "Mantenha o rastreador sempre ativo e funcionando — além de segurança, reduz o prêmio do seguro",
        "Declare todos os motoristas que utilizam o caminhão para evitar problemas na hora do sinistro",
        "Informe corretamente o tipo de carga transportada — cargas não declaradas podem não ter cobertura",
        "Faça manutenção preventiva regular e guarde os comprovantes — mostra zelo com o veículo",
        "Em caso de sinistro, registre BO imediatamente e não movimente o veículo se possível",
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
        { question: "Quanto custa o seguro de caminhão?", answer: "De 3% a 6% do valor do veículo ao ano. Um caminhão de R$ 400.000 pode custar de R$ 12.000 a R$ 25.000/ano. Com rastreador e bom histórico, o valor cai significativamente." },
        { question: "Seguro de caminhão cobre a carga?", answer: "O seguro do veículo pode incluir cobertura complementar, mas para proteção completa de mercadorias recomendamos o Seguro de Transporte (RCTR-C)." },
        { question: "Caminhoneiro autônomo consegue contratar?", answer: "Sim! Trabalhamos com seguradoras que atendem tanto autônomos quanto frotas empresariais." },
        { question: "O seguro cobre tombamento?", answer: "Sim, tombamento é coberto pela cobertura de colisão/capotamento. É um dos sinistros mais comuns em caminhões." },
        { question: "Existe desconto para frota de caminhões?", answer: "Sim! Seguradoras oferecem condições especiais para frotas. Quanto maior a frota e melhor o histórico, melhores as condições." },
      ]}
      relatedInsurances={[
        { title: "Seguro de Frota", link: "/seguro-frota" },
        { title: "Seguro de Transporte", link: "/seguro-transporte" },
        { title: "Seguro Auto", link: "/seguro-auto" },
        { title: "Seguro RC", link: "/seguro-rc" },
      ]}
      quoteUrl="https://villa.segfy.com/Publico/Segurados/Orcamentos/SolicitarCotacao?e=t6RDiR%2F1ioARkspweLWOgQ%3D%3D"
    />
  );
};

export default SeguroCaminhao;
