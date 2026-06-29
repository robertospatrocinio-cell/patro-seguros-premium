import LandingPageTemplate from "@/components/LandingPageTemplate";
import heroImg from "@/assets/hero-seguro-empresarial.webp";

const SeoParceriaVistoriaGuarulhos = () => (
  <LandingPageTemplate
    title="Programa Parceiro Patro Vistorias | Patro Seguros"
    headline="Programa Parceiro Patro Vistorias"
    subheadline="Transforme sua ECV em um canal de faturamento recorrente com seguro auto."
    metaDescription="Seja parceiro da Patro Seguros em sua empresa de vistoria. Indique seguros auto e ganhe comissões. Cadastro gratuito para ECVs em Guarulhos."
    painPoints={[
      "Faturamento limitado apenas a emissão de laudos",
      "Dificuldade em oferecer serviços agregados ao cliente",
      "Equipe de vistoria com baixa motivação financeira extra",
      "Perda de oportunidade de seguro no momento da transferência"
    ]}
    benefits={[
      { icon: "💰", title: "Renda Extra", description: "Comissões agressivas sobre cada seguro de veículo fechado por indicação." },
      { icon: "⚡", title: "Rapidez", description: "Cotação em 2h para seu cliente, garantindo satisfação e agilidade no pátio." },
      { icon: "🛡️", title: "Confiança", description: "Sua marca associada a uma corretora com nota 4.7 no Google." }
    ]}
    stats={[
      { value: "16+", label: "Seguradoras" },
      { value: "2h", label: "Prazo Cotação" },
      { value: "100%", label: "Grátis p/ ECV" },
      { value: "4.7", label: "Nota Google" }
    ]}
    testimonials={[
      { name: "Ricardo", role: "ECV Cumbica", content: "A parceria com a Patro aumentou nosso faturamento mensal em 20% apenas com indicações.", stars: 5 },
      { name: "Sandra", role: "Vistoria Centro", content: "É muito simples indicar. O cliente sai satisfeito com o laudo e com o seguro.", stars: 5 }
    ]}
    objections={[
      { question: "Como funciona o processo de indicação?", answer: "Sua equipe envia os dados básicos do cliente pelo nosso portal ou WhatsApp. Nós fazemos a cotação com 16 seguradoras e retornamos para o cliente." },
      { question: "Qual a comissão do parceiro?", answer: "Oferecemos percentuais competitivos sobre a comissão líquida do seguro fechado. Consulte nossa tabela atualizada." }
    ]}
    ctaText="Seja parceiro agora"
    heroEmoji="🤝"
    heroImage={heroImg}
  />
);

export default SeoParceriaVistoriaGuarulhos;
