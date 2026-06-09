import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-seguro-maquinas.webp";

const SeguroEquipamentosOdontologicos = () => (
  <InsurancePageTemplate
    heroImage={heroImg}
    title="Seguro para Equipamentos Odontológicos"
    subtitle="Proteção patrimonial para cadeiras, raio-X, scanner intraoral, impressoras 3D e equipamentos de imagem."
    icon="🦷"
    metaDescription="Seguro para equipamentos odontológicos — cadeiras, raio-X, scanner intraoral, impressoras 3D e equipamentos de imagem. Cotação grátis com a Patro Seguros."
    description="Cobertura específica para equipamentos odontológicos contra roubo, danos elétricos, quebra acidental e queda de raio."
    detailedDescription={`Uma única cadeira odontológica de alta performance custa entre R$ 30 mil e R$ 80 mil. Um scanner intraoral 3Shape ou iTero passa de R$ 150 mil. Equipamentos de imagem panorâmica e tomografia chegam a R$ 500 mil. Esses valores raramente são adequadamente cobertos pelo seguro patrimonial padrão.\n\nA Patro Seguros estrutura apólices específicas para equipamentos odontológicos, com indenização integral pelo valor de novo, cobertura para quebra acidental durante operação e assistência técnica emergencial.`}
    coverages={[
      { title: "Roubo e Furto Qualificado", description: "Indenização pelo valor de reposição a novo." },
      { title: "Danos Elétricos e Queda de Raio", description: "Cobertura para queima de placas e componentes eletrônicos." },
      { title: "Quebra Acidental", description: "Danos durante operação, transporte ou manutenção." },
      { title: "Scanner Intraoral", description: "Cobertura específica para 3Shape, iTero, Medit e equipamentos de digitalização." },
      { title: "Impressoras 3D Odontológicas", description: "Formlabs, Anycubic e outras impressoras de resina." },
      { title: "Equipamentos de Imagem", description: "Raio-X periapical, panorâmico e tomógrafo cone beam." },
      { title: "Equipamento Portátil", description: "Cobertura para equipamentos transportados entre clínicas." },
      { title: "Assistência Técnica Emergencial", description: "Atendimento rápido para minimizar paralisação." },
    ]}
    whoNeeds={[
      "Clínicas com scanners intraorais e impressoras 3D",
      "Centros de imagem odontológica",
      "Consultórios com equipamentos de alto valor",
      "Profissionais com equipamentos portáteis",
    ]}
    whyPatro={[
      "Especialista em seguro de equipamentos médico-odontológicos",
      "Indenização pelo valor de reposição a novo",
      "Cobertura inclusive durante transporte",
      "Suporte direto com fabricantes e assistências técnicas",
    ]}
    faqs={[
      { question: "O seguro patrimonial já não cobre os equipamentos?", answer: "Cobre parcialmente — geralmente com sublimites e exclusões para quebra acidental. A apólice específica de equipamentos é muito mais ampla e adequada para itens de alto valor." },
      { question: "Cobre equipamento em garantia?", answer: "Sim. A apólice complementa a garantia do fabricante, cobrindo eventos como queda, choque, derramamento de líquidos e roubo — que a garantia não cobre." },
      { question: "Quanto custa?", answer: "Em média 1,5% a 3% do valor segurado/ano. Um scanner de R$ 150 mil custa R$ 2.250 a R$ 4.500/ano para segurar." },
      { question: "Cobre equipamento financiado?", answer: "Sim — e geralmente é exigência do financiador. A Patro Seguros atende contratos de leasing e CDC." },
    ]}
    relatedInsurances={[
      { title: "Clínica Odontológica", link: "/seguro-clinica-odontologica" },
      { title: "Consultório Odontológico", link: "/seguro-consultorio-odontologico" },
      { title: "Hub Clínicas Odontológicas", link: "/seguros-para-clinicas-odontologicas" },
    ]}
  />
);

export default SeguroEquipamentosOdontologicos;