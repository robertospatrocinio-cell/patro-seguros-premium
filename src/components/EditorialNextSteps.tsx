import { Link } from "react-router-dom";
import { articles } from "@/lib/blogData";
import { getEditorialTopic, type EditorialTopic } from "@/lib/editorialConnections";

interface Props {
  topic?: EditorialTopic;
  currentPath: string;
  showArticles?: boolean;
}

/** Links presentes no HTML, sem depender de interação ou carregamento posterior. */
export default function EditorialNextSteps({ topic, currentPath, showArticles = true }: Props) {
  const relatedArticles = topic && showArticles
    ? articles.filter((article) => {
        if (`/blog/${article.slug}` === currentPath) return false;
        return getEditorialTopic(article.slug, article.category)?.id === topic.id;
      }).sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug)).slice(0, 2)
    : [];
  const guidePath = topic?.guide ? `/guias/${topic.guide.slug}` : undefined;
  const faqPath = topic?.faqId ? `/perguntas-frequentes-seguros/${topic.faqId}` : undefined;
  const linkClass = "inline-flex min-h-11 items-center text-primary underline underline-offset-4 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

  return (
    <nav aria-label="Continue a leitura" className="my-10 border-y py-8">
      <h2 className="mb-2 text-2xl font-bold">Continue a leitura</h2>
      <p className="mb-5 text-muted-foreground">
        {topic ? `Aprofunde o tema: ${topic.label}.` : "Escolha o formato que ajuda você a entender sua próxima decisão."}
      </p>
      <ul className="space-y-4">
        {guidePath !== currentPath && (
          <li>
            <Link to={guidePath ?? "/guias-seguros"} className={linkClass}>
              {topic?.guide?.title ?? "Explorar a Central de Guias"}
            </Link>
            <p className="text-sm text-muted-foreground">Para entender conceitos, critérios de comparação e cuidados antes de contratar.</p>
          </li>
        )}
        {faqPath !== currentPath && (
          <li>
            <Link to={faqPath ?? "/perguntas-frequentes-seguros"} className={linkClass}>
              {topic?.faqId ? `Perguntas frequentes: ${topic.label}` : "Explorar perguntas frequentes por assunto"}
            </Link>
            <p className="text-sm text-muted-foreground">Para consultar respostas diretas às dúvidas mais comuns.</p>
          </li>
        )}
        {relatedArticles.map((article) => (
          <li key={article.slug}>
            <Link to={`/blog/${article.slug}`} className={linkClass}>{article.title}</Link>
            <p className="text-sm text-muted-foreground">Artigo · {article.author} · {article.readTime} min de leitura</p>
          </li>
        ))}
        <li><Link to="/blog" className={linkClass}>Explorar todos os artigos do blog</Link></li>
      </ul>
    </nav>
  );
}
