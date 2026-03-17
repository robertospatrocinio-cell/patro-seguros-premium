import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-seguro-rc.webp";

const SeguroRCMedicos = () => {
  return (
    <InsurancePageTemplate
      title="Seguro RC Médicos"
      subtitle="Proteção patrimonial contra processos por erro médico"
      icon="🩺"
      metaDescription="Seguro RC para Médicos — proteção contra processos por erro médico, custos de defesa e indenizações. A Patro Seguros é especialista em RC Profissional. Cotação grátis."
      description="O Seguro de Responsabilidade Civil para Médicos protege o patrimônio do profissional contra reclamações de pacientes por alegação de erro, omissão ou negligência. A Patro Seguros é especialista neste tipo de seguro e trabalha com as principais seguradoras do mercado."
      detailedDescription={`O Brasil é o segundo país do mundo em número de processos contra médicos. Condenações podem ultrapassar R$ 500.000, e os custos de defesa durante anos de processo comprometem o patrimônio do profissional mesmo quando ele é absolvido.

A Patro Seguros é especialista em Seguro RC para Médicos e conhece as particularidades de cada especialidade — do clínico geral ao cirurgião plástico. Cotamos com seguradoras especializadas para encontrar a melhor proteção ao menor custo.

Mesmo médicos que atuam com excelência estão expostos: complicações inerentes a procedimentos, expectativas irreais de pacientes e até má-fé são causas frequentes de litígios. O RC Médico não protege contra o erro — protege o patrimônio contra as consequências financeiras de uma alegação.`}
      howItWorks={[
        { step: "1", title: "Análise da Especialidade", description: "Avaliamos sua especialidade, volume de atendimentos, tipos de procedimentos e perfil de risco para dimensionar a cobertura ideal." },
        { step: "2", title: "Cotação Especializada", description: "A Patro Seguros cota com seguradoras especializadas em RC Médico, comparando preços e coberturas para cada perfil." },
        { step: "3", title: "Emissão da Apólice", description: "Apólice emitida com coberturas específicas para sua especialidade, incluindo retroatividade quando necessário." },
        { step: "4", title: "Suporte em Sinistros", description: "Em caso de processo, a Patro Seguros acompanha todo o trâmite com a seguradora: designação de advogados, defesa e indenização." },
      ]}
      coverages={[
        { title: "Indenizações por Danos a Pacientes", description: "Danos materiais, morais e estéticos decorrentes de alegação de erro médico. Inclui pensão vitalícia e lucros cessantes do paciente." },
        { title: "Custos de Defesa Jurídica", description: "Honorários de advogados especializados, custas processuais, perícias e assistente técnico — cobertos mesmo se o médico for absolvido." },
        { title: "Processos Éticos no CRM", description: "Custos de defesa em processos ético-disciplinares no Conselho Regional de Medicina." },
        { title: "Processos Criminais", description: "Defesa em ações criminais por lesão corporal culposa ou homicídio culposo decorrentes de ato médico." },
        { title: "Cobertura Retroativa", description: "Protege contra reclamações feitas durante a vigência, referentes a atos praticados antes da contratação." },
        { title: "Danos Estéticos", description: "Cobertura específica para indenizações por sequelas estéticas — essencial para cirurgiões plásticos e dermatologistas." },
      ]}
      coverageExclusions={[
        "Atos dolosos (intencionais) praticados pelo médico",
        "Procedimentos realizados sem habilitação legal ou fora da especialidade registrada",
        "Uso de técnicas experimentais não aprovadas pelo CFM",
        "Exercício ilegal da medicina",
        "Danos decorrentes de procedimentos estéticos sem TCLE assinado",
      ]}
      pricingInfo={{
        intro: "O custo do RC Médico varia conforme a especialidade. A Patro Seguros, como especialista, negocia as melhores taxas do mercado.",
        factors: [
          "Especialidade médica — principal fator de precificação",
          "Limite de cobertura — de R$ 100.000 a R$ 2.000.000 por sinistro",
          "Volume de procedimentos e atendimentos",
          "Histórico de sinistros (processos anteriores)",
          "Período de cobertura retroativa",
          "Atuação como pessoa física ou jurídica",
        ],
        note: "Clínica geral: R$ 1.500 a R$ 4.000/ano. Cirurgia plástica e obstetrícia: R$ 6.000 a R$ 20.000/ano. Compare com o valor de um único processo (R$ 200.000+) e veja que o seguro é indispensável.",
      }}
      realScenarios={[
        { title: "Cirurgião plástico processado por rinoplastia", description: "Paciente insatisfeita com resultado de rinoplastia processou o cirurgião pedindo R$ 300.000. O RC cobriu a defesa jurídica (R$ 45.000) e o acordo judicial (R$ 120.000), protegendo o patrimônio do médico." },
        { title: "Obstetra processado por complicação no parto", description: "Família processou obstetra por paralisia cerebral do recém-nascido, pedindo indenização de R$ 1.500.000 + pensão vitalícia. O seguro cobriu toda a defesa durante 6 anos de processo e o acordo final." },
        { title: "Clínico geral processado por diagnóstico tardio", description: "Paciente alegou que atraso no diagnóstico de câncer agravou o quadro. Processo de R$ 250.000. O RC cobriu os custos de defesa e o médico foi absolvido — sem desembolsar nada do próprio bolso." },
      ]}
      tips={[
        "Mantenha prontuários detalhados — é a melhor defesa em processos",
        "Obtenha TCLE assinado para todo procedimento invasivo",
        "Não confie apenas no RC do hospital — contrate seu próprio",
        "Comunique à seguradora ao primeiro sinal de reclamação",
        "Escolha limites de cobertura compatíveis com sua especialidade",
      ]}
      whoNeeds={[
        "Cirurgiões plásticos, ortopedistas, ginecologistas e obstetras",
        "Neurocirurgiões, anestesistas e cardiologistas intervencionistas",
        "Dermatologistas e oftalmologistas que realizam procedimentos",
        "Clínicos gerais, pediatras e médicos do trabalho",
        "Psiquiatras, urologistas e médicos de todas as especialidades",
        "Médicos autônomos, cooperados e que atuam em múltiplas instituições",
      ]}
      whyPatro={[
        "Especialista em Seguro RC Profissional — conhecemos cada especialidade médica",
        "Cotação com seguradoras especializadas em RC Médico",
        "Orientação sobre limites e coberturas adequados ao seu risco",
        "Apólices com cobertura retroativa para atos anteriores",
        "Acompanhamento completo em caso de sinistro — da comunicação à conclusão",
        "Atendimento consultivo personalizado para cada perfil médico",
      ]}
      faqs={[
        { question: "O RC do hospital me cobre individualmente?", answer: "Na maioria dos casos, não. O RC da instituição cobre a pessoa jurídica. Se o paciente processar você pessoalmente, precisa de sua própria apólice. A Patro Seguros recomenda RC pessoal mesmo para médicos com vínculo institucional." },
        { question: "Quanto custa o RC para médicos?", answer: "De R$ 1.500/ano (clínica geral) a R$ 20.000/ano (cirurgia plástica, neurocirurgia). A Patro Seguros, como especialista, consegue as melhores condições do mercado para cada especialidade." },
        { question: "O seguro cobre processos de atos anteriores?", answer: "Sim, com cobertura retroativa. A apólice protege contra reclamações feitas durante a vigência referentes a atos praticados antes da contratação, dentro do período retroativo definido." },
        { question: "Processos éticos no CRM são cobertos?", answer: "Sim, muitas apólices cobrem custos de defesa em processos ético-disciplinares no CRM. A Patro Seguros orienta sobre as melhores opções que incluem esta cobertura." },
        { question: "A Patro Seguros é especialista em RC Médico?", answer: "Sim! A Patro Seguros é especialista em seguros de Responsabilidade Civil Profissional, incluindo RC Médico para todas as especialidades. Trabalhamos com as principais seguradoras do mercado." },
      ]}
      relatedInsurances={[
        { title: "RC Profissional (E&O)", link: "/seguro-rc-profissional" },
        { title: "RC Dentistas", link: "/seguro-rc-dentistas" },
        { title: "RC Veterinários", link: "/seguro-rc-veterinarios" },
        { title: "Seguro de Vida", link: "/seguro-vida" },
      ]}
    />
  );
};

export default SeguroRCMedicos;
