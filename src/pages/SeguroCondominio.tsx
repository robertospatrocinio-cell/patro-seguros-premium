import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const SeguroCondominio = () => {
  return (
    <InsurancePageTemplate
      title="Seguro Condomínio"
      subtitle="Proteção completa para áreas comuns e patrimônio coletivo"
      icon="🏢"
      metaDescription="Seguro Condomínio para áreas comuns, equipamentos e RC. Proteção contra incêndio, danos elétricos e acidentes com moradores. Cotação grátis Patro Seguros."
      description="O Seguro Condomínio protege as áreas comuns, equipamentos coletivos e a responsabilidade civil do condomínio contra diversos riscos. Incêndios, danos elétricos, responsabilidade civil e acidentes podem gerar prejuízos significativos que seriam rateados entre condôminos. Com a Patro Seguros, seu condomínio tem proteção adequada com valores acessíveis e gestão especializada."
      coverages={[
        {
          title: "Incêndio e Raio",
          description: "Cobertura para danos causados por fogo nas áreas comuns",
        },
        {
          title: "Danos Elétricos",
          description: "Proteção para equipamentos coletivos (elevadores, bombas, portões)",
        },
        {
          title: "Responsabilidade Civil",
          description: "Cobre acidentes com moradores, visitantes e funcionários",
        },
        {
          title: "Roubo de Bens Comuns",
          description: "Proteção para móveis, equipamentos e valores do condomínio",
        },
        {
          title: "Quebra de Vidros",
          description: "Cobertura para vidraças, espelhos e fachadas",
        },
        {
          title: "Vendaval e Fenômenos Naturais",
          description: "Proteção contra danos climáticos",
        },
        {
          title: "Acidentes Pessoais para Funcionários",
          description: "Cobertura para porteiros, zeladores e outros empregados",
        },
        {
          title: "Equipamentos Eletrônicos",
          description: "Proteção para interfones, câmeras e sistemas de segurança",
        },
      ]}
      whoNeeds={[
        "Condomínios residenciais verticais",
        "Condomínios comerciais",
        "Condomínios mistos",
        "Loteamentos fechados",
        "Condomínios industriais",
        "Shopping centers e centros comerciais",
      ]}
      whyPatro={[
        "Análise das áreas comuns e bens coletivos",
        "Orientação sobre valores adequados de cobertura",
        "Suporte em assembleias para aprovação",
        "Gestão simplificada de apólices e renovações",
        "Atendimento rápido em sinistros",
        "Parcerias com seguradoras especializadas em condomínios",
      ]}
      faqs={[
        {
          question: "Quem contrata o seguro do condomínio?",
          answer: "O síndico ou a administradora, com aprovação em assembleia. O custo é rateado entre os condôminos através do rateio mensal.",
        },
        {
          question: "O que não é coberto pelo seguro do condomínio?",
          answer: "Geralmente não cobre o interior das unidades privativas. Cada morador deve ter seu próprio seguro residencial.",
        },
        {
          question: "Quanto custa o seguro de condomínio?",
          answer: "Depende do porte, localização, idade do prédio, equipamentos existentes e coberturas desejadas. Fazemos cotação detalhada.",
        },
        {
          question: "É obrigatório ter seguro de condomínio?",
          answer: "Não é legalmente obrigatório, mas é altamente recomendado e muitas convenções de condomínio estabelecem como obrigatório.",
        },
        {
          question: "Cobre acidentes com visitantes?",
          answer: "Sim! A Responsabilidade Civil do condomínio cobre acidentes com moradores, visitantes, prestadores de serviço e qualquer pessoa nas áreas comuns.",
        },
      ]}
      relatedInsurances={[
        { title: "Seguro Residencial", link: "/seguro-residencial" },
        { title: "Seguro Empresarial", link: "/seguro-empresarial" },
        { title: "Seguro RC", link: "/seguro-rc" },
      ]}
    />
  );
};

export default SeguroCondominio;
