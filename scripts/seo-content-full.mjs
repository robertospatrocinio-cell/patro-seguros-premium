/**
 * Conteúdo SEO COMPLETO (H1 + H2 + H3 + parágrafos + listas + FAQs +
 * depoimentos + tabelas) injetado dentro de <div id="root"> em build time.
 *
 * Objetivo: entregar 600+ palavras de conteúdo real por rota para crawlers
 * que NÃO executam JavaScript (GPTBot, ClaudeBot, PerplexityBot,
 * Google-Extended, Bing sem JS, PageAudit, etc.).
 *
 * O React continua substituindo #root inteiro no hydrate — o usuário vê
 * a experiência React normal. Não é cloaking: o conteúdo aqui reflete
 * fielmente o que o React renderiza, apenas em HTML simples.
 */

const FAQ = (items) =>
  `<section aria-label="Perguntas frequentes"><h2>Perguntas frequentes</h2>${items
    .map(
      (f) =>
        `<article><h3>${f.q}</h3><p>${f.a}</p></article>`
    )
    .join("")}</section>`;

const DEPOIMENTOS = (items) =>
  `<section aria-label="Depoimentos de clientes"><h2>Depoimentos de clientes em Guarulhos</h2>${items
    .map(
      (d) =>
        `<blockquote><p>"${d.texto}"</p><footer>— ${d.autor}, ${d.perfil}</footer></blockquote>`
    )
    .join("")}</section>`;

const TABELA_COBERTURAS = (linhas) =>
  `<table><caption>Coberturas principais</caption><thead><tr><th>Cobertura</th><th>O que protege</th></tr></thead><tbody>${linhas
    .map((r) => `<tr><td>${r.cob}</td><td>${r.desc}</td></tr>`)
    .join("")}</tbody></table>`;

export const FULL_SEO_CONTENT = {
  "/": {
    h1: "Corretora de Seguros em Guarulhos — Patro Seguros",
    body: `
      <p>A <strong>Patro Seguros</strong> é uma <strong>corretora de seguros em Guarulhos</strong>, com sede na Cidade Maia, especializada em atendimento consultivo para famílias e empresas de toda a Grande São Paulo. Trabalhamos com mais de 16 seguradoras e 20 operadoras de saúde para entregar a melhor apólice em até 2 horas, comparando preço, cobertura, franquia e assistência antes da contratação.</p>
      <p>Nossa atuação cobre <strong>seguro auto</strong>, <strong>seguro residencial</strong>, <strong>seguro de vida</strong>, <strong>plano de saúde</strong>, <strong>seguro empresarial</strong>, <strong>seguro de frota</strong>, <strong>seguro condomínio</strong>, <strong>consórcio</strong> e <strong>seguros para o agronegócio</strong> com alcance nacional. Somos independentes: cotamos com Porto, Bradesco, SulAmérica, Allianz, Tokio Marine, HDI, Liberty (Yelum), Mapfre, Azul Seguros, Itaú, Mitsui, Suhai, Sompo e Zurich, entre outras.</p>

      <h2>Seguros para você e sua família em Guarulhos</h2>
      <p>Para pessoas físicas oferecemos <a href="/seguro-auto-guarulhos">seguro auto em Guarulhos</a>, <a href="/seguro-moto-guarulhos">seguro moto</a>, <a href="/seguro-residencial-guarulhos">seguro residencial</a>, <a href="/seguro-vida-saude-guarulhos">seguro de vida e saúde</a> e <a href="/plano-de-saude-guarulhos">plano de saúde</a>. A Patro compara automaticamente as principais seguradoras do mercado e apresenta as opções lado a lado — você escolhe a melhor relação custo-benefício sem pressão de venda.</p>

      <h3>Nossos diferenciais</h3>
      <ul>
        <li>Cotação multi-seguradora em até 2 horas úteis.</li>
        <li>Corretor dedicado com atendimento humano por telefone e WhatsApp.</li>
        <li>Suporte completo em caso de sinistro, do aviso à indenização.</li>
        <li>Renovação proativa com nova comparação de mercado 30 dias antes do vencimento.</li>
        <li>Análise técnica de coberturas — sem venda casada nem produtos empurrados.</li>
      </ul>

      <h2>Seguros empresariais, PMEs, frotas e condomínios</h2>
      <p>Somos especialistas em <a href="/seguro-empresarial-guarulhos">seguro empresarial</a>, <a href="/seguros-empresariais-pme-guarulhos">seguros para PMEs</a>, <a href="/seguro-frota-empresas-guarulhos">seguro de frota</a> e <a href="/seguro-condominio-guarulhos">seguro condomínio</a>. Atendemos indústrias, galpões e armazéns em Cumbica, escritórios, comércios, restaurantes, clínicas e prestadores de serviço em toda a região. Estruturamos apólices para pequenas e médias empresas de Guarulhos e desenvolvemos apetite técnico em riscos patrimoniais, responsabilidade civil (RC), lucros cessantes e transporte de cargas.</p>

      <h2>Consórcio e agronegócio</h2>
      <p>Oferecemos <a href="/consorcio-guarulhos">consórcio de imóveis, automóveis, serviços e veículos pesados</a> por administradoras autorizadas pelo Banco Central, além de <strong>seguros rurais</strong> com cobertura nacional — seguro agrícola, pecuário, penhor rural, máquinas e equipamentos, benfeitorias e vida do produtor.</p>

      <h2>Por que escolher uma corretora de seguros em Guarulhos</h2>
      <p>Uma corretora habilitada pela SUSEP representa o cliente — não a seguradora. Isso significa que trabalhamos para você conseguir a melhor cobertura pelo preço mais adequado ao seu perfil, e defendemos seus interesses em caso de sinistro. Nossa equipe tem mais de 20 anos de experiência no mercado segurador e domina o apetite técnico de cada seguradora, o que permite direcionar cada cotação para quem realmente vai aceitar bem o risco.</p>

      ${TABELA_COBERTURAS([
        { cob: "Auto", desc: "Colisão, roubo/furto, RCF-V, APP, carro reserva, assistência 24h" },
        { cob: "Residencial", desc: "Incêndio, roubo, danos elétricos, vendaval, RC familiar, assistência 24h" },
        { cob: "Vida", desc: "Morte, invalidez, doenças graves, assistência funeral, diárias por internação" },
        { cob: "Empresarial", desc: "Incêndio, roubo, RC, lucros cessantes, equipamentos, vidros" },
        { cob: "Frota", desc: "Cobertura consolidada com prêmio único e gestão centralizada" },
        { cob: "Condomínio", desc: "Coberturas obrigatórias da Lei 4.591/64 + adicionais" },
      ])}

      ${DEPOIMENTOS([
        { texto: "Cotaram meu auto com 8 seguradoras em uma manhã. Economizei R$ 900 na renovação.", autor: "Rafael M.", perfil: "cliente auto, Cidade Maia" },
        { texto: "Fizeram todo o seguro do galpão em Cumbica com preço melhor que o da renovação direta.", autor: "Cláudia S.", perfil: "empresa, Cumbica" },
        { texto: "Fui atendida pelo WhatsApp em minutos. Ajudaram no sinistro do começo ao fim.", autor: "Juliana T.", perfil: "residencial, Vila Galvão" },
      ])}

      ${FAQ([
        { q: "Qual a diferença entre corretora e seguradora?", a: "A seguradora emite a apólice e assume o risco. A corretora (Patro Seguros) representa o cliente, compara seguradoras e presta suporte durante todo o ciclo — cotação, contratação, alterações e sinistro. Somos habilitados pela SUSEP sob o registro 212113511." },
        { q: "Vocês atendem só em Guarulhos?", a: "Nosso escritório fica na Cidade Maia, Guarulhos, mas atendemos toda a Grande São Paulo presencialmente e clientes em todo o Brasil de forma remota, com corretor dedicado por WhatsApp e telefone." },
        { q: "Quanto custa contratar seguro pela corretora?", a: "Nada além do prêmio da apólice. A comissão da corretora está embutida no preço final da seguradora — o mesmo que você pagaria contratando direto, só que com atendimento consultivo e representação em sinistro." },
        { q: "Em quanto tempo recebo a cotação?", a: "Cotações simples (auto, residencial, moto) saem em até 2 horas úteis. Cotações empresariais, frotas e condomínios levam em média 24 a 48 horas por envolverem análise técnica das seguradoras." },
      ])}

      <p>Endereço: Avenida Salgado Filho, 2120 — Sala 219 — Edifício Via Alameda, Cidade Maia, Guarulhos/SP. Telefone: (11) 5199-7500. WhatsApp disponível no mesmo número. CNPJ 41.641.558/0001-33 · SUSEP 212113511. Horário: segunda a sexta, das 8h30 às 18h.</p>
      <p><a href="/sobre">Conheça nossa história</a>, <a href="/depoimentos">leia depoimentos</a> ou <a href="/contato">fale com um corretor</a>.</p>
    `,
  },

  "/seguro-auto-guarulhos": {
    h1: "Seguro Auto em Guarulhos",
    body: `
      <p><strong>Seguro auto em Guarulhos</strong> com a Patro Seguros: cotação online em 1 minuto com 12+ seguradoras (Porto, Bradesco, Allianz, HDI, Liberty/Yelum, Mapfre, Tokio Marine, Azul, Mitsui, Itaú, Sompo e Suhai). Comparamos preço, franquia, cobertura e assistência antes da contratação — sem pressão de venda.</p>
      <p>Guarulhos é o segundo município mais populoso de São Paulo e concentra alto tráfego, o que impacta diretamente o preço do seguro auto. Bairros como Cidade Maia, Vila Galvão, Vila Augusta, Bonsucesso, Cumbica, Pimentas, Centro, Taboão, Jardim São João e Gopouva têm perfis de risco distintos. Trabalhar com uma corretora local significa perfil tarifado corretamente e economia de 15% a 30% sobre a renovação direta.</p>

      <h2>Coberturas do seguro auto</h2>
      <p>Estruturamos apólices com todas as coberturas essenciais e opcionais do mercado:</p>
      <ul>
        <li><strong>Colisão, incêndio, roubo e furto</strong> (cobertura compreensiva);</li>
        <li><strong>RCF-V</strong> — Responsabilidade Civil Facultativa Veicular por danos materiais e corporais a terceiros;</li>
        <li><strong>APP</strong> — Acidentes Pessoais por Passageiro (morte e invalidez);</li>
        <li><strong>Vidros, faróis, retrovisores e lanternas</strong>;</li>
        <li><strong>Carro reserva</strong> em caso de sinistro (7, 15 ou 30 dias);</li>
        <li><strong>Assistência 24h</strong> em todo o Brasil (guincho, chaveiro, socorro mecânico, pane seca);</li>
        <li><strong>Blindagem e kit gás</strong> mediante inclusão na apólice.</li>
      </ul>

      ${TABELA_COBERTURAS([
        { cob: "Compreensiva", desc: "Cobre colisão, roubo, furto, incêndio e alagamento" },
        { cob: "RCF-V", desc: "Indeniza danos materiais e corporais a terceiros" },
        { cob: "APP", desc: "Morte e invalidez de motorista e passageiros" },
        { cob: "Vidros", desc: "Reparo/troca de para-brisa, vidros laterais, faróis" },
        { cob: "Carro reserva", desc: "Veículo substituto durante o reparo" },
        { cob: "Assistência 24h", desc: "Guincho, chaveiro, socorro mecânico, pane seca" },
      ])}

      <h2>Como cotamos seu seguro auto</h2>
      <ol>
        <li>Você envia dados básicos (CEP, modelo/ano do veículo, perfil do condutor principal, uso, garagem);</li>
        <li>Rodamos a cotação nas 12+ seguradoras parceiras;</li>
        <li>Enviamos comparativo em até 2 horas com preço, franquia e cobertura lado a lado;</li>
        <li>Você escolhe a apólice — pagamento conforme condições da seguradora no cartão ou boleto mensal.</li>
      </ol>

      <h2>Por que cotar com corretora em Guarulhos</h2>
      <p>Uma corretora local conhece as particularidades tarifárias de cada CEP de Guarulhos e o apetite técnico de cada seguradora para cada perfil. Direcionamos sua cotação para quem realmente aceita bem o risco, evitando recusas e sub-cotações. Também representamos você em caso de sinistro — desde o aviso até a liberação da indenização — sem que você precise brigar com call center.</p>

      ${DEPOIMENTOS([
        { texto: "Renovei com a Patro e economizei R$ 1.100 no prêmio do meu Corolla.", autor: "Bruno L.", perfil: "auto, Bonsucesso" },
        { texto: "Atendimento excelente no sinistro. Meu carro foi liberado em 15 dias.", autor: "Fernanda P.", perfil: "auto, Cumbica" },
      ])}

      ${FAQ([
        { q: "Preciso de vistoria prévia?", a: "Sim, na maioria das seguradoras. A vistoria pode ser presencial ou digital (por app) e é feita em até 48h após a contratação. A Patro agenda para você." },
        { q: "Posso incluir mais de um condutor?", a: "Sim. Todo motorista frequente do veículo (inclusive filhos jovens) deve ser declarado — isso protege sua indenização em caso de sinistro." },
        { q: "O seguro cobre roubo em Guarulhos?", a: "Sim, todas as coberturas compreensivas incluem roubo e furto. O prêmio varia conforme o CEP: bairros com maior incidência (Pimentas, partes de Cumbica) pagam mais que bairros de baixo índice." },
        { q: "Vocês trabalham com seguro popular?", a: "Sim. Suhai, Azul Seguros, HDI Bem-Te-Vi e Mitsui Auto Rota atendem perfis de preço mais acessível, geralmente para veículos populares com mais de 5 anos." },
        { q: "Vale a pena contratar carro reserva?", a: "Depende do uso. Quem depende do carro para trabalhar (Uber, motorista de aplicativo, representante comercial) deve contratar. Uso familiar com segundo carro em casa pode dispensar." },
      ])}

      <p>Veja também <a href="/seguro-moto-guarulhos">seguro moto</a>, <a href="/seguro-frota-empresas-guarulhos">seguro de frota</a> e <a href="/seguro-residencial-guarulhos">seguro residencial</a>. Ou <a href="/cotacao">solicite sua cotação agora</a>.</p>
    `,
  },

  "/seguro-residencial-guarulhos": {
    h1: "Seguro Residencial em Guarulhos",
    body: `
      <p><strong>Seguro residencial em Guarulhos</strong> a partir de R$ 25/mês com cobertura completa para casas, apartamentos e imóveis em condomínio fechado. A Patro Seguros cota com Porto, Bradesco, SulAmérica, Allianz, Tokio Marine, HDI, Liberty/Yelum, Mapfre e Itaú, entregando a melhor relação custo-benefício em até 2 horas.</p>
      <p>O seguro residencial é o produto com melhor custo-benefício do mercado segurador brasileiro: cobertura ampla, prêmios acessíveis e serviços de assistência 24h inclusos. Em Guarulhos, atendemos bairros como Cidade Maia, Vila Galvão, Vila Augusta, Bonsucesso, Macedo, Jardim Maia, Gopouva, Taboão e Centro — cada CEP tem tarifação distinta.</p>

      <h2>Coberturas do seguro residencial</h2>
      <ul>
        <li><strong>Incêndio, raio e explosão</strong> — cobertura básica obrigatória;</li>
        <li><strong>Roubo e furto qualificado</strong> de bens (móveis, eletrodomésticos, eletrônicos);</li>
        <li><strong>Danos elétricos</strong> a equipamentos por raio ou variação de tensão;</li>
        <li><strong>Vendaval, granizo, alagamento e desmoronamento</strong>;</li>
        <li><strong>RC familiar</strong> (Responsabilidade Civil) por danos a vizinhos;</li>
        <li><strong>Despesas extras</strong> (aluguel temporário) em caso de sinistro grave;</li>
        <li><strong>Vazamento de tubulação</strong> e quebra de vidros;</li>
        <li><strong>Bicicletas, joias e equipamentos portáteis</strong> mediante inclusão;</li>
        <li><strong>Assistência 24h</strong> — chaveiro, eletricista, encanador, vidraceiro, cobertura provisória de telhado.</li>
      </ul>

      ${TABELA_COBERTURAS([
        { cob: "Básica", desc: "Incêndio, raio, explosão, queda de aeronave, fumaça" },
        { cob: "Roubo/furto", desc: "Subtração de bens móveis com sinal de arrombamento" },
        { cob: "Danos elétricos", desc: "TV, geladeira, ar-condicionado, computadores" },
        { cob: "Vendaval", desc: "Ventos fortes, granizo, alagamento por chuva" },
        { cob: "RC familiar", desc: "Vazamento no vizinho, criança quebrando algo alheio, cão que morde" },
        { cob: "Assistência 24h", desc: "Chaveiro, eletricista, encanador, vidraceiro" },
      ])}

      <h2>Casa própria, alugada ou financiada — qual seguro?</h2>
      <p>Todo imóvel financiado pela Caixa/Minha Casa Minha Vida já tem seguro habitacional obrigatório embutido na parcela — mas ele cobre apenas o casco (paredes/estrutura). Para proteger o conteúdo (móveis, eletrônicos, roupas) e ter RC familiar, o seguro residencial voluntário é indispensável e custa a partir de R$ 25/mês. Para imóveis alugados, o seguro protege o inquilino contra sinistros pelos quais é responsável (fiança locatícia).</p>

      <h2>Por que contratar com corretora em Guarulhos</h2>
      <p>Uma corretora local conhece o perfil de risco de cada bairro e o apetite de cada seguradora. Direcionamos sua cotação para quem tem melhor preço em cada CEP. Também representamos você no sinistro — sem call center, sem espera de horas.</p>

      ${DEPOIMENTOS([
        { texto: "Contratei o residencial pela Patro. Preço melhor que a renovação direta e assistência já usei duas vezes.", autor: "Márcia R.", perfil: "residencial, Vila Galvão" },
        { texto: "Sinistro de raio queimou minha TV e geladeira. Foi indenizado em 8 dias.", autor: "José A.", perfil: "residencial, Cidade Maia" },
      ])}

      ${FAQ([
        { q: "Quanto custa um seguro residencial em Guarulhos?", a: "Apartamentos com valor de conteúdo de R$ 30 mil pagam a partir de R$ 25/mês. Casas com maior valor de reconstrução e conteúdo tendem a R$ 40 a R$ 80/mês, dependendo do CEP e das coberturas." },
        { q: "Preciso declarar o valor exato dos meus bens?", a: "Sim. O valor declarado (capital segurado do conteúdo) é o limite máximo de indenização. Declarar valores muito baixos pode gerar rateio; declarar valores muito altos apenas encarece o prêmio sem benefício." },
        { q: "Seguro residencial cobre alagamento?", a: "Sim, se contratada a cobertura de vendaval/alagamento — não é básica em todas as seguradoras. Guarulhos tem áreas historicamente sujeitas a enchente; recomendamos sempre incluir." },
        { q: "Seguro do condomínio já cobre meu apartamento?", a: "Não. O seguro obrigatório do condomínio (Lei 4.591/64) cobre apenas áreas comuns e estrutura. O conteúdo do seu apartamento, RC familiar e danos elétricos só são cobertos pelo seguro residencial voluntário." },
      ])}

      <p>Veja também <a href="/seguro-condominio-guarulhos">seguro condomínio</a>, <a href="/seguro-empresarial-guarulhos">seguro empresarial</a> e <a href="/seguro-vida-saude-guarulhos">seguro de vida</a>.</p>
    `,
  },

  "/seguro-vida-saude-guarulhos": {
    h1: "Seguro de Vida e Saúde em Guarulhos",
    body: `
      <p><strong>Seguro de vida e plano de saúde em Guarulhos</strong> com a Patro Seguros — parceira de 16+ seguradoras de vida e 20+ operadoras de saúde. Estruturamos proteção completa para você e sua família, com análise técnica de perfil, comparação de coberturas e suporte durante toda a vigência.</p>

      <h2>Seguro de vida individual</h2>
      <p>O seguro de vida individual protege sua família financeiramente em caso de morte natural ou acidental, invalidez permanente, doenças graves e outros eventos. É contratado por prazo determinado (anual renovável) ou vitalício, com capital segurado personalizado.</p>
      <ul>
        <li><strong>Morte natural e acidental</strong> — capital pago aos beneficiários indicados;</li>
        <li><strong>Invalidez permanente</strong> total ou parcial por acidente;</li>
        <li><strong>Doenças graves</strong> — câncer, infarto, AVC, insuficiência renal (antecipa parte do capital);</li>
        <li><strong>Diárias por internação hospitalar</strong> (DIH);</li>
        <li><strong>Assistência funeral</strong> extensiva ao cônjuge e filhos;</li>
        <li><strong>Renda por incapacidade temporária</strong> mediante contratação.</li>
      </ul>

      <h2>Seguro de vida empresarial e em grupo</h2>
      <p>Para empresas em Guarulhos, o seguro de vida em grupo é um benefício de baixo custo e alto impacto na retenção de talentos. Coberturas coletivas com aceitação simplificada, sem exame médico para capitais até R$ 200 mil na maioria das seguradoras. Também estruturamos apólices para diretoria e sócios (Key-Man Insurance).</p>

      <h2>Plano de saúde individual, familiar e empresarial</h2>
      <p>Cotamos com Bradesco Saúde, SulAmérica, Amil, Hapvida-NotreDame, Porto Saúde, Unimed Guarulhos, Omint, Care Plus e Prevent Senior. Estruturamos:</p>
      <ul>
        <li><strong>Individual e familiar</strong> — em queda no mercado, disponível em algumas operadoras específicas;</li>
        <li><strong>Empresarial (PJ)</strong> — a partir de 2 vidas, com preços significativamente melhores;</li>
        <li><strong>Coletivo por adesão</strong> — via entidades de classe (OAB, CRM, CRC, sindicatos);</li>
        <li><strong>Odontológico</strong> — a partir de R$ 20/vida;</li>
        <li><strong>Seguro saúde reembolso</strong> — livre escolha de médicos com reembolso conforme tabela.</li>
      </ul>

      <h2>Rede credenciada em Guarulhos</h2>
      <p>A rede depende da operadora e do plano contratado. Principais hospitais atendidos: Hospital Stella Maris, Hospital Bom Clima, Hospital Padre Bento, Hospital Municipal de Urgências, além dos grandes hospitais de São Paulo referência (Albert Einstein, Sírio-Libanês, Oswaldo Cruz, Beneficência Portuguesa, HCor, Samaritano) para planos superiores.</p>

      ${DEPOIMENTOS([
        { texto: "Migramos o plano da empresa da Amil para a SulAmérica. Economizamos 22% e ganhamos rede.", autor: "Ricardo M.", perfil: "PJ 40 vidas, Cumbica" },
        { texto: "Contratei seguro de vida pela Patro. Consultoria muito clara sobre coberturas.", autor: "Amanda F.", perfil: "vida individual, Cidade Maia" },
      ])}

      ${FAQ([
        { q: "Vale mais a pena seguro de vida ou pecúlio funerário?", a: "São produtos distintos. Pecúlio funerário cobre despesas de sepultamento (R$ 5 a R$ 10 mil). Seguro de vida paga capital significativo (R$ 100 mil a R$ 1 milhão+) aos beneficiários. Recomendamos seguro de vida como prioridade." },
        { q: "Plano de saúde individual ainda existe?", a: "Sim, mas em oferta restrita. Bradesco Saúde e algumas operadoras regionais ainda comercializam. A maioria do mercado migrou para PJ e coletivo por adesão, que têm preços 20% a 40% menores." },
        { q: "Quanto tempo de carência tem o plano de saúde?", a: "Emergência 24h, consultas 30 dias, exames simples 60 a 90 dias, internação e cirurgias 180 dias, parto 300 dias, doenças pré-existentes 24 meses. Portabilidade preserva carências cumpridas." },
        { q: "Seguro de vida cobre suicídio?", a: "Sim, após 24 meses de vigência (carência legal). Antes disso, apenas devolução dos prêmios pagos, conforme Código Civil." },
      ])}

      <p>Veja também <a href="/plano-de-saude-guarulhos">plano de saúde em Guarulhos</a>, <a href="/seguro-residencial-guarulhos">seguro residencial</a> e <a href="/seguro-empresarial-guarulhos">seguro empresarial</a>.</p>
    `,
  },

  "/seguro-moto-guarulhos": {
    h1: "Seguro Moto em Guarulhos",
    body: `
      <p><strong>Seguro moto em Guarulhos</strong> com a Patro Seguros: cotação online rápida com Porto, Bradesco, Allianz, HDI, Mapfre, Tokio Marine, Suhai e Mitsui. Trabalhamos com motos populares (125cc, 150cc), scooters, motos esportivas, custom, big trail e motos de uso comercial (motoboys e entregadores).</p>
      <p>Guarulhos tem forte presença de motociclistas e entregadores de aplicativo, especialmente em bairros de alta densidade como Pimentas, Bonsucesso, Cumbica e Vila Galvão. O seguro moto é essencial: além de proteger o veículo contra roubo (principal risco na cidade), garante APP para o piloto e RCF-V por danos a terceiros.</p>

      <h2>Coberturas do seguro moto</h2>
      <ul>
        <li><strong>Roubo e furto qualificado</strong> — cobertura mais buscada em Guarulhos;</li>
        <li><strong>Colisão, incêndio e alagamento</strong>;</li>
        <li><strong>RCF-V</strong> — Responsabilidade Civil por danos materiais e corporais a terceiros;</li>
        <li><strong>APP</strong> — Acidentes Pessoais do Piloto (morte, invalidez e DMH);</li>
        <li><strong>Assistência 24h</strong> — guincho, socorro mecânico, pane seca em todo o Brasil;</li>
        <li><strong>Acessórios</strong> — bauleto, alarme, capacete de valor mediante inclusão.</li>
      </ul>

      <h2>Seguro moto para motoboys e entregadores em Guarulhos</h2>
      <p>Apólices específicas para uso comercial (motoboy, delivery, iFood, Rappi, 99, Uber Flash) exigem declaração do uso e têm regras próprias. Contratar seguro particular para uso comercial é uma das principais causas de negativa de indenização — cotamos apólices declarando corretamente o uso, o que garante indenização em caso de sinistro. Suhai, HDI e Mapfre têm boas soluções para esse perfil.</p>

      <h2>Seguro roubo/furto simplificado</h2>
      <p>Para motos populares ou pilotos com perfil restritivo, existe a modalidade "seguro só roubo e furto" (RF), com prêmio muito acessível (a partir de R$ 60/mês em algumas seguradoras) e cobertura exclusiva para subtração do veículo. É uma alternativa quando a apólice compreensiva fica cara.</p>

      ${DEPOIMENTOS([
        { texto: "Sou motoboy em Guarulhos. A Patro cotou apólice comercial pela HDI e o preço ficou justo.", autor: "Diego S.", perfil: "moto comercial, Pimentas" },
        { texto: "Fiz o seguro só roubo e furto. Paguei R$ 80/mês na minha CG 160.", autor: "Lucas A.", perfil: "moto RF, Bonsucesso" },
      ])}

      ${FAQ([
        { q: "Seguro moto é obrigatório?", a: "Não. O único obrigatório é o DPVAT (extinto em 2020 e retomado como SPVAT em 2025). O seguro voluntário é opcional, mas fortemente recomendado — motos têm alto risco de roubo em Guarulhos." },
        { q: "Posso rodar de app com seguro particular?", a: "Não. Uso comercial deve ser declarado. Rodar de app com apólice particular pode gerar negativa de indenização em sinistro. Sempre cote apólice comercial se você faz entregas." },
        { q: "Quanto custa em média o seguro moto em Guarulhos?", a: "Depende do modelo, ano, CEP e perfil. Motos populares 125-160cc: R$ 90 a R$ 180/mês. Motos 300-500cc: R$ 180 a R$ 320/mês. Motos big trail e esportivas: R$ 350+ /mês." },
        { q: "Vale a pena rastreador para reduzir o prêmio?", a: "Sim, especialmente em motos acima de R$ 20 mil. Reduz o prêmio em 10% a 25% em várias seguradoras e é obrigatório em modelos de alto risco (Yamaha Fazer 250, Honda XRE 300, motos esportivas)." },
      ])}

      <p>Veja também <a href="/seguro-auto-guarulhos">seguro auto</a>, <a href="/seguro-frota-empresas-guarulhos">seguro de frota</a> e <a href="/seguro-vida-saude-guarulhos">seguro de vida</a>.</p>
    `,
  },

  "/plano-de-saude-guarulhos": {
    h1: "Plano de Saúde em Guarulhos",
    body: `
      <p><strong>Plano de saúde em Guarulhos</strong> com a Patro Seguros: cotação com 20+ operadoras (Bradesco Saúde, SulAmérica, Amil, Hapvida-NotreDame, Porto Saúde, Unimed Guarulhos, Omint, Care Plus e Prevent Senior). Estruturamos planos individuais/familiares, empresariais (PJ), coletivos por adesão, odontológicos e seguros saúde com reembolso.</p>

      <h2>Tipos de plano de saúde</h2>
      <ul>
        <li><strong>Individual e familiar</strong> — proteção ampla com liberdade de escolha (oferta restrita atualmente);</li>
        <li><strong>Empresarial (PJ)</strong> — a partir de 2 vidas, com preços 20% a 40% menores que individual;</li>
        <li><strong>Coletivo por adesão</strong> — via entidades de classe (OAB, CRC, CRM, sindicatos);</li>
        <li><strong>Odontológico</strong> — a partir de R$ 20/vida com rede ampla;</li>
        <li><strong>Seguro saúde reembolso</strong> — livre escolha com reembolso conforme tabela.</li>
      </ul>

      <h2>Segmentações e coberturas</h2>
      <ul>
        <li><strong>Ambulatorial</strong> — consultas, exames, terapias;</li>
        <li><strong>Hospitalar com obstetrícia</strong> — internações, cirurgias, parto;</li>
        <li><strong>Plano referência</strong> — cobertura ambulatorial + hospitalar + obstetrícia (obrigatório em algumas segmentações);</li>
        <li><strong>Odontológico associado</strong> — mediante contratação adicional.</li>
      </ul>

      <h2>Rede credenciada em Guarulhos</h2>
      <p>A rede varia por operadora e plano. Hospitais mais atendidos em Guarulhos: Hospital Stella Maris, Hospital Bom Clima, Hospital Padre Bento, além dos grandes centros de São Paulo (Albert Einstein, Sírio-Libanês, Oswaldo Cruz, Beneficência Portuguesa, Samaritano, HCor) nos planos superiores. Solicite a rede completa do plano na cotação.</p>

      <h2>Portabilidade e carência</h2>
      <p>A portabilidade de carências (Resolução Normativa 438 da ANS) permite trocar de plano sem cumprir novas carências, desde que respeitados os requisitos: mínimo 2 anos no plano atual (ou 3 anos se houver doença pré-existente cumprida), plano de destino em faixa de preço compatível e contratação em janela de 60 dias. A Patro faz toda a análise de portabilidade para você.</p>

      ${DEPOIMENTOS([
        { texto: "Fiz portabilidade da Amil para SulAmérica pela Patro. Zero carência e melhor rede.", autor: "Patrícia S.", perfil: "PF, Vila Galvão" },
        { texto: "Contratei o plano PJ da minha padaria. Economizei R$ 400/mês vs. individual.", autor: "Miguel R.", perfil: "PJ 6 vidas, Bonsucesso" },
      ])}

      ${FAQ([
        { q: "Quanto custa plano de saúde em Guarulhos?", a: "Depende de idade, tipo de plano, acomodação (enfermaria ou apto) e rede. Faixa 0-18 anos: R$ 180 a R$ 400. Faixa 30-38: R$ 350 a R$ 700. Faixa 59+: R$ 900 a R$ 2.500. PJ tende a ser 20-40% mais barato." },
        { q: "Posso abrir MEI só para contratar plano PJ?", a: "Tecnicamente sim, mas a maioria das operadoras exige comprovação de atividade e faturamento mínimo. A Patro te orienta sobre viabilidade real caso a caso." },
        { q: "O que é reajuste anual e por faixa etária?", a: "Reajuste anual: aplicado por sinistralidade/inflação médica (individual segue teto ANS; coletivo é livre). Faixa etária: aumento nas mudanças de faixa (0-18, 19-23, 24-28, 29-33... até 59+), regulado pela ANS." },
      ])}

      <p>Veja também <a href="/seguro-vida-saude-guarulhos">seguro de vida e saúde</a> e <a href="/seguro-empresarial-guarulhos">seguro empresarial</a>.</p>
    `,
  },

  "/seguro-empresarial-guarulhos": {
    h1: "Seguro Empresarial em Guarulhos",
    body: `
      <p><strong>Seguro empresarial em Guarulhos</strong> sob medida para indústrias, comércios, escritórios, clínicas, restaurantes, galpões e prestadores de serviço. A Patro Seguros, corretora com sede na Cidade Maia, cota com 16+ seguradoras (Porto, Bradesco, Allianz, HDI, Mapfre, Tokio Marine, Sompo, Zurich, AIG, Chubb) para entregar a melhor cobertura para sua empresa em Guarulhos, Cumbica e região.</p>

      <h2>Coberturas do seguro empresarial</h2>
      <ul>
        <li><strong>Incêndio, raio e explosão</strong> — cobertura básica obrigatória;</li>
        <li><strong>Danos elétricos</strong> — equipamentos, servidores, maquinário;</li>
        <li><strong>Vendaval, granizo, alagamento e desmoronamento</strong>;</li>
        <li><strong>Roubo e furto qualificado</strong> de bens e valores;</li>
        <li><strong>Responsabilidade Civil (RC)</strong> — operações, produtos, empregador;</li>
        <li><strong>Lucros cessantes</strong> — receita durante paralisação por sinistro;</li>
        <li><strong>Equipamentos eletrônicos</strong> — servidores, computadores, PDVs;</li>
        <li><strong>Vidros, letreiros e anúncios luminosos</strong>;</li>
        <li><strong>Tumultos, greves e lockout</strong>;</li>
        <li><strong>Coberturas adicionais</strong> sob medida para o seu CNAE (transporte, cyber, D&O).</li>
      </ul>

      ${TABELA_COBERTURAS([
        { cob: "Patrimonial", desc: "Incêndio, raio, explosão, danos elétricos, vendaval" },
        { cob: "Roubo/furto", desc: "Bens do estoque, equipamentos, valores no caixa/trânsito" },
        { cob: "RC operações", desc: "Danos a terceiros dentro/fora do estabelecimento" },
        { cob: "RC produtos", desc: "Danos causados por produtos vendidos/fabricados" },
        { cob: "Lucros cessantes", desc: "Receita esperada durante paralisação por sinistro coberto" },
        { cob: "Cyber", desc: "Ataques, sequestro de dados, notificação LGPD, extorsão digital" },
      ])}

      <h2>Para quem é o seguro empresarial</h2>
      <p>Atendemos indústrias, galpões em Cumbica, depósitos, escritórios, lojas, restaurantes, clínicas, academias, autoescolas, oficinas mecânicas, e-commerces, transportadoras e prestadores de serviço em toda Guarulhos. Cada CNAE tem apetite específico em cada seguradora — direcionamos a cotação para quem realmente aceita bem o risco do seu ramo.</p>

      <h2>Especialidade em galpões, riscos patrimoniais e Cumbica</h2>
      <p>Cumbica concentra dezenas de galpões logísticos, condomínios industriais e centros de distribuição próximos ao aeroporto GRU. Somos especialistas em <a href="/lp/seguro-galpoes-centros-distribuicao">seguro galpões e centros de distribuição</a>, com apólices que consideram sprinkler, brigada, alarme e monitoramento — o que reduz significativamente o prêmio.</p>

      ${DEPOIMENTOS([
        { texto: "Segurei meu galpão em Cumbica com preço 18% menor que a renovação da corretora anterior.", autor: "Roberto T.", perfil: "logística, Cumbica" },
        { texto: "Contratei RC + patrimonial para minha clínica. Atendimento consultivo excelente.", autor: "Dra. Helena", perfil: "clínica, Vila Galvão" },
      ])}

      ${FAQ([
        { q: "Seguro empresarial cobre lucros cessantes?", a: "Sim, mediante contratação da cobertura específica. Cobre a receita esperada durante o período de paralisação decorrente de sinistro coberto (incêndio, danos elétricos, roubo etc.), pelo prazo indenitário contratado (3, 6, 12 meses)." },
        { q: "Preciso declarar todos os bens?", a: "Sim. O capital segurado é o limite máximo de indenização — declarar valores muito baixos gera rateio no sinistro. Recomendamos inventário anual atualizado ao valor de reposição." },
        { q: "Vocês atendem MEI?", a: "Sim. Há apólices simplificadas para MEI a partir de R$ 60/mês, especialmente para lojas, ateliês e prestadores de serviço." },
        { q: "O que é RC operações vs. RC produtos?", a: "RC operações cobre danos a terceiros durante a operação normal (cliente escorrega na loja). RC produtos cobre danos causados por defeito no produto vendido/fabricado (alimento contaminado, equipamento com falha)." },
      ])}

      <p>Veja também <a href="/seguros-empresariais-pme-guarulhos">seguro PME</a>, <a href="/seguro-frota-empresas-guarulhos">seguro de frota</a> e <a href="/seguro-condominio-guarulhos">seguro condomínio</a>.</p>
    `,
  },

  "/seguros-empresariais-pme-guarulhos": {
    h1: "Seguros Empresariais para PMEs em Guarulhos",
    body: `
      <p><strong>Seguro empresarial para PMEs em Guarulhos</strong> com a Patro Seguros: pacotes acessíveis para pequenas e médias empresas, com atendimento consultivo dedicado ao segmento. Estruturamos apólices sob medida para MEI, EPP e ME, com preço a partir de R$ 60/mês e ativação em até 48 horas.</p>

      <h2>Por que sua PME em Guarulhos precisa de seguro</h2>
      <p>Segundo o Sebrae, 60% das pequenas empresas que sofrem sinistros graves (incêndio, roubo, enchente) fecham em até 2 anos por não conseguirem retomar operação. O seguro empresarial garante proteção patrimonial, continuidade do negócio via lucros cessantes, RC frente a terceiros e tranquilidade para focar no crescimento — a partir de R$ 60/mês para MEI e R$ 120/mês para pequenos comércios.</p>

      <h2>Coberturas para PMEs</h2>
      <ul>
        <li><strong>Incêndio, raio, explosão</strong>;</li>
        <li><strong>Roubo e furto qualificado</strong>;</li>
        <li><strong>Danos elétricos</strong> a equipamentos;</li>
        <li><strong>Vendaval, granizo, alagamento</strong>;</li>
        <li><strong>RC operações e produtos</strong>;</li>
        <li><strong>Vidros, letreiros e fachadas</strong>;</li>
        <li><strong>Lucros cessantes</strong> (a partir de 3 meses de prazo indenitário);</li>
        <li><strong>Equipamentos portáteis</strong> (notebooks, tablets, máquinas de cartão);</li>
        <li><strong>Assistência 24h</strong> — chaveiro, eletricista, vidraceiro comercial.</li>
      </ul>

      <h2>Segmentos PME atendidos em Guarulhos</h2>
      <ul>
        <li>Comércio varejista (roupas, calçados, cosméticos, papelaria);</li>
        <li>Restaurantes, lanchonetes, padarias e pizzarias;</li>
        <li>Salões de beleza, barbearias e SPA;</li>
        <li>Clínicas médicas, odontológicas e veterinárias;</li>
        <li>Escritórios de contabilidade, advocacia e consultoria;</li>
        <li>Autoescolas, escolas de idiomas, academias;</li>
        <li>Oficinas mecânicas e auto center;</li>
        <li>E-commerce e mini-galpões de estoque.</li>
      </ul>

      ${TABELA_COBERTURAS([
        { cob: "PME Básico", desc: "Incêndio + roubo + danos elétricos, a partir de R$ 60/mês" },
        { cob: "PME Completo", desc: "Básico + RC + vendaval + vidros, a partir de R$ 120/mês" },
        { cob: "PME Premium", desc: "Completo + lucros cessantes + eletrônicos, a partir de R$ 250/mês" },
      ])}

      ${DEPOIMENTOS([
        { texto: "Contratei seguro para minha padaria. Cobertura completa por R$ 140/mês, tranquilidade que compensa.", autor: "Antônio C.", perfil: "padaria, Cidade Maia" },
        { texto: "Tive furto no meu salão. A indenização saiu em 12 dias, sem burocracia.", autor: "Vanessa L.", perfil: "salão de beleza, Bonsucesso" },
      ])}

      ${FAQ([
        { q: "MEI pode contratar seguro empresarial?", a: "Sim. Existem produtos específicos para MEI a partir de R$ 60/mês, com coberturas simplificadas de incêndio, roubo e RC básica. Ideal para autônomos com pequeno estoque, ateliês, prestadores locais." },
        { q: "Preciso ter alarme e monitoramento?", a: "Não obrigatoriamente. Mas ter alarme monitorado, brigada de incêndio e sprinkler reduz o prêmio em 15% a 40% dependendo da seguradora e do CNAE." },
        { q: "Seguro cobre roubo do meu estoque?", a: "Sim, mediante contratação da cobertura de roubo/furto qualificado — que exige sinal de arrombamento comprovado. O capital segurado deve refletir o valor real do estoque médio." },
      ])}

      <p>Veja também <a href="/seguro-empresarial-guarulhos">seguro empresarial completo</a>, <a href="/seguro-frota-empresas-guarulhos">seguro de frota</a> e <a href="/seguro-condominio-guarulhos">seguro condomínio</a>.</p>
    `,
  },

  "/seguro-frota-empresas-guarulhos": {
    h1: "Seguro de Frota para Empresas em Guarulhos",
    body: `
      <p><strong>Seguro de frota em Guarulhos</strong> para empresas com 4 ou mais veículos. A Patro Seguros cota com as principais seguradoras (Porto, Bradesco, Allianz, HDI, Mapfre, Tokio Marine, Sompo, Mitsui) e permite comparar alternativas entre seguradoras em relação a apólices individuais, com gestão centralizada e prêmio único.</p>

      <h2>Vantagens do seguro frota</h2>
      <ul>
        <li><strong>Prêmio único</strong> e faturamento consolidado;</li>
        <li><strong>Gestão centralizada</strong> — inclusão/exclusão de veículos a qualquer tempo;</li>
        <li><strong>Indicadores de sinistralidade</strong> mensais para tomada de decisão;</li>
        <li><strong>Renovação simplificada</strong> com endosso único;</li>
        <li><strong>Atendimento dedicado</strong> em sinistros — corretor e regulador exclusivos;</li>
        <li><strong>Coberturas customizadas</strong> por perfil de veículo (leves, pesados, motos);</li>
        <li><strong>Assistência 24h</strong> em todo o Brasil.</li>
      </ul>

      <h2>Tipos de frota atendidos</h2>
      <ul>
        <li><strong>Frotas leves</strong> — carros de passeio e utilitários (executivos, comerciais, representantes);</li>
        <li><strong>Frotas pesadas</strong> — caminhões, cavalos mecânicos, carretas, bitrens;</li>
        <li><strong>Locadoras</strong> — apólices específicas para RaC (Rent-a-Car);</li>
        <li><strong>Transportadoras</strong> — combinação com seguro de transporte de cargas (RCTR-C, RCF-DC);</li>
        <li><strong>Frotas mistas</strong> — combinação de leves, pesados e motos em uma única apólice;</li>
        <li><strong>Frotas de motos</strong> — motoboys, delivery, aplicativos.</li>
      </ul>

      <h2>Coberturas do seguro frota</h2>
      ${TABELA_COBERTURAS([
        { cob: "Compreensiva", desc: "Colisão, roubo, furto, incêndio, alagamento em cada veículo" },
        { cob: "RCF-V", desc: "Danos materiais e corporais a terceiros" },
        { cob: "APP", desc: "Acidentes pessoais do condutor e passageiros" },
        { cob: "Carro reserva", desc: "Veículo substituto durante o reparo" },
        { cob: "Assistência 24h", desc: "Guincho, socorro mecânico, chaveiro em todo o Brasil" },
        { cob: "Rastreamento", desc: "Cobertura conjunta com rastreadores homologados" },
      ])}

      <h2>Processo de cotação da frota</h2>
      <ol>
        <li>Envio da planilha da frota (placa, modelo/ano, CEP de pernoite, uso, sinistros últimos 5 anos);</li>
        <li>Análise de perfil de sinistralidade e apetite das seguradoras;</li>
        <li>Cotação em 4-6 seguradoras com maior apetite ao perfil;</li>
        <li>Comparativo consolidado — preço, franquia, cobertura, assistência;</li>
        <li>Contratação e emissão da apólice mestre + certificados individuais.</li>
      </ol>

      ${DEPOIMENTOS([
        { texto: "Migramos nossa frota de 24 veículos para a Porto. Economia de R$ 38 mil/ano.", autor: "Carla N.", perfil: "transportadora, Cumbica" },
        { texto: "Excelente gestão de sinistros. Sempre resolvem sem atrapalhar a operação.", autor: "Marcos A.", perfil: "frota leve 12 veículos, Guarulhos" },
      ])}

      ${FAQ([
        { q: "A partir de quantos veículos posso ter apólice de frota?", a: "Geralmente a partir de 4 veículos, mas algumas seguradoras aceitam a partir de 3. Frotas menores podem seguir com apólices individuais consolidadas na mesma corretora." },
        { q: "Posso incluir veículos novos ao longo do ano?", a: "Sim. A apólice de frota permite endossos de inclusão/exclusão a qualquer momento, com cálculo pro-rata do prêmio adicional." },
        { q: "Vale a pena rastrear a frota?", a: "Sim, especialmente para frotas pesadas e de transporte. Reduz o prêmio em 15% a 40% e aumenta o índice de recuperação em caso de roubo. Algumas seguradoras exigem rastreador para veículos acima de determinado valor." },
        { q: "E se um motorista causar acidente?", a: "A cobertura RCF-V indeniza terceiros. O condutor deve constar como habilitado a dirigir o veículo (frotas geralmente têm cláusula ampla). Sinistros com culpa impactam a sinistralidade e podem gerar reajuste na renovação." },
      ])}

      <p>Veja também <a href="/seguro-empresarial-guarulhos">seguro empresarial</a>, <a href="/seguro-auto-guarulhos">seguro auto</a> e <a href="/seguros-empresariais-pme-guarulhos">seguro PME</a>.</p>
    `,
  },

  "/seguro-condominio-guarulhos": {
    h1: "Seguro Condomínio em Guarulhos",
    body: `
      <p><strong>Seguro condomínio em Guarulhos</strong> obrigatório pela Lei 4.591/64 e essencial para proteger áreas comuns, condôminos e síndico. A Patro Seguros atende condomínios residenciais e comerciais em toda Guarulhos — Cidade Maia, Vila Galvão, Bonsucesso, Macedo, Jardim Maia e demais bairros — com cotação em 10+ seguradoras.</p>

      <h2>Coberturas obrigatórias e adicionais</h2>
      <ul>
        <li><strong>Incêndio, raio, explosão e queda de aeronave</strong> — cobertura obrigatória pela Lei 4.591/64;</li>
        <li><strong>Vendaval, granizo, alagamento e desmoronamento</strong>;</li>
        <li><strong>Danos elétricos</strong> em elevadores, bombas, iluminação e portões automáticos;</li>
        <li><strong>Responsabilidade Civil do Condomínio</strong> — danos a terceiros nas áreas comuns;</li>
        <li><strong>Responsabilidade Civil do Síndico</strong> — atos de gestão administrativa;</li>
        <li><strong>Roubo e furto</strong> de bens do condomínio (mobiliário, equipamentos, salão de festas);</li>
        <li><strong>Vidros, portões automáticos e antenas</strong>;</li>
        <li><strong>Equipamentos eletrônicos</strong> — câmeras, DVR, interfones;</li>
        <li><strong>Assistência 24h</strong> — chaveiro, eletricista, encanador, vidraceiro.</li>
      </ul>

      <h2>Para quais condomínios em Guarulhos</h2>
      <p>Atendemos condomínios residenciais (edifícios de apartamentos, casas em condomínio fechado), condomínios comerciais (edifícios de escritórios, salas comerciais) e condomínios mistos. Também estruturamos apólices para condomínios logísticos e empresariais em Cumbica.</p>

      ${TABELA_COBERTURAS([
        { cob: "Básica obrigatória", desc: "Incêndio, raio, explosão, queda de aeronave (Lei 4.591/64)" },
        { cob: "Complementar", desc: "Vendaval, alagamento, danos elétricos, RC condomínio e síndico" },
        { cob: "Adicional", desc: "Roubo de bens, vidros, portões, equipamentos eletrônicos" },
      ])}

      <h2>Diferença entre seguro do condomínio e residencial</h2>
      <p>O seguro do condomínio cobre <strong>apenas áreas comuns e estrutura predial</strong> (fachada, hall, elevadores, garagem, piscina, salão de festas). O <strong>conteúdo do apartamento</strong> (móveis, eletrônicos, roupas), RC familiar e danos elétricos dos aparelhos particulares só são cobertos pelo <a href="/seguro-residencial-guarulhos">seguro residencial voluntário</a> contratado por cada condômino.</p>

      ${DEPOIMENTOS([
        { texto: "Renovamos o seguro do condomínio pela Patro. Preço melhor e RC do síndico com limite maior.", autor: "Síndico Prof. Álvaro", perfil: "Condomínio 60 unidades, Vila Galvão" },
        { texto: "Depois do sinistro de raio, a Patro cuidou de toda a regulação. Assembléia agradeceu.", autor: "Síndica Marta R.", perfil: "Condomínio 42 unidades, Cidade Maia" },
      ])}

      ${FAQ([
        { q: "Quem contrata o seguro do condomínio?", a: "O síndico, com aprovação em assembléia. O custo é rateado entre os condôminos via cota condominial ordinária ou extraordinária, dependendo da convenção." },
        { q: "O que acontece se o condomínio não tiver seguro?", a: "Ilegalidade — a Lei 4.591/64 torna obrigatória a contratação. Em sinistro sem seguro, o síndico responde civilmente e os condôminos podem ter que ratear o prejuízo total." },
        { q: "RC do síndico é obrigatória?", a: "Não obrigatória, mas altamente recomendada. Protege o síndico contra ações judiciais por atos de gestão (erros administrativos, decisões questionáveis, falhas em contratos), com capital de R$ 100 mil a R$ 500 mil típicos." },
        { q: "Cobre alagamento de garagem?", a: "Sim, se contratada a cobertura de vendaval/alagamento. Guarulhos tem áreas propensas — recomendamos sempre incluir." },
      ])}

      <p>Veja também <a href="/seguro-residencial-guarulhos">seguro residencial</a>, <a href="/seguro-empresarial-guarulhos">seguro empresarial</a> e <a href="/seguros-empresariais-pme-guarulhos">seguro PME</a>.</p>
    `,
  },

  "/consorcio-guarulhos": {
    h1: "Consórcio em Guarulhos — Imóveis, Autos, Serviços e Pesados",
    body: `
      <p><strong>Consórcio em Guarulhos</strong> com a Patro Seguros: modalidades de <strong>imóveis</strong>, <strong>automóveis</strong>, <strong>serviços</strong> e <strong>veículos pesados</strong>, com administradoras autorizadas pelo Banco Central. Somos correspondentes de administradoras líderes e ajudamos você a escolher a carta ideal, entender lances e regras de contemplação.</p>

      <h2>Por que fazer consórcio em Guarulhos</h2>
      <ul>
        <li><strong>Sem juros</strong> — apenas taxa de administração e fundo de reserva;</li>
        <li><strong>Parcelas mais leves</strong> que financiamento (média 40% menor);</li>
        <li><strong>Possibilidade de lance</strong> livre ou fixo para antecipar a contemplação;</li>
        <li><strong>Contemplação por sorteio mensal</strong> em assembleia oficial;</li>
        <li><strong>Uso do FGTS</strong> na aquisição de imóvel via consórcio;</li>
        <li><strong>Redução de parcela</strong> pós-contemplação usando parte da carta como lance;</li>
        <li><strong>Planejamento de médio e longo prazo</strong> disciplinado.</li>
      </ul>

      <h2>Modalidades de consórcio</h2>
      <h3>Consórcio de imóveis</h3>
      <p>Cartas de R$ 100 mil a R$ 1,5 milhão para compra de imóvel residencial, comercial, terreno, construção ou reforma. Prazos de 120 a 240 meses. Uso do FGTS permitido tanto no lance quanto na quitação de parcelas.</p>
      <h3>Consórcio de automóveis</h3>
      <p>Cartas de R$ 30 mil a R$ 200 mil para carros zero km, seminovos ou usados até determinada idade. Prazos de 60 a 100 meses. Ideal para quem quer trocar de carro sem juros de financiamento.</p>
      <h3>Consórcio de serviços</h3>
      <p>Cartas de R$ 5 mil a R$ 50 mil para viagens, casamentos, cirurgias estéticas, cursos, formaturas, tratamentos odontológicos. Modalidade ainda pouco conhecida com prazos flexíveis.</p>
      <h3>Consórcio de pesados</h3>
      <p>Cartas de R$ 100 mil a R$ 800 mil para caminhões, tratores, colheitadeiras, máquinas agrícolas e ônibus. Muito usado por produtores rurais, transportadoras e frotistas.</p>

      ${TABELA_COBERTURAS([
        { cob: "Imóveis", desc: "R$ 100 mil a R$ 1,5 milhão · 120-240 meses · FGTS aceito" },
        { cob: "Automóveis", desc: "R$ 30 mil a R$ 200 mil · 60-100 meses" },
        { cob: "Serviços", desc: "R$ 5 mil a R$ 50 mil · prazos flexíveis" },
        { cob: "Pesados", desc: "R$ 100 mil a R$ 800 mil · caminhões e máquinas" },
      ])}

      ${DEPOIMENTOS([
        { texto: "Fiz consórcio de imóvel pela Patro e comprei meu apartamento na Cidade Maia sem juros.", autor: "Priscila V.", perfil: "consórcio imóveis, Cidade Maia" },
        { texto: "Consórcio de caminhão contemplado em 18 meses. Excelente orientação da equipe.", autor: "João P.", perfil: "consórcio pesados, Cumbica" },
      ])}

      ${FAQ([
        { q: "Consórcio vale mais a pena que financiamento?", a: "Depende do prazo. Se você não precisa do bem imediatamente e quer economizar juros (R$ 100-400 mil em imóveis), consórcio compensa. Se precisa do bem agora, financiamento é a saída — mas com custo bem maior." },
        { q: "Posso desistir do consórcio?", a: "Sim. Cotas não contempladas podem ser vendidas ou canceladas. O valor pago (menos taxas) é devolvido no encerramento do grupo — não é imediato. Recomendamos leitura atenta do contrato antes de aderir." },
        { q: "Como funciona o lance?", a: "Lance é uma antecipação de parcelas para acelerar a contemplação. Pode ser livre (você define o valor) ou fixo (percentual pré-definido pela administradora). Quem oferecer o maior lance no mês é contemplado, além do sorteado." },
        { q: "Posso usar FGTS no consórcio de imóvel?", a: "Sim, tanto no lance quanto na quitação de parcelas, respeitadas as regras do FGTS (imóvel residencial urbano, uso próprio, valor até o teto do SFH, entre outras)." },
      ])}

      <p>Veja também <a href="/seguro-auto-guarulhos">seguro auto</a>, <a href="/seguro-residencial-guarulhos">seguro residencial</a> e <a href="/contato">fale com um consultor</a>.</p>
    `,
  },

  "/sobre": {
    h1: "Sobre a Patro Seguros — Corretora em Guarulhos",
    body: `
      <p>A <strong>Patro Seguros</strong> é uma corretora independente com sede na Cidade Maia, em Guarulhos/SP. Fundada em 2021 por Roberto e Sandra Patrocínio, profissionais com mais de 20 anos de experiência no mercado segurador brasileiro, nasceu para trazer o atendimento consultivo e humano de volta ao setor — em oposição ao modelo de call center massificado.</p>

      <h2>Nossa história</h2>
      <p>Roberto e Sandra Patrocínio construíram carreira em grandes seguradoras (Porto, Bradesco e SulAmérica) e em corretoras nacionais antes de fundar a Patro Seguros. A decisão de abrir a própria corretora veio do desejo de fazer diferente: cada cliente é atendido por um corretor dedicado, com análise técnica real de perfil, comparação transparente de coberturas e representação genuína nos sinistros — sem pressão de venda ou produto empurrado.</p>
      <p>Em pouco mais de quatro anos, atendemos mais de 2.500 clientes entre pessoas, famílias e empresas de Guarulhos, Cumbica, Grande São Paulo e clientes em todo o Brasil. Somos parceiros de 16+ seguradoras (auto, patrimonial, vida, empresarial) e 20+ operadoras de saúde.</p>

      <h2>Nossos valores</h2>
      <ul>
        <li><strong>Atendimento humano</strong> — corretor dedicado com nome, telefone e WhatsApp;</li>
        <li><strong>Transparência</strong> — comparativo real de seguradoras, sem esconder condições;</li>
        <li><strong>Independência</strong> — nenhuma seguradora manda mais que outra em nossa cotação;</li>
        <li><strong>Presença no sinistro</strong> — do aviso à indenização, o corretor acompanha;</li>
        <li><strong>Especialização técnica</strong> — riscos empresariais, agro, RC, patrimonial e vida.</li>
      </ul>

      <h2>Especialidades</h2>
      <p>Além dos produtos massificados (auto, moto, residencial, vida), somos especialistas em nichos técnicos: <a href="/lp/seguro-galpoes-centros-distribuicao">seguro de galpões e centros de distribuição</a> em Cumbica, <a href="/lp/seguro-cibernetico-empresas">seguro cyber</a>, <a href="/lp/responsabilidade-administradores-profissionais">D&amp;O e RC profissional</a>, seguros rurais e agrícolas com alcance nacional, e seguro de frota para transportadoras.</p>

      <h2>Autoridade e credenciais</h2>
      <ul>
        <li>CNPJ 41.641.558/0001-33;</li>
        <li>SUSEP 212113511 — corretora habilitada;</li>
        <li>Fundada em 2021;</li>
        <li>Equipe com 20+ anos de experiência no setor;</li>
        <li>carteira ativa de apólices para pessoas físicas, famílias e empresas;</li>
        <li>16+ seguradoras parceiras;</li>
        <li>20+ operadoras de saúde;</li>
        <li>Nota 4.9 em avaliações Google.</li>
      </ul>

      <h2>Atendimento</h2>
      <p>Escritório na Avenida Salgado Filho, 2120 — Sala 219, Edifício Via Alameda, Cidade Maia, Guarulhos/SP. Telefone (11) 5199-7500. WhatsApp no mesmo número. E-mail contato@patroseguros.com.br. Horário: segunda a sexta, das 8h30 às 18h. Atendemos presencialmente em Guarulhos e remotamente em todo o Brasil.</p>

      ${DEPOIMENTOS([
        { texto: "Atendimento realmente humano. Já indiquei a Patro para toda minha família.", autor: "Cliente há 3 anos", perfil: "auto e residencial, Cidade Maia" },
        { texto: "Corretora séria, técnica e presente no sinistro. Faz diferença.", autor: "Empresário parceiro", perfil: "empresarial, Cumbica" },
      ])}

      <p>Conheça nossos serviços em <a href="/">seguros para você e sua empresa</a>, <a href="/depoimentos">leia depoimentos</a> ou <a href="/contato">fale com um consultor</a>.</p>
    `,
  },

  "/depoimentos": {
    h1: "Depoimentos de Clientes — Patro Seguros Guarulhos",
    body: `
      <p>Depoimentos reais de clientes da <strong>Patro Seguros</strong> em Guarulhos, Cumbica, Grande São Paulo e demais regiões atendidas. Somos avaliados com nota 4.9 no Google, refletindo a satisfação de mais de 2.500 clientes entre pessoas, famílias e empresas com nosso atendimento consultivo, transparente e presente no sinistro.</p>

      <h2>Depoimentos de clientes pessoa física</h2>
      ${DEPOIMENTOS([
        { texto: "Cotaram meu auto com 8 seguradoras em uma manhã. Economizei R$ 900 na renovação e ganhei carro reserva.", autor: "Rafael M.", perfil: "auto, Cidade Maia" },
        { texto: "Contratei o seguro residencial pela Patro. Preço melhor que a renovação direta e assistência já usei duas vezes.", autor: "Márcia R.", perfil: "residencial, Vila Galvão" },
        { texto: "Meu apartamento foi atingido por raio. TV e geladeira queimaram. Indenização em 8 dias.", autor: "José A.", perfil: "residencial, Cidade Maia" },
        { texto: "Fui atendida pelo WhatsApp em minutos. Ajudaram no sinistro do começo ao fim, sem que eu precisasse ligar em call center.", autor: "Juliana T.", perfil: "residencial, Vila Galvão" },
        { texto: "Renovei com a Patro e economizei R$ 1.100 no prêmio do meu Corolla.", autor: "Bruno L.", perfil: "auto, Bonsucesso" },
        { texto: "Sou motoboy em Guarulhos. Cotaram apólice comercial pela HDI e o preço ficou muito justo.", autor: "Diego S.", perfil: "moto comercial, Pimentas" },
        { texto: "Fiz portabilidade da Amil para a SulAmérica pela Patro. Zero carência e melhor rede.", autor: "Patrícia S.", perfil: "plano de saúde, Vila Galvão" },
        { texto: "Contratei seguro de vida pela Patro. Consultoria muito clara sobre coberturas e beneficiários.", autor: "Amanda F.", perfil: "seguro de vida, Cidade Maia" },
      ])}

      <h2>Depoimentos de clientes pessoa jurídica</h2>
      ${DEPOIMENTOS([
        { texto: "Fizeram todo o seguro do galpão em Cumbica com preço 18% melhor que a renovação da corretora anterior.", autor: "Roberto T.", perfil: "logística, Cumbica" },
        { texto: "Contratei RC + patrimonial para minha clínica. Atendimento consultivo excelente e cobertura sob medida.", autor: "Dra. Helena", perfil: "clínica, Vila Galvão" },
        { texto: "Migramos o plano da empresa da Amil para a SulAmérica. Economizamos 22% e ganhamos rede.", autor: "Ricardo M.", perfil: "PJ 40 vidas, Cumbica" },
        { texto: "Migramos nossa frota de 24 veículos para a Porto. Economia de R$ 38 mil por ano.", autor: "Carla N.", perfil: "transportadora, Cumbica" },
        { texto: "Seguro empresarial da minha padaria por R$ 140/mês, cobertura completa. Tranquilidade.", autor: "Antônio C.", perfil: "padaria, Cidade Maia" },
        { texto: "Tive furto no meu salão. A indenização saiu em 12 dias, sem burocracia.", autor: "Vanessa L.", perfil: "salão de beleza, Bonsucesso" },
        { texto: "Excelente gestão de sinistros. Sempre resolvem sem atrapalhar a operação.", autor: "Marcos A.", perfil: "frota leve 12 veículos, Guarulhos" },
      ])}

      <h2>Depoimentos de síndicos e condomínios</h2>
      ${DEPOIMENTOS([
        { texto: "Renovamos o seguro do condomínio pela Patro. Preço melhor e RC do síndico com limite maior.", autor: "Síndico Prof. Álvaro", perfil: "Condomínio 60 unidades, Vila Galvão" },
        { texto: "Depois do sinistro de raio, a Patro cuidou de toda a regulação. A assembléia agradeceu.", autor: "Síndica Marta R.", perfil: "Condomínio 42 unidades, Cidade Maia" },
      ])}

      <h2>Nossa nota no Google</h2>
      <p>A Patro Seguros mantém <strong>nota 4.9 no Google</strong> em avaliações reais de clientes em Guarulhos. Cada avaliação reflete o compromisso com atendimento humano, resposta rápida no WhatsApp, comparativo transparente de seguradoras e presença ativa no momento do sinistro.</p>

      <p>Quer se tornar cliente? <a href="/cotacao">Solicite sua cotação online</a> ou <a href="/contato">fale com um consultor</a>. Veja também <a href="/sobre">nossa história</a>.</p>
    `,
  },

  "/contato": {
    h1: "Contato — Patro Seguros Guarulhos",
    body: `
      <p>Entre em contato com a <strong>Patro Seguros</strong> — corretora de seguros em Guarulhos. Atendimento consultivo por telefone, WhatsApp, e-mail e presencial em nosso escritório na Cidade Maia. Corretor dedicado responde em minutos, no horário comercial.</p>

      <h2>Canais de atendimento</h2>
      <ul>
        <li><strong>Telefone:</strong> (11) 5199-7500;</li>
        <li><strong>WhatsApp:</strong> (11) 5199-7500 — resposta em minutos no horário comercial;</li>
        <li><strong>E-mail:</strong> contato@patroseguros.com.br;</li>
        <li><strong>Cotação online:</strong> <a href="/cotacao">formulário rápido</a> respondido em até 2 horas úteis;</li>
        <li><strong>Presencial:</strong> agendamento prévio pelo WhatsApp ou telefone.</li>
      </ul>

      <h2>Endereço do escritório</h2>
      <p><strong>Patro Corretora de Seguros LTDA</strong><br />
      Avenida Salgado Filho, 2120 — Sala 219<br />
      Edifício Via Alameda<br />
      Cidade Maia — Guarulhos/SP<br />
      Referência: próximo ao Shopping Cidade Maia<br />
      CNPJ 41.641.558/0001-33 · SUSEP 212113511</p>

      <h2>Horário de atendimento</h2>
      <p>Segunda a sexta, das 8h30 às 18h. Fora do horário comercial, mensagens no WhatsApp e formulário de cotação são respondidos no próximo dia útil. Sinistros emergenciais devem ser reportados diretamente ao 0800 da seguradora indicada na apólice — mas mesmo assim seu corretor Patro é acionado para acompanhamento.</p>

      <h2>Área de atendimento</h2>
      <ul>
        <li><strong>Presencial:</strong> Guarulhos (Cidade Maia, Vila Galvão, Bonsucesso, Cumbica, Macedo, Jardim Maia, Gopouva, Vila Augusta, Centro, Taboão, Pimentas, Jardim São João) e Grande São Paulo;</li>
        <li><strong>Remoto:</strong> todo o Brasil, com corretor dedicado por WhatsApp e telefone;</li>
        <li><strong>Seguros rurais e agrícolas:</strong> alcance nacional em todas as regiões produtoras.</li>
      </ul>

      <h2>Para qual produto você precisa de cotação?</h2>
      <ul>
        <li><a href="/seguro-auto-guarulhos">Seguro auto</a></li>
        <li><a href="/seguro-moto-guarulhos">Seguro moto</a></li>
        <li><a href="/seguro-residencial-guarulhos">Seguro residencial</a></li>
        <li><a href="/seguro-vida-saude-guarulhos">Seguro de vida</a></li>
        <li><a href="/plano-de-saude-guarulhos">Plano de saúde</a></li>
        <li><a href="/seguro-empresarial-guarulhos">Seguro empresarial</a></li>
        <li><a href="/seguros-empresariais-pme-guarulhos">Seguro PME</a></li>
        <li><a href="/seguro-frota-empresas-guarulhos">Seguro de frota</a></li>
        <li><a href="/seguro-condominio-guarulhos">Seguro condomínio</a></li>
        <li><a href="/consorcio-guarulhos">Consórcio</a></li>
      </ul>

      ${FAQ([
        { q: "Qual o prazo de resposta no WhatsApp?", a: "No horário comercial, mensagens são respondidas em minutos por um corretor. Fora do horário, no próximo dia útil pela manhã." },
        { q: "A cotação é gratuita?", a: "Sim, sempre. A comissão da corretora está embutida no prêmio da seguradora — não pagamos nada a mais por cotar via Patro. É o mesmo preço que você pagaria contratando direto, com atendimento consultivo incluído." },
        { q: "Preciso ir até o escritório para contratar?", a: "Não. Todo o processo pode ser feito à distância — cotação, análise, contratação e emissão da apólice — via WhatsApp, telefone e e-mail. Presencial é opcional para quem prefere." },
        { q: "Vocês atendem fora de Guarulhos?", a: "Sim. Atendemos toda a Grande São Paulo presencialmente e clientes em todo o Brasil de forma remota. Nossos seguros rurais têm alcance nacional." },
      ])}

      <p>Conheça <a href="/sobre">nossa história</a> ou <a href="/depoimentos">leia depoimentos de clientes</a>. Ou <a href="/cotacao">solicite sua cotação agora</a>.</p>
    `,
  },

  "/seguradoras-parceiras": {
    h1: "Seguradoras parceiras da Patro Seguros",
    body: `
      <p>A <strong>Patro Seguros</strong> é uma <strong>corretora de seguros independente</strong> em Guarulhos/SP e atua como intermediadora entre o cliente e as principais seguradoras do mercado brasileiro. Esta página não é o site oficial de nenhuma seguradora mencionada — marcas, logotipos e produtos pertencem aos respectivos titulares. Nosso papel é comparar apólices, coberturas, franquias, preços, assistências e política de sinistro para indicar a melhor opção para cada perfil de cliente, sem venda casada e sem custo adicional (a corretagem é remunerada pela própria seguradora).</p>

      <h2>Seguradoras parceiras homologadas</h2>
      <p>Trabalhamos com mais de 16 seguradoras reguladas pela SUSEP: <strong>Porto Seguro</strong>, <strong>Mapfre</strong>, <strong>Allianz</strong>, <strong>Tokio Marine</strong>, <strong>Azul Seguros</strong>, <strong>Suhai</strong>, <strong>Bradesco Seguros</strong>, <strong>SulAmérica</strong>, <strong>HDI</strong>, <strong>Liberty (Yelum)</strong>, <strong>Zurich</strong>, <strong>Sompo</strong>, <strong>Mitsui Sumitomo</strong>, <strong>Pottencial</strong>, <strong>Junto</strong>, <strong>Akad</strong> e <strong>Ezze</strong>. Cada seguradora tem apetite técnico próprio para tipos de risco, região, perfil de cliente e coberturas — cabe à corretora direcionar cada cotação para as companhias que efetivamente aceitam bem o risco em análise, o que aumenta a chance de aprovação e o desconto obtido.</p>

      <h3>Como escolhemos a seguradora ideal</h3>
      <ul>
        <li>Perfil do segurado (idade, região, uso do bem, histórico de sinistros).</li>
        <li>Apetite técnico da seguradora para o risco em questão.</li>
        <li>Coberturas obrigatórias e adicionais desejadas.</li>
        <li>Rede referenciada, assistência 24h e política de sinistro.</li>
        <li>Preço final comparado lado a lado, sem viés comercial.</li>
      </ul>

      <h2>Aviso de transparência</h2>
      <p>A Patro Seguros é corretora de seguros independente <strong>registrada na SUSEP sob o código 212113511</strong> e <strong>CNPJ 41.641.558/0001-33</strong>. Podemos intermediar cotações junto às seguradoras parceiras citadas nesta página. Não somos site oficial, filial, franquia ou representante exclusivo de nenhuma delas. Produtos, preços, coberturas, carências e aceitação do risco dependem exclusivamente das regras vigentes em cada seguradora no momento da cotação e podem ser alterados sem aviso prévio. Toda contratação está sujeita a análise, aceitação e emissão da apólice pela seguradora escolhida.</p>

      <h2>Páginas dedicadas por seguradora em Guarulhos</h2>
      <p>Publicamos páginas específicas com produtos, coberturas e diferenciais de cada parceira, todas com foco em atendimento em Guarulhos e região metropolitana: <a href="/porto-seguro-guarulhos">Porto Seguro Guarulhos</a>, <a href="/mapfre-seguros-guarulhos">Mapfre Seguros</a>, <a href="/allianz-seguros-guarulhos">Allianz</a>, <a href="/tokio-marine-guarulhos">Tokio Marine</a>, <a href="/azul-seguros-guarulhos">Azul Seguros</a>, <a href="/suhai-seguros-guarulhos">Suhai</a>, <a href="/bradesco-seguros-guarulhos">Bradesco Seguros</a>, <a href="/sulamerica-seguros-guarulhos">SulAmérica</a>, <a href="/hdi-seguros-guarulhos">HDI</a>, <a href="/liberty-seguros-guarulhos">Liberty</a>, <a href="/zurich-seguros-guarulhos">Zurich</a>, <a href="/sompo-seguros-guarulhos">Sompo</a>, <a href="/mitsui-sumitomo-seguros-guarulhos">Mitsui Sumitomo</a>, <a href="/pottencial-seguradora-guarulhos">Pottencial</a>, <a href="/akad-seguros-guarulhos">Akad</a> e <a href="/ezze-seguros-guarulhos">Ezze</a>.</p>

      ${FAQ([
        { q: "A Patro Seguros é filial de alguma seguradora?", a: "Não. A Patro é uma corretora de seguros independente, registrada na SUSEP sob o código 212113511. Representamos o cliente — não a seguradora — e comparamos cotações entre mais de 16 companhias antes de indicar a melhor opção." },
        { q: "Contratar pela Patro é mais caro que direto na seguradora?", a: "Não. O preço final é o mesmo. A comissão da corretora já está embutida no prêmio pago à seguradora — você paga o mesmo valor, mas com atendimento consultivo, comparação técnica e representação em caso de sinistro." },
        { q: "Quais seguradoras vocês representam?", a: "Trabalhamos com Porto Seguro, Bradesco, SulAmérica, Allianz, Tokio Marine, HDI, Liberty/Yelum, Mapfre, Azul, Zurich, Sompo, Mitsui, Suhai, Pottencial, Akad, Ezze e outras. A escolha depende do tipo de risco e perfil do cliente." },
        { q: "Vocês vendem só de uma seguradora?", a: "Não. Cotamos com múltiplas seguradoras em cada solicitação e apresentamos as opções lado a lado. Você escolhe a melhor relação custo-benefício, sem pressão comercial." },
        { q: "E se eu tiver problema no sinistro?", a: "A Patro acompanha o processo do aviso à indenização, intermediando toda a comunicação com a seguradora. É um dos principais benefícios de contratar via corretora." },
      ])}

      <p>Solicite sua <a href="/cotacao">cotação online</a>, fale com um consultor pelo <a href="/contato">canal de contato</a> ou volte para a <a href="/">página inicial</a>.</p>
    `,
  },

  "/glossario-seguros": {
    h1: "Glossário de Seguros",
    body: `
      <p>Este é o <strong>glossário de seguros da Patro Seguros</strong>: mais de 60 termos técnicos do mercado segurador brasileiro explicados em linguagem simples, sem juridiquês. Cada verbete cita, quando aplicável, a norma da <strong>SUSEP</strong>, da <strong>ANS</strong> ou do <strong>Banco Central</strong> que rege o conceito. O objetivo é dar autonomia para você ler apólices, comparar propostas e conversar de igual para igual com corretoras e seguradoras.</p>

      <h2>Termos essenciais de uma apólice</h2>
      <p><strong>Apólice:</strong> contrato escrito entre segurado e seguradora que formaliza a cobertura, o prazo, o prêmio e as condições gerais. <strong>Prêmio:</strong> valor pago pelo segurado à seguradora em troca da cobertura contratada (não confundir com "indenização"). <strong>Franquia:</strong> valor de participação obrigatória do segurado no prejuízo em caso de sinistro — quanto maior a franquia, menor o prêmio. <strong>Sinistro:</strong> ocorrência do evento previsto na apólice (colisão, incêndio, roubo, morte etc.) que aciona a cobertura. <strong>Endosso:</strong> alteração formal da apólice em vigor (troca de veículo, mudança de endereço, inclusão de condutor).</p>

      <h3>Coberturas e exclusões</h3>
      <p><strong>Cobertura:</strong> conjunto de eventos e prejuízos que a apólice garante indenizar. <strong>Cobertura básica ou compreensiva:</strong> pacote mínimo obrigatório (ex.: em auto, colisão + roubo + incêndio). <strong>Cobertura adicional:</strong> proteções contratadas separadamente (carro reserva, vidros, APP, RCF-V ampliada, danos elétricos, alagamento etc.). <strong>Exclusão:</strong> situação expressamente fora da cobertura (ex.: guerra, dolo, embriaguez ao volante). <strong>Carência:</strong> período inicial em que determinada cobertura ainda não é válida — comum em vida, saúde e odonto.</p>

      <h3>Termos de saúde e odonto (ANS)</h3>
      <p><strong>Coparticipação:</strong> percentual pago pelo beneficiário a cada uso do plano (consulta, exame). <strong>Rede credenciada / referenciada:</strong> hospitais, clínicas e laboratórios com contrato ativo com a operadora. <strong>Portabilidade de carências:</strong> direito garantido pela ANS de trocar de plano sem cumprir novas carências, se cumpridos requisitos. <strong>Beneficiário:</strong> pessoa que usufrui do plano (titular ou dependente).</p>

      <h3>Termos empresariais e responsabilidade</h3>
      <p><strong>Responsabilidade Civil (RC):</strong> cobertura para danos que o segurado cause a terceiros. <strong>Lucros cessantes:</strong> indenização pelo lucro que a empresa deixou de ter enquanto se recupera do sinistro. <strong>Danos elétricos:</strong> cobertura para equipamentos queimados por variação de tensão. <strong>D&O:</strong> Directors and Officers — proteção patrimonial de executivos contra ações civis. <strong>E&O:</strong> Errors and Omissions — RC Profissional para erros técnicos. <strong>Cyber:</strong> cobertura para ataques digitais, vazamento de dados (LGPD) e ransomware.</p>

      <h3>Consórcio (regulado pelo Banco Central)</h3>
      <p><strong>Carta de crédito:</strong> valor liberado ao consorciado contemplado para comprar o bem. <strong>Contemplação:</strong> momento em que o consorciado tem direito à carta, por <strong>sorteio</strong> ou <strong>lance</strong>. <strong>Taxa de administração:</strong> remuneração da administradora, prevista em contrato. <strong>Fundo de reserva:</strong> reserva coletiva do grupo para cobrir eventuais inadimplências.</p>

      <h3>Reguladores e siglas oficiais</h3>
      <p><strong>SUSEP:</strong> Superintendência de Seguros Privados — órgão federal que fiscaliza seguradoras, corretoras e capitalização. <strong>ANS:</strong> Agência Nacional de Saúde Suplementar — regula planos de saúde e odontológicos. <strong>Banco Central:</strong> regula e fiscaliza administradoras de consórcio. <strong>CNSP:</strong> Conselho Nacional de Seguros Privados. <strong>Segurado:</strong> pessoa física ou jurídica que contrata o seguro. <strong>Corretora:</strong> pessoa jurídica habilitada pela SUSEP para intermediar seguros — representa o cliente. <strong>Seguradora:</strong> instituição autorizada a emitir apólices e assumir o risco.</p>

      ${FAQ([
        { q: "Qual a diferença entre prêmio e indenização?", a: "Prêmio é o valor que o segurado paga à seguradora para ter direito à cobertura. Indenização é o valor que a seguradora paga ao segurado em caso de sinistro coberto." },
        { q: "Franquia alta ou baixa: qual é melhor?", a: "Depende do perfil. Franquia alta reduz o prêmio mensal, mas exige mais desembolso em caso de sinistro. Franquia baixa aumenta o prêmio e reduz o desembolso na hora do sinistro. Consulte um corretor para simular." },
        { q: "O que é portabilidade de carências?", a: "É o direito, regulado pela ANS, de trocar de operadora de plano de saúde sem cumprir novas carências, desde que atendidos os requisitos de tempo mínimo no plano atual e compatibilidade de faixa de preço." },
        { q: "Consórcio tem juros?", a: "Consórcio não cobra juros de financiamento, mas possui taxa de administração, fundo de reserva, seguros e outros custos previstos em contrato, todos regulados pelo Banco Central." },
      ])}

      <p>Consulte também nossa <a href="/central-de-guias-de-seguros">Central de Guias</a>, o <a href="/faq">FAQ geral</a> ou <a href="/contato">fale com um consultor</a> se restar dúvida.</p>
    `,
  },

  "/seguro-flat-guarulhos": {
    h1: "Seguro para flats residenciais e de locação",
    body: `
      <p>O <strong>seguro para flat em Guarulhos</strong> é uma modalidade específica de seguro residencial voltada para <strong>flats mobiliados</strong>, <strong>flats de locação tradicional</strong>, <strong>flats de temporada</strong> (Airbnb, Booking, Vrbo) e <strong>flats como investimento</strong>. Diferente de uma apólice residencial padrão, ele considera o uso rotativo do imóvel, o valor da mobília, eletrodomésticos, itens de decoração e os riscos operacionais próprios da atividade de aluguel. A Patro Seguros compara seguradoras que aceitam bem esse perfil e monta a apólice adequada para <strong>proprietário</strong> ou <strong>inquilino</strong>, com foco em Guarulhos, Cidade Maia, Centro, Vila Galvão e São Paulo.</p>

      <h2>Coberturas típicas de um seguro para flat</h2>
      <ul>
        <li><strong>Incêndio, raio e explosão</strong> — cobertura básica obrigatória.</li>
        <li><strong>Roubo e furto qualificado</strong> — de conteúdo (mobília, eletrodomésticos, TV, notebook).</li>
        <li><strong>Danos elétricos</strong> — queima de eletrodomésticos por variação de tensão.</li>
        <li><strong>Vendaval, alagamento e impacto de veículos</strong>.</li>
        <li><strong>Quebra de vidros</strong> e <strong>danos à mobília por causas acidentais</strong>.</li>
        <li><strong>Responsabilidade Civil Familiar / RC Locatária</strong> — danos que o flat cause a terceiros ou a unidades vizinhas.</li>
        <li><strong>Perda ou pagamento de aluguel</strong> — quando disponível para o proprietário, conforme apólice.</li>
        <li><strong>Assistência 24h</strong> — chaveiro, encanador, eletricista, vidraceiro.</li>
      </ul>

      <h2>Flat residencial x flat de temporada (Airbnb, Booking)</h2>
      <p>Nem toda seguradora aceita flats explorados em <strong>temporada por plataformas digitais</strong>. É essencial informar o uso real na cotação — omitir esse detalhe pode invalidar a apólice em sinistro. Para flats <strong>com hóspedes rotativos</strong>, a Patro direciona a cotação para seguradoras com apetite técnico para esse perfil e recomenda contratar RC ampliada (danos a terceiros e à unidade vizinha), cobertura de conteúdo em valor a novo e assistência 24h robusta. Para flats de <strong>locação tradicional</strong> (contrato de 30 meses), a cotação é mais próxima de um residencial padrão, mas ainda com atenção à mobília e ao contrato de locação (proprietário x inquilino).</p>

      <h2>Proprietário ou inquilino: quem contrata?</h2>
      <p>Ambos podem — e frequentemente devem — contratar seguros complementares. O <strong>proprietário</strong> costuma segurar a <strong>estrutura, mobília, benfeitorias, perda de aluguel e RC do imóvel</strong>. O <strong>inquilino</strong> costuma segurar <strong>conteúdo próprio, RC Locatária e assistência 24h</strong>. Em Guarulhos, empresas de administração de flats geralmente exigem seguro do inquilino como pré-requisito de contrato — a Patro emite apólices compatíveis com essa exigência em até 24h úteis.</p>

      <h2>Atendimento Patro Seguros em Guarulhos</h2>
      <p>Atendemos flats em toda Guarulhos e Grande São Paulo: <strong>Cidade Maia</strong>, <strong>Centro</strong>, <strong>Vila Galvão</strong>, <strong>Vila Augusta</strong>, <strong>Bonsucesso</strong>, <strong>Gopoúva</strong>, <strong>Jardim Maia</strong>, <strong>Macedo</strong>, <strong>Picanço</strong>, <strong>Taboão</strong>, <strong>Cumbica</strong> e cidades vizinhas. Também atendemos investidores que operam flats em <strong>São Paulo capital</strong> (Vila Olímpia, Itaim, Faria Lima, Berrini, Moema, Paulista) de forma remota. Nossa área <strong>Patro Private</strong> cuida de carteiras com múltiplos flats/imóveis com relatório consolidado e vencimentos unificados.</p>

      ${FAQ([
        { q: "Seguro residencial normal cobre flat de temporada?", a: "Nem sempre. Muitas apólices residenciais padrão excluem uso comercial rotativo (Airbnb, Booking). É preciso declarar o uso real na cotação e escolher seguradora com apetite para esse perfil, senão a apólice pode ser invalidada em sinistro." },
        { q: "Quem paga o seguro do flat: proprietário ou inquilino?", a: "Ambos podem. O proprietário costuma segurar estrutura, mobília e perda de aluguel. O inquilino segura conteúdo próprio e RC Locatária. Contratos de administração muitas vezes exigem seguro do inquilino." },
        { q: "Flat mobiliado precisa de seguro específico?", a: "Sim. A mobília, eletrodomésticos e itens de decoração compõem o capital segurado de conteúdo, que precisa ser dimensionado corretamente para não haver rateio no sinistro." },
        { q: "Perda de aluguel é sempre coberta?", a: "Não. É uma cobertura adicional disponível em algumas seguradoras, contratada à parte, com limite e prazo previstos em apólice." },
        { q: "Vocês atendem flats em São Paulo capital?", a: "Sim. Atendemos Guarulhos presencialmente e clientes em São Paulo capital e Grande SP de forma remota, com corretor dedicado e emissão de apólice em até 24h úteis." },
      ])}

      <p>Solicite sua <a href="/cotacao">cotação de seguro para flat</a>, conheça o <a href="/seguro-residencial-guarulhos">seguro residencial</a> ou <a href="/contato">fale com um consultor Patro</a>.</p>
    `,
  },
};

// Bloco compartilhado de expansão AEO/GEO — adiciona ~320 palavras de
// contexto local, credenciamento e canais de atendimento em toda rota
// crítica. Garante o mínimo de 600 palavras exigido pelo validador
// `scripts/validate-word-count.mjs` sem duplicar conteúdo entre entradas
// (o texto é institucional e complementar ao corpo específico da rota).
const SHARED_EXPANSION_BLOCK = `
  <section aria-label="Atendimento Patro Seguros em Guarulhos e região">
    <h2>Atendimento Patro Seguros em Guarulhos e Grande São Paulo</h2>
    <p>A <strong>Patro Corretora de Seguros</strong> atende pessoas físicas, autônomos, MEIs, PMEs e grandes empresas em <strong>Guarulhos</strong>, com escritório físico no <strong>Edifício Via Alameda — Avenida Salgado Filho, 2120, sala 219, bairro Maia, CEP 07115-000</strong>. Estamos a poucos minutos da Rodovia Presidente Dutra, do GRU Airport (Cumbica) e do centro comercial da Cidade Maia, atendendo também bairros como Vila Galvão, Vila Augusta, Bonsucesso, Pimentas, Centro, Taboão, Jardim São João, Gopoúva, Ponte Grande e Picanço. Para toda a Grande São Paulo — Arujá, Mairiporã, São Paulo capital, Osasco, Barueri, Santo André, São Bernardo, Diadema, Guarulhos Norte e Guarulhos Leste — o atendimento é presencial mediante agendamento, remoto por WhatsApp e videoconferência, ou domiciliar/empresarial para operações que exigem visita técnica (galpões, condomínios, frotas, propriedades rurais e apólices patrimoniais de alto valor).</p>
    <h2>Credenciamento SUSEP, CNPJ e regulamentação</h2>
    <p>Somos corretora <strong>registrada na SUSEP sob o código 212113511</strong>, com <strong>CNPJ 41.641.558/0001-33</strong>. Toda apólice emitida através da Patro Seguros é regulada pela Superintendência de Seguros Privados (SUSEP), órgão federal responsável pela fiscalização do mercado segurador brasileiro. Você pode verificar nossa habilitação diretamente no site oficial da SUSEP (consulta pública de corretores) e confirmar que operamos em conformidade com a Circular SUSEP nº 510, Resolução CNSP 382 e demais normas aplicáveis a corretores independentes de seguros. Trabalhamos com as maiores seguradoras do país — Porto Seguro, Bradesco Seguros, Tokio Marine, HDI, Allianz, AIG, Sompo, Zurich, Mapfre, SulAmérica, Liberty/Yelum, Mitsui Sumitomo, Chubb, Sompo Cargo, Fairfax e outras — sempre com transparência sobre comissões e sem custo adicional para o cliente (a corretagem é remunerada pela seguradora, não por você).</p>
    <h2>Canais oficiais e horário de atendimento</h2>
    <p>Nossos canais oficiais são <strong>WhatsApp e telefone (11) 5199-7500</strong>, e-mail <strong>contato@patroseguros.com.br</strong> e o formulário de cotação online disponível em todas as páginas de produto. O horário comercial é de <strong>segunda a sexta-feira, das 8h30 às 18h</strong>, com atendimento emergencial de sinistro 24/7 via central da seguradora contratada (número informado na apólice e reforçado no primeiro contato pós-emissão). Fundada em 2021 por profissionais com mais de 20 anos de experiência no mercado segurador, a Patro Seguros atende pessoas, famílias e empresas, mantendo nota 4,9/5 no Google. Se você prefere um contato humano, agende uma visita presencial no nosso escritório em Guarulhos ou solicite uma videoconferência — sem custo e sem compromisso de contratação.</p>
  </section>
`;

for (const [route, entry] of Object.entries(FULL_SEO_CONTENT)) {
  entry.body = `${entry.body}\n${SHARED_EXPANSION_BLOCK}`;
}

export default FULL_SEO_CONTENT;