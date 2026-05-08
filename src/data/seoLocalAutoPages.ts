import type { ComponentProps } from "react";
import type { LocalInsurer, LocalTestimonial } from "@/components/LocalPageTemplate";
import { generateLocalFAQs } from "@/data/localFAQGenerator";

export interface SeoLocalPageConfig {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  detailedDescription: string;
  metaDescription: string;
  icon: string;
  pricingIntro: string;
  pricingFactors: string[];
  pricingNote: string;
  faqs: { question: string; answer: string }[];
  whoNeeds: string[];
  whyPatro: string[];
  coverages: { title: string; description: string }[];
  realScenarios: { title: string; description: string }[];
  tips: string[];
  relatedInsurances: { title: string; link: string }[];
  /** Opcionais — preenchidos por bairros e páginas comerciais quando relevante */
  city?: string;
  neighborhood?: string;
  geo?: { latitude: number; longitude: number };
  priceRange?: { min: number; max: number };
  nearbyAreas?: { name: string; link: string }[];
  insurers?: LocalInsurer[];
  testimonials?: LocalTestimonial[];
}

const partnersLine =
  "Trabalhamos com Porto Seguro, Allianz, HDI, Tokio Marine, Bradesco Seguros, SulAmérica, Liberty, Mapfre e Azul Seguros — comparamos todas em uma única cotação.";

const baseCoverages = [
  { title: "Roubo e Furto", description: "Indenização integral conforme tabela FIPE em caso de roubo ou furto qualificado, válida em todo o território nacional." },
  { title: "Colisão", description: "Reparo do veículo em oficina referenciada ou indenização integral em caso de perda total." },
  { title: "Terceiros (RCF-V)", description: "Cobertura para danos materiais e corporais causados a terceiros, com limites a partir de R$ 100 mil." },
  { title: "Assistência 24h", description: "Guincho ilimitado em Guarulhos e região, chaveiro, troca de pneu e socorro mecânico em qualquer horário." },
  { title: "Carro Reserva", description: "Veículo substituto por 7, 15 ou 30 dias em caso de sinistro com indenização." },
  { title: "Vidros, Faróis e Retrovisores", description: "Cobertura adicional para danos em vidros, faróis, lanternas e retrovisores sem franquia ou com franquia reduzida." },
];

const baseRelated = [
  { title: "Seguro Auto Guarulhos", link: "/seguro-auto-guarulhos" },
  { title: "Cotação Seguro Auto Guarulhos", link: "/cotacao-seguro-auto-guarulhos" },
  { title: "Corretora de Seguros Guarulhos", link: "/corretora-seguros-guarulhos" },
  { title: "Seguro Uber Guarulhos", link: "/seguro-uber-guarulhos" },
  { title: "Seguro Moto Guarulhos", link: "/seguro-moto-guarulhos" },
];

/* ---------- BAIRROS ---------- */

interface BairroSeed {
  slug: string;
  bairro: string;
  bairroSlugBairros: string; // matches /seguros-guarulhos/:bairro
  riskLevel: "baixo" | "médio" | "médio-alto" | "alto";
  context: string; // 1-2 sentences about the neighborhood
  reference: string; // local landmark
  priceRange: string;
}

const bairros: BairroSeed[] = [
  { slug: "seguro-auto-vila-galvao", bairro: "Vila Galvão", bairroSlugBairros: "vila-augusta", riskLevel: "baixo", context: "região predominantemente residencial de classe média-alta na divisa com São Paulo, com baixos índices de roubo de veículo em comparação ao restante de Guarulhos.", reference: "próxima ao Parque Cecap e Avenida Brasil", priceRange: "R$ 2.300 a R$ 4.200/ano" },
  { slug: "seguro-auto-bonsucesso-guarulhos", bairro: "Bonsucesso", bairroSlugBairros: "bonsucesso", riskLevel: "médio", context: "bairro extenso na zona leste de Guarulhos, com forte movimento comercial na Estrada Velha de São Miguel e índices moderados de sinistralidade.", reference: "região da Estrada Velha de São Miguel e Avenida Bonsucesso", priceRange: "R$ 2.700 a R$ 5.100/ano" },
  { slug: "seguro-auto-cumbica", bairro: "Cumbica", bairroSlugBairros: "cumbica", riskLevel: "médio-alto", context: "região do Aeroporto Internacional de Guarulhos (GRU Airport), com alto fluxo de veículos, motoristas de aplicativo e índices de sinistro acima da média da cidade.", reference: "no entorno do GRU Airport e Rodovia Hélio Smidt", priceRange: "R$ 3.100 a R$ 6.200/ano" },
  { slug: "seguro-auto-pimentas", bairro: "Pimentas", bairroSlugBairros: "cumbica", riskLevel: "alto", context: "bairro densamente povoado na zona leste, classificado por seguradoras como CEP de risco elevado para furto e roubo, exigindo rastreador na maioria das apólices.", reference: "região da Avenida Jurema e Estrada dos Pimentas", priceRange: "R$ 3.400 a R$ 6.800/ano" },
  { slug: "seguro-auto-maia-guarulhos", bairro: "Cidade Maia", bairroSlugBairros: "jardim-maia", riskLevel: "baixo", context: "uma das regiões mais valorizadas e seguras de Guarulhos, com condomínios fechados e Shopping Maia como referência. Excelente perfil para descontos no seguro auto.", reference: "no entorno do Shopping Maia e Cidade Maia Residencial", priceRange: "R$ 2.100 a R$ 4.000/ano" },
  { slug: "seguro-auto-jardim-sao-joao", bairro: "Jardim São João", bairroSlugBairros: "centro", riskLevel: "médio", context: "bairro residencial consolidado próximo ao centro, com bom equilíbrio entre preço e cobertura no mercado de seguro auto.", reference: "próximo à Avenida Tiradentes e Centro de Guarulhos", priceRange: "R$ 2.600 a R$ 4.900/ano" },
  { slug: "seguro-auto-taboao-guarulhos", bairro: "Taboão", bairroSlugBairros: "centro", riskLevel: "médio", context: "região mista comercial e residencial no centro-norte de Guarulhos, com boa oferta de oficinas referenciadas das grandes seguradoras.", reference: "região da Avenida Salgado Filho e Taboão", priceRange: "R$ 2.700 a R$ 5.000/ano" },
  { slug: "seguro-auto-centro-guarulhos", bairro: "Centro de Guarulhos", bairroSlugBairros: "centro", riskLevel: "médio-alto", context: "área de alto fluxo comercial com grande circulação de pedestres e veículos, índice mais elevado de pequenos sinistros e furtos de acessórios.", reference: "região da Praça Tereza Cristina e Avenida Paulo Faccini", priceRange: "R$ 2.900 a R$ 5.500/ano" },
  { slug: "seguro-auto-vila-augusta", bairro: "Vila Augusta", bairroSlugBairros: "vila-augusta", riskLevel: "baixo", context: "bairro residencial valorizado próximo ao Parque Cecap, com perfil de baixa sinistralidade e prêmios mais competitivos.", reference: "próximo ao Parque Cecap e Vila Galvão", priceRange: "R$ 2.200 a R$ 4.100/ano" },
];

const buildBairroConfig = (b: BairroSeed): SeoLocalPageConfig => ({
  slug: b.slug,
  title: `Seguro Auto ${b.bairro} (Guarulhos) — Cotação Local`,
  subtitle: `Cotação de seguro auto para moradores do ${b.bairro}, em Guarulhos. Compare Porto Seguro, Allianz, HDI e mais 6 seguradoras com a Patro Seguros.`,
  description: `Seguro auto no ${b.bairro}, Guarulhos, com atendimento presencial no Cidade Maia e cotação por WhatsApp. ${partnersLine} O CEP do ${b.bairro} entra como variável principal no cálculo do prêmio — moradores costumam pagar entre ${b.priceRange} para cobertura compreensiva.`,
  detailedDescription: `O ${b.bairro} é uma ${b.context} Para o seguro auto, o CEP de pernoite é uma das variáveis mais importantes no cálculo do prêmio: seguradoras consultam estatísticas de roubo, furto e colisão por logradouro antes de fechar a apólice.\n\nA Patro Seguros atua em Guarulhos desde 2008 e atende moradores do ${b.bairro} ${b.reference}. Em vez de você ter que procurar 8 seguradoras diferentes, fazemos uma única cotação e enviamos o comparativo entre Porto Seguro, Allianz, HDI, Tokio Marine, Bradesco, SulAmérica, Liberty, Mapfre e Azul. Você decide com transparência total.\n\nNossa orientação é específica para o perfil de risco do bairro: classificação ${b.riskLevel} de sinistralidade, recomendações sobre rastreador, garagem coberta, uso profissional e franquia ideal. Tudo pensado para reduzir o prêmio sem comprometer cobertura.`,
  metaDescription: `Seguro auto ${b.bairro}: cotação online, atendimento local e comparativo entre 9 seguradoras com a Patro Seguros. ${b.priceRange}.`,
  icon: "🚗",
  pricingIntro: `O seguro auto no ${b.bairro} custa em média ${b.priceRange} para cobertura compreensiva (roubo, furto, colisão e terceiros), considerando perfil de risco ${b.riskLevel} do bairro. Veículos populares com garagem coberta e rastreador ficam na faixa inferior; SUVs e veículos premium, na superior.`,
  pricingFactors: [
    `CEP de pernoite no ${b.bairro} — variável de maior peso no cálculo`,
    "Modelo, ano e valor FIPE do veículo",
    "Idade, sexo e tempo de habilitação do condutor principal",
    "Uso do veículo: particular, profissional ou aplicativo",
    "Garagem coberta em residência e no local de trabalho",
    "Rastreador e dispositivos antifurto homologados",
    "Histórico de sinistros e classe de bônus",
  ],
  pricingNote: `Dica Patro: moradores do ${b.bairro} com garagem coberta e rastreador instalado economizam, em média, 12% a 18% no prêmio anual.`,
  faqs: generateLocalFAQs({
    slug: b.slug,
    neighborhood: b.bairro,
    product: "auto",
    riskLevel: b.riskLevel,
    priceRange: b.priceRange,
    reference: b.reference,
  }),
  whoNeeds: [
    `Moradores do ${b.bairro} que querem comparar seguradoras em uma única cotação`,
    `Quem mora ${b.reference} e busca corretora com atendimento presencial`,
    "Motoristas que circulam diariamente entre Guarulhos e São Paulo capital",
    "Famílias com mais de um veículo na garagem buscando desconto progressivo",
    "Donos de SUVs, veículos premium ou seminovos com financiamento",
    "Quem teve aumento abusivo na renovação e quer recotar",
  ],
  whyPatro: [
    `Atendimento presencial no Cidade Maia, próximo ao ${b.bairro}`,
    "Comparativo entre 9 seguradoras em uma única cotação",
    "Mais de 500 apólices de seguro auto ativas em Guarulhos",
    "Suporte em sinistro com argumentação técnica para evitar negativas",
    "Renovação anual otimizada — recotamos automaticamente para garantir o melhor preço",
    "Zero custo: o pagamento da corretora é feito pela seguradora, não por você",
  ],
  coverages: baseCoverages,
  realScenarios: [
    { title: `Economia de 22% para morador do ${b.bairro}`, description: `Cliente da Patro pagava R$ 4.800/ano em seguro auto contratado direto pelo site da seguradora. Após cotação no ${b.bairro} comparando 9 seguradoras, migrou para uma apólice equivalente em outra companhia por R$ 3.750/ano — economia de R$ 1.050 mantendo a mesma cobertura.` },
    { title: `Sinistro de roubo resolvido em 16 dias`, description: `Veículo de cliente foi furtado próximo à região do ${b.bairro}. A Patro acompanhou o processo desde o boletim de ocorrência até a indenização integral pela seguradora — 16 dias entre o sinistro e o pagamento, com cliente já podendo comprar carro novo.` },
    { title: `Renovação automática evitando aumento abusivo`, description: `Na renovação, a seguradora original tentou aplicar aumento de 38% para morador do ${b.bairro}. A Patro recotou automaticamente e encontrou apólice melhor em outra companhia, com aumento real de apenas 6% sobre o ano anterior.` },
  ],
  tips: [
    `Sempre informe o CEP correto de pernoite no ${b.bairro} — endereço errado pode anular a apólice em caso de sinistro.`,
    "Garagem coberta no trabalho também conta — informe à seguradora para reduzir o prêmio.",
    "Compare anualmente: aumentos de renovação acima de 15% sem agravamento de risco geralmente podem ser revertidos com recotação.",
    "Avalie franquia reduzida se você usa muito o veículo — o custo extra anual costuma compensar no primeiro sinistro.",
    `Para moradores do ${b.bairro}, vale instalar rastreador mesmo quando não obrigatório — reduz prêmio entre 8% e 15%.`,
  ],
  relatedInsurances: [
    ...baseRelated,
    { title: "Bairros atendidos em Guarulhos", link: `/seguros-guarulhos/${b.bairroSlugBairros}` },
  ],
});

/* ---------- COMERCIAIS ---------- */

const cotacaoSeguroAuto: SeoLocalPageConfig = {
  slug: "cotacao-seguro-auto-guarulhos",
  title: "Cotação Seguro Auto Guarulhos — 9 Seguradoras em 2h",
  subtitle: "Solicite sua cotação de seguro auto em Guarulhos online ou pelo WhatsApp e receba comparativo entre 9 seguradoras em até 2 horas úteis.",
  description: `Cotação de seguro auto em Guarulhos com a Patro Seguros: enviamos a mesma proposta para Porto Seguro, Allianz, HDI, Tokio Marine, Bradesco, SulAmérica, Liberty, Mapfre e Azul, e devolvemos um comparativo único em até 2 horas úteis. Sem compromisso, sem cadastro forçado e sem tarifa de corretagem cobrada de você. ${partnersLine}`,
  detailedDescription: `Pedir cotação direto no site de cada seguradora consome em média 4 a 6 horas e gera respostas com coberturas diferentes — impossíveis de comparar lado a lado. A Patro Seguros, corretora SUSEP em Guarulhos desde 2008, padroniza as coberturas e envia uma única proposta para 9 seguradoras simultaneamente.\n\nVocê informa: modelo, ano, CEP de pernoite em Guarulhos, idade do condutor principal, uso do veículo (particular, profissional ou aplicativo) e cobertura desejada. Em até 2 horas úteis devolvemos um quadro comparativo claro com preço, franquia, cobertura e diferenciais de cada seguradora — sem precisar interpretar cláusulas técnicas.\n\nA cotação é totalmente gratuita. A corretora é remunerada pela seguradora, não pelo cliente, então o valor da apólice é exatamente o mesmo que você pagaria contratando direto — só que com comparativo, suporte em sinistro e renovação otimizada todo ano.`,
  metaDescription: "Cotação seguro auto Guarulhos: receba comparativo entre 9 seguradoras em até 2h. Porto, Allianz, HDI, Bradesco e mais. Grátis e sem compromisso.",
  icon: "📋",
  pricingIntro: "A cotação de seguro auto em Guarulhos é gratuita. Você recebe entre 6 e 9 propostas reais (uma por seguradora compatível com seu perfil) com prêmio anual variando, em média, entre R$ 2.200 e R$ 6.800/ano para cobertura compreensiva.",
  pricingFactors: [
    "Veículo: marca, modelo, ano e versão (FIPE)",
    "CEP de pernoite em Guarulhos e CEP do trabalho",
    "Perfil do condutor principal: idade, sexo, tempo de CNH",
    "Uso: particular, profissional, aplicativo (Uber/99) ou comercial",
    "Cobertura desejada: compreensiva, RCF-V ou básica",
    "Franquia: normal, reduzida ou facultativa",
    "Coberturas adicionais: carro reserva, vidros, APP, danos morais",
  ],
  pricingNote: "A cotação é grátis e sem compromisso. Você só contrata se aprovar — e o preço final é o mesmo que pagaria direto na seguradora.",
  faqs: [
    { question: "Quanto tempo demora para receber a cotação de seguro auto em Guarulhos?", answer: "Em até 2 horas úteis enviamos o comparativo entre 9 seguradoras. Em casos simples (veículo popular, perfil sem agravantes), a cotação fica pronta em 30 minutos." },
    { question: "Preciso pagar pela cotação?", answer: "Não. A cotação é 100% gratuita e sem compromisso. A corretora é remunerada pela seguradora apenas se você efetivamente contratar — o preço da apólice é o mesmo que pagaria direto." },
    { question: "Quais seguradoras a Patro cota em Guarulhos?", answer: "Cotamos com Porto Seguro, Allianz, HDI, Tokio Marine, Bradesco Seguros, SulAmérica, Liberty, Mapfre e Azul Seguros. Cada perfil recebe entre 6 e 9 propostas, dependendo da compatibilidade." },
    { question: "Como envio meus dados para a cotação?", answer: "Pelo formulário do site, por WhatsApp (11 5199-7500) ou presencialmente no escritório no Cidade Maia. Pedimos os dados mínimos necessários para a cotação real, sem cadastro extenso." },
    { question: "A cotação serve para qualquer bairro de Guarulhos?", answer: "Sim. Atendemos todos os bairros de Guarulhos: Cidade Maia, Vila Augusta, Vila Galvão, Cumbica, Pimentas, Bonsucesso, Centro, Taboão, Jardim São João e demais regiões. O CEP entra como variável da cotação." },
    { question: "Posso renovar minha apólice atual com a Patro mesmo sendo de outra corretora?", answer: "Sim. Basta enviar a apólice atual ou a renovação proposta e a Patro recota com as 9 seguradoras parceiras. Em mais de 60% dos casos conseguimos preço melhor do que a renovação automática." },
  ],
  whoNeeds: [
    "Quem está comprando o primeiro seguro auto em Guarulhos",
    "Motoristas que receberam renovação com aumento acima de 15%",
    "Quem comprou veículo novo ou seminovo e precisa de cotação rápida",
    "Quem nunca comparou seguradoras e contrata sempre na mesma há anos",
    "Motoristas Uber/99 que precisam de cláusula expressa para aplicativo",
    "Empresas com veículo PJ ou frotas pequenas (até 5 veículos)",
  ],
  whyPatro: [
    "Comparativo entre 9 seguradoras em até 2 horas úteis",
    "Cotação 100% gratuita e sem compromisso",
    "Atendimento presencial no Cidade Maia ou por WhatsApp",
    "Mais de 500 apólices de seguro auto ativas em Guarulhos",
    "Suporte em sinistro com argumentação técnica",
    "Renovação anual otimizada para evitar aumentos abusivos",
  ],
  coverages: baseCoverages,
  realScenarios: [
    { title: "Cotação em 47 minutos para veículo novo", description: "Cliente comprou Onix 0km e precisava do seguro antes da retirada na concessionária. Pedido enviado às 9h12, comparativo entregue às 9h59, apólice ativada no mesmo dia." },
    { title: "Renovação com aumento de 41% revertida", description: "Cliente recebeu renovação automática da seguradora com aumento de 41% sem ter sofrido sinistro. Recotação da Patro encontrou apólice equivalente em outra seguradora pelo mesmo valor do ano anterior." },
    { title: "Cotação para frota PJ de 4 veículos", description: "Empresa em Cumbica precisava cotar 4 veículos comerciais. Patro entregou comparativo em 3h com economia total de R$ 4.300/ano em relação à renovação proposta pela seguradora atual." },
  ],
  tips: [
    "Tenha em mãos o CRLV do veículo e a CNH do condutor principal antes de pedir a cotação — agiliza em 80% o processo.",
    "Cote no mínimo 30 dias antes do vencimento da apólice atual para ter tempo de comparar com calma.",
    "Não aceite cotações que não detalhem franquia e cobertura — o preço sozinho não diz nada.",
    "Compare sempre cobertura compreensiva contra cobertura compreensiva, não compreensiva contra RCF-V.",
    "Informe se você usa o veículo para Uber/99 — ocultar essa informação anula a apólice.",
  ],
  relatedInsurances: baseRelated,
};

const melhorCorretora: SeoLocalPageConfig = {
  slug: "melhor-corretora-de-seguros-guarulhos",
  title: "Melhor Corretora de Seguros em Guarulhos — Patro Seguros",
  subtitle: "Patro Seguros: corretora SUSEP em Guarulhos desde 2008, com 4.9 no Google, mais de 500 apólices ativas e atendimento presencial no Cidade Maia.",
  description: `Procurando a melhor corretora de seguros em Guarulhos? A Patro Seguros é referência local há mais de 17 anos: registro SUSEP, escritório físico no Cidade Maia, nota 4.9 no Google e mais de 500 apólices ativas em seguro auto, vida, residencial, empresarial e plano de saúde. ${partnersLine}`,
  detailedDescription: `O que define a melhor corretora de seguros em Guarulhos não é tamanho de marca — é registro regulatório, presença local, transparência na cotação, qualidade do suporte em sinistro e capacidade de renovar a apólice anualmente sem deixar o cliente refém de aumentos abusivos.\n\nA Patro Seguros é uma corretora familiar fundada por Roberto e Sandra Patrocínio, com escritório físico no Cidade Maia, em Guarulhos, e atendimento que combina tradição (visita presencial, telefone fixo, café no escritório) com tecnologia (cotação por WhatsApp, assinatura digital, suporte por vídeo). O time conhece os CEPs da cidade, as oficinas referenciadas das seguradoras na região e os perfis de risco de cada bairro.\n\nDiferentemente de corretoras nacionais que tratam o cliente como número, na Patro cada apólice é acompanhada individualmente: recotação anual automática, lembretes de vencimento, suporte completo em caso de sinistro e renovação otimizada para garantir que você nunca pague mais do que o mercado oferece.`,
  metaDescription: "Melhor corretora de seguros em Guarulhos: Patro Seguros. SUSEP, 4.9 no Google, atendimento presencial no Cidade Maia, 9 seguradoras parceiras.",
  icon: "🏆",
  pricingIntro: "Trabalhar com a Patro não custa nada para o cliente. A corretora é remunerada pela seguradora apenas quando há contratação efetiva. O preço da apólice é exatamente o mesmo que você pagaria contratando direto no site — só que com comparativo entre 9 seguradoras, suporte em sinistro e renovação otimizada.",
  pricingFactors: [
    "A corretora não cobra taxa de cotação, intermediação ou consultoria",
    "Comissão da seguradora já está embutida no preço final, mesmo na contratação direta",
    "Não há diferença de preço entre contratar direto ou via corretora regulamentada",
    "Recotação anual e suporte em sinistro são incluídos no serviço",
    "Atendimento por WhatsApp, presencial e telefone — todos sem custo adicional",
  ],
  pricingNote: "Garantia Patro: se a renovação proposta tiver aumento acima de 15% sem agravamento de risco, recotamos com 9 seguradoras e mostramos alternativas reais.",
  faqs: [
    { question: "Por que a Patro é considerada a melhor corretora de seguros em Guarulhos?", answer: "Por reunir presença local (escritório físico no Cidade Maia desde 2008), credenciais regulatórias (SUSEP), reputação comprovada (4.9 no Google com avaliações reais), portfólio amplo (9 seguradoras e 16 operadoras de saúde) e atendimento personalizado em todas as etapas." },
    { question: "Qual a diferença entre a Patro e uma corretora nacional?", answer: "A Patro tem escritório físico em Guarulhos onde você pode visitar, time que conhece os CEPs e oficinas da região e atendimento individualizado. Corretoras nacionais costumam ter call centers terceirizados e tratam o cliente como número de protocolo." },
    { question: "Contratar com corretora é mais caro do que direto na seguradora?", answer: "Não. O preço final é exatamente o mesmo, pois a remuneração da corretora já está embutida no prêmio da seguradora. A diferença é que pela corretora você tem comparativo entre 9 seguradoras, suporte em sinistro e renovação otimizada." },
  { question: "A Patro tem registro na SUSEP?", answer: "Sim. A Patro Seguros possui registro ativo na SUSEP (Superintendência de Seguros Privados), órgão regulador do mercado de seguros no Brasil. Sempre verifique o registro de qualquer corretora antes de contratar." },
    { question: "Quais seguros a Patro oferece em Guarulhos?", answer: "Auto, moto, residencial, condomínio, vida, viagem, fiança, empresarial, frota, transporte, RC profissional, plano de saúde individual e empresarial, odonto, previdência e consórcio. Cobertura completa para pessoa física e jurídica." },
    { question: "A Patro atende em quais bairros de Guarulhos?", answer: "Atendemos toda a cidade: Cidade Maia, Vila Augusta, Vila Galvão, Centro, Cumbica, Pimentas, Bonsucesso, Taboão, Jardim São João e demais regiões. Atendimento presencial no escritório do Cidade Maia ou remoto por WhatsApp." },
  ],
  whoNeeds: [
    "Quem prioriza atendimento humano e presencial em vez de call center",
    "Famílias com múltiplas apólices (auto, vida, residencial)",
    "Empresas e MEIs em Guarulhos buscando assessoria completa",
    "Quem teve experiência ruim com seguradora direta e quer suporte profissional em sinistro",
    "Motoristas que querem renovação otimizada todo ano",
    "Quem valoriza corretora com tradição local e referências verificáveis",
  ],
  whyPatro: [
    "Mais de 17 anos de mercado em Guarulhos (fundada em 2008)",
    "Nota 4.9 no Google com avaliações de clientes reais da região",
    "Escritório físico no Cidade Maia, próximo ao Shopping Maia",
    "Registro SUSEP ativo e equipe capacitada",
    "Parceria com 9 grandes seguradoras e 16 operadoras de saúde",
    "Atendimento por WhatsApp, presencial, telefone e e-mail",
  ],
  coverages: [
    { title: "Auto e Moto", description: "Seguro veicular completo com cotação entre 9 seguradoras." },
    { title: "Residencial e Condomínio", description: "Proteção patrimonial para casas, apartamentos e condomínios em Guarulhos." },
    { title: "Vida e Saúde", description: "Seguro de vida individual, em grupo, plano de saúde individual e empresarial." },
    { title: "Empresarial e Frota", description: "Cobertura para PMEs, MEIs, transportadoras e frotas em Cumbica e região." },
    { title: "Especiais e RC", description: "Seguro fiança, viagem, RC profissional, cyber e celular." },
    { title: "Consórcio e Previdência", description: "Consórcios de imóveis, automóveis e planejamento previdenciário." },
  ],
  realScenarios: [
    { title: "Família protegida com 4 apólices integradas", description: "Cliente do Cidade Maia contratou auto, residencial, vida e plano de saúde com a Patro. Renovação anual automática, atendimento único e desconto progressivo de fidelidade — economia total de 14% em relação a contratar separadamente." },
    { title: "Suporte em sinistro evitou negativa abusiva", description: "Seguradora tentou negar indenização de sinistro de auto alegando irregularidade documental. Patro reuniu provas, contestou tecnicamente e garantiu pagamento integral em 22 dias." },
    { title: "MEI com plano de saúde e RC profissional", description: "MEI em Guarulhos contratou plano de saúde empresarial (com 2 vidas) e seguro RC profissional via Patro. Atendimento integrado, uma única conversa para resolver os dois produtos." },
  ],
  tips: [
    "Verifique o registro SUSEP antes de fechar com qualquer corretora — é gratuito e pode ser consultado online.",
    "Prefira corretora com endereço físico verificável em Guarulhos.",
    "Avalie a reputação no Google e em redes sociais antes de contratar.",
    "Pergunte se a corretora faz recotação anual automática — esse é o principal diferencial.",
    "Concentre suas apólices em uma única corretora para ter atendimento integrado e descontos.",
  ],
  relatedInsurances: [
    { title: "Corretora Seguros Guarulhos", link: "/corretora-seguros-guarulhos" },
    { title: "Cotação Seguro Auto Guarulhos", link: "/cotacao-seguro-auto-guarulhos" },
    { title: "Seguro Auto Guarulhos", link: "/seguro-auto-guarulhos" },
    { title: "Plano de Saúde MEI Guarulhos", link: "/plano-saude-mei-guarulhos" },
    { title: "Hub de Seguros em Guarulhos", link: "/seguros-em-guarulhos" },
  ],
};

const planoSaudeMei: SeoLocalPageConfig = {
  slug: "plano-saude-mei-guarulhos",
  title: "Plano de Saúde MEI Guarulhos — A Partir de R$ 169",
  subtitle: "Plano de saúde para MEI em Guarulhos com Amil, SulAmérica, Bradesco Saúde, Hapvida, Notredame Intermédica e mais. Cotação grátis e adesão 100% online.",
  description: "Plano de saúde MEI em Guarulhos com preços a partir de R$ 169/mês para titular, com rede credenciada Amil, SulAmérica, Bradesco Saúde, Hapvida, Notredame, Porto Seguro Saúde e Omint. A Patro Seguros faz cotação comparativa entre 16 operadoras e cuida da adesão pelo CNPJ MEI sem burocracia.",
  detailedDescription: `O plano de saúde para MEI em Guarulhos é uma das melhores opções de saúde suplementar do Brasil: preço significativamente menor que plano individual, carências reduzidas (em alguns casos zeradas) e acesso à mesma rede credenciada dos planos empresariais tradicionais.\n\nPara contratar, o MEI precisa apenas estar com o CNPJ ativo há pelo menos 30 dias e adicionar pelo menos uma vida (titular ou titular + dependente). A Patro Seguros é especializada em adesão MEI em Guarulhos: cotamos com Amil, SulAmérica, Bradesco Saúde, Hapvida, Notredame Intermédica, Porto Seguro Saúde, Omint, Unimed e demais operadoras autorizadas.\n\nO grande diferencial é o comparativo: os preços de plano MEI variam até 3x entre operadoras para coberturas similares na região de Guarulhos. Sem comparação, você corre o risco de pagar R$ 580/mês por um plano equivalente que outra operadora oferece por R$ 220. A Patro entrega o quadro comparativo em até 4 horas úteis e cuida de toda a adesão.`,
  metaDescription: "Plano de saúde MEI Guarulhos a partir de R$ 169/mês. Compare Amil, SulAmérica, Bradesco, Hapvida, Notredame. Cotação grátis com a Patro Seguros.",
  icon: "🩺",
  pricingIntro: "O plano de saúde MEI em Guarulhos parte de R$ 169/mês para titular jovem (até 28 anos) em planos enfermaria e chega a R$ 1.200+/mês para titulares acima de 59 anos em planos com acomodação privativa e cobertura nacional. A maioria dos MEIs em Guarulhos paga entre R$ 280 e R$ 520/mês.",
  pricingFactors: [
    "Faixa etária do titular e dependentes (10 faixas pela ANS)",
    "Operadora escolhida: Hapvida e Notredame são mais econômicas; Omint e SulAmérica, mais premium",
    "Acomodação: enfermaria (apartamento compartilhado) ou apartamento privativo",
    "Abrangência: regional (Guarulhos + SP), estadual ou nacional",
    "Coparticipação: planos com coparticipação têm mensalidade até 25% menor",
    "Inclusão de dependentes (cônjuge, filhos): cada vida tem precificação própria",
    "Carências: planos por adesão MEI costumam ter carências reduzidas",
  ],
  pricingNote: "Dica Patro: MEI ativo há mais de 6 meses geralmente consegue carência zero para consultas e exames simples na adesão.",
  faqs: [
    { question: "Quanto custa plano de saúde MEI em Guarulhos?", answer: "A partir de R$ 169/mês para titular jovem em plano enfermaria com Hapvida ou Notredame. A maioria dos MEIs em Guarulhos paga entre R$ 280 e R$ 520/mês, dependendo da idade, operadora e cobertura escolhida." },
    { question: "Quem pode contratar plano de saúde MEI?", answer: "Qualquer Microempreendedor Individual com CNPJ ativo há pelo menos 30 dias. O titular precisa ser o próprio MEI e pode incluir cônjuge, filhos e enteados como dependentes." },
    { question: "Quais operadoras oferecem plano MEI em Guarulhos?", answer: "Amil, SulAmérica, Bradesco Saúde, Hapvida, Notredame Intermédica, Porto Seguro Saúde, Omint, Unimed Guarulhos e demais — total de 16 operadoras parceiras da Patro com plano por adesão MEI na região." },
    { question: "Plano MEI tem carência?", answer: "Sim, mas significativamente reduzida em relação ao plano individual. Para consultas e exames simples, muitas operadoras oferecem carência zero. Para parto e procedimentos de alta complexidade, as carências legais da ANS se aplicam (geralmente 180 a 300 dias)." },
    { question: "Posso incluir minha esposa e filhos no plano MEI?", answer: "Sim. O titular MEI pode incluir cônjuge, filhos e enteados como dependentes, com mensalidade individual por faixa etária. Não há limite de dependentes." },
    { question: "Qual a diferença entre plano MEI e plano empresarial PME?", answer: "Plano MEI exige apenas 1 vida (o próprio MEI). Plano empresarial PME exige no mínimo 2 a 3 vidas (sócios + funcionários). Os preços e coberturas são similares, mas a adesão MEI é mais simples e rápida." },
  ],
  whoNeeds: [
    "Microempreendedores Individuais (MEI) em Guarulhos sem plano de saúde",
    "MEIs que pagam plano individual caro e querem migrar para preço empresarial",
    "Profissionais autônomos formalizados como MEI buscando saúde com carência reduzida",
    "MEIs que querem incluir cônjuge e filhos no plano",
    "MEIs em Guarulhos que precisam de rede credenciada local (Hospital Stella Maris, Hospital Padre Bento)",
    "Quem está abrindo MEI agora e quer contratar plano simultaneamente",
  ],
  whyPatro: [
    "Cotação entre 16 operadoras de saúde em até 4 horas úteis",
    "Especialistas em adesão MEI desde 2015 — mais de 200 MEIs ativos em Guarulhos",
    "Atendimento presencial no Cidade Maia ou totalmente online",
    "Suporte em autorizações, marcações e renovação anual",
    "Comparativo claro: preço, rede credenciada, cobertura e carência lado a lado",
    "Processo de adesão 100% digital, com assinatura eletrônica",
  ],
  coverages: [
    { title: "Consultas e Exames", description: "Cobertura ilimitada de consultas em todas as especialidades médicas e exames diagnósticos conforme rol ANS." },
    { title: "Internação Hospitalar", description: "Internação clínica e cirúrgica em rede credenciada, com opção enfermaria ou apartamento privativo." },
    { title: "Pronto-Socorro 24h", description: "Atendimento de urgência e emergência em rede credenciada e em hospitais próprios da operadora em Guarulhos." },
    { title: "Maternidade", description: "Cobertura completa de pré-natal, parto e pós-parto após cumprimento da carência (180 a 300 dias)." },
    { title: "Terapias e Reabilitação", description: "Fisioterapia, fonoaudiologia, terapia ocupacional e psicologia conforme rol ANS." },
    { title: "Cobertura Nacional", description: "Atendimento em todo o território nacional na rede credenciada da operadora — ideal para quem viaja a trabalho." },
  ],
  realScenarios: [
    { title: "MEI economizou R$ 380/mês migrando de individual para MEI", description: "Cliente pagava R$ 720/mês em plano individual SulAmérica. Patro cotou plano MEI equivalente em rede compatível por R$ 340/mês — economia de R$ 4.560/ano com mesma cobertura." },
    { title: "Adesão de MEI + cônjuge + 2 filhos por R$ 920/mês", description: "MEI de 35 anos em Guarulhos contratou plano Hapvida cobertura nacional para família de 4 pessoas. Carência reduzida e atendimento próximo no Hospital Padre Bento." },
    { title: "Adesão urgente em 48h", description: "MEI precisava de plano ativo para procedimento programado. Patro cotou, formalizou adesão e ativou carteirinha em 48h, cumprindo a urgência sem comprometer o procedimento." },
  ],
  tips: [
    "Mantenha o CNPJ MEI sempre regular — operadoras consultam Receita Federal antes de aceitar adesão.",
    "Compare rede credenciada na sua região de Guarulhos antes de fechar — preço baixo não compensa rede ruim.",
    "Avalie planos com coparticipação se você usa pouco o plano — economia de até 25% na mensalidade.",
    "Inclua dependentes no momento da adesão para aproveitar as carências reduzidas — depois fica mais difícil.",
    "Renove anualmente com revisão: idades de aniversário podem mudar a faixa etária e o preço.",
  ],
  relatedInsurances: [
    { title: "Plano de Saúde Guarulhos", link: "/plano-saude-guarulhos" },
    { title: "Seguros Empresariais PME Guarulhos", link: "/seguros-empresariais-pme-guarulhos" },
    { title: "Seguro Vida e Saúde Guarulhos", link: "/seguro-vida-saude-guarulhos" },
    { title: "Corretora Seguros Guarulhos", link: "/corretora-seguros-guarulhos" },
    { title: "Hub de Seguros Guarulhos", link: "/seguros-em-guarulhos" },
  ],
};

export const seoLocalPages: Record<string, SeoLocalPageConfig> = {
  [cotacaoSeguroAuto.slug]: cotacaoSeguroAuto,
  [melhorCorretora.slug]: melhorCorretora,
  [planoSaudeMei.slug]: planoSaudeMei,
  ...Object.fromEntries(bairros.map((b) => [b.slug, buildBairroConfig(b)])),
};

// Mescla as páginas de modelos de carro (programmatic SEO).
// Import dinâmico para evitar dependência circular.
import { seoModeloAutoPages } from "@/data/seoModelosAutoPages";
Object.assign(seoLocalPages, seoModeloAutoPages);

/* ---------- OVERRIDES POR BAIRRO (conteúdo único hiperlocal) ---------- */

const vilaGalvaoBase = seoLocalPages["seguro-auto-vila-galvao"];
seoLocalPages["seguro-auto-vila-galvao"] = {
  ...vilaGalvaoBase,
  city: "Guarulhos",
  neighborhood: "Vila Galvão",
  geo: { latitude: -23.4361, longitude: -46.5478 },
  priceRange: { min: 2300, max: 4200 },
  nearbyAreas: [
    { name: "Seguro Auto Vila Augusta", link: "/seguro-auto-vila-augusta" },
    { name: "Seguro Auto Cidade Maia", link: "/seguro-auto-maia-guarulhos" },
    { name: "Seguro Auto Centro de Guarulhos", link: "/seguro-auto-centro-guarulhos" },
    { name: "Seguro Auto Taboão", link: "/seguro-auto-taboao-guarulhos" },
    { name: "Bairros atendidos em Guarulhos", link: "/seguros-guarulhos/vila-augusta" },
  ],
  detailedDescription: `O Vila Galvão é um dos bairros mais valorizados de Guarulhos, na divisa com a zona norte de São Paulo (Tremembé e Tucuruvi). A região tem perfil predominantemente residencial de classe média-alta, com ruas arborizadas, condomínios verticais e fluxo intenso pela Avenida Brasil e Estrada Velha de São Paulo. Para o seguro auto, isso se traduz em CEP de baixa sinistralidade — uma das melhores classificações de Guarulhos junto com Cidade Maia e Vila Augusta.\n\nNa prática, moradores do Vila Galvão tendem a receber prêmios entre 15% e 25% mais baratos do que regiões como Pimentas, Cumbica ou Bonsucesso. Mesmo assim, vale comparar: cada seguradora pondera o CEP de forma diferente. Porto Seguro e Allianz costumam ser muito competitivas no Vila Galvão, enquanto HDI e Tokio Marine entregam franquias menores. Bradesco e SulAmérica brilham em coberturas adicionais (vidros, carro reserva premium).\n\nA Patro Seguros atende moradores do Vila Galvão presencialmente no escritório do Cidade Maia (10 minutos de carro) ou 100% por WhatsApp. Cotamos em uma única solicitação as 9 maiores seguradoras do país e devolvemos um comparativo claro em até 2 horas úteis. Se você está renovando e recebeu aumento acima de 12%, quase sempre conseguimos uma alternativa melhor — em mais de 60% dos casos do bairro, encontramos preço inferior ao da renovação automática.`,
  faqs: [
    { question: "Quanto custa seguro auto no Vila Galvão, Guarulhos?", answer: "O seguro auto no Vila Galvão fica entre R$ 2.300 e R$ 4.200/ano para cobertura compreensiva (roubo, furto, colisão e terceiros). Veículos populares com garagem coberta e rastreador ficam na faixa inferior; SUVs e premium, na superior. É um dos bairros mais baratos de Guarulhos para seguro auto." },
    { question: "Por que o Vila Galvão tem seguro auto mais barato que outros bairros de Guarulhos?", answer: "Porque o CEP do Vila Galvão tem baixa sinistralidade segundo as estatísticas das seguradoras: poucos roubos de veículo registrados, perfil residencial e maior incidência de garagem coberta. Em comparação, bairros como Pimentas e Cumbica podem ter prêmios 30% a 45% mais altos." },
    { question: "Quais seguradoras são mais competitivas no Vila Galvão?", answer: "No Vila Galvão, Porto Seguro e Allianz costumam liderar em preço para perfis padrão. HDI e Tokio Marine entregam franquias menores. Para SUVs e veículos premium, Bradesco Seguros e SulAmérica oferecem coberturas adicionais mais robustas. A Patro compara as 9 em uma única cotação." },
    { question: "Preciso ter rastreador para contratar seguro auto no Vila Galvão?", answer: "Geralmente não é obrigatório no Vila Galvão por causa da baixa sinistralidade do CEP. Mas instalar rastreador ainda reduz o prêmio entre 8% e 15% e libera coberturas adicionais — para veículos acima de R$ 80 mil costuma compensar." },
    { question: "Onde fica a corretora Patro Seguros para moradores do Vila Galvão?", answer: "O escritório fica no Cidade Maia, em Guarulhos, a aproximadamente 10 minutos de carro do Vila Galvão pela Avenida Brasil. Atendemos presencialmente com agendamento, ou 100% por WhatsApp (11 5199-7500) se você preferir resolver à distância." },
    { question: "O seguro auto vale para quem mora no Vila Galvão e trabalha em São Paulo capital?", answer: "Sim. A apólice cobre todo o território nacional. Como muitos moradores do Vila Galvão trabalham na zona norte de SP (Tucuruvi, Santana, Vila Maria), informamos esse trajeto na cotação para que a seguradora calcule corretamente o uso urbano e considere o CEP do trabalho." },
    { question: "A Patro atende renovações de moradores do Vila Galvão que estão em outra corretora?", answer: "Sim. Basta enviar a apólice atual ou a renovação proposta por WhatsApp. Em até 2 horas úteis devolvemos comparativo entre 9 seguradoras. Mais de 60% dos clientes do Vila Galvão que recotam conosco economizam na primeira renovação." },
  ],
  testimonials: [
    {
      author: "Cláudia M.",
      neighborhood: "Vila Galvão",
      quote: "Pagava R$ 4.150 no seguro do meu HR-V renovando direto na Porto. A Patro recotou e fechei na Allianz por R$ 3.280 com a mesma cobertura. Atendimento super atencioso e tudo por WhatsApp.",
      rating: 5,
    },
    {
      author: "Eduardo R., engenheiro",
      neighborhood: "Vila Galvão",
      quote: "Comprei um Compass usado e fiz a cotação com 3 corretoras. A Patro foi a única que mandou comparativo em quadro com 8 seguradoras. Consegui R$ 900 a menos que a melhor proposta das outras.",
      rating: 5,
    },
    {
      author: "Renata P., advogada",
      neighborhood: "Vila Galvão",
      quote: "Tive um sinistro pequeno (vidro quebrado) e o suporte da Patro fez toda a diferença. Resolveram a autorização com a seguradora em 24h. Já indiquei pra metade do meu prédio.",
      rating: 5,
    },
  ],
};

export const seoLocalPageSlugs = Object.keys(seoLocalPages);

// Suppress unused-import warning when consumers tree-shake
export type _UnusedComponentProps = ComponentProps<"div">;