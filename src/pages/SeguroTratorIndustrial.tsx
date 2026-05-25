import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-seguro-maquinas-linha-amarela.webp";

const SeguroTratorIndustrial = () => {
  return (
    <InsurancePageTemplate
      heroImage={heroImg}
      title="Seguro de Trator Industrial - Linha Amarela"
      subtitle="Proteção premium para tratores de esteira, pás carregadeiras e escavadeiras. Segurança total para o seu canteiro de obras e operações industriais."
      icon="🚜"
      badge="Especialista em Máquinas Pesadas"
      metaDescription="Seguro para Trator Industrial e Linha Amarela: proteção contra roubo, tombamento e incêndio em obras e indústrias. Cotação rápida e consultoria técnica Patro Seguros."
      description="O Trator Industrial é a força motriz de grandes obras e operações logísticas. O Seguro de Linha Amarela da Patro Seguros oferece a robustez necessária para proteger equipamentos de alto valor contra os riscos severos do ambiente de trabalho pesado."
      detailedDescription={`Equipamentos da Linha Amarela, como tratores de esteira, escavadeiras e retroescavadeiras, representam um capital imobilizado significativo. Um incidente operacional, como um tombamento em terreno instável ou uma falha elétrica no sistema hidráulico, pode gerar custos de reparo proibitivos e paralisar cronogramas contratuais.

Nossa consultoria para Seguro de Trator Industrial foca na proteção completa do bem e na continuidade do negócio. Oferecemos coberturas que incluem danos materiais acidentais, roubo qualificado (mesmo em canteiros de obra) e a fundamental Responsabilidade Civil Operacional, que resguarda a empresa contra danos causados a terceiros durante a movimentação dessas máquinas pesadas.

Com atendimento especializado e ágil, garantimos que seu maquinário industrial esteja sempre amparado pelas melhores seguradoras de Riscos de Engenharia do mercado brasileiro.`}
      howItWorks={[
        { step: "1", title: "Levantamento de Frota", description: "Identificamos marca, modelo, ano e potência das suas máquinas industriais." },
        { step: "2", title: "Análise do Ambiente", description: "Avaliamos se a operação ocorre em obras civis, mineração ou pátios industriais." },
        { step: "3", title: "Desenho Técnico", description: "Customizamos as verbas de reparo, transporte e responsabilidade civil." },
        { step: "4", title: "Emissão e Suporte", description: "Ativação da apólice com suporte total para gestão de riscos e vistorias." },
      ]}
      coverages={[
        { title: "Danos por Acidentes Externos", description: "Cobre colisões, tombamentos e quedas acidentais durante a operação." },
        { title: "Roubo e Furto Qualificado", description: "Proteção indispensável para máquinas em canteiros e frentes de trabalho." },
        { title: "Incêndio, Raio e Explosão", description: "Segurança contra danos térmicos de origem interna ou externa." },
        { title: "Danos Elétricos", description: "Proteção para módulos eletrônicos, painéis e sistemas de automação." },
        { title: "RC Operacional Máquinas", description: "Cobre danos materiais ou corporais a terceiros causados pelo equipamento." },
        { title: "Despesas de Salvamento", description: "Garante os custos necessários para resgatar o equipamento em caso de acidente." },
        { title: "Transporte entre Obras", description: "Cobertura adicional para a máquina enquanto transportada em pranchas." },
      ]}
      coverageExclusions={[
        "Danos por falta de lubrificação ou manutenção preventiva",
        "Quebras mecânicas decorrentes de desgaste natural por uso",
        "Operação por pessoas não capacitadas ou sem treinamento",
        "Danos estéticos (riscos na pintura, amassados leves)",
        "Atos ilícitos ou negligência grave comprovada",
      ]}
      pricingInfo={{
        intro: "O prêmio é dimensionado conforme o valor de mercado do equipamento e o histórico da empresa.",
        factors: [
          "Valor de reposição e idade da máquina",
          "Tipo de trabalho (terraplanagem, mineração, demolição)",
          "Existência de dispositivos de segurança e telemetria",
          "Região geográfica principal de atuação",
          "Histórico de sinistralidade da frota",
        ],
        note: "Empresas com programas de manutenção rigorosos podem obter descontos significativos no prêmio anual.",
      }}
      realScenarios={[
        { title: "Tombamento em Demolição", description: "Um trator de esteira tombou durante a remoção de escombros em terreno instável. O seguro cobriu R$ 85.000 em reparos estruturais e mecânicos." },
        { title: "Curto no Sistema Hidráulico", description: "Uma falha elétrica causou a queima do painel e das válvulas eletrônicas de uma escavadeira. A reposição de R$ 32.000 foi paga integralmente." },
        { title: "Roubo em Canteiro de Obra", description: "Criminosos invadiram o canteiro durante o feriado e levaram uma retroescavadeira. A seguradora indenizou o valor acordado em 25 dias." },
      ]}
      importantDetails={[
        { title: "Responsabilidade Civil é Vital", content: "Diferente de carros de passeio, o dano que um trator industrial pode causar a uma estrutura vizinha ou a uma pessoa é imenso. Nunca contrate sem uma verba alta de RC." },
        { title: "Vistoria Prévia", content: "Equipamentos usados passam por vistoria técnica para comprovar o estado de conservação e funcionamento antes da aceitação do seguro." },
      ]}
      tips={[
        "Mantenha registros fotográficos periódicos do estado da máquina",
        "Certifique-se de que todos os operadores possuem treinamento certificado",
        "Instale sistemas de rastreamento para reduzir o custo da apólice",
        "Revise o valor segurado anualmente conforme a valorização do maquinário usado",
      ]}
      whoNeeds={[
        "Construtoras e Empreiteiras",
        "Empresas de Terraplanagem e Pavimentação",
        "Mineradoras e Pedreiras",
        "Indústrias com Grandes Pátios Logísticos",
        "Locadoras de Máquinas Pesadas",
      ]}
      whyPatro={[
        "Especialista em seguros de máquinas e equipamentos",
        "Parceria com fabricantes e concessionárias pelo Brasil",
        "Consultoria para frotas de locadoras e construtoras",
        "Comparativo entre seguradoras focadas em Linha Amarela",
        "Suporte técnico em regulação de sinistros complexos",
        "Agilidade na emissão de certificados para participação em licitações",
      ]}
      faqs={[
        { question: "O que é considerado Linha Amarela?", answer: "São máquinas pesadas de construção e indústria: tratores de esteira, retroescavadeiras, pás carregadeiras, escavadeiras hidráulicas e motoniveladoras." },
        { question: "O seguro cobre a máquina em qualquer cidade?", answer: "Sim, o seguro tem abrangência nacional, desde que o local de operação esteja dentro das condições previstas na apólice." },
        { question: "O seguro é obrigatório para financiamento?", answer: "Sim, quase a totalidade dos financiamentos de máquinas pesadas (BNDES, FINAME, Leasing) exige seguro com cláusula beneficiária para o banco." },
        { question: "Quanto tempo demora para receber a indenização?", answer: "O prazo médio após a entrega dos documentos é de 30 dias, mas para reparos parciais o processo de autorização costuma ser muito rápido." },
      ]}
      relatedInsurances={[
        { title: "Seguro de Máquinas Linha Amarela", link: "/seguro-maquinas-linha-amarela" },
        { title: "Seguro de Máquinas Industriais", link: "/seguro-maquinas-industriais" },
        { title: "Seguro Engenharia", link: "/seguro-engenharia" },
        { title: "RC Obras", link: "/seguro-rc-obras" },
      ]}
    />
  );
};

export default SeguroTratorIndustrial;
