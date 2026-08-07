import LandingPageTemplate from "@/components/LandingPageTemplate";
import ComparisonTableResidencial from "@/components/ComparisonTableResidencial";
import heroImg from "@/assets/lp-seguro-residencial.webp";

const LandingSeguroResidencial = () => (

  <LandingPageTemplate
    heroImage={heroImg}
    title="Seguro Residencial"
    heroEmoji="🏠"
    headline="Sua casa é seu maior patrimônio. Ela está protegida?"
    subheadline="De incêndio a danos elétricos, de roubo a assistência 24h. Proteja sua família e seu lar por menos do que você imagina."
    metaDescription="Seguro Residencial a partir de R$ 15/mês. Cobertura contra incêndio, roubo, danos elétricos e assistência 24h. Cotação grátis. Patro Seguros."
    ctaText="Proteger Minha Casa Agora"
    ctaUrl="https://patro.seucorretor.digital/#/formularios/residencial"
    urgencyText="Sua casa não pode esperar"
    priceAnchor="A partir de R$ 15/mês* — menos que um café por dia"
    guaranteeText="Cotação 100% gratuita, sem compromisso. Apresentamos as melhores opções e você decide com calma."
    painPoints={[
      "Mora em casa, apartamento ou flat sem nenhum tipo de seguro e torce para nada acontecer?",
      "Já teve eletrodoméstico queimado por raio ou oscilação elétrica e pagou do bolso?",
      "Se houvesse um incêndio hoje, você teria como reconstruir tudo?",
      "Precisou de um encanador ou eletricista de emergência e pagou uma fortuna no fim de semana?",
    ]}
    stats={[
      { value: "R$15", label: "A partir de" },
      { value: "24h", label: "Assistência" },
      { value: "16+", label: "Seguradoras" },
      { value: "100%", label: "Gratuito" },
    ]}
    benefits={[
      { icon: "🔥", title: "Incêndio e explosão", description: "Proteção total contra incêndio, explosão, queda de raio e fumaça. Cobre reconstrução e conteúdo." },
      { icon: "⚡", title: "Danos elétricos", description: "Geladeira, TV, ar-condicionado queimados por raio ou sobrecarga? O seguro repõe." },
      { icon: "🔒", title: "Roubo e furto", description: "Cobertura para roubo de pertences dentro de casa, incluindo eletrônicos e joias." },
      { icon: "🔧", title: "Assistência 24h", description: "Chaveiro, encanador, eletricista, vidraceiro — sem pagar nada extra. Disponível 24h, 7 dias por semana." },
      { icon: "🌊", title: "Danos por água", description: "Enchente, alagamento, ruptura de canos. Proteja pisos, móveis e estrutura da sua casa." },
      { icon: "💰", title: "Custa menos que um café", description: "A partir de R$ 15/mês você protege seu maior patrimônio. É o seguro mais acessível do mercado." },
    ]}
    testimonials={[
      { name: "Patricia G.", role: "Moradora de apartamento", stars: 5, content: "Um raio queimou minha geladeira, microondas e TV. O seguro pagou R$ 8.500 em 10 dias. Eu pagava R$ 22/mês!" },
      { name: "Eduardo F.", role: "Proprietário de casa", stars: 5, content: "Vazamento no vizinho de cima destruiu meu teto e móveis. O seguro cobriu tudo — R$ 15 mil de prejuízo resolvido." },
      { name: "Sandra L.", role: "Inquilina", stars: 5, content: "Precisei de chaveiro às 3h da manhã. Liguei pro seguro e em 40 min resolveram. Sem pagar nada." },
    ]}
    objections={[
      { question: "Seguro residencial é caro?", answer: "Não! É o seguro mais barato do mercado. A partir de R$ 15/mês para apartamento e R$ 25/mês para casa. Menos que um café por dia." },
      { question: "Inquilino pode contratar?", answer: "Sim! Inquilinos podem e devem contratar. O seguro protege seus pertences e oferece assistência 24h, independente de ser proprietário." },
      { question: "A assistência 24h funciona mesmo?", answer: "Funciona sim, 365 dias por ano. Chaveiro, encanador, eletricista, vidraceiro — tudo incluso sem custo adicional, sem limite de uso." },
      { question: "Cobre danos por enchente?", answer: "Sim, com a cobertura adicional de alagamento/inundação. Recomendamos para quem mora em áreas de risco." },
      { question: "E se eu morar de aluguel, o proprietário não deveria pagar?", answer: "O proprietário geralmente faz seguro do imóvel (estrutura). Mas seus pertences, eletrodomésticos e responsabilidade civil são sua responsabilidade." },
      { question: "A cotação de seguro residencial online é grátis?", answer: "100% grátis e sem compromisso. Você preenche um formulário rápido (leva menos de 2 minutos) e recebe até 6 opções de seguradoras diferentes para comparar preço e cobertura lado a lado." },
      { question: "Quanto tempo demora para receber a cotação online?", answer: "Na Patro Seguros a resposta chega em até 2 horas úteis. Cotações mais simples (apartamento padrão, sem coberturas especiais) saem em minutos direto no seu WhatsApp." },
      { question: "O que preciso informar para fazer a cotação online?", answer: "Apenas o essencial: CEP do imóvel, se é casa ou apartamento, área construída aproximada, se é próprio ou alugado, e o valor que quer segurar dos bens (móveis, eletrônicos). Não pedimos CPF nem documentos nessa etapa." },
      { question: "Posso comparar várias seguradoras em uma única cotação?", answer: "Sim — esse é o principal motivo de cotar com uma corretora e não direto no site de uma seguradora. Trabalhamos com 16+ seguradoras (Porto, Bradesco, Allianz, Tokio, Mapfre, Liberty, HDI, Azul, Suhai, Sompo, entre outras) e apresentamos as 3 melhores para o seu perfil." },
      { question: "Preciso morar em Guarulhos para cotar com a Patro Seguros?", answer: "Não. Somos corretora com sede em Guarulhos/SP mas atendemos todo o Brasil online. A cotação e a assinatura da apólice são 100% digitais, sem precisar sair de casa." },
    ]}
    extraSections={<ComparisonTableResidencial />}
  />
);

export default LandingSeguroResidencial;
