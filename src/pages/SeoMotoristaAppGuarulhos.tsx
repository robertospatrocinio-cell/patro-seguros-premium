import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-seguro-motorista-app.webp";

const SeoMotoristaAppGuarulhos = () => (
  <InsurancePageTemplate
    heroImage={heroImg}
    title="Seguro para Motorista de App em Guarulhos | Patro"
    subtitle="Proteção especializada para quem trabalha com Uber, 99 e outros apps em Guarulhos"
    icon="📱"
    metaDescription="Seguro para motoristas de app (Uber, 99, iFood) em Guarulhos. Cobertura profissional durante corridas. Cotação em até 2h. Peça sua proposta grátis."
    description="Seguro para motoristas de app em Guarulhos com cobertura específica para uso profissional. A Patro Seguros compara as melhores opções para sua segurança."
    coverages={[
      { title: "Uso Profissional", description: "Cobertura garantida mesmo com passageiro a bordo ou app ativo." },
      { title: "RC Passageiros", description: "Proteção obrigatória para danos aos ocupantes do veículo." },
      { title: "Assistência 24h", description: "Socorro completo para você não ficar parado em Guarulhos." },
    ]}
  />
);

export default SeoMotoristaAppGuarulhos;