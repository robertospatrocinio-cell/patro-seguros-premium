import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-seguro-rc.webp";

const SeguroRCExecutivos = () => {
  return (
    <InsurancePageTemplate
      heroImage={heroImg}
      title="Seguro RC Executivos (D&O)"
      subtitle="Proteção patrimonial para diretores, administradores e conselheiros"
      icon="👔"
      metaDescription="Seguro RC Executivos (D&O) para diretores e administradores: proteção contra processos, reclamações e indenizações. Especialistas em RC."
      description="O Seguro RC Executivos (D&O) pode proteger diretores, administradores e conselheiros contra reclamações relacionadas a atos de gestão, conforme o produto e as condições da apólice."
      detailedDescription={`Em um cenário corporativo cada vez mais regulado e litigioso, executivos estão pessoalmente expostos a processos judiciais, administrativos e regulatórios decorrentes de suas decisões de gestão. O Seguro D&O é a principal ferramenta para blindar o patrimônio pessoal desses profissionais.

Ações de acionistas minoritários, investigações de órgãos reguladores (CVM, CADE, Receita Federal), processos trabalhistas movidos por funcionários, reclamações de credores em recuperação judicial — todas essas situações podem atingir diretamente os bens pessoais dos executivos, mesmo quando agiram de boa-fé.

O D&O pode contemplar custos de defesa, indenizações, acordos e extensões para multas quando previstas, juridicamente permitidas e contratadas. A cobertura é dirigida aos segurados definidos na apólice e não elimina automaticamente a responsabilidade pessoal do administrador nem protege qualquer ato ou conduta.

Na Patro Seguros, somos especialistas em seguros de Responsabilidade Civil e entendemos as particularidades do mercado D&O. Analisamos a estrutura societária, o segmento de atuação e os riscos específicos para recomendar limites e coberturas adequados, sempre com as melhores seguradoras do mercado.`}
      howItWorks={[
        { step: "1", title: "Análise da Estrutura Societária", description: "Avaliamos a composição da diretoria, conselho e estrutura de governança para identificar exposições de risco" },
        { step: "2", title: "Mapeamento de Riscos", description: "Identificamos os principais riscos regulatórios, trabalhistas, societários e fiscais do segmento de atuação" },
        { step: "3", title: "Cotação Especializada", description: "Negociamos com seguradoras especializadas em D&O para obter as melhores condições e limites adequados" },
        { step: "4", title: "Proteção conforme a apólice", description: "Em caso de reclamação, a seguradora poderá prestar ou reembolsar custos de defesa e indenizações conforme o contrato, limites e exclusões" },
      ]}
      coverages={[
        { title: "Custos de Defesa", description: "Honorários advocatícios e despesas processuais em ações judiciais e administrativas" },
        { title: "Indenizações e Acordos", description: "Valores de condenações e acordos homologados judicialmente" },
        { title: "Processos Regulatórios", description: "Defesa perante CVM, CADE, Receita Federal e demais órgãos reguladores" },
        { title: "Reclamações Trabalhistas", description: "Processos movidos por funcionários contra executivos pessoalmente" },
        { title: "Ações de Acionistas", description: "Reclamações de acionistas minoritários por prejuízos em decisões de gestão" },
        { title: "Investigações", description: "Custos de defesa em investigações criminais e administrativas" },
        { title: "Cônjuge e Herdeiros", description: "Extensão da cobertura ao patrimônio do cônjuge e herdeiros do executivo" },
        { title: "Multas e Penalidades", description: "Algumas extensões podem contemplar multas ou penalidades juridicamente seguráveis, conforme a apólice e seus limites." },
      ]}
      coverageExclusions={[
        "Atos dolosos comprovados judicialmente (fraude, desonestidade)",
        "Benefícios ou vantagens pessoais obtidas ilicitamente",
        "Multas de natureza criminal ou penal",
        "Danos corporais e materiais diretos (cobertos pelo RC Geral)",
        "Atos anteriores à retroatividade da apólice com conhecimento prévio",
        "Poluição ambiental (cobertura específica necessária)",
        "Reclamações entre segurados (litígio entre diretores da mesma empresa)",
      ]}
      pricingInfo={{
        intro: "O custo do D&O varia conforme o porte da empresa, segmento, estrutura societária e limite de cobertura.",
        factors: [
          "Faturamento e porte da empresa",
          "Segmento de atuação e nível de regulação",
          "Número de diretores, conselheiros e gestores segurados",
          "Limite de indenização desejado (R$ 1 milhão a R$ 100 milhões+)",
          "Histórico de reclamações e processos contra a administração",
          "Se a empresa possui ações em bolsa (companhias abertas pagam mais)",
        ],
        note: "Uma empresa de médio porte pode investir a partir de R$ 8.000/ano com limite de R$ 5 milhões. Companhias abertas ou de grande porte investem de R$ 50.000 a R$ 300.000+/ano com limites maiores.",
      }}
      realScenarios={[
        { title: "Ação de acionista minoritário", description: "Um acionista processou o CEO por decisão estratégica que resultou em queda nas ações. O D&O cobriu R$ 800.000 em custos de defesa e acordo judicial, protegendo o patrimônio pessoal do executivo." },
        { title: "Investigação fiscal", description: "A Receita Federal abriu investigação contra o diretor financeiro por supostas irregularidades tributárias. O seguro cobriu R$ 250.000 em honorários de defesa durante dois anos de processo administrativo." },
        { title: "Processo trabalhista contra diretor", description: "Um ex-funcionário processou pessoalmente o diretor de RH por assédio moral. O D&O cobriu R$ 180.000 em defesa e indenização, preservando os bens pessoais do executivo." },
      ]}
      importantDetails={[
        { title: "Base de reclamações", content: "A forma de acionamento, as datas relevantes, a retroatividade e eventuais prazos complementar ou suplementar dependem das condições contratuais do produto. Não se deve presumir a mesma estrutura para todo D&O." },
        { title: "Limite Agregado", content: "O limite de indenização é compartilhado entre todos os segurados (diretores e conselheiros). Um único processo grande pode consumir boa parte do limite, deixando os demais desprotegidos." },
        { title: "Run-Off", content: "Quando um executivo deixa o cargo, é importante garantir a extensão de cobertura (run-off) para reclamações futuras relacionadas ao período de gestão." },
      ]}
      tips={[
        "Mantenha a apólice D&O sempre ativa — lacunas de cobertura podem deixar períodos de gestão descobertos",
        "Contrate limites compatíveis com o porte e risco do negócio — processos contra executivos podem ultrapassar milhões de reais",
        "Garanta cláusula de run-off para executivos que deixam a empresa, protegendo contra reclamações futuras",
        "Revise a apólice sempre que houver mudanças na estrutura societária, fusões ou aquisições",
        "Documente todas as decisões estratégicas em atas — isso fortalece a defesa em caso de reclamações",
      ]}
      whoNeeds={[
        "CEOs, CFOs, COOs e diretores estatutários",
        "Membros de conselhos de administração e fiscal",
        "Gestores de empresas de capital aberto",
        "Diretores de empresas em fase de IPO",
        "Executivos de empresas em recuperação judicial",
        "Administradores de fundações e ONGs",
      ]}
      whyPatro={[
        "Especialistas em seguros de Responsabilidade Civil",
        "Análise detalhada da estrutura societária e riscos",
        "Parcerias com seguradoras líderes em D&O no Brasil",
        "Consultoria sobre limites, retroatividade e run-off",
        "Suporte dedicado em caso de reclamações e processos",
        "Revisão contínua conforme mudanças na governança corporativa",
      ]}
      faqs={[
        { question: "Qual a diferença entre D&O e RC Profissional?", answer: "O D&O protege executivos por decisões de gestão empresarial. O RC Profissional protege contra erros técnicos na prestação de serviços. São coberturas complementares para perfis de risco diferentes." },
        { question: "O D&O cobre multas?", answer: "Depende da cobertura contratada e da natureza da penalidade. Algumas extensões podem contemplar multas ou penalidades juridicamente seguráveis, observados os limites, exclusões e condições da apólice." },
        { question: "Empresa de pequeno porte precisa de D&O?", answer: "Sim! Qualquer executivo que toma decisões estratégicas está exposto a riscos. Processos trabalhistas e fiscais atingem empresas de todos os portes." },
        { question: "O que acontece quando o executivo sai da empresa?", answer: "Com a cláusula de run-off, a cobertura é estendida por um período (geralmente 1 a 5 anos) para reclamações relacionadas ao período de gestão." },
        { question: "O seguro cobre processos criminais?", answer: "A cobertura de defesa em processos criminais, quando oferecida, depende do produto e das condições contratuais. Atos dolosos, fraude e condutas intencionais devem ser analisados conforme a regulamentação e a apólice, podendo existir direito de ressarcimento." },
        { question: "Por que a Patro Seguros é referência em D&O?", answer: "Somos especialistas em Responsabilidade Civil com profundo conhecimento do mercado D&O. Analisamos sua governança corporativa e negociamos condições diferenciadas com seguradoras líderes." },
      ]}
      relatedInsurances={[
        { title: "Seguro RC Profissional", link: "/seguro-rc-profissional" },
        { title: "Seguro RC Geral", link: "/seguro-rc" },
        { title: "Seguro Empresarial", link: "/seguro-empresarial" },
        { title: "Seguro Cyber", link: "/seguro-cyber" },
      ]}
    />
  );
};

export default SeguroRCExecutivos;
