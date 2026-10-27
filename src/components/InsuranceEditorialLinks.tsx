import { Link } from "react-router-dom";
import { BookOpen, ArrowRight } from "lucide-react";
import { insuranceEditorials, INSURANCE_EDITORIALS_PATH } from "@/data/insuranceEditorials";

interface Props {
  productPath?: string;
  excludePath?: string;
}

export default function InsuranceEditorialLinks({ productPath, excludePath }: Props) {
  const articles = insuranceEditorials.filter((article) =>
    article.path !== excludePath && (!productPath || article.productPath === productPath),
  );
  if (!articles.length) return null;
  const visibleArticles = excludePath ? articles.slice(0, 3) : articles;

  return (
    <section className="bg-muted/30 py-14" aria-labelledby="artigos-modalidades-heading">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <h2 id="artigos-modalidades-heading" className="text-2xl font-bold md:text-3xl">
              {productPath ? "Entenda este seguro na prática" : "Artigos por modalidade de seguro"}
            </h2>
            <p className="mt-3 text-muted-foreground">
              Aplicações, limites e cuidados para decidir o que faz sentido proteger.
            </p>
          </div>
          <Link to={INSURANCE_EDITORIALS_PATH} className="inline-flex min-h-11 items-center gap-2 font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">
            Todos os artigos <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
          </Link>
        </div>
        <ul className={`grid gap-4 ${productPath ? "max-w-3xl" : "md:grid-cols-2 lg:grid-cols-3"}`}>
          {visibleArticles.map((article) => (
            <li key={article.path}>
              <Link to={article.path} className="group flex h-full flex-col rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-4">
                <span className="mb-3 inline-flex items-center gap-2 text-sm text-muted-foreground">
                  <BookOpen className="h-4 w-4 shrink-0" aria-hidden="true" /> {article.modality}
                </span>
                <h3 className="text-lg font-bold leading-snug group-hover:text-primary">{article.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{article.description}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">Ler artigo <ArrowRight className="h-4 w-4" aria-hidden="true" /></span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
