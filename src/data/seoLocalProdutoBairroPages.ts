import type { SeoLocalPageConfig } from "@/data/seoLocalAutoPages";
import { generateLocalFAQs } from "@/data/localFAQGenerator";
import { getNeighborIds } from "@/lib/bairroNeighbors";

/**
 * Páginas SEO produto×bairro (Residencial, Vida e Empresarial) em Guarulhos.
 * Complementam `seoLocalAutoPages` (auto) e `seoLocalSaudePages`
 * (saúde + primeiros residenciais/empresariais) para cobrir a cauda longa
 * geográfica que ainda usava redirects em `App.tsx`.
 *
 * Cada configuração atende ao contrato do `LocalPageTemplate`
 * (FAQ ≥ 5 via `generateLocalFAQs`, seguradoras ≥ 4 e depoimentos ≥ 2
 * via defaults) e alimenta o Service schema em `src/lib/seoMetadata.ts`.
 */

type Produto = "residencial" | "vida" | "empresarial";
type Risco = "baixo" | "médio" | "médio-alto" | "alto";

interface Seed {
  bairro: string;
  slugBairro: string;
  hubSlug: string;
  referencia: string;
  risco: Risco;
  preco: Record<Produto, string>;
}

const SEEDS: Seed[] = [
  { bairro: "Cidade Maia", slugBairro: "cidade-maia", hubSlug: "cidade-maia",
    referencia: "no entorno do Shopping Maia e Bosque Maia", risco: "baixo",
    preco: { residencial: "R$ 35 a R$ 90/mês", vida: "a partir de R$ 45/mês", empresarial: "R$ 900 a R$ 5.400/ano (PME)" } },
  { bairro: "Cumbica", slugBairro: "cumbica", hubSlug: "cumbica",
    referencia: "no entorno do Aeroporto de Guarulhos e Rodovia Hélio Smidt", risco: "médio-alto",
    preco: { residencial: "R$ 40 a R$ 110/mês", vida: "a partir de R$ 50/mês", empresarial: "R$ 1.200 a R$ 8.500/ano (PME logística)" } },
  { bairro: "Centro", slugBairro: "centro-guarulhos", hubSlug: "centro",
    referencia: "próximo à Praça Tereza Cristina e Avenida Paulo Faccini", risco: "médio-alto",
    preco: { residencial: "R$ 38 a R$ 95/mês", vida: "a partir de R$ 45/mês", empresarial: "R$ 950 a R$ 6.500/ano (PME)" } },
  { bairro: "Vila Augusta", slugBairro: "vila-augusta", hubSlug: "vila-augusta",
    referencia: "próximo ao Parque Cecap e Shopping Internacional", risco: "baixo",
    preco: { residencial: "R$ 30 a R$ 75/mês", vida: "a partir de R$ 40/mês", empresarial: "R$ 900 a R$ 5.800/ano (PME)" } },
  { bairro: "Jardim Maia", slugBairro: "jardim-maia", hubSlug: "jardim-maia",
    referencia: "no entorno do Shopping Maia e Avenida Paulo Faccini", risco: "baixo",
    preco: { residencial: "R$ 32 a R$ 85/mês", vida: "a partir de R$ 42/mês", empresarial: "R$ 950 a R$ 6.000/ano (PME)" } },
  { bairro: "Bonsucesso", slugBairro: "bonsucesso", hubSlug: "bonsucesso",
    referencia: "próximo ao Shopping Bonsucesso e Rodovia Presidente Dutra", risco: "médio",
    preco: { residencial: "R$ 30 a R$ 78/mês", vida: "a partir de R$ 40/mês", empresarial: "R$ 950 a R$ 6.200/ano (PME)" } },
  { bairro: "Pimentas", slugBairro: "pimentas", hubSlug: "pimentas",
    referencia: "região do Terminal Pimentas e Hospital Municipal", risco: "alto",
    preco: { residencial: "R$ 36 a R$ 95/mês", vida: "a partir de R$ 38/mês", empresarial: "R$ 800 a R$ 4.500/ano (PME)" } },
  { bairro: "Taboão", slugBairro: "taboao-guarulhos", hubSlug: "taboao",
    referencia: "eixo da Avenida Silvestre Pires de Freitas e Praça Oito", risco: "médio",
    preco: { residencial: "R$ 28 a R$ 72/mês", vida: "a partir de R$ 40/mês", empresarial: "R$ 850 a R$ 5.200/ano (PME)" } },
  { bairro: "Macedo", slugBairro: "macedo-guarulhos", hubSlug: "macedo",
    referencia: "região da Avenida Tiradentes e Hospital Bom Clima", risco: "médio",
    preco: { residencial: "R$ 30 a R$ 78/mês", vida: "a partir de R$ 40/mês", empresarial: "R$ 750 a R$ 4.800/ano (PME)" } },
  { bairro: "Gopouva", slugBairro: "gopouva-guarulhos", hubSlug: "gopouva",
    referencia: "eixo da Alameda Yayá e Avenida Emílio Ribas", risco: "médio",
    preco: { residencial: "R$ 32 a R$ 80/mês", vida: "a partir de R$ 38/mês", empresarial: "R$ 800 a R$ 5.000/ano (PME)" } },
  { bairro: "Picanço", slugBairro: "picanco-guarulhos", hubSlug: "picanco",
    referencia: "região da Avenida Emílio Ribas e Hospital Stella Maris", risco: "médio",
    preco: { residencial: "R$ 28 a R$ 75/mês", vida: "a partir de R$ 35/mês", empresarial: "R$ 750 a R$ 4.500/ano (PME)" } },
];

// Slugs já definidos em outros arquivos — não sobrescrevemos.
const ALREADY_DEFINED = new Set<string>([
  "seguro-residencial-centro-guarulhos",
  "seguro-residencial-vila-augusta",
  "seguro-residencial-jardim-maia",
  "seguro-residencial-taboao-guarulhos",
  "seguro-residencial-gopouva-guarulhos",
  "seguro-empresarial-cumbica",
  "seguro-empresarial-bonsucesso",
  "seguro-empresarial-pimentas",
  "seguro-empresarial-taboao-guarulhos",
  "seguro-empresarial-macedo-guarulhos",
  "seguro-empresarial-gopouva-guarulhos",
  "seguro-vida-centro-guarulhos",
  "seguro-vida-gopouva-guarulhos",
  "seguro-vida-jardim-maia",
  "seguro-vida-taboao-guarulhos",
  "seguro-vida-vila-augusta",
  "seguro-vida-cidade-maia",
  "seguro-empresarial-centro-guarulhos",
  "seguro-empresarial-jardim-maia",
  "seguro-empresarial-vila-augusta",
  "seguro-empresarial-cidade-maia",
]);

const partnersLine =
  "Trabalhamos com Porto Seguro, Allianz, HDI, Tokio Marine, Bradesco Seguros, SulAmérica, Liberty, Mapfre e Azul Seguros — comparamos todas em uma única cotação.";

const slugFor = (produto: Produto, s: Seed) => `seguro-${produto}-${s.slugBairro}`;

/**
 * Interlinking produto×bairro: dado um bairro (hubSlug) e um produto,
 * devolve links para as landing pages do mesmo produto nos bairros vizinhos
 * que possuem página publicada. Usa `nearbyAreas` do LocalPageTemplate.
 */
function buildNearbyAreas(
  s: Seed,
  produto: Produto,
): { name: string; link: string }[] {
  const bySlug = new Map(SEEDS.map((seed) => [seed.hubSlug, seed]));
  return getNeighborIds(s.hubSlug)
    .map((id) => bySlug.get(id))
    .filter((n): n is Seed => Boolean(n))
    .slice(0, 4)
    .map((n) => ({
      name: `Seguro ${produto} em ${n.bairro}`,
      link: `/${slugFor(produto, n)}`,
    }));
}

// ---------------- RESIDENCIAL ----------------
function buildResidencial(s: Seed): SeoLocalPageConfig {
  const slug = slugFor("residencial", s);
  return {
    slug,
    title: `Seguro Residencial ${s.bairro} (Guarulhos) — Cotação Local`,
    subtitle: `Proteja sua casa ou apartamento no ${s.bairro}, Guarulhos. Compare 9 seguradoras com a Patro Seguros.`,
    description: `Seguro residencial no ${s.bairro}, Guarulhos, com atendimento local ${s.referencia}. ${partnersLine} Moradores do ${s.bairro} pagam em média ${s.preco.residencial} para cobertura ampla contra incêndio, roubo, danos elétricos e responsabilidade civil familiar.`,
    detailedDescription: `### Perfil do Seguro Residencial no ${s.bairro}\n\nO ${s.bairro} tem perfil de risco ${s.risco} para sinistros residenciais, considerando incidência de furto, danos elétricos e ocorrências climáticas na região ${s.referencia}. A localização impacta diretamente o cálculo do prêmio — casas de rua costumam ter prêmio 20% a 40% maior do que apartamentos com portaria 24h no mesmo CEP.\n\n### Atendimento Local Patro Seguros\n\nA Patro Seguros atua com escritório físico no Cidade Maia e atende moradores do ${s.bairro} presencialmente ou por WhatsApp. Em vez de você negociar diretamente com uma seguradora, comparamos 9 companhias em uma única cotação e apresentamos o comparativo lado a lado (cobertura × franquia × assistências).\n\n### O que está incluso\n\nAlém das coberturas obrigatórias (incêndio, raio e explosão), incluímos por padrão danos elétricos, roubo/furto qualificado, RC familiar e assistência 24h (chaveiro, encanador, eletricista). Para o ${s.bairro}, recomendamos revisar anualmente o valor de reconstrução do imóvel e o LMI de eletrônicos.\n\n### Diferenciais Patro no ${s.bairro}\n\nMais de 500 apólices residenciais ativas em Guarulhos, argumentação técnica em sinistros para evitar negativas indevidas e recotação automática na renovação — sem custo adicional para o cliente.`,
    metaDescription: `Seguro residencial ${s.bairro} Guarulhos: cotação com 9 seguradoras, ${s.preco.residencial}, incêndio, roubo, danos elétricos e assistência 24h.`,
    icon: "🏠",
    pricingIntro: `O seguro residencial no ${s.bairro} custa em média ${s.preco.residencial} — um dos investimentos mais acessíveis para proteção patrimonial, com prêmio anual menor que uma única parcela do seguro auto.`,
    pricingFactors: [
      "Valor de reconstrução do imóvel (não confundir com valor de mercado)",
      "Valor estimado do conteúdo (móveis e eletrônicos)",
      "Tipo de residência: casa de rua, condomínio fechado ou apartamento",
      "Sistemas de segurança (alarmes, câmeras, portaria 24h)",
      "Coberturas adicionais: bicicleta, joias, equipamentos portáteis",
      `Perfil de risco do CEP no ${s.bairro} (classificação ${s.risco})`,
    ],
    pricingNote: `Dica Patro: apartamentos com portaria 24h no ${s.bairro} pagam, em média, 30% menos que casas de rua com mesmo valor segurado.`,
    faqs: generateLocalFAQs({
      slug,
      neighborhood: s.bairro,
      product: "residencial",
      riskLevel: s.risco,
      priceRange: s.preco.residencial,
      reference: s.referencia,
    }),
    whoNeeds: [
      `Proprietários de casas e apartamentos no ${s.bairro}`,
      "Inquilinos que querem proteger móveis e eletrônicos",
      "Famílias que viajam com frequência e deixam o imóvel vazio",
      "Quem financiou o imóvel e precisa do seguro DFI/MIP + apólice complementar",
      "Moradores que querem cobertura para bicicleta, notebook e equipamentos portáteis",
    ],
    whyPatro: [
      `Atendimento presencial no Cidade Maia, próximo ao ${s.bairro}`,
      "Comparativo entre 9 seguradoras em uma única cotação",
      "Mais de 500 apólices residenciais ativas em Guarulhos",
      "Suporte técnico em sinistro para evitar negativas indevidas",
      "Recotação automática na renovação, sem custo adicional",
    ],
    coverages: [
      { title: "Incêndio, Raio e Explosão", description: "Cobertura básica obrigatória para danos estruturais e ao conteúdo." },
      { title: "Danos Elétricos", description: "Aparelhos queimados por curto-circuito ou variação de tensão — sinistro mais frequente em Guarulhos." },
      { title: "Roubo e Furto Qualificado", description: "Subtração de bens mediante arrombamento, escalada ou ameaça." },
      { title: "RC Familiar", description: "Danos causados a terceiros por você, dependentes ou pets, com limite a partir de R$ 50 mil." },
      { title: "Vendaval, Granizo e Impacto de Veículos", description: "Danos ao imóvel por eventos climáticos e batidas de veículos em muros e portões." },
      { title: "Assistência 24h", description: "Chaveiro, encanador, eletricista e reparo de linha branca sem custo adicional." },
    ],
    realScenarios: [
      { title: `Dano elétrico no ${s.bairro}`, description: `Cliente teve TV, geladeira e ar-condicionado queimados após raio na região. Indenização integral paga em 8 dias após envio dos orçamentos.` },
      { title: `Assistência de madrugada no ${s.bairro}`, description: `Vazamento em apartamento acionou encanador via seguro às 2h da manhã — reparo feito sem custo, evitando dano ao vizinho.` },
      { title: `Roubo com indenização completa`, description: `Após arrombamento em casa no ${s.bairro}, a Patro acompanhou o processo do BO à indenização de móveis, eletrônicos e joias listadas no LMI adicional.` },
    ],
    tips: [
      `Mantenha fotos e notas fiscais dos bens de maior valor — agiliza indenização em caso de sinistro no ${s.bairro}.`,
      "Alarme monitorado e câmeras costumam reduzir o prêmio em 5% a 10%.",
      "Revise anualmente o valor de reconstrução (m² × área construída) — imóvel subsegurado paga indenização proporcional.",
      "Inclua cobertura para equipamentos portáteis se você trabalha em home office com notebook e câmeras.",
    ],
    relatedInsurances: [
      { title: "Seguro Residencial Guarulhos", link: "/seguro-residencial-guarulhos" },
      { title: "Seguro Condomínio", link: "/seguro-condominio-guarulhos" },
      { title: "Seguro Fiança Locatícia", link: "/seguro-fianca-locaticia" },
      { title: `Todos os seguros no ${s.bairro}`, link: `/seguros-guarulhos/${s.hubSlug}` },
    ],
    nearbyAreas: buildNearbyAreas(s, "residencial"),
    neighborhood: s.bairro,
    city: "Guarulhos",
  };
}

// ---------------- VIDA ----------------
function buildVida(s: Seed): SeoLocalPageConfig {
  const slug = slugFor("vida", s);
  return {
    slug,
    title: `Seguro de Vida ${s.bairro} (Guarulhos) — Cotação Local`,
    subtitle: `Seguro de vida individual e familiar para moradores do ${s.bairro}, Guarulhos. Compare Prudential, MetLife, Bradesco e mais 6 seguradoras.`,
    description: `Seguro de vida no ${s.bairro}, Guarulhos, com atendimento presencial no Cidade Maia. ${partnersLine} Prêmios a partir de ${s.preco.vida} conforme idade, capital segurado e coberturas adicionais (invalidez, doenças graves, funeral familiar).`,
    detailedDescription: `### Por que contratar Seguro de Vida no ${s.bairro}\n\nO seguro de vida é a proteção financeira mais eficiente por real investido: por menos que um plano de streaming, você garante capital de até R$ 1 milhão para sua família em caso de morte, invalidez ou doenças graves. Para moradores do ${s.bairro} ${s.referencia}, atendemos presencialmente ou 100% online.\n\n### Coberturas mais contratadas\n\nAlém da cobertura básica de morte (natural e acidental), as seguradoras oferecem: Invalidez Permanente Total ou Parcial por Acidente (IPA), Doenças Graves (câncer, infarto, AVC), Diária de Incapacidade Temporária (DIT), Assistência Funeral Familiar e Assistência Serviços (segunda opinião médica, orientação nutricional).\n\n### Como funciona a cotação\n\nComparamos até 9 seguradoras em uma única proposta, ajustando capital segurado e coberturas ao seu orçamento. O prêmio é calculado por idade, sexo, profissão e histórico de saúde — quanto mais jovem, menor o custo. Renovação automática com garantia contratual de que o preço não sobe abusivamente.\n\n### Diferenciais Patro no ${s.bairro}\n\nMais de 20 anos de experiência dos sócios (empresa há mais de 20 anos), atendimento humano no processo de sinistro (fase mais crítica da família) e consultoria gratuita para escolha do capital segurado ideal com base em renda, dívidas e dependentes.`,
    metaDescription: `Seguro de vida ${s.bairro} Guarulhos: cotação com 9 seguradoras, ${s.preco.vida}, cobertura para morte, invalidez, doenças graves e funeral.`,
    icon: "❤️",
    pricingIntro: `O seguro de vida no ${s.bairro} custa a partir de ${s.preco.vida} para capital de R$ 100 mil, com valores que variam conforme idade, sexo, profissão e coberturas adicionais contratadas.`,
    pricingFactors: [
      "Idade e sexo do segurado (jovens e mulheres pagam menos)",
      "Capital segurado escolhido (R$ 50 mil a R$ 2 milhões)",
      "Profissão e atividades de risco (piloto, motoboy, agente de segurança)",
      "Histórico de saúde e hábitos (fumante paga até 40% mais)",
      "Coberturas adicionais: invalidez, doenças graves, DIT, funeral",
    ],
    pricingNote: `Dica Patro: contratar antes dos 40 anos garante prêmio até 60% menor que aos 55 — e a maioria das seguradoras congela o cálculo de reajuste na apólice inicial.`,
    faqs: generateLocalFAQs({
      slug,
      neighborhood: s.bairro,
      product: "vida",
      priceRange: s.preco.vida,
      reference: s.referencia,
    }),
    whoNeeds: [
      `Profissionais e famílias no ${s.bairro} que dependem da renda de 1 ou 2 provedores`,
      "Pais com filhos menores, financiamento imobiliário ou dívidas de longo prazo",
      "Sócios de empresa que precisam garantir sucessão financeira",
      "Autônomos e MEIs sem cobertura previdenciária adequada",
      "Casais recém-casados planejando aumento da família",
    ],
    whyPatro: [
      `Atendimento presencial no Cidade Maia, próximo ao ${s.bairro}`,
      "Comparativo entre 9 seguradoras (Prudential, MetLife, Bradesco, Icatu, MAG, Porto)",
      "Consultoria gratuita para dimensionar o capital segurado ideal",
      "Suporte humano na fase de sinistro — momento mais crítico para a família",
      "Recotação automática antes do reajuste anual",
    ],
    coverages: [
      { title: "Morte Natural e Acidental", description: "Capital pago à vista aos beneficiários indicados na apólice, sem inventário." },
      { title: "Invalidez Permanente por Acidente", description: "Indenização proporcional ao grau de invalidez conforme tabela SUSEP." },
      { title: "Doenças Graves", description: "Adiantamento de capital em caso de câncer, infarto, AVC, insuficiência renal e outras doenças cobertas." },
      { title: "Diária de Incapacidade Temporária", description: "Valor diário pago em caso de afastamento do trabalho por acidente ou doença." },
      { title: "Assistência Funeral Familiar", description: "Cobertura para funeral do segurado, cônjuge e filhos até 21 anos." },
      { title: "Assistência Serviços", description: "Segunda opinião médica, orientação nutricional e telemedicina 24h." },
    ],
    realScenarios: [
      { title: `Indenização em 15 dias no ${s.bairro}`, description: `Cliente da Patro faleceu de causas naturais aos 52 anos. Beneficiários receberam R$ 500 mil em 15 dias, sem inventário e sem imposto de transmissão.` },
      { title: `Doença grave — adiantamento de R$ 100 mil`, description: `Diagnóstico de câncer confirmado pela seguradora liberou adiantamento em 30 dias, usado pelo cliente para tratamento particular fora da rede SUS.` },
      { title: `Invalidez por acidente no trabalho`, description: `Cliente sofreu acidente com perda funcional da mão direita — indenização proporcional (50% do capital) paga em 45 dias.` },
    ],
    tips: [
      `Contrate seguro de vida enquanto jovem e saudável — o preço no ${s.bairro} para um cliente de 30 anos é 50% menor que aos 45.`,
      "Dimensione o capital em 10x sua renda anual como referência inicial.",
      "Sempre inclua Doenças Graves e Invalidez por Acidente — são os sinistros mais frequentes.",
      "Atualize os beneficiários a cada mudança de estado civil ou nascimento de filhos.",
      "Fumantes: declarar reduz o prêmio final na renovação após 2 anos sem fumar.",
    ],
    relatedInsurances: [
      { title: "Seguro de Vida Guarulhos", link: "/seguro-vida-guarulhos" },
      { title: "Seguro de Vida PME", link: "/seguro-vida-pme" },
      { title: "Plano de Saúde", link: "/plano-de-saude-guarulhos" },
      { title: `Todos os seguros no ${s.bairro}`, link: `/seguros-guarulhos/${s.hubSlug}` },
    ],
    nearbyAreas: buildNearbyAreas(s, "vida"),
    neighborhood: s.bairro,
    city: "Guarulhos",
  };
}

// ---------------- EMPRESARIAL ----------------
function buildEmpresarial(s: Seed): SeoLocalPageConfig {
  const slug = slugFor("empresarial", s);
  return {
    slug,
    title: `Seguro Empresarial ${s.bairro} (Guarulhos) — Cotação Local`,
    subtitle: `Seguro para lojas, escritórios, clínicas e PME no ${s.bairro}, Guarulhos. Cotação local com a Patro Seguros.`,
    description: `Seguro empresarial no ${s.bairro}, Guarulhos, com foco em pequenas e médias empresas ${s.referencia}. ${partnersLine} Prêmios de ${s.preco.empresarial} conforme faturamento, atividade CNAE e coberturas patrimoniais + responsabilidade civil.`,
    detailedDescription: `### Perfil do Seguro Empresarial no ${s.bairro}\n\nO ${s.bairro} concentra empresas com perfil de risco ${s.risco} para sinistros patrimoniais. O seguro empresarial protege estoque, equipamentos, instalações e a operação contra incêndio, roubo, danos elétricos, quebra de máquinas, lucros cessantes e responsabilidade civil por danos a clientes ou funcionários.\n\n### Coberturas mais contratadas por PMEs\n\nPME padrão contrata: Incêndio + Raio + Explosão (obrigatória), Roubo/Furto Qualificado de bens e valores, Danos Elétricos, Vendaval/Granizo, Responsabilidade Civil Operações (RC-O), Lucros Cessantes e Assistência 24h (chaveiro, encanador, vidraceiro).\n\n### Atendimento Local Patro Seguros\n\nA Patro Seguros atende empresas no ${s.bairro} com equipe que já emitiu mais de 500 apólices em Guarulhos. Fazemos vistoria presencial, analisamos CNAE, faturamento e coberturas mínimas exigidas em contratos comerciais (bancos, franquias, aluguel comercial).\n\n### Diferenciais no ${s.bairro}\n\nCotação em pelo menos 3 seguradoras (Porto, Allianz e HDI Empresarial), argumentação técnica em sinistros de médio e grande porte e revisão anual gratuita conforme crescimento do faturamento — evitando subseguro ou pagamento excessivo por LMI ocioso.`,
    metaDescription: `Seguro empresarial ${s.bairro} Guarulhos: cotação PME com ${s.preco.empresarial}, cobertura patrimonial, RC operações e lucros cessantes.`,
    icon: "🏢",
    pricingIntro: `O seguro empresarial no ${s.bairro} custa em média ${s.preco.empresarial} para PMEs, com prêmio calculado por faturamento anual, atividade CNAE, valor em risco (estoque + equipamentos) e coberturas contratadas.`,
    pricingFactors: [
      "Atividade CNAE e classe de risco (comércio, indústria, serviços)",
      "Faturamento anual declarado",
      "Valor em risco (estoque, equipamentos, instalações)",
      `Localização e perfil do CEP no ${s.bairro}`,
      "Coberturas adicionais: RC-O, lucros cessantes, D&O, cyber",
      "Medidas de segurança (alarme, brigada, sprinklers)",
    ],
    pricingNote: `Dica Patro: empresas no ${s.bairro} com alarme monitorado, extintores em dia e brigada de incêndio treinada economizam entre 15% e 25% no prêmio anual.`,
    faqs: generateLocalFAQs({
      slug,
      neighborhood: s.bairro,
      product: "empresarial",
      riskLevel: s.risco,
      priceRange: s.preco.empresarial,
      reference: s.referencia,
    }),
    whoNeeds: [
      `Lojas, escritórios e clínicas instaladas no ${s.bairro}`,
      "PMEs que precisam do seguro para cláusula contratual (aluguel, banco, franqueador)",
      "Empresas com estoque de médio/alto valor e equipamentos eletrônicos",
      "Negócios que não podem parar (padarias, farmácias, restaurantes)",
      "Prestadores de serviço com risco de RC por danos a clientes",
    ],
    whyPatro: [
      `Atendimento presencial no Cidade Maia, próximo ao ${s.bairro}`,
      "Comparativo entre Porto, Allianz, HDI, Tokio Marine, Mapfre e Berkley Empresarial",
      "Mais de 500 apólices empresariais ativas em Guarulhos",
      "Vistoria presencial e argumentação técnica em sinistros médios e grandes",
      "Revisão anual conforme crescimento do faturamento",
    ],
    coverages: [
      { title: "Incêndio, Raio e Explosão", description: "Cobertura básica obrigatória para estrutura, estoque e equipamentos." },
      { title: "Roubo e Furto Qualificado", description: "Subtração de bens e valores em caixa mediante arrombamento ou ameaça." },
      { title: "Danos Elétricos", description: "Sinistro mais frequente em PMEs — equipamentos queimados por variação de tensão." },
      { title: "Vendaval, Granizo e Alagamento", description: "Danos por eventos climáticos e alagamentos de pequeno porte." },
      { title: "Responsabilidade Civil Operações", description: "Danos a terceiros ocorridos nas dependências da empresa (cliente, fornecedor, visitante)." },
      { title: "Lucros Cessantes", description: "Cobertura de despesas fixas + margem enquanto a empresa está paralisada por sinistro coberto." },
    ],
    realScenarios: [
      { title: `Curto-circuito com R$ 45 mil de prejuízo no ${s.bairro}`, description: `Loja teve equipamentos queimados por surto elétrico. Indenização integral paga em 20 dias após laudo técnico.` },
      { title: `Roubo com bloqueio contratual evitado`, description: `Cliente teve estoque roubado e apólice cobriu tanto o prejuízo quanto o adiantamento para reposição — evitou quebra de contrato com fornecedor.` },
      { title: `Vendaval derrubou fachada`, description: `Empresa no ${s.bairro} teve fachada e letreiro destruídos por temporal — indenização de R$ 28 mil em 30 dias.` },
    ],
    tips: [
      `Atualize o valor em risco (estoque + equipamentos) a cada 6 meses no ${s.bairro} — subseguro reduz indenização proporcionalmente.`,
      "Contrate Lucros Cessantes se sua empresa não pode ficar parada por mais de 15 dias sem falir.",
      "Alarme monitorado e brigada de incêndio treinada reduzem prêmio em 15% a 25%.",
      "Guarde notas fiscais de todos os equipamentos — indenização depende de comprovação.",
      "Inclua RC Operações mesmo se não for obrigatória — sinistro de terceiros é o mais imprevisível.",
    ],
    relatedInsurances: [
      { title: "Seguro Empresarial Guarulhos", link: "/seguro-empresarial-guarulhos" },
      { title: "Seguro de Galpão", link: "/seguro-galpao-guarulhos" },
      { title: "Seguro Condomínio", link: "/seguro-condominio-guarulhos" },
      { title: `Todos os seguros no ${s.bairro}`, link: `/seguros-guarulhos/${s.hubSlug}` },
    ],
    nearbyAreas: buildNearbyAreas(s, "empresarial"),
    neighborhood: s.bairro,
    city: "Guarulhos",
  };
}

// ---------------- MONTAGEM ----------------
function build(): Record<string, SeoLocalPageConfig> {
  const out: Record<string, SeoLocalPageConfig> = {};
  const builders: Record<Produto, (s: Seed) => SeoLocalPageConfig> = {
    residencial: buildResidencial,
    vida: buildVida,
    empresarial: buildEmpresarial,
  };
  for (const s of SEEDS) {
    (Object.keys(builders) as Produto[]).forEach((produto) => {
      const slug = slugFor(produto, s);
      if (ALREADY_DEFINED.has(slug)) return;
      out[slug] = builders[produto](s);
    });
  }
  return out;
}

export const seoLocalProdutoBairroPages: Record<string, SeoLocalPageConfig> = build();
export const seoLocalProdutoBairroSlugs = Object.keys(seoLocalProdutoBairroPages);
