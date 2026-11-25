import { type ReactNode } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import { COMPANY, WHATSAPP_URL_BASE } from "@/config/company";
import { GUIA_AEROPORTUARIO_PATH, guiaAeroportuarioTitle } from "@/data/guiaAeroportuarioRoute";
import { APOLICE_CONTRATOS_PATH } from "@/data/apoliceContratosRoute";
import { GARANTIA_AEROPORTUARIA_PATH } from "@/data/garantiaAeroportuaria";
import { atividades, checklist, exigencias, guiaChapters, guiaDescription, guiaImage, guiaImageAlt, guiaMetaTitle, guiaSummary, modalidades, riscos } from "@/data/guiaAeroportuario";
import { documentos, exemplos, glossario, propostas } from "@/data/guiaAeroportuarioDetalhes";
import { guiaFaqs, guiaReferencias } from "@/data/guiaAeroportuarioFaq";

const canonical = `${COMPANY.dominioCanonico}${GUIA_AEROPORTUARIO_PATH}`;
const whatsapp = `${WHATSAPP_URL_BASE}?text=${encodeURIComponent("Olá, Patro! Gostaria de orientação sobre as exigências de seguros para um serviço aeroportuário.")}`;
const link = "font-semibold text-primary underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4";
const measure = "max-w-prose space-y-3";
const schema = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "BlogPosting", "@id": `${canonical}#artigo`, mainEntityOfPage: canonical, headline: guiaAeroportuarioTitle, description: guiaDescription, image: `${COMPANY.dominioCanonico}${guiaImage}`, inLanguage: "pt-BR", author: { "@type": "Organization", name: COMPANY.nomeFantasia, url: COMPANY.dominioCanonico }, publisher: { "@id": `${COMPANY.dominioCanonico}/#organization` }, citation: guiaReferencias.map(({ url }) => url) },
    { "@type": "FAQPage", "@id": `${canonical}#faq`, inLanguage: "pt-BR", mainEntity: guiaFaqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
  ],
};

function Chapter({ number, children }: { number: number; children: ReactNode }) {
  const [id, title] = guiaChapters[number - 1];
  return (
    <section id={id} tabIndex={-1} aria-labelledby={`${id}-titulo`} className={`scroll-mt-32 border-t pt-7 ${number === 5 ? "print:border-0 print:pt-0" : "print:hidden"}`}>
      <p className="mb-2 text-sm font-semibold text-muted-foreground">Capítulo {number}</p>
      <h2 id={`${id}-titulo`} className="mb-4 text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
      {children}
    </section>
  );
}

function Comparison({ id, title, headers, rows }: { id: string; title: string; headers: string[]; rows: string[][] }) {
  return (
    <div className="mt-4">
      <p id={`${id}-instrucao`} className="mb-2 text-sm text-muted-foreground">Em telas estreitas, deslize a tabela ou use as setas do teclado após focá-la.</p>
      <div role="region" aria-label={title} aria-describedby={`${id}-instrucao`} tabIndex={0} className="overflow-x-auto rounded-lg border focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
        <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
          <caption className="sr-only">{title}</caption>
          <thead className="bg-secondary"><tr>{headers.map((label) => <th key={label} scope="col" className="p-3">{label}</th>)}</tr></thead>
          <tbody>{rows.map(([label, ...cells]) => <tr key={label} className="border-t align-top"><th scope="row" className="w-1/4 p-3">{label}</th>{cells.map((cell) => <td key={cell} className="p-3">{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
    </div>
  );
}

function DefinitionList({ rows }: { rows: string[][] }) {
  return <dl className="mt-4 max-w-prose divide-y border-y">{rows.map(([term, definition]) => <div key={term} className="py-3"><dt className="font-semibold">{term}</dt><dd className="mt-1">{definition}</dd></div>)}</dl>;
}

export default function GuiaAeroportuarioPreview() {
  return (
    <div className="min-h-screen bg-background text-foreground print:min-h-0 print:bg-white print:text-black">
      <PageMeta absoluteTitle title={guiaMetaTitle} description={guiaDescription} canonicalPath={GUIA_AEROPORTUARIO_PATH} noindex skipBreadcrumb ogType="article" ogImage={guiaImage} ogImageAlt={guiaImageAlt} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <style>{`@media print { body:has(#checklist-impresso-aeroportuario) *:not(:has(#checklist-impresso-aeroportuario)):not(#checklist-impresso-aeroportuario):not(#checklist-impresso-aeroportuario *) { display: none !important; } }`}</style>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <article aria-labelledby="titulo-guia-aeroportuario">
          <div className="border-b bg-secondary print:hidden">
            <p className="mx-auto max-w-7xl px-5 py-3 text-sm sm:px-8"><strong>Prévia editorial.</strong> Publicação condicionada à revisão técnica.</p>
          </div>
          <header className="bg-[#112c49] text-white print:hidden">
            <div className="mx-auto grid max-w-7xl lg:grid-cols-[1.1fr_1fr]">
              <div className="min-w-0 self-center px-5 py-8 sm:px-8 lg:py-12">
                <nav aria-label="Navegação do guia" className="mb-3 flex flex-wrap gap-x-4 text-sm">
                  <Link to="/blog" className="inline-flex min-h-11 items-center underline underline-offset-4 focus-visible:outline focus-visible:outline-2">Blog da Patro</Link>
                  <Link to="/seguros-aeroportuarios" className="inline-flex min-h-11 items-center underline underline-offset-4 focus-visible:outline focus-visible:outline-2">Seguros aeroportuários</Link>
                </nav>
                <h1 id="titulo-guia-aeroportuario" className="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">{guiaAeroportuarioTitle}</h1>
                <p className="mt-4 text-sm text-slate-100">Por {COMPANY.nomeFantasia} · Para empresas, compras, contratos e engenharia</p>
              </div>
              <img src={guiaImage} alt={guiaImageAlt} width={1536} height={1024} fetchPriority="high" decoding="async" className="aspect-[3/2] w-full object-cover lg:h-full" />
            </div>
          </header>
          <div className="mx-auto max-w-7xl px-5 sm:px-8 print:max-w-none print:px-0">
            <section aria-labelledby="resumo-guia" className="my-8 border-l-4 border-primary bg-secondary p-5 sm:p-6 print:hidden">
              <h2 id="resumo-guia" className="mb-2 text-lg font-bold">Em resumo</h2>
              <p className="max-w-prose leading-relaxed">{guiaSummary}</p>
              <a className={`${link} mt-2 inline-flex min-h-11 items-center`} href="#guia-checklist">Ir para o checklist imprimível</a>
            </section>
            <div className="grid gap-8 pb-14 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-10 print:block print:pb-0">
              <nav aria-label="Índice do guia" className="self-start rounded-lg border bg-card p-4 print:hidden">
                <p className="mb-2 font-bold">Capítulos</p>
                <ol className="list-decimal pl-5 text-sm marker:text-muted-foreground">
                  {guiaChapters.map(([id, title]) => <li key={id}><a href={`#${id}`} className={`${link} flex min-h-11 items-center py-1`}>{title}</a></li>)}
                </ol>
              </nav>
              <div className="min-w-0 space-y-10 break-words leading-relaxed print:space-y-0">
                <Chapter number={1}><div className={measure}>{riscos.map((text) => <p key={text}>{text}</p>)}</div></Chapter>
                <Chapter number={2}>
                  <p className="max-w-prose">Ao ler “seguro obrigatório”, peça a fonte e confirme a quem ela se aplica. São cinco análises diferentes:</p>
                  <DefinitionList rows={exigencias} />
                  <p className="mt-4 max-w-prose">Em Guarulhos (GRU Airport) ou em outro aeroporto brasileiro, confirme a cláusula e as instruções de acesso com os responsáveis pelo seu contrato. Este guia não atribui requisitos específicos a concessionárias.</p>
                </Chapter>
                <Chapter number={3}>
                  <p className="max-w-prose">Use a tabela para distinguir proteção patrimonial, responsabilidade, garantia de obrigações e benefícios. As descrições são orientativas e não confirmam disponibilidade nem cobertura.</p>
                  <Comparison id="modalidades-tabela" title="Comparativo de modalidades de seguros" headers={["Modalidade", "O que pode tratar", "O que conferir"]} rows={modalidades} />
                  <p className="mt-4 max-w-prose">Para aprofundar a análise, consulte <Link className={link} to="/seguro-eo-engenharia-aeroportos">E&amp;O Engenharia em aeroportos</Link>, <Link className={link} to="/seguro-rc">RC Geral</Link>, <Link className={link} to="/seguro-engenharia">Riscos de Engenharia</Link> ou a prévia de <Link className={link} to={GARANTIA_AEROPORTUARIA_PATH}>Seguro Garantia para contratos aeroportuários</Link>.</p>
                </Chapter>
                <Chapter number={4}>
                  <p className="max-w-prose">A matriz ajuda a montar as primeiras perguntas. Não determina cobertura, contratação ou obrigatoriedade. Uma empresa que execute mais de uma atividade deve avaliar cada frente, não apenas o CNAE principal.</p>
                  <Comparison id="atividades-tabela" title="Matriz consultiva de seguros por atividade aeroportuária" headers={["Atividade", "Modalidades que podem ser avaliadas", "Pergunta inicial"]} rows={atividades} />
                </Chapter>
                <Chapter number={5}>
                  <p className="max-w-prose print:hidden">Monte uma planilha com a cláusula exata, a evidência pedida, quem entrega e a data-limite. Marque o que está confirmado e sinalize o que depende da seguradora ou da contratante. Use o checklist na tela ou imprima somente esta lista.</p>
                  <div id="checklist-impresso-aeroportuario" className="mt-4 max-w-prose print:mt-0 print:max-w-none">
                    <h3 className="mb-2 text-lg font-bold print:text-xl">Checklist de seguros para contratos aeroportuários</h3>
                    <p className="mb-3 text-sm print:hidden">As marcações não são enviadas nem salvas.</p>
                    <p className="mb-4 hidden print:block">Patro Seguros · Material de apoio em revisão técnica</p>
                    <ul className="divide-y rounded-lg border px-4 print:rounded-none print:border-black">
                      {checklist.map((item) => <li key={item} className="print:break-inside-avoid"><label className="flex min-h-11 cursor-pointer items-start gap-3 py-3 print:min-h-0 print:py-2"><input type="checkbox" className="mt-1 h-4 w-4 shrink-0 accent-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2" /><span>{item}</span></label></li>)}
                    </ul>
                  </div>
                  <button type="button" onClick={() => window.print()} className="mt-4 min-h-11 rounded-md border border-primary px-4 py-2 font-semibold text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 print:hidden">Imprimir checklist</button>
                </Chapter>
                <Chapter number={6}>
                  <p className="max-w-prose">Monte um dossiê por etapa. A lista abaixo é um ponto de partida: a seguradora ou a contratante pode pedir documentos diferentes conforme o risco e o procedimento de entrega.</p>
                  <DefinitionList rows={documentos} />
                </Chapter>
                <Chapter number={7}>
                  <p className="max-w-prose">Use a mesma versão da cláusula e da descrição de risco para todas as cotações. Se uma proposta sair sem uma informação necessária, registre a pendência como tal: o que não foi confirmado ainda não pode ser tratado como atendido.</p>
                  <DefinitionList rows={propostas} />
                </Chapter>
                <Chapter number={8}>
                  <p className="mb-4 max-w-prose">Os seis cenários abaixo são hipotéticos. Eles ilustram perguntas que a empresa pode fazer antes de contratar, sem antecipar cobertura ou aceite.</p>
                  <ol className="max-w-prose list-decimal space-y-4 pl-5 marker:font-semibold">
                    {exemplos.map(([title, description]) => <li key={title} className="pl-1"><h3 className="font-bold">{title}</h3><p className="mt-1">{description}</p></li>)}
                  </ol>
                </Chapter>
                <Chapter number={9}>
                  <ul className="max-w-prose list-disc space-y-2 pl-5">
                    <li>Pedir cotação sem informar área, atividades delegadas ou mudanças previstas.</li>
                    <li>Comparar preço e limite principal sem conferir as exclusões e os sublimites.</li>
                    <li>Tratar proposta, certificado ou promessa de endosso como prova de aderência.</li>
                    <li>Entregar a documentação na véspera da mobilização ou renovar sem revisar o escopo.</li>
                  </ul>
                  <p className="mt-4 max-w-prose">Veja os <Link className={link} to={APOLICE_CONTRATOS_PATH}>15 erros que podem comprometer um contrato de prestação de serviços</Link>, com uma matriz de divergências e ações preventivas.</p>
                </Chapter>
                <Chapter number={10}>
                  <ol className="max-w-prose list-decimal space-y-3 pl-5">
                    <li><strong>Contexto.</strong> Informe aeroporto, área, atividade, prazo e cláusula relevante. Se o documento ainda não chegou, explique o que já foi definido e o que aguarda confirmação.</li>
                    <li><strong>Leitura das exigências.</strong> A Patro organiza as modalidades a avaliar, aponta lacunas na descrição e ajuda a formular perguntas para a contratante e a seguradora.</li>
                    <li><strong>Consulta ao mercado.</strong> Com o risco descrito, a corretora busca alternativas, compara escopo, exclusões, datas e limites e identifica diferenças que podem afetar a entrega.</li>
                    <li><strong>Emissão e conferência.</strong> Após a aceitação e a contratação, a Patro acompanha a emissão e orienta a conferência dos documentos. O aceite contratual e o credenciamento são decisões separadas.</li>
                  </ol>
                  <aside aria-labelledby="guia-cta" className="mt-6 rounded-xl border bg-secondary p-5 sm:p-6">
                    <h3 id="guia-cta" className="text-lg font-bold">Recebeu uma cláusula de seguros?</h3>
                    <p className="mt-2 max-w-prose">Envie somente o trecho relevante e uma breve descrição do serviço. Oculte dados pessoais, assinaturas e informações comerciais desnecessárias. A Patro atende de Guarulhos empresas de todo o Brasil, sem representar concessionárias.</p>
                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                      <a href={whatsapp} className="inline-flex min-h-11 items-center rounded-md bg-cta px-4 py-2 font-semibold text-cta-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">WhatsApp oficial: {COMPANY.whatsappFormatado}</a>
                      <Link className={`${link} inline-flex min-h-11 items-center`} to="/seguros-aeroportuarios#orientacao-aeroportuaria">Começar pela triagem aeroportuária</Link>
                    </div>
                  </aside>
                </Chapter>
                <Chapter number={11}>
                  <DefinitionList rows={glossario} />
                </Chapter>
                <Chapter number={12}>
                  <div className="divide-y rounded-lg border px-4">
                    {guiaFaqs.map(([question, answer]) => <details key={question}><summary className="min-h-11 cursor-pointer py-3 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">{question}</summary><p className="max-w-prose pb-4">{answer}</p></details>)}
                  </div>
                </Chapter>
                <section aria-labelledby="referencias-guia" className="border-t pt-7 print:hidden">
                  <h2 id="referencias-guia" className="mb-4 text-2xl font-bold tracking-tight">Referências e documentos para consulta</h2>
                  <ul className="max-w-prose space-y-3">
                    {guiaReferencias.map(({ label, url, detail }) => <li key={url}><a className={link} href={url}>{label}</a><p>{detail}</p></li>)}
                  </ul>
                  <p className="mt-4 max-w-prose">Para seu contrato, obtenha também as instruções vigentes da concessionária ou da contratante, quando aplicáveis, e a versão das condições gerais, especiais e particulares correspondente ao produto cotado. Este guia não substitui esses documentos nem a análise técnica do caso.</p>
                </section>
              </div>
            </div>
          </div>
        </article>
      </main>
      <div className="print:hidden"><Footer /></div>
    </div>
  );
}
