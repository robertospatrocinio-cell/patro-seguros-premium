# Central de Guias Patro Seguros — plano de entrega faseada

O escopo pedido (hub + 12 guias pilares de 2–4k palavras + glossário completo + FAQ hub + 10 checklists + 60+ artigos de blog + schemas + links internos) é grande demais para uma única rodada sem virar conteúdo raso, quebrar performance ou duplicar páginas que já existem (`/seguro-auto`, `/seguro-empresarial-guarulhos`, `/plano-de-saude-guarulhos`, `/consorcio-guarulhos`, `/glossario-seguros`, `/seguro-garantia`, `/seguro-cyber`, `/seguro-transporte-cargas-guarulhos`, `/patro-private`, etc.).

Proponho entregar em 4 fases, começando pela Fase 1 agora (grande, mas coesa) e as próximas mediante aprovação.

## Fase 1 — Hub + esqueleto navegável (esta rodada)

**Novas rotas**
- `/guias-seguros` — hub editorial (H1 "Central de Guias Patro Seguros", 9 blocos temáticos, cards por guia com nível/tempo de leitura/CTA, hero com CTAs primário+WhatsApp, schema `CollectionPage` + `ItemList` + `BreadcrumbList`, link para todos os guias/glossário/FAQ hub/materiais).
- `/perguntas-frequentes-seguros` — hub de FAQ com 12 categorias e um `FAQPage` schema enxuto (top 3–5 perguntas de cada categoria); links profundos para os FAQs já existentes nas páginas comerciais.
- `/materiais-gratuitos-seguros` — hub dos 10 checklists com cards, cada card leva a uma futura página `/materiais/[slug]` (Fase 3).

**Reaproveitamento (canonical apontando pro comercial existente, não duplicar)**
Para os "guias" que já têm página pilar sólida, o hub linka direto para a rota comercial. Não vou criar `/guias/seguro-auto-guarulhos` duplicando `/seguro-auto`; o card do hub aponta pro pilar existente com rótulo "Guia completo".

**Ajustes de suporte**
- Adicionar link "Central de Guias" no menu (Recursos/Aprenda) — 1 entrada, sem redesign.
- Sitemap: incluir as 3 novas rotas.
- Meta/OG/Schema completos via `PageMeta` já existente.
- Copy consultivo com disclaimers "conforme apólice / sujeito à aceitação".

## Fase 2 — Guias pilares faltantes (rodada seguinte)

Criar somente os guias que **não** têm pilar próprio no site hoje, cada um com 2.000–2.500 palavras, H2 em pergunta, resposta rápida, sumário âncora, FAQ, autor/revisor, `Article`+`FAQPage`+`BreadcrumbList`:

1. `/guias/seguro-auto-guarulhos` (guia educacional distinto de `/seguro-auto` comercial)
2. `/guias/seguro-empresarial-guarulhos`
3. `/guias/plano-de-saude-guarulhos`
4. `/guias/consorcio-guarulhos`
5. `/guias/seguro-vida`
6. `/guias/seguro-residencial-guarulhos`
7. `/guias/seguros-para-consultorios`
8. `/guias/seguro-garantia`
9. `/guias/seguro-de-credito`
10. `/guias/seguro-cyber`
11. `/guias/seguro-transporte-cargas`
12. `/guias/patro-private`

Cada guia inclui bloco "Aprenda mais" e CTA para a página comercial correspondente. Canonical do guia = próprio guia; comercial mantém o seu.

## Fase 3 — Materiais + FAQ profundo

- 10 páginas `/materiais/[slug]` com resumo, formulário simples (nome, e-mail, telefone, LGPD), CTA WhatsApp alternativo, entrega do checklist por e-mail via Edge Function existente.
- Expansão de cada categoria do FAQ hub para 10–20 perguntas, servidas em `/perguntas-frequentes-seguros/[categoria]` para evitar `FAQPage` inflado numa página só (performance).

## Fase 4 — Blog cluster (60+ artigos)

Distribuídos em lotes de ~10 artigos por rodada, agrupados por cluster (Auto → Empresarial → Saúde → Consórcio → Consultórios → Especializados → Residencial → Transporte). Cada artigo: 900–1.500 palavras, `BlogPosting`+`FAQPage`, link pra guia pilar + comercial, imagem WebP via `blogImages.ts`. Publicar em lotes para manter qualidade e evitar canibalização.

## O que fica fora explicitamente

- Não redesenhar home, header, rodapé ou identidade.
- Não duplicar páginas comerciais já indexadas (o hub linka nelas).
- Não gerar 60 artigos com IA em série — cada lote passa por revisão editorial.
- Nenhuma promessa de preço/cobertura/aceitação — só linguagem consultiva.
- Não vou criar `og:image` genérico por guia — reuso do OG do site + só gero imagem específica se você pedir.
- Remoção da marca "Edit with lovable.dev" só aparece em preview do Lovable; no domínio publicado ela não vai; se aparecer em algum lugar do HTML público, checo e removo.

## Diretório técnico da Fase 1

```text
src/pages/CentralDeGuias.tsx           # hub /guias-seguros
src/pages/CentralDePerguntas.tsx       # /perguntas-frequentes-seguros
src/pages/CentralDeMateriais.tsx       # /materiais-gratuitos-seguros
src/data/guiasHubData.ts               # blocos, cards, níveis, tempos
src/data/perguntasHubData.ts           # 12 categorias × top-5 perguntas
src/data/materiaisData.ts              # 10 checklists (metadados)
src/App.tsx                            # 3 rotas + lazy
scripts/generate-sitemap.ts            # +3 URLs
src/components/Header (Recursos)       # 1 link "Central de Guias"
```

Confirma seguir com a **Fase 1** agora? Depois disparo Fase 2 sob aprovação.
