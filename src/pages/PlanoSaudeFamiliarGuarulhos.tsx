import SaudeSubPageTemplate from "@/components/saude/SaudeSubPageTemplate";
import { getSubtype } from "@/data/saudeVertical";

const PlanoSaudeFamiliarGuarulhos = () => (
  <SaudeSubPageTemplate subtype={getSubtype("familiar")} />
);

export default PlanoSaudeFamiliarGuarulhos;