import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-planos-saude.webp";

const SeguroConsultorioMedicoGuarulhos = () => (
  <InsurancePageTemplate
    heroImage={heroImg}
    title="Seguro para Consultório Médico em Guarulhos | Patro Seguros"
    headline="Seguro para consultório médico em Guarulhos"
    subtitle="Proteção para médicos e clínicas pequenas: equipamentos, prontuários, RC Profissional, cyber/LGPD, sala comercial e continuidade do atendimento."
    icon="🩺"
    metaDescription="Seguro para consultório médico em Guarulhos: equipamentos, prontuários, RC Profissional, cyber/LGPD e sala comercial. Cotação consultiva com a Patro."
    description="Cobertura patrimonial, RC Profissional e cyber para médicos e clínicas em Guarulhos, conforme apólice e aceitação da seguradora."
    detailedDescription={`Consultórios médicos combinam equipamentos, prontuários eletrônicos e dependência de sistemas para agendamento e cobrança. Além do risco patrimonial (incêndio, danos elétricos, roubo), há exposição em responsabilidade civil profissional e em incidentes com dados sensíveis (LGPD).\n\nA Patro Seguros orienta médicos e clínicas em Guarulhos e região a combinarem seguro empresarial, RC Profissional e cyber, conforme apólice. As coberturas descritas são exemplificativas e dependem da atividade, do porte e da análise técnica da seguradora.`}
    coverages={[
      { title: "Equipamentos médicos e eletrônicos", description: "Ultrassom, ECG, monitores, computadores e periféricos, conforme apólice." },
      { title: "Incêndio, raio, explosão e danos elétricos", description: "Proteção patrimonial ao imóvel e conteúdo." },
      { title: "Roubo e furto qualificado", description: "Subtração de equipamentos e eletrônicos, conforme apólice." },
      { title: "RC operações", description: "Danos a pacientes e terceiros nas dependências." },
      { title: "RC Profissional (médicos)", description: "Reclamações relacionadas à atuação profissional, sujeito à aceitação." },
      { title: "Cyber / LGPD", description: "Prontuários e dados sensíveis, conforme apólice." },
      { title: "Lucros cessantes", description: "Apoio financeiro em paralisação por evento coberto, quando disponível." },
      { title: "Assistência 24h", description: "Chaveiro, vidraceiro e eletricista emergencial, conforme apólice." },
    ]}
    whoNeeds={[
      "Médicos com consultório próprio ou alugado",
      "Clínicas médicas pequenas e multiprofissionais",
      "Consultórios que utilizam prontuário eletrônico",
      "Especialistas com equipamentos de diagnóstico",
    ]}
    whyPatro={[
      "Consultoria para médicos em Guarulhos e região",
      "Integração entre patrimonial, RC Profissional e cyber",
      "Comparativo entre seguradoras parceiras",
      "Suporte humano em sinistro e renovação",
    ]}
    importantDetails={[
      { title: "Prontuário eletrônico e LGPD", content: "Clínicas que armazenam prontuários e dados sensíveis podem se beneficiar de seguro cyber para apoio em incidentes, notificações e responsabilidade relacionada, conforme apólice. A Patro orienta sobre seguro — questões regulatórias devem ser tratadas com jurídico e conselhos profissionais." },
      { title: "Sala comercial", content: "Consultórios em edifícios comerciais podem ter exigência de seguro do imóvel prevista no contrato de locação. O profissional pode contratar apólice específica para conteúdo, equipamentos e RC." },
    ]}
    faqs={[
      { question: "Preciso de RC Profissional se já tenho seguro empresarial?", answer: "São produtos complementares. Empresarial protege patrimônio; RC Profissional protege contra reclamações relacionadas à atuação. Sujeito à aceitação." },
      { question: "Cobre prontuários e dados de pacientes?", answer: "Apoio em incidentes de dados pode ser incluído em seguro cyber, conforme apólice — não substitui obrigações da LGPD." },
      { question: "Cobre equipamentos de diagnóstico?", answer: "Sim, tipicamente por meio da cobertura patrimonial ou de equipamentos eletrônicos, conforme valores declarados." },
      { question: "Cobre paralisação do consultório?", answer: "A cobertura de lucros cessantes pode indenizar a paralisação decorrente de evento coberto, quando disponível." },
      { question: "Quanto custa?", answer: "Depende do valor dos equipamentos, do imóvel e das coberturas escolhidas. Não prometemos preço — fazemos comparativo consultivo." },
    ]}
    relatedInsurances={[
      { title: "Hub Consultórios e Clínicas", link: "/seguro-consultorio-guarulhos" },
      { title: "RC Profissional", link: "/seguro-rc-profissional" },
      { title: "Seguro Cyber", link: "/seguro-cyber" },
      { title: "Equipamentos de Consultório", link: "/seguro-equipamentos-consultorio-guarulhos" },
      { title: "Seguro Empresarial", link: "/seguro-empresarial" },
    ]}
    canonicalUrl="https://www.patroseguros.com.br/seguro-consultorio-medico-guarulhos"
    localSeo={{ city: "Guarulhos" }}
  />
);

export default SeguroConsultorioMedicoGuarulhos;