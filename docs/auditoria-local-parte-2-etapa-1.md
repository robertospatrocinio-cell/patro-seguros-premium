# Parte 2 — etapa 1: páginas locais e informações comerciais prioritárias

## Escopo e limites

Revisão estática do repositório, continuando `docs/auditoria-tecnica-parte-1.md`. Foram preservadas as correções da Parte 1, as funcionalidades de cotação e as URLs existentes. Esta entrega corresponde somente à primeira etapa do plano aprovado para o Prompt 2/4; não encerra o Prompt 2 inteiro.

Não houve acesso ao site em navegador, Search Console, Perfil da Empresa, Analytics, diretórios ou relatórios de backlinks. Também não houve execução de build, testes ou scripts nesta sessão. Assim, presença no sitemap não prova publicação, ausência de rota literal não prova 404 e as prioridades abaixo são editoriais/comerciais, não uma estimativa de tráfego.

## 1. Inventário por família

| Família / caminhos | Fontes principais | Decisão preliminar |
|---|---|---|
| `/seguros-guarulhos` e `/seguros-guarulhos/:bairro` | `src/App.tsx`, `src/pages/SegurosGuarulhosBairros.tsx`, `src/lib/bairrosData.ts` | Manter a função de hub; melhorar conteúdo e revisar precedência de rotas |
| `/seguro-auto-{bairro}` e variantes com `-guarulhos` | `src/data/seoLocalAutoPages.ts`, `src/pages/SeoLocalPage.tsx` | Melhorar; avaliar consolidação das variantes com a mesma intenção |
| `seguros-em-{bairro}-guarulhos` e `corretora-de-seguros-em-{bairro}-guarulhos` | `src/data/seoLocalBairrosGuarulhos.ts` | Avaliar consolidação com o hub de cada bairro; confirmar resolução real da rota |
| Residencial, vida e empresarial por bairro | `src/data/seoLocalProdutoBairroPages.ts` | Melhorar; forte risco de repetição pelo gerador compartilhado |
| Planos de saúde por bairro | `src/data/seoLocalSaudePages.ts` | Melhorar; validar rede por produto e não apenas por operadora |
| Produtos e serviços em Guarulhos, modelos e marcas | `src/data/seoLocalAutoPages.ts`, `src/data/seoModelosAutoPages.ts`, páginas `Seo*Guarulhos` | Revisão individual pendente; não confundir modelo de veículo com bairro |
| Cidades próximas | `src/data/cidadesRegiao.ts`, `src/pages/CidadeRegiaoPage.tsx` | Manter URLs até medir demanda e qualidade; revisar especificidade municipal |
| Bairros e produtos de São Paulo | `src/data/segurosSaoPauloRegional.ts`, `src/data/segurosSaoPauloProdutos.ts` | Revisão individual pendente; não classificar como Guarulhos |
| Verticais empresariais, saúde, consórcio e premium com localização | páginas e dados das respectivas verticais | Inventário complementar necessário antes de declarar cobertura total do site |

Foi criado `scripts/audit-local-content.mjs`, que expande fontes de dados locais e candidatos dos sitemaps, registra rotas literais e exporta CSV/JSON para `audit-output/parte-2/`. O script NÃO foi executado nesta sessão; os arquivos de saída ainda não constituem um inventário entregue. Ele é uma ferramenta preliminar, não uma auditoria semântica: as flags exigem revisão humana e os campos de tráfego e backlinks ficam sem valores. A enumeração abaixo cobre os 22 registros do catálogo de bairros; não representa todas as URLs comerciais do site.

## 2. Catálogo de bairros: classificação e prioridade

Todos os caminhos abaixo usam o prefixo `/seguros-guarulhos/`. Intenção comum: orientação e solicitação de cotação multimodal para a área atendida. O componente oferece formulário, WhatsApp, modalidades e bairros relacionados; esses recursos foram preservados. Originalidade, referências geográficas, títulos e conteúdo específico não foram certificados individualmente para os registros ainda pendentes.

| Sufixo | Nome publicado | Prioridade | Classificação / ação |
|---|---|---|---|
| `pimentas` | Pimentas | P0 | Melhorar — conteúdo prioritário corrigido; marcos locais ainda a validar |
| `cumbica` | Cumbica | P1 | Melhorar — validar riscos, referências ao aeroporto e casos comerciais |
| `jardim-maia` | Cidade Maia | P1 | Melhorar — validar distinção Jardim Maia/Cidade Maia, preços e depoimentos |
| `centro` | Centro | P1 | Melhorar — revisar condições comerciais e referências locais |
| `vila-augusta` | Vila Augusta | P1 | Melhorar — validar preços, descontos e afirmações sobre rodovias |
| `bonsucesso` | Bonsucesso | P1 | Melhorar — conferir conteúdo próprio e ligações para produtos |
| `taboao` | Taboão | P1 | Melhorar — revisar preços, guincho e proximidades declaradas |
| `vila-galvao` | Vila Galvão | P1 | Melhorar — corrigido vínculo na geração auto; revisar demais referências |
| `picanco` | Picanço | P1 | Melhorar — validar riscos, preços e exemplos locais |
| `macedo` | Macedo | P1 | Melhorar — validar riscos, preços e exemplos locais |
| `gopouva` | Gopoúva | P1 | Melhorar — validar riscos, preços e exemplos locais |
| `paraventi` | Paraventi | P2 | Melhorar — validar alegações sobre saúde e economia |
| `continental` | Continental | P1 | Melhorar — revisar rede hospitalar e descontos publicados |
| `aeroporto-guarulhos` | Aeroporto de Guarulhos | P2 | Melhorar — área de referência não equivale a bairro ou filial |
| `cidade-industrial-satelite` | Cidade Industrial Satélite | P1 | Melhorar — priorizar atividade empresarial e riscos efetivamente contratáveis |
| `jardim-cumbica` | Jardim Cumbica | P2 | Melhorar — distinguir de Cumbica com utilidade comprovável |
| `vila-rio` | Vila Rio | P2 | Melhorar — validar referências e diferenciação |
| `ponte-grande` | Ponte Grande | P2 | Melhorar — validar referências e diferenciação |
| `agua-chata` | Água Chata | P2 | Melhorar — validar referências e diferenciação |
| `jardim-sao-joao` | Jardim São João | P2 | Melhorar — corrigido vínculo na geração auto; revisar demais referências |
| `cocaia` | Cocaia | P2 | Melhorar — validar referências e diferenciação |
| `jardim-fatima` | Jardim Fátima | P2 | Melhorar — validar referências e diferenciação |

P0 significa risco editorial prioritário, não maior tráfego. P1 significa potencial comercial e/ou risco relevante a revisar. P2 significa revisão subsequente, não autorização para exclusão. Não há recomendação executada de desindexação.

## 3. Correções implementadas

- **Pimentas, catálogo de bairros:** retirada de preços sem documentação de origem, percentuais de roubo/furto, exigência geral de rastreador e resultados atribuídos a clientes sem comprovação encontrada no conteúdo consultado. Retirados também marcos e caracterizações populacionais sem fonte verificada, sem substituir por novas alegações geográficas. Não se afirma que os relatos sejam falsos: ficam pendentes de comprovação e autorização.
- **Pimentas, saúde:** retiradas garantias de hospitais credenciados, faixas de preço e comparações de reajuste sem fundamento apresentado. Diferenciadas contratação empresarial e por adesão; rede deve ser confirmada no produto exato.
- **Pimentas, aplicativo:** esclarecido que EAR na habilitação não substitui a declaração de uso na proposta.
- **Páginas auto geradas por bairro:** retiradas médias de preço, classificação pública de risco, percentuais garantidos de economia, casos repetidos de sucesso e afirmações de cobertura sem brechas. A orientação agora exige comparação de franquias, limites, exclusões e aceitação. Os dados-semente desse gerador também foram limpos: excluídos preços, classificações de risco e referências locais sem fonte, mantendo os 19 slugs existentes e os vínculos geográficos corrigidos. Não houve reaproveitamento dessas alegações como fatos.
- **Coberturas auto compartilhadas:** guincho, carro reserva, vidros e indenização passaram a depender expressamente das condições contratadas. Essa lista também é utilizada por outras configurações do mesmo arquivo.
- **Links geográficos auto:** Pimentas deixa de apontar para Cumbica; Vila Galvão deixa de apontar para Vila Augusta; Jardim São João e Taboão deixam de apontar para Centro.
- **Template local:** removida a obrigação de preencher quantidades mínimas de seguradoras, depoimentos e casos. Listas vazias não produzem seções vazias. Retirada a promessa fixa de resposta em duas horas no CTA desse template.
- **Página compartilhada dos 22 bairros:** retiradas a promessa de cotação em duas horas e a data de atualização que mudava automaticamente todos os dias. O texto inicial informa que área atendida não significa filial; os cards de modalidades orientam a conferir contratação, limites, elegibilidade e rede, sem prometer proteção completa. As demais informações específicas desses bairros continuam sujeitas às pendências da tabela.
- **Dados estruturados dos bairros:** substituída a agência distinta por bairro por um serviço que referencia a agência principal. As coordenadas do bairro ficam na área atendida, não no endereço da sede. Dados oficiais da empresa não foram alterados.

Não foram criadas páginas locais. A reescrita de segurança comercial não torna as páginas automaticamente originais: ainda há orientação compartilhada entre bairros. Não ampliar esse conjunto antes da revisão individual e da análise de demanda.

### Registros auto por bairro revisados nesta etapa

A tabela enumera as 19 configurações existentes do gerador corrigido. Todas conservam sua URL de configuração e intenção de cotação auto; a existência da configuração não certifica que uma rota direta esteja publicada. A orientação de contratação e os links foram revisados, mas a originalidade local continua insuficiente para justificar expansão. Nenhuma página recebe classificação definitiva de “manter sem ajustes”.

| Caminho de configuração | Localidade | Prioridade | Decisão editorial |
|---|---|---|---|
| `/seguro-auto-pimentas` | Pimentas | P0 | Melhorar; analisar consolidação com variante longa |
| `/seguro-auto-pimentas-guarulhos` | Pimentas | P0 | Melhorar; analisar consolidação com variante curta |
| `/seguro-auto-cumbica` | Cumbica | P1 | Melhorar; preservada orientação de uso profissional/frota |
| `/seguro-auto-vila-galvao` | Vila Galvão | P1 | Melhorar; vínculo ao bairro corrigido |
| `/seguro-auto-bonsucesso-guarulhos` | Bonsucesso | P1 | Melhorar; analisar variante `-v2` |
| `/seguro-auto-bonsucesso-guarulhos-v2` | Bonsucesso | P1 | Candidata a consolidar; depende de métricas e aprovação |
| `/seguro-auto-jardim-maia` | Jardim Maia | P1 | Melhorar; validar distinção geográfica em relação a Cidade Maia |
| `/seguro-auto-cidade-maia` | Cidade Maia | P1 | Melhorar; validar correspondência com o hub `jardim-maia` |
| `/seguro-auto-maia-guarulhos` | Maia | P1 | Melhorar; esclarecer recorte e eventual consolidação |
| `/seguro-auto-vila-augusta` | Vila Augusta | P1 | Melhorar; analisar variante longa |
| `/seguro-auto-vila-augusta-guarulhos` | Vila Augusta | P1 | Melhorar; analisar variante curta |
| `/seguro-auto-jardim-sao-joao` | Jardim São João | P2 | Melhorar; vínculo ao bairro corrigido |
| `/seguro-auto-taboao-guarulhos` | Taboão | P1 | Melhorar; vínculo ao bairro corrigido |
| `/seguro-auto-centro-guarulhos` | Centro de Guarulhos | P1 | Melhorar; retiradas alegações de risco/preço |
| `/seguro-auto-paraventi-guarulhos` | Paraventi | P2 | Melhorar; validar utilidade local específica |
| `/seguro-auto-continental-guarulhos` | Continental | P1 | Melhorar; retiradas alegações de risco/preço |
| `/seguro-auto-picanco-guarulhos` | Picanço | P1 | Melhorar; validar utilidade local específica |
| `/seguro-auto-macedo-guarulhos` | Macedo | P1 | Melhorar; validar utilidade local específica |
| `/seguro-auto-gopouva-guarulhos` | Gopouva | P1 | Melhorar; validar utilidade local específica |

Para todos esses registros: FAQ de contratação com seis perguntas, links para seguro auto municipal, hub do bairro e formulário específico; campos de seguradoras, depoimentos e casos vazios até comprovação. Tráfego, conversões, backlinks, posição e acerto geográfico externo não foram medidos. Não há evidência nesta sessão que autorize excluir qualquer uma dessas URLs.

## 4. Consolidação: propostas, não alterações de indexação

| Grupo a analisar | Motivo | Próximo passo antes de decidir destino |
|---|---|---|
| `/seguro-auto-pimentas` e `/seguro-auto-pimentas-guarulhos` | Sobreposição de intenção; rota curta passa configuração da longa | Comparar URLs efetivas, canonical, cliques, links e conversões |
| `/seguro-auto-vila-augusta` e `/seguro-auto-vila-augusta-guarulhos` | Variantes do mesmo produto/local | Conferir resposta real e configuração vencedora |
| Bonsucesso com e sem sufixo `-v2` | Variante técnica sem benefício evidente para o visitante | Confirmar publicação, histórico e backlinks |
| Jardim Maia, Cidade Maia e Maia | Nomenclatura e possível sobreposição geográfica | Validar as localidades com a Patro antes de tratar como equivalentes |
| Hub de bairro e variantes `seguros-em`/`corretora` | Possível disputa pela mesma intenção | Preservar página de produto apenas se resolver necessidade distinta |

Nenhum redirect, canonical, robots ou sitemap foi alterado. A duplicidade de rotas de `/seguros-guarulhos` apontada na Parte 1 continua pendente: há componentes diferentes registrados para caminhos equivalentes; a revisão de produção deve confirmar qual vence e como o prerender se comporta.

## 5. Arquitetura preservada e pontos de ligação

Modalidade auto → página local → outros seguros no bairro → cotação específica de auto. No catálogo de bairros, permanecem links para modalidades, formulário próprio e WhatsApp. Os links corrigidos acima são contextuais, sem criação de nuvem de palavras-chave. A revisão ampliada de home, blog e demais modalidades fica para a próxima etapa aprovada.

## 6. Validações que a Patro precisa fornecer

Documentar origem, data, tamanho da amostra e perfil para qualquer preço ou estatística que deseje republicar. Confirmar seguradora/produto, franquia, limites, exclusões e vigência das condições; não usar desconto individual como promessa geral. Para depoimentos e casos, fornecer registro original, autorização e evidência dos resultados, sem divulgar dados sensíveis. Confirmar marcos, nomes e limites das localidades, especialmente Cidade Maia/Jardim Maia e referências médicas. Outras páginas do catálogo ainda contêm preços, redes e resultados pendentes; este relatório não certifica sua correção.

## 7. Arquivos e testes

Arquivos alterados/criados nesta etapa: `src/data/seoLocalAutoPages.ts`, `src/lib/bairrosData.ts`, `src/components/LocalPageTemplate.tsx`, `src/pages/SeoLocalPage.tsx`, `src/pages/SegurosGuarulhosBairros.tsx`, `scripts/audit-local-content.mjs`, `src/data/localContentSafety.test.ts` e este relatório. Em `SeoLocalPage`, também foram removidos os preenchimentos automáticos de seguradoras, depoimentos e casos genéricos quando a configuração não fornece esses conteúdos; dados explicitamente cadastrados em outras configurações ainda precisam de revisão.

Foi feita inspeção estática das fontes e dos vínculos de rota. Os testes adicionados cobrem as 19 configurações auto por bairro: ausência de preços/percentuais, campos comerciais vazios, FAQ mínimo e limite da descrição. Também conferem vínculos de bairros e, no catálogo de Pimentas, ausência de marcos sem fonte, orientação sobre rede de saúde e declaração de uso profissional/EAR. O inventário automatizado inclui ainda rotas locais literais e corrige o prefixo das páginas de cidades (`/corretora-de-seguros/{cidade}`); ele não substitui a conferência das rotas dinâmicas. **Não foram executados**: rodar a suíte com `npx vitest run src/data/localContentSafety.test.ts`, o inventário com `node scripts/audit-local-content.mjs` e o build habitual do projeto. Confirmar no preview `/seguro-auto-pimentas`, `/seguros-guarulhos/pimentas`, cotação e WhatsApp; validar também os dados estruturados renderizados. Não há resultado de build ou teste aprovado nesta entrega.

## Passagem para as próximas etapas

Esta base permite seguir para revisão comercial ampliada, links e, depois, Google Maps. A auditoria externa do Perfil da Empresa e o processo ético de avaliações ainda não foram realizados. Antes da Parte 3 do projeto, concluir essas etapas e anexar o inventário executado, métricas autorizadas e validações da Patro; não considerar o Prompt 2/4 integralmente concluído.
