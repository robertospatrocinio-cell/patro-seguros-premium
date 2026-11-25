# Captação aeroportuária — etapa 5, parte 2

## Fluxo e acesso

- No hub, a triagem tem dez perguntas opcionais. As respostas ficam na página até o visitante escolher incluí-las no pedido. O resumo sugere modalidades para avaliação humana; não confirma cobertura, aceitação ou conformidade contratual.
- O `submit-lead` recebe a solicitação no CRM existente. A origem e a página de conversão são definidas no servidor; as cinco UTMs passam por validação de formato. A categoria Riscos Aeroportuários reúne os pedidos do hub; o fluxo legado de E&O mantém seu tipo para não interromper filtros e relatórios, e registra a categoria no detalhe. A prioridade usa os sinais disponíveis; dados contratuais ausentes não impedem o envio.
- O PDF é opcional e passa por validação de tipo, extensão, tamanho e marcadores de formato. Isso não equivale a uma varredura antimalware. O bucket `crm_documents` foi confirmado como privado no banco ativo, com acesso de administradores. O CRM usa a sessão autenticada para download e não expõe uma URL pública. O formulário recomenda enviar somente a cláusula necessária, sem dados de terceiros.
- Os links da captação apontam para o WhatsApp oficial da Patro. O texto de abertura não inclui as respostas nem o arquivo. A auditoria de números no restante do site pertence à última parte.

## Medição

- `airport_hub_view` e `airport_article_view`: aberturas das páginas do inventário instrumentado; `airport_internal_link_click`: cliques para destinos relacionados conhecidos; `airport_whatsapp_click`: clique no link do número oficial.
- `airport_needs_assessment_start` e `airport_needs_assessment_complete`: primeira interação e primeira geração do resumo na visita. `airport_form_start`: primeira interação com o formulário. `airport_form_submit` e `airport_quote_request`: solicitação confirmada pelo servidor. `airport_contract_upload`: confirmação de que o anexo foi registrado.
- Os eventos desta vertical exigem consentimento de analytics e aceitam somente páginas, destinos e modalidades predefinidos. Não carregam respostas, contatos, parâmetros de URL, metadados de arquivos ou identificadores do CRM. Para acompanhar a vertical, use a família `airport_*`; não some os eventos legados de E&O para os mesmos marcos, nem trate envio do formulário e pedido de cotação como dois leads.

## Validação disponível

- Conferidos no banco ativo: colunas usadas de `leads`, permissões de acesso e privacidade do bucket. Nenhuma migração necessária.
- A suíte Playwright inclui navegação responsiva, passagem das respostas para o formulário, consentimento, anexo simulado, WhatsApp e ausência de dados digitados nos eventos da vertical. Build, lint, checagem de tipos e testes não foram executados neste ambiente. Após a implantação da função no Lovable, validar um envio controlado e o download como administrador, além da recepção dos eventos na ferramenta de analytics.
