import { useEffect, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { CheckCircle2, MessageCircle, ArrowRight, Home, CarFront, Truck, Wrench, ShieldCheck, Plus, Clock3 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import EbookConsorcioBanner from "@/components/EbookConsorcioBanner";
import ConsorcioSimulator from "./ConsorcioPlanningSimulator";
import { Button } from "@/components/ui/button";
import { EMPRESA } from "@/config/empresa";
import { trackCotacaoClick, trackWhatsAppClick } from "@/lib/tracking";
import { consorcioHub as copy, consorcioModalities, consorcioComparison, consorcioConsulting, consorcioFaqs, consorcioWhatsapp, consorcioSchema, consorcioOfficialSources } from "@/data/consorcioHub";

type Props = { children: ReactNode; onRequest: (credit: number, summary: string, modality: string) => void };
const section = "mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 md:py-24";
const heading = "text-3xl md:text-4xl font-heading font-semibold tracking-tight leading-tight text-[#092b4c]";
const textLink = "inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#003366] underline underline-offset-4 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#003366]";
const modalityIcons = [Home, Truck, CarFront, Wrench];
const steps = [
  { title: "Defina seu objetivo", text: "O que você quer realizar, qual crédito faz sentido e quanto pode reservar por mês? Considere também quando precisa do bem ou serviço." },
  { title: "Conheça os planos e custos", text: "Compare administração, reserva, seguros, reajustes, prazos e regras de lance. Leia o contrato e confirme a autorização da administradora no Banco Central." },
  { title: "Participe do grupo", text: "Após a adesão, acompanhe as assembleias e mantenha as parcelas em dia. A contemplação acontece por sorteio ou lance, sem data garantida." },
  { title: "Use o crédito conforme as regras", text: "Após a contemplação, siga as análises cadastrais, apresente documentos e garantias e aguarde a liberação pela administradora para usar o crédito na categoria contratada." },
];

export default function ConsorcioHubContent({ children, onRequest }: Props) {
  useEffect(() => {
    document.querySelectorAll('script[data-consorcio-service="1"], script[data-faqpage="1"]')
      .forEach(script => script.remove());
  }, []);
  return <div className="min-h-screen flex flex-col bg-white text-slate-900">
    <PageMeta title={copy.title} description={copy.description} canonicalPath="/consorcio" absoluteTitle skipBreadcrumb />
    <Helmet><script type="application/ld+json">{JSON.stringify(consorcioSchema)}</script></Helmet>
    <BreadcrumbSchema items={[{ name: "Início", url: `${EMPRESA.dominioCanonico}/` }, { name: "Consórcio", url: `${EMPRESA.dominioCanonico}/consorcio` }]} />
    <Header />
    <main id="main-content">
      <section aria-labelledby="consorcio-title" className="bg-[#071f38] text-white">
        <div className="mx-auto max-w-6xl px-5 pt-7 pb-14 sm:px-8 md:pb-20">
          <nav aria-label="Breadcrumb" className="mb-12 text-sm text-slate-300"><Link to="/" className="inline-flex min-h-11 items-center underline underline-offset-4">Início</Link><span aria-hidden="true" className="mx-3">/</span><span aria-current="page">Consórcio</span></nav>
          <div className="grid items-center gap-12 lg:grid-cols-[1.35fr_0.85fr] lg:gap-16">
            <div>
              <p className="mb-6 inline-flex rounded-full border border-blue-300/30 px-4 py-2 text-xs font-semibold tracking-widest text-blue-100">{copy.badge}</p>
              <h1 id="consorcio-title" className="max-w-2xl text-4xl font-heading font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">{copy.h1}</h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 md:text-lg">{copy.intro}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild className="h-auto min-h-12 whitespace-normal bg-white px-6 py-3 text-[#003366] hover:bg-blue-50"><a href="#simulacao" onClick={() => trackCotacaoClick("consorcio_hero")}>Solicitar simulação<ArrowRight aria-hidden="true" className="ml-2 h-4 w-4 shrink-0" /></a></Button>
                <Button asChild variant="outline" className="h-auto min-h-12 whitespace-normal border-white/30 bg-transparent px-6 py-3 text-white hover:bg-white/10 hover:text-white"><a href={consorcioWhatsapp} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick("consorcio_hero")}><MessageCircle aria-hidden="true" className="mr-2 h-4 w-4 shrink-0" />Conversar com a Patro</a></Button>
              </div>
              <p className="mt-5 max-w-xl text-xs leading-relaxed text-slate-300">Sem juros de financiamento. Existem taxa de administração e outros custos previstos em contrato. A contemplação não tem data garantida.</p>
            </div>
            <aside aria-label="Orientação para começar" className="rounded-3xl border border-white/15 bg-[#0e304f] p-7 sm:p-9">
              <span className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10"><Home aria-hidden="true" className="h-6 w-6 text-blue-100" /></span>
              <h2 className="text-2xl font-semibold tracking-tight text-white">Antes do plano, o seu objetivo.</h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-300">Uma boa escolha considera seu momento, o custo completo e o tempo que você pode esperar.</p>
              <ul className="mt-6 space-y-5">{["Escolha o que deseja conquistar", "Entenda as condições do grupo", "Decida com orientação da Patro"].map(text => <li key={text} className="flex items-start gap-3 text-sm"><CheckCircle2 aria-hidden="true" className="h-5 w-5 shrink-0 text-blue-200" />{text}</li>)}</ul>
              <a href="#comparar" className="mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-white underline underline-offset-4">Explorar o simulador educativo<ArrowRight aria-hidden="true" className="h-4 w-4" /></a>
            </aside>
          </div>
          <nav aria-label="Nesta página" className="mt-12 flex flex-wrap gap-x-7 gap-y-1 border-t border-white/15 pt-5 text-sm text-slate-300">
            {[["#modalidades", "Modalidades"], ["#comparar", "Simulador"], ["#como-funciona", "Como funciona"], ["#comparativo", "Quando faz sentido"], ["#duvidas", "Dúvidas"]].map(([href, label]) => <a key={href} href={href} className="inline-flex min-h-11 items-center rounded-sm underline-offset-4 hover:text-white hover:underline">{label}</a>)}
          </nav>
        </div>
      </section>
      <section id="modalidades" aria-labelledby="modalidades-title" className={`${section} scroll-mt-24`}>
        <div className="grid gap-5 md:grid-cols-2 md:items-end"><h2 id="modalidades-title" className={heading}>Um caminho para cada plano.</h2><p className="text-slate-600 leading-relaxed">{copy.modalitiesIntro}</p></div>
        <div className="mt-10 grid gap-5 md:grid-cols-2">{consorcioModalities.map((item, index) => {
          const Icon = modalityIcons[index];
          return <article key={item.href} className="flex min-w-0 flex-col rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
            <Icon aria-hidden="true" className="mb-6 h-7 w-7 text-[#003366]" />
            <h3 className="text-xl font-semibold tracking-tight text-[#092b4c]">{item.title}</h3>
            <p className="mt-3 text-sm font-medium text-[#003366]">{item.range}</p>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">{item.use}</p>
            <details className="mt-3 text-sm text-slate-600"><summary className="min-h-11 cursor-pointer py-3 font-medium text-[#003366]">Condições e possibilidades de uso</summary><p className="pb-4 leading-relaxed">{item.benefit}</p></details>
            <Link to={item.href} className={`${textLink} mt-auto pt-4`}>{item.action}<ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" /></Link>
          </article>;
        })}</div>
        <p className="mt-5 text-xs leading-relaxed text-slate-500">Para empresas, o enquadramento depende do bem ou serviço e das regras da administradora. Caminhões e máquinas agrícolas estão reunidos na modalidade de pesados e agro.</p>
      </section>
      <ConsorcioSimulator onRequest={onRequest} />
      <section id="como-funciona" aria-labelledby="como-title" className={`${section} scroll-mt-24`}>
        <h2 id="como-title" className={heading}>Como funciona, passo a passo.</h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-slate-600">Consórcio é uma forma de compra em grupo. Entenda o percurso antes de decidir se ele combina com seu planejamento.</p>
        <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">{steps.map((step, index) => <li key={step.title} className="border-t border-slate-200 pt-6"><span className="text-sm font-semibold text-[#003366]">Etapa {index + 1}</span><h3 className="mt-4 text-lg font-semibold text-[#092b4c]">{step.title}</h3><p className="mt-3 text-sm leading-relaxed text-slate-600">{step.text}</p></li>)}</ol>
      </section>
      <section id="comparativo" aria-labelledby="comparativo-title" className="scroll-mt-24 bg-slate-50">
        <div className={section}>
          <h2 id="comparativo-title" className={heading}>Quando o consórcio faz sentido?</h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-slate-600">{copy.comparisonIntro}</p>
          <div className="mt-9 grid gap-5 md:grid-cols-2">
            <article className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8"><CheckCircle2 aria-hidden="true" className="h-6 w-6 text-[#003366]" /><h3 className="mt-4 text-xl font-semibold text-[#092b4c]">Para quem pode planejar e esperar</h3><p className="mt-3 text-sm leading-relaxed text-slate-600">Pode ser adequado para construir patrimônio, programar a troca de veículo ou renovar equipamentos sem depender de uma data específica. As parcelas, taxas e possíveis reajustes precisam caber no orçamento ao longo de todo o plano.</p></article>
            <article className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8"><Clock3 aria-hidden="true" className="h-6 w-6 text-[#003366]" /><h3 className="mt-4 text-xl font-semibold text-[#092b4c]">Se existe urgência, compare alternativas</h3><p className="mt-3 text-sm leading-relaxed text-slate-600">Se você precisa do bem agora ou em uma data definida, avalie compra à vista, financiamento e outras linhas de crédito. Compare o custo total, o custo da espera e sua reserva financeira. Um lance não garante contemplação.</p></article>
          </div>
          <details className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 md:p-7"><summary className="min-h-11 cursor-pointer py-2 font-semibold text-[#003366]">{copy.comparisonTitle}</summary><div role="region" aria-label="Tabela de comparação" tabIndex={0} className="mt-5 overflow-x-auto rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#003366]"><table className="w-full min-w-[620px] text-left text-sm"><caption className="mb-4 text-left text-slate-600">Critérios de decisão entre consórcio planejado e financiamento bancário</caption><thead><tr className="border-b border-slate-200 text-[#092b4c]"><th scope="col" className="p-4">Critério de decisão</th><th scope="col" className="p-4">Consórcio planejado</th><th scope="col" className="p-4">Financiamento bancário</th></tr></thead><tbody>{consorcioComparison.map(row => <tr key={row.criterion} className="border-b border-slate-100 align-top"><th scope="row" className="p-4 font-medium">{row.criterion}</th><td className="p-4 leading-relaxed text-slate-600">{row.consortium}</td><td className="p-4 leading-relaxed text-slate-600">{row.financing}</td></tr>)}</tbody></table></div></details>
        </div>
      </section>
      <section aria-labelledby="patro-title" className={section}>
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div><ShieldCheck aria-hidden="true" className="mb-6 h-8 w-8 text-[#003366]" /><h2 id="patro-title" className={heading}>Por que contar com a Patro?</h2><p className="mt-5 leading-relaxed text-slate-600">Atendimento consultivo para entender seu objetivo, explicar custos e regras e acompanhar as etapas até o uso da carta, respeitando as análises da administradora.</p><ul className="mt-6 space-y-4">{copy.highlights.map(text => <li key={text} className="flex gap-3 text-sm leading-relaxed text-slate-600"><CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-[#003366]" />{text}</li>)}</ul><Link to="/sobre" className={`${textLink} mt-6`}>Conheça a Patro<ArrowRight aria-hidden="true" className="h-4 w-4" /></Link></div>
          <div className="divide-y divide-slate-200 border-y border-slate-200">{consorcioConsulting.map(item => <details key={item.title} className="py-3"><summary className="min-h-12 cursor-pointer py-3 font-semibold text-[#092b4c]">{item.title}</summary><p className="pb-5 text-sm leading-relaxed text-slate-600">{item.text}</p></details>)}<p className="py-5 text-sm leading-relaxed text-slate-600">Proteja o bem adquirido: <Link to="/seguro-auto" className="underline underline-offset-4">Seguro Auto</Link> ou <Link to="/seguro-residencial" className="underline underline-offset-4">Seguro Residencial</Link>, conforme suas necessidades.</p></div>
        </div>
        <aside className="mt-12 rounded-2xl bg-slate-50 p-6 md:p-8"><h3 className="text-lg font-semibold text-[#092b4c]">{copy.safetyTitle}</h3><p className="mt-4 text-sm leading-relaxed text-slate-600">{copy.safety}</p><p className="mt-3 text-xs leading-relaxed text-slate-600">{copy.safetyNote}</p><div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-xs leading-relaxed text-slate-600"><span>CNPJ: {EMPRESA.cnpj}</span><span>SUSEP: {EMPRESA.susep}</span><a href={EMPRESA.redesSociais.google} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">Avaliações no Google: {EMPRESA.metricas.googleRating.toFixed(1)}/5</a></div><p className="mt-4 text-sm text-slate-600">Atendimento digital em todo o Brasil e sede em Guarulhos. <Link to="/consorcio-guarulhos" className="underline underline-offset-4">Conheça o atendimento local</Link>.</p></aside>
      </section>
      <section id="duvidas" aria-labelledby="duvidas-title" className="scroll-mt-24 bg-slate-50">
        <div className={section}>
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16"><div><h2 id="duvidas-title" className={heading}>Decida com informação.</h2><p className="mt-4 leading-relaxed text-slate-600">Respostas para as dúvidas mais frequentes. Para condições de um grupo específico, converse com a Patro.</p><Link to="/blog" className={`${textLink} mt-5`}>Explorar conteúdos no blog<ArrowRight aria-hidden="true" className="h-4 w-4" /></Link></div><div className="divide-y divide-slate-200 border-y border-slate-200">{consorcioFaqs.map((faq, index) => <details key={faq.q} id={`duvida-${index + 1}`} className="scroll-mt-24 py-2"><summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-5 py-4 font-medium text-[#092b4c]">{faq.q}<Plus aria-hidden="true" className="h-4 w-4 shrink-0" /></summary><p className="pb-5 text-sm leading-relaxed text-slate-600">{faq.a}</p></details>)}</div></div>
          <aside aria-label="Fontes oficiais sobre consórcio" className="mt-10 rounded-2xl border border-slate-200 bg-white p-6"><h3 className="text-lg font-semibold text-[#092b4c]">Confira as regras nas fontes oficiais</h3><p className="mt-3 text-sm leading-relaxed text-slate-600">A Patro orienta sua consulta; a administradora conduz o grupo e decide sobre a liberação do crédito. O Banco Central fiscaliza as administradoras, mas não garante a operação nem a contemplação. Confirme as regras vigentes antes de contratar.</p><ul className="mt-4 space-y-2">{consorcioOfficialSources.map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer" className={textLink}>{source.label}<span className="sr-only"> (abre em nova aba)</span></a></li>)}</ul></aside>
          <div className="mt-12"><EbookConsorcioBanner /></div>
        </div>
      </section>
      <section id="simulacao" aria-labelledby="simulacao-title" className={`${section} scroll-mt-24`}>
        <div className="grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16"><div><h2 id="simulacao-title" className={heading}>Seu objetivo. Uma conversa para começar.</h2><p className="mt-5 leading-relaxed text-slate-600">Informe o que você está planejando para receber orientação da Patro e consultar os planos disponíveis. Aqui você solicita uma simulação comercial; o comparador acima é apenas educativo.</p><p className="mt-4 text-sm leading-relaxed text-slate-600">Não pedimos CPF, documentos ou dados financeiros sensíveis neste primeiro contato. A proposta, quando apresentada, terá condições e custos próprios, sujeitos à disponibilidade e às regras da administradora.</p><p className="mt-5 text-sm text-slate-600">Prefere conversar agora? <a href={consorcioWhatsapp} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick("consorcio_form_alternativa")} className="font-medium text-[#003366] underline underline-offset-4">Fale com a Patro pelo WhatsApp</a>.</p></div><div className="min-w-0">{children}</div></div>
      </section>
      <section aria-labelledby="final-title" className="bg-[#071f38] text-white"><div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-20"><h2 id="final-title" className="max-w-2xl text-3xl font-heading font-semibold tracking-tight text-white md:text-4xl">Vamos planejar sua próxima conquista?</h2><p className="mt-5 max-w-xl leading-relaxed text-slate-300">Conte com orientação para comparar possibilidades e escolher com clareza, sem pressa para decidir.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><Button asChild className="min-h-12 bg-white px-6 text-[#003366] hover:bg-blue-50"><a href="#simulacao" onClick={() => trackCotacaoClick("consorcio_final")}>Solicitar simulação<ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" /></a></Button><Button asChild variant="outline" className="min-h-12 border-white/30 bg-transparent px-6 text-white hover:bg-white/10 hover:text-white"><a href={consorcioWhatsapp} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick("consorcio_cta_final")}><MessageCircle aria-hidden="true" className="mr-2 h-4 w-4" />Falar pelo WhatsApp</a></Button></div></div></section>
      <aside className="mx-auto max-w-6xl px-5 py-8 sm:px-8"><p className="text-xs leading-relaxed text-slate-600">{copy.warning}</p></aside>
    </main><Footer />
  </div>;
}
