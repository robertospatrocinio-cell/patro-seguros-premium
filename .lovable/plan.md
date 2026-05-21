Este plano visa transformar a estrutura atual do sistema para garantir escalabilidade, performance superior e facilidade de manutenção, especialmente considerando o grande volume de páginas de SEO e a complexidade do CRM.

### Etapa 1: Estabilização e Gestão de Dados (TanStack Query)
*   **Problema**: O CRM e diversas páginas utilizam `useEffect` manuais para busca de dados, o que causa estados de "congelamento", falta de cache e dificuldade em lidar com erros de rede.
*   **Solução**: Migrar todas as chamadas ao Supabase para o **TanStack Query (React Query)**.
*   **Detalhes Técnicos**:
    *   Criar hooks customizados em `src/hooks/queries/useLeads.ts`, `useDashboardStats.ts`, etc.
    *   Implementar `staleTime` e `cacheTime` para reduzir chamadas desnecessárias ao banco.
    *   Utilizar os estados nativos `isLoading`, `isError` e `isFetching` para melhorar o feedback visual ao usuário.

### Etapa 2: Unificação Arquitetural (Páginas Programáticas)
*   **Problema**: Existem mais de 100 arquivos de páginas individuais (`Seo...`, `Landing...`), o que torna a manutenção insustentável e aumenta o tamanho do bundle.
*   **Solução**: Implementar **Rotas Dinâmicas** para landing pages de SEO.
*   **Detalhes Técnicos**:
    *   Criar um componente `DynamicInsurancePage.tsx` que recebe o conteúdo via arquivo de configuração (JSON) baseado no slug da URL.
    *   Consolidar dezenas de rotas no `App.tsx` em padrões como `/seguro/:tipo` ou `/guarulhos/:bairro`.
    *   Redução drástica na duplicação de código e facilidade para criar novas páginas em segundos via dados, não via código.

### Etapa 3: Modularização do CRM
*   **Problema**: O arquivo `CRM.tsx` é um componente "gigante" (Fat Component) que contém dashboard, tabelas, filtros e lógica de exportação, dificultando a depuração.
*   **Solução**: Decompor o CRM em componentes especializados e menores.
*   **Detalhes Técnicos**:
    *   Extrair `LeadsTable.tsx`, `DashboardStats.tsx` e `CRMActions.tsx`.
    *   Mover funções utilitárias (como `exportToCSV`) para `src/lib/utils/export.ts`.
    *   Implementar o módulo de Pipeline (Kanban) como um componente lazy-loaded independente.

### Etapa 4: Otimização de Performance e Core Web Vitals
*   **Problema**: Grande volume de assets e componentes UI podem impactar o LCP (Largest Contentful Paint) e o FID (First Input Delay).
*   **Solução**: Otimização agressiva de recursos.
*   **Detalhes Técnicos**:
    *   Implementar `React.lazy` em nível de componente para elementos pesados (gráficos, mapas, modais).
    *   Padronizar o uso do `OptimizedImage` em todo o site com políticas de `priority` para heros e `lazy` para o restante.
    *   Remover dependências redundantes e otimizar o carregamento de fontes.

### Etapa 5: Automação de SEO e Metadados
*   **Problema**: Metadados e Schemas JSON-LD estão espalhados por diversos componentes.
*   **Solução**: Centralizar a gestão de SEO.
*   **Detalhes Técnicos**:
    *   Criar um provedor de contexto ou hook `useSEO` que injeta automaticamente as tags meta e schemas baseados no tipo de página.
    *   Automatizar a geração de Breadcrumbs e FAQ Schemas para todas as páginas de serviço.

---

**Cronograma Recomendado**:
1.  **Semana 1**: Etapa 1 e 3 (Foco total na estabilidade do CRM).
2.  **Semana 2**: Etapa 2 (Limpeza das rotas e consolidação de SEO).
3.  **Semana 3**: Etapa 4 e 5 (Refinamento de performance e visibilidade orgânica).