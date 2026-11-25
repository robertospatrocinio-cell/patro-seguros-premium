import { Link } from "react-router-dom";
import { eoAeroportoArticle as meta, formatDate } from "../lib/blogData";
import { eoIntro, eoSections, eoArticleFaqs, eoChecks, eoComparison, eoTimeline } from "../data/blogEoAeroporto";
import { COMPANY } from "../config/company";
import { EO_ARTICLE, trackEo } from "../lib/eoEngenhariaContact";
import "../styles/eo-article.css";

const service = "/seguro-eo-engenharia-aeroportos";
const sources = [
  ["SUSEP — consulta de produtos", "https://www.gov.br/susep/pt-br", "Peça o número de processo SUSEP e a versão das condições gerais da proposta. Na consulta pública de produtos, localize o texto correspondente. Leia também as condições especiais, particulares e endossos efetivamente oferecidos."],
  ["GRU Airport — portal oficial", "https://www.gru.com.br/", "Use os canais oficiais para identificar a área responsável pelo seu processo. O documento decisivo para a exigência comercial é a minuta com seus anexos, não uma regra presumida a partir do nome do aeroporto."],
  ["Lei nº 15.040/2024 — normas de seguro privado", "https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2024/lei/l15040.htm", "Consulte o texto legal sobre o contrato de seguro, inclusive as disposições sobre responsabilidade civil. A lei não substitui a leitura da apólice proposta."],
  ["Lei nº 6.496/1977 — Anotação de Responsabilidade Técnica", "https://www.planalto.gov.br/ccivil_03/leis/l6496.htm", "A ART identifica responsabilidade técnica no âmbito profissional. Não é uma apólice e não comprova que a seguradora aceitou aquela atividade."],
];

function Cta({children}: {children: string}) {
  return <Link to={service} onClick={() => trackEo("article_service_click", undefined, EO_ARTICLE)} className="my-6 block rounded-r-lg border-l-4 border-primary bg-muted px-5 py-4 font-semibold text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">{children}</Link>;
}
function Comparison() {
  return <div role="region" aria-label="Comparativo de seguros, com rolagem horizontal" tabIndex={0} className="my-6 overflow-x-auto rounded-lg border"><table className="w-full min-w-[38rem] text-left text-sm leading-relaxed"><caption className="bg-muted p-4 text-left font-semibold">Seis seguros, seis perguntas diferentes sobre o risco</caption><thead><tr>{["Modalidade", "O que se analisa", "Exemplo hipotético"].map(x => <th key={x} scope="col" className="p-3">{x}</th>)}</tr></thead><tbody>{eoComparison.map(([name, risk, example]) => <tr key={name} className="border-t"><th scope="row" className="p-3 align-top">{name}</th><td className="p-3 align-top">{risk}</td><td className="p-3 align-top">{example}</td></tr>)}</tbody></table></div>;
}
function Timeline() {
  return <div className="my-6 rounded-xl bg-muted px-6 py-5"><p className="mb-4 font-semibold">Linha do tempo · datas fictícias</p><ol className="ml-2 border-l-2 border-primary/40">{eoTimeline.map(([date, label, description]) => <li key={date} className="relative pb-4 pl-6 last:pb-0 before:absolute before:-left-[6px] before:top-1.5 before:h-2.5 before:w-2.5 before:rounded-full before:bg-primary"><span className="text-xs font-bold tabular-nums text-primary">{date}</span><p className="font-semibold">{label}</p><p className="mt-1 text-sm leading-relaxed">{description}</p></li>)}</ol></div>;
}
function Checklist() {
  return <div id="eo-folha" className="my-6 rounded-lg border p-5"><p className="mb-4 font-bold">Patro Seguros · Checklist E&O Engenharia para Aeroportos</p><ul className="divide-y">{eoChecks.map(item => <li key={item}><label className="flex min-h-11 cursor-pointer items-start gap-3 py-3"><input type="checkbox" className="mt-1 h-4 w-4 shrink-0 accent-primary"/>{item}</label></li>)}</ul><button type="button" onClick={() => window.print()} className="mt-4 min-h-11 rounded-md bg-primary px-5 font-semibold text-primary-foreground print:hidden">Imprimir checklist</button></div>;
}
export default function EoAirportArticle() {
  const links = [...eoSections, {id:"fontes", title:"Fontes e documentos para conferência"}, {id:"duvidas",title:"Perguntas frequentes"}];
  return <article id="eo-artigo" className="mx-auto max-w-4xl px-5 pb-16 pt-8 sm:px-8">
    <header><Link to="/blog" className="text-sm font-semibold text-primary underline">Blog Patro Seguros</Link><p className="mt-8 text-xs font-bold uppercase tracking-widest text-muted-foreground">Guia de contratos · Responsabilidade civil</p><h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-5xl">{meta.title}</h1><p className="mt-6 text-sm leading-7 text-muted-foreground">Por <Link to="/sobre" className="font-semibold text-primary underline">Patro Seguros</Link> · {meta.readTime} min de leitura<br/>Publicado em <time dateTime={meta.date}>{formatDate(meta.date)}</time> · Atualizado em <time dateTime={meta.updatedAt}>{formatDate(meta.updatedAt || meta.date)}</time></p>
    <figure className="my-7"><img src="/images/engenharia-aeroportuaria-projetos.jpg" alt="Profissionais de engenharia revisam uma planta junto à janela de um terminal aeroportuário." width="1536" height="864" fetchPriority="high" decoding="async" className="aspect-video w-full rounded-xl object-cover"/><figcaption className="mt-2 text-sm text-muted-foreground">Engenharia em ambiente aeroportuário · imagem ilustrativa.</figcaption></figure></header>
    <div className="mx-auto max-w-[72ch]">{eoIntro.map(p => <p key={p} className="mb-4 leading-7">{p}</p>)}<Cta>Recebeu uma exigência de Seguro E&O Engenharia? Envie a cláusula contratual para a Patro.</Cta>
    <nav className="my-8 rounded-xl border p-5" aria-label="Índice do artigo"><h2 className="mb-3 text-lg font-semibold">Neste guia</h2><ol className="grid list-decimal gap-x-8 pl-5 text-sm sm:grid-cols-2">{links.map(s => <li key={s.id}><a className="block py-2 text-primary underline underline-offset-2" href={`#${s.id}`}>{s.title}</a></li>)}</ol></nav>
    {eoSections.map(s => <section key={s.id} id={s.id} className="scroll-mt-24 pb-2 pt-7"><h2 className="mb-4 text-2xl font-semibold tracking-tight">{s.title}</h2>{s.paragraphs.map((p,i) => <p key={p} data-speakable={s.id === "definicao" && !i ? "answer" : undefined} className={p.startsWith("Exemplo fictício") ? "my-5 border-l-4 border-primary bg-muted p-4 leading-7" : "mb-4 leading-7"}>{p}</p>)}{s.id === "comparativo" && <Comparison/>}{s.id === "retroatividade" && <><Timeline/><Cta>Solicite uma cotação personalizada para sua empresa.</Cta></>}{s.id === "checklist" && <Checklist/>}</section>)}
    <section id="fontes" className="scroll-mt-24 pt-8"><h2 className="text-2xl font-semibold">Fontes e documentos para conferência</h2><ul>{sources.map(([label,url,note]) => <li key={url} className="mt-4 leading-7"><a href={url} className="font-semibold text-primary underline">{label}</a><p>{note}</p></li>)}</ul><p className="mt-5 text-sm text-muted-foreground">Conteúdo editorial institucional. Não há revisão técnica individual assinada nesta edição.</p></section>
    <section id="duvidas" data-speakable="faq" className="scroll-mt-24 pt-9"><h2 className="mb-3 text-2xl font-semibold">Perguntas frequentes sobre E&O em aeroportos</h2>{eoArticleFaqs.map(f => <div key={f.q} className="border-b py-4"><h3 className="font-semibold">{f.q}</h3><p className="mt-2 leading-7">{f.a}</p></div>)}</section><Cta>Conheça nosso Seguro E&O Engenharia para Aeroportos.</Cta>
    <address className="mt-5 border-t pt-4 text-sm not-italic leading-7"><strong>{COMPANY.nomeFantasia}</strong> · {COMPANY.enderecoCompleto}<br/>Telefone: <a className="font-semibold text-primary underline" href={`tel:${COMPANY.telefoneE164}`}>{COMPANY.telefone}</a> · <a className="font-semibold text-primary underline" href="https://wa.me/551151997500" onClick={() => trackEo("whatsapp_click", undefined, EO_ARTICLE)}>WhatsApp da Patro: +55 11 5199-7500</a></address></div>
  </article>;
}
