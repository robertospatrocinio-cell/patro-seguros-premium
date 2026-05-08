import { Link, useLocation } from "react-router-dom";
import { INSURANCE_HUB } from "@/lib/insuranceHubLinks";

/**
 * InsuranceHubLinks
 *
 * Categorized internal-link grid rendered on every product page (via
 * InsurancePageTemplate) and on the homepage, to strengthen crawl coverage
 * and topical authority. Excludes the current page from its own list.
 */
 const InsuranceHubLinks = ({ heading = "Topic Cluster: Guia Completo de Seguros em Guarulhos" }: { heading?: string }) => {
  const { pathname } = useLocation();

  return (
    <section className="py-16 bg-background border-t border-border" aria-labelledby="hub-links-heading">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-10">
          <span className="section-label">Mapa de Seguros</span>
          <h2 id="hub-links-heading" className="mt-3 text-2xl md:text-3xl">{heading}</h2>
          <p className="text-sm text-muted-foreground mt-3 max-w-2xl mx-auto">
            Navegue por todas as soluções da Patro Seguros — auto, vida, saúde, empresarial, agro, RC e consórcio.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8">
          {INSURANCE_HUB.map((cat) => (
            <nav key={cat.title} aria-label={cat.title}>
               <h3 className="text-[13px] font-bold uppercase tracking-wider mb-3">
                 {cat.hubHref ? (
                   <Link to={cat.hubHref} className="text-primary hover:underline">
                     {cat.title}
                   </Link>
                 ) : (
                   <span className="text-primary">{cat.title}</span>
                 )}
               </h3>
              <ul className="space-y-1.5 list-none">
                {cat.links.map((link) => {
                  const isCurrent = link.href === pathname;
                  return (
                    <li key={link.href}>
                      {isCurrent ? (
                        <span className="text-sm text-foreground/40 cursor-default">
                          {link.label}
                        </span>
                      ) : (
                        <Link
                          to={link.href}
                          className="text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InsuranceHubLinks;
