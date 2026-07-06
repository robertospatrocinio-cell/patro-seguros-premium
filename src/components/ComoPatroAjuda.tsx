/**
 * ComoPatroAjuda — Bloco reutilizável "Como a Patro ajuda".
 *
 * Explica em 4 passos claros como o cliente é atendido, com CTA duplo
 * consistente (WhatsApp + Cotação online). Reforça previsibilidade do
 * processo e reduz atrito na conversão em qualquer página comercial.
 *
 * Uso:
 *   <ComoPatroAjuda />                                  // usa contexto padrão
 *   <ComoPatroAjuda product="Seguro Auto" trackingContext="hub-auto:como-ajuda" />
 *   <ComoPatroAjuda quoteHref="#formulario" />         // âncora custom
 */

import { MessageCircle, ArrowRight, PhoneCall, ClipboardList, Scale, ShieldCheck } from "lucide-react";
import { trackWhatsAppClick, trackCotacaoClick } from "@/lib/tracking";

interface ComoPatroAjudaProps {
  /** Nome do produto/seguro exibido no título e mensagem do WhatsApp. */
  product?: string;
  /** Rótulo curto para analytics (ex.: "hub-auto:como-ajuda"). */
  trackingContext?: string;
  /** Destino do CTA "Cotação online". Padrão: âncora #formulario. */
  quoteHref?: string;
  className?: string;
}

const STEPS = [
  {
    icon: PhoneCall,
    title: "Você conta o que precisa",
    description:
      "Fale por WhatsApp, telefone (11) 5199-7500 ou formulário. Sem robô, sem call center.",
  },
  {
    icon: ClipboardList,
    title: "Analisamos seu perfil",
    description:
      "Nosso time consulta 16+ seguradoras parceiras e monta um comparativo transparente para o seu caso.",
  },
  {
    icon: Scale,
    title: "Você compara e decide",
    description:
      "Enviamos as propostas lado a lado, explicando coberturas, franquia e assistência — sem pressão de venda.",
  },
  {
    icon: ShieldCheck,
    title: "Cuidamos da apólice e do sinistro",
    description:
      "Emissão, endosso, renovação e sinistro: você fala com a Patro, a gente resolve com a seguradora.",
  },
] as const;

const buildWhatsAppUrl = (product?: string) => {
  const base = product
    ? `Olá! Vim pelo site da Patro Seguros e gostaria de uma cotação de ${product}. Pode me ajudar?`
    : "Olá, vim pelo site da Patro Seguros e gostaria de solicitar uma cotação de seguro.";
  return `https://wa.me/551151997500?text=${encodeURIComponent(base)}`;
};

const ComoPatroAjuda = ({
  product,
  trackingContext,
  quoteHref = "#formulario",
  className = "",
}: ComoPatroAjudaProps) => {
  const ctxWa = trackingContext ? `${trackingContext}:whatsapp` : "como-patro-ajuda:whatsapp";
  const ctxQuote = trackingContext ? `${trackingContext}:cotacao` : "como-patro-ajuda:cotacao";
  const heading = product ? `Como a Patro ajuda com ${product}` : "Como a Patro ajuda você";

  return (
    <section
      className={`rounded-2xl border border-slate-200 bg-white p-8 md:p-10 shadow-sm ${className}`}
      aria-labelledby="como-patro-ajuda-heading"
    >
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="inline-block text-xs font-semibold tracking-wider uppercase text-primary/80 mb-3">
          Passo a passo
        </span>
        <h2
          id="como-patro-ajuda-heading"
          className="text-2xl md:text-3xl font-bold text-slate-900"
        >
          {heading}
        </h2>
        <p className="mt-3 text-slate-600 text-sm md:text-base">
          Atendimento humano, comparativo transparente e a Patro do seu lado do primeiro contato até o sinistro.
        </p>
      </div>

      <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 list-none mb-10">
        {STEPS.map((step, i) => {
          const Icon = step.icon;
          return (
            <li
              key={i}
              className="relative rounded-xl border border-slate-200 bg-slate-50/60 p-5 flex flex-col gap-3"
            >
              <div className="flex items-center gap-3">
                <span
                  className="flex-shrink-0 w-9 h-9 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
              </div>
              <h3 className="text-[15px] font-semibold text-slate-900 leading-snug">
                {step.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {step.description}
              </p>
            </li>
          );
        })}
      </ol>

      <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
        <a
          href={buildWhatsAppUrl(product)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsAppClick(ctxWa)}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] hover:bg-[#1fb457] text-white font-semibold px-6 py-3 text-sm transition-colors w-full sm:w-auto"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          Falar no WhatsApp agora
        </a>
        <a
          href={quoteHref}
          onClick={() => trackCotacaoClick(ctxQuote)}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary hover:bg-primary/90 text-white font-semibold px-6 py-3 text-sm transition-colors w-full sm:w-auto"
        >
          Solicitar cotação online
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
};

export default ComoPatroAjuda;