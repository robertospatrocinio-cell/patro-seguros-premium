import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const SeguroFrota = () => {
  return (
    <InsurancePageTemplate
      title="Seguro de Frota"
      subtitle="Proteção especializada para múltiplos veículos da sua empresa"
      icon="🚛"
      metaDescription="Seguro de Frota empresarial com economia de até 40% vs seguros individuais. Gestão centralizada, relatórios e assistência 24h. Cotação grátis Patro Seguros."
      description="O Seguro de Frota é desenhado para empresas com múltiplos veículos. Oferece economia de escala, gestão centralizada e condições diferenciadas."
      detailedDescription={`Gerenciar seguros de veículos individuais é ineficiente e caro. Cada renovação, cada sinistro, cada inclusão ou exclusão de veículo exige processos separados. O Seguro de Frota resolve tudo isso com uma apólice única, gestão centralizada e economia significativa.

A principal vantagem financeira é clara: frotas pagam de 20% a 40% menos que a soma de seguros individuais. Isso acontece porque a seguradora avalia o risco do conjunto, diluindo sinistros pontuais no volume total. Além disso, a gestão centralizada gera relatórios de sinistralidade que permitem identificar padrões e implementar ações preventivas.

Na Patro Seguros, gerenciamos frotas de 5 a 500+ veículos, oferecendo relatórios gerenciais, análise de perfil por motorista, programas de prevenção e gestão completa de sinistros. Nossa equipe especializada acompanha cada veículo da frota, garantindo que sua operação nunca pare.`}
      howItWorks={[
        { step: "1", title: "Mapeamento da Frota", description: "Cadastramos todos os veículos, motoristas, regiões de operação e tipos de uso" },
        { step: "2", title: "Análise de Sinistralidade", description: "Avaliamos histórico de sinistros para dimensionar o risco e buscar as melhores condições" },
        { step: "3", title: "Proposta Centralizada", description: "Apresentamos proposta única com todas as coberturas, economia e condições especiais" },
        { step: "4", title: "Gestão Contínua", description: "Incluímos/excluímos veículos, geramos relatórios e acompanhamos sinistros durante toda a vigência" },
      ]}
      coverages={[
        { title: "Colisão, Roubo e Furto", description: "Proteção completa para todos os veículos da frota" },
        { title: "Responsabilidade Civil", description: "Cobertura para danos materiais e corporais a terceiros" },
        { title: "Assistência 24h para Frota", description: "Guincho, mecânico, elétrico com atendimento prioritário" },
        { title: "Veículo Reserva", description: "Substituição de veículos em manutenção ou sinistro" },
        { title: "Rastreamento e Monitoramento", description: "Descontos para frotas com rastreadores instalados" },
        { title: "Danos a Cargas", description: "Proteção para mercadorias transportadas" },
        { title: "Acidentes Pessoais de Ocupantes", description: "Cobertura para motoristas e passageiros" },
        { title: "Gerenciamento de Risco", description: "Relatórios e análises de sinistralidade da frota" },
      ]}
      coverageExclusions={[
        "Motoristas não cadastrados na apólice (sem cobertura ou franquia agravada)",
        "Veículos utilizados em competições ou provas de velocidade",
        "Desgaste natural e manutenção mecânica",
        "Uso de veículos para fins não declarados",
        "Danos causados por condutor sem habilitação adequada",
      ]}
      pricingInfo={{
        intro: "O custo do seguro de frota é calculado sobre o valor total da frota, com taxas que diminuem conforme o volume de veículos.",
        factors: [
          "Quantidade e tipos de veículos na frota",
          "Valor total da frota (soma de valores FIPE)",
          "Histórico de sinistralidade dos últimos 3-5 anos",
          "Região de operação e perfil dos motoristas",
          "Presença de rastreadores e dispositivos de segurança",
          "Programas de prevenção e direção defensiva implementados",
        ],
        note: "Uma frota de 20 veículos de passeio pode economizar de R$ 30.000 a R$ 80.000/ano comparado a seguros individuais. Frotas com baixa sinistralidade podem negociar bônus progressivos a cada renovação.",
      }}
      realScenarios={[
        { title: "Frota de delivery", description: "Uma empresa de delivery com 35 motos e 10 carros contratou seguro de frota com economia de 35% vs seguros individuais. Em 12 meses, teve 8 sinistros com gestão centralizada e sem impacto na operação." },
        { title: "Redução de sinistralidade", description: "Uma distribuidora com frota de 50 caminhões implementou programa de direção defensiva sugerido pela Patro. A sinistralidade caiu 40% em 2 anos, e o prêmio do seguro reduziu 25% na renovação." },
        { title: "Inclusão de veículos durante o ano", description: "Uma locadora adquiriu 15 veículos novos em outubro. Incluímos na apólice de frota em 24h, pagando apenas proporcional ao período restante." },
      ]}
      importantDetails={[
        { title: "Mínimo de veículos", content: "A partir de 3 a 5 veículos já é possível contratar seguro de frota. Quanto maior a frota, maiores os benefícios e economia." },
        { title: "Sinistralidade impacta renovação", content: "O índice de sinistralidade (relação entre prêmio pago e indenizações recebidas) impacta diretamente a renovação. Frotas com baixa sinistralidade negociam melhores condições." },
        { title: "Gestão de motoristas", content: "O cadastro de motoristas habituais é importante. Motoristas com bom histórico e habilitação adequada contribuem para melhor precificação da frota." },
      ]}
      tips={[
        "Implemente programa de direção defensiva — reduz sinistros e o custo do seguro nas renovações",
        "Mantenha rastreadores ativos em todos os veículos — economia no seguro e maior recuperação em caso de roubo",
        "Centralize a comunicação de sinistros com um responsável na empresa — agiliza processos e melhora o gerenciamento",
        "Avalie a inclusão de veículo reserva na apólice — minimiza impacto operacional de veículos em manutenção",
        "Negocie a renovação com 60 dias de antecedência para obter melhores condições",
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
        { question: "A partir de quantos veículos é considerado frota?", answer: "A partir de 3 a 5 veículos. Quanto maior a frota, maiores os benefícios e descontos." },
        { question: "Quanto economizo com seguro de frota?", answer: "A economia pode variar de 20% a 40% comparado a seguros individuais, dependendo do perfil e histórico de sinistros." },
        { question: "Posso adicionar veículos durante o ano?", answer: "Sim! Inclusão e exclusão é feita de forma ágil, pagando apenas a diferença proporcional." },
        { question: "Como funciona a gestão de sinistros?", answer: "Centralizamos todo o processo, gerando relatórios que ajudam a identificar padrões e reduzir sinistros futuros." },
        { question: "Preciso ter rastreador em todos os veículos?", answer: "Não é obrigatório, mas seguradoras oferecem descontos significativos para frotas com rastreamento." },
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
