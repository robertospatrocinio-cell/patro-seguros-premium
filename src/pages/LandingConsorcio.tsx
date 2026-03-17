import LandingPageTemplate from "@/components/LandingPageTemplate";

const LandingConsorcio = () => (
  <LandingPageTemplate
    title="Consórcio"
    heroEmoji="🏆"
    headline="Carro novo, casa própria ou caminhão — sem juros e sem entrada."
    subheadline="Consórcio é a forma mais inteligente de conquistar seus bens. Parcelas que cabem no bolso, sem juros abusivos de financiamento."
    metaDescription="Consórcio de Carro, Imóvel e Veículos Pesados. Sem juros, sem entrada. Parcelas acessíveis. Cotação gratuita. Patro Seguros Guarulhos."
    ctaText="Simular Meu Consórcio Grátis"
    urgencyText="Grupos com vagas limitadas — garanta sua cota"
    priceAnchor="Parcelas a partir de R$ 399/mês* para automóveis"
    guaranteeText="Simulação gratuita e sem compromisso. Apresentamos as melhores administradoras com planos flexíveis. Você escolhe o que faz sentido."
    painPoints={[
      "Quer trocar de carro mas não consegue pagar os juros absurdos do financiamento?",
      "Sonha com a casa própria mas não tem o valor da entrada que o banco exige?",
      "Precisa de um caminhão ou veículo pesado para expandir seu negócio mas não quer se endividar?",
      "Já ouviu falar de consórcio mas acha que demora demais ou que é furada?",
    ]}
    stats={[
      { value: "0%", label: "Juros" },
      { value: "R$0", label: "Entrada" },
      { value: "240x", label: "Até parcelas" },
      { value: "100%", label: "Gratuito" },
    ]}
    benefits={[
      { icon: "💰", title: "Zero juros", description: "Diferente do financiamento, o consórcio não cobra juros. Você paga apenas taxa de administração, muito menor." },
      { icon: "🚫", title: "Sem entrada", description: "Não precisa dar entrada. Comece a pagar hoje e seja contemplado por sorteio ou lance." },
      { icon: "🚗", title: "Carro, moto ou caminhão", description: "Créditos de R$ 30 mil a R$ 500 mil para qualquer tipo de veículo, novo ou usado." },
      { icon: "🏠", title: "Imóvel dos sonhos", description: "Créditos de R$ 100 mil a R$ 1 milhão+ para casa, apartamento, terreno ou construção." },
      { icon: "🔄", title: "Use seu FGTS", description: "Para consórcio de imóvel, você pode usar o FGTS para dar lance ou complementar o crédito." },
      { icon: "📈", title: "Investimento inteligente", description: "Seu crédito é corrigido anualmente, acompanhando a valorização do bem. Poder de compra garantido." },
    ]}
    testimonials={[
      { name: "Lucas F.", role: "Motorista de app", stars: 5, content: "Fui contemplado em 4 meses por lance! Troquei meu carro velho por um HB20 zero. Parcela de R$ 650, sem juros." },
      { name: "Carla N.", role: "Professora", stars: 5, content: "Comprei meu apartamento pelo consórcio. Usei o FGTS como lance e fui contemplada em 8 meses. Melhor decisão da vida!" },
      { name: "José M.", role: "Caminhoneiro", stars: 5, content: "Comprei meu segundo caminhão por consórcio. Parcela de R$ 2.800 sem juros. No financiamento, seria R$ 4.500." },
    ]}
    objections={[
      { question: "Consórcio demora muito para contemplar?", answer: "Depende! Existem lances embutidos e estratégias para acelerar. Muitos clientes são contemplados nos primeiros 6 meses." },
      { question: "Qual a diferença para o financiamento?", answer: "No financiamento você paga juros de 1,5% a 2% ao mês. No consórcio, a taxa de administração total fica entre 12% a 20% do valor — diluída em até 240 meses." },
      { question: "Posso usar a carta para veículo usado?", answer: "Sim! A carta de crédito pode ser usada para veículos novos ou usados (até 10 anos, dependendo da administradora)." },
      { question: "E se eu desistir?", answer: "Você pode transferir sua cota ou aguardar a contemplação para receber o valor pago (descontada a taxa). Há regras específicas por administradora." },
      { question: "Preciso de aprovação de crédito?", answer: "Para entrar no consórcio, não. A análise de crédito acontece apenas no momento da contemplação, quando vai receber a carta." },
    ]}
  />
);

export default LandingConsorcio;
