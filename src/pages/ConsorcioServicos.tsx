import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import Breadcrumb from "@/components/Breadcrumb";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import FAQSchema from "@/components/FAQSchema";
import ExternalLink from "@/components/ExternalLink";
import ProductQuoteForm from "@/components/ProductQuoteForm";
import { buttonVariants } from "@/components/ui/button";
import { EMPRESA } from "@/config/empresa";
import { trackCotacaoClick, trackWhatsAppClick } from "@/lib/tracking";
import { consorcioServicos as copy, consorcioServicosFields } from "@/data/consorcioServicos";
import { consorcioServicosSchema, consorcioServicosWhatsapp, consorcioServicosLinks, consorcioServicosModalities } from "@/data/consorcioServicosSeo";

const ctaClass = `${buttonVariants({ variant: "cta", size: "lg" })} h-auto min-h-12 whitespace-normal text-center`;
const outlineClass = "inline-flex min-h-12 items-center justify-center rounded-md border border-white/60 px-6 py-3 text-center font-semibold text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4";

export default function ConsorcioServicos() {
  return <>
    <PageMeta title={copy.title} description={copy.description} absoluteTitle canonicalPath={copy.path} skipBreadcrumb />
    <BreadcrumbSchema items={[{ name: "Consórcios", url: "/consorcio" }, { name: "Consórcio de Serviços", url: copy.path }]} />
    <FAQSchema faqs={copy.faqs} />
    <Helmet><script type="application/ld+json">{JSON.stringify(consorcioServicosSchema)}</script></Helmet>
    <Header />
    <main id="main-content" tabIndex={-1} className="outline-none">
      <Breadcrumb items={[{ label: "Consórcios", href: "/consorcio" }, { label: "Consórcio de Serviços" }]} />
      <section className="gradient-hero py-12 md:py-20">
        <div className="container mx-auto grid items-start gap-10 px-4 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
          <div className="text-white">
            <p className="mb-5 text-sm font-medium text-white/90">{copy.badge}</p>
            <h1 className="mb-6 text-3xl font-bold leading-tight text-white md:text-4xl xl:text-5xl">{copy.h1}</h1>
            <p className="text-lg leading-relaxed text-white/90">{copy.subtitle}</p>
            <ul className="mt-7 space-y-4">{copy.highlights.map(text => <li key={text} className="flex gap-3 leading-relaxed"><span aria-hidden="true" className="font-bold text-white">✓</span><span>{text}</span></li>)}</ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href="#simulacao" className={ctaClass} onClick={() => trackCotacaoClick("consorcio_servicos_hero")}>Simular Consórcio de Serviços</a>
              <ExternalLink href={consorcioServicosWhatsapp} className={outlineClass} onClick={() => trackWhatsAppClick("consorcio_servicos_hero")}>Falar com Consultor Agora</ExternalLink>
            </div>
            <p className="mt-7 rounded-xl border border-white/25 bg-black/10 p-4 text-sm leading-relaxed text-white/90">{copy.warning}</p>
          </div>
          <div id="simulacao" className="scroll-mt-28 rounded-2xl bg-card p-1 text-card-foreground shadow-xl">
            <h2 className="sr-only">Solicite seu estudo de consórcio de serviços</h2>
            <ProductQuoteForm productName="Consórcio de Serviços" productPath={copy.path} fields={consorcioServicosFields} compactContact expandDetails nameLabel="Nome completo" heading="Estudo de Consórcio de Serviços" description="Receba opções de parcelas e prazos para realizar seu projeto sem juros de financiamento. Detalhes opcionais; sua previsão não garante contemplação." submitLabel="Receber Simulação Personalizada" />
            <p className="px-6 pb-5 text-xs leading-relaxed text-muted-foreground">Simulação sem compromisso. Seus dados serão usados para responder ao pedido, conforme a Política de Privacidade e a LGPD. Não envie detalhes clínicos.</p>
          </div>
        </div>
      </section>
      <section className="container mx-auto max-w-4xl px-4 py-14 md:py-20">
        <h2 className="mb-6 text-2xl font-bold md:text-3xl">{copy.pain.heading}</h2>
        <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">{copy.pain.paragraphs.map(text => <p key={text}>{text}</p>)}</div>
      </section>
      <section className="bg-muted/50 py-14 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-5 max-w-4xl text-2xl font-bold md:text-3xl">{copy.projectsHeading}</h2>
          <p className="mb-8 max-w-4xl leading-relaxed text-muted-foreground">{copy.projectsIntro}</p>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{copy.projects.map((project, index) => <article key={project.title} className="rounded-2xl border bg-card p-6 text-card-foreground">
            <span aria-hidden="true" className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">{index + 1}</span>
            <h3 className="mb-3 text-xl font-semibold">{project.title}</h3><p className="leading-relaxed text-muted-foreground">{project.text}</p>
          </article>)}</div>
        </div>
      </section>
      <section className="container mx-auto max-w-6xl px-4 py-14 md:py-20">
        <h2 className="mb-5 text-2xl font-bold md:text-3xl">{copy.comparisonHeading}</h2>
        <p className="mb-6 leading-relaxed text-muted-foreground">{copy.comparisonIntro}</p>
        <div role="region" aria-label="Tabela comparativa de custos; role horizontalmente em telas pequenas" tabIndex={0} className="overflow-x-auto rounded-xl border focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <caption className="p-4 text-left font-semibold">Comparação ilustrativa para projeto de R$ 30.000 em 36 meses</caption>
            <thead className="bg-primary text-primary-foreground"><tr><th scope="col" className="p-4">Critério</th><th scope="col" className="p-4">Consórcio de Serviços</th><th scope="col" className="p-4">Empréstimo Pessoal / CDC</th></tr></thead>
            <tbody>{copy.comparisonRows.map(([criterion, consortium, loan]) => <tr key={criterion} className="border-t even:bg-muted/50"><th scope="row" className="p-4 align-top font-semibold">{criterion}</th><td className="p-4 align-top leading-relaxed">{consortium}</td><td className="p-4 align-top leading-relaxed">{loan}</td></tr>)}</tbody>
          </table>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{copy.comparisonNote}</p>
      </section>
      <section className="bg-muted/50 py-14 md:py-20"><div className="container mx-auto max-w-6xl px-4">
        <h2 className="mb-8 text-2xl font-bold md:text-3xl">{copy.stepsHeading}</h2>
        <ol className="grid gap-6 md:grid-cols-2">{copy.steps.map((step, i) => <li key={step.title} className="rounded-xl border bg-card p-6"><h3 className="mb-3 text-xl font-semibold">{i + 1}. {step.title}</h3><p className="leading-relaxed text-muted-foreground">{step.text}</p></li>)}</ol>
        <nav aria-label="Planejamento e proteção do seu projeto" className="mt-8 flex flex-col items-start gap-3">{consorcioServicosLinks.map(link => <Link key={link.href} to={link.href} className="inline-flex min-h-11 items-center font-semibold text-primary underline underline-offset-4">{link.label} →</Link>)}</nav>
        <p className="mt-3 text-sm text-muted-foreground">Os seguros são contratações separadas, sujeitos às condições e à aceitação de cada seguradora.</p>
      </div></section>
      <section className="container mx-auto max-w-4xl px-4 py-14 md:py-20" data-speakable="faq">
        <h2 className="mb-8 text-2xl font-bold md:text-3xl">Perguntas Frequentes sobre Consórcio de Serviços</h2>
        <div className="space-y-7">{copy.faqs.map(faq => <div key={faq.question}><h3 className="mb-3 text-lg font-semibold">{faq.question}</h3><p className="leading-relaxed text-muted-foreground">{faq.answer}</p></div>)}</div>
      </section>
      <section className="gradient-hero py-14 md:py-20"><div className="container mx-auto max-w-4xl px-4 text-white">
        <h2 className="mb-5 text-3xl font-bold text-white">{copy.closingHeading}</h2><p className="mb-8 text-lg leading-relaxed text-white/90">{copy.closingText}</p>
        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap"><a href="#simulacao" className={ctaClass} onClick={() => trackCotacaoClick("consorcio_servicos_final")}>Simular Meu Projeto Agora</a><ExternalLink href={consorcioServicosWhatsapp} className={outlineClass} onClick={() => trackWhatsAppClick("consorcio_servicos_final")}>Falar no WhatsApp {EMPRESA.telefone}</ExternalLink></div>
      </div></section>
      <section className="container mx-auto max-w-6xl px-4 py-12">
        <h2 className="mb-6 text-2xl font-bold">Conheça as outras modalidades de consórcio</h2>
        <nav aria-label="Outras modalidades de consórcio" className="grid gap-4 sm:grid-cols-3">{consorcioServicosModalities.map(link => <Link key={link.href} to={link.href} className="rounded-xl border bg-card p-5 font-semibold text-primary underline underline-offset-4 hover:border-primary">{link.label}</Link>)}</nav>
      </section>
    </main>
    <Footer />
  </>;
}
