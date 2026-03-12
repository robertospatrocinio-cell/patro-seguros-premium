import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const SeguroCafe = () => {
  return (
    <InsurancePageTemplate
      title="Seguro Café — Proteção para sua Lavoura Cafeeira"
      subtitle="Proteja sua produção de café contra geada, seca, granizo e outros riscos climáticos."
      description="O Seguro Café da Patro Seguros é a proteção ideal para cafeicultores. Cobrimos perdas na lavoura causadas por fenômenos climáticos adversos como geada, seca prolongada, granizo e excesso de chuva. Com subsídio do governo federal e análise especializada, garantimos as melhores condições para proteger sua safra."
      icon="☕"
      badge="Especialistas no Agro"
      coverages={[
        { title: "Geada", description: "Proteção contra perdas causadas por geada na lavoura de café." },
        { title: "Seca e Estiagem", description: "Cobertura para perdas por seca prolongada e déficit hídrico." },
        { title: "Granizo", description: "Proteção contra danos causados por chuva de granizo." },
        { title: "Excesso de Chuva", description: "Cobertura para perdas por excesso de precipitação." },
        { title: "Incêndio e Raio", description: "Proteção contra incêndio e raio na lavoura." },
        { title: "Ventos Fortes", description: "Cobertura contra danos causados por vendaval e tromba d'água." },
      ]}
      whoNeeds={[
        "Cafeicultores de arábica e conilon",
        "Produtores de café especial",
        "Cooperativas de café",
        "Empresas de produção cafeeira",
      ]}
      whyPatro={[
        "Conhecimento das especificidades da cafeicultura",
        "Acesso a seguros com subsídio do governo federal",
        "Análise de riscos climáticos regionais",
        "Suporte completo na regulação de sinistros agrícolas",
      ]}
      faqs={[
        { question: "O seguro café cobre geada?", answer: "Sim, a geada é uma das principais coberturas do seguro café, protegendo contra perdas na lavoura." },
        { question: "Tem subsídio do governo?", answer: "Sim, o governo federal oferece subsídio de até 40% no prêmio do seguro agrícola para café." },
        { question: "Quanto custa o seguro café?", answer: "O valor varia conforme a área plantada, região, variedade e coberturas escolhidas. Solicite uma cotação gratuita." },
      ]}
      relatedInsurances={[
        { title: "Seguro Pecuário", link: "/seguro-pecuario" },
        { title: "Seguro Armazenagem", link: "/seguro-armazenagem" },
        { title: "Máquinas Agrícolas", link: "/seguro-maquinas-agricolas" },
      ]}
    />
  );
};

export default SeguroCafe;
