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

## Próxima rodada recomendada

- Examinar as demais funções administrativas e de envio de email, inclusive tarefas agendadas, antes de restringir qualquer chamada pública.
- A tela **Logs de Purga do Cache** ainda pede `PURGE_SECRET` no navegador. O segredo não está embutido no código examinado, mas esse fluxo deve migrar para autorização por conta administrativa junto com a função de servidor, mantendo a automação existente.
- Verificar o fluxo **Indique e Ganhe**: o gatilho público chama `check_rate_limit`, mas visitantes não têm permissão de executar essa função no estado consultado. Isso é um risco de falha do formulário já existente; não foi concedida execução pública de uma função privilegiada como atalho.
- Revisar escopos adicionais expostos pela plataforma, configurações de provedores de login, expiração/revogação de sessões e respostas reais das funções após a publicação. Essas configurações não foram comprovadas nesta revisão.
