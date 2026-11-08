# Pendências da revisão de snippets — etapa 1 de 5

## Status e limites

**Etapa 1: diagnóstico por inspeção do repositório concluído.** A causa da recusa relatada no GitHub ainda não foi identificada: não há nesta sessão mensagem de erro, execução do GitHub Actions, resultado de build ou configuração de proteção da branch disponível.

Esta etapa não altera páginas, títulos, descrições, dependências nem automações. Não desativa testes, não flexibiliza critérios de aprovação e não declara que o GitHub passou a aceitar as alterações. As próximas etapas devem ser iniciadas separadamente, com aprovação do usuário.

## O que foi confirmado

### 1. Os testes recentes dos snippets não têm execução explícita nas automações existentes

- `src/lib/seoMetadata.regression.test.ts` contém a comparação entre os textos das seis páginas comerciais e os metadados estáticos, limites de comprimento, unicidade e endereços canônicos.
- `docs/revisao-snippets-comerciais.md` registra também testes em `src/components/PageMeta.robots.test.tsx`, mas informa que os testes e o build não foram executados naquela revisão.
- `vitest.config.ts` inclui os testes de `src/`; o comando geral `test` de `package.json` executa o Vitest.
- As seis automações em `.github/workflows/` foram inspecionadas. Nenhuma chama o comando geral de testes nem seleciona explicitamente esses dois arquivos. A automação de SEO seleciona outras suítes.

**Pendência para a etapa 2:** incluir a execução direcionada dos testes recentes na automação adequada. A existência dos testes no repositório não comprova que eles passaram nem que causaram a recusa.

### 2. A instalação de dependências varia entre as automações

- `integration-tests.yml` e `fuzz.yml` usam `bun install --frozen-lockfile`.
- `seo-validation.yml` e `performance.yml` usam `bun install` sem essa opção.
- A automação de SEO instala Puppeteer com `bun add -d puppeteer` durante a execução; `package.json` não declara diretamente esse pacote.
- A automação de integração inclui Bun `1.1.34` e `latest`, além de Node 20 e 22. Seu comentário cita `bun.lockb`, mas a árvore fornecida contém `bun.lock`.

**Pendência para a etapa 2:** conferir o passo que realmente falhou antes de mudar versões ou instalação. A diferença é verificável no código; incompatibilidade de versão ou divergência do arquivo de dependências ainda são hipóteses. Não editar manualmente o arquivo de dependências travadas.

### 3. O processo de build declarado contém validações e ações externas

- O `prebuild` de `package.json` declara sincronização de redirecionamentos, geração de imagens e validações de conteúdo e metadados.
- `scripts/validate-meta-limits.mjs` bloqueia títulos acima de 60 caracteres e descrições acima de 155 para páginas não editoriais; artigos de `/blog/` com tipo `article` geram avisos de comprimento, conforme a regra do projeto.
- O `postbuild` declara uma sequência de validações e termina com `scripts/submit-sitemaps-incremental.mjs`.
- Esse script de submissão pode consultar e gravar o histórico no banco e notificar buscadores quando as credenciais exigidas estão presentes. Sem elas, encerra sem submissão.
- A automação de performance também contém uma chamada ao WebPageTest em push para `main`, condicionada à presença de sua chave.

**Pendência para a etapa 2:** separar claramente validação e ações de publicação, preservando os testes de qualidade. Não presumir que houve envio externo: a execução dos comandos e a presença das credenciais não foram verificadas.

### 4. Existe uma automação que faz outro commit no repositório

`cortex.yml`, chamada **Mapa do Projeto**, gera arquivos em `graphify-out/`, cria um commit quando há diferenças e executa `git push`, com permissão declarada de escrita.

**Ponto de diagnóstico:** se a falha relatada estiver no passo **Salva o mapa do projeto**, ela precisa ser analisada como uma falha desse envio, e não automaticamente como erro nos títulos do site. Não foram consultadas permissões efetivas, proteções da branch nem mensagens desse passo; a automação foi preservada.

## Evidência necessária para identificar a recusa

No GitHub, abrir **Actions**, selecionar a execução com falha e enviar o nome da automação, o nome do passo vermelho e a primeira mensagem de erro com as linhas próximas. Não enviar senhas, chaves ou tokens.

Se a recusa acontece antes de aparecer uma execução em Actions, enviar a mensagem exibida ao salvar/enviar as alterações. Se o commit existe e as verificações passaram, mas a tela do Lovable não mudou, enviar o erro de sincronização ou de compilação mostrado no Lovable.

Esses casos são diferentes: recusa do envio, falha de verificação e falha de publicação não devem receber a mesma correção por tentativa.

## Sequência aprovada e pontos de parada

| Etapa | Entrega | Situação |
| --- | --- | --- |
| 1 | Diagnóstico das recusas e inventário das pendências | Inspeção concluída; causa da recusa depende da mensagem de erro |
| 2 | Correções confirmadas e execução automática dos testes dos snippets | Aguardando aprovação para iniciar |
| 3 | Consistência entre páginas, HTML estático e compartilhamento nas seis rotas revisadas | Não iniciada |
| 4 | Revisão de promessas comerciais remanescentes nessas páginas e seus dados estruturados | Não iniciada |
| 5 | Conferência final e acompanhamento com dados do Google | Não iniciada |

Aprovar uma etapa não autoriza executar todas as seguintes no mesmo trabalho. Cada entrega deve distinguir testes preparados de testes executados e registrar dependências externas.

## Pendências preservadas da revisão anterior

- Conferir os metadados no HTML efetivamente publicado e após o carregamento das páginas.
- Verificar a URL canônica e o último rastreamento no Search Console.
- Revisar as afirmações comerciais restantes no conteúdo e nos dados estruturados, sem inventar comprovações.
- Escolher outras páginas para revisão com impressões, consultas, posição e CTR reais, em vez de reescrever todas indiscriminadamente.
- Registrar a publicação e comparar períodos equivalentes de 28 dias, considerando posição, sazonalidade, dispositivo e buscas de marca.

Nenhuma execução de testes, build, consulta ao Google ou correção da recusa é declarada nesta etapa. A entrega é este diagnóstico documentado, sem mudança visual no site.
