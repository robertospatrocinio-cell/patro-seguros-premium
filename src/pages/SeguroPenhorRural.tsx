import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, FileCheck2, Tractor } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import Breadcrumb from "@/components/Breadcrumb";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import ServiceSchema from "@/components/ServiceSchema";
import FAQBlock from "@/components/FAQBlock";
import StickyQuoteBar from "@/components/StickyQuoteBar";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { trackWhatsAppClick } from "@/lib/tracking";

const description = "Seguro Penhor Rural para máquinas e equipamentos vinculados ao crédito rural. Atendimento nacional e apoio a produtores e concessionárias. Consulte a Patro.";
const message = "Olá! Quero cotar Seguro Penhor Rural com a Patro. Preciso analisar uma máquina ou equipamento vinculado a financiamento rural.";
const whatsapp = buildWhatsAppLink({ origem: "seguro-penhor-rural", produto: "Seguro Penhor Rural", mensagem: message });
const faqs = [
  { question: "O que é Seguro Penhor Rural?", answer: "É uma modalidade de seguro rural destinada a proteger bens vinculados como garantia a operações de crédito rural contra riscos previstos na apólice. Pode envolver máquinas, equipamentos, produtos e outros bens elegíveis, conforme a operação e a aceitação da seguradora. Não se limita a grãos armazenados e não é um seguro que paga parcelas em atraso." },
  { question: "Qual a diferença entre penhor rural e Seguro Penhor Rural?", answer: "O penhor é a garantia constituída na operação de crédito. O seguro protege o bem vinculado a essa operação contra eventos contratados. A constituição da garantia, a exigência de seguro e a destinação de eventual indenização devem ser conferidas no contrato de financiamento e na apólice." },
  { question: "Tratores e colheitadeiras financiados podem ter Seguro Penhor Rural?", answer: "Podem, conforme o enquadramento do financiamento, o bem oferecido em garantia e a aceitação da seguradora. A Patro analisa modelo, ano, valor, uso e documentos do crédito para avaliar a modalidade e as condições adequadas. Nem todo financiamento de máquina é automaticamente uma operação de penhor rural." },
  { question: "Quem recebe a indenização de uma máquina financiada?", answer: "Depende da cláusula beneficiária e das condições do financiamento. A instituição credora pode ter direito à indenização até o limite do seu interesse, conforme os documentos e o saldo devedor. Não se deve presumir pagamento integral ao produtor ou quitação automática da dívida." },
  { question: "O banco precisa aceitar a apólice?", answer: "A proposta deve ser confrontada com as exigências documentadas pelo banco ou cooperativa: identificação do credor, bens, valores, coberturas e vigência. A Patro apoia essa conferência; a contratação depende da aceitação da seguradora e do cumprimento dos requisitos da operação, sem promessa de liberação do crédito." },
  { question: "Qual a diferença para o seguro de máquinas agrícolas?", answer: "O seguro de máquinas agrícolas protege o equipamento conforme o uso e as coberturas contratadas, inclusive quando não há financiamento. No Seguro Penhor Rural, o vínculo do bem com o crédito rural e as exigências do credor são parte central da análise. O nome comercial sozinho não demonstra que uma apólice atende ao contrato." },
  { question: "Um drone agrícola financiado pode entrar nessa análise?", answer: "Sim, podemos analisar o financiamento e a aceitação do equipamento, sem presumir enquadramento automático. A cobertura de casco do drone e a responsabilidade civil aeronáutica, como RETA quando aplicável, exigem avaliação própria. Danos por pulverização ou deriva não devem ser considerados cobertos sem previsão expressa." },
  { question: "Quanto custa o Seguro Penhor Rural?", answer: "O preço depende do valor e das características do bem, município de operação, uso, coberturas, franquias, histórico de sinistros e exigências do financiamento. Não existe uma taxa única para todo produtor. Compare propostas com os mesmos limites e condições, não apenas pelo prêmio." },
  { question: "A Patro atende produtores e concessionárias em todo o Brasil?", answer: "Sim. A Patro tem sede em Guarulhos/SP e atendimento nacional a produtores, cooperativas, prestadores de serviços e concessionárias. A troca de informações e o acompanhamento podem ser digitais; vistorias e regulação seguem os procedimentos da seguradora e podem exigir presença no local." },
];

const SeguroPenhorRural = () => (
  <>
    <PageMeta title="Seguro Penhor Rural para Máquinas | Patro Seguros" description={description} absoluteTitle skipBreadcrumb />
    <ServiceSchema name="Seguro Penhor Rural" description={description} serviceType="Seguro rural de bens vinculados a operações de crédito rural" scope="national" />
    <BreadcrumbSchema items={[{ name: "Início", url: "/" }, { name: "Seguro Agro", url: "/seguro-agro" }, { name: "Seguro Penhor Rural", url: "/seguro-penhor-rural" }]} />
    <Header />
    <main id="main-content" className="bg-background text-foreground">
      <div className="container mx-auto px-4 py-5">
        <Breadcrumb items={[{ label: "Seguro Agro", href: "/seguro-agro" }, { label: "Seguro Penhor Rural", href: "/seguro-penhor-rural" }]} />
      </div>
      <section className="border-y border-border bg-primary/5 py-12 md:py-20">
        <div className="container mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div>
            <p className="mb-4 font-semibold text-primary">Especialistas no agro · Atendimento nacional</p>
            <h1 className="text-3xl font-bold leading-tight md:text-5xl">Seguro Penhor Rural para máquinas e equipamentos agrícolas</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">Sua máquina movimenta a produção e pode garantir o financiamento. A Patro ajuda a alinhar a proteção do bem às exigências do crédito rural, da compra na concessionária à renovação da apólice.</p>
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick("penhor-rural:hero")} className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">Cotar Seguro Penhor Rural <ArrowRight className="h-5 w-5" aria-hidden="true" /></a>
            <p className="mt-3 text-sm text-muted-foreground">Análise individual. Cobertura somente após aceitação e início da vigência.</p>
          </div>
          <aside className="rounded-xl border border-border bg-card p-6 md:p-8" aria-labelledby="analise-penhor">
            <FileCheck2 className="mb-4 h-9 w-9 text-primary" aria-hidden="true" />
            <h2 id="analise-penhor" className="text-xl font-bold">O que conferimos antes da contratação</h2>
            <ul className="mt-5 space-y-4">
              {["O bem, seu valor e o uso real no campo", "O contrato e as exigências do banco ou cooperativa", "Coberturas, franquias, vigência e beneficiário", "Documentação e eventuais vistorias exigidas"].map(item => <li key={item} className="flex gap-3 text-sm leading-relaxed"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />{item}</li>)}
            </ul>
          </aside>
        </div>
      </section>
      <nav aria-label="Nesta página" className="container mx-auto flex max-w-6xl flex-wrap gap-x-6 gap-y-2 px-4 py-5 text-sm">
        {[["O que é", "o-que-e"], ["Coberturas", "coberturas"], ["Documentos e contratação", "documentos"], ["Atendimento nacional", "atendimento"], ["Dúvidas", "duvidas"]].map(([label, id]) => <a key={id} href={`#${id}`} className="inline-flex min-h-11 items-center text-primary underline underline-offset-4">{label}</a>)}
      </nav>
      <section id="o-que-e" className="container mx-auto max-w-6xl scroll-mt-28 px-4 py-12">
        <h2 className="text-2xl font-bold md:text-3xl">O seguro protege o bem; o penhor é a garantia do crédito</h2>
        <p className="mt-5 max-w-3xl leading-relaxed text-muted-foreground">O Seguro Penhor Rural protege bens vinculados a operações de crédito rural contra riscos expressamente contratados. Pode incluir tratores, colheitadeiras, pulverizadores, implementos e outros bens aceitos. Não se restringe ao estoque de grãos, não substitui o seguro da lavoura e não cobre automaticamente inadimplência.</p>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {[
            ["Máquinas vinculadas ao crédito", "Na aquisição ou renovação, conferimos identificação, número de série, valor segurado e interesse do credor. A modalidade depende do enquadramento da operação, não apenas de a máquina ser financiada."],
            ["Máquinas sem financiamento", "Se não há vínculo com crédito rural, avaliamos o seguro de máquinas e equipamentos agrícolas conforme sua atividade. Não é necessário contratar penhor rural apenas porque o uso é no campo."],
            ["Drones e outros equipamentos", "Drones de pulverização e mapeamento precisam de análise específica. Casco, responsabilidade civil e exigências do financiamento não são a mesma cobertura."],
          ].map(([title, text]) => <div key={title} className="border-t-2 border-primary/30 pt-5"><h3 className="text-lg font-semibold">{title}</h3><p className="mt-3 leading-relaxed text-muted-foreground">{text}</p></div>)}
        </div>
        <div className="mt-6 flex flex-wrap gap-4 text-primary underline underline-offset-4"><Link className="py-2" to="/seguro-maquinas-agricolas">Seguro de máquinas agrícolas</Link><Link className="py-2" to="/seguro-equipamentos-agricolas">Seguro de equipamentos agrícolas</Link><Link className="py-2" to="/seguro-drone-agricola">Seguro de drone agrícola</Link><Link className="py-2" to="/seguro-reta-drone">RETA para drones</Link></div>
      </section>
      <section id="coberturas" className="scroll-mt-28 border-y border-border bg-muted/30 py-12">
        <div className="container mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2">
          <div><h2 className="text-2xl font-bold">Coberturas que precisam ser conferidas</h2><p className="mt-4 leading-relaxed text-muted-foreground">Incêndio, raio, explosão, roubo, furto qualificado, colisão, tombamento e danos elétricos podem ser avaliados conforme o produto. Transporte entre propriedades, prestação de serviços e operação em áreas de terceiros precisam estar declarados e previstos na apólice.</p><p className="mt-4 leading-relaxed text-muted-foreground">Cada evento tem condições, limites e franquias. Uma exigência do financiamento não torna a cobertura automaticamente disponível na seguradora.</p></div>
          <div><h2 className="text-2xl font-bold">O que não se deve presumir coberto</h2><ul className="mt-4 list-disc space-y-3 pl-5 text-muted-foreground"><li>Desgaste, manutenção e defeito mecânico sem evento coberto.</li><li>Lucros cessantes ou perda de produção pela máquina parada.</li><li>Danos a terceiros, deriva de pulverização ou danos ambientais sem cobertura específica.</li><li>Quitação integral do financiamento em qualquer sinistro.</li><li>Equipamentos, acessórios ou locais não declarados.</li></ul></div>
        </div>
      </section>
      <section id="documentos" className="container mx-auto max-w-6xl scroll-mt-28 px-4 py-12">
        <h2 className="text-2xl font-bold md:text-3xl">Como cotar uma máquina vinculada ao crédito rural</h2>
        <ol className="mt-8 grid gap-8 md:grid-cols-3">
          {[
            ["1. Identifique o bem e a operação", "Informe marca, modelo, ano, número de série, valor e município/UF de operação. Descreva se a máquina trabalha em área própria, arrendada ou prestando serviços."],
            ["2. Confira os documentos", "Separe nota fiscal ou documento do equipamento, dados do proponente, contrato do financiamento e exigências do credor. Para renovação, tenha a apólice atual. Envie documentos somente pelo canal de atendimento confirmado."],
            ["3. Compare antes de contratar", "Analisamos propostas, franquias, exclusões, vigência e cláusula beneficiária. A emissão depende da análise da seguradora e, quando exigido, de vistoria. A cotação não inicia a cobertura."],
          ].map(([title, text]) => <li key={title}><h3 className="text-lg font-semibold">{title}</h3><p className="mt-3 leading-relaxed text-muted-foreground">{text}</p></li>)}
        </ol>
        <div className="mt-10 rounded-xl border border-border bg-card p-6">
          <h3 className="text-xl font-semibold">Exemplo ilustrativo: colheitadeira financiada</h3>
          <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">Antes da entrega, o produtor apresenta a nota fiscal e as condições do financiamento. A análise verifica se a apólice identifica corretamente a colheitadeira, o credor e a atividade. Se houver um tombamento, a indenização dependerá de cobertura contratada, apuração do sinistro, franquia e cláusula beneficiária — não de uma promessa genérica de quitação.</p>
        </div>
      </section>
      <section id="atendimento" className="scroll-mt-28 bg-primary/5 py-12">
        <div className="container mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2">
          <div>
            <Tractor className="mb-4 h-8 w-8 text-primary" aria-hidden="true" />
            <h2 className="text-2xl font-bold">Produtor e concessionária na mesma análise</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">Somos especialistas em máquinas e equipamentos agrícolas e mantemos parceria com a rede de concessionárias dos principais fabricantes. Esse relacionamento ajuda a organizar informações técnicas do bem e as necessidades do produtor na compra, no financiamento e na renovação.</p>
            <p className="mt-4 leading-relaxed text-muted-foreground">A concessionária pode apoiar o levantamento dos dados; a aceitação do risco continua sendo da seguradora. Não anunciamos representação exclusiva de fabricantes nem aprovação garantida pelo banco.</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold">Atendimento às regiões agrícolas do Brasil</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">Atendemos o Centro-Oeste, incluindo Mato Grosso, Mato Grosso do Sul e Goiás; o Sul, com Paraná, Santa Catarina e Rio Grande do Sul; Minas Gerais e o interior de São Paulo; e as regiões produtoras de Bahia, Maranhão, Piauí e Tocantins, além dos demais estados.</p>
            <p className="mt-4 leading-relaxed text-muted-foreground">A sede da Patro é em Guarulhos/SP, mas a análise considera onde o equipamento realmente opera. Atendimento digital não dispensa eventuais vistorias presenciais nem significa aceitação automática de qualquer atividade.</p>
            <Link to="/atendimento-nacional" className="mt-4 inline-flex min-h-11 items-center text-primary underline underline-offset-4">Conheça nosso atendimento nacional</Link>
          </div>
        </div>
      </section>
      <div id="duvidas" className="scroll-mt-28">
        <FAQBlock title="Dúvidas sobre Seguro Penhor Rural" items={faqs} headingId="faq-penhor-heading" className="py-12" />
      </div>
      <section id="solicitar-cotacao" className="container mx-auto max-w-4xl scroll-mt-28 px-4 pb-24 pt-8 text-center">
        <h2 className="text-2xl font-bold">Vai financiar, retirar ou renovar o seguro da máquina?</h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">Comece informando o equipamento, o município de operação e se existe financiamento. Nossa equipe orienta os próximos documentos e a análise das alternativas.</p>
        <Link to="/blog/seguro-penhor-rural-maquinas-financiadas" className="mt-4 inline-flex min-h-11 items-center text-primary underline underline-offset-4">Leia o guia de Penhor Rural para máquinas financiadas e tire suas dúvidas</Link>
        <a href={whatsapp} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick("penhor-rural:final")} className="mt-6 inline-flex min-h-12 items-center justify-center rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">Falar com especialista em Penhor Rural</a>
        <div className="mt-8 flex flex-wrap justify-center gap-5 text-sm text-primary underline underline-offset-4"><Link className="py-2" to="/seguro-agro">Todas as soluções Agro</Link><Link className="py-2" to="/verificar-susep">Como verificar a corretora na SUSEP</Link><a className="py-2" href="https://www.gov.br/susep/pt-br" target="_blank" rel="noopener noreferrer">Informações oficiais da SUSEP</a></div>
      </section>
    </main>
    <Footer />
    <StickyQuoteBar source="seguro-penhor-rural" quoteHref="/cotacao?tipo=agro" whatsappMessage={message} ctaLabel="Solicitar cotação" />
  </>
);

export default SeguroPenhorRural;
