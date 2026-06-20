
# SSG via Pré-renderização Headless (Opção A)

Antes de instalar e configurar, preciso confirmar 3 pontos com você porque há tradeoffs reais que afetam tempo de build e custo operacional.

## Abordagem técnica

Usar `@prerenderer/rollup-plugin` + `@prerenderer/renderer-puppeteer`. Após `vite build` gerar o bundle SPA normal, o plugin sobe um servidor local, abre um Chromium headless e, para cada rota da lista, navega, espera hidratação e o `PageMeta` rodar, e salva o HTML final em `dist/<rota>/index.html`.

**Vantagens** — zero refatoração de runtime: `App.tsx`, `PageMeta`, `HelmetProvider`, lazy routes, tudo continua igual. Crawlers sem JS passam a ver o HTML completo (título, descrição, OG, JSON-LD, conteúdo principal, breadcrumbs).

**O que muda apenas no build**: `vite.config.ts` ganha o plugin; `package.json` ganha 2 dependências.

## Pontos que preciso decidir com você

### 1. Escopo das rotas pré-renderizadas

São **237 rotas registradas**, mas muitas são variações dinâmicas (10 bairros × 5 produtos, modelos de carro, slugs de blog). Pré-renderizar todas roda ~3 s por rota → **~12 minutos extras por build**.

Recomendo escalonar:

- **Fase 1 (esta etapa)**: pré-renderizar as ~40 rotas de maior valor SEO — `/`, hubs (`/seguro-auto`, `/seguro-agro`, `/seguro-empresarial`, etc.), `/blog`, `/contato`, `/sobre`, `/glossario-seguros`, e as ~10 landings principais. Build ~2 min extras.
- **Fase 2 (depois)**: expandir para os 60+ posts de blog e as 10 páginas de bairro.
- **Fase 3 (opcional)**: todas as 237.

O restante continua funcionando como SPA (fallback do `index.html`).

### 2. Chromium no ambiente de build

O Lovable executa o `vite build` num sandbox onde **não há garantia de Chromium pré-instalado** para o Puppeteer. Tenho duas saídas:

- **A1.** Configurar o plugin para usar o Chromium do Playwright que já existe no sandbox (variável `PLAYWRIGHT_BROWSERS_PATH`). Risco: pode falhar no ambiente de produção do Lovable se ele não expuser essa pasta. Plano B: instalar `puppeteer` (baixa Chromium em postinstall, ~170 MB no `node_modules`).
- **A2.** Usar `@prerenderer/renderer-jsdom` (sem browser real). Mais leve e portável, mas **não executa `useEffect`** do React de forma confiável → o `PageMeta` (que injeta meta tags via `useEffect`) não roda. Resultado: HTML estático teria conteúdo, mas as meta tags por rota não seriam capturadas. Inviabiliza metade do objetivo.

Recomendo **A1 com fallback para puppeteer baixando próprio Chromium** se preciso.

### 3. CTAs com tracking / formulários

Algumas rotas (`/cotacao`, `/formulario-seguro-vida`) têm efeitos que disparam analytics no mount. A pré-renderização vai executá-los uma vez no build (não conta como visita real, mas pode aparecer como ruído no GA4). Vou **excluir essas rotas** da lista pré-renderizada — elas seguem como SPA pura, sem prejuízo SEO (são conversão, não descoberta).

## Implementação concreta (após sua aprovação)

```text
1. bun add -d @prerenderer/rollup-plugin @prerenderer/renderer-puppeteer
2. Criar scripts/prerender-routes.ts
   - Exporta a lista da Fase 1 (curated ~40 rotas)
   - Compartilha helpers com generate-sitemap (DRY)
3. vite.config.ts
   - Importar o plugin
   - Configurar renderer puppeteer com:
     - executablePath via PLAYWRIGHT_BROWSERS_PATH se existir
     - renderAfterTime: 2000 ms (espera PageMeta + Helmet rodarem)
     - postProcess: remover scripts de analytics do HTML estático
       (mantém apenas no SPA hidratado, evita double-tracking)
4. Adicionar fallback: se prerender falhar, build não falha
   (try/catch ao redor + warning no console)
5. Rodar build local de validação
   - Inspecionar dist/seguro-auto/index.html: deve conter <h1>,
     <meta name="description">, og:image, JSON-LD
   - Confirmar que dist/index.html (rota /) também tem
6. Atualizar .lovable/plan.md com status
```

## Riscos e mitigações

| Risco | Mitigação |
|---|---|
| Chromium ausente no sandbox de build do Lovable | Try/catch no plugin: se falhar, build segue como SPA puro (status quo) e loga warning |
| Tempo de build aumenta | Fase 1 limita a ~40 rotas → +2 min |
| `useEffect` do PageMeta não executa a tempo | `renderAfterTime: 2000` + `renderAfterElementExists: 'meta[property="og:title"]'` |
| Conteúdo dinâmico (carrossel, lazy) não aparece | `embla` já renderiza tudo no DOM; lazy imagens são placeholders mas o `<img alt>` existe |
| Analytics dispara no build | `postProcess` remove tags GA4/Meta Pixel do HTML pré-renderizado; SPA hidratado as carrega normalmente |

## O que NÃO vou mudar

- Design, componentes, providers, routing client-side
- Lógica de negócio, edge functions, integrações
- `index.html` template (só o output em `dist/<rota>/index.html` muda)
- Comportamento em runtime do usuário (continua SPA navigation após primeiro paint)

## Confirmar para eu executar

1. **Escopo Fase 1** (~40 rotas curadas) está OK? Ou prefere já fazer todas as 237?
2. **Excluir** `/cotacao`, `/formulario-*`, `/indique-amigo`, `/ebook-consorcio` da pré-renderização (mantém como SPA)?
3. Se Chromium falhar no build do Lovable, **build continua como SPA** (warning) ou **falha duro** para você saber?

---

## Status: ✅ Fase 1 entregue (build validado)

**Build**: `bun run build` em 21s + SSG pass em 70.5s = ~92s total.

**Output validado** (`dist/<rota>/index.html`):
- `/` — 239K, `<title>` correto, 2 H1/H2 no HTML inicial
- `/seguro-auto` — 126K, canonical self-ref, 3 H1/H2, 2 JSON-LD schemas
- `/seguro-agro` — 144K, 3 H1/H2, título único
- `/glossario-seguros` — DefinedTerm renderizado

**Analytics scrub**: 0 ocorrências de `gtag(` ou `fbq(` no HTML estático — recarregam só após hidratação no cliente real.

**Chromium**: encontrado em `/bin/chromium` no sandbox de build do Lovable. Não foi necessário o fallback Playwright.

**Próximas fases (sob demanda)**:
- Fase 2: incluir 60+ posts de blog e 10 páginas de bairro (`/seguros-guarulhos/:bairro`)
- Fase 3: todas as 237 rotas
