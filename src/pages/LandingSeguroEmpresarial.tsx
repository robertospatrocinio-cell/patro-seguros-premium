import LandingPageTemplate from "@/components/LandingPageTemplate";
import heroImg from "@/assets/lp-seguro-empresarial.webp";

const LandingSeguroEmpresarial = () => (
  <LandingPageTemplate
    heroImage={heroImg}
    title="Seguro Empresarial"
    heroEmoji="🏢"
    headline="Sua empresa pode fechar amanhã por um incêndio. Você está preparado?"
    subheadline="Proteja seu patrimônio, estoque e faturamento contra incêndio, roubo, danos elétricos e mais. Cotação gratuita com as melhores seguradoras do país."
    metaDescription="Seguro Empresarial para PME, comércio e indústria. Proteja seu negócio contra incêndio, roubo e responsabilidade civil. Cotação grátis. Patro Seguros."
    ctaText="Proteger Minha Empresa Agora"
    urgencyText="Não espere o prejuízo para agir"
    priceAnchor="A partir de R$ 59/mês* para pequenos negócios"
    guaranteeText="Analisamos sua empresa gratuitamente e apresentamos no mínimo 3 propostas de seguradoras diferentes. Se não fizer sentido, você não paga nada."
    painPoints={[
      "Seu negócio não tem seguro e um incêndio ou enchente acabaria com tudo que você construiu?",
      "Já sofreu roubo de equipamentos, estoque ou dinheiro e não tinha como repor?",
      "Um cliente se machucou no seu estabelecimento e processou sua empresa?",
      "Teve um problema elétrico que queimou equipamentos caros e ficou no prejuízo?",
    ]}
    stats={[
      { value: "16+", label: "Seguradoras" },
      { value: "2h", label: "Tempo Resposta" },
      { value: "R$59", label: "A partir de" },
      { value: "100%", label: "Gratuito" },
    ]}
    benefits={[
      { icon: "🔥", title: "Proteção patrimonial", description: "Incêndio, explosão, queda de raio, vendaval, alagamento. Seu imóvel, estoque e equipamentos protegidos." },
      { icon: "🔒", title: "Roubo e furto", description: "Cobertura para arrombamento, furto qualificado de mercadorias, dinheiro em cofre e equipamentos eletrônicos." },
      { icon: "⚡", title: "Danos elétricos", description: "Curto-circuito, sobrecarga, queda de energia. Proteja máquinas, computadores e equipamentos essenciais." },
      { icon: "⚖️", title: "RC do estabelecimento", description: "Cliente escorregou? Entregador se machucou? O seguro cobre processos e indenizações." },
      { icon: "📉", title: "Lucros cessantes", description: "Se sua empresa parar por sinistro coberto, o seguro cobre seu faturamento durante a recuperação." },
      { icon: "💰", title: "Preço acessível", description: "PMEs pagam a partir de R$ 59/mês. O seguro custa menos que 1 dia de faturamento perdido." },
    ]}
    testimonials={[
      { name: "João Pedro A.", role: "Dono de restaurante", stars: 5, content: "Tive um incêndio na cozinha. O seguro cobriu R$ 180 mil em reformas e equipamentos. Sem a Patro, teria fechado." },
      { name: "Mariana C.", role: "Dona de loja", stars: 5, content: "Fui assaltada 2x em 6 meses. Na segunda vez, já tinha seguro. Recuperei todo o estoque em 20 dias." },
      { name: "Ricardo S.", role: "Dono de oficina", stars: 5, content: "Paguei R$ 89/mês e quando o motor de um cliente pegou fogo no meu galpão, o seguro cobriu R$ 95 mil." },
    ]}
    objections={[
      { question: "Minha empresa é pequena, preciso de seguro?", answer: "Principalmente! Empresas pequenas são as mais vulneráveis. Um sinistro sem seguro pode significar o fechamento definitivo. E o custo é muito acessível." },
      { question: "O que exatamente é coberto?", answer: "Incêndio, roubo, danos elétricos, vendaval, RC, lucros cessantes e muito mais. Montamos a cobertura sob medida para seu tipo de negócio." },
      { question: "Preciso de vistoria?", answer: "Na maioria dos casos, não. O processo é digital e rápido. Apenas para valores muito altos pode ser solicitada uma vistoria simples." },
      { question: "Posso incluir equipamentos específicos?", answer: "Sim! Equipamentos eletrônicos, máquinas, veículos estacionados, placas solares — tudo pode ser incluído na apólice." },
      { question: "E se eu alugar o imóvel?", answer: "Locatários também podem (e devem!) contratar seguro empresarial. Protege seu estoque, equipamentos e responsabilidade civil." },
    ]}
  />
);

export default LandingSeguroEmpresarial;
