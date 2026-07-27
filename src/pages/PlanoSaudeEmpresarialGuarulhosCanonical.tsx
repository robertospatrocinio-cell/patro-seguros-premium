import SaudeSubPageTemplate from "@/components/saude/SaudeSubPageTemplate";
import { getSubtype } from "@/data/saudeVertical";

const PlanoSaudeEmpresarialGuarulhosCanonical = () => (
  <SaudeSubPageTemplate subtype={getSubtype("empresarial")} />
);

export default PlanoSaudeEmpresarialGuarulhosCanonical;