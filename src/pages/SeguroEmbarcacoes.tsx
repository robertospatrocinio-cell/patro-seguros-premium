import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const SeguroEmbarcacoes = () => {
  return (
    <InsurancePageTemplate
      title="Seguro Embarcações"
      subtitle="Proteção completa para lanchas, veleiros e embarcações de todos os portes"
      icon="⛵"
      metaDescription="Seguro de Embarcações para lanchas, veleiros e iates. Cobertura contra danos ao casco, roubo, RC e assistência náutica. Cotação grátis Patro Seguros."
      description="O Seguro de Embarcações garante proteção abrangente para lanchas, veleiros, iates e outras embarcações. Cubra seu patrimônio contra danos, roubo, responsabilidade civil e muito mais."
      coverages={[
        { title: "Casco e Máquinas", description: "Cobertura para danos ao casco, motor e sistemas mecânicos da embarcação." },
        { title: "Roubo e Furto Total", description: "Indenização integral em caso de roubo ou furto da embarcação." },
        { title: "Responsabilidade Civil", description: "Cobertura por danos materiais e corporais causados a terceiros durante a navegação." },
        { title: "Incêndio e Explosão", description: "Proteção contra incêndio, explosão e queda de raio na embarcação." },
        { title: "Naufrágio e Encalhe", description: "Cobertura em caso de naufrágio, afundamento, encalhe ou soçobramento." },
        { title: "Remoção de Destroços", description: "Custos de remoção de destroços em caso de sinistro total." },
        { title: "Proteção e Indenização", description: "Cobertura P&I (Protection & Indemnity) para responsabilidades marítimas." },
        { title: "Assistência 24h", description: "Reboque náutico, socorro mecânico e assistência completa na água." },
      ]}
      whoNeeds={[
        "Proprietários de lanchas e veleiros",
        "Donos de iates e catamarãs",
        "Empresas de turismo náutico",
        "Pescadores profissionais",
        "Clubes náuticos e marinas",
      ]}
      whyPatro={[
        "Experiência em seguros náuticos de todos os portes",
        "Coberturas adaptadas ao tipo e uso da embarcação",
        "Assistência náutica 24h em todo o litoral",
        "Cotação com as principais seguradoras do mercado",
        "Suporte especializado do início ao fim",
      ]}
      faqs={[
        { question: "Quais tipos de embarcação podem ser segurados?", answer: "Lanchas, veleiros, iates, catamarãs, barcos de pesca, botes infláveis e outras embarcações de recreio ou uso profissional." },
        { question: "O seguro cobre navegação em alto mar?", answer: "Sim, dependendo do plano contratado, a cobertura pode incluir navegação costeira e em alto mar, conforme os limites definidos na apólice." },
        { question: "É necessário vistoria para contratar o seguro?", answer: "Sim, geralmente é necessária uma vistoria prévia da embarcação para avaliação do estado de conservação e definição do valor segurado." },
        { question: "O seguro cobre a embarcação fora da água?", answer: "Sim, a cobertura inclui a embarcação em garagem náutica, marina seca e durante o transporte terrestre." },
      ]}
      relatedInsurances={[
        { title: "Seguro Jet Ski", link: "/seguro-jetski" },
        { title: "Seguro Viagem", link: "/seguro-viagem" },
        { title: "Seguro Transporte", link: "/seguro-transporte" },
      ]}
    />
  );
};

export default SeguroEmbarcacoes;
