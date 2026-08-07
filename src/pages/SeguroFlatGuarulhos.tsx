import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-seguro-residencial.webp";
import { Helmet } from "react-helmet-async";
import ComparisonTableResidencial from "@/components/ComparisonTableResidencial";

const TIPOS = [
  { title: "Flat para moradia própria", link: "/seguro-residencial", summary: "Proteção residencial para quem mora em flat: estrutura, conteúdo, RC e assistência 24h." },
  { title: "Flat mobiliado", link: "/seguro-residencial", summary: "Cobertura para móveis, eletrodomésticos, eletrônicos e itens internos, conforme apólice." },
  { title: "Flat para locação tradicional", link: "/seguro-fianca-locaticia", summary: "Proteção do imóvel alugado e organização de responsabilidades entre proprietário e inquilino." },
  { title: "Flat para temporada / Airbnb / Booking", link: "/seguro-flat-guarulhos", summary: "Uso de curta duração — aceitação e coberturas variam conforme seguradora e uso declarado." },
  { title: "Flat para investimento", link: "/patro-private", summary: "Proteção patrimonial para investidores imobiliários — mobília, imóvel e riscos de locação." },
];


const SeguroFlatGuarulhos = () => (
  <>
    <InsurancePageTemplate
      heroImage={heroImg}
      title="Seguro para Flat em Guarulhos e SP | Residencial e Locação"
      headline="Seguro para flats residenciais e de locação"
      subtitle="A Patro Seguros ajuda proprietários, investidores e moradores a proteger flats residenciais, mobiliados, alugados ou destinados à temporada em Guarulhos, São Paulo e região."
      icon="🏙️"
      metaDescription="Proteja seu flat em Guarulhos e SP contra incêndio, roubo, danos elétricos, responsabilidade civil, aluguel e riscos de locação. Cotação com a Patro."
      description="Seguro consultivo para flats residenciais, mobiliados, para locação tradicional ou temporada — coberturas patrimoniais, RC, mobília e assistência, conforme apólice."
      detailedDescription={`Seguro para flat é uma proteção voltada para imóveis compactos, mobiliados ou com uso residencial/locação, que pode proteger estrutura, conteúdo, móveis, eletrodomésticos, responsabilidade civil, danos elétricos e prejuízos relacionados ao imóvel, conforme condições da apólice.\n\nAs coberturas podem variar conforme o uso do imóvel: flat para moradia própria, flat alugado de forma tradicional, flat mobiliado, flat para temporada, flat dentro de condomínio/hotelaria ou flat usado como investimento. Cada perfil exige análise específica — a aceitação e o preço dependem da seguradora, do produto contratado e da forma como o imóvel é utilizado.\n\nA Patro Seguros é corretora sediada em Guarulhos, com atuação consultiva para proprietários, moradores, investidores, locadores, inquilinos, administradoras e imobiliárias em Guarulhos, São Paulo e região metropolitana. Comparamos seguradoras parceiras e explicamos limites, exclusões e franquias antes da contratação. Não prometemos cobertura automática para Airbnb ou locação por temporada — o uso do imóvel deve ser declarado corretamente para evitar problemas em caso de sinistro.`}
      coverages={[
        { title: "Incêndio, raio e explosão", description: "Proteção patrimonial ao imóvel e conteúdo do flat, conforme apólice." },
        { title: "Danos elétricos", description: "Curtos-circuitos e sobretensões em eletrônicos e instalações, conforme apólice." },
        { title: "Roubo e furto qualificado", description: "Subtração de bens com arrombamento, conforme condições e limites." },
        { title: "Vendaval e quebra de vidros", description: "Fachadas, janelas e eventos climáticos, conforme apólice." },
        { title: "Vazamentos e alagamentos", description: "Danos por rompimento de tubulações e água, conforme condições." },
        { title: "Danos ao conteúdo", description: "Bens internos do flat contra eventos cobertos, conforme apólice." },
        { title: "Móveis planejados", description: "Cobertura para armários, cozinha e mobília fixa, conforme condições." },
        { title: "Eletrodomésticos e eletrônicos", description: "Geladeira, TV, máquina de lavar, notebooks — conforme apólice." },
        { title: "Responsabilidade civil familiar", description: "Danos involuntários causados a terceiros, conforme apólice." },
        { title: "Responsabilidade civil do imóvel", description: "Danos originados no flat a vizinhos e terceiros, conforme condições." },
        { title: "Assistência 24h", description: "Chaveiro, encanador, eletricista e vidraceiro em emergências, conforme apólice." },
        { title: "Perda ou pagamento de aluguel", description: "Cobertura contratual em locações, quando disponível no produto." },
        { title: "Danos ao imóvel alugado", description: "Proteção da estrutura em imóveis locados, quando disponível." },
        { title: "Danos causados por hóspedes/inquilinos", description: "Cobertura específica, quando houver produto compatível e aceitação." },
      ]}
      whoNeeds={[
        "Proprietários de flats em Guarulhos e São Paulo",
        "Moradores e inquilinos de flats residenciais e mobiliados",
        "Investidores imobiliários que usam o flat como fonte de renda",
        "Locadores que alugam flats de forma tradicional",
        "Anfitriões de plataformas de temporada (Airbnb, Booking) — sujeito à aceitação",
        "Administradoras e imobiliárias que gerenciam unidades",
        "Clientes de maior renda com múltiplos imóveis (Patro Private)",
      ]}
      whyPatro={[
        "Corretora sediada em Guarulhos, com atuação em toda a Grande SP",
        "Análise consultiva do uso do flat (moradia, locação ou temporada)",
        "Comparativo entre seguradoras parceiras — foco em aceitação e coberturas",
        "Explicação clara sobre limites, exclusões e franquias antes da contratação",
        "Integração com Patro Private para investidores e clientes premium",
        "Suporte humano em contratação, renovação e sinistro",
      ]}
      howItWorks={[
        { step: "1", title: "Entendemos o uso do flat", description: "Moradia própria, alugado tradicional, temporada ou investimento." },
        { step: "2", title: "Avaliamos perfil e ocupação", description: "Se você é proprietário, inquilino, investidor ou anfitrião." },
        { step: "3", title: "Levantamos valores", description: "Imóvel, mobília, eletrônicos e conteúdo interno." },
        { step: "4", title: "Verificamos coberturas importantes", description: "Patrimoniais, RC, perda de aluguel e assistência 24h." },
        { step: "5", title: "Comparamos seguradoras parceiras", description: "Aceitação, limites, franquias e preço." },
        { step: "6", title: "Explicamos exclusões e limites", description: "Transparência total antes da contratação." },
        { step: "7", title: "Ajudamos na contratação e sinistro", description: "Suporte humano em todo o ciclo da apólice." },
      ]}
      importantDetails={[
        {
          title: "Flat residencial x flat para locação",
          content: "O uso do imóvel influencia diretamente a cotação e a aceitação. Um flat usado como residência própria tem risco diferente de um flat alugado por temporada. Critérios como uso do imóvel, quem contrata, principais riscos, coberturas importantes, exigências contratuais e necessidade de informar a seguradora sobre uso para locação variam caso a caso. Por isso, a Patro analisa o perfil do imóvel antes de indicar a melhor opção.",
        },
        {
          title: "Seguro para flat alugado: proprietário ou inquilino?",
          content: "Em contratos de locação, o seguro pode envolver responsabilidades diferentes. O proprietário geralmente se preocupa com a proteção do imóvel e da mobília. O inquilino pode precisar proteger seus bens, responsabilidade civil e eventuais obrigações previstas no contrato. A definição deve considerar o contrato de locação. A Patro orienta sobre seguros — dúvidas jurídicas sobre contrato devem ser avaliadas com advogado ou imobiliária.",
        },
        {
          title: "Seguro para flat de temporada",
          content: "Flats usados em plataformas de temporada, como Airbnb e Booking, exigem atenção especial. Nem todas as seguradoras aceitam esse uso nas mesmas condições de um imóvel residencial comum. É fundamental declarar corretamente o uso do imóvel para evitar problemas em caso de sinistro. A aceitação e cobertura para locação por temporada dependem da seguradora, produto contratado e condições da apólice.",
        },
        {
          title: "Seguro fiança e garantia locatícia para flat",
          content: "Além do seguro residencial, o proprietário ou inquilino pode precisar de seguro fiança locatícia ou outra garantia para o contrato. A Patro pode orientar opções conforme perfil, administradora/imobiliária e seguradora parceira. Veja também nossa página de Seguro Fiança Locatícia.",
        },
        {
          title: "Informações para cotação",
          content: "Endereço do flat, tipo de uso (moradia, locação tradicional ou temporada), valor estimado do imóvel, valor estimado da mobília/conteúdo, existência de portaria/segurança/condomínio, andar, se há contrato de locação, se há uso por plataformas de temporada, coberturas desejadas e dados do proprietário/inquilino.",
        },
        {
          title: "Atendimento em Guarulhos e São Paulo",
          content: "A Patro Seguros atende proprietários, moradores e investidores em Guarulhos, Cidade Maia, Centro, Vila Galvão, Cumbica, Jardim Maia, Vila Augusta, Gopoúva, Picanço, São Paulo, Zona Leste, região do Aeroporto, Grande São Paulo e demais regiões.",
        },
      ]}
      faqs={[
        { question: "O que o seguro para flat cobre em Guarulhos?", answer: "Cobre incêndio, raio, explosão, roubo e furto qualificado, danos elétricos (muito comum em flats com muitos eletrônicos), responsabilidade civil e assistência 24h completa (chaveiro, encanador, eletricista)." },
        { question: "O seguro cobre danos causados por hóspedes de Airbnb?", answer: "Sim, na Patro Seguros trabalhamos com seguradoras que possuem cláusulas específicas para locação de curta temporada, protegendo seu patrimônio contra danos causados por inquilinos temporários." },
        { question: "Qual a diferença entre o seguro do condomínio e o seguro do flat?", answer: "O seguro do condomínio protege as áreas comuns e a estrutura global. O seguro do flat (residencial individual) protege seus bens (móveis, eletrônicos), benfeitorias internas e danos que você possa causar aos vizinhos (vazamentos)." },
        { question: "Como funciona a assistência 24h para flats mobiliados?", answer: "Oferecemos assistência completa que inclui reparo em eletrodomésticos, além dos serviços emergenciais de hidráulica e elétrica, garantindo que o imóvel esteja sempre pronto para uso ou locação." },
        { question: "Seguro residencial cobre flat?", answer: "Em geral, sim — mas as condições dependem do uso do imóvel e da aceitação da seguradora. Flats residenciais costumam ser aceitos como imóveis residenciais. Flats mobiliados, para locação ou temporada exigem análise específica." },
        { question: "Posso fazer seguro para flat alugado?", answer: "Sim. O seguro pode ser contratado pelo proprietário, pelo inquilino ou por ambos, dependendo do contrato de locação e das responsabilidades envolvidas." },
        { question: "Quanto custa seguro para flat?", answer: "O preço depende do endereço, valor do imóvel e mobília, uso declarado, coberturas escolhidas e análise da seguradora. Não prometemos preço — fazemos comparativo consultivo, sem compromisso." }
      ]}
      relatedInsurances={[
        { title: "Seguro Residencial", link: "/seguro-residencial" },
        { title: "Seguros em Guarulhos", link: "/seguros-guarulhos" },
        { title: "Seguro Fiança Locatícia", link: "/seguro-fianca-locaticia" },
        { title: "Patro Private", link: "/patro-private" },
        { title: "Seguro Residencial Alto Padrão em Guarulhos", link: "/seguro-residencial-alto-padrao-guarulhos" },
        { title: "Seguro Condomínio Residencial", link: "/seguro-condominio-residencial" },
        { title: "Proteção Patrimonial Familiar", link: "/protecao-patrimonial-familiar-guarulhos" },
      ]}
      extraSections={<ComparisonTableResidencial />}
      quoteFormFields={[
        { id: "uso", label: "Tipo de uso do flat", placeholder: "Selecione", type: "select", options: ["Moradia Própria", "Locação Tradicional (Anual)", "Temporada (Airbnb/Booking)", "Investimento (Vazio)"] },
        { id: "mobiliado", label: "O flat é mobiliado?", placeholder: "Selecione", type: "select", options: ["Sim, mobília completa", "Parcialmente mobiliado", "Não (Vazio)"] },
        { id: "cep", label: "CEP do imóvel", placeholder: "Ex: 07115-000", type: "text" },
        { id: "valor_bens", label: "Valor estimado do conteúdo", placeholder: "Selecione", type: "select", options: ["Até R$ 30 mil", "R$ 30 mil a R$ 70 mil", "R$ 70 mil a R$ 150 mil", "Acima de R$ 150 mil"] }
      ]}

      canonicalUrl="https://www.patroseguros.com.br/seguro-flat-guarulhos"
      localSeo={{ city: "Guarulhos" }}
    />


    <Helmet>
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Tipos de flats atendidos em Guarulhos e São Paulo",
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

export default SeguroFlatGuarulhos;