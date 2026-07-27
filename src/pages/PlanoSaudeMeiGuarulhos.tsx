import SaudeSubPageTemplate from "@/components/saude/SaudeSubPageTemplate";
import { getSubtype } from "@/data/saudeVertical";

const PlanoSaudeMeiGuarulhos = () => (
  <SaudeSubPageTemplate subtype={getSubtype("mei")} />
);

export default PlanoSaudeMeiGuarulhos;