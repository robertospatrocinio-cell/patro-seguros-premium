# Plano de Refatoração e Otimização em Etapas

Este plano visa transformar a arquitetura atual em um sistema mais escalável, performático e seguro, priorizando a experiência do usuário (UX) e a eficiência do desenvolvimento (DX).

### Etapa 1: Arquitetura de Dados e DX (Curto Prazo)
*   **Centralização de Dados**: Migrar os arrays estáticos massivos de `BlogArticle.tsx` e `seoLocalAutoPages.ts` para arquivos JSON ou módulos de dados puros. Isso reduz o tempo de parse do TypeScript e melhora o HMR.
*   **Abstração de Formulários**: Criar um hook único `useInsuranceForm` para centralizar a lógica de envio, tracking e validação que hoje está duplicada em `QuickQuoteForm`, `InsuranceQuoteForm` e `LeadMagnetSection`.

### Etapa 2: Performance e Web Vitals (Médio Prazo)
*   **Image Pipeline**: Implementar um componente `StandardImage` que use o serviço de Edge Functions para redimensionar imagens on-the-fly, garantindo o menor peso possível para dispositivos móveis.
*   **Component Splitting**: Quebrar o `InsurancePageTemplate` em micro-componentes (Hero, FeatureList, FaqAccordion) carregados via `lazy` quando estiverem abaixo da dobra (fold).
*   **Font Optimization**: Mudar o carregamento de fontes para auto-hospedagem com `font-display: optional` para eliminar o Layout Shift durante o carregamento de fontes.

### Etapa 3: Resiliência e Monitoramento (Longo Prazo)
*   **Global Error Tracking**: Integrar um serviço de log (como Sentry ou similar via Edge Functions) para capturar erros que o `ErrorBoundary` detecta em produção.
*   **Teste de Regressão de SEO**: Expandir os scripts de validação para verificar automaticamente a presença de tags OpenGraph e Twitter Cards em cada nova rota criada.
*   **PWA Advanced**: Configurar o Service Worker para cache agressivo de ativos estáticos e fallback offline para páginas já visitadas.

---

### Detalhes Técnicos para Implementação

````text
Arquitetura Proposta:
src/
  ├── components/      # Componentes UI puros e reutilizáveis
  ├── features/        # Lógica de negócio (ex: lead-capture, blog-engine)
  ├── hooks/           # Reutilização de lógica (useAttribution, useForm)
  ├── data/            # Apenas definições de tipos e dados JSON
  └── lib/             # Infraestrutura (supabase, tracking, utilities)
````

**Impacto Esperado**:
1. Redução de ~30% no tamanho do bundle principal (Main Chunk).
2. Tempo de inicialização do servidor de desenvolvimento (Boot) estável abaixo de 2s.
3. Nota 95+ estável no Lighthouse para Mobile e Desktop.
