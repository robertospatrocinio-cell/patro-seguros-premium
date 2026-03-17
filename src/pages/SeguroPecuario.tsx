import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-seguro-rural.webp";

const SeguroPecuario = () => {
  return (
    <InsurancePageTemplate
      title="Seguro Pecuário — Proteção para seu Rebanho"
      subtitle="Proteja bovinos, equinos, suínos e outros animais contra morte por doenças, acidentes e fenômenos naturais. Atendemos pecuaristas de todos os estados do Brasil."
      description="O Seguro Pecuário da Patro Seguros oferece proteção completa para o seu rebanho. Cobrimos morte de animais por doenças, acidentes, raios, afogamento e outros eventos, garantindo a segurança do seu investimento na pecuária. Com subsídio do governo federal, o seguro fica ainda mais acessível. Atendemos pecuaristas em todos os estados — de Mato Grosso do Sul ao Pará, de Goiás ao Rio Grande do Sul. Cotação e acompanhamento de sinistro feitos de forma 100% remota."
      icon="🐄"
      metaDescription="Seguro Pecuário em todo o Brasil para bovinos, equinos e suínos. Proteção contra morte por doenças, acidentes e raios. Subsídio do governo. Cotação grátis Patro Seguros."
      badge="Atendimento em Todo o Brasil"
      coverages={[
        { title: "Morte por Doença", description: "Cobertura para morte de animais causada por doenças cobertas pela apólice." },
        { title: "Morte Acidental", description: "Proteção contra morte por acidentes, quedas e traumatismos." },
        { title: "Raio e Fenômenos Naturais", description: "Cobertura para morte causada por raio, inundação e vendaval." },
        { title: "Afogamento", description: "Proteção contra morte por afogamento em rios, lagos e açudes." },
        { title: "Incêndio e Explosão", description: "Cobertura para perdas causadas por incêndio em confinamentos e pastagens." },
        { title: "Parto e Complicações", description: "Proteção contra morte durante o parto e complicações pós-parto." },
      ]}
      whoNeeds={[
        "Pecuaristas de corte e leite em qualquer estado",
        "Criadores de cavalos e equinos em todo o Brasil",
        "Suinocultores de todas as regiões",
        "Criadores de gado de elite e reprodutores",
      ]}
      whyPatro={[
        "Atendemos pecuaristas de todos os estados do Brasil",
        "Especialistas em seguros para pecuária",
        "Acesso a seguros com subsídio governamental",
        "Coberturas personalizadas por tipo de animal e região",
        "Cotação e sinistro 100% remotos — por WhatsApp, telefone ou e-mail",
        "Suporte técnico na regulação de sinistros",
      ]}
      faqs={[
        { question: "A Patro atende pecuaristas de outros estados?", answer: "Sim! Atendemos pecuaristas de todos os estados do Brasil. Nossa sede é em Guarulhos/SP, mas todo o atendimento é feito de forma remota — cotação, emissão e sinistro." },
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