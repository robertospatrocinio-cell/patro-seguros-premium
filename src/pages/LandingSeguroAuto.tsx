import LandingPageTemplate from "@/components/LandingPageTemplate";
import FAQSchema from "@/components/FAQSchema";
import ServiceSchema from "@/components/ServiceSchema";
import { highlightBrands } from "@/components/BrandText";
import heroImg from "@/assets/lp-seguro-auto.webp";

const LandingSeguroAuto = () => (
  <LandingPageTemplate
    heroImage={heroImg}
    title="Seguro Auto em Guarulhos"
    heroEmoji="🚗"
    headline="Seguro Auto em Guarulhos"
    subheadline={highlightBrands("Guarulhos é a segunda maior cidade de São Paulo, cortada pelas rodovias Dutra, Fernão Dias e Ayrton Senna. Isso eleva o risco de acidentes e de roubo. Nossa equipe analisa seu perfil e compara propostas em 16+ seguradoras para encontrar a melhor cobertura pelo menor custo, com economia média de 15% a 35%.")}
    metaDescription="Seguro Auto em Guarulhos comparado nas melhores seguradoras. Compare Porto, Tokio, Allianz e HDI. Economia de até 35%. Cotação em 2h."
    ctaText="Cotar Meu Seguro Auto Grátis"
    ctaUrl="https://patroseguros.com.br/cotacao-auto"
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
      { value: "2.500+", label: "Clientes" },
      { value: "20+", label: "Anos de Experiência" },
      { value: "2h", label: "Resposta" },
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
      { question: "Quanto tempo leva para receber a cotação?", answer: "En até 2 horas úteis. Comparamos até 16 seguradoras e enviamos um resumo claro, sem letras miúdas." },
      { question: "Posso parcelar o seguro?", answer: "Sim! A maioria das seguradoras oferece parcelamento em até 10x sem juros no cartão ou débito em conta." },
      { question: "E se eu já tiver seguro, posso trocar?", answer: "Pode sim. Fazemos a cotação considerando seu bônus atual. Na maioria dos casos, a transição é imediata e sem perda de cobertura." },
      { question: "Vocês atendem fora de Guarulhos?", answer: "Sim! Atendemos todo o Brasil. O processo é 100% digital — você não precisa ir a nenhum lugar." },
    ]}
    extraSections={
      <div className="space-y-20">
        <ServiceSchema 
          name="Seguro Auto" 
          description="Consultoria especializada em seguro de automóvel em Guarulhos, comparando 16+ seguradoras para garantir o melhor preço e cobertura."
          serviceType="AutoInsurance"
        />
        <FAQSchema faqs={[
        { question: "A cotação é realmente gratuita?", answer: "100% gratuita e sem compromisso. Você recebe as propostas, compara e decide com calma. Zero pressão." },
        { question: "Quanto tempo leva para receber a cotação?", answer: "Em até 2 horas úteis. Comparamos até 16 seguradoras e enviamos um resumo claro, sem letras miúdas." },
        { question: "Posso parcelar o seguro?", answer: "Sim! A maioria das seguradoras oferece parcelamento em até 10x sem juros no cartão ou débito em conta." },
        { question: "E se eu já tiver seguro, posso trocar?", answer: "Pode sim. Fazemos a cotação considerando seu bônus atual. Na maioria dos casos, a transição é imediata e sem perda de cobertura." }
        ]} />
      </div>
    }
  />
);

export default LandingSeguroAuto;