import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import GalpaoStickyCTABar from "@/components/GalpaoStickyCTABar";
import heroImg from "@/assets/hero-seguro-galpoes.webp";

/**
 * FAQs específicas da página, com linguagem dependente do produto,
 * da seguradora e das condições da apólice.
 */
const INDUSTRIAL_BASE_FAQS = [
  { question: "O seguro pode proteger o conteúdo do galpão?", answer: "Pode ser analisado para estrutura, máquinas, equipamentos e mercadorias, desde que esses bens sejam aceitos, declarados e incluídos nas coberturas contratadas. Limites, franquias, eventos cobertos e exclusões dependem da apólice." },
  { question: "Quais informações influenciam a análise do seguro?", answer: "A análise pode considerar atividade, construção, localização, valores em risco, estoque, equipamentos, medidas de proteção e histórico do risco. A aceitação e a composição das coberturas dependem da seguradora e do produto." },
  { question: "O seguro pode contemplar paralisação da atividade?", answer: "Pode haver cobertura específica para interrupção ou lucros cessantes, mas ela não é automática. O alcance depende do evento coberto, dos limites, do período de indenização e das condições da apólice." },
  { question: "Quais informações podem ser solicitadas para cotar um galpão industrial?", answer: "Podem ser solicitados dados sobre endereço, atividade, estrutura, valores de construção, estoque, máquinas, equipamentos, medidas de proteção e operação. A lista varia conforme o risco e a seguradora." },
];

const SeguroGalpoesIndustriais = () => {
  return (
    <>
    <InsurancePageTemplate
      heroImage={heroImg}
      title="Seguro para Galpões Industriais"
      subtitle="Seguro para galpões industriais: análise de proteção patrimonial e operacional conforme o risco e a apólice"
      description="O seguro para galpões industriais pode analisar estrutura, máquinas, equipamentos, estoque e responsabilidades da operação. A composição depende da atividade, construção, localização, valores em risco, medidas de proteção, seguradora e condições da apólice. Coberturas e limites só devem ser considerados quando aceitos e contratados."
      detailedDescription={`## O que pode ser analisado no seguro para galpões industriais
Galpões industriais podem reunir estrutura, máquinas, equipamentos, estoque e responsabilidades operacionais. A análise deve separar os bens, os valores em risco e a atividade exercida para identificar as alternativas disponíveis.

## Como funciona a avaliação do risco
A seguradora pode considerar construção, localização, operação, medidas de proteção, histórico de ocorrências e características do estoque. A aceitação, os limites, as franquias e as exclusões dependem do produto e da apólice.

## O que depende da apólice
Coberturas como danos elétricos, vendaval, roubo, responsabilidade civil e interrupção da atividade só devem ser apresentadas quando previstas e contratadas. A Patro Seguros orienta a comparação das alternativas conforme o perfil do risco.`}
      icon="🏭"
      metaDescription="Seguro para galpões industriais: avalie proteção para estrutura, estoque, equipamentos, responsabilidade civil e paralisação conforme o risco e a apólice."
      coverages={[
        { title: "Incêndio, raio e explosão", description: "Pode ser analisada para a estrutura e o conteúdo conforme a apólice." },
        { title: "Vendaval e granizo", description: "Pode ser incluída conforme o risco, os limites e as condições contratadas." },
        { title: "Roubo e furto qualificado", description: "Pode contemplar mercadorias e equipamentos quando previsto no produto." },
        { title: "Danos elétricos", description: "Pode ser avaliada para máquinas e equipamentos conforme a apólice." },
        { title: "Responsabilidade civil", description: "Pode tratar de danos a terceiros conforme os eventos e limites contratados." },
        { title: "Interrupção da atividade", description: "Pode ser analisada por meio de cobertura específica, quando disponível e contratada." },
      ]}
      whoNeeds={[
        "Indústrias de todos os portes",
        "Empresas de logística e distribuição",
        "Proprietários de armazéns e centros de distribuição",
        "Empresas com estoque de alto valor",
      ]}
      whyPatro={[
        "Análise de risco personalizada para cada instalação",
        "Coberturas sob medida para o perfil industrial",
        "Orientação sobre alternativas para diferentes perfis de risco",
        "Acompanhamento na comunicação de eventual sinistro",
      ]}
      faqs={INDUSTRIAL_BASE_FAQS}
      relatedInsurances={[
        { title: "Máquinas Industriais", link: "/seguro-maquinas-industriais" },
        { title: "Seguro Empresarial", link: "/seguro-empresarial" },
        { title: "Seguro de Armazenagem", link: "/seguro-armazenagem" },
        { title: "Soluções empresariais", link: "/solucoes-empresariais" },
      ]}
    />
    <GalpaoStickyCTABar
      source="seguro-galpoes-industriais"
      whatsappMessage="Olá! Quero uma cotação de Seguro de Galpões Industriais com a Patro Seguros."
    />
    </>
  );
};

export default SeguroGalpoesIndustriais;
