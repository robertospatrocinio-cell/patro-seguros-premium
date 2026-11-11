# Revisão de SEO — canonicals e listagem do blog

## Escopo

Revisão estática autorizada na branch `main`. Foram inspecionados o gerenciador compartilhado de metadados (`PageMeta`), o helper de URLs canônicas, o HTML inicial, as regras de rastreamento, o índice de sitemaps e a listagem do blog com seus dados estruturados.

Esta revisão não equivale a uma auditoria de todas as rotas. Não foram executados build, testes, navegador, rastreamento do site publicado ou consultas ao Search Console. Os testes acrescentados precisam ser executados no ambiente do projeto.

## Problemas confirmados no código e correções

| Problema | Correção |
| --- | --- |
| `canonicalPath` tinha uma normalização diferente do canonical padrão: a raiz preservava a barra final, uma barra antes da consulta permanecia e fragmentos não eram removidos. | Helper específico para caminhos explícitos, reutilizando a normalização de caminho existente e preservando a consulta necessária para paginação. |
| O valor de diagnóstico do canonical divergia do endereço emitido quando o caminho não começava com barra. | O canonical, `og:url` e o diagnóstico passam a usar o mesmo valor calculado. |
| A normalização do caminho explícito convertia também os valores da consulta para minúsculas. | Somente o caminho é convertido; os valores da consulta mantêm a capitalização original. |
| Em qualquer página da listagem do blog, os dados estruturados descreviam os 20 artigos mais recentes, em vez dos artigos exibidos ali. | A coleção e a lista de posts descrevem o destaque, que permanece visível, e os artigos da página atual, sem repetir o destaque. |
| A coleção de uma página posterior do blog continuava identificada pela URL da primeira página. | O identificador da coleção e o da lista acompanham o canonical paginado. A identidade da entidade Blog permanece estável. |
| O filtro por tag não era considerado busca para título, descrição, regra de indexação e emissão dos dados estruturados. | Tags passam a receber o mesmo tratamento dos demais filtros: metadados de busca, `noindex` e supressão dos dados estruturados gerais durante a filtragem. |

## Comportamentos preservados

- O domínio canônico continua sendo `https://www.patroseguros.com.br`.
- URLs comuns continuam sem consultas e fragmentos no canonical; a preservação da consulta ocorre somente quando a página fornece `canonicalPath` explicitamente.
- A política existente de `noindex, follow` para páginas posteriores e buscas do blog não foi alterada.
- Os ambientes de preview continuam com `noindex, nofollow`.
- Títulos editoriais dos artigos, imagens, textos comerciais, rotas e permissões do banco não foram alterados.
- Não foram modificados sitemaps nem datas de atualização sem evidência de mudança no conteúdo correspondente.

## Testes de regressão acrescentados

- Raiz canônica, caminhos sem barra inicial, maiúsculas no caminho, barra antes da consulta e remoção de fragmentos.
- Preservação da capitalização dos valores da consulta.
- Concordância entre canonical, URL social e valor de diagnóstico.
- Identificação paginada da coleção e correspondência entre os artigos fornecidos e os itens descritos.
- Compatibilidade do construtor de coleção com chamadas existentes sem paginação.

## Conferência após sincronizar

1. Executar a suíte de testes e o build do projeto.
2. Abrir `/blog` e `/blog?page=2` no domínio publicado; verificar canonical, `og:url` e a lista de artigos nos dados estruturados.
3. Selecionar uma tag na listagem: conferir título e descrição específicos e `noindex, follow` no domínio público.
4. Repetir a navegação no preview: ali o bloqueio deve continuar sendo `noindex, nofollow`.
5. Conferir o HTML pré-renderizado e as respostas HTTP publicadas. A leitura do repositório, isoladamente, não confirma esses resultados.
6. Complementar a revisão com o Search Console e validadores de dados estruturados; não há garantia de indexação, rich results ou posicionamento.
