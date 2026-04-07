import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-seguro-residencial.webp";

const SeoSeguroResidencialGuarulhos = () => (
  <InsurancePageTemplate
    heroImage={heroImg}
    title="Seguro Residencial em Guarulhos"
    subtitle="Proteção completa para sua casa, apartamento ou condomínio em Guarulhos. Cotação gratuita e personalizada."
    description="A Patro Seguros é referência em seguro residencial em Guarulhos e região metropolitana. Com atendimento presencial no Cidade Maia e mais de 300 residências protegidas, oferecemos consultoria personalizada comparando Porto Seguro, Tokio Marine, Allianz, Bradesco e SulAmérica para encontrar a melhor cobertura e preço para sua casa ou apartamento."
    detailedDescription={`Guarulhos possui mais de 400 mil domicílios, entre casas, apartamentos e condomínios, cada um com riscos específicos que variam conforme o bairro e tipo de imóvel. A cidade registra milhares de ocorrências anuais de roubo residencial, danos elétricos por oscilação de rede e problemas causados por vendavais e chuvas fortes durante o verão.

Moradores da Cidade Maia e Vila Augusta, por exemplo, tendem a ter imóveis de maior valor agregado e necessitam de coberturas robustas para eletrônicos, joias e obras de arte. Já em bairros como Picanço e Macedo, os riscos de alagamento e danos elétricos são mais relevantes, exigindo coberturas específicas.

A Patro Seguros realiza uma análise detalhada do perfil do imóvel: tipo de construção, localização, valor dos bens, presença de sistemas de segurança e histórico de sinistros na região. Com essas informações, comparamos as propostas de 6+ seguradoras para garantir que você pague o menor preço possível pela proteção adequada.

Um dado importante: o seguro residencial é um dos mais acessíveis do mercado, custando em média menos de R$ 1 por dia para apartamentos em Guarulhos. Mesmo assim, mais de 70% dos imóveis brasileiros não possuem seguro — uma exposição desnecessária a prejuízos que podem chegar a dezenas de milhares de reais.`}
    icon="🏠"
    metaDescription="Seguro Residencial em Guarulhos para casas e apartamentos. Cobertura contra incêndio, roubo, vendaval e danos elétricos. Cotação grátis – Patro Seguros Guarulhos."
    coverages={[
      { title: "Incêndio, Raio e Explosão", description: "Cobertura básica obrigatória para danos estruturais ao imóvel. Inclui despesas com salvamento e desentulho." },
      { title: "Roubo e Furto Qualificado", description: "Proteção para bens dentro da residência: eletrônicos, móveis, eletrodomésticos e objetos pessoais de valor." },
      { title: "Danos Elétricos", description: "Cobertura para equipamentos danificados por oscilações de energia — uma das coberturas mais acionadas em Guarulhos." },
      { title: "Vendaval, Granizo e Alagamento", description: "Proteção contra fenômenos naturais frequentes na região metropolitana de São Paulo, especialmente no verão." },
      { title: "Responsabilidade Civil Familiar", description: "Cobertura para danos causados a terceiros por membros da família, inclusive por animais de estimação." },
      { title: "Assistência 24h Residencial", description: "Chaveiro, encanador, eletricista, vidraceiro e desentupidor — serviços emergenciais sem custo adicional em Guarulhos." },
    ]}
    howItWorks={[
      { step: "1", title: "Informe os dados do imóvel", description: "Preencha o formulário com tipo do imóvel (casa/apartamento), CEP em Guarulhos, valor estimado dos bens e coberturas desejadas." },
      { step: "2", title: "Comparação personalizada", description: "A Patro consulta Porto Seguro, Tokio Marine, Allianz e outras seguradoras para montar propostas sob medida." },
      { step: "3", title: "Receba as opções", description: "Em até 2 horas, você recebe um comparativo com preços, coberturas e condições de pagamento." },
      { step: "4", title: "Contrate sem burocracia", description: "Escolha a melhor opção. A apólice é emitida digitalmente e a proteção começa imediatamente." },
    ]}
    pricingInfo={{
      intro: "O seguro residencial em Guarulhos é surpreendentemente acessível. Apartamentos com cobertura completa custam a partir de R$ 150/ano (menos de R$ 0,50/dia). Casas variam entre R$ 300 e R$ 1.200/ano dependendo do bairro, valor do imóvel e coberturas.",
      factors: [
        "Tipo do imóvel: casa ou apartamento (apartamentos são mais baratos)",
        "Localização/CEP em Guarulhos — bairros influenciam o risco",
        "Valor total dos bens a serem protegidos",
        "Presença de sistemas de segurança (alarme, câmeras, portaria 24h)",
        "Coberturas adicionais escolhidas (RC familiar, danos elétricos, etc.)",
        "Material de construção e idade do imóvel",
      ],
      note: "Dica Patro: Moradores de condomínios com portaria 24h e câmeras podem obter descontos de até 30% no seguro residencial em Guarulhos.",
    }}
    realScenarios={[
      { title: "Case: Família do Cidade Maia protegida contra danos elétricos", description: "Uma família no Cidade Maia teve R$ 8.500 em eletrodomésticos queimados após uma queda de energia que atingiu a região. Com o seguro residencial contratado pela Patro (Porto Seguro), receberam a indenização integral em 12 dias, incluindo TV 65', geladeira, micro-ondas e computador." },
      { title: "Case: Roubo em residência no Picanço resolvido em 20 dias", description: "Um cliente teve sua casa arrombada enquanto viajava. Foram levados eletrônicos, joias e ferramentas. A Patro abriu o sinistro no mesmo dia, acompanhou a vistoria e a indenização de R$ 15.000 foi paga pela Tokio Marine em 20 dias úteis." },
      { title: "Case: Vendaval causa danos no telhado em Macedo", description: "Após um temporal forte com ventos de 90 km/h, o telhado de uma casa em Macedo foi parcialmente destruído. O seguro residencial cobriu R$ 12.000 em reparos estruturais, incluindo telhas, calhas e pintura externa, além da hospedagem alternativa da família durante 5 dias." },
    ]}
    coverageExclusions={[
      "Desgaste natural do imóvel e manutenção preventiva",
      "Danos causados intencionalmente pelo segurado",
      "Imóveis desocupados há mais de 30 dias consecutivos",
      "Bens não declarados na apólice acima do limite contratado",
      "Danos por vícios de construção ou reforma mal executada",
    ]}
    tips={[
      "Faça um inventário: fotografe e liste todos os bens de valor. Facilita o sinistro e garante indenização justa.",
      "Atualize o seguro: após reformas ou compra de novos eletrônicos, informe a seguradora para ajustar a cobertura.",
      "Aproveite a assistência 24h: chaveiro, encanador e eletricista estão incluídos — use sem culpa!",
      "Condomínio não basta: o seguro do condomínio cobre áreas comuns. Seus bens pessoais precisam de seguro individual.",
      "Combine coberturas: pacotes com incêndio + roubo + danos elétricos + RC familiar custam pouco mais que a cobertura básica.",
    ]}
    whoNeeds={[
      "Moradores de casas e apartamentos em Guarulhos e região",
      "Proprietários de imóveis na Cidade Maia, Vila Augusta e Picanço",
      "Inquilinos que desejam proteger seus bens pessoais e eletrônicos",
      "Famílias com crianças e idosos que precisam de assistência 24h",
      "Proprietários de imóveis alugados que querem proteger o patrimônio",
      "Moradores de áreas com risco de alagamento ou vendaval",
    ]}
    whyPatro={[
      "Corretora local em Guarulhos com atendimento presencial no Cidade Maia",
      "Mais de 300 residências protegidas em Guarulhos — nota 4.9 no Google",
      "Comparação entre Porto Seguro, Tokio Marine, Allianz e mais",
      "Cotação em até 2 horas com propostas comparativas detalhadas",
      "Conhecemos os riscos específicos de cada bairro de Guarulhos",
      "Suporte completo em sinistros residenciais: abertura até indenização",
    ]}
    faqs={[
      { question: "Quanto custa seguro residencial em Guarulhos?", answer: "O seguro residencial em Guarulhos custa a partir de R$ 150/ano para apartamentos e R$ 300/ano para casas. O valor varia conforme localização, coberturas e valor dos bens. Um apartamento com cobertura completa (incêndio + roubo + danos elétricos + assistência 24h) sai por menos de R$ 1/dia. Solicite cotação gratuita." },
      { question: "Seguro residencial cobre danos elétricos em Guarulhos?", answer: "Sim! Danos elétricos são uma das coberturas mais contratadas e acionadas em Guarulhos devido às oscilações frequentes na rede elétrica. Cobre TV, geladeira, computador, ar-condicionado e todos os eletrodomésticos danificados por surtos de tensão." },
      { question: "Preciso de seguro residencial se moro em condomínio?", answer: "Sim. O seguro do condomínio cobre apenas áreas comuns (elevadores, portaria, piscina). Seus bens pessoais, eletrônicos, móveis e responsabilidade civil precisam de seguro residencial individual. O custo é muito baixo para apartamentos." },
      { question: "O seguro cobre roubo se eu esquecer a porta aberta?", answer: "Depende da apólice. A maioria das seguradoras exige 'furto qualificado' (com arrombamento). A Patro orienta sobre as condições de cada seguradora para garantir a melhor proteção." },
      { question: "Seguro residencial cobre home office?", answer: "Equipamentos de trabalho em casa (computador, impressora, monitor) geralmente são cobertos na cobertura de bens. Para coberturas mais amplas de RC profissional em home office, consulte a Patro." },
    ]}
    relatedInsurances={[
      { title: "Seguro Auto Guarulhos", link: "/seguro-auto-guarulhos" },
      { title: "Seguro Condomínio Guarulhos", link: "/seguro-condominio-guarulhos" },
      { title: "Seguro Vida e Saúde Guarulhos", link: "/seguro-vida-saude-guarulhos" },
      { title: "Seguros PME Guarulhos", link: "/seguros-empresariais-pme-guarulhos" },
      { title: "Seguro Frota Guarulhos", link: "/seguro-frota-empresas-guarulhos" },
      { title: "Corretora Seguros Guarulhos", link: "/" },
    ]}
  />
);

export default SeoSeguroResidencialGuarulhos;
