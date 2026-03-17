import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-seguro-rc.webp";

const SeguroRCProfissional = () => {
  return (
    <InsurancePageTemplate
      title="Seguro RC Profissional (E&O)"
      subtitle="Proteção para profissionais liberais contra erros e omissões"
      icon="👔"
      metaDescription="Seguro RC Profissional (E&O) para médicos, advogados, engenheiros, contadores e arquitetos. Proteção contra erros e omissões. Cotação grátis Patro Seguros."
      description="O Seguro de Responsabilidade Civil Profissional (E&O) protege profissionais liberais contra reclamações de clientes por erros, omissões ou negligência na prestação de serviços."
      detailedDescription={`Profissionais liberais investem anos de estudo e dedicação para construir suas carreiras. Porém, um único processo por erro profissional pode destruir patrimônio pessoal acumulado ao longo de décadas. Médicos, advogados, engenheiros, arquitetos, contadores — todos estão expostos a reclamações que podem resultar em indenizações milionárias.

O Seguro RC Profissional (também chamado E&O — Errors & Omissions) é a proteção financeira que garante que um erro, omissão ou negligência alegada por um cliente não comprometa seu patrimônio pessoal e familiar. A seguradora assume os custos de defesa e eventuais indenizações.

A realidade brasileira mostra crescimento constante no número de processos contra profissionais liberais. Médicos enfrentam em média 1 processo a cada 5 anos de carreira. Advogados, engenheiros e contadores também estão cada vez mais expostos. Na Patro Seguros, oferecemos apólices específicas por profissão, com limites e coberturas adequados ao risco real de cada atividade.`}
      howItWorks={[
        { step: "1", title: "Identificação da Profissão", description: "Analisamos sua especialidade, tempo de atuação, volume de clientes e histórico para definir o perfil de risco" },
        { step: "2", title: "Definição de Coberturas", description: "Escolhemos coberturas específicas para sua profissão: erros, omissões, negligência, imperícia e processos éticos" },
        { step: "3", title: "Cotação Especializada", description: "Buscamos propostas de seguradoras que operam com RC Profissional, garantindo limites e condições adequados" },
        { step: "4", title: "Proteção Contínua", description: "Em caso de reclamação, a seguradora assume a defesa (judicial e ética) e paga indenizações até o limite da apólice" },
      ]}
      coverages={[
        { title: "Erros Profissionais", description: "Cobertura para equívocos na prestação de serviços" },
        { title: "Omissões", description: "Proteção por falhas em orientações ou procedimentos" },
        { title: "Negligência", description: "Cobertura para descuidos na execução do trabalho" },
        { title: "Imperícia", description: "Proteção por falta de conhecimento técnico alegado" },
        { title: "Despesas de Defesa", description: "Custos com advogados e processos administrativos/judiciais" },
        { title: "Indenizações", description: "Pagamento de condenações até o limite da apólice" },
        { title: "Danos Morais e Materiais", description: "Cobertura para prejuízos causados ao cliente" },
        { title: "Processos Éticos", description: "Defesa em conselhos profissionais (CRM, OAB, CREA, etc)" },
      ]}
      coverageExclusions={[
        "Atos dolosos (intencionais) do profissional",
        "Atividades exercidas sem habilitação ou registro profissional válido",
        "Garantia de resultado (o seguro cobre erro, não resultado insatisfatório por si só)",
        "Multas e penalidades tributárias/administrativas",
        "Fatos ocorridos antes da data de retroatividade da apólice",
        "Danos a familiares diretos do segurado",
        "Responsabilidade por empregados (cobertura específica de RC Empregador)",
      ]}
      pricingInfo={{
        intro: "O valor do RC Profissional varia muito conforme a profissão, especialidade e limite de cobertura.",
        factors: [
          "Profissão e especialidade (cirurgião paga mais que clínico geral)",
          "Tempo de atuação e volume de clientes/pacientes",
          "Limite de indenização desejado",
          "Histórico de reclamações e processos",
          "Localização geográfica de atuação",
          "Se atua como pessoa física ou através de empresa",
        ],
        note: "Um médico clínico geral pode pagar entre R$ 2.000 e R$ 5.000/ano. Um cirurgião plástico entre R$ 8.000 e R$ 25.000/ano. Advogados: R$ 1.500 a R$ 8.000/ano. Engenheiros: R$ 2.000 a R$ 10.000/ano. Tudo depende dos limites contratados.",
      }}
      realScenarios={[
        { title: "Médico processado por erro de diagnóstico", description: "Um clínico geral foi processado por suposto erro de diagnóstico que atrasou o tratamento de um paciente. O RC cobriu R$ 120.000 em honorários advocatícios e a defesa no CRM, resultando em absolvição total." },
        { title: "Advogado perdeu prazo processual", description: "Um advogado perdeu o prazo de recurso de um cliente, causando prejuízo financeiro. O RC Profissional cobriu R$ 85.000 em indenização ao cliente e R$ 25.000 em custos de defesa na OAB." },
        { title: "Engenheiro e falha estrutural", description: "Um engenheiro foi responsabilizado por problemas estruturais em uma obra. O RC cobriu R$ 350.000 em indenização e custos de reparo, além da defesa no CREA." },
      ]}
      importantDetails={[
        { title: "Base Claims-Made", content: "A maioria das apólices de RC Profissional opera na base claims-made: cobre reclamações feitas durante a vigência, independente de quando o fato ocorreu (desde que após a data de retroatividade). Manter a apólice ativa é essencial." },
        { title: "Processos éticos e administrativos", content: "Além de processos judiciais, o RC cobre defesa em conselhos profissionais (CRM, OAB, CREA, CRC, CREF, etc). Esses processos podem resultar em suspensão ou cassação do registro profissional." },
        { title: "Extensão para sociedade", content: "Se você atua em sociedade (clínica, escritório), é possível incluir sócios e associados na mesma apólice, com condições especiais." },
      ]}
      tips={[
        "Mantenha a apólice ativa continuamente — gaps de cobertura podem deixar você exposto a reclamações de fatos passados",
        "Documente tudo: prontuários, contratos, e-mails, orientações dadas. A documentação é sua principal defesa",
        "Comunique a seguradora imediatamente ao receber qualquer notificação, citação ou reclamação formal",
        "Escolha limites de cobertura compatíveis com o risco da sua especialidade — não economize nessa proteção",
        "Se mudar de especialidade ou área de atuação, informe a seguradora para manter a cobertura adequada",
      ]}
      whoNeeds={[
        "Médicos e profissionais de saúde",
        "Advogados e escritórios de advocacia",
        "Engenheiros e arquitetos",
        "Contadores e consultores financeiros",
        "Corretores de imóveis e seguros",
        "Consultores e profissionais liberais em geral",
      ]}
      whyPatro={[
        "Apólices específicas por profissão",
        "Limites de cobertura adequados ao risco da atividade",
        "Orientação sobre exclusões e coberturas",
        "Suporte completo em processos éticos e judiciais",
        "Parcerias com seguradoras especializadas em RC Profissional",
        "Análise de histórico e especialidade profissional",
      ]}
      faqs={[
        { question: "Por que preciso de RC Profissional?", answer: "Processos por erro profissional podem resultar em indenizações milionárias e comprometer todo seu patrimônio pessoal. O seguro protege você e sua família." },
        { question: "Quanto custa o seguro RC Profissional?", answer: "Varia conforme a profissão, especialidade, localização, tempo de atuação e limite de cobertura desejado. Fazemos cotação personalizada." },
        { question: "Cobre processos antigos?", answer: "Geralmente cobre processos de fatos ocorridos durante a vigência da apólice, mesmo que a reclamação seja feita depois. Analisamos as cláusulas de retroatividade." },
        { question: "Qual o limite de cobertura recomendado?", answer: "Depende da profissão e especialidade. Cirurgiões precisam de limites maiores que clínicos gerais, por exemplo. Orientamos conforme seu perfil." },
        { question: "Cobre processos em conselhos profissionais?", answer: "Sim! A maioria das apólices cobre defesa em processos éticos nos conselhos (CRM, OAB, CREA, CRC, etc)." },
      ]}
      relatedInsurances={[
        { title: "Seguro Responsabilidade Civil", link: "/seguro-rc" },
        { title: "Seguro de Vida", link: "/seguro-vida" },
        { title: "Seguro Empresarial", link: "/seguro-empresarial" },
      ]}
    />
  );
};

export default SeguroRCProfissional;
