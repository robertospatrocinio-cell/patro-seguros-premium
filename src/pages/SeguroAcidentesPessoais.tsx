import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-seguro-vida.webp";

const SeguroAcidentesPessoais = () => {
  return (
    <InsurancePageTemplate
      heroImage={heroImg}
      title="Seguro de Acidentes Pessoais"
      subtitle="Proteção financeira para você e sua família em caso de acidentes"
      icon="🛡️"
      metaDescription="Seguro de Acidentes Pessoais: indenização por morte acidental, invalidez e despesas médicas. Proteção acessível para você e sua família."
      description="O Seguro de Acidentes Pessoais oferece indenização em casos de morte acidental, invalidez permanente e despesas médico-hospitalares decorrentes de acidentes."
      detailedDescription={`Acidentes são, por definição, eventos imprevisíveis. Uma queda, um acidente de trânsito, um acidente doméstico — situações corriqueiras podem resultar em afastamento do trabalho, despesas médicas elevadas, invalidez permanente ou até morte. O Seguro de Acidentes Pessoais existe para proteger financeiramente você e sua família quando o inesperado acontece.

Diferente do seguro de vida (que cobre morte por qualquer causa), o seguro de acidentes pessoais é focado exclusivamente em eventos acidentais. Por isso, costuma ser muito mais acessível — é um dos seguros com melhor custo-benefício do mercado.

As coberturas são amplas: morte acidental, invalidez permanente total ou parcial, despesas médico-hospitalares, diárias por incapacidade temporária, fraturas e auxílio funeral. Muitas pessoas contratam o AP como complemento ao seguro de vida, garantindo proteção extra em caso de acidente.

Na Patro Seguros, analisamos seu perfil profissional, atividades de risco e necessidades financeiras para recomendar o capital segurado adequado.`}
      howItWorks={[
        { step: "1", title: "Análise do Perfil", description: "Avaliamos sua profissão, atividades esportivas, idade e necessidades de cobertura" },
        { step: "2", title: "Definição dos Capitais", description: "Dimensionamos os valores de indenização para cada cobertura conforme sua renda e responsabilidades" },
        { step: "3", title: "Cotação Comparativa", description: "Comparamos propostas de diversas seguradoras para encontrar o melhor custo-benefício" },
        { step: "4", title: "Proteção Imediata", description: "Na maioria dos casos, não há carência — a cobertura inicia imediatamente após a contratação" },
      ]}
      coverages={[
        { title: "Morte Acidental", description: "Indenização aos beneficiários em caso de falecimento por acidente" },
        { title: "Invalidez Permanente Total", description: "Indenização integral em caso de invalidez total por acidente" },
        { title: "Invalidez Permanente Parcial", description: "Indenização proporcional ao grau de invalidez causada por acidente" },
        { title: "Despesas Médico-Hospitalares", description: "Reembolso de gastos com tratamentos decorrentes de acidente" },
        { title: "Diárias de Incapacidade Temporária", description: "Renda diária durante o período de afastamento por acidente" },
        { title: "Despesas Farmacêuticas", description: "Cobertura para medicamentos prescritos após acidente" },
        { title: "Fraturas", description: "Indenização específica em caso de fraturas decorrentes de acidente" },
        { title: "Auxílio Funeral", description: "Cobertura para despesas com funeral do segurado" },
      ]}
      coverageExclusions={[
        "Doenças (o AP cobre apenas acidentes, não doenças)",
        "Atos intencionais do segurado (autolesão)",
        "Acidentes sob efeito de álcool ou drogas ilícitas",
        "Prática de esportes radicais sem declaração prévia",
        "Acidentes de trabalho em atividades não declaradas",
        "Epidemias e pandemias (não são acidentes)",
      ]}
      pricingInfo={{
        intro: "O Seguro de Acidentes Pessoais é um dos mais acessíveis do mercado, com valores que cabem em qualquer orçamento.",
        factors: [
          "Capital segurado desejado (valor das indenizações)",
          "Profissão e classe de risco do segurado",
          "Idade do segurado",
          "Coberturas escolhidas (morte, invalidez, DMH, diárias)",
          "Prática de esportes ou atividades de risco",
          "Individual ou coletivo (empresarial)",
        ],
        note: "Um seguro AP individual com capital de R$ 100.000 para morte e invalidez pode custar de R$ 200 a R$ 800/ano (R$ 17 a R$ 67/mês). Com DMH e diárias, R$ 500 a R$ 1.500/ano. Valores muito acessíveis para a proteção oferecida.",
      }}
      realScenarios={[
        { title: "Queda em casa", description: "Um segurado caiu da escada em casa e fraturou o fêmur. O AP cobriu R$ 15.000 em despesas médicas (cirurgia e fisioterapia), R$ 5.000 de indenização por fratura e R$ 6.000 em diárias por 60 dias de afastamento do trabalho." },
        { title: "Acidente de moto", description: "Um motociclista sofreu acidente com invalidez parcial na mão direita (30%). Com capital de R$ 200.000 para invalidez, recebeu R$ 60.000 de indenização proporcional ao grau de invalidez." },
        { title: "Cobertura complementar ao seguro de vida", description: "Um profissional que já tinha seguro de vida de R$ 500.000 contratou AP de R$ 300.000. Em caso de morte acidental, os beneficiários receberiam R$ 800.000 somando ambas as apólices." },
      ]}
      importantDetails={[
        { title: "Diferença entre AP e Seguro de Vida", content: "O seguro de vida cobre morte por qualquer causa (doença ou acidente). O AP cobre apenas acidentes. Por isso, o AP é mais barato. Muitas pessoas contratam ambos para maximizar a proteção." },
        { title: "Sem carência", content: "Na maioria das apólices de acidentes pessoais, não há período de carência. A cobertura começa a valer imediatamente após a contratação e pagamento do prêmio." },
        { title: "Profissões de risco", content: "Profissões com maior exposição a riscos (construção civil, eletricista, segurança) podem ter prêmios mais elevados. Declare corretamente sua atividade para garantir a cobertura." },
      ]}
      tips={[
        "Contrate AP mesmo que já tenha seguro de vida — em caso de acidente, ambos pagam simultaneamente",
        "Inclua cobertura de Diárias por Incapacidade se sua renda depende exclusivamente do seu trabalho",
        "Declare corretamente sua profissão e atividades esportivas — informações incorretas podem anular a cobertura",
        "Para autônomos, o AP é ainda mais importante: sem CLT, não há INSS acidentário suficiente",
        "Revise o capital segurado anualmente — suas responsabilidades financeiras podem ter mudado",
      ]}
      whoNeeds={[
        "Trabalhadores autônomos e profissionais liberais",
        "Pessoas que praticam esportes e atividades físicas",
        "Quem deseja complementar o seguro de vida",
        "Profissionais com atividades de risco",
        "Famílias que querem proteção adicional",
        "Estudantes e jovens em início de carreira",
      ]}
      whyPatro={[
        "Análise personalizada do seu perfil de risco",
        "Comparação entre diversas seguradoras",
        "Coberturas flexíveis e personalizáveis",
        "Preços acessíveis com excelente custo-benefício",
        "Suporte completo em caso de sinistro",
        "Contratação rápida e sem burocracia",
      ]}
      faqs={[
        { question: "Qual a diferença entre seguro de vida e acidentes pessoais?", answer: "Seguro de vida cobre morte por qualquer causa. AP cobre exclusivamente acidentes. O AP é mais acessível e pode ser complementar ao seguro de vida." },
        { question: "Quanto custa um seguro de acidentes pessoais?", answer: "A partir de R$ 200/ano (R$ 17/mês) para coberturas básicas. É um dos seguros mais acessíveis do mercado." },
        { question: "Posso ter seguro de vida e AP ao mesmo tempo?", answer: "Sim! Em caso de acidente, ambos são acionados. Os beneficiários recebem as indenizações de ambas as apólices." },
        { question: "O seguro cobre acidentes esportivos?", answer: "Depende da apólice. Algumas modalidades esportivas podem ter cobertura específica. Consulte-nos para verificar." },
        { question: "Existe carência?", answer: "Não! Na maioria das apólices, a cobertura inicia imediatamente após a contratação." },
      ]}
      relatedInsurances={[
        { title: "Seguro de Vida", link: "/seguro-vida" },
        { title: "Planos de Saúde", link: "/planos-de-saude" },
        { title: "Seguro Viagem", link: "/seguro-viagem" },
        { title: "Seguro Estagiário", link: "/seguro-estagiario" },
      ]}
    />
  );
};

export default SeguroAcidentesPessoais;
