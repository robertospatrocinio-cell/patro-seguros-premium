import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-seguro-condominio.webp";

const SeguroCondominio = () => {
  return (
    <InsurancePageTemplate
      heroImage={heroImg}
      title="Seguro Condomínio"
      subtitle="Proteção completa para áreas comuns e patrimônio coletivo"
      icon="🏢"
      metaDescription="Seguro Condomínio para áreas comuns, equipamentos e RC. Proteção contra incêndio, danos elétricos e acidentes com moradores. Cotação grátis Patro Seguros."
      description="O Seguro Condomínio protege as áreas comuns, equipamentos coletivos e a responsabilidade civil do condomínio contra diversos riscos."
      detailedDescription={`Administrar um condomínio é uma responsabilidade enorme. As áreas comuns — elevadores, piscinas, playgrounds, salões de festa, portarias, garagens — representam patrimônio de alto valor que pertence a todos os condôminos. Um incêndio, uma explosão de gás, um curto-circuito que danifica elevadores ou uma queda de visitante na área comum podem gerar prejuízos de centenas de milhares de reais, rateados entre todos.

O Seguro Condomínio é a proteção mais inteligente: por um custo mensal muito baixo por unidade, cobre incêndio, danos elétricos, responsabilidade civil, roubo de bens comuns, vendaval e diversos outros riscos. Importante: o seguro do condomínio NÃO cobre o interior das unidades privativas — cada morador deve ter seu próprio seguro residencial.

Na Patro Seguros, apoiamos síndicos e administradoras em todo o processo: da cotação à aprovação em assembleia, da emissão à gestão de sinistros. Nosso atendimento especializado garante que o condomínio tenha as coberturas adequadas com o melhor custo-benefício.`}
      howItWorks={[
        { step: "1", title: "Levantamento do Condomínio", description: "Avaliamos áreas comuns, equipamentos, número de unidades, idade do prédio e histórico" },
        { step: "2", title: "Proposta para Assembleia", description: "Preparamos proposta detalhada com coberturas e valores para aprovação em assembleia condominial" },
        { step: "3", title: "Contratação e Emissão", description: "Após aprovação, emitimos a apólice com agilidade e entregamos certificado ao síndico" },
        { step: "4", title: "Gestão Contínua", description: "Acompanhamos sinistros, renovações e atualizações de coberturas durante toda a vigência" },
      ]}
      coverages={[
        { title: "Incêndio e Raio", description: "Cobertura para danos causados por fogo nas áreas comuns" },
        { title: "Danos Elétricos", description: "Proteção para equipamentos coletivos (elevadores, bombas, portões)" },
        { title: "Responsabilidade Civil", description: "Cobre acidentes com moradores, visitantes e funcionários" },
        { title: "Roubo de Bens Comuns", description: "Proteção para móveis, equipamentos e valores do condomínio" },
        { title: "Quebra de Vidros", description: "Cobertura para vidraças, espelhos e fachadas" },
        { title: "Vendaval e Fenômenos Naturais", description: "Proteção contra danos climáticos" },
        { title: "Acidentes Pessoais para Funcionários", description: "Cobertura para porteiros, zeladores e outros empregados" },
        { title: "Equipamentos Eletrônicos", description: "Proteção para interfones, câmeras e sistemas de segurança" },
      ]}
      coverageExclusions={[
        "Interior das unidades privativas (cada morador deve ter seguro residencial)",
        "Bens pessoais dos moradores em áreas comuns",
        "Desgaste natural de equipamentos e instalações",
        "Danos estéticos sem comprometimento funcional",
        "Vazamentos de origem interna das unidades privativas",
        "Reformas e melhorias estruturais",
      ]}
      pricingInfo={{
        intro: "O custo do seguro de condomínio é muito acessível quando dividido entre as unidades.",
        factors: [
          "Número de unidades do condomínio",
          "Idade e estado de conservação do prédio",
          "Valor total das áreas comuns e equipamentos",
          "Coberturas e limites escolhidos",
          "Localização e histórico de sinistros",
          "Equipamentos especiais (elevadores, piscina, academia)",
        ],
        note: "Um condomínio de 50 unidades pode pagar de R$ 3.000 a R$ 8.000/ano de seguro — ou R$ 60 a R$ 160 por unidade ao ano (R$ 5 a R$ 13/mês por morador). Valores muito baixos para a proteção oferecida.",
      }}
      realScenarios={[
        { title: "Incêndio no salão de festas", description: "Um curto-circuito no ar-condicionado do salão de festas causou incêndio que destruiu móveis, eletrônicos e parte do forro. O seguro cobriu R$ 120.000 em reparos sem que os condôminos precisassem pagar rateio extra." },
        { title: "Queda de visitante na garagem", description: "Uma visitante escorregou em piso molhado da garagem e fraturou o fêmur. O RC do condomínio cobriu R$ 65.000 em despesas médicas e indenização, evitando processo contra o condomínio." },
        { title: "Raio queimou elevadores", description: "Uma descarga elétrica danificou a central dos dois elevadores do prédio. O reparo custou R$ 85.000. O seguro de danos elétricos cobriu integralmente." },
      ]}
      importantDetails={[
        { title: "Aprovação em assembleia", content: "A contratação do seguro condominial geralmente precisa de aprovação em assembleia. A Patro prepara material completo para apresentação, facilitando a aprovação pelos condôminos." },
        { title: "Seguro do condomínio vs seguro residencial", content: "O seguro do condomínio cobre apenas áreas comuns. Cada morador deve contratar seu próprio seguro residencial para proteger o interior do apartamento, bens pessoais e RC individual." },
        { title: "Funcionários do condomínio", content: "A cobertura de acidentes pessoais para funcionários (porteiros, zeladores, faxineiros) é fundamental para proteger o condomínio contra ações trabalhistas." },
      ]}
      tips={[
        "Inclua a cobertura de Responsabilidade Civil — é uma das mais acionadas e protege contra processos caros",
        "Atualize o valor segurado anualmente para refletir melhorias e novos equipamentos instalados",
        "Cobre danos elétricos adequado ao valor dos equipamentos: elevadores, bombas e sistemas de segurança são caros",
        "Incentive os condôminos a contratar seguro residencial individual — proteção completa só com ambos",
        "Guarde relatórios de manutenção dos elevadores e equipamentos — mostra zelo e fortalece sinistros",
      ]}
      whoNeeds={[
        "Condomínios residenciais verticais",
        "Condomínios comerciais",
        "Condomínios mistos",
        "Loteamentos fechados",
        "Condomínios industriais",
        "Shopping centers e centros comerciais",
      ]}
      whyPatro={[
        "Análise das áreas comuns e bens coletivos",
        "Orientação sobre valores adequados de cobertura",
        "Suporte em assembleias para aprovação",
        "Gestão simplificada de apólices e renovações",
        "Atendimento rápido em sinistros",
        "Parcerias com seguradoras especializadas em condomínios",
      ]}
      faqs={[
        { question: "Quem contrata o seguro do condomínio?", answer: "O síndico ou a administradora, com aprovação em assembleia. O custo é rateado entre os condôminos." },
        { question: "O que não é coberto pelo seguro do condomínio?", answer: "Geralmente não cobre o interior das unidades privativas. Cada morador deve ter seu próprio seguro residencial." },
        { question: "Quanto custa o seguro de condomínio?", answer: "Depende do porte, mas geralmente custa de R$ 5 a R$ 15 por unidade ao mês. Um investimento muito baixo." },
        { question: "É obrigatório ter seguro de condomínio?", answer: "Não é legalmente obrigatório em todos os casos, mas muitas convenções condominiais o estabelecem como obrigatório." },
        { question: "Cobre acidentes com visitantes?", answer: "Sim! A Responsabilidade Civil cobre acidentes com moradores, visitantes, prestadores de serviço e qualquer pessoa nas áreas comuns." },
      ]}
      relatedInsurances={[
        { title: "Seguro Residencial", link: "/seguro-residencial" },
        { title: "Seguro Empresarial", link: "/seguro-empresarial" },
        { title: "Seguro RC", link: "/seguro-rc" },
      ]}
    />
  );
};

export default SeguroCondominio;
