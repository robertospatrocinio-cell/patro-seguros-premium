import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const SeguroFrota = () => {
  return (
    <InsurancePageTemplate
      title="Seguro de Frota"
      subtitle="Proteção especializada para múltiplos veículos da sua empresa"
      icon="🚛"
      metaDescription="Seguro de Frota empresarial com economia de até 40% vs seguros individuais. Gestão centralizada, relatórios e assistência 24h. Cotação grátis Patro Seguros."
      description="O Seguro de Frota é desenhado especificamente para empresas que possuem múltiplos veículos. Oferece coberturas similares ao seguro auto, mas com condições e gestão diferenciadas, adequadas para operações empresariais. Com a Patro Seguros, você tem gestão centralizada, economia de escala, relatórios de sinistralidade e suporte especializado para manter sua operação sempre rodando."
      coverages={[
        {
          title: "Colisão, Roubo e Furto",
          description: "Proteção completa para todos os veículos da frota",
        },
        {
          title: "Responsabilidade Civil",
          description: "Cobertura para danos materiais e corporais a terceiros",
        },
        {
          title: "Assistência 24h para Frota",
          description: "Guincho, mecânico, elétrico com atendimento prioritário",
        },
        {
          title: "Veículo Reserva",
          description: "Substituição de veículos em manutenção ou sinistro",
        },
        {
          title: "Rastreamento e Monitoramento",
          description: "Descontos para frotas com rastreadores instalados",
        },
        {
          title: "Danos a Cargas",
          description: "Proteção para mercadorias transportadas (conforme modalidade)",
        },
        {
          title: "Acidentes Pessoais de Ocupantes",
          description: "Cobertura para motoristas e passageiros",
        },
        {
          title: "Gerenciamento de Risco",
          description: "Relatórios e análises de sinistralidade da frota",
        },
      ]}
      whoNeeds={[
        "Empresas com 5 ou mais veículos",
        "Transportadoras e logísticas",
        "Empresas de delivery e distribuição",
        "Locadoras de veículos",
        "Prestadores de serviços com frotas",
        "Empresas com veículos comerciais diversos",
      ]}
      whyPatro={[
        "Economia significativa vs seguros individuais",
        "Gestão centralizada de apólices e sinistros",
        "Análise de perfil de risco por motorista",
        "Implementação de programas de direção defensiva",
        "Relatórios gerenciais de sinistralidade",
        "Renovação facilitada com histórico consolidado",
      ]}
      faqs={[
        {
          question: "A partir de quantos veículos é considerado frota?",
          answer: "A partir de 3 a 5 veículos já é possível contratar seguro de frota. Quanto maior a frota, maiores os benefícios e descontos.",
        },
        {
          question: "Quanto economizo com seguro de frota?",
          answer: "A economia pode variar de 20% a 40% comparado a seguros individuais, dependendo do perfil da frota e histórico de sinistros.",
        },
        {
          question: "Posso adicionar veículos durante o ano?",
          answer: "Sim! A inclusão e exclusão de veículos é feita de forma ágil, pagando apenas a diferença proporcional.",
        },
        {
          question: "Como funciona a gestão de sinistros?",
          answer: "Centralizamos todo o processo, gerando relatórios que ajudam a identificar padrões e reduzir sinistros futuros.",
        },
        {
          question: "Preciso ter rastreador em todos os veículos?",
          answer: "Não é obrigatório, mas seguradoras oferecem descontos significativos para frotas com rastreamento. Analisamos a viabilidade para você.",
        },
      ]}
      relatedInsurances={[
        { title: "Seguro de Transporte", link: "/seguro-transporte" },
        { title: "Seguro Empresarial", link: "/seguro-empresarial" },
        { title: "Seguro RC", link: "/seguro-rc" },
      ]}
    />
  );
};

export default SeguroFrota;
