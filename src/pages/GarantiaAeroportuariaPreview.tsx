import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PageMeta from "@/components/PageMeta";
import { COMPANY, WHATSAPP_URL_BASE } from "@/config/company";
import {
  GARANTIA_AEROPORTUARIA_PATH,
  garantiaAeroportuariaComparison as comparison,
  garantiaAeroportuariaDescription as description,
  garantiaAeroportuariaFaqs as faqs,
  garantiaAeroportuariaReferences as references,
  garantiaAeroportuariaSections as sections,
  garantiaAeroportuariaSummary as summary,
  garantiaAeroportuariaTitle as title,
} from "@/data/garantiaAeroportuaria";

const image = "/images/seguro-garantia-contratos-aeroportuarios.jpg";
const imageAlt = "Pasta com documentos contratuais e caneta em uma mesa com vista para um terminal aeroportuário ilustrativo";
const url = `${COMPANY.dominioCanonico}${GARANTIA_AEROPORTUARIA_PATH}`;
const whatsapp = `${WHATSAPP_URL_BASE}?text=${encodeURIComponent("Olá, Patro! Minha empresa recebeu uma exigência de garantia contratual e gostaria de orientação.")}`;
const chapters = [
  ...sections.map(({ id, title }) => ({ id, title })),
  { id: "comparacao", title: "Seguro Garantia, caução e fiança bancária" },
  { id: "responsabilidade-civil", title: "O que muda em relação a E&O e RC Geral?" },
  { id: "exemplo", title: "Exemplo hipotético em um terminal" },
  { id: "checklist", title: "Checklist antes de solicitar a apólice" },
  { id: "faq", title: "Perguntas frequentes" },
  { id: "referencias", title: "Referências e documentos para consulta" },
];
const linkStyle = "font-semibold text-primary underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4";
const headingStyle = "mb-4 text-2xl font-bold tracking-tight sm:text-3xl";
const schema = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "BlogPosting", "@id": `${url}#artigo`, mainEntityOfPage: url, headline: title, description, image: `${COMPANY.dominioCanonico}${image}`, inLanguage: "pt-BR", author: { "@type": "Organization", name: COMPANY.nomeFantasia, url: COMPANY.dominioCanonico }, publisher: { "@id": `${COMPANY.dominioCanonico}/#organization` }, citation: references.map(({ url }) => url) },
    { "@type": "FAQPage", "@id": `${url}#faq`, inLanguage: "pt-BR", mainEntity: faqs.map(({ question, answer }) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
  ],
};

export default function GarantiaAeroportuariaPreview() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <PageMeta title="Seguro Garantia em contratos aeroportuários" description={description} noindex skipBreadcrumb ogType="article" ogImage={image} ogImageAlt={imageAlt} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <Header />
      <main id="main-content" tabIndex={-1} className="break-words">
        <article aria-labelledby="titulo-garantia">
          <div className="border-b bg-secondary">
            <div className="mx-auto max-w-6xl px-4 py-4 text-sm sm:px-6">
              <strong>Prévia editorial.</strong> Publicação condicionada à revisão técnica.
            </div>
          </div>
          <header className="mx-auto grid max-w-6xl items-center gap-6 px-4 py-8 sm:px-6 md:grid-cols-2 md:gap-10 md:py-12">
            <div>
              <nav aria-label="Navegação do artigo" className="mb-4 flex flex-wrap items-center gap-x-3 text-sm">
                <Link className={`${linkStyle} flex min-h-11 items-center`} to="/blog">Blog da Patro</Link><span aria-hidden="true">/</span>
                <Link className={`${linkStyle} flex min-h-11 items-center`} to="/seguros-aeroportuarios">Seguros aeroportuários</Link>
              </nav>
              <h1 id="titulo-garantia" className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">{title}</h1>
              <p className="mt-4 text-sm text-muted-foreground">Por {COMPANY.nomeFantasia}</p>
              <section aria-labelledby="resumo-garantia" className="mt-5 max-w-prose rounded-r-lg border-l-4 border-primary bg-secondary p-4">
                <h2 id="resumo-garantia" className="mb-2 text-lg font-bold">Em resumo</h2>
                <p className="leading-relaxed">{summary}</p>
              </section>
              <a href="#orientacao-garantia" className={`${linkStyle} mt-3 inline-flex min-h-11 items-center`}>Já recebeu a cláusula? Saiba como pedir orientação</a>
            </div>
            <figure>
              <img src={image} alt={imageAlt} width={1536} height={1024} fetchPriority="high" decoding="async" className="aspect-[3/2] w-full rounded-xl object-cover" />
              <figcaption className="mt-2 text-sm text-muted-foreground">Imagem ilustrativa, sem representação de um aeroporto específico.</figcaption>
            </figure>
          </header>
          <div className="mx-auto grid max-w-6xl gap-8 px-4 pb-14 sm:px-6 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-12">
            <nav aria-label="Índice do artigo" className="self-start rounded-lg border bg-card p-4">
              <p className="mb-2 font-bold">Neste artigo</p>
              <ol className="list-decimal space-y-1 pl-5 text-sm">
                {chapters.map(({ id, title }) => <li key={id}><a className={`${linkStyle} flex min-h-11 items-center py-1`} href={`#${id}`}>{title}</a></li>)}
              </ol>
            </nav>
            <div className="min-w-0 space-y-10 text-base leading-relaxed">
              {sections.map((section) => (
                <section key={section.id} id={section.id} tabIndex={-1} aria-labelledby={`${section.id}-titulo`} className="scroll-mt-32">
                  <h2 id={`${section.id}-titulo`} className={headingStyle}>{section.title}</h2>
                  <div className="max-w-prose space-y-3">{section.paragraphs.map((p) => <p key={p}>{p}</p>)}</div>
                  {"items" in section && <dl className="mt-4 max-w-prose space-y-3 border-l pl-4">
                    {section.items.map(({ label, text }) => <div key={label}><dt className="font-semibold">{label}</dt><dd>{text}</dd></div>)}
                  </dl>}
                </section>
              ))}
              <section id="comparacao" tabIndex={-1} aria-labelledby="comparacao-titulo" className="scroll-mt-32">
                <h2 id="comparacao-titulo" className={headingStyle}>Seguro Garantia, caução e fiança bancária</h2>
                <p className="mb-3 max-w-prose">Compare apenas instrumentos aceitos para a sua contratação. Além do custo direto, considere o impacto no caixa ou no crédito, o prazo de emissão e as condições de liberação.</p>
                <p id="tabela-instrucao" className="mb-2 text-sm text-muted-foreground">Em telas estreitas, deslize a tabela ou use as setas do teclado após focá-la.</p>
                <div role="region" aria-label="Tabela comparativa de garantias contratuais" aria-describedby="tabela-instrucao" tabIndex={0} className="overflow-x-auto rounded-lg border focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                  <table className="w-full min-w-[38rem] border-collapse text-left text-sm">
                    <caption className="sr-only">Comparação de instrumentos de garantia contratual</caption>
                    <thead className="bg-secondary"><tr>{["Instrumento", "Como funciona", "Efeito financeiro", "O que conferir"].map((item) => <th key={item} scope="col" className="p-3">{item}</th>)}</tr></thead>
                    <tbody>{comparison.map(({ name, form, impact, check }) => <tr key={name} className="border-t align-top"><th scope="row" className="p-3">{name}</th><td className="p-3">{form}</td><td className="p-3">{impact}</td><td className="p-3">{check}</td></tr>)}</tbody>
                  </table>
                </div>
              </section>
              <section id="responsabilidade-civil" tabIndex={-1} aria-labelledby="responsabilidade-titulo" className="scroll-mt-32">
                <h2 id="responsabilidade-titulo" className={headingStyle}>O que muda em relação a E&amp;O e RC Geral?</h2>
                <div className="max-w-prose space-y-3">
                  <p><strong>Seguro Garantia não substitui seguros de responsabilidade civil.</strong> A garantia trata do descumprimento de uma obrigação específica perante o credor. Os seguros de RC tratam da responsabilidade do segurado por danos ou prejuízos cobertos, nos termos das respectivas apólices.</p>
                  <p>Uma reclamação por erro de cálculo em um projeto pode demandar análise de <Link className={linkStyle} to="/seguro-eo-engenharia-aeroportos">E&amp;O Engenharia em aeroportos</Link>. Já um dano material a terceiro durante a instalação pode demandar análise de <Link className={linkStyle} to="/seguro-rc">RC Geral</Link> ou de uma cobertura específica, conforme a atividade, o local, as exclusões e as condições aceitas. Nenhuma dessas apólices deve ser presumida como cobertura automática para a operação em área aeroportuária.</p>
                  <p>Se o contrato pedir garantia de execução e responsabilidade civil, trate os requisitos separadamente. O <Link className={linkStyle} to="/seguros-aeroportuarios">hub de seguros aeroportuários</Link> ajuda a distinguir as modalidades que valem análise.</p>
                </div>
              </section>
              <section id="exemplo" tabIndex={-1} aria-labelledby="exemplo-titulo" className="scroll-mt-32 rounded-lg bg-secondary p-5">
                <h2 id="exemplo-titulo" className={headingStyle}>Exemplo hipotético em um terminal</h2>
                <div className="max-w-prose space-y-3">
                  <p>Uma instaladora é contratada para modernizar a climatização de um terminal. A minuta hipotética pede garantia de execução e prevê adiantamento para comprar materiais. A empresa deve verificar se também existe uma exigência específica de garantia de adiantamento, como o saldo será amortizado e até que marco cada obrigação deve ficar garantida.</p>
                  <p>Se a empresa abandonar a obra, a contratante deve consultar o procedimento da garantia de execução. Se uma peça cair e danificar um bem de terceiro durante a instalação, o evento deve ser analisado separadamente sob o seguro de responsabilidade civil aplicável. Os exemplos ilustram finalidades distintas e não antecipam o resultado de um sinistro.</p>
                </div>
              </section>
              <section id="checklist" tabIndex={-1} aria-labelledby="checklist-titulo" className="scroll-mt-32">
                <h2 id="checklist-titulo" className={headingStyle}>Checklist antes de solicitar a apólice</h2>
                <ol className="max-w-prose list-decimal space-y-2 pl-6">
                  <li>Reúna a cláusula vigente, os anexos e os aditivos.</li>
                  <li>Identifique o segurado, o tomador, a obrigação e a modalidade exigida.</li>
                  <li>Confirme o limite e a base de cálculo, as datas e os marcos da obrigação.</li>
                  <li>Verifique o texto exigido, as condições para acionar a garantia e a data-limite de entrega.</li>
                  <li>Compare prêmio, contragarantias, efeitos no caixa e condições de liberação com as alternativas aceitas.</li>
                  <li>Confira a apólice emitida com a documentação da contratação e siga o procedimento de aceite.</li>
                </ol>
              </section>
              <aside id="orientacao-garantia" tabIndex={-1} aria-labelledby="orientacao-titulo" className="scroll-mt-32 rounded-xl border bg-card p-5 sm:p-7">
                <h2 id="orientacao-titulo" className="text-xl font-bold">Sua empresa recebeu uma exigência de garantia contratual? Envie os requisitos para a Patro Seguros.</h2>
                <p className="mt-2 max-w-prose">No primeiro contato, informe a modalidade solicitada e o prazo de entrega. Se houver informações confidenciais, solicite um canal apropriado antes de compartilhar documentos.</p>
                <a href={whatsapp} className="mt-4 inline-flex min-h-12 items-center justify-center rounded-md bg-cta px-4 py-2 text-center font-semibold text-cta-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">WhatsApp oficial: {COMPANY.whatsappFormatado}</a>
              </aside>
              <section id="faq" tabIndex={-1} aria-labelledby="faq-titulo" className="scroll-mt-32">
                <h2 id="faq-titulo" className={headingStyle}>Perguntas frequentes</h2>
                <div className="divide-y rounded-lg border px-4">
                  {faqs.map(({ question, answer }) => <details key={question}><summary className="min-h-11 cursor-pointer py-3 font-semibold focus-visible:outline focus-visible:outline-2">{question}</summary><p className="max-w-prose pb-4">{answer}</p></details>)}
                </div>
              </section>
              <section id="referencias" tabIndex={-1} aria-labelledby="referencias-titulo" className="scroll-mt-32">
                <h2 id="referencias-titulo" className={headingStyle}>Referências e documentos para consulta</h2>
                <ul className="max-w-prose space-y-3">
                  {references.map(({ label, url, detail }) => <li key={url}><a href={url} className={linkStyle}>{label}</a><p>{detail}</p></li>)}
                </ul>
                <p className="mt-4 max-w-prose text-sm text-muted-foreground">Para uma análise específica, consulte a documentação vigente da contratação e as condições gerais, especiais e particulares, a proposta e a minuta da seguradora. Este artigo é informativo, não substitui esses documentos nem confirma cobertura ou aceitação.</p>
                <Link to="/seguro-garantia" className={`${linkStyle} mt-3 inline-flex min-h-11 items-center`}>Conheça a orientação da Patro sobre Seguro Garantia</Link>
              </section>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
