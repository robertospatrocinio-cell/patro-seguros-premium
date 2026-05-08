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
            title: "Análise de Risco em Hubs Logísticos",
            content: "Estar em Guarulhos exige análise específica: proximidade com o aeroporto (GRU), rodovias Dutra/Fernão Dias e sistemas de combate a incêndio (Sprinklers e Hidrantes) que reduzem o custo da apólice."
          },
          {
            title: "Ponto de Equilíbrio: Proprietário vs Inquilino",
            content: "Ajustamos a Cláusula de Beneficiário para que indenizações estruturais vão ao locador e indenizações de estoque/lucros ao locatário, validando todas as cláusulas contratuais."
          },
          {
            title: "Nota Técnica: Riscos Operacionais",
            content: "Para galpões Classe A e operações complexas, implementamos apólices de Riscos Nomeados e Operacionais (All-risks), oferecendo a proteção mais robusta do mercado."
          }
        ]}
       coverages={[
         { title: "Incêndio, Raio e Explosão", description: "Proteção essencial para garantir a reconstrução física do imóvel e preservação do ativo." },
         { title: "Lucros Cessantes", description: "Se o galpão parar, o seguro cobre as despesas fixas e o lucro cessante durante o período de reparo." },
         { title: "Danos Elétricos", description: "Cobertura crítica para galpões automatizados com esteiras, CLPs, servidores e sistemas WMS." },
         { title: "RC Operações", description: "Proteção contra danos a terceiros, prestadores e bens de clientes no perímetro do imóvel." },
         { title: "Vendaval e Granizo", description: "Essencial para estruturas de grandes metragens de telhado, comuns em hubs logísticos." },
         { title: "RC Armazenagem", description: "Indispensável para 3PL e fulfillment. Cobre danos à mercadoria de terceiros sob sua custódia." },
         { title: "Roubo e Furto Qualificado", description: "Proteção para estoques de alto valor, maquinários e equipamentos contra subtração mediante arrombamento." },
         { title: "RC Ambiental", description: "Vazamentos ou contaminação por produtos químicos e combustíveis. Cobertura crítica para logística pesada." },
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