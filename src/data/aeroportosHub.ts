import { COMPANY, ORGANIZATION_SCHEMA } from "../config/company";
import { eoPath, eoMeta } from "./eoDiscovery";

export const hubPath = "/seguros-aeroportuarios";
export const hubOrigin = "Hub Aeroportuário";
export const hubMessage = "Olá! Minha empresa vai prestar serviços em um aeroporto e gostaria de orientação sobre os seguros exigidos no contrato.";
const url = COMPANY.dominioCanonico + hubPath;
export const hubMeta = {
  title: "Seguros para Empresas em Aeroportos | Guarulhos | Patro",
  h1: "Seguros para Empresas e Prestadores de Serviços em Aeroportos",
  description: "A empresa vai prestar serviços em um aeroporto? Conheça os seguros que podem ser exigidos no contrato e solicite orientação especializada da Patro Seguros.",
  canonical: url, ogUrl: url, ogType: "website" as const, ogImage: eoMeta.ogImage, ogImageAlt: eoMeta.ogImageAlt,
};

export const solutions: { name: string; scope: string; note: string; href?: string }[] = [
  { name: "Seguro E&O Engenharia", scope: "Projeto e responsabilidade técnica", note: "Reclamações por erros ou omissões profissionais cobertos, como uma falha no dimensionamento de um sistema.", href: eoPath },
  { name: "RC Aeroportuário", scope: "Operação no aeroporto", note: "Responsabilidades ligadas à atividade e ao local declarado. Danos a aeronaves não devem ser presumidos cobertos. Disponibilidade sob consulta específica." },
  { name: "Responsabilidade Civil Geral", scope: "Danos a terceiros", note: "Pode responder por danos corporais ou materiais a terceiros durante operações cobertas. Verifique as restrições a áreas aeroportuárias.", href: "/seguro-rc" },
  { name: "Riscos de Engenharia", scope: "Obra, instalação e montagem", note: "Trata de determinados danos físicos à obra durante a execução. Períodos de testes e bens preexistentes merecem conferência.", href: "/seguro-engenharia" },
  { name: "Seguro Garantia", scope: "Obrigação contratual", note: "Garante ao segurado determinadas obrigações do tomador descritas na apólice. Não substitui a responsabilidade por danos a terceiros.", href: "/seguro-garantia" },
  { name: "Responsabilidade Civil Ambiental", scope: "Eventos ambientais", note: "Permite avaliar responsabilidades por eventos de poluição cobertos. Confira locais, despesas de remediação e hipóteses excluídas.", href: "/seguro-ambiental" },
  { name: "Seguro de Equipamentos", scope: "Máquinas e ferramentas", note: "Considere os equipamentos próprios ou locados e onde serão usados. Transporte, movimentação e guarda podem ter tratamentos distintos.", href: "/seguro-maquinas" },
  { name: "Seguro Empresarial", scope: "Patrimônio e continuidade", note: "Protege bens nos endereços previstos. Perda de receita após um dano coberto exige avaliação de cobertura específica de lucros cessantes.", href: "/seguro-empresarial" },
  { name: "Seguro de Vida em Grupo", scope: "Proteção da equipe", note: "Prevê benefícios para colaboradores ou beneficiários nos eventos contratados. Verifique o grupo elegível e eventuais obrigações coletivas.", href: "/seguro-vida-pme" },
  { name: "Plano de Saúde Empresarial", scope: "Assistência à saúde", note: "Avalie elegibilidade, rede, abrangência e carências. É assistência aos colaboradores, não uma cobertura de responsabilidade civil.", href: "/plano-saude-empresarial" },
];

export const segments = [
  ["Projetos e laudos", "Engenharia civil, elétrica, mecânica, estrutural e ambiental; arquitetura, inspeções técnicas e consultorias."],
  ["Obras e sistemas", "Obras e construção, instalações industriais, climatização, automação, telecomunicações e sistemas de combate a incêndio."],
  ["Operação e facilities", "Manutenção predial, limpeza e conservação, segurança patrimonial, logística, transporte, facilities e terceirização de serviços."],
];
export const hubFaq = [
  ["Qual seguro preciso para trabalhar em um aeroporto?", "Depende do trabalho, da área de atuação e das condições aplicáveis. Para uma instalação, por exemplo, examine separadamente o projeto, os danos à montagem e possíveis danos a terceiros."],
  ["Todos os fornecedores do GRU Airport precisam das mesmas apólices?", "Não há uma lista única que esta página possa confirmar para todos os fornecedores. Consulte a versão vigente do seu contrato, os anexos e as instruções de credenciamento fornecidas pela contratante."],
  ["Como saber se a exigência vem da lei ou do contrato?", "Peça a identificação da norma ou da cláusula que estabelece a obrigação. Uma condição comercial imposta pela contratante não se torna, por si só, obrigação legal para todas as empresas."],
  ["Posso pedir orientação antes de assinar o contrato?", "Sim. Um edital, minuta ou trecho da cláusula já permite identificar pontos a esclarecer. A versão assinada e seus anexos devem ser conferidos antes da contratação."],
  ["Quais documentos ajudam na primeira análise?", "Separe a descrição dos serviços, local, período de execução, cláusula de seguro e apólices vigentes. Compartilhe só o trecho necessário, sem assinaturas ou dados pessoais de terceiros."],
  ["RC Geral cobre danos a aeronaves?", "Não presuma essa cobertura. O bem atingido, a área de trabalho, a guarda ou custódia e as exclusões da apólice podem mudar a resposta. Descreva a exposição à seguradora."],
  ["E&O Engenharia substitui Riscos de Engenharia?", "Não. E&O trata de reclamações por falha profissional coberta. Riscos de Engenharia trata de danos físicos cobertos durante obras, instalações ou montagens."],
  ["Seguro Garantia paga qualquer prejuízo ocorrido na obra?", "Não. A apólice identifica a obrigação garantida, o segurado, o tomador e as condições de acionamento. Danos materiais à obra e a terceiros exigem análises próprias."],
  ["Como conferir o limite exigido?", "Compare o valor por ocorrência e o limite total do período com os valores da cláusula. Verifique também sublimites, moeda, franquias e se o limite é compartilhado com outros contratos."],
  ["O que observar nas exclusões?", "Confira atividades, locais e bens excluídos. Uma apólice pode contemplar a atividade em geral, mas restringir trabalhos em aeroportos, bens sob custódia ou certos danos ambientais."],
  ["Uma apólice que já tenho pode servir?", "Pode, se segurado, atividade, locais, limites, vigência e condições atenderem ao pedido. Encaminhe também os endossos. Uma declaração isolada não altera o alcance da cobertura."],
  ["E se a apólice precisar de ajuste?", "A corretora pode solicitar à seguradora uma alteração por endosso ou buscar outra proposta. O ajuste depende de aceitação; não considere a cobertura ampliada antes de sua formalização."],
  ["Quanto tempo leva para emitir?", "Não há prazo único. Documentação, complexidade e análise da seguradora influenciam a emissão. Informe a data contratual já no primeiro contato, inclusive se o serviço estiver prestes a começar."],
  ["Subcontratados ficam automaticamente protegidos?", "Não. Informe quem executará cada parte do serviço e confira quem consta como segurado, quais responsabilidades estão previstas e se a contratante pede apólice própria de cada empresa."],
  ["A Patro atende empresas fora de Guarulhos?", "Sim. A corretora fica em Guarulhos e atende remotamente em todo o Brasil. Informe qual aeroporto receberá a equipe e onde os serviços serão executados."],
  ["A análise da Patro garante o credenciamento?", "Não. A Patro orienta sobre seguros e consulta o mercado; a seguradora decide sobre a aceitação do risco. Cabe à contratante avaliar os documentos apresentados para o contrato ou credenciamento."],
];
export const hubSchema = {
  "@context": "https://schema.org", "@graph": [
    { "@type": "WebPage", "@id": url, url, name: hubMeta.h1, description: hubMeta.description, inLanguage: "pt-BR", mainEntity: { "@id": `${url}#servico` }, hasPart: { "@id": `${url}#perguntas` } },
    { "@type": "Service", "@id": `${url}#servico`, url, name: "Consultoria de seguros para prestadores de serviços em aeroportos", serviceType: "Corretagem de seguros empresariais", provider: { "@id": ORGANIZATION_SCHEMA["@id"] }, areaServed: { "@type": "Country", name: "Brasil" } },
    { "@type": "FAQPage", "@id": `${url}#perguntas`, url: `${url}#perguntas`, isPartOf: { "@id": url }, inLanguage: "pt-BR", mainEntity: hubFaq.map(([name, text]) => ({ "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } })) },
  ],
};
