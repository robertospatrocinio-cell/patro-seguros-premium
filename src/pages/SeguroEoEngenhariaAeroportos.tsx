import { Link } from "react-router-dom";
import { Check, FileText, MapPin } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import EoEngenhariaGuia from "@/components/EoEngenhariaGuia";
import PageMeta from "@/components/PageMeta";
import { Button } from "@/components/ui/button";
import { COMPANY, WHATSAPP_URL_BASE } from "@/config/company";
import { trackCotacaoClick, trackWhatsAppClick } from "@/lib/tracking";

const image = "/images/engenharia-aeroportuaria-projetos.jpg";
const alt = "Profissionais de engenharia com capacetes e coletes revisam uma planta junto à janela de um terminal aeroportuário.";
const source = "eo-engenharia-aeroportos";
const contractUrl = `${WHATSAPP_URL_BASE}?text=${encodeURIComponent("Olá, Patro Seguros. Recebi uma exigência de RC Profissional E&O Engenharia para um serviço em aeroporto. Posso enviar o trecho do contrato para análise?")}`;
const trust = ["Atendimento especializado", "Análise consultiva das exigências contratuais", "Busca de alternativas no mercado segurador", "Atendimento em Guarulhos e em todo o Brasil", "Suporte durante a contratação e vigência"];

function Hero() {
  return <section id="inicio" aria-labelledby="titulo-eo" className="border-y border-border bg-slate-50">
    <div className="mx-auto grid max-w-7xl lg:grid-cols-[1.2fr_1fr]">
      <div className="min-w-0 self-center px-5 py-9 sm:px-8 sm:py-12 lg:py-16 lg:pr-10">
        <Link to="/seguro-rc-profissional" className="inline-flex min-h-11 items-center text-sm font-semibold text-primary underline decoration-primary/40 underline-offset-4">Responsabilidade Civil Profissional</Link>
        <h1 id="titulo-eo" className="mt-2 max-w-[23ch] text-balance text-3xl font-semibold leading-[1.09] tracking-tight text-slate-900 sm:text-4xl xl:text-5xl">Seguro E&amp;O Engenharia para Empresas que Prestam Serviços em Aeroportos</h1>
        <p className="mt-6 max-w-prose text-lg leading-relaxed text-slate-800">Sua empresa precisa apresentar um Seguro de Responsabilidade Civil Profissional para prestar serviços no Aeroporto de Guarulhos ou em outros aeroportos do Brasil?</p>
        <p className="mt-4 max-w-prose text-base leading-relaxed text-slate-700">A Patro Seguros ajuda sua empresa a compreender as exigências contratuais e buscar uma solução de seguro compatível, simplificando o processo de contratação.</p>
        <div className="mt-7 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap">
          <Button asChild size="lg" className="h-auto min-h-12 whitespace-normal px-5 text-center"><Link to="/cotacao?tipo=rc" onClick={() => trackCotacaoClick(`${source}:hero`, { insuranceType: "rc", origin: source })}>Solicitar cotação de E&amp;O Engenharia</Link></Button>
          <Button asChild size="lg" variant="outline" className="h-auto min-h-12 whitespace-normal border-slate-400 bg-white px-5 text-center text-slate-900 hover:bg-slate-100 hover:text-slate-900"><a href={contractUrl} onClick={() => trackWhatsAppClick(`${source}:hero-contrato`)}>Enviar exigências do meu contrato</a></Button>
        </div>
      </div>
      <figure className="relative flex min-w-0 flex-col bg-[#112c49] text-white">
        <div className="relative aspect-[3/2] sm:aspect-[2/1] lg:aspect-auto lg:min-h-80 lg:flex-1">
          <img src={image} alt={alt} width={1536} height={1024} loading="eager" decoding="async" fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
        </div>
        <figcaption className="flex items-start gap-3 px-5 py-5 sm:px-8"><MapPin aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-blue-200" /><div><p className="font-semibold text-white">Aeroporto Internacional de Guarulhos (GRU Airport)</p><p className="mt-1 text-sm leading-relaxed text-slate-200">Consultoria sediada na Grande São Paulo para prestadoras de serviços em todo o Brasil.</p></div></figcaption>
      </figure>
    </div>
    <ul aria-label="Atendimento da Patro Seguros" className="mx-auto grid max-w-7xl gap-4 border-t border-border px-5 py-7 sm:grid-cols-2 sm:px-8 lg:grid-cols-5">
      {trust.map(item => <li key={item} className="flex gap-2 text-sm font-medium leading-relaxed text-slate-800"><Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{item}</li>)}
    </ul>
  </section>;
}

function NecessidadeContratual() {
  return <section id="necessidade-contratual" aria-labelledby="titulo-contrato" className="bg-white">
    <div className="mx-auto grid max-w-7xl items-start gap-9 px-5 py-14 sm:px-8 lg:grid-cols-[1.35fr_1fr] lg:gap-16 lg:py-20">
      <div className="max-w-prose">
        <h2 id="titulo-contrato" className="text-balance text-2xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-3xl">Sua empresa recebeu uma exigência de seguro da administradora do aeroporto?</h2>
        <p className="mt-5 leading-relaxed text-slate-700">Empresas contratadas para executar projetos, instalações, consultorias e serviços técnicos em aeroportos podem precisar apresentar seguros específicos de responsabilidade civil.</p>
        <p className="mt-4 leading-relaxed text-slate-700">A Patro Seguros auxilia na identificação dos requisitos apresentados e na busca de soluções compatíveis com as atividades profissionais da empresa.</p>
      </div>
      <aside className="rounded-lg bg-[#112c49] p-6 text-white sm:p-8">
        <FileText aria-hidden="true" className="mb-4 h-6 w-6 text-blue-200" />
        <p className="text-xl font-medium leading-snug text-white">Recebeu uma cláusula de seguro no seu contrato? Envie para a Patro analisar.</p>
        <p className="mt-3 text-sm leading-relaxed text-slate-200">Na conversa pelo WhatsApp, envie apenas o trecho que trata do seguro, sem dados pessoais ou informações sigilosas.</p>
        <a className="mt-3 inline-flex min-h-11 items-center rounded-sm font-semibold text-white underline underline-offset-4 hover:text-blue-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4" href={contractUrl} onClick={() => trackWhatsAppClick(`${source}:clausula`)}>Enviar cláusula pelo WhatsApp</a>
      </aside>
    </div>
  </section>;
}

export default function SeguroEoEngenhariaAeroportos() {
  return <>
    <PageMeta title="Seguro E&O Engenharia para Aeroportos" description="Recebeu uma exigência de RC Profissional em um contrato aeroportuário? A Patro analisa a cláusula e busca opções para sua empresa em Guarulhos e no Brasil." ogImage={`${COMPANY.dominioCanonico}${image}`} ogImageAlt={alt} />
    <Header />
    <main id="main-content" tabIndex={-1}>
      <Breadcrumb items={[{ label: "Seguros Empresariais", href: "/seguros-empresariais" }, { label: "E&O Engenharia para Aeroportos" }]} />
      <Hero />
      <NecessidadeContratual />
      <EoEngenhariaGuia />
      <nav aria-label="Canais institucionais da Patro Seguros" className="border-t border-border bg-slate-50">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-6 px-5 py-3 text-sm text-slate-800 sm:px-8">
          <span className="font-semibold">{COMPANY.nomeFantasia}</span>
          <a href={COMPANY.dominioCanonico} className="inline-flex min-h-11 items-center underline underline-offset-4">www.patroseguros.com.br</a>
          <a href={COMPANY.redesSociais.instagram} className="inline-flex min-h-11 items-center underline underline-offset-4">Instagram: @patroseguros</a>
        </div>
      </nav>
    </main>
    <Footer />
  </>;
}
