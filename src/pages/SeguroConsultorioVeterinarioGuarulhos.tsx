import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-planos-saude.webp";

const SeguroConsultorioVeterinarioGuarulhos = () => (
  <InsurancePageTemplate
    heroImage={heroImg}
    title="Seguro para Consultório Veterinário em Guarulhos | Patro"
    headline="Seguro para consultório veterinário em Guarulhos"
    subtitle="Proteção para clínicas veterinárias em Guarulhos: estrutura, equipamentos, medicamentos, responsabilidade civil e danos a terceiros, conforme apólice."
    icon="🐾"
    metaDescription="Seguro para consultório veterinário em Guarulhos: equipamentos, estrutura, medicamentos, RC Profissional e danos a terceiros. Cotação consultiva com a Patro."
    description="Cobertura patrimonial, RC e equipamentos para clínicas e consultórios veterinários em Guarulhos, conforme apólice e aceitação da seguradora."
    detailedDescription={`Consultórios veterinários combinam atendimento a animais, equipamentos, armazenamento de medicamentos e uma exposição particular em responsabilidade civil. Coberturas dependem da atividade, da estrutura (com ou sem internação) e da análise técnica da seguradora.\n\nA Patro Seguros orienta veterinários em Guarulhos a estruturarem seguro empresarial, equipamentos, RC e — quando disponível — coberturas para refrigeração. Não prometemos cobertura automática para todos os eventos envolvendo animais.`}
    coverages={[
      { title: "Equipamentos veterinários e eletrônicos", description: "Ultrassom, raio-X, monitores, computadores, conforme apólice." },
      { title: "Incêndio, raio, explosão e danos elétricos", description: "Proteção patrimonial ao imóvel e conteúdo." },
      { title: "Roubo e furto qualificado", description: "Subtração de equipamentos e eletrônicos, conforme apólice." },
      { title: "Responsabilidade civil operações", description: "Danos a tutores e terceiros nas dependências." },
      { title: "RC Profissional (veterinários)", description: "Reclamações relacionadas à atuação, sujeito à aceitação." },
      { title: "Refrigeração de medicamentos e vacinas", description: "Perda de insumos por falha, quando disponível." },
      { title: "Vazamentos e vidros", description: "Danos por água e quebra de vidros, conforme apólice." },
      { title: "Assistência 24h", description: "Chaveiro, vidraceiro e eletricista, conforme apólice." },
    ]}
    whoNeeds={["Consultórios veterinários individuais","Clínicas veterinárias com internação","Especialistas em pequenos e grandes animais","Petshops com serviço veterinário"]}
    whyPatro={["Consultoria para veterinários em Guarulhos","Comparativo entre seguradoras parceiras","Explicação clara de limites, exclusões e franquias","Suporte humano em sinistro e renovação"]}
    importantDetails={[
      { title: "Atendimento a animais", content: "Coberturas para eventos envolvendo animais dependem da seguradora e da apólice — não há promessa automática." },
      { title: "Estrutura e internação", content: "Clínicas com internação e centro cirúrgico têm perfil de risco distinto. Informe a estrutura para análise técnica adequada." },
    ]}
    faqs={[
      { question: "Cobre danos causados por animais?", answer: "Coberturas envolvendo animais dependem da seguradora e da apólice — não há promessa automática." },
      { question: "Cobre medicamentos e vacinas refrigeradas?", answer: "Quando disponível, há cobertura para perdas por falha de refrigeração, conforme apólice." },
      { question: "Cobre RC profissional para veterinários?", answer: "É um produto separado, sujeito à aceitação da seguradora." },
      { question: "Cobre roubo de equipamentos?", answer: "Sim, tipicamente na cobertura patrimonial, sujeito a limites e comprovação." },
      { question: "A Patro atende clínicas em Guarulhos?", answer: "Sim. Atendemos clínicas veterinárias em Guarulhos e região metropolitana." },
    ]}
    relatedInsurances={[
      { title: "Hub Consultórios e Clínicas", link: "/seguro-consultorio-guarulhos" },
      { title: "Seguro Clínica Veterinária", link: "/seguros-para-clinicas-veterinarias" },
      { title: "RC Profissional", link: "/seguro-rc-profissional" },
      { title: "Equipamentos de Consultório", link: "/seguro-equipamentos-consultorio-guarulhos" },
      { title: "Seguro Empresarial", link: "/seguro-empresarial" },
    ]}
    canonicalUrl="https://www.patroseguros.com.br/seguro-consultorio-veterinario-guarulhos"
    localSeo={{ city: "Guarulhos" }}
  />
);

export default SeguroConsultorioVeterinarioGuarulhos;