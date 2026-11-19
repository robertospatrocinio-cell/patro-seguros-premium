import ExternalLink from "@/components/ExternalLink";
import { consorcioInstitutionalGuidance as guidance } from "@/data/consorcioVertical";

/** Informações visíveis comuns, sem taxas ou disponibilidade comercial presumidas. */
export default function ConsorcioInstitutionalGuidance() {
  return <section aria-labelledby="consorcio-responsabilidades" className="mx-auto max-w-6xl border-t border-slate-200 px-5 py-12 text-slate-600 sm:px-8">
    <h2 id="consorcio-responsabilidades" className="text-2xl font-semibold text-[#092b4c]">{guidance.heading}</h2>
    <p className="mt-5 leading-relaxed">{guidance.role}</p>
    <p className="mt-4 leading-relaxed">{guidance.after}</p>
    <h3 className="mt-6 text-lg font-semibold text-[#092b4c]">Fontes oficiais para conferir as regras</h3>
    <ul className="mt-3 space-y-2">{guidance.sources.map(source => <li key={source.href}><ExternalLink href={source.href} className="inline-flex min-h-11 items-center rounded-sm font-semibold text-[#003366] underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">{source.label}</ExternalLink></li>)}</ul>
    <p className="mt-4 text-sm leading-relaxed">O FGTS só pode ser considerado em operações imobiliárias elegíveis, não nas demais modalidades. Confira as condições vigentes e o contrato antes de aderir.</p>
  </section>;
}
