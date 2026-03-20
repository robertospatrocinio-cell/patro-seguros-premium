import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb = ({ items }: BreadcrumbProps) => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: "https://www.patroseguros.com.br" },
      ...items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: item.label,
        ...(item.href ? { item: `https://www.patroseguros.com.br${item.href}` } : {}),
      })),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <nav aria-label="Breadcrumb" className="container mx-auto px-4 py-3">
        <ol className="flex items-center gap-1 text-[12px] text-muted-foreground flex-wrap">
          <li>
            <Link to="/" className="hover:text-foreground transition-base">Início</Link>
          </li>
          {items.map((item, i) => (
            <li key={i} className="flex items-center gap-1">
              <ChevronRight className="h-3 w-3 flex-shrink-0" aria-hidden="true" />
              {item.href && i < items.length - 1 ? (
                <Link to={item.href} className="hover:text-foreground transition-base">{item.label}</Link>
              ) : (
                <span className="text-foreground/80 font-medium" aria-current="page">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumb;
