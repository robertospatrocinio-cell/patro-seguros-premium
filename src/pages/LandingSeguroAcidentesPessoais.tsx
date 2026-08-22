import LandingPageTemplate from "@/components/LandingPageTemplate";
import { ArrowRight, MessageCircle } from "lucide-react";
import { trackWhatsAppClick, trackCotacaoClick } from "@/lib/tracking";
import FAQSchema from "@/components/FAQSchema";
import ServiceSchema from "@/components/ServiceSchema";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import heroImg from "@/assets/lp-seguro-acidentes-pessoais.webp";

const QUOTE_URL = "https://www.patroseguros.com.br/cotacao-auto";
const WHATSAPP_URL =
  "https://wa.me/551151997500?text=" +
  encodeURIComponent(
    "Olá! Vim pela landing page de Seguro de Acidentes Pessoais e gostaria de uma cotação."
  );

const FAQS = [
  { question: "Qual a diferença entre seguro de vida e seguro de acidentes pessoais?", answer: "O seguro de vida cobre morte por qualquer causa (natural ou acidental). O seguro de acidentes pessoais cobre exclusivamente eventos acidentais — por isso costuma custar muito menos. É comum contratar os dois em conjunto para uma proteção completa." },
  { question: "Quanto custa o seguro de acidentes pessoais?", answer: "A partir de aproximadamente R$ 15 por mês, dependendo da idade do segurado, do capital segurado escolhido (indenização) e das coberturas adicionais como diária de internação e despesas médicas. A Patro Seguros faz cotação gratuita em mais de 16 seguradoras." },
  { question: "O seguro cobre acidentes em qualquer lugar?", answer: "Sim. A cobertura vale 24 horas por dia, 7 dias por semana, em qualquer lugar do Brasil, e a maioria das apólices também cobre acidentes no exterior. Vale para eventos em casa, no trabalho, no trânsito, na prática esportiva, em viagens e no lazer." },
  { question: "Preciso fazer exames médicos para contratar?", answer: "Não. O seguro de acidentes pessoais dispensa exames médicos e não exige questionário de saúde extenso. A contratação é rápida e a apólice geralmente é emitida em até 24 horas." },
  { question: "Sou autônomo ou MEI, faz sentido contratar acidentes pessoais?", answer: "Sim. Profissionais autônomos e MEIs normalmente não contam com auxílio-doença ativo do INSS. O seguro de acidentes pessoais funciona como uma rede de segurança, pagando indenização e diárias que substituem parte da renda em caso de afastamento por acidente." },
  { question: "Como funciona o pagamento da indenização?", answer: "Em caso de sinistro, o segurado ou o beneficiário aciona a Patro Seguros e nós conduzimos todo o processo junto à seguradora. Após a análise da documentação, a indenização é depositada diretamente na conta indicada, normalmente em até 30 dias." },
  { question: "Posso incluir a família na mesma apólice?", answer: "Sim. Existem planos individuais e planos familiares que incluem cônjuge e filhos com condições diferenciadas. Também é possível contratar coberturas específicas para crianças, com foco em despesas médicas e diária de internação." },
  { question: "Quais coberturas adicionais estão disponíveis?", answer: "Além de morte acidental, invalidez permanente e despesas médicas, é possível adicionar diária de internação hospitalar (DIH), auxílio-funeral, cesta básica em caso de afastamento e assistências 24h (residencial, pet, viagem)." },
];

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
    <FAQSchema faqs={FAQS} />
    <BreadcrumbSchema
      items={[
        { name: "Início", url: "https://www.patroseguros.com.br/" },
        { name: "Seguro de Acidentes Pessoais", url: "https://www.patroseguros.com.br/lp-seguro-acidentes-pessoais" },
      ]}
    />
    <ServiceSchema
      name="Seguro de Acidentes Pessoais"
      description="Corretagem de Seguro de Acidentes Pessoais em Guarulhos e São Paulo, com cotação em mais de 16 seguradoras. Coberturas de morte acidental, invalidez permanente, despesas médicas e diária de internação."
      serviceType="AccidentInsurance"
    />
    <LandingPageTemplate
      heroImage={heroImg}
      title="Seguro de Acidentes Pessoais"
      heroEmoji="🛡️"
      ctaUrl={QUOTE_URL}
      indexable
      ogImage="https://www.patroseguros.com.br/images/og-cover.webp"
      ogImageAlt="Seguro de Acidentes Pessoais — Patro Seguros"
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
      objections={FAQS}
    />
    <StickyCta />
  </>
);

export default LandingSeguroAcidentesPessoais;