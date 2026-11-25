# Expansão aeroportuária — inventário e arquitetura

Verificação estática no repositório: rotas explícitas no React Router, catálogo e conteúdo do blog, regras de prévia e referências de slug. **Rota pública no código** não significa que o HTTP, a renderização em produção ou a indexação tenham sido confirmados. O roteador genérico `/blog/:slug` não prova que um artigo exista: sem entrada de conteúdo, apresenta “Artigo não encontrado” com `noindex`.

## Inventário das 13 URLs e intenção principal

| URL | Evidência no código | Núcleo / intenção exclusiva |
| --- | --- | --- |
| `/seguros-aeroportuarios` | Pública: rota e página `SegurosAeroportuarios` | Comercial: orientar a análise de um contrato aeroportuário com múltiplos riscos |
| `/seguro-eo-engenharia-aeroportos` | Pública: rota e página `SeguroEoEngenhariaAeroportos` | Comercial: solicitar análise/cotação de RC profissional para engenharia em aeroportos |
| `/blog/seguro-eo-engenharia-prestadores-servicos-aeroportos` | Público: catálogo `blogData.ts`, template `BlogArticle` e conteúdo `EoAirportArticle` | Modalidades: entender cláusula de E&O, retroatividade e checklist, sem substituir a página de contratação |
| `/blog/quais-seguros-prestar-servicos-aeroporto-guarulhos` | Não localizado por slug exato | Exigências: identificar quem exige quais documentos no contexto de GRU |
| `/blog/diferenca-seguro-eo-engenharia-rc-aeroportuario` | Não localizado por slug exato | Modalidades: comparar RC profissional e responsabilidade operacional, não cotar E&O |
| `/blog/como-interpretar-clausulas-seguros-contratos-empresariais` | Não localizado por slug exato | Exigências: interpretar termos na minuta antes de selecionar apólice |
| `/blog/seguro-instalacoes-eletricas-aeroportos` | Não localizado por slug exato | Segmentos: separar projeto elétrico, instalação, energização e testes |
| `/blog/seguro-manutencao-climatizacao-aeroportuaria` | Não localizado por slug exato | Segmentos: avaliar manutenção e climatização em operação |
| `/blog/seguro-responsabilidade-civil-terceirizadas-aeroportos` | Não localizado por slug exato | Segmentos: avaliar danos a terceiros e responsabilidades entre contratada e subcontratadas |
| `/blog/seguro-obras-reformas-instalacoes-aeroportos` | Não localizado por slug exato | Segmentos: avaliar danos à obra, bens existentes e interfaces da reforma |
| `/blog/seguro-garantia-contratos-aeroportuarios` | Prévia: rota explícita condicionada ao host | Modalidades: distinguir garantia de execução, fiança e caução |
| `/blog/como-evitar-apolice-inadequada-contratos-empresariais` | Prévia: rota explícita condicionada ao host | Exigências: conferir a apólice contra a cláusula antes de apresentá-la |
| `/blog/guia-completo-seguros-fornecedores-aeroportuarios` | Prévia: rota explícita condicionada ao host | Pilar editorial: comparar modalidade por atividade e organizar a conferência de ponta a ponta |

## Matriz de links

| Origem | Destinos e função |
| --- | --- |
| Hub empresarial; menu Empresas e patrimônio | Hub aeroportuário: ponto único de entrada, sem novo item de topo |
| Hub aeroportuário | Quatro âncoras: contratação (triagem e caminho de cotação), exigências, modalidades e segmentos; página comercial de E&O; guia público de E&O; páginas gerais das modalidades quando existem |
| Página comercial de E&O | Hub aeroportuário pelo breadcrumb e pela comparação de modalidades; guia público de E&O com exemplos e checklist |
| Guia público de E&O | Página comercial (CTAs existentes) e comparação de modalidades no hub; nenhum link público para rascunhos |
| Hub aeroportuário em host de prévia | Guia pilar em destaque no grupo de prévias, Seguro Garantia e conferência de apólices |
| Guia pilar em prévia | Hub, E&O comercial, RC geral, Riscos de Engenharia, prévias de Garantia e de conferência de apólices |
| Garantia e conferência de apólices em prévia | Hub e E&O comercial; conferência de apólices também referencia a prévia de Garantia |

Trilha comercial: **Início → Seguros Empresariais → Seguros aeroportuários → E&O Engenharia para Aeroportos**, refletida na interface e na geração de breadcrumb em runtime. A trilha editorial do artigo público continua no Blog, na categoria existente. Não foi criada categoria aeroportuária separada: há apenas um artigo público identificado e o hub já reúne os conteúdos disponíveis. As sete pautas não localizadas não receberam páginas vazias nem links.

## Estado da entrega

- **Implementado e validado por inspeção do código:** inventário e separação das intenções; três destinos públicos no código, três prévias preservadas e sete ausências registradas. Nenhuma URL existente mudou.
- **Implementado, aguardando validação:** navegação em quatro núcleos, links bidirecionais entre hub, E&O e seu guia, entrada empresarial e menu, trilha comercial e teste Playwright de navegação. Build, lint, type checking, testes, renderização e HTTP ainda não executados neste ambiente.
- **Pendente:** revisão técnica antes de publicar as três prévias; confirmar paridade do breadcrumb no HTML implantado; auditoria de títulos, canonicals, canibalização, indexação, GEO/AEO, métricas e WhatsApp nas partes subsequentes. Antes de criar as sete pautas, confirmar demanda, fontes e diferença editorial em relação ao pilar e ao guia de E&O.
- **Não aplicável nesta parte:** publicação ou solicitação de indexação de prévias, novas categorias sem acervo e alterações em banco, captação ou analytics.
