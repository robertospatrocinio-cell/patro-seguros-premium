import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import NeighborhoodHub from "@/components/NeighborhoodHub";
import GalpaoStickyCTABar from "@/components/GalpaoStickyCTABar";
import heroImg from "@/assets/hero-seguro-galpoes.webp";
import { mergeGalpaoFAQs } from "@/data/galpaoClusterFAQs";

/**
 * Hub nacional do Seguro de Galpão.
 *
 * Centraliza a rota /seguro-galpao reunindo:
 *  - Especialização em Guarulhos/Cumbica (maior polo logístico do país)
 *  - Atendimento nacional via parcerias com 9 seguradoras
 *  - Cluster interno para páginas locais (/seguro-galpao-guarulhos,
 *    /seguro-galpao-cumbica, /seguro-galpoes-industriais e correlatas)
 *
 * Reaproveita o InsurancePageTemplate (Breadcrumb + BreadcrumbSchema +
 * FAQSchema já incluídos) e injeta um NeighborhoodHub como extraSection
 * apresentando as páginas filhas do cluster Galpão.
 */

const CLUSTER_LINKS = [
  { name: "Seguro de Galpão em Guarulhos", link: "/seguro-galpao-guarulhos", priceRange: "Hub local — todas as regiões" },
  { name: "Seguro de Galpão em Cumbica (GRU)", link: "/seguro-galpao-cumbica", priceRange: "Polo logístico aeroportuário" },
  { name: "Seguro Empresarial Cumbica", link: "/seguro-empresarial-cumbica", priceRange: "Indústrias e operadores" },
  { name: "Seguro Logística Guarulhos", link: "/seguro-logistica-guarulhos", priceRange: "Pacote integrado" },
  { name: "Seguro Galpões Industriais", link: "/seguro-galpoes-industriais", priceRange: "Atendimento nacional" },
  { name: "Seguro de Armazenagem", link: "/seguro-armazenagem", priceRange: "Mercadoria de terceiros" },
  { name: "Seguro de Transporte (RCTR-C)", link: "/seguro-transporte", priceRange: "Trânsito de carga" },
  { name: "Seguro Transportadora Guarulhos", link: "/seguro-transportadora-guarulhos", priceRange: "RCTR-C + frota + galpão" },
  { name: "Seguro Empresarial Guarulhos", link: "/seguro-empresarial-guarulhos", priceRange: "PME e médias empresas" },
];

/**
 * FAQs do hub: base com 9 perguntas estratégicas (nacional/cluster) +
 * enriquecimento por intenção de busca via banco central
 * (informational, transactional, comparison, technical, navigational).
 * Resultado: ~22 perguntas únicas no FAQPage Schema.
 */
const HUB_BASE_FAQS = [
  { question: "A Patro Seguros atende galpões em todo o Brasil ou só em Guarulhos?", answer: "Atendemos em todos os estados via parcerias com 9 seguradoras nacionais (Porto Seguro, Allianz, HDI, Tokio Marine, Bradesco, Sompo, Mapfre, Liberty e Zurich). A especialização hiperlocal está em Guarulhos/Cumbica, mas mais de 30% das apólices ativas são de galpões fora da região metropolitana de SP — atendimento e gestão 100% por WhatsApp e e-mail para clientes nacionais." },
  { question: "Quanto custa seguro de galpão no Brasil?", answer: "Varia muito por região e atividade. Para galpão padrão de 2.000m², alvenaria com telhado metálico, mercadoria média de R$ 3 milhões e LMI total de R$ 5 milhões, o seguro empresarial completo fica entre R$ 18.000 e R$ 40.000/ano dependendo da localização (Guarulhos/Cumbica, interior de SP, RJ, MG, PR, RS, NE) e proteção. A Patro cota com 9 seguradoras." },
  { question: "Por que escolher uma corretora de Guarulhos para um galpão em outro estado?", answer: "Por especialização técnica. Guarulhos/Cumbica é o maior polo logístico do Brasil — corretoras da região têm mais experiência em galpões, RC armazenagem e dimensionamento de LMI do que corretoras generalistas de outras praças. A regulação de sinistro e a relação com seguradoras é nacional, não local." },
  { question: "Quais seguradoras atendem galpões em todo o território nacional?", answer: "As 9 que a Patro coordena atendem nacionalmente: Porto Seguro Empresarial, Allianz Empresas, HDI Empresarial, Tokio Marine, Bradesco Riscos Patrimoniais, Sompo, Mapfre, Liberty e Zurich. Para galpões em capitais e regiões metropolitanas a oferta é completa; em municípios pequenos algumas seguradoras pedem vistoria técnica obrigatória." },
  { question: "Como funciona a vistoria técnica para galpão fora de Guarulhos?", answer: "Para LMI acima de R$ 5 milhões, a seguradora indica vistoriador credenciado na praça do galpão (custo arcado pela seguradora na apólice fechada). A Patro acompanha remotamente, valida o laudo e usa os apontamentos para argumentar coberturas e franquias melhores. Para LMI abaixo desse patamar, a vistoria geralmente é dispensada." },
  { question: "Seguro de galpão cobre mercadoria de terceiros (3PL e fulfillment)?", answer: "Apenas com cobertura específica de RC Armazenagem. Sem essa cobertura adicional, em sinistro envolvendo mercadoria de terceiros, a operadora responde com patrimônio próprio. Cobertura indispensável para 3PLs, fulfillment de marketplace, dark stores e armazéns gerais — em qualquer região do Brasil." },
  { question: "Como dimensionar corretamente o LMI do galpão?", answer: "O LMI deve cobrir: 100% do valor de reconstrução do imóvel + mercadoria média mais 30% para picos de estoque + 100% dos equipamentos + 6 a 12 meses de lucros cessantes. Subseguro (LMI menor que valor real) é a causa #1 de indenização parcial em sinistro de galpão. A Patro faz dimensionamento técnico em vistoria pré-cotação." },
  { question: "Galpão alugado precisa de seguro? Quem contrata, locador ou inquilino?", answer: "Geralmente os dois. O locador contrata seguro do imóvel (incêndio, vendaval, danos elétricos estruturais). O inquilino contrata seguro de conteúdo (mercadoria, equipamentos, lucros cessantes, RC operações). Contratos de locação bem feitos definem com clareza esse split — a Patro lê o contrato e ajusta as duas apólices para evitar gaps de cobertura." },
  { question: "Quanto tempo demora a indenização em sinistro grave de galpão?", answer: "Para sinistros bem documentados (com Patro acompanhando regulação), o prazo médio é 30 a 60 dias para liberação parcial e 90 a 120 dias para indenização final em sinistros grandes. Em mais de 140 apólices ativas, a taxa de indenização integral em sinistros graves foi de 92% nos últimos 5 anos." },
];

const HUB_FAQS = mergeGalpaoFAQs(HUB_BASE_FAQS, [
  "informational",
  "transactional",
  "comparison",
  "technical",
  "navigational",
]);

const SeguroGalpao = () => {
  return (
    <>
    <InsurancePageTemplate
      heroImage={heroImg}
      title="Seguro de Galpão Logístico"
       subtitle="Blindagem Estratégica para o Coração da sua Logística. Sua operação está realmente protegida contra interrupções?"
       description="O Seguro de Galpão Logístico da Patro Seguros é desenhado para converter riscos imprevistos em previsibilidade financeira. Para empresas que dependem de armazenagem e distribuição, o galpão é onde o faturamento acontece. Em regiões de alta densidade como Guarulhos, um sinistro não interrompe apenas uma operação local, mas pode comprometer toda uma cadeia de suprimentos."
       icon="🏗️"
       metaDescription="Seguro de Galpão Logístico em Guarulhos. Blindagem estratégica para condomínios logísticos, proprietários e inquilinos. Cotação e análise de risco rápida."
       detailedDescription="No mercado imobiliário logístico, a verdadeira tranquilidade vem de uma apólice que protege tanto o proprietário (locador) quanto o inquilino (locatário). Nossa consultoria avalia o contrato de locação para garantir que as cláusulas de seguro atendam exatamente ao que foi acordado, evitando multas e lacunas de proteção. Para galpões de grande porte, oferecemos apólices robustas de Riscos Nomeados e Operacionais (All-risks)."
       importantDetails={[
         {
           title: "Para o Proprietário (Locador): Proteção do Investimento",
           content: "O galpão é o seu ativo. Garantimos coberturas de incêndio, queda de raio e explosão para reconstrução do imóvel, além de perda de aluguel para manter seu fluxo de caixa enquanto o imóvel estiver em reforma após um sinistro."
         },
         {
           title: "Para o Inquilino (Locatário): Continuidade e Conformidade",
           content: "Protegemos seus estoques, móveis e maquinários (conteúdo). Incluímos a Responsabilidade Civil Locatário, salvaguardando sua empresa caso cause danos acidentais à estrutura do galpão, garantindo o cumprimento do contrato de aluguel."
         },
         {
           title: "O Ponto de Equilíbrio da Patro",
           content: "Ajustamos a Cláusula de Beneficiário: em caso de dano à estrutura, a indenização vai para o dono do imóvel; em caso de dano ao estoque ou interrupção de negócios, a indenização vai para o inquilino. Analisamos seu contrato para validar todas as cláusulas de seguro."
         }
       ]}
      coverages={[
        { title: "Incêndio, Raio e Explosão", description: "Cobertura básica obrigatória do imóvel e bens. Inclui despesas de combate, salvamento e remoção de escombros após sinistro." },
        { title: "Roubo e Furto Qualificado", description: "Mercadoria, equipamentos e bens subtraídos mediante arrombamento ou grave ameaça. Cobertura essencial em galpões com mercadoria de alto valor." },
        { title: "RC Armazenagem (Mercadoria de Terceiros)", description: "Indispensável para 3PL, fulfillment e operadores logísticos. Cobre danos à mercadoria de clientes sob custódia durante o armazenamento." },
        { title: "Danos Elétricos e Equipamentos", description: "Empilhadeiras elétricas, leitores de código, balanças, servidores, sistemas WMS e CFTV danificados por curto-circuito ou sobretensão." },
        { title: "RC Operações", description: "Responsabilidade civil por danos materiais e corporais a motoristas de carreta, vistoriadores, prestadores e visitantes dentro do galpão." },
        { title: "Lucros Cessantes (até 12 meses)", description: "Indenização do faturamento perdido durante reconstrução. Mantém a empresa viva enquanto o galpão é reformado após sinistro coberto." },
        { title: "Vendaval, Alagamento e Fumaça", description: "Cobertura para danos por vendaval, granizo, fumaça e alagamento por chuva intensa — fenômenos cada vez mais comuns no Brasil." },
        { title: "RC Ambiental (cargas perigosas)", description: "Vazamentos, derramamentos e contaminação por produtos químicos, combustíveis e cargas perigosas. Multas ambientais podem ultrapassar R$ 50 milhões." },
      ]}
      whoNeeds={[
        "Operadores logísticos (3PL, 4PL) e empresas de fulfillment em todo o Brasil",
        "Indústrias químicas, alimentícias, metalúrgicas e plásticas com galpão próprio",
        "E-commerces e dark stores com armazém próprio ou alugado",
        "Distribuidoras farmacêuticas, eletrônicos, bebidas e perfumaria",
        "Importadoras e exportadoras com armazém de carga aérea ou marítima",
        "Proprietários (locadores) de galpão que querem proteger o imóvel independente do inquilino",
        "Construtoras com galpões de obra e canteiros temporários",
      ]}
      whyPatro={[
        "Mais de 140 apólices de galpão ativas — especialistas no segmento desde 2008",
        "Especialização hiperlocal em Guarulhos/Cumbica + atendimento nacional via 9 seguradoras",
        "Vistoria técnica gratuita pré-cotação para galpões acima de R$ 5 mi de LMI",
        "Comparativo entre 9 seguradoras especializadas em risco patrimonial pesado",
        "Plantão 24/7 em sinistros graves — 92% de indenização integral nos últimos 5 anos",
        "Pacote integrado galpão + transporte (RCTR-C/RCF-DC) para cobrir armazenagem e trânsito",
        "Dimensionamento técnico de LMI com cláusula de pico sazonal (Black Friday e fim de ano)",
      ]}
      faqs={HUB_FAQS}
      relatedInsurances={[
        { title: "Seguro Galpões Industriais", link: "/seguro-galpoes-industriais" },
        { title: "Seguro Empresarial", link: "/seguro-empresarial" },
        { title: "Seguro de Armazenagem", link: "/seguro-armazenagem" },
        { title: "Seguro de Transporte (RCTR-C)", link: "/seguro-transporte" },
        { title: "Seguro Ambiental", link: "/seguro-ambiental" },
        { title: "Seguro Cyber", link: "/seguro-cyber" },
      ]}
      extraSections={
        <NeighborhoodHub
          source="seguro-galpao:cluster-hub"
          title="Páginas locais e correlatas do cluster Galpão"
          subtitle="Especialização hiperlocal em Guarulhos/Cumbica e cobertura nacional. Acesse a página específica para entender riscos, preços e seguradoras competitivas em cada cenário."
          neighborhoods={CLUSTER_LINKS}
        />
      }
    />
    <GalpaoStickyCTABar
      source="seguro-galpao-hub"
      whatsappMessage="Olá! Quero uma cotação de Seguro de Galpão (hub nacional Patro Seguros)."
    />
    </>
  );
};

export default SeguroGalpao;