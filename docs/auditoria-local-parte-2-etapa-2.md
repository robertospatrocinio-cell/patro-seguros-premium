# Parte 2 — Etapa 2: revisão comercial ampliada e links

## Escopo e limites

Continuação de `docs/auditoria-local-parte-2-etapa-1.md`, preservando a revisão de auto/Pimentas e as correções técnicas da Parte 1. Esta etapa revisa os catálogos locais de saúde, residencial, vida e empresarial, a fonte prioritária de Cumbica, a configuração efetiva de galpão em Guarulhos e a página geral de seguro residencial com seu comparativo.

Não foram criadas rotas, filiais, ofertas, preços ou depoimentos. Não houve alteração de canonical, indexação, sitemap, redirecionamentos, contatos oficiais ou banco. A revisão não comprova a disponibilidade comercial de produtos: essa confirmação continua sendo feita na proposta. Google Maps, diretórios, contatos e solicitação de avaliações pertencem à próxima etapa, não executada aqui.

## Inventário complementar e prioridade comercial

O inventário geral da etapa anterior permanece válido. Nesta etapa há **31 configurações locais distintas revisadas**, além da página `/seguro-residencial` e seu comparativo. O catálogo de produto × bairro conserva suas 12 entradas e suas exclusões; não se preenchem automaticamente outras combinações, mesmo que existam rotas declaradas. O catálogo complementar conserva 19 entradas. Cumbica e galpão exigiram correção também em `seoLocalPages`, porque essa fonte tem precedência tanto na página quanto no resolvedor de metadados.

| Grupo | URLs/configurações nesta etapa | Prioridade e decisão |
| --- | --- | --- |
| Saúde por bairro | `/plano-saude-centro-guarulhos`, `/plano-saude-cidade-maia`, `/plano-saude-picanco`, `/plano-saude-vila-augusta`, `/plano-saude-taboao-guarulhos`, `/plano-saude-macedo-guarulhos`, `/plano-saude-gopouva-guarulhos` | Alta: melhorar; retiradas referências de rede/preço/estatísticas sem documentação |
| Residencial por bairro | Cidade Maia, Cumbica, Centro, Vila Augusta, Jardim Maia, Bonsucesso, Pimentas, Taboão, Macedo, Gopoúva e Picanço, nos slugs existentes `seguro-residencial-*` | Alta: melhorar condições e caminho para cotação; utilidade local ainda precisa de comprovação individual |
| Empresarial por bairro | Cumbica, Bonsucesso, Pimentas, Taboão, Macedo, Gopoúva e Picanço, nos slugs existentes `seguro-empresarial-*` | Alta: melhorar; Cumbica tratado na fonte que realmente é publicada |
| Vida por bairro | `/seguro-vida-cumbica`, `/seguro-vida-bonsucesso`, `/seguro-vida-pimentas`, `/seguro-vida-macedo-guarulhos`, `/seguro-vida-picanco-guarulhos` | Média/alta: melhorar; regras de capital, beneficiários, carência e reajuste sem promessa de preço congelado |
| Galpão | `/seguro-galpao-guarulhos` | Alta: melhorar configuração efetiva; não publica estatísticas, casos e descontos do texto legado |
| Residencial geral | `/seguro-residencial`, seção de comparação entre casa, apartamento e flat | Alta: manter e melhorar; removidos valores mínimos e apresentação de pacotes universais |

As combinações excluídas no catálogo de produto × bairro não foram auditadas como se fossem páginas ativas deste catálogo. Uma rota declarada não prova que exista configuração válida nem que ela ganhe de uma rota anterior. As duplicidades de roteamento detectadas na Parte 1 continuam pendentes de tratamento específico.

## Conteúdos corrigidos

- Substituídas estimativas sem referência e descontos percentuais por fatores concretos de cotação; não há tabela de preços de bairro nas configurações revisadas.
- Retirados casos, relatos, números de carteira e listas de seguradoras sem documentação dos conteúdos efetivamente revisados. Listas vazias não são preenchidas com prova social genérica.
- Saúde: rede deve ser confirmada no produto, unidade e atendimento exatos; proximidade não prova credenciamento. Elegibilidade, coparticipação, portabilidade, carência e reajustes precisam ser comparados.
- Residencial: separados construção, conteúdo e responsabilidade civil; esclarecidas diferenças entre assistência e indenização, uso temporário, seguro do condomínio, furto e eventos de água.
- Vida: coberturas não são intercambiáveis; doenças graves, invalidez e diárias dependem de critérios próprios. Beneficiários, capital, prazo e reajustes exigem leitura da proposta.
- Empresarial/galpão: declarados atividade, ocupação, estoques e interesses de terceiros; transporte, armazenagem e RC não são automaticamente equivalentes. Lucros cessantes não indeniza qualquer paralisação.
- Comparativo residencial: retirados preços de entrada, prazo de retorno e marcações que apresentavam coberturas como incluídas em qualquer produto. Mantidos os três tipos de imóvel e os botões de cotação com rastreamento.
- Preservados formulário residencial, campos de uso/CEP/bens, links de cotação, saída assistida e trilha de recomendações. Os intervalos monetários do campo de bens são valores informados pelo visitante, não preço do seguro.
- Linguagem revisada nos trechos substituídos; a revisão de português/anglicismos do restante do acervo não é declarada concluída.

## Arquitetura de links implementada

1. Página local revisada → modalidade em Guarulhos → avaliação das condições gerais.
2. Página local → hub do bairro com ID existente, quando a correspondência é inequívoca → outras necessidades no mesmo local.
3. Cidade Maia → hub geral de bairros: não é automaticamente encaminhada a Jardim Maia.
4. Página local → `/cotacao?tipo=residencial|vida|empresarial|saude`, conforme o produto.
5. Saúde local → `/comparativo-planos-saude-guarulhos` → comparação antes do envio dos dados.
6. Residencial geral → hub de bairros, flat, condomínio, fiança e orientação para comparar seguradoras; → blog para leitura; → cotação residencial para ação.
7. Galpão em Guarulhos → galpões industriais, empresarial em Cumbica, empresarial em Guarulhos, hub de bairros e cotação empresarial.

Não se adicionam listas massivas de bairros na home nem links cruzados apenas para distribuir palavras-chave. A home e a navegação existentes permanecem preservadas. O link ao blog é de descoberta; artigos individuais só devem ser promovidos como referência comercial depois de revisados.

## Pendências de validação e decisões de consolidação

| Prioridade | O que a Patro precisa confirmar | Evidência para publicar ou decidir |
| --- | --- | --- |
| P0 | Produtos, seguradoras e disponibilidade por modalidade | Produto exato, condições vigentes, canal oficial e data de verificação; não usar lista genérica de parceiros como oferta confirmada |
| P0 | Valores e descontos em outras páginas e artigos | Fonte, data, validade, perfil, capital, franquia, limites e exclusões; retirar se não houver suporte |
| P0 | Casos e estatísticas ainda presentes no acervo | Registro comprovável, período, denominador, critérios e autorização de uso quando necessária |
| P0 | Prazos de retorno, vistoria grátis e plantão prometidos fora do escopo revisado | Processo operacional aprovado e condições de atendimento documentadas |
| P0 | Rede de saúde | Operadora, produto/registro, unidade, atendimento, fonte oficial e data; não reutilizar rede de um plano em outro |
| P1 | Conteúdo próprio e demanda para cada página de bairro | Consultas reais, dúvidas locais documentadas, dados oficiais e utilidade distinta; não inventar fatos para diferenciar páginas |
| P1 | Tráfego, conversões e backlinks por URL | Exportação autorizada de Search Console/analytics e análise de links; prioridade aqui é editorial/comercial, não ranking medido |
| P1 | Consolidação das famílias repetitivas | Comparar demanda, desempenho, conteúdo e destino; apresentar proposta de redirecionamento/desindexação para aprovação antes de executar |
| P1 | Outros catálogos locais em `seoLocalAutoPages.ts` e páginas dedicadas | Conferir resolução efetiva e revisar MEI/PME/familiar, galpão Cumbica, frota, transporte e demais configurações; esta etapa não certifica essas ofertas |
| P1 | Conteúdo estático de prerender e artigos de blog | Conferir paridade com a página React; os blocos de `scripts/seo-content-full.mjs` e o acervo editorial não foram integralmente revisados |
| P2 | Catálogo local e rotas sobrepostas | Validar inventário técnico anterior, metadados e comportamento publicado antes de remover qualquer declaração |

**Decisão de indexação:** manter o estado atual das URLs; melhorar segurança comercial agora. Os textos compartilhados são orientação por produto, não prova de originalidade local. Páginas cuja única diferença útil seja o nome do bairro permanecem candidatas a consolidação, não modelos para expansão. Nenhuma exclusão, desindexação ou redirecionamento está autorizado por este relatório.

O bloco legado de galpão em `seoLocalAutoPages.ts` permanece na fonte como pendência explícita, mas não é o objeto atribuído ao catálogo publicado. Qualquer auditoria por busca textual deve distinguir esse texto da configuração efetiva. Não reutilizá-lo em novas páginas ou extrações.

## Inventário reproduzível de ocorrências comerciais

Adicionado `scripts/audit-commercial-content.mjs`, que percorre páginas, dados, bibliotecas e componentes e grava arquivo/linha/trecho/tipo em `audit-output/commercial-content-candidates.json` quando executado. Procura valores, percentuais, promessas absolutas, prazos, referências de rede e prova social para triagem humana. Não altera páginas e não transforma falsos positivos em erros automaticamente. Não foi executado neste ambiente; não há contagem de achados inventada nem arquivo de resultados simulado.

## Arquivos e verificações

Arquivos alterados/criados nesta etapa:

- `src/data/localCommercialContent.ts`: orientação reutilizável por produto, condições e links.
- `src/data/seoLocalProdutoBairroPages.ts`: revisão das 12 configurações, preservando exclusões.
- `src/data/seoLocalSaudePages.ts`: revisão das 19 configurações existentes.
- `src/data/seoLocalAutoPages.ts`: fonte efetiva de empresarial Cumbica e atribuição efetiva de galpão Guarulhos.
- `src/pages/SeguroResidencial.tsx`: revisão comercial e ligações contextuais, preservando campos de cotação.
- `src/components/ComparisonTableResidencial.tsx`: comparação sem pacotes/preços presumidos.
- `src/data/localCommercialContent.test.ts`: regressões de contagem, precedência, limites de metadados, condições, ausência de valores/casos e IDs de bairros.
- `scripts/audit-commercial-content.mjs`: inventário complementar reproduzível.
- `docs/auditoria-local-parte-2-etapa-2.md`: este relatório.

Verificado por inspeção de código: rotas dos destinos principais; precedência dos catálogos em `SeoLocalPage` e no resolvedor de metadados; fonte comercial de Cumbica e galpão; ausência de alteração de contatos, indexação ou novas rotas. Os testes anteriores de auto/Pimentas foram preservados.

**Não executados:** build, lint, testes automatizados, navegação em navegador, auditoria HTTP, prerender e consulta a ferramentas externas. Não há acesso de execução neste ambiente. Na validação do Lovable/CI, executar `npx vitest run src/data/localContentSafety.test.ts src/data/localCommercialContent.test.ts`, `node scripts/audit-commercial-content.mjs` e o build com seus validadores existentes; conferir especialmente paridade de prerender, títulos, cinco FAQs, CTAs e envio do formulário residencial. Os testes adicionados são proteção preparada, não resultado de execução.

## Repasse

Esta etapa entrega a revisão ampliada e os caminhos contextuais sem antecipar Google Maps. A próxima etapa deve consolidar o relatório e as validações do Perfil da Empresa e dos contatos oficiais. Para uso posterior na Parte 3 do pedido original, os riscos comerciais remanescentes acima devem acompanhar o inventário, sem apresentar o acervo inteiro como validado.
