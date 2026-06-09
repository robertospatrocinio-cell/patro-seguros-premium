import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-plano-pet.webp";

const SeguroPetshop = () => {
  return (
    <InsurancePageTemplate
      heroImage={heroImg}
      title="Seguro para Pet Shops"
      subtitle="Proteção completa para lojas, banho, tosa e hotelaria pet"
      icon="🐾"
      badge="Especialista em Negócios Pet"
      metaDescription="Seguro para Petshops e Clínicas Veterinárias: proteção contra incêndio, roubo e RC Profissional para banho, tosa e atendimento. Cotação Patro Seguros."
      description="Gerenciar um petshop ou clínica veterinária envolve cuidar do patrimônio e da vida dos animais de seus clientes. O seguro especializado da Patro Seguros oferece a tranquilidade que você precisa para operar."
      detailedDescription={`O mercado pet cresce exponencialmente, mas os riscos também aumentam. Além dos danos físicos ao imóvel (incêndio, elétrica), um petshop lida com a responsabilidade sobre seres vivos. Um acidente durante o banho e tosa, uma fuga ou um erro em procedimento clínico pode gerar prejuízos financeiros e danos imensuráveis à reputação do seu negócio.

Nossa consultoria desenha apólices que incluem a Responsabilidade Civil Profissional específica para o setor pet. Isso significa proteção contra processos judiciais decorrentes de acidentes com os animais sob sua guarda.

Atendemos desde pequenos banho e tosa de bairro até grandes hospitais veterinários e redes de petshops em Guarulhos e região, com coberturas sob medida e suporte total em sinistros.`}
      howItWorks={[
        { step: "1", title: "Perfil do Negócio", description: "Identificamos se sua atividade é apenas comércio, banho e tosa, ou se inclui clínica e hospital." },
        { step: "2", title: "Avaliação do Local", description: "Analisamos o imóvel, estoque de produtos, equipamentos e medidas de segurança." },
        { step: "3", title: "Customização de RC", description: "Definimos os limites de responsabilidade civil para animais sob guarda e erros profissionais." },
        { step: "4", title: "Proteção Ativa", description: "Emissão da apólice com suporte para treinamentos preventivos e gestão de eventuais ocorrências." },
      ]}
      coverages={[
        { title: "Incêndio, Raio e Explosão", description: "Proteção fundamental para a estrutura e o estoque da sua loja." },
        { title: "RC Animais sob Custódia", description: "Cobre danos acidentais a animais durante banho, tosa ou hospedagem (hotel)." },
        { title: "RC Profissional Veterinário", description: "Proteção contra erros de diagnóstico ou procedimentos clínicos e cirúrgicos." },
        { title: "Roubo e Furto Qualificado", description: "Segurança para estoque de rações, medicamentos e equipamentos de estética." },
        { title: "Danos Elétricos", description: "Proteção para secadores, sopradores, equipamentos cirúrgicos e exames." },
        { title: "Quebra de Vidros e Fachadas", description: "Cobre vitrines e letreiros da loja ou clínica." },
        { title: "Anúncios Luminosos", description: "Proteção para placas e displays externos contra danos acidentais." },
      ]}
      coverageExclusions={[
        "Danos causados por doenças pré-existentes dos animais",
        "Maus-tratos intencionais ou negligência sanitária grave",
        "Danos a animais que não estejam sob guarda direta do estabelecimento",
        "Multas e penalidades de órgãos de fiscalização",
        "Furto simples (sem vestígios de arrombamento)",
      ]}
      pricingInfo={{
        intro: "O custo é determinado pelo faturamento, valor do estoque e as especialidades oferecidas pelo estabelecimento.",
        factors: [
          "Valor do imóvel e benfeitorias instaladas",
          "Volume de animais atendidos mensalmente",
          "Tipo de serviços (Clínica, Hotel, Estética)",
          "Localização e histórico de sinistros",
          "Medidas de segurança (CFTV, alarmes, monitoramento)",
        ],
        note: "Estabelecimentos que possuem certificações de boas práticas veterinárias podem obter descontos no prêmio de RC.",
      }}
      realScenarios={[
        { title: "Acidente no Banho e Tosa", description: "Um cão se assustou e caiu da mesa de tosa, sofrendo uma fratura. O seguro cobriu todas as despesas veterinárias e exames, evitando conflito com o tutor." },
        { title: "Curto no Soprador", description: "Uma sobrecarga elétrica queimou três sopradores industriais durante o expediente. A reposição de R$ 8.000 foi paga pela cobertura de danos elétricos." },
        { title: "Arrombamento Noturno", description: "Criminosos levaram o estoque de medicamentos controlados e acessórios premium. O prejuízo de R$ 15.000 foi indenizado integralmente." },
      ]}
      importantDetails={[
        { title: "Importância do Termo de Ciência", content: "Sempre recomendamos que o petshop utilize termos de entrada para animais, informando riscos inerentes. O seguro de RC atua como uma segunda camada de proteção jurídica e financeira." },
        { title: "Cobertura de Hotel Pet", content: "Se o seu petshop oferece serviço de hospedagem, é vital que a apólice contemple a estadia noturna, garantindo proteção 24h para os animais sob sua responsabilidade." },
      ]}
      tips={[
        "Mantenha as fichas de anamnese dos animais sempre atualizadas",
        "Instale protetores de surto em tomadas de equipamentos de secagem",
        "Certifique-se de que a área de espera é segura e evita fugas para a rua",
        "Digitalize as notas fiscais de compra de rações e medicamentos de alto valor",
      ]}
      whoNeeds={[
        "Petshops de Bairro",
        "Grandes Magazines Pet",
        "Clínicas e Consultórios Veterinários",
        "Hospitais Veterinários 24h",
        "Centros de Estética Animal",
        "Hotéis e Daycares para Cães e Gatos",
      ]}
      whyPatro={[
        "Especialistas em Seguros Empresariais em Guarulhos",
        "Consultoria para correta verba de Responsabilidade Civil",
        "Comparativo entre seguradoras com melhor aceitação para o setor pet",
        "Suporte direto em caso de sinistros com animais (atendimento humano)",
        "Renovação anual com análise de crescimento do seu negócio",
      ]}
      faqs={[
        { question: "O seguro cobre erro médico veterinário?", answer: "Sim, desde que seja contratada a cobertura de Responsabilidade Civil Profissional Veterinária." },
        { question: "Cobre se o animal fugir do petshop?", answer: "Sim, a cobertura de RC Animais sob Custódia geralmente abrange fugas acidentais das dependências do estabelecimento." },
        { question: "O seguro é caro para um petshop pequeno?", answer: "Não, o custo costuma ser muito acessível, muitas vezes menor do que uma única indenização veterinária que você teria que pagar do próprio bolso." },
        { question: "Como funciona em caso de óbito acidental do animal?", answer: "O seguro indeniza o valor acordado ou as despesas decorrentes, conforme as condições da apólice de RC sob custódia." },
      ]}
      relatedInsurances={[
        { title: "Seguro Empresarial", link: "/seguro-empresarial" },
        { title: "Seguro RC Profissional", link: "/seguro-rc-profissional" },
        { title: "Plano Pet (Saúde)", link: "/plano-pet" },
      ]}
    />
  );
};

export default SeguroPetshop;
