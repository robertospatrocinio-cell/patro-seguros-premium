# Parte 3 — Utilidade comercial em Saúde, Auto e Agronegócio

## O que mudou na tela

### Plano de Saúde em Guarulhos — `/plano-de-saude-guarulhos`

- Navegação direta para tipos de plano, cotação por perfil, conferência de rede e fontes.
- Roteiro de comparação para PME com duas vidas, MEI e contratação individual/familiar, sem tratar quantidade mínima de vidas ou elegibilidade como universais.
- Matriz de conferência nominal de hospitais e laboratórios de interesse. Todas as linhas declaram **credenciamento não confirmado por produto**. O quadro não é uma relação de prestadores cobertos.
- Orientação para identificar registro ANS do produto, unidade e serviço; guardar consulta datada e protocolo; confirmar a rede com a operadora antes de contratar e de utilizar.
- Links para os portais oficiais de Amil, Bradesco Saúde, SulAmérica e Porto, além do Guia ANS, orientações ao consumidor da ANS e Lei nº 9.656/1998.
- Removidos do FAQ do hub os preços de R$ 280 a R$ 600 e a promessa de economia de 20% a 40%, que não tinham tabela comercial ou estudo documentado nesse conteúdo. O FAQ visível e sua marcação estruturada usam a mesma fonte de dados.
- Removida a afirmação de “20+ operadoras” no destaque e a declaração de revisão técnica sem registro comprobatório. Ajustadas as respostas sobre carência, portabilidade e MEI para não apresentar regras condicionais como garantias.

**Limite:** não há tabela comercial vigente nem comprovação de rede por produto disponível nesta tarefa. Por isso, nenhuma faixa de preço ou combinação operadora/hospital foi inventada. O nome de um prestador no roteiro não confirma unidade, serviço ou atendimento por um plano. Para publicar uma matriz de cobertura real, é necessário obter documentos oficiais com operadora, registro do produto, unidade, serviço e data da confirmação. Para publicar preços, registrar também perfil, condições, origem e validade da tabela.

### Seguro Auto — `/seguro-auto` e `/seguro-auto-guarulhos`

- Guia compartilhado para comparar custo total, casco, franquias, terceiros, assistência, carro reserva e perfil declarado.
- No hub principal, o guia aparece após o hero, sem depender da rolagem que ativa seções adiadas. Na página local, integra as seções complementares antes dos hubs de bairros e modelos.
- Roteiro dos dados necessários à cotação e acesso ao formulário existente, preservando `tipo=auto`.
- Links à FIPE oficial, à orientação de seguro automóvel da SUSEP e à página de consulta FIPE já existente.
- Diferenciação expressa entre preço de referência do veículo e preço do seguro. Não há média por bairro, classificação de risco ou desconto inventado.

### Agronegócio — `/seguro-agro`

- Preservado o endereço canônico existente, já com posicionamento nacional, em vez de criar `/agronegocio` para concorrer com o próprio hub. Não houve mudança de rotas, canonical ou sitemap.
- Navegação contextual por necessidade, catálogo técnico, dados de cotação nacional e fontes oficiais.
- Quadro técnico com caminhos para máquinas/colheitadeiras, penhor rural, drones, silos e lavoura. Cada linha separa informações de análise e limites da proteção.
- Município/UF da operação, prestação de serviços, deslocamentos e exigências do credor destacados como dados da análise, sem ancorar o risco na sede em Guarulhos.
- Acesso ao hub nacional acrescentado ao menu Agronegócio de desktop. O menu móvel já usa o catálogo que contém Seguro Agro com descrição de atendimento nacional.
- Fontes oficiais da SUSEP, Ministério da Agricultura e ANAC, sem prometer subvenção ou regularidade automática da operação.
- Descrição do silo ajustada para não sugerir cobertura automática de deterioração ou perda de qualidade.

## Evidências e limites de validação

A implementação se baseia no conteúdo e nas rotas presentes no repositório. Não houve consulta externa em tempo real, acesso a propostas de operadoras/seguradoras, auditoria de SERPs ou medição de resultados de conversão. Os portais oficiais indicados são caminhos de conferência, não prova de uma relação comercial específica ou de cobertura vigente; os links devem ser conferidos no navegador antes de divulgação comercial.

Foram adicionados testes de regressão em `src/components/CommercialDecisionGuides.test.tsx` para a indicação explícita de rede não confirmada, os três perfis de saúde, referências oficiais, destino de cotação Auto e ausência de valores/percentuais sem fonte no FAQ. Os testes não foram executados neste ambiente.

## Conferência após a sincronização

1. Abrir os três hubs e a página local de Auto no preview, em desktop e celular; conferir links de seção, foco e rolagem horizontal das tabelas.
2. Confirmar o comparativo de saúde em `/comparativo-planos-saude-guarulhos`, os caminhos técnicos Agro e o formulário Auto com seleção do produto preservada.
3. Conferir links externos nos portais oficiais. Não divulgar combinações de hospital/plano antes de obter comprovação por produto e serviço.
4. Executar a suíte de testes e o build na infraestrutura do projeto. Os metadados e as URLs existentes foram preservados.
5. Acompanhar cliques e leads no Search Console e no CRM, sem atribuir ganhos de posição ou conversão antes da medição.
