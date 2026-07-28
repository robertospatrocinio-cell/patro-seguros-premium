import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-planos-saude.webp";
import { Helmet } from "react-helmet-async";

const TIPOS = [
  { title: "Consultório Odontológico", link: "/seguro-consultorio-odontologico-guarulhos", summary: "Cadeira, raio-X, autoclave e RC Profissional para dentistas." },
  { title: "Consultório Médico", link: "/seguro-consultorio-medico-guarulhos", summary: "Equipamentos, prontuários, cyber/LGPD e RC para médicos." },
  { title: "Consultório Veterinário", link: "/seguro-consultorio-veterinario-guarulhos", summary: "Estrutura, equipamentos e RC para atendimento a animais." },
  { title: "Clínica de Estética", link: "/seguro-clinica-estetica-guarulhos", summary: "Procedimentos, laser, biomedicina estética e RC Profissional." },
  { title: "Consultório em Sala Comercial", link: "/seguro-empresarial", summary: "Salas alugadas em edifícios comerciais — patrimônio e RC." },
  { title: "Clínica Pequena", link: "/seguro-clinica-pequena-guarulhos", summary: "Clínicas multidisciplinares de saúde, terapias e reabilitação." },
  { title: "Equipamentos Profissionais", link: "/seguro-equipamentos-consultorio-guarulhos", summary: "Cobertura específica para equipamentos médicos, odontológicos e estéticos." },
  { title: "Responsabilidade Civil Profissional", link: "/seguro-rc-profissional", summary: "Proteção contra reclamações relacionadas à atuação profissional." },
  { title: "Seguro Cyber para Clínicas", link: "/seguro-cyber", summary: "Incidentes digitais, prontuários e LGPD, conforme apólice." },
];

const SeguroConsultorioGuarulhos = () => (
  <>
    <InsurancePageTemplate
      heroImage={heroImg}
      title="Seguro para Consultório em Guarulhos | Clínicas e Profissionais"
      headline="Seguro para consultórios e clínicas em Guarulhos"
      subtitle="A Patro Seguros ajuda médicos, dentistas, veterinários, esteticistas e profissionais da saúde a protegerem consultórios, equipamentos, responsabilidade civil e continuidade do atendimento."
      icon="🏥"
      metaDescription="Seguro para consultórios médicos, odontológicos, veterinários e clínicas de estética em Guarulhos. Proteja equipamentos, espaço e responsabilidade civil."
      description="Proteção consultiva para consultórios e clínicas: patrimônio, equipamentos, responsabilidade civil profissional, cyber/LGPD e continuidade da operação, conforme apólice."
      detailedDescription={`Seguro para consultório é uma proteção voltada para espaços profissionais da área da saúde, estética, atendimento e serviços especializados. Ele pode proteger estrutura, móveis, equipamentos, eletrônicos, responsabilidade civil, danos a terceiros e prejuízos decorrentes de eventos cobertos, conforme condições da apólice.\n\nEm muitos casos, o seguro ideal combina seguro empresarial ou patrimonial, responsabilidade civil profissional, seguro de equipamentos, seguro cyber/LGPD, cobertura para lucros cessantes (quando disponível) e assistência 24h.\n\nA Patro Seguros orienta profissionais liberais, pequenos empresários da saúde e clínicas em Guarulhos e região metropolitana de São Paulo. As coberturas descritas são exemplificativas — aceitação, limites e preço dependem da atividade, dos equipamentos e da análise técnica da seguradora.`}
      coverages={[
        { title: "Incêndio, raio e explosão", description: "Proteção patrimonial ao imóvel e conteúdo do consultório, conforme apólice." },
        { title: "Danos elétricos", description: "Curtos-circuitos e sobretensões em equipamentos e instalações, conforme apólice." },
        { title: "Roubo e furto qualificado", description: "Subtração de equipamentos, eletrônicos e valores, conforme condições." },
        { title: "Equipamentos profissionais", description: "Autoclave, raio-X, ultrassom, cadeira odontológica, laser e equipamentos estéticos." },
        { title: "Equipamentos eletrônicos e portáteis", description: "Notebooks, tablets, monitores e periféricos usados no atendimento." },
        { title: "Quebra de vidros e vendaval", description: "Fachadas, vitrines e eventos climáticos, conforme apólice." },
        { title: "Vazamentos e alagamentos", description: "Danos causados por rompimento de tubulações e água, conforme condições." },
        { title: "Móveis e conteúdo interno", description: "Mobiliário, decoração e insumos do consultório." },
        { title: "Responsabilidade civil operações", description: "Danos a pacientes e terceiros nas dependências, conforme apólice." },
        { title: "Responsabilidade civil profissional", description: "Reclamações relacionadas à atuação profissional, sujeito à aceitação." },
        { title: "Lucros cessantes", description: "Apoio financeiro em paralisação decorrente de evento coberto, quando disponível." },
        { title: "Perda ou pagamento de aluguel", description: "Cobertura contratual para consultórios locados, quando disponível." },
        { title: "Cyber / LGPD", description: "Incidentes digitais, prontuários e dados sensíveis, conforme apólice." },
        { title: "Refrigeração de medicamentos e vacinas", description: "Perda de insumos por falha de refrigeração, quando disponível." },
        { title: "Assistência 24h", description: "Chaveiro, vidraceiro, eletricista e serviços emergenciais, conforme apólice." },
      ]}
      whoNeeds={[
        "Consultórios odontológicos, médicos e veterinários",
        "Clínicas de estética, biomedicina estética e depilação",
        "Clínicas pequenas multidisciplinares (fisioterapia, nutrição, psicologia)",
        "Profissionais liberais em salas comerciais alugadas",
        "Consultórios com equipamentos de alto valor",
        "Clínicas que armazenam prontuários e dados sensíveis (LGPD)",
      ]}
      whyPatro={[
        "Consultoria dedicada a profissionais da saúde em Guarulhos e região",
        "Comparativo entre seguradoras parceiras com foco em consultórios",
        "Explicação clara de limites, exclusões e franquias",
        "Suporte humano em contratação, renovação e sinistro",
        "Orientação sobre integração entre patrimonial, RC Profissional e cyber",
      ]}
      howItWorks={[
        { step: "1", title: "Entendemos sua atividade", description: "Especialidade, porte, procedimentos e perfil de risco." },
        { step: "2", title: "Mapeamos espaço e equipamentos", description: "Valor de móveis, eletrônicos, equipamentos e insumos." },
        { step: "3", title: "Verificamos o imóvel", description: "Se é próprio ou alugado, e as exigências do contrato de locação." },
        { step: "4", title: "Indicamos coberturas compatíveis", description: "Patrimonial, RC Profissional, cyber, equipamentos e assistência." },
        { step: "5", title: "Comparamos seguradoras parceiras", description: "Análise de aceitação, limites, franquias e preço." },
        { step: "6", title: "Explicamos a apólice", description: "Coberturas incluídas, exclusões e como acionar sinistro." },
        { step: "7", title: "Acompanhamos contratação e suporte", description: "Renovações, ajustes e apoio em caso de sinistro." },
      ]}
      importantDetails={[
        {
          title: "Consultório alugado precisa de seguro?",
          content: "Muitos consultórios funcionam em salas comerciais alugadas. O contrato de locação pode exigir seguro ou definir responsabilidades entre proprietário e inquilino. Além do imóvel, o profissional precisa avaliar equipamentos, móveis, responsabilidade civil e continuidade do atendimento. A Patro orienta sobre seguro — dúvidas jurídicas sobre o contrato devem ser avaliadas com advogado ou imobiliária.",
        },
        {
          title: "Seguro patrimonial x RC Profissional x cyber",
          content: "Seguro patrimonial/empresarial protege espaço, equipamentos, móveis e riscos físicos. RC Profissional protege contra reclamações relacionadas à atuação profissional, conforme apólice. Cyber ajuda em riscos digitais, dados e incidentes cibernéticos. Equipamentos protege bens específicos, conforme modalidade contratada.",
        },
        {
          title: "Informações para cotação",
          content: "Tipo de consultório ou clínica, endereço, CNPJ ou CPF, atividade exercida, valor aproximado dos equipamentos e móveis, se o imóvel é próprio ou alugado, metragem, portaria/alarme/segurança, número de profissionais, se há prontuários/dados sensíveis e coberturas desejadas.",
        },
        {
          title: "Atendimento em Guarulhos e região",
          content: "A Patro Seguros atende consultórios e clínicas em Guarulhos, Cidade Maia, Centro, Vila Galvão, Cumbica, Pimentas, Bonsucesso, Vila Augusta, Jardim Maia, Gopoúva, Macedo, Taboão, Ponte Grande, Arujá, Itaquaquecetuba, Mairiporã, Zona Leste de São Paulo e região metropolitana.",
        },
      ]}
      faqs={[
        { question: "Seguro para consultório é obrigatório?", answer: "Não é obrigatório por lei, mas pode ser exigido no contrato de locação da sala comercial ou por convênios. A obrigatoriedade depende do caso — consulte seu contrato e assessoria jurídica." },
        { question: "Consultório alugado precisa de seguro?", answer: "Frequentemente o contrato de locação exige seguro do imóvel. Além disso, o profissional pode contratar apólice específica para conteúdo, equipamentos e responsabilidade civil, conforme necessidade." },
        { question: "O seguro cobre equipamentos médicos ou odontológicos?", answer: "Sim, geralmente por meio da cobertura patrimonial ou de equipamentos específicos, conforme apólice e valores declarados." },
        { question: "Cobre danos elétricos?", answer: "A cobertura para danos elétricos pode ser incluída na apólice patrimonial, conforme condições e franquia." },
        { question: "Cobre roubo de equipamentos?", answer: "Roubo e furto qualificado são coberturas comuns em seguros empresariais, sujeitos a limites, franquias e comprovação, conforme apólice." },
        { question: "Qual a diferença entre seguro empresarial e RC Profissional?", answer: "O seguro empresarial protege o patrimônio (espaço, equipamentos, móveis). A RC Profissional protege contra reclamações relacionadas à atuação profissional. São produtos complementares." },
        { question: "Clínica precisa de seguro cyber?", answer: "Clínicas com prontuários eletrônicos, sistemas de agendamento e dados sensíveis podem se beneficiar de seguro cyber para apoio em incidentes e LGPD, conforme apólice." },
        { question: "Seguro cobre interrupção de atendimento?", answer: "A cobertura de lucros cessantes ou de continuidade do negócio pode indenizar a paralisação decorrente de evento coberto, quando disponível." },
        { question: "Quanto custa seguro para consultório?", answer: "O preço depende da atividade, do valor dos equipamentos, do imóvel, das coberturas escolhidas e da análise de risco da seguradora. Não prometemos preço — fazemos comparativo consultivo." },
        { question: "A Patro atende consultórios em Guarulhos?", answer: "Sim. Atendemos consultórios e clínicas em Guarulhos, região metropolitana e Zona Leste de São Paulo, com suporte humano e comparativo entre seguradoras parceiras." },
        { question: "Posso cotar pelo WhatsApp?", answer: "Sim. Fale com nossa equipe pelo WhatsApp e receba um comparativo consultivo, sem compromisso." },
      ]}
      relatedInsurances={[
        { title: "Consultório Odontológico", link: "/seguro-consultorio-odontologico-guarulhos" },
        { title: "Consultório Médico", link: "/seguro-consultorio-medico-guarulhos" },
        { title: "Consultório Veterinário", link: "/seguro-consultorio-veterinario-guarulhos" },
        { title: "Clínica de Estética", link: "/seguro-clinica-estetica-guarulhos" },
        { title: "Clínica Pequena", link: "/seguro-clinica-pequena-guarulhos" },
        { title: "Equipamentos de Consultório", link: "/seguro-equipamentos-consultorio-guarulhos" },
        { title: "RC Profissional", link: "/seguro-rc-profissional" },
        { title: "Seguro Cyber", link: "/seguro-cyber" },
        { title: "Seguro Empresarial", link: "/seguro-empresarial" },
      ]}
      canonicalUrl="https://www.patroseguros.com.br/seguro-consultorio-guarulhos"
      localSeo={{ city: "Guarulhos" }}
    />
    <Helmet>
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Tipos de consultórios e clínicas atendidos em Guarulhos",
        itemListElement: TIPOS.map((t, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: t.title,
          url: `https://www.patroseguros.com.br${t.link}`,
        })),
      })}</script>
    </Helmet>
  </>
);

export default SeguroConsultorioGuarulhos;