import LandingPageTemplate from "@/components/LandingPageTemplate";
import heroImg from "@/assets/lp-seguro-celular.webp";

const LandingSeguroCelular = () => (
  <LandingPageTemplate
    heroImage={heroImg}
    title="Seguro Celular"
    heroEmoji="📱"
    headline="Seu celular de R$ 5.000 está protegido? Ou é só uma questão de tempo?"
    subheadline="Roubo, furto, quebra acidental e dano por líquido. Proteja seu smartphone por menos de R$ 1 por dia."
    metaDescription="Seguro Celular contra roubo, furto e quebra acidental. iPhone e Android. A partir de R$ 19/mês. Cotação gratuita. Patro Seguros."
    ctaText="Proteger Meu Celular Agora"
    urgencyText="1 celular é roubado a cada 5 minutos no Brasil"
    priceAnchor="A partir de R$ 19/mês* — menos que R$ 1 por dia"
    guaranteeText="Cotação instantânea e sem compromisso. Proteção começa no mesmo dia da contratação."
    painPoints={[
      "Pagou R$ 3.000, R$ 5.000 ou mais no celular e anda com medo de ser roubado na rua?",
      "Já deixou o celular cair e a tela quebrou, custando R$ 1.500 para trocar?",
      "Usa o celular para trabalhar (banco, app, reuniões) e ficaria na mão sem ele?",
      "Acha que seguro de celular é caro e nunca pesquisou quanto realmente custa?",
    ]}
    stats={[
      { value: "R$19", label: "A partir de" },
      { value: "1M+", label: "Roubos/ano" },
      { value: "24h", label: "Assistência" },
      { value: "100%", label: "Digital" },
    ]}
    benefits={[
      { icon: "🔒", title: "Roubo e furto", description: "Celular roubado ou furtado? Receba um aparelho novo ou a indenização para comprar outro." },
      { icon: "💥", title: "Quebra acidental", description: "Tela trincada, queda no chão, dano no display. O seguro cobre reparo ou substituição." },
      { icon: "💧", title: "Dano por líquido", description: "Celular caiu na água, tomou chuva ou derramaram café? Cobertura contra danos por líquido." },
      { icon: "⚡", title: "Defeito elétrico", description: "Problema na bateria, superaquecimento, curto-circuito pós-garantia? O seguro resolve." },
      { icon: "📱", title: "iPhone e Android", description: "Cobrimos todas as marcas: Apple, Samsung, Motorola, Xiaomi e mais. Novos ou seminovos." },
      { icon: "🚀", title: "Contratação 100% digital", description: "Faz tudo pelo celular. Sem papelada, sem ir a lugar nenhum. Proteção começa no mesmo dia." },
    ]}
    testimonials={[
      { name: "Bruna M.", role: "Influenciadora", stars: 5, content: "Roubaram meu iPhone 15 Pro Max no semáforo. Em 7 dias recebi R$ 7.200 para comprar outro. O seguro custava R$ 45/mês." },
      { name: "Felipe R.", role: "Vendedor", stars: 5, content: "Derrubei meu Samsung S24 e a tela estilhaçou. O seguro cobriu o reparo de R$ 1.800. Melhor investimento." },
      { name: "Juliana T.", role: "Estudante", stars: 5, content: "Meu celular caiu na piscina. Achei que tinha perdido tudo. O seguro pagou a substituição em 5 dias úteis!" },
    ]}
    objections={[
      { question: "Seguro de celular é caro?", answer: "Não! A partir de R$ 19/mês para smartphones intermediários e R$ 35-60/mês para iPhones. Muito menos que o reparo de uma tela." },
      { question: "Celular usado pode ter seguro?", answer: "Sim! Aceitamos aparelhos com até 2 anos de uso na maioria das seguradoras. Algumas exigem nota fiscal." },
      { question: "Precisa de nota fiscal?", answer: "Algumas seguradoras exigem, outras não. Verificamos qual é a melhor opção para o seu caso." },
      { question: "Tem carência?", answer: "Para roubo/furto, geralmente há carência de 48h a 15 dias. Para quebra acidental, a cobertura começa imediatamente na maioria dos planos." },
      { question: "Como funciona o sinistro?", answer: "Tudo digital: registra o B.O., envia os documentos pelo app e recebe a indenização ou aparelho substituto em 5 a 10 dias úteis." },
    ]}
  />
);

export default LandingSeguroCelular;
