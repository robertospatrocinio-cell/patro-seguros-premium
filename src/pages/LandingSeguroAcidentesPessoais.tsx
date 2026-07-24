import LandingPageTemplate from "@/components/LandingPageTemplate";
import { ArrowRight, MessageCircle } from "lucide-react";
import { trackWhatsAppClick, trackCotacaoClick } from "@/lib/tracking";
import heroImg from "@/assets/lp-seguro-acidentes-pessoais.jpg";

const QUOTE_URL = "https://patro.seucorretor.digital/#/formularios/acidentes-pessoais";
const WHATSAPP_URL =
  "https://wa.me/551151997500?text=" +
  encodeURIComponent(
    "Olá! Vim pela landing page de Seguro de Acidentes Pessoais e gostaria de uma cotação."
  );

const StickyCta = () => (
  <>
    {/* Espaçador para que o CTA fixo não cubra o conteúdo final */}
    <div aria-hidden="true" className="h-20 md:h-0" />
    <div className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-background/95 backdrop-blur-lg border-t border-border shadow-[0_-8px_24px_-12px_rgba(0,0,0,0.15)]">
      <div className="container mx-auto px-3 py-2.5 grid grid-cols-2 gap-2">
        <a
          href={QUOTE_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackCotacaoClick("lp-seguro-acidentes-pessoais-sticky")}
          className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary text-primary-foreground font-bold text-[13px] h-11 px-3 shadow-md shadow-primary/25"
        >
          <ArrowRight className="h-4 w-4" aria-hidden="true" /> Pedir cotação
        </a>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsAppClick("lp-seguro-acidentes-pessoais-sticky")}
          className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[hsl(142,70%,45%)] text-white font-bold text-[13px] h-11 px-3 shadow-md"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" /> WhatsApp
        </a>
      </div>
    </div>
  </>
);

const LandingSeguroAcidentesPessoais = () => (
  <>
    <LandingPageTemplate
      heroImage={heroImg}
      title="Seguro de Acidentes Pessoais"
      heroEmoji="🛡️"
      ctaUrl={QUOTE_URL}
      headline="Um acidente pode mudar tudo. Você e sua família estão protegidos?"
      subheadline="Indenização por morte acidental, invalidez permanente e despesas médicas. Um dos seguros com melhor custo-benefício do mercado — cotação gratuita em minutos."
      metaDescription="Seguro de Acidentes Pessoais: indenização por morte acidental, invalidez e despesas médicas. A partir de R$ 15/mês. Cotação grátis com a Patro Seguros."
      ctaText="Pedir Cotação Agora"
      urgencyText="Um acidente não avisa. Contrate hoje."
      priceAnchor="A partir de R$ 15/mês* — proteção acessível para toda a família"
      guaranteeText="Cotação 100% gratuita e sem compromisso. Analisamos seu perfil e apresentamos as melhores opções de seguradoras. Você decide com calma, sem pressão."
      painPoints={[
        "Um acidente pode afastar você do trabalho por meses — como sua família pagaria as contas nesse período?",
        "Uma invalidez permanente pode custar centenas de milhares em adaptações, próteses e tratamentos.",
        "Despesas médicas fora do plano de saúde (fisioterapia, enfermagem, ortopedistas particulares) drenam qualquer reserva.",
        "Se acontecer o pior, sua família ficaria com dívidas, sem renda e sem estrutura para seguir em frente.",
      ]}
      stats={[
        { value: "R$15", label: "A partir de" },
        { value: "16+", label: "Seguradoras" },
        { value: "24h", label: "Emissão" },
        { value: "100%", label: "Gratuito" },
      ]}
      benefits={[
        { icon: "💰", title: "Morte acidental", description: "Indenização integral para sua família em caso de falecimento por acidente, garantindo estabilidade financeira." },
        { icon: "♿", title: "Invalidez permanente", description: "Indenização proporcional para invalidez total ou parcial decorrente de acidente, para cobrir adaptações e reabilitação." },
        { icon: "🏥", title: "Despesas médicas", description: "Reembolso de despesas médico-hospitalares e odontológicas decorrentes de acidentes cobertos." },
        { icon: "🛏️", title: "Diária de internação", description: "Valor diário pago em caso de internação hospitalar por acidente, para cobrir custos que o plano de saúde não paga." },
        { icon: "🌎", title: "Cobertura 24h em todo Brasil", description: "Proteção em casa, no trabalho, no trânsito, na academia e em viagens — 24 horas por dia, 7 dias por semana." },
        { icon: "💳", title: "Preço acessível", description: "Um dos seguros mais baratos do mercado. Cabe no orçamento e faz uma diferença enorme quando você mais precisa." },
      ]}
      testimonials={[
        { name: "Fernando M.", role: "Motociclista", stars: 5, content: "Caí de moto e fiquei 3 meses afastado. O seguro pagou diárias de internação e as despesas médicas que o plano não cobriu. Salvou meu orçamento." },
        { name: "Patrícia S.", role: "Mãe de 2", stars: 5, content: "Meu marido teve um acidente grave no trabalho e ficou com invalidez parcial. A indenização ajudou a pagar próteses e adaptar a casa. Não sei o que faríamos sem o seguro." },
        { name: "Rogério T.", role: "Autônomo", stars: 5, content: "Sou autônomo e não tenho INSS ativo. O seguro de acidentes pessoais é minha rede de segurança. Pago menos de R$ 30 por mês e durmo tranquilo." },
      ]}
      objections={[
        { question: "Qual a diferença entre seguro de vida e acidentes pessoais?", answer: "O seguro de vida cobre morte por qualquer causa (natural ou acidental). O seguro de acidentes pessoais cobre exclusivamente eventos acidentais — por isso é muito mais barato. Muita gente contrata os dois." },
        { question: "Quanto custa por mês?", answer: "A partir de R$ 15/mês, dependendo da idade, do capital segurado escolhido e das coberturas adicionais. Enviamos uma cotação personalizada e você escolhe o plano que cabe no seu bolso." },
        { question: "A cobertura vale em qualquer lugar?", answer: "Sim. A cobertura é 24 horas por dia, 7 dias por semana, em qualquer lugar do Brasil (e a maioria das apólices também vale no exterior). Vale para acidentes em casa, trabalho, lazer, trânsito e viagens." },
        { question: "Preciso fazer exames médicos?", answer: "Não. O seguro de acidentes pessoais dispensa exames médicos e questionários extensos. A contratação é rápida — em geral a apólice é emitida em 24 horas." },
        { question: "Sou autônomo/MEI, faz sentido para mim?", answer: "Muito. Autônomos não têm seguridade do INSS ativa como um CLT. O seguro de acidentes pessoais é a forma mais barata de garantir uma renda de emergência caso um acidente te afaste do trabalho." },
        { question: "Como recebo a indenização?", answer: "Em caso de sinistro, basta acionar a Patro Seguros e nós conduzimos todo o processo com a seguradora. A indenização é paga diretamente na conta do beneficiário indicado, geralmente em até 30 dias após a documentação completa." },
      ]}
    />
    <StickyCta />
  </>
);

export default LandingSeguroAcidentesPessoais;