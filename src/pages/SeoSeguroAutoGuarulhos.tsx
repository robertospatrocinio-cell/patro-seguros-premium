import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import PrerenderText from "@/components/PrerenderText";
import NeighborhoodHub, { type NeighborhoodLink } from "@/components/NeighborhoodHub";
import ModelHub, { type ModelLink } from "@/components/ModelHub";
import StickyQuoteBar from "@/components/StickyQuoteBar";
import heroImg from "@/assets/hero-seguro-auto.webp";
import heroMobileImg from "@/assets/hero-seguro-auto.webp"; // Using desktop image as fallback since home-sm is missing

const NEIGHBORHOODS: NeighborhoodLink[] = [
  { name: "Cidade Maia", link: "/seguro-auto-maia-guarulhos", riskLevel: "baixo", priceRange: "R$ 2.100 a R$ 4.000/ano" },
  { name: "Vila Galvão", link: "/seguro-auto-vila-galvao", riskLevel: "baixo", priceRange: "R$ 2.300 a R$ 4.200/ano" },
  { name: "Vila Augusta", link: "/seguro-auto-vila-augusta", riskLevel: "baixo", priceRange: "R$ 2.200 a R$ 4.100/ano" },
  { name: "Jardim São João", link: "/seguro-auto-jardim-sao-joao", riskLevel: "médio", priceRange: "R$ 2.600 a R$ 4.900/ano" },
  { name: "Taboão", link: "/seguro-auto-taboao-guarulhos", riskLevel: "médio", priceRange: "R$ 2.700 a R$ 5.000/ano" },
  { name: "Bonsucesso", link: "/seguro-auto-bonsucesso-guarulhos", riskLevel: "médio", priceRange: "R$ 2.700 a R$ 5.100/ano" },
  { name: "Centro de Guarulhos", link: "/seguro-auto-centro-guarulhos", riskLevel: "médio-alto", priceRange: "R$ 2.900 a R$ 5.500/ano" },
  { name: "Cumbica", link: "/seguro-auto-cumbica", riskLevel: "médio-alto", priceRange: "R$ 3.100 a R$ 6.200/ano" },
  { name: "Pimentas", link: "/seguro-auto-pimentas", riskLevel: "alto", priceRange: "R$ 3.400 a R$ 6.800/ano" },
];

const MODELS: ModelLink[] = [
  { name: "Toyota Corolla", link: "/seguro-corolla-guarulhos", category: "Sedã médio", priceRange: "R$ 2.800 a R$ 4.800/ano" },
  { name: "Honda Civic", link: "/seguro-civic-guarulhos", category: "Sedã médio", priceRange: "R$ 3.000 a R$ 5.200/ano" },
  { name: "Toyota Hilux", link: "/seguro-hilux-guarulhos", category: "Picape grande", priceRange: "R$ 3.500 a R$ 6.500/ano" },
  { name: "Hyundai HB20", link: "/seguro-hb20-guarulhos", category: "Hatch popular", priceRange: "R$ 1.900 a R$ 3.600/ano" },
  { name: "Chevrolet Onix", link: "/seguro-onix-guarulhos", category: "Hatch popular", priceRange: "R$ 1.900 a R$ 3.700/ano" },
  { name: "Fiat Mobi", link: "/seguro-mobi-guarulhos", category: "Hatch entrada", priceRange: "R$ 1.700 a R$ 3.200/ano" },
  { name: "Fiat Strada", link: "/seguro-strada-guarulhos", category: "Picape leve", priceRange: "R$ 2.300 a R$ 4.300/ano" },
  { name: "VW T-Cross", link: "/seguro-tcross-guarulhos", category: "SUV compacto", priceRange: "R$ 2.700 a R$ 4.900/ano" },
  { name: "Jeep Compass", link: "/seguro-compass-guarulhos", category: "SUV médio", priceRange: "R$ 3.000 a R$ 5.400/ano" },
  { name: "Jeep Renegade", link: "/seguro-renegade-guarulhos", category: "SUV compacto", priceRange: "R$ 2.700 a R$ 4.900/ano" },
];

const SeoSeguroAutoGuarulhos = () => (
  <>
    <PrerenderText slug="seguro-auto-guarulhos" />
    <InsurancePageTemplate
    heroImage={heroImg}
    mobileHeroImage={heroMobileImg}
    title="Seguro Auto em Guarulhos | Cotação em 2h | Patro Seguros"
    subtitle="Seguro Auto em Guarulhos — Cotação Online Grátis"
    description="Seguro auto em Guarulhos: compare as 16 melhores seguradoras e economize. Resposta em até 2h e atendimento especializado na Patro Seguros."
    detailedDescription={`Guarulhos é a segunda maior cidade do estado de São Paulo, com mais de 1,4 milhão de habitantes e uma frota estimada em 650 mil veículos. A cidade é cortada por rodovias de alto fluxo como a Presidente Dutra (BR-116), Fernão Dias (BR-381) e Ayrton Senna, o que eleva significativamente o risco de acidentes e sinistros.

Segundo dados do ISP (Índice de Sinistralidade por Praça), Guarulhos está entre as 10 cidades com maior índice de roubo e furto de veículos do Brasil. Bairros como Cumbica, Bonsucesso e Pimentas apresentam taxas de sinistralidade até 40% superiores à média estadual, enquanto regiões como Cidade Maia e Vila Augusta possuem índices mais favoráveis.

A Patro Seguros conhece profundamente a realidade local. Nossa equipe de consultores analisa o perfil de cada cliente — idade, CEP, modelo do veículo, quilometragem e uso — para encontrar a seguradora que oferece a melhor relação custo-benefício. Em muitos casos, conseguimos economias de 15% a 35% em relação à cotação direta.

Nossa experiência inclui atendimento a motoristas de aplicativo (Uber, 99, iFood), que representam uma parcela significativa da frota de Guarulhos. Para esse público, oferecemos coberturas específicas que incluem proteção durante o uso profissional do veículo, algo que muitas apólices convencionais não cobrem.`}
    icon="🚗"
    metaDescription="Seguro auto Guarulhos: cotação Porto Seguro Guarulhos, Tokio, Allianz, HDI. Encontre o melhor seguro carro Guarulhos com a Patro Seguros. Cotação grátis."
    coverages={[
      { title: "Cobertura Compreensiva", description: "Proteção contra roubo, furto, colisão, incêndio e fenômenos naturais. Ideal para veículos novos e seminovos que circulam por Guarulhos." },
      { title: "Responsabilidade Civil", description: "Cobertura para danos materiais e corporais causados a terceiros em acidentes. Essencial nas rodovias Dutra e Fernão Dias." },
      { title: "Assistência 24h em Guarulhos", description: "Guincho, chaveiro, troca de pneu e socorro mecânico com prestadores locais em Guarulhos e região." },
      { title: "Carro Reserva", description: "Veículo substituto por até 30 dias enquanto o seu está no conserto. Disponível em Guarulhos e Grande SP." },
      { title: "Proteção para Vidros e Faróis", description: "Cobertura para para-brisa, vidros laterais, retrovisores e faróis — sem impacto na bonificação." },
      { title: "Cobertura para Acessórios", description: "Proteção para equipamentos de som, rodas esportivas, insulfilm e outros acessórios instalados." },
    ]}
    howItWorks={[
      { step: "1", title: "Solicite sua cotação", description: "Preencha o formulário abaixo ou envie os dados do veículo e CNH pelo WhatsApp. Processo simples e rápido." },
      { step: "2", title: "Comparação entre seguradoras", description: "Nossa equipe consulta Porto Seguro, Tokio Marine, Allianz, HDI e mais para encontrar as melhores condições para seu perfil em Guarulhos." },
      { step: "3", title: "Receba as propostas", description: "Em até 2 horas, você recebe um comparativo detalhado com preços, coberturas e condições de cada seguradora." },
      { step: "4", title: "Escolha e contrate", description: "Selecione a melhor opção. Cuidamos de toda a documentação e ativação da apólice sem burocracia." },
      { step: "5", title: "Suporte contínuo", description: "Em caso de sinistro, a Patro acompanha todo o processo: abertura, vistoria, oficina e indenização em Guarulhos." },
    ]}
    pricingInfo={{
      intro: "O preço do seguro auto em Guarulhos varia significativamente conforme o perfil do motorista, modelo do veículo e localização. Em média, motoristas de Guarulhos pagam entre R$ 1.800 e R$ 4.500/ano para cobertura compreensiva. A Patro já conseguiu economias de até 35% para clientes da região comparando múltiplas seguradoras.",
      factors: [
        "CEP de pernoite — bairros como Cidade Maia têm taxas mais baixas que Cumbica",
        "Modelo, ano e valor FIPE do veículo",
        "Idade e tempo de habilitação do condutor principal",
        "Histórico de sinistros e classe de bônus",
        "Quilometragem média mensal e uso (particular ou aplicativo)",
        "Dispositivos de segurança: rastreador, câmera, garagem fechada",
      ],
      note: "Dica Patro: Motoristas acima de 30 anos, sem sinistros nos últimos 3 anos e com garagem fechada podem economizar até 40% no seguro auto em Guarulhos.",
    }}
    realScenarios={[
      { title: "Case: Motorista do Cidade Maia economizou R$ 1.200", description: "Um cliente de 35 anos, com Honda Civic 2022, pagava R$ 4.200/ano na renovação direta com a seguradora. A Patro comparou 6 seguradoras e encontrou cobertura equivalente por R$ 3.000 na Tokio Marine, uma economia de 28%. O cliente ainda ganhou carro reserva por 30 dias, que não tinha na apólice anterior." },
      { title: "Case: Roubo na Dutra com resolução em 15 dias", description: "Um cliente teve seu Toyota Corolla roubado na rodovia Presidente Dutra, próximo ao trevo de Guarulhos. A Patro abriu o sinistro no mesmo dia, acompanhou toda a documentação junto à Porto Seguro e o cliente recebeu a indenização integral (100% FIPE) em apenas 15 dias — metade do prazo médio do mercado." },
      { title: "Case: Motorista de App com cobertura adequada", description: "Um motorista de Uber em Guarulhos descobriu que seu seguro convencional não cobria sinistros durante corridas. A Patro encontrou uma apólice na Allianz com cobertura para uso profissional, por apenas R$ 800 a mais por ano — evitando um prejuízo potencial de dezenas de milhares de reais." },
    ]}
    coverageExclusions={[
      "Condução sob efeito de álcool ou drogas",
      "Corridas, competições ou provas de velocidade",
      "Motorista sem habilitação válida",
      "Desgaste natural de peças mecânicas",
      "Uso do veículo para fins não declarados na apólice",
    ]}
    tips={[
      "Compare sempre: nunca renove automaticamente. A Patro compara todas as seguradoras gratuitamente.",
      "Instale rastreador: redução média de 10-15% no prêmio em Guarulhos.",
      "Garagem fechada: estacionar em local coberto pode reduzir o valor em até 20%.",
      "Classe de bônus: cada ano sem sinistro garante desconto progressivo de até 35%.",
      "Franquia elevada: se você é motorista experiente, optar por franquia maior reduz o prêmio mensal.",
    ]}
    whoNeeds={[
      "Moradores de Guarulhos e região metropolitana de São Paulo",
      "Motoristas que circulam diariamente pela Dutra e Fernão Dias",
      "Proprietários de veículos novos, seminovos e financiados",
      "Motoristas de aplicativo (Uber, 99, iFood) em Guarulhos",
      "Empresários com veículos de uso misto (pessoal e profissional)",
      "Famílias com mais de um veículo buscando desconto por agrupamento",
    ]}
    whyPatro={[
      "Corretora local em Guarulhos com atendimento presencial no Cidade Maia",
      "Mais de 500 clientes atendidos desde 2020 — nota 4.7 no Google",
      "Comparação entre 8+ seguradoras: Porto, Tokio, Allianz, HDI, Mapfre e mais",
      "Cotação em até 2 horas — as mais rápidas da região",
      "Suporte completo em sinistros: abertura, vistoria, oficina e indenização",
      "Especialistas em seguros para motoristas de aplicativo em Guarulhos",
    ]}
    faqs={[
      { question: "Quanto custa seguro auto em Guarulhos em 2026?", answer: "O valor médio do seguro auto Guarulhos varia entre R$ 1.800 e R$ 4.500/ano para cobertura compreensiva, dependendo do veículo, perfil do motorista e CEP. Bairros como Cidade Maia e Vila Augusta tendem a ter preços mais baixos que Cumbica e Pimentas. Solicite cotação gratuita para seu perfil específico." },
      { question: "Qual o melhor seguro carro Guarulhos?", answer: "Depende do perfil. Porto Seguro lidera em assistência 24h e rede de oficinas em Guarulhos. Tokio Marine oferece excelente custo-benefício. Allianz tem boas condições para veículos importados. HDI é competitiva para motoristas jovens. A Patro compara todas para encontrar a melhor seguradora de carro em Guarulhos para você." },
      { question: "Como fazer cotação Porto Seguro Guarulhos?", answer: "A Patro Seguros é corretora Porto Seguro Guarulhos credenciada e faz a cotação Porto Seguro Guarulhos gratuitamente. Envie modelo, ano, CEP e perfil pelo WhatsApp (11) 5199-7500 e receba a proposta em até 2 horas, com comparativo entre Porto Seguro e outras seguradoras." },
      { question: "Seguro auto cobre motorista de aplicativo em Guarulhos?", answer: "Nem sempre. O seguro convencional pode negar sinistros durante corridas. A Patro trabalha com seguradoras que oferecem cobertura específica para Uber, 99 e iFood, protegendo você durante o uso profissional." },
      { question: "Como funciona o sinistro de seguro auto em Guarulhos?", answer: "A Patro acompanha todo o processo: abertura do sinistro, agendamento de vistoria, escolha da oficina (referenciada ou livre) e acompanhamento até a liberação do veículo ou pagamento da indenização. Nosso prazo médio é 40% menor que a média do mercado." },
      { question: "Seguro auto em Guarulhos cobre enchente?", answer: "Sim, a cobertura compreensiva inclui alagamento e enchente, eventos comuns em regiões baixas de Guarulhos durante o verão. Verifique se sua apólice inclui essa proteção, especialmente se você mora próximo a áreas de risco." },
    ]}
    relatedInsurances={[
      { title: "Seguro Moto Guarulhos", link: "/seguro-moto-guarulhos" },
      { title: "Seguro Residencial Guarulhos", link: "/seguro-residencial-guarulhos" },
      { title: "Seguro Frota Guarulhos", link: "/seguro-frota-empresas-guarulhos" },
      { title: "Seguros PME Guarulhos", link: "/seguros-empresariais-pme-guarulhos" },
      { title: "Seguro Vida e Saúde Guarulhos", link: "/seguro-vida-saude-guarulhos" },
      { title: "Corretora Seguros Guarulhos", link: "/" },
      { title: "Seguro Auto por Modelo (Corolla, HB20, Onix...)", link: "/seguro-auto-por-modelo-guarulhos" },
    ]}
    extraSections={
      <>
        <NeighborhoodHub
          source="seguro-auto-guarulhos:hub-bairros"
          neighborhoods={NEIGHBORHOODS}
        />
        <ModelHub
          source="seguro-auto-guarulhos:hub-modelos"
          models={MODELS}
        />
      </>
    }
    />
    <StickyQuoteBar
      source="seguro-auto-guarulhos"
      quoteHref="/cotacao?tipo=auto"
      whatsappMessage="Olá! Vim pela página Seguro Auto Guarulhos e gostaria de falar com um especialista sobre meu seguro."
      ctaLabel="Cotação rápida"
    />
  </>
);

export default SeoSeguroAutoGuarulhos;
