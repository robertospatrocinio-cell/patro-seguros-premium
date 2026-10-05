import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-seguro-transporte.webp";

const SeguroTransporte = () => {
  return (
    <InsurancePageTemplate
      heroImage={heroImg}
      title="Seguro de Transporte"
      subtitle="Proteção completa para cargas nacionais e internacionais"
      icon="📦"
      metaDescription="Seguro de Transporte de Cargas para embarcadores e transportadores. Entenda a diferença entre seguro da carga, RCTR-C e RC-DC. Cotação Patro Seguros."
      description="O Seguro de Transporte pode proteger o interesse sobre a mercadoria conforme o produto contratado. A responsabilidade civil do transportador é tratada em seguros próprios, como RCTR-C, RC-DC e RC-V, cada um com escopo distinto."
      detailedDescription={`O Brasil é um país continental, e o transporte de cargas é a espinha dorsal da economia. Segundo dados do setor, mais de 60% das cargas brasileiras são transportadas por rodovias — muitas delas em condições precárias e com altos índices de roubo. A cada ano, bilhões de reais em mercadorias são perdidos em sinistros rodoviários.

O Seguro de Transporte existe em diversas modalidades, cada uma com sua função específica. É importante distinguir o seguro contratado pelo dono da carga, em razão do interesse sobre a mercadoria, dos seguros de responsabilidade civil do transportador.

Para o embarcador, a proteção da mercadoria depende do produto, dos riscos cobertos e das condições contratuais. Para o transportador rodoviário de cargas sujeito à obrigação legal, o RCTR-C trata de perdas ou danos à carga em consequência dos acidentes previstos na legislação. O RC-DC trata dos eventos de desaparecimento de carga previstos na Lei nº 11.442/2007. O RC-V é distinto e cobre danos corporais e materiais causados a terceiros pelo veículo utilizado no transporte, conforme a regulamentação vigente.

Na Patro Seguros, analisamos toda a cadeia logística da sua operação para recomendar as coberturas adequadas, seja por viagem ou em apólice aberta (anual).`}
      howItWorks={[
        { step: "1", title: "Análise da Operação", description: "Mapeamos tipos de mercadorias, rotas, volumes, valores e modalidades de transporte" },
        { step: "2", title: "Definição da Modalidade", description: "Analisamos seguro da carga e responsabilidades do transportador, distinguindo RCTR-C, RC-DC, RC-V e demais produtos aplicáveis" },
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
        { title: "Desaparecimento de carga na rodovia", description: "Em um evento de desaparecimento de carga, a cobertura dependerá do RC-DC contratado, dos limites, do PGR, das condições da apólice e da regulação do sinistro." },
        { title: "Tombamento com perda total", description: "Um caminhão carregado com produtos alimentícios tombou em uma curva, danificando toda a carga. O seguro cobriu R$ 320.000 em mercadorias e R$ 45.000 em custos de salvamento." },
        { title: "Avaria em transporte marítimo", description: "Um container de máquinas importadas chegou com danos por umidade e mau acondicionamento no navio. O seguro de transporte internacional cobriu R$ 180.000 em reparos e substituição de peças." },
      ]}
      importantDetails={[
        { title: "RCTR-C e RC-DC", content: "A Lei nº 11.442/2007 prevê seguros obrigatórios para os transportadores enquadrados na atividade legal: RCTR-C para perdas ou danos à carga decorrentes dos acidentes previstos e RC-DC para eventos de desaparecimento de carga especificados na lei. O vínculo ao RNTR-C e o PGR devem ser analisados no contexto da operação." },
        { title: "RC-V não é RCF-V", content: "O RC-V obrigatório do transportador rodoviário de cargas é distinto do RCF-V tradicional. A orientação vigente da SUSEP informa que novos contratos destinados à obrigação legal devem ser estruturados, emitidos e contabilizados no ramo 0659." },
        { title: "Seguro da carga e seguro do transportador", content: "O seguro contratado pelo dono da carga protege um interesse diferente do seguro de responsabilidade civil do transportador. Coberturas, limites, averbação e PGR dependem do produto e das condições contratuais." },
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
        { question: "Qual a diferença entre RC-DC e seguro de transporte?", answer: "O RC-DC é seguro de responsabilidade civil do transportador para eventos de desaparecimento de carga previstos na legislação. O seguro de transporte pode proteger o interesse do dono da carga conforme o produto contratado. Não são sinônimos." },
        { question: "Como é calculado o valor do seguro?", answer: "Baseado no valor da mercadoria (nota fiscal), tipo de produto, distância, rota e modalidade de transporte. Fazemos cotação por viagem ou anual." },
        { question: "Cobre transporte internacional?", answer: "Sim! Temos seguros específicos para importação e exportação, cobrindo desde a origem até o destino final." },
        { question: "E se a mercadoria chegar avariada?", answer: "Documente imediatamente com fotos, laudos e boletim de ocorrência se necessário. Orientamos todo o processo de regulação." },
        { question: "Preciso declarar o conteúdo da carga?", answer: "As informações da carga devem ser prestadas conforme a proposta, a apólice e os procedimentos aplicáveis. Tipo de mercadoria, valor, rota e demais dados podem influenciar a análise do risco e a cobertura." },
      ]}
      relatedInsurances={[
        { title: "Seguro de Frota", link: "/seguro-frota" },
        { title: "Seguro Empresarial", link: "/seguro-empresarial" },
        { title: "Seguro Responsabilidade Civil", link: "/seguro-rc" },
        { title: "Seguro Ambiental", link: "/seguro-ambiental" },
        { title: "Seguro para Motorista de App", link: "/seguro-motorista-app" },
        { title: "Soluções para Transportadoras", link: "/seguros/transportadoras" },
        { title: "Soluções para Motoristas de App", link: "/seguros/motoristas-app" },
      ]}
    />
  );
};

export default SeguroTransporte;
