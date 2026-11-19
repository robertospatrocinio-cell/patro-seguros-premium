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

As mudanças facilitam leitura, navegação e interpretação do conteúdo. Não garantem indexação, posição no Google, resultados destacados de FAQ ou citação por assistentes de IA. A revisão inicial não alterou regras de rastreamento, mapas do site ou metadados; os ajustes técnicos posteriores estão descritos na etapa 3 abaixo. As informações comerciais existentes foram preservadas.

## Continuação em etapas — etapa 1: materiais gratuitos

Escopo: Central de Materiais (`/materiais-gratuitos-seguros`) e os dez checklists em `/materiais/:slug`.

- A central agora oferece links internos para abrir cada checklist, além do contato por WhatsApp. Antes, a coleção estruturada apontava para páginas sem links diretos nos cards.
- O índice tem um título de seção, uma lista de materiais e nomes de links que identificam o checklist de destino. A coleção informa idioma, descrição e quantidade de itens usando a mesma fonte dos cards.
- As páginas de checklist explicam o acesso sem cadastro e oferecem atalhos para o checklist, as dicas e as perguntas. O formulário de contato permanece opcional, sem alterar seu envio.
- As respostas usam o componente nativo de perguntas já adotado nas centrais: permanecem no HTML com links individuais e abertura por âncora.
- As seções e os itens do checklist têm identificadores estáveis, também referenciados nos passos estruturados. As perguntas estruturadas apontam para as respostas correspondentes.
- Foi removida a estimativa fixa de dez minutos dos dados estruturados, pois não havia estimativa equivalente no conteúdo visível.
- Os títulos das páginas de material usam o nome do checklist, deixando a identificação da marca para o componente existente. A emissão automática de breadcrumbs foi desativada somente nessas páginas, que já possuem seu próprio BreadcrumbList.

### Verificações desta etapa

`src/pages/Materiais.discovery.test.tsx` cobre os links e a coleção da central, os dez checklists, a presença das respostas no HTML, a correspondência dos passos e os destinos dos atalhos. Os testes não foram executados neste ambiente; ainda é necessário validar o build, o HTML publicado e a navegação no celular e no teclado após a sincronização.

## Continuação em etapas — etapa 2: contexto editorial e conexões

Escopo: artigos do blog, perfis de autores, guias aprofundados e perguntas por categoria.

- Artigos passam a ter a seção “Quem escreveu este artigo”, com trajetória resumida, papel profissional já cadastrado, link para o perfil e caminho para esclarecimentos ou correções. Não foram criadas credenciais nem atribuída revisão a autores diferentes dos cadastrados.
- A navegação “Continue a leitura” conecta artigos, guias e perguntas pelo assunto específico. Consórcio tem precedência sobre veículos ou imóveis; quando não há correspondência, os links levam às centrais em vez de indicar um guia sem relação.
- Guias e perguntas oferecem até dois artigos temáticos com autoria e tempo de leitura. Consultórios, salas comerciais e veículos elétricos também têm correspondência com suas categorias de perguntas. A navegação não aponta para a própria página; nos artigos, preserva a seleção de relacionados já existente sem adicionar uma segunda lista de posts.
- Nos guias, a equipe e a revisora já indicadas agora têm links para a página institucional e o perfil existente. As mesmas identidades aparecem nos dados estruturados.
- As respostas dos guias usam o componente nativo já adotado nas centrais, permanecendo no HTML com links individuais.
- Os perfis dos autores conectam a trajetória e os artigos às centrais de guias e perguntas, à equipe e ao contato para correções.
- As tags dos artigos abrem a busca do blog pelo assunto, em vez de levar todas à listagem sem filtro. A categoria na trilha do artigo aponta para a página editorial de categoria.
- A seleção de artigos relacionados deixa de completar a lista com itens sem pontuação de relação; um endereço desconhecido não recebe recomendações arbitrárias.

### Verificações desta etapa

`src/components/EditorialNextSteps.test.tsx` cobre a existência dos destinos temáticos, precedência de assuntos, links presentes no HTML, ausência de autorreferência, caminhos alternativos e integração com guias e perguntas. Os testes foram adicionados, mas não executados neste ambiente. Após sincronizar, conferir o build, abrir um artigo e seu perfil de autor, navegar até um guia e uma categoria de perguntas, e testar os links com teclado e no celular.

A etapa 2 não modificou robots.txt, sitemaps, políticas de acesso ou dados comerciais. Os resultados de busca e as citações por IA continuam dependendo de sistemas externos.

## Continuação em etapas — etapa 3: rastreamento e consistência técnica

Escopo: materiais gratuitos, guias, perguntas por categoria, perfis de autores e sua participação nos mapas do site. Revisão feita no código, sem auditoria HTTP do domínio publicado.

### Correções e verificações

- A resolução de metadados do HTML estático passa a normalizar os endereços com o mesmo utilitário usado pelo componente PageMeta: domínio institucional com HTTPS e www, sem barra final, parâmetros ou fragmentos. Links de respostas e itens continuam funcionando no navegador, mas não viram páginas canônicas independentes.
- Materiais, guias e categorias de perguntas passam a ter metadados específicos derivados dos mesmos cadastros usados pelas páginas, antes da resolução genérica pelo endereço. Os guias são identificados como artigos. Permanecem os limites de tamanho já aplicados pelo projeto ao HTML estático; não se afirma paridade literal de todos os títulos entre pré-renderização e React.
- Os geradores de sitemap passam a excluir entradas com fragmentos, além de parâmetros. Isso evita promover links de respostas, itens de checklist, busca ou filtros a documentos independentes.
- O gerador principal já inclui as centrais, materiais, guias e categorias a partir dos respectivos cadastros; recebe os perfis de autores por argumento. Foram preservadas as exclusões existentes de redirecionamentos e formulários não indexáveis.
- O robots.txt público permite as áreas editoriais no grupo compartilhado pelos mecanismos de descoberta e aponta para o índice institucional de sitemaps. O build agora copia essa mesma fonte: antes, ele criava outra versão com grupos específicos que ignoravam as restrições do grupo geral. A cópia preserva os bloqueios administrativos e de scrapers definidos no arquivo público, sem criar novas liberações.
- O componente PageMeta mantém o bloqueio de indexação em hosts de preview. Essa proteção foi preservada: avaliar indexação no domínio público, não na prévia do Lovable.

### Cobertura adicionada

`src/lib/editorialCrawlConsistency.test.ts` verifica normalização de canonical e Open Graph, inclusive em endereços com maiúsculas ou host de preview; preservação de títulos e resumos dos artigos; metadados de materiais e guias; presença única dos documentos editoriais no sitemap gerado; exclusão de entradas de busca e âncoras; e uso da fonte pública de robots.txt pelo build. A conferência de presença usa o mapa intermediário do gerador; a reorganização final dos mapas acontece no pós-build e ainda precisa ser conferida no resultado publicado. Os testes foram escritos, mas não executados neste ambiente; o build também não foi executado.

### Validação pendente após publicar

1. Confirmar que o build concluiu e que o sitemap-index.xml publicado aponta para arquivos acessíveis, sem referências ao host de preview.
2. Conferir uma central, um material, um guia, uma categoria de perguntas, um artigo e um perfil de autor: resposta HTTP 200, canonical único no domínio oficial, Open Graph coerente e ausência de noindex no HTML público. Verificar tanto o código-fonte recebido quanto a página após executar JavaScript.
3. Confirmar nos sitemaps publicados que esses documentos aparecem uma vez no conjunto dos mapas de páginas, sem parâmetros, fragmentos ou URLs que redirecionam. No resultado final do build, sitemap.xml é um espelho do índice sitemap-index.xml, não uma segunda lista de páginas; o mapa de imagens pode referenciar as mesmas páginas para descrever suas imagens.
4. Testar endereços antigos, versões com barra final e domínios alternativos para confirmar redirecionamentos e seu destino real. A revisão de código não comprova o comportamento do servidor ou de caches externos.
5. Abrir links individuais de respostas e itens: devem levar à seção correta, mantendo o canonical da página principal. Busca e filtros do blog não devem entrar nos sitemaps.
6. No Google Search Console, enviar ou conferir o índice de sitemaps e inspecionar amostras das áreas revisadas; comparar o canonical declarado com o escolhido pelo Google e verificar o HTML rastreado.
7. Validar os dados estruturados no HTML publicado e acompanhar erros de rastreamento e indexação. A aprovação de um teste não garante resultados destacados, posicionamento ou citação por IA.

Não foram alterados dados comerciais, permissões de banco, regras de acesso privado nem configurações externas. Não houve envio automático ao Google ou comprovação de indexação.
