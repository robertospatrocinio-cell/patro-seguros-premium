import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-seguro-maquinas.webp";

const SeguroMaquinasAgricolas = () => {
  return (
    <InsurancePageTemplate
      title="Seguro de Máquinas Agrícolas"
      subtitle="Proteja tratores, colheitadeiras, plantadeiras e todo seu maquinário agrícola. Atendemos produtores de todos os estados do Brasil."
      description="O Seguro de Máquinas Agrícolas da Patro Seguros é a solução completa para proteger o patrimônio do produtor rural. Cobrimos tratores, colheitadeiras, plantadeiras, pulverizadores e outros equipamentos essenciais para a produção agrícola. Com a Patro, você conta com a expertise de quem entende do agronegócio e oferece as melhores condições do mercado. Atendemos produtores em todos os estados — de Mato Grosso ao Paraná, de Goiás à Bahia. Todo o processo de cotação e sinistro é feito de forma remota, com a mesma agilidade e qualidade."
      icon="🚜"
      metaDescription="Seguro de Máquinas Agrícolas em todo o Brasil — tratores, colheitadeiras, plantadeiras e pulverizadores. Proteção contra incêndio, roubo e tombamento. Cotação grátis Patro Seguros."
      badge="Atendimento em Todo o Brasil"
      coverages={[
        { title: "Incêndio e Explosão", description: "Proteção contra danos causados por incêndio, raio e explosão nas máquinas agrícolas." },
        { title: "Roubo e Furto", description: "Cobertura contra roubo e furto qualificado de tratores e colheitadeiras." },
        { title: "Colisão e Capotamento", description: "Proteção contra acidentes durante operação e transporte das máquinas." },
        { title: "Danos Elétricos", description: "Cobertura para danos causados por curto-circuito e oscilação de energia." },
        { title: "Fenômenos Naturais", description: "Proteção contra vendaval, granizo, inundação e alagamento." },
        { title: "Responsabilidade Civil", description: "Cobertura para danos causados a terceiros durante a operação." },
      ]}
      whoNeeds={[
        "Produtores rurais de pequeno, médio e grande porte em qualquer estado",
        "Cooperativas agrícolas em todo o Brasil",
        "Empresas de prestação de serviços agrícolas",
        "Proprietários de tratores e colheitadeiras em todas as regiões",
      ]}
      whyPatro={[
        "Atendemos produtores de todos os estados do Brasil",
        "Especialistas em seguros para o agronegócio",
        "Parceria com seguradoras líderes no segmento rural",
        "Coberturas personalizadas para cada tipo de máquina",
        "Cotação e sinistro 100% remotos — por WhatsApp, telefone ou e-mail",
        "Agilidade na regulação de sinistros no campo",
      ]}
      faqs={[
        { question: "A Patro atende produtores fora de São Paulo?", answer: "Sim! Apesar de nossa sede ser em Guarulhos/SP, atendemos produtores rurais de todos os estados do Brasil. Cotação, emissão e sinistro são feitos de forma remota com total suporte." },
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