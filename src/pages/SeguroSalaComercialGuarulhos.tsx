import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-seguro-empresarial.webp";
import { Helmet } from "react-helmet-async";

const TIPOS = [
  { title: "Consultórios médicos", link: "/seguro-consultorio-medico-guarulhos", summary: "Proteção para equipamentos, mobiliário, prontuários e responsabilidade civil profissional, conforme apólice." },
  { title: "Clínicas odontológicas", link: "/seguro-consultorio-odontologico-guarulhos", summary: "Cadeira, autoclave, compressor, raio-X e insumos — coberturas conforme produto contratado." },
  { title: "Escritórios de advocacia", link: "/seguro-rc-profissional", summary: "Computadores, documentos, RC profissional e proteção contra riscos digitais." },
  { title: "Escritórios de contabilidade", link: "/seguro-cyber", summary: "Dados sensíveis, servidores, LGPD e continuidade da operação." },
  { title: "Coworkings e escritórios compartilhados", link: "/seguro-empresarial", summary: "Responsabilidade civil, terceiros, equipamentos e riscos comuns em ambientes compartilhados." },
  { title: "Salas em prédios comerciais", link: "/seguro-sala-comercial-guarulhos", summary: "Proteção patrimonial e RC para inquilinos e proprietários de salas em edifícios corporativos." },
];

const SeguroSalaComercialGuarulhos = () => (
  <>
    <InsurancePageTemplate
      heroImage={heroImg}
      quoteUrl="https://patroseguros.com.br/cotacao-auto"
      title="Seguro para Sala Comercial em Guarulhos | Patro Seguros"
      headline="Seguro para sala comercial em Guarulhos"
      subtitle="A Patro Seguros ajuda profissionais, clínicas, escritórios e pequenos negócios a protegerem salas comerciais, equipamentos e responsabilidade civil com atendimento consultivo em Guarulhos e São Paulo."
      icon="🏢"
      metaDescription="Proteja sua sala comercial em Guarulhos contra incêndio, roubo, danos elétricos, responsabilidade civil e prejuízos operacionais. Cotação com a Patro."
      description="Seguro consultivo para salas comerciais, consultórios, clínicas, escritórios e pequenos negócios em prédios comerciais — coberturas patrimoniais, RC, equipamentos e assistência 24h, conforme apólice."
      detailedDescription={`Seguro para sala comercial é uma proteção voltada para escritórios, consultórios, clínicas e empresas que ocupam salas em prédios comerciais. Ele pode proteger o imóvel, o conteúdo interno, equipamentos, móveis, documentos, responsabilidade civil e prejuízos decorrentes de eventos cobertos — sempre conforme condições da apólice e aceitação da seguradora.\n\nA análise varia conforme o perfil da sala: uso próprio ou alugada, atividade exercida (consultório, escritório, coworking), valor de equipamentos, exigências do contrato de locação e responsabilidades entre proprietário e inquilino. Cada situação exige uma cotação específica.\n\nA Patro Seguros é corretora sediada em Guarulhos, com atuação consultiva para profissionais liberais, clínicas, escritórios, imobiliárias, coworkings, prestadores de serviço e proprietários de salas comerciais em Guarulhos, São Paulo e região metropolitana. Comparamos seguradoras parceiras e explicamos limites, exclusões e franquias antes da contratação. Não prometemos preço nem aceitação garantida — cada risco é analisado individualmente.`}
      coverages={[
        { title: "Incêndio, raio e explosão", description: "Cobertura patrimonial à sala e ao conteúdo, conforme apólice." },
        { title: "Danos elétricos", description: "Curtos-circuitos e sobretensões em equipamentos e instalações, conforme apólice." },
        { title: "Roubo e furto qualificado", description: "Subtração de bens com arrombamento, incluindo notebooks e equipamentos, conforme condições." },
        { title: "Quebra de vidros", description: "Portas, divisórias e vitrines, conforme apólice." },
        { title: "Vendaval e impacto de veículos", description: "Eventos climáticos e colisões contra a estrutura, conforme condições." },
        { title: "Tumultos", description: "Danos decorrentes de tumultos, greves e lockout, conforme apólice." },
        { title: "Equipamentos eletrônicos", description: "Computadores, notebooks, servidores, autoclaves e equipamentos médicos/odontológicos, conforme produto." },
        { title: "Móveis, mercadorias e conteúdo interno", description: "Mobiliário, insumos e itens da sala, conforme apólice." },
        { title: "Responsabilidade civil", description: "Danos involuntários causados a terceiros no exercício da atividade, conforme condições." },
        { title: "Perda ou pagamento de aluguel", description: "Cobertura contratual em locações, quando disponível no produto." },
        { title: "Lucros cessantes", description: "Reposição do faturamento durante paralisação por sinistro coberto, quando disponível." },
        { title: "Assistência 24h", description: "Chaveiro, encanador, eletricista, vidraceiro e reparos emergenciais, conforme apólice." },
        { title: "Danos ao imóvel alugado", description: "Proteção da estrutura em salas locadas, quando disponível no produto." },
        { title: "Despesas emergenciais", description: "Custos para preservação e limpeza pós-sinistro, conforme condições." },
      ]}
      whoNeeds={[
        "Médicos, dentistas, psicólogos, fisioterapeutas e terapeutas",
        "Clínicas de saúde, estética e reabilitação",
        "Escritórios de advocacia, contabilidade e consultoria",
        "Arquitetos, engenheiros e projetistas",
        "Corretores de imóveis e imobiliárias",
        "Agências de marketing, publicidade e tecnologia",
        "Salões, estúdios e clínicas de estética",
        "Coworkings e administradoras de salas compartilhadas",
        "Prestadores de serviço em salas alugadas",
        "Proprietários de salas comerciais que alugam para terceiros",
      ]}
      whyPatro={[
        "Corretora sediada em Guarulhos, com atuação em toda a Grande SP",
        "Análise consultiva do perfil da sala e da atividade",
        "Comparativo entre seguradoras parceiras — foco em aceitação e coberturas",
        "Explicação clara sobre limites, exclusões e franquias antes da contratação",
        "Integração com RC Profissional, Cyber, Empresarial e Patro Private",
        "Suporte humano em contratação, renovação e sinistro",
      ]}
      howItWorks={[
        { step: "1", title: "Entendemos o tipo de sala e atividade", description: "Consultório, escritório, coworking, clínica ou uso misto." },
        { step: "2", title: "Levantamos valores", description: "Equipamentos, móveis, insumos e conteúdo interno." },
        { step: "3", title: "Verificamos o contrato de locação", description: "Quando aplicável, para alinhar coberturas às exigências." },
        { step: "4", title: "Comparamos seguradoras parceiras", description: "Aceitação, limites, franquias e preço." },
        { step: "5", title: "Explicamos coberturas e exclusões", description: "Transparência total antes da contratação." },
        { step: "6", title: "Ajudamos na contratação e sinistro", description: "Suporte humano em todo o ciclo da apólice." },
      ]}
      importantDetails={[
        {
          title: "Sala alugada: quem deve pagar o seguro?",
          content: "Em salas comerciais alugadas, o contrato de locação normalmente distribui responsabilidades. O proprietário costuma se preocupar com a proteção do imóvel; o inquilino, com o conteúdo, equipamentos, responsabilidade civil e eventuais danos ao imóvel alugado. A Patro orienta sobre o seguro, mas dúvidas jurídicas sobre o contrato devem ser avaliadas com advogado ou imobiliária responsável.",
        },
        {
          title: "Consultórios e clínicas",
          content: "Consultórios médicos, odontológicos, psicológicos e fisioterápicos costumam ter equipamentos caros, dependência de energia elétrica e forte necessidade de responsabilidade civil. Recomenda-se avaliar, em conjunto, Seguro para a sala, Seguro de Equipamentos e RC Profissional, quando aplicável.",
        },
        {
          title: "Escritórios e prestadores de serviço",
          content: "Escritórios de advocacia, contabilidade, consultoria, arquitetura e agências trabalham com computadores, servidores, documentos sigilosos e dados de clientes. Além do seguro patrimonial da sala, avalie Seguro Cyber e RC Profissional para uma proteção completa.",
        },
        {
          title: "Coworkings e salas compartilhadas",
          content: "Coworkings exigem atenção a responsabilidade civil, danos a equipamentos de terceiros e organização de contratos de uso. A cobertura ideal depende do modelo de operação e das exigências do administrador.",
        },
        {
          title: "Documentos e informações para cotação",
          content: "Endereço da sala, atividade exercida, CNPJ ou CPF, valor aproximado de bens e equipamentos, existência de alarme/portaria/segurança, contrato de locação (se aplicável), metragem, histórico de sinistro e coberturas desejadas.",
        },
        {
          title: "Atendimento em Guarulhos e São Paulo",
          content: "A Patro Seguros atende salas comerciais em Guarulhos, Cidade Maia, Centro, Vila Galvão, Cumbica, Pimentas, Bonsucesso, Vila Augusta, Jardim Maia, Gopoúva, Taboão, Macedo, Ponte Grande, Arujá, Itaquaquecetuba, Mairiporã, Zona Leste de São Paulo e região metropolitana.",
        },
      ]}
      faqs={[
        { question: "Seguro para sala comercial é obrigatório?", answer: "Não é obrigatório por lei, mas muitos contratos de locação exigem seguro incêndio compreensivo. Além disso, é a forma mais segura de proteger equipamentos, mobiliário e responsabilidade civil." },
        { question: "Quem paga o seguro da sala comercial: proprietário ou inquilino?", answer: "Depende do contrato de locação. O proprietário costuma proteger o imóvel; o inquilino, o conteúdo, equipamentos e RC. Dúvidas jurídicas devem ser avaliadas com advogado ou imobiliária." },
        { question: "O seguro cobre equipamentos eletrônicos?", answer: "Sim, quando contratada a cobertura específica. Notebooks, servidores, autoclaves e equipamentos médicos podem ser protegidos, conforme apólice." },
        { question: "Cobre danos elétricos?", answer: "Sim, quando contratada a cobertura de danos elétricos, contra curtos-circuitos e sobretensões, conforme apólice." },
        { question: "Cobre roubo de notebooks?", answer: "Sim, mediante cobertura de roubo/furto qualificado, geralmente com exigência de arrombamento, conforme condições da apólice." },
        { question: "Consultório médico precisa de seguro empresarial?", answer: "Recomenda-se um seguro adaptado ao consultório, contemplando equipamentos, RC e assistência. Em muitos casos, o produto é o Seguro Empresarial com coberturas ajustadas para consultório." },
        { question: "Clínica odontológica precisa de seguro específico?", answer: "Sim. Devido ao alto valor de equipamentos (cadeira, autoclave, compressor, raio-X) e da RC envolvida, a cotação deve considerar coberturas específicas para clínicas odontológicas." },
        { question: "Cobre responsabilidade civil?", answer: "Sim, quando incluída na apólice. Existe RC operacional (danos a terceiros no local) e RC profissional (erro no exercício da atividade) — muitas vezes contratadas em produtos distintos." },
        { question: "Posso contratar seguro para sala alugada?", answer: "Sim. Inquilinos podem contratar seguro para conteúdo, RC e danos ao imóvel alugado, atendendo também exigências do contrato de locação." },
        { question: "Quanto custa seguro para sala comercial?", answer: "O preço depende do endereço, atividade, valor dos bens, coberturas escolhidas e análise da seguradora. Não prometemos preço — fazemos comparativo consultivo, sem compromisso." },
        { question: "A Patro atende salas comerciais em Guarulhos?", answer: "Sim. Atendemos Guarulhos, Cidade Maia, Centro, Vila Galvão, Cumbica, Pimentas, Bonsucesso, Vila Augusta, Jardim Maia, Gopoúva, Taboão, Macedo, Ponte Grande, São Paulo, Zona Leste e Grande São Paulo." },
        { question: "Posso cotar pelo WhatsApp?", answer: "Sim. Fale com nossa equipe pelo WhatsApp e receba um comparativo consultivo, sem compromisso." },
      ]}
      relatedInsurances={[
        { title: "Seguro Empresarial", link: "/seguro-empresarial" },
        { title: "Responsabilidade Civil Profissional", link: "/seguro-rc-profissional" },
        { title: "Seguro Cyber", link: "/seguro-cyber" },
        { title: "Seguro para Consultórios em Guarulhos", link: "/seguro-consultorio-guarulhos" },
        { title: "Seguro para Clínica Odontológica", link: "/seguro-consultorio-odontologico-guarulhos" },
        { title: "Seguro para Equipamentos de Consultório", link: "/seguro-equipamentos-consultorio-guarulhos" },
        { title: "Seguro Fiança Locatícia", link: "/seguro-fianca-locaticia" },
      ]}
      canonicalUrl="https://www.patroseguros.com.br/seguro-sala-comercial-guarulhos"
      localSeo={{ city: "Guarulhos" }}
    />
    <Helmet>
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Perfis de sala comercial atendidos em Guarulhos e São Paulo",
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

export default SeguroSalaComercialGuarulhos;