import { Car, ExternalLink as ExternalLinkIcon, Info } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageMeta from "@/components/PageMeta";
import Breadcrumb from "@/components/Breadcrumb";
import ExternalLink from "@/components/ExternalLink";
import { Button } from "@/components/ui/button";

const FIPE_URL = "https://veiculos.fipe.org.br/";

const ConsultaTabelaFipe = () => (
  <>
    <PageMeta title="Consulta Tabela FIPE | Guia Patro Seguros" description="Acesse a consulta oficial da Tabela FIPE e entenda como o valor de referência é usado na análise do seguro do veículo." />
    <Header />
    <main id="main-content" tabIndex={-1} className="outline-none">
      <div className="container mx-auto px-4 pt-6"><Breadcrumb items={[{ label: "Consulta Tabela FIPE" }]} /></div>
      <section className="py-14 md:py-20 bg-background" aria-labelledby="fipe-heading">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="premium-card p-7 md:p-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-5"><Car className="h-6 w-6 text-primary" aria-hidden="true" /></div>
            <span className="section-label">Utilitário do segurado</span>
            <h1 id="fipe-heading" className="mt-3 mb-5">Consulta Tabela FIPE</h1>
            <p className="text-muted-foreground leading-relaxed mb-6">A Tabela FIPE apresenta preços médios de veículos no mercado nacional. O valor serve como referência, mas não substitui a análise da seguradora nem representa garantia do valor de indenização.</p>
            <ol className="grid gap-3 sm:grid-cols-3 list-none mb-8">
              {["Escolha carro, moto ou caminhão", "Informe marca, modelo e ano", "Confira o mês de referência"].map((step, index) => (
                <li key={step} className="rounded-lg border bg-muted/30 p-4 text-sm"><span className="font-bold text-primary mr-2">{index + 1}.</span>{step}</li>
              ))}
            </ol>
            <ExternalLink href={FIPE_URL}>
              <Button size="lg" className="w-full sm:w-auto">Abrir consulta oficial FIPE <ExternalLinkIcon className="h-4 w-4" aria-hidden="true" /></Button>
            </ExternalLink>
            <div className="mt-6 flex items-start gap-2 text-sm text-muted-foreground"><Info className="h-4 w-4 mt-0.5 shrink-0" aria-hidden="true" /><p>A consulta é realizada no site oficial da Fundação Instituto de Pesquisas Econômicas.</p></div>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </>
);

export default ConsultaTabelaFipe;