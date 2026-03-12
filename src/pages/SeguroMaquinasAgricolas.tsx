import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const SeguroMaquinasAgricolas = () => {
  return (
    <InsurancePageTemplate
      title="Seguro de Máquinas Agrícolas — Proteção para o Agronegócio"
      subtitle="Proteja tratores, colheitadeiras, plantadeiras e todo seu maquinário agrícola contra riscos e prejuízos."
      description="O Seguro de Máquinas Agrícolas da Patro Seguros é a solução completa para proteger o patrimônio do produtor rural. Cobrimos tratores, colheitadeiras, plantadeiras, pulverizadores e outros equipamentos essenciais para a produção agrícola. Com a Patro, você conta com a expertise de quem entende do agronegócio e oferece as melhores condições do mercado."
      icon="🚜"
      badge="Especialistas no Agro"
      coverages={[
        { title: "Incêndio e Explosão", description: "Proteção contra danos causados por incêndio, raio e explosão nas máquinas agrícolas." },
        { title: "Roubo e Furto", description: "Cobertura contra roubo e furto qualificado de tratores e colheitadeiras." },
        { title: "Colisão e Capotamento", description: "Proteção contra acidentes durante operação e transporte das máquinas." },
        { title: "Danos Elétricos", description: "Cobertura para danos causados por curto-circuito e oscilação de energia." },
        { title: "Fenômenos Naturais", description: "Proteção contra vendaval, granizo, inundação e alagamento." },
        { title: "Responsabilidade Civil", description: "Cobertura para danos causados a terceiros durante a operação." },
      ]}
      whoNeeds={[
        "Produtores rurais de pequeno, médio e grande porte",
        "Cooperativas agrícolas",
        "Empresas de prestação de serviços agrícolas",
        "Proprietários de tratores e colheitadeiras",
      ]}
      whyPatro={[
        "Especialistas em seguros para o agronegócio",
        "Parceria com seguradoras líderes no segmento rural",
        "Coberturas personalizadas para cada tipo de máquina",
        "Agilidade na regulação de sinistros no campo",
      ]}
      faqs={[
        { question: "Quanto custa o seguro de trator?", answer: "O valor depende do modelo, ano, valor de mercado e coberturas escolhidas. Solicite uma cotação gratuita e personalizada." },
        { question: "O seguro cobre colheitadeira em operação?", answer: "Sim, o seguro pode cobrir danos durante a operação no campo, incluindo colisão e capotamento." },
        { question: "Posso segurar máquinas financiadas?", answer: "Sim, máquinas financiadas podem e devem ser seguradas. O seguro protege tanto o proprietário quanto a instituição financeira." },
      ]}
      relatedInsurances={[
        { title: "Equipamentos Agrícolas", link: "/seguro-equipamentos-agricolas" },
        { title: "Seguro Rural", link: "/seguro-rural" },
        { title: "Máquinas Industriais", link: "/seguro-maquinas-industriais" },
      ]}
    />
  );
};

export default SeguroMaquinasAgricolas;
