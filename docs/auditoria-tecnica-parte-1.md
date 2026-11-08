# PATRO SEGUROS — Auditoria técnica, Parte 1

## Escopo e limites da evidência

Análise estática do repositório `robertospatrocinio-cell/patro-seguros-premium`, branch conectada `main`. Não houve acesso HTTP ao domínio publicado, execução de comandos, navegador, medições de performance nem consulta ao Google Search Console. A existência de integrações com o Google no código não equivale a acesso autorizado aos relatórios privados.

O ambiente de edição não oferece criação de branch nem execução de build/testes. Mudanças de alto impacto em produção ficam pendentes de aprovação e validação em branch de desenvolvimento. Não interpretar esta auditoria como homologação do site publicado.

## 1. Arquitetura identificada

| Camada | Evidência no repositório |
| --- | --- |
| Aplicação | React 18, TypeScript, Vite 5, React Router 6, Tailwind 3 e shadcn/ui (`package.json`). |
| Entrada | `src/main.tsx`, `src/App.tsx`, `index.html`. |
| Roteador efetivo | `<Routes>` em `src/App.tsx`; `src/routes/index.tsx` não é um cadastro de rotas. |
| Backend | Cliente Supabase existente, funções em `supabase/functions/`; nenhuma alteração de banco nesta auditoria. |
| SEO em navegação | `src/components/PageMeta.tsx`, `src/lib/canonical.ts`, módulos de metadados e componentes JSON-LD. |
| HTML inicial | Geração de HTML em `scripts/prerender.mjs`; SSG React com Chromium é opcional (`ENABLE_REACT_SSG=1`). |
| Sitemaps | `scripts/generate-sitemap.ts` no build Vite; `scripts/build-sitemap-index.mjs --dir dist` no postbuild. |
| Publicação | Sincronização automática GitHub → Lovable informada pelo ambiente. Há configuração Apache/LiteSpeed em `public/.htaccess`; isso não prova qual servidor atende o domínio público hoje. |

### Pipeline declarado, não executado nesta sessão

- `prebuild`: sincronização dos redirects, imagens Open Graph, validação de conteúdo e limites de metadados.
- `build`: `vite build`; os plugins existentes também geram sitemap e pré-renderização.
- `postbuild`: guard de pré-renderização, stubs de redirect, índice de sitemaps e diversos validadores.
- Parte dos validadores no plugin Vite é opcional com `ENABLE_BUILD_VALIDATORS=1`; há também validadores no `postbuild`. O comando efetivo utilizado pelo publicador precisa ser confirmado.

## 2. Achados comprovados no código

### A01 — Notificação ao Google usa mecanismos inadequados (prioridade alta, correção pendente)

**Evidência:** `vite.config.ts`, função `googleIndexingPlugin`, envia a URL de `sitemap-index.xml` para `https://indexing.googleapis.com/v3/urlNotifications:publish`. No fallback, chama `https://www.google.com/ping?sitemap=…`, com até três tentativas e timeout de 15 segundos.

**Conclusão:** a Indexing API não é um endpoint de submissão de sitemap para páginas comerciais de seguros; o endpoint de ping de sitemap foi descontinuado. A lógica pode gerar requisições inúteis durante o build. Não há evidência de falha de publicação ou duração efetiva nesta sessão.

**Ação recomendada:** em branch de desenvolvimento, retirar apenas essa notificação inadequada após aprovação; preservar a geração de sitemap e revisar o mecanismo já existente de submissão via Search Console. Não apagar credenciais nem alterar integrações sem aprovação.

### A02 — Pré-renderização React não é obrigatória (risco a validar, prioridade alta)

**Evidência:** `vite.config.ts` executa `scripts/prerender-react.mjs` somente quando `ENABLE_REACT_SSG=1`, e captura falhas sem interromper o build. `PageMeta.tsx` escreve metadados no navegador via `useEffect`.

**Conclusão:** a disponibilidade de conteúdo/metadados iniciais por URL depende da outra camada, `scripts/prerender.mjs`, e dos artefatos em `dist`. Não é correto concluir que todo o site é vazio para rastreadores, nem que todas as rotas já têm HTML completo.

**Validação necessária:** inspecionar HTML de todas as URLs indexáveis em `dist` e amostras publicadas, comparando canonical, title, description, robots, H1 e links antes/depois do JavaScript. Não habilitar SSG global sem validar tempo de build e equivalência de conteúdo.

### A03 — CSS global é convertido para carregamento assíncrono (risco a medir)

**Evidência:** plugin existente `async-non-critical-css` em `vite.config.ts` substitui links de stylesheet por preload com `onload`, mantendo fallback `noscript`.

**Conclusão:** a aplicação depende da suficiência do CSS crítico para a primeira pintura. Pode haver troca de estilo/layout quando o CSS completo chega, mas não foi observado CLS nesta sessão.

**Validação necessária:** teste visual com rede lenta e rastreamento de layout no iPhone/Android/desktop. Não modificar a estratégia de CSS sem medição e aprovação.

## 3. Controles existentes preservados

- `public/robots.txt` permite `/`, `/assets/`, `/images/`, `/fonts/`, `/lp/`, `/blog/` e páginas comerciais locais; restringe áreas administrativas e diagnósticos.
- O arquivo declara `https://www.patroseguros.com.br/sitemap-index.xml`. As permissões específicas de rastreadores de IA foram mantidas integralmente.
- `src/lib/canonical.ts` padroniza HTTPS + www, minúsculas, sem parâmetros/fragmentos e sem barra final, com a home representada pela origem.
- `public/.htaccess` declara redirect 301 de host/protocolo para HTTPS + www. Sua aplicação real depende do servidor.
- A geração principal de sitemap exclui aliases conhecidos e `/contato` e `/cotacao`, que são tratados como formulários não indexáveis. As listas manuais exigem teste de consistência com o roteador.
- Os geradores de sitemap preservam datas anteriores em vez de atualizar tudo a cada build. Datas preservadas ainda precisam de vínculo verificável com alterações editoriais.
- `src/main.tsx` preserva um shell pré-renderizado durante a inicialização e carrega monitoramento e Web Vitals de forma postergada. Isso não comprova aprovação nas métricas.

## 4. Estado das métricas

LCP, INP, CLS, TTFB, peso de imagens, tamanho de bundles e cache efetivamente entregue: **não medidos**. Não foram inventados scores nem dados privados. Os limites de referência para validação são LCP ≤ 2,5 s, INP ≤ 200 ms e CLS ≤ 0,1 no percentil 75, separando mobile e desktop.

## 5. Preservação

Nenhuma mudança de identidade visual, logotipo, texto comercial, URL pública, formulário, integração, regra de IA ou banco foi autorizada como parte de uma migração estrutural. Recomendações de alto impacto não devem ser publicadas automaticamente.

## 6. Inventário de famílias e templates

Este é o inventário arquitetural identificado na árvore e no roteador, não uma contagem homologada de todas as URLs públicas. Arquivos em `src/pages` podem estar sem uso; expressões dinâmicas e slugs exigem expansão para gerar o inventário completo. Não considerar uma página órfã apenas porque ela não está no sitemap.

| Família / exemplos de URLs | Implementação identificada |
| --- | --- |
| Home `/`, institucional `/sobre`, `/servicos`, `/verificar-susep` | Páginas próprias, Header/Footer e componentes compartilhados. |
| Produtos `/seguro-auto`, `/seguro-vida`, `/plano-pet` | Páginas próprias; muitas utilizam `InsurancePageTemplate`. |
| Bairros `/seguros-guarulhos/:slug`, produto × bairro | `SeoLocalPage`, `LocalPageTemplate`, dados `seoLocal*` e `bairrosData`. |
| Cidades `/corretora-de-seguros/:cidade`, estados e cidades nacionais | `CidadeRegiaoPage`, `SeguroRegiaoEstado`, dados regionais. |
| Blog `/blog`, `/blog/:slug`, categoria, autor e cluster | `Blog`, `BlogArticle`, `BlogCategory`, `BlogAuthor`, `BlogCluster` e módulos editoriais. |
| Landing pages | Páginas `Landing*`, `LandingPageTemplate` e páginas empresariais em `src/pages/lp`. O nome do arquivo não determina a URL. |
| Saúde, por exemplo `/plano-de-saude-individual-guarulhos` | `SaudeSubPageTemplate`; também existem páginas que importam `InsurancePageTemplate`. |
| Private `/patro-private`, páginas premium locais | Páginas próprias e `premium/PremiumPageTemplate`. |
| B2B garantia/crédito | Rotas por constantes e arrays; `B2bIntentPageTemplate` e `B2bInsurerPageTemplate`. |
| Guias, perguntas, materiais e comparativos | Rotas literais e parametrizadas; dados específicos por coleção. |
| Seguradoras `/seguradoras/:slug` e páginas locais | `PartnerInsurerPage`, `SeguradoraParceiraSeoPage` e outros templates de seguradoras. |
| Formulários e utilidades | `/cotacao`, `/contato`, `/cotacao/obrigado`, FIPE e suporte. Indexabilidade deve ser verificada individualmente. |
| Administração | `/admin/login`, `/crm` e diagnósticos; não são páginas comerciais indexáveis. |

### Inventário reproduzível adicionado

`npm run audit:technical` lê o roteador real por árvore sintática TypeScript, percorre apenas os sitemaps alcançáveis pelo índice e identifica imports de templates. Salva `inventory.json` e `summary.md` em `audit-output/parte-1/`, sem alterar o site nem acessar o Google.

Para conferir os artefatos de produção já gerados, executar `npm run audit:technical -- --dir dist --html --out audit-output/parte-1-dist`. A opção `--strict` retorna falha se houver achados, para uso após revisar o baseline, não como bloqueio de publicação instalado automaticamente.

O JSON registra URLs declaradas, família estimada, arquivos de sitemap, datas pendentes de comprovação editorial, declarações de rotas com linhas e componentes, duplicidades e imports de templates. Rotas dinâmicas ficam explicitamente como não resolvidas; não são convertidas em URLs inventadas. A opção de HTML confere presença de metadados, canonical, noindex, contagem de H1 e duplicidade de title/description de forma preliminar. Não substitui renderização em navegador, validação completa de HTML ou rastreamento de links.

**Estado:** a rotina foi escrita, mas não executada neste ambiente. Os arquivos de resultado e as contagens totais ainda não foram gerados. O inventário URL por URL permanece pendente de execução e expansão das rotas dinâmicas.

## 7. Outros problemas comprovados e limitações dos verificadores

### A04 — Rotas com o mesmo caminho declaradas mais de uma vez

**Evidência:** em `src/App.tsx`, `/plano-de-saude-guarulhos` aparece tanto com `PlanoSaudeGuarulhosVertical` quanto com `PlanoDeSaudeGuarulhosHub`. `/plano-de-saude-empresarial-guarulhos` aparece com `PlanoSaudeGuarulhosVertical` e `PlanoSaudeEmpresarialGuarulhosCanonical`. Há repetições adicionais de páginas produto × bairro no trecho final do roteador; a rotina de inventário registra as linhas da versão em que for executada.

**Impacto comprovado:** cadastro ambíguo e implementações concorrentes para a mesma URL. Não são duas URLs indexadas por esse motivo. Não foi testado qual conteúdo é servido no domínio.

**Pendência de aprovação:** escolher a implementação comercial correta em desenvolvimento antes de remover duplicatas. Nenhuma URL ou página foi consolidada automaticamente. A nova rotina registra as declarações e os componentes para apoiar essa decisão.

### A05 — Verificador atual de links não cobre todas as rotas reais

**Evidência:** `scripts/check-internal-links.mjs` extrai apenas atributos literais `path="..."` ou `path='...'` por expressão regular. `src/App.tsx` também registra rotas por constantes, arrays e template strings; o verificador ainda ignora os links no próprio App.

**Conclusão:** um resultado negativo nesse script não prova ausência de links quebrados, e URLs válidas criadas por dados podem ser reportadas indevidamente. A rotina adicionada usa análise sintática para distinguir rotas literais e expressões não resolvidas, mas não substitui o verificador de links nem resolve todos os dados dinâmicos.

### A06 — Datas do sitemap não têm comprovação editorial automática completa

**Evidência:** `loadPriorLastmodMap` em `scripts/generate-sitemap.ts` e `loadPublishedLastmod` em `scripts/build-sitemap-index.mjs` reaproveitam datas dos XMLs anteriores. O código examinado não vincula cada data preservada a uma alteração significativa de conteúdo.

**Conclusão:** não há evidência suficiente para afirmar que todas as datas publicadas são válidas ou inválidas. Manter as datas sem alteração nesta etapa; revisar por URL e omitir as que não tiverem fonte verificável em mudança posterior aprovada.

## 8. Alterações e arquivos

Não foram implementadas correções no comportamento público, otimizações sem medição ou mudanças em integrações. Foram adicionados instrumentos de auditoria e o relatório para permitir validação segura antes da Parte 2:

- `docs/auditoria-tecnica-parte-1.md`: relatório, evidências, limites e pendências.
- `scripts/lib/technical-inventory.mjs`: leitura sintática das rotas, duplicidades e imports de templates.
- `scripts/audit-technical-inventory.mjs`: inventário offline de rotas/sitemaps e checagem opcional de HTML já gerado.
- `scripts/lib/technical-inventory.test.mjs`: sete testes para o analisador, sem execução nesta sessão.
- `package.json`: comandos `audit:technical` e `test:technical-inventory`, sem novas dependências e sem alterar o pipeline automático de build.

## 9. Resultados e plano de validação

| Verificação | Resultado nesta sessão / próxima ação |
| --- | --- |
| Leitura de arquitetura, robots, canonical e pipeline | Inspeção estática realizada nos arquivos citados; não é revisão de todas as linhas do repositório. |
| Inventário completo de URLs e páginas órfãs | Pendente. Executar a rotina, expandir rotas dinâmicas e rastrear links renderizados. |
| Build de produção | Não executado: sem terminal disponível. Executar `npm run build` em desenvolvimento; avaliar antes as notificações externas existentes no build. |
| Typecheck | Não executado. Usar TypeScript sem emissão com as configurações da aplicação e dos scripts. |
| Lint | Não executado. Executar `npm run lint`; separar achados novos de problemas preexistentes. |
| Testes novos | Sete casos escritos, zero casos executados. Executar `npm run test:technical-inventory`. |
| Testes existentes | Não executados. Executar `npm test`, testes de integração e Playwright após gerar artefatos. |
| Sitemap, canonical e metadados | Controles existentes identificados, sem resultado de execução. Usar o inventário de `dist` e os validadores já cadastrados. |
| Links e redirects | Não testados por HTTP. Usar o verificador existente com as limitações A05 e confirmar status/destino no domínio. |
| Responsividade e acessibilidade | Não testadas em navegador. Validar teclado, foco, labels, contraste, formulários e overflow em iPhone, Android e desktop. |
| Performance | Sem medições. Coletar métricas de campo autorizadas e testes de laboratório antes de otimizar imagens, fontes, JavaScript ou CSS. |
| Regressão visual e funcional | Não homologada. Nenhum arquivo da interface pública foi alterado. |

## 10. Pendências e passagem para a Parte 2

1. Disponibilizar branch de desenvolvimento e execução de comandos; este ambiente só edita a branch conectada `main`, sincronizada automaticamente com Lovable.
2. Gerar os dois inventários, guardar saídas de build/testes e revisar os achados antes de chamar esta etapa de concluída.
3. Aprovar o tratamento de A01 e a escolha de conteúdo de A04; preservar URLs e testar redirecionamentos sem consolidar páginas por semelhança de nome.
4. Confirmar servidor, comando de publicação, status HTTP, host/protocolo, cache e HTML entregue. A presença de `.htaccess` não comprova sua aplicação.
5. Usar Search Console, CrUX e PageSpeed somente com acesso disponível e autorizado; não solicitar nem versionar senhas, tokens ou chaves.
6. Na Parte 2, usar este relatório como baseline **estático e parcial**, junto dos inventários e resultados que ainda precisam ser executados. Não transportar números ou conclusões de aprovação inexistentes.

**Critério de conclusão:** problemas prioritários identificados foram registrados como pendências justificadas; a auditoria completa, os testes e a homologação permanecem pendentes. Nenhuma melhoria de ranking, velocidade ou indexação foi comprovada nesta sessão.
