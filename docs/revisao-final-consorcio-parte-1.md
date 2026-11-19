# Revisão final de Consórcio — parte 1 de 2

**Situação: alterações preparadas para revisão; não equivale a aprovação para publicação.**

Esta entrega cobre o hub principal, o simulador educativo e o formulário comercial. As modalidades, páginas locais, landing pages, e-book e conexões editoriais serão objeto da parte 2. Não foi feita uma auditoria executada de todo o ecossistema.

## 1. Páginas e componentes revisados

- `/consorcio`: conteúdo visível, H1, metadados, FAQ, dados estruturados, breadcrumb, navegação por âncoras, formulário, confirmação e CTAs.
- Simulador educativo incorporado ao hub: entradas, regras de validação, fórmula, resultados e encaminhamento do cenário ao atendimento.
- Versão estática do hub: mesma fonte de H1 e FAQ, custos, limitações, modalidades e fontes oficiais.
- Fluxo de envio do hub: chamadas existentes para `submitLead` e `send-form-email`, sem modificar os serviços ou o banco.
- Registro da rota conferido em `src/App.tsx`: `/consorcio` renderiza o componente revisado. `/lp/consorcio` também o reutiliza; portanto recebe as mesmas alterações. `/cotacao/consorcio` mantém seu encaminhamento existente.

## 2. Design e conversão

Preservados o azul profundo, as quatro modalidades, o layout responsivo, o logotipo e a hierarquia das chamadas. O H1 agora identifica explicitamente o assunto Consórcio, mantendo a linguagem consultiva.

O formulário ganhou erros vinculados aos campos, indicação de campo inválido, foco no primeiro erro e bloqueio dos campos durante o envio. Nome, telefone, cidade e crédito receberam identificação de formulário. Modalidade e horário aceitam apenas opções previstas. O crédito passa a recusar texto arbitrário, valores negativos, zero e valores acima do limite técnico; aceita o formato brasileiro, inclusive o valor importado do simulador.

A confirmação fica na própria página, anunciada para tecnologias assistivas, com um link explícito para continuar no WhatsApp. O formulário não depende mais da abertura automática de uma janela depois de aguardar respostas da rede. A mensagem do WhatsApp preserva o objetivo e o cenário educativo, quando informado.

## 3. Conteúdo consultivo

Adicionadas respostas diretas sobre definição de consórcio, contemplação, custos, FGTS, pós-contemplação, comparação com financiamento e responsabilidades da Patro, da administradora e do Banco Central. Preservadas as explicações existentes sobre lance embutido, reajustes, documentos e quitação de financiamento.

- Consórcio não é apresentado como gratuito ou investimento com retorno garantido.
- Contemplação e liberação não são tratadas como automáticas nem vinculadas a uma data.
- A comparação não promete economia.
- O Banco Central fiscaliza, mas não garante a operação.
- FGTS exige enquadramento do participante, do imóvel e da operação; não se aplica às outras modalidades.
- As parcelas e obrigações contratuais continuam após a contemplação.

Incluídos links para informações do Banco Central, consulta de instituições e regras habitacionais da CAIXA. Os endereços foram inseridos no conteúdo visível e estático; sua disponibilidade HTTP atual ainda precisa ser verificada. Não foram criados autores, credenciais, avaliações ou datas de revisão. Dados institucionais continuam provenientes da configuração existente.

## 4. SEO, GEO e AEO

### Conferido no código

- H1 principal do hub com assunto explícito.
- Título e descrição revisados no componente e no cadastro central de metadados, retirando a chamada “economize juros”. Não houve alteração da lógica global de metadados.
- Configuração de canonical do hub preservada em `/consorcio`, com breadcrumb visual e estruturado já existentes.
- FAQ estruturada gerada da mesma lista usada nas perguntas visíveis e no conteúdo estático; as novas respostas não são exclusivas dos dados estruturados.
- Identificadores do produto financeiro e da instituição preservados. O juro de financiamento igual a zero continua acompanhado dos custos contratuais no conteúdo e na descrição estruturada.
- As respostas dentro de elementos `details` permanecem no conteúdo renderizado; não dependem de busca remota para aparecer no documento.
- `public/robots.txt` foi lido: os grupos gerais permitem o site e não trazem bloqueio específico ao hub. Isso não comprova indexação.
- Os cartões do hub mantêm links para as quatro modalidades e existe ligação com atendimento local e página institucional.

### Ainda não validado em execução

Status HTTP, cadeias reais de redirecionamento, canonical e robots finais entregues pelo servidor, inclusão efetiva nos sitemaps publicados, indexação, inspeção no Search Console, ausência de todos os links quebrados e páginas órfãs do ecossistema. Tampouco houve validação externa de resultados avançados.

**Nenhuma alteração em canonical global, sitemap, robots.txt, redirects, roteamento, regras de servidor ou configuração de build foi realizada.** A revisão desses itens no ecossistema será consolidada na parte 2. Não há promessa de citação por IA, indexação ou destaque no Google.

## 5. Formulário, WhatsApp, integrações e simulador

### Alterações de comportamento

- Se CRM e e-mail falham, não há confirmação de recebimento nem conversão de sucesso; os campos são mantidos e um contato alternativo é exibido.
- Se pelo menos um dos canais responde sem erro, a solicitação é confirmada e não se incentiva reenvio apenas porque o outro canal falhou. A conclusão não significa entrega comprovada na caixa de entrada nem atendimento comercial efetivo.
- A trava de envio simultâneo e a deduplicação temporária existentes foram preservadas. Não representam garantia de entrega única em todas as situações de falha de rede.
- O cenário deixa de ser anexado quando o visitante altera manualmente crédito ou modalidade, preservando a regra anterior.
- Não houve envio de dados reais, alteração de funções de servidor, inclusão de integração ou mudança no banco.

### Cálculo educativo inspecionado

O consórcio soma crédito, administração, reserva e outros custos e divide pelo prazo. O financiamento usa Price, com tratamento de juros zero e fórmula numericamente estável para juros pequenos; entrada e despesas adicionais entram no total. A interface atual usa o mesmo prazo para os dois exemplos. A formatação monetária arredonda a apresentação para centavos sem arredondar antecipadamente a fórmula; não constitui um cronograma contratual de parcelas.

Mantidas as limitações: valores hipotéticos; não é proposta, CET ou valor presente; não considera reajustes, custo da espera, inflação, lance ou rentabilidade; disponibilidade de prazo e crédito depende do grupo. O resultado pode mostrar o consórcio com total maior, menor ou igual — não força economia. Os limites técnicos do comparador não são faixas comerciais por modalidade.

### Testes preparados, não executados nesta revisão

- `src/pages/Consorcio.test.tsx`: envio com serviços simulados, confirmação sem popup, mensagem específica, descarte de cenário desatualizado, foco/erros, crédito inválido, falha dupla e recebimento parcial.
- `src/data/consorcioHub.test.ts`: metadados, paridade das FAQs, fontes e links no conteúdo estático, identificação institucional, juros zero/quase zero, entrada integral, diferença negativa e entradas inválidas.
- Testes existentes do componente do simulador foram lidos; o teste de navegador existente foi ajustado ao novo H1.

**Resultado dos testes automatizados: indisponível.** Não havia execução de testes, compilação ou navegação disponível nesta revisão. Esses cenários escritos não equivalem a testes aprovados, nem comprovam que o CRM real recebeu uma solicitação.

## 6. Celular, computador, acessibilidade e performance

Conferidos no código: grids responsivos, campos de 48 px, botões com quebra de texto, navegação semântica, controles nativos de seleção de modalidade, labels, avisos de resultado, tabela com rolagem e encaminhamento do simulador com respeito à preferência de movimento reduzido. O cálculo é local e não depende de requisições a cada alteração. Não foram adicionadas imagens, bibliotecas, fontes ou chamadas de rede ao cálculo.

Melhorias implementadas: erros do formulário associados aos campos, foco no primeiro campo inválido e confirmação persistente com anúncio acessível. A paleta existente foi preservada.

**Não medidos:** contraste final em todos os estados/temas, zoom, foco em navegador real, experiência com leitor de tela, sobreposição de barras fixas, teclado completo, overflow, peso das imagens já existentes, LCP/INP/CLS, tempo de carregamento ou pontuação de acessibilidade. O hub não recebeu novas imagens, mas isso não é auditoria dos recursos globais de cabeçalho e rodapé. Não há declaração de conformidade.

## 7. Indicadores: implementação versus evidência

| Indicador | Situação no código | Evidência de execução/dados |
| --- | --- | --- |
| WhatsApp nos CTAs do hub e simulador | Chamadas existentes preservadas; link da confirmação também instrumentado | Sem clique real ou contagem verificada |
| Solicitação de simulação | Chamadas existentes de intenção preservadas | Sem dados consultados |
| Início do formulário | Identificador estável adicionado para o observador genérico já existente | Inicialização global e recepção no analytics precisam de teste |
| Envio confirmado | `trackCotacaoSubmit` somente após ao menos um canal responder sem erro | Testes com serviços simulados preparados, não executados |
| Uso do simulador | Novo evento `consorcio_simulator_interaction` em mudanças do cenário | Depende de `gtag` já carregado; não há envio retroativo nem garantia de cobertura |
| Interesse por modalidade no simulador | O mesmo evento diferencia `modality_select` e a modalidade selecionada | Não mede todos os cartões nem toda a jornada entre páginas |

O evento novo envia apenas modalidade de uma lista fixa, tipo de interação e caminho fixo da página. Não envia nome, telefone, cidade, valor da carta, capacidade de lance ou texto da mensagem. Os eventos existentes continuam com seu mecanismo próprio de atribuição; esta revisão não é uma auditoria de privacidade de todas as ferramentas do site. Nenhum resultado comercial foi inventado e nenhum dado de formulário foi enviado para teste.

## 8. Validação comercial necessária pela Patro

- Confirmar administradoras efetivamente disponíveis e se o atendimento inclui todas as atividades descritas, inclusive consulta de histórico e suporte pós-contemplação.
- Confirmar faixas de crédito, prazos, disponibilidade nacional, elegibilidade de bens e serviços e condições específicas de FGTS com a administradora.
- Revisar o texto de responsabilidades, custos, garantias, reajustes e documentação antes da aprovação comercial.
- Aprovar o novo passo explícito “Continuar pelo WhatsApp” após o envio.
- Validar a regra de sucesso quando apenas CRM ou e-mail confirma e definir como acompanhar falhas parciais operacionalmente.
- Confirmar dados institucionais e a atualidade das avaliações já exibidas, sem presumir que esta revisão as mediu.

## 9. Pendências e acompanhamento

Antes de aprovar a publicação:

1. Executar build e testes do projeto, inclusive metadados, paridade estática, testes do formulário e testes de navegador.
2. Conferir o preview em 360/390 px e 1280/1440 px, com teclado, zoom de 200%, preferência de movimento reduzido e leitor de tela.
3. Fazer um envio autorizado identificado como teste, sem documentos sensíveis; confirmar CRM, caixa de e-mail, modalidade e cenário recebidos; retirar dados de teste conforme a rotina interna.
4. Testar falha de rede, resposta lenta, duplo clique, CRM indisponível, e-mail indisponível e retorno ao formulário sem reenvio acidental.
5. Abrir o WhatsApp em celular e desktop para cada CTA do hub e para as quatro modalidades do simulador. Confirmar número oficial, acentos, quebra de mensagem e retorno à página.
6. Verificar no ambiente de depuração do analytics os nomes dos eventos e a ausência de dados pessoais; respeitar a configuração de consentimento do site.
7. Concluir a parte 2 para modalidades, páginas locais, conteúdo editorial, links órfãos, sitemaps e redirecionamentos antes de chamar esta revisão de completa.

Após aprovação e publicação: conferir respostas HTTP e canonical do HTML entregue, inspecionar URLs e sitemaps no Search Console, validar dados estruturados renderizados, medir performance e estabilidade em dispositivos reais e acompanhar solicitações recebidas versus eventos, separando clique de contato de atendimento efetivo. Alterações no repositório sincronizam com o Lovable; nenhum comando de publicação foi executado por esta revisão, e o fluxo de publicação automática do projeto deve ser conferido pela Patro.
