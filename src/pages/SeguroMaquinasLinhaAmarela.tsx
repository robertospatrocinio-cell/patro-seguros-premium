import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-seguro-maquinas.webp";

const SeguroMaquinasLinhaAmarela = () => {
  return (
    <InsurancePageTemplate
      heroImage={heroImg}
      title="Seguro de Máquinas Linha Amarela"
      subtitle="Proteção especializada para retroescavadeiras, escavadeiras, pás carregadeiras, tratores de esteira e equipamentos pesados de construção."
      description="O Seguro de Máquinas Linha Amarela protege equipamentos pesados de construção civil, terraplanagem e mineração contra roubo, incêndio, tombamento e danos operacionais. Cobrimos retroescavadeiras, escavadeiras hidráulicas, pás carregadeiras, motoniveladoras, rolos compactadores e tratores de esteira."
      detailedDescription={`Máquinas linha amarela representam investimentos de R$ 200 mil a R$ 2 milhões ou mais. São equipamentos essenciais para construtoras, empreiteiras, empresas de terraplanagem, mineradoras e locadoras de máquinas pesadas. Operar sem seguro é arriscar o patrimônio e a continuidade dos contratos.

Os riscos são reais e frequentes: tombamento em terrenos irregulares, incêndio no motor, roubo em canteiros de obra sem vigilância, danos por operação inadequada, alagamento e vandalismo. Além do custo de reparo ou reposição, a máquina parada significa contrato atrasado, multas e perda de faturamento.

O Seguro de Máquinas Linha Amarela cobre danos materiais (colisão, tombamento, incêndio, raio, explosão), roubo e furto qualificado, danos elétricos, alagamento e inundação. Coberturas adicionais incluem responsabilidade civil (danos a terceiros durante operação), transporte do equipamento entre obras e lucros cessantes.

Na Patro Seguros, somos especialistas em seguros para equipamentos pesados. Avaliamos o tipo de operação, frequência de deslocamento entre obras e condições de guarda para dimensionar a cobertura ideal ao menor custo.`}
      icon="🚜"
      metaDescription="Seguro de Máquinas Linha Amarela — retroescavadeiras, escavadeiras, pás carregadeiras, tratores de esteira. Cobertura contra roubo, tombamento e incêndio. Cotação grátis Patro Seguros."
      howItWorks={[
        { step: "1", title: "Inventário de Máquinas", description: "Catalogamos marca, modelo, ano, número de série e valor de mercado de cada equipamento" },
        { step: "2", title: "Análise de Risco", description: "Avaliamos tipo de operação, local de guarda, frequência de transporte e condições dos canteiros" },
        { step: "3", title: "Cotação Comparativa", description: "Obtemos propostas de seguradoras especializadas em equipamentos pesados e construção" },
        { step: "4", title: "Gestão Contínua", description: "Acompanhamos sinistros, atualizamos coberturas e renegociamos na renovação" },
      ]}
      coverages={[
        { title: "Roubo e Furto", description: "Cobertura contra roubo e furto qualificado de máquinas em canteiros e pátios" },
        { title: "Incêndio e Explosão", description: "Proteção contra incêndio, raio e explosão no motor ou sistema hidráulico" },
        { title: "Tombamento e Colisão", description: "Cobertura para danos por tombamento em terrenos irregulares e colisões operacionais" },
        { title: "Danos Elétricos", description: "Proteção contra curto-circuito, sobrecarga e falhas no sistema elétrico" },
        { title: "Alagamento e Inundação", description: "Cobertura para danos causados por enchentes e alagamentos em canteiros" },
        { title: "Responsabilidade Civil", description: "Proteção contra danos causados a terceiros durante a operação do equipamento" },
      ]}
      coverageExclusions={[
        "Desgaste natural e manutenção preventiva",
        "Uso do equipamento para fins diferentes do especificado na apólice",
        "Danos por operação sem habilitação quando exigida",
        "Modificações e adaptações não autorizadas pelo fabricante",
        "Máquinas operando em áreas de conflito ou embargo judicial",
      ]}
      pricingInfo={{
        intro: "O valor do seguro de máquinas linha amarela varia entre 1% e 4% do valor do equipamento por ano. Uma retroescavadeira de R$ 300 mil pode ser segurada a partir de R$ 3.000/ano.",
        factors: [
          "Tipo e valor do equipamento",
          "Ano de fabricação e estado de conservação",
          "Local de guarda e tipo de operação",
          "Histórico de sinistros do segurado",
          "Dispositivos antifurto e rastreador",
          "Frequência de transporte entre obras",
        ],
        note: "Locadoras com múltiplos equipamentos podem negociar apólice de frota com desconto progressivo.",
      }}
      realScenarios={[
        { title: "Roubo em Canteiro", description: "Uma escavadeira de R$ 800 mil foi roubada durante a madrugada em obra sem vigilância. O seguro cobriu o valor integral, permitindo a compra de equipamento novo em 30 dias." },
        { title: "Tombamento em Terraplanagem", description: "Retroescavadeira tombou durante operação em terreno íngreme. Os reparos custaram R$ 120 mil, cobertos integralmente pelo seguro, incluindo guincho especializado." },
        { title: "Incêndio no Motor", description: "Pá carregadeira teve incêndio no motor durante operação. O sinistro de R$ 180 mil foi resolvido em 20 dias, incluindo equipamento reserva durante o reparo." },
      ]}
      importantDetails={[
        { title: "Manutenção Preventiva", content: "Mantenha a manutenção em dia — seguradoras podem recusar sinistros por negligência na manutenção do equipamento." },
        { title: "Local de Guarda", content: "Informe o local exato de guarda e operação. Mudanças de canteiro devem ser comunicadas à seguradora para manter a cobertura válida." },
        { title: "Dispositivos Antifurto", content: "Instale rastreador e dispositivos antifurto para reduzir o prêmio em até 20%. Algumas seguradoras exigem rastreador para máquinas acima de R$ 500 mil." },
        { title: "Cobertura de Transporte", content: "Contrate cobertura de transporte se a máquina se desloca entre obras com frequência — acidentes durante o deslocamento em carretas são comuns." },
      ]}
      tips={["Para locadoras de máquinas: é possível contratar apólice de frota para múltiplos equipamentos com desconto progressivo. Quanto mais máquinas seguradas, menor o custo por unidade."]}
      whoNeeds={[
        "Construtoras e empreiteiras de obras civis",
        "Empresas de terraplanagem e pavimentação",
        "Mineradoras e pedreiras",
        "Locadoras de máquinas pesadas",
        "Prefeituras e órgãos públicos com frota de equipamentos",
        "Empresas de saneamento e infraestrutura",
      ]}
      whyPatro={[
        "Especialistas em seguros de equipamentos pesados e construção",
        "Comparamos seguradoras especializadas em linha amarela",
        "Suporte completo em sinistros — do guincho à indenização",
        "Experiência com locadoras, construtoras e mineradoras",
        "Atendimento em todo o Brasil — seus equipamentos podem estar em qualquer obra",
      ]}
      faqs={[
        { question: "O que é linha amarela?", answer: "Linha amarela é o termo usado para equipamentos pesados de construção e terraplanagem: retroescavadeiras, escavadeiras hidráulicas, pás carregadeiras, motoniveladoras, rolos compactadores e tratores de esteira. O nome vem da cor predominante desses equipamentos." },
        { question: "O seguro cobre a máquina em qualquer obra?", answer: "Sim, desde que a região de operação esteja prevista na apólice. É importante informar mudanças de canteiro para manter a cobertura válida." },
        { question: "Máquinas financiadas podem ser seguradas?", answer: "Sim, e na maioria dos financiamentos o seguro é obrigatório. A instituição financeira é incluída como beneficiária na apólice." },
        { question: "O seguro cobre transporte entre obras?", answer: "Sim, a cobertura de transporte pode ser incluída na apólice. Cobre danos durante o deslocamento da máquina em carretas ou pranchas." },
        { question: "Quanto custa o seguro de uma retroescavadeira?", answer: "Varia entre 1% e 3% do valor do equipamento por ano. Uma retro de R$ 300 mil pode ser segurada a partir de R$ 3.000/ano, dependendo do perfil de uso." },
      ]}
      relatedInsurances={[
        { title: "Máquinas e Equipamentos", link: "/seguro-maquinas" },
        { title: "Máquinas Industriais", link: "/seguro-maquinas-industriais" },
        { title: "Seguro Engenharia", link: "/seguro-engenharia" },
        { title: "Seguro Empresarial", link: "/seguro-empresarial" },
        { title: "RC Obras", link: "/seguro-rc-obras" },
      ]}
      quoteFormFields={[
        { id: "tipoEquipamento", label: "Tipo de Equipamento", placeholder: "Ex: Retroescavadeira, Escavadeira...", type: "text" },
        { id: "marcaModelo", label: "Marca e Modelo", placeholder: "Ex: Caterpillar 320, Case 580...", type: "text" },
        { id: "anoFabricacao", label: "Ano de Fabricação", placeholder: "Ex: 2022", type: "text" },
        { id: "valorEstimado", label: "Valor Estimado (R$)", placeholder: "Ex: R$ 300.000", type: "text" },
      ]}
    />
  );
};

export default SeguroMaquinasLinhaAmarela;
