import LandingPageTemplate from "@/components/LandingPageTemplate";
import heroImg from "@/assets/lp-seguro-galpoes.webp";
import LocalMapSection from "@/components/LocalMapSection";

const warehouseRoutes = [
  {
    neighborhood: "Cumbica",
    distance: "12km",
    time: "15 min",
    description: "Hub de logística internacional. Ideal para inquilinos que precisam de seguro fiança ou garantia para contratos de locação."
  },
  {
    neighborhood: "Vila Augusta",
    distance: "3.5km",
    time: "8 min",
    description: "Distribuição urbana (Last Mile). Proteção obrigatória para máquinas e estoque em espaços locados."
  },
  {
    neighborhood: "Cidade Maia",
    distance: "2.1km",
    time: "5 min",
    description: "Sede da Patro Seguros. Suporte jurídico e técnico para validação de cláusulas de seguro em contratos de aluguel."
  }
];

const LandingSeguroGalpaoAlugado = () => (
  <LandingPageTemplate
    heroImage={heroImg}
    title="Seguro para Galpão Alugado"
    heroEmoji="🏢"
    headline="Alugou um Galpão? Proteja sua Operação e Cumpra as Exigências do Contrato"
    subheadline="O seguro de galpão alugado é mais que uma obrigação contratual: é a garantia de que seu estoque, máquinas e o próprio contrato de locação estão blindados contra imprevistos."
    metaDescription="Seguro para Galpão Alugado em Guarulhos. Atenda exigências contratuais, proteja seu estoque e garanta o pagamento do aluguel. Cotação rápida em 2h."
    ctaText="Cotar Seguro para Locatário"
    urgencyText="Evite multas e rescisões contratuais por falta de seguro"
    priceAnchor="Custo-benefício estratégico para sua empresa"
    guaranteeText="Analisamos seu contrato de locação sem custo para garantir que as coberturas atendam 100% às exigências do proprietário ou imobiliária."
    extraSections={
      <LocalMapSection 
        routes={warehouseRoutes} 
        title="Especialistas em Locação Comercial em Guarulhos"
        description="Nossa equipe conhece as exigências das principais imobiliárias de Guarulhos e hubs logísticos como Cumbica e Vila Augusta."
      />
    }
    painPoints={[
      "O contrato de locação exige seguro contra incêndio e você não sabe por onde começar?",
      "Medo de perder seu estoque ou máquinas em um imóvel que não é seu?",
      "Preocupado com danos que sua operação possa causar à estrutura do galpão alugado?",
      "Precisa de agilidade para liberar as chaves mas a seguradora atual está demorando?",
    ]}
    stats={[
      { value: "2h", label: "Emissão Rápida" },
      { value: "100%", label: "Aceite Contratual" },
      { value: "R$0", label: "Análise de Contrato" },
      { value: "24h", label: "Assistência" },
    ]}
    benefits={[
      { icon: "📄", title: "Conformidade Contratual", description: "Garantimos que a apólice atenda exatamente ao que foi pedido pelo proprietário, evitando travas na locação." },
      { icon: "📦", title: "Proteção de Conteúdo", description: "Diferente do seguro do proprietário, o seu seguro cobre SEU estoque, SUAS máquinas e SEUS móveis." },
      { icon: "⚖️", title: "Responsabilidade Civil", description: "Cobre danos acidentais causados ao imóvel locado e a vizinhos, protegendo seu caixa de indenizações pesadas." },
      { icon: "🔥", title: "Incêndio e Queda de Raio", description: "Cobertura básica essencial exigida em 99% dos contratos de locação comercial e industrial." },
      { icon: "💰", title: "Perda de Aluguel", description: "Em caso de sinistro que impeça o uso do galpão, o seguro pode cobrir os meses de aluguel que você ainda deve pagar." },
      { icon: "🛠️", title: "Manutenção e Reparos", description: "Assistência 24h para serviços hidráulicos, elétricos e chaveiro no galpão locado." },
    ]}
    testimonials={[
      { name: "Carlos M.", role: "Inquilino em Cumbica", stars: 5, content: "A imobiliária exigiu cláusulas complexas. A Patro resolveu tudo em 3 horas e liberaram minhas chaves no mesmo dia." },
      { name: "Luciana F.", role: "Gerente Logística", stars: 5, content: "O seguro do galpão alugado salvou nossa operação após um curto-circuito. Cobriram os danos à estrutura e nossas máquinas." },
      { name: "Henrique S.", role: "Empresário", stars: 5, content: "Preço justo e atendimento focado em quem aluga. Recomendo para qualquer empresa que esteja vindo para Guarulhos." },
    ]}
    objections={[
      { question: "O proprietário já não tem seguro?", answer: "Geralmente o proprietário faz o seguro do prédio (estrutura), mas o contrato exige que VOCÊ faça um para cobrir a sua responsabilidade e o seu conteúdo." },
      { question: "O seguro serve como garantia locatícia?", answer: "Este é o seguro patrimonial. Se você precisa de uma alternativa ao fiador ou caução, nós também oferecemos o SEGURO FIANÇA, que substitui essas garantias." },
      { question: "Consigo contratar para galpão em condomínio logístico?", answer: "Sim! Adequamos a apólice às normas do condomínio e às exigências da administradora do hub." },
      { question: "Quanto tempo demora para emitir?", answer: "Para a maioria das atividades, emitimos a proposta e o certificado para a imobiliária em até 2 horas." },
    ]}
  />
);

export default LandingSeguroGalpaoAlugado;
