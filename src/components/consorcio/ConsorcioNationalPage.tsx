import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import FAQSchema from "@/components/FAQSchema";
import ServiceSchema from "@/components/ServiceSchema";
import type { ConsorcioIntentPage } from "@/data/consorcioVertical";
import { Helmet } from "react-helmet-async";
import { consorcioPesadosPath, consorcioPesadosSchema } from "@/data/consorcioPesados";
import { consorcioImoveisPath, consorcioImoveisSchema } from "@/data/consorcioImoveis";
import { consorcioVeiculosPath, consorcioVeiculosSchema } from "@/data/consorcioVeiculos";
import ConsorcioModalityContent from "./ConsorcioModalityContent";

export default function ConsorcioNationalPage({ page }: { page: ConsorcioIntentPage }) {
  const financialSchema = page.path === consorcioPesadosPath ? consorcioPesadosSchema : page.path === consorcioImoveisPath ? consorcioImoveisSchema : page.path === consorcioVeiculosPath ? consorcioVeiculosSchema : null;
  return <>
    <PageMeta title={page.title} description={page.metaDescription} />
    {financialSchema ? <Helmet><script type="application/ld+json">{JSON.stringify(financialSchema)}</script></Helmet> : <><FAQSchema faqs={page.faqs} /><ServiceSchema name={page.h1} description={page.metaDescription} serviceType="Consórcio" scope="national" /></>}
    <Header />
    <ConsorcioModalityContent page={page} />
    <Footer />
  </>;
}
