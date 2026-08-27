import type { AnchorHTMLAttributes, ReactNode } from "react";

interface ExternalLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "target" | "rel"> {
  children: ReactNode;
  href: string;
}

/**
 * Link externo padronizado: sempre abre em nova aba com segurança
 * `noopener noreferrer` para evitar inconsistências no site.
 */
export const ExternalLink = ({ children, ...props }: ExternalLinkProps) => {
  return (
    <a {...props} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
};

export default ExternalLink;
