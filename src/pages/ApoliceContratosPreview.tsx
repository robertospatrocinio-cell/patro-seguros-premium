import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PageMeta from "@/components/PageMeta";
import { COMPANY, WHATSAPP_URL_BASE } from "@/config/company";
import { GARANTIA_AEROPORTUARIA_PATH } from "@/data/garantiaAeroportuaria";
import {
  APOLICE_CONTRATOS_PATH, apoliceChecklist, apoliceDescription, apoliceErros, apoliceFaqs,
  apoliceMatriz, apoliceMetaTitle, apoliceReferences, apoliceSummary, apoliceTitle,
} from "@/data/apoliceContratosEmpresariais";

const image = "/images/revisao-apolice-contratos-empresariais.jpg";
const imageAlt = "Mão com lápis comparando dois conjuntos de documentos sobre uma mesa azul-escura";
const url = `${COMPANY.dominioCanonico}${APOLICE_CONTRATOS_PATH}`;
const whatsapp = `${WHATSAPP_URL_BASE}?text=${encodeURIComponent("Olá, Patro! Gostaria de orientação para conferir as exigências de seguros do meu contrato de prestação de serviços.")}`;
const link = "font-semibold text-primary underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4";
const heading = "mb-4 text-2xl font-bold tracking-tight sm:text-3xl";
const group = "scroll-mt-32";
const index = [
  ["erros", "15 erros e como preveni-los"], ["matriz", "Matriz de riscos contratuais"],
  ["exemplos", "Dois exemplos hipotéticos"], ["checklist", "Checklist de conferência"],
  ["orientacao", "Orientação da Patro"], ["faq", "Perguntas frequentes"], ["referencias", "Referências e documentos"],
];
const schema = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "BlogPosting", "@id": `${url}#artigo`, mainEntityOfPage: url, headline: apoliceTitle, description: apoliceDescription, image: `${COMPANY.dominioCanonico}${image}`, inLanguage: "pt-BR", author: { "@type": "Organization", name: COMPANY.nomeFantasia, url: COMPANY.dominioCanonico }, publisher: { "@type": "Organization", "@id": `${COMPANY.dominioCanonico}/#organization`, name: COMPANY.nomeFantasia, logo: { "@type": "ImageObject", url: `${COMPANY.dominioCanonico}/images/logo-full.webp` } }, citation: apoliceReferences.map((source) => source.url) },
    { "@type": "FAQPage", "@id": `${url}#faq`, inLanguage: "pt-BR", mainEntity: apoliceFaqs.map(({ question, answer }) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
  ],
};

export default function ApoliceContratosPreview() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <PageMeta title={apoliceMetaTitle} description={apoliceDescription} noindex skipBreadcrumb ogType="article" ogImage={image} ogImageAlt={imageAlt} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <Header />
      <main id="main-content" tabIndex={-1}>
        <article aria-labelledby="titulo-apolice">
          <div className="border-b bg-secondary">
            <p className="mx-auto max-w-6xl px-4 py-4 text-sm sm:px-6"><strong>Prévia editorial.</strong> Publicação condicionada à revisão técnica.</p>
          </div>
          <header className="mx-auto grid max-w-6xl items-center gap-6 px-4 py-8 sm:px-6 md:grid-cols-2 md:gap-10 md:py-12">
            <div className="min-w-0">
              <nav aria-label="Navegação do artigo" className="mb-4 flex flex-wrap items-center gap-x-3 text-sm">
                <Link className={`${link} flex min-h-11 items-center`} to="/blog">Blog da Patro</Link>
                <span aria-hidden="true">/</span>
                <Link className={`${link} flex min-h-11 items-center`} to="/seguros-aeroportuarios">Seguros aeroportuários</Link>
              </nav>
              <h1 id="titulo-apolice" className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">{apoliceTitle}</h1>
              <p className="mt-4 text-sm text-muted-foreground">Por {COMPANY.nomeFantasia}</p>
              <section aria-labelledby="resumo-apolice" className="mt-5 max-w-prose rounded-r-lg border-l-4 border-primary bg-secondary p-4">
                <h2 id="resumo-apolice" className="mb-2 text-lg font-bold">Em resumo</h2>
                <p className="leading-relaxed">{apoliceSummary}</p>
              </section>
              <a href="#checklist" className={`${link} mt-2 inline-flex min-h-11 items-center`}>Ir direto ao checklist de conferência</a>
            </div>
            <figure>
              <img src={image} alt={imageAlt} width={1536} height={1024} fetchPriority="high" decoding="async" className="aspect-[3/2] w-full rounded-xl object-cover" />
              <figcaption className="mt-2 text-sm text-muted-foreground">Imagem ilustrativa da conferência entre cláusula contratual e apólice.</figcaption>
            </figure>
          </header>
          <div className="mx-auto grid max-w-6xl gap-8 px-4 pb-14 sm:px-6 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-12">
            <nav aria-label="Índice do artigo" className="self-start rounded-lg border bg-card p-4">
              <p className="mb-2 font-bold">Neste artigo</p>
              <ol className="list-decimal space-y-1 pl-5 text-sm">
                {index.map(([id, title]) => <li key={id}><a className={`${link} flex min-h-11 items-center py-1`} href={`#${id}`}>{title}</a></li>)}
              </ol>
            </nav>
            <div className="min-w-0 space-y-12 break-words leading-relaxed">
              <section id="erros" tabIndex={-1} aria-labelledby="erros-titulo" className={group}>
                <h2 id="erros-titulo" className={heading}>15 erros e como preveni-los</h2>
                <p className="mb-5 max-w-prose">A conferência começa antes da cotação e continua até a entrega dos documentos. Vale dividir a tarefa: contratos identifica o que foi pedido, operações descreve a atividade e compras documenta o que cada seguradora ofereceu.</p>
                <ol className="list-decimal border-b pl-6 marker:font-bold marker:text-primary">
                  {apoliceErros.map(({ title, occurrence, consequence, prevention, assistance }) => (
                    <li key={title} className="border-t py-5 pl-2">
                      <h3 className="mb-3 text-xl font-bold">{title}</h3>
                      <dl className="grid max-w-prose gap-3 sm:max-w-none sm:grid-cols-2 sm:gap-4">
                        <div><dt className="font-semibold">Como ocorre</dt><dd>{occurrence}</dd></div>
                        <div><dt className="font-semibold">Possíveis consequências</dt><dd>{consequence}</dd></div>
                        <div><dt className="font-semibold">Como prevenir</dt><dd>{prevention}</dd></div>
                        <div><dt className="font-semibold">Como a Patro pode ajudar</dt><dd>{assistance}</dd></div>
                      </dl>
                    </li>
                  ))}
                </ol>
                <p className="mt-4 max-w-prose">Se a cláusula citar execução contratual, consulte a prévia de <Link className={link} to={GARANTIA_AEROPORTUARIA_PATH}>Seguro Garantia para contratos aeroportuários</Link>. Para serviços de projeto e supervisão, veja como analisar <Link className={link} to="/seguro-eo-engenharia-aeroportos">E&amp;O Engenharia em aeroportos</Link> separadamente do <Link className={link} to="/seguro-rc">RC Geral</Link>.</p>
              </section>
              <section id="matriz" tabIndex={-1} aria-labelledby="matriz-titulo" className={group}>
                <h2 id="matriz-titulo" className={heading}>Matriz ilustrativa de riscos contratuais</h2>
                <p className="mb-3 max-w-prose">Use as linhas como modelo para registrar o requisito, o desvio e quem vai resolvê-lo. Os cenários são hipotéticos e não representam dados estatísticos, classificações de risco ou exigências de uma contratante específica.</p>
                <p id="matriz-instrucao" className="mb-2 text-sm text-muted-foreground">Em telas estreitas, deslize a tabela ou use as setas do teclado após focá-la.</p>
                <div role="region" aria-label="Tabela da matriz de riscos contratuais" aria-describedby="matriz-instrucao" tabIndex={0} className="overflow-x-auto rounded-lg border focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                  <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
                    <caption className="sr-only">Exemplos de divergências entre o contrato e a documentação do seguro</caption>
                    <thead className="bg-secondary"><tr>{["O que conferir", "Divergência encontrada", "Efeito possível", "Próxima ação"].map((label) => <th key={label} scope="col" className="p-3">{label}</th>)}</tr></thead>
                    <tbody>{apoliceMatriz.map(({ requirement, finding, impact, action }) => <tr key={requirement} className="border-t align-top"><th scope="row" className="p-3">{requirement}</th><td className="p-3">{finding}</td><td className="p-3">{impact}</td><td className="p-3">{action}</td></tr>)}</tbody>
                  </table>
                </div>
              </section>
              <section id="exemplos" tabIndex={-1} aria-labelledby="exemplos-titulo" className={`${group} rounded-xl bg-secondary p-5 sm:p-7`}>
                <h2 id="exemplos-titulo" className={heading}>Dois exemplos hipotéticos</h2>
                <div className="max-w-prose space-y-5">
                  <div>
                    <h3 className="mb-1 text-lg font-bold">Automação em um terminal</h3>
                    <p>Uma integradora vai projetar e instalar sensores em dois ambientes: um escritório e uma área operacional. A primeira cotação cita só a instalação administrativa. Antes de comparar preços, a equipe descreve as duas áreas, separa os serviços de projeto e instalação e pede à seguradora que esclareça as condições e exclusões para cada exposição. A empresa só encaminha o documento como aderente depois de conferir esses pontos.</p>
                  </div>
                  <div>
                    <h3 className="mb-1 text-lg font-bold">Renovação de uma consultoria de engenharia</h3>
                    <p>Uma consultoria que ainda supervisiona uma instalação recebe uma proposta com data de retroatividade posterior à do seguro anterior. A equipe compara as cláusulas para entender o tratamento dos atos já praticados e de eventuais notificações pendentes. Se não obtiver uma solução compatível, registra a diferença e esclarece o requisito com a contratante antes de decidir. O cenário não antecipa cobertura para nenhuma reclamação.</p>
                  </div>
                </div>
              </section>
              <section id="checklist" tabIndex={-1} aria-labelledby="checklist-titulo" className={group}>
                <h2 id="checklist-titulo" className={heading}>Checklist de conferência da apólice</h2>
                <p className="mb-4 max-w-prose">Marque os itens ao revisar o documento emitido. O checklist serve para esta conferência e não guarda as marcações ao recarregar a página.</p>
                <ul className="max-w-prose divide-y rounded-lg border bg-card px-4">
                  {apoliceChecklist.map((item) => <li key={item}><label className="flex min-h-11 cursor-pointer items-start gap-3 py-3"><input type="checkbox" className="mt-1 h-4 w-4 shrink-0 accent-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2" /><span>{item}</span></label></li>)}
                </ul>
              </section>
              <aside id="orientacao" tabIndex={-1} aria-labelledby="orientacao-titulo" className={`${group} rounded-xl border bg-card p-5 sm:p-7`}>
                <h2 id="orientacao-titulo" className="max-w-prose text-xl font-bold">Antes de contratar ou renovar seu seguro, envie as exigências do contrato para orientação da Patro.</h2>
                <p className="mt-2 max-w-prose">Informe o serviço, o prazo de entrega e a modalidade solicitada. Compartilhe apenas o trecho necessário sobre seguros, sem dados pessoais, assinaturas ou informações comerciais confidenciais.</p>
                <a href={whatsapp} className="mt-4 inline-flex min-h-12 items-center justify-center rounded-md bg-cta px-4 py-2 text-center font-semibold text-cta-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">WhatsApp oficial: {COMPANY.whatsappFormatado}</a>
              </aside>
              <section id="faq" tabIndex={-1} aria-labelledby="faq-titulo" className={group}>
                <h2 id="faq-titulo" className={heading}>Perguntas frequentes</h2>
                <div className="divide-y rounded-lg border px-4">
                  {apoliceFaqs.map(({ question, answer }) => <details key={question}><summary className="min-h-11 cursor-pointer py-3 font-semibold focus-visible:outline focus-visible:outline-2">{question}</summary><p className="max-w-prose pb-4">{answer}</p></details>)}
                </div>
              </section>
              <section id="referencias" tabIndex={-1} aria-labelledby="referencias-titulo" className={group}>
                <h2 id="referencias-titulo" className={heading}>Referências e documentos para consulta</h2>
                <ul className="max-w-prose space-y-3">
                  {apoliceReferences.map(({ label, url, detail }) => <li key={url}><a className={link} href={url}>{label}</a><p>{detail}</p></li>)}
                </ul>
                <p className="mt-4 max-w-prose">Para uma análise específica, use o contrato, os anexos vigentes e as instruções da contratante ou concessionária, quando aplicáveis. Compare com a proposta, as condições gerais, especiais e particulares do produto, a apólice e os endossos. Este guia é informativo e não confirma aceitação nem cobertura.</p>
              </section>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
