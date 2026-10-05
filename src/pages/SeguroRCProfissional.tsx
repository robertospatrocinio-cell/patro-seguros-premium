import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-seguro-rc.webp";

const SeguroRCProfissional = () => {
  return (
    <InsurancePageTemplate
      heroImage={heroImg}
      title="Seguro RC Profissional (E&O)"
      subtitle="Proteção para profissionais liberais contra erros e omissões"
      icon="👔"
      metaDescription="Seguro RC Profissional (E&O) para médicos, advogados, engenheiros, contadores e arquitetos. Proteção contra erros e omissões. Cotação grátis Patro Seguros."
      description="O Seguro de Responsabilidade Civil Profissional (E&O) pode proteger contra reclamações relacionadas à prestação dos serviços profissionais do segurado, conforme profissão, produto e condições contratuais."
      detailedDescription={`Profissionais liberais investem anos de estudo e dedicação para construir suas carreiras. Porém, um único processo por erro profissional pode destruir patrimônio pessoal acumulado ao longo de décadas. Médicos, advogados, engenheiros, arquitetos, contadores — todos estão expostos a reclamações que podem resultar em indenizações milionárias.

O Seguro RC Profissional (também chamado E&O — Errors & Omissions) pode oferecer proteção financeira para reclamações relacionadas a erro, omissão ou falha profissional alegada na prestação do serviço. Custos de defesa, indenizações, processos administrativos e reclamações éticas dependem das coberturas, limites, exclusões e condições do contrato.

A realidade brasileira mostra crescimento constante no número de processos contra profissionais liberais. Médicos enfrentam em média 1 processo a cada 5 anos de carreira. Advogados, engenheiros e contadores também estão cada vez mais expostos. Na Patro Seguros, oferecemos apólices específicas por profissão, com limites e coberturas adequados ao risco real de cada atividade.`}
      howItWorks={[
        { step: "1", title: "Identificação da Profissão", description: "Analisamos sua especialidade, tempo de atuação, volume de clientes e histórico para definir o perfil de risco" },
        { step: "2", title: "Definição de Coberturas", description: "Escolhemos coberturas específicas para sua profissão: erros, omissões, negligência, imperícia e processos éticos" },
        { step: "3", title: "Cotação Especializada", description: "Buscamos propostas de seguradoras que operam com RC Profissional, garantindo limites e condições adequados" },
        { step: "4", title: "Proteção conforme o contrato", description: "Em caso de reclamação, a seguradora poderá prestar ou reembolsar defesa e indenização conforme as coberturas, limites e procedimentos da apólice" },
      ]}
      coverages={[
        { title: "Erros Profissionais", description: "Cobertura para equívocos na prestação de serviços" },
        { title: "Omissões", description: "Proteção por falhas em orientações ou procedimentos" },
        { title: "Negligência", description: "Cobertura para descuidos na execução do trabalho" },
        { title: "Imperícia", description: "Proteção por falta de conhecimento técnico alegado" },
        { title: "Despesas de Defesa", description: "Custos com advogados e processos administrativos/judiciais" },
        { title: "Indenizações", description: "Pagamento de condenações até o limite da apólice" },
        { title: "Danos Morais e Materiais", description: "Cobertura para prejuízos causados ao cliente" },
        { title: "Processos éticos", description: "Alguns produtos podem oferecer defesa em conselhos profissionais, conforme profissão, cobertura e condições contratuais." },
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
        { title: "Base de reclamações", content: "A forma de acionamento, a retroatividade e eventuais prazos complementar ou suplementar dependem das condições do produto. Verifique as datas de ocorrência, reclamação, notificação e aviso previstas na apólice." },
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
        { question: "Cobre reclamações relacionadas a fatos anteriores?", answer: "Pode haver cobertura retroativa, prazo complementar ou prazo suplementar, conforme o produto e a apólice. As datas e condições devem ser analisadas antes da contratação." },
        { question: "Qual o limite de cobertura recomendado?", answer: "Depende da profissão e especialidade. Cirurgiões precisam de limites maiores que clínicos gerais, por exemplo. Orientamos conforme seu perfil." },
        { question: "Cobre processos em conselhos profissionais?", answer: "Alguns produtos oferecem custos de defesa em processos éticos ou administrativos. A cobertura depende da profissão, da seguradora e das condições contratadas." },
      ]}
      relatedInsurances={[
        { title: "Seguro Responsabilidade Civil", link: "/seguro-rc" },
        { title: "Seguro de Vida", link: "/seguro-vida" },
        { title: "Seguro Empresarial", link: "/seguro-empresarial" },
        { title: "Seguro para Consultórios e Clínicas", link: "/seguro-consultorio-guarulhos" },
        { title: "Consultório Médico em Guarulhos", link: "/seguro-consultorio-medico-guarulhos" },
        { title: "Consultório Odontológico em Guarulhos", link: "/seguro-consultorio-odontologico-guarulhos" },
        { title: "Clínica de Estética em Guarulhos", link: "/seguro-clinica-estetica-guarulhos" },
        { title: "Seguro para Sala Comercial em Guarulhos", link: "/seguro-sala-comercial-guarulhos" },
      ]}
    />
  );
};

export default SeguroRCProfissional;
