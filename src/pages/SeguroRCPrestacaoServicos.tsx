import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-seguro-rc.webp";

const SeguroRCPrestacaoServicos = () => {
  return (
    <InsurancePageTemplate
      title="Seguro RC Prestação de Serviços em Terceiros"
      subtitle="Proteção para empresas que realizam serviços nas instalações de clientes"
      icon="🔧"
      metaDescription="Seguro RC Prestação de Serviços em Terceiros. Proteção contra danos causados durante serviços em instalações de clientes. Cotação grátis Patro Seguros Guarulhos."
      description="O Seguro de Responsabilidade Civil para Prestação de Serviços em Terceiros protege empresas e profissionais que executam trabalhos nas instalações de seus clientes contra danos materiais, corporais e morais causados durante a execução dos serviços."
      detailedDescription={`Empresas que prestam serviços em locais de terceiros — como manutenção, instalação, limpeza, TI, climatização, reformas e reparos — estão constantemente expostas ao risco de causar danos ao patrimônio ou às pessoas presentes no local do cliente. Um cabo mal instalado que causa um incêndio, um vazamento provocado durante uma manutenção hidráulica, ou um acidente com um funcionário do contratante são situações reais que podem gerar processos milionários.

O Seguro RC Prestação de Serviços em Terceiros é a proteção financeira que garante que sua empresa não seja comprometida por um sinistro ocorrido durante o trabalho nas dependências do contratante. A seguradora assume os custos de defesa judicial e o pagamento de indenizações por danos materiais, corporais e morais.

Esse tipo de seguro é cada vez mais exigido em contratos de prestação de serviços, especialmente por grandes empresas, condomínios, indústrias e órgãos públicos. Ter a apólice demonstra profissionalismo, solidez e responsabilidade — além de ser um diferencial competitivo na hora de fechar novos contratos.`}
      howItWorks={[
        { step: "1", title: "Análise da Atividade", description: "Identificamos os tipos de serviços prestados, locais de atuação, número de funcionários e histórico de sinistros" },
        { step: "2", title: "Definição de Coberturas", description: "Selecionamos coberturas específicas para sua atividade: danos ao patrimônio do contratante, danos corporais, erro de execução e mais" },
        { step: "3", title: "Cotação Personalizada", description: "Consultamos seguradoras especializadas em RC prestação de serviços para obter as melhores condições e limites" },
        { step: "4", title: "Proteção em Campo", description: "Em caso de sinistro durante a prestação do serviço, a seguradora assume a defesa e paga as indenizações devidas" },
      ]}
      coverages={[
        { title: "Danos Materiais ao Contratante", description: "Cobertura para prejuízos causados ao patrimônio do cliente durante a execução do serviço" },
        { title: "Danos Corporais", description: "Proteção contra lesões causadas a funcionários do contratante ou terceiros presentes no local" },
        { title: "Danos Morais", description: "Cobertura para indenizações por danos morais decorrentes da prestação do serviço" },
        { title: "Erro de Execução", description: "Proteção contra falhas técnicas na execução do trabalho contratado" },
        { title: "Despesas de Defesa", description: "Custos com advogados, perícias e processos judiciais são cobertos pela apólice" },
        { title: "Danos a Instalações e Equipamentos", description: "Cobertura para danos acidentais a máquinas, equipamentos e instalações do contratante" },
        { title: "Poluição Súbita e Acidental", description: "Proteção contra contaminação acidental causada durante o serviço (dependendo da apólice)" },
        { title: "Responsabilidade do Empregador", description: "Cobertura complementar para acidentes com seus funcionários durante o serviço externo" },
      ]}
      coverageExclusions={[
        "Atos dolosos ou intencionais do prestador de serviço",
        "Danos causados por atividades não descritas na apólice",
        "Trabalhos realizados sem as devidas licenças ou habilitações técnicas",
        "Multas contratuais e penalidades administrativas",
        "Danos ao próprio patrimônio do segurado (ferramentas, veículos próprios)",
        "Garantia de resultado ou qualidade do serviço prestado",
        "Danos por uso de materiais defeituosos fornecidos pelo próprio prestador",
      ]}
      pricingInfo={{
        intro: "O valor do Seguro RC Prestação de Serviços varia conforme a atividade, faturamento, número de funcionários e limites de cobertura.",
        factors: [
          "Tipo de serviço prestado (manutenção elétrica paga mais que limpeza)",
          "Faturamento anual da empresa",
          "Número de funcionários em campo",
          "Limite de indenização por sinistro e agregado",
          "Histórico de sinistros e reclamações",
          "Locais de atuação (indústrias têm risco maior que escritórios)",
        ],
        note: "Empresas de manutenção predial podem pagar entre R$ 1.500 e R$ 6.000/ano. Prestadores de serviços industriais entre R$ 5.000 e R$ 20.000/ano. Valores variam conforme limites e coberturas contratadas.",
      }}
      realScenarios={[
        { title: "Técnico causou incêndio em cliente", description: "Um técnico de manutenção elétrica provocou um curto-circuito durante reparo em um prédio comercial, causando incêndio que danificou um andar inteiro. O seguro cobriu R$ 450.000 em indenização ao proprietário." },
        { title: "Vazamento durante manutenção hidráulica", description: "Uma empresa de manutenção causou vazamento que danificou estoque de mercadorias de um cliente. O RC cobriu R$ 180.000 em prejuízos materiais e R$ 15.000 em despesas de defesa." },
        { title: "Acidente com funcionário do contratante", description: "Durante instalação de equipamentos, uma peça caiu e feriu um funcionário do cliente. O seguro cobriu R$ 95.000 em indenização por danos corporais e morais." },
      ]}
      importantDetails={[
        { title: "Exigência Contratual", content: "Grandes empresas, condomínios, indústrias e órgãos públicos cada vez mais exigem que prestadores de serviço apresentem apólice de RC como condição para contratação. Ter o seguro é um diferencial competitivo que abre portas para novos contratos." },
        { title: "Coberturas por Atividade", content: "As coberturas são customizadas conforme o tipo de serviço prestado. Manutenção elétrica, hidráulica, climatização, limpeza industrial, instalação de equipamentos — cada atividade tem riscos específicos que precisam ser contemplados na apólice." },
        { title: "Limites por Sinistro e Agregado", content: "A apólice define um limite máximo por sinistro (evento individual) e um limite agregado (total no período). É importante dimensionar os limites conforme o porte dos contratos e o tipo de risco envolvido na atividade." },
      ]}
      tips={[
        "Descreva detalhadamente todas as atividades na proposta — serviços não declarados podem não ter cobertura",
        "Mantenha documentação de todos os serviços realizados: ordens de serviço, fotos antes/depois, termos de aceite",
        "Exija que seus funcionários usem EPIs adequados — o não uso pode prejudicar a cobertura",
        "Comunique a seguradora imediatamente em caso de sinistro, antes de qualquer acordo com o contratante",
        "Revise os limites de cobertura anualmente conforme seu faturamento e porte dos contratos cresce",
      ]}
      whoNeeds={[
        "Empresas de manutenção predial (elétrica, hidráulica, elevadores)",
        "Prestadores de serviços de limpeza e conservação",
        "Empresas de instalação e montagem de equipamentos",
        "Técnicos de climatização e ar-condicionado",
        "Empresas de TI que atuam em clientes (cabeamento, servidores)",
        "Prestadores de serviços industriais e de engenharia",
        "Empresas de reforma e pequenas obras",
        "Prestadores de serviços de jardinagem e paisagismo",
      ]}
      whyPatro={[
        "Apólices customizadas por tipo de atividade e risco",
        "Orientação completa sobre coberturas necessárias para cada serviço",
        "Agilidade na emissão de certificados para apresentar a clientes",
        "Suporte dedicado em caso de sinistro durante serviço externo",
        "Parcerias com seguradoras especializadas em RC operacional",
        "Análise técnica do contrato do cliente para adequar a cobertura",
      ]}
      faqs={[
        { question: "O que é o Seguro RC Prestação de Serviços?", answer: "É um seguro que protege empresas que realizam serviços nas instalações de clientes contra danos materiais, corporais e morais causados durante a execução do trabalho." },
        { question: "Meu cliente exige esse seguro. É obrigatório?", answer: "Não é obrigatório por lei, mas é cada vez mais exigido como condição contratual por grandes empresas, condomínios e órgãos públicos. É também um diferencial competitivo." },
        { question: "Quanto custa o seguro RC para prestadores de serviço?", answer: "Depende da atividade, faturamento, número de funcionários e limites desejados. Fazemos cotação personalizada para encontrar o melhor custo-benefício." },
        { question: "Cobre danos ao meu próprio equipamento?", answer: "Não. O RC cobre apenas danos causados a terceiros (patrimônio do cliente, pessoas presentes). Para seus equipamentos, existe o seguro de equipamentos portáteis." },
        { question: "Preciso de uma apólice por cliente ou uma única serve?", answer: "Uma única apólice cobre todos os serviços prestados durante a vigência, em qualquer cliente. Você pode solicitar certificados individuais para apresentar a cada contratante." },
      ]}
      relatedInsurances={[
        { title: "Seguro RC Geral", link: "/seguro-rc" },
        { title: "Seguro RC Profissional", link: "/seguro-rc-profissional" },
        { title: "Seguro RC Obras", link: "/seguro-rc-obras" },
        { title: "Seguro Empresarial", link: "/seguro-empresarial" },
      ]}
    />
  );
};

export default SeguroRCPrestacaoServicos;
