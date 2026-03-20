import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-seguro-vida.webp";

const SeguroVida = () => {
  return (
    <InsurancePageTemplate
      heroImage={heroImg}
      title="Seguro de Vida"
      subtitle="Proteção financeira para você e sua família em momentos difíceis"
      icon="❤️"
      metaDescription="Seguro de Vida individual e familiar. Cobertura por morte, invalidez, doenças graves e assistência funeral. Valores a partir de R$ 30/mês. Cotação grátis Patro Seguros."
      description="O Seguro de Vida é, paradoxalmente, um seguro para os vivos. Ele garante que as pessoas que dependem de você financeiramente — filhos, cônjuge, pais — terão recursos para manter o padrão de vida caso você venha a faltar ou fique impossibilitado de trabalhar."
      detailedDescription={`Muitos brasileiros associam o seguro de vida apenas à morte, mas as coberturas mais acionadas são as de invalidez e doenças graves — situações em que o segurado está vivo, mas impossibilitado de gerar renda. Um profissional de 40 anos que sofre um acidente grave e fica impossibilitado de trabalhar enfrenta décadas de despesas sem receita.

Segundo dados do mercado segurador, apenas 18% dos brasileiros possuem seguro de vida. Isso significa que a maioria das famílias não tem nenhuma rede de proteção financeira em caso de imprevistos graves com o principal provedor.

O seguro de vida moderno vai além da indenização por morte: inclui cobertura para invalidez parcial ou total, diagnóstico de doenças graves (câncer, AVC, infarto), assistência funeral, diárias por internação hospitalar e até auxílio alimentação para a família. Algumas apólices também funcionam como reserva financeira resgatável.`}
      howItWorks={[
        { step: "1", title: "Análise das Necessidades", description: "Avaliamos sua situação familiar e financeira: quantos dependentes, renda mensal, dívidas existentes (financiamentos, empréstimos), custo de vida da família e objetivos. Com base nisso, calculamos o capital segurado adequado — geralmente entre 5 e 10 anos de renda familiar." },
        { step: "2", title: "Escolha das Coberturas", description: "Definimos quais coberturas fazem sentido: morte (natural e acidental), invalidez permanente (total ou parcial), doenças graves, diária por internação, assistência funeral. Cada cobertura tem seu próprio capital segurado e pode ser ajustada conforme o orçamento." },
        { step: "3", title: "Cotação e Contratação", description: "Cotamos com seguradoras especializadas em vida. Na maioria dos casos, a contratação é feita com DPS (Declaração Pessoal de Saúde) — um questionário simples, sem exames médicos. Para capitais muito altos ou idades avançadas, pode ser solicitado exame." },
        { step: "4", title: "Revisão Periódica", description: "A vida muda — e o seguro precisa acompanhar. Nascimento de filhos, aquisição de imóvel, mudança de renda: tudo isso impacta o capital necessário. Revisamos anualmente para manter a proteção adequada." },
      ]}
      coverages={[
        { title: "Morte Natural ou Acidental", description: "Indenização integral paga aos beneficiários em caso de falecimento do segurado. O valor é livre de imposto de renda, não entra em inventário e é pago em média em 30 dias — dinheiro que a família recebe rapidamente em um momento crítico." },
        { title: "Invalidez Permanente Total por Acidente (IPA)", description: "Indenização integral se o segurado ficar permanentemente incapacitado para qualquer trabalho por consequência de acidente. Exemplos: perda de membros, paralisia, cegueira total." },
        { title: "Invalidez Funcional Permanente por Doença (IFPD)", description: "Cobertura para invalidez causada por doença (não acidente). Se uma doença grave impossibilitar permanentemente o segurado de exercer sua profissão, a indenização é paga integralmente." },
        { title: "Doenças Graves (DG)", description: "Indenização antecipada em caso de diagnóstico de doenças como câncer, infarto, AVC, insuficiência renal, transplante de órgãos, entre outras. O dinheiro pode ser usado para tratamento, adaptação da casa ou manutenção da família durante a recuperação." },
        { title: "Diária por Internação Hospitalar (DIH)", description: "Pagamento de valor diário por cada dia de internação hospitalar. Funciona como complemento de renda durante o período em que o segurado está internado e sem trabalhar." },
        { title: "Assistência Funeral (Individual ou Familiar)", description: "Cobre todas as despesas com funeral: velório, sepultamento ou cremação, translado do corpo, documentação. Pode ser contratada para o segurado individual ou extensiva à família (cônjuge, filhos e pais)." },
      ]}
      coverageExclusions={[
        "Suicídio nos primeiros 2 anos de vigência (após 2 anos, é coberto por lei)",
        "Atos ilícitos dolosos praticados pelo segurado",
        "Participação em guerras, insurreições ou atos terroristas",
        "Prática de esportes radicais não declarados na contratação",
        "Uso de drogas ilícitas como causa direta do sinistro",
        "Epidemias e pandemias (varia conforme a seguradora e apólice)",
        "Doenças preexistentes não declaradas na DPS",
      ]}
      pricingInfo={{
        intro: "O seguro de vida é mais acessível do que a maioria imagina. Para um adulto de 30 a 40 anos, é possível contratar uma cobertura de R$ 200.000 por morte e invalidez a partir de R$ 30 a R$ 80 por mês. O valor aumenta com a idade e com a inclusão de coberturas adicionais.",
        factors: [
          "Idade — é o principal fator. Quanto mais jovem, mais barato. Contratar cedo trava condições melhores",
          "Capital segurado — valor da indenização desejada",
          "Coberturas escolhidas — morte, invalidez, doenças graves, assistência funeral",
          "Profissão — atividades de risco elevado (motoboy, eletricista, pedreiro) encarecem",
          "Estado de saúde — fumantes pagam mais; doenças preexistentes podem encarecer ou restringir",
          "Sexo — estatisticamente, mulheres pagam menos (menor taxa de mortalidade)",
        ],
        note: "Importante: a indenização do seguro de vida é isenta de Imposto de Renda e não entra em inventário. O pagamento é feito diretamente aos beneficiários, sem esperar processos judiciais — em média, em 30 dias após a entrega da documentação.",
      }}
      realScenarios={[
        { title: "Profissional de 42 anos diagnosticado com câncer", description: "Um executivo de 42 anos, pai de 2 filhos, foi diagnosticado com câncer de intestino. A cobertura de Doenças Graves pagou R$ 150.000 antecipadamente, que foram usados para custear tratamento particular, adaptações em casa e manter as despesas da família durante os 8 meses de tratamento. Ele se recuperou e o seguro de vida continuou ativo." },
        { title: "Acidente de trânsito com invalidez permanente", description: "Um motorista de 35 anos sofreu acidente grave que resultou em perda de mobilidade nos membros inferiores. A cobertura de Invalidez Permanente Total pagou R$ 300.000, que foram usados para adaptação da casa (acessibilidade), aquisição de veículo adaptado e quitação do financiamento imobiliário." },
        { title: "Falecimento de provedor da família", description: "Após falecimento do pai (principal provedor), a família recebeu R$ 500.000 em 25 dias. O valor permitiu quitar o financiamento do apartamento (R$ 180.000), manter o padrão de vida dos 2 filhos e criar uma reserva para a educação das crianças — sem que a mãe precisasse se desesperar financeiramente no pior momento da vida." },
      ]}
      importantDetails={[
        { title: "Como Calcular o Capital Segurado Ideal", content: "A regra prática é multiplicar sua renda mensal líquida por 60 a 120 meses (5 a 10 anos). Some a isso dívidas existentes (financiamento imobiliário, empréstimos, cartão) e custos de educação dos filhos.\n\nExemplo: renda de R$ 8.000/mês × 84 meses (7 anos) = R$ 672.000 + R$ 200.000 de financiamento = R$ 872.000 de capital ideal. Parece muito, mas o custo mensal de um capital de R$ 800.000 para uma pessoa de 35 anos pode ser menor que R$ 150/mês." },
        { title: "Beneficiários — Como Definir", content: "Você pode indicar qualquer pessoa como beneficiário: cônjuge, filhos, pais, irmãos ou até amigos. É possível definir percentuais (ex: 50% cônjuge, 25% cada filho). A indicação pode ser alterada a qualquer momento durante a vigência, sem burocracia.\n\nImportante: se não houver beneficiários indicados, a indenização segue a ordem legal de sucessão e pode entrar em inventário — perdendo a principal vantagem tributária do seguro de vida." },
        { title: "Seguro de Vida vs Previdência Privada", content: "São produtos diferentes e complementares. O seguro de vida paga indenização em caso de sinistro (morte, invalidez). A previdência privada é um investimento de longo prazo para aposentadoria.\n\nO seguro de vida é essencial durante a fase ativa (quando você trabalha e tem dependentes). A previdência privada constrói reserva para quando você parar de trabalhar. O ideal é ter os dois." },
        { title: "DPS — Declaração Pessoal de Saúde", content: "A DPS é um questionário sobre seu histórico de saúde que substitui exames médicos na maioria dos casos. É fundamental responder com honestidade: omitir doenças preexistentes pode causar a negativa do sinistro pela seguradora.\n\nSe você tem alguma condição pré-existente (diabetes, hipertensão, etc.), não se preocupe: é possível contratar com agravamento (valor um pouco maior) ou com exclusão específica daquela condição. A Patro orienta sobre a melhor abordagem." },
      ]}
      tips={[
        "Contrate jovem — a idade é o principal fator de preço. Contratar aos 30 custa metade de contratar aos 50.",
        "Revise o capital segurado quando sua vida mudar: casamento, filhos, compra de imóvel, aumento de renda.",
        "Considere a cobertura de Doenças Graves — é a mais acionada e garante recursos durante o tratamento.",
        "Não esqueça da assistência funeral familiar — em momento de luto, não ter que lidar com custos faz enorme diferença.",
        "Se você fuma, há seguradoras com condições melhores para fumantes — comparar é essencial.",
        "Mantenha os beneficiários sempre atualizados para evitar que a indenização entre em inventário.",
      ]}
      whoNeeds={[
        "Pessoas com dependentes financeiros — cônjuge, filhos menores, pais idosos",
        "Profissionais autônomos e liberais — não têm FGTS, INSS robusto nem benefícios de CLT",
        "Quem tem financiamento imobiliário — o seguro quita a dívida e a família mantém o imóvel",
        "Casais em que ambos contribuem para a renda — a perda de uma renda impacta o padrão de vida",
        "Empresários e sócios — protege a empresa e a família em caso de falecimento de sócio",
        "Profissionais de risco — motoristas, eletricistas, trabalhadores em altura, etc.",
        "Qualquer adulto a partir dos 25 anos que queira proteger quem ama",
      ]}
      whyPatro={[
        "Cálculo preciso do capital segurado com base na sua realidade financeira e familiar",
        "Comparação entre seguradoras especializadas em vida para encontrar o melhor custo-benefício",
        "Orientação sobre DPS — como declarar condições preexistentes sem comprometer a apólice",
        "Suporte total aos beneficiários no momento do sinistro — cuidamos de toda a documentação",
        "Revisão periódica das coberturas conforme mudanças na vida (filhos, imóvel, renda)",
        "Atendimento humanizado — entendemos a sensibilidade do tema e tratamos com cuidado",
      ]}
      faqs={[
        { question: "Quanto custa um seguro de vida?", answer: "Depende principalmente da idade, capital segurado e coberturas. Para referência: uma pessoa de 30-35 anos pode contratar R$ 300.000 de cobertura por morte + invalidez por aproximadamente R$ 40 a R$ 100/mês. Aos 45-50 anos, o mesmo capital custa entre R$ 100 e R$ 250/mês. Coberturas adicionais (doenças graves, DIH) aumentam o valor, mas proporcionalmente pouco." },
        { question: "Qual o valor ideal de cobertura?", answer: "A recomendação é cobrir de 5 a 10 anos de renda familiar líquida, mais dívidas (financiamentos, empréstimos). Exemplo: renda de R$ 6.000 × 84 meses = R$ 504.000 + R$ 150.000 de financiamento = R$ 654.000. Parece alto, mas o custo mensal é acessível. Na Patro, fazemos esse cálculo detalhado com você." },
        { question: "Quem pode ser beneficiário?", answer: "Qualquer pessoa: cônjuge, filhos, pais, irmãos, amigos ou até uma instituição. Você define os percentuais livremente e pode alterar a qualquer momento. Se não indicar beneficiários, a indenização segue a ordem legal de sucessão e pode entrar em inventário — perdendo a vantagem de pagamento rápido e isenção fiscal." },
        { question: "Preciso fazer exames médicos?", answer: "Na maioria dos casos, não. Até capitais de R$ 500.000 a R$ 1.000.000 (varia por seguradora e idade), basta preencher a DPS (Declaração Pessoal de Saúde). Para capitais acima ou idades mais avançadas, podem ser solicitados exames básicos (sangue, ECG). Facilitamos todo o processo." },
        { question: "O seguro de vida cobre suicídio?", answer: "Após 2 anos de vigência contínua da apólice, sim — é garantido pelo Código Civil (art. 798). Nos primeiros 2 anos, a maioria das seguradoras não cobre. Essa regra existe para evitar contratação com intenção fraudulenta e é padrão no mercado mundial." },
        { question: "A indenização paga Imposto de Renda?", answer: "Não! A indenização do seguro de vida é isenta de IR e não entra em inventário. O pagamento é feito diretamente aos beneficiários indicados, geralmente em até 30 dias. É uma das formas mais eficientes de transferência de patrimônio no Brasil." },
        { question: "Posso ter mais de um seguro de vida?", answer: "Sim! Não existe limite. Você pode ter seguros em diferentes seguradoras e, em caso de sinistro, todas pagam integralmente. Muitas pessoas têm seguro pela empresa (em grupo) e complementam com um seguro individual com capitais mais altos." },
        { question: "Seguro de vida em grupo (empresa) é suficiente?", answer: "Geralmente não. O seguro de vida em grupo oferecido pela empresa costuma ter capitais baixos (12 a 24 salários) e você perde a cobertura ao sair da empresa. O ideal é ter um seguro individual com capital adequado como base e considerar o do grupo como complemento." },
      ]}
      relatedInsurances={[
        { title: "Previdência Privada", link: "/previdencia-privada" },
        { title: "Seguro Saúde", link: "/seguro-saude" },
        { title: "Seguro Acidentes Pessoais", link: "/seguro-acidentes-pessoais" },
        { title: "Seguro Residencial", link: "/seguro-residencial" },
      ]}
      quoteFormFields={[
        { id: "nascimento", label: "Data de nascimento", placeholder: "Ex: 15/03/1985" },
        { id: "profissao", label: "Profissão", placeholder: "Ex: Engenheiro, Médico, Autônomo" },
        { id: "capital", label: "Capital desejado", placeholder: "Selecione", type: "select", options: ["Até R$ 100.000", "R$ 100.000 a R$ 300.000", "R$ 300.000 a R$ 500.000", "Acima de R$ 500.000", "Não sei / quero orientação"] },
      ]}
    />
  );
};

export default SeguroVida;
