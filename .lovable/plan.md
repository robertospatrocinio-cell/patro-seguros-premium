# Plano de correção técnica/SEO/UX — Patro Seguros

Escopo grande (21 frentes). Vou primeiro **auditar** o estado real do código e do site publicado para não refazer o que já está correto (ex.: muita coisa do briefing já foi feita nas últimas iterações), depois corrigir só o que ainda falha, em 4 ondas. Tudo verificado com Playwright + parse de HTML antes/depois.

## Onda 0 — Auditoria (1 passo, ~3 min)

Rodar varredura única que mede o estado atual em produção (`www.patroseguros.com.br`) e no `dist/`:

- conta de `<h1>` por rota (lista de 18 rotas-chave do briefing)
- presença literal de “Carregando Patro Seguros…”, “Edit with lovable.dev”, “Lovable”
- detecção de bloco SEO “antes do hero” (texto longo dentro do `<body>` antes do `<header>` visível ou de `[data-hero]`)
- valores de `ratingValue`/`reviewCount` em todo HTML + componentes que renderizam estrelas/contagens
- links internos com host malformado (`httpswww`, `hwww`, sem `www`, `http://`)
- títulos/descriptions/canonicals/og por rota (duplicados, “Faq”, “Procurando por…”)
- status HTTP de 30 URLs amostradas (200 vs 301 vs 404)
- presença de schemas obrigatórios por tipo de página
- imagens sem `alt` em rotas-chave

A saída é um relatório `audit-report.md`. Tudo abaixo só toca o que o relatório acusar como falho.

## Onda 1 — Bloqueadores de indexação e confiança (P0)

1. **H1 único** — remover qualquer `<h1>` extra na home e nas rotas que o auditor acusar como duplicado. Manter o H1 visível do hero. Sem h1 oculto / `sr-only` / width:0.
2. **Bloco SEO artificial antes do hero** — remover qualquer componente que injete texto longo fora do fluxo visual; mover apenas o que for genuinamente útil para seções visíveis.
3. **“Carregando Patro Seguros…”** — onde for tela de loading do Suspense em rota indexável, trocar por skeleton sem texto comercial e/ou pré-renderizar o conteúdo principal de forma síncrona. Verificar nas 18 rotas listadas.
4. **Badge Lovable** — remover qualquer marca remanescente (`Edit with lovable.dev`, badge flutuante, link `lovable.dev`). Confirmar `publish_settings--set_badge_visibility` está em `hide_badge: true`.
5. **Avaliações padronizadas** — escolher 1 par único `(ratingValue, reviewCount)`. Vou perguntar ao usuário o número real do Perfil da Empresa do Google (não invento). Até a resposta, **remover `aggregateRating` do JSON-LD** e trocar todas as variações textuais por um placeholder neutro (“Avaliações no Google” sem número). Quando o usuário responder, atualizo numa pequena PR seguinte.

## Onda 2 — Higiene de URL/host/redirects (P0)

6. **Hosts malformados** — varrer `src/`, `public/`, `dist/`, sitemaps, schemas. Qualquer ocorrência de `httpswww`, `hwww`, `http://patroseguros`, `https://patroseguros.com.br` (sem www) vira `https://www.patroseguros.com.br`.
7. **Links internos** — normalizar para paths relativos (`/seguro-auto`) ou absolutos com `https://www.`. Remover trailing-slash inconsistente que gere 301.
8. **404 amigável** — garantir `dist/404.html` com `<meta name="robots" content="noindex,follow">`, title correto, links para Home/Cotação/Contato/principais seguros. Status HTTP 404 já é entregue pela hospedagem; só ajustar conteúdo + meta.
9. **`sitemap.xml` + `robots.txt`** — auditor lista o que está faltando ou sobrando; ajustar `scripts/generate-sitemap*.ts` para entregar só URLs canônicas (https + www, sem preview, sem 404, sem noindex). Robots deve listar o `Sitemap:` correto e não bloquear JS/CSS.

## Onda 3 — Schemas, metadados, FAQ e Consórcio (P1)

10. **Schemas** — manter o que a auditoria anterior já confirmou limpo (1 Organization + 1 InsuranceAgency/LocalBusiness por rota, com `@id` estáveis). Corrigir só desvios encontrados. Remover `aggregateRating` enquanto não houver número validado. Garantir `Service`+`BreadcrumbList`+`FAQPage` (quando FAQ visível) nas páginas de serviço; `BlogPosting` com `author/publisher/datePublished/dateModified/image/mainEntityOfPage` no blog.
11. **Metadados por rota** — para cada rota da lista do briefing, garantir title/description únicos, canonical self-reference, OG e Twitter completos. Substituir o `Faq` / `Procurando por faq?` pelos textos do briefing.
12. **/faq premium** — refazer a página com:
    - H1 “Perguntas frequentes sobre seguros”
    - 8 categorias com as perguntas listadas no briefing (Auto, Empresarial, Saúde, Residencial, Vida, Consórcio, Sinistro, Cotação)
    - Accordion shadcn, busca client-side
    - JSON-LD `FAQPage` espelhando 1:1 só perguntas visíveis
    - Title/description/canonical do briefing
13. **/consorcio premium** — auditar a página atual; completar seções faltantes do briefing (hero, simulador simples, 6 tipos, “o que é”, contemplação, sorteio/lance, taxa adm, vs financiamento, como a Patro ajuda, vantagens, cuidados, atendimento, FAQ de 12 perguntas, aviso de transparência obrigatório). Schemas `Service`+`FAQPage`+`BreadcrumbList`. Title/description/canonical/H1 do briefing.
14. **Imagens sem alt** — adicionar alt descritivo nas imagens importantes apontadas pelo auditor; manter `alt=""` em decorativas.

## Onda 4 — Performance, design, mobile (P2)

15. **Dependência de JS** — confirmar que as 836 rotas pré-renderizadas (já existentes em `dist/`) contêm o conteúdo principal sem JS. Onda 1 já elimina “Carregando…” como conteúdo SSR. Não vou reescrever para SSR completo (fora do escopo razoável); foco é garantir que o snapshot estático tenha hero, H1, copy principal e schemas.
16. **CWV** — manter as otimizações já em vigor (code-split, hidden source maps, OptimizedImage, preload do LCP). Verificar e ajustar apenas regressões introduzidas pelas mudanças desta tarefa.
17. **Design premium** — ajustes pontuais quando uma das ondas acima encostar no layout (faixa CTA, header, FAQ, Consórcio). Sem refatoração geral.
18. **Smoke mobile** — Playwright em viewport 390×844 nas 6 rotas mais críticas (`/`, `/seguro-auto`, `/planos-de-saude`, `/consorcio`, `/faq`, `/contato`): screenshot, contar h1, verificar WhatsApp fixo não cobre CTA, menu abre/fecha, sem erros de console.

## Onda 5 — Validação e relatório

- Rebuild com `ENABLE_BUILD_VALIDATORS=1 npm run build`
- Re-rodar o auditor da Onda 0 e diffar antes/depois
- Inspeção URL no Search Console para `/`, `/seguro-auto`, `/faq`, `/consorcio`
- Entregar `audit-report.md` final com:
  - rotas tocadas + H1 / title / description finais
  - status de `/faq` e `/consorcio`
  - confirmação de remoção de Lovable, “Carregando…”, bloco SEO artificial, hosts malformados
  - sitemap/robots finais
  - schemas por tipo de rota
  - mobile + desktop screenshots
  - lista de itens que dependem só do GSC re-crawlar (não dá pra resolver no código)

## Detalhes técnicos

- **Stack tocado**: `index.html`, `src/pages/*`, `src/components/*` (Header, Footer, Hero, FAQ, Consorcio), `src/components/seo/*`, `scripts/generate-sitemap*.ts`, `public/robots.txt`, `public/404.html`.
- **Não tocar**: `src/integrations/supabase/*`, `supabase/config.toml`, sistema de blog (60+ posts), formulários funcionando, edge functions, paleta/tokens existentes (#003366, #F2994A), Instrument Serif / Work Sans.
- **Pergunta única ao usuário antes de iniciar** (não bloqueia o resto): qual é o número **real** de avaliações no Google Business Profile da Patro hoje (`ratingValue` e `reviewCount`)? Se não for fornecido, removo `aggregateRating` e qualquer número textual de avaliação até receber a fonte oficial.

## O que NÃO está no plano

- Mudar domínio, deletar páginas, remover CTAs de WhatsApp/telefone/cotação.
- Criar reviews/números falsos.
- Migração para SSR/Next (fora de escopo; o site já pré-renderiza 836 rotas).
- Reescrita do blog (apenas confirmar schema `BlogPosting`).
- Tradução, novos idiomas, novos produtos.

Aprovado isso, começo pela Onda 0 (auditoria) e depois sigo onda a onda, mostrando diff por onda.
