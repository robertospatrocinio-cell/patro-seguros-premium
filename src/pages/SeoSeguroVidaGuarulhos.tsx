import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import PrerenderText from "@/components/PrerenderText";
import heroImg from "@/assets/hero-seguro-vida.webp";

const SeoSeguroVidaGuarulhos = () => (
  <>
    <PrerenderText slug="seguro-vida-guarulhos" />
    <InsurancePageTemplate
    heroImage={heroImg}
    title="Seguro de Vida em Guarulhos | Proteja Sua Família | Patro Seguros"
    subtitle="Seguro de Vida em Guarulhos — Tranquilidade para Quem Você Ama"
    description="Seguro de vida em Guarulhos com coberturas completas. Proteja sua família com planos a partir de R$X,XX/mês. Cotação online grátis."
    detailedDescription={`O seguro de vida é, hoje, uma das proteções financeiras mais subutilizadas no Brasil. Estimativas indicam que apenas 15% dos brasileiros têm seguro de vida individual contratado — e em Guarulhos, com 1,4 milhão de habitantes e forte presença de profissionais autônomos, motoristas de aplicativo, comerciantes e trabalhadores em logística, esse índice expõe milhares de famílias a vulnerabilidade financeira em caso de falecimento ou invalidez do provedor.

Apólices modernas vão muito além da indenização por morte. Cobrem invalidez permanente por acidente ou doença, diagnóstico de doenças graves (câncer, AVC, infarto, Alzheimer) com pagamento antecipado, diárias hospitalares, assistência funeral familiar e até renda mensal temporária. Para profissionais liberais — médicos, advogados, dentistas, engenheiros — o seguro de vida funciona como proteção de renda, garantindo que a família mantenha o padrão de vida mesmo em situações graves.

A Patro Seguros estrutura apólices de vida sob medida para a realidade de Guarulhos. Trabalhamos com seguros individuais (a partir de R$ 30/mês), seguros prestamistas (vinculados a financiamentos imobiliários no Cidade Maia, Vila Augusta), seguro de vida em grupo para PMEs e seguros para profissionais autônomos. Conhecemos as exigências de bancos, sindicatos e contratos B2B que solicitam apólice de vida.

Nosso atendimento presencial no Cidade Maia inclui análise gratuita de apólices existentes — muitas vezes encontramos coberturas duplicadas, capital subdimensionado ou prêmios acima do mercado. Mais de 60% dos clientes que migram para a Patro economizam ou ampliam a cobertura mantendo o mesmo investimento mensal.`}
    icon="❤️"
    metaDescription="Seguro de Vida em Guarulhos a partir de R$ 30/mês. Cobertura morte, invalidez e doenças graves. Cotação grátis Patro Seguros. Atendimento Cidade Maia."
    coverages={[
      { title: "Morte por Qualquer Causa", description: "Indenização integral aos beneficiários em caso de falecimento, natural ou acidental, em Guarulhos ou qualquer lugar do mundo." },
      { title: "Invalidez Permanente Total ou Parcial", description: "Pagamento proporcional à perda funcional comprovada por laudo médico — proteção essencial para autônomos." },
      { title: "Doenças Graves", description: "Adiantamento da indenização em caso de diagnóstico de câncer, AVC, infarto, Alzheimer ou esclerose múltipla." },
      { title: "Diárias por Internação Hospitalar", description: "Renda diária durante internação por acidente ou doença, repondo a renda perdida pelo afastamento do trabalho." },
      { title: "Assistência Funeral Familiar", description: "Cobertura completa de funeral para titular, cônjuge, filhos e pais — incluso em muitas apólices." },
      { title: "Despesas Médicas Hospitalares", description: "Reembolso de despesas médicas e hospitalares por acidente, complementando o plano de saúde." },
    ]}
    howItWorks={[
      { step: "1", title: "Análise de perfil", description: "Avaliamos idade, profissão, renda, dependentes e objetivos para definir capital segurado adequado." },
      { step: "2", title: "Cotação multi-seguradora", description: "Comparamos MetLife, Prudential, Bradesco, Icatu, Mongeral e Porto para o melhor preço." },
      { step: "3", title: "Apresentação de propostas", description: "Comparativo claro entre 3-5 opções com prêmio mensal, coberturas e condições." },
      { step: "4", title: "Contratação digital", description: "Apólice ativada em 24-72h após preenchimento do questionário de saúde. Sem burocracia." },
      { step: "5", title: "Suporte vitalício", description: "Acompanhamento anual, atualização de beneficiários e suporte aos familiares em caso de sinistro." },
    ]}
    pricingInfo={{
      intro: "O seguro de vida em Guarulhos parte de R$ 30/mês para adultos jovens (25-35 anos) com capital de R$ 100.000. Para perfil de 45 anos com R$ 500.000 de capital e cobertura de doenças graves, o custo gira em torno de R$ 150-250/mês. Para profissionais liberais com R$ 1 milhão de capital, valores entre R$ 280-450/mês.",
      factors: [
        "Idade do segurado (fator mais relevante — quanto mais cedo, mais barato)",
        "Capital segurado escolhido (R$ 100 mil a R$ 5 milhões)",
        "Profissão e atividades de risco (motoristas de app, motociclistas, pilotos têm prêmio maior)",
        "Histórico de saúde declarado no questionário",
        "Hábito tabagista (fumantes pagam até 2x mais)",
        "Coberturas adicionais: doenças graves, invalidez, diárias hospitalares, funeral familiar",
      ],
      note: "Dica Patro: Contratar seguro de vida antes dos 35 anos garante prêmio até 60% menor — e o valor é mantido ao longo dos anos, mesmo com o envelhecimento.",
    }}
    realScenarios={[
      { title: "Case: Família protegida após acidente fatal na Dutra", description: "Empresário de 42 anos do Cidade Maia faleceu em acidente na Rodovia Presidente Dutra. Seguro de vida estruturado pela Patro pagou R$ 800.000 aos beneficiários em 12 dias úteis, garantindo quitação do financiamento da casa, educação dos filhos e renda para a viúva por 5 anos." },
      { title: "Case: Indenização antecipada por câncer permitiu tratamento premium", description: "Cliente de 48 anos, autônomo em Guarulhos, foi diagnosticado com câncer. A cobertura de doenças graves pagou R$ 200.000 antecipadamente, permitindo tratamento no Hospital Sírio-Libanês enquanto a apólice principal seguia ativa para a família." },
      { title: "Case: Migração economizou R$ 180/mês com mais cobertura", description: "Família de Guarulhos pagava R$ 420/mês por apólice antiga com R$ 300 mil de capital. A Patro renegociou e migrou para Icatu com R$ 500 mil de capital + doenças graves + funeral familiar por R$ 240/mês — economia de R$ 2.160/ano com cobertura ampliada." },
    ]}
    coverageExclusions={[
      "Suicídio nos primeiros 2 anos da apólice (carência legal)",
      "Atos ilícitos praticados pelo segurado",
      "Doenças preexistentes não declaradas no questionário inicial",
      "Esportes radicais não declarados (paraquedismo, mergulho profissional, asa-delta)",
      "Guerra, motim ou atos de terrorismo",
    ]}
    tips={[
      "Comece jovem: cada ano que adia significa prêmio mais alto pelo resto da vida.",
      "Capital segurado ideal: 5 a 10 vezes a renda anual, ajustado por dívidas e dependentes.",
      "Inclua doenças graves: 1 em cada 3 brasileiros terá câncer durante a vida (INCA, 2024).",
      "Atualize beneficiários: mudanças familiares (casamento, filhos, divórcio) exigem revisão.",
      "Declare tudo no questionário de saúde: omissão pode anular a apólice em sinistro.",
    ]}
    whoNeeds={[
      "Pais e mães de família com filhos dependentes em Guarulhos",
      "Profissionais liberais autônomos (médicos, advogados, engenheiros, dentistas)",
      "Empresários e sócios de empresa que sustentam família com renda variável",
      "Pessoas com financiamento imobiliário ou veículo em Guarulhos",
      "Motoristas de aplicativo e profissionais expostos a riscos no trânsito",
      "Casais sem filhos com dívidas conjuntas ou patrimônio compartilhado",
    ]}
    whyPatro={[
      "Mais de 400 vidas protegidas em Guarulhos desde 2020",
      "Comparação entre 8+ seguradoras de vida líderes do Brasil",
      "Atendimento presencial humanizado no Cidade Maia",
      "Análise gratuita de apólices existentes — economia média de 25%",
      "Suporte completo aos familiares no momento do sinistro",
      "Especialistas em seguro de vida para profissionais liberais e autônomos",
    ]}
    faqs={[
      { question: "Quanto custa seguro de vida em Guarulhos?", answer: "O seguro de vida em Guarulhos parte de R$ 30/mês para jovens adultos (25-35 anos) com capital de R$ 100.000. Para perfis acima de 45 anos com R$ 500 mil de capital e cobertura de doenças graves, o custo fica entre R$ 150-250/mês. Solicite cotação personalizada." },
      { question: "Qual a diferença entre seguro de vida individual e prestamista?", answer: "O seguro individual protege sua família com indenização escolhida por você. O prestamista é vinculado a um financiamento (imóvel, veículo) e quita a dívida em caso de morte do segurado. A Patro recomenda ambos, pois cumprem funções diferentes." },
      { question: "Seguro de vida cobre suicídio em Guarulhos?", answer: "Sim, mas com carência de 2 anos a partir da contratação, conforme determinação do Código Civil brasileiro. Após 24 meses, a cobertura é integral, sem questionamentos." },
      { question: "Posso ter mais de um seguro de vida?", answer: "Sim. É legal e comum acumular várias apólices (uma individual, uma do banco do financiamento, outra do empregador). Em caso de sinistro, todas pagam integralmente. A Patro analisa seu portfólio para evitar coberturas duplicadas desnecessárias." },
      { question: "Como funciona pagamento de indenização em Guarulhos?", answer: "Beneficiários enviam documentação (certidão de óbito, laudos médicos, identificação) à seguradora. Após análise (15-30 dias úteis), o valor é depositado diretamente na conta dos beneficiários. A Patro acompanha todo o processo." },
    ]}
    relatedInsurances={[
      { title: "Seguro Vida e Saúde Guarulhos", link: "/seguro-vida-saude-guarulhos" },
      { title: "Plano Saúde Guarulhos", link: "/plano-saude-guarulhos" },
      { title: "Seguro Vida PME", link: "/seguro-vida-pme" },
      { title: "Previdência Privada", link: "/previdencia-privada" },
      { title: "Seguro Acidentes Pessoais", link: "/seguro-acidentes-pessoais" },
      { title: "Corretora Seguros Guarulhos", link: "/corretora-seguros-guarulhos" },
    ]}
    />
  </>
);

export default SeoSeguroVidaGuarulhos;