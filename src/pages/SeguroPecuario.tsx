import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const SeguroPecuario = () => {
  return (
    <InsurancePageTemplate
      title="Seguro Pecuário — Proteção para seu Rebanho"
      subtitle="Proteja bovinos, equinos, suínos e outros animais contra morte por doenças, acidentes e fenômenos naturais."
      description="O Seguro Pecuário da Patro Seguros oferece proteção completa para o seu rebanho. Cobrimos morte de animais por doenças, acidentes, raios, afogamento e outros eventos, garantindo a segurança do seu investimento na pecuária. Com subsídio do governo federal, o seguro fica ainda mais acessível."
      icon="🐄"
      metaDescription="Seguro Pecuário para bovinos, equinos e suínos. Proteção contra morte por doenças, acidentes e raios. Subsídio do governo. Cotação grátis Patro Seguros."
      badge="Especialistas no Agro"
      coverages={[
        { title: "Morte por Doença", description: "Cobertura para morte de animais causada por doenças cobertas pela apólice." },
        { title: "Morte Acidental", description: "Proteção contra morte por acidentes, quedas e traumatismos." },
        { title: "Raio e Fenômenos Naturais", description: "Cobertura para morte causada por raio, inundação e vendaval." },
        { title: "Afogamento", description: "Proteção contra morte por afogamento em rios, lagos e açudes." },
        { title: "Incêndio e Explosão", description: "Cobertura para perdas causadas por incêndio em confinamentos e pastagens." },
        { title: "Parto e Complicações", description: "Proteção contra morte durante o parto e complicações pós-parto." },
      ]}
      whoNeeds={[
        "Pecuaristas de corte e leite",
        "Criadores de cavalos e equinos",
        "Suinocultores",
        "Criadores de gado de elite e reprodutores",
      ]}
      whyPatro={[
        "Especialistas em seguros para pecuária",
        "Acesso a seguros com subsídio governamental",
        "Coberturas personalizadas por tipo de animal",
        "Suporte técnico na regulação de sinistros",
      ]}
      faqs={[
        { question: "O seguro pecuário tem subsídio do governo?", answer: "Sim, o governo federal subsidia parte do prêmio do seguro pecuário, tornando-o mais acessível aos produtores." },
        { question: "Posso segurar gado de elite?", answer: "Sim, oferecemos coberturas especiais para animais de alto valor genético e reprodutores." },
        { question: "Quanto custa o seguro pecuário?", answer: "O valor depende do tipo de animal, quantidade, valor e coberturas escolhidas. Solicite uma cotação personalizada." },
      ]}
      relatedInsurances={[
        { title: "Máquinas Agrícolas", link: "/seguro-maquinas-agricolas" },
        { title: "Seguro Armazenagem", link: "/seguro-armazenagem" },
        { title: "Seguro Ambiental", link: "/seguro-ambiental" },
      ]}
    />
  );
};

export default SeguroPecuario;
