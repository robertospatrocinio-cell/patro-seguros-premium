# Plano: Patro Private — Camada Premium + Auditoria SEO

Escopo grande. Vou executar em **5 fases sequenciais**, validando build/prerender ao fim de cada uma. Sem quebrar URLs, sem alterar metadata existente, sem inventar números.

## Fase A — Auditoria técnica (sem alterações)

Antes de criar qualquer coisa, rodar checagem de regressão no HTML prerenderizado das URLs críticas:

- `/`
- `/seguro-auto-guarulhos`
- `/lp/seguro-auto`
- `/seguro-empresarial-guarulhos`
- `/plano-saude-guarulhos`
- `/blog/quanto-custa-seguro-auto-guarulhos-2026`
- `/politica-privacidade`

Validar em cada `dist/<rota>/index.html`: title único, description única, H1 único, canonical próprio, og:url próprio, conteúdo específico (não conteúdo da home), schema presente.

**Entregável:** relatório curto. Se houver regressão, corrijo antes de prosseguir.

## Fase B — Sistema de design premium (tokens, sem alterar páginas)

Adicionar tokens semânticos para a vertical premium em `src/index.css` (sem mexer nos existentes):

- `--premium-navy` (azul profundo)
- `--premium-champagne` (dourado discreto)
- `--premium-pearl` (cinza neutro claro)
- `--premium-ink` (texto editorial)
- Tipografia: par editorial (display serif + sans neutro) carregado via `<link>` em `index.html` apenas nas rotas premium (ou globalmente leve)
- Espaçamentos `--premium-space-*`
- Sombras sutis `--premium-shadow-soft`

Criar componentes reutilizáveis em `src/components/premium/`:
- `PremiumHero.tsx` — hero editorial limpo, sem cards, com CTA discreto
- `PremiumSection.tsx` — wrapper com tipografia editorial
- `PremiumTrustBlock.tsx` — SUSEP + endereço + parceiros (sem inventar números)
- `PremiumCaseStudy.tsx` — situação/risco/análise/solução (genérico, educativo)
- `PremiumCTA.tsx` — "Solicitar análise personalizada" / "Falar com consultor"

## Fase C — Página `/patro-private` (hub da nova vertical)

Rota: `/patro-private` em `src/App.tsx` + `src/pages/PatroPrivate.tsx`.

Conteúdo conforme briefing (hero, texto institucional, 7 blocos de solução, "como funciona" em 5 passos, bloco de confiança, CTA dual).

SEO:
- Title: "Patro Private | Seguros Premium em Guarulhos"
- Description: conforme briefing (≤160 char)
- H1: "Patro Private: Proteção Patrimonial e Seguros Premium"
- Canonical + og:url próprios
- Schema: `Service` + `BreadcrumbList`
- Entrada em `seoMetadata.ts` + `generate-sitemap.ts`

Formulário dedicado `PatroPrivateForm.tsx`:
- Campos do briefing (nome, WhatsApp, e-mail, cidade, perfil [7 opções], horário, mensagem, LGPD)
- Envia via edge function existente `submit-lead` com `origem: "patro-private"`
- Mensagem de confirmação elegante

## Fase D — 6 páginas premium

Criar em `src/pages/premium/` usando um único `PremiumPageTemplate` parametrizado por dados (evita duplicação):

1. `/seguro-auto-premium-guarulhos`
2. `/seguro-carros-luxo-guarulhos`
3. `/seguro-residencial-alto-padrao-guarulhos`
4. `/seguros-para-empresarios-guarulhos`
5. `/seguro-carro-blindado-guarulhos`
6. `/protecao-patrimonial-familiar-guarulhos`

Para cada uma: registrar rota, adicionar entrada `premiumPages` em `seoMetadata.ts` (com Service + FAQPage schemas), adicionar ao sitemap, criar arquivo de conteúdo `src/data/premiumPagesContent.ts` com seções (para quem é, coberturas, o que comparar, erros comuns, FAQ).

Linguagem conforme briefing: "análise personalizada", "cobertura adequada", "atendimento consultivo" — nunca "barato/menor preço".

## Fase E — Conexões, validação, deploy

- Link discreto no `Header.tsx` e `Footer.tsx` para `/patro-private` (sem reorganizar menu existente)
- Link interno "Esta cobertura também faz parte da **Patro Private** →" nas páginas existentes auto/residencial/empresarial/vida (no fim do conteúdo, sem alterar H1/title/intro)
- Build completo + grep nos HTMLs gerados para confirmar title/H1/canonical únicos em todas as 7 novas rotas
- Validar que `dist/seguro-auto-guarulhos/index.html` e outras existentes continuam idênticas em metadata

## Fora deste plano (acordar depois)

Estes itens do briefing **não** entram nesta entrega — peço para abrir como tarefas separadas após validar a vertical premium:

- **Parte 9 (10 artigos editoriais)** — escrita de conteúdo longo, melhor fazer em lote dedicado
- **Parte 5 (reescrever 10 páginas existentes)** — risco alto de regressão SEO, recomendo página-a-página com aprovação
- **Parte 8 (cases)** — vou deixar a estrutura de componente pronta, mas sem popular casos até você aprovar texto
- **Refoto / fotos reais do escritório** — depende de você enviar assets
- **Consolidação dos 3 botões flutuantes** (Fase 2 do plano anterior) — tarefa visual separada

## Detalhes técnicos

- Stack: rotas em `src/App.tsx`, metadata em `src/lib/seoMetadata.ts` (já tem `premiumPages` record), sitemap em `scripts/generate-sitemap.ts`, prerender em `scripts/prerender.mjs` — todos já preparados pelas fases anteriores
- Lead submission: reusar edge function `submit-lead` adicionando campo `origem`
- Sem novas dependências
- Sem migrations de banco
- Sem alterar `client.ts`, `types.ts`, `.env`, `config.toml`

**Posso começar pela Fase A (auditoria) e te trazer o relatório antes de mexer em qualquer arquivo de página?**
