import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import PrerenderText from "@/components/PrerenderText";
import heroImg from "@/assets/hero-seguro-vida.webp";

const SeoSeguroVidaGuarulhos = () => (
  <>
    <PrerenderText slug="seguro-vida-guarulhos" />
    <InsurancePageTemplate
    heroImage={heroImg}
    title="Seguro de Vida em Guarulhos | Simulação Online | Patro"
    headline="Seguro de Vida Individual e Familiar em Guarulhos"
    subtitle="Seguro de Vida em Guarulhos — Tranquilidade para Quem Você Ama"
    description="Seguro de vida em Guarulhos com alternativas de proteção conforme o perfil, as coberturas contratadas e as condições da apólice. Cotação online com a Patro Seguros."
    detailedDescription={`O seguro de vida é, hoje, uma das proteções financeiras mais subutilizadas no Brasil. Estimativas indicam que apenas 15% dos brasileiros têm seguro de vida individual contratado — e em Guarulhos, com 1,4 milhão de habitantes e forte presença de profissionais autônomos, motoristas de aplicativo, comerciantes e trabalhadores em logística, esse índice expõe milhares de famílias a vulnerabilidade financeira em caso de falecimento ou invalidez do provedor.

Apólices modernas vão muito além da indenização por morte. Cobrem invalidez permanente por acidente ou doença, diagnóstico de doenças graves (câncer, AVC, infarto, Alzheimer) com pagamento antecipado, diárias hospitalares, assistência funeral familiar e até renda mensal temporária. Para profissionais liberais — médicos, advogados, dentistas, engenheiros — o seguro de vida funciona como proteção de renda, garantindo que a família mantenha o padrão de vida mesmo em situações graves.

A Patro Seguros estrutura alternativas de seguro de vida para a realidade de Guarulhos. Trabalhamos com seguros individuais, seguros prestamistas vinculados a financiamentos, seguro de vida em grupo para PMEs e seguros para profissionais autônomos, sempre conforme o produto, a seguradora e as condições aceitas.

Nosso atendimento presencial no Cidade Maia inclui análise gratuita de apólices existentes — muitas vezes encontramos coberturas duplicadas, capital subdimensionado ou prêmios acima do mercado. Mais de 60% dos clientes que migram para a Patro economizam ou ampliam a cobertura mantendo o mesmo investimento mensal.`}
    icon="❤️"
    metaDescription="Seguro de Vida em Guarulhos: compare alternativas de cobertura conforme seu perfil e as condições da apólice. Cotação com a Patro Seguros."
    coverages={[
      { title: "Morte", description: "Pode prever indenização aos beneficiários em caso de falecimento, conforme a cobertura, os limites, as exclusões e as condições da apólice." },
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
      intro: "O preço do seguro de vida depende do capital, coberturas, idade, perfil, profissão, saúde declarada, forma de contratação e critérios da seguradora. A proposta individual é necessária para comparar valores.",
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
      { title: "Exemplo de análise de proteção familiar", description: "Em caso de morte coberta, os beneficiários podem requerer a indenização conforme a apólice, a documentação e a análise da seguradora. O resultado não é automático e varia conforme o contrato." },
      { title: "Case: Indenização antecipada por câncer permitiu tratamento premium", description: "Cliente de 48 anos, autônomo em Guarulhos, foi diagnosticado com câncer. A cobertura de doenças graves pagou R$ 200.000 antecipadamente, permitindo tratamento no Hospital Sírio-Libanês enquanto a apólice principal seguia ativa para a família." },
      { title: "Case: Migração economizou R$ 180/mês com mais cobertura", description: "Família de Guarulhos pagava R$ 420/mês por apólice antiga com R$ 300 mil de capital. A Patro renegociou e migrou para Icatu com R$ 500 mil de capital + doenças graves + funeral familiar por R$ 240/mês — economia de R$ 2.160/ano com cobertura ampliada." },
    ]}
    coverageExclusions={[
      "Suicídio: analisar o art. 120 da Lei nº 15.040/2024, a vigência e as circunstâncias do caso",
      "Atos ilícitos praticados pelo segurado",
      "Doenças preexistentes não declaradas no questionário inicial",
      "Esportes radicais não declarados (paraquedismo, mergulho profissional, asa-delta)",
      "Guerra, motim ou atos de terrorismo",
    ]}
    tips={[
      "Comece jovem: cada ano que adia significa prêmio mais alto pelo resto da vida.",
      "Capital segurado: dimensione considerando dependentes, renda, dívidas, objetivos e os limites do produto; não há fórmula universal.",
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
      "Mais de 400 vidas protegidas em Guarulhos",
      "Comparação entre 16+ seguradoras de vida líderes do Brasil",
      "Atendimento presencial humanizado no Cidade Maia",
      "Análise gratuita de apólices existentes — economia média de 25%",
      "Suporte completo aos familiares no momento do sinistro",
      "Especialistas em seguro de vida para profissionais liberais e autônomos",
    ]}
    faqs={[
      { question: "Quanto custa seguro de vida em Guarulhos?", answer: "Depende do capital, coberturas, idade, perfil, profissão, saúde declarada e critérios da seguradora. Solicite uma cotação personalizada." },
      { question: "Qual a diferença entre seguro de vida individual e prestamista?", answer: "O seguro individual protege sua família com indenização escolhida por você. O prestamista é vinculado a um financiamento (imóvel, veículo) e quita a dívida em caso de morte do segurado. A Patro recomenda ambos, pois cumprem funções diferentes." },
      { question: "Seguro de vida cobre suicídio em Guarulhos?", answer: "A regra deve ser analisada conforme o art. 120 da Lei nº 15.040/2024, a vigência, o contrato e as circunstâncias do caso." },
      { question: "Posso ter mais de um seguro de vida?", answer: "É possível contratar mais de uma apólice, mas aceitação, capitais, acumulação e eventual pagamento dependem das condições de cada contrato e da análise do sinistro." },
      { question: "Como funciona pagamento de indenização em Guarulhos?", answer: "Os beneficiários comunicam o evento e apresentam os documentos aplicáveis. A seguradora analisa cobertura, vigência, limites e exclusões; o prazo depende da apólice, da documentação, da regulação e da legislação aplicável." },
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
