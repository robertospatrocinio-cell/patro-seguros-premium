import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-seguro-vida.webp";

const SeguroAcidentesPessoais = () => {
  return (
    <InsurancePageTemplate
      heroImage={heroImg}
      quoteUrl="https://www.patroseguros.com.br/cotacao?tipo=outros"
      title="Seguro de Acidentes Pessoais"
      subtitle="Proteção financeira para você e sua família em caso de acidentes"
      icon="🛡️"
      metaDescription="Seguro de Acidentes Pessoais: indenização por morte acidental, invalidez e despesas médicas. Proteção acessível para você e sua família."
      description="O Seguro de Acidentes Pessoais oferece indenização em casos de morte acidental, invalidez permanente e despesas médico-hospitalares decorrentes de acidentes."
      detailedDescription={`Acidentes são, por definição, eventos imprevisíveis. Uma queda, um acidente de trânsito, um acidente doméstico — situações corriqueiras podem resultar em afastamento do trabalho, despesas médicas elevadas, invalidez permanente ou até morte. O Seguro de Acidentes Pessoais existe para proteger financeiramente você e sua família quando o inesperado acontece.

Diferentemente de uma cobertura de vida que inclua morte por causas naturais e acidentais, o seguro de acidentes pessoais é estruturado para eventos acidentais, conforme a definição e as condições do produto. Não se deve presumir cobertura, preço ou vantagem universal.

O produto pode oferecer morte acidental, invalidez permanente, despesas médico-hospitalares, diárias, fraturas e assistência funeral, mas a disponibilidade, os limites, as carências e as exclusões dependem da contratação e da seguradora.

Na Patro Seguros, analisamos seu perfil profissional, atividades de risco e necessidades financeiras para recomendar o capital segurado adequado.`}
      howItWorks={[
        { step: "1", title: "Análise do Perfil", description: "Avaliamos sua profissão, atividades esportivas, idade e necessidades de cobertura" },
        { step: "2", title: "Definição dos Capitais", description: "Dimensionamos os valores de indenização para cada cobertura conforme sua renda e responsabilidades" },
        { step: "3", title: "Cotação Comparativa", description: "Comparamos alternativas de seguradoras conforme o perfil, o produto e as condições oferecidas" },
        { step: "4", title: "Início da vigência", description: "A vigência e eventual carência dependem da proposta, do produto, do pagamento e das condições contratuais; não há início imediato universal." },
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
        "Eventos que não se enquadrem na definição contratual de acidente ou nas coberturas contratadas",
        "Atos intencionais do segurado (autolesão)",
        "Acidentes sob efeito de álcool ou drogas ilícitas",
        "Atividades esportivas ou de risco não informadas ou não aceitas, conforme o produto e o contrato",
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
        note: "O preço depende do capital, coberturas, perfil, idade, profissão, atividades de risco, forma de contratação e critérios da seguradora. A proposta individual é a referência adequada para comparar valores.",
      }}
      realScenarios={[
        { title: "Queda em casa", description: "Se o acidente e a despesa estiverem abrangidos pela cobertura contratada, a seguradora analisará os documentos e os limites de despesas médico-hospitalares previstos na apólice." },
        { title: "Acidente de moto", description: "Uma cobertura de invalidez permanente pode prever pagamento proporcional ao grau de invalidez, conforme a definição e o critério estabelecidos no contrato." },
        { title: "Cobertura complementar ao seguro de vida", description: "O AP pode ser avaliado como complemento ao seguro de vida, mas eventual pagamento conjunto depende da cobertura de cada apólice e da análise do sinistro." },
      ]}
      importantDetails={[
        { title: "Diferença entre AP e Seguro de Vida", content: "O seguro de vida e o AP podem ter escopos diferentes. A cobertura de morte, os eventos acidentais, os limites e as exclusões devem ser comparados na proposta e na apólice. É possível avaliar os produtos de forma complementar, sem presumir pagamento automático." },
        { title: "Carência e início da vigência", content: "A existência de carência e a data de início dependem do produto, da contratação, do pagamento e das condições da seguradora. Não há uma regra única para todas as apólices." },
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
        { question: "Qual a diferença entre seguro de vida e acidentes pessoais?", answer: "Os produtos podem ter escopos diferentes. O seguro de acidentes pessoais se concentra em eventos definidos como acidentes, enquanto um seguro de vida pode incluir morte natural, acidental e outras coberturas, conforme a apólice. Compare as definições e exclusões do contrato." },
        { question: "Quanto custa um seguro de acidentes pessoais?", answer: "Não há preço universal. O valor depende do capital, coberturas, perfil, profissão, idade, atividades de risco e critérios da seguradora." },
        { question: "Posso ter seguro de vida e AP ao mesmo tempo?", answer: "É possível contratar ambos, mas o pagamento em um sinistro depende de a ocorrência estar coberta em cada apólice e de serem cumpridas suas condições, limites e exclusões." },
        { question: "O seguro cobre acidentes esportivos?", answer: "Depende da apólice. Algumas modalidades esportivas podem ter cobertura específica. Consulte-nos para verificar." },
        { question: "Existe carência?", answer: "Depende da apólice. A vigência, eventual carência e os requisitos de pagamento devem ser conferidos na proposta e nas condições contratuais." },
      ]}
      relatedInsurances={[
        { title: "Seguro de Vida", link: "/seguro-vida" },
        { title: "Contratar Acidentes Pessoais (LP)", link: "/lp/seguro-acidentes-pessoais" },
        { title: "Seguro APP para Passageiros", link: "/seguro-acidentes-pessoais-passageiros" },
        { title: "Planos de Saúde", link: "/planos-de-saude" },
        { title: "Plano Saúde Sênior Guarulhos", link: "/planos-saude-senior-guarulhos" },
        { title: "Seguro Viagem", link: "/seguro-viagem" },
        { title: "Seguro Estagiário", link: "/seguro-estagiario" },
        { title: "Seguradoras Parceiras", link: "/seguradoras-parceiras" },
      ]}
    />
  );
};

export default SeguroAcidentesPessoais;
