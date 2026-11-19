import { useEffect, useRef } from "react";
import { ChevronDown, Link as LinkIcon } from "lucide-react";

interface DiscoverableFaqProps {
  items: readonly { q: string; a: string }[];
  idPrefix: string;
}

/** Respostas presentes no HTML, inclusive antes da execução do JavaScript. */
const DiscoverableFaq = ({ items, idPrefix }: DiscoverableFaqProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const revealLinkedAnswer = () => {
      const id = window.location.hash.slice(1);
      const answer = Array.from(containerRef.current?.querySelectorAll("details") ?? [])
        .find((item) => item.id === id);
      if (answer) {
        answer.open = true;
        answer.scrollIntoView?.({ block: "start" });
      }
    };
    revealLinkedAnswer();
    window.addEventListener("hashchange", revealLinkedAnswer);
    return () => window.removeEventListener("hashchange", revealLinkedAnswer);
  }, [items, idPrefix]);

  return (
    <div ref={containerRef} className="w-full">
      {items.map((item, index) => {
        const id = `${idPrefix}-${index + 1}`;
        return (
          <details key={id} id={id} className="group border-b scroll-mt-28">
            <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 rounded-sm py-4 text-left hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 [&::-webkit-details-marker]:hidden">
              <h3 className="flex w-full items-center justify-between gap-4 text-sm font-medium">
                {item.q}
                <ChevronDown aria-hidden="true" className="h-4 w-4 shrink-0 motion-safe:transition-transform group-open:rotate-180" />
              </h3>
            </summary>
            <div className="pb-4 text-sm leading-relaxed text-muted-foreground">
              <p>{item.a}</p>
              <a href={`#${id}`} aria-label={`Link para a pergunta: ${item.q}`} className="mt-2 inline-flex min-h-11 items-center gap-2 rounded-sm font-medium text-primary underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                <LinkIcon aria-hidden="true" className="h-3.5 w-3.5" /> Link desta resposta
              </a>
            </div>
          </details>
        );
      })}
    </div>
  );
};

export default DiscoverableFaq;
