# Revisão de SEO — categorias e autores do blog

## Escopo e método

Revisão do código, seguindo a ordem solicitada. Não foi possível executar o build, abrir o site publicado, medir o carregamento ou consultar o Search Console. Esta revisão não certifica todas as rotas do projeto.

Domínio oficial encontrado no projeto: https://www.patroseguros.com.br. Nenhum marcador de domínio foi necessário.

## Checklist, na ordem

1. **Títulos e descrições únicos**
   - Home: os textos em `index.html` e na fonte central de metadados estão alinhados.
   - Categorias do blog: antes, a paginação alterava apenas o estado local; o endereço e os metadados continuavam iguais. Agora as páginas seguintes usam `?page=N`, com título e descrição próprios.
   - Autores: os metadados existentes já usam o nome e a biografia de cada autor; preservados.
   - Pendente: comparar títulos e descrições de todas as rotas geradas para detectar outras colisões, inclusive após cortes automáticos.

2. **Idioma do documento**
   - `index.html` já declara `lang="pt-BR"`; preservado.

3. **Título principal**
   - O hero da home tem H1 descritivo.
   - Categorias e perfis de autores já possuem um H1 que identifica seu conteúdo; preservados.
   - Pendente: validar a hierarquia no HTML renderizado das demais páginas.

4. **Prévia de compartilhamento**
   - O componente compartilhado já atualiza Open Graph e Twitter, resolve imagens como URLs absolutas e redefine o texto alternativo após a navegação.
   - As categorias agora recebem também os metadados específicos da página da listagem em que o visitante está.
   - Pendente: testar as prévias reais no endereço publicado e verificar se os robôs recebem o HTML pré-renderizado correto.

5. **URL canônica**
   - O domínio oficial e o tratamento de barras finais já estão centralizados.
   - Categorias agora têm URL canônica própria por página, compartilhada com Open Graph e os dados estruturados da coleção. Valores inválidos usam uma página válida, sem produzir uma URL canônica fictícia.

6. **robots.txt**
   - O arquivo existente permite conteúdo público e recursos de renderização, restringe áreas internas e aponta para o índice de sitemaps do domínio oficial.
   - O componente de metadados já impede a indexação nos domínios de preview configurados. Nenhuma alteração necessária nesses pontos.
   - Pendente: conferir respostas HTTP e possíveis regras adicionais da hospedagem. robots.txt não substitui proteção por login.

7. **sitemap.xml**
   - `public/sitemap.xml` e `public/sitemap-index.xml` já listam os mesmos cinco arquivos do domínio oficial. Preservados, sem inventar datas de atualização.
   - Não é necessário listar toda página de paginação no sitemap: os links Anterior/Próxima agora permitem descobri-las nas categorias.
   - Pendente: conferir se todas as URLs dos arquivos filhos respondem corretamente e se as datas correspondem às alterações reais.

8. **Textos alternativos das imagens**
   - Categorias e autores agora reutilizam as descrições de capa já cadastradas no projeto, em vez de sempre repetir o título do artigo.
   - Quando não há uma descrição cadastrada, o título continua como alternativa, preservando o comportamento existente. Nenhuma imagem foi substituída.
   - Pendente: descrever individualmente as demais capas após inspeção visual.

9. **Dados estruturados**
   - Categorias agora descrevem a coleção com os artigos realmente exibidos em cada página, usando o construtor existente.
   - Nos perfis dos autores, removidas as equivalências indevidas entre uma pessoa e os perfis sociais institucionais da corretora. O vínculo de trabalho com a empresa continua presente.
   - Pendente: validar o HTML publicado no Schema.org Validator e no teste de resultados avançados do Google. Dados válidos não garantem exibição especial.

## Preservação do comportamento

- Mesmas classes, componentes de botão, textos visíveis e tamanho das páginas de categoria.
- Os controles ativos de paginação passaram a ser links de navegação; os controles sem destino continuam desabilitados.
- Todos os hooks da categoria agora são executados antes do retorno de categoria inexistente.
- Incluído teste de regressão para navegação, metadados, URL canônica, imagens e correspondência entre coleção e artigos exibidos. Teste preparado, não executado neste ambiente.

## Ações no site publicado

- Após publicar, conferir `/blog/categoria/<categoria>?page=2` em uma categoria com mais de nove artigos.
- No Search Console, confirmar o envio de `https://www.patroseguros.com.br/sitemap-index.xml` e acompanhar a leitura dos arquivos e os motivos de exclusão de páginas.
- Verificar os dados estruturados e as prévias sociais usando as URLs públicas, não as de preview.
