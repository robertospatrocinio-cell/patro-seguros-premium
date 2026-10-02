import LandingPageTemplate from "@/components/LandingPageTemplate";
import heroImg from "@/assets/lp-seguro-vida.webp";

const LandingSeguroVida = () => (
  <LandingPageTemplate
    heroImage={heroImg}
    title="Seguro de Vida"
    heroEmoji="❤️"
    headline="Se algo acontecer com você, sua família vai ficar bem?"
    subheadline="Seguro de Vida não é sobre morrer — é sobre garantir que quem você ama continue protegido. Cotação gratuita e personalizada."
    metaDescription="Seguro de Vida individual e familiar. Conheça alternativas de proteção conforme seu perfil e as condições da apólice. Cotação com a Patro Seguros."
    ctaText="Proteger Minha Família Agora"
    urgencyText="Quanto mais jovem, mais barato. Não espere."
    priceAnchor="Cotação personalizada conforme seu perfil e as coberturas escolhidas"
    guaranteeText="Cotação personalizada e gratuita. Analisamos seu perfil, suas necessidades e apresentamos as melhores opções. Você decide sem nenhuma pressão."
    painPoints={[
      "Se você ficasse impossibilitado de trabalhar amanhã, quem pagaria as contas da sua família?",
      "Tem filhos pequenos e não tem nenhuma proteção financeira para eles caso algo aconteça?",
      "Está com financiamento imobiliário e sua família ficaria com a dívida em caso de falecimento?",
      "Acha que seguro de vida é caro e nunca fez uma cotação para conferir?",
    ]}
    stats={[
      { value: "Sob análise", label: "Preço" },
      { value: "16+", label: "Seguradoras" },
      { value: "2h", label: "Tempo Resposta" },
      { value: "100%", label: "Gratuito" },
    ]}
    benefits={[
      { icon: "👨‍👩‍👧‍👦", title: "Proteção familiar", description: "Indenização para sua família manter o padrão de vida, pagar contas e realizar planos caso você falte." },
      { icon: "🏥", title: "Doenças graves", description: "Quando contratada, a cobertura pode prever indenização conforme a lista, os critérios e os limites da apólice." },
      { icon: "🦽", title: "Invalidez", description: "Quando contratada, a cobertura pode prever indenização conforme a definição, o grau de invalidez e as condições da apólice." },
      { icon: "🏠", title: "Quitação de dívidas", description: "Financiamento, empréstimos — o seguro quita suas dívidas para sua família não herdar problemas." },
      { icon: "💰", title: "Diária de internação", description: "Ficou internado? Receba uma diária para cobrir custos extras que o plano de saúde não paga." },
      { icon: "📈", title: "Quanto mais jovem, mais barato", description: "O preço é calculado pela idade de contratação. Quanto antes você contratar, menos vai pagar para sempre." },
    ]}
    testimonials={[
      { name: "Camila R.", role: "Viúva, mãe de 2", stars: 5, content: "Meu marido faleceu em um acidente. O seguro pagou R$ 500 mil em 15 dias. Salvou a vida da minha família." },
      { name: "André P.", role: "Empresário", stars: 5, content: "Tive um infarto aos 45 anos. Recebi R$ 200 mil antecipados para o tratamento. O seguro se pagou mil vezes." },
      { name: "Juliana K.", role: "Professora", stars: 5, content: "Pago R$ 55/mês por R$ 300 mil de cobertura. Durmo tranquila sabendo que meus filhos estarão protegidos." },
    ]}
    objections={[
      { question: "Seguro de vida é caro?", answer: "O preço depende do capital, coberturas, idade, perfil, profissão, saúde declarada e critérios da seguradora. A proposta individual é necessária para comparar valores." },
      { question: "Sou jovem e saudável, preciso?", answer: "Justamente por ser jovem que o preço é mais baixo. E acidentes não escolhem idade. Quanto antes contratar, melhor o custo-benefício." },
      { question: "E se eu nunca usar?", answer: "Seguro de vida não é investimento — é proteção. Mas muitos incluem cobertura em vida: doenças graves, invalidez e diária de internação." },
      { question: "Quanto minha família receberia?", answer: "Depende do plano. Coberturas vão de R$ 50 mil a R$ 2 milhões+. Calculamos o valor ideal baseado em suas despesas e patrimônio." },
      { question: "Demora para pagar o sinistro?", answer: "O prazo depende do evento, da cobertura, da documentação, da apólice, da regulação e da legislação aplicável. Não há promessa universal de pagamento em prazo fixo." },
    ]}
  />
);

export default LandingSeguroVida;
