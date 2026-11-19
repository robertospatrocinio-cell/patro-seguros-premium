# SEO, GEO e AEO: descoberta do conteúdo editorial

## Escopo desta revisão

Melhorias na Central de Guias (`/guias-seguros`), na Central de Perguntas (`/perguntas-frequentes-seguros`) e nas páginas de perguntas por categoria. Não representa uma auditoria completa do site publicado.

## Alterações

- As perguntas das centrais usam os controles nativos `details` e `summary`. As respostas ficam no HTML inicial mesmo quando recolhidas, sem exigir clique ou execução de JavaScript para obter o texto.
- Cada resposta tem uma âncora e um link próprio. Ao abrir um endereço com essa âncora, a resposta correspondente é expandida e trazida à tela.
- Os controles têm foco visível, área de interação adequada e indicação visual de abertura. A rotação do ícone respeita a preferência por movimento reduzido.
- A Central de Perguntas passa a descrever uma coleção de categorias, com links para as páginas temáticas. A marcação FAQPage fica nas páginas de categoria, evitando repeti-la no índice.
- As páginas de categoria usam a mesma lista para as respostas exibidas e para os dados estruturados. Cada pergunta marcada aponta para sua resposta na própria página.
- Os índices informam o idioma português do Brasil e referenciam a identidade institucional existente, sem criar avaliações, credenciais ou promessas adicionais.
- Na Central de Perguntas, as categorias são títulos de nível 2 e as perguntas são de nível 3.
- A Central de Guias tem posições consecutivas na coleção, total de itens e nomes acessíveis dos links que identificam o guia de destino.

## Verificações adicionadas ou atualizadas

- `src/components/DiscoverableFaq.test.tsx`: respostas no HTML renderizado no servidor, links individuais e abertura por âncora.
- `src/data/perguntasPrioritarias.test.tsx`: paridade entre respostas e marcação por categoria, organização da central e hierarquia dos títulos.
- `src/pages/CentralDeGuias.discovery.test.tsx`: correspondência entre coleção, posições, links e nomes dos guias.

Os testes foram escritos, mas não executados neste ambiente. Não foi possível verificar a página publicada, o resultado final do pré-renderizador ou respostas HTTP reais.

## Conferência após publicar

1. Abrir a Central de Perguntas e uma categoria no celular e no computador.
2. Usar Tab, Enter e Espaço para navegar e expandir respostas; conferir o foco visível.
3. Abrir uma resposta, copiar o endereço de “Link desta resposta” e conferir a abertura em outra aba.
4. Conferir no HTML pré-renderizado se os textos das respostas estão presentes.
5. Validar os dados estruturados publicados no Schema Markup Validator e no Rich Results Test.
6. Acompanhar o rastreamento e a indexação no Google Search Console.

## Limites

As mudanças facilitam leitura, navegação e interpretação do conteúdo. Não garantem indexação, posição no Google, resultados destacados de FAQ ou citação por assistentes de IA. Não alteram as regras de acesso dos robôs, os mapas do site, os títulos, as descrições, os endereços canônicos ou as informações comerciais existentes.
