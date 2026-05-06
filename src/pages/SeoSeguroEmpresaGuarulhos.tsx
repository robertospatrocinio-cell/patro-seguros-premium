import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-seguro-empresarial.webp";

const SeoSeguroEmpresaGuarulhos = () => (
  <InsurancePageTemplate
    heroImage={heroImg}
    title="Seguro para Empresa em Guarulhos — Proteção Patrimonial e RC"
    subtitle="Seguro empresarial completo para empresas de Guarulhos: patrimônio, responsabilidade civil, lucros cessantes e mais."
    description="Seguro para empresa em Guarulhos com cobertura patrimonial completa, responsabilidade civil, lucros cessantes e equipamentos. A Patro Seguros já protege mais de 500 empresas em Guarulhos e região, com atendimento presencial no Cidade Maia e parceria com 16+ seguradoras líderes — Porto Seguro, Tokio Marine, AIG, Allianz, Bradesco e Sompo."
    detailedDescription={`Guarulhos é o segundo maior PIB municipal do estado de São Paulo, abrigando mais de 60 mil empresas ativas — desde indústrias de grande porte em Cumbica até comércios e prestadores de serviço no Cidade Maia, Vila Augusta e Centro. A cidade concentra polos industriais (cosméticos, química, autopeças), logístico (proximidade do GRU Airport e Dutra) e comercial (shoppings Maia, Internacional e Bonsucesso).

Esse perfil produtivo expõe empresas a riscos significativos: incêndio, roubo, danos elétricos, responsabilidade civil contra terceiros, paralisação de atividades, ataques cibernéticos e processos trabalhistas. Um sinistro mal coberto pode comprometer anos de faturamento ou até inviabilizar o negócio.

A Patro Seguros estrutura apólices empresariais sob medida para a realidade de Guarulhos. Conhecemos as exigências de shoppings (Maia, Internacional), condomínios industriais e contratos B2B que solicitam seguro RC como condição. Atendemos PMEs (a partir de R$ 100/mês), médias empresas e operações industriais com faturamento acima de R$ 50 milhões.

Nossa atuação inclui análise de risco no local, orientação sobre coberturas obrigatórias e opcionais, gestão de sinistros e renovação anual com renegociação de prêmio. Trabalhamos com seguros patrimoniais, RC profissional, RC operações, D&O (responsabilidade de diretores), seguro garantia, frota empresarial e cyber.`}
    icon="🏢"
    metaDescription="Seguro para Empresa em Guarulhos: patrimonial, RC, lucros cessantes e cyber. Cotação grátis Patro Seguros para PMEs e indústrias. Atendimento local."
    coverages={[
      { title: "Cobertura Patrimonial Compreensiva", description: "Incêndio, raio, explosão, roubo, furto qualificado, danos elétricos e fenômenos da natureza para sede, filiais e estoque." },
      { title: "Responsabilidade Civil Operações", description: "Indenização por danos materiais e corporais causados a terceiros nas dependências da empresa ou em decorrência da atividade." },
      { title: "Lucros Cessantes", description: "Reposição do faturamento perdido durante o período de paralisação por sinistro coberto — vital para indústrias e comércios em Guarulhos." },
      { title: "Equipamentos e Estoque", description: "Cobertura específica para máquinas, equipamentos eletrônicos, mercadorias armazenadas e em trânsito." },
      { title: "Responsabilidade Civil Profissional", description: "Proteção contra erros e omissões na prestação de serviços — essencial para escritórios, clínicas e consultorias em Guarulhos." },
      { title: "Cyber Risk", description: "Cobertura para ataques cibernéticos, vazamento de dados (LGPD), ransomware e fraude digital — crítico para empresas digitalizadas." },
    ]}
    howItWorks={[
      { step: "1", title: "Diagnóstico de risco", description: "Visita técnica ou reunião remota para mapear atividades, faturamento, patrimônio e exposições da empresa." },
      { step: "2", title: "Cotação multi-seguradora", description: "Comparamos Porto, Tokio, AIG, Allianz, Bradesco e Sompo para encontrar a melhor relação custo-cobertura." },
      { step: "3", title: "Apresentação da proposta", description: "Comparativo claro com coberturas, limites, franquias e prêmio anual ou parcelado em até 10x." },
      { step: "4", title: "Contratação e ativação", description: "Cuidamos de toda documentação. Emissão da apólice em até 5 dias úteis após aprovação." },
      { step: "5", title: "Gestão e sinistro", description: "Acompanhamento durante toda vigência: alterações, sinistros e renovação anual com renegociação." },
    ]}
    pricingInfo={{
      intro: "O seguro empresarial em Guarulhos parte de R$ 100/mês para PMEs (escritórios, comércios pequenos) e pode chegar a R$ 15.000+/mês para indústrias com grande patrimônio. O custo médio fica entre 0,15% e 0,8% do valor segurado anual, dependendo da atividade e dos riscos.",
      factors: [
        "Atividade da empresa (indústria, comércio, serviço, logística)",
        "Valor do patrimônio segurado (sede, equipamentos, estoque)",
        "Localização: bairros industriais (Cumbica, Bonsucesso) têm taxas diferentes do comércio (Centro, Cidade Maia)",
        "Faturamento anual e número de funcionários",
        "Histórico de sinistros nos últimos 5 anos",
        "Medidas de proteção: alarme, monitoramento 24h, brigada de incêndio, sprinklers",
      ],
      note: "Dica Patro: Empresas com sistema de monitoramento 24h, brigada de incêndio treinada e plano de continuidade documentado podem economizar até 30% no prêmio anual.",
    }}
    realScenarios={[
      { title: "Case: Indústria em Cumbica recuperou R$ 1,8 milhão após incêndio", description: "Indústria de embalagens com patrimônio de R$ 6 milhões teve incêndio parcial em galpão. A apólice estruturada pela Patro pagou R$ 1,8 milhão em reposição de equipamentos e R$ 400 mil em lucros cessantes durante 3 meses de paralisação, mantendo 80 empregos diretos." },
      { title: "Case: Comércio no Cidade Maia evitou prejuízo após roubo", description: "Loja de eletrônicos teve estoque de R$ 280 mil roubado em fim de semana. Seguro patrimonial cobriu 100% do valor em 21 dias, permitindo reabertura sem comprometimento financeiro do empresário." },
      { title: "Case: Escritório de engenharia protegido em ação judicial", description: "Cliente processou escritório de engenharia em Guarulhos por suposto erro em projeto, pedindo R$ 750 mil. RC Profissional contratada via Patro cobriu honorários advocatícios e a indenização final negociada em R$ 320 mil — sem impactar o caixa da empresa." },
    ]}
    coverageExclusions={[
      "Atos dolosos (fraude) praticados por sócios ou administradores",
      "Desgaste natural e falhas de manutenção",
      "Atividades ilícitas ou em desacordo com o licenciamento",
      "Sinistros anteriores à contratação não declarados",
      "Guerra, terrorismo e atos governamentais (salvo cláusula específica)",
    ]}
    tips={[
      "Atualize o valor segurado anualmente: subseguro reduz a indenização em sinistro parcial.",
      "Inclua lucros cessantes: paralisação de 30-90 dias pode quebrar uma PME sem essa cobertura.",
      "RC Profissional é obrigatória em muitos contratos B2B em Guarulhos — exigência de shoppings, condomínios e prefeitura.",
      "Cyber: pequena empresa também é alvo. Ataques de ransomware cresceram 300% em 2024-2025.",
      "Cotação anual: o mercado muda muito, renegocie sempre antes da renovação automática.",
    ]}
    whoNeeds={[
      "Indústrias e galpões em Cumbica, Bonsucesso e Polo Industrial",
      "Comércios e lojas no Cidade Maia, Vila Augusta, Centro e shoppings",
      "Escritórios profissionais (engenharia, contabilidade, advocacia, consultoria)",
      "Operações logísticas e transportadoras próximas ao GRU Airport",
      "Clínicas, consultórios e estabelecimentos de saúde em Guarulhos",
      "PMEs que prestam serviço B2B com exigência contratual de seguro RC",
    ]}
    whyPatro={[
      "Mais de 500 empresas atendidas em Guarulhos desde 2020",
      "Especialistas em seguros para indústria, comércio e serviços locais",
      "Parceria com 16+ seguradoras: Porto, Tokio, AIG, Allianz, Bradesco, Sompo",
      "Atendimento presencial no Cidade Maia com visita técnica",
      "Gestão completa de sinistros até liberação da indenização",
      "Renegociação anual com economia média de 12-25% na renovação",
    ]}
    faqs={[
      { question: "Quanto custa seguro para empresa em Guarulhos?", answer: "O seguro empresarial em Guarulhos parte de R$ 100/mês para PMEs e varia conforme atividade, patrimônio e faturamento. O custo médio fica entre 0,15% e 0,8% do valor segurado ao ano. Solicite cotação gratuita personalizada." },
      { question: "Seguro empresarial é obrigatório em Guarulhos?", answer: "Não é obrigatório por lei municipal, mas muitos contratos exigem: locação em shoppings (Maia, Internacional), condomínios industriais, licitações públicas e contratos B2B com grandes empresas frequentemente solicitam apólice de RC e patrimonial." },
      { question: "O que cobre seguro empresarial básico?", answer: "Cobertura básica geralmente inclui: incêndio, raio, explosão, roubo qualificado, danos elétricos e responsabilidade civil operações. Coberturas adicionais (lucros cessantes, equipamentos, cyber) são contratadas conforme necessidade." },
      { question: "Posso parcelar seguro empresarial em Guarulhos?", answer: "Sim. A Patro oferece parcelamento em até 10x sem juros no cartão ou boleto, conforme a seguradora. Algumas seguradoras oferecem desconto de 5-10% para pagamento à vista." },
      { question: "Seguro empresarial cobre LGPD e vazamento de dados?", answer: "Sim, com a contratação de cobertura Cyber Risk. Inclui defesa jurídica, notificações obrigatórias, multas administrativas (quando seguráveis) e custos de recuperação de sistemas em ataques de ransomware." },
    ]}
    relatedInsurances={[
      { title: "Seguro Empresarial Guarulhos", link: "/seguro-empresarial-guarulhos" },
      { title: "Seguros PME Guarulhos", link: "/seguros-empresariais-pme-guarulhos" },
      { title: "Seguro Frota Empresas Guarulhos", link: "/seguro-frota-empresas-guarulhos" },
      { title: "Seguro Condomínio Guarulhos", link: "/seguro-condominio-guarulhos" },
      { title: "Plano Saúde Guarulhos", link: "/plano-saude-guarulhos" },
      { title: "Corretora Seguros Guarulhos", link: "/corretora-seguros-guarulhos" },
    ]}
  />
);

export default SeoSeguroEmpresaGuarulhos;