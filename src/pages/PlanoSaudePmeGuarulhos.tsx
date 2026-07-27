import SaudeSubPageTemplate from "@/components/saude/SaudeSubPageTemplate";
import { getSubtype } from "@/data/saudeVertical";

const PlanoSaudePmeGuarulhos = () => (
  <SaudeSubPageTemplate subtype={getSubtype("pme")} />
);

export default PlanoSaudePmeGuarulhos;