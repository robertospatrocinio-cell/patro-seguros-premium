import SaudeSubPageTemplate from "@/components/saude/SaudeSubPageTemplate";
import { getSubtype } from "@/data/saudeVertical";

const PlanoSaudeIndividualGuarulhos = () => (
  <SaudeSubPageTemplate subtype={getSubtype("individual")} />
);

export default PlanoSaudeIndividualGuarulhos;