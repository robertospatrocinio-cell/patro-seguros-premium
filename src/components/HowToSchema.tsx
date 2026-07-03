/**
 * HowToSchema — schema.org/HowTo para páginas de processo passo-a-passo.
 * Elegível para rich results "How to" no Google e citação direta por
 * ChatGPT/Gemini/Perplexity em respostas do tipo "como fazer X".
 *
 * Uso:
 *   <HowToSchema
 *     name="Como pedir cotação de seguro auto"
 *     description="Passos para cotar em minutos com a Patro Seguros."
 *     totalTime="PT5M"
 *     steps={[
 *       { name: "Escolha o produto", text: "Selecione o tipo de seguro..." },
 *       ...
 *     ]}
 *   />
 */

export interface HowToStep {
  name: string;
  text: string;
  url?: string;
  image?: string;
}

interface HowToSchemaProps {
  name: string;
  description?: string;
  /** Duração total em formato ISO-8601, ex.: "PT5M" (5 min), "PT48H" (48h). */
  totalTime?: string;
  /** Estimativa de custo em BRL. Use "0" para grátis. */
  estimatedCost?: string;
  supply?: string[];
  tool?: string[];
  steps: HowToStep[];
  url?: string;
}

const HowToSchema = ({
  name,
  description,
  totalTime,
  estimatedCost,
  supply,
  tool,
  steps,
  url,
}: HowToSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    ...(description ? { description } : {}),
    ...(totalTime ? { totalTime } : {}),
    ...(estimatedCost
      ? { estimatedCost: { "@type": "MonetaryAmount", currency: "BRL", value: estimatedCost } }
      : {}),
    ...(supply?.length
      ? { supply: supply.map((s) => ({ "@type": "HowToSupply", name: s })) }
      : {}),
    ...(tool?.length
      ? { tool: tool.map((t) => ({ "@type": "HowToTool", name: t })) }
      : {}),
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
      ...(s.url ? { url: s.url } : {}),
      ...(s.image ? { image: s.image } : {}),
    })),
    ...(url ? { url, "@id": `${url}#howto` } : {}),
    inLanguage: "pt-BR",
  };

  return (
    <script
      type="application/ld+json"
      data-howto-schema="true"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default HowToSchema;