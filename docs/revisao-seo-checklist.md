# Revisão SEO por checklist

## Escopo e limites

Revisão do código, sem acesso ao site publicado, sem executar build, testes, rastreamento ou ferramentas do Google. Domínio confirmado no projeto: https://www.patroseguros.com.br. Não houve alteração de layout, imagens ou texto visível das páginas; foram alterados metadados e dados de identificação para buscadores.

## Checklist, na ordem solicitada

1. **Títulos e descrições:** mantidos o título e o tema da página inicial; substituída sua descrição por um texto completo dentro do limite do projeto, igual no HTML inicial, na página React e no gerador de metadados. Categorias do blog e perfis de autores passaram a ter tratamento próprio no gerador, em vez do fallback que transformava o caminho da URL em título genérico e acrescentava Guarulhos. Nos perfis de Roberto Patro e Sandra Patro, o título foi alinhado entre a página e o gerador. Isso não representa uma verificação de unicidade de todas as rotas do site.
2. **Idioma:** o HTML inicial já declara pt-BR; preservado.
3. **Título principal:** a home renderiza o H1 descritivo de HeroPatro; categorias e autores têm H1 com seus nomes. Os componentes foram preservados, sem criar títulos adicionais ou mudar o visual.
4. **Compartilhamento:** descrição da home alinhada nas tags Open Graph e Twitter. Artigos do blog passam a fornecer explicitamente imagem e descrição da imagem no gerador, usando a mesma imagem de seus dados estruturados. Perfis de autores resolvem imagens locais ou externas com URL absoluta, sem concatenar dois domínios.
5. **Canônica:** preservados o domínio HTTPS oficial e os helpers já existentes. Categorias e autores recebem canônica própria também no gerador, com a mesma URL de compartilhamento.
6. **robots.txt:** já permite conteúdo público e recursos de renderização, restringe áreas internas e informa sitemap-index.xml. Preservado. Não foi verificado o conteúdo efetivamente servido pelo servidor.
7. **sitemap.xml:** sitemap.xml e sitemap-index.xml já apontam para os mapas de páginas, blog, seguros, imagens e bairros no domínio oficial. Preservados; as correções desta revisão não criam nem removem URLs. Ainda é necessária uma conferência integral das URLs e datas contra a publicação real.
8. **Texto alternativo:** conferidos os componentes da home, categorias e autores; suas imagens já possuem alt. Mantidos sem inventar descrições de fotos que não puderam ser visualizadas. O texto alternativo das imagens de compartilhamento de artigos e autores é informado no gerador.
9. **Dados estruturados:** imagem de Person nos perfis usa a mesma URL absoluta do compartilhamento. Removida a data de atualização calculada a cada acesso em ProfilePage, pois ela não comprova uma edição real. Preservados os dados existentes de artigos, organização e navegação.

## Proteção contra regressões

Ampliado src/lib/seoMetadata.regression.test.ts com verificações de categorias, individualização dos autores, URLs das imagens, consistência entre imagem social e dados de artigo e ausência de atualização diária fictícia. Os testes foram preparados, mas não executados neste ambiente.

## Próximo pedido

- Completar o inventário de títulos e descrições de todas as rotas, comparando o HTML gerado ao que cada página React publica, especialmente outros caminhos que ainda usam o fallback genérico.
- Revisar paginação das categorias: hoje o estado dos botões não está representado na URL; a correção exige tratar navegação, canônicas e renderização em conjunto.
- Conferir todos os H1s, textos alternativos e dados estruturados nas demais páginas, incluindo a correspondência de ações de busca declaradas com a busca realmente disponível.
- Validar o conteúdo final dos sitemaps e datas de alteração contra o site publicado, sem substituir datas por datas de build.

## O que depende do responsável pelo site

Após a publicação, conferir as URLs no Search Console, confirmar o envio de https://www.patroseguros.com.br/sitemap-index.xml e validar exemplos no teste de resultados avançados do Google. Conferir as prévias em redes sociais, que podem manter imagens e textos em cache. Nenhuma posição no Google ou exibição de resultado especial é garantida por estas alterações.
