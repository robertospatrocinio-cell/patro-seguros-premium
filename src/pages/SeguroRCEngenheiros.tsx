import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-seguro-rc.webp";

const SeguroRCEngenheiros = () => {
  return (
    <InsurancePageTemplate
      heroImage={heroImg}
      title="Seguro RC Engenheiros"
      subtitle="Proteção profissional para engenheiros e escritórios de engenharia"
      icon="🏗️"
      metaDescription="Seguro RC para Engenheiros — proteção contra processos por erro de projeto, falha estrutural e negligência. A Patro Seguros é especialista em RC. Cotação grátis."
      description="O Seguro RC para Engenheiros protege o profissional e o escritório contra reclamações por erros de projeto, cálculo, supervisão e execução de obras. A Patro Seguros é especialista neste tipo de seguro e oferece apólices adequadas a cada ramo da engenharia."
      detailedDescription={`A engenharia é uma profissão de altíssima responsabilidade. Um erro de cálculo estrutural, uma falha de projeto ou uma supervisão inadequada podem causar desabamentos, acidentes e prejuízos milionários. A responsabilidade civil do engenheiro se estende por até 5 anos após a entrega da obra (garantia legal do Código Civil).

Com o crescimento da construção civil e da infraestrutura no Brasil, os processos contra engenheiros e escritórios de engenharia também crescem. Vícios construtivos, patologias em edificações, laudos técnicos imprecisos e falhas em projetos são causas frequentes de ações judiciais.

A Patro Seguros é especialista em RC Profissional e trabalha com seguradoras que entendem os riscos da engenharia — civil, elétrica, mecânica, ambiental e de segurança do trabalho. Oferecemos apólices dimensionadas para cada perfil e porte de projeto.`}
      howItWorks={[
        { step: "1", title: "Análise do Perfil", description: "Avaliamos seu ramo de engenharia, porte dos projetos, volume de obras e faturamento para dimensionar a cobertura ideal." },
        { step: "2", title: "Cotação Especializada", description: "A Patro Seguros cota com seguradoras especializadas em RC para engenharia, garantindo coberturas e limites adequados." },
        { step: "3", title: "Apólice sob Medida", description: "Emissão de apólice personalizada com coberturas específicas para seu ramo e tipo de projeto." },
        { step: "4", title: "Acompanhamento Contínuo", description: "Suporte em sinistros, renovações e ajustes de cobertura conforme novos projetos." },
      ]}
      coverages={[
        { title: "Erros de Projeto e Cálculo", description: "Cobertura para alegações de falhas em projetos estruturais, hidráulicos, elétricos e de fundação que resultem em danos." },
        { title: "Falhas na Supervisão de Obras", description: "Proteção contra reclamações por supervisão inadequada que resulte em vícios construtivos ou acidentes." },
        { title: "Vícios Construtivos", description: "Cobertura para patologias em edificações: trincas, infiltrações, recalques e problemas estruturais." },
        { title: "Laudos Técnicos Imprecisos", description: "Proteção contra erros em laudos, pareceres e avaliações técnicas que causem prejuízo a terceiros." },
        { title: "Custos de Defesa Jurídica", description: "Honorários de advogados, perícias técnicas e custas processuais — cobertos mesmo se absolvido." },
        { title: "Processos Éticos no CREA/CAU", description: "Custos de defesa em processos no Conselho Regional de Engenharia e Agronomia ou CAU." },
        { title: "Responsabilidade Pós-Entrega", description: "Cobertura durante o período de garantia legal (até 5 anos após a entrega da obra)." },
        { title: "Danos a Terceiros e Propriedades Vizinhas", description: "Proteção contra danos causados a imóveis vizinhos durante a execução de obras ou por vícios pós-entrega." },
      ]}
      pricingInfo={{
        intro: "O custo do RC para engenheiros varia conforme o ramo e porte dos projetos. A Patro Seguros é especialista e garante as melhores condições.",
        factors: [
          "Ramo da engenharia — civil, elétrica, mecânica, ambiental",
          "Porte e valor dos projetos",
          "Faturamento do escritório",
          "Limite de cobertura contratado",
          "Número de engenheiros cobertos",
          "Histórico de sinistros e reclamações",
          "Tipo de obras — residenciais, comerciais, industriais, infraestrutura",
        ],
        note: "Engenheiros autônomos: R$ 1.500 a R$ 5.000/ano. Escritórios de engenharia: R$ 5.000 a R$ 30.000/ano. Para grandes obras e projetos de infraestrutura, valores sob consulta.",
      }}
      realScenarios={[
        { title: "Trincas estruturais em edifício residencial", description: "Moradores processaram o engenheiro responsável pelo projeto estrutural por trincas que comprometiam a segurança. Processo de R$ 800.000. O RC cobriu toda a defesa e a perícia que comprovou que as trincas eram superficiais." },
        { title: "Erro em projeto hidráulico", description: "Falha no dimensionamento hidráulico causou alagamentos recorrentes em condomínio. Construtora entrou com ação de regresso contra o engenheiro projetista. O seguro cobriu defesa e acordo de R$ 150.000." },
        { title: "Laudo de vistoria impreciso", description: "Engenheiro emitiu laudo de vistoria que não identificou problemas estruturais graves. O comprador processou pedindo R$ 250.000. O RC cobriu integralmente a defesa." },
      ]}
      tips={[
        "Documente todas as etapas do projeto com memórias de cálculo e registros técnicos",
        "Mantenha ART/RRT atualizados para todos os projetos e obras",
        "Formalize o escopo de trabalho com contrato detalhado",
        "Realize vistorias periódicas documentadas durante a execução",
        "Contrate RC mesmo atuando como pessoa jurídica — proteja patrimônio pessoal",
        "Comunique qualquer reclamação à seguradora antes que vire processo",
      ]}
      whoNeeds={[
        "Engenheiros civis — projetistas e supervisores de obras",
        "Engenheiros estruturais e de fundações",
        "Engenheiros eletricistas e mecânicos",
        "Engenheiros ambientais e de segurança do trabalho",
        "Escritórios de engenharia e consultoria",
        "Peritos e avaliadores de imóveis",
        "Engenheiros que emitem laudos e pareceres técnicos",
      ]}
      whyPatro={[
        "Especialista em RC Profissional — a Patro Seguros é referência em seguros para engenheiros",
        "Cotação com seguradoras especializadas em riscos de engenharia",
        "Apólices dimensionadas para cada ramo e porte de projeto",
        "Cobertura pós-entrega durante o período de garantia legal",
        "Acompanhamento completo em caso de sinistro",
        "Experiência com obras residenciais, comerciais e de infraestrutura",
      ]}
      faqs={[
        { question: "Engenheiro precisa de seguro RC?", answer: "Sim. A responsabilidade civil do engenheiro se estende por até 5 anos após a entrega da obra. Um único processo por vício construtivo pode comprometer todo o patrimônio. A Patro Seguros é especialista neste tipo de seguro." },
        { question: "O RC cobre erros de projeto?", answer: "Sim, cobre alegações de erros em projetos estruturais, hidráulicos, elétricos e de fundação. Também cobre falhas na supervisão e execução que resultem em vícios construtivos ou danos." },
        { question: "A cobertura se estende após a entrega da obra?", answer: "Sim, muitas apólices cobrem o período de garantia legal (até 5 anos). Reclamações feitas durante a vigência do seguro, referentes a obras concluídas anteriormente, podem ser cobertas com retroatividade." },
        { question: "Quanto custa o RC para engenheiros?", answer: "Engenheiros autônomos: R$ 1.500 a R$ 5.000/ano. Escritórios: R$ 5.000 a R$ 30.000/ano. A Patro Seguros, como especialista, garante as melhores condições do mercado." },
      ]}
      relatedInsurances={[
        { title: "RC Profissional (E&O)", link: "/seguro-rc-profissional" },
        { title: "Seguro de Engenharia", link: "/seguro-engenharia" },
        { title: "Seguro Garantia", link: "/seguro-garantia" },
        { title: "Seguro Empresarial", link: "/seguro-empresarial" },
      ]}
    />
  );
};

export default SeguroRCEngenheiros;
