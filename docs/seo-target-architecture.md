# Fase 3B — Arquitetura-alvo SEO, AEO, GEO e Conversão

Modo: diagnóstico e planejamento. Nenhuma alteração pública foi executada.

## Visão geral

A arquitetura-alvo conecta busca → resposta → autoridade → produto → cotação → lead. A Fase 3A inventariou 605 URLs públicas únicas: 203 locais, 179 produtos, 141 artigos, 78 outras, 3 de cotação e 1 de sinistro/serviço.

Prioridades: P0 Auto, Empresarial/RC e Agro/Rural/Máquinas/Drones; P1 Saúde, Residencial e Vida; P2 Condomínio, Transportes, Frota, Moto, Caminhão, Viagem, Odontológico, Consórcio e Celular; P3 demais clusters.

Todas as recomendações dependem de docs/regulatory-evidence.md e docs/claims-evidence.md. Claims removidos nas fases anteriores não devem ser reintroduzidos.

## Arquitetura por cluster

### Auto — P0

Pilar atual: `/seguro-auto`. Satélites: páginas locais, modelos, Uber/motorista de aplicativo, elétricos/híbridos e artigos de cobertura, franquia, preço, renovação e sinistro. Conversão: `/cotacao-seguro-auto` e `/cotacao`. Diferenciar produto, local, modelo, uso e pós-venda; não consolidar modelos sem Search Console.

### Empresarial + RC — P0

Pilares candidatos: `/seguro-empresarial` e `/solucoes-empresariais`; decisão bloqueada por dados de intenção. Satélites: galpões, condomínio empresarial, lucros cessantes, RC Geral, RC Profissional, D&O, Cyber, Transportes e Vida PME. Cross-sell futuro: Empresarial → Cyber + RC + Vida PME + Saúde PME; Transportadora → Transportes + Frota + RC; Condomínio → Patrimonial + RC.

### Agro/Rural/Máquinas/Drones — P0

Hub atual: `/seguro-agro`. Pilares: `/seguro-rural` e `/seguro-maquinas-agricolas`. Satélites: `/seguro-trator-agricola`, `/seguro-colheitadeira-graos`, `/seguro-pulverizador-agricola`, `/seguro-equipamentos-agricolas`, propriedade rural, silo e drone. Conteúdos educacionais: PSR, ZARC, CAR, modalidades, financiamento e Penhor Rural. Preservar as distinções técnicas da Fase 2B.6B.

### Saúde — P1

Pilares candidatos: `/seguro-saude` e `/planos-de-saude`. Satélites: empresarial, PME, MEI, individual/familiar, adesão, operadoras, rede, carência, portabilidade, reajuste e local. Artigos informacionais não devem disputar a intenção da página comercial.

### Residencial — P1

Pilar: `/seguro-residencial`. Satélites: coberturas, assistência, danos elétricos, vazamentos, imóvel alugado, proprietário/inquilino, home office, RC familiar, sinistro e local.

### Vida — P1

Pilar: `/seguro-vida`. Satélites: `/seguro-vida-pme`, páginas locais e conteúdos sobre beneficiários, capital, invalidez, doenças graves, DPS e sinistro. Preservar integralmente a Fase 2B.6A.

### P2/P3

Condomínio: `/seguro-condominio`. Transportes: `/seguro-transporte`. Frota: `/seguro-frota`. Moto: `/seguro-moto`. Viagem: `/seguro-viagem`. Odontológico: `/seguro-odonto`. Consórcio e Celular possuem pilares comerciais prováveis. D&O, Cyber e RC Profissional permanecem produtos distintos.

## Local, Guarulhos e modelos

As 203 páginas locais devem ser classificadas como LOCAL ESTRATÉGICA, LOCAL COM VALOR ÚNICO, LOCAL PARAMETRIZADA, LOCAL DE BAIXA DIFERENCIAÇÃO ou LOCAL A INVESTIGAR. O risco de scaled content é alto até validar conteúdo exclusivo, consultas, backlinks e conversões.

O hub de Guarulhos deve ser entrada local relacionada aos pilares nacionais, sem arquitetura paralela concorrente.

Páginas por modelo: MODELO ESTRATÉGICO, MODELO A VALIDAR ou MODELO REDUNDANTE POTENCIAL. Não recomendar redirect definitivo sem GSC, backlinks e histórico.

## Artigos

Os 141 artigos da Fase 3A devem receber individualmente: cluster, pilar, produto destino, funil, CTA ideal e função — EDUCAR, COMPARAR, RESOLVER DÚVIDA, APOIAR CONTRATAÇÃO, PÓS-VENDA, AUTORIDADE ou LOCAL.

Fluxo futuro: artigo → guia/pilar → produto → cotação. Artigos sem destino devem ser classificados como ARTIGO SEM DESTINO COMERCIAL antes de qualquer alteração. A matriz URL a URL da Fase 3A é o inventário-base.

## Mapa de linkagem futura

- Auto: artigos de cobertura, preço, franquia e sinistro → `/seguro-auto` → `/cotacao-seguro-auto` → `/cotacao`.
- Empresarial: conteúdos patrimoniais → `/seguro-empresarial`; RC, Cyber, D&O e Transportes mantêm destinos próprios.
- Agro: conteúdo educacional → `/seguro-agro`; Rural e Máquinas permanecem destinos distintos.
- Saúde: conteúdos de carência, portabilidade, rede e reajuste → pilar comercial correspondente.
- Residencial: cobertura/assistência/sinistro → `/seguro-residencial` → cotação.
- Vida: cluster Corretora → `/seguro-vida`; Vida PME e local somente quando a intenção justificar.
- Local: página local → pilar nacional + produto local, após validação de conteúdo único.

## Entidades e GEO

Patro Seguros = corretora e entidade editorial/comercial; SUSEP = regulador; seguradora = emissora do contrato e assumidora do risco conforme a apólice; Seguro Auto/Rural/Vida = produtos com escopos próprios; Guarulhos = localidade principal; MAPA = órgão relacionado ao PSR; ZARC = zoneamento de risco climático, não garantia de aceitação; Uber/99 = plataformas de uso profissional.

Elementos GEO futuros: entidade explícita, definição autocontida, fonte primária, data, autor/revisor, relações entre produtos, linguagem objetiva e evidência institucional. Nenhuma citação por IA é garantida.

## AEO prioritário

| Cluster | Pergunta principal | Resposta direta esperada |
|---|---|---|
| Auto | Como funciona o Seguro Auto? | Produto, riscos, limites e contrato; sem universalizar coberturas |
| Agro | O que é Seguro Rural? | Categoria ampla, distinta de Seguro Agrícola e Proagro |
| Máquinas | Trator cobre roubo? | Pode cobrir, dependendo do produto e da apólice |
| Empresarial | O que cobre seguro empresarial? | Depende das coberturas contratadas e do risco |
| Saúde | Como escolher plano de saúde? | Comparar produto, rede, carência e regras aplicáveis |
| Residencial | Seguro residencial cobre o quê? | Depende das garantias e limites contratados |
| Vida | Como funciona seguro de vida? | Capital, coberturas, beneficiários e contrato |

## Jornada, cotação e BOFU

Entrada orgânica → artigo/hub/local → pilar → produto → cotação online ou WhatsApp. Rupturas a verificar: artigos sem produto destino, páginas locais sem CTA contextual, hubs sem caminho descendente e páginas BOFU dependentes de WhatsApp genérico.

As três URLs classificadas como COTAÇÃO na Fase 3A devem ser auditadas quanto a produto, origem dos links, formulário, WhatsApp alternativo e confirmação de conversão. Nenhuma integração foi modificada.

## Search Console e backlinks gate

Decisões bloqueadas por Search Console: CONSOLIDAR, REDIRECIONAR ou NOINDEX em Auto local/modelo, Saúde, páginas locais, Agro/Rural/Máquinas, Galpões ou artigos concorrentes. Solicitar cliques, impressões, consultas, CTR, posição, URLs concorrentes, cobertura, canonical escolhida e histórico de 16 meses.

BACKLINKS NÃO VERIFICADOS. Nenhuma URL deve ser removida, redirecionada ou desindexada sem verificar backlinks, histórico SEO e conversões.

## Matriz de implementação futura

| Ação | Grupo | Objetivo | Impacto | Risco | Dependência | Prioridade |
|---|---|---|---|---|---|---|
| DIFERENCIAR | Auto e subclusters | Separar produto, local, modelo e uso | Alto | Médio | GSC | P0 |
| REPOSICIONAR | Agro/Rural/Máquinas | Organizar autoridade agro | Alto | Baixo | Fase 2B.6B + GSC | P0 |
| INVESTIGAR | Empresarial/Soluções Empresariais | Definir pilar B2B | Alto | Alto | GSC/backlinks | P0 |
| INVESTIGAR | Saúde e hubs locais | Definir pilar por intenção | Alto | Alto | GSC | P0 |
| DIFERENCIAR | 203 páginas locais | Separar valor único de template | Alto | Médio | GSC/backlinks | P0 |
| INVESTIGAR | Páginas por modelo | Classificar estratégica/validar/redundante | Médio | Alto | GSC | P1 |
| LINKAR | Artigos → pilares → produtos | Distribuir autoridade e conversão | Alto | Baixo | inventário editorial | P1 |
| FORTALECER | Residencial e Vida | Estruturar pilares | Médio | Baixo | governança regulatória | P1 |
| INVESTIGAR | Artigos sem destino | Identificar lacunas comerciais | Médio | Baixo | revisão manual | P2 |

## Primeira onda futura 3C — máximo de 10 URLs

`/seguro-auto`, `/seguro-agro`, `/seguro-rural`, `/seguro-maquinas-agricolas`, `/seguro-empresarial`, `/seguro-rc-profissional`, `/seguro-saude`, `/seguro-residencial`, `/seguro-vida` e `/cotacao`.

## Quick wins futuros — máximo de 15

Confirmar links artigo → pilar; confirmar CTA por funil; marcar intenção mista; detectar títulos/H1 duplicados; mapear FAQ; registrar entidade; registrar fonte; confirmar autoria/data; separar Rural/Agrícola/PSR; separar casco/RC de máquinas; classificar locais; classificar modelos; confirmar breadcrumbs; identificar artigos órfãos; medir consultas concorrentes no GSC.

## Proteção e validação

Somente este documento deve ser criado nesta fase. Não foram alterados conteúdo público, URLs, canonicals, schemas, sitemap, robots, links, CTAs, banco, infraestrutura ou dependências. `docs/regulatory-evidence.md` e `docs/claims-evidence.md` permanecem inalterados. Fase 3C não iniciada.


## Inventário editorial URL a URL

Os 141 artigos de conteúdo da Fase 3A permanecem como inventário-base. Índices, categorias e autores presentes no sitemap-blog.xml não são artigos e não serão classificados como conteúdo editorial. Antes da Fase 3C, cada artigo deverá receber individualmente cluster, pilar/produto destino, estágio de funil, CTA e função (EDUCAR, COMPARAR, RESOLVER DÚVIDA, APOIAR CONTRATAÇÃO, PÓS-VENDA, AUTORIDADE ou LOCAL), com registro na matriz URL a URL da Fase 3A.

Critério de saída: nenhum artigo poderá ser considerado pronto para linkagem ou reposicionamento sem destino comercial definido ou sem justificativa documentada para permanecer informacional.
