## Contexto

O site da Patro Seguros já tem **204 páginas** e a maioria das URLs prioritárias citadas no briefing **já existe** (algumas como redirect 301):

| URL pedida | Status atual |
|---|---|
| /seguro-auto-guarulhos | ✅ existe (`SeoSeguroAutoGuarulhos`) |
| /seguro-empresarial-guarulhos | ✅ existe |
| /seguro-frota-guarulhos | ✅ existe |
| /seguro-residencial-guarulhos | ✅ existe |
| /seguro-vida-guarulhos | ✅ existe |
| /seguro-condominio-guarulhos | ✅ existe |
| /seguro-moto-guarulhos | ✅ existe |
| /plano-saude-empresarial-guarulhos | 🔁 hoje redireciona p/ `/plano-saude-empresarial` |
| /plano-saude-guarulhos | 🔁 redireciona p/ `/planos-de-saude` |
| /plano-odontologico-guarulhos | 🔁 redireciona p/ `/seguro-odonto` |
| /corretora-seguros-guarulhos | 🔁 redireciona p/ `/sobre-guarulhos` |
| /seguro-transporte-carga-guarulhos | ❌ não existe (há `/seguro-transporte` e redirect `/seguro-transportadora-guarulhos`) |
| /seguro-fianca-guarulhos | ❌ não existe |

Como você pediu para **não inflar o site com páginas de texto raso**, o plano abaixo prioriza ganhos sem inchar a arquitetura.

> Obs.: O arquivo de keywords mencionado no briefing **não foi anexado** nesta conversa. Vou trabalhar com as keywords listadas no texto. Se quiser usar a planilha cheia, me envie que ajusto headings/copy.

## Escopo (tudo "leve", sem redesign)

### 1. Home (`src/pages/Index.tsx`)
- Reforçar o parágrafo de abertura com a linha sugerida ("corretora de seguros em Guarulhos que atende pessoas, famílias e empresas…").
- Adicionar 1 bloco discreto de **atendimento regional** (chips/lista de bairros: Centro, Cumbica, Pimentas, Bonsucesso, Taboão, Vila Galvão, Macedo, Cidade Maia, Gopoúva, Ponte Grande, Vila Augusta, Picanço) com link para a página de cada produto local correspondente — sem listão sem contexto.
- Acrescentar 2-3 FAQs reais ("Vocês atendem em todo Guarulhos e região?", "Posso comparar planos de saúde por bairro?", "Qual a diferença entre corretora local e seguradora direta?") — somam ao FAQSchema já existente.

### 2. Páginas Guarulhos que existem (revisão pontual)
Em cada uma destas: revisar **<title>** (≤60), **meta description** (≤155), **H1 único**, garantir **H2** com variação natural da keyword, e checar CTAs (Cotação / WhatsApp / Comparar):
- `SeoSeguroAutoGuarulhos`
- `SeoSeguroEmpresaGuarulhos` (rota `/seguro-empresarial-guarulhos`)
- `SeoSeguroFrotaGuarulhos`
- `SeoSeguroResidencialGuarulhos`
- `SeoSeguroVidaSaudeGuarulhos` (atende `/seguro-vida-guarulhos`)
- `SeoSeguroCondominioGuarulhos`
- `SeoPlanoSaudeGuarulhos`
- `SeoCorretoraGuarulhos`

Nenhuma reescrita massiva — apenas ajustes de meta/heading/CTA onde estiverem fora do padrão.

### 3. Reativar 3 URLs que hoje só redirecionam
Trocar o `Navigate` por uma página local real (usando `LocalPageTemplate`/`InsurancePageTemplate` existente), com conteúdo curto mas legítimo (sem boilerplate copiado de outra cidade):
- `/plano-saude-guarulhos` → nova `SeoPlanoSaudeGuarulhos` reativa (atualmente o nome existe mas a rota redireciona — vou apontar a rota para o componente)
- `/plano-saude-empresarial-guarulhos` → nova página focada em PME/MEI Guarulhos
- `/plano-odontologico-guarulhos` → nova página odonto Guarulhos

Cada uma com: H1 único, 2 H2, FAQ (FAQPage schema), bloco regional, CTA WhatsApp/Cotação, Schema `InsuranceAgency`/`LocalBusiness` via componentes já existentes.

### 4. Criar 1 página nova (única adição real)
- `/seguro-transporte-carga-guarulhos` — keyword tem demanda real e hoje só há `/seguro-transporte` genérico + redirect de transportadora. Reuso de `InsurancePageTemplate`.

(Não vou criar `/seguro-fianca-guarulhos` agora — sem conteúdo diferenciador suficiente. Pode entrar depois se você priorizar.)

### 5. Linkagem interna
- Adicionar links contextuais cruzados entre as páginas Guarulhos revisadas (auto ↔ frota ↔ transporte; residencial ↔ condomínio; vida ↔ saúde ↔ odonto).
- Garantir que a home e o Header/Footer apontem para as páginas Guarulhos principais (sem mexer no menu principal).

### 6. Não vou mexer
- Layout, cores, tipografia, navegação principal.
- Sitemap automático (regenera no build).
- Páginas de bairro existentes (já validadas por `validate-local-pages`).
- Estrutura do CRM / Edge Functions / formulários.

## Detalhes técnicos

- Reuso de componentes existentes: `PageMeta`, `FAQSchema`, `LocalBusinessSchema`, `InsurancePageTemplate`, `LocalPageTemplate`, `Breadcrumb`.
- Schemas: `InsuranceAgency` + `FAQPage` por página; `LocalBusiness` permanece global.
- Após mudanças: `tsgo --noEmit` para validar tipos. Sem build manual (harness roda).
- Sem alterações em `tailwind.config.ts`, `index.css`, fontes (SF Pro já configurada).

## Entregáveis

1. `src/pages/Index.tsx` — bloco regional + 2-3 FAQs + parágrafo institucional.
2. Revisão de meta/H1/H2 em 8 páginas Guarulhos existentes.
3. 3 páginas locais reativadas (saúde, saúde empresarial, odonto) substituindo redirects.
4. 1 página nova: `/seguro-transporte-carga-guarulhos`.
5. `src/App.tsx` — trocar 3 `Navigate` por componentes reais + 1 rota nova.

## Antes de eu começar

Confirma 2 coisas, por favor:

1. **OK reativar os 3 redirects** (`/plano-saude-guarulhos`, `/plano-saude-empresarial-guarulhos`, `/plano-odontologico-guarulhos`) como páginas próprias? Isso adiciona 3 páginas de verdade ao site.
2. **A planilha de keywords** — você pretende reenviar? Sem ela, vou trabalhar só com as keywords do briefing.