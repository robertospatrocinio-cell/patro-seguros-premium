import LandingPageTemplate from "@/components/LandingPageTemplate";
import heroImg from "@/assets/lp-seguro-motorista-app.webp";

const LandingSeguroMotoristaApp = () => (
  <LandingPageTemplate
    heroImage={heroImg}
    title="Seguro Motorista App"
    heroEmoji="📱"
    headline="Você roda por app sem seguro? Seu próximo sinistro pode custar seu carro."
    subheadline="Seguro para uso profissional em Uber, 99 e outros aplicativos, conforme aceitação da seguradora e condições contratadas. Coberturas para o veículo, passageiros e carro reserva dependem da apólice."
    metaDescription="Seguro para motorista de aplicativo em Guarulhos: cobertura durante corridas, RC passageiros e carro reserva estendido. Cotação grátis."
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
      { value: "Conforme perfil", label: "Análise de risco" },
      { value: "Conforme produto", label: "Condições de contratação" },
      { value: "Conforme apólice", label: "Assistências" },
      { value: "Quando contratado", label: "Carro reserva" },
    ]}
    benefits={[
      { icon: "✅", title: "Uso profissional informado", description: "O uso do veículo em aplicativo deve ser declarado para que a seguradora avalie o risco e apresente as condições aplicáveis ao produto." },
      { icon: "👥", title: "Acidentes Pessoais de Passageiros (APP)", description: "Pode ser contratado quando oferecido no produto. Limites, eventos cobertos e condições dependem da apólice e da seguradora." },
      { icon: "🚗", title: "Carro reserva quando contratado", description: "A disponibilidade, categoria e quantidade de diárias dependem da cobertura contratada e das condições da seguradora." },
      { icon: "💰", title: "Alternativas conforme o perfil", description: "A corretora pode comparar alternativas disponíveis, mas preço, aceitação e coberturas dependem do risco e das regras de cada seguradora." },
      { icon: "🔧", title: "Assistência 24h ampliada", description: "Guincho com quilometragem estendida para quem roda longe. Socorro mecânico, elétrico, troca de pneu e chaveiro." },
      { icon: "⚡", title: "Contratação acompanhada", description: "A proposta, a vistoria e o início da vigência dependem da análise, aceitação e procedimentos definidos pela seguradora." },
    ]}
    testimonials={[
      { name: "Marcos S.", role: "Motorista Uber - Guarulhos", stars: 5, content: "Rodava com seguro de lazer e não sabia do risco. A Patro me explicou tudo e encontrou um seguro específico para app por R$ 280/mês. Já acionei uma vez e cobriram tudo!" },
      { name: "Juliana P.", role: "Motorista 99 - São Paulo", stars: 5, content: "A equipe me explicou que uso profissional, coberturas, indenização e carro reserva dependem da apólice contratada. O atendimento me ajudou a entender as condições do meu seguro." },
      { name: "Anderson L.", role: "Motorista Uber/99 - Guarulhos", stars: 5, content: "Compararam 6 seguradoras pra mim. Economizei R$ 1.200 no ano e ainda ganhei carro reserva de 30 dias. Atendimento no WhatsApp é muito rápido." },
    ]}
    objections={[
      { question: "O seguro para app é mais caro que o convencional?", answer: "Pode haver diferença porque o uso profissional altera a avaliação do risco, mas não há percentual universal. O prêmio depende do perfil, do veículo, da utilização, da seguradora e das condições contratadas." },
      { question: "Sou motorista parcial, preciso informar o uso do aplicativo?", answer: "O uso profissional deve ser informado mesmo quando parcial, para que a seguradora avalie corretamente o risco. A aceitação e as condições dependem do produto e da apólice." },
      { question: "Todas as seguradoras aceitam motorista de app?", answer: "Não necessariamente. A aceitação varia conforme seguradora, produto, veículo e perfil. A corretora pode analisar as alternativas disponíveis para o caso, sem garantir aceitação ou uma opção universalmente melhor." },
      { question: "Posso parcelar?", answer: "Sim! Até 10x sem juros no cartão ou débito em conta. Parcelas a partir de R$ 250/mês para carros populares." },
      { question: "E se eu trocar de plataforma, como Uber para 99?", answer: "Comunique a alteração à corretora ou à seguradora. Uber e 99 podem ter regras e produtos diferentes, e a cobertura deve ser verificada nas condições contratuais aplicáveis." },
    ]}
  />
);

export default LandingSeguroMotoristaApp;
