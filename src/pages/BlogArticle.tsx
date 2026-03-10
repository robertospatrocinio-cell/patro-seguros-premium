import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { MessageCircle, ArrowLeft } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/551151997500?text=Ol%C3%A1%2C%20vim%20pelo%20blog%20da%20Patro%20Seguros%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es.";

const articlesContent: Record<string, { title: string; content: string; faqs: { q: string; a: string }[] }> = {
  "quanto-custa-seguro-auto": {
    title: "Quanto Custa Seguro Auto em 2025?",
    content: `O preço do seguro auto varia conforme diversos fatores e entender cada um deles é fundamental para encontrar a melhor oferta. Em 2025, o mercado de seguros automotivos apresenta novas tendências de precificação, com seguradoras investindo em tecnologia para personalizar cada vez mais os valores.

Em média, o seguro auto no Brasil custa entre R$ 1.800 e R$ 6.000 por ano para veículos populares e de médio porte. Para carros de luxo ou esportivos, os valores podem ultrapassar R$ 15.000 anuais. Motos costumam ter seguros entre R$ 800 e R$ 3.500.

Fatores que influenciam o preço do seguro auto:

- Perfil do motorista: idade, sexo, estado civil e tempo de habilitação. Motoristas acima de 30 anos com experiência tendem a pagar menos.
- CEP de pernoite: regiões com maior índice de roubo e furto encarecem o seguro significativamente.
- Modelo, ano e valor do veículo: carros mais visados por ladrões ou com peças caras têm seguro mais alto.
- Histórico de sinistros: quem nunca acionou o seguro recebe bônus que podem reduzir o valor em até 35%.
- Tipo de cobertura: cobertura compreensiva (roubo + colisão) é mais cara que coberturas parciais.
- Uso do veículo: uso profissional (aplicativo, delivery) eleva o custo.
- Dispositivos antifurto: rastreadores e bloqueadores podem gerar descontos de 5% a 15%.

Como economizar no seguro auto:

1. Compare cotações de pelo menos 3 seguradoras — na Patro Seguros fazemos isso gratuitamente.
2. Mantenha o bônus de sinistralidade (não acione o seguro por pequenos danos).
3. Instale rastreador veicular homologado.
4. Aumente o valor da franquia (paga menos no prêmio, mas mais em caso de sinistro parcial).
5. Considere coberturas essenciais e elimine opcionais desnecessários.
6. Pague à vista quando possível (algumas seguradoras oferecem desconto).`,
    faqs: [
      { q: "Qual o seguro auto mais barato em 2025?", a: "O valor depende do perfil do motorista e do veículo. Seguradoras como Justos, Liberty e Azul costumam ter preços competitivos para determinados perfis. A melhor forma é comparar cotações — na Patro fazemos isso gratuitamente." },
      { q: "Como reduzir o valor do seguro auto?", a: "Instale rastreador, aumente a franquia, mantenha bom histórico sem sinistros, compare seguradoras e considere coberturas essenciais sem opcionais desnecessários." },
      { q: "Seguro auto fica mais caro para carros financiados?", a: "Não necessariamente. Porém, para veículos financiados, o banco pode exigir cobertura compreensiva, o que pode ser mais caro do que uma cobertura parcial." },
    ],
  },
  "seguro-auto-vale-a-pena": {
    title: "Seguro Auto Vale a Pena? Entenda os Prós e Contras",
    content: `Uma das dúvidas mais comuns entre motoristas brasileiros é se realmente compensa pagar seguro auto. Com o custo elevado de sinistros, a resposta para a maioria das pessoas é sim — mas existem situações em que pode não fazer sentido.

Quando o seguro auto VALE a pena:

- Veículos com valor acima de R$ 30.000 — o prejuízo em caso de perda total é muito grande.
- Quem mora ou circula em regiões com alto índice de roubo/furto.
- Motoristas que dependem do carro para trabalhar.
- Veículos financiados (o banco geralmente exige seguro).
- Quem não tem reserva financeira para cobrir prejuízos de um acidente.

Quando pode NÃO compensar:

- Veículos muito antigos com valor de mercado baixo (o seguro pode custar mais que o carro vale).
- Quem tem grande reserva financeira e pode absorver o prejuízo.

Prós do seguro auto:
- Proteção contra roubo, furto e furto de peças
- Cobertura para colisões e acidentes
- Assistência 24h com guincho, chaveiro, troca de pneu
- Carro reserva enquanto o seu está no conserto
- Responsabilidade civil (cobre danos que você causa a terceiros)
- Cobertura para fenômenos naturais (enchentes, granizo)

Contras:
- Custo anual que pode ser significativo
- Franquia em caso de sinistro parcial
- Processo de regulação pode levar tempo

A conta é simples: compare o custo anual do seguro com o prejuízo potencial de ficar sem ele. Na grande maioria dos casos, o seguro auto é um investimento que vale cada centavo.`,
    faqs: [
      { q: "Posso andar sem seguro auto?", a: "Legalmente sim, não é obrigatório. Mas financeiramente é muito arriscado. Um acidente grave pode gerar prejuízos de dezenas de milhares de reais, além de responsabilidade civil por danos a terceiros." },
      { q: "O DPVAT substitui o seguro auto?", a: "Não. O DPVAT (agora SPVAT) cobre apenas danos pessoais a vítimas de acidentes de trânsito com valores limitados. Não cobre danos ao seu veículo nem danos materiais a terceiros." },
    ],
  },
  "o-que-seguro-residencial-cobre": {
    title: "O Que o Seguro Residencial Cobre?",
    content: `O seguro residencial é um dos seguros mais acessíveis e completos do mercado, protegendo seu lar e seus bens contra diversos riscos. Muita gente não contrata por achar caro, mas na verdade os valores são surpreendentemente baixos.

Coberturas básicas do seguro residencial:

- Incêndio, queda de raio e explosão: cobertura obrigatória que protege a estrutura do imóvel.
- Vendaval, granizo e fumaça: danos causados por fenômenos climáticos.
- Danos elétricos: proteção para eletrodomésticos e equipamentos contra variações de energia e curto-circuito.

Coberturas adicionais (opcionais):

- Roubo e furto qualificado: proteção para bens dentro da residência.
- Responsabilidade civil familiar: cobre danos que você ou sua família causem a terceiros.
- Quebra de vidros: janelas, portas de vidro, espelhos e tampos.
- Danos por água: vazamentos e infiltrações.
- Desmoronamento: cobertura para desabamento da estrutura.
- Perda de aluguel: se o imóvel ficar inabitável após sinistro.

Assistências inclusas:

A maioria das apólices inclui assistências gratuitas como:
- Eletricista e encanador emergencial
- Chaveiro 24h
- Limpeza de caixa d'água
- Desentupimento
- Reparo de eletrodomésticos
- Cobertura provisória de telhado

Quanto custa o seguro residencial?

O seguro residencial é um dos mais acessíveis do mercado. Um apartamento avaliado em R$ 300.000, por exemplo, pode ter seguro a partir de R$ 200 por ano. Casas em áreas de risco tendem a ser um pouco mais caras.`,
    faqs: [
      { q: "Seguro residencial cobre celular roubado dentro de casa?", a: "Sim, desde que tenha a cobertura de roubo contratada. A maioria das apólices cobre bens dentro da residência até o limite contratado." },
      { q: "Inquilino pode contratar seguro residencial?", a: "Sim! Inquilinos podem e devem contratar seguro residencial para proteger seus bens dentro do imóvel alugado. O seguro do proprietário cobre a estrutura, não os bens do inquilino." },
      { q: "Seguro residencial cobre enchente?", a: "Depende da apólice. Algumas seguradoras oferecem cobertura para alagamento e inundação como cobertura adicional. Consulte as condições." },
    ],
  },
  "quanto-custa-plano-de-saude": {
    title: "Quanto Custa um Plano de Saúde em 2025?",
    content: `O custo de um plano de saúde em 2025 varia conforme a faixa etária, tipo de plano, operadora e abrangência geográfica. A ANS (Agência Nacional de Saúde Suplementar) regula os reajustes anuais, que em 2025 ficaram em torno de 6,9% para planos individuais.

Valores médios por faixa etária (plano individual/familiar com copartipação):

- 0 a 18 anos: R$ 200 a R$ 500/mês
- 19 a 23 anos: R$ 250 a R$ 600/mês
- 24 a 28 anos: R$ 300 a R$ 700/mês
- 29 a 33 anos: R$ 350 a R$ 800/mês
- 34 a 38 anos: R$ 400 a R$ 950/mês
- 39 a 43 anos: R$ 500 a R$ 1.200/mês
- 44 a 48 anos: R$ 600 a R$ 1.500/mês
- 49 a 53 anos: R$ 800 a R$ 2.000/mês
- 54 a 58 anos: R$ 1.000 a R$ 2.800/mês
- 59+ anos: R$ 1.500 a R$ 4.500/mês

Tipos de plano e suas diferenças:

- Plano Individual/Familiar: contratado diretamente pela pessoa. Reajuste regulado pela ANS.
- Plano Empresarial/PME: contratado via CNPJ (a partir de 2 vidas). Geralmente 30% a 40% mais barato.
- Plano por Adesão: vinculado a sindicatos ou associações. Preços intermediários.

Como economizar:

1. Considere planos com coparticipação (paga uma taxa por procedimento, mas a mensalidade é menor).
2. Planos empresariais (MEI com 2 vidas) costumam ser significativamente mais baratos.
3. Compare operadoras — na Patro Seguros fazemos cotações com Bradesco Saúde, Amil, SulAmérica, Porto Saúde e outras.
4. Avalie a abrangência geográfica — planos regionais são mais acessíveis que nacionais.`,
    faqs: [
      { q: "Plano de saúde empresarial é mais barato que individual?", a: "Sim, em geral planos empresariais são 30% a 40% mais baratos. Mesmo quem é MEI pode contratar plano empresarial com apenas 2 beneficiários." },
      { q: "O que é coparticipação?", a: "É um modelo onde você paga uma mensalidade menor, mas contribui com uma taxa a cada procedimento realizado (consulta, exame, etc). Ideal para quem usa pouco o plano." },
      { q: "Posso trocar de plano de saúde sem carência?", a: "Sim, existe a portabilidade de carências regulamentada pela ANS. Desde que você esteja há pelo menos 2 anos no plano atual (ou 3 anos em caso de doença preexistente), pode migrar sem cumprir novas carências." },
    ],
  },
  "melhor-plano-saude-guarulhos": {
    title: "Melhor Plano de Saúde em Guarulhos",
    content: `Guarulhos é a segunda maior cidade de São Paulo e conta com uma ampla rede de hospitais, clínicas e laboratórios credenciados pelas principais operadoras de saúde. Escolher o melhor plano depende das suas necessidades e orçamento.

Principais operadoras que atendem Guarulhos:

1. Bradesco Saúde: ampla rede credenciada, incluindo Hospital Stella Maris e diversos laboratórios. Boa opção para quem busca qualidade premium.

2. Amil: forte presença em Guarulhos com rede própria e credenciada. Destaque para a rede de hospitais Américas.

3. SulAmérica Saúde: excelente rede credenciada na região, com acesso a hospitais de referência em São Paulo.

4. Porto Saúde: boa relação custo-benefício, com rede em crescimento em Guarulhos.

5. NotreDame Intermédica (agora Hapvida): forte presença na região com hospitais próprios, uma das opções mais acessíveis.

6. MedSenior: especializada no público 50+, com preços competitivos e boa rede em Guarulhos.

Hospitais de referência em Guarulhos:
- Hospital Stella Maris
- Hospital Bom Clima
- Hospital Carlos Chagas
- Hospital Padre Bento
- Hospital São Luiz (rede D'Or)

Dicas para escolher o melhor plano em Guarulhos:

- Verifique se os hospitais e médicos que você já utiliza estão na rede credenciada.
- Compare preços entre plano individual, familiar e empresarial (MEI).
- Considere se precisa de abrangência apenas regional ou nacional.
- Avalie as carências e portabilidade se já tem plano.
- Consulte a avaliação da operadora no site da ANS.`,
    faqs: [
      { q: "Qual o plano de saúde mais barato em Guarulhos?", a: "A NotreDame Intermédica (Hapvida) costuma ter os preços mais acessíveis na região, com rede própria de hospitais. Para o público 50+, a MedSenior também oferece valores competitivos." },
      { q: "Plano de saúde em Guarulhos cobre hospitais em São Paulo?", a: "Depende da abrangência contratada. Planos com abrangência grupo de municípios ou estadual cobrem hospitais em São Paulo e região metropolitana." },
    ],
  },
  "seguro-empresarial-o-que-cobre": {
    title: "Seguro Empresarial: O Que Cobre?",
    content: `O seguro empresarial é uma proteção essencial para qualquer negócio, independente do porte ou segmento. Ele protege o patrimônio, as operações e a continuidade da empresa contra diversos riscos.

Coberturas básicas do seguro empresarial:

- Incêndio, raio e explosão: proteção obrigatória para a estrutura e conteúdo.
- Vendaval, furacão e granizo: danos causados por eventos climáticos.
- Danos elétricos: proteção para equipamentos e instalações elétricas.

Coberturas adicionais mais contratadas:

- Roubo e furto qualificado: proteção para estoque, equipamentos e valores.
- Responsabilidade civil: cobre danos causados a clientes, visitantes e terceiros.
- Lucros cessantes: indenização pela perda de receita durante paralisação após sinistro.
- Equipamentos eletrônicos: computadores, servidores e sistemas.
- Quebra de vidros: fachadas, vitrines e divisórias.
- Alagamento e inundação: importante para empresas em áreas de risco.
- Derrame de sprinklers: danos causados pelo acionamento do sistema anti-incêndio.
- Tumultos e greves: danos causados por manifestações e distúrbios.

O que o seguro empresarial NÃO cobre:

- Desgaste natural e deterioração
- Danos por falta de manutenção
- Atos de guerra
- Poluição gradual (para isso existe seguro ambiental)
- Furto simples (sem arrombamento)

Como contratar:

1. Faça um levantamento do patrimônio da empresa (imóvel, estoque, equipamentos).
2. Identifique os riscos específicos do seu segmento.
3. Defina coberturas adequadas com ajuda de um corretor especializado.
4. Compare propostas de diferentes seguradoras.

Na Patro Seguros, fazemos análise consultiva para cada negócio, identificando coberturas essenciais e evitando gastos com proteções desnecessárias.`,
    faqs: [
      { q: "Seguro empresarial é obrigatório?", a: "Não é obrigatório por lei na maioria dos casos, mas é altamente recomendado. Alguns contratos de locação comercial podem exigir seguro. Para condomínios, o seguro é obrigatório por lei." },
      { q: "Quanto custa um seguro empresarial?", a: "O valor depende do ramo de atividade, tamanho, localização e coberturas escolhidas. Para um comércio de médio porte, pode variar de R$ 1.000 a R$ 5.000 por ano." },
      { q: "MEI pode contratar seguro empresarial?", a: "Sim! Microempreendedores individuais podem e devem proteger seus equipamentos, estoque e local de trabalho com seguro empresarial." },
    ],
  },
  "seguro-para-tratores": {
    title: "Seguro para Tratores: Guia Completo",
    content: `Tratores são os equipamentos mais valiosos de uma propriedade rural e protegê-los é fundamental para a continuidade das operações no campo. O seguro para tratores cobre desde acidentes operacionais até roubo e incêndio.

Por que fazer seguro de trator?

Um trator novo pode custar de R$ 150.000 a mais de R$ 1.000.000, dependendo do modelo e marca. Um sinistro sem seguro pode comprometer uma safra inteira e a saúde financeira do produtor rural.

Coberturas disponíveis:

- Incêndio e raio: proteção contra fogo acidental e descargas elétricas.
- Roubo e furto: indenização pelo valor do equipamento em caso de roubo.
- Colisão e tombamento: danos causados por acidentes durante operação ou transporte.
- Danos elétricos: proteção para sistema elétrico e eletrônico do trator.
- Alagamento: danos causados por enchentes e inundações na propriedade.
- Fenômenos naturais: proteção contra vendaval, granizo e outros eventos.

Marcas mais seguradas:
- John Deere
- Massey Ferguson
- New Holland
- Case IH
- Valtra
- LS Tractor

Documentação necessária:

- Nota fiscal do trator ou documento de compra e venda
- Dados do proprietário (CPF/CNPJ, endereço da propriedade)
- Fotos do equipamento
- Informações sobre uso e localização

Na Patro Seguros, somos especialistas em seguro para máquinas agrícolas e trabalhamos com seguradoras que entendem do agronegócio brasileiro.`,
    faqs: [
      { q: "Quanto custa o seguro de trator?", a: "Em média, de 1% a 3% do valor do equipamento por ano. Um trator de R$ 300.000 pode ter seguro a partir de R$ 3.000/ano, dependendo das coberturas e região." },
      { q: "Seguro de trator cobre acidente durante operação?", a: "Sim, a cobertura de colisão e tombamento inclui acidentes durante a operação no campo, transporte e manobras." },
      { q: "Precisa de vistoria para fazer seguro de trator?", a: "Na maioria dos casos sim, especialmente para equipamentos usados. A vistoria pode ser feita por fotos ou presencialmente." },
    ],
  },
  "seguro-para-colheitadeiras": {
    title: "Seguro para Colheitadeiras",
    content: `Colheitadeiras estão entre os equipamentos mais caros do agronegócio brasileiro, com valores que podem ultrapassar R$ 2.000.000. Proteger esse investimento com seguro é uma decisão estratégica para qualquer produtor rural.

Riscos que uma colheitadeira enfrenta:

- Incêndio durante a operação (especialmente em colheita de cana e algodão)
- Roubo e furto (equipamentos de alto valor são visados)
- Tombamento em terrenos irregulares
- Danos elétricos e mecânicos por sobrecarga
- Danos por fenômenos naturais (granizo, vendaval)
- Alagamento em áreas de várzea

Coberturas do seguro de colheitadeira:

- Incêndio, raio e explosão
- Roubo e furto qualificado
- Colisão, tombamento e capotamento
- Danos elétricos
- Fenômenos naturais
- Transporte do equipamento entre propriedades

Marcas mais comuns:
- John Deere (série S e T)
- Case IH (Axial-Flow)
- New Holland (série CR e TC)
- Massey Ferguson (série MF)
- Claas (Lexion e Tucano)

Dicas para contratar:

1. Avalie o valor atualizado do equipamento pela tabela de referência.
2. Considere o período de maior risco (safra) para adequar coberturas.
3. Verifique se o seguro cobre implementos acoplados.
4. Pergunte sobre cobertura durante transporte entre fazendas.
5. Compare cotações — na Patro somos especialistas em agro.`,
    faqs: [
      { q: "Seguro de colheitadeira cobre incêndio na lavoura?", a: "Sim, incêndio é uma das coberturas básicas do seguro de colheitadeira, cobrindo tanto incêndio acidental quanto propagação de fogo na lavoura." },
      { q: "O seguro cobre implementos da colheitadeira?", a: "Depende da apólice. Alguns seguros cobrem implementos acoplados como plataformas de corte. Verifique as condições e, se necessário, contrate cobertura adicional." },
    ],
  },
  "seguro-galpoes-industriais-guia": {
    title: "Seguro para Galpões Industriais: Como Funciona",
    content: `Galpões industriais abrigam maquinário, estoque e operações de alto valor. Um sinistro pode significar meses de paralisação e prejuízos milionários. O seguro para galpões industriais é a principal proteção contra esses riscos.

O que o seguro de galpão industrial cobre:

- Estrutura do galpão (cobertura, paredes, piso, instalações)
- Conteúdo (máquinas, equipamentos, estoque, matéria-prima)
- Lucros cessantes (receita perdida durante paralisação)
- Responsabilidade civil (danos a terceiros)

Coberturas mais importantes:

1. Incêndio e explosão: principal risco em ambientes industriais. Cobre danos à estrutura e conteúdo.
2. Danos elétricos: curto-circuito e variações de energia que danificam equipamentos.
3. Roubo: proteção para estoque e equipamentos de valor.
4. Vendaval e granizo: danos à cobertura metálica e estrutura.
5. Alagamento: fundamental para galpões em áreas baixas.
6. Responsabilidade civil: danos a funcionários, visitantes e vizinhos.
7. Lucros cessantes: mantém o faturamento durante reconstrução ou reparo.
8. Equipamentos em operação: cobre quebra mecânica de máquinas.

Setores que mais contratam:
- Indústria metalúrgica e siderúrgica
- Indústria alimentícia
- Logística e armazenagem
- Indústria têxtil
- Indústria química
- Montadoras e autopeças

Como é calculado o valor do seguro:

O prêmio considera: tipo de atividade, materiais da construção, sistemas de proteção contra incêndio, localização, valor do conteúdo e histórico de sinistros do setor.`,
    faqs: [
      { q: "Seguro de galpão industrial é caro?", a: "O custo é proporcional ao risco. Galpões com sprinklers, brigada de incêndio e boas práticas de segurança têm descontos significativos. Em média, de 0,1% a 0,5% do valor total segurado por ano." },
      { q: "Preciso segurar o conteúdo separadamente?", a: "Não necessariamente. O seguro pode cobrir estrutura e conteúdo na mesma apólice. O importante é declarar corretamente o valor de cada item." },
    ],
  },
  "7-seguros-proteger-familia": {
    title: "Os 7 Seguros Mais Importantes para Proteger Sua Família",
    content: `Proteger a família vai muito além de cuidar da saúde e segurança no dia a dia. Ter os seguros certos garante que imprevistos não se transformem em crises financeiras. Conheça os 7 seguros essenciais:

1. Seguro de Vida

O mais importante de todos. Garante amparo financeiro para sua família em caso de falecimento, invalidez ou doenças graves. Valores a partir de R$ 30/mês podem garantir coberturas de R$ 200.000 ou mais.

2. Plano de Saúde

Ter acesso a atendimento médico de qualidade sem depender do SUS é fundamental. Existem opções para todos os orçamentos, especialmente planos empresariais via MEI.

3. Seguro Auto

Se você depende do carro, o seguro protege contra roubo, acidentes e danos a terceiros. Assistência 24h e carro reserva garantem mobilidade mesmo em emergências.

4. Seguro Residencial

Um dos mais acessíveis (a partir de R$ 200/ano). Protege sua casa contra incêndio, roubo, danos elétricos e ainda inclui assistências como encanador e eletricista.

5. Seguro Viagem

Obrigatório para Europa (Tratado de Schengen) e fundamental para qualquer viagem internacional. Cobre emergências médicas que podem custar dezenas de milhares de dólares.

6. Previdência Privada

Complemento essencial para a aposentadoria. Quanto antes começar, maior o patrimônio acumulado. Permite planejamento sucessório e benefícios fiscais.

7. Seguro Odontológico

Tratamentos dentários podem ser muito caros sem plano. O seguro odonto cobre desde consultas até tratamentos de canal e próteses, com mensalidades acessíveis.

Dica da Patro: não tente contratar todos de uma vez. Comece pelo seguro de vida e plano de saúde, que são os mais urgentes, e vá complementando conforme o orçamento permitir.`,
    faqs: [
      { q: "Quanto custa ter todos esses seguros?", a: "É possível ter uma proteção básica completa a partir de R$ 500/mês, combinando seguro de vida, plano de saúde com coparticipação, residencial e odontológico. O seguro auto varia muito conforme o veículo." },
      { q: "Qual seguro devo contratar primeiro?", a: "O seguro de vida é o mais importante, pois protege toda a família. Em seguida, plano de saúde e seguro residencial, que são os mais acessíveis e úteis no dia a dia." },
    ],
  },
  "como-escolher-seguro-empresa": {
    title: "Como Escolher o Seguro Ideal para Sua Empresa",
    content: `Escolher o seguro certo para sua empresa pode parecer complexo, mas seguindo um passo a passo estruturado, você encontra a proteção ideal sem pagar por coberturas desnecessárias.

Passo 1: Identifique os riscos do seu negócio

Cada segmento tem riscos específicos:
- Comércios: roubo, incêndio, RC para clientes
- Indústrias: incêndio, explosão, lucros cessantes, RC
- Escritórios: danos elétricos, RC profissional
- Restaurantes: incêndio, explosão, intoxicação alimentar
- Tecnologia: cyber, equipamentos eletrônicos

Passo 2: Avalie seu patrimônio

Faça um inventário detalhado:
- Valor do imóvel (se próprio) ou benfeitorias (se alugado)
- Estoque e matéria-prima
- Equipamentos e máquinas
- Mobiliário e instalações
- Veículos da empresa

Passo 3: Defina coberturas essenciais

Para a maioria das empresas:
- Incêndio (obrigatório em muitos contratos de locação)
- Roubo
- Danos elétricos
- Responsabilidade civil
- Lucros cessantes (se a paralisação pode quebrar o negócio)

Passo 4: Considere coberturas específicas

Dependendo do segmento:
- RC Profissional (escritórios, consultórios)
- Cyber (empresas com dados sensíveis)
- Ambiental (indústrias com risco de poluição)
- Transporte (empresas com logística própria)

Passo 5: Compare propostas

Não contrate o primeiro orçamento. Compare pelo menos 3 seguradoras. Na Patro, fazemos isso por você gratuitamente, com análise consultiva do seu negócio.

Passo 6: Revise anualmente

Sua empresa cresce e muda. Revise coberturas e valores segurados todo ano para não ficar sub-segurado.`,
    faqs: [
      { q: "Posso ter um seguro que cubra tudo?", a: "Sim, é possível combinar coberturas em uma mesma apólice empresarial. O seguro compreensivo empresarial pode incluir incêndio, roubo, RC, danos elétricos e mais em um único contrato." },
      { q: "Minha empresa é pequena, preciso de seguro?", a: "Sim! Empresas pequenas são as mais vulneráveis a sinistros, pois geralmente não têm reserva financeira para absorver grandes prejuízos. E o seguro para pequenas empresas é muito acessível." },
    ],
  },
  "seguro-auto-7-erros": {
    title: "Seguro Auto: 7 Erros que Fazem Você Pagar Mais",
    content: `Muitos motoristas pagam mais caro no seguro auto por cometerem erros evitáveis na hora da contratação ou renovação. Conheça os 7 erros mais comuns e como evitá-los:

1. Não comparar cotações

O erro mais caro. Aceitar a primeira proposta pode significar pagar até 40% a mais. Na Patro Seguros, comparamos diversas seguradoras para encontrar o melhor preço para o seu perfil.

2. Informar dados incorretos

Mentir sobre CEP de pernoite, principal condutor ou uso do veículo pode baratear o seguro, mas causa recusa de sinistro. Seja sempre honesto — a economia não compensa o risco.

3. Escolher franquia errada

Franquia muito baixa encarece o seguro. Se você é um motorista cuidadoso, opte por franquia maior e pague menos no prêmio anual.

4. Não aproveitar o bônus

O bônus por não sinistro pode reduzir o seguro em até 35%. Ao trocar de seguradora, exija a transferência do seu bônus. Na Patro, cuidamos disso.

5. Ignorar coberturas essenciais

Economizar retirando responsabilidade civil ou assistência 24h pode sair muito caro. RC é fundamental — se você bater em um carro de luxo sem essa cobertura, o prejuízo é seu.

6. Não informar dispositivos antifurto

Rastreadores e bloqueadores geram desconto de 5% a 15%. Muita gente esquece de informar e perde esse benefício.

7. Renovar no automático sem renegociar

Seguradoras costumam aumentar o valor na renovação. Sempre peça nova cotação e negocie. Trocar de seguradora pode render grande economia.`,
    faqs: [
      { q: "Quanto posso economizar evitando esses erros?", a: "É possível economizar de 20% a 40% no valor do seguro auto apenas comparando cotações e aproveitando bônus e descontos disponíveis." },
      { q: "Posso transferir meu bônus entre seguradoras?", a: "Sim! O bônus por anos sem sinistro é transferível entre seguradoras. Exija a transferência e não perca o desconto que você conquistou." },
    ],
  },
  "seguro-vida-por-que-ter": {
    title: "Seguro de Vida: Por Que Todo Adulto Deveria Ter Um",
    content: `O seguro de vida é o produto mais importante para a proteção financeira da sua família, mas ainda é subestimado no Brasil. Apenas 15% dos brasileiros possuem algum tipo de seguro de vida — um número muito baixo comparado a países desenvolvidos.

Por que o seguro de vida é tão importante?

- Garante sustento para a família em caso de falecimento
- Quita dívidas (financiamento, cartão, empréstimos) sem onerar dependentes
- Cobre invalidez permanente (por acidente ou doença)
- Oferece indenização para doenças graves (câncer, AVC, infarto)
- Pode funcionar como planejamento sucessório (não entra em inventário)
- Algumas apólices permitem resgate em vida

Quanto de cobertura eu preciso?

A regra básica é: o capital segurado deve ser suficiente para manter o padrão de vida da família por pelo menos 5 anos. Considere:
- Renda mensal familiar × 60 meses
- Saldo devedor de financiamentos
- Custos com educação dos filhos
- Despesas com funeral

Exemplo: se sua família precisa de R$ 5.000/mês, o capital ideal seria de pelo menos R$ 300.000.

Quanto custa?

O seguro de vida é surpreendentemente acessível:
- Pessoa de 30 anos: a partir de R$ 30/mês para R$ 200.000 de cobertura
- Pessoa de 40 anos: a partir de R$ 60/mês para R$ 200.000
- Pessoa de 50 anos: a partir de R$ 120/mês para R$ 200.000

Valores variam conforme saúde, profissão e coberturas escolhidas.

Mitos sobre seguro de vida:

- "É só para quem vai morrer" — Errado. Cobre invalidez, doenças graves e pode ser resgatado.
- "É caro" — Na verdade, é um dos seguros mais acessíveis do mercado.
- "Sou jovem, não preciso" — É justamente quando o seguro é mais barato. Quanto antes contratar, melhor.`,
    faqs: [
      { q: "Seguro de vida tem carência?", a: "Para morte acidental, geralmente não há carência. Para morte natural, pode haver carência de 24 meses em algumas apólices. Doenças graves também podem ter carência." },
      { q: "Quem pode ser beneficiário?", a: "Qualquer pessoa indicada pelo segurado. Pode ser cônjuge, filhos, pais, irmãos ou qualquer pessoa. É importante manter os beneficiários atualizados." },
      { q: "O seguro de vida entra no inventário?", a: "Não! A indenização do seguro de vida é paga diretamente aos beneficiários, sem inventário, sem imposto de transmissão e sem dívidas do falecido." },
    ],
  },
  "seguro-fianca-vs-caucao": {
    title: "Seguro Fiança Locatícia vs. Caução: Qual Escolher?",
    content: `Na hora de alugar um imóvel, a garantia locatícia é uma das etapas mais importantes. As duas modalidades mais comuns são o seguro fiança e a caução. Entenda as diferenças e escolha a melhor opção.

O que é caução?

É um depósito em dinheiro de até 3 meses de aluguel, feito em caderneta de poupança conjunta. O valor é devolvido ao final do contrato, corrigido, descontando eventuais danos.

O que é seguro fiança?

É uma apólice de seguro que garante o pagamento de aluguéis, encargos e danos ao proprietário. O valor é pago pelo inquilino (geralmente equivalente a 1 a 1,5 aluguel por ano).

Comparativo detalhado:

Caução:
✅ Valor devolvido no final do contrato
✅ Sem análise de crédito
❌ Exige desembolso imediato de 3 aluguéis
❌ Cobertura limitada ao valor depositado
❌ Proprietário tem dificuldade para acessar o valor

Seguro Fiança:
✅ Sem desembolso alto inicial (parcelável)
✅ Coberturas amplas (aluguel, IPTU, condomínio, danos, pintura)
✅ Proprietário tem indenização rápida
✅ Aceito pela maioria das imobiliárias
❌ Valor não é devolvido (é o custo do seguro)
❌ Exige análise de crédito

Quando escolher caução:
- Quando você tem o dinheiro disponível e prefere ter o valor de volta
- Quando não passa na análise de crédito do seguro fiança
- Para contratos de curta duração

Quando escolher seguro fiança:
- Quando não quer imobilizar capital
- Quando precisa de proteção mais ampla
- Para contratos de longa duração
- Quando o proprietário exige garantia mais robusta

Na prática, o seguro fiança é mais vantajoso na maioria das situações, especialmente para quem não quer comprometer reservas financeiras.`,
    faqs: [
      { q: "Posso usar caução e seguro fiança juntos?", a: "Não. A Lei do Inquilinato permite apenas uma modalidade de garantia por contrato. Não é possível combinar duas." },
      { q: "Quem não consegue aprovação no seguro fiança, o que fazer?", a: "Pode optar por caução, fiador ou título de capitalização. Na Patro, trabalhamos com seguradoras que aceitam diferentes perfis de renda, aumentando as chances de aprovação." },
    ],
  },
  "o-que-e-responsabilidade-civil": {
    title: "O Que É Responsabilidade Civil e Por Que Você Precisa",
    content: `O Seguro de Responsabilidade Civil (RC) é uma das proteções mais importantes para profissionais e empresas, mas também uma das menos compreendidas. Entenda como ele funciona e por que você pode precisar.

O que é Responsabilidade Civil?

É a obrigação legal de reparar danos (materiais, corporais ou morais) causados a terceiros. Quando uma ação ou omissão sua causa prejuízo a alguém, você é responsável civilmente por isso.

O que o seguro RC cobre?

- Danos materiais a terceiros (estragou algo de alguém)
- Danos corporais a terceiros (alguém se machucou por sua causa)
- Danos morais (ofensas e constrangimentos)
- Custos de defesa (honorários advocatícios)
- Acordos judiciais e extrajudiciais

Tipos de Seguro RC:

1. RC Geral: para empresas — cobre danos a clientes, visitantes e terceiros nas dependências.
2. RC Profissional (E&O): para profissionais liberais — médicos, advogados, engenheiros, contadores, arquitetos.
3. RC Empregador: cobre acidentes de trabalho além do INSS.
4. RC Produtos: para fabricantes — danos causados por produtos defeituosos.
5. RC Ambiental: danos ao meio ambiente causados pela atividade.

Quem precisa de seguro RC?

- Médicos, dentistas e profissionais de saúde
- Advogados e contadores
- Engenheiros e arquitetos
- Empresas que atendem público
- Indústrias e fabricantes
- Prestadores de serviços
- Condomínios

Exemplos reais de sinistros:

- Cliente escorrega no piso molhado de uma loja → RC cobre despesas médicas e indenização
- Contador comete erro em declaração fiscal → RC Profissional cobre a multa do cliente
- Produto com defeito causa lesão no consumidor → RC Produtos cobre a indenização
- Funcionário sofre acidente de trabalho → RC Empregador complementa o INSS`,
    faqs: [
      { q: "RC Profissional é obrigatório?", a: "Para algumas profissões e situações sim. Engenheiros registrados no CREA, por exemplo, podem ser exigidos. Para médicos, não é obrigatório mas é altamente recomendado. Consulte seu conselho de classe." },
      { q: "Quanto custa o seguro RC?", a: "Varia muito conforme a atividade e limites de cobertura. Para profissionais liberais, a partir de R$ 500/ano. Para empresas, depende do faturamento e risco do negócio." },
    ],
  },
  "como-proteger-frota": {
    title: "Como Proteger Sua Frota com Menor Custo",
    content: `Gerenciar o seguro de uma frota de veículos é um desafio para gestores. O custo total pode ser significativo, mas existem estratégias comprovadas para reduzir o valor sem comprometer a proteção.

Estratégias para reduzir o custo do seguro de frota:

1. Consolide a frota em uma seguradora

Seguradoras oferecem descontos progressivos para frotas maiores. Centralizar todos os veículos com uma operadora pode gerar economia de 10% a 25%.

2. Invista em gestão de riscos

- Instale rastreadores em todos os veículos (desconto de 5% a 15%)
- Implemente programa de treinamento de motoristas
- Faça manutenção preventiva documentada
- Use telemetria para monitorar comportamento ao volante

3. Otimize franquias

Para frotas grandes, considere franquias maiores ou até auto-seguro para sinistros pequenos. A economia no prêmio pode compensar.

4. Escolha o perfil de cobertura certo

Nem todos os veículos precisam de cobertura compreensiva. Veículos mais antigos podem ter apenas cobertura contra terceiros e assistência.

5. Mantenha bom histórico de sinistralidade

A taxa de sinistralidade (relação entre prêmio pago e sinistros) é o fator mais importante na renovação. Quanto menor, maior o desconto.

6. Negocie na renovação

Nunca aceite o primeiro valor na renovação. Compare com outras seguradoras e use como argumento para negociar.

7. Considere apólice de frota vs. individuais

Para frotas acima de 5 veículos, a apólice de frota costuma ser mais vantajosa que apólices individuais, além de simplificar a gestão.

Coberturas essenciais para frota:

- Responsabilidade civil (obrigatória na prática)
- Colisão e roubo/furto
- Assistência 24h com guincho
- APP (Acidentes Pessoais de Passageiros)
- Carro reserva (para veículos comerciais)`,
    faqs: [
      { q: "A partir de quantos veículos é considerado frota?", a: "Na maioria das seguradoras, a partir de 5 veículos já é possível contratar apólice de frota com condições diferenciadas. Algumas aceitam a partir de 3." },
      { q: "Posso ter veículos de tipos diferentes na mesma frota?", a: "Sim! Carros, motos, vans, caminhões e utilitários podem fazer parte da mesma apólice de frota, cada um com coberturas adequadas." },
    ],
  },
  "seguro-rural-como-funciona": {
    title: "Seguro Rural: Como Funciona",
    content: `O seguro rural é uma ferramenta essencial para o produtor brasileiro, protegendo contra perdas na lavoura, no rebanho e em equipamentos. O governo federal subsidia parte do prêmio através do PSR (Programa de Subvenção ao Prêmio do Seguro Rural), tornando-o mais acessível.

Modalidades de seguro rural:

1. Seguro Agrícola (lavoura)
Cobre perdas na produção causadas por eventos climáticos: seca, geada, granizo, excesso de chuvas, ventos fortes. As culturas mais seguradas são soja, milho, trigo, café e algodão.

2. Seguro Pecuário
Protege rebanhos contra morte por doenças, acidentes, raios e ataques de animais. Cobre bovinos, equinos, suínos e aves.

3. Seguro de Máquinas e Equipamentos
Cobre tratores, colheitadeiras e implementos contra roubo, incêndio e acidentes operacionais.

4. Seguro de Benfeitorias e Produtos
Protege instalações rurais (silos, galpões, tulhas) e produtos armazenados.

5. Seguro de Florestas
Cobre plantações florestais (eucalipto, pinus) contra incêndio e fenômenos naturais.

Subvenção do governo (PSR):

O governo pode subsidiar de 20% a 40% do valor do prêmio, dependendo da cultura e região. Para culturas como soja e milho, o subsídio pode chegar a 40% em algumas regiões.

Como contratar:

1. Procure um corretor habilitado (como a Patro Seguros)
2. Defina a área, cultura e nível de cobertura
3. O corretor solicita cotação às seguradoras
4. Se elegível, o PSR abate parte do prêmio
5. Contrate antes do plantio (para seguro agrícola)

Documentação necessária:
- CAR (Cadastro Ambiental Rural)
- Dados da propriedade e cultura
- Nota fiscal de insumos
- Laudo agronômico (em alguns casos)`,
    faqs: [
      { q: "Até quando posso contratar o seguro agrícola?", a: "O seguro agrícola deve ser contratado antes ou durante a fase de plantio, respeitando o zoneamento agrícola de risco climático (ZARC) do MAPA." },
      { q: "O seguro rural cobre perda por praga?", a: "Geralmente não. O seguro agrícola cobre eventos climáticos. Para pragas e doenças, existem seguros específicos, mas são menos comuns." },
      { q: "Como funciona a subvenção do PSR?", a: "O produtor paga o valor integral e solicita o reembolso da subvenção, ou o desconto é aplicado diretamente na apólice, dependendo da seguradora e disponibilidade de recursos do programa." },
    ],
  },
  "como-funciona-cotacao-seguros": {
    title: "Como Funciona a Cotação de Seguros",
    content: `O processo de cotação de seguros é simples, mas entender como funciona ajuda a fazer melhores escolhas e economizar. Na Patro Seguros, tornamos o processo ainda mais fácil.

Passo a passo da cotação:

1. Contato inicial
Você nos procura por WhatsApp, telefone, e-mail ou pelo site. Conta o que precisa proteger (carro, casa, empresa, etc).

2. Coleta de informações
Pedimos dados básicos sobre o que será segurado:
- Para auto: dados do veículo, motorista, CEP, uso
- Para residencial: tipo do imóvel, localização, valor dos bens
- Para empresarial: ramo de atividade, patrimônio, riscos específicos
- Para vida: idade, profissão, coberturas desejadas

3. Análise consultiva
Nossos especialistas analisam seu perfil e identificam as coberturas mais adequadas. Não vendemos seguro — orientamos a melhor proteção.

4. Cotação com múltiplas seguradoras
Enviamos seus dados para as principais seguradoras do mercado e recebemos diferentes propostas em valores e condições.

5. Apresentação comparativa
Enviamos um comparativo claro com as melhores opções, explicando diferenças de cobertura, franquia e preço entre as propostas.

6. Escolha e contratação
Você escolhe a melhor proposta. Cuidamos de toda a documentação e emissão da apólice.

7. Pós-venda e suporte
Acompanhamento contínuo: ajuda em sinistros, renovação, ajustes de cobertura e dúvidas.

Quanto tempo leva?

- Seguro auto: resposta em até 2 horas
- Seguro residencial: resposta em até 2 horas
- Seguro empresarial: 24 a 48 horas (pode exigir vistoria)
- Seguro de vida: resposta em até 24 horas
- Plano de saúde: comparativo em até 24 horas

A cotação é gratuita e sem compromisso!`,
    faqs: [
      { q: "Preciso pagar para fazer cotação?", a: "Não! Todas as nossas cotações são 100% gratuitas e sem compromisso. Você só paga quando decidir contratar." },
      { q: "Quantas seguradoras vocês consultam?", a: "Dependendo do produto, consultamos de 3 a 10 seguradoras diferentes para garantir a melhor opção em preço e cobertura." },
    ],
  },
  "dicas-evitar-sinistros": {
    title: "Dicas para Evitar Sinistros no Dia a Dia",
    content: `Prevenção é sempre o melhor seguro. Adotar boas práticas no dia a dia reduz significativamente o risco de sinistros em casa, no trânsito e na empresa. Além de proteger você e sua família, manter um bom histórico de sinistralidade garante seguros mais baratos.

No trânsito:

- Respeite os limites de velocidade e a distância de segurança
- Evite usar celular enquanto dirige (principal causa de acidentes hoje)
- Faça manutenção preventiva regularmente (freios, pneus, suspensão)
- Não dirija cansado ou sob efeito de álcool
- Estacione em locais seguros e iluminados
- Use rastreador e bloqueador veicular
- Evite deixar objetos visíveis dentro do carro
- Em caso de assalto, não reaja — sua vida vale mais

Em casa:

- Revise a parte elétrica periodicamente (principal causa de incêndios residenciais)
- Não sobrecarregue tomadas com benjamins/extensões
- Instale disjuntor DR (protege contra choques)
- Feche o registro de gás ao sair de casa
- Instale detectores de fumaça
- Não deixe velas acesas sem supervisão
- Verifique aquecedores e ar-condicionado antes do inverno
- Mantenha calhas e ralos limpos para evitar alagamentos

Na empresa:

- Mantenha extintores dentro da validade e em locais acessíveis
- Treine funcionários sobre procedimentos de emergência
- Faça manutenção preventiva em equipamentos elétricos
- Instale câmeras de segurança e alarme
- Controle o acesso de pessoas ao estabelecimento
- Mantenha rotas de fuga desobstruídas
- Faça backup regular de dados digitais
- Implemente política de segurança da informação

Benefício financeiro da prevenção:

Além de evitar prejuízos, manter zero sinistros garante bonificação nas renovações de seguro, podendo reduzir o valor em até 35% ao longo dos anos.`,
    faqs: [
      { q: "Se eu nunca acionar o seguro, pago menos na renovação?", a: "Sim! A maioria das seguradoras oferece bônus progressivo por anos sem sinistro. No seguro auto, o desconto pode chegar a 35% após 5 anos sem acionamento." },
      { q: "Dicas de prevenção afetam o preço do seguro?", a: "Indiretamente, sim. Dispositivos de segurança (rastreadores, câmeras, alarmes) e bom histórico de sinistros são fatores que reduzem o preço do seguro." },
    ],
  },
  "seguro-moto-vale-a-pena": {
    title: "Seguro Moto Vale a Pena? Análise Completa",
    content: `O seguro de moto é um tema polêmico. Com prêmios que podem chegar a 10% ou mais do valor da moto, muitos motociclistas questionam se vale a pena. Vamos analisar de forma objetiva.

Quando o seguro de moto VALE a pena:

- Motos acima de R$ 15.000 de valor
- Quem mora em capitais e regiões com alto índice de roubo
- Motociclistas que usam a moto como principal meio de transporte
- Motos financiadas (banco geralmente exige seguro)
- Quem trafega em rodovias com frequência

Quando pode NÃO compensar:

- Motos muito populares com alto índice de roubo (seguro pode custar 15-20% do valor)
- Motos antigas com valor de mercado muito baixo
- Quem tem condições de absorver o prejuízo financeiramente

O que o seguro de moto cobre:

- Roubo e furto (principal motivo de contratação)
- Colisão e queda
- Incêndio
- Responsabilidade civil (danos a terceiros)
- Assistência 24h (guincho, pane mecânica)
- Equipamentos e acessórios (capacete, baú, GPS)
- Danos corporais ao piloto (APP)

Alternativas ao seguro tradicional:

Para motos mais populares com seguro caro, existem alternativas:
- Rastreamento com seguro vinculado
- Clubes de proteção veicular (atenção: não são regulados pela SUSEP)
- Seguro contra terceiros (cobre só danos que você causa)

Dicas para baratear o seguro de moto:

1. Instale rastreador (desconto de até 20%)
2. Estacione em garagem fechada
3. Compare cotações de pelo menos 5 seguradoras
4. Considere franquia maior
5. Mantenha histórico limpo`,
    faqs: [
      { q: "Por que seguro de moto é tão caro?", a: "O alto índice de roubo/furto de motos no Brasil é o principal fator. Em São Paulo, por exemplo, motos são o tipo de veículo mais roubado, o que eleva o custo do seguro." },
      { q: "Proteção veicular é a mesma coisa que seguro?", a: "Não! Proteção veicular é oferecida por associações e cooperativas, sem regulação da SUSEP. Não oferece as mesmas garantias legais que um seguro regulamentado." },
    ],
  },
  "plano-saude-individual-vs-empresarial": {
    title: "Plano de Saúde Individual vs Empresarial",
    content: `Uma das dúvidas mais frequentes sobre planos de saúde é a diferença entre plano individual e empresarial. Entender as características de cada um pode significar economia de 30% a 40% na mensalidade.

Plano de Saúde Individual/Familiar:

- Contratado diretamente pela pessoa física
- Reajuste anual regulado pela ANS (em 2025, em torno de 6,9%)
- Não pode ser cancelado pela operadora (exceto por fraude ou falta de pagamento)
- Oferecido por poucas operadoras (mercado mais restrito)
- Preços geralmente mais altos

Plano de Saúde Empresarial:

- Contratado via CNPJ (inclusive MEI)
- Reajuste negociado diretamente com a operadora (pode ser maior ou menor que o individual)
- Pode ser cancelado pela operadora na renovação
- Mais opções de operadoras e planos
- Preços 30% a 40% menores em média
- Mínimo de 2 beneficiários (titular + 1 dependente)

Plano via MEI — a grande sacada:

Se você é profissional liberal, autônomo ou quer um plano mais barato, abrir MEI pode ser muito vantajoso:
- MEI paga em torno de R$ 75/mês de contribuição
- Com o CNPJ do MEI, contrata plano empresarial com 30-40% de desconto
- Precisa de pelo menos 2 vidas (você + cônjuge ou dependente)

Comparativo de preços (exemplo para pessoa de 35 anos):

- Plano Individual: R$ 800 a R$ 1.200/mês
- Plano Empresarial: R$ 500 a R$ 800/mês
- Economia anual: R$ 3.600 a R$ 4.800

Desvantagens do plano empresarial:

- Operadora pode reajustar acima do índice da ANS
- Pode haver cancelamento unilateral na renovação
- Requer manutenção do CNPJ ativo
- Se ficar só com 1 vida, pode perder o plano`,
    faqs: [
      { q: "Vale a pena abrir MEI só para ter plano de saúde?", a: "Na maioria dos casos sim. A economia no plano de saúde geralmente supera em muito o custo mensal do MEI (cerca de R$ 75/mês). Mas é importante manter o CNPJ ativo e regular." },
      { q: "Posso incluir dependentes no plano empresarial?", a: "Sim! Cônjuge, filhos e em alguns casos pais podem ser incluídos como dependentes no plano empresarial, todos com o desconto do plano PME." },
    ],
  },
  "seguro-viagem-internacional": {
    title: "Seguro Viagem Internacional: O Que Você Precisa Saber",
    content: `O seguro viagem internacional é indispensável para qualquer viagem ao exterior. Além de ser obrigatório para entrar em diversos países, ele protege contra despesas médicas que podem ser astronômicas fora do Brasil.

Por que é essencial?

- Uma internação nos EUA pode custar US$ 10.000 por dia
- Na Europa, o Tratado de Schengen exige seguro mínimo de €30.000
- Extravio de bagagem pode arruinar uma viagem
- Cancelamento de voo pode gerar prejuízos significativos

O que o seguro viagem cobre:

- Despesas médicas e hospitalares (a cobertura mais importante)
- Despesas odontológicas de emergência
- Translado médico (remoção para hospital)
- Regresso sanitário (retorno ao Brasil em caso de emergência médica)
- Translado de corpo (em caso de falecimento)
- Extravio, dano e atraso de bagagem
- Cancelamento e interrupção de viagem
- Assistência jurídica no exterior
- Seguro de responsabilidade civil

Coberturas mínimas recomendadas por destino:

- Europa (Schengen): mínimo €30.000 de despesas médicas (recomendamos €60.000)
- EUA/Canadá: mínimo US$ 100.000 (saúde é muito cara)
- América do Sul: mínimo US$ 30.000
- Ásia/Oceania: mínimo US$ 50.000

Quanto custa?

- América do Sul (7 dias): R$ 50 a R$ 150
- Europa (15 dias): R$ 100 a R$ 350
- EUA (15 dias): R$ 150 a R$ 500
- Cobertura mundial (30 dias): R$ 200 a R$ 800

Dicas para contratar:

1. Verifique se o cartão de crédito já oferece seguro viagem (atenção: coberturas podem ser limitadas).
2. Contrate antes de sair do Brasil.
3. Para esportes radicais, verifique cobertura específica.
4. Para gestantes, confirme cobertura para complicações na gravidez.
5. Declare condições preexistentes para não ter sinistro negado.`,
    faqs: [
      { q: "Seguro viagem do cartão de crédito é suficiente?", a: "Pode ser, mas verifique: muitos cobrem apenas despesas médicas com valores limitados e exigem que a passagem tenha sido comprada no cartão. Para destinos com saúde cara (EUA), geralmente não é suficiente." },
      { q: "Posso contratar seguro viagem depois de embarcar?", a: "Algumas seguradoras permitem, mas não é recomendado. Contrate antes da viagem para ter cobertura desde o momento do embarque, incluindo cancelamento de voo." },
    ],
  },
  "seguro-condominio-obrigatorio": {
    title: "Seguro Condomínio é Obrigatório? Entenda a Lei",
    content: `Sim, o seguro de condomínio é obrigatório por lei! O Código Civil Brasileiro (Art. 1.346) determina que todo condomínio edilício deve contratar seguro contra incêndio ou destruição, total ou parcial. A não contratação pode gerar responsabilidade civil e criminal para o síndico.

O que diz a lei:

Art. 1.346 do Código Civil: "É obrigatório o seguro de toda a edificação contra o risco de incêndio ou destruição, total ou parcial."

A obrigação é do condomínio (representado pelo síndico), não dos condôminos individualmente. O custo é rateado entre todos os condôminos.

Coberturas obrigatórias:

- Incêndio, queda de raio e explosão (cobertura básica obrigatória)

Coberturas adicionais recomendadas:

- Vendaval e granizo
- Danos elétricos
- Responsabilidade civil do condomínio (quedas em áreas comuns)
- Responsabilidade civil do síndico (erros de gestão)
- Roubo de bens em áreas comuns
- Quebra de vidros
- Desmoronamento
- Alagamento e infiltração
- Impacto de veículos

Responsabilidade do síndico:

Se o condomínio não tiver seguro e ocorrer um sinistro, o síndico pode ser responsabilizado civilmente pelos prejuízos. Em casos extremos, pode responder criminalmente por negligência.

Como contratar:

1. O síndico deve obter pelo menos 3 cotações
2. A contratação deve ser aprovada em assembleia (recomendado)
3. A apólice deve cobrir 100% do valor de reconstrução do prédio
4. O seguro deve ser renovado anualmente

Seguro condominial vs. seguro residencial:

- Seguro condominial: cobre a estrutura e áreas comuns do prédio
- Seguro residencial: cobre o conteúdo do apartamento individual
- São complementares — o condômino deve ter os dois`,
    faqs: [
      { q: "O que acontece se o condomínio não tiver seguro?", a: "O síndico pode ser responsabilizado civil e criminalmente em caso de sinistro. Além disso, se houver financiamentos vinculados ao condomínio, o banco pode exigir o seguro." },
      { q: "O seguro condominial cobre meu apartamento?", a: "Cobre a estrutura (paredes, piso, teto), mas NÃO cobre seus bens pessoais, móveis e eletrodomésticos. Para isso, você precisa de um seguro residencial individual." },
    ],
  },
  "seguro-cyber-empresas": {
    title: "Seguro Cyber: Proteção Digital para Empresas",
    content: `Com o aumento exponencial de ataques cibernéticos, o seguro cyber se tornou uma proteção essencial para empresas de todos os portes. A LGPD (Lei Geral de Proteção de Dados) ampliou ainda mais a necessidade dessa cobertura.

Cenário atual de ameaças:

- O Brasil é o 2º país mais atacado por ransomware no mundo
- Custo médio de uma violação de dados no Brasil: R$ 6,2 milhões
- 71% das empresas brasileiras já sofreram algum tipo de ataque cibernético
- PMEs são alvo preferencial por terem menos proteção

O que o seguro cyber cobre:

Custos próprios (primeira pessoa):
- Investigação forense digital
- Recuperação de dados e sistemas
- Notificação de clientes afetados (exigida pela LGPD)
- Monitoramento de crédito para vítimas
- Custos com crise de imagem e RP
- Pagamento de extorsão (ransomware — quando legal)

Responsabilidade (terceiros):
- Multas da ANPD por violação da LGPD (até 2% do faturamento)
- Indenizações a clientes por vazamento de dados
- Custos de defesa judicial
- Acordos e negociações

Coberturas adicionais:
- Interrupção de negócios (lucros cessantes digitais)
- Fraude cibernética (transferências não autorizadas)
- Mídia digital (difamação online, violação de direitos autorais)

Quem precisa de seguro cyber?

- Toda empresa que armazena dados de clientes (praticamente todas)
- E-commerces e empresas com vendas online
- Empresas de tecnologia e SaaS
- Escritórios (advocacia, contabilidade, medicina)
- Indústrias com sistemas automatizados
- Empresas que processam pagamentos

Quanto custa?

- Pequenas empresas: R$ 2.000 a R$ 8.000/ano
- Médias empresas: R$ 8.000 a R$ 30.000/ano
- Grandes empresas: negociação caso a caso

O custo é muito inferior ao prejuízo potencial de um ataque. Uma única violação de dados pode custar milhões em multas e indenizações.`,
    faqs: [
      { q: "Seguro cyber cobre ransomware?", a: "Sim, a maioria das apólices cobre custos relacionados a ransomware, incluindo investigação, recuperação de dados e, em alguns casos, o próprio pagamento de resgate (quando legal e autorizado)." },
      { q: "Minha empresa é pequena, preciso de seguro cyber?", a: "Sim! PMEs são alvos preferenciais de hackers justamente por terem menos proteção. A LGPD aplica multas proporcionais ao faturamento, então mesmo pequenas empresas estão expostas." },
    ],
  },
  "previdencia-privada-vgbl-pgbl": {
    title: "Previdência Privada: VGBL ou PGBL?",
    content: `A previdência privada é uma das formas mais inteligentes de construir patrimônio para o futuro e complementar a aposentadoria do INSS. Mas escolher entre VGBL e PGBL faz toda a diferença na economia tributária.

PGBL (Plano Gerador de Benefício Livre):

- Permite deduzir até 12% da renda bruta anual no Imposto de Renda
- Ideal para quem faz declaração completa do IR
- Na hora do resgate, o IR incide sobre o valor TOTAL (contribuições + rendimentos)
- Indicado para: assalariados CLT, profissionais com renda alta

Exemplo: se você ganha R$ 120.000/ano e investe R$ 14.400 (12%) em PGBL, paga IR sobre R$ 105.600, economizando até R$ 3.960 por ano em impostos.

VGBL (Vida Gerador de Benefício Livre):

- NÃO permite dedução no Imposto de Renda
- Ideal para quem faz declaração simplificada ou já usa os 12% em PGBL
- Na hora do resgate, o IR incide apenas sobre os RENDIMENTOS
- Não entra no inventário (excelente para planejamento sucessório)
- Indicado para: autônomos, quem declara simplificado, planejamento sucessório

Tabela de tributação:

Tabela Progressiva (compensável):
- Até R$ 2.259,20: isento
- De R$ 2.259,21 a R$ 2.826,65: 7,5%
- Até R$ 3.751,05: 15%
- Até R$ 4.664,68: 22,5%
- Acima: 27,5%

Tabela Regressiva (definitiva — indicada para longo prazo):
- Até 2 anos: 35%
- 2 a 4 anos: 30%
- 4 a 6 anos: 25%
- 6 a 8 anos: 20%
- 8 a 10 anos: 15%
- Acima de 10 anos: 10%

Dica: se você pretende deixar o dinheiro por mais de 10 anos, escolha a tabela regressiva — pagará apenas 10% de IR no resgate.

Quanto investir?

A regra dos 12% é um bom começo: invista 12% da renda em PGBL (para ter o benefício fiscal) e, se puder investir mais, coloque o excedente em VGBL.`,
    faqs: [
      { q: "Posso ter PGBL e VGBL ao mesmo tempo?", a: "Sim! Na verdade, essa é a estratégia ideal. Use PGBL até o limite de 12% da renda (para deduzir no IR) e VGBL para aportes adicionais." },
      { q: "Posso resgatar a previdência a qualquer momento?", a: "Sim, após o período de carência (geralmente 60 dias). Porém, resgates antecipados podem ter tributação maior na tabela regressiva. O ideal é manter por pelo menos 10 anos." },
      { q: "Previdência privada é melhor que poupança?", a: "Em geral sim, especialmente com o benefício fiscal do PGBL. Fundos de previdência com boa gestão rendem mais que a poupança no longo prazo, além das vantagens tributárias e sucessórias." },
    ],
  },
  "seguro-celular-como-contratar": {
    title: "Seguro Celular: Como Contratar e Quanto Custa",
    content: `Com smartphones custando de R$ 2.000 a R$ 10.000, proteger seu celular com seguro faz cada vez mais sentido. O seguro celular cobre roubo, furto, danos acidentais e até defeitos fora da garantia.

O que o seguro celular cobre:

- Roubo e furto qualificado: indenização para comprar aparelho novo
- Danos acidentais: queda, líquidos, tela quebrada
- Defeito de fabricação pós-garantia: problemas que surgem após a garantia do fabricante
- Danos elétricos: queima por variação de energia

O que NÃO cobre:

- Perda do aparelho (esqueceu em algum lugar)
- Furto simples (sem violência ou arrombamento)
- Danos estéticos que não afetem o funcionamento
- Desgaste natural
- Vírus e malware

Quanto custa o seguro celular?

Em média, de 10% a 20% do valor do aparelho por ano:
- iPhone 15 (R$ 7.000): seguro de R$ 700 a R$ 1.400/ano
- Samsung Galaxy S24 (R$ 5.000): seguro de R$ 500 a R$ 1.000/ano
- Smartphones intermediários (R$ 2.000): seguro de R$ 200 a R$ 400/ano

Como contratar:

1. Na compra do aparelho: muitas lojas oferecem seguro no ato da compra
2. Via seguradora: Porto, Zurich, Assurant e outras oferecem seguro avulso
3. Via operadora: Claro, Vivo e Tim têm seguros para clientes
4. Via corretor: na Patro, comparamos opções para encontrar o melhor custo-benefício

Dicas para contratar:

- Contrate logo após a compra (quanto mais novo, melhor)
- Leia as exclusões da apólice com atenção
- Verifique se há franquia e qual o valor
- Prefira seguros regulados pela SUSEP
- Guarde nota fiscal e comprovante de compra`,
    faqs: [
      { q: "Seguro celular cobre tela quebrada?", a: "Sim, na maioria das apólices. A cobertura de danos acidentais inclui queda e quebra de tela. Pode haver franquia a ser paga pelo segurado." },
      { q: "Perdi meu celular, o seguro cobre?", a: "Não. A perda (esqueceu ou extraviou) não é coberta. O seguro cobre apenas roubo (com violência) e furto qualificado (com arrombamento)." },
      { q: "Preciso fazer B.O. para acionar o seguro?", a: "Sim, em caso de roubo ou furto é obrigatório registrar Boletim de Ocorrência. É um dos documentos exigidos para dar entrada no sinistro." },
    ],
  },
  "seguro-transporte-cargas": {
    title: "Seguro de Transporte de Cargas: Guia Completo",
    content: `O seguro de transporte de cargas protege mercadorias durante o deslocamento terrestre, aéreo, marítimo ou fluvial. No Brasil, é obrigatório para transportadoras que operam com cargas de terceiros.

Tipos de seguro de transporte:

1. RCTR-C (Responsabilidade Civil do Transportador Rodoviário de Cargas)
- Obrigatório para transportadoras
- Cobre a responsabilidade do transportador por danos à carga
- Cobertura durante todo o transporte

2. RCF-DC (Responsabilidade Civil Facultativa — Desaparecimento de Carga)
- Complementar ao RCTR-C
- Cobre roubo e furto de carga (o RCTR-C não cobre)
- Essencial dada a realidade brasileira de roubo de cargas

3. Seguro de Transporte Nacional
- Contratado pelo dono da mercadoria (embarcador)
- Cobre a mercadoria em si, independente de culpa do transportador
- Proteção mais ampla

4. Seguro de Transporte Internacional
- Para importação e exportação
- Segue regras internacionais (Incoterms)
- Cobre riscos durante todo o trânsito internacional

O que o seguro de transporte cobre:

- Colisão, tombamento e capotamento do veículo
- Incêndio e explosão
- Roubo e furto de carga (na apólice RCF-DC)
- Avarias na carga durante transporte
- Acidentes durante carga e descarga
- Fenômenos naturais

Obrigatoriedade:

O RCTR-C é obrigatório para todas as transportadoras que realizam transporte de cargas de terceiros. A não contratação pode gerar multas e impedimento de operação.

Quanto custa:

O prêmio é calculado sobre o valor da mercadoria transportada:
- RCTR-C: de 0,01% a 0,1% do valor da carga
- RCF-DC: de 0,02% a 0,2% do valor da carga
- Seguro próprio: de 0,03% a 0,5% dependendo do tipo de mercadoria e rota`,
    faqs: [
      { q: "RCTR-C cobre roubo de carga?", a: "Não! O RCTR-C cobre apenas danos durante o transporte (colisão, tombamento, etc). Para cobertura de roubo, é necessário contratar o RCF-DC complementarmente." },
      { q: "Quem paga o seguro de transporte?", a: "O RCTR-C é obrigação da transportadora. O seguro da mercadoria em si pode ser contratado pelo embarcador (dono da carga) ou pelo destinatário, conforme negociação." },
    ],
  },
  "seguro-engenharia-obras": {
    title: "Seguro Engenharia para Obras e Construções",
    content: `O seguro de engenharia protege obras civis, montagens industriais e equipamentos durante a fase de construção e instalação. É frequentemente exigido em licitações públicas e contratos privados de grande porte.

Tipos de seguro de engenharia:

1. Risco de Engenharia (RE)
- Cobre obras civis em construção: prédios, pontes, estradas, barragens
- Proteção contra danos materiais durante a execução
- Inclui materiais, equipamentos e mão de obra

2. Instalação e Montagem (IM)
- Para montagem de máquinas e equipamentos industriais
- Cobre danos durante transporte, montagem e testes
- Comum em instalação de linhas de produção

3. Obras Civis em Construção (OCC)
- Similar ao RE, focado em edificações
- Exigido por financiadores e construtoras

4. Garantia (Performance Bond)
- Garante o cumprimento do contrato de construção
- Exigido em licitações públicas

O que o seguro de engenharia cobre:

- Danos materiais à obra em construção
- Incêndio, raio e explosão durante a obra
- Roubo de materiais e equipamentos no canteiro
- Desmoronamento e aluimento de terra
- Erros de projeto e execução
- Danos a propriedades adjacentes
- Responsabilidade civil contra terceiros
- Despesas de salvamento e desentulho
- Lucros cessantes do contratante

Quando é obrigatório:

- Obras públicas licitadas
- Financiamentos habitacionais (Caixa, bancos)
- Contratos com cláusula de garantia
- Projetos com investidores institucionais

Quanto custa:

Em média, de 0,1% a 0,5% do valor total da obra por ano. Para uma obra de R$ 10 milhões, o seguro pode custar de R$ 10.000 a R$ 50.000 anuais.`,
    faqs: [
      { q: "Seguro de engenharia é obrigatório para toda obra?", a: "Não para todas, mas é obrigatório em obras públicas licitadas e frequentemente exigido por financiadores. Para obras privadas, é altamente recomendado." },
      { q: "O seguro cobre defeito que aparece depois da obra pronta?", a: "Existe a cobertura de manutenção ampla, que cobre defeitos que se manifestam após a conclusão da obra, geralmente por 12 a 24 meses. Deve ser contratada especificamente." },
    ],
  },
  "como-acionar-seguro-auto": {
    title: "Como Acionar o Seguro Auto: Passo a Passo",
    content: `Saber como acionar o seguro auto corretamente faz toda a diferença na velocidade e qualidade do atendimento. Siga este passo a passo para os principais tipos de sinistro.

Em caso de ACIDENTE (colisão):

1. Garanta a segurança: sinalize o local, ligue o pisca-alerta, coloque triângulo
2. Verifique se há feridos — se houver, chame o SAMU (192) ou bombeiros (193)
3. NÃO mova os veículos antes de registrar provas (se possível)
4. Tire fotos: dos veículos, posição, danos, placa, local, sinalização
5. Troque dados com o outro motorista: nome, telefone, placa, seguradora
6. Registre B.O. (obrigatório se houver vítimas)
7. Ligue para a seguradora ou corretor o mais rápido possível
8. Solicite guincho se o veículo não tiver condições de trafegar

Em caso de ROUBO ou FURTO:

1. NÃO reaja — sua vida vale mais que qualquer veículo
2. Registre Boletim de Ocorrência o mais rápido possível (pode ser online em muitos estados)
3. Ligue imediatamente para a seguradora ou corretor
4. Providencie documentos: B.O., CNH, documento do veículo, chaves reserva
5. A seguradora tem até 30 dias para indenizar após entrega de todos os documentos

Em caso de PANE MECÂNICA ou PNEU FURADO:

1. Pare em local seguro
2. Ligue para a central de assistência 24h (número no cartão do seguro)
3. Informe sua localização exata
4. Aguarde o socorro (guincho, troca de pneu, carga de bateria)

Documentos necessários para sinistro:

- Apólice do seguro (número)
- CNH do condutor
- Documento do veículo (CRV)
- Boletim de Ocorrência (para roubo, furto e acidentes com terceiros)
- Fotos do sinistro
- Orçamentos de reparo (em alguns casos)

Prazos importantes:

- Aviso de sinistro: comunique a seguradora em até 72 horas
- Entrega de documentos: conforme solicitado pela seguradora
- Indenização: até 30 dias após entrega de toda documentação
- Franquia: paga na oficina referenciada no ato da retirada do veículo

Na Patro Seguros, acompanhamos todo o processo de sinistro do início ao fim. Você não precisa se preocupar com burocracia.`,
    faqs: [
      { q: "Se eu bater o carro, sou obrigado a fazer B.O.?", a: "Se não houver vítimas e os motoristas entrarem em acordo, não é obrigatório. Mas é altamente recomendado para fins de seguro. Se houver vítimas, o B.O. é obrigatório." },
      { q: "Quanto tempo a seguradora demora para resolver?", a: "Para reparos, geralmente 5 a 15 dias úteis. Para indenização integral (perda total ou roubo), até 30 dias após entrega de toda documentação." },
      { q: "Se eu causei o acidente, o seguro cobre?", a: "Sim! O seguro cobre danos ao seu veículo (com franquia) e danos ao terceiro (pela cobertura de responsabilidade civil), independente de quem causou o acidente." },
    ],
  },
  "seguro-odontologico-coberturas": {
    title: "Seguro Odontológico: Coberturas e Valores",
    content: `O seguro odontológico (ou plano odontológico) é um dos produtos mais acessíveis do mercado de saúde suplementar. Com mensalidades a partir de R$ 25, é possível ter acesso a uma ampla rede de dentistas e procedimentos.

O que o seguro odontológico cobre:

Procedimentos básicos (cobertos em todos os planos):
- Consultas e avaliações
- Limpeza e profilaxia
- Aplicação de flúor
- Radiografias
- Restaurações (obturações)
- Extrações simples

Procedimentos intermediários (planos intermediários e completos):
- Tratamento de canal (endodontia)
- Tratamento de gengiva (periodontia)
- Cirurgias orais menores
- Próteses parciais removíveis
- Placa de bruxismo

Procedimentos avançados (planos completos/premium):
- Implantes dentários
- Próteses fixas (coroas e pontes)
- Ortodontia (aparelho dentário)
- Clareamento dental
- Facetas e lentes de contato dental

Quanto custa:

- Plano básico: R$ 25 a R$ 50/mês
- Plano intermediário: R$ 50 a R$ 120/mês
- Plano completo (com ortodontia): R$ 80 a R$ 200/mês
- Plano premium (com implantes): R$ 150 a R$ 350/mês

Principais operadoras:

- MetLife Odonto
- OdontoPrev
- SulAmérica Odonto
- Bradesco Dental
- Porto Seguro Odonto
- Amil Dental

Plano individual vs. empresarial:

Assim como planos de saúde, planos odontológicos empresariais são mais baratos (20-30% de desconto). MEIs podem contratar plano empresarial odontológico com condições especiais.

Dicas para escolher:

1. Verifique se os dentistas e clínicas que você frequenta estão na rede
2. Confira carências para cada procedimento
3. Se precisa de ortodontia ou implante, escolha plano que cubra
4. Planos com coparticipação são mais baratos na mensalidade
5. Compare pelo menos 3 operadoras`,
    faqs: [
      { q: "Plano odontológico tem carência?", a: "Sim, geralmente: consultas e urgências (24h), procedimentos básicos (30 a 90 dias), endodontia e periodontia (90 a 180 dias), próteses e ortodontia (180 a 365 dias)." },
      { q: "Plano odontológico cobre implante?", a: "Apenas planos premium ou com cobertura específica para implantes. Planos básicos e intermediários não cobrem. Verifique antes de contratar se esse procedimento é importante para você." },
      { q: "Posso ter plano de saúde e odontológico separados?", a: "Sim! São produtos independentes. Você pode contratar plano de saúde de uma operadora e odontológico de outra, escolhendo o melhor de cada uma." },
    ],
  },
};

const defaultArticle = {
  title: "Artigo",
  content: "Este artigo está sendo preparado. Entre em contato conosco para mais informações sobre este tema.",
  faqs: [],
};

const BlogArticle = () => {
  const { slug } = useParams();
  const article = (slug && articlesContent[slug]) || defaultArticle;

  return (
    <>
      <Header />
      <main>
        <section className="gradient-hero py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <Link to="/blog" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6">
              <ArrowLeft className="mr-1 h-4 w-4" /> Voltar ao Blog
            </Link>
            <h1 className="mb-4">{article.title}</h1>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="prose prose-lg max-w-none">
              {article.content.split("\n\n").map((p, i) => (
                <p key={i} className="text-muted-foreground mb-4 whitespace-pre-line">{p}</p>
              ))}
            </div>

            {article.faqs.length > 0 && (
              <div className="mt-12 border-t pt-8">
                <h2 className="mb-6">Perguntas Frequentes</h2>
                <div className="space-y-4">
                  {article.faqs.map((faq, i) => (
                    <div key={i}>
                      <h3 className="text-lg font-semibold mb-1">{faq.q}</h3>
                      <p className="text-muted-foreground">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-12 p-8 bg-muted rounded-xl text-center">
              <h3 className="text-2xl font-bold mb-4">Precisa de Ajuda com Seguros?</h3>
              <p className="text-muted-foreground mb-6">Fale com nossos especialistas e encontre a melhor proteção.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/cotacao">
                  <Button size="lg">Pedir Cotação</Button>
                </Link>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="cta">
                    <MessageCircle className="mr-2 h-5 w-5" /> WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default BlogArticle;
