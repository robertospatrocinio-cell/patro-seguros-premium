## Objetivo

Transformar `/plano-de-saude-guarulhos` no hub canônico da vertical Saúde, resolver canibalização com `/seguro-saude`, `/planos-de-saude` e `/plano-de-saude/`, e cobrir 12 operadoras + 7 intenções por tipo de plano — mantendo header/footer/identidade atuais.

---

## Fase 1 — Arquitetura e canonicalização (sem mudar UI global)

**Hub canônico:** `/plano-de-saude-guarulhos` (novo)

**Redirects 301** (via `src/lib/legacyBairroRedirects.ts` + `.htaccess`):
- `/planos-de-saude` → `/plano-de-saude-guarulhos`
- `/plano-de-saude` e `/plano-de-saude/` → `/plano-de-saude-guarulhos`
- `/seguro-saude`: **mantida** com nova intenção "Seguro Saúde vs Plano de Saúde" (canonical próprio) — evita perder autoridade da URL antiga

**Atualização de links internos:** varrer o projeto (`rg "planos-de-saude|seguro-saude|plano-de-saude"`) e apontar navegação/menus/cards/blog para o hub novo.

---

## Fase 2 — Hub principal (nova página)

`src/pages/PlanoDeSaudeGuarulhos.tsx` usando `InsurancePageTemplate` + composição, com:

- Hero (H1, subtítulo, CTA duplo, WhatsApp rastreável)
- Grid "Qual plano você procura?" → 7 páginas filhas
- Grid "Operadoras parceiras" → 12 páginas de operadora
- Seções: "Como a Patro ajuda", "Rede credenciada em Guarulhos" (linguagem segura), "Tipos de contratação", "O que comparar", FAQ (10 Q&As)
- Schemas: WebPage + InsuranceAgency + Service + FAQPage + BreadcrumbList + 2× ItemList

---

## Fase 3 — Páginas filhas por intenção (7 rotas)

Template compartilhado `src/components/saude/SaudeSubPageTemplate.tsx` para reduzir duplicação:

| Rota | Foco |
|---|---|
| `/plano-de-saude-individual-guarulhos` | PF, autônomo |
| `/plano-de-saude-familiar-guarulhos` | Família, gestante, dependentes |
| `/plano-de-saude-empresarial-guarulhos` | Corporativo, RH |
| `/plano-de-saude-mei-guarulhos` | CNPJ MEI, 2 vidas |
| `/plano-de-saude-pme-guarulhos` | 2-99 vidas |
| `/plano-de-saude-idosos-guarulhos` | Sênior, Prevent/MedSenior |
| `/plano-odontologico-guarulhos` | Odonto PF/empresa |

Cada uma: 700-1000 palavras originais, FAQ 6-8 itens, CTA WhatsApp customizado, breadcrumbs, "Veja também", schemas Service + FAQPage + BreadcrumbList.

---

## Fase 4 — Páginas por operadora (12 rotas)

Template `src/components/saude/OperadoraTemplate.tsx` com dados em `src/data/operadorasSaude.ts`:

Bradesco Saúde, SulAmérica, Amil, Porto Saúde, Hapvida/NotreDame, Prevent Senior, Unimed, MedSenior, Sami, Alice, Omint, Care Plus.

Cada página inclui **bloco de transparência jurídica obrigatório** ("Patro não é canal oficial", marcas dos titulares, disponibilidade sujeita a regras). Sem logos oficiais, sem promessas de preço/aceitação/rede. FAQ + CTA + schemas.

---

## Fase 5 — Blog cluster (12 artigos)

Adicionar em `src/data/blog/` os posts listados apontando para hub + páginas filhas relevantes, com Article + FAQPage schema, autor Sandra Patro, datas publish/update, CTA meio + fim, links para ANS quando falar de regra.

---

## Fase 6 — SEO técnico e infra

- Registrar todas as rotas em `src/App.tsx`, `scripts/generate-sitemap.ts`, `src/lib/seoMetadata.ts` (metadados premium)
- Gerar OG images via `scripts/generate-og-images.mjs` para hub e filhas
- Rodar validadores existentes (`validate-google-rich-results.mjs`, `validate-canonical-strict.mjs`, `validate-word-count.mjs`)
- Confirmar breadcrumbs (`src/lib/breadcrumbCategory.ts` overrides)

---

## Detalhes técnicos

- **Componentes reutilizáveis:** `SaudeSubPageTemplate`, `OperadoraTemplate`, `SaudeHubCards`, `OperadoraGrid` — evita duplicação de markup
- **Dados centrais:** `src/data/planosSaudeSubtipos.ts` (7 subtipos) + `src/data/operadorasSaude.ts` (12 operadoras) — single source of truth para hub, grids e páginas
- **WhatsApp:** usar `buildWhatsAppUrl` de `src/lib/whatsapp.ts` com template por página
- **Legacy redirects:** estender `legacyBairroRedirects.ts` (ou criar `legacySaudeRedirects.ts`) + adicionar regras no `.htaccess` de produção
- **Rich snippets:** aproveitar `PageMeta` que já injeta BreadcrumbList automaticamente; Service/FAQPage/ItemList via componentes existentes
- **Sem alteração** em Header, Footer, Home, tokens de design ou identidade visual

---

## Escopo excluído

- Não migrar template para TanStack/SSR
- Não redesenhar componentes globais
- Não trocar sistema de i18n/roteamento
- Não criar automação de PDF/materiais ricos (fica para outra iteração)

## Confirmação necessária

Após aprovação, implemento em uma leva só (arquitetura + hub + 7 filhas + 12 operadoras + redirects + schemas + registro). Blog cluster (12 artigos) fica como fase 2 opcional, pois cada artigo requer conteúdo original extenso — quer que eu inclua tudo junto ou separo em uma próxima rodada?
