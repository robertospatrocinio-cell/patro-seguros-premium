/**
 * Bloco de confiança Patro Private.
 * Apenas dados reais (SUSEP, endereço). Sem números inventados.
 */
export const PremiumTrustBlock = () => {
  const items = [
    { label: "Registro SUSEP", value: "212113511" },
    { label: "CNPJ", value: "41.641.558/0001-33" },
    { label: "Sede", value: "Edifício Via Alameda · Cidade Maia · Guarulhos/SP" },
    { label: "Telefone", value: "(11) 5199-7500" },
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