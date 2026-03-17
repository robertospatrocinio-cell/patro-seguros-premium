import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-seguro-empresarial.webp";

const SeoSeguroEmpresarialGuarulhos = () => (
  <InsurancePageTemplate
    heroImage={heroImg}
    title="Seguro Empresarial em Guarulhos"
    subtitle="Proteção completa para empresas de Guarulhos e região. Cotação gratuita e personalizada."
    description="A Patro Seguros é especialista em seguros empresariais em Guarulhos. Protegemos comércios, indústrias, prestadores de serviços e empresas de todos os portes contra incêndio, roubo, responsabilidade civil e muito mais. Atendimento local e presencial."
    icon="🏢"
    metaDescription="Seguro Empresarial em Guarulhos para comércios, indústrias e serviços. Proteção contra incêndio, roubo e RC. Atendimento local. Cotação grátis Patro Seguros."
    coverages={[
      { title: "Incêndio e Explosão", description: "Cobertura básica para imóvel e conteúdo empresarial." },
      { title: "Roubo e Furto", description: "Proteção para equipamentos, mercadorias e valores." },
      { title: "Responsabilidade Civil", description: "Cobertura para danos a terceiros nas instalações." },
      { title: "Lucros Cessantes", description: "Proteção financeira durante paralisação por sinistro." },
    ]}
    whoNeeds={[
      "Comércios e lojas em Guarulhos",
      "Indústrias na região metropolitana",
      "Prestadores de serviços",
      "Escritórios e consultórios",
    ]}
    whyPatro={[
      "Corretora local com experiência em empresas de Guarulhos",
      "Análise de risco personalizada",
      "Comparação entre seguradoras",
      "Suporte ágil em sinistros",
    ]}
    faqs={[
      { question: "Quanto custa seguro empresarial em Guarulhos?", answer: "O valor varia conforme tipo de empresa, localização e coberturas. Solicite cotação gratuita." },
      { question: "Seguro empresarial cobre roubo de mercadoria?", answer: "Sim, essa é uma das coberturas mais contratadas pelas empresas." },
    ]}
    relatedInsurances={[
      { title: "Seguro de Frota", link: "/seguro-frota" },
      { title: "Seguro Cyber", link: "/seguro-cyber" },
    ]}
  />
);

export default SeoSeguroEmpresarialGuarulhos;
