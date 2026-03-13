import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const SeguroTransporte = () => {
  return (
    <InsurancePageTemplate
      title="Seguro de Transporte"
      subtitle="Proteção completa para cargas nacionais e internacionais"
      icon="📦"
      metaDescription="Seguro de Transporte de Cargas — proteção para mercadorias em trânsito rodoviário, aéreo e marítimo. RCTR-C e RCF-DC. Cotação grátis Patro Seguros."
      description="O Seguro de Transporte protege mercadorias durante o trajeto rodoviário, aéreo, marítimo ou ferroviário contra roubo, acidentes, avarias e diversos outros riscos."
      detailedDescription={`O Brasil é um país continental, e o transporte de cargas é a espinha dorsal da economia. Segundo dados do setor, mais de 60% das cargas brasileiras são transportadas por rodovias — muitas delas em condições precárias e com altos índices de roubo. A cada ano, bilhões de reais em mercadorias são perdidos em sinistros rodoviários.

O Seguro de Transporte existe em diversas modalidades, cada uma com sua função específica. O mais importante é entender a diferença entre o seguro do dono da carga (embarcador) e o seguro do transportador (RCTR-C). Ambos são fundamentais e complementares.

Para o embarcador (dono da mercadoria), o seguro garante o valor das mercadorias em caso de sinistro. Para o transportador, o RCTR-C é obrigatório por lei e cobre sua responsabilidade sobre as cargas que transporta. Já o RCF-DC (Responsabilidade Civil Facultativa — Desvio de Carga) protege contra roubo.

Na Patro Seguros, analisamos toda a cadeia logística da sua operação para recomendar as coberturas adequadas, seja por viagem ou em apólice aberta (anual).`}
      howItWorks={[
        { step: "1", title: "Análise da Operação", description: "Mapeamos tipos de mercadorias, rotas, volumes, valores e modalidades de transporte" },
        { step: "2", title: "Definição da Modalidade", description: "Escolhemos entre seguro por viagem, apólice aberta, RCTR-C, RCF-DC ou combinações" },
        { step: "3", title: "Cotação e Contratação", description: "Obtemos propostas de seguradoras especializadas em transporte com as melhores condições" },
        { step: "4", title: "Gestão de Sinistros", description: "Em caso de sinistro, orientamos toda a documentação e acompanhamos o processo de indenização" },
      ]}
      coverages={[
        { title: "Roubo e Furto de Cargas", description: "Proteção contra subtração da mercadoria durante transporte" },
        { title: "Acidentes de Trânsito", description: "Cobertura para danos em colisões e tombamentos" },
        { title: "Incêndio e Explosão", description: "Proteção contra sinistros com fogo durante transporte" },
        { title: "Avarias de Carga", description: "Cobertura para danos e quebras da mercadoria" },
        { title: "Fenômenos Naturais", description: "Proteção contra chuvas, enchentes e outros eventos" },
        { title: "Operações de Carga e Descarga", description: "Cobertura durante embarque e desembarque" },
        { title: "Transporte Internacional", description: "Proteção para importações e exportações" },
        { title: "Gerenciamento de Risco", description: "Escolta e monitoramento para cargas de alto valor" },
      ]}
      coverageExclusions={[
        "Mercadorias sem nota fiscal ou documentação irregular",
        "Desvio de rota sem justificativa aceita pela seguradora",
        "Vício próprio da mercadoria (deterioração natural)",
        "Embalagem inadequada ou insuficiente",
        "Contrabando e mercadorias ilegais",
        "Danos por greve ou lockout (sem cobertura adicional)",
        "Transporte em veículos sem condições adequadas",
      ]}
      pricingInfo={{
        intro: "O custo do Seguro de Transporte é calculado como percentual do valor da mercadoria transportada.",
        factors: [
          "Valor da mercadoria (nota fiscal)",
          "Tipo de produto (eletrônicos pagam mais que grãos)",
          "Modalidade de transporte (rodoviário, aéreo, marítimo)",
          "Rota e distância (regiões com maior índice de roubo são mais caras)",
          "Frequência de embarques",
          "Gerenciamento de risco (rastreamento, escolta)",
        ],
        note: "A taxa varia de 0,03% a 0,5% do valor da carga por viagem. Uma carga de R$ 500.000 em eletrônicos em rota de alto risco pode custar R$ 1.500 a R$ 2.500 por viagem. Grãos em rota segura: R$ 150 a R$ 500 por viagem.",
      }}
      realScenarios={[
        { title: "Roubo de carga na rodovia", description: "Uma transportadora teve um caminhão com R$ 800.000 em eletrônicos roubado na BR-101. O RCF-DC cobriu integralmente o valor da carga e a empresa indenizou o embarcador sem prejuízo." },
        { title: "Tombamento com perda total", description: "Um caminhão carregado com produtos alimentícios tombou em uma curva, danificando toda a carga. O seguro cobriu R$ 320.000 em mercadorias e R$ 45.000 em custos de salvamento." },
        { title: "Avaria em transporte marítimo", description: "Um container de máquinas importadas chegou com danos por umidade e mau acondicionamento no navio. O seguro de transporte internacional cobriu R$ 180.000 em reparos e substituição de peças." },
      ]}
      importantDetails={[
        { title: "RCTR-C é obrigatório", content: "O Seguro de Responsabilidade Civil do Transportador Rodoviário de Carga (RCTR-C) é obrigatório por lei para todas as transportadoras. A falta pode resultar em multas e responsabilização pessoal dos sócios." },
        { title: "Diferença entre seguro do embarcador e do transportador", content: "O seguro do embarcador protege o dono da carga. O RCTR-C protege a responsabilidade do transportador. São seguros diferentes e complementares — idealmente ambos devem existir." },
        { title: "Averbação de cargas", content: "Em apólices abertas (anuais), cada embarque deve ser averbado junto à seguradora. Cargas não averbadas não têm cobertura. A Patro orienta sobre processos de averbação eficientes." },
      ]}
      tips={[
        "Declare sempre o valor correto da mercadoria na nota fiscal — subdeclarar pode resultar em indenização proporcional",
        "Invista em gerenciamento de risco (rastreamento, escolta) para cargas de alto valor — além de segurança, reduz o prêmio do seguro",
        "Mantenha documentação organizada: nota fiscal, conhecimento de transporte, comprovante de entrega e fotos da mercadoria",
        "Em caso de sinistro, registre boletim de ocorrência imediatamente e documente tudo com fotos antes de movimentar a carga",
        "Para operações frequentes, a apólice aberta (anual) é mais econômica que seguro por viagem",
      ]}
      whoNeeds={[
        "Transportadoras e empresas de logística",
        "Indústrias que transportam produtos",
        "Importadores e exportadores",
        "E-commerces que enviam produtos",
        "Distribuidores e atacadistas",
        "Empresas com operações de alta movimentação de cargas",
      ]}
      whyPatro={[
        "Análise de rotas e riscos específicos",
        "Seguro por viagem ou apólice aberta (anual)",
        "Orientação sobre responsabilidades e indenizações",
        "Suporte em casos de sinistro com agilidade",
        "Parcerias com seguradoras especializadas em transporte",
        "Gerenciamento de riscos e redução de sinistros",
      ]}
      faqs={[
        { question: "Qual a diferença entre RCF-DC e seguro de transporte?", answer: "RCF-DC cobre a responsabilidade da transportadora por roubo. O Seguro de Transporte é contratado pelo dono da carga. Ambos são importantes e complementares." },
        { question: "Como é calculado o valor do seguro?", answer: "Baseado no valor da mercadoria (nota fiscal), tipo de produto, distância, rota e modalidade de transporte. Fazemos cotação por viagem ou anual." },
        { question: "Cobre transporte internacional?", answer: "Sim! Temos seguros específicos para importação e exportação, cobrindo desde a origem até o destino final." },
        { question: "E se a mercadoria chegar avariada?", answer: "Documente imediatamente com fotos, laudos e boletim de ocorrência se necessário. Orientamos todo o processo de regulação." },
        { question: "Preciso declarar o conteúdo da carga?", answer: "Sim, é obrigatório declarar corretamente o tipo de mercadoria e valor para garantir cobertura adequada." },
      ]}
      relatedInsurances={[
        { title: "Seguro de Frota", link: "/seguro-frota" },
        { title: "Seguro Empresarial", link: "/seguro-empresarial" },
        { title: "Seguro Responsabilidade Civil", link: "/seguro-rc" },
        { title: "Seguro Ambiental", link: "/seguro-ambiental" },
      ]}
    />
  );
};

export default SeguroTransporte;
