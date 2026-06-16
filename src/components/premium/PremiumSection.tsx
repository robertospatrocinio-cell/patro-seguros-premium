import { ReactNode } from "react";

interface PremiumSectionProps {
  eyebrow?: string;
  title: string;
  children: ReactNode;
  bg?: "pearl" | "white" | "navy";
}

export const PremiumSection = ({
  eyebrow,
  title,
  children,
  bg = "pearl",
}: PremiumSectionProps) => {
  const styles =
    bg === "navy"
      ? { background: "hsl(var(--premium-navy))", color: "white" }
      : bg === "white"
        ? { background: "white", color: "hsl(var(--premium-ink))" }
        : { background: "hsl(var(--premium-pearl))", color: "hsl(var(--premium-ink))" };

  return (
    <section className="py-20 md:py-28" style={styles}>
      <div className="mx-auto max-w-5xl px-6">
        {eyebrow && (
          <div
            className="mb-4 text-[11px] uppercase tracking-[0.22em]"
            style={{
              color: bg === "navy" ? "hsl(var(--premium-champagne))" : "hsl(var(--premium-navy-soft))",
            }}
          >
            {eyebrow}
          </div>
        )}
        <h2
          className="font-serif text-3xl md:text-4xl leading-tight tracking-tight max-w-3xl"
          style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
        >
          {title}
        </h2>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
};

export default PremiumSection;