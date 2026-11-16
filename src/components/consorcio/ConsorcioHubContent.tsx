import { useEffect, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { CheckCircle2, MessageCircle, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import FAQSchema from "@/components/FAQSchema";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import EbookConsorcioBanner from "@/components/EbookConsorcioBanner";
import ConsorcioSimulator from "./ConsorcioPlanningSimulator";
import { Button } from "@/components/ui/button";
import { EMPRESA } from "@/config/empresa";
import { trackWhatsAppClick } from "@/lib/tracking";
import { consorcioHub as copy, consorcioModalities, consorcioComparison, consorcioConsulting, consorcioFaqs, consorcioWhatsapp, consorcioServiceSchema } from "@/data/consorcioHub";

type Props = { children: ReactNode; onRequest: (credit: number, summary: string) => void };
const section = "container mx-auto px-4 py-14 md:py-20";
const heading = "text-3xl md:text-4xl font-heading font-semibold tracking-tight";

export default function ConsorcioHubContent({ children, onRequest }: Props) {
  useEffect(() => {
    // O Helmet assume esses dados após a montagem; mantém só uma versão.
    document.querySelectorAll('script[data-consorcio-service="1"], script[data-faqpage="1"]')
      .forEach(script => script.remove());
  }, []);
  return <div className="min-h-screen flex flex-col bg-white text-slate-900">
    <PageMeta title={copy.title} description={copy.description} canonicalPath="/consorcio" absoluteTitle skipBreadcrumb />
    <Helmet><script type="application/ld+json">{JSON.stringify(consorcioServiceSchema)}</script></Helmet>
    <FAQSchema faqs={consorcioFaqs.map(({ q, a }) => ({ question: q, answer: a }))} />
    <BreadcrumbSchema items={[{ name: "Início", url: `${EMPRESA.dominioCanonico}/` }, { name: "Consórcio", url: `${EMPRESA.dominioCanonico}/consorcio` }]} />
    <Header />
    <main id="main-content">
      <section className="bg-[#003366] text-white">
        <div className={section}>
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-white/80"><Link to="/" className="underline underline-offset-4">Início</Link><span className="mx-3">/</span><span aria-current="page">Consórcio</span></nav>
          <p className="text-sm text-[#ffc18b] mb-5">{copy.badge}</p>
          <div className="grid lg:grid-cols-[1.15fr_1fr] gap-8 lg:gap-14">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-semibold tracking-tight leading-tight">{copy.h1}</h1>
            <div><p className="text-base md:text-lg leading-relaxed text-white/90">{copy.intro}</p>
              <ul className="mt-6 space-y-3 text-sm">{copy.highlights.map(text => <li key={text} className="flex gap-3"><CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-[#ffc18b]" /><span>{text}</span></li>)}</ul>
            </div>
          </div>
          <nav aria-label="Nesta página" className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm underline underline-offset-4">
            <a href="#comparar" className="py-2">Simular minha carta</a><a href="#modalidades" className="py-2">Modalidades</a><a href="#comparativo" className="py-2">Consórcio vs. financiamento</a><a href="#duvidas" className="py-2">Perguntas frequentes</a>
          </nav>
        </div>
      </section>
      <ConsorcioSimulator onRequest={onRequest} />
      <section id="modalidades" className={`${section} scroll-mt-24`}>
        <h2 className={`${heading} max-w-3xl`}>{copy.modalitiesTitle}</h2><p className="mt-5 max-w-3xl text-slate-600 leading-relaxed">{copy.modalitiesIntro}</p>
        <div className="grid md:grid-cols-2 gap-6 mt-8">{consorcioModalities.map(item => <article key={item.title} className="border border-slate-200 rounded-2xl p-6 md:p-8 flex flex-col">
          <h3 className="text-2xl font-heading font-semibold text-[#003366]">{item.title}</h3><p className="mt-3 font-semibold text-sm">{item.range}</p>
          <p className="mt-4 text-slate-600 leading-relaxed">{item.use}</p><p className="mt-4 text-slate-600 leading-relaxed">{item.benefit}</p>
          <Link to={item.href} className="mt-auto pt-6 min-h-12 inline-flex items-center gap-2 text-[#003366] font-semibold underline underline-offset-4">{item.action}<ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" /></Link>
        </article>)}</div>
      </section>
      <section id="comparativo" className="bg-slate-50 scroll-mt-24"><div className={section}>
        <h2 className={heading}>{copy.comparisonTitle}</h2><p className="mt-5 max-w-3xl text-slate-600 leading-relaxed">{copy.comparisonIntro}</p>
        <div className="mt-8 overflow-x-auto rounded-xl border border-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#003366]" tabIndex={0} role="region" aria-label="Tabela comparativa de consórcio e financiamento">
          <table className="w-full min-w-[640px] text-left text-sm"><caption className="sr-only">Critérios de decisão entre consórcio planejado e financiamento bancário</caption>
            <thead className="bg-[#003366] text-white"><tr><th scope="col" className="p-5">Critério de decisão</th><th scope="col" className="p-5">Consórcio planejado</th><th scope="col" className="p-5">Financiamento bancário</th></tr></thead>
            <tbody>{consorcioComparison.map(row => <tr key={row.criterion} className="border-t border-slate-200 bg-white"><th scope="row" className="p-5 align-top">{row.criterion}</th><td className="p-5 align-top text-slate-600">{row.consortium}</td><td className="p-5 align-top text-slate-600">{row.financing}</td></tr>)}</tbody>
          </table>
        </div><p className="mt-3 text-xs text-slate-600 md:hidden">Deslize a tabela para consultar as duas modalidades.</p>
      </div></section>
      <section className={section}>
        <h2 className={`${heading} max-w-3xl`}>{copy.consultingTitle}</h2><p className="mt-5 max-w-3xl text-slate-600 leading-relaxed">{copy.consultingIntro}</p>
        <ol className="grid md:grid-cols-2 gap-8 mt-10">{consorcioConsulting.map((item, i) => <li key={item.title} className="border-l-2 border-[#F2994A] pl-6"><p className="text-sm text-slate-500">Etapa {i + 1}</p><h3 className="mt-2 text-xl font-semibold">{item.title}</h3><p className="mt-3 text-slate-600 leading-relaxed">{item.text}</p></li>)}</ol>
        <p className="mt-8 text-sm text-slate-600">Proteja o bem adquirido: <Link className="underline text-[#003366]" to="/seguro-auto">Seguro Auto</Link> ou <Link className="underline text-[#003366]" to="/seguro-residencial">Seguro Residencial</Link>.</p>
      </section>
      <section className="bg-slate-50"><div className={section}>
        <div className="max-w-3xl"><h2 className={heading}>{copy.safetyTitle}</h2><p className="mt-5 text-slate-600 leading-relaxed">{copy.safety}</p><p className="mt-4 text-sm text-slate-600 leading-relaxed">{copy.safetyNote}</p></div>
        <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm font-medium"><span>CNPJ: {EMPRESA.cnpj}</span><span>SUSEP: {EMPRESA.susep}</span><a href={EMPRESA.redesSociais.google} target="_blank" rel="noopener noreferrer" className="underline">Avaliações no Google: {EMPRESA.metricas.googleRating.toFixed(1)}/5</a></div>
        <p className="mt-5 text-sm text-slate-600">Atendimento digital nacional e sede em Guarulhos. Conheça também o <Link to="/consorcio-guarulhos" className="underline text-[#003366]">atendimento de consórcio em Guarulhos</Link>.</p>
      </div></section>
      <section id="duvidas" className={`${section} scroll-mt-24`}>
        <h2 className={heading}>{copy.faqTitle}</h2><div className="mt-8 max-w-4xl divide-y divide-slate-200">{consorcioFaqs.map(faq => <details key={faq.q} className="py-1"><summary className="py-5 cursor-pointer font-semibold text-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#003366]">{faq.q}</summary><p className="pb-5 text-slate-600 leading-relaxed">{faq.a}</p></details>)}</div>
      </section>
      <section className="bg-[#003366] text-white"><div className={section}>
        <h2 className={`${heading} max-w-3xl`}>{copy.ctaTitle}</h2><p className="mt-4 max-w-2xl text-white/85">{copy.ctaText}</p>
        <div className="mt-7 flex flex-col sm:flex-row gap-4">
          <Button asChild className="min-h-12 h-auto whitespace-normal bg-[#F2994A] hover:bg-[#e58a3b] text-[#14243d]"><a href="#comparar">Simular meu consórcio agora</a></Button>
          <Button asChild variant="outline" className="min-h-12 h-auto whitespace-normal border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white"><a href={consorcioWhatsapp} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick("consorcio_cta_final")}><MessageCircle aria-hidden="true" className="mr-2 h-4 w-4 shrink-0" />Falar com especialista no WhatsApp</a></Button>
        </div>
      </div></section>
      <section id="simulacao" className={`${section} scroll-mt-24`}><div className="max-w-2xl mx-auto"><h2 className="text-2xl font-heading font-semibold">Receba uma análise personalizada</h2><p className="mt-3 mb-6 text-slate-600">Prefere deixar seu contato? Informe seu objetivo e sua cidade para receber orientação da Patro.</p>{children}</div></section>
      <EbookConsorcioBanner variant="full" />
      <aside className="bg-slate-50 border-t border-slate-200"><p className="max-w-4xl mx-auto px-4 py-8 text-sm text-slate-600 leading-relaxed"><strong>Aviso de transparência: </strong>{copy.warning}</p></aside>
    </main><Footer />
  </div>;
}
