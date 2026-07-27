import SaudeSubPageTemplate from "@/components/saude/SaudeSubPageTemplate";
import { getSubtype } from "@/data/saudeVertical";

const PlanoOdontologicoGuarulhosCanonical = () => (
  <SaudeSubPageTemplate subtype={getSubtype("odontologico")} />
);

export default PlanoOdontologicoGuarulhosCanonical;