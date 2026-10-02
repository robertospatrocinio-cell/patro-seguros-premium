import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import { getLongtailCluster, getSectionCtasForSlug } from "@/lib/longtailClusters";

const SLUG = "/melhor-seguro-para-uber-guarulhos";

const LongtailMelhorSeguroUberGuarulhos = () => (
  <InsurancePageTemplate
    sectionCtas={getSectionCtasForSlug(SLUG)}
    jumpLinks={[
      { label: "Melhores seguradoras", href: "#coberturas-heading" },
      { label: "Quanto custa", href: "#preco-heading" },
      { label: "Quem precisa", href: "#quem-precisa-heading" },
      { label: "Perguntas frequentes", href: "#faq-heading" },
      { label: "Cotar agora", href: "#formulario-heading" },
    ]}
    title="Como comparar seguro para Uber em Guarulhos? Guia 2026"
    subtitle="Comparativo de alternativas para motoristas Uber em Guarulhos. Preço, franquia, aceitação de uso profissional e coberturas devem ser avaliados conforme o perfil e as condições de cada proposta."
    description="Comparativo de alternativas de seguro para motorista Uber em Guarulhos, considerando produtos com cláusula expressa de uso por aplicativo e análise conforme o perfil."
    detailedDescription={`Perguntar 'qual o melhor seguro para Uber em Guarulhos' exige considerar idade, modelo do carro, CEP, uso profissional e condições da apólice. A análise deve comparar as alternativas disponíveis para o perfil, sem presumir uma seguradora única ou uma ordem universal de preferência.

Exemplo de análise para um perfil específico (motorista 32 anos, Onix 2022, CEP Cidade Maia, sem sinistros, 8h/dia em app):

1º Porto Seguro Auto Uber — R$ 3.100/ano. Melhor custo-benefício. Franquia R$ 4.200, carro reserva 15 dias, cobertura APP inclusa, rede referenciada ampla em Guarulhos. Aceita novos motoristas com CNH >2 anos.

2º Allianz Auto App — R$ 3.400/ano. Melhor cobertura de terceiros (R$ 200 mil corporais + R$ 100 mil materiais). Franquia R$ 4.800. Assistência 24h com atendimento em até 60 min em Guarulhos.

3º HDI Seguros Motorista de App — R$ 3.500/ano. Melhor para carros >5 anos (Onix 2018, HB20 2019). Franquia R$ 5.200. Carro reserva de 10 dias.

4º Tokio Marine App Protect — R$ 3.800/ano. Melhor para motoristas jovens (21-25 anos) que outras seguradoras recusam. Franquia R$ 5.500.

Bradesco Auto, SulAmérica Auto e Mapfre podem ter regras próprias de aceitação. Não é possível presumir a negativa de um sinistro sem analisar a apólice, o risco declarado e as circunstâncias do evento.

O critério mais importante para escolher o melhor seguro Uber em Guarulhos não é apenas o preço: é ter cláusula expressa no contrato reconhecendo o uso remunerado. Sem isso, mesmo apólice cara pode ser negada em sinistro.`}
    icon="🏆"
    metaDescription="Como comparar seguro para Uber em Guarulhos em 2026: uso profissional, franquia, coberturas e condições da apólice. Cotação conforme o perfil."
    coverages={[
      { title: "Uso profissional informado", description: "A utilização por aplicativo deve ser informada e aceita conforme o produto e as condições contratuais aplicáveis." },
      { title: "Roubo e Furto em Guarulhos", description: "A indenização e a forma de cálculo dependem da cobertura contratada, da modalidade de valor e das condições da apólice." },
      { title: "Colisão + Terceiros", description: "Cobertura para o próprio carro, terceiros (materiais/corporais) e passageiros — essencial para motoristas de app." },
      { title: "Carro Reserva Estendido", description: "10 a 20 dias de carro reserva — o motorista não fica sem renda enquanto o veículo está em conserto." },
      { title: "Assistência 24h em Guarulhos", description: "Guincho, chaveiro, socorro mecânico — atendimento em até 60min nas melhores seguradoras." },
      { title: "APP — Acidentes Pessoais de Passageiros", description: "Quando contratado, observa os limites, eventos e condições previstos na apólice. Não presumir exigência igual para Uber e 99." },
    ]}
    howItWorks={[
      { step: "1", title: "Cotação conforme aceitação", description: "Analisamos as alternativas disponíveis para o seu perfil, produto, veículo e uso profissional." },
      { step: "2", title: "Ranking técnico personalizado", description: "Comparativo com preço, franquia, cobertura APP e tempo de assistência para o seu perfil e CEP em Guarulhos." },
      { step: "3", title: "Análise da cláusula contratual", description: "Validamos que o contrato menciona expressamente uso por aplicativo — não vale confiar em 'palavra do vendedor'." },
      { step: "4", title: "Contratação em 24h", description: "Ativação rápida, apólice digital, sem burocracia. Você começa a rodar coberto no dia seguinte." },
      { step: "5", title: "Suporte técnico em sinistro", description: "Se acontecer um sinistro em corrida, orientamos passo a passo para não haver negativa — nosso diferencial no mercado." },
    ]}
    pricingInfo={{
      intro: "O melhor seguro Uber em Guarulhos custa entre R$ 3.100 e R$ 3.800/ano para motoristas com perfil médio (32 anos, Onix 2022, CEP Cidade Maia). Motoristas jovens (21-25) pagam 30–50% mais, motoristas 40+ com bônus completo pagam 15–25% menos. Full-time (>8h/dia) tem prêmio 10–20% maior que parcial.",
      factors: [
        "Idade do motorista — quanto mais jovem, mais caro (mais na faixa 21-25 anos)",
        "CEP de pernoite — Cidade Maia < Vila Galvão < Cumbica < Pimentas",
        "Modelo e ano do carro — Onix e HB20 são os mais baratos de segurar em app",
        "Horas rodadas por dia — full-time 8h+ tem prêmio maior que 4h/dia",
        "Bônus — a classe e os critérios de desconto dependem da seguradora e das condições aplicáveis",
        "Rastreador ativo + garagem fechada reduzem o prêmio em 10–15%",
      ],
      note: "Dica Patro: motorista Uber em Guarulhos que renova apólice sem cotar em outras seguradoras costuma pagar 15–25% acima do mercado. Faça cotação anual — os preços mudam constantemente e a economia acumulada em 3 anos passa de R$ 2.500.",
    }}
    realScenarios={[
      { title: "Motorista Cumbica trocou HDI por Porto Seguro", description: "Motorista de 36 anos, HB20 2021, pagava R$ 4.200/ano na HDI. A Patro cotou Porto Seguro Auto Uber por R$ 3.150/ano — mesma cobertura, R$ 1.050 de economia por ano." },
      { title: "Motorista jovem em Vila Augusta consegue apólice na Tokio", description: "Motorista de 23 anos, Onix 2020, rejeitado por Porto e Allianz. A Patro contratou Tokio Marine App Protect por R$ 4.100/ano — única seguradora que aceitou o perfil com cláusula de app." },
      { title: "Sinistro em corrida Uber pago sem negativa", description: "Motorista colidiu com passageiro em corrida no GRU Airport. Apólice da Allianz com cláusula expressa cobriu tudo: reparo do carro (R$ 12 mil), terceiros (R$ 8 mil) e passageiro (R$ 4 mil de despesas médicas). Sem a cláusula, teria sido negativa." },
    ]}
    coverageExclusions={[
      "Motorista sem cadastro ativo em plataforma de app no momento do sinistro",
      "Condução sob efeito de álcool ou substâncias",
      "Uso do veículo para atividade não declarada (delivery de carga pesada, transporte escolar informal)",
      "Corridas, rachas, competições ou performance",
      "Falsidade nas declarações de horas rodadas e uso",
    ]}
    tips={[
      "Nunca contrate seguro convencional se você dirige para Uber — a negativa em sinistro é quase certa.",
      "Peça sempre o contrato com a menção explícita 'uso por aplicativo' antes de assinar.",
      "Compare pelo menos 4 seguradoras — o preço para o mesmo perfil varia até 30%.",
      "Instale rastreador e prefira garagem fechada — redução de 10–15% no prêmio.",
      "Guarde os prints das corridas — em sinistro, você comprova o uso do veículo naquele momento.",
    ]}
    whoNeeds={[
      "Motoristas Uber, 99 e InDriver em Guarulhos (full-time ou parcial)",
      "Motoristas que atendem o Aeroporto GRU e terminais rodoviários",
      "Motoristas jovens (21-25) rejeitados pelas seguradoras convencionais",
      "Proprietários de frota que alugam para motoristas de app",
      "Motoristas de outros apps (Cabify, iFood Moto, Rappi) que precisam da mesma cobertura",
      "Quem tem seguro convencional hoje e quer migrar para apólice com cláusula de app",
    ]}
    whyPatro={[
      "200+ motoristas de app protegidos em Guarulhos",
      "Ranking técnico atualizado com preços reais das 4 seguradoras Uber-friendly",
      "Análise gratuita da cláusula contratual antes de contratar",
      "Atendimento presencial no Cidade Maia + WhatsApp para motoristas em qualquer bairro",
      "Suporte técnico em sinistro para evitar negativa por argumentação",
      "Análise das alternativas disponíveis conforme o perfil",
    ]}
    faqs={[
      { question: "Qual o melhor seguro para Uber em Guarulhos em 2026?", answer: "Não existe uma opção universalmente melhor. A escolha depende do perfil, do veículo, do uso profissional, do CEP e das condições de cada proposta. A Patro pode comparar as alternativas disponíveis para o caso." },
      { question: "Quanto custa o melhor seguro Uber em Guarulhos?", answer: "Entre R$ 3.100 e R$ 3.800/ano para perfil médio (motorista 32 anos, Onix 2022, Cidade Maia). Motoristas jovens (21-25) pagam 30–50% mais, motoristas 40+ com bônus completo pagam menos que R$ 3.000/ano." },
      { question: "Quais seguradoras aceitam Uber em Guarulhos com cláusula expressa?", answer: "Em 2026: Porto Seguro, Allianz, HDI e Tokio Marine. Bradesco, SulAmérica e Mapfre não aceitam expressamente — apólice contratada nelas para Uber corre alto risco de negativa em sinistro." },
      { question: "Posso usar meu seguro comum se não avisei que dirijo para Uber?", answer: "Não. Omitir uso remunerado configura má-fé contratual e permite à seguradora negar qualquer sinistro, mesmo em situações não ligadas às corridas. Sempre declare uso por app na contratação." },
      { question: "Vale a pena pagar mais caro por seguro Uber?", answer: "Sim. O custo adicional (R$ 500 a R$ 1.000/ano) é irrelevante comparado ao risco de perder o carro por negativa em sinistro. Um Onix roubado sem cobertura custa R$ 60 mil — 20 anos de diferença de prêmio." },
      { question: "Qual o melhor seguro Uber em Guarulhos para BYD Dolphin e elétricos?", answer: "Para motorista Uber com BYD Dolphin (ou outro elétrico) em Guarulhos, a Porto Seguro Elétricos App e a HDI Green Motorista de App são as únicas que combinam cláusula de uso remunerado + cobertura de bateria de tração + rede autorizada BYD. Preço entre R$ 3.900 e R$ 4.800/ano." },
      { question: "Como fazer cotação online de seguro Uber em Guarulhos?", answer: "Envie os dados solicitados pela corretora, incluindo veículo, condutor, CEP e uso profissional. A análise e o prazo dependem da complexidade do risco, da disponibilidade e dos procedimentos das seguradoras consultadas." },
    ]}
    extraSections={(
      <section aria-labelledby="ranking-seguro-uber-guarulhos" className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 id="ranking-seguro-uber-guarulhos" className="text-2xl md:text-3xl font-bold text-primary mb-4">
            Ranking do melhor seguro para Uber em Guarulhos por perfil de motorista
          </h2>
          <p className="text-foreground/80 mb-4">
            Não existe um único &quot;melhor seguro Uber em Guarulhos&quot; — a resposta depende de idade, modelo do carro, CEP e horas rodadas. A comparação deve considerar as condições efetivamente disponíveis para cada perfil.
          </p>
          <h3 className="text-xl font-semibold text-primary mt-6 mb-3">Motorista Uber jovem (21-27 anos)</h3>
          <p className="text-foreground/80 mb-4">
            <strong>Exemplo de alternativa:</strong> Tokio Marine App Protect. A aceitação, o preço e as coberturas devem ser confirmados para o perfil e a proposta analisados.
          </p>
          <h3 className="text-xl font-semibold text-primary mt-6 mb-3">Motorista Uber full-time (8h+/dia)</h3>
          <p className="text-foreground/80 mb-4">
            <strong>Exemplo de alternativa:</strong> Porto Seguro Auto Uber. Franquia, carro reserva, rede referenciada e demais condições dependem da proposta e da apólice.
          </p>
          <h3 className="text-xl font-semibold text-primary mt-6 mb-3">Motorista Uber com carro elétrico (BYD Dolphin, Volt)</h3>
          <p className="text-foreground/80 mb-4">
            <strong>Exemplos para análise:</strong> produtos para veículos elétricos podem ter condições específicas de uso profissional, bateria e assistência. Confirme a disponibilidade e os limites na proposta.
          </p>
          <h3 className="text-xl font-semibold text-primary mt-6 mb-3">Cotação de seguro Uber online em Guarulhos</h3>
          <p className="text-foreground/80">
            A cotação online depende dos dados recebidos, da aceitação do risco e da disponibilidade das seguradoras. A corretora pode apresentar um comparativo conforme as alternativas efetivamente disponíveis para o perfil.
          </p>
        </div>
      </section>
    )}
    relatedInsurances={[
      { title: "Seguro Uber por Bairro em Guarulhos (Hub Local)", link: "/seguros-guarulhos" },
      { title: "Seguro para Uber Guarulhos", link: "/seguro-uber-guarulhos" },
      { title: "Seguro para Motorista de App Guarulhos", link: "/seguro-para-motorista-app-guarulhos" },
      { title: "Seguro Auto Guarulhos", link: "/seguro-auto-guarulhos" },
      { title: "Seguro Auto por Modelo Guarulhos", link: "/seguro-auto-por-modelo-guarulhos" },
      { title: "Seguro de Frota Guarulhos", link: "/seguro-frota-empresas-guarulhos" },
      { title: "Como Comparar Seguradoras em Guarulhos", link: "/como-comparar-seguradoras-guarulhos" },
      { title: "Soluções para Motoristas de App", link: "/seguros/motoristas-app" },
    ]}
    trilhaSeo={getLongtailCluster("/melhor-seguro-para-uber-guarulhos")}
  />
);

export default LongtailMelhorSeguroUberGuarulhos;
