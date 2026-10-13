# Revisão de performance e carregamento — etapa 2

## Escopo e limites

Revisão estática da inicialização, divisão de páginas em arquivos carregados sob demanda, página inicial, imagens compartilhadas, antecipação de downloads e scripts do HTML. Esta etapa não altera banco, permissões, autenticação ou configurações de segurança.

Não foi possível executar build, testes, navegador ou PageSpeed neste ambiente. As correções abaixo tratam comportamentos verificáveis no código; não representam uma medição de melhoria em LCP, INP, CLS ou tamanho final do JavaScript.

## Correções aplicadas

### 1. Destaque principal da home

- O `HeroPatro` era carregado por um import dinâmico dentro da própria rota inicial. Isso criava uma segunda espera de rede para o conteúdo principal.
- Agora o componente acompanha o carregamento da home, sem uma fronteira adicional de Suspense ou o placeholder de 640px. Textos, imagem e botões foram preservados.

### 2. Imagens antecipadas no HTML

- O HTML antecipava as versões AVIF e WebP da mesma foto. Navegadores compatíveis com ambos os formatos podiam baixar os dois recursos.
- O hero da home também era antecipado em outras páginas, e o tamanho informado era sempre 100vw, diferente do tamanho definido no componente para desktop.
- O preload agora é limitado à entrada direta na home, antecipa somente AVIF e usa o mesmo tamanho responsivo do componente. O picture continua oferecendo WebP aos navegadores sem AVIF.
- Removido o preload global do selo. A imagem continua disponível nos componentes que a utilizam; o preload da logo foi mantido.
- Nenhuma imagem foi criada, substituída ou convertida e nenhum endereço do CDN foi alterado.

### 3. Seções inferiores e economia de dados

- `LazySection` agendava o download dos componentes de todas as seções em momentos ociosos, mesmo longe da área visível. Ociosidade não impede custo de rede ou de execução do JavaScript importado.
- A antecipação passou a depender da proximidade da seção. A margem acompanha a adaptação já existente à conexão, sem impor o mínimo de 800px às conexões econômicas.
- Incluído fallback para exibir o conteúdo quando IntersectionObserver não estiver disponível.
- O utilitário de antecipação ociosa ignora downloads especulativos em 2G ou com economia de dados, verificando novamente a conexão antes de executar. Carregamentos necessários, por interação ou visibilidade, e a inicialização de sessão permanecem disponíveis.

### 4. Componente compartilhado de imagens

- `OptimizedImage` passa a usar o lazy loading nativo sem uma segunda barreira de IntersectionObserver para disponibilizar a imagem ao navegador.
- Imagens críticas ficam visíveis desde a montagem, sem aguardar um fade após o evento de carregamento; recebem carregamento imediato e prioridade alta por padrão.
- Preservados os formatos alternativos, dimensões, espaço reservado, atributos da imagem e callbacks de carregamento e erro. A prioridade explícita fornecida pela página é respeitada.

### 5. Inicialização com conteúdo pré-renderizado

- A troca do conteúdo pré-renderizado consultava o DOM a cada frame enquanto o arquivo da rota ainda estava baixando.
- Agora uma observação de mudanças no DOM identifica a chegada do conteúdo. Mantidos os dois frames antes da troca e a liberação de segurança após seis segundos; observador e agendamentos são encerrados ao revelar a aplicação.

## Comportamentos revisados e mantidos

- Rotas carregadas sob demanda, tratamento de falhas e skeleton global.
- Fonte local com `font-display: swap` e ausência de dependência de Google Fonts no HTML inicial.
- Consentimento e momento de carregamento de GA4 e Meta Pixel: não foram alterados.
- Script editorial do Google News: mantido assíncrono e restrito às entradas pelo blog.
- Monitoramento, sessão, formulários e links de cotação/WhatsApp: sem mudanças funcionais nesta etapa.

## Testes adicionados — execução pendente

- `src/components/PerformanceLoading.test.tsx`: imagens críticas e secundárias, dimensões, prioridade, callbacks, fallback sem observer e renderização por proximidade.
- `src/lib/__tests__/prefetch.test.ts`: economia de dados, redes lentas, mudança de conexão, deduplicação, recuperação de falhas e preservação do trabalho necessário.
- `src/test/loading-resources.test.ts`: preload exclusivo da home, ausência de duplicação e paridade do tamanho responsivo com o hero.

## Validação após sincronizar com o Lovable

1. Executar os testes adicionados e confirmar que o build termina sem erros.
2. Abrir diretamente a home, Seguro Auto, Blog e Cotação em celular e desktop, inclusive com cache vazio.
3. Na aba de rede do navegador, confirmar um único formato antecipado do hero na home e ausência desse preload nas entradas diretas das páginas internas.
4. Rolar até as seções inferiores, verificar imagens e formulários e testar navegação entre páginas, cotação e WhatsApp.
5. Comparar PageSpeed antes/depois nas mesmas URLs e condições. Confirmar visualmente a troca do conteúdo pré-renderizado em conexão lenta; tempos reais dependem do build, hospedagem, conexão e serviços externos.
