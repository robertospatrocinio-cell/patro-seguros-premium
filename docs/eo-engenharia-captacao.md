# Etapa 3 — atendimento empresarial de E&O aeroportuário

**Rota:** `/seguro-eo-engenharia-aeroportos`. O CTA principal leva ao formulário na própria página. Os atalhos de WhatsApp usam o número e a mensagem específicos desta campanha; nenhum clique no WhatsApp equivale a lead registrado. O guia técnico e a fotografia foram mantidos.

## Operação comercial

- Primeiro contato: os quatro dados de identificação e retorno são obrigatórios. Os requisitos do projeto e o PDF são opcionais. Nenhuma ficha parcial é salva durante a digitação.
- Canal do formulário: `submit-lead`, com entrada multipart específica para E&O. O fluxo JSON anterior continua separado. O retorno de sucesso específico só ocorre após gravação. A mesma tentativa reutiliza o identificador durante a sessão do formulário para evitar outra ficha em caso de perda da resposta.
- O registro vai para `leads`, sem nova tabela: empresa, responsável pelo contato (diferente do vendedor atribuído), telefone, e-mail, produto, origem site, página, UTMs disponíveis e data do banco. Segmento, canal, situação, prazo, serviço e aeroporto seguem na ficha. Em **CRM → lista de leads → Triagem**, a equipe pode consultar os detalhes e baixar a cláusula usando sua sessão administrativa.
- Prioridade indicativa: alta para contrato aprovado, exigência identificada, prazo de hoje até 14 dias ou cláusula anexada. Média para negociação, exigência em definição, concorrência, pedido de contratação, renovação ou adequação. Sem esses sinais, desenvolvimento. Não há descarte automático. Os 14 dias são uma convenção operacional desta implementação.
- Segurança: o servidor limita o corpo antes de interpretar o multipart; verifica tipo declarado, extensão, início/fim de PDF e tamanho (2 MiB), além de validar os campos. O anexo recebe caminho aleatório no bucket privado; não se grava URL pública. Falha no insert aciona tentativa de remoção do anexo. Isso não é varredura antivírus; tratar anexos como documentos externos. Aplicam-se o limitador existente da função e o do banco. O consentimento se restringe à análise e retorno, não a campanhas de marketing.

## Analytics

Eventos `eo_engenharia_`: `page_view`, `whatsapp_click`, `phone_click`, `form_start`, `form_step_complete`, `form_submit`, `contract_upload` e `quote_request`. O aceite de analytics é independente do contato comercial. Um único despachante por evento, sem valores dos campos, UTMs, ID do lead, nome ou conteúdo do arquivo. Etapas contam uma vez por formulário. `contract_upload` exige confirmação do envio com arquivo. **Usar apenas `eo_engenharia_quote_request` como evento principal de conversão**, não somar envio, anexo ou clique ao total de leads.

## Evidências e homologação pendente

**Verificado nesta entrega:** leitura do banco ativo confirmou a estrutura de `leads`, criação de data no banco, validações de contato, rate limiting, proteção das linhas e bucket `crm_documents` privado, com acesso administrativo aos objetos. Não foram consultados contatos reais, enviados e-mails ou inseridos dados de teste no CRM.

**Preparado, não executado neste ambiente:** Playwright em 360, 768 e 1440 px com dados fictícios e função simulada; cobre navegação, obrigatórios, telefone inválido, campos opcionais vazios, PDF recusado, envio com/sem anexo, erro e nova tentativa. Vitest cobre os oito nomes de eventos, recusa de consentimento e despacho único. Testes simulados não comprovam funcionamento da função publicada nem entrega ao GA4.

**Antes de divulgar:** compilar e executar as suítes no projeto; publicar a atualização de `submit-lead` pelo Lovable. Em homologação, enviar uma ficha sintética com PDF inofensivo e outra sem arquivo. Conferir empresa, contato, campanha, horário, score e anexo na lista administrativa; verificar recusa de acesso ao objeto sem sessão e com conta não administrativa, erro de formato/tamanho, limite de frequência e recuperação de falha. Conferir o número e a mensagem em aparelho móvel. Validar consentimento e eventos no DebugView/GTM, excluir captura automática de campos e marcar apenas o evento principal na propriedade GA4. Não há nesta entrega confirmação de publicação, visualização em dispositivo real, recebimento de eventos externos ou política comercial de retenção dos anexos; esta última deve ser definida pela equipe responsável. A etapa 4 não foi iniciada.
