import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-seguro-vida.webp";

const SeoSeguroVidaSaudeGuarulhos = () => (
  <InsurancePageTemplate
    heroImage={heroImg}
    title="Seguro de Vida e Saúde em Guarulhos"
    subtitle="Proteção para você e sua família em Guarulhos. Seguro de vida, planos de saúde e odontológico com cotação gratuita."
    description="A Patro Seguros oferece as melhores opções de seguro de vida e planos de saúde em Guarulhos para pessoas físicas, famílias e empresas. Com mais de 400 vidas protegidas na região, comparamos mais de 20 operadoras — Amil, SulAmérica, Bradesco Saúde, Unimed, Hapvida e Prevent Senior — para encontrar o plano ideal para seu perfil e orçamento."
    detailedDescription={`Guarulhos, com mais de 1,4 milhão de habitantes, enfrenta desafios significativos na área de saúde. A rede pública, embora ampla, apresenta filas longas para especialidades e exames de alta complexidade. Moradores que dependem exclusivamente do SUS podem esperar meses para consultas com cardiologistas, ortopedistas e oncologistas — especialidades críticas para a saúde da família.

O seguro de vida, por sua vez, é uma proteção financeira essencial que vai muito além do falecimento. Apólices modernas cobrem invalidez por acidente, doenças graves (câncer, AVC, infarto), diárias de internação hospitalar e até assistência funeral familiar. Para profissionais liberais de Guarulhos — médicos, advogados, engenheiros e consultores — o seguro de vida funciona como uma rede de segurança financeira caso fiquem impossibilitados de trabalhar.

A Patro Seguros atende presencialmente no Cidade Maia e conhece a realidade de saúde da região. Sabemos quais operadoras têm a melhor rede de hospitais e laboratórios em Guarulhos (Hospital Bom Clima, Hospital Stella Maris, Laboratório Fleury), quais oferecem melhor custo-benefício para PMEs e quais planos atendem melhor famílias com crianças ou idosos.

Para empresas de Guarulhos, oferecemos planos de saúde PME a partir de 2 vidas com preços até 40% menores que planos individuais. Trabalhamos com Hapvida, Amil, SulAmérica, Bradesco Saúde e Notre Dame para encontrar o melhor equilíbrio entre custo, rede credenciada e abrangência.`}
    icon="❤️"
    metaDescription="Seguro de Vida e Plano de Saúde em Guarulhos. Compare Amil, SulAmérica, Unimed e mais. Cotação grátis para pessoa física e empresas. Patro Seguros Guarulhos."
    coverages={[
      { title: "Seguro de Vida Individual", description: "Proteção financeira para sua família em caso de falecimento, invalidez permanente ou doenças graves. Capital segurado sob medida." },
      { title: "Seguro de Vida em Grupo (PME)", description: "Benefício corporativo para empresas de Guarulhos com condições especiais a partir de 3 vidas." },
      { title: "Plano de Saúde Individual/Familiar", description: "Cobertura médica completa com ampla rede de hospitais e laboratórios em Guarulhos e Grande SP." },
      { title: "Plano de Saúde Empresarial (PME)", description: "Planos com preços até 40% menores que individuais, a partir de 2 vidas para empresas de Guarulhos." },
      { title: "Plano Odontológico", description: "Cobertura dental acessível para pessoa física e empresas. Consultas, limpeza, restaurações e ortodontia." },
      { title: "Assistência Funeral Familiar", description: "Serviço completo de assistência funeral para o titular e familiares, incluído no seguro de vida." },
    ]}
    howItWorks={[
      { step: "1", title: "Conte sobre suas necessidades", description: "Informe seu perfil (idade, família, empresa), orçamento e coberturas desejadas. Atendimento presencial ou online." },
      { step: "2", title: "Comparação entre operadoras", description: "A Patro consulta Amil, SulAmérica, Bradesco Saúde, Unimed, Hapvida e outras para montar propostas personalizadas." },
      { step: "3", title: "Análise da rede credenciada", description: "Verificamos quais hospitais, laboratórios e médicos em Guarulhos cada plano cobre para garantir conveniência." },
      { step: "4", title: "Contratação assistida", description: "Ajudamos com toda a documentação, carências e migração de plano. Sem burocracia e sem intermediários." },
    ]}
    pricingInfo={{
      intro: "O seguro de vida em Guarulhos começa a partir de R$ 30/mês para jovens adultos, com capital segurado de R$ 100.000. Planos de saúde individuais custam a partir de R$ 250/mês (enfermaria) e R$ 450/mês (apartamento). Planos PME a partir de R$ 180/vida/mês com coberturas equivalentes.",
      factors: [
        "Idade do segurado ou beneficiário (fator mais relevante para saúde)",
        "Tipo de acomodação: enfermaria ou apartamento",
        "Abrangência: municipal (Guarulhos), estadual (SP) ou nacional",
        "Coparticipação: planos com copagamento são 20-30% mais baratos",
        "Número de vidas (planos PME: quanto mais, menor o custo unitário)",
        "Coberturas extras: doenças graves, diária hospitalar, assistência funeral",
      ],
      note: "Dica Patro: Famílias com crianças e idosos podem economizar até 25% escolhendo planos com coparticipação — você paga uma pequena taxa por consulta, mas o valor mensal é significativamente menor.",
    }}
    realScenarios={[
      { title: "Case: PME do Cidade Maia economizou R$ 2.500/mês em plano de saúde", description: "Uma clínica médica com 12 funcionários no Cidade Maia pagava R$ 850/vida/mês no plano empresarial. A Patro renegociou com 3 operadoras e migrou para um plano SulAmérica com rede equivalente por R$ 640/vida/mês — economia de R$ 2.520/mês (R$ 30.240/ano) sem perda de qualidade." },
      { title: "Case: Seguro de vida salvou família após diagnóstico de doença grave", description: "Um empresário de 45 anos em Guarulhos, cliente da Patro, foi diagnosticado com câncer. Seu seguro de vida com cobertura de doenças graves pagou R$ 200.000 antecipadamente, permitindo que ele fizesse o tratamento no Hospital Sírio-Libanês enquanto mantinha a família financeiramente protegida." },
      { title: "Case: Migração de plano sem carência para família com idosos", description: "Uma família com 2 idosos (acima de 60 anos) precisava migrar de plano por reajuste abusivo. A Patro encontrou um plano Bradesco Saúde com portabilidade de carências, mantendo todos os direitos adquiridos e reduzindo a mensalidade em 18%." },
    ]}
    tips={[
      "Compare sempre antes de renovar: reajustes podem variar 20-50% entre operadoras para o mesmo perfil.",
      "Portabilidade de carências: você pode migrar de plano sem cumprir carências novamente. A Patro orienta todo o processo.",
      "Seguro de vida: comece jovem. Quanto mais cedo contratar, menor o prêmio — e ele é mantido ao longo dos anos.",
      "PMEs: planos empresariais são significativamente mais baratos que individuais. A partir de 2 vidas já compensa.",
      "Doenças graves: inclua essa cobertura no seguro de vida. O pagamento antecipado pode custear o tratamento completo.",
    ]}
    whoNeeds={[
      "Famílias de Guarulhos que buscam proteção financeira e de saúde",
      "Profissionais liberais (médicos, advogados, engenheiros, consultores)",
      "PMEs que desejam oferecer benefícios de saúde aos colaboradores",
      "Pessoas acima de 50 anos buscando cobertura de saúde acessível",
      "Jovens adultos que querem garantir seguro de vida com preço baixo",
      "Empresários que precisam de proteção financeira para a família e negócio",
    ]}
    whyPatro={[
      "Comparamos mais de 20 operadoras de saúde e seguradoras de vida",
      "Mais de 400 vidas protegidas em Guarulhos — experiência comprovada",
      "Consultoria presencial no Cidade Maia com atendimento humanizado",
      "Especialistas em planos PME com condições exclusivas para empresas locais",
      "Suporte na utilização do plano, renovação e migração sem burocracia",
      "Conhecemos a rede credenciada de Guarulhos: hospitais, clínicas e laboratórios",
    ]}
    faqs={[
      { question: "Quanto custa seguro de vida em Guarulhos?", answer: "O seguro de vida em Guarulhos começa a partir de R$ 30/mês para adultos jovens (25-35 anos) com capital de R$ 100.000. Para um perfil de 45 anos com R$ 500.000 de capital e cobertura de doenças graves, o custo fica em torno de R$ 150-250/mês. Solicite cotação personalizada." },
      { question: "Qual o melhor plano de saúde em Guarulhos?", answer: "Depende do perfil. Para famílias, Amil e SulAmérica têm ampla rede local (Hospital Bom Clima, Stella Maris). Para PMEs, Hapvida e Bradesco oferecem preços competitivos. A Patro compara todas as opções gratuitamente." },
      { question: "Seguro de vida cobre doenças graves?", answer: "Sim. Muitas apólices incluem cobertura para diagnóstico de doenças graves como câncer, AVC e infarto, com pagamento antecipado da indenização total ou parcial. A Patro recomenda essa cobertura para todos os perfis." },
      { question: "Como funciona a portabilidade de plano de saúde?", answer: "Você pode migrar para outro plano de saúde sem cumprir carências novamente, desde que esteja em dia com as mensalidades e o novo plano seja de categoria igual ou inferior. A Patro cuida de todo o processo de portabilidade." },
      { question: "Plano de saúde PME vale a pena para empresa com poucos funcionários?", answer: "Sim! A partir de 2 vidas, o plano PME já é 20-40% mais barato que o individual. Para empresas de Guarulhos, a Patro negocia condições especiais com Hapvida, Amil e SulAmérica." },
    ]}
    relatedInsurances={[
      { title: "Seguro Auto Guarulhos", link: "/seguro-auto-guarulhos" },
      { title: "Seguro Residencial Guarulhos", link: "/seguro-residencial-guarulhos" },
      { title: "Plano Saúde Empresarial", link: "/plano-saude-empresarial" },
      { title: "Seguros PME Guarulhos", link: "/seguros-empresariais-pme-guarulhos" },
      { title: "Seguro Frota Guarulhos", link: "/seguro-frota-empresas-guarulhos" },
      { title: "Corretora Seguros Guarulhos", link: "/" },
    ]}
  />
);

export default SeoSeguroVidaSaudeGuarulhos;
