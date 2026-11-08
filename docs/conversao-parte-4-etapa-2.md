# Parte 4 — etapa 2/3: CRM e indicadores comerciais

## Entrega e onde acessar

Painel com dados reais em **CRM → Desempenho**, acima do relatório anual existente, e em **/admin/conversoes**. Ambas as rotas já estão protegidas por RequireAdmin; o painel reutiliza o cliente e as permissões existentes. Não foram criadas tabelas, serviços pagos, chaves, automações ou novas permissões.

Direção visual: componentes, fonte e cores do CRM preservados; prioridade para números legíveis, tabelas por origem e explicações de disponibilidade. Seletor nativo acessível de período, atualização manual, leitura em telas estreitas com tabela rolável, estados separados de carregamento, vazio e falha. Não houve avaliação visual em navegador nesta sessão.

## Arquitetura e auditoria verificadas

- `submitLead` → `safeInvoke` → função `submit-lead` → `leads`. Essa função valida origem, token, nome/contato e limite por IP. Mantidos todos esses mecanismos e o segredo de serviço somente no servidor. Compatibilidade de captação anônima desse caminho ainda precisa teste em ambiente controlado; não se enfraqueceu autenticação por suposição.
- `send-form-email`: SMTP confirmado antes da tentativa opcional de inserir lead. Uma resposta `success: true` confirma o caminho de e-mail, mas o CRM pode ter falhado (`leadId: null`). Essa semântica foi preservada, sem transformar falha de CRM em falha de e-mail nem criar repetição automática de pedidos.
- `InsuranceQuoteForm` usa os dois destinos em paralelo, sem `lead` no pedido de e-mail. Não foi adicionado um segundo insert nesse fluxo. Outros formulários que já enviam `lead` pelo e-mail passam a receber atribuição pelo helper compartilhado.
- `leads` já possui origem, página, modalidade, horário, status, UTMs e etapa do Kanban. Não é necessário adicionar colunas para essa atribuição.
- O Pipeline atual altera `kanban_stage_id`, mas não `lead_status`. Por isso o painel prioriza a etapa referenciada; não usa um status antigo para sobrescrever a etapa real.
- `insurance_sales` contém produção agregada por seguradora/modalidade/data/valor, sem vínculo com lead; o relatório anual existente foi mantido. `policies` se liga a cliente, não a lead, e contém prêmio/comissão, não comprovação de receita recebida do site.
- `lead_quote_history` guarda alterações de rascunho de formulário; não é histórico de propostas comerciais. Não foi reinterpretado como propostas emitidas.

### Evidência do banco, somente leitura

Consultados `information_schema.columns`, defaults/constraints e `pg_policies`. Confirmado controle de acesso ativo em leads, kanban_stages, conversion_click_events e policies, com leitura/gestão administrativa existente; preservada a inserção pública dos dois tipos legados de clique e o caminho de serviço dos leads. Nenhuma permissão foi aberta ou alterada.

Na consulta desta sessão havia um lead com status “Perdido”; nenhum lead tinha campanha ou página de entrada preenchida nos campos consultados e nenhuma apólice tinha número preenchido. São observações pontuais, não métricas de um período nem resultados de teste. Não foram consultados ou exportados nomes, telefones, e-mails ou documentos para a auditoria. Nenhum dado real foi inserido ou atualizado.

## Atribuição implementada

- `submitLead`: envia origem/mídia/campanha disponíveis na atribuição da sessão, página atual de envio e página de entrada minimizada. Mantém os dados do formulário e os contratos dos destinos.
- `safeInvoke`: enriquece apenas pedidos de `send-form-email` que **já contêm lead**; os outros pedidos não passam a gerar registros adicionais.
- Página de entrada separada da página de envio em `raw_data.attribution`; UTMs permanecem também nas colunas existentes para listagens/consultas futuras. Sem alteração do tipo gerado do banco, porque não há nova coluna.
- Funções `submit-lead` e `send-form-email` fazem validação adicional de campanha e minimizam a entrada antes da persistência. Não usam atribuição como autorização ou prova de identidade.
- Metadados novos de atribuição não carregam query string ou fragmento; referência de entrada reduzida a domínio/origem. Identificadores de campanha aceitam somente caracteres limitados e recusam e-mail, URLs e longas sequências numéricas. Isso reduz exposição; não garante identificar toda informação pessoal possível em nomes livres de campanha. Nunca colocar dados pessoais em campanhas ou caminhos.
- `tracking.ts` deixa de persistir/enviar query string da entrada e caminho completo do referrer. Atribuição já salva é normalizada no próximo uso. Não há limpeza retroativa de dados históricos no banco.
- Preserva-se a atribuição disponível na sessão atual. Isso não é atribuição entre dispositivos, entre sessões ou multitoque. Sem UTM/entrada, mostra-se “não informada”, nunca “direto” por inferência.

## Dicionário do painel

| Indicador | Fonte e regra | Limitação explícita |
| --- | --- | --- |
| Leads registrados | Linhas de leads criadas na janela | Não é pessoa única; envios sem persistência no CRM não entram |
| Cliques WhatsApp / cotação | conversion_click_events por created_at e tipo legado | Intenção registrada; não prova conversa, cotação enviada ou visitante único |
| Apólices cadastradas | policies criadas na janela, com número não vazio | Todos os canais; data de cadastro não é data comprovada de emissão; não se atribui ao site |
| Proposta / ganho no Pipeline | Etapa atual dos leads criados na janela | Fotografia de coorte, não quantidade histórica emitida/fechada na janela |
| Origem, mídia, campanha | UTMs nas colunas e fallback da atribuição | Autodeclarados na URL; cobertura histórica incompleta |
| Modalidade e fonte | insurance_type e source_origin existentes | Cadastro faltante aparece como não informado |
| Entrada | raw_data.attribution.landing_page, com fallback legado | Não se substitui pela página de envio quando desconhecida |
| Captação por página | Leads por source_page; cliques por page_path | Sem vínculo individual; não calcular conversão dividindo esses totais |
| Cobertura de analytics | Cliques cujo analytics_loaded era falso | Sinal técnico local, não taxa de consentimento ou volume total do GA4 |

Janelas móveis de 7, 30, 60 e 90 dias; limites capturados uma vez por consulta, início inclusivo e fim exclusivo. O período consultado aparece na tela no fuso do dispositivo. Leads por canal são contagens, não retorno financeiro nem custo de aquisição. Não há crescimento percentual artificial com base zero.

Consultas paginadas em blocos de 500, ordenadas por ID e limitadas à mesma janela. Até 20 mil registros por fonte; acima disso o painel pede período menor, sem apresentar totais parciais. Qualquer falha de fonte oculta o conjunto de indicadores, inclusive cache antigo após erro, em vez de transformar erro em zero. A janela limita novos registros, mas não congela edições/exclusões concorrentes; não é um fechamento contábil.

As consultas selecionam metadados comerciais; não baixam nomes, contato, CPF, endereço, IP, respostas completas do formulário ou notas. Apenas a atribuição e a entrada são projetadas do JSON. O componente compartilhado usa cache por período por um minuto, sem polling permanente adicional.

## Métricas indisponíveis, sem simulação

1. Visitantes orgânicos e conversão por visita: sem integração de sessões/usuários GA4. Cliques do Search Console não substituem visitantes.
2. Leads qualificados: falta definição e registro confiável de qualificação; contato realizado não é qualificação.
3. Propostas realmente emitidas e apólices fechadas atribuídas ao site: falta vínculo confiável lead → proposta → apólice e histórico de transições. Não se cruzam nomes, e-mails ou telefones por aproximação.
4. Receita atribuível e desempenho financeiro por canal: prêmio/comissão prevista/recebimento são conceitos diferentes e não estão vinculados à atribuição do lead.
5. Conversas e solicitações efetivamente recebidas por WhatsApp: cliques não são confirmação de mensagem.

Não é seguro construir agora um funil financeiro apenas com as tabelas atuais. O painel deixa as ausências explícitas, em vez de inventar uma integração ou alterar retroativamente cadastros reais.

## Arquivos desta etapa

- `src/components/crm/CommercialDashboard.tsx`: painel compartilhado.
- `src/pages/ConversionDashboard.tsx`: substitui contagem limitada de cliques pelo painel comercial.
- `src/pages/CRM.tsx`: inclui painel em Desempenho, preservando relatório anual.
- `src/hooks/queries/useCommercialMetrics.ts`: consultas mínimas, janela, paginação e erros.
- `src/lib/commercialMetrics.ts`: regras puras de agrupamento/contagem.
- `src/lib/leadAttribution.ts`: metadados minimizados de atribuição.
- `src/lib/leadsApi.ts`, `src/lib/supabase-helpers.ts`, `src/lib/tracking.ts`: propagação de atribuição nos caminhos existentes e minimização de URLs.
- `supabase/functions/submit-lead/index.ts`, `supabase/functions/send-form-email/index.ts`: persistência/validação de metadados no servidor.
- `src/lib/__tests__/commercial-metrics.test.ts`, `src/components/crm/CommercialDashboard.test.tsx`: testes com dados isolados e chamadas simuladas.
- Este documento.

## Testes e resultados desta sessão

**Verificado por leitura e consultas reais somente SELECT:** estrutura de tabelas, defaults/constraints consultados, regras de acesso existentes, rotas administrativas existentes e comportamento atual de escrita das etapas do Pipeline. Nenhuma modificação de banco ou envio de formulário real foi realizado.

**Testes automatizados adicionados, NÃO EXECUTADOS:** separação clique/lead/apólice, prioridade da etapa do Pipeline, ausência de atribuição sem inferir direto, intervalo semiaberto, base vazia, entrada versus envio, campanha e sanitização, envio único pelo helper com atribuição, atribuição corrompida, paginação além de uma página, limite de volume, falha sem zero e estados de interface vazio/carregando/erro. Fixtures existem apenas em testes e não entram no painel.

Não há terminal ou navegador nesta sessão. Build, TypeScript, Vitest, testes autenticados de leitura e testes de funções no Lovable precisam execução; não foram declarados aprovados. Também não se comprovaram recebimento de e-mail, persistência produtiva por visitantes anônimos ou instalação/publicação das funções.

## Publicação e ações externas

- O frontend sincroniza pelo Lovable; as alterações nas duas funções precisam ser publicadas pelo Lovable. Antes disso, os novos metadados podem chegar ao servidor sem serem persistidos integralmente; o painel continua exibindo os registros existentes.
- Conferir em ambiente de teste, com chamadas de e-mail/CRM interceptadas: atribuição → envio confirmado → leitura administrativa, falhas independentes de CRM/e-mail e não duplicação no formulário com destinos paralelos.
- Rodar os testes desta etapa e os de eventos existentes, typecheck/build com configuração que não submeta sitemaps nem envie comunicações reais e testes responsivos autenticados. A validação consolidada pertence à etapa 3.
- Para qualificação, vínculo de propostas/apólices e receita, acordar critérios comerciais e responsabilidades antes de propor novas colunas ou automações. Não foram criadas dependências pagas nem solicitadas credenciais privilegiadas no navegador.
- Definir base legal, retenção e tratamento de metadados/rascunhos com o responsável pela LGPD. Esta entrega não é certificação jurídica de conformidade.

## Limite desta entrega

Conclui a implementação de CRM/indicadores da etapa 2, com limitações documentadas. Não inicia a auditoria consolidada, os testes finais das quatro partes ou o plano completo de 30/60/90 dias da etapa 3. O painel não deve ser anunciado como atribuição de receita ou validação completa de produção.
