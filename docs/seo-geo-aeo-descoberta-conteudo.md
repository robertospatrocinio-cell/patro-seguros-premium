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

### Próxima etapa planejada (não implementada nesta revisão)

3. Consistência de rastreamento, endereços canônicos e mapas do site nas áreas revisadas.

Esta etapa não modifica robots.txt, sitemaps, políticas de acesso ou dados comerciais. Os resultados de busca e as citações por IA continuam dependendo de sistemas externos.
