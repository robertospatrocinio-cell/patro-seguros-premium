# Etapa 2 — Consolidação de domínios e revisão local

## Escopo e limites da verificação

Esta etapa prepara a migração; não ativa redirecionamentos em domínios externos. Não houve consulta HTTP aos satélites nem acesso aos relatórios de Search Console, Analytics, hospedagem ou ao pré-qualificador citado no pedido. O diagnóstico recebido é uma hipótese de trabalho, não comprovação de penalização, queda de tráfego ou erro atual de um site externo.

O arquivo `docs/mapa-migracao-dominios.csv` separa URLs informadas no pedido de caminhos candidatos ainda não confirmados. Os destinos de conteúdo e de cotação foram conferidos nas rotas do projeto principal. Não é um inventário completo dos satélites: ativar uma migração completa exige preencher as URLs restantes com as fontes abaixo.

## Mapa página a página

- Auto: raiz de seguroemguarulhos.com.br → `/seguro-auto`; cotação → `/cotacao-seguro-auto`.
- Apartamentos: raiz de seguroapartamentoguarulhos.com.br → `/seguro-residencial`; cotação → `/cotacao?tipo=residencial`.
- Empresarial: raiz do satélite → `/seguro-empresarial`; cotação → `/cotacao?tipo=empresarial`.
- Galpão: URL `/seguro-galpao-guarulhos` informada no satélite → `/seguro-galpao` diretamente, sem usar o alias local que adicionaria outro salto.
- Prestadores de serviços: destino candidato `/seguro-rc-prestacao-servicos`, condicionado à conferência do conteúdo de origem. Proteção patrimonial de um prestador não equivale automaticamente a RC.
- Domínio .com: somente a raiz foi proposta para a raiz .com.br. Caminhos internos precisam de correspondência própria, não de envio indiscriminado para a Home.

Cada linha do CSV é uma decisão independente, não uma regra curinga. Conferir também variantes HTTP/HTTPS, com/sem www e com/sem barra final na hospedagem de origem. Não cadastrar esses domínios na lista de redirects internos do site principal: ela não controla hosts externos.

## Dados necessários antes de ativar

Exportar os mesmos últimos 90 dias, com datas inicial/final e fuso registrados, para o domínio principal e cada satélite:

1. Search Console → Desempenho → Páginas: URL completa, cliques, impressões, CTR e posição; exportar consultas das principais páginas comerciais.
2. Search Console → Indexação → Páginas: URLs rastreadas mas não indexadas e Soft 404; inspecionar amostras com data da última coleta e HTML renderizado.
3. Search Console → Links: páginas com links externos e principais origens.
4. Sitemaps, rotas do código e rastreamento dos satélites: unir com as exportações, incluindo páginas sem cliques e campanhas pagas.
5. Captação: conciliar página de entrada, origem/UTM e lead efetivamente recebido no CRM. Clique de WhatsApp não equivale a lead nem a venda. Estes dados não foram consultados nesta etapa.

Acrescentar ao mapa: URL exata, status HTTP atual, canonical atual, destino final, cliques, leads comprovados, links recebidos, decisão, responsável e validação. Não colocar dados pessoais dos leads no CSV versionado. Nenhuma URL com tráfego, backlinks ou conversão deve ser descartada apenas por não constar neste mapa inicial.

## Preservação dos caminhos comerciais

As páginas de produto, a cotação geral, a cotação Auto e os formulários existentes não foram removidos. A página de Galpão no domínio principal existe; isso não prova que o erro do satélite foi corrigido.

Antes de redirecionar, comparar campos obrigatórios, anexos, consentimento, regras do pré-qualificador e destino dos leads de cada origem. O pré-qualificador externo não está disponível neste repositório e não foi migrado. Se ele for necessário, preservar a operação atual até implementar e testar a equivalência. Confirmar persistência no CRM e notificação, inclusive no celular; o recebimento real não foi testado aqui.

Nos redirects de conteúdo, preservar parâmetros de atribuição aprovados (UTMs e identificadores de campanhas), sem copiar dados pessoais para URLs. Parâmetros funcionais de formulários precisam de tradução explícita. Manter a âncora de cotação equivalente quando houver; não enviar todo visitante diretamente a um formulário nem descartar a intenção do conteúdo.

## Revisão implementada no site principal

- `/seguros-guarulhos`: destaca Cidade Maia, Cumbica, Centro, Vila Augusta e Bonsucesso com focos de contratação distintos e acesso à cotação para outros bairros.
- A página municipal usa canonical `/seguros-guarulhos`. Foram removidas declarações de rotas duplicadas que concorriam com o hub e com o template de bairros. O alias `/seguros-em-guarulhos` fica no encaminhamento já existente para o hub principal.
- O template efetivamente usado por `/seguros-guarulhos/:bairro` passa por uma camada editorial conservadora: não publica classificações de risco, preços, casos ou depoimentos locais sem fonte documentada.
- As cinco prioridades recebem listas distintas de dados e verificações para cotar. São orientações de contratação, não estatísticas locais ou alegações de sinistros ocorridos.
- WhatsApp e endereço do rodapé local reutilizam o cadastro institucional centralizado. Isso alinha o código do site principal, mas não confirma o cadastro no Google nem altera os satélites.

## Decisão sobre poda local

Não foram aplicados noindex, remoção de sitemap ou redirects em massa aos demais bairros sem dados de tráfego e conversão. Os caminhos existentes continuam acessíveis para preservar links e captação. A prioridade editorial de cinco polos não afirma que os outros bairros sejam irrelevantes e não cria novas páginas.

Classificar cada página após os dados de 90 dias:

| Situação comprovada | Ação proposta |
| --- | --- |
| Intenção própria e orientação útil verificável | Manter, revisar e registrar as fontes |
| Mesmo conteúdo/intenção de uma página melhor | Incorporar o conteúdo útil e redirecionar para o equivalente |
| Página necessária apenas para campanha | Avaliar noindex e remoção do sitemap, mantendo rastreamento permitido |
| Sem utilidade, tráfego ou equivalente | Avaliar retirada com status adequado; não mandar para a Home |

A revisão desta etapa cobre o hub municipal e o template de bairros. Não constitui validação de todas as combinações produto × bairro, páginas de cidades ou artigos locais. Nenhum número de risco, preço médio, hospital credenciado ou case auditável novo foi inventado.

## Roteiro de ativação externa e reversão

1. Aprovar o inventário e a equivalência comercial; guardar exportações e cópia das regras atuais da hospedagem.
2. Confirmar acesso a DNS, HTTPS, hospedagem e Search Console de todos os hosts envolvidos. Um commit aqui não dá esse acesso.
3. Testar destinos finais com resposta 200, canonical próprio, conteúdo renderizado e cotação recebida. Verificar todos os dispositivos relevantes.
4. Instalar na hospedagem de cada origem redirects 301 exatos, antes do fallback SPA e das normalizações que criariam saltos. Não aplicar regra global de todos os caminhos para a Home.
5. Testar cada linha e variantes de host: um salto, Location correto, sem loops, sem perda da atribuição aprovada. Caminhos desconhecidos não devem virar falsas páginas válidas.
6. Atualizar anúncios, links próprios e o site do perfil do WhatsApp para o destino final .com.br. Usar a mudança de endereço no Search Console somente nos casos elegíveis de migração de domínio inteiro.
7. Manter domínio de origem, certificado e redirects por pelo menos um ano, preferencialmente por mais tempo. Acompanhar erros, páginas de destino, cliques e leads semanalmente no primeiro mês, e depois mensalmente.
8. Se houver falha de recebimento de leads ou destino incorreto, restaurar as regras anteriores a partir do backup, corrigir o mapeamento e retestar antes de reativar. Oscilação orgânica isolada não comprova erro nem tem prazo garantido de recuperação.

## Validação desta entrega

Foram adicionados testes de regressão para a camada editorial local. Não foi possível executar build, testes ou navegação automatizada neste ambiente; devem ser executados no fluxo do projeto antes da ativação externa. A etapa 3 (conteúdo comercial Saúde/Auto/Agro) não foi iniciada.
