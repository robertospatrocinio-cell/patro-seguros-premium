# Agro: conferência de publicação, indexação e qualidade

## Escopo desta etapa

Revisadas as páginas de máquinas, equipamentos, drone agrícola, trator, colheitadeira de grãos, colhedora de cana, colhedora de algodão e pulverizador. Revisados os artigos sobre trator versus seguro auto e sobre drone agrícola, preservando suas URLs.

As páginas distinguem atendimento nacional de abrangência contratada, conectam o financiamento ao seguro penhor rural e condicionam a proteção às coberturas e condições aceitas. As referências às regiões agrícolas descrevem operações reais a declarar, sem criar endereços ou escritórios locais fictícios. A parceria com a rede de concessionárias foi informada pelo responsável da Patro; não implica exclusividade ou vínculo direto com cada fabricante.

## Estado da validação

- Conteúdo e alterações técnicas preparados no repositório.
- Build, testes automatizados, preview e HTML publicado **não executados nem inspecionados nesta etapa**.
- Indexação, posição no Google, Core Web Vitals e nota de qualidade **não medidos**.
- Meta: pelo menos 90/100 na conferência abaixo, buscando 100/100. Isso não é uma nota já obtida, uma pontuação oficial do Google ou garantia de ranking.

## URLs prioritárias

Conferir primeiro os quatro destinos comerciais centrais:

1. `/seguro-agro`
2. `/seguro-penhor-rural`
3. `/seguro-maquinas-agricolas`
4. `/seguro-drone-agricola`

Depois conferir os destinos especializados:

- `/seguro-equipamentos-agricolas`
- `/seguro-trator-agricola`
- `/seguro-colheitadeira-graos`
- `/seguro-colhedora-cana`
- `/seguro-colhedora-algodao`
- `/seguro-pulverizador-agricola`

Artigos relacionados, com URLs mantidas:

- `/blog/seguro-trator-vs-seguro-auto-diferencas`
- `/blog/drone-agricola-anac-seguro-rcf-pulverizacao`

## Conferência técnica antes da publicação

1. Executar o build e os testes já configurados no projeto. Confirmar que o preview carrega as oito páginas revisadas, sem erro de importação, imagem ou JavaScript.
2. Na raiz do projeto, executar `node scripts/validate-agro-cluster.mjs`. O script verifica contratos básicos de conteúdo e presença de registro das oito rotas, sem depender de pacotes novos.
3. Após gerar o HTML pré-renderizado, executar `node scripts/validate-agro-cluster.mjs --dist`. Ausência do HTML é falha, não sucesso. Esse modo confere H1, canonical, ausência de noindex, link de penhor e JSON-LD legível; não valida todas as propriedades dos schemas.
4. Abrir cada página diretamente e atualizar o navegador. Confirmar HTTP 200, conteúdo completo, um H1 e canonical da própria URL no domínio oficial HTTPS. Verificar também cabeçalhos HTTP: a ausência de noindex no HTML não exclui um `X-Robots-Tag` bloqueador.
5. Conferir title, description e Open Graph no HTML publicado, inclusive eventuais substituições pelo sistema central de metadados. Nenhum título ou descrição comercial agrícola deve restringir o serviço a Guarulhos.
6. Verificar robots.txt, sitemap index e o sitemap que efetivamente contém cada URL. Não é necessário repetir cada URL em todos os sitemaps. Usar os geradores existentes, não inventar datas de atualização nem incluir URLs redirecionadas ou não canônicas.
7. Verificar as rotas de Agro e Penhor Rural da primeira etapa também no build e no sitemap. O novo script concentra-se nas oito páginas revisadas, não cobre todo o projeto.
8. Validar JSON-LD no Schema Markup Validator e no teste de resultados avançados do Google. Conferir coerência entre FAQ visível e marcado, endereço verdadeiro da sede e área de atendimento do serviço. FAQ válido não garante exibição de resultado enriquecido.
9. Conferir as imagens e todos os links do conteúdo. Para drones, abrir as fontes oficiais e confirmar regras vigentes com o responsável técnico; esta revisão não substitui validação regulatória.

## Conferência comercial e de navegação

- Testar em celular e desktop o CTA do topo, os formulários, o WhatsApp e os links para penhor rural, RETA e produtos relacionados.
- Fazer um envio de teste identificado como teste e confirmar produto, página de origem, campos e recebimento no fluxo existente. Não presumir entrega apenas porque o botão foi clicado.
- Confirmar que a cotação agrícola não é direcionada para seguro auto ou para uma categoria genérica por engano.
- Conferir o formulário de máquinas e drones com o time comercial: modelo, série, valor, local de operação, uso, acessórios e financiamento devem ser solicitados no momento adequado, sem exigir documentos sensíveis desnecessários na primeira interação.
- Ler os blocos compartilhados da página inteira, não apenas o texto principal. Não devem contradizer a análise condicional com prazo garantido de emissão, indenização integral, quebra mecânica automática ou deriva sempre coberta.
- Confirmar que os exemplos regionais não prometem unidades locais e que a sede verdadeira continua disponível nos contatos institucionais.

## Critérios internos para a meta 90–100/100

Preencher somente após a conferência, registrando URL, data e evidência. Cada item vale 10 pontos quando integralmente aprovado; pendências ficam registradas, sem aprovação presumida.

| Critério | Evidência necessária | Estado |
| --- | --- | --- |
| Publicação e renderização | Build válido, páginas e imagens carregando em celular e desktop | Pendente |
| Rastreabilidade | HTTP 200, robots e cabeçalhos sem bloqueio indevido | Pendente |
| Canonical e sitemap | URLs próprias no domínio oficial, sem duplicidade ou redirecionamento no sitemap | Pendente |
| Metadados e hierarquia | Title e description específicos, um H1, headings coerentes no HTML | Pendente |
| Conteúdo comercial responsável | Revisão humana de riscos, exclusões, financiamento e ausência de garantias indevidas | Pendente |
| Intenção nacional | Operações e regiões agrícolas contextualizadas, sem endereços locais fictícios | Pendente |
| Navegação do conjunto | Links funcionais entre Agro, Penhor Rural, páginas e artigos | Pendente |
| Dados estruturados | JSON-LD validado, coerente com o conteúdo visível e sem duplicidades conflitantes | Pendente |
| Conversão e acessibilidade | CTA e envio de teste, teclado, rótulos e experiência móvel conferidos | Pendente |
| Desempenho | Relatório móvel de laboratório e, quando disponível, dados de campo documentados | Pendente |

Erros de build, páginas inacessíveis, bloqueio de indexação não intencional, canonical errado, formulário sem entrega ou promessa material enganosa são bloqueadores. Não publicar uma nota de aprovação apenas porque os demais itens somaram 90.

## Após publicar: Search Console

1. Inspecionar as quatro URLs prioritárias e executar o teste da URL publicada. Comparar canonical declarado e escolhido pelo Google quando os dados estiverem disponíveis.
2. Solicitar indexação quando apropriado e conferir a leitura do sitemap. A solicitação não garante indexação ou prazo.
3. Repetir nas páginas especializadas e nos dois artigos revisados. Se uma URL não for indexada, registrar o motivo antes de alterar conteúdos ou gerar novas páginas regionais.
4. Acompanhar em janelas de 28 dias, comparando períodos equivalentes e anotando a data de publicação. Separar resultados por página e intenção; resultados de curto prazo não demonstram causalidade.

Consultas a acompanhar: seguro penhor rural, seguro máquina agrícola financiada, seguro trator financiado, seguro colheitadeira, seguro equipamentos agrícolas, seguro pulverizador, seguro drone agrícola, seguro drone pulverização e seguro RETA drone agrícola. Avaliar variações com Mato Grosso, Goiás, Paraná, Minas Gerais, Bahia e outras regiões quando houver impressões reais. Não criar dezenas de páginas quase idênticas apenas para inserir nomes de estados.

Registrar impressões, cliques, CTR, posição, solicitações qualificadas e contatos recebidos. A finalidade é alcançar produtores e concessionárias com propostas adequadas, não apenas aumentar uma nota técnica.
