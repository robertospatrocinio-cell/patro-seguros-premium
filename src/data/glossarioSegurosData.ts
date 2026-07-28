export type GlossaryTerm = {
  term: string;
  definition: string;
  related?: { label: string; href: string }[];
};

export type GlossaryCategory = {
  id: string;
  title: string;
  description: string;
  terms: GlossaryTerm[];
};

export const slugifyTerm = (term: string): string =>
  term
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const normalizeLetter = (raw: string): string => {
  const clean = raw
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase();
  return /^[A-Z]$/.test(clean[0] ?? "") ? clean[0] : "";
};

export const GLOSSARY_CATEGORIES: GlossaryCategory[] = [
  {
    id: "gerais",
    title: "Conceitos gerais",
    description: "Termos comuns a qualquer apólice de seguro.",
    terms: [
      { term: "Apólice", definition: "Contrato formal entre o segurado e a seguradora que descreve coberturas, exclusões, prêmio, vigência, franquia, importância segurada e demais condições. Toda apólice é registrada na SUSEP." },
      { term: "Prêmio", definition: "Valor que o segurado paga à seguradora pela cobertura contratada. Pode ser anual, semestral, mensal ou em parcelas, conforme o produto." },
      { term: "Sinistro", definition: "Evento previsto na apólice que aciona o pagamento da indenização — colisão, incêndio, roubo, morte, internação etc." },
      { term: "Franquia", definition: "Parte do prejuízo que fica por conta do segurado em cada sinistro. Quanto menor a franquia, maior tende a ser o prêmio." },
      { term: "Importância segurada", definition: "Valor máximo que a seguradora paga em caso de sinistro coberto. Deve refletir o valor real do bem para evitar subseguro." },
      { term: "Indenização", definition: "Valor pago pela seguradora ao segurado (ou beneficiário) após a regulação do sinistro, descontada a franquia." },
      { term: "Vigência", definition: "Período em que a apólice está válida. No Brasil, em geral 12 meses, com renovação anual." },
      { term: "Carência", definition: "Prazo após a contratação durante o qual determinadas coberturas ainda não estão ativas. Comum em vida, saúde e doenças graves." },
      { term: "Cláusula", definition: "Item específico da apólice que detalha uma cobertura, exclusão, obrigação ou condição. Cláusulas adicionais aumentam o prêmio." },
      { term: "Endosso", definition: "Alteração formal feita na apólice durante a vigência (inclusão de motorista, mudança de endereço, ampliação de cobertura)." },
      { term: "Beneficiário", definition: "Pessoa indicada pelo segurado para receber a indenização (típico de seguro de vida e acidentes pessoais)." },
      { term: "Corretor de seguros", definition: "Profissional habilitado pela SUSEP que intermedia a contratação entre segurado e seguradora, sem custo adicional para o cliente." },
      { term: "SUSEP", definition: "Superintendência de Seguros Privados — autarquia federal que regula e fiscaliza o mercado de seguros, capitalização e previdência aberta no Brasil." },
      { term: "Resseguro", definition: "Operação na qual a seguradora transfere parte do risco a uma resseguradora, garantindo capacidade para grandes apólices." },
      { term: "Regulação de sinistro", definition: "Processo técnico em que a seguradora apura causa, extensão do prejuízo e enquadramento na cobertura antes de pagar a indenização." },
    ],
  },
  {
    id: "auto",
    title: "Auto e veículos",
    description: "Termos específicos de seguro auto, moto, caminhão e veículos pesados.",
    terms: [
      { term: "Cobertura compreensiva (Casco)", definition: "Cobertura mais completa do seguro auto — inclui colisão, incêndio, roubo, furto qualificado, fenômenos da natureza e RCF.", related: [{ label: "Comparativo de coberturas", href: "/seguro-auto/comparativo-coberturas" }] },
      { term: "RCF (Responsabilidade Civil Facultativa)", definition: "Cobertura para danos materiais e corporais que o segurado causar a terceiros — fundamental em qualquer apólice auto." },
      { term: "APP (Acidentes Pessoais de Passageiros)", definition: "Indenização por morte ou invalidez de ocupantes do veículo segurado em acidente coberto." },
      { term: "Carro reserva", definition: "Veículo cedido ao segurado enquanto o seu está em reparo em oficina referenciada, conforme dias e categoria contratados." },
      { term: "Valor de mercado referenciado (FIPE)", definition: "Forma de indenização em que, em caso de perda total, a seguradora paga o valor FIPE do veículo na data do sinistro multiplicado pelo fator contratado." },
      { term: "Valor determinado", definition: "Forma de indenização em que o valor pago em caso de perda total é fixo, definido na contratação — comum em veículos premium, blindados e clássicos.", related: [{ label: "Seguro auto premium", href: "/seguro-auto/marcas" }] },
      { term: "Bônus", definition: "Desconto por histórico sem sinistro. A cada vigência sem aviso, o segurado sobe de classe (1 a 10), reduzindo o prêmio na renovação." },
      { term: "Perfil", definition: "Conjunto de dados do principal condutor (idade, sexo, estado civil, CEP de pernoite, uso) que determina o cálculo do prêmio." },
      { term: "Vistoria prévia", definition: "Inspeção feita no início da apólice para verificar estado do veículo e equipamentos. Algumas seguradoras dispensam para zero-km." },
      { term: "Sinistro de pequeno reparo", definition: "Avaria de baixo valor (martelinho, polimento, troca de para-choque) que pode ser regulada sem perda integral de bônus, conforme produto." },
    ],
  },
  {
    id: "empresarial",
    title: "Empresarial e patrimonial",
    description: "Termos do seguro empresarial, galpões, condomínios e responsabilidade civil.",
    terms: [
      { term: "Seguro Compreensivo Empresarial", definition: "Apólice multirrisco para PME — incêndio, raio, explosão, roubo, vendaval, danos elétricos, RC e equipamentos." },
      { term: "Lucros Cessantes", definition: "Cobertura que indeniza o lucro líquido que a empresa deixa de ganhar enquanto está paralisada por um sinistro coberto." },
      { term: "RC Operações", definition: "Responsabilidade Civil por danos causados a terceiros decorrentes da operação normal da empresa." },
      { term: "RC Produto", definition: "Responsabilidade Civil por danos causados por produto fabricado, vendido ou distribuído pela empresa após a entrega." },
      { term: "RC Empregador", definition: "Cobertura para indenizações trabalhistas decorrentes de acidente de trabalho com funcionário próprio." },
      { term: "Riscos Patrimoniais", definition: "Linha de seguros que protege ativos físicos — prédio, conteúdo, máquinas, estoque — contra incêndio, vendaval, alagamento e demais eventos contratados.", related: [{ label: "Seguro de galpão", href: "/seguro-galpao-guarulhos" }] },
      { term: "Riscos de Engenharia", definition: "Cobertura para obras civis e instalação/montagem de equipamentos durante o período de construção." },
      { term: "Garantia Judicial e Contratual", definition: "Substitui depósito judicial em dinheiro ou caução em contrato público/privado, liberando capital de giro." },
      { term: "D&O (Directors & Officers)", definition: "Seguro de responsabilidade civil para administradores, diretores e conselheiros por atos de gestão." },
      { term: "E&O (Errors & Omissions)", definition: "RC Profissional para prestadores de serviço técnico (engenharia, TI, consultoria, saúde) por erro ou omissão.", related: [{ label: "RC Profissional", href: "/seguro-rc-profissional" }] },
      { term: "Cyber Risk", definition: "Cobertura para incidentes cibernéticos — vazamento de dados, ransomware, interrupção de sistemas e LGPD." },
      { term: "Seguro para Vistoriadora Veicular", definition: "Combinação de coberturas (empresarial, RC Operações, E&O, cyber e equipamentos) para ECVs, laudo cautelar, vistoria de transferência, perícia e inspeção automotiva. Cobertura sujeita à análise e aceitação da seguradora.", related: [{ label: "Ver guia completo", href: "/seguro-vistoriadora-veicular" }] },
    ],
  },
  {
    id: "vida-saude",
    title: "Vida, saúde e pessoas",
    description: "Termos de seguro de vida, acidentes pessoais e planos de saúde.",
    terms: [
      { term: "Morte natural", definition: "Cobertura básica do seguro de vida — indeniza o beneficiário em caso de óbito por qualquer causa após o término da carência." },
      { term: "Morte acidental", definition: "Cobertura adicional que dobra (ou complementa) a indenização quando o óbito decorre exclusivamente de acidente." },
      { term: "Invalidez Permanente Total ou Parcial por Acidente (IPA)", definition: "Indenização proporcional ao grau de invalidez decorrente de acidente coberto." },
      { term: "Invalidez Funcional por Doença (IFPD)", definition: "Indenização quando a doença causa perda funcional permanente e irreversível para a atividade laboral." },
      { term: "Doenças Graves", definition: "Cobertura que antecipa parte do capital segurado no diagnóstico de doenças listadas (câncer, AVC, infarto, transplante)." },
      { term: "Auxílio funeral", definition: "Reembolso ou prestação de serviço funeral em caso de óbito do segurado ou de dependentes contratados." },
      { term: "Capital Segurado", definition: "Valor total da indenização contratado para cada cobertura do seguro de vida." },
      { term: "Coparticipação (saúde)", definition: "Percentual ou valor fixo pago pelo beneficiário a cada uso de consulta, exame ou procedimento — reduz a mensalidade." },
      { term: "Carência (saúde)", definition: "Prazo após a adesão em que determinadas coberturas ainda não podem ser usadas, conforme regras da ANS." },
      { term: "Rede credenciada", definition: "Conjunto de hospitais, clínicas, laboratórios e médicos que atendem o beneficiário sem desembolso. Sujeita a alterações pela operadora." },
      { term: "Reembolso", definition: "Modalidade em que o beneficiário paga o atendimento fora da rede e a operadora reembolsa parte ou o total, conforme tabela." },
    ],
  },
  {
    id: "agro",
    title: "Agro e rural",
    description: "Termos específicos de seguro agrícola, pecuário, máquinas e propriedade rural.",
    terms: [
      { term: "PSR (Programa de Subvenção ao Prêmio do Seguro Rural)", definition: "Programa federal que paga parte do prêmio do seguro agrícola, reduzindo o custo para o produtor — sujeito a cota anual e elegibilidade da cultura.", related: [{ label: "Hub Seguro Agro", href: "/seguro-agro" }] },
      { term: "Penhor Rural", definition: "Seguro do estoque rural (grãos, insumos) dado em garantia em operação de crédito rural.", related: [{ label: "Seguro Rural", href: "/seguro-rural" }] },
      { term: "Seguro Agrícola (Lavoura)", definition: "Cobertura do ciclo da cultura contra eventos climáticos cobertos — granizo, geada, vendaval, chuva excessiva, seca, conforme produto." },
      { term: "Seguro Pecuário", definition: "Cobertura para rebanho contra morte por acidente e doenças cobertas." },
      { term: "Silo / Armazém Graneleiro", definition: "Estrutura para armazenamento de grãos — seguro cobre a estrutura, conteúdo e, em alguns produtos, perda por falha de aeração.", related: [{ label: "Seguro de silo", href: "/seguro-silo-agricola" }] },
      { term: "Importância Segurada por hectare", definition: "Valor segurado calculado por hectare plantado, multiplicado pela área da apólice — base do cálculo no seguro agrícola." },
      { term: "ZARC (Zoneamento Agrícola de Risco Climático)", definition: "Estudo do MAPA que define janelas de plantio por município e cultura com menor risco climático. Plantar fora do ZARC tende a recusa de cobertura, mesmo com apólice vigente." },
      { term: "Drone Agrícola (RPA)", definition: "Aeronave remotamente pilotada usada para mapeamento ou pulverização. Operação acima de 25 kg ou comercial exige registro ANAC, cadastro SISANT e Seguro RCF obrigatório.", related: [{ label: "Seguro de drone agrícola", href: "/seguro-drone-agricola" }] },
    ],
  },
  {
    id: "transporte",
    title: "Transporte de cargas",
    description: "Termos do seguro de transporte rodoviário, aéreo e internacional.",
    terms: [
      { term: "RCTR-C (Resp. Civil do Transportador Rodoviário de Carga)", definition: "Cobertura obrigatória para empresas que transportam cargas de terceiros — cobre danos à carga em acidente do veículo transportador." },
      { term: "RCF-DC (Desaparecimento de Carga)", definition: "Cobertura facultativa para roubo e desaparecimento de carga sob responsabilidade do transportador." },
      { term: "RCA-C (Ambiental do Transportador)", definition: "Cobertura para danos ambientais decorrentes de acidente no transporte de cargas perigosas." },
      { term: "Averbação", definition: "Comunicação prévia à seguradora dos embarques realizados no mês, base para o cálculo do prêmio do seguro de transporte." },
      { term: "GRIS", definition: "Gerenciamento de Risco — exigências da seguradora (rastreador, escolta, rota, pernoite) para que a apólice esteja válida." },
    ],
  },
];

export type FlatGlossaryTerm = GlossaryTerm & {
  categoryId: string;
  categoryTitle: string;
  slug: string;
  letter: string;
};

export const ALL_GLOSSARY_TERMS: FlatGlossaryTerm[] = GLOSSARY_CATEGORIES.flatMap((cat) =>
  cat.terms.map((t) => ({
    ...t,
    categoryId: cat.id,
    categoryTitle: cat.title,
    slug: slugifyTerm(t.term),
    letter: normalizeLetter(t.term) || "#",
  })),
);

export const GLOSSARY_LETTERS_WITH_TERMS: string[] = Array.from(
  new Set(ALL_GLOSSARY_TERMS.map((t) => t.letter)),
).sort();

export const ALL_GLOSSARY_LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export const getTermsByLetter = (letter: string): FlatGlossaryTerm[] => {
  const L = normalizeLetter(letter);
  return ALL_GLOSSARY_TERMS.filter((t) => t.letter === L).sort((a, b) =>
    a.term.localeCompare(b.term, "pt-BR"),
  );
};
