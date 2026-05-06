import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-seguro-motorista-app.webp";

const SeoSeguroUberGuarulhos = () => (
  <InsurancePageTemplate
    heroImage={heroImg}
    title="Seguro para Uber Guarulhos — Cobertura Real para Motoristas"
    subtitle="Seguro para uber Guarulhos com cláusula expressa de uso por aplicativo. Cotação Porto Seguro Guarulhos, Allianz e HDI para motoristas Uber."
    description="Seguro Uber em Guarulhos com cobertura específica para uso profissional do veículo. A Patro Seguros é referência local em apólices para motoristas de aplicativo, com atendimento presencial no Cidade Maia e mais de 200 motoristas de app já protegidos. Comparamos Porto Seguro, Allianz, HDI, Tokio Marine e outras seguradoras que aceitam motoristas Uber sem aumentar abusivamente o prêmio."
    detailedDescription={`Guarulhos concentra uma das maiores frotas de motoristas Uber da Grande São Paulo, com forte demanda gerada pelo Aeroporto Internacional de Guarulhos (GRU Airport), terminais rodoviários e o intenso fluxo entre a cidade e a capital. Estimativas indicam mais de 8 mil motoristas ativos em Uber, 99 e InDriver na região.

O grande problema é que muitos seguros tradicionais não cobrem sinistros ocorridos durante corridas remuneradas. Em caso de acidente comprovadamente em viagem por aplicativo, a seguradora pode negar a indenização — deixando o motorista com prejuízo de dezenas de milhares de reais e ainda sem o veículo, que é sua ferramenta de trabalho.

A Patro Seguros trabalha apenas com seguradoras que aceitam expressamente o uso do veículo para Uber, 99 e demais aplicativos, com cláusula contratual clara. Isso garante segurança jurídica em caso de sinistro: roubo, furto, colisão, terceiros e assistência 24h continuam valendo mesmo que o evento aconteça enquanto você está com passageiro.

Atendemos motoristas de Guarulhos com perfil completo: quem dirige por Uber em tempo integral (8-12h por dia), quem complementa renda em horários alternativos e proprietários de frota que alugam veículos para motoristas de app na região do Cidade Maia, Vila Augusta, Cumbica e Pimentas.`}
    icon="🚕"
    metaDescription="Seguro para uber Guarulhos: cobertura real durante corridas. Cotação Porto Seguro Guarulhos, Allianz e HDI para Uber, 99 e InDriver. Patro Seguros."
    coverages={[
      { title: "Cobertura Durante Corridas", description: "Proteção válida mesmo durante viagens remuneradas por Uber, 99 e demais aplicativos — cláusula contratual expressa." },
      { title: "Roubo e Furto", description: "Indenização integral em caso de roubo ou furto do veículo, inclusive em pontos de alta sinistralidade como Cumbica e proximidades do aeroporto." },
      { title: "Colisão e Terceiros", description: "Cobertura para danos materiais ao seu carro e responsabilidade civil contra terceiros, incluindo passageiros." },
      { title: "Assistência 24h Especializada", description: "Guincho, chaveiro e socorro mecânico em qualquer horário — fundamental para quem trabalha à noite e madrugada." },
      { title: "Carro Reserva Estendido", description: "Veículo substituto para você não ficar sem renda enquanto seu carro está em conserto. Disponível em Guarulhos." },
      { title: "APP — Acidentes Pessoais Passageiros", description: "Indenização para passageiros em caso de acidente — proteção exigida em algumas modalidades de aplicativo." },
    ]}
    howItWorks={[
      { step: "1", title: "Solicite cotação especializada", description: "Informe modelo, ano, CEP e que utiliza o carro para Uber/99. Atendimento via WhatsApp ou presencial no Cidade Maia." },
      { step: "2", title: "Comparação entre seguradoras compatíveis", description: "Cotamos apenas com seguradoras que aceitam uso para aplicativo: Allianz, HDI, Porto Seguro, Tokio Marine e outras." },
      { step: "3", title: "Receba propostas em até 2h", description: "Comparativo claro com preço, franquia, cobertura para corridas e assistência 24h." },
      { step: "4", title: "Contrate sem burocracia", description: "Documentação simples e ativação rápida. Cuidamos de toda a apólice." },
      { step: "5", title: "Suporte em sinistro", description: "Em caso de acidente em corrida, a Patro orienta passo a passo para garantir indenização sem negativa." },
    ]}
    pricingInfo={{
      intro: "O seguro Uber em Guarulhos custa em média R$ 2.800 a R$ 5.500/ano para cobertura compreensiva com cláusula de uso por aplicativo. O acréscimo em relação ao seguro convencional fica entre 15% e 30%, mas garante proteção real em caso de sinistro durante corridas.",
      factors: [
        "Modelo, ano e valor FIPE do veículo (Onix, HB20, Cobalt, Yaris são os mais comuns)",
        "CEP de pernoite — Cidade Maia tem taxa menor que Cumbica e Pimentas",
        "Idade e tempo de habilitação do motorista (mínimo geralmente 21 anos e 2 anos de CNH)",
        "Quilometragem mensal estimada (motoristas full-time rodam 5.000-8.000 km/mês)",
        "Histórico de sinistros e classe de bônus do motorista",
        "Dispositivos de segurança: rastreador antifurto e câmera dashboard reduzem o prêmio",
      ],
      note: "Dica Patro: Motoristas Uber com mais de 30 anos, sem sinistros nos últimos 2 anos e com rastreador instalado podem economizar até 25% no seguro em Guarulhos.",
    }}
    realScenarios={[
      { title: "Case: Motorista Uber em Cumbica protegido contra roubo", description: "Cliente de 38 anos teve seu HB20 roubado em Cumbica enquanto aguardava corrida. Como o seguro contratado pela Patro tinha cláusula expressa de uso por aplicativo, a Allianz pagou indenização integral (100% FIPE) em 18 dias, e o motorista voltou a trabalhar com carro novo em menos de 30 dias." },
      { title: "Case: Acidente em corrida Uber no GRU Airport", description: "Motorista colidiu com outro veículo enquanto levava passageiro ao aeroporto. Seguro convencional teria negado. A apólice contratada via Patro cobriu os danos ao próprio carro, ao terceiro e ainda forneceu carro reserva por 22 dias." },
      { title: "Case: Economia de R$ 1.100/ano migrando seguradora", description: "Motorista do Cidade Maia pagava R$ 4.700/ano em seguro convencional sem cobertura para app. A Patro encontrou apólice na Tokio Marine com cláusula para Uber por R$ 3.600/ano — mais barato e com cobertura adequada." },
    ]}
    coverageExclusions={[
      "Condução sob efeito de álcool ou drogas",
      "Motorista sem cadastro ativo na plataforma de aplicativo",
      "Uso para transporte de cargas não autorizadas",
      "Corridas, rachas ou competições",
      "Falsidade nas declarações sobre uso profissional do veículo",
    ]}
    tips={[
      "Sempre declare o uso para Uber/99 na contratação — omitir essa informação anula a apólice.",
      "Instale rastreador: redução de até 15% no prêmio para motoristas de app em Guarulhos.",
      "Mantenha registro das corridas (prints do app) — facilita comprovação em caso de sinistro.",
      "Compare anualmente: o mercado de seguros para Uber muda rápido, novas opções surgem todo ano.",
      "Avalie cobertura APP: indenização para passageiros pode ser exigida em algumas modalidades.",
    ]}
    whoNeeds={[
      "Motoristas Uber e 99 em Guarulhos (full-time ou parcial)",
      "Motoristas que atendem o aeroporto GRU e terminais rodoviários",
      "Proprietários de frota que alugam veículos para motoristas de app",
      "Motoristas que circulam pela Dutra, Fernão Dias e Ayrton Senna",
      "Quem usa o veículo para apps de delivery (iFood, Rappi) além de transporte",
      "Motoristas que querem proteção real contra negativa de seguradora em sinistro",
    ]}
    whyPatro={[
      "Especialistas em seguros para motoristas Uber em Guarulhos desde 2020",
      "Mais de 200 motoristas de app já protegidos na região",
      "Trabalhamos só com seguradoras que aceitam uso por aplicativo",
      "Atendimento presencial no Cidade Maia e suporte por WhatsApp",
      "Cotação em até 2 horas com comparação entre Porto, Tokio, Allianz e HDI",
      "Suporte em sinistro com argumentação técnica para evitar negativas",
    ]}
    faqs={[
      { question: "Seguro comum cobre acidente em corrida Uber em Guarulhos?", answer: "Geralmente não. Apólices convencionais excluem o uso remunerado do veículo. Em caso de sinistro durante corrida Uber ou 99, a seguradora pode negar a indenização. Por isso é fundamental contratar seguro com cláusula expressa para uso em aplicativo." },
      { question: "Quanto custa seguro Uber em Guarulhos?", answer: "O seguro Uber em Guarulhos custa em média R$ 2.800 a R$ 5.500/ano, dependendo do veículo, idade do motorista e CEP. O acréscimo em relação ao seguro convencional é de 15% a 30%, mas garante cobertura real durante corridas." },
      { question: "Quais seguradoras aceitam motorista Uber em Guarulhos?", answer: "Porto Seguro, Allianz, HDI e Tokio Marine oferecem apólices específicas para motoristas de app em Guarulhos. A Patro compara todas essas seguradoras para encontrar o melhor preço com cobertura adequada." },
      { question: "Preciso avisar a seguradora que dirijo para Uber?", answer: "Sim, obrigatoriamente. Omitir o uso profissional do veículo na contratação configura má-fé e dá à seguradora o direito de cancelar a apólice e negar qualquer indenização, mesmo em sinistros não relacionados às corridas." },
      { question: "Seguro para Uber cobre roubo no aeroporto de Guarulhos?", answer: "Sim. A cobertura de roubo e furto é válida em qualquer local de Guarulhos, incluindo proximidades do GRU Airport, desde que respeitadas as condições da apólice (rastreador ativo, por exemplo)." },
    ]}
    relatedInsurances={[
      { title: "Seguro para Motorista de App Guarulhos", link: "/seguro-para-motorista-app-guarulhos" },
      { title: "Seguro Auto Guarulhos", link: "/seguro-auto-guarulhos" },
      { title: "Seguro Moto Guarulhos", link: "/seguro-moto-guarulhos" },
      { title: "Seguro Frota Guarulhos", link: "/seguro-frota-empresas-guarulhos" },
      { title: "Seguro Vida Guarulhos", link: "/seguro-vida-guarulhos" },
      { title: "Corretora Seguros Guarulhos", link: "/corretora-seguros-guarulhos" },
    ]}
  />
);

export default SeoSeguroUberGuarulhos;