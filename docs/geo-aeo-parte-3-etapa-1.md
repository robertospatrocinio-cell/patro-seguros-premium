# Prompt 3/4 — GEO e AEO: etapa 1 de 2

## Estado da entrega e limites

Implementada a primeira etapa: diagnóstico editorial baseado no repositório e revisão da central de perguntas. A auditoria global de marcações, llms.txt, rastreamento e plano de mensuração pertence à etapa 2, ainda não executada. Este relatório é insumo parcial para a Parte 4, não o fechamento integral do Prompt 3.

Não houve acesso ao site publicado, plataformas de IA, contas privadas, ferramentas externas de validação, navegador ou terminal. Não foram executados build, testes ou auditoria HTTP. Não há evidência de citações, posições, impressões, cliques ou conversões obtidas. Nenhum formato de conteúdo ou marcação garante presença em ChatGPT, Gemini, Google AI ou busca tradicional.

Bases utilizadas: `docs/auditoria-tecnica-parte-1.md`, `docs/auditoria-local-parte-2-etapa-2.md` e `docs/auditoria-local-parte-2-etapa-3.md`. Foram preservadas as correções comerciais e de contatos anteriores, sem considerar resolvidas suas pendências de comprovação e publicação.

## 1. Diagnóstico de descoberta e utilidade

| Dimensão | Evidência examinada | Decisão / limite |
| --- | --- | --- |
| Conteúdo explicativo | Central com 12 categorias anteriores; auto, empresarial, saúde, residencial e vida tinham respostas curtas e generalizações | Revisadas essas cinco categorias e ampliada a cobertura das outras modalidades prioritárias; sem certificar todo o acervo |
| Originalidade | Catálogos por bairro com riscos de repetição registrados na Parte 2; não há nesta sessão base de perguntas do atendimento | Orientações de decisão e documentação, sem casos, resultados ou perguntas atribuídas a clientes reais |
| Organização semântica | Central e página dinâmica usam títulos, perguntas em acordeão e links por categoria | Mantida hierarquia; 12 modalidades prioritárias com sete respostas cada e ligação a páginas de produto |
| Respostas práticas | Complementos antigos prometiam preço de saúde, descontos de rastreador, prazos e sugeriam declarar apenas condutor principal | Conteúdo efetivo das categorias prioritárias passa a ignorar os complementos legados e usa orientação revisada |
| Autoridade técnica | Não foi apresentada validação humana assinada destas respostas | Não foi inventado autor/revisor, credencial ou data de revisão; referências institucionais e limites editoriais visíveis |
| Dados da empresa | `EMPRESA` contém razão social, CNPJ, SUSEP e canais; Parte 2 registra necessidade de conferência externa | Reutilizados dados cadastrados, sem afirmar verificação externa; WhatsApp das duas páginas deixa de usar número próprio divergente |
| Navegação | Rotas existentes de central/categoria em `App.tsx`; gerador de sitemap já consome `faqCategories` | IDs anteriores preservados; seis novas categorias passam pela rota dinâmica existente, sem novos artigos ou rota duplicada |
| Acessibilidade pública | Conteúdo de categorias está em módulos locais; acordeão usa componentes existentes | Não depende de login/banco; há títulos, links e perguntas em botões. Teclado, foco e HTML inicial ainda precisam de teste |
| Dados estruturados | Central marca três respostas por categoria; páginas individuais marcam todas as suas perguntas | Dados marcados são os mesmos da interface; suprimido breadcrumb automático na página que já o produz explicitamente |
| Consistência | Mesma fonte abastece central e categorias; complementos poderiam reintroduzir alegações antigas | Fonte revisada compartilhada e prioridade explícita sobre complementos antigos; blog e prerender não certificados |

**Risco técnico herdado:** metadados em React, pré-renderização opcional e duplicidades do roteador continuam sujeitos às verificações da Parte 1. Conteúdo no repositório não comprova que um rastreador receba HTML completo. Não houve alteração de robots, canonical, redirecionamentos, plugins ou publicação.

## 2. Conteúdos revisados e perguntas respondidas

A central `/perguntas-frequentes-seguros` e as respectivas categorias recebem **84 respostas prioritárias**, sete por modalidade. O número é de respostas no novo conjunto de dados, não de casos de clientes nem de perguntas inéditas: há revisão/substituição de perguntas anteriores.

| Modalidade / categoria | Página de aprofundamento ligada | Ênfase da revisão |
| --- | --- | --- |
| Auto em Guarulhos / `auto` | `/seguro-auto` | CEP não determina sozinho o preço; casco, franquia, terceiros e documentos |
| Uber e 99 / `motoristas-app` | `/seguro-motorista-app` | Uso remunerado declarado, proteção da plataforma separada e restrições do carro reserva |
| Passageiros / `passageiros` | `/seguro-acidentes-pessoais-passageiros` | APP significa acidentes pessoais; capital por ocupante e garantias distintas |
| Terceiros / `terceiros` | `/seguro-auto` | Danos materiais, corporais e morais, definição de terceiros e risco de limite insuficiente |
| Empresarial / `empresarial` | `/seguro-empresarial` | Atividade real, estoque, reconstrução, rateio quando aplicável, RC e lucros cessantes |
| Galpões / `galpoes` | `/seguro-galpao` | Proprietário e ocupante, bens de clientes, prevenção e separação de transporte/armazenagem |
| Saúde PME / `saude` | `/plano-saude-empresarial` | Elegibilidade e MEI, rede do produto, carências, coparticipação e reajustes coletivos |
| Residencial / `residencial` | `/seguro-residencial` | Construção e conteúdo, eventos de água, furto, uso temporário e assistência |
| Vida / `vida` | `/seguro-vida` | Capital sem multiplicador universal, garantias específicas, saúde e reajustes |
| Frotas / `frotas` | `/seguro-frota` | Limites por item/evento, alterações da frota e carga não automaticamente coberta |
| Drones / `drones` | `/seguro-drone-agricola` | Casco versus RETA, pulverização, deriva e exigências regulatórias separadas |
| Máquinas agrícolas / `maquinas-agricolas` | `/seguro-maquinas-agricolas` | Operação, transporte, penhor rural, credor e quebra mecânica sem inclusão presumida |

Cada conjunto responde a cobertura, exclusões, fatores de preço, avaliação de limites, documentos, adicionais e pedido de cotação. Saúde explica que segmentação, rede e regras assistenciais não equivalem a um capital de seguro patrimonial. Cotação não é apresentada como aceitação ou início de proteção. As dúvidas foram selecionadas por relevância técnica e pelo conteúdo existente, não por volumes de pesquisa ou histórico de atendimento não acessados.

Foram revisados `perguntasHubData`, o template de categorias, a central e, por inspeção, o conteúdo existente de máquinas agrícolas e o destino de drones. A revisão não substitui condições gerais de produtos específicos. Sem documentos comerciais atuais, não foram prometidos preços, descontos, prazo de retorno, disponibilidade ou indenização. A página `/seguro-drone` já encaminha para a agrícola; o novo link usa o destino, pedindo confirmação de disponibilidade para outras atividades.

## 3. Sinais de confiança e referências

Novo bloco “Como usar estas respostas” na central e nas categorias prioritárias: caráter informativo, prevalência das condições e regras aplicáveis, cuidado com documentos pessoais, razão social/CNPJ/SUSEP da configuração, orientação para conferir registro e links de Sobre, Contato e Privacidade. Dados cadastrados não equivalem a registros externos verificados.

As referências são portais oficiais de SUSEP, ANS e ANAC, selecionados por modalidade. São pontos de consulta, não citação de uma cláusula que prove cada afirmação, e não foram acessados nesta sessão. Próximo refinamento editorial: anexar à pergunta o documento técnico ou condição do produto realmente analisado, versão, trecho, responsável e data de conferência. Não inventar uma data de atualização automática ou atribuir revisão aos sócios sem sua participação.

A orientação é uma síntese editorial de critérios de comparação. Não foi rotulada como estudo exclusivo, experiência de sinistro da Patro ou recomendação individual. Nenhum depoimento, resultado ou estatística foi criado. Os valores cadastrais e indicadores de outras partes do site foram preservados, sem nova certificação.

## 4. Marcação implementada nesta etapa

Mantido `FAQPage`: subconjunto de três perguntas por categoria na central e sete perguntas nas categorias prioritárias, extraídas da mesma fonte usada na interface. O FAQ não é tratado como recurso de resultados enriquecidos disponível à corretora nem como garantia de citação em IA. Não foram adicionadas avaliações, estrelas, ofertas artificiais ou tipos de artigo em páginas de FAQ.

`BreadcrumbList` individual existente preservado; `PageMeta` recebe `skipBreadcrumb` para não emitir também seu breadcrumb automático nessa página. A central continua usando o comportamento existente de `PageMeta`. Não se certifica a ausência de duplicação no HTML publicado sem renderização. Organization, InsuranceAgency, Article/BlogPosting e Service ficam para a auditoria global da próxima etapa, sem afirmar implementação nova ou aprovação desses tipos aqui.

## 5. Arquivos alterados e verificações

- `src/data/perguntasPrioritarias.ts`: 12 modalidades, 84 respostas e referências institucionais.
- `src/data/perguntasHubData.ts`: prioridade da fonte revisada e preservação das categorias anteriores.
- `src/components/FaqEditorialContext.tsx`: contexto, referências e dados cadastrais compartilhados.
- `src/pages/CentralDePerguntas.tsx`: orientação visível, introdução e contato centralizado.
- `src/pages/PerguntasCategoria.tsx`: dados revisados, guia, termos, contexto, metadados curtos e controle do breadcrumb.
- `src/data/perguntasPrioritarias.test.tsx`: regressões de dados, renderização das 12 categorias, contato e paridade de marcação.
- `docs/geo-aeo-parte-3-etapa-1.md`: este relatório.

Inspeção estática: importação efetiva das páginas no roteador, produtos de destino, privacidade sem alias, tipos de dados, origem dos contatos e ligação do gerador de sitemap à lista de categorias. O import de tipo em `perguntasPrioritarias` evita dependência circular em tempo de execução. Não foi acrescentada dependência npm nem alterado o banco.

**Resultados de testes:** preparados, não executados; não há aprovação de build, TypeScript, lint, rich results ou Schema.org nesta sessão. Executar `npx vitest run src/data/perguntasPrioritarias.test.tsx`, os testes de segurança comercial das etapas anteriores e o build habitual com os validadores cadastrados. Conferir as 12 categorias no preview, abertura por teclado, referências, CTA e limites dos metadados. Depois inspecionar HTML produzido e publicado, sitemap, canonical e conteúdo antes/depois do JavaScript; comparar com as respostas revisadas. Validar amostras renderizadas no Schema.org Validator e no Google Rich Results Test e guardar resultados com URL/data. Um teste local de paridade não substitui esses validadores nem comprova elegibilidade.

## 6. Repasse para a etapa 2 e Parte 4

1. Auditar a emissão real de Organization, InsuranceAgency, BreadcrumbList, Article/BlogPosting e Service, incluindo possíveis avaliações artificiais e paridade do prerender.
2. Examinar llms.txt, links canônicos, llms-full e configurações de rastreamento, preservando os controles de acesso e sem tratar o arquivo como requisito oficial de indexação.
3. Preparar registro repetível de plataforma, pergunta, data, presença da Patro, fonte, URL, concorrentes e observações; distinguir citação, impressão, clique e conversão. Não simular resultados nem usar ferramentas pagas.
4. Conferir dados cadastrais em fontes oficiais, designar responsável técnico real e obter documentos de produtos; não publicar autoria ou data fictícias.
5. Executar testes e validações externas e consolidar o relatório final do Prompt 3 para a Parte 4. O critério de dados estruturados validados permanece pendente; esta etapa entrega conteúdo mais explícito e rastreável, não uma homologação global de GEO.
