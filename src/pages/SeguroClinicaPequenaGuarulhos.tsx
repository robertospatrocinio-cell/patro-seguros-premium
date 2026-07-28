import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-planos-saude.webp";

const SeguroClinicaPequenaGuarulhos = () => (
  <InsurancePageTemplate
    heroImage={heroImg}
    title="Seguro para Clínica Pequena em Guarulhos | Patro Seguros"
    headline="Seguro para clínica pequena em Guarulhos"
    subtitle="Proteção para pequenas clínicas multidisciplinares em Guarulhos: fisioterapia, psicologia, nutrição, fonoaudiologia e terapias."
    icon="🏥"
    metaDescription="Seguro para clínica pequena em Guarulhos: fisioterapia, psicologia, nutrição, fonoaudiologia. Patrimonial, RC Profissional e equipamentos."
    description="Cobertura patrimonial e RC para clínicas pequenas multidisciplinares em Guarulhos, conforme apólice."
    detailedDescription={`Clínicas pequenas costumam reunir várias especialidades em salas compartilhadas. O seguro pode combinar patrimonial, equipamentos, RC Operações e RC Profissional, conforme apólice.\n\nA Patro orienta pequenas clínicas em Guarulhos a priorizar coberturas essenciais (incêndio, danos elétricos, roubo, RC) e depois evoluir para cyber e lucros cessantes conforme o crescimento.`}
    coverages={[
      { title: "Incêndio, raio, explosão e danos elétricos", description: "Proteção patrimonial." },
      { title: "Roubo e furto qualificado", description: "Subtração de equipamentos, conforme apólice." },
      { title: "Equipamentos e eletrônicos", description: "Notebooks, macas, aparelhos de fisioterapia." },
      { title: "RC operações", description: "Danos a pacientes e terceiros nas dependências." },
      { title: "RC Profissional", description: "Reclamações da atuação profissional, sujeito à aceitação." },
      { title: "Cyber / LGPD", description: "Prontuários e dados de pacientes, conforme apólice." },
      { title: "Vazamentos e vidros", description: "Danos por água e quebra de vidros." },
      { title: "Assistência 24h", description: "Serviços emergenciais, conforme apólice." },
    ]}
    whoNeeds={["Clínicas de fisioterapia","Consultórios de psicologia","Clínicas de nutrição e fonoaudiologia","Espaços multidisciplinares de saúde"]}
    whyPatro={["Consultoria para clínicas pequenas em Guarulhos","Priorização de coberturas essenciais","Comparativo entre seguradoras","Suporte humano em sinistro"]}
    importantDetails={[
      { title: "Por onde começar", content: "Comece pelo patrimonial e RC Operações. Depois avalie RC Profissional, cyber e lucros cessantes." },
      { title: "Sala compartilhada", content: "Se profissionais dividem sala, verifique se a apólice é única para a clínica ou individual por profissional." },
    ]}
    faqs={[
      { question: "Vale a pena para clínica pequena?", answer: "Sim, o custo de um sinistro pode inviabilizar a operação." },
      { question: "Preciso de RC Profissional por especialidade?", answer: "Depende da estrutura e aceitação. Podem existir apólices individuais ou coletivas." },
      { question: "Cobre prontuários?", answer: "Apoio em incidentes de dados pode ser incluído em cyber, conforme apólice." },
      { question: "Cobre roubo?", answer: "Sim, tipicamente na cobertura patrimonial, sujeito a limites." },
      { question: "Como cotar?", answer: "Informe endereço, especialidades, profissionais e valor de equipamentos." },
    ]}
    relatedInsurances={[
      { title: "Hub Consultórios e Clínicas", link: "/seguro-consultorio-guarulhos" },
      { title: "RC Profissional", link: "/seguro-rc-profissional" },
      { title: "Seguro Cyber", link: "/seguro-cyber" },
      { title: "Equipamentos de Consultório", link: "/seguro-equipamentos-consultorio-guarulhos" },
      { title: "Seguro Empresarial", link: "/seguro-empresarial" },
    ]}
    canonicalUrl="https://www.patroseguros.com.br/seguro-clinica-pequena-guarulhos"
    localSeo={{ city: "Guarulhos" }}
  />
);

export default SeguroClinicaPequenaGuarulhos;