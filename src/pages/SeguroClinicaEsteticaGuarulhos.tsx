import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-planos-saude.webp";

const SeguroClinicaEsteticaGuarulhos = () => (
  <InsurancePageTemplate
    heroImage={heroImg}
    title="Seguro para Clínica de Estética em Guarulhos | Patro Seguros"
    headline="Seguro para clínica de estética em Guarulhos"
    subtitle="Proteção para clínicas de estética, biomedicina estética e esteticistas: procedimentos, equipamentos, laser, RC Profissional e riscos de operação."
    icon="💆"
    metaDescription="Seguro para clínica de estética em Guarulhos: laser, depilação, procedimentos, equipamentos, RC Profissional e danos a terceiros."
    description="Cobertura patrimonial, equipamentos e RC Profissional para clínicas de estética em Guarulhos, conforme apólice."
    detailedDescription={`Clínicas de estética combinam procedimentos, equipamentos eletrônicos (laser, radiofrequência, ultrassom estético) e uma exposição particular em responsabilidade civil profissional. Coberturas dependem da atividade específica e da análise técnica da seguradora.\n\nA Patro Seguros orienta esteticistas, biomédicos e clínicas em Guarulhos a estruturarem patrimonial, RC Profissional, equipamentos e cyber, conforme apólice. Não prometemos aceitação automática.`}
    coverages={[
      { title: "Equipamentos estéticos e eletrônicos", description: "Laser, radiofrequência, ultrassom estético, conforme apólice." },
      { title: "Incêndio, raio, explosão e danos elétricos", description: "Proteção patrimonial ao imóvel e conteúdo." },
      { title: "Roubo e furto qualificado", description: "Subtração de equipamentos, conforme apólice." },
      { title: "Responsabilidade civil operações", description: "Danos a clientes e terceiros nas dependências." },
      { title: "RC Profissional (estética)", description: "Reclamações relacionadas à atuação, sujeito à aceitação." },
      { title: "Cyber / LGPD", description: "Dados de clientes e agendamentos, conforme apólice." },
      { title: "Vazamentos e vidros", description: "Danos por água e quebra de vidros, conforme apólice." },
      { title: "Assistência 24h", description: "Serviços emergenciais, conforme apólice." },
    ]}
    whoNeeds={["Clínicas de estética facial e corporal","Biomédicos e esteticistas","Clínicas com laser e radiofrequência","Estúdios de depilação"]}
    whyPatro={["Consultoria para clínicas de estética em Guarulhos","Análise por tipo de procedimento e equipamento","Comparativo entre seguradoras","Suporte humano em sinistro e renovação"]}
    importantDetails={[
      { title: "Procedimentos e aceitação", content: "Aceitação e preço variam conforme o tipo de procedimento e a formação profissional. Não prometemos aceitação automática." },
      { title: "Equipamentos de alto valor", content: "Laser, radiofrequência e ultrassom podem ser incluídos em cobertura de eletrônicos, conforme apólice e valores declarados." },
    ]}
    faqs={[
      { question: "Cobre procedimentos estéticos?", answer: "Coberturas envolvendo procedimentos dependem da seguradora, produto e apólice — sujeito à aceitação." },
      { question: "Cobre equipamentos de laser?", answer: "Sim, tipicamente por cobertura de eletrônicos, conforme valores declarados." },
      { question: "Preciso de RC Profissional?", answer: "É um produto complementar, focado em reclamações da atuação profissional. Sujeito à aceitação." },
      { question: "Cobre roubo de equipamentos?", answer: "Sim, tipicamente na cobertura patrimonial, sujeito a limites e comprovação." },
      { question: "A Patro atende clínicas em Guarulhos?", answer: "Sim. Atendemos clínicas de estética em Guarulhos e região metropolitana." },
    ]}
    relatedInsurances={[
      { title: "Hub Consultórios e Clínicas", link: "/seguro-consultorio-guarulhos" },
      { title: "RC Profissional", link: "/seguro-rc-profissional" },
      { title: "Equipamentos de Consultório", link: "/seguro-equipamentos-consultorio-guarulhos" },
      { title: "Seguro Cyber", link: "/seguro-cyber" },
      { title: "Seguro Empresarial", link: "/seguro-empresarial" },
    ]}
    canonicalUrl="https://www.patroseguros.com.br/seguro-clinica-estetica-guarulhos"
    localSeo={{ city: "Guarulhos" }}
  />
);

export default SeguroClinicaEsteticaGuarulhos;