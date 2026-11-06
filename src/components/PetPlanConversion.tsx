import { lazy, Suspense } from "react";
import { WHATSAPP_URL_BASE } from "@/config/empresa";
import { trackWhatsAppClick } from "@/lib/tracking";

const ProductQuoteForm = lazy(() => import("@/components/ProductQuoteForm"));
const whatsappUrl = `${WHATSAPP_URL_BASE}?text=${encodeURIComponent("Olá! Vim pela página Plano Pet e quero comparar as opções Petlove para meu cão ou gato. Gostaria de conferir valores, rede na minha cidade, carências e coparticipações.")}`;

export default function PetPlanConversion() {
  return (
    <section id="opcoes-plano-pet" aria-labelledby="pet-opcoes-heading" className="scroll-mt-28 border-b bg-muted/30 py-12 md:py-16">
      <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-2 lg:items-start lg:gap-16">
        <div className="max-w-xl">
          <h2 id="pet-opcoes-heading" className="text-2xl md:text-3xl">Qual plano faz sentido para o seu pet?</h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">Ele faz parte da sua vida. Na hora de cuidar, não escolha só pela mensalidade. A Patro ajuda você a entender as opções Petlove para a rotina do seu cão ou gato e a conferir onde poderá usar o plano.</p>
          <figure className="mt-6">
            <div className="overflow-hidden rounded-2xl bg-muted">
              <img src="/images/plano-pet-tutora-cachorro.jpg" alt="Tutora abraça seu golden retriever no chão da sala, com o cachorro apoiado em seu ombro" width={1536} height={1024} loading="lazy" decoding="async" className="aspect-[3/2] h-auto w-full object-cover" />
            </div>
            <figcaption className="mt-3 text-sm leading-relaxed text-muted-foreground">O carinho já faz parte da rotina. Planejar os cuidados também pode fazer. <span className="block mt-1 text-xs">Imagem ilustrativa.</span></figcaption>
          </figure>
        </div>
        <div className="order-3 max-w-xl lg:order-none lg:col-start-1 lg:row-start-2">
          <ul className="divide-y divide-border">
            {[
              ["Cuidado no dia a dia", "Confira consultas, exames e cuidados preventivos incluídos em cada opção."],
              ["Atenção aos imprevistos", "Compare a inclusão de urgências, cirurgias e internação, com seus limites e carências."],
              ["Rede perto de você", "Verifique clínicas e hospitais na sua cidade antes de contratar."],
            ].map(([title, text]) => (
              <li key={title} className="py-4 first:pt-0">
                <h3 className="text-base font-semibold text-foreground">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </li>
            ))}
          </ul>
          <div className="mt-6 border-l-2 border-primary pl-4">
            <p className="text-sm font-semibold text-foreground">Como será o próximo passo?</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Envie seu contato. A equipe conversa com você sobre o pet e a região de atendimento, verifica as opções e explica mensalidade, possíveis coparticipações e carências. Você avalia as condições antes de decidir.</p>
          </div>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick("plano-pet:comparacao", { origin: "plano-pet-conversao", insuranceType: "Plano Pet (Petlove)" })} className="mt-5 inline-flex min-h-11 items-center rounded-md text-sm font-semibold text-primary underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">Prefiro tirar minhas dúvidas pelo WhatsApp</a>
        </div>
        <div className="order-2 lg:order-none lg:col-start-2 lg:row-start-1 lg:row-span-2">
          <Suspense fallback={<div role="status" className="min-h-[560px] rounded-2xl border bg-card p-6 text-sm text-muted-foreground">Carregando formulário de Plano Pet…</div>}>
            <ProductQuoteForm productName="Plano Pet (Petlove)" productPath="/plano-pet" compactContact />
          </Suspense>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Solicitar opções não contrata o plano nem libera atendimento imediato. A utilização depende das condições da Petlove.</p>
        </div>
      </div>
    </section>
  );
}
