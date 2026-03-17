import LandingPageTemplate from "@/components/LandingPageTemplate";

const LandingSeguroMoto = () => (
  <LandingPageTemplate
    title="Seguro Moto"
    heroEmoji="🏍️"
    headline="Sua moto é seu ganha-pão? Então ela precisa de proteção de verdade."
    subheadline="Roubo, colisão, terceiros e assistência 24h. Compare cotações de 16+ seguradoras e encontre o melhor preço para sua moto."
    metaDescription="Seguro Moto com cotação gratuita. Compare Porto, Tokio Marine, HDI e mais. Proteção contra roubo, colisão e terceiros. Patro Seguros Guarulhos."
    ctaText="Cotar Seguro Moto Grátis"
    urgencyText="SP lidera roubos de moto no Brasil — proteja-se hoje"
    priceAnchor="A partir de R$ 49/mês* — parcele em até 10x"
    guaranteeText="Cotação gratuita e sem compromisso. Comparamos as melhores seguradoras para encontrar a opção ideal para sua moto e seu bolso."
    painPoints={[
      "Usa a moto todo dia para trabalhar e sabe que é o veículo mais visado por ladrões?",
      "Já teve moto roubada e ficou meses sem poder trabalhar porque não tinha seguro?",
      "Bateu a moto e o conserto saiu mais caro que várias parcelas de seguro?",
      "Acha que seguro de moto é caro demais e nunca fez uma cotação para conferir?",
    ]}
    stats={[
      { value: "16+", label: "Seguradoras" },
      { value: "2h", label: "Tempo Resposta" },
      { value: "R$49", label: "A partir de" },
      { value: "24h", label: "Assistência" },
    ]}
    benefits={[
      { icon: "🔒", title: "Proteção contra roubo", description: "Moto roubada ou furtada? Receba a indenização pelo valor da tabela FIPE. Sem dor de cabeça." },
      { icon: "💥", title: "Colisão e capotamento", description: "Bateu? O seguro cobre o reparo ou reposição da sua moto. Inclusive em oficinas especializadas." },
      { icon: "👤", title: "Danos a terceiros", description: "Bateu no carro de alguém? O seguro cobre o prejuízo do outro, protegendo seu bolso." },
      { icon: "🚑", title: "Assistência 24h", description: "Guincho, pane seca, troca de pneu, chaveiro. Sua moto nunca fica na mão." },
      { icon: "🏥", title: "APP — Acidentes pessoais", description: "Cobertura para despesas médicas e hospitalares em caso de acidente com a moto." },
      { icon: "💰", title: "Preço que cabe no bolso", description: "Motos populares a partir de R$ 49/mês. Para quem depende da moto, o seguro é investimento, não custo." },
    ]}
    testimonials={[
      { name: "Diego S.", role: "Motoboy", stars: 5, content: "Tive a moto roubada na Marginal. Em 20 dias recebi R$ 18 mil da seguradora. Comprei outra e voltei a trabalhar." },
      { name: "Thiago P.", role: "Entregador iFood", stars: 5, content: "Pago R$ 65/mês no seguro da minha CG 160. Já usei o guincho 3 vezes e o conserto de uma batida. Se pagou fácil." },
      { name: "Amanda K.", role: "Motociclista", stars: 5, content: "Achei que seguro de moto era impossível de pagar. A Patro encontrou uma opção por R$ 55/mês com cobertura completa!" },
    ]}
    objections={[
      { question: "Seguro de moto é caro?", answer: "Depende do modelo e região, mas motos populares (CG, Biz, Factor) saem a partir de R$ 49/mês. Compare e surpreenda-se." },
      { question: "Moto de trabalho (app/entrega) tem seguro?", answer: "Sim! Trabalhamos com seguradoras que aceitam motos de uso profissional. O preço é um pouco maior, mas a proteção é essencial." },
      { question: "E se eu não tiver garagem?", answer: "Algumas seguradoras aceitam motos que ficam na rua. O preço pode variar, mas não impede a contratação." },
      { question: "Cobre moto financiada?", answer: "Sim! Inclusive, muitos bancos exigem seguro para o financiamento. Encontramos opções compatíveis com sua parcela." },
      { question: "Como funciona o guincho?", answer: "Liga para a central 24h, informa a localização e o guincho chega em média em 40 minutos. Sem custo adicional." },
    ]}
  />
);

export default LandingSeguroMoto;
