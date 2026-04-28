import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-seguro-rc.webp";

const SeguroRCEventos = () => {
  return (
    <InsurancePageTemplate
      heroImage={heroImg}
      title="Seguro RC Eventos e Exposições"
      subtitle="Proteção para organizadores de eventos contra danos a participantes e ao local"
      icon="🎪"
      metaDescription="Seguro RC para Eventos e Exposições: proteção contra danos a terceiros em feiras, shows, congressos e eventos corporativos. Cotação grátis."
      description="O Seguro de Responsabilidade Civil para Eventos e Exposições protege organizadores, promotores e expositores contra reclamações por danos materiais, corporais e morais causados a participantes, visitantes e ao local durante a realização do evento."
      detailedDescription={`Organizar um evento — seja uma feira comercial, congresso, show, exposição, festival, evento corporativo ou casamento de grande porte — envolve riscos significativos. Uma estrutura que desaba, um participante que se machuca, um incêndio no local, danos ao espaço alugado ou intoxicação alimentar são situações que podem gerar processos judiciais com indenizações altíssimas.

O Seguro RC Eventos e Exposições é a proteção financeira que garante que o organizador não arque pessoalmente com prejuízos causados a terceiros durante o evento. A seguradora assume custos de defesa e indenizações por danos materiais, corporais e morais — desde a montagem até a desmontagem completa.

Muitos espaços de eventos, prefeituras e contratantes corporativos já exigem a apresentação de apólice de RC como condição para autorizar a realização do evento. Ter o seguro demonstra profissionalismo e é requisito para operar com segurança jurídica e financeira.`}
      howItWorks={[
        { step: "1", title: "Detalhamento do Evento", description: "Informamos tipo de evento, local, público estimado, duração, atividades programadas e estruturas utilizadas" },
        { step: "2", title: "Análise de Riscos", description: "Avaliamos os riscos específicos do evento: estruturas temporárias, alimentação, pirotecnia, aglomeração e mais" },
        { step: "3", title: "Cotação Sob Medida", description: "Buscamos propostas de seguradoras especializadas em RC eventos, com limites e coberturas adequados ao porte" },
        { step: "4", title: "Cobertura Total", description: "Da montagem à desmontagem, a seguradora cobre danos a terceiros e assume a defesa em caso de reclamação" },
      ]}
      coverages={[
        { title: "Danos Corporais a Participantes", description: "Cobertura para lesões sofridas por visitantes, espectadores e convidados durante o evento" },
        { title: "Danos Materiais ao Local", description: "Proteção contra prejuízos causados ao espaço, mobiliário e instalações do local do evento" },
        { title: "Danos Morais", description: "Cobertura para indenizações por danos morais decorrentes de incidentes no evento" },
        { title: "Montagem e Desmontagem", description: "Proteção durante todo o período de preparação e retirada das estruturas" },
        { title: "Estruturas Temporárias", description: "Cobertura para danos causados por palcos, stands, tendas, arquibancadas e treliças" },
        { title: "Intoxicação Alimentar", description: "Proteção contra reclamações por problemas com alimentos e bebidas servidos no evento" },
        { title: "Despesas de Defesa", description: "Custos com advogados, perícias e processos judiciais cobertos pela apólice" },
        { title: "Danos a Bens de Expositores", description: "Cobertura para prejuízos causados a materiais e equipamentos de expositores participantes" },
      ]}
      coverageExclusions={[
        "Atos dolosos ou intencionais do organizador",
        "Cancelamento do evento (cobertura específica à parte)",
        "Danos ao patrimônio do próprio segurado",
        "Eventos realizados sem as devidas autorizações e alvarás",
        "Danos causados por condições climáticas (chuva, vento) sem estrutura adequada",
        "Responsabilidade por atos de terceiros não vinculados ao evento",
        "Multas e penalidades administrativas",
      ]}
      pricingInfo={{
        intro: "O valor do Seguro RC Eventos varia conforme o tipo, porte, público e duração do evento.",
        factors: [
          "Tipo de evento (feira, show, congresso, festival)",
          "Público estimado e capacidade do local",
          "Duração do evento (incluindo montagem/desmontagem)",
          "Atividades de risco (pirotecnia, esportes, estruturas elevadas)",
          "Local do evento (aberto ou fechado)",
          "Limite de indenização desejado",
        ],
        note: "Eventos corporativos de pequeno porte podem custar entre R$ 800 e R$ 3.000. Feiras e exposições de médio porte entre R$ 3.000 e R$ 15.000. Shows e festivais de grande porte entre R$ 15.000 e R$ 80.000+. Valores variam conforme público e riscos envolvidos.",
      }}
      realScenarios={[
        { title: "Estrutura de palco desabou em feira", description: "Uma treliça de iluminação caiu durante uma feira comercial, ferindo três visitantes. O seguro cobriu R$ 280.000 em indenizações por danos corporais e morais, além de R$ 35.000 em despesas de defesa." },
        { title: "Intoxicação alimentar em evento corporativo", description: "Mais de 40 convidados passaram mal após consumir alimentos em um evento empresarial. O RC cobriu R$ 150.000 em indenizações e despesas médicas dos afetados." },
        { title: "Danos ao espaço durante desmontagem", description: "A equipe de desmontagem danificou o piso e paredes do salão de eventos. O seguro cobriu R$ 65.000 em reparos ao proprietário do espaço." },
      ]}
      importantDetails={[
        { title: "Período de Cobertura", content: "A apólice cobre desde o início da montagem até a conclusão da desmontagem, não apenas o período do evento em si. Isso é fundamental, pois muitos sinistros ocorrem justamente durante a preparação e retirada de estruturas." },
        { title: "Exigência de Espaços e Prefeituras", content: "A maioria dos espaços de eventos, centros de convenções e prefeituras exige a apresentação de apólice de RC como condição para liberar o alvará do evento. Sem o seguro, o evento pode ser impedido de acontecer." },
        { title: "Cobertura para Expositores", content: "Em feiras e exposições, é possível incluir cobertura para danos causados a stands e materiais de expositores. Também existe a opção de cada expositor contratar sua própria apólice de RC." },
      ]}
      tips={[
        "Contrate o seguro com antecedência — muitos espaços exigem a apólice semanas antes do evento",
        "Informe detalhadamente todas as atividades previstas, incluindo atrações especiais e serviços de alimentação",
        "Guarde toda a documentação: contratos com fornecedores, alvarás, laudos técnicos de estruturas",
        "Para eventos recorrentes, considere uma apólice anual que cubra todos os eventos do período",
        "Verifique se seus fornecedores (buffet, estrutura, som) também possuem seguro RC próprio",
      ]}
      whoNeeds={[
        "Organizadores de feiras e exposições comerciais",
        "Promotores de shows, festivais e eventos culturais",
        "Empresas que realizam eventos corporativos e convenções",
        "Organizadores de congressos e seminários",
        "Promotores de eventos esportivos",
        "Buffets e empresas de catering para grandes eventos",
        "Produtoras de eventos sociais de grande porte",
        "Expositores que participam de feiras setoriais",
      ]}
      whyPatro={[
        "Apólices sob medida para cada tipo e porte de evento",
        "Emissão ágil de certificados para apresentar ao espaço do evento",
        "Orientação sobre coberturas específicas para cada atividade",
        "Suporte imediato em caso de sinistro durante o evento",
        "Parcerias com seguradoras especializadas em RC eventos",
        "Experiência com feiras, shows, congressos e eventos corporativos",
      ]}
      faqs={[
        { question: "O seguro RC Eventos é obrigatório?", answer: "Não é obrigatório por lei em todos os casos, mas a maioria dos espaços de eventos e prefeituras exige a apólice como condição para liberar o alvará. Na prática, é indispensável." },
        { question: "Cobre cancelamento do evento?", answer: "Não. O RC cobre danos a terceiros durante o evento. Para cancelamento, existe um seguro específico (Seguro de Cancelamento de Eventos), que pode ser contratado separadamente." },
        { question: "Posso contratar uma apólice para vários eventos?", answer: "Sim! Para quem organiza eventos frequentes, oferecemos apólices anuais que cobrem todos os eventos do período, com condições especiais." },
        { question: "A cobertura inclui a montagem e desmontagem?", answer: "Sim. A apólice cobre desde o início da montagem até a conclusão da desmontagem, que é quando muitos sinistros ocorrem." },
        { question: "Quanto custa o seguro para um evento pequeno?", answer: "Eventos corporativos de pequeno porte (até 200 pessoas) podem custar entre R$ 800 e R$ 3.000, dependendo das atividades e limites de cobertura." },
      ]}
      relatedInsurances={[
        { title: "Seguro RC Geral", link: "/seguro-rc" },
        { title: "Seguro RC Prestação de Serviços", link: "/seguro-rc-prestacao-servicos" },
        { title: "Seguro Empresarial", link: "/seguro-empresarial" },
        { title: "Seguro RC Obras", link: "/seguro-rc-obras" },
      ]}
    />
  );
};

export default SeguroRCEventos;
