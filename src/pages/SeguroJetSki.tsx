import InsurancePageTemplate from "@/components/InsurancePageTemplate";
import heroImg from "@/assets/hero-seguro-jetski.webp";

const SeguroJetSki = () => {
  return (
    <InsurancePageTemplate
      heroImage={heroImg}
      title="Seguro Jet Ski"
      subtitle="Proteção completa para jet ski, WaveRunner e embarcações pessoais — contra danos, roubo, furto e RC náutica"
      icon="🚤"
      metaDescription="Seguro Jet Ski — proteção contra danos, roubo, naufrágio e RC para jet ski, WaveRunner e Sea-Doo. A partir de R$ 80/mês. Cotação grátis Patro Seguros."
      description="O Seguro Jet Ski oferece cobertura abrangente para proteger sua embarcação pessoal contra colisão, roubo, furto, naufrágio, incêndio e responsabilidade civil náutica. Com o crescimento dos esportes aquáticos no Brasil e jet skis custando de R$ 40.000 a R$ 200.000, navegar sem seguro é um risco financeiro desnecessário."
      detailedDescription={`O mercado de jet skis no Brasil cresceu significativamente nos últimos anos. Modelos populares como Sea-Doo GTX, Yamaha WaveRunner FX e Kawasaki Ultra custam entre R$ 80.000 e R$ 200.000, tornando a proteção via seguro essencial. Além do valor da embarcação, os riscos de navegação — colisão, naufrágio, afundamento e danos a terceiros — podem gerar prejuízos que ultrapassam o valor do próprio jet ski.

A legislação náutica brasileira (NORMAM da Marinha do Brasil) exige que toda embarcação possua registro e que o condutor tenha Habilitação Náutica (Arrais Amador ou superior). O seguro de jet ski, embora não seja legalmente obrigatório, é altamente recomendado — especialmente a cobertura de Responsabilidade Civil, que protege contra danos causados a outras embarcações, banhistas e infraestruturas portuárias.

No litoral paulista, fluminense, catarinense e nordestino, os pontos de maior concentração de jet skis são também os de maior risco: praias movimentadas, represas com tráfego intenso e marinas com estacionamento náutico. Roubo de jet ski no reboque durante transporte rodoviário e furto em marinas são ocorrências cada vez mais frequentes, especialmente em regiões turísticas durante a alta temporada.

A Patro Seguros trabalha com seguradoras especializadas em embarcações e esportes náuticos que entendem as particularidades do seguro de jet ski: valorização/desvalorização por uso em água salgada, cobertura para motor e sistema de propulsão, proteção durante transporte terrestre em carretinha e cobertura nacional ou regional para navegação.

O processo de cotação considera o modelo e ano do jet ski, potência do motor, região de navegação (água doce vs salgada), local de guarda (marina, garagem, reboque) e perfil do condutor. Em geral, o custo do seguro varia de 3% a 8% do valor da embarcação ao ano — um investimento pequeno para proteger um patrimônio significativo.`}
      howItWorks={[
        { step: "1", title: "Dados da embarcação", description: "Informe marca (Sea-Doo, Yamaha, Kawasaki), modelo, ano, potência do motor e valor de mercado do jet ski." },
        { step: "2", title: "Perfil de uso", description: "Indique a região de navegação (litoral, represa, rio), local de guarda (marina, garagem) e se participa de competições." },
        { step: "3", title: "Coberturas personalizadas", description: "Escolha entre pacote básico (roubo + RC) ou completo (colisão, naufrágio, incêndio, AP, assistência náutica)." },
        { step: "4", title: "Cotação comparativa", description: "A Patro consulta seguradoras especializadas em náutica e apresenta as melhores opções de preço e cobertura." },
        { step: "5", title: "Navegue protegido", description: "Apólice emitida digitalmente. Em caso de sinistro, acione o seguro e conte com assistência náutica 24h." },
      ]}
      coverages={[
        { title: "Colisão e Abalroamento", description: "Cobertura contra danos causados por colisão com outras embarcações, objetos submersos, boias, trapiches e estruturas portuárias." },
        { title: "Roubo e Furto Total", description: "Proteção financeira em caso de roubo ou furto do jet ski — na marina, no reboque ou durante transporte rodoviário." },
        { title: "Incêndio, Explosão e Raio", description: "Cobertura contra danos por incêndio do motor, explosão de combustível e queda de raio durante navegação ou em terra." },
        { title: "Responsabilidade Civil Náutica", description: "Proteção contra danos materiais e corporais causados a terceiros: outras embarcações, banhistas, mergulhadores e infraestruturas." },
        { title: "Naufrágio, Afundamento e Encalhe", description: "Cobertura para perda total ou parcial por naufrágio, afundamento involuntário e encalhe em bancos de areia ou rochas." },
        { title: "Transporte Terrestre em Reboque", description: "Proteção durante o transporte do jet ski em carretinha ou reboque — colisão, tombamento, roubo durante o trajeto." },
        { title: "Assistência Náutica 24h", description: "Reboque náutico, socorro mecânico na água, resgate do condutor e passageiros, e transporte até marina mais próxima." },
        { title: "Acessórios e Equipamentos Náuticos", description: "Proteção para GPS náutico, som, capas, sistema de ancoragem, rádio VHF e equipamentos de segurança obrigatórios." },
        { title: "Acidentes Pessoais do Condutor", description: "Indenização por morte acidental, invalidez permanente e despesas médicas do condutor e passageiros durante navegação." },
      ]}
      coverageExclusions={[
        "Condutor sem Habilitação Náutica válida (Arrais Amador ou superior)",
        "Navegação sob efeito de álcool ou substâncias proibidas",
        "Uso em competições não declaradas na apólice (corridas, freestyle)",
        "Desgaste natural do motor, sistema de propulsão e casco (manutenção preventiva)",
        "Embarcações sem registro na Capitania dos Portos / Marinha do Brasil",
        "Danos causados por uso comercial não declarado (passeios turísticos, aluguel)",
        "Navegação em áreas proibidas ou fora dos limites da habilitação",
        "Jet ski com motor modificado acima das especificações de fábrica",
      ]}
      pricingInfo={{
        intro: "O custo do Seguro Jet Ski varia de 3% a 8% do valor da embarcação ao ano, dependendo do modelo, região de navegação, coberturas e perfil do condutor. A Patro compara seguradoras náuticas especializadas para encontrar a melhor relação custo-benefício.",
        factors: [
          "Modelo, ano e potência do jet ski (Sea-Doo, Yamaha, Kawasaki)",
          "Valor de mercado da embarcação (tabela FIPE Náutica ou avaliação)",
          "Região de navegação: litoral (água salgada) vs represas/rios (água doce)",
          "Local de guarda: marina com segurança, garagem residencial ou reboque",
          "Coberturas escolhidas: pacote básico (roubo + RC) vs completo",
          "Perfil do condutor: idade, experiência e categoria da habilitação náutica",
          "Histórico de sinistros náuticos anteriores",
          "Uso: recreativo pessoal, pesca esportiva ou turismo náutico",
        ],
        note: "Exemplos reais de preço: Jet ski Sea-Doo Spark (R$ 45.000) → a partir de R$ 1.350/ano (R$ 112/mês). Yamaha WaveRunner FX (R$ 120.000) → entre R$ 3.600 e R$ 9.600/ano. Sea-Doo GTX Limited (R$ 180.000) → entre R$ 5.400 e R$ 14.400/ano. Modelos de entrada até R$ 60.000 podem custar a partir de R$ 80/mês.",
      }}
      realScenarios={[
        { title: "Roubo de jet ski no reboque durante viagem ao litoral", description: "Um proprietário de Sea-Doo GTX de R$ 150.000 teve o jet ski roubado da carretinha durante uma parada em posto de gasolina na Via Anchieta. O seguro cobriu o valor integral da embarcação e da carretinha, com indenização paga em 30 dias. Sem seguro, o prejuízo seria devastador." },
        { title: "Colisão com boia em represa causou danos de R$ 25.000", description: "Durante passeio na Represa de Guarapiranga/SP, um jet ski Yamaha colidiu com uma boia de sinalização submersa, danificando o casco e o sistema de propulsão. Os reparos somaram R$ 25.000. O seguro de colisão cobriu integralmente, com franquia de apenas R$ 3.000." },
        { title: "Naufrágio parcial após pane mecânica em alto mar", description: "Um jet ski sofreu pane elétrica a 3 km da costa em Ubatuba/SP, começando a embarcar água. A assistência náutica 24h resgatou o condutor e rebocou a embarcação até a marina em 40 minutos. Os danos ao sistema elétrico (R$ 8.000) foram cobertos pelo seguro." },
        { title: "RC náutica evitou processo após acidente com banhista", description: "Em praia movimentada no Guarujá, um jet ski se aproximou demais da área de banho e o spray do jato d'água atingiu um banhista, causando lesão no ouvido. As despesas médicas de R$ 7.000 foram cobertas pelo RC náutico, evitando um processo civil contra o proprietário." },
        { title: "Furto em marina durante temporada de verão", description: "Um jet ski Sea-Doo de R$ 90.000 foi furtado de uma marina em Angra dos Reis durante o réveillon. Apesar do sistema de segurança da marina, a embarcação foi levada por água. O seguro indenizou o valor de mercado integral em 25 dias." },
      ]}
      importantDetails={[
        { title: "Habilitação Náutica: requisito obrigatório", content: "Para conduzir jet ski no Brasil, é obrigatório possuir a Habilitação Náutica na categoria Arrais Amador ou superior, emitida pela Marinha do Brasil. Navegação sem habilitação invalida o seguro e constitui infração. O curso de Arrais Amador pode ser feito em escolas náuticas credenciadas e dura cerca de 1 semana.\n\nAlgumas seguradoras oferecem desconto para condutores com habilitação de categoria superior (Mestre Amador ou Capitão Amador)." },
        { title: "Água doce vs água salgada: impacto no seguro", content: "Jet skis utilizados em água salgada (litoral) sofrem maior desgaste por corrosão, o que pode influenciar o valor do seguro. Seguradoras consideram o ambiente de navegação na precificação. Jet skis que navegam exclusivamente em água doce (represas, rios, lagos) tendem a ter prêmios 10-20% menores.\n\nIndependente do ambiente, a lavagem do jet ski com água doce após cada uso em água salgada é uma prática de manutenção essencial que pode prevenir sinistros por corrosão." },
        { title: "Local de guarda: marina, garagem ou reboque", content: "O local onde o jet ski é guardado impacta diretamente o custo do seguro. Marinas com segurança 24h, câmeras e controle de acesso oferecem as melhores condições e menores riscos. Guarda em garagem residencial é aceitável, mas requer portão com tranca. Jet skis mantidos permanentemente no reboque têm maior risco de furto e, portanto, prêmios mais altos.\n\nDica: se possível, instale rastreador na embarcação — além de segurança adicional, pode reduzir o prêmio do seguro em até 15%." },
        { title: "Seguro para jet ski de aluguel ou turismo", content: "Proprietários que alugam jet ski para turistas ou operam passeios turísticos precisam de seguro comercial, que inclui coberturas específicas para uso por terceiros, RC ampliada e proteção para múltiplos condutores. O custo é maior que o seguro recreativo pessoal, mas a exposição ao risco justifica o investimento." },
      ]}
      tips={[
        "Faça manutenção preventiva regularmente: motor, sistema de propulsão e elétrica. Isso previne sinistros e pode reduzir o prêmio na renovação.",
        "Instale rastreador náutico: além de segurança, pode garantir desconto de até 15% no seguro e aumentar chances de recuperação.",
        "Lave o jet ski com água doce após cada uso em água salgada — corrosão não é coberta pelo seguro como desgaste natural.",
        "Guarde a documentação (TIE da Marinha, habilitação náutica, nota fiscal) em local seguro e digitalizado.",
        "Informe a seguradora sobre mudanças: se trocar de marina, instalar acessórios caros ou começar a usar para turismo.",
        "Na alta temporada (dezembro-março), reforce a segurança na marina e no transporte — é o período de maior incidência de roubos.",
        "Para quem viaja entre estados com o jet ski, verifique se a cobertura é nacional e inclui transporte terrestre no reboque.",
      ]}
      whoNeeds={[
        "Proprietários de jet ski para uso recreativo pessoal",
        "Praticantes de esportes aquáticos e wakeboard",
        "Proprietários de jet ski que navegam no litoral paulista, fluminense e nordestino",
        "Quem navega em represas e rios (Guarapiranga, Billings, Jurumirim, Tietê)",
        "Locadoras de jet ski e operadores de turismo náutico",
        "Clubes náuticos, marinas e associações de proprietários",
        "Proprietários que transportam o jet ski em reboque para diferentes destinos",
        "Pescadores esportivos que utilizam jet ski como embarcação auxiliar",
      ]}
      whyPatro={[
        "Parceria com seguradoras especializadas em embarcações e esportes náuticos",
        "Coberturas personalizadas: do pacote básico (roubo + RC) ao premium (completo + AP + assistência)",
        "Assistência náutica 24h incluída: reboque na água, resgate e socorro mecânico",
        "Cotação rápida e gratuita para qualquer modelo de jet ski — Sea-Doo, Yamaha, Kawasaki",
        "Atendimento por consultores que entendem o mercado náutico brasileiro",
        "Processo de sinistro ágil: abertura digital e acompanhamento completo",
        "Cobertura nacional para navegação em qualquer litoral, represa ou rio do Brasil",
      ]}
      faqs={[
        { question: "Quanto custa seguro de jet ski em 2025?", answer: "O custo varia de 3% a 8% do valor ao ano. Para um Sea-Doo Spark (R$ 45.000): a partir de R$ 1.350/ano (R$ 112/mês). Yamaha FX (R$ 120.000): entre R$ 3.600 e R$ 9.600/ano. Sea-Doo GTX (R$ 180.000): a partir de R$ 5.400/ano. Faça cotação gratuita." },
        { question: "O seguro cobre o jet ski durante transporte no reboque?", answer: "Sim, a cobertura de transporte terrestre protege o jet ski durante o trajeto em carretinha ou reboque, incluindo colisão, tombamento e roubo durante paradas. É uma das coberturas mais importantes." },
        { question: "Preciso ter habilitação náutica para contratar seguro de jet ski?", answer: "Sim, é obrigatório possuir a Habilitação Náutica (Arrais Amador ou superior) válida. Navegação sem habilitação invalida o seguro e é infração perante a Marinha do Brasil." },
        { question: "O seguro cobre navegação em água doce e salgada?", answer: "Sim, a cobertura é válida para navegação em água doce (represas, rios, lagos) e água salgada (mar). O ambiente de navegação influencia o preço do seguro: água doce tende a ser 10-20% mais barato." },
        { question: "Existe franquia no seguro de jet ski?", answer: "Sim, como no seguro auto, há franquia que varia de R$ 2.000 a R$ 10.000 conforme o modelo e a cobertura. A Patro compara opções com franquias diferentes para encontrar a melhor relação custo-benefício." },
        { question: "O seguro cobre jet ski usado em competição (corrida, freestyle)?", answer: "Coberturas para competições náuticas precisam ser declaradas e contratadas especificamente. O seguro recreativo padrão não cobre danos durante corridas ou manobras radicais de freestyle." },
        { question: "O que fazer se o jet ski afundar ou naufragar?", answer: "Acione imediatamente a assistência náutica 24h do seguro. A equipe de resgate vai até o local para resgatar condutor/passageiros e rebocar a embarcação. Após o resgate, abra o sinistro para cobertura dos danos." },
        { question: "O seguro cobre acessórios e equipamentos do jet ski?", answer: "Sim, acessórios como GPS náutico, sistema de som, capas, equipamentos de ancoragem e itens de segurança podem ser incluídos na apólice com cobertura específica." },
      ]}
      relatedInsurances={[
        { title: "Seguro Embarcações", link: "/seguro-embarcacoes" },
        { title: "Seguro Bike", link: "/seguro-bike" },
        { title: "Seguro Viagem", link: "/seguro-viagem" },
        { title: "Seguro Acidentes Pessoais", link: "/seguro-acidentes-pessoais" },
        { title: "Seguro de Vida", link: "/seguro-vida" },
      ]}
    />
  );
};

export default SeguroJetSki;
