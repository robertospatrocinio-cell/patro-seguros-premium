import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-planos-saude.webp";

const SeguroEquipamentosConsultorioGuarulhos = () => (
  <InsurancePageTemplate
    heroImage={heroImg}
    title="Seguro para Equipamentos de Consultório em Guarulhos | Patro"
    headline="Seguro para equipamentos de consultório em Guarulhos"
    subtitle="Proteção para equipamentos médicos, odontológicos, veterinários, estéticos e eletrônicos — fixos e portáteis, conforme apólice."
    icon="🩻"
    metaDescription="Seguro para equipamentos de consultório em Guarulhos: autoclave, ultrassom, raio-X, cadeira odontológica, notebooks e portáteis."
    description="Cobertura específica para equipamentos de consultórios e clínicas em Guarulhos, conforme apólice."
    detailedDescription={`O seguro de equipamentos protege bens específicos do consultório — fixos (autoclave, ultrassom, raio-X, cadeira odontológica) e portáteis (notebooks, tablets, câmeras). Pode compor um empresarial multirrisco ou ser contratado como apólice específica.\n\nA Patro orienta profissionais em Guarulhos a declarar corretamente valores e a escolher entre modalidades fixas e portáteis, evitando sub-seguro e conflitos em sinistro.`}
    coverages={[
      { title: "Equipamentos fixos", description: "Autoclave, cadeira odontológica, raio-X, ultrassom, laser estético." },
      { title: "Equipamentos portáteis", description: "Notebooks, tablets, câmeras e monitores que saem do estabelecimento." },
      { title: "Danos elétricos", description: "Curtos e sobretensões, conforme apólice." },
      { title: "Roubo e furto qualificado", description: "Subtração, conforme apólice." },
      { title: "Quebra acidental", description: "Danos por queda ou impacto, conforme condições." },
      { title: "Assistência técnica", description: "Encaminhamento para reparo, conforme apólice." },
    ]}
    whoNeeds={["Consultórios com equipamentos de alto valor","Clínicas com equipamentos portáteis","Profissionais que atendem em domicílio","Clínicas com servidores e eletrônicos"]}
    whyPatro={["Consultoria para equipamentos médicos, odontológicos, veterinários e estéticos","Orientação sobre modalidades fixas x portáteis","Comparativo entre seguradoras","Suporte humano em sinistro"]}
    importantDetails={[
      { title: "Inventário e notas fiscais", content: "Mantenha inventário atualizado, com modelo, número de série e nota fiscal. Facilita a análise técnica e a comprovação em sinistro." },
      { title: "Fixos x portáteis", content: "Equipamentos que saem do consultório precisam ser incluídos em cobertura de portáteis." },
    ]}
    faqs={[
      { question: "Cobre equipamento fora do consultório?", answer: "Sim, quando incluído na cobertura de portáteis, conforme apólice." },
      { question: "Cobre quebra acidental?", answer: "Modalidades específicas podem incluir, conforme condições e franquia." },
      { question: "Cobre roubo?", answer: "Sim, roubo e furto qualificado são coberturas comuns, sujeitas a limites e comprovação." },
      { question: "Cobre servidor e prontuário eletrônico?", answer: "O equipamento pode ser coberto; a proteção lógica dos dados exige seguro cyber." },
      { question: "Como declarar valores?", answer: "Recomendamos declarar valor de reposição a novo, com base em notas fiscais recentes." },
    ]}
    relatedInsurances={[
      { title: "Hub Consultórios e Clínicas", link: "/seguro-consultorio-guarulhos" },
      { title: "Equipamentos Odontológicos", link: "/seguro-equipamentos-odontologicos" },
      { title: "Equipamentos Veterinários", link: "/seguro-equipamentos-veterinarios" },
      { title: "Seguro Cyber", link: "/seguro-cyber" },
      { title: "Seguro Empresarial", link: "/seguro-empresarial" },
    ]}
    canonicalUrl="https://www.patroseguros.com.br/seguro-equipamentos-consultorio-guarulhos"
    localSeo={{ city: "Guarulhos" }}
  />
);

export default SeguroEquipamentosConsultorioGuarulhos;