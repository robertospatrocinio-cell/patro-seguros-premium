import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-seguro-saude.webp";

/**
 * Página local SEO para "plano de saúde para idosos em guarulhos".
 * Compara MedSenior e Prevent Senior com foco em Cidade Maia, Centro e
 * demais bairros. Emite FAQPage + HowTo + BreadcrumbList via template.
 */
const PlanosSaudeSeniorGuarulhos = () => {
  return (
    <InsurancePageTemplate
      heroImage={heroImg}
      title="Plano de Saúde para Idosos em Guarulhos | Patro"
      headline="Plano de saúde para idosos em Guarulhos — compare MedSenior e Prevent Senior"
      subtitle="Planos 60+ com rede completa em Cidade Maia, Centro, Vila Galvão e toda Guarulhos. Cotação comparativa em 24h."
      icon="👵"
      metaDescription="Plano de saúde para idosos em Guarulhos: compare MedSenior e Prevent Senior. Rede em Cidade Maia, Centro e Vila Galvão. Cotação grátis."
      description="Plano de saúde para idosos (60+) em Guarulhos com atendimento consultivo presencial no Cidade Maia. Comparamos MedSenior, Prevent Senior e outras operadoras sênior para encontrar a rede ideal perto de você."
      detailedDescription={`Contratar plano de saúde após os 59 anos em Guarulhos exige uma análise específica: as operadoras generalistas (Bradesco, SulAmérica, Amil) costumam praticar mensalidades altas nessa faixa, enquanto operadoras especializadas em sênior — MedSenior e Prevent Senior — oferecem estrutura desenhada para idosos, com geriatras dedicados, prevenção, medicação assistida e rede hospitalar sem restrição de idade.

A Patro Seguros compara as duas principais opções para quem mora em Guarulhos. A MedSenior tem rede referenciada premium na capital (Oswaldo Cruz, 9 de Julho, Samaritano) e vem expandindo credenciamentos em Guarulhos. A Prevent Senior mantém unidades próprias de pronto-atendimento na região da Cidade Maia e Vila Galvão, com foco em coordenação de cuidado, geriatria e atendimento domiciliar.

Nossa consultoria valida a rede credenciada por bairro (Centro, Cidade Maia, Cumbica, Bonsucesso, Pimentas, Taboão, Vila Galvão, Macedo, Gopoúva, Ponte Grande, Vila Augusta), simula preço por idade, esclarece carências (24h para urgência, 180 dias para consultas eletivas e exames, 300 dias para parto) e explica coparticipação, portabilidade e cobertura para doenças preexistentes. Atendimento gratuito — o preço do plano é o mesmo da tabela da operadora.`}
      howItWorks={[
        { step: "1", title: "Diagnóstico do beneficiário", description: "Idade, condições preexistentes, medicações contínuas, hospitais e médicos de preferência em Guarulhos." },
        { step: "2", title: "Cotação MedSenior + Prevent Senior", description: "Comparamos mensalidade por faixa etária, rede credenciada e coparticipação lado a lado." },
        { step: "3", title: "Análise de rede local", description: "Confirmamos hospitais e clínicas próximos ao seu bairro em Guarulhos — Cidade Maia, Centro, Vila Galvão e região." },
        { step: "4", title: "Contratação assistida", description: "Preenchimento da declaração de saúde, envio de documentos e ativação em até 5 dias úteis." },
      ]}
      coverages={[
        { title: "Geriatria e clínica médica", description: "Consultas ilimitadas com geriatras e médicos de família especializados em 60+" },
        { title: "Cardiologia e prevenção", description: "Cardiologistas, ecocardiograma, holter e MAPA sem coparticipação em muitos planos" },
        { title: "Rede hospitalar sem limite de idade", description: "Internações clínicas e cirúrgicas sem restrição etária, inclusive UTI" },
        { title: "Pronto-atendimento 24h", description: "PA próprios da Prevent Senior e credenciados da MedSenior em Guarulhos e SP" },
        { title: "Exames e imagem", description: "Laboratoriais, tomografia, ressonância, endoscopia e colonoscopia" },
        { title: "Fisioterapia e reabilitação", description: "Sessões conforme prescrição médica, inclusive pós-cirúrgico e neurológico" },
        { title: "Atendimento domiciliar", description: "Home care conforme critérios clínicos — muito relevante para idosos com mobilidade reduzida" },
        { title: "Medicação assistida", description: "Programas de acompanhamento farmacêutico para hipertensão, diabetes e polifarmácia" },
      ]}
      pricingInfo={{
        intro: "O valor do plano sênior em Guarulhos varia conforme idade, operadora, rede e coparticipação.",
        factors: [
          "Faixa etária (59+, 64+, 69+, 74+, 79+)",
          "Operadora escolhida (MedSenior x Prevent Senior)",
          "Tipo de acomodação (enfermaria ou apartamento)",
          "Rede referenciada premium ou credenciada padrão",
          "Com ou sem coparticipação em consultas/exames",
          "Portabilidade de carências (se vindo de outro plano ativo)",
        ],
        note: "Em Guarulhos, planos sênior individuais costumam variar de R$ 1.650 (59 anos, enfermaria, rede padrão) a R$ 4.800/mês (79+, apartamento, rede premium). A Prevent Senior geralmente é mais competitiva na entrada da faixa (59–68); a MedSenior tende a se destacar em rede hospitalar premium na capital.",
      }}
      tips={[
        "Peça sempre a lista de hospitais credenciados em Guarulhos e SP antes de assinar — a rede varia muito por CEP",
        "Se você já tem plano ativo há 2+ anos, avalie portabilidade de carências para não voltar a cumprir 180 dias",
        "Prevent Senior tem PA próprios em Guarulhos (Cidade Maia/Vila Galvão) — bom para quem quer acesso rápido sem depender de rede externa",
        "MedSenior costuma ser melhor para quem precisa de rede hospitalar premium na capital (Oswaldo Cruz, Samaritano, 9 de Julho)",
        "Declare todas as doenças preexistentes na entrevista qualificada — omissão gera cancelamento por fraude",
        "Considere apartamento se houver histórico de internações frequentes: diferença de conforto pesa muito em idade avançada",
      ]}
      whoNeeds={[
        "Idosos 59+ que buscam plano individual em Guarulhos",
        "Aposentados que perderam o plano coletivo empresarial",
        "Famílias que querem contratar plano para pais/avós moradores de Guarulhos",
        "Beneficiários vindos de portabilidade de outro plano de saúde",
        "Moradores da Cidade Maia, Centro, Vila Galvão e demais bairros de Guarulhos",
      ]}
      whyPatro={[
        "Corretora de seguros em Guarulhos especializada em plano sênior 60+",
        "Comparativo real MedSenior x Prevent Senior lado a lado",
        "Validação de rede credenciada por bairro de Guarulhos",
        "Suporte na declaração de saúde e portabilidade de carências",
        "Consultoria 100% gratuita — preço final é o de tabela da operadora",
        "Atendimento presencial no Cidade Maia + WhatsApp direto",
      ]}
      faqs={[
        { question: "Qual é o melhor plano de saúde para idosos em Guarulhos?", answer: "Depende do perfil. A Prevent Senior costuma vencer em preço, coordenação de cuidado e pronto-atendimento próprio na Cidade Maia e Vila Galvão. A MedSenior costuma vencer em rede hospitalar premium na capital (Oswaldo Cruz, Samaritano, 9 de Julho). A Patro compara os dois com base no seu bairro e histórico de saúde." },
        { question: "Qual a idade mínima para contratar plano sênior em Guarulhos?", answer: "MedSenior aceita a partir de 49 anos e Prevent Senior a partir de 49 anos. Os planos são especialmente desenhados para 59+, quando as operadoras generalistas ficam proibitivas. Não há idade máxima para adesão." },
        { question: "MedSenior tem rede em Guarulhos?", answer: "A MedSenior vem expandindo credenciamentos em Guarulhos e mantém rede referenciada premium em São Paulo (Oswaldo Cruz, 9 de Julho, Samaritano, Beneficência Portuguesa). A Patro valida caso a caso quais hospitais estão credenciados na sua região." },
        { question: "Prevent Senior tem unidade em Guarulhos?", answer: "Sim. A Prevent Senior mantém unidades próprias de pronto-atendimento e ambulatório em Guarulhos, especialmente na região da Cidade Maia e Vila Galvão. Também opera clínicas especializadas em cardiologia, geriatria e reabilitação." },
        { question: "Posso migrar meu plano atual para MedSenior ou Prevent Senior sem cumprir carência de novo?", answer: "Sim, via portabilidade de carências regulamentada pela ANS — desde que seu plano atual esteja adimplente e você tenha cumprido o tempo mínimo de permanência (2 anos, ou 3 se houver doença preexistente). A Patro cuida do processo." },
        { question: "Quanto custa plano de saúde para idoso em Guarulhos?", answer: "Em Guarulhos, planos sênior individuais variam de R$ 1.650 (59 anos, enfermaria, rede padrão) a R$ 4.800/mês (79+, apartamento, rede premium). Prevent Senior costuma ser mais competitiva na entrada de faixa; MedSenior em rede premium na capital." },
        { question: "Doenças preexistentes impedem contratação do plano sênior?", answer: "Não. Diabetes, hipertensão, cardiopatias e outras doenças preexistentes não impedem a adesão. Elas apenas geram Cobertura Parcial Temporária (CPT) de 24 meses para procedimentos de alta complexidade relacionados. Consultas, exames e urgência liberam normalmente." },
      ]}
      relatedInsurances={[
        { title: "Plano de Saúde em Guarulhos", link: "/plano-saude-guarulhos" },
        { title: "MedSenior — Landing Page", link: "/lp/medsenior" },
        { title: "Comparativo de Planos de Saúde em Guarulhos", link: "/comparativo-planos-saude-guarulhos" },
        { title: "Plano de Saúde Empresarial em Guarulhos", link: "/plano-saude-empresarial-guarulhos" },
      ]}
      howto={{
        name: "Como contratar plano de saúde sênior em Guarulhos",
        description: "Passo a passo para comparar MedSenior e Prevent Senior e contratar plano de saúde para idosos em Guarulhos com adesão em até 5 dias úteis.",
        totalTime: "P5D",
        supply: [
          "RG e CPF do beneficiário",
          "Comprovante de residência em Guarulhos",
          "Histórico de saúde e medicações contínuas",
          "Comprovante de plano atual (se houver portabilidade)",
        ],
        tool: ["WhatsApp Patro Seguros", "Consultoria presencial no Cidade Maia"],
        steps: [
          { name: "Envie idade e bairro", text: "Compartilhe com a Patro a data de nascimento e o bairro de Guarulhos. Isso define preço e rede próxima." },
          { name: "Receba comparativo MedSenior x Prevent Senior", text: "A Patro devolve em 24h uma proposta lado a lado com mensalidade, rede hospitalar, coparticipação e diferencial de cada operadora." },
          { name: "Valide rede e escolha plano", text: "Confirme quais hospitais e clínicas em Guarulhos e SP estão credenciados. Escolha entre enfermaria/apartamento, com ou sem coparticipação." },
          { name: "Preencha a declaração de saúde", text: "Entrevista qualificada com médico da operadora (por telefone ou vídeo). Declare todas as condições preexistentes — omissão gera cancelamento." },
          { name: "Assine contrato e ative carteirinha", text: "Assinatura digital + envio de RG/CPF e comprovante de residência. Carteirinha liberada em até 5 dias úteis." },
        ],
      }}
    />
  );
};

export default PlanosSaudeSeniorGuarulhos;