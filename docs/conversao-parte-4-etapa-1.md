# Parte 4 — etapa 1/3: captação, WhatsApp e eventos

## Resumo executivo e limites

Implementadas correções nos formulários compartilhados de cotação e na mensuração existente, sem novas dependências, serviços pagos, tabelas ou mudanças de permissões. Esta etapa NÃO encerra a Parte 4 nem comprova o funcionamento em produção. CRM/painel e validação consolidada ficam nas etapas 2 e 3.

A revisão foi feita pelo código e por consulta somente de leitura às permissões do banco. Não havia execução de terminal, navegador, acesso ao GA4 ou ao painel do Google Maps nesta sessão. Build, Vitest, Playwright, responsividade real, entrega de e-mail, recebimento de mensagens e configuração externa não foram executados/verificados. Não foram inseridos leads nem alterados dados reais para testar.

## Correções implementadas

- InsuranceQuoteForm: removidos os eventos de lead anteriores ao retorno do servidor e o segundo disparo direto de GA4/Meta. Agora o evento de envio fica após a confirmação de sucesso do e-mail.
- QuickQuoteForm: mesma correção de momento do evento; bloqueio adicional de envio enquanto processa ou depois de concluído.
- InsuranceQuoteForm, QuickQuoteForm e ProductQuoteForm: URLs de continuidade no WhatsApp passam a conter apenas modalidade/contexto comercial, sem nome, telefone, mensagem livre ou respostas dos campos. O conteúdo detalhado continua no envio ao servidor existente.
- Preservados número de WhatsApp, destinatários de e-mail, validações, etapas e integrações existentes. Não foram removidos campos necessários sem comprovar os contratos de cada destino.
- tracking.ts: GA4 usa click_whatsapp e click_quote, sem emitir simultaneamente os aliases antigos. O banco continua usando whatsapp_click/cotacao_click, preservando painéis e permissões atuais.
- trackCotacaoSubmit emite form_submit_success e generate_lead; somente deve ser chamado depois de confirmação. Isso não comprova qualificação, proposta ou venda.
- Observador único de início de formulário: form_start uma vez por instância ao editar campos; não coleta valores. Links tel: geram click_phone sem número nem texto do link. Rotas /admin, /crm e /login são excluídas.
- Banner: a recusa passa a ser persistida, em vez de simplesmente fechar o aviso.
- Carregamento de analytics: o helper passa a usar a API de ativação existente; o carregador confere consentimento novamente e informa corretamente __analyticsLoaded.

## Inventário localizado no código

O inventário abaixo é de famílias de componentes, não de cada ocorrência renderizada. Formulários compartilhados aparecem em várias modalidades. A busca também encontra wrappers de campos que não são formulários HTML, e componentes que podem não estar ativos em uma rota. A auditoria exaustiva de cada ocorrência permanece pendente.

| Família / local | Evidência e situação |
| --- | --- |
| ProductQuoteForm | Lido: nome e WhatsApp obrigatórios, e-mail e detalhes opcionais; consentimento obrigatório, foco no erro, fieldset desabilitado, bloqueio por referência, confirmação do servidor, erro preserva dados. Envia send-form-email com lead. |
| InsuranceQuoteForm | Trecho de envio lido: etapas, checklist/consentimento, CRM e e-mail em paralelo; e-mail é o critério atual de sucesso. CRM pode falhar apesar de e-mail confirmado. Mantidos os destinos e dados em caso de falha. |
| QuickQuoteForm | Lido: nome e telefone validados por etapa, e-mail validado quando preenchido; envio por send-form-email, rascunho local e parcial na nuvem. Consentimento específico, retenção e comportamento de restauração precisam revisão completa. |
| QuickLeadForm / Cotação Express | Lido: schema expressLeadSchema, nome/telefone/e-mail/cidade/modalidade; send-form-email com lead; bloqueio por referência; limpa somente após sucesso; ferramenta WebMCP apenas prepara para revisão humana. |
| LpEnterpriseForm | Localizado formulário e uso de submitLead; revisão completa de validação, privacidade e retorno pendente. |
| PatroPrivateForm | Localizado formulário e uso de submitLead; revisão completa pendente. |
| AppPassageirosPage | Formulário localizado; revisão completa pendente. |
| ExitIntentPopup e LeadMagnetSection | Formulários e eventos diretos generate_lead localizados; momento da confirmação e necessidade de popup ainda não validados. Nenhum popup novo foi criado. |
| Contato | Formulário localizado com noValidate, nome acessível e aria-busy; validação completa do fluxo de envio pendente. |
| Cotacao e FormularioSeguroVida | Formulários próprios localizados; revisar schema, destino e confirmação sem disparar pedidos reais. |
| Consorcio | Formulário próprio, submitLead e trackCotacaoSubmit localizados; validação integral pendente. |
| EbookConsorcio e MaterialDetalhe | Captação própria localizada; validar se download é contato ou lead comercial confirmado. |
| IndiqueAmigo e IndiqueEGanhe | Fluxos de indicação localizados; revisar consentimento e dados de terceiros separadamente de cotação. |
| LpMaquinasEquipamentos e LpTransportes360 | Formulários próprios localizados; revisar uso do hook useInsuranceForm e destinos. |
| HubEmpresarial, HubPatrimonio, HubRC, HubVeiculos e HubVidaSaude | Ocorrências da busca incluem componentes de formulário; mapear famílias efetivamente renderizadas por rota. |
| NichoMotoristasApp e NotFound | Ocorrências localizadas; confirmar se formulário é comercial, filtro ou busca antes de classificar conversão. |
| AdminLogin, ClaimsModule e telas CRM | Operações internas, não leads comerciais; não incluir em auditoria de captação pública. |

## Arquitetura e segurança verificadas

- submitLead chama a função submit-lead via safeInvoke; não utiliza chave privilegiada no frontend.
- submit-lead: verifica origem, token, limite de cinco requisições por cinco minutos e nome/e-mail/telefone antes de inserir leads. O caminho de autorização difere de send-form-email; compatibilidade de visitantes anônimos precisa teste controlado, sem enfraquecer autenticação por suposição.
- send-form-email: origens permitidas, chave pública/token, limite por IP, limite de tamanho, HTML escapado no servidor, SMTP com TLS; segredo de serviço somente no servidor. A chave pública e a origem NÃO identificam uma pessoa e não substituem proteção antispam robusta.
- O trecho lido confirma envio SMTP, mas não constitui prova de entrega na caixa de entrada nem de persistência no CRM. Não foi alterada a função produtiva.
- Consulta pg_policies: leads, contacts e insurance_sales têm acesso administrativo condicionado a has_role; leads/partial_quotes têm escrita via serviço; conversion_click_events permite somente inserção pública dos dois tipos legados e leitura administrativa. Nenhuma permissão foi alterada.
- safeInvoke já evita enviar valores do formulário ao monitoramento de erros (envia apenas nomes das chaves).
- Nenhuma avaliação jurídica de conformidade LGPD foi concluída. Revisar base legal, texto de consentimento, retenção, exclusão, rascunhos e tratamento de dados de saúde/documentos antes de declarar conformidade.

## Mensuração existente e contrato de eventos

GA4 G-YM02VJN0LZ e Meta Pixel 2108358063295698 são carregados no index.html após aceite. O endereço googletagmanager.com/gtag/js é a biblioteca do GA4: não comprova a presença de contêiner GTM. Scripts/funções de Search Console existem no projeto, mas acesso e credenciais não foram validados aqui.

| Evento | Significado | Não significa |
| --- | --- | --- |
| form_start | Primeira edição de formulário público por instância | Envio, pessoa identificada ou lead |
| form_submit_success | Destino confirmou operação no helper de cotação | Garantia de CRM/entrega na caixa de entrada |
| generate_lead | Solicitação confirmada nos fluxos corrigidos | Lead qualificado, proposta ou apólice |
| click_whatsapp | Clique informado pelos chamadores existentes | Conversa iniciada ou mensagem recebida |
| click_phone | Clique em link tel: | Ligação atendida |
| click_quote | Clique informado pelos chamadores existentes | Cotação preenchida ou proposta |

Não se somam form_submit_success e generate_lead como dois leads. Não se soma clique em WhatsApp com solicitação confirmada como dois clientes. O observador não cobre automaticamente WhatsApp em window.open nem links sem o helper; cobertura exaustiva fica pendente.

A mudança de nomes GA4 exige revisar relatórios/conversões que usavam whatsapp_click e cotacao_click; o histórico permanece com os nomes antigos. No GA4, desativar a coleta automática de interações com formulários para não duplicar form_start/form_submit com a instrumentação explícita. Essa configuração é externa e NÃO foi feita. A escolha de eventos principais, testes em DebugView e eventual GTM também dependem de acesso ao painel.

## Testes adicionados e resultados reais desta sessão

Arquivo src/lib/__tests__/commercial-events.test.ts: início único por formulário, exclusão de CRM, telefone sem número, nomes canônicos, sucesso/lead por chamada confirmada, recusa sem ativação e verificações estáticas da ordem de confirmação dos dois formulários corrigidos.

Status: testes escritos, NÃO EXECUTADOS. As verificações estáticas não substituem teste de envio real nem testes completos dos componentes. Testes existentes de validação de QuickQuoteForm/InsuranceQuoteForm foram lidos; não foram executados ou declarados aprovados.

Para a validação de execução: rodar Vitest direcionado e suíte geral, build com seus validadores SEO existentes e Playwright em desktop/mobile. Em ambiente de teste, interceptar respostas de send-form-email/submit-lead e cobrir sucesso, falha, resposta sem success, offline e duplo clique. Bloquear tráfego real de e-mail/CRM e analytics nos testes. O build existente inclui ações de sitemap e deve ser executado com configuração segura para não submeter URLs involuntariamente.

## Pendências prioritárias antes do encerramento

1. Auditar o restante dos formulários e todos os links/janelas WhatsApp; revisar especialmente mensagens construídas a partir de campos pessoais nos fluxos não corrigidos.
2. Validar form_start em seletores customizados, navegação SPA e consentimento dado depois da interação. Formulários sem rótulo usam identificador genérico; adicionar identificadores estáveis por família na continuidade.
3. Revisar captura de atribuição: o código existente guarda query string de entrada e referrer; podem conter informação pessoal. Não colocar dados pessoais em campanhas/URLs. Projetar minimização sem quebrar atribuição existente na etapa de CRM.
4. Revisar rascunhos locais/nuvem, consentimento para recuperação e prazo de expiração. Não habilitar automação adicional sem base legal.
5. Verificar duplicidade automática no GA4 e eventos diretos remanescentes em materiais e páginas próprias; não declarar cobertura global com base apenas no helper.
6. Validar comportamento mobile/desktop, bloqueio de janela após operação assíncrona e alternativa de WhatsApp clicável. Clique não prova funcionamento do aplicativo.
7. Validar a persistência real no CRM separadamente do e-mail e a distinção entre confirmação comercial e falha parcial, sem alterar dados produtivos em testes.

## Arquivos alterados nesta etapa

src/components/InsuranceQuoteForm.tsx; src/components/QuickQuoteForm.tsx; src/components/ProductQuoteForm.tsx; src/components/CookieBanner.tsx; src/lib/tracking.ts; src/main.tsx; index.html; src/lib/__tests__/commercial-events.test.ts; este documento.

## Continuidade

Etapa 2: atribuição/CRM e indicadores com dados reais e indisponibilidades explícitas. Etapa 3: regressões e auditoria consolidada das quatro partes, com plano de 30/60/90 dias. Esta entrega não deve ser rotulada como validação completa nem como conformidade LGPD certificada.
