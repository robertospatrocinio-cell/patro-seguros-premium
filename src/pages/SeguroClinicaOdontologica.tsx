import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-seguro-empresarial.webp";

const SeguroClinicaOdontologica = () => (
  <InsurancePageTemplate
    heroImage={heroImg}
    title="Seguro para Clínica Odontológica"
    subtitle="Apólice integrada para clínicas, redes odontológicas e franquias com múltiplos dentistas."
    icon="🏥"
    metaDescription="Seguro para clínica odontológica em Guarulhos: patrimônio, equipamentos, RC coletivo, cyber e lucros cessantes. Cotação grátis com a Patro."
    description="Apólice empresarial integrada para clínicas odontológicas de médio e grande porte, redes e franquias."
    detailedDescription={`Clínicas odontológicas modernas combinam alta concentração de pacientes, sócios e equipe técnica, equipamentos de R$ 200 mil a R$ 1 milhão e dados sensíveis sob a LGPD. O risco é agregado — e uma única apólice mal dimensionada pode comprometer a continuidade do negócio.\n\nA Patro Seguros estrutura programas de proteção integrados para clínicas e redes odontológicas, com RC profissional coletivo (todos os dentistas em uma única apólice), seguro cyber, D&O para sócios e plano de saúde empresarial com condições agressivas.`}
    coverages={[
      { title: "Cobertura Patrimonial Ampla", description: "Incêndio, danos elétricos, roubo, furto qualificado, vendaval, alagamento e quebra de vidros." },
      { title: "Equipamentos Odontológicos", description: "Cobertura unificada para todas as cadeiras, raios-X, scanners, impressoras 3D e computadores." },
      { title: "RC Profissional Coletivo", description: "Uma apólice que cobre todos os dentistas da clínica, incluindo terceirizados (PJ)." },
      { title: "Seguro Cyber e LGPD", description: "Proteção contra vazamento de dados, ransomware e multas da ANPD." },
      { title: "Lucros Cessantes", description: "Reposição do faturamento durante reforma ou reconstrução após sinistro." },
      { title: "D&O para Sócios", description: "Defesa de administradores em ações cíveis, trabalhistas e fiscais." },
      { title: "Seguro de Vida em Grupo", description: "Cobertura para sócios e funcionários, com diárias por incapacidade." },
      { title: "Plano de Saúde Empresarial", description: "Negociado com Bradesco, SulAmérica, Amil, Hapvida e operadoras regionais." },
    ]}
    whoNeeds={[
      "Clínicas odontológicas com 5+ cadeiras",
      "Redes de clínicas com várias unidades",
      "Franquias odontológicas (OdontoCompany, Sorridents, OrthoPride etc.)",
      "Clínicas com sócios e equipe técnica multidisciplinar",
    ]}
    whyPatro={[
      "Especialista em seguros para o setor odontológico",
      "Programas integrados que reduzem o custo total em até 30%",
      "Atendimento dedicado a clínicas e redes",
      "Renovações anuais com benchmarking de mercado",
    ]}
    faqs={[
      { question: "RC coletivo é mais barato que RC individual?", answer: "Sim. O custo por dentista cai entre 20% e 40% em apólices coletivas, e a gestão fica centralizada na pessoa jurídica." },
      { question: "O seguro cobre todas as unidades de uma rede?", answer: "Sim. Estruturamos apólices multilocalização com cobertura única para todas as filiais." },
      { question: "Atende exigências de franqueadoras?", answer: "Sim. Atendemos as exigências de coberturas mínimas das principais franqueadoras odontológicas do Brasil." },
      { question: "Quanto custa para uma clínica média?", answer: "Clínicas com 5–10 cadeiras: R$ 8.000 a R$ 25.000/ano para o pacote completo. Redes: orçamento customizado." },
    ]}
    relatedInsurances={[
      { title: "Consultório Odontológico", link: "/seguro-consultorio-odontologico" },
      { title: "Equipamentos Odontológicos", link: "/seguro-equipamentos-odontologicos" },
      { title: "Plano de Saúde Empresarial", link: "/plano-saude-clinicas-odontologicas" },
      { title: "Hub Clínicas Odontológicas", link: "/seguros-para-clinicas-odontologicas" },
    ]}
  />
);

export default SeguroClinicaOdontologica;