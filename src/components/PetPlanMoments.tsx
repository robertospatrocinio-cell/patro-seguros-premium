import { trackCotacaoClick } from "@/lib/tracking";

const moments = [
  {
    src: "/images/plano-pet-tutor-gato.jpg",
    alt: "Tutor abraça seu gato cinza junto ao rosto, em um momento de carinho em casa",
    title: "O colo que já tem dono.",
    text: "Para quem divide o sofá, a rotina e o carinho com um gato, cuidar da saúde também faz parte dessa companhia.",
  },
  {
    src: "/images/plano-pet-familia-cachorro.jpg",
    alt: "Pais e criança fazem carinho em seu cachorro caramelo durante um passeio no parque",
    title: "A família inteira no mesmo passeio.",
    text: "Entre brincadeiras e passeios, vale pensar nos cuidados veterinários de quem está sempre ao seu lado.",
  },
];

export default function PetPlanMoments() {
  return (
    <section aria-labelledby="pet-momentos-heading" className="border-b bg-background py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mb-8 max-w-2xl md:mb-10">
          <h2 id="pet-momentos-heading" className="text-2xl text-foreground md:text-3xl">Tem amor nos pequenos momentos de todos os dias.</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">No colo, no passeio, na alegria de chegar em casa. Seu pet faz parte da família — e escolher como cuidar da saúde dele merece atenção e orientação.</p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 md:gap-10">
          {moments.map((moment) => (
            <figure key={moment.src}>
              <div className="overflow-hidden rounded-2xl bg-muted">
                <img src={moment.src} alt={moment.alt} width={1536} height={1024} loading="lazy" decoding="async" className="aspect-[3/2] h-auto w-full object-cover" />
              </div>
              <figcaption className="mt-5 max-w-lg">
                <h3 className="text-xl font-semibold text-foreground">{moment.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{moment.text}</p>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-4 text-xs text-muted-foreground">Imagens ilustrativas.</p>
        <div className="mt-10 flex flex-col gap-5 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-xl">
            <p className="text-lg font-semibold text-foreground">O próximo cuidado pode começar com uma conversa.</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">A Patro ajuda a comparar as opções Petlove, a rede na sua região e as condições para seu cão ou gato.</p>
          </div>
          <a href="#opcoes-plano-pet" onClick={() => trackCotacaoClick("plano-pet:momentos", { origin: "plano-pet-momentos", insuranceType: "Plano Pet (Petlove)" })} className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-xl bg-primary px-6 py-3 text-center text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">Ver opções para meu pet</a>
        </div>
      </div>
    </section>
  );
}
