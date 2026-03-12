import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const SeguroTransporteAgro = () => {
  return (
    <InsurancePageTemplate
      title="Seguro Transporte Agrícola"
      subtitle="Proteção completa para o transporte de grãos, insumos e produtos do campo"
      icon="🚛"
      badge="Especialistas no Agro"
      description="O transporte de produtos agrícolas — grãos, sementes, fertilizantes, defensivos, café, frutas e cargas vivas — envolve riscos significativos como tombamento, roubo de carga, acidentes rodoviários e danos por condições climáticas. O Seguro Transporte Agrícola da Patro Seguros garante proteção integral para sua carga do campo até o destino final, seja armazém, porto ou indústria. Proteja sua safra e seu investimento com quem entende do agronegócio."
      coverages={[
        {
          title: "Roubo e Furto de Carga",
          description: "Proteção contra roubo, furto qualificado e desaparecimento de carga durante o transporte rodoviário",
        },
        {
          title: "Tombamento e Colisão",
          description: "Cobertura para danos à carga causados por acidentes com o veículo transportador",
        },
        {
          title: "Avarias e Contaminação",
          description: "Proteção contra danos físicos, contaminação cruzada e deterioração da carga durante o trajeto",
        },
        {
          title: "Fenômenos Naturais",
          description: "Cobertura para perdas causadas por enchentes, raios, vendavais e granizo durante o transporte",
        },
        {
          title: "Incêndio e Explosão",
          description: "Proteção contra incêndio, combustão espontânea e explosão do veículo ou da carga",
        },
        {
          title: "RCTR-C (Responsabilidade Civil do Transportador)",
          description: "Seguro obrigatório que cobre a responsabilidade do transportador sobre a carga de terceiros",
        },
        {
          title: "Carga em Trânsito e Parada",
          description: "Proteção durante todo o percurso, incluindo paradas para descanso, abastecimento e pernoite",
        },
        {
          title: "Transbordo e Baldeação",
          description: "Cobertura durante operações de transferência da carga entre veículos ou modais",
        },
      ]}
      whoNeeds={[
        "Produtores rurais que transportam safra própria",
        "Transportadoras de grãos e commodities agrícolas",
        "Cooperativas e cerealistas",
        "Empresas de logística e fretamento rural",
        "Distribuidores de insumos agrícolas (fertilizantes e defensivos)",
        "Exportadores com transporte até portos",
        "Transportadores de café, açúcar, soja, milho e algodão",
        "Empresas de transporte de carga viva (gado, aves, suínos)",
      ]}
      whyPatro={[
        "Especialistas em seguros para o agronegócio",
        "Coberturas personalizadas por tipo de carga e rota",
        "Cotação gratuita com as melhores seguradoras do mercado",
        "Atendimento consultivo com conhecimento do setor agro",
        "Agilidade na emissão da apólice e no atendimento de sinistros",
        "Condições especiais para transporte recorrente e safras",
        "Suporte completo em todo o processo de sinistro",
      ]}
      faqs={[
        {
          question: "O seguro de transporte agrícola é obrigatório?",
          answer: "O RCTR-C (Responsabilidade Civil do Transportador Rodoviário de Carga) é obrigatório para transportadoras. Para o embarcador (dono da carga), o seguro não é obrigatório, mas é altamente recomendado para proteger o investimento da safra.",
        },
        {
          question: "O que é a diferença entre seguro do embarcador e do transportador?",
          answer: "O seguro do embarcador protege o dono da carga contra perdas durante o transporte. Já o RCTR-C protege o transportador contra sua responsabilidade sobre a carga de terceiros. Idealmente, ambos devem estar segurados.",
        },
        {
          question: "O seguro cobre roubo de carga de grãos?",
          answer: "Sim. O roubo de carga é uma das coberturas mais importantes, especialmente para transporte de soja, milho, café e outros produtos de alto valor. A cobertura vale durante todo o trajeto, incluindo paradas.",
        },
        {
          question: "Quanto custa o seguro de transporte agrícola?",
          answer: "O valor varia conforme o tipo de carga, valor, trajeto e frequência de transporte. Em geral, o custo representa entre 0,1% e 0,5% do valor da carga por viagem. Faça uma cotação gratuita com a Patro Seguros.",
        },
        {
          question: "O seguro cobre transporte de defensivos e fertilizantes?",
          answer: "Sim. Existem coberturas específicas para transporte de insumos agrícolas, incluindo produtos classificados como perigosos, com proteção para responsabilidade ambiental em caso de vazamento.",
        },
        {
          question: "Posso fazer seguro por viagem ou precisa ser anual?",
          answer: "As duas modalidades existem: apólice avulsa (por viagem) e apólice aberta (para embarques frequentes durante o ano). Para produtores com transporte recorrente, a apólice aberta é mais vantajosa.",
        },
      ]}
      relatedInsurances={[
        { title: "Seguro Armazenagem", link: "/seguro-armazenagem" },
        { title: "Seguro de Transporte", link: "/seguro-transporte" },
        { title: "Máquinas Agrícolas", link: "/seguro-maquinas-agricolas" },
        { title: "Seguro Pecuário", link: "/seguro-pecuario" },
      ]}
    />
  );
};

export default SeguroTransporteAgro;
