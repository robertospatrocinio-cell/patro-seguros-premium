import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import Breadcrumb from "@/components/Breadcrumb";
import FAQSchema from "@/components/FAQSchema";
import ServiceSchema from "@/components/ServiceSchema";
import ExternalLink from "@/components/ExternalLink";
import { buttonVariants } from "@/components/ui/button";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { trackWhatsAppClick } from "@/lib/tracking";
import { CONSORCIO_NATIONAL_PAGES } from "@/data/consorcioNacional";
import type { ConsorcioIntentPage } from "@/data/consorcioVertical";
import { consorcioHub } from "@/data/consorcioHub";
import { Helmet } from "react-helmet-async";
import { consorcioPesadosPath, consorcioPesadosSchema } from "@/data/consorcioPesados";

export default function ConsorcioNationalPage({ page }: { page: ConsorcioIntentPage }) {
  const whatsapp = buildWhatsAppUrl({ origem: page.whatsappOrigem, audience: "consorcio", extraLines: [page.whatsappMessage] });
  return <>
    <PageMeta title={page.title} description={page.metaDescription} />
    {page.path === consorcioPesadosPath ? (
      <Helmet><script type="application/ld+json">{JSON.stringify(consorcioPesadosSchema)}</script></Helmet>
    ) : <>
      <FAQSchema faqs={page.faqs} />
      <ServiceSchema name={page.h1} description={page.metaDescription} serviceType="Consórcio" scope="national" />
    </>}
    <Header />
    <main id="main-content" tabIndex={-1} className="outline-none">
      <div className="container mx-auto px-4 py-6"><Breadcrumb items={[{ label: "Consórcio", href: "/consorcio" }, { label: page.navLabel }]} /></div>
      <section className="gradient-hero py-16 md:py-20">
        <div className="container mx-auto max-w-5xl px-4 text-white">
          <p className="mb-4 text-sm text-white/90">Atendimento digital em todo o Brasil</p>
          <h1 className="mb-6 max-w-3xl text-white">{page.h1}</h1>
          <p className="max-w-3xl text-lg text-white/90">{page.subtitle}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <ExternalLink href={whatsapp} className={buttonVariants({ variant: "cta", size: "lg" })} onClick={() => trackWhatsAppClick(page.whatsappOrigem)}>
              Consultar planos no WhatsApp
            </ExternalLink>
            <Link to="/consorcio#comparar" className="inline-flex min-h-11 items-center rounded-md border border-white/60 px-6 py-3 font-semibold text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">Comparar no simulador</Link>
          </div>
        </div>
      </section>
      <section className="container mx-auto max-w-5xl px-4 py-14">
        <h2 className="mb-4 text-2xl font-bold">O que você pode planejar</h2>
        <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">{page.intro}</p>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div><h3 className="mb-3 text-xl font-semibold">Para quem faz sentido</h3><ul className="list-disc space-y-3 pl-5">{page.audience.map(text => <li key={text}>{text}</li>)}</ul></div>
          <div><h3 className="mb-3 text-xl font-semibold">Crédito, prazo e condições</h3><ul className="list-disc space-y-3 pl-5 text-muted-foreground">{page.bullets.map(text => <li key={text}>{text}</li>)}</ul></div>
        </div>
      </section>
      <section className="bg-muted py-14"><div className="container mx-auto max-w-4xl space-y-10 px-4">
        {page.sections.map(section => <div key={section.heading}><h2 className="mb-3 text-2xl font-bold">{section.heading}</h2><p className="leading-relaxed text-muted-foreground">{section.body}</p></div>)}
        <p className="border-l-4 border-primary pl-4 text-sm leading-relaxed">{consorcioHub.warning}</p>
      </div></section>
      <section className="container mx-auto max-w-4xl px-4 py-14" data-speakable="faq">
        <h2 className="mb-8 text-2xl font-bold">Perguntas frequentes sobre {page.navLabel.toLowerCase()}</h2>
        <div className="space-y-7">{page.faqs.map(faq => <div key={faq.question}><h3 className="mb-2 text-lg font-semibold">{faq.question}</h3><p className="leading-relaxed text-muted-foreground">{faq.answer}</p></div>)}</div>
      </section>
      <section className="bg-muted py-14"><div className="container mx-auto max-w-5xl px-4">
        <h2 className="mb-5 text-2xl font-bold">Continue seu planejamento</h2>
        <p className="mb-5 leading-relaxed">Compare todas as modalidades no <Link to="/consorcio" className="font-semibold text-primary underline">hub nacional de consórcio</Link>. Para apoio local, conheça nosso <Link to="/consorcio-guarulhos" className="font-semibold text-primary underline">atendimento em Guarulhos</Link>.</p>
        <nav aria-label="Outras modalidades de consórcio" className="grid gap-3 sm:grid-cols-3">{CONSORCIO_NATIONAL_PAGES.filter(item => item.path !== page.path).map(item => <Link key={item.path} to={item.path} className="rounded-lg border bg-background p-4 font-semibold text-primary underline underline-offset-4 hover:border-primary">{item.navLabel}</Link>)}</nav>
        <h3 className="mb-3 mt-8 text-xl font-semibold">Proteja o patrimônio adquirido</h3>
        <p className="text-muted-foreground">O seguro é uma contratação separada, conforme o bem e as exigências da administradora.</p>
        <div className="mt-3 flex flex-wrap gap-x-6 gap-y-3">
          {(page.path === "/consorcio-pesados-maquinas" ? [{ href: "/seguro-agronegocio", label: "Seguro Agronegócio" }, { href: "/seguro-maquinas-equipamentos", label: "Seguro de Máquinas e Equipamentos" }] : page.path === "/consorcio-veiculos" ? [{ href: "/seguro-auto", label: "Seguro Auto" }, { href: "/seguro-moto", label: "Seguro Moto" }] : [{ href: "/seguro-residencial", label: "Seguro Residencial" }, { href: "/seguro-empresarial", label: "Seguro Empresarial" }]).map(link => <Link key={link.href} to={link.href} className="inline-flex min-h-11 items-center font-semibold text-primary underline">{link.label}</Link>)}
        </div>
      </div></section>
      <section className="container mx-auto max-w-4xl px-4 py-14">
        <h2 className="mb-4 text-3xl font-bold">Receba uma análise para o seu objetivo</h2>
        <p className="mb-6 text-muted-foreground">Informe sua cidade, o crédito desejado, o prazo de compra e os recursos disponíveis para lance. Consulte os custos completos e o histórico disponível dos grupos, sem promessa de contemplação.</p>
        <ExternalLink href={whatsapp} className={buttonVariants({ variant: "cta", size: "lg" })} onClick={() => trackWhatsAppClick(`${page.whatsappOrigem}_final`)}>Falar com especialista</ExternalLink>
      </section>
    </main>
    <Footer />
  </>;
}
