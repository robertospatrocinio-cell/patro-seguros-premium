import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const SeguroMaquinasIndustriais = () => {
  return (
    <InsurancePageTemplate
      title="Seguro de Máquinas Industriais"
      subtitle="Proteção para máquinas, equipamentos e linhas de produção contra quebra, incêndio e danos operacionais."
      description="O Seguro de Máquinas Industriais protege seu maquinário contra riscos que podem paralisar a produção e causar prejuízos significativos. Cobrimos tornos, prensas, injetoras, compressores e todo tipo de equipamento industrial."
      icon="⚙️"
      coverages={[
        { title: "Quebra de Máquinas", description: "Cobertura para defeitos mecânicos, elétricos e falhas operacionais." },
        { title: "Incêndio e Explosão", description: "Proteção contra incêndio, raio e explosão." },
        { title: "Danos Elétricos", description: "Cobertura para curto-circuito e sobrecarga elétrica." },
        { title: "Lucros Cessantes", description: "Proteção financeira durante parada por sinistro." },
      ]}
      whoNeeds={[
        "Indústrias de manufatura e transformação",
        "Empresas com equipamentos de alto valor",
        "Fábricas com linhas de produção contínua",
        "Empresas que não podem parar a produção",
      ]}
      whyPatro={[
        "Especialização em seguros industriais",
        "Análise técnica do maquinário",
        "Coberturas complementares personalizadas",
        "Parceria com seguradoras especializadas",
      ]}
      faqs={[
        { question: "O seguro cobre erro de operação?", answer: "Depende da cobertura contratada. Algumas apólices incluem danos por imperícia do operador." },
        { question: "Máquinas CNC podem ser seguradas?", answer: "Sim, máquinas CNC, tornos, prensas e qualquer equipamento industrial pode ser incluído na apólice." },
      ]}
      relatedInsurances={[
        { title: "Galpões Industriais", link: "/seguro-galpoes-industriais" },
        { title: "Seguro Empresarial", link: "/seguro-empresarial" },
        { title: "Seguro Engenharia", link: "/seguro-engenharia" },
      ]}
    />
  );
};

export default SeguroMaquinasIndustriais;
