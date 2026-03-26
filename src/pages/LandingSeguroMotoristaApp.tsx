import LandingPageTemplate from "@/components/LandingPageTemplate";
import heroImg from "@/assets/lp-seguro-motorista-app.webp";

const LandingSeguroMotoristaApp = () => (
  <LandingPageTemplate
    heroImage={heroImg}
    title="Seguro Motorista App"
    heroEmoji="📱"
    headline="Você roda por app sem seguro? Seu próximo sinistro pode custar seu carro."
    subheadline="Seguro específico para Uber, 99 e inDrive. Cobertura real durante corridas, RC passageiros e carro reserva — para você não ficar parado sem ganhar."
    metaDescription="Seguro para motorista de aplicativo em Guarulhos e região. Cobertura durante corridas, RC passageiros obrigatório, carro reserva estendido. Cotação grátis na Patro Seguros."
    ctaText="Cotar Meu Seguro de App Grátis"
    ctaUrl="/seguro-motorista-app"
    urgencyText="Motoristas de app são os que mais precisam — e os que menos têm seguro"
    priceAnchor="A partir de R$ 250/mês* — parcele em até 10x sem juros"
    guaranteeText="Se não encontrarmos uma opção melhor que sua atual, devolvemos seu tempo. Cotação 100% gratuita, sem compromisso e sem enrolação."
    painPoints={[
      "Você roda 10+ horas por dia e seu seguro é de 'lazer'? A seguradora pode negar seu sinistro.",
      "Já pensou no que acontece se um passageiro se machucar no seu carro? Você responde judicialmente.",
      "Seu carro foi roubado durante uma corrida e você ficou semanas sem trabalhar e sem renda?",
      "Está pagando seguro convencional achando que está protegido — mas na hora H, descobre que não está?",
    ]}
    stats={[
      { value: "40%", label: "Economia média" },
      { value: "2h", label: "Tempo Resposta" },
      { value: "24h", label: "Apólice Ativa" },
      { value: "30 dias", label: "Carro Reserva" },
    ]}
    benefits={[
      { icon: "✅", title: "Cobertura válida durante corridas", description: "Diferente do seguro convencional, sua cobertura vale com passageiro no carro e app ativo. Sem surpresas na hora do sinistro." },
      { icon: "👥", title: "RC Passageiros incluso", description: "Cobertura obrigatória por lei para transporte remunerado. Protege você de processos judiciais de passageiros." },
      { icon: "🚗", title: "Carro reserva estendido", description: "Até 30 dias de carro substituto. Cada dia parado é renda perdida — continue trabalhando enquanto seu carro é reparado." },
      { icon: "💰", title: "Preço justo para app", description: "Cotamos com seguradoras que têm produtos específicos para motoristas de app. Até 40% mais barato que adaptar seguro convencional." },
      { icon: "🔧", title: "Assistência 24h ampliada", description: "Guincho com quilometragem estendida para quem roda longe. Socorro mecânico, elétrico, troca de pneu e chaveiro." },
      { icon: "⚡", title: "Ativação em 24 horas", description: "Vistoria por fotos do celular. Sem burocracia, sem ir a lugar nenhum. Continue rodando sem interrupção." },
    ]}
    testimonials={[
      { name: "Marcos S.", role: "Motorista Uber - Guarulhos", stars: 5, content: "Rodava com seguro de lazer e não sabia do risco. A Patro me explicou tudo e encontrou um seguro específico para app por R$ 280/mês. Já acionei uma vez e cobriram tudo!" },
      { name: "Juliana P.", role: "Motorista 99 - São Paulo", stars: 5, content: "Meu carro foi roubado numa corrida noturna. O seguro pagou 100% da FIPE e o carro reserva me salvou — voltei a trabalhar em 2 dias. Sem a Patro eu estaria perdida." },
      { name: "Anderson L.", role: "Motorista Uber/99 - Guarulhos", stars: 5, content: "Compararam 6 seguradoras pra mim. Economizei R$ 1.200 no ano e ainda ganhei carro reserva de 30 dias. Atendimento no WhatsApp é muito rápido." },
    ]}
    objections={[
      { question: "O seguro para app é muito mais caro que o convencional?", answer: "Em média, 20% a 40% mais. Mas considere: um sinistro negado por uso não declarado pode custar o valor total do seu carro. O seguro para app é um investimento na sua renda." },
      { question: "Sou motorista parcial, preciso mesmo de seguro para app?", answer: "Sim. Mesmo rodando poucas horas, se sofrer sinistro durante uma corrida com seguro convencional, a cobertura pode ser negada. Motoristas parciais pagam menos." },
      { question: "Todas as seguradoras aceitam motorista de app?", answer: "Não. Por isso a Patro é essencial — trabalhamos com todas as seguradoras que aceitam e encontramos a melhor opção para seu perfil e orçamento." },
      { question: "Posso parcelar?", answer: "Sim! Até 10x sem juros no cartão ou débito em conta. Parcelas a partir de R$ 250/mês para carros populares." },
      { question: "E se eu trocar de plataforma (Uber para 99, etc)?", answer: "Sem problema. O seguro cobre o uso do veículo para transporte por aplicativo independente da plataforma utilizada." },
    ]}
  />
);

export default LandingSeguroMotoristaApp;
