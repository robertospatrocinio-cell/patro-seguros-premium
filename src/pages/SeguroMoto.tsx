import InsurancePageTemplate from "@/components/InsurancePageTemplate";

const SeguroMoto = () => {
  return (
    <InsurancePageTemplate
      title="Seguro Moto"
      subtitle="Proteção completa para motociclistas com cobertura e assistência 24h especializada"
      icon="🏍️"
      metaDescription="Seguro Moto com cotação grátis. Cobertura contra roubo, colisão e assistência 24h com guincho para motos. Compare seguradoras. Patro Seguros Guarulhos."
      description="O Brasil é o quarto maior mercado de motocicletas do mundo, com mais de 30 milhões de motos em circulação. Infelizmente, motos também lideram estatísticas de roubo e acidentes de trânsito. Em grandes centros como São Paulo e Guarulhos, o seguro de moto não é luxo — é proteção essencial."
      detailedDescription={`O seguro de moto tem particularidades importantes que o diferenciam do seguro auto. A taxa de sinistralidade (probabilidade de acionar o seguro) é significativamente maior para motos: elas são mais visadas para roubo e furto, e a exposição a acidentes é naturalmente maior.

Por essa razão, o seguro de moto costuma ser proporcionalmente mais caro que o de carro quando comparado ao valor do veículo. Um seguro que custa 3-5% do valor do carro pode custar 8-15% do valor da moto. Ainda assim, é um investimento que se justifica: o preço médio de uma moto roubada sem recuperação gira em torno de R$ 15.000 a R$ 40.000 — dinheiro que o seguro devolve integralmente.

Outro diferencial importante: motos exigem assistência 24h especializada. O guincho precisa ser adequado para motocicletas (plataforma ou carreta específica), e muitas seguradoras oferecem cobertura para equipamentos de segurança como capacete, jaqueta, luvas e botas — itens que somados podem ultrapassar R$ 3.000.`}
      howItWorks={[
        { step: "1", title: "Análise do Perfil do Motociclista", description: "Avaliamos seu perfil completo: idade, tempo de habilitação, modelo e ano da moto, CEP, uso (lazer, trabalho, delivery), se possui garagem e rastreador. Motos com uso profissional (delivery, mototáxi) têm precificação diferente de uso particular." },
        { step: "2", title: "Cotação Especializada", description: "Nem todas as seguradoras aceitam todos os modelos de moto. Algumas são mais competitivas para motos populares (Honda CG, Yamaha Factor), outras para motos de maior cilindrada ou esportivas. Cotamos com todas para encontrar a melhor opção." },
        { step: "3", title: "Escolha e Contratação", description: "Apresentamos as opções com comparativo de preço, coberturas, franquias e assistências. Após a escolha, a vistoria é feita por fotos (na maioria dos casos) e a cobertura começa em até 24 horas." },
      ]}
      coverages={[
        { title: "Colisão, Roubo e Furto", description: "Proteção completa contra acidentes de trânsito (mesmo com culpa do segurado), roubo à mão armada e furto. Em roubo/furto total, a indenização é de 100% da tabela FIPE sem franquia. Em sinistros parciais, aplica-se a franquia contratada." },
        { title: "Responsabilidade Civil a Terceiros", description: "Cobre danos materiais e corporais que você causar a terceiros em acidentes. Inclui reparos em veículos, postes, muros e despesas médicas/hospitalares de vítimas. Absolutamente essencial para motociclistas pela alta exposição no trânsito." },
        { title: "Acidentes Pessoais do Condutor", description: "Cobertura para o próprio motociclista em caso de morte ou invalidez por acidente com a moto. Diferente do seguro de vida, é específica para sinistros durante a condução da motocicleta." },
        { title: "Equipamentos e Acessórios", description: "Cobertura para capacete, jaqueta com proteção, luvas, botas, baú, alforjes, protetor de motor e outros acessórios. Podem ser incluídos na apólice com valores específicos. Recomendamos fortemente — equipamentos de qualidade custam caro." },
        { title: "Assistência 24h Especializada para Motos", description: "Guincho com equipamento adequado para motos (plataforma ou carreta), socorro mecânico e elétrico, troca de pneus, chaveiro, falta de combustível. Disponível 24h, inclusive em viagens intermunicipais." },
        { title: "Despesas Médicas e Hospitalares (DMH)", description: "Cobre despesas médicas e hospitalares do condutor e garupa em caso de acidente com a moto. Complementa o plano de saúde em situações onde o atendimento de urgência é em hospital particular." },
      ]}
      coverageExclusions={[
        "Uso da moto em competições, corridas, trilhas ou manobras radicais",
        "Condução sem habilitação válida (categoria A) no momento do sinistro",
        "Condução sob efeito de álcool ou drogas comprovado",
        "Moto com garupa quando a moto não é homologada para dois passageiros",
        "Danos mecânicos e desgaste natural (motor, câmbio, suspensão, pneus)",
        "Modificações não declaradas (aumento de cilindrada, preparação)",
        "Uso diferente do declarado (declarou lazer, usa para delivery)",
      ]}
      pricingInfo={{
        intro: "O seguro de moto é proporcionalmente mais caro que o de carro devido à maior sinistralidade. Para motos populares (Honda CG 160, Yamaha Factor 150), o seguro varia de R$ 800 a R$ 2.500/ano. Para motos de média cilindrada (Fazer 250, CB 500), de R$ 2.000 a R$ 5.000. Esportivas e motos de alta cilindrada podem ultrapassar R$ 8.000/ano.",
        factors: [
          "Modelo e cilindrada — motos populares são mais baratas de segurar; esportivas e naked são mais caras",
          "Uso — lazer e ida/volta ao trabalho são mais baratos; delivery e mototáxi são significativamente mais caros",
          "CEP de pernoite — regiões com alto índice de roubo de motos encarecem bastante",
          "Idade do condutor — menores de 25 anos pagam mais; acima de 30, valores mais competitivos",
          "Garagem — moto em garagem fechada é mais barato que estacionada na rua",
          "Rastreador — descontos de 5% a 20% para motos rastreadas",
          "Histórico de sinistros e classe de bônus",
        ],
        note: "Para motos usadas em delivery (apps de entrega), existem produtos específicos com coberturas adaptadas para o uso profissional intenso. Consulte-nos sobre as opções.",
      }}
      realScenarios={[
        { title: "Roubo de moto na região do ABC", description: "Um motociclista teve sua Honda CB 500 roubada em um semáforo. O seguro indenizou R$ 32.000 (100% FIPE) em 20 dias, sem cobrança de franquia. O capacete importado de R$ 1.500 também estava coberto pela cláusula de equipamentos. Sem seguro, ele teria perdido R$ 33.500." },
        { title: "Colisão com carro que furou o sinal", description: "Um motociclista foi atingido por um carro que avançou o sinal vermelho. Além dos danos à moto (R$ 6.000), ele sofreu fratura na perna. O seguro cobriu os reparos da moto, as despesas médicas (DMH) e acionou a RC contra o motorista culpado para ressarcimento." },
        { title: "Pane mecânica em viagem para o litoral", description: "Durante viagem ao litoral paulista, a moto apresentou falha no sistema de injeção. A assistência 24h enviou guincho especializado para motos, transportou o veículo até a concessionária mais próxima e o seguro cobriu a hospedagem do motociclista enquanto esperava o reparo." },
      ]}
      importantDetails={[
        { title: "Seguro para Motos de Delivery e Apps", content: "Se você usa a moto para delivery (iFood, Rappi, Uber Eats) ou mototáxi (99, Uber), é OBRIGATÓRIO declarar o uso profissional. Omitir essa informação invalida completamente a apólice — em caso de sinistro durante o trabalho, a seguradora nega o pagamento.\n\nExistem produtos específicos para delivery com coberturas adaptadas (acidentes pessoais do condutor reforçados, RC ampliada, cobertura para bag/baú de entrega). O valor é maior que o uso particular, mas a proteção é fundamental para quem depende da moto para ganhar a vida." },
        { title: "Rastreador para Motos — Vale a Pena?", content: "Rastreadores reduzem o seguro em 5% a 20% e aumentam significativamente a chance de recuperação em caso de roubo. Para motos, que são mais fáceis de esconder e desmontar que carros, o rastreador é especialmente valioso.\n\nAlgumas seguradoras inclusive exigem rastreador para aceitar determinados modelos em determinados CEPs. O custo do rastreador (R$ 500 a R$ 1.500 para instalar + R$ 30 a R$ 60/mês) se paga rapidamente com o desconto no seguro." },
        { title: "Classe de Bônus para Motos", content: "Assim como no seguro auto, cada ano sem sinistro gera uma classe de bônus com descontos progressivos de até 35%. O bônus de moto é independente do bônus de carro — ou seja, ter bônus no seguro do carro não transfere para a moto.\n\nDica: se você é motociclista há anos e nunca teve seguro, está começando do zero. Quanto antes contratar, mais rápido acumula bônus e reduz o custo nos anos seguintes." },
      ]}
      tips={[
        "Declare o uso correto da moto — usar para delivery sem declarar invalida toda a apólice.",
        "Instale rastreador — além de reduzir o seguro, aumenta muito a chance de recuperação em caso de roubo.",
        "Inclua cobertura de equipamentos — capacete, jaqueta e luvas de qualidade custam mais de R$ 3.000.",
        "Para motos acima de 300cc, compare pelo menos 4 seguradoras — a diferença de preço é enorme.",
        "Guarde a moto em garagem fechada sempre que possível — reduz significativamente o preço e o risco real.",
        "Acumule bônus — comece a segurar a moto o quanto antes para construir seu histórico sem sinistros.",
      ]}
      whoNeeds={[
        "Proprietários de motos novas ou seminovas — proteger o investimento é essencial",
        "Motociclistas que usam a moto diariamente no trânsito urbano — a exposição é alta",
        "Profissionais de delivery e mototáxi — dependem da moto para trabalhar e ganhar renda",
        "Moradores de grandes centros e regiões com alto índice de roubo de motos",
        "Motociclistas que fazem viagens — a assistência 24h é fundamental na estrada",
        "Proprietários de motos de alto valor, custom ou importadas",
        "Motociclistas jovens (abaixo de 30 anos) — estatisticamente mais expostos a sinistros",
      ]}
      whyPatro={[
        "Cotação especializada para motos com seguradoras que aceitam todos os modelos e cilindradas",
        "Experiência com seguro de moto para delivery e uso profissional — sabemos quais produtos existem",
        "Cobertura de equipamentos de segurança (capacete, jaqueta, luvas) inclusa na análise",
        "Assistência 24h com guincho especializado para motos — nem toda seguradora oferece",
        "Análise de perfil detalhada para reduzir o custo sem comprometer a proteção",
        "Suporte completo em sinistros — do registro ao pagamento da indenização",
      ]}
      faqs={[
        { question: "Quanto custa o seguro de moto?", answer: "Para motos populares (CG 160, Factor 150): R$ 800 a R$ 2.500/ano. Motos médias (CB 300, Fazer 250): R$ 2.000 a R$ 5.000. Motos esportivas e alta cilindrada: R$ 5.000 a R$ 12.000+. O preço varia muito conforme CEP, perfil e uso — a cotação personalizada é a única forma de saber o valor real." },
        { question: "Seguro de moto cobre equipamentos de pilotagem?", answer: "Sim! É possível incluir capacete, jaqueta, luvas, botas, baú, alforjes e protetor de motor na apólice. Cada item deve ser declarado com seu valor. Recomendamos fortemente — um capacete de qualidade custa R$ 500 a R$ 2.000, e uma jaqueta com proteção pode passar de R$ 1.000." },
        { question: "Tenho bônus no seguro do carro. Posso usar na moto?", answer: "Não. Os bônus de moto e carro são independentes. Se você nunca teve seguro de moto, começa na classe 0 (sem desconto). Mas a cada ano sem sinistro, sobe uma classe — em 3 anos já terá 15% de desconto. Quanto antes começar, mais rápido acumula." },
        { question: "Moto de delivery tem seguro?", answer: "Sim, existem produtos específicos para motos usadas em delivery (iFood, Rappi, Uber Eats) e mototáxi. É OBRIGATÓRIO declarar o uso profissional — omitir invalida a apólice inteira. O valor é maior que uso particular, mas a proteção é essencial para quem depende da moto como fonte de renda." },
        { question: "O que fazer se roubarem minha moto?", answer: "1) Garanta sua segurança — não reaja. 2) Registre Boletim de Ocorrência imediatamente (pode ser online). 3) Entre em contato conosco pelo WhatsApp. 4) Envie a documentação solicitada (BO, CRLV, chave reserva). 5) A indenização é de 100% da FIPE sem franquia, paga em média em 30 dias. Cuidamos de todo o processo junto à seguradora." },
        { question: "Motos financiadas podem ter seguro?", answer: "Sim, e é altamente recomendado (muitas financeiras exigem). O banco entra como beneficiário do seguro — em caso de perda total, primeiro quita o financiamento e o saldo vai para você. A escolha da seguradora e corretora é sempre sua, não do banco." },
      ]}
      relatedInsurances={[
        { title: "Seguro Auto", link: "/seguro-auto" },
        { title: "Seguro de Vida", link: "/seguro-vida" },
        { title: "Seguro Acidentes Pessoais", link: "/seguro-acidentes-pessoais" },
        { title: "Seguro de Frota", link: "/seguro-frota" },
      ]}
      quoteUrl="https://villa.segfy.com/Publico/Segurados/Orcamentos/SolicitarCotacao?e=t6RDiR%2F1ioARkspweLWOgQ%3D%3D"
    />
  );
};

export default SeguroMoto;
