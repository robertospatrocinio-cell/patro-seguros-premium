import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const SeguroRural = () => {
  return (
    <InsurancePageTemplate
      title="Seguro Rural"
      subtitle="Proteção completa para o agronegócio e atividades do campo"
      icon="🚜"
      description="O Seguro Rural protege produtores contra perdas na lavoura, pecuária, máquinas agrícolas e benfeitorias. Fenômenos climáticos, pragas, doenças e acidentes podem comprometer toda a produção. Com a Patro Seguros, você tem acesso a seguros agrícolas subsidiados pelo governo, pecuário, de máquinas e equipamentos, sempre com análise especializada para o setor do agronegócio."
      coverages={[
        {
          title: "Seguro Agrícola (PROAGRO Mais)",
          description: "Proteção para lavouras contra fenômenos climáticos adversos",
        },
        {
          title: "Seguro Pecuário",
          description: "Cobertura para morte de animais por doenças e acidentes",
        },
        {
          title: "Máquinas e Equipamentos Agrícolas",
          description: "Proteção para tratores, colheitadeiras e implementos",
        },
        {
          title: "Benfeitorias Rurais",
          description: "Cobertura para galpões, silos, estufas e instalações",
        },
        {
          title: "Produtos Agropecuários",
          description: "Proteção para grãos armazenados e produtos estocados",
        },
        {
          title: "Florestas Plantadas",
          description: "Cobertura para reflorestamento e silvicultura",
        },
        {
          title: "Aquicultura",
          description: "Seguro para criação de peixes e camarões",
        },
        {
          title: "Penhor Rural",
          description: "Garantia para financiamentos e custeios rurais",
        },
      ]}
      whoNeeds={[
        "Produtores rurais de grãos e culturas",
        "Pecuaristas e criadores de animais",
        "Agricultores familiares",
        "Empresas do agronegócio",
        "Silvicultores e produtores florestais",
        "Aquicultores e piscicultores",
      ]}
      whyPatro={[
        "Conhecimento do setor rural e suas especificidades",
        "Acesso a seguros com subsídio do governo federal",
        "Orientação sobre documentação e processos do MAPA",
        "Análise de riscos climatológicos por região",
        "Suporte completo em sinistros com vistoria técnica",
        "Parcerias com seguradoras especializadas no agro",
      ]}
      faqs={[
        {
          question: "O que é o subsídio do governo no seguro rural?",
          answer: "O governo federal subsidia parte do prêmio do seguro agrícola (até 40% em alguns casos), tornando-o mais acessível aos produtores.",
        },
        {
          question: "Como funciona o seguro agrícola?",
          answer: "Protege contra perdas na produção por fenômenos como seca, geada, granizo, excesso de chuva, pragas e doenças. A indenização é baseada na produtividade esperada.",
        },
        {
          question: "Posso segurar animais?",
          answer: "Sim! O seguro pecuário cobre morte de bovinos, equinos, suínos e outros animais por doenças, acidentes, raios e outros eventos cobertos.",
        },
        {
          question: "Quanto custa o seguro rural?",
          answer: "Varia conforme a cultura, localização, histórico da região e nível de cobertura. Com subsídio governamental, fica significativamente mais acessível.",
        },
        {
          question: "Preciso comprovar perdas?",
          answer: "Sim. Em caso de sinistro, um perito agrônomo faz vistoria no local para constatar e mensurar as perdas. Acompanhamos todo o processo.",
        },
      ]}
      relatedInsurances={[
        { title: "Seguro de Máquinas", link: "/seguro-maquinas" },
        { title: "Seguro Empresarial", link: "/seguro-empresarial" },
        { title: "Seguro de Transporte", link: "/seguro-transporte" },
        { title: "Seguro Ambiental", link: "/seguro-ambiental" },
      ]}
    />
  );
};

export default SeguroRural;
