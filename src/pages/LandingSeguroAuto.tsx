import LandingPageTemplate from "@/components/LandingPageTemplate";
import heroImg from "@/assets/lp-seguro-auto.webp";

const LandingSeguroAuto = () => (
  <LandingPageTemplate
    heroImage={heroImg}
    title="Seguro Auto"
    heroEmoji="🚗"
    headline="Seu carro está protegido? Ou você está contando com a sorte?"
    subheadline="Compare cotações de 16+ seguradoras em minutos. Encontre o melhor preço sem sair de casa — com atendimento humano e personalizado."
    metaDescription="Cotação de Seguro Auto gratuita. Compare Porto, Tokio Marine, Allianz, HDI e mais. Resultado em 2 horas. Patro Seguros Guarulhos."
    ctaText="Cotar Meu Seguro Auto Grátis"
    ctaUrl="https://villa.segfy.com/Publico/Segurados/Orcamentos/SolicitarCotacao?e=t6RDiR%2F1ioARkspweLWOgQ%3D%3D"
    urgencyText="Cotações com preço especial esta semana"
    priceAnchor="A partir de R$ 89/mês* — parcele em até 10x sem juros"
    guaranteeText="Se não encontrarmos uma opção melhor que sua atual, devolvemos seu tempo. Nosso compromisso é apresentar a melhor relação custo-benefício do mercado, sem enrolação."
    painPoints={[
      "Seu carro está sem seguro e você dirige todos os dias rezando para nada acontecer?",
      "Já teve o carro roubado, batido ou vandalizado e não tinha proteção nenhuma?",
      "Renovou o seguro no automático, sem comparar preços, e acha que está pagando caro demais?",
      "Tentou cotar online e recebeu dezenas de ligações de corretores que só querem vender?",
    ]}
    stats={[
      { value: "16+", label: "Seguradoras" },
      { value: "2h", label: "Tempo Resposta" },
      { value: "100%", label: "Gratuito" },
      { value: "10x", label: "Sem Juros" },
    ]}
    benefits={[
      { icon: "⚡", title: "Cotação em 2 horas", description: "Receba propostas comparativas de Porto, Tokio, Allianz, HDI e mais — sem precisar ligar para ninguém." },
      { icon: "💰", title: "Economia real", description: "Nossos clientes economizam em média 20% comparando seguradoras. Você escolhe a melhor opção." },
      { icon: "🛡️", title: "Cobertura completa", description: "Roubo, colisão, terceiros, guincho 24h, carro reserva. Montamos o pacote ideal para seu perfil." },
      { icon: "👨‍💼", title: "Consultor dedicado", description: "Nada de robô. Um especialista analisa seu perfil e recomenda exatamente o que faz sentido." },
      { icon: "📋", title: "Suporte no sinistro", description: "Bateu? Roubaram? A Patro cuida de todo o processo com a seguradora. Você só relaxa." },
      { icon: "🔄", title: "Renovação inteligente", description: "Na renovação, renegociamos com todas as seguradoras para garantir que você continua com o melhor preço." },
    ]}
    testimonials={[
      { name: "Carlos R.", role: "Motorista de app", stars: 5, content: "Economizei R$ 180/mês trocando de seguradora. A Patro comparou 8 propostas pra mim em 2 horas!" },
      { name: "Fernanda L.", role: "Empresária", stars: 5, content: "Meu carro foi roubado e a Patro resolveu tudo. Recebi a indenização em 15 dias. Recomendo demais." },
      { name: "Roberto M.", role: "Servidor público", stars: 5, content: "Estava pagando R$ 4.500/ano. Com a Patro, encontrei cobertura melhor por R$ 3.200. Não volto mais." },
    ]}
    objections={[
      { question: "A cotação é realmente gratuita?", answer: "100% gratuita e sem compromisso. Você recebe as propostas, compara e decide com calma. Zero pressão." },
      { question: "Quanto tempo leva para receber a cotação?", answer: "Em até 2 horas úteis. Comparamos até 16 seguradoras e enviamos um resumo claro, sem letras miúdas." },
      { question: "Posso parcelar o seguro?", answer: "Sim! A maioria das seguradoras oferece parcelamento em até 10x sem juros no cartão ou débito em conta." },
      { question: "E se eu já tiver seguro, posso trocar?", answer: "Pode sim. Fazemos a cotação considerando seu bônus atual. Na maioria dos casos, a transição é imediata e sem perda de cobertura." },
      { question: "Vocês atendem fora de Guarulhos?", answer: "Sim! Atendemos todo o Brasil. O processo é 100% digital — você não precisa ir a nenhum lugar." },
    ]}
  />
);

export default LandingSeguroAuto;
