import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-seguro-galpoes.webp";

const SeguroGalpoesIndustriais = () => {
  return (
    <InsurancePageTemplate
      heroImage={heroImg}
      title="Seguro de Galpões Industriais"
      subtitle="Proteção completa para galpões, armazéns e instalações industriais contra incêndio, roubo e riscos operacionais."
      description="O Seguro de Galpões Industriais da Patro Seguros oferece proteção completa para suas instalações industriais, incluindo o prédio, conteúdo, mercadorias armazenadas e maquinário. Proteja seu patrimônio contra incêndio, explosão, vendaval, roubo e muito mais."
      icon="🏭"
      metaDescription="Seguro para Galpões Industriais — proteção contra incêndio, roubo, vendaval e danos ao estoque. Cobertura para armazéns e instalações. Cotação grátis Patro Seguros."
      coverages={[
        { title: "Incêndio, Raio e Explosão", description: "Cobertura básica para o prédio e seu conteúdo." },
        { title: "Vendaval e Granizo", description: "Proteção contra danos estruturais por fenômenos climáticos." },
        { title: "Roubo e Furto Qualificado", description: "Cobertura para mercadorias e equipamentos." },
        { title: "Danos Elétricos", description: "Proteção contra curto-circuito e oscilação de energia." },
        { title: "Responsabilidade Civil", description: "Cobertura para danos a terceiros nas instalações." },
        { title: "Lucros Cessantes", description: "Proteção financeira durante paralisação por sinistro." },
      ]}
      whoNeeds={[
        "Indústrias de todos os portes",
        "Empresas de logística e distribuição",
        "Proprietários de armazéns e centros de distribuição",
        "Empresas com estoque de alto valor",
      ]}
      whyPatro={[
        "Análise de risco personalizada para cada instalação",
        "Coberturas sob medida para o perfil industrial",
        "Experiência com seguros de grande porte",
        "Suporte completo na regulação de sinistros",
      ]}
      faqs={[
        { question: "O seguro cobre o conteúdo do galpão?", answer: "Sim, é possível segurar tanto a estrutura quanto máquinas, equipamentos e mercadorias armazenadas." },
        { question: "Quanto custa seguro de galpão industrial?", answer: "O valor depende da localização, tipo de atividade, valor do imóvel e coberturas. Solicite cotação gratuita." },
      ]}
      relatedInsurances={[
        { title: "Máquinas Industriais", link: "/seguro-maquinas-industriais" },
        { title: "Seguro Empresarial", link: "/seguro-empresarial" },
      ]}
    />
  );
};

export default SeguroGalpoesIndustriais;
