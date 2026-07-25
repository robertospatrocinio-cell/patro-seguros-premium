/**
 * Bloco de confiança Patro Private.
 * Dados vêm de `src/config/empresa.ts` (fonte única).
 */
import { EMPRESA } from "@/config/empresa";

export const PremiumTrustBlock = () => {
  const items = [
    { label: "Registro SUSEP", value: EMPRESA.susep },
    { label: "CNPJ", value: EMPRESA.cnpj },
    {
      label: "Sede",
      value: `${EMPRESA.endereco.complemento} · ${EMPRESA.endereco.bairro} · ${EMPRESA.endereco.cidade}/${EMPRESA.endereco.estadoSigla}`,
    },
    { label: "Telefone", value: EMPRESA.telefone },
  ];
  return (
    <div
      className="grid grid-cols-2 md:grid-cols-4 gap-px"
      style={{ background: "hsl(var(--premium-rule))" }}
    >
      {items.map((i) => (
        <div
          key={i.label}
          className="p-6 md:p-8"
          style={{ background: "hsl(var(--premium-pearl))" }}
        >
          <div
            className="text-[10px] uppercase tracking-[0.22em] mb-2"
            style={{ color: "hsl(var(--premium-navy-soft))" }}
          >
            {i.label}
          </div>
          <div className="text-sm md:text-base font-medium" style={{ color: "hsl(var(--premium-ink))" }}>
            {i.value}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PremiumTrustBlock;