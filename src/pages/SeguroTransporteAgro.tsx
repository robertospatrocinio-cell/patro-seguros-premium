import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const SeguroTransporteAgro = () => {
  return (
    <InsurancePageTemplate
      title="Seguro Transporte Agrícola"
      subtitle="Proteção completa para o transporte de grãos, insumos e produtos do campo. Atendemos transportadores de todos os estados do Brasil."
      icon="🚛"
      metaDescription="Seguro Transporte Agrícola em todo o Brasil — proteção para transporte de grãos, insumos e cargas do campo. Cobertura contra roubo e tombamento. Cotação grátis Patro Seguros."
      badge="Atendimento em Todo o Brasil"
      description="O transporte de produtos agrícolas — grãos, sementes, fertilizantes, defensivos, café, frutas e cargas vivas — envolve riscos significativos como tombamento, roubo de carga, acidentes rodoviários e danos por condições climáticas. O Seguro Transporte Agrícola da Patro Seguros garante proteção integral para sua carga do campo até o destino final, seja armazém, porto ou indústria. Atendemos transportadores e produtores de todos os estados do Brasil — todo o processo de cotação e sinistro é feito de forma remota, por WhatsApp, telefone ou e-mail."
      coverages={[
        { title: "Roubo e Furto de Carga", description: "Proteção contra roubo, furto qualificado e desaparecimento de carga durante o transporte rodoviário" },
        { title: "Tombamento e Colisão", description: "Cobertura para danos à carga causados por acidentes com o veículo transportador" },
        { title: "Avarias e Contaminação", description: "Proteção contra danos físicos, contaminação cruzada e deterioração da carga durante o trajeto" },
        { title: "Fenômenos Naturais", description: "Cobertura para perdas causadas por enchentes, raios, vendavais e granizo durante o transporte" },
        { title: "Incêndio e Explosão", description: "Proteção contra incêndio, combustão espontânea e explosão do veículo ou da carga" },
        { title: "RCTR-C (Responsabilidade Civil do Transportador)", description: "Seguro obrigatório que cobre a responsabilidade do transportador sobre a carga de terceiros" },
        { title: "Carga em Trânsito e Parada", description: "Proteção durante todo o percurso, incluindo paradas para descanso, abastecimento e pernoite" },
        { title: "Transbordo e Baldeação", description: "Cobertura durante operações de transferência da carga entre veículos ou modais" },
      ]}
      whoNeeds={[
        "Produtores rurais que transportam safra própria em qualquer estado",
        "Transportadoras de grãos e commodities em todo o Brasil",
        "Cooperativas e cerealistas de todas as regiões",
        "Empresas de logística e fretamento rural",
        "Distribuidores de insumos agrícolas (fertilizantes e defensivos)",
        "Exportadores com transporte até portos",
        "Transportadores de café, açúcar, soja, milho e algodão",
        "Empresas de transporte de carga viva (gado, aves, suínos)",
      ]}
      whyPatro={[
        "Atendemos transportadores de todos os estados do Brasil",
        "Especialistas em seguros para o agronegócio",
        "Coberturas personalizadas por tipo de carga e rota",
        "Cotação gratuita e 100% remota — por WhatsApp, telefone ou e-mail",
        "Atendimento consultivo com conhecimento do setor agro",
        "Agilidade na emissão da apólice e no atendimento de sinistros",
        "Condições especiais para transporte recorrente e safras",
      ]}
      faqs={[
        { question: "A Patro atende transportadores de outros estados?", answer: "Sim! Atendemos transportadores e produtores rurais de todos os estados do Brasil. O processo é 100% remoto — cotação, emissão e sinistro por WhatsApp, telefone ou e-mail." },
        { question: "O seguro de transporte agrícola é obrigatório?", answer: "O RCTR-C é obrigatório para transportadoras. Para o embarcador (dono da carga), o seguro não é obrigatório, mas é altamente recomendado." },
        { question: "O seguro cobre roubo de carga de grãos?", answer: "Sim. O roubo de carga é uma das coberturas mais importantes, especialmente para transporte de soja, milho, café e outros produtos de alto valor." },
        { question: "Quanto custa o seguro de transporte agrícola?", answer: "O valor varia conforme o tipo de carga, valor, trajeto e frequência. Em geral, o custo representa entre 0,1% e 0,5% do valor da carga por viagem." },
        { question: "Posso fazer seguro por viagem ou precisa ser anual?", answer: "As duas modalidades existem: apólice avulsa (por viagem) e apólice aberta (para embarques frequentes). Para transporte recorrente, a apólice aberta é mais vantajosa." },
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