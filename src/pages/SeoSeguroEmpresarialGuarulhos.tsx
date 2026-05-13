import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import PrerenderText from "@/components/PrerenderText";
import heroImg from "@/assets/hero-seguro-empresarial.webp";

const SeoSeguroEmpresarialGuarulhos = () => (
  <>
    <PrerenderText slug="seguro-empresarial-guarulhos" />
    <InsurancePageTemplate
    heroImage={heroImg}
    title="Seguro Empresarial em Guarulhos | Proteja Seu Negócio | Patro Seguros"
    subtitle="Seguro Empresarial em Guarulhos — Seu Negócio Protegido"
    description="Seguro empresarial em Guarulhos para proteger seu negócio. Cobertura para incêndio, roubo, responsabilidade civil. Cotação grátis."
    icon="🏢"
    metaDescription="Seguro empresarial Guarulhos e Cumbica: cotação Porto Seguro, Tokio, AIG e Allianz para indústrias, galpões e comércios. Cotação grátis Patro Seguros."
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
      { question: "Quanto custa seguro empresarial em Guarulhos?", answer: "Em Guarulhos, o seguro empresarial parte de R$ 100/mês para PMEs e varia conforme atividade, patrimônio e localização. Indústrias em Cumbica e galpões em Bonsucesso costumam ter taxas específicas. Solicite cotação gratuita personalizada." },
      { question: "Seguro empresarial cobre roubo de mercadoria?", answer: "Sim, é uma das coberturas mais contratadas. Para o seguro empresarial Cumbica, a cobertura de roubo qualificado é praticamente obrigatória dada a alta sinistralidade da região industrial." },
      { question: "Faço seguro empresarial Cumbica com a Patro Seguros?", answer: "Sim. A Patro Seguros é a corretora local especializada em seguro empresarial Cumbica, atendendo indústrias, galpões e operações logísticas próximas ao GRU Airport e à Rodovia Hélio Smidt. Visita técnica gratuita." },
      { question: "Vocês fazem cotação Porto Seguro empresarial em Guarulhos?", answer: "Sim. Somos corretora Porto Seguro Guarulhos credenciada e fazemos cotação Porto Seguro empresarial junto a Tokio, Allianz, AIG, Bradesco e Sompo, comparando para você o melhor custo-benefício." },
    ]}
    relatedInsurances={[
      { title: "Seguro de Frota", link: "/seguro-frota" },
      { title: "Seguro Cyber", link: "/seguro-cyber" },
    ]}
    />
  </>
);

export default SeoSeguroEmpresarialGuarulhos;
