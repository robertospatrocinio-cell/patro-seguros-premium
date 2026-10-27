import { Link, useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import Breadcrumb from "@/components/Breadcrumb";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import InsuranceEditorialLinks from "@/components/InsuranceEditorialLinks";
import NotFound from "@/pages/NotFound";
import { Button } from "@/components/ui/button";
import { insuranceEditorials, INSURANCE_EDITORIALS_PATH } from "@/data/insuranceEditorials";


export default function InsuranceEditorial() {
  const { pathname } = useLocation();
  const path = pathname.replace(/\/+$/, "");
  const isHub = path === INSURANCE_EDITORIALS_PATH;
  const article = insuranceEditorials.find((item) => item.path === path);
  if (!isHub && !article) return <NotFound />;

  const title = article?.title ?? "Artigos sobre seguros por modalidade";
  const description = article?.description ?? "Entenda vida e sucessão, auto, residencial, empresarial, RC profissional, máquinas, drones e viagem com artigos para orientar sua escolha de seguro.";
  const breadcrumbs = [
    { label: "Todos os seguros", href: "/todos-os-seguros" },
    { label: "Artigos sobre seguros", href: INSURANCE_EDITORIALS_PATH },
    ...(article ? [{ label: article.modality, href: article.path }] : []),
  ];

  return (
    <>
      <PageMeta title={title} description={description} canonicalPath={path} ogType={article ? "article" : "website"} skipBreadcrumb />
      <BreadcrumbSchema items={[{ name: "Início", url: "/" }, ...breadcrumbs.map((item) => ({ name: item.label, url: item.href }))]} />
      <Header />
      <main id="main-content" className="outline-none">
        <section className="bg-primary/5 pb-12 pt-10">
          <div className="container mx-auto max-w-6xl px-4">
            <Breadcrumb items={breadcrumbs} />
            <div className="mt-8 max-w-3xl">
              <h1 className="text-3xl font-bold leading-tight md:text-5xl">{title}</h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                {article?.intro ?? "Antes de comparar propostas, entenda o papel de cada proteção. Explore aplicações práticas, diferenças entre coberturas e os cuidados que ajudam a evitar surpresas na contratação."}
              </p>
              {article && (
                <Button asChild variant="outline" className="mt-6 h-auto min-h-11 whitespace-normal">
                  <Link to={article.productPath}>Ver coberturas e cotação de {article.modality}</Link>
                </Button>
              )}
            </div>
          </div>
        </section>
        {article ? (
          <div className="container mx-auto grid max-w-6xl gap-10 px-4 py-12 lg:grid-cols-[minmax(0,1fr)_280px]">
            <article className="min-w-0 max-w-3xl" aria-label={title}>
              <nav aria-label="Neste artigo" className="mb-10 rounded-xl border border-border p-5">
                <h2 className="mb-3 text-lg font-bold">Neste artigo</h2>
                <ul className="space-y-1">
                  {article.sections.map((section, index) => (
                    <li key={section.title}><a href={`#topico-${index + 1}`} className="inline-flex min-h-11 items-center py-2 text-primary underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">{section.title}</a></li>
                  ))}
                </ul>
              </nav>
              {article.sections.map((section, index) => (
                <section key={section.title} id={`topico-${index + 1}`} className="mb-10 scroll-mt-28">
                  <h2 className="mb-4 text-2xl font-bold leading-snug">{section.title}</h2>
                  {section.paragraphs.map((paragraph) => <p key={paragraph} className="mb-4 text-base leading-8 text-muted-foreground">{paragraph}</p>)}
                </section>
              ))}
              <p className="border-t border-border pt-6 text-sm leading-relaxed text-muted-foreground">Conteúdo informativo da Patro Seguros. Coberturas, aceitação, limites, franquias, carências e exclusões variam por produto e seguradora. Consulte a proposta e as condições contratuais. Questões jurídicas e tributárias exigem avaliação profissional individualizada.</p>
            </article>
            <aside aria-labelledby="checklist-artigo-heading" className="min-w-0">
              <div className="rounded-xl border border-border bg-muted/30 p-6">
                <h2 id="checklist-artigo-heading" className="text-xl font-bold">Antes de contratar</h2>
                <ul className="mt-5 list-disc space-y-4 pl-5 text-sm leading-relaxed text-muted-foreground">
                  {article.checklist.map((item) => <li key={item}>{item}</li>)}
                </ul>
                <Button asChild className="mt-6 h-auto min-h-11 w-full whitespace-normal"><Link to={article.productPath}>Avaliar seguro de {article.modality}</Link></Button>
                <Link to={INSURANCE_EDITORIALS_PATH} className="mt-4 flex min-h-11 items-center text-sm font-semibold text-primary underline underline-offset-4">Explorar outras modalidades</Link>
              </div>
            </aside>
          </div>
        ) : null}
        <InsuranceEditorialLinks excludePath={article?.path} />
        <section className="container mx-auto max-w-3xl px-4 py-14 text-center" aria-labelledby="orientacao-artigo-heading">
          <h2 id="orientacao-artigo-heading" className="text-2xl font-bold">Transforme a leitura em uma análise do seu caso</h2>
          <p className="mb-6 mt-4 text-muted-foreground">Conte à equipe o que você precisa proteger para avaliar as opções e as condições disponíveis.</p>
          <Button asChild size="lg" className="h-auto min-h-11 whitespace-normal"><Link to={article?.productPath ?? "/todos-os-seguros#solicitar-cotacao"}>{article ? `Conhecer o seguro de ${article.modality}` : "Escolher uma modalidade e pedir análise"}</Link></Button>
        </section>
      </main>
      <Footer />
    </>
  );
}
