import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-seguro-frota.webp";

const SeoSeguroFrotaGuarulhos = () => (
  <InsurancePageTemplate
    heroImage={heroImg}
    title="Seguro de Frota em Guarulhos para Empresas"
    subtitle="Proteção completa para frotas empresariais em Guarulhos e região. Gestão de risco e cotação personalizada."
    description="A Patro Seguros é especialista em seguro de frota para empresas de Guarulhos e Grande São Paulo. Atendemos transportadoras, distribuidoras, empresas de logística e frotas corporativas de todos os portes. Já protegemos mais de 2.000 veículos de frota na região, com gestão de sinistros ágil e negociação direta com as maiores seguradoras do mercado."
    detailedDescription={`Guarulhos é o maior polo logístico do estado de São Paulo. Com o Aeroporto Internacional de Cumbica, a proximidade do Porto de Santos via Anchieta-Imigrantes e a interseção das rodovias Dutra, Fernão Dias e Ayrton Senna, a cidade concentra milhares de empresas de transporte, distribuição e logística que dependem de frotas para operar.

O risco de sinistros para frotas em Guarulhos é significativamente alto. A rodovia Presidente Dutra, no trecho de Guarulhos, registra uma das maiores taxas de acidentes do estado. Roubos de carga e de veículos também são frequentes em regiões como Cumbica, Bonsucesso e nas marginais das rodovias. Esses fatores tornam o seguro de frota não apenas recomendável, mas essencial para a sobrevivência do negócio.

A Patro Seguros oferece gestão de risco completa para frotas: desde a análise do perfil de cada veículo e motorista, passando pela negociação com seguradoras (Porto Seguro, Tokio Marine, HDI, Mapfre e Zurich), até o acompanhamento integral de sinistros. Nossa equipe conhece os procedimentos de cada seguradora e trabalha para reduzir o tempo de veículo parado — que para empresas de transporte pode representar prejuízos de R$ 500 a R$ 2.000 por dia.

Para frotas acima de 20 veículos, negociamos condições especiais que incluem franquias reduzidas, descontos progressivos e programas de gestão preventiva de risco. Empresas que implementam nosso programa de prevenção (treinamento de motoristas, telemetria e manutenção preventiva) obtêm reduções médias de 20% no prêmio anual.`}
    icon="🚛"
    metaDescription="Seguro de Frota em Guarulhos para transportadoras, distribuidoras e empresas. Gestão de risco e cotação personalizada. Patro Seguros – corretora local."
    coverages={[
      { title: "Cobertura Compreensiva para Frota", description: "Proteção contra colisão, roubo, furto, incêndio e fenômenos naturais para todos os veículos da frota." },
      { title: "Responsabilidade Civil", description: "Cobertura para danos materiais e corporais causados a terceiros por veículos da frota em Guarulhos e todo o Brasil." },
      { title: "APP (Acidentes Pessoais de Passageiros)", description: "Proteção obrigatória para motoristas e passageiros. Essencial para compliance trabalhista." },
      { title: "Assistência 24h Nacional", description: "Guincho, socorro mecânico e hospedagem para motoristas em viagem. Rede de prestadores em todo o Brasil." },
      { title: "Lucros Cessantes", description: "Indenização pela parada do veículo durante conserto. Para frotas de Guarulhos, pode chegar a R$ 2.000/dia." },
      { title: "Cobertura para Carga (RCF-DC)", description: "Proteção para a carga transportada contra roubo, tombamento e avarias durante o transporte." },
    ]}
    howItWorks={[
      { step: "1", title: "Levantamento da frota", description: "Enviamos um formulário para cadastro de todos os veículos, motoristas e rotas. Quanto mais dados, melhor a negociação." },
      { step: "2", title: "Análise de risco", description: "Nossa equipe analisa o perfil da frota: tipo de veículos, rotas predominantes, histórico de sinistros e perfil dos motoristas." },
      { step: "3", title: "Negociação com seguradoras", description: "Cotamos com Porto, Tokio Marine, HDI, Mapfre e Zurich. Para frotas grandes, negociamos condições exclusivas." },
      { step: "4", title: "Proposta comparativa", description: "Você recebe um relatório detalhado comparando coberturas, franquias, preços e condições de cada seguradora." },
      { step: "5", title: "Gestão contínua", description: "Inclusão/exclusão de veículos, acompanhamento de sinistros, renovação estratégica e programa de prevenção de riscos." },
    ]}
    pricingInfo={{
      intro: "O custo do seguro de frota em Guarulhos depende do porte da frota, tipos de veículos e perfil de risco. Em geral, frotas obtêm descontos de 15% a 35% em relação ao seguro individual por veículo. Para uma frota de 10 veículos leves em Guarulhos, o custo médio fica entre R$ 2.000 e R$ 3.500 por veículo/ano.",
      factors: [
        "Quantidade de veículos na frota (quanto mais, maior o desconto)",
        "Tipo de veículos: leves, utilitários, caminhões ou carretas",
        "Perfil dos motoristas: idade, experiência e histórico de habilitação",
        "Rotas predominantes: urbanas em Guarulhos ou rodoviárias (Dutra, Fernão Dias)",
        "Histórico de sinistralidade da empresa nos últimos 3 anos",
        "Dispositivos de segurança: rastreador, telemetria, câmeras embarcadas",
      ],
      note: "Dica Patro: Empresas com programa de gestão de risco (telemetria + treinamento de motoristas) obtêm reduções de até 25% no prêmio da frota.",
    }}
    realScenarios={[
      { title: "Case: Transportadora de Cumbica reduziu sinistralidade em 40%", description: "Uma transportadora com 35 veículos em Cumbica tinha sinistralidade alta (8 ocorrências/ano). A Patro implementou um programa de gestão de risco com telemetria e treinamento de motoristas. Em 12 meses, os sinistros caíram para 5, e o prêmio da renovação foi 22% menor. A economia total foi de R$ 45.000 no ano." },
      { title: "Case: Distribuidora economizou R$ 80.000 na renovação", description: "Uma distribuidora de alimentos com 50 veículos em Guarulhos renovava com a mesma seguradora há 5 anos. A Patro cotou com 4 concorrentes e encontrou uma proposta 18% mais barata com coberturas superiores, incluindo lucros cessantes e assistência premium. Economia de R$ 80.000/ano." },
      { title: "Case: Sinistro de carga resolvido em tempo recorde", description: "Um caminhão de uma empresa-cliente foi roubado na Fernão Dias com carga de R$ 200.000. A Patro acionou o seguro de carga (RCF-DC) no mesmo dia, a carga foi indenizada em 30 dias e o veículo, recuperado pelo rastreador em 48 horas. A empresa não perdeu nenhum dia de operação." },
    ]}
    coverageExclusions={[
      "Veículos com documentação irregular ou sem CRLV atualizado",
      "Motoristas sem habilitação compatível com a categoria do veículo",
      "Sinistros causados por embriaguez do condutor",
      "Desgaste mecânico e manutenção preventiva dos veículos",
      "Veículos utilizados em finalidade não declarada na apólice",
    ]}
    tips={[
      "Centralize a frota em uma única apólice: simplifica gestão e garante desconto por volume.",
      "Implemente telemetria: além de reduzir sinistros, gera desconto de 10-15% no prêmio.",
      "Treine seus motoristas: programas de direção defensiva reduzem acidentes e custos com seguro.",
      "Revise anualmente: frotas mudam, e o seguro precisa acompanhar. Inclusões e exclusões devem ser feitas em tempo real.",
      "Negocie na renovação: a Patro sempre cota com concorrentes para garantir o melhor preço na renovação.",
    ]}
    whoNeeds={[
      "Transportadoras e operadores logísticos em Guarulhos e Grande SP",
      "Distribuidoras e atacadistas da região metropolitana",
      "Empresas com frota corporativa (comercial, técnica, executiva)",
      "Locadoras de veículos e empresas de delivery",
      "Empresas de construção civil com veículos e máquinas",
      "Frotas de concessionárias, imobiliárias e empresas de serviços",
    ]}
    whyPatro={[
      "Mais de 2.000 veículos de frota protegidos em Guarulhos e região",
      "Negociação direta com Porto, Tokio Marine, HDI, Mapfre e Zurich",
      "Gestão de sinistros ágil — redução de 40% no tempo de veículo parado",
      "Programa de gestão de risco com telemetria e treinamento de motoristas",
      "Análise de risco personalizada para cada tipo de frota e operação",
      "Relatórios de sinistralidade e consultoria para redução de custos",
    ]}
    faqs={[
      { question: "Quanto custa seguro de frota em Guarulhos?", answer: "O valor depende do tipo de veículos, perfil dos motoristas e rotas. Em geral, frotas obtêm descontos de 15% a 35% em relação ao seguro individual. Para 10 veículos leves, o custo médio fica entre R$ 2.000 e R$ 3.500/veículo/ano. Solicite cotação gratuita." },
      { question: "A partir de quantos veículos posso contratar seguro de frota?", answer: "A maioria das seguradoras aceita frotas a partir de 5 veículos. Para frotas de 2 a 4 veículos, a Patro oferece condições especiais de agrupamento que já garantem descontos significativos." },
      { question: "Seguro de frota cobre roubo na Dutra e Fernão Dias?", answer: "Sim. A cobertura compreensiva inclui roubo e furto em qualquer via, incluindo as rodovias Dutra e Fernão Dias. Para cargas, é necessário contratar cobertura adicional (RCF-DC)." },
      { question: "Como funciona a gestão de sinistros para frota?", answer: "A Patro disponibiliza um canal exclusivo para empresas-clientes. Em caso de sinistro, abrimos o processo no mesmo dia, agendamos vistoria em até 24h e acompanhamos até a resolução. Nosso prazo médio de resolução é 40% menor que a média do mercado." },
      { question: "O seguro de frota inclui rastreamento?", answer: "Muitas seguradoras oferecem desconto para frotas com rastreamento. A Patro pode intermediar a instalação de rastreadores e telemetria com parceiros homologados, gerando economia no prêmio e maior segurança operacional." },
    ]}
    relatedInsurances={[
      { title: "Seguro Auto Guarulhos", link: "/seguro-auto-guarulhos" },
      { title: "Seguro Caminhão", link: "/seguro-caminhao" },
      { title: "Seguro Transporte", link: "/seguro-transporte" },
      { title: "Seguros PME Guarulhos", link: "/seguros-empresariais-pme-guarulhos" },
      { title: "Seguro Vida e Saúde Guarulhos", link: "/seguro-vida-saude-guarulhos" },
      { title: "Corretora Seguros Guarulhos", link: "/" },
    ]}
  />
);

export default SeoSeguroFrotaGuarulhos;
