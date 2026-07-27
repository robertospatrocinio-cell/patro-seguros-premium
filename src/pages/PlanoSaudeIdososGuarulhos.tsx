import SaudeSubPageTemplate from "@/components/saude/SaudeSubPageTemplate";
import { getSubtype } from "@/data/saudeVertical";

const PlanoSaudeIdososGuarulhos = () => (
  <SaudeSubPageTemplate subtype={getSubtype("idosos")} />
);

export default PlanoSaudeIdososGuarulhos;