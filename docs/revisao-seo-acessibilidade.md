# Revisão — etapa 1: SEO e acessibilidade

## Escopo e limites

Revisão estática do código compartilhado de metadados, navegação do topo, atalho para o conteúdo, estilos de foco, hero da página inicial e regras de rastreamento. A página inicial utiliza `Header`, `HeroPatro` e `PageMeta`, portanto as correções atingem componentes realmente utilizados.

Esta etapa não representa uma auditoria individual de todas as páginas. Não foram executados build, testes, Lighthouse, navegador, rastreamento do domínio ou consultas ao Search Console neste ambiente. Não há pontuação medida nem garantia de posicionamento ou conformidade integral com WCAG.

## Problemas encontrados e correções

| Área | Evidência no código anterior | Correção |
| --- | --- | --- |
| Metadados | O atualizador só modificava tags existentes no HTML. | Tags de descrição, redes sociais e robots passam a ser criadas quando ausentes. |
| Compartilhamento | O texto alternativo da imagem só era atualizado se a página fornecesse uma descrição explícita. | Redefinição em cada atualização, evitando reaproveitar a descrição de outra página. |
| Títulos locais | Títulos curtos recebiam “em Guarulhos” mesmo quando já mencionavam a cidade. | Verificação da cidade e da marca antes de acrescentar texto; cálculo do limite após resolver o contexto local. |
| Rastreamento | Grupos específicos de robôs com liberação geral não herdavam as restrições do grupo genérico. | Agrupamento dos robôs de descoberta sob as mesmas regras; preservação dos bloqueios de scrapers e do endereço do sitemap. |
| Menu no computador | Submenus dependiam de `group-hover`, sem estado acessível de expansão. | Botões com estado expandido, abertura por clique/teclado, seta para baixo, Tab entre destinos e Escape com retorno do foco. |
| Busca no celular | Resultados eram calculados, mas não apareciam na interface. | Lista de resultados, mensagem de busca vazia, rótulo do campo e anúncio da quantidade para leitores de tela. |
| Menu no celular | Não havia fechamento por Escape. | Escape fecha o painel e devolve o foco ao botão de abrir menu. |
| Ações principais | Botões estavam aninhados dentro de links no cabeçalho e hero. | Um único elemento interativo por ação, mantendo destino, aparência e rastreamento de cliques. |
| Pular navegação | O atalho dependia exclusivamente do identificador da área principal. | Localização do elemento `main` e foco programático mesmo em páginas sem esse identificador. |
| Foco visual | Links e botões simples não tinham indicação global explícita. | Contorno de foco por teclado; acesso flutuante de emergência também se expande ao receber foco. |
| Conteúdo em movimento | Faixa animada sem pausa específica ao interagir. | Pausa da classe de faixa animada ao passar o mouse ou focar seus links. |

## Verificações de regressão adicionadas

- Metadados ausentes, bloqueio de indexação no preview, remoção de descrição social antiga e ausência de duplicação das tags após atualização.
- Título local sem repetição de Guarulhos.
- Abertura do menu, fechamento por Escape, retorno de foco e fechamento ao sair do grupo.
- Atalho de conteúdo em uma página sem identificador nem atributo de foco no `main`.

Os testes foram escritos, mas não executados neste ambiente. Usam as dependências de teste já presentes no projeto.

## Validação após a sincronização

1. Na página inicial em computador, navegar com Tab até “Para você”, abrir com Enter ou Espaço, percorrer os links e fechar com Escape. Repetir nos demais menus.
2. No celular, abrir o menu e buscar “vida” e um termo inexistente. Conferir os resultados e o estado vazio; selecionar um resultado e verificar o destino.
3. Usar “Ir para o conteúdo principal” com teclado e verificar a transferência de foco.
4. Navegar entre páginas com e sem imagem social específica e conferir os metadados no HTML renderizado.
5. Confirmar no domínio publicado as regras servidas em `/robots.txt`, o sitemap e o HTML pré-renderizado. O código do repositório não confirma a resposta HTTP publicada.
6. Executar os testes de metadados e navegação e a suíte existente de SEO. Complementar com leitor de tela e medição real de contraste, zoom e navegação móvel.

## Próximas etapas do plano

- Etapa 2: performance e carregamento — inicialização, páginas, imagens e scripts.
- Etapa 3: segurança — autorização, funções de servidor e permissões do banco.

As restrições de rastreamento não são controle de acesso. Nenhuma permissão do banco, autenticação ou função de servidor foi alterada nesta etapa.
