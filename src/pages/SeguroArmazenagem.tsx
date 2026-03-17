import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-seguro-rural.webp";

const SeguroArmazenagem = () => {
  return (
    <InsurancePageTemplate
      heroImage={heroImg}
      title="Seguro Armazenagem — Proteção para Grãos e Produtos Agrícolas"
      subtitle="Proteja seus grãos, sementes e produtos armazenados contra perdas e danos. Atendemos produtores de todos os estados do Brasil."
      description="O Seguro de Armazenagem da Patro Seguros garante proteção completa para produtos agrícolas armazenados em silos, armazéns e graneleiros. Cobrimos riscos como incêndio, explosão, fenômenos naturais e contaminação, garantindo a segurança do seu investimento desde a colheita até a comercialização. Atendemos produtores e cooperativas em todos os estados — de Mato Grosso ao Paraná, de Goiás ao Rio Grande do Sul. Cotação e sinistro 100% remotos."
      icon="🏭"
      metaDescription="Seguro de Armazenagem em todo o Brasil para grãos, sementes e produtos agrícolas em silos e armazéns. Proteção contra incêndio e contaminação. Cotação grátis Patro Seguros."
      badge="Atendimento em Todo o Brasil"
      coverages={[
        { title: "Incêndio e Explosão", description: "Proteção contra danos por incêndio, raio e explosão nos armazéns e silos." },
        { title: "Fenômenos Naturais", description: "Cobertura contra vendaval, granizo, inundação e alagamento." },
        { title: "Desmoronamento", description: "Proteção contra colapso de estruturas de armazenagem." },
        { title: "Contaminação", description: "Cobertura para perdas por contaminação dos produtos armazenados." },
        { title: "Roubo e Furto", description: "Proteção contra roubo e furto qualificado de produtos estocados." },
        { title: "Danos Elétricos", description: "Cobertura para danos em equipamentos de refrigeração e controle." },
      ]}
      whoNeeds={[
        "Produtores rurais com silos e armazéns próprios em qualquer estado",
        "Cooperativas agrícolas em todo o Brasil",
        "Empresas de armazenagem de grãos de todas as regiões",
        "Cerealistas e tradings agrícolas",
      ]}
      whyPatro={[
        "Atendemos produtores de todos os estados do Brasil",
        "Especialistas em seguros para o agronegócio",
        "Coberturas personalizadas para cada tipo de armazenagem",
        "Cotação e sinistro 100% remotos — por WhatsApp, telefone ou e-mail",
        "Agilidade na regulação de sinistros",
      ]}
      faqs={[
        { question: "A Patro Seguros atende armazéns fora de São Paulo?", answer: "Sim! Atendemos produtores, cooperativas e empresas de armazenagem em todos os estados do Brasil. O processo é 100% remoto." },
        { question: "O que o seguro de armazenagem cobre?", answer: "Cobre perdas e danos aos produtos agrícolas armazenados por incêndio, fenômenos naturais, contaminação, roubo e outros riscos cobertos." },
        { question: "Posso segurar grãos em silos de terceiros?", answer: "Sim, é possível contratar seguro para produtos armazenados em instalações de terceiros, mediante comprovação." },
        { question: "Quanto custa o seguro de armazenagem?", answer: "O valor varia conforme o tipo de produto, volume armazenado, local e coberturas escolhidas. Solicite uma cotação personalizada." },
      ]}
      relatedInsurances={[
        { title: "Máquinas Agrícolas", link: "/seguro-maquinas-agricolas" },
        { title: "Seguro Pecuário", link: "/seguro-pecuario" },
        { title: "Seguro Ambiental", link: "/seguro-ambiental" },
      ]}
    />
  );
};

export default SeguroArmazenagem;