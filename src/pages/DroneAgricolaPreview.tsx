import { Link, useLocation } from "react-router-dom";
import Header from "@/components/Header";
import PageMeta from "@/components/PageMeta";
import ProductQuoteForm from "@/components/ProductQuoteForm";
import CookieBanner from "@/components/CookieBanner";
import DroneAgricolaClosing from "@/components/DroneAgricolaClosing";
import NotFound from "@/pages/NotFound";
import { EMPRESA, WHATSAPP_URL_BASE } from "@/config/empresa";
import { trackWhatsAppClick } from "@/lib/tracking";
import droneImage from "@/assets/blog-generated/drone-agricola-anac-seguro-rcf-pulverizacao.webp";
import { DRONE_PREVIEW_PATH, RETA_PREVIEW_PATH, isDronePreviewHost, droneQuoteFields, droneComparison, droneTopics, retaAgricolaTopics } from "@/data/droneAgricolaPreview";
import "@/styles/drone-preview.css";

const action = "inline-flex min-h-12 items-center justify-center rounded-md px-5 py-3 text-center font-semibold";

export default function DroneAgricolaPreview() {
  const { pathname } = useLocation();
  if (typeof window === "undefined" || !isDronePreviewHost(window.location.hostname)) return <NotFound />;
  const reta = pathname === RETA_PREVIEW_PATH;
  const title = reta ? "RETA para drones agrícolas" : "Seguro para drones agrícolas";
  const message = reta
    ? "Olá, Patro! Quero avaliar RETA para meu drone agrícola, usado em pulverização ou mapeamento agrícola."
    : "Olá, Patro! Quero cotar meu drone agrícola e avaliar casco, baterias, acessórios e RETA para minha operação no campo.";
  const whatsapp = `${WHATSAPP_URL_BASE}?text=${encodeURIComponent(message)}`;
  const topics = reta ? retaAgricolaTopics : droneTopics;
  const formName = reta ? "RETA para drone agrícola" : "Drone agrícola";
  const waClick = () => trackWhatsAppClick("drone-agricola-previa", { origin: "previa-drone", insuranceType: formName });

  return <div className="drone-preview-shell bg-background text-foreground">
    <PageMeta title={`${title} | Patro Seguros`} absoluteTitle noindex skipBreadcrumb canonicalPath={pathname}
      description={reta ? "Avalie RETA para drones agrícolas: responsabilidade por danos a terceiros, limites e cuidados com pulverização e deriva. Atendimento nacional da Patro." : "Analise casco e RETA para drones agrícolas, baterias e acessórios. Cotação com a Patro para produtores e prestadores em todo o Brasil."}
      ogImage={droneImage} ogImageAlt="Drone agrícola em atividade no campo" />
    <div className="drone-preview-header"><Header /></div>
    <aside className="border-b bg-secondary px-4 py-3 text-sm" aria-label="Versão para aprovação">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2">
        <p><strong>Prévia para aprovação.</strong> As páginas atuais não foram substituídas.</p>
        <nav aria-label="Páginas da prévia" className="flex flex-wrap gap-4">
          <Link to={DRONE_PREVIEW_PATH} aria-current={!reta ? "page" : undefined}>Página principal</Link>
          <Link to={RETA_PREVIEW_PATH} aria-current={reta ? "page" : undefined}>Página RETA</Link>
        </nav>
      </div>
    </aside>
    <main id="main-content" className="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
      <section aria-labelledby="drone-title" className="grid items-center gap-8 py-8 md:grid-cols-2 md:py-12">
        <div>
          <p className="mb-3 font-medium text-muted-foreground">Agronegócio · Atendimento em todo o Brasil</p>
          <h1 id="drone-title" className="text-4xl leading-tight md:text-5xl">{title}</h1>
          <p className="mt-5 text-lg">{reta ? "Analise a responsabilidade por danos a terceiros na operação agrícola. Orientação para produtores, prestadores de pulverização e mapeamento, cooperativas e empresas." : "Analise a proteção do seu drone, baterias e acessórios e as responsabilidades da operação agrícola. Atendimento em todo o Brasil para produtores e prestadores de serviços."}</p>
          <div className="mt-6 flex flex-col items-stretch gap-3 sm:items-start">
            <a className={`${action} bg-cta text-cta-foreground hover:opacity-90`} href="#cotacao-drone">{reta ? "Avaliar RETA do drone" : "Cotar meu drone agrícola"}</a>
            <a className={`${action} border border-primary text-primary hover:bg-secondary`} href={whatsapp} target="_blank" rel="noopener noreferrer" onClick={waClick}>Falar com a Patro no WhatsApp</a>
          </div>
        </div>
        <img src={droneImage} alt="Drone agrícola em operação sobre uma lavoura" width={768} height={512} loading="eager" fetchPriority="high" className="aspect-[3/2] w-full rounded-xl object-cover" />
      </section>
      <nav aria-label="Nesta página" className="flex flex-wrap gap-x-6 gap-y-2 border-y py-3 text-sm font-semibold">
        <a href="#protecao-drone">Casco e RETA</a><a href="#cotacao-drone">Cotação</a><a href="#comparacao-drone">Comparativo</a><a href="#cuidados-drone">{reta ? "Operação agrícola" : "Riscos no campo"}</a><a href="#perguntas-drone">Perguntas frequentes</a>
      </nav>
      <section id="protecao-drone" aria-labelledby="protecao-title" className="py-8">
        <h2 id="protecao-title" className="mb-5 text-2xl md:text-3xl">Duas proteções, finalidades diferentes</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <article className="flex flex-col rounded-xl border border-primary/30 p-6">
            <h3 className="text-xl">Casco — proteção do equipamento</h3>
            <p className="mb-5 mt-3">Trata dos danos ao próprio drone nos eventos contratados. Inclua na análise baterias, controles, sensores, tanques e demais acessórios, com seus valores e condições de uso.</p>
            <Link to={reta ? `${DRONE_PREVIEW_PATH}#cotacao-drone` : "#cotacao-drone"} className={`${action} mt-auto bg-primary text-primary-foreground`}>Cotar casco do drone</Link>
          </article>
          <article className="flex flex-col rounded-xl border border-primary/30 p-6">
            <h3 className="text-xl">RETA — responsabilidade civil aeronáutica</h3>
            <p className="mb-5 mt-3">Trata da responsabilidade por danos a terceiros, conforme os limites e condições contratados. Não é a proteção do próprio drone.</p>
            <a href="#cotacao-drone" className={`${action} mt-auto border border-primary text-primary`}>Avaliar RETA do drone</a>
          </article>
        </div>
        <p className="mt-4 rounded-md border-l-4 border-accent bg-secondary p-4 font-medium">Casco e RETA têm finalidades diferentes. A responsabilidade pela pulverização e por deriva exige análise específica.</p>
      </section>
      <section id="cotacao-drone" aria-labelledby="cotacao-title" className="grid gap-6 border-t py-8 md:grid-cols-[0.8fr_1.2fr]">
        <div>
          <h2 id="cotacao-title" className="text-2xl md:text-3xl">Vamos entender sua operação?</h2>
          <p className="mt-4">Nome, WhatsApp e autorização para contato são suficientes para começar. Os detalhes do equipamento são opcionais.</p>
          <p className="mt-3 text-muted-foreground">Sem CPF, nota fiscal ou envio de arquivos nesta etapa. Nossa equipe solicitará a documentação necessária na sequência.</p>
          <p className="mt-4 text-sm">Esta prévia usa o atendimento real da Patro. Ao enviar, sua solicitação será encaminhada à equipe.</p>
        </div>
        <ProductQuoteForm key={pathname} compactContact productName={formName} productPath={reta ? "/seguro-reta-drone" : "/seguro-drone-agricola"} fields={droneQuoteFields} />
      </section>
      <section id="comparacao-drone" aria-labelledby="comparacao-title" className="border-t py-8">
        <h2 id="comparacao-title" className="mb-5 text-2xl md:text-3xl">Casco e RETA em uma comparação</h2>
        <div className="divide-y rounded-xl border">
          {droneComparison.map(row => <div key={row.label} className="grid gap-3 p-5 md:grid-cols-[0.65fr_1fr_1fr] md:gap-6">
            <h3 className="text-base font-semibold">{row.label}</h3>
            <p><strong className="block text-primary">Casco</strong>{row.casco}</p>
            <p><strong className="block text-primary">RETA</strong>{row.reta}</p>
          </div>)}
        </div>
        <p className="mt-4"><Link to={reta ? DRONE_PREVIEW_PATH : RETA_PREVIEW_PATH}>{reta ? "Ver a análise completa do seguro para drones agrícolas" : "Entender melhor o RETA na operação agrícola"}</Link></p>
      </section>
      <section id="cuidados-drone" aria-labelledby="cuidados-title" className="border-t py-8">
        <h2 id="cuidados-title" className="mb-6 text-2xl md:text-3xl">{reta ? "O que conferir no RETA agrícola" : "O que analisar antes de contratar"}</h2>
        <div className="grid gap-x-10 gap-y-7 md:grid-cols-2">{topics.map(topic => <article key={topic.title}><h3 className="text-xl">{topic.title}</h3><p className="mt-2">{topic.text}</p></article>)}</div>
      </section>
      <DroneAgricolaClosing reta={reta} whatsapp={whatsapp} onWhatsAppClick={waClick} />
    </main>
    <footer className="border-t bg-secondary px-4 py-8">
      <div className="mx-auto max-w-6xl"><p className="font-semibold">{EMPRESA.razaoSocial}</p><p className="mt-2 text-sm">CNPJ {EMPRESA.cnpj} · Registro SUSEP {EMPRESA.susep}</p><p className="mt-3"><Link to="/contato">Contato</Link> · <Link to="/politica-privacidade">Política de Privacidade</Link></p></div>
      <div className="drone-preview-cookies"><CookieBanner /></div>
    </footer>
  </div>;
}
