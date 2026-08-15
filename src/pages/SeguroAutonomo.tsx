import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import ServiceSchema from "@/components/ServiceSchema";
import heroImg from "@/assets/hero-seguro-auto.webp";

const SeguroAutonomo = () => {
  return (
    <>
      <ServiceSchema
        name="Seguros para Autônomos e Profissionais Liberais"
        description="Proteção de renda e patrimônio para autônomos e profissionais liberais em Guarulhos. Seguro de Acidentes Pessoais, RC Profissional e Saúde facilitado. Cotação na Patro Seguros."
        serviceType="InsuranceAgency"
      />
      <InsurancePageTemplate
        heroImage={heroImg}
        title="Seguros para Autônomos em Guarulhos | Proteção de Renda | Patro"
        headline="Seguros para autônomos e profissionais liberais em Guarulhos"
        subtitle="Sua renda é o seu maior patrimônio. Nós ajudamos a protegê-la contra imprevistos."
        icon="👨‍💻"
        metaDescription="Seguros para autônomos em Guarulhos: acidentes pessoais, DIT, RC profissional e saúde. Proteja sua capacidade de gerar renda com a Patro Seguros."
        description="Para quem trabalha por conta própria em Guarulhos, um dia parado é um dia sem faturamento. O seguro para autônomo não é luxo, é sobrevivência. Na Patro, estruturamos soluções que garantem o pagamento das suas contas se você sofrer um acidente ou ficar doente e não puder trabalhar."
        detailedDescription={`O autônomo é o motor da sua própria economia. Se você é médico, dentista, advogado, arquiteto, corretor, motorista de aplicativo ou prestador de serviços em geral, sua maior exposição é a interrupção da sua atividade.

Nossa consultoria foca em três pilares para o profissional liberal: Proteção de Renda (DIT/Acidentes Pessoais), Proteção de Carreira (Responsabilidade Civil Profissional) e Proteção de Saúde (Planos individuais ou via CNPJ/MEI). Atendemos profissionais de toda Guarulhos com cotações ágeis em 16 seguradoras.`}
        coverages={[
          { title: "Seguro de Acidentes Pessoais", description: "Indenização rápida em caso de morte acidental ou invalidez. Essencial para quem se desloca muito pela cidade." },
          { title: "Diária de Incapacidade Temporária (DIT)", description: "O 'salário reserva': você recebe um valor por cada dia que ficar sem trabalhar por doença ou acidente." },
          { title: "RC Profissional (E&O)", description: "Proteção contra processos por erros ou omissões no exercício da profissão. Vital para médicos, advogados e engenheiros." },
          { title: "Seguro para Equipamentos Portáteis", description: "Proteja seu notebook, câmera ou ferramentas de trabalho contra roubo e danos." },
          { title: "Plano de Saúde Individual/MEI", description: "Acesso à rede privada de Guarulhos sem depender do SUS. Opções exclusivas para quem tem CNPJ ativo." },
          { title: "Seguro Auto para Uso Profissional", description: "Garante cobertura total mesmo para quem usa o veículo para visitas a clientes ou entregas (declarado)." },
        ]}
        whoNeeds={[
          "Médicos, Dentistas e Profissionais da Saúde",
          "Advogados, Contadores e Arquitetos",
          "Motoristas de Aplicativo (Uber/99/Indriver)",
          "Entregadores e Profissionais de Logística",
          "Consultores e Freelancers de TI/Marketing",
          "Corretores e Representantes Comerciais",
        ]}
        whyPatro={[
          "Especialistas em Seguros de Renda (DIT) para autônomos",
          "Consultoria para enquadramento correto do risco profissional",
          "Cotação rápida via WhatsApp (atendimento em até 2h)",
          "Suporte local no Cidade Maia, Guarulhos",
          "Planos de Saúde com até 40% de desconto via CNPJ/MEI",
        ]}
        pricingInfo={{
          intro: "Proteção acessível para quem não pode parar. Exemplos de investimento:",
          factors: [
            "Acidentes Pessoais: a partir de R$ 20/mês",
            "Proteção de Renda (DIT): a partir de R$ 50/mês (conforme renda)",
            "RC Profissional: a partir de R$ 80/mês (conforme a área)",
            "Seguro Notebook/Ferramentas: a partir de R$ 30/mês",
            "Plano de Saúde MEI: a partir de R$ 190/mês (individual jovem)",
          ],
          note: "O valor de um cafezinho por dia pode garantir o pagamento do seu aluguel se algo acontecer.",
        }}
        faqs={[
          { question: "Como funciona a Diária de Incapacidade Temporária (DIT)?", answer: "Se você sofrer um acidente ou doença que o impeça de trabalhar, a seguradora paga um valor diário contratado (ex: R$ 200/dia) durante o período de afastamento médico." },
          { question: "Motorista de aplicativo precisa de seguro especial?", answer: "Sim. O uso profissional deve ser declarado para garantir a cobertura em caso de colisão ou roubo. Também é obrigatório ter o seguro APP (Acidentes Pessoais de Passageiros)." },
          { question: "O seguro cobre afastamento por estresse ou burnout?", answer: "Algumas apólices de DIT já oferecem coberturas para afastamentos por doenças psicossomáticas, desde que comprovadas por laudo médico especialista. Consulte-nos sobre essa opção." },
        ]}
        relatedInsurances={[
          { title: "Seguro Acidentes Pessoais", link: "/seguro-acidentes-pessoais" },
          { title: "Seguro RC Profissional", link: "/seguro-rc-profissional" },
          { title: "Seguro Motorista de App", link: "/seguro-motorista-app-guarulhos" },
          { title: "Plano de Saúde MEI", link: "/plano-de-saude-mei-guarulhos" },
        ]}
        quoteUrl="/cotacao"
        canonicalUrl="https://www.patroseguros.com.br/seguro-autonomo"
      />
    </>
  );
};

export default SeguroAutonomo;