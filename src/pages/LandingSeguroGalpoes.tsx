import LandingPageTemplate from "@/components/LandingPageTemplate";

const LandingSeguroGalpoes = () => (
  <LandingPageTemplate
    title="Seguro de Galpões"
    heroEmoji="🏭"
    headline="Seu galpão vale milhões. E está protegido por quanto?"
    subheadline="Incêndio, roubo, danos elétricos, RC e lucros cessantes. Proteja seu galpão industrial, logístico ou comercial com as melhores seguradoras."
    metaDescription="Seguro de Galpões Industriais e Logísticos. Proteção contra incêndio, roubo e RC. Cotação gratuita. Patro Seguros Guarulhos."
    ctaText="Cotar Seguro do Meu Galpão"
    urgencyText="Incêndios em galpões causam prejuízos milionários"
    priceAnchor="Valores sob medida para seu patrimônio"
    guaranteeText="Visitamos seu galpão (se necessário), analisamos os riscos e apresentamos no mínimo 3 propostas comparativas. 100% gratuito."
    painPoints={[
      "Seu galpão tem estoque de milhões e não tem proteção contra incêndio ou roubo?",
      "Já viu notícias de galpões que pegaram fogo e o dono perdeu tudo da noite pro dia?",
      "Um funcionário ou visitante se machucou no seu galpão e você arcou com o processo?",
      "Teve equipamentos roubados ou danificados por problemas elétricos e pagou do próprio bolso?",
    ]}
    stats={[
      { value: "16+", label: "Seguradoras" },
      { value: "2h", label: "Tempo Resposta" },
      { value: "R$2B+", label: "Em coberturas" },
      { value: "100%", label: "Gratuito" },
    ]}
    benefits={[
      { icon: "🔥", title: "Incêndio e explosão", description: "Proteção total para estrutura, estoque, máquinas e conteúdo. Cobre reconstrução completa do galpão." },
      { icon: "🔒", title: "Roubo de mercadorias", description: "Estoque, matéria-prima, produtos acabados — tudo protegido contra arrombamento e furto qualificado." },
      { icon: "⚡", title: "Danos elétricos", description: "Curto-circuito em equipamentos, queima de painéis elétricos, sobrecarga. Proteja seu maquinário." },
      { icon: "📉", title: "Lucros cessantes", description: "Se o galpão parar por sinistro, o seguro cobre seu faturamento mensal durante a recuperação." },
      { icon: "⚖️", title: "RC do proprietário", description: "Acidentes com funcionários, visitantes ou vizinhos dentro ou ao redor do galpão? O seguro cobre." },
      { icon: "🌊", title: "Vendaval e alagamento", description: "Telhado arrancado pelo vento? Enchente danificou estoque? Coberturas específicas para riscos climáticos." },
    ]}
    testimonials={[
      { name: "Roberto C.", role: "Dono de galpão logístico", stars: 5, content: "Incêndio destruiu 40% do meu galpão. O seguro cobriu R$ 2,3 milhões entre estrutura e estoque. Salvou minha empresa." },
      { name: "Marcos A.", role: "Industrial", stars: 5, content: "Ventania arrancou parte do telhado e chuva danificou máquinas. Seguro pagou R$ 450 mil. Sem ele, teria falido." },
      { name: "Sandra P.", role: "Empresária de logística", stars: 5, content: "Fui assaltada e levaram R$ 200 mil em mercadoria. Recebi a indenização integral em 25 dias. A Patro cuidou de tudo." },
    ]}
    objections={[
      { question: "Quanto custa o seguro de galpão?", answer: "Depende do valor do imóvel, estoque e atividade. Galpões de R$ 1 milhão costumam pagar entre R$ 200 e R$ 800/mês. Cotamos grátis para você saber o valor exato." },
      { question: "Precisa de vistoria?", answer: "Para galpões de maior valor, pode ser necessária uma vistoria simples. Na maioria dos casos, o processo é digital e rápido." },
      { question: "Cobre estoque flutuante?", answer: "Sim! Trabalhamos com cobertura de estoque variável, que se ajusta automaticamente ao volume armazenado." },
      { question: "E se o galpão for alugado?", answer: "Locatários podem e devem contratar seguro. Protege seu estoque, máquinas e responsabilidade civil, independente de ser proprietário." },
      { question: "Cobre roubo de carga nos caminhões?", answer: "O seguro do galpão cobre o que está dentro dele. Para cargas em trânsito, recomendamos o Seguro Transporte, que também cotamos." },
    ]}
  />
);

export default LandingSeguroGalpoes;
