import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import FAQSchema from "@/components/FAQSchema";
import ServiceSchema from "@/components/ServiceSchema";
import type { ConsorcioIntentPage } from "@/data/consorcioVertical";
import { CONSORCIO_TRANSPARENCY_NOTICE, CONSORCIO_PRUDENT_LANGUAGE } from "@/data/consorcioVertical";
import ConsorcioModalityContent from "./ConsorcioModalityContent";

export default function ConsorcioIntentPageTemplate({ page }: { page: ConsorcioIntentPage }) {
  return <>
    <PageMeta title={page.title} description={page.metaDescription} />
    <FAQSchema faqs={page.faqs} />
    <ServiceSchema name={page.h1} serviceType="Consórcio" description={page.metaDescription} />
    <Header />
    <ConsorcioModalityContent page={page} local />
    <aside className="mx-auto max-w-6xl space-y-3 px-5 py-8 text-xs leading-relaxed text-slate-600 sm:px-8">
      <p>{CONSORCIO_TRANSPARENCY_NOTICE}</p>
      <p>{CONSORCIO_PRUDENT_LANGUAGE}</p>
    </aside>
    <Footer />
  </>;
}
