import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-seguro-maquinas.webp";

const SeguroMaquinasIndustriais = () => {
  return (
    <InsurancePageTemplate
      heroImage={heroImg}
      title="Seguro de Máquinas Industriais"
      subtitle="Proteção para máquinas, equipamentos e linhas de produção contra quebra, incêndio e danos operacionais."
      description="Seguro de Máquinas Industriais: proteção para tornos CNC, injetoras e prensas contra quebra e danos elétricos. Garanta que sua produção não pare em Guarulhos."
      icon="⚙️"
      metaDescription="Seguro de Máquinas Industriais: tornos, prensas e injetoras. Cobertura contra quebra, incêndio e danos elétricos. Cotação grátis na Patro Seguros."
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
