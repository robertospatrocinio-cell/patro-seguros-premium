import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-seguro-rc.webp";

const SeguroRCVeterinarios = () => {
  return (
    <InsurancePageTemplate
      title="Seguro RC Veterinários"
      subtitle="Proteção profissional para médicos veterinários e clínicas"
      icon="🐾"
      metaDescription="Seguro RC para Veterinários — proteção contra processos por erro profissional, óbito de animais e danos a tutores. A Patro Seguros é especialista em RC. Cotação grátis."
      description="O Seguro RC para Veterinários protege o profissional contra reclamações por alegação de erro, negligência ou imperícia no tratamento de animais. A Patro Seguros é especialista neste tipo de seguro e oferece apólices sob medida para cada perfil veterinário."
      detailedDescription={`O mercado pet brasileiro é o terceiro maior do mundo, e com ele cresce o número de processos contra médicos veterinários. Tutores cada vez mais exigentes tratam seus animais como membros da família — e não hesitam em processar quando algo dá errado.

Cirurgias que resultam em óbito, diagnósticos tardios, reações adversas a medicamentos, complicações anestésicas e até tosas que causam lesões são causas frequentes de ações judiciais. As indenizações incluem danos materiais (valor do animal, tratamentos corretivos) e danos morais (sofrimento do tutor).

A Patro Seguros é especialista em RC Profissional e conhece as particularidades do exercício da medicina veterinária. Cotamos com seguradoras que entendem os riscos específicos da profissão — de clínicos de pequenos animais a veterinários rurais que atuam com rebanhos de alto valor.`}
      howItWorks={[
        { step: "1", title: "Análise do Perfil", description: "Avaliamos sua área de atuação (pequenos animais, grandes animais, silvestres), volume de atendimentos e tipos de procedimentos." },
        { step: "2", title: "Cotação Especializada", description: "A Patro Seguros cota com seguradoras especializadas em RC Veterinário, garantindo coberturas adequadas ao seu risco." },
        { step: "3", title: "Emissão sob Medida", description: "Apólice personalizada para sua especialidade, com limites e coberturas dimensionados para sua realidade." },
        { step: "4", title: "Suporte Integral", description: "Em caso de reclamação, acompanhamos todo o processo junto à seguradora — da abertura à conclusão." },
      ]}
      coverages={[
        { title: "Erros em Diagnóstico e Tratamento", description: "Cobertura para alegações de diagnóstico incorreto, tardio ou tratamento inadequado que resulte em agravamento do quadro ou óbito do animal." },
        { title: "Complicações Cirúrgicas", description: "Proteção contra reclamações por complicações em cirurgias, inclusive procedimentos eletivos como castrações e cirurgias ortopédicas." },
        { title: "Reações Adversas a Medicamentos", description: "Cobertura para danos causados por prescrição ou administração de medicamentos que gerem reações adversas no animal." },
        { title: "Danos Morais ao Tutor", description: "Indenizações por sofrimento emocional do tutor em caso de óbito ou sequela permanente do animal." },
        { title: "Custos de Defesa Jurídica", description: "Honorários de advogados, custas processuais e perícias — cobertos mesmo se o veterinário for absolvido." },
        { title: "Processos Éticos no CRMV", description: "Custos de defesa em processos ético-disciplinares no Conselho Regional de Medicina Veterinária." },
        { title: "Danos a Animais de Alto Valor", description: "Cobertura para animais de alto valor genético ou comercial — cavalos, bovinos de elite, animais de exposição." },
        { title: "Custódia e Hospedagem", description: "Cobertura para danos a animais sob custódia em internação, hospedagem ou hotel pet." },
      ]}
      pricingInfo={{
        intro: "O custo do RC Veterinário é acessível e a Patro Seguros, como especialista, encontra as melhores condições do mercado.",
        factors: [
          "Área de atuação — pequenos animais, grandes animais, silvestres",
          "Volume de atendimentos e procedimentos cirúrgicos",
          "Limite de cobertura contratado",
          "Atuação em clínica própria, hospital veterinário ou a campo",
          "Serviços de hospedagem e internação",
          "Histórico de reclamações",
        ],
        note: "Veterinários de pequenos animais: R$ 800 a R$ 3.000/ano. Veterinários cirurgiões e de grandes animais: R$ 2.000 a R$ 8.000/ano. Um custo mínimo comparado ao valor de um processo judicial.",
      }}
      realScenarios={[
        { title: "Óbito de cão durante castração", description: "Tutor processou clínica veterinária por óbito durante castração eletiva, pedindo R$ 50.000 em danos morais. O RC cobriu a defesa jurídica e o acordo de R$ 25.000, protegendo o patrimônio do veterinário." },
        { title: "Diagnóstico tardio em cavalo de competição", description: "Proprietário de cavalo de competição alegou diagnóstico tardio de cólica que resultou em óbito do animal avaliado em R$ 200.000. O seguro cobriu toda a defesa e a indenização." },
        { title: "Lesão em tosa de pet shop", description: "Animal sofreu corte profundo durante tosa, necessitando cirurgia reparadora. Tutor processou pedindo R$ 15.000. O RC cobriu integralmente o caso." },
      ]}
      tips={[
        "Mantenha prontuor veterinário detalhado de todos os atendimentos",
        "Obtenha autorização por escrito para procedimentos cirúrgicos e anestésicos",
        "Documente o estado do animal na chegada (fotos e descrição)",
        "Comunique riscos e complicações possíveis ao tutor antes de procedimentos",
        "Contrate RC mesmo se atuar em clínica de terceiros — proteja seu patrimônio pessoal",
      ]}
      whoNeeds={[
        "Veterinários clínicos de pequenos animais (cães e gatos)",
        "Veterinários cirurgiões — ortopedia, oftalmologia, oncologia",
        "Veterinários de grandes animais — equinos e bovinos",
        "Veterinários rurais — rebanhos e animais de produção",
        "Clínicas veterinárias e hospitais veterinários",
        "Pet shops que oferecem banho, tosa e hospedagem",
        "Veterinários de animais silvestres e exóticos",
      ]}
      whyPatro={[
        "Especialista em Seguro RC Profissional — conhecemos os riscos da medicina veterinária",
        "Cotação com seguradoras que entendem o mercado veterinário e pet",
        "Apólices sob medida para cada perfil — de clínico a cirurgião rural",
        "Acompanhamento completo em sinistros — da notificação à conclusão",
        "Orientação sobre coberturas para animais de alto valor",
        "A Patro Seguros é referência em RC para profissionais da saúde animal",
      ]}
      faqs={[
        { question: "Veterinário precisa de seguro RC?", answer: "Sim. Processos contra veterinários crescem a cada ano, impulsionados pela valorização dos pets como membros da família. Um único processo pode comprometer o patrimônio do profissional. A Patro Seguros é especialista neste tipo de seguro." },
        { question: "O RC cobre óbito de animal?", answer: "Sim, cobre indenizações por danos materiais (valor do animal) e danos morais ao tutor em caso de óbito decorrente de alegação de erro profissional. É uma das coberturas mais acionadas." },
        { question: "Pet shops precisam de RC?", answer: "Sim, especialmente para serviços de banho, tosa, hospedagem e internação. Lesões durante tosa, fugas e óbitos durante hospedagem são causas frequentes de processos. A Patro Seguros oferece apólices específicas." },
        { question: "Quanto custa o RC para veterinários?", answer: "De R$ 800 a R$ 8.000/ano conforme o perfil. A Patro Seguros, como especialista em RC Profissional, negocia as melhores condições com seguradoras especializadas." },
      ]}
      relatedInsurances={[
        { title: "RC Profissional (E&O)", link: "/seguro-rc-profissional" },
        { title: "RC Médicos", link: "/seguro-rc-medicos" },
        { title: "Seguro Empresarial", link: "/seguro-empresarial" },
        { title: "RC Geral", link: "/seguro-rc" },
      ]}
    />
  );
};

export default SeguroRCVeterinarios;
