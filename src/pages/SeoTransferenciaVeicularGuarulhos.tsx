import LocalPageTemplate from "@/components/LocalPageTemplate";
import heroImg from "@/assets/hero-seguro-empresarial.webp";

const SeoTransferenciaVeicularGuarulhos = () => (
  <LocalPageTemplate
    slug="seguro-transferencia-veicular"
    title="Seguro para Empresas de Transferência Veicular em Guarulhos"
    subtitle="Proteção para empresas de regularização e vistoria de transferência."
    metaDescription="Seguro para empresas de transferência e regularização de veículos em Guarulhos. Responsabilidade civil e empresarial para ECVs e parceiros. Cote agora."
    icon="📑"
    city="Guarulhos"
    description="Empresas que lidam com transferência veicular precisam de segurança total no manuseio de documentos e laudos oficiais."
    detailedDescription="A transferência de propriedade de um veículo envolve vistorias obrigatórias e conferência de dados sensíveis. Empresas de regularização em Guarulhos enfrentam riscos de erros operacionais que podem travar processos no Detran.\n\nA Patro Seguros oferece proteção específica para este nicho, incluindo seguros de Responsabilidade Civil e cobertura para Reconstituição de Documentos, garantindo que falhas administrativas não gerem prejuízos financeiros irreversíveis."
    pricing={{
      intro: "Planos competitivos focados em empresas de serviços automotivos e regularização.",
      factors: [
        "Número de processos mensais",
        "Volume de laudos emitidos",
        "Valor do mobiliário e equipamentos",
        "Nível de segurança digital"
      ],
      note: "Oferecemos pacotes com Seguro Cyber incluso para proteção de dados dos clientes."
    }}
    faqs={[
      { question: "O seguro cobre perda de documentos?", answer: "Sim, com a cobertura de Reconstituição de Documentos indenizamos os custos para refazer papéis oficiais." },
      { question: "Protege contra multas do Detran?", answer: "Algumas apólices de RC Profissional podem cobrir custos de defesa contra sanções administrativas decorrentes de erro não intencional." },
      { question: "Cobre roubo no escritório?", answer: "Sim, o seguro empresarial protege contra roubo e furto qualificado de móveis, computadores e valores." },
      { question: "Atendem em quais regiões de Guarulhos?", answer: "Temos forte atuação no Centro, Macedo e Vila Augusta, próximos aos principais pontos de regularização." },
      { question: "Como faço para cotar?", answer: "Pelo formulário, WhatsApp ou em nosso escritório no Edifício Via Alameda." }
    ]}
    insurers={[
      { name: "Porto Seguro", highlight: "Referência em serviços" },
      { name: "Tokio Marine", highlight: "Excelência em seguros PME" },
      { name: "Zurich Seguros", highlight: "Forte em riscos profissionais" },
      { name: "Allianz", highlight: "Garantia de solidez mundial" }
    ]}
    testimonials={[
      { author: "Cláudio R.", neighborhood: "Centro", quote: "Seguro essencial para nossa operação de transferência. Atendimento nota 10.", rating: 5 },
      { author: "Sonia M.", neighborhood: "Gopoúva", quote: "A Patro resolveu nossa apólice de RC de forma muito rápida e profissional.", rating: 5 }
    ]}
    realScenarios={[
      { title: "Indenização por Erro de Chassi", description: "Um erro na digitação do laudo causou atraso na transferência. O seguro cobriu as taxas extras e o suporte jurídico." },
      { title: "Escritório Inundado", description: "Um vazamento atingiu o arquivo de processos. O seguro pagou a limpeza e a recuperação dos computadores." }
    ]}
    coverages={[
      { title: "RC Profissional", description: "Proteção contra erros de laudo." },
      { title: "Reconstituição de Documentos", description: "Cobre custos de perda de arquivos." },
      { title: "Danos Elétricos", description: "Proteção para a rede de computadores." },
      { title: "Incêndio e Fumaça", description: "Segurança para o ponto comercial." }
    ]}
    whoNeeds={["Empresas de Regularização", "Despachantes", "ECVs de Transferência", "Avaliadores Automotivos"]}
    whyPatro={["Atendimento Local", "Especialistas em PME", "Consultoria Técnica", "Cotação Ágil"]}
    tips={["Verifique se seu sistema de gestão é compatível com as exigências da LGPD.", "Mantenha cópias digitais seguras de todos os laudos.", "Contrate a cobertura de Danos Morais na apólice de RC."]}
    relatedInsurances={[
      { title: "Seguro Vistoria Veicular", link: "/seguro-para-empresas-de-vistoria-veicular" },
      { title: "Seguro Despachantes", link: "/seguro-despachantes-e-vistorias" }
    ]}
    heroImage={heroImg}
  />
);

export default SeoTransferenciaVeicularGuarulhos;
