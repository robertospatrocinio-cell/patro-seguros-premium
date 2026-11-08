# Prompt 3/4 — GEO e AEO: relatório consolidado para a Parte 4

## 1. Estado e alcance da entrega

Etapa 2 implementada no repositório: revisão das marcações institucionais e de artigos, saneamento de llms.txt/llms-full.txt, complemento de confiança na Central de Perguntas e rotina de acompanhamento preparada. A etapa 1 está documentada em `docs/geo-aeo-parte-3-etapa-1.md`: 84 respostas em 12 modalidades, referências e paridade do FAQ com o conteúdo. Não foram criados novos artigos, casos, depoimentos ou resultados comerciais.

**Limite essencial:** análise estática de código, não auditoria do domínio publicado. Sem terminal, navegador, acesso HTTP, validadores externos ou contas privadas nesta sessão. Build, testes, marcações renderizadas e indexação NÃO foram validados por execução. O critério de dados estruturados validados permanece pendente; a entrega não deve ser rotulada como homologação de GEO. Não há resultados medidos de presença em IA, cliques ou conversões.

Bases herdadas: `docs/auditoria-tecnica-parte-1.md`, `docs/auditoria-local-parte-2-etapa-2.md`, `docs/auditoria-local-parte-2-etapa-3.md` e relatório da etapa 1. Suas pendências não são consideradas resolvidas por este documento. Nenhum formato, arquivo ou tipo Schema.org garante citações, posição ou resultados enriquecidos.

## 2. Diagnóstico consolidado

| Dimensão | Evidência / intervenção | Limite ou próximo passo |
| --- | --- | --- |
| Clareza e utilidade | Central existente com cobertura, exclusões, preço, limites, documentos, adicionais e cotação nas 12 modalidades | Seleção editorial, não pesquisa de volume nem histórico de dúvidas reais do atendimento |
| Originalidade | Critérios de decisão e distinções técnicas, sem inventar casos | Incorporar conhecimento comercial documentado e aprovado por responsável real |
| Organização e navegação | Central/categorias ligadas a produtos; índice de IA passa a apontar às perguntas revisadas | Não certifica todos os links, aliases ou o catálogo por bairro |
| Confiança | Dados da configuração EMPRESA, consulta SUSEP, Sobre, Contato e Privacidade | Razão social, CNPJ, registro, endereço e perfis precisam de conferência externa |
| Acesso público | Respostas em módulos locais, sem login; rotas dinâmicas existentes | Conferir conteúdo inicial e renderizado, teclado e experiência móvel |
| Semântica | InsuranceAgency/Organization institucionais, Service por contexto, BlogPosting no blog | Auditar saída final por URL; presença do tipo não implica elegibilidade |
| Consistência | Correção de LinkedIn, identificadores, autor e endereço de fallback; remoção de alegações divergentes dos arquivos de IA | Permanecem múltiplas fontes estáticas e dinâmicas: os novos testes vigiam parte dessa divergência |
| Descoberta | robots permite conteúdo público, sitemap declarado, arquivos complementares corrigidos | Permissão não comprova acesso; verificar CDN, servidor, status HTTP e logs autorizados |

## 3. Auditoria e correções dos dados estruturados

| Tipo / emissão examinada | Achado e ação | Situação |
| --- | --- | --- |
| Organization | Nó estático em `index.html`, `#organization`; componente React é no-op. Substituído `additionalProperty` por `identifier` com PropertyValue para CNPJ/SUSEP, apropriado à identificação da organização | Dados comparáveis à configuração; registros externos não consultados |
| InsuranceAgency | Nó estático em `index.html`, `#insurance-agency`; componente React evita reemissão quando encontra o marcador estático. LinkedIn estático divergente alinhado à configuração | Fallback React recebe CNPJ, SUSEP, mapa e endereço completo via NAP_STREET_ADDRESS; retirado priceRange tanto do nó estático quanto do fallback React, sem preço comprovado |
| Relação dos nós | Dois IDs institucionais existentes, usados por referências distintas no site | Preservados para compatibilidade; ambos descrevem a Patro, não duas filiais. Não consolidar IDs sem mapear referências e validar a saída |
| BreadcrumbList | `BreadcrumbSchema` sanitiza itens, URLs absolutas, posição e destino final; `PageMeta` gera fallback | Etapa 1 suprimiu duplicação na categoria de FAQ. Paridade com breadcrumb visível e demais templates exige teste por rota |
| Article / BlogPosting | `BlogArticle` realmente chama `ArticleSchema`; BlogPosting é subtipo de Article, não precisa de um segundo bloco Article | Título não é mais truncado no schema; mantidas datas fornecidas pelo conteúdo, sem atualização automática |
| Autor de artigo | Redes institucionais e página Sobre estavam em sameAs da pessoa; jobTitle SUSEP era atribuído automaticamente | Removidas essas equivalências e cargo automático; vínculo worksFor usa o ID da empresa. Credencial só segue se explicitamente fornecida; não foi atribuído registro empresarial ao autor |
| Imagem de autor | Concatenação do domínio com imagem poderia produzir URL inválida quando a imagem já era absoluta | Resolução passa por new URL com base canônica, compatível com caminhos locais e URLs absolutas |
| Service | `ServiceSchema` usa rota canônica, provedor e área regional/nacional; semanticamente pertinente à corretagem | Preservado; área atendida não representa filial nem cobertura garantida de produto |
| Saúde | Apesar do nome `MedicalOrganizationSchema`, o arquivo emite Service de corretagem, não estabelecimento médico | Preservado; não adicionada alegação de atendimento clínico. Conferir duplicidade entre serviços dos templates |
| FAQPage | Etapa 1 usa a mesma fonte das respostas visíveis | Não tratado como rich result disponível à corretora nem habilitação de resposta em IA |
| Avaliações | Sem aggregateRating/review nos nós institucionais estáticos examinados; AggregateRatingSchema e LocalBusinessSchema são no-op | Não adicionadas estrelas. Comentários legados sobre avaliações nesses arquivos não são evidência de emissão; restante do acervo/prerender exige varredura |
| Speakable e WebSite | ArticleSchema contém speakable e template estático contém SearchAction | Preservados, sem alegação de suporte a IA ou rich result. Verificar se destino de busca realmente funciona antes de manter SearchAction como descrição funcional |

Propriedades válidas de Schema.org não significam recursos oficialmente suportados pelo Google. Organization/InsuranceAgency identificam a entidade, Service descreve o serviço; o Google não oferece necessariamente apresentação enriquecida genérica desses tipos. Avaliações da própria empresa não devem ser usadas para tentar obter estrelas. FAQPage, HowTo e speakable não são atalhos para presença em respostas de IA.

**Conferência final dos validadores locais:** `jsonld-validator.mjs` ainda rejeitava títulos de Article acima de 110 caracteres e `rich-results-checkers.mjs` emitia o mesmo aviso, incompatível com preservar o título editorial completo. Retirado esse limite artificial nos dois validadores; título vazio continua sendo erro. O segundo também recomendava priceRange de modo universal: retirada essa cobrança de campo opcional sem faixa de preço comprovada, evitando que ela bloqueie a publicação em modo estrito. Acrescentadas regressões específicas, não executadas. Isso não transforma os demais pareceres desses scripts em aprovação oficial do Google; seus rótulos de elegibilidade e suporte precisam ser interpretados com a documentação vigente.

**Fallback legado de publicação:** `scripts/ensure-prerender.mjs` ainda possui uma injeção emergencial de InsuranceAgency com priceRange `$$`, ativada se o nó institucional desaparecer do template. Não foi alterado o pipeline nesta etapa; o template normal contém o nó revisado. Na Parte 4, conferir se a injeção emergencial foi acionada e alinhar suas fontes antes de tratar o HTML gerado como equivalente ao código React.

**Autoria e datas:** `BlogArticle` mostra autor, data e atualização quando fornecida pelo conteúdo; isso não comprova participação humana. `blogAuthors` contém biografias e expertise preexistentes, não certificadas nesta revisão. Confirmar autorização, habilitação pessoal e evidência de revisão; não trocar datas em massa nem acrescentar reviewedBy sem revisão real. A nova rotina não declara todo o blog revisado.

## 4. Sinais de confiança na interface

Na Central de Perguntas e nas 12 categorias prioritárias, “Como usar estas respostas” agora também apresenta sede, telefone clicável, e-mail e horário provenientes de EMPRESA/NAP. Explica que atendimento digital em outras regiões não equivale a filiais. Preservados os links de Sobre, consulta de registro, correção/esclarecimento e Privacidade e o cuidado com documentos pessoais.

Nenhum dado cadastral foi inventado ou alterado: o texto diz “cadastrado”, não “verificado oficialmente”. A configuração ainda contém métricas comerciais e descrições de experiência preexistentes que exigem documentação; esta etapa não as certifica nem replica nos arquivos de IA. Sem responsável técnico designado, não se publica assinatura ou data fictícia de revisão.

## 5. llms.txt e llms-full.txt

Revisão integral dos dois arquivos, reduzindo o espelho comercial divergente a índice e notas complementares. Foram retiradas tabelas de preço sem fonte, descontos, prazos universais, promessas de economia, estatísticas sem evidência e afirmações de que Speakable/FAQ habilitam AI Overviews ou Gemini. O antigo horário de 9h foi alinhado ao cadastro de 8h30; Privacidade usa `/politica-privacidade` em vez do alias.

O índice agora prioriza a central e suas 12 categorias e descreve as modalidades sem garantir cobertura ou disponibilidade. Inclui drone agrícola e RETA separadamente. Remove títulos de artigos, prévias e aliases desnecessários do índice reduzido, sem excluir essas páginas do site. Contato e Cotação permanecem identificados como atendimento, não como páginas editoriais indexáveis. Links seguem o host HTTPS+www e a convenção sem barra final adotada pelo projeto; home usa a origem.

Rotas-chave confirmadas no cadastro de App.tsx e categorias herdadas da fonte da etapa 1; isso não equivale a confirmação HTTP ou inventário completo de canônicas. Os testes preparados verificam links das 12 categorias, identidade e padrões de URL, não status, redirecionamentos nem todos os destinos. Os arquivos são públicos e complementares: não requisito oficial de indexação, não mecanismo de instrução para favorecer a marca e não prova de presença em IA.

## 6. Configurações de descoberta analisadas

- `public/robots.txt`: grupo compartilhado permite `/` e recursos de renderização para mecanismos tradicionais, busca/consulta por IA e agentes de treinamento; mantém restrições administrativas. CCBot, Bytespider, MJ12bot e DotBot têm bloqueios específicos preexistentes. Nenhuma regra foi alterada ou bloqueio ampliado nesta etapa.
- Busca, consulta por usuário e treinamento são finalidades distintas. Google-Extended não é o controle de indexação do Google Search; GPTBot não equivale a OAI-SearchBot. A política atual permite ambos os usos nos caminhos públicos. Qualquer mudança futura deve separar finalidades, com decisão da empresa e revisão da documentação oficial vigente, não bloqueio indiscriminado.
- Robots não é controle de acesso e Disallow não assegura desindexação. Áreas privadas precisam continuar protegidas pela autenticação; não foram modificadas permissões de banco ou login.
- `PageMeta`: canonical e robots em efeito React; preview/dev recebe noindex,nofollow, formulários podem receber noindex,follow. Não remover a proteção do preview para buscar citações. Conferir domínio publicado antes de diagnosticar bloqueio.
- `public/_headers`: regras locais de cache/segurança e robots text/plain; sua presença não comprova aplicação pelo servidor. Conferir MIME e status 200 dos dois arquivos de IA e se não caem no fallback HTML da SPA. Sem alteração de cabeçalhos nesta etapa.
- Sitemap, .htaccess, geração e pré-renderização: riscos herdados da Parte 1, não revalidados nesta sessão. Permanecem pendentes HTML inicial completo, rotas duplicadas, submissão inadequada à Indexing API/ping descontinuado e lastmod sem vínculo editorial comprovado. Não alterados plugins, credenciais ou mecanismo de publicação.

Referências oficiais para a conferência externa: [Google e recursos de IA](https://developers.google.com/search/docs/appearance/ai-features), [dados estruturados](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data), [Article](https://developers.google.com/search/docs/appearance/structured-data/article), [FAQ](https://developers.google.com/search/docs/appearance/structured-data/faqpage), [robôs OpenAI](https://platform.openai.com/docs/bots), [Google-Extended](https://developers.google.com/search/docs/crawling-indexing/overview-google-crawlers#google-extended). Links não acessados nesta sessão; consultar versões vigentes e guardar evidência antes de decisões de publicação.

## 7. Rotina de mensuração preparada

Registro vazio, sem resultados simulados: `docs/geo-acompanhamento-ia.csv`. Copiar para planilha local ou área privada; não versionar capturas com nome de conta, dados pessoais, tokens ou conversas de clientes. Responsável pela coleta e responsável pela revisão devem ser designados pela Patro; nenhum nome foi presumido.

**Protocolo:** baseline após validar a publicação; repetir mensalmente e após alteração relevante de conteúdo, anotando versão do site. Usar ChatGPT com busca, Gemini com pesquisa/fontes quando disponível, Google Search (registrar AI Overview ou AI Mode separadamente se apresentados) e opcionalmente Bing/Copilot. Sem recurso disponível, registrar indisponibilidade, não ausência da marca. Usar somente interfaces e recursos oficiais disponíveis, sem assinatura paga ou automação contrária às condições de uso.

Em cada rodada, executar as 12 perguntas abaixo sem alterações, pt-BR, localização declarada Guarulhos/SP, conversa nova e sem induzir a resposta citando a marca. Registrar login/personalização de forma genérica, modelo/produto, modo de busca e horário com fuso. Não inserir dados reais de clientes. Fazer duas repetições independentes por pergunta/plataforma e guardar respostas divergentes; não selecionar só resultados favoráveis. Consultas de marca são uma série separada, nunca misturadas à descoberta não induzida.

| ID | Pergunta literal da série principal |
| --- | --- |
| Q01 | O que comparar nas coberturas, franquias e limites de um seguro auto para quem mora em Guarulhos? |
| Q02 | Quem dirige para Uber e 99 em Guarulhos precisa declarar esse uso no seguro e o que deve conferir na proposta? |
| Q03 | Qual é a diferença entre acidentes pessoais de passageiros e responsabilidade civil no seguro de um carro? |
| Q04 | Como escolher limites de danos materiais, corporais e morais a terceiros no seguro auto? |
| Q05 | Quais coberturas, exclusões e documentos uma pequena empresa deve analisar ao cotar seguro empresarial? |
| Q06 | Como separar as responsabilidades do proprietário e do ocupante ao contratar seguro de um galpão em Guarulhos? |
| Q07 | O que uma PME de Guarulhos deve conferir sobre elegibilidade, rede, carências e reajustes de um plano de saúde? |
| Q08 | Quais eventos de água, furto e danos elétricos precisam ser conferidos antes de contratar seguro residencial? |
| Q09 | Como avaliar o capital e as garantias de um seguro de vida sem usar um valor igual para todas as famílias? |
| Q10 | Quais dados da operação e limites de cobertura devem ser comparados em uma cotação de seguro de frota? |
| Q11 | Qual é a diferença entre seguro de casco, RETA e cobertura de deriva para um drone agrícola? |
| Q12 | O que conferir sobre operação, transporte e quebra mecânica no seguro de máquinas agrícolas? |

Essas são perguntas de monitoramento editorial, não consultas com demanda comprovada. A matriz de conteúdo da etapa 1 cobre também fatores de preço, documentos e pedido de cotação em todas as modalidades. Uma série secundária pode reutilizar literalmente essas perguntas publicadas; registrar seu texto e novo ID antes da coleta, sem alterar o baseline retrospectivamente.

### Registro e interpretação

Cada linha do CSV é uma observação de pergunta/plataforma/repetição. `id_coleta` identifica rodada e repetição; `data_hora_iso` deve incluir deslocamento de fuso. `presenca_patro`: sim, não ou não observável. `tipo_mencao`: sem menção, menção sem link, link em fonte ou citação no texto com fonte. Guardar pergunta literal, fonte citada, URL exatamente apresentada, canônica confirmada separadamente, concorrentes como exibidos, evidência local e observações. Se houver várias fontes, usar linhas adicionais com o mesmo id_coleta; deduplicar esse ID ao calcular taxas. URL abreviada, quebrada, redirecionada ou afirmação incorreta deve ser anotada, não corrigida silenciosamente no registro.

| Medida | Fonte e interpretação |
| --- | --- |
| Presença da marca | Observação manual da resposta; nome sem link é menção, não citação comprovada |
| Citação/link | Fonte atribuída à Patro com URL registrada; conferir destino e contexto. Não prova tráfego |
| Impressões | Métrica de exposição no relatório oficial disponível; não inferir de uma consulta manual |
| Cliques | Search Console, Bing Webmaster Tools ou analytics conforme acesso autorizado. Clique e sessão têm definições diferentes |
| Conversões | Eventos já configurados, como envio concluído ou clique em WhatsApp, apresentados separadamente. Clique no WhatsApp não é venda nem contato efetivo comprovado |

No fechamento mensal: proporção de observações válidas com menção e com citação, denominadores por plataforma/pergunta, erros de fonte e concorrentes recorrentes. Excluir indisponibilidades do denominador e reportá-las. Isso é uma amostra descritiva, não participação de mercado ou posição garantida. Comparar coletas com condições semelhantes; mudanças de modelo, localização ou personalização quebram comparabilidade.

Quando houver autorização, exportar Search Console por período, consulta, página, dispositivo e país, registrando filtros e atrasos. Recursos de IA do Google podem ser agregados ao desempenho de pesquisa Web; não inventar separação por AI Overview/AI Mode se ela não estiver disponível no relatório oficial. Usar também inspeção de URL, indexação e sitemaps para descoberta, sem confundir indexação com citação. No Bing Webmaster Tools, usar relatórios oficiais de pesquisa e de desempenho em IA se a conta disponibilizar, preservando a definição e cobertura do relatório. Não presumir acesso a esses recursos.

Analytics existente pode mostrar referências identificáveis de plataformas; referências ausentes, apps e redirecionamentos causam subatribuição. Registrar fonte/meio e página de entrada, respeitando consentimento. Não classificar tráfego direto como IA nem acrescentar parâmetros aos links dos rastreadores. Não criar um número agregado misturando citações, impressões, cliques e conversões. Nenhum painel, acesso de conta, credencial ou integração nova foi configurado nesta etapa.

## 8. Arquivos e resultados das verificações

Arquivos alterados nesta etapa:

- `index.html`: LinkedIn de InsuranceAgency, retirada de faixa de preço presumida e identificadores de Organization.
- `src/components/InsuranceAgencySchema.tsx`: identificação e NAP do fallback React.
- `src/components/ArticleSchema.tsx`: título integral, vínculo institucional e retirada de credencial automática.
- `src/pages/BlogArticle.tsx`: identidade de autor e resolução de imagem absoluta.
- `src/components/FaqEditorialContext.tsx`: sede e canais visíveis nas páginas prioritárias.
- `public/llms.txt` e `public/llms-full.txt`: índice e notas saneados.
- `src/test/geo-aeo-discovery.test.tsx`: seis testes preparados de identidade, URLs das categorias, alegações, robots e BlogPosting; leitura de arquivos com URL do Node para compatibilidade com o ambiente de testes.
- `scripts/lib/jsonld-validator.mjs` e `scripts/lib/rich-results-checkers.mjs`: retirada do limite artificial de título de Article; no segundo, retirada da recomendação universal de faixa de preço.
- `scripts/lib/jsonld-validator.test.mjs`: regressão atualizada para aceitar título editorial longo.
- `scripts/lib/rich-results-checkers.test.mjs`: duas regressões adicionais para título completo e ausência de faixa de preço presumida.
- `docs/geo-acompanhamento-ia.csv`: modelo vazio de coleta, sem resultados fabricados.
- `docs/geo-aeo-parte-3-relatorio-final.md`: este fechamento e repasse para a Parte 4.

Não alterados: banco, dependências, rotas, formulários, tema, regras de robôs, sitemap ou pipeline de publicação.

| Verificação | Resultado efetivo nesta sessão |
| --- | --- |
| Leitura dos nós institucionais estáticos e componentes listados | Realizada; divergências descritas acima corrigidas no código, sem homologação do HTML final |
| Leitura de llms e rotas-chave | Realizada; links prioritários alinhados ao cadastro, sem requisições HTTP |
| Testes adicionados | Escritos, zero executados; não há resultado aprovado |
| Testes da etapa 1 e suites existentes | Não executados |
| TypeScript, lint e build | Não executados; nenhuma afirmação de compilação bem-sucedida |
| Schema.org Validator / Google Rich Results Test | Não acessados; validação externa pendente |
| Preview, teclado, mobile, status e renderização | Não testados em navegador |
| Presença em IA e métricas de conta | Não coletadas; CSV deliberadamente vazio |

### Roteiro de validação antes da homologação

1. Executar `npx vitest run src/test/geo-aeo-discovery.test.tsx src/data/perguntasPrioritarias.test.tsx scripts/lib/rich-results-checkers.test.mjs`, `npm run test:jsonld`, `npm run test:canonical`, typecheck e lint. Separar falhas novas de legadas; os testes novos são regressões específicas, não certificação de todo o site.
2. Executar o build habitual em ambiente controlado, considerando as notificações externas preexistentes documentadas na Parte 1. Guardar logs completos. Rodar os validadores existentes de JSON-LD, unicidade, breadcrumbs, canônicas e sitemap sobre os artefatos reais. Não instalar novo bloqueio no build sem revisar o baseline.
3. Inspecionar HTML inicial e renderizado de home, Sobre, produto auto, saúde PME, galpão, drone, máquinas, central, categoria e artigo. Conferir conteúdo, IDs, referências, duplicidades, metadados, links e datas contra o texto visível. Conteúdo do repositório não comprova HTML recebido pelo rastreador.
4. Submeter essas amostras ao Schema.org Validator e Google Rich Results Test. Registrar URL/HTML, versão do site, data, ferramenta e erros/avisos. Ausência de Service ou InsuranceAgency no relatório de rich results não é por si erro Schema.org; aprovação sintática também não garante exibição.
5. No domínio publicado, conferir status, MIME e corpo de robots, sitemaps e llms; host canônico, redirects, cache e eventuais desafios de CDN. Confirmar que conteúdo público não pede login. O preview deve continuar não indexável. Verificar o bloco “Como usar estas respostas” na central e categorias em tela pequena e por teclado.
6. Conferir dados empresariais e perfis com os responsáveis e fontes oficiais. Para informações técnicas, anexar documento efetivamente analisado, versão, trecho, pessoa responsável e data real; portais gerais não comprovam cláusulas de produtos. Não publicar dados pessoais ou documentos de clientes como evidência.

## 9. Repasse operacional para a Parte 4

| Prioridade | Ação / responsável a designar | Evidência de aceite |
| --- | --- | --- |
| Alta | Equipe técnica: executar testes/build e validar HTML/JSON-LD publicado | Logs e resultados por URL; nenhum erro novo não resolvido |
| Alta | Direção e responsável técnico real: confirmar cadastro, biografias, números comerciais e conteúdo | Fontes oficiais/documentos aprovados e data real de conferência |
| Alta | Equipe técnica: tratar riscos herdados da Parte 1 com aprovação | HTML inicial, inventário, rotas duplicadas e submissão de sitemap revisados sem perda de URLs |
| Média | Atendimento: confirmar quais perguntas surgem no trabalho comercial, sem expor clientes | Registro agregado de dúvidas e revisão das respostas prioritárias |
| Média | Marketing: iniciar baseline de IA e exportações oficiais autorizadas | CSV preenchido com evidências, condições de coleta e métricas separadas |
| Contínua | Revisão editorial após mudança regulatória/produto | Documento-fonte, responsável e alteração significativa, sem datas artificiais |

Para iniciar a Parte 4, usar este relatório junto da etapa 1 e das auditorias anteriores como baseline de **código revisado e validações pendentes**, não de desempenho comprovado. A implementação desta etapa está entregue; o aceite externo dos dados estruturados e a comprovação de descoberta continuam condicionados às verificações acima. Não foi contratada ferramenta paga nem aplicada técnica de manipulação de respostas.
