import { ReactNode } from "react";

/**
 * Wrapper editorial usado por todas as páginas Patro Private.
 * Aplica fundo pearl, tipografia mais aberta e respiro generoso.
 */
export const PremiumShell = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className="patro-private-scope min-h-screen"
      style={{
        background: "hsl(var(--premium-pearl))",
        color: "hsl(var(--premium-ink))",
      }}
    >
      {children}
    </div>
  );
};

export default PremiumShell;