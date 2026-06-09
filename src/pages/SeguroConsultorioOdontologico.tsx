import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-seguro-empresarial.webp";

const SeguroConsultorioOdontologico = () => (
  <InsurancePageTemplate
    heroImage={heroImg}
    title="Seguro para Consultório Odontológico"
    subtitle="Proteção empresarial para consultórios odontológicos de pequeno e médio porte."
    icon="🏥"
    metaDescription="Seguro para consultório odontológico em Guarulhos — incêndio, roubo, equipamentos, RC e lucros cessantes. Cotação grátis com a Patro Seguros."
    description="Cobertura empresarial completa para consultórios odontológicos: patrimônio, equipamentos, responsabilidade civil e lucros cessantes."
    detailedDescription={`O consultório odontológico tem riscos específicos: equipamentos caros e fixos (cadeira, raio-X, autoclave), insumos químicos com risco de incêndio, fluxo intenso de pacientes (risco de RC operações) e dependência do funcionamento contínuo para gerar receita.\n\nA Patro Seguros monta apólices empresariais integradas, com seguradoras que conhecem o segmento e oferecem coberturas adequadas — incluindo lucros cessantes, fundamental para consultórios que paralisam após um sinistro.`}
    coverages={[
      { title: "Incêndio e Danos Elétricos", description: "Cobertura para o imóvel, conteúdo, equipamentos e mobiliário do consultório." },
      { title: "Roubo e Furto Qualificado", description: "Proteção contra subtração de equipamentos, computadores e valores em espécie." },
      { title: "Vendaval e Alagamento", description: "Cobertura para eventos climáticos — relevante em Guarulhos." },
      { title: "Equipamentos Odontológicos", description: "Cadeiras, raio-X, autoclave, ultrassom, scanner intraoral e computadores." },
      { title: "Responsabilidade Civil Operações", description: "Danos a pacientes e terceiros nas dependências do consultório." },
      { title: "Lucros Cessantes", description: "Indenização pelo período de paralisação após sinistro coberto." },
    ]}
    whoNeeds={[
      "Consultórios odontológicos individuais",
      "Consultórios com 2 a 4 cadeiras",
      "Profissionais que dividem sala com outros dentistas",
      "Especialistas em ortodontia, endodontia e implantodontia",
    ]}
    whyPatro={[
      "Especialista em seguro empresarial para saúde",
      "Apólices customizadas para o tamanho do consultório",
      "Negociação direta com as principais seguradoras",
      "Suporte completo em sinistros e renovações",
    ]}
    faqs={[
      { question: "Preciso ter alvará para contratar?", answer: "Recomendamos sim. O alvará da Vigilância Sanitária facilita a aceitação e a precificação correta da apólice." },
      { question: "O seguro cobre se eu alugar o consultório?", answer: "Sim. Existe apólice tanto para o proprietário do imóvel quanto para o locatário (conteúdo)." },
      { question: "Lucros cessantes vale a pena?", answer: "Sim. Em caso de incêndio, o consultório pode ficar paralisado por 3 a 6 meses. A cobertura repõe o faturamento e mantém os custos fixos." },
      { question: "Qual o valor médio?", answer: "Consultórios pequenos: R$ 1.500 a R$ 3.500/ano. Consultórios médios com várias cadeiras: R$ 3.500 a R$ 8.000/ano." },
    ]}
    relatedInsurances={[
      { title: "Clínica Odontológica", link: "/seguro-clinica-odontologica" },
      { title: "RC Dentistas", link: "/responsabilidade-civil-dentistas" },
      { title: "Equipamentos Odontológicos", link: "/seguro-equipamentos-odontologicos" },
      { title: "Hub Clínicas Odontológicas", link: "/seguros-para-clinicas-odontologicas" },
    ]}
  />
);

export default SeguroConsultorioOdontologico;