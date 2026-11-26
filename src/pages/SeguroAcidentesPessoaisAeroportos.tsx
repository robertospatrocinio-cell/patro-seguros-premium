import { Link } from "react-router-dom";
import { Check, FileText, MapPin } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import PageMeta from "@/components/PageMeta";
import EoIntakeForm from "@/components/EoIntakeForm";
import { Button } from "@/components/ui/button";
import { airportEditorial } from "@/data/airportEditorial";
import { apTitle, apDescription, apImage, apHeading, apSchema, apDefinition, apCoverage, apAudiences, apModalities, apExamples, apComparisons, apFaq } from "@/data/airportPersonalAccidents";
import type { ReactNode } from "react";

const whatsapp = "https://wa.me/551151997500";
const quote = "#cotacao-acidentes-pessoais";
const link = "inline-flex min-h-11 items-center py-2 font-semibold text-primary underline underline-offset-4";
const box = "rounded-lg border border-border bg-background p-5 sm:p-6";
const trust = ["Atendimento empresarial e individual", "Orientação sobre exigências contratuais", "Opções individuais ou coletivas", "Equipes temporárias e permanentes, conforme disponibilidade", "Atendimento em Guarulhos e em todo o Brasil"];
const imageAlt = "Equipe técnica em ambiente de engenharia aeroportuária";

function Section({ id, title, muted = false, children }: { id: string; title: string; muted?: boolean; children: ReactNode }) {
  return <section id={id} aria-labelledby={`${id}-title`} className={muted ? "scroll-mt-28 border-y border-border bg-slate-50 text-slate-800" : "scroll-mt-28 bg-background text-foreground"}>
    <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:py-16">
      <h2 id={`${id}-title`} className="mb-5 max-w-[36ch] text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">{title}</h2>{children}
    </div>
  </section>;
}

function Comparison({ caption, headers, rows }: { caption: string; headers: string[]; rows: readonly (readonly string[])[] }) {
  return <div role="region" aria-label={caption} tabIndex={0} className="mt-5 max-w-full overflow-x-auto rounded-lg border border-border focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
    <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
      <caption className="sr-only">{caption}</caption>
      <thead className="bg-[#112c49] text-white"><tr>{headers.map(h => <th scope="col" key={h} className="p-4 align-top">{h}</th>)}</tr></thead>
      <tbody className="divide-y divide-border">{rows.map(([label, ...cells]) => <tr key={label}><th scope="row" className="w-1/4 p-4 align-top font-semibold">{label}</th>{cells.map(cell => <td key={cell} className="p-4 align-top">{cell}</td>)}</tr>)}</tbody>
    </table>
  </div>;
}

export default function SeguroAcidentesPessoaisAeroportos() {
  return <>
    <PageMeta absoluteTitle title={apTitle} description={apDescription} ogImage={apImage} ogImageAlt={imageAlt} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(apSchema) }} />
    <Header />
    <main id="main-content" tabIndex={-1}>
      <Breadcrumb items={[{ label: "Seguros Empresariais", href: "/seguros-empresariais" }, { label: "Seguros aeroportuários", href: "/seguros-aeroportuarios" }, { label: "Acidentes Pessoais para Aeroportos" }]} />
      <section aria-labelledby="ap-hero-title" className="bg-[#112c49] text-white">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-[1.18fr_1fr]">
          <div className="min-w-0 px-5 py-10 sm:px-8 lg:py-16">
            <Link to="/seguros-aeroportuarios" className="inline-flex min-h-11 items-center text-sm font-semibold text-blue-200 underline underline-offset-4">Seguros para serviços aeroportuários</Link>
            <h1 id="ap-hero-title" className="max-w-[23ch] text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-4xl xl:text-5xl">{apHeading}</h1>
            <p className="mt-5 max-w-prose text-lg text-slate-100">Sua empresa precisa apresentar um Seguro de Acidentes Pessoais para que seus profissionais possam prestar serviços no Aeroporto de Guarulhos ou em outros aeroportos brasileiros?</p>
            <p className="mt-4 max-w-prose text-slate-200">A Patro Seguros ajuda sua empresa a compreender as exigências apresentadas e buscar uma solução adequada para proteger seus profissionais.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild className="h-auto min-h-12 whitespace-normal bg-white px-4 py-2 text-[#112c49] hover:bg-blue-100"><a href={quote}>Solicitar cotação de Acidentes Pessoais</a></Button>
              <a href="#exigencias" className="inline-flex min-h-12 items-center rounded-md border border-blue-200 px-4 py-2 text-sm font-semibold hover:bg-white/10">Enviar exigências do contrato</a>
              <a href={whatsapp} className="inline-flex min-h-12 items-center px-2 text-sm font-semibold underline underline-offset-4">Falar com um especialista</a>
            </div>
          </div>
          <figure className="flex min-w-0 flex-col bg-[#183954]">
            <img src={apImage} alt={imageAlt} width={1536} height={1024} fetchPriority="high" decoding="async" className="aspect-[3/2] min-h-0 w-full flex-1 object-cover lg:aspect-auto" />
            <figcaption className="flex items-center gap-2 px-5 py-4 text-sm text-slate-100 sm:px-8"><MapPin aria-hidden="true" className="h-5 w-5 shrink-0 text-blue-200" /> Atendimento em Guarulhos (GRU Airport) e em todo o Brasil</figcaption>
          </figure>
        </div>
        <ul className="mx-auto grid max-w-7xl gap-3 border-t border-white/20 px-5 py-6 sm:grid-cols-2 sm:px-8 lg:grid-cols-5" aria-label="Opções de atendimento">{trust.map(t => <li className="flex gap-2 text-sm" key={t}><Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-blue-200" />{t}</li>)}</ul>
      </section>
      <nav aria-label="Nesta página" className="border-b border-border"><ul className="mx-auto flex max-w-7xl flex-wrap gap-x-6 px-5 py-2 sm:px-8">{[["exigencias", "Exigências"], ["coberturas", "Coberturas"], ["modalidades", "Modalidades"], ["perguntas", "Perguntas frequentes"], ["cotacao-acidentes-pessoais", "Cotação"]].map(([id, label]) => <li key={id}><a href={`#${id}`} className={link}>{label}</a></li>)}</ul></nav>
      <Section id="exigencias" title="Sua empresa recebeu uma exigência de Seguro de Acidentes Pessoais para seus trabalhadores?">
        <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr]">
          <div className="max-w-prose space-y-4"><p>Concessionárias, contratantes, terceirizadas e gestores podem definir requisitos para a prestação de serviços. No Aeroporto de Guarulhos, confira a versão vigente da cláusula, os anexos, as instruções de credenciamento e as convenções ou acordos coletivos aplicáveis. Não presuma que todos os prestadores do GRU Airport precisam do mesmo seguro.</p><p>Verifique o capital mínimo por pessoa e por cobertura, a vigência, as atividades e áreas operacionais previstas, inclusive para serviços temporários. Confirme como identificar segurados, incluir novos trabalhadores, apresentar comprovantes ou certificados individuais e manter a proteção durante todo o contrato, inclusive se houver prorrogação.</p></div>
          <aside className="rounded-lg bg-[#112c49] p-6 text-white"><FileText aria-hidden="true" className="mb-3 h-6 w-6 text-blue-200" /><p className="font-semibold">Tem a cláusula do seu contrato?</p><p className="mt-2 text-sm text-slate-100">Na última etapa da cotação, você pode anexar um PDF em área privada. Envie apenas o trecho sobre seguros, sem assinaturas, dados pessoais de terceiros ou informações operacionais restritas.</p><a href={quote} className="mt-2 inline-flex min-h-11 items-center font-semibold underline underline-offset-4">Abrir formulário para enviar a exigência</a></aside>
        </div>
      </Section>
      <EoIntakeForm personalAccidents whatsapp={whatsapp} />
      <Section id="o-que-e" title="O que é Seguro de Acidentes Pessoais?">
        <p className="max-w-prose leading-relaxed">{apDefinition}</p>
        <dl className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
          {[
            ["Acidente pessoal", "Em termos securitários, evento externo, súbito, involuntário e violento, com data caracterizada, que causa lesão física, conforme a definição da apólice."],
            ["Capital segurado", "Valor máximo de referência por pessoa e cobertura; o pagamento pode ser parcial conforme o evento e as regras contratadas."],
            ["Segurado e beneficiário", "O segurado é a pessoa protegida. O beneficiário é quem tem direito à indenização quando aplicável, conforme indicação e regras legais e contratuais."],
            ["Individual e coletivo", "O individual protege a pessoa indicada. No coletivo, o estipulante contrata e representa um grupo elegível perante a seguradora, nos termos aplicáveis."],
            ["Vigência e abrangência", "Confira início e término da proteção e se ela se aplica às atividades profissionais declaradas, a períodos ou atividades delimitados ou a 24 horas, quando contratada."],
            ["Proteção da pessoa, não da empresa", "AP protege financeiramente o segurado ou seus beneficiários; não cobre, por si só, a responsabilidade civil da empresa."],
          ].map(([name, text]) => <div className="border-t border-border pt-3" key={name}><dt className="font-semibold">{name}</dt><dd className="mt-1 text-sm leading-relaxed">{text}</dd></div>)}
        </dl>
      </Section>
      <Section id="coberturas" title="Principais coberturas para avaliar" muted>
        <p className="max-w-prose">Nem todos os produtos oferecem todas as coberturas. Confira capitais, franquias, exclusões e aceitação da ocupação na proposta.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{apCoverage.map(([abbr, title, detail]) => <article className={box} key={abbr}><p className="text-sm font-semibold text-primary">{abbr}</p><h3 className="mt-2 text-lg font-semibold text-foreground">{title}</h3><p className="mt-3 text-sm leading-relaxed text-foreground">{detail}</p></article>)}</div>
      </Section>
      <Section id="quem-pode-contratar" title="Quem pode contratar?">
        <p className="max-w-prose">A contratação e a inclusão de cada profissional dependem da elegibilidade do grupo, da ocupação e da aceitação da seguradora.</p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{apAudiences.map(a => <li className="flex gap-2 rounded-md border border-border px-4 py-3 text-sm" key={a}><Check aria-hidden="true" className="h-4 w-4 shrink-0 text-primary" />{a}</li>)}</ul>
      </Section>
      <Section id="modalidades" title="Modalidades de contratação" muted>
        <p className="max-w-prose">As opções abaixo podem ser combinadas, mas nem todas estão disponíveis para cada contrato, grupo ou seguradora.</p>
        <Comparison caption="Modalidades de Acidentes Pessoais" headers={["Modalidade", "Quando faz sentido", "O que conferir"]} rows={apModalities} />
      </Section>
      <Section id="analise-ocupacional" title="Atividades que exigem análise ocupacional">
        <p className="max-w-prose">Declare as tarefas realmente executadas. Trabalho em altura, eletricidade e áreas restritas não estão automaticamente cobertos; certas exposições podem ter restrições ou exigir análise diferenciada.</p>
        <ul className="mt-5 grid list-inside list-disc gap-2 text-sm sm:grid-cols-2 lg:grid-cols-3">{["Trabalho em altura", "Instalações elétricas", "Espaços confinados", "Movimentação de cargas", "Montagem de equipamentos", "Operação de máquinas", "Manutenção industrial", "Obras civis", "Áreas operacionais aeroportuárias", "Trabalhos noturnos", "Ambientes industriais", "Atividades próximas a aeronaves"].map(t => <li key={t}>{t}</li>)}</ul>
      </Section>
      <Section id="exemplos" title="Seis situações hipotéticas" muted>
        <p className="max-w-prose">São exemplos ilustrativos, não sinistros da Patro nem promessa de indenização. A seguradora analisa as condições e provas de cada caso.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{apExamples.map(([activity, event, coverage, limits]) => <article key={activity} className={box}><h3 className="text-lg font-semibold text-foreground">{activity}</h3><div className="mt-3 space-y-2 text-sm leading-relaxed text-foreground"><p>{event}</p><p><strong>Coberturas a analisar:</strong> {coverage}</p><p><strong>Limites a conferir:</strong> {limits}</p></div></article>)}</div>
      </Section>
      <Section id="comparar" title="Acidentes Pessoais, Vida em Grupo e outros seguros">
        <p className="max-w-prose">Essas modalidades têm finalidades diferentes e podem ser complementares. Compare o que a cláusula pede com o que cada apólice entrega.</p>
        <Comparison caption="Diferenças entre Acidentes Pessoais e outras modalidades" headers={["Modalidade", "Finalidade"]} rows={apComparisons} />
      </Section>
      <Section id="seguranca-do-trabalho" title="Seguro não substitui segurança do trabalho" muted>
        <p className="max-w-prose">Acidentes Pessoais é uma ferramenta complementar de proteção financeira. Não substitui obrigações trabalhistas ou previdenciárias, normas regulamentadoras, treinamentos obrigatórios, EPIs, programas de saúde e segurança ocupacional, prevenção, comunicação de acidentes de trabalho quando exigida ou responsabilidades legais do empregador.</p>
      </Section>
      <Section id="preco-e-documentos" title="Quanto custa e o que preparar para a cotação">
        <div className="grid gap-6 lg:grid-cols-2"><div className={box}><h3 className="text-lg font-semibold">O que influencia o preço</h3><p className="mt-3 leading-relaxed">Quantidade de profissionais, capital por pessoa, coberturas, atividades, faixas etárias quando aplicáveis, vigência, local e natureza dos serviços, características da equipe e critérios da seguradora. Não há preço ou mínimo universal.</p></div><div className={box}><h3 className="text-lg font-semibold">O que informar no primeiro contato</h3><p className="mt-3 leading-relaxed">Nome do responsável, razão social e CNPJ quando aplicáveis, WhatsApp, e-mail, aeroporto, atividade, quantidade de trabalhadores, vigência, capital, coberturas, prazo de entrega e cláusula, se disponível.</p><p className="mt-2 text-sm">Não envie documentos pessoais. Dados individuais poderão ser solicitados depois por canal seguro, conforme as exigências da seguradora.</p></div></div>
      </Section>
      <Section id="contratacao" title="Como funciona a contratação" muted>
        <ol className="grid list-inside list-decimal gap-4 sm:grid-cols-2 lg:grid-cols-4">{["Informe a atividade e a quantidade de profissionais.", "Envie as exigências contratuais, se disponíveis.", "A Patro busca alternativas de contratação.", "Após a aceitação da seguradora, acompanhe a emissão e a documentação."].map(t => <li key={t} className="border-t-2 border-primary/40 pt-3">{t}</li>)}</ol>
        <a href={quote} className={`${link} mt-4`}>Solicitar cotação de Seguro de Acidentes Pessoais</a>
      </Section>
      <Section id="perguntas" title="Perguntas frequentes sobre Seguro de Acidentes Pessoais em aeroportos">
        <div className="max-w-4xl divide-y divide-border border-y border-border">{apFaq.map(({ question, answer }) => <details key={question}><summary className="min-h-12 cursor-pointer py-3 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">{question}</summary><p className="max-w-prose pb-4 leading-relaxed">{answer}</p></details>)}</div>
      </Section>
      <Section id="referencias" title="Links úteis para conferir sua exigência" muted>
        <p className="max-w-prose">Para confirmar uma obrigação, consulte o contrato e as instruções vigentes fornecidas pelo contratante. As referências abaixo não comprovam uma exigência universal de seguro.</p>
        <ul className="mt-3 grid gap-x-6 sm:grid-cols-2">
          <li><a className={link} href="https://www.gov.br/susep/pt-br">SUSEP — orientações sobre seguros</a></li>
          <li><a className={link} href="https://www.gru.com.br/">GRU Airport — canais da administradora</a></li>
          <li><a className={link} href="https://www.gov.br/trabalho-e-emprego/pt-br">Ministério do Trabalho e Emprego — normas e instrumentos coletivos</a></li>
          <li><Link className={link} to="/seguros-aeroportuarios">Seguros para empresas e prestadores em aeroportos</Link></li>
          <li><Link className={link} to="/seguro-eo-engenharia-aeroportos">Seguro E&amp;O Engenharia para Aeroportos</Link></li>
          <li><Link className={link} to="/seguro-vida">Seguro de Vida</Link></li>
          <li><Link className={link} to="/seguro-empresarial">Seguro Empresarial</Link></li>
          <li><Link className={link} to={airportEditorial.eoGuide.path}>Guia de exigências de E&amp;O para prestadores aeroportuários</Link></li>
          <li><Link className={link} to={airportEditorial.guarantee.path}>Entenda o Seguro Garantia nos contratos aeroportuários</Link></li>
        </ul>
      </Section>
    </main>
    <Footer />
  </>;
}
