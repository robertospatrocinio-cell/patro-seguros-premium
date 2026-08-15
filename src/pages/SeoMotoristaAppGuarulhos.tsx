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
    detailedDescription="Motoristas de aplicativo em Guarulhos enfrentam riscos elevados devido ao trânsito intenso e longas jornadas. Um seguro comum pode não cobrir acidentes durante o trabalho remunerado. A Patro oferece consultoria para garantir que sua apólice tenha a cláusula de uso profissional correta, protegendo seu veículo e passageiros."
    coverages={[
      { title: "Uso Profissional", description: "Cobertura garantida mesmo com passageiro a bordo ou app ativo." },
      { title: "RC Passageiros", description: "Proteção obrigatória para danos aos ocupantes do veículo." },
      { title: "Assistência 24h", description: "Socorro completo para você não ficar parado em Guarulhos." },
      { title: "Carro Reserva", description: "Opção de veículo substituto para manter sua renda durante reparos." },
    ]}
    whoNeeds={[
      "Motoristas de Uber e 99 em Guarulhos",
      "Entregadores de iFood e Rappi com moto ou carro",
      "Quem usa o carro para trabalho remunerado integral ou parcial",
    ]}
    whyPatro={[
      "Especialistas em seguros para aplicativos",
      "Comparativo de 16+ seguradoras compatíveis",
      "Suporte em sinistros para evitar negativas por uso profissional",
    ]}
    faqs={[
      { 
        question: "Por que preciso de um seguro específico para app?", 
        answer: "Seguros convencionais excluem uso comercial. Se houver sinistro durante uma corrida, a indenização pode ser negada sem a cláusula correta." 
      },
      { 
        question: "O seguro cobre roubo no aeroporto de Guarulhos?", 
        answer: "Sim, cobrimos roubo e furto em toda a região de Guarulhos, incluindo áreas de embarque e desembarque." 
      }
    ]}
  />
);

export default SeoMotoristaAppGuarulhos;