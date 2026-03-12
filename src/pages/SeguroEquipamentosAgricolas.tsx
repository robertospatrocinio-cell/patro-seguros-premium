import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const SeguroEquipamentosAgricolas = () => {
  return (
    <InsurancePageTemplate
      title="Seguro de Equipamentos Agrícolas"
      subtitle="Proteção completa para implementos, pulverizadores, irrigação e equipamentos de precisão."
      description="O Seguro de Equipamentos Agrícolas protege seus implementos e ferramentas essenciais para a produção. Desde sistemas de irrigação até GPS agrícola e drones, oferecemos coberturas sob medida para garantir a continuidade da sua operação no campo."
      icon="⚙️"
      metaDescription="Seguro de Equipamentos Agrícolas — implementos, pulverizadores, irrigação e GPS agrícola. Proteção completa para o campo. Cotação grátis Patro Seguros."
      coverages={[
        { title: "Incêndio e Raio", description: "Proteção contra incêndio, raio e explosão nos equipamentos." },
        { title: "Roubo e Furto", description: "Cobertura contra roubo e furto qualificado." },
        { title: "Danos Acidentais", description: "Proteção contra danos durante transporte e operação." },
        { title: "Vendaval e Granizo", description: "Cobertura para fenômenos naturais." },
      ]}
      whoNeeds={[
        "Produtores rurais que utilizam tecnologia no campo",
        "Empresas de agricultura de precisão",
        "Cooperativas e associações rurais",
        "Prestadores de serviços agrícolas",
      ]}
      whyPatro={[
        "Conhecimento profundo do setor agrícola",
        "Coberturas específicas para cada tipo de equipamento",
        "Atendimento ágil mesmo em áreas rurais",
        "Melhores condições com seguradoras especializadas",
      ]}
      faqs={[
        { question: "O seguro cobre drones agrícolas?", answer: "Sim, é possível incluir drones e equipamentos de agricultura de precisão na apólice." },
        { question: "Equipamentos alugados podem ser segurados?", answer: "Sim, equipamentos alugados ou em comodato podem ser incluídos na cobertura." },
      ]}
      relatedInsurances={[
        { title: "Máquinas Agrícolas", link: "/seguro-maquinas-agricolas" },
        { title: "Seguro Rural", link: "/seguro-rural" },
      ]}
    />
  );
};

export default SeguroEquipamentosAgricolas;
