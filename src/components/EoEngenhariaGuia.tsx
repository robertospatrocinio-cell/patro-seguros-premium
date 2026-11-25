import type { ReactNode } from "react";
import { Layers, Ruler, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import DiscoverableFaq from "@/components/DiscoverableFaq";
import { COMPANY } from "@/config/company";
import { coberturas, definicaoEo, requisitos, segmentos } from "@/data/eoEngenhariaAeroportos";
import { cronologia, exemplos, modalidades, preco, restricoes } from "@/data/eoEngenhariaAnalise";
import { eoEngenhariaFaq } from "@/data/eoEngenhariaFaq";

const topicos = {
  produto: "Definição", contrato: "Contrato", segmentos: "Atividades", coberturas: "Coberturas", exemplos: "Exemplos", exclusoes: "Exclusões", comparativo: "Comparativo", retroatividade: "Datas e prazos", preco: "Preço", faq: "Perguntas frequentes", referencias: "Fontes e autoria",
} as const;
const largura = "mx-auto w-full max-w-7xl px-5 sm:px-8";
const link = "inline-flex min-h-11 items-center rounded-sm font-semibold text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4";
const nota = "max-w-4xl border-l-4 border-primary bg-slate-100 px-5 py-4 text-slate-800";

function Secao({ id, titulo, children, alternada = false }: { id: keyof typeof topicos; titulo: string; children: ReactNode; alternada?: boolean }) {
  return <section aria-labelledby={`${id}-heading`} className={alternada ? "border-t border-border bg-slate-50" : "border-t border-border bg-white"}>
    <div className={`${largura} py-12 lg:py-16`}>
      <h2 id={`${id}-heading`} tabIndex={-1} className="mb-6 max-w-4xl text-balance text-2xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-3xl">{titulo}</h2>
      {children}
    </div>
  </section>;
}

function ListaTecnica({ itens }: { itens: ReadonlyArray<readonly [string, string]> }) {
  return <dl className="mt-6 grid gap-x-10 lg:grid-cols-2">
    {itens.map(([titulo, texto]) => <div key={titulo} className="border-t border-slate-300 py-5"><dt className="font-semibold text-slate-900">{titulo}</dt><dd className="mt-2 max-w-prose leading-relaxed text-slate-700">{texto}</dd></div>)}
  </dl>;
}

function Indice() {
  return <nav aria-label="Índice do guia de E&O Engenharia" className="border-t border-border bg-slate-50">
    <div className={`${largura} py-6`}><p className="font-semibold text-slate-900">Consultar neste guia</p>
      <ul className="mt-2 flex flex-wrap gap-x-6 text-sm">{Object.entries(topicos).map(([id, nome]) => <li key={id}><a className={link} href={`#${id}-heading`}>{nome}</a></li>)}</ul>
    </div>
  </nav>;
}

function Atividades() {
  const icons = [Ruler, Wrench, Layers];
  return <Secao id="segmentos" titulo="Quais atividades podem apresentar exposição profissional?" alternada>
    <p className="max-w-prose">A aceitação depende da análise individual do risco. Ao descrever a atividade, identifique quem projeta, quem executa e quem atesta a entrega. Empresas da mesma disciplina podem assumir responsabilidades diferentes.</p>
    {segmentos.map(({ grupo, itens }, i) => {
      const Icon = icons[i];
      return <div key={grupo} className="mt-8"><h3 className="flex items-center gap-3 text-xl font-semibold text-primary"><Icon aria-hidden="true" className="h-5 w-5 shrink-0" />{grupo}</h3>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{itens.map(([nome, risco]) => <li key={nome} className="rounded-lg border border-border border-l-[3px] border-l-primary bg-white p-5 shadow-sm">
          <h4 className="text-base font-semibold text-slate-900">{nome}</h4><p className="mt-2 text-sm leading-relaxed text-slate-700">{risco}</p>
        </li>)}</ul>
      </div>;
    })}
  </Secao>;
}

function Situacoes() {
  return <Secao id="exemplos" titulo="Seis exemplos de reclamações em serviços de engenharia" alternada>
    <p className="max-w-prose">Estas situações são hipotéticas. Não são sinistros da Patro nem decisões de seguradoras. Em cada exemplo, observe quem sofreu o prejuízo e o que está sendo cobrado.</p>
    <div className="mt-6 grid gap-5 lg:grid-cols-2">{exemplos.map(e => <article key={e.titulo} className="rounded-lg border border-border bg-white p-5 sm:p-6">
      <h3 className="text-lg font-semibold text-slate-900">{e.titulo}</h3>
      <dl className="mt-4 space-y-3 text-sm">{[["Serviço executado", e.servico], ["Possível falha", e.falha], ["Reclamação do terceiro", e.reclamacao], ["Se houver cobertura", e.analise]].map(([termo, texto]) => <div key={termo}><dt className="font-semibold text-primary">{termo}</dt><dd className="mt-1 leading-relaxed text-slate-700">{texto}</dd></div>)}</dl>
    </article>)}</div>
  </Secao>;
}

function Comparativo() {
  const colunas = ["Modalidade", "Finalidade principal", "Risco relacionado", "Possível cobertura", "Limitação", "Quando complementar"];
  return <Secao id="comparativo" titulo="Qual modalidade responde a qual risco?" alternada>
    <p className="max-w-prose">Uma modalidade não substitui automaticamente a outra. Para o mesmo contrato, distinga o dano à obra, a responsabilidade pela operação, o erro profissional e a obrigação de entregar o que foi prometido.</p>
    <p id="eo-instrucao-tabela" className="mt-4 text-sm text-slate-600 lg:sr-only">Deslize a tabela para os lados. No teclado, foque a tabela e use as setas.</p>
    <div role="region" aria-label="Comparação de seis modalidades de seguro" aria-describedby="eo-instrucao-tabela" tabIndex={0} className="mt-3 max-w-full overflow-x-auto rounded-lg border border-border bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
      <table className="w-full min-w-[64rem] table-fixed border-collapse text-left text-sm"><caption className="sr-only">Finalidade, risco, cobertura, limitação e complemento de cada modalidade</caption>
        <thead className="bg-[#112c49] text-white"><tr>{colunas.map(c => <th key={c} scope="col" className="px-4 py-4 align-top font-semibold">{c}</th>)}</tr></thead>
        <tbody>{modalidades.map(([nome, ...celulas]) => <tr key={nome} className="border-t border-border even:bg-slate-50"><th scope="row" className="px-4 py-4 align-top font-semibold text-primary">{nome}</th>{celulas.map((c, i) => <td key={colunas[i + 1]} className="px-4 py-4 align-top leading-relaxed text-slate-700">{c}</td>)}</tr>)}</tbody>
      </table>
    </div>
  </Secao>;
}

function Fontes() {
  const fontes = [
    ["SUSEP · Seguros de responsabilidade civil", "https://www.gov.br/susep/pt-br", "No portal da Superintendência de Seguros Privados, procure a Circular SUSEP nº 637/2021 e confira o texto vigente e eventuais alterações. Ela trata das regras de operação do grupo de responsabilidades."],
    ["SUSEP · Consulta pública de produtos", "https://www2.susep.gov.br/safe/menumercado/REP2/Produto.aspx", "Use o número do processo SUSEP informado pela seguradora para localizar o produto. Confronte a versão das condições gerais de RC Profissional com as condições especiais, particulares e os endossos da proposta em análise."],
    ["GRU Airport · Portal oficial", "https://www.gru.com.br/pt", "Consulte a documentação pública de credenciamento e as orientações aos prestadores. Para limites e seguros da sua contratação, peça à administradora o edital, os anexos e a minuta aplicáveis. A página institucional não comprova uma obrigação universal de E&O."],
    ["Lei nº 15.040/2024 · Contrato de seguro", "https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2024/lei/l15040.htm", "Texto legal sobre o contrato de seguro, inclusive o de responsabilidade civil. Para contratos ou fatos anteriores, é preciso verificar a legislação aplicável no tempo."],
    ["Lei nº 6.496/1977 · Responsabilidade técnica e ART", "https://www.planalto.gov.br/ccivil_03/leis/l6496.htm", "Base legal da Anotação de Responsabilidade Técnica. O registro identifica o responsável pelo serviço e tem função distinta da cobertura securitária."],
    ["Lei nº 12.378/2010 · Arquitetura e RRT", "https://www.planalto.gov.br/ccivil_03/_ato2007-2010/2010/lei/l12378.htm", "Consulte, em especial, os dispositivos sobre o Registro de Responsabilidade Técnica em arquitetura e urbanismo."],
  ];
  return <Secao id="referencias" titulo="Fontes para conferência e responsabilidade editorial" alternada>
    <ul className="grid gap-x-10 lg:grid-cols-2">{fontes.map(([nome, url, uso]) => <li key={url} className="border-t border-border py-3"><a className={link} href={url}>{nome}</a><p className="max-w-prose text-sm leading-relaxed text-slate-700">{uso}</p></li>)}</ul>
    <aside className="mt-6 max-w-4xl rounded-lg border border-border bg-white p-5"><h3 className="text-lg font-semibold">Autoria e revisão técnica</h3><p className="mt-2 text-sm">Texto elaborado com assistência de inteligência artificial para publicação no site da {COMPANY.razaoSocial}. Não há revisão técnica humana assinada para esta versão. O guia orienta a leitura dos documentos; não é parecer jurídico nem confirmação de cobertura de um contrato específico.</p><Link to="/sobre" className={link}>Conheça a corretora responsável pelo site</Link></aside>
  </Secao>;
}

export default function EoEngenhariaGuia() {
  return <>
    <Indice />
    <Secao id="produto" titulo="O que é o Seguro E&O Engenharia para Aeroportos?">
      <p className="max-w-prose text-lg leading-relaxed text-slate-900">{definicaoEo}</p>
      <div className="mt-5 max-w-prose space-y-4 text-slate-700"><p><span lang="en">Errors and Omissions</span> significa erros e omissões. Um erro pode ser adotar a carga errada em um cálculo. Uma omissão pode ser deixar de apontar, no laudo, uma limitação que o profissional tinha o dever de registrar. A responsabilidade civil profissional diz respeito ao dever de reparar o dano causado ao terceiro no exercício dessa atividade.</p>
      <p>Uma reclamação é uma alegação, não uma conclusão de culpa. Por isso, a análise das despesas de defesa é distinta da análise da indenização. Para esta última, importam a responsabilidade atribuída, o prejuízo demonstrado e sua relação com o serviço segurado.</p>
      <p>Uma concessionária pode solicitar E&O porque decisões técnicas da contratada afetam outras equipes, instalações e cronogramas. A cláusula de seguro define a proteção financeira que a contratante quer comprovar antes da mobilização ou manter após a entrega.</p></div>
    </Secao>
    <Secao id="contrato" titulo="O que as concessionárias aeroportuárias podem exigir das empresas contratadas?">
      <div className={nota}><p className="font-semibold">Ter uma apólice de E&O não significa automaticamente atender às exigências do contrato.</p><p className="mt-2">Compare a atividade profissional, o ambiente aeroportuário e cada exigência contratual com as condições do seguro. Registre as diferenças antes de apresentar o comprovante à contratante.</p></div>
      <h3 className="mt-8 text-xl font-semibold">De onde vem a exigência?</h3><div className="mt-3 max-w-prose space-y-3"><p><strong>Contrato:</strong> edital, minuta e anexos definem o compromisso entre as partes para aquele serviço. Não se pode concluir que todos os fornecedores da GRU Airport tenham a mesma obrigação.</p><p><strong>Lei e regulação:</strong> a lei estabelece obrigações legais; normas de autoridades competentes detalham requisitos regulatórios conforme a atividade. As regras que disciplinam um produto de seguro não obrigam, por si, toda prestadora a comprá-lo.</p><p><strong>Credenciamento:</strong> autorizações de acesso, identificação e habilitação de equipes seguem procedimentos próprios. Um crachá não atesta suficiência do seguro, e a apólice não autoriza ingresso em área restrita.</p></div>
      <h3 className="mt-8 text-xl font-semibold">Como conferir a cláusula, item a item</h3><ListaTecnica itens={requisitos} />
    </Secao>
    <Atividades />
    <Secao id="coberturas" titulo="Quais coberturas podem compor o E&O Engenharia?"><p className="max-w-prose">Leia a definição de serviço profissional antes da lista de garantias. A descrição abaixo apresenta possibilidades de mercado; coberturas adicionais precisam constar da contratação.</p><ListaTecnica itens={coberturas} /></Secao>
    <Situacoes />
    <Secao id="exclusoes" titulo="Exclusões e limitações que merecem leitura antes da assinatura"><aside className={nota}><p className="font-semibold">Procure no texto da apólice: aeroportos, aviação, aeronaves, infraestrutura crítica e atividades em áreas restritas.</p><p className="mt-2">Uma exclusão pode se referir ao local, ao bem atingido ou à natureza da operação. Informe se o serviço ocorre em um escritório fora do sítio aeroportuário, no terminal ou em área operacional. Se a redação for ambígua, solicite esclarecimento por escrito e, se necessário e aceito, endosso.</p></aside><p className="mt-5 max-w-prose">As exclusões variam conforme o produto contratado. Confira as condições gerais e também as restrições particulares aplicadas ao seu risco.</p><ListaTecnica itens={restricoes} /></Secao>
    <Comparativo />
    <Datas />
    <Secao id="preco" titulo="O que influencia o preço do E&O Engenharia?" alternada><p className="max-w-prose">A seguradora precifica as responsabilidades assumidas pela empresa, não apenas sua categoria profissional. Uma proposta para elaborar laudos fora do aeroporto pode ser diferente de outra que inclua supervisão em campo.</p><ListaTecnica itens={preco} /></Secao>
    <Secao id="faq" titulo="Perguntas frequentes sobre E&O Engenharia para Aeroportos"><div className="max-w-4xl"><DiscoverableFaq items={eoEngenhariaFaq} idPrefix="eo-pergunta" /></div><a href="#inicio" className={`${link} mt-5`}>Voltar às opções de cotação e análise de cláusula</a></Secao>
    <Fontes />
  </>;
}

function Datas() {
  return <Secao id="retroatividade" titulo="Retroatividade e claims made: qual data conta?">
    <p className="max-w-prose">Na apólice à base de reclamações (<span lang="en">claims made</span>), localize dois marcos: quando o profissional praticou o ato e quando o terceiro apresentou a primeira reclamação contra o segurado. Compare-os com a data retroativa, a vigência e as regras de aviso. A data da reclamação, por si só, não garante cobertura.</p>
    <figure className="mt-8 rounded-lg border border-border bg-slate-50 p-5 sm:p-8"><figcaption className="mb-6 font-semibold text-primary">Leitura de um projeto ao longo do tempo · datas fictícias</figcaption>
      <ol className="ml-2 border-l-2 border-slate-300">{cronologia.map(([iso, data, titulo, texto]) => <li key={iso} className="relative pl-6 pb-6 last:pb-0"><span aria-hidden="true" className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full border-2 border-primary bg-white" /><time dateTime={iso} className="text-sm font-medium text-slate-600">{data}</time><p className="mt-1 font-semibold text-primary">{titulo}</p><p className="mt-1 max-w-prose text-sm leading-relaxed text-slate-700">{texto}</p></li>)}</ol>
    </figure>
    <ListaTecnica itens={[["Notificação de circunstância", "Quando prevista, permite relatar um fato concreto ainda sem pedido de indenização. Uma reclamação futura relacionada poderá ser vinculada à apólice notificada conforme a cláusula. Respeite o prazo, o canal e as informações exigidas; uma comunicação genérica pode não produzir esse efeito."], ["Prazo complementar e suplementar", "São janelas para apresentação de reclamações por atos anteriores ao término da vigência, nas hipóteses do produto. Confira quando o complementar é concedido sem prêmio adicional. O suplementar, se oferecido, pode depender de solicitação e pagamento para estender essa janela."], ["Continuidade entre renovações", "Compare a data retroativa e as condições na renovação ou troca de seguradora. Uma lacuna de vigência ou um novo marco retroativo pode deixar descoberto um serviço antigo, mesmo que a empresa tenha contratado seguro novamente."]]} />
  </Secao>;
}
