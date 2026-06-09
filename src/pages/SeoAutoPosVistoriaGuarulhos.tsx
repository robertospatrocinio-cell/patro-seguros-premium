import LandingPageTemplate from "@/components/LandingPageTemplate";
import heroImg from "@/assets/hero-seguro-auto.webp";

const SeoAutoPosVistoriaGuarulhos = () => (
  <LandingPageTemplate
    title="Seguro Auto Pós-Vistoria | Patro Seguros"
    headline="Seguro Auto Pós-Vistoria"
    subheadline="Acabou de comprar ou transferir um veículo? Garanta a proteção agora."
    metaDescription="Cote seu seguro auto após a vistoria em Guarulhos. Comparamos 16 seguradoras para veículos novos, seminovos e recém-transferidos. Cotação em 2h."
    painPoints={[
      "Circular com veículo recém-adquirido sem seguro",
      "Risco de roubo ou batida antes de formalizar a apólice",
      "Dúvida sobre qual seguradora aceita veículos transferidos",
      "Perda de tempo procurando seguradoras uma por uma"
    ]}
    benefits={[
      { icon: "🚗", title: "Cobertura Total", description: "Proteção contra roubo, furto, batida e danos a terceiros." },
      { icon: "⏱️", title: "Cotação em 2h", description: "Receba o comparativo de 16 seguradoras em tempo recorde." },
      { icon: "💳", title: "Preço Justo", description: "Encontramos a menor parcela para seu perfil de condutor." }
    ]}
    stats={[
      { value: "16", label: "Seguradoras" },
      { value: "2h", label: "Resposta" },
      { value: "10x", label: "Parcelamento" },
      { value: "24h", label: "Assistência" }
    ]}
    testimonials={[
      { name: "João P.", role: "Vila Galvão", content: "Cotei logo após sair da ECV. Em 1 hora já estava com o carro segurado e tranquilo.", stars: 5 },
      { name: "Marcela S.", role: "Macedo", content: "Ótimo preço e atendimento. Compararam tudo pra mim pelo WhatsApp.", stars: 5 }
    ]}
    objections={[
      { question: "Fiz a vistoria hoje, já posso cotar?", answer: "Sim! Com os dados do laudo ou CRLV, já fazemos a cotação imediata em 16 seguradoras." },
      { question: "Aceitam carros com histórico de leilão?", answer: "Sim, trabalhamos com seguradoras especialistas que aceitam veículos com restrições com ótimas taxas." }
    ]}
    ctaText="Solicitar Cotação Agora"
    heroEmoji="🚗"
    heroImage={heroImg}
  />
);

export default SeoAutoPosVistoriaGuarulhos;
