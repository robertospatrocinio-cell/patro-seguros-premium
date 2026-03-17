import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-seguro-rc.webp";

const SeguroRCDentistas = () => {
  return (
    <InsurancePageTemplate
      heroImage={heroImg}
      title="Seguro RC Dentistas"
      subtitle="Proteção contra processos por alegação de erro odontológico"
      icon="🦷"
      metaDescription="Seguro RC para Dentistas — proteção contra processos por erro odontológico, danos estéticos e negligência. A Patro Seguros é especialista em RC. Cotação grátis."
      description="O Seguro RC para Dentistas protege o profissional e a clínica contra reclamações por alegação de erro, negligência ou resultado insatisfatório em tratamentos odontológicos. A Patro Seguros é especialista neste tipo de seguro e oferece as melhores condições do mercado."
      detailedDescription={`A odontologia é uma das profissões com maior crescimento de processos judiciais no Brasil. Procedimentos estéticos (lentes de contato dental, implantes, ortodontia) elevaram as expectativas dos pacientes — e, com elas, as reclamações quando o resultado não atende às expectativas.

Dados do Conselho Federal de Odontologia mostram que processos éticos e judiciais contra dentistas crescem mais de 10% ao ano. Implantes que falham, tratamentos de canal com complicações, próteses mal adaptadas e procedimentos estéticos insatisfatórios lideram as causas.

A Patro Seguros é especialista em Seguro RC Profissional e trabalha com seguradoras que conhecem os riscos específicos da odontologia — de clínicos gerais a implantodontistas e ortodontistas. Garantimos coberturas adequadas ao menor custo.`}
      howItWorks={[
        { step: "1", title: "Análise da Especialidade", description: "Avaliamos sua área (clínica geral, implantodontia, ortodontia, estética) e volume de procedimentos." },
        { step: "2", title: "Cotação Especializada", description: "A Patro Seguros cota com seguradoras que entendem os riscos odontológicos e oferecem coberturas específicas." },
        { step: "3", title: "Proteção sob Medida", description: "Apólice dimensionada para seu perfil, com coberturas para danos estéticos, materiais e morais." },
        { step: "4", title: "Suporte Completo", description: "Em caso de reclamação, a Patro Seguros acompanha todo o processo com a seguradora." },
      ]}
      coverages={[
        { title: "Erros em Procedimentos Odontológicos", description: "Cobertura para alegações de erro em tratamentos, cirurgias, implantes, endodontia e demais procedimentos." },
        { title: "Danos Estéticos", description: "Proteção contra reclamações por resultado estético insatisfatório — especialmente em lentes, facetas, clareamento e harmonização." },
        { title: "Complicações em Implantes", description: "Cobertura para falhas em implantes dentários: rejeição, infecção, posicionamento incorreto e perda do implante." },
        { title: "Problemas em Próteses", description: "Proteção contra reclamações por próteses mal adaptadas, desconfortáveis ou com defeito funcional." },
        { title: "Custos de Defesa Jurídica", description: "Honorários de advogados, perícias odontológicas, custas processuais — cobertos mesmo se absolvido." },
        { title: "Processos Éticos no CRO", description: "Custos de defesa em processos no Conselho Regional de Odontologia." },
        { title: "Danos Morais", description: "Indenizações por sofrimento, constrangimento e dor do paciente decorrentes de alegação de erro." },
        { title: "Cobertura Retroativa", description: "Proteção contra reclamações referentes a procedimentos realizados antes da contratação do seguro." },
      ]}
      pricingInfo={{
        intro: "O RC para dentistas é acessível e a Patro Seguros garante as melhores condições como especialista em RC Profissional.",
        factors: [
          "Especialidade odontológica — clínica geral, implantodontia, ortodontia, estética",
          "Volume de procedimentos realizados",
          "Limite de cobertura contratado",
          "Número de profissionais cobertos (clínica com vários dentistas)",
          "Histórico de reclamações",
          "Atuação como pessoa física ou jurídica",
        ],
        note: "Dentista clínico geral: R$ 800 a R$ 2.500/ano. Implantodontista e especialista em estética: R$ 2.000 a R$ 6.000/ano. Compare com o valor médio de um processo odontológico (R$ 30.000 a R$ 150.000).",
      }}
      realScenarios={[
        { title: "Paciente insatisfeita com lentes de contato dental", description: "Paciente processou dentista por resultado insatisfatório em lentes de contato dental, pedindo R$ 80.000. O RC cobriu a defesa e o acordo de R$ 35.000." },
        { title: "Falha em implante dentário", description: "Implante rejeitado gerou infecção e necessidade de enxerto ósseo. Paciente processou pedindo R$ 120.000. O seguro cobriu toda a defesa e o acordo final." },
        { title: "Complicação em tratamento de canal", description: "Instrumento fraturado dentro do canal radicular resultou em perda do dente. Processo de R$ 40.000 coberto integralmente pelo RC." },
      ]}
      tips={[
        "Documente com fotos antes e depois de todos os procedimentos estéticos",
        "Obtenha TCLE detalhado para implantes, cirurgias e procedimentos invasivos",
        "Mantenha prontuário odontológico completo e atualizado",
        "Alinhe expectativas com o paciente antes de procedimentos estéticos",
        "Comunique qualquer reclamação à seguradora imediatamente",
      ]}
      whoNeeds={[
        "Dentistas clínicos gerais",
        "Implantodontistas e protesistas",
        "Ortodontistas e especialistas em estética dental",
        "Endodontistas e periodontistas",
        "Cirurgiões bucomaxilofaciais",
        "Clínicas odontológicas e franquias",
      ]}
      whyPatro={[
        "Especialista em RC Profissional — a Patro Seguros é referência neste segmento",
        "Cotação com seguradoras que conhecem os riscos odontológicos",
        "Apólices específicas para cada especialidade odontológica",
        "Acompanhamento integral em caso de sinistro",
        "Orientação sobre limites e coberturas ideais",
        "Condições diferenciadas para clínicas com múltiplos profissionais",
      ]}
      faqs={[
        { question: "Dentista precisa de seguro RC?", answer: "Sim, especialmente com o crescimento de procedimentos estéticos e a maior exigência dos pacientes. Processos contra dentistas crescem mais de 10% ao ano. A Patro Seguros é especialista neste tipo de seguro." },
        { question: "Procedimentos estéticos são cobertos?", answer: "Sim, o RC cobre reclamações por resultados insatisfatórios em lentes de contato dental, facetas, clareamento, harmonização e outros procedimentos estéticos. É uma das coberturas mais demandadas." },
        { question: "O seguro cobre clínica com vários dentistas?", answer: "Sim, é possível contratar uma apólice coletiva que cubra todos os profissionais da clínica. A Patro Seguros dimensiona a cobertura para cada situação." },
        { question: "Quanto custa o RC para dentistas?", answer: "De R$ 800 a R$ 6.000/ano conforme a especialidade. A Patro Seguros, como especialista em RC Profissional, negocia as melhores taxas do mercado." },
      ]}
      relatedInsurances={[
        { title: "RC Profissional (E&O)", link: "/seguro-rc-profissional" },
        { title: "RC Médicos", link: "/seguro-rc-medicos" },
        { title: "Seguro Empresarial", link: "/seguro-empresarial" },
        { title: "Plano Odontológico", link: "/seguro-odonto" },
      ]}
    />
  );
};

export default SeguroRCDentistas;
