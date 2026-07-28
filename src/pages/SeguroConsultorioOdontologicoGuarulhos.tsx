import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-planos-saude.webp";

const SeguroConsultorioOdontologicoGuarulhos = () => (
  <InsurancePageTemplate
    heroImage={heroImg}
    title="Seguro para Consultório Odontológico em Guarulhos | Patro"
    headline="Seguro para consultório odontológico em Guarulhos"
    subtitle="Proteção para dentistas e clínicas odontológicas: cadeira, raio-X, autoclave, compressor, danos elétricos, roubo, responsabilidade civil e continuidade do atendimento."
    icon="🦷"
    metaDescription="Seguro para consultório odontológico em Guarulhos: equipamentos, danos elétricos, roubo, RC Profissional e consultório alugado. Cotação consultiva com a Patro."
    description="Cobertura patrimonial e RC para dentistas e clínicas odontológicas em Guarulhos, conforme apólice e aceitação da seguradora."
    detailedDescription={`Consultórios odontológicos concentram equipamentos de alto valor — cadeira odontológica, compressor, autoclave, raio-X, ultrassom, scanner intraoral e computadores — em pouco espaço. Um sinistro (incêndio, danos elétricos, roubo) pode paralisar a agenda por semanas.\n\nA Patro Seguros orienta dentistas e clínicas em Guarulhos e região a combinarem seguro empresarial, cobertura para equipamentos, responsabilidade civil profissional e, quando disponível, lucros cessantes. As coberturas descritas são exemplificativas e dependem da apólice.`}
    coverages={[
      { title: "Equipamentos odontológicos", description: "Cadeira, raio-X, autoclave, compressor, ultrassom e scanner intraoral, conforme apólice." },
      { title: "Danos elétricos", description: "Curtos e sobretensões em equipamentos sensíveis, conforme condições." },
      { title: "Roubo e furto qualificado", description: "Subtração de equipamentos e eletrônicos, conforme apólice." },
      { title: "Incêndio, raio e explosão", description: "Proteção patrimonial ao imóvel e conteúdo." },
      { title: "Responsabilidade civil operações", description: "Danos a pacientes e terceiros nas dependências, conforme apólice." },
      { title: "Responsabilidade civil profissional (dentistas)", description: "Reclamações por erro/omissão, sujeito à aceitação da seguradora." },
      { title: "Lucros cessantes", description: "Apoio financeiro em paralisação por evento coberto, quando disponível." },
      { title: "Vazamentos e vidros", description: "Danos por água e quebra de vidros, conforme apólice." },
      { title: "Assistência 24h", description: "Chaveiro, vidraceiro e eletricista emergencial, conforme apólice." },
    ]}
    whoNeeds={[
      "Consultórios odontológicos individuais",
      "Clínicas odontológicas com múltiplas cadeiras",
      "Especialistas em ortodontia, endodontia e implantodontia",
      "Consultórios em salas comerciais alugadas",
    ]}
    whyPatro={[
      "Experiência com apólices para consultórios em Guarulhos",
      "Comparativo entre seguradoras parceiras",
      "Explicação clara de limites, exclusões e franquias",
      "Suporte humano em sinistro e renovação",
    ]}
    importantDetails={[
      { title: "Consultório alugado", content: "O contrato de locação da sala pode exigir seguro do imóvel. Além disso, o profissional pode contratar apólice para conteúdo, equipamentos e RC. Dúvidas jurídicas sobre o contrato devem ser avaliadas com advogado ou imobiliária." },
      { title: "Como cotar", content: "Informe endereço, CNPJ/CPF, valor de equipamentos, número de cadeiras, se o imóvel é próprio ou alugado e coberturas desejadas. Fazemos comparativo consultivo, sem compromisso." },
    ]}
    faqs={[
      { question: "Cobre cadeira, raio-X e autoclave?", answer: "Sim, tipicamente por meio da cobertura patrimonial ou de equipamentos específicos, conforme apólice e valores declarados." },
      { question: "Cobre danos elétricos em equipamentos?", answer: "A cobertura de danos elétricos pode ser incluída na apólice patrimonial, conforme condições e franquia." },
      { question: "Cobre roubo de equipamentos?", answer: "Roubo e furto qualificado são coberturas comuns, sujeitos a limites e comprovação, conforme apólice." },
      { question: "RC Profissional está incluída?", answer: "É um produto separado, complementar ao patrimonial. Sujeito à aceitação da seguradora." },
      { question: "Consultório alugado precisa de seguro?", answer: "Frequentemente o contrato de locação exige seguro. O profissional pode contratar apólice específica para conteúdo, equipamentos e RC." },
      { question: "Quanto custa?", answer: "Depende do valor dos equipamentos, do imóvel e das coberturas escolhidas. Fazemos comparativo consultivo — não prometemos preço." },
    ]}
    relatedInsurances={[
      { title: "Hub Consultórios e Clínicas", link: "/seguro-consultorio-guarulhos" },
      { title: "Consultório Médico", link: "/seguro-consultorio-medico-guarulhos" },
      { title: "RC Profissional", link: "/seguro-rc-profissional" },
      { title: "Equipamentos de Consultório", link: "/seguro-equipamentos-consultorio-guarulhos" },
      { title: "Seguro Empresarial", link: "/seguro-empresarial" },
    ]}
    canonicalUrl="https://www.patroseguros.com.br/seguro-consultorio-odontologico-guarulhos"
    localSeo={{ city: "Guarulhos" }}
  />
);

export default SeguroConsultorioOdontologicoGuarulhos;