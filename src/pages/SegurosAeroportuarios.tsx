import { useEffect, useState } from "react";
import AirportTriage, { type AirportBrief } from "@/components/AirportTriage";
import { COMPANY } from "@/config/company";
import { Link } from "react-router-dom";
import { Check, MapPin, FileText } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import PageMeta from "@/components/PageMeta";
import ProductQuoteForm from "@/components/ProductQuoteForm";
import { Button } from "@/components/ui/button";
import { hubFaq, hubMessage, hubMeta, hubOrigin, hubPath, hubReadings, hubSchema, segments, solutions } from "@/data/aeroportosHub";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { clearWhatsAppOverride, setWhatsAppOverride } from "@/lib/whatsappOverride";
import { trackWhatsAppClick } from "@/lib/tracking";

const wa = buildWhatsAppLink({ origem: hubOrigin, mensagem: hubMessage });
const container = "mx-auto max-w-7xl px-5 sm:px-8";
const section = `${container} py-12 sm:py-16`;
const heading = "max-w-3xl text-balance text-2xl font-semibold leading-tight tracking-tight sm:text-3xl";
const link = "inline-flex min-h-11 items-center font-semibold text-primary underline underline-offset-4";
const track = () => trackWhatsAppClick(hubOrigin, { origin: hubOrigin, insuranceType: "Seguros aeroportuários" });
const sources = [
  ["Lei", "Uma obrigação legal depende da atividade e de previsão em lei. Peça a referência aplicável ao seu caso."],
  ["Regulamento", "Normas do órgão competente podem estabelecer condições para uma atividade regulada. Confira a quem a regra se dirige."],
  ["Contrato ou edital", "Leia o objeto, a cláusula de seguros e os anexos. A contratante pode especificar modalidade, limites, vigência e documentos."],
  ["Credenciamento", "Confirme com o responsável pelo acesso quais documentos deverão ser apresentados antes da mobilização da equipe."],
];
const process = ["Envie as exigências contratuais.", "A Patro analisa as necessidades apresentadas.", "Buscamos alternativas junto ao mercado segurador.", "Acompanhamos a contratação e emissão."];

export default function SegurosAeroportuarios() {
  const [brief, setBrief] = useState<AirportBrief>();
  useEffect(() => { setWhatsAppOverride({ message: hubMessage, trackingLabel: hubOrigin }); return clearWhatsAppOverride; }, []);
  return <>
    <PageMeta absoluteTitle title={hubMeta.title} description={hubMeta.description} ogImage={hubMeta.ogImage} ogImageAlt={hubMeta.ogImageAlt} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(hubSchema) }} />
    <Header />
    <main id="main-content" tabIndex={-1}>
      <Breadcrumb items={[{ label: "Seguros Empresariais", href: "/seguros-empresariais" }, { label: "Seguros aeroportuários" }]} />
      <section className="bg-[#112c49] text-white" aria-labelledby="hub-titulo">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-[1.1fr_1fr]">
          <div className="min-w-0 self-center px-5 py-9 sm:px-8 lg:py-16"><h1 id="hub-titulo" className="max-w-[30ch] text-xl font-semibold leading-snug text-blue-100">{hubMeta.h1}</h1>
            <p className="mt-5 max-w-[20ch] text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl">Sua empresa vai prestar serviços em um aeroporto?</p>
            <p className="mt-5 max-w-prose leading-relaxed text-slate-100">A Patro Seguros ajuda sua empresa a compreender as exigências contratuais e buscar os seguros adequados para suas atividades no Aeroporto de Guarulhos e em outros aeroportos brasileiros.</p>
            <div className="mt-7 flex flex-wrap items-center gap-3"><Button asChild size="lg"><a href="#cotacao-aeroportuaria">Solicitar cotação</a></Button><a href="#enviar-exigencias" className="inline-flex min-h-11 items-center rounded-md border border-blue-200 px-4 text-sm font-semibold text-white hover:bg-white/10">Enviar exigências do contrato</a><a href={wa} onClick={track} className="inline-flex min-h-11 items-center text-sm font-semibold text-white underline underline-offset-4">Falar com um especialista</a></div>
          </div>
          <img src="/images/engenharia-aeroportuaria-projetos.jpg" alt={hubMeta.ogImageAlt} width={1536} height={1024} fetchPriority="high" decoding="async" className="aspect-[3/2] h-full max-h-80 w-full object-cover lg:max-h-none" />
        </div>
      </section>
      <div className="border-b bg-muted/40"><ul className={`${container} grid gap-4 py-6 sm:grid-cols-2 lg:grid-cols-5`}>{["Atendimento consultivo", "Análise das exigências apresentadas", "Busca de alternativas no mercado segurador", "Atendimento em todo o Brasil", "Corretora localizada em Guarulhos"].map(t => <li key={t} className="flex gap-2 text-sm font-medium"><Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{t}</li>)}</ul></div>
      <section className={`${section} grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-16`}>
        <div><h2 className={heading}>De onde vem a exigência de seguro?</h2><p className="mt-4 max-w-prose leading-relaxed">Antes de pedir uma cotação, identifique quem fez a exigência e qual risco ela pretende tratar. Um erro no projeto de climatização, um dano ao terminal durante a instalação e um acidente com um passageiro são situações diferentes.</p><p className="mt-4 max-w-prose leading-relaxed">O local, o acesso à área operacional e o trabalho de subcontratados mudam a exposição. O nome da modalidade, sozinho, não confirma que o serviço estará coberto.</p></div>
        <dl className="divide-y border-y">{sources.map(([term, desc]) => <div key={term} className="grid gap-1 py-4 sm:grid-cols-[8rem_1fr]"><dt className="font-semibold">{term}</dt><dd className="text-sm leading-relaxed text-muted-foreground">{desc}</dd></div>)}</dl>
      </section>
      <section className="border-y bg-muted/40"><div className={section}><h2 className={heading}>Modalidades que podem entrar na análise do contrato</h2><p className="mt-4 max-w-prose leading-relaxed">Não é uma lista de compras. A Patro consulta a disponibilidade para a atividade e o aeroporto informados. Uma modalidade comercializada para empresas em geral pode não aceitar o risco aeroportuário.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{solutions.map(s => <article key={s.name} className="flex flex-col rounded-xl border border-border bg-card p-6 text-card-foreground"><p className="text-sm text-muted-foreground">{s.scope}</p><h3 className="mt-1 text-xl font-semibold">{s.name}</h3><p className="mb-3 mt-3 flex-1 text-sm leading-relaxed">{s.note}</p>{s.href ? <Link to={s.href} className={link}>Consultar {s.name}</Link> : <a className={link} href="#cotacao-aeroportuaria">Consultar disponibilidade de RC Aeroportuário</a>}</article>)}</div>
      </div></section>
      <section className={section}><h2 className={heading}>Quem presta o serviço e quem assume o risco?</h2><p className="mt-4 max-w-prose">Cada atividade deve ser analisada individualmente. Duas empresas no mesmo terminal podem precisar de soluções diferentes: uma assina o projeto; outra executa e mantém a instalação.</p><div className="mt-8 grid gap-6 md:grid-cols-3">{segments.map(([title, text]) => <div key={title} className="border-l-2 border-primary pl-5"><h3 className="text-lg font-semibold">{title}</h3><p className="mt-2 leading-relaxed text-muted-foreground">{text}</p></div>)}</div></section>
      <section className="bg-[#112c49] text-white"><div className={`${section} grid gap-8 lg:grid-cols-2`}><div><MapPin aria-hidden="true" className="mb-4 text-blue-200"/><h2 className={`${heading} text-white`}>Seguros para empresas que prestam serviços no Aeroporto de Guarulhos</h2></div><div><p className="leading-relaxed text-slate-100">Vai atuar no Aeroporto Internacional de Guarulhos (GRU Airport)? Peça à sua contratante a cláusula vigente e a descrição da área de trabalho. Um serviço no escritório administrativo não tem a mesma exposição de uma intervenção próxima a aeronaves.</p><p className="mt-4 leading-relaxed text-slate-100">A Patro fica na Cidade Maia, em Guarulhos, fora do aeroporto, e atende remotamente em todo o Brasil. A orientação é independente: não há vínculo oficial com a concessionária nem garantia de credenciamento.</p><Link to="/corretora-de-seguros-em-guarulhos" className="mt-4 inline-flex min-h-11 items-center font-semibold text-white underline underline-offset-4">Conheça a corretora em Guarulhos</Link></div></div></section>
      <section id="enviar-exigencias" className={`${section} scroll-mt-24`}><h2 className={heading}>Da cláusula à emissão</h2><ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{process.map((step, i) => <li key={step} className="border-t-2 border-primary pt-3"><span aria-hidden="true" className="block text-sm text-muted-foreground">Etapa {i + 1}</span><span className="mt-1 block font-semibold">{step}</span></li>)}</ol><p className="mt-5 text-sm text-muted-foreground">A contratação depende da análise e aceitação da seguradora. Cotação não é emissão nem início de cobertura.</p>
        <aside className="mt-7 flex flex-col gap-4 rounded-xl border bg-muted/40 p-6 md:flex-row md:items-center md:justify-between"><div className="max-w-prose"><h3 className="flex items-center gap-2 text-lg font-semibold"><FileText aria-hidden="true" className="h-5 w-5 shrink-0"/>Já recebeu a cláusula?</h3><p className="mt-2 text-sm leading-relaxed">Abra a conversa com a Patro e envie apenas o trecho sobre seguros. Oculte valores comerciais desnecessários, assinaturas e dados pessoais. Nenhum arquivo é enviado ao abrir o WhatsApp.</p></div><a href={wa} onClick={track} className={link}>Enviar cláusula pelo WhatsApp</a></aside>
      </section>
      <AirportTriage onReview={setBrief} />
      <section id="cotacao-aeroportuaria" className="scroll-mt-24"><div className={`${section} grid items-start gap-8 lg:grid-cols-2`}>
        <div><h2 className={heading}>Solicite uma cotação para o seu serviço</h2>
          {brief ? <><h3 className="mt-5 font-semibold">Respostas que acompanharão o pedido</h3><dl className="mt-2 max-w-prose divide-y border-y">{Object.entries(brief).map(([label, answer]) => <div key={label} className="py-2 text-sm"><dt className="text-muted-foreground">{label}</dt><dd className="break-words font-medium">{answer}</dd></div>)}</dl></> : <><p className="mt-4 max-w-prose">Informe onde a equipe vai atuar, o que será executado e a data solicitada pela contratante. Se ainda não recebeu o edital, diga o que já sabe sobre o trabalho.</p><a className={link} href="#orientacao-aeroportuaria">Prefiro começar pelas seis perguntas</a></>}
          <p><a className={link} href={wa} onClick={track}>WhatsApp da Patro: {COMPANY.whatsappFormatado}</a></p>
        </div>
        <ProductQuoteForm productName="Seguros aeroportuários" productPath={hubPath} sourceOrigin={hubOrigin} whatsappMessage={hubMessage} fields={[]} reviewedAnswers={brief} heading="Peça contato da equipe" submitLabel={brief ? "Enviar informações para análise da Patro Seguros" : undefined} description={brief ? "Suas respostas já estão incluídas. Informe seu contato e autorize o envio para a equipe." : "Use o campo de mensagem para descrever o serviço, sem incluir informações sigilosas."} />
      </div></section>
      <section className={section}><h2 className={heading}>Leituras para quem administra o contrato</h2><div className="mt-5 max-w-3xl">{hubReadings.map(a => <article key={a.path} className="border-l-2 border-primary pl-5"><p className="text-sm text-muted-foreground">Blog Patro Seguros · {a.topic}</p><h3 className="text-xl"><Link className={link} to={a.path}>{a.title}</Link></h3><p className="text-sm leading-relaxed">{a.summary}</p></article>)}</div></section>
      <section id="perguntas" className="border-t"><div className={`${section} grid items-start gap-8 lg:grid-cols-[1fr_1.5fr]`}><div><h2 className={heading}>Perguntas sobre seguros para contratos aeroportuários</h2><p className="mt-4 max-w-prose text-sm leading-relaxed">Para conferir a habilitação da corretora, veja <Link className="text-primary underline" to="/verificar-susep">como consultar o registro na SUSEP</Link>. Para normas da aviação civil, consulte o <a className="text-primary underline" href="https://www.gov.br/anac/pt-br">portal oficial da ANAC</a>. Confirme as condições do seu contrato diretamente com a contratante.</p></div><div className="divide-y border-y">{hubFaq.map(([q, a]) => <details key={q}><summary className="cursor-pointer py-4 font-semibold">{q}</summary><p className="max-w-prose pb-5 leading-relaxed text-muted-foreground">{a}</p></details>)}</div></div></section>
    </main><Footer />
  </>;
}
