
# Otimização SEO Local — Patro Seguros (Guarulhos)

Escopo grande. Para entregar com qualidade e sem quebrar nada, proponho dividir em **5 fases**. Você aprova o plano inteiro e eu executo fase por fase, validando cada uma antes de seguir.

## Fase 1 — Página pilar nova (alta prioridade)

**Criar** `/corretora-de-seguros-em-guarulhos` como página de SEO local principal.

- Novo arquivo `src/pages/CorretoraSegurosGuarulhos.tsx` (~1.500 palavras, conteúdo único, escrito do zero — sem copiar concorrentes).
- Estrutura de headings exatamente como você listou (H1 → H2/H3 de pessoas/empresas/bairros/FAQ/CTA).
- Title, meta description, canonical `https://www.patroseguros.com.br/corretora-de-seguros-em-guarulhos`.
- Schemas em JSON-LD: `InsuranceAgency` + `LocalBusiness` + `Service` + `BreadcrumbList` + `FAQPage` (só FAQs visíveis).
- AggregateRating só se a nota/contagem real do GBP for confirmada (ver Fase 5). Por padrão deixo **sem** rating até você confirmar os números.
- Links internos para `/seguro-auto-guarulhos`, `/seguro-empresarial-guarulhos`, `/plano-saude-guarulhos`, `/seguro-residencial-guarulhos`, `/seguro-vida-guarulhos`, `/consorcio`, `/cotacao`, `/contato`, `/faq`, `/blog`, e para as páginas de bairro existentes.
- CTAs visíveis: cotação, WhatsApp, telefone.
- Registro da rota em `src/App.tsx`.
- Incluir no `scripts/generate-sitemap.ts` / sitemaps relevantes.

## Fase 2 — Home + crawlabilidade

- Adicionar bloco textual visível abaixo do hero (3–4 parágrafos naturais, como você sugeriu), com H2s reais (`Seguros para Você`, `Seguros para Empresas`, `Corretora de Seguros em Guarulhos e Região`, `Por que escolher a Patro Seguros`, `Dúvidas Frequentes`, `Solicite sua Cotação`).
- Garantir que H1, parágrafos, `<a href>`, `<img alt>` estejam no HTML inicial (não só montados via JS pesado). Mover seções críticas para fora de `LazySection` quando estiverem acima da dobra.
- Cinta de links internos com textos âncora descritivos (Seguro Auto em Guarulhos, Seguro Empresarial em Guarulhos, etc.).
- Auditar e corrigir botões/links sem nome acessível na home + Header + Footer (aria-label nos icon-only, texto descritivo em vez de "saiba mais").

## Fase 3 — Cluster local e serviços

- Revisar/normalizar headings das páginas de serviço (`/seguro-auto`, `/seguro-empresarial`, `/planos-de-saude`, `/seguro-residencial`, `/seguro-vida`, `/seguro-frota`, `/seguro-transporte`, `/consorcio`) — trocar H2 do tipo "Sobre o Seguro X | Cotação em 2h | Patro Seguros" por títulos naturais.
- Verificar existência das páginas locais (`/seguro-auto-guarulhos`, `/seguro-empresarial-guarulhos`, `/plano-saude-guarulhos`, `/seguro-residencial-guarulhos`, `/seguro-vida-guarulhos`) e páginas de bairro (`/seguros-guarulhos/<bairro>`). Onde já existem (a maioria já existe via `LocalPageTemplate` / `seoLocalPageSlugs`), só reforço links internos e checo title/meta/H1 únicos. Onde faltar, crio com `LocalPageTemplate`.
- Adicionar BreadcrumbList onde não houver.

## Fase 4 — Performance, A11y, Schema, Sitemap/Robots

- Performance mobile (LCP 5,2s → meta <2,5s): preload do hero LCP, garantir AVIF/WebP via `OptimizedImage`, width/height explícitos, lazy nas demais, `font-display: swap`, revisar carrosséis acima da dobra, dividir bundles pesados.
- A11y: aria-label em todos botões icon-only (WhatsApp flutuante, menu, fechar), texto descritivo em links, contraste, foco visível, labels em formulários, landmark único `<main>`.
- Schema: revisar e consolidar — sem aggregateRating duplicado, URLs sempre `https://www.patroseguros.com.br`, logo oficial, sameAs reais.
- Sitemap + robots: garantir que a nova página entra, remover qualquer URL Lovable, conferir `Sitemap:` no robots, sem bloqueio de JS/CSS.

## Fase 5 — Blog + itens que dependem de você

- Reservar slugs / criar esqueletos dos 10 artigos locais que você listou (ou priorizar 3–4 primeiros se preferir). Conteúdo real precisa ser escrito — confirmo se você quer que eu rascunhe ou só prepare a estrutura.
- **Dependências externas** que eu não consigo executar e vou listar como recomendação no relatório final:
  - Google Business Profile (nota/contagem reais para usarmos no `AggregateRating`).
  - Search Console / Bing Webmaster (envio do sitemap, inspeção de URL).
  - Backlinks locais (parcerias, imprensa Guarulhos, citações NAP).
  - DNS/headers de cache no Hostinger.

## Pontos que preciso confirmar antes de executar

1. **AggregateRating**: posso usar `4,7/5` com X avaliações (que já aparece na `SeoCorretoraGuarulhos.tsx`)? Ou prefere que eu **remova** todos os ratings até você me passar o número real do GBP? Você foi explícito sobre não inventar — quero alinhar antes de mexer.
2. **`/consorcio-guarulhos`**: criar página dedicada nova, ou manter foco local dentro de `/consorcio` (mais simples, menos risco de canibalização)?
3. **Blog (Fase 5)**: rascunho conteúdo dos 10 artigos agora, ou só prep da estrutura (slug, template, schema) e você escreve depois?
4. **Ordem de execução**: começo pela Fase 1 (página pilar — maior impacto SEO) e sigo sequencial, ok?

Assim que você responder esses 4 pontos eu começo pela Fase 1.
