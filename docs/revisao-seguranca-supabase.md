# Revisão de segurança do Supabase

## Escopo e verificação

Revisão baseada nas regras e permissões consultadas no banco ativo, no cliente do navegador, nas páginas administrativas e nas funções de servidor examinadas. Não representa certificação de segurança de todo o projeto.

Não foram apagados dados, tabelas ou arquivos. As regras dos formulários públicos de cotação, indicação e registro de cliques foram preservadas.

## Correções aplicadas

- **CRM, relatórios e documentos:** restaurada a permissão de execução de `has_role` para usuários autenticados. As regras existentes dependem dessa função para reconhecer administradores. A permissão estava ausente no banco consultado; as condições de administrador continuam em vigor. Não foi concedido acesso geral às tabelas.
- **Histórico de sitemaps:** leitura limitada a administradores. Antes, qualquer conta autenticada podia consultar esse histórico interno. Não foi encontrado uso desse histórico nas páginas públicas.
- **Monitoramento SEO, alertas de âncoras e verificação de domínio:** quatro funções de servidor passam a verificar a sessão junto ao serviço de autenticação e consultar o papel de administrador no banco antes de usar acesso privilegiado. Um token de visitante ou de usuário comum não basta. Chamadas internas com a chave do servidor continuam permitidas.
- **Tarefas agendadas:** os dois agendamentos existentes que chamam as funções alteradas foram atualizados para obter a credencial interna do cofre, sem copiá-la para código do navegador. Permanecem ativos.
- **Páginas administrativas:** a proteção de entrada valida a sessão no servidor, verifica especificamente o papel de administrador e invalida respostas pendentes ao sair ou mudar de conta. Chamadas ao Supabase foram retiradas do callback síncrono de autenticação. A proteção efetiva dos dados continua sendo responsabilidade do banco e do servidor, não apenas dessa tela.

## Checklist percorrido

| Item | Resultado observado |
| --- | --- |
| Tabelas sem proteção por linha | As 44 tabelas de `public` consultadas têm proteção ativada. |
| Acesso a dados de outro usuário | CRM usa acesso compartilhado restrito a administradores; preservado. Notificações têm condição de proprietário tanto na leitura quanto na alteração. Histórico interno de sitemaps foi restringido. |
| Autorizações por dados editáveis pelo usuário | Não foram encontradas regras do banco baseadas em `user_metadata`. As novas verificações usam `user_roles`, não dados enviados pelo navegador. |
| Chaves privilegiadas no navegador | O cliente e as variáveis examinadas usam a chave pública/anon do Supabase, não a chave privilegiada de servidor. A chave de Maps é uma chave de navegador e precisa de restrições no provedor. |
| Views que contornam as regras | Não foram encontradas views em `public`. |
| Funções privilegiadas | Funções de relatórios examinadas verificam administrador. A função auxiliar de papéis foi preservada porque é usada pelas regras de acesso. Quatro funções HTTP administrativas receberam verificação explícita. |
| Arquivos enviados | `crm_documents` está privado e a regra de arquivos exige administrador para leitura e gravação, inclusive substituição. Não foram ampliadas essas permissões. |

## Confirmação após a mudança no banco

Uma segunda consulta confirmou:

- `authenticated` consegue executar `has_role`; `anon` continua sem essa permissão.
- A regra de leitura de `sitemap_history` exige administrador.
- Os dois agendamentos continuam ativos e obtêm a autorização no cofre.

**Limite encontrado:** a tentativa de retirar acesso público às funções SQL `http*` não alterou as permissões reais. Uma consulta posterior confirmou 13 assinaturas ainda executáveis por visitantes ou contas comuns. Elas pertencem a `supabase_admin`, e a conexão disponível usa `postgres`, sem participação nesse papel. Portanto, essa parte NÃO está corrigida e precisa de intervenção da administração da plataforma. Essas funções permitem solicitações de rede a partir do servidor; não são usadas pelo frontend examinado. Não foram movidas ou apagadas para evitar interromper rotinas internas.

## O que depende do Lovable ou do responsável

1. Publicar as funções de servidor alteradas no Lovable: `detect-anchor-alerts`, `snapshot-anchor-history`, `seo-audit-crawler` e `domain-drift-check`, com o arquivo compartilhado de autenticação. A edição no repositório, sozinha, não comprova que o servidor ativo já usa a nova versão.
2. Após a publicação, conferir os botões de atualização no Monitor SEO, Alertas de Âncoras e Verificação de Domínio com uma conta administrativa; confirmar que visitante e conta comum recebem recusa. Não foi possível executar testes HTTP ou de navegador por aqui.
3. Solicitar à administração do Lovable Cloud a retirada do acesso público às funções SQL de rede pertencentes à plataforma, preservando as rotinas internas que dependem delas.
4. No provedor de Maps, restringir a chave de navegador aos domínios autorizados e às APIs necessárias. Removê-la do código não seria uma proteção suficiente e poderia quebrar o mapa.

## Etapa 3 — revisão complementar de segurança

Esta seção registra a rodada atual; as correções e confirmações acima são o histórico da revisão anterior, não novas alterações desta etapa.

### Alterações desta etapa

- **Logs de Purga do Cache (`/admin/purge-logs`):** removido o campo que solicitava o segredo do servidor. A consulta dos últimos 50 registros usa o cliente Supabase existente e as permissões de administrador já presentes no banco. As ações enviam a sessão da conta conectada; o servidor valida essa sessão junto ao serviço de autenticação e consulta o papel de administrador antes de acessar o Cloudflare.
- **Automação de cache:** mantido `PURGE_SECRET` exclusivamente como alternativa para integrações de servidor existentes. O endpoint também aceita a credencial interna de serviço. Não são aceitos tokens públicos ou contas comuns como administradores. `verify_jwt = false` neste endpoint permite a credencial de automação, que não é JWT; não dispensa a verificação explícita dentro da função. Publicar configuração e função juntas.
- **Limpeza de cache:** adicionada validação de formato, limite de 300 URLs e 30 tags, recusa de domínios externos, credenciais embutidas e tags desconhecidas. A tag `all` agora representa limpeza total explícita, em vez de apenas a URL inicial. Pedidos inválidos não viram limpeza total. A tela exige confirmação para limpar tudo e não informa sucesso quando o Cloudflare relata falhas.
- **Processamento da fila de emails:** substituída a confiança em um campo decodificado do JWT pela comparação com a credencial real de servidor. A verificação anterior também dependia da validação JWT do gateway, que está habilitada no arquivo de configuração; não foi demonstrada exploração em produção. Agora a função recusa credenciais falsas mesmo se essa configuração mudar e aceita apenas POST.
- **Login administrativo:** o destino após entrar passa a aceitar somente `/crm` ou caminhos administrativos internos, excluindo o próprio login. O parâmetro não pode selecionar endereços externos ou caminhos arbitrários. Cadastro continua sem conceder papel administrativo automaticamente.

### Verificação do banco ativo nesta rodada

- As 44 tabelas de `public` consultadas continuam com proteção por linha habilitada; não foram encontradas views nesse escopo.
- As regras examinadas de CRM e registros de purga exigem administrador; `user_roles` permite leitura do próprio papel e leitura administrativa, sem escrita concedida por regra a contas comuns. Notificações mantêm leitura e alteração limitadas ao proprietário.
- `has_role` continua executável por contas autenticadas e não por visitantes. Sua permissão foi preservada, pois as regras dependem dela.
- O bucket `crm_documents` continua privado e a regra de arquivos exige administrador.
- As funções de disparo da fila de emails consultadas usam POST e referenciam a credencial de serviço no cofre. Nenhum valor de segredo foi consultado ou copiado para o navegador.
- **Não houve migração nesta rodada.** Não foram ampliadas permissões públicas nem alterados dados do CRM.

### Pendências verificadas — não corrigidas nesta etapa

1. **Funções SQL de rede da plataforma:** a nova consulta encontrou 14 assinaturas `http*` executáveis por visitantes, pertencentes a `supabase_admin` (incluindo auxiliares que não enviam requisições). Solicitar ao suporte do Lovable Cloud que restrinja essa exposição, preservando as rotinas internas. Não se deve considerar essa pendência resolvida pelo commit.
2. **Indique e Ganhe:** o gatilho de indicações executa com a permissão do visitante e chama `check_rate_limit`, que não é executável por visitantes nem contas comuns. O conflito de permissões foi confirmado na definição do banco; não foi feito envio real. O reparo precisa mover a entrada pública para um endpoint validado com limitação de abuso, mantendo a tabela privada para leitura. Não foi concedida execução pública irrestrita nem transformado o gatilho em privilegiado como atalho.
3. **Lembretes de cotação:** o código de `quote-reminders-cron` monta um link com dados da cotação em base64; isso não é criptografia. Além disso, chama `send-form-email` sem Origin, mas esse endpoint exige Origin e usa destinatários internos fixos. Não foi comprovada entrega a clientes. Não habilitar lembretes como se estivessem prontos: substituir por token opaco com prazo verificado no servidor e um envio transacional dedicado antes de ativar o fluxo.
4. **Formulários públicos:** Origin e chave pública do Supabase não comprovam identidade e não impedem robôs; podem ser reproduzidos por clientes fora do navegador. Há limitação de frequência no código examinado, mas a confiabilidade dos cabeçalhos de IP depende da infraestrutura. Revisar CAPTCHA com validação de servidor, domínios de preview autorizados e limites no gateway. Os endpoints de formulário examinados também usam `getClaims` com um SDK antigo fixado; compatibilidade e respostas precisam de teste após publicação, sem declarar o envio validado por esta revisão.

### Publicação e configurações necessárias no Lovable

- Publicar `purge-cache`, seus arquivos compartilhados, a configuração correspondente e `process-email-queue`. A edição do repositório não comprova atualização do servidor ativo. Sem essa publicação, a nova tela pode consultar registros, mas a limpeza por sessão administrativa pode ser recusada pela versão antiga do endpoint.
- Manter as credenciais de Cloudflare, email e serviço somente nos segredos de servidor. Se `PURGE_SECRET` foi compartilhado ou digitado em equipamentos não confiáveis, rotacioná-lo e atualizar as automações que o usam.
- Conferir confirmação de email, proteção contra senhas vazadas, limites de tentativas, URLs de retorno e necessidade de permitir novos cadastros. Se a área for exclusiva de funcionários, desabilitar novos cadastros nas configurações após definir o processo de convite. Essas opções não foram alteradas por código.
- Revisar duração/revogação das sessões e exigir autenticação adicional para operações sensíveis conforme os recursos disponíveis. Não foram comprovadas as configurações ativas dos provedores.
- Preservar a restrição da chave de Maps aos domínios e APIs necessários e solicitar ao suporte a correção das funções SQL de rede citadas acima.

### Testes e limites

Adicionado `src/test/purge-request.test.ts` com casos de URLs externas, formatos inválidos, limites e limpeza total explícita. Não foi possível executar testes, build, chamadas HTTP ou navegador neste ambiente; nenhum resultado de aprovação é presumido.

Após publicar, testar: visitante e conta comum devem receber recusa ao limpar cache; administrador deve consultar registros e limpar uma URL; a credencial de automação deve continuar funcionando; JWT inventado com `role: service_role` deve ser recusado na fila de emails. Testar também falha do Cloudflare e sessão expirada, sem exibir falso sucesso. Esta revisão não é um teste de invasão nem uma certificação de ausência de vulnerabilidades.
