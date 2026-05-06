import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-seguro-motorista-app.webp";

const SeoSeguroMotoristaAppGuarulhos = () => (
  <InsurancePageTemplate
    heroImage={heroImg}
    title="Seguro para Motorista de Aplicativo em Guarulhos"
    subtitle="Proteção completa para motoristas de Uber, 99, iFood, Rappi e demais apps em Guarulhos. Cotação gratuita Patro Seguros."
    description="Seguro para motorista de aplicativo em Guarulhos com cobertura específica para uso profissional do veículo em Uber, 99, InDriver, iFood, Rappi e demais plataformas. A Patro Seguros é especialista local — mais de 200 motoristas de app já protegidos na região, com cláusulas contratuais que garantem indenização real em caso de sinistro durante corridas ou entregas."
    detailedDescription={`Guarulhos concentra uma das maiores populações de motoristas e entregadores de aplicativo da Grande São Paulo. Com proximidade ao Aeroporto Internacional GRU, terminais rodoviários e fluxo intenso para a capital pela Dutra, Fernão Dias e Ayrton Senna, a região emprega informalmente milhares de profissionais em Uber, 99, InDriver, iFood, Rappi, Loggi e outras plataformas.

O grande risco para esses profissionais é descobrir, no momento do sinistro, que a apólice contratada não cobre o uso remunerado do veículo. Seguros tradicionais frequentemente excluem corridas e entregas — e podem negar indenização integral em caso de roubo, colisão ou furto se comprovado o uso para app no momento do evento.

A Patro Seguros trabalha exclusivamente com seguradoras que aceitam expressamente o uso para aplicativo, com cláusula contratual clara. Isso significa que roubo no Cumbica enquanto aguarda corrida, colisão na Dutra levando passageiro ou queda em entrega no Cidade Maia ficam todos cobertos sem discussão jurídica.

Atendemos motoristas full-time (8-12h/dia), motoristas que complementam renda em horários alternativos, entregadores de moto/bike (iFood, Rappi) e proprietários de frota que alugam veículos para motoristas de app. Nossas apólices contemplam carros, motos e até cargo bikes, com prêmios competitivos para a realidade financeira do trabalhador autônomo.`}
    icon="🚗"
    metaDescription="Seguro para Motorista de Aplicativo em Guarulhos: Uber, 99, iFood, Rappi. Cotação grátis Patro Seguros com cobertura real para corridas e entregas."
    coverages={[
      { title: "Cobertura Durante Corridas e Entregas", description: "Proteção válida mesmo em viagens remuneradas — cláusula expressa para Uber, 99, iFood, Rappi e demais apps." },
      { title: "Roubo e Furto", description: "Indenização integral pelo valor FIPE em caso de roubo ou furto, mesmo durante operação em aplicativo." },
      { title: "Colisão e Responsabilidade Civil", description: "Cobertura para danos ao próprio veículo, terceiros e passageiros transportados." },
      { title: "Carro Reserva Estendido", description: "Veículo substituto para você não ficar sem renda durante reparo do seu carro. Disponível em Guarulhos." },
      { title: "Assistência 24h Especializada", description: "Guincho, chaveiro, mecânico e socorro a qualquer hora — fundamental para quem trabalha de madrugada." },
      { title: "Acidentes Pessoais para o Motorista", description: "Indenização por morte ou invalidez do motorista em decorrência de acidente — proteção crítica para o autônomo." },
    ]}
    howItWorks={[
      { step: "1", title: "Conte sobre sua operação", description: "Informe veículo, apps em que trabalha (Uber, 99, iFood, etc.), horas/dia e CEP. Atendimento por WhatsApp ou Cidade Maia." },
      { step: "2", title: "Cotação especializada", description: "Cotamos só com seguradoras que aceitam app: Allianz, Porto Seguro, HDI, Tokio Marine e outras." },
      { step: "3", title: "Comparativo em até 2h", description: "Receba propostas com preço, cobertura, franquia e assistência 24h lado a lado." },
      { step: "4", title: "Contratação simples", description: "Documentação mínima e ativação rápida. Pagamento parcelado em até 12x." },
      { step: "5", title: "Apoio em sinistro", description: "Em caso de acidente em corrida ou entrega, a Patro garante a documentação correta para evitar negativas." },
    ]}
    pricingInfo={{
      intro: "O seguro para motorista de aplicativo em Guarulhos custa em média R$ 2.800 a R$ 5.500/ano para carro e R$ 1.200 a R$ 2.400/ano para moto, com cláusula expressa de uso para app. O acréscimo é de 15-30% sobre seguro convencional, mas garante proteção real e jurídica.",
      factors: [
        "Tipo de veículo (carro, moto, scooter elétrica, cargo bike)",
        "Apps em que opera (passageiro tem perfil diferente de delivery)",
        "CEP de pernoite — Cidade Maia é mais barato que Cumbica e Pimentas",
        "Horas trabalhadas por dia e período (madrugada eleva risco)",
        "Idade, tempo de CNH e histórico de sinistros",
        "Equipamentos de proteção: rastreador, dashcam, alarme",
      ],
      note: "Dica Patro: Motoristas de app com mais de 30 anos, sem sinistros recentes e com rastreador podem economizar até 25% no seguro em Guarulhos.",
    }}
    realScenarios={[
      { title: "Case: Entregador iFood protegido após acidente em moto", description: "Motoboy de 27 anos sofreu queda em entrega no Cidade Maia. A apólice contratada via Patro cobriu R$ 14.000 em reparos da moto, R$ 8.000 em despesas médicas e ainda pagou diárias por afastamento. Em 18 dias estava de volta às entregas." },
      { title: "Case: Motorista Uber teve carro roubado em Cumbica", description: "Cliente de 42 anos teve seu Onix roubado em ponto de espera em Cumbica. Como o seguro tinha cláusula para app, recebeu R$ 65.000 (100% FIPE) em 22 dias, comprou outro carro e voltou a trabalhar em menos de 30 dias." },
      { title: "Case: Frotista de Guarulhos protegeu 12 carros para motoristas Uber", description: "Empresário do Cidade Maia que aluga 12 veículos para motoristas Uber estruturou apólice frota via Patro, com cobertura por motorista cadastrado e franquia reduzida. Economia de 22% em relação a 12 apólices individuais e gestão centralizada de sinistros." },
    ]}
    coverageExclusions={[
      "Condução sob efeito de álcool ou substâncias",
      "Motorista sem cadastro ativo na plataforma de app",
      "Uso para transporte de cargas ilegais ou não autorizadas",
      "Falsidade nas declarações sobre uso profissional",
      "Corridas, rachas ou competições não autorizadas",
    ]}
    tips={[
      "Sempre declare uso para app na contratação — omissão anula a apólice em sinistro.",
      "Mantenha prints e registros de corridas/entregas — facilitam comprovação no sinistro.",
      "Instale rastreador e dashcam: descontos de até 15% e proteção extra em colisões.",
      "Compare anualmente: novas seguradoras entram no mercado de app a cada ano.",
      "Para motoboys de delivery: cobertura de acidentes pessoais é fundamental.",
    ]}
    whoNeeds={[
      "Motoristas Uber, 99 e InDriver em Guarulhos",
      "Entregadores iFood, Rappi e Loggi (moto, bike ou carro)",
      "Motoristas que atendem GRU Airport e terminais rodoviários",
      "Motoboys autônomos que prestam serviço para múltiplos apps",
      "Proprietários de frota que alugam veículos para motoristas de app",
      "Quem trabalha em apps em horários noturnos e de madrugada",
    ]}
    whyPatro={[
      "Especialistas em seguros para motoristas de app em Guarulhos desde 2020",
      "Mais de 200 motoristas de aplicativo já protegidos na região",
      "Apólices só com seguradoras que aceitam uso para app — sem brechas",
      "Atendimento presencial no Cidade Maia e WhatsApp 24h",
      "Comparação Porto, Tokio, Allianz, HDI em até 2 horas",
      "Apoio técnico em sinistros para evitar negativas indevidas",
    ]}
    faqs={[
      { question: "Seguro tradicional cobre motorista de aplicativo em Guarulhos?", answer: "Geralmente não. Apólices comuns excluem uso remunerado e podem negar sinistro durante corridas ou entregas. É essencial contratar seguro com cláusula expressa para uso em aplicativo (Uber, 99, iFood, Rappi)." },
      { question: "Quanto custa seguro para motorista de app em Guarulhos?", answer: "Para carro, em média R$ 2.800 a R$ 5.500/ano. Para moto (entregadores), R$ 1.200 a R$ 2.400/ano. O acréscimo sobre seguro convencional é de 15-30%, mas garante cobertura real durante a operação." },
      { question: "Quais apps são cobertos pela apólice da Patro?", answer: "Trabalhamos com apólices que cobrem Uber, 99, InDriver, iFood, Rappi, Loggi e demais plataformas reconhecidas. Sempre confirmamos a lista exata com a seguradora antes da contratação." },
      { question: "Posso usar o carro para Uber e iFood com a mesma apólice?", answer: "Sim, contanto que ambas as atividades sejam declaradas na contratação. Algumas seguradoras tratam transporte de passageiros e delivery em categorias diferentes, e a Patro orienta a melhor estruturação." },
      { question: "Seguro para motorista de app cobre passageiros em Guarulhos?", answer: "Sim, a cobertura de Acidentes Pessoais Passageiros (APP) e Responsabilidade Civil pode ser contratada para indenizar passageiros em caso de acidente. Algumas plataformas exigem essa cobertura mínima." },
    ]}
    relatedInsurances={[
      { title: "Seguro Uber Guarulhos", link: "/seguro-uber-guarulhos" },
      { title: "Seguro Auto Guarulhos", link: "/seguro-auto-guarulhos" },
      { title: "Seguro Moto Guarulhos", link: "/seguro-moto-guarulhos" },
      { title: "Seguro Frota Empresas Guarulhos", link: "/seguro-frota-empresas-guarulhos" },
      { title: "Seguro Acidentes Pessoais", link: "/seguro-acidentes-pessoais" },
      { title: "Corretora Seguros Guarulhos", link: "/corretora-seguros-guarulhos" },
    ]}
  />
);

export default SeoSeguroMotoristaAppGuarulhos;