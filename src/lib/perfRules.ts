/**
 * Regras de mitigação para o diagnóstico de performance (reflows / long tasks).
 * Extraído de `src/pages/PerformanceDiagnostico.tsx` para facilitar manutenção e testes.
 */

export interface PerfMeasureLike {
  warning: boolean;
  isReflow: boolean;
  category: string;
}

export interface PerfCheckItem {
  id: string;
  label: string;
  description: string;
  trigger: (results: PerfMeasureLike[]) => boolean;
}

export const PERF_CHECKLIST_ITEMS: PerfCheckItem[] = [
  {
    id: "batch-reads",
    label: "Agrupar leituras geométricas",
    description:
      "Realize todas as leituras (offsetWidth, getBoundingClientRect, getComputedStyle) antes de qualquer escrita no DOM. Evita múltiplos reflows.",
    trigger: (r) => r.some((x) => x.warning && x.category === "Interleaved"),
  },
  {
    id: "batch-writes",
    label: "Agrupar escritas antes das leituras",
    description:
      "Faça todas as mutações de estilo/classes primeiro, depois leia as propriedades geométricas. Isso reduz reflows de N para 1.",
    trigger: (r) => r.some((x) => x.warning && x.category === "Write-Read"),
  },
  {
    id: "raf",
    label: "Usar requestAnimationFrame para mutações",
    description:
      "Agende escritas no DOM dentro de rAF para que ocorram no momento ideal do ciclo de renderização, evitando reflows síncronos.",
    trigger: (r) => r.some((x) => x.warning && x.isReflow),
  },
  {
    id: "debounce-resize",
    label: "Aplicar debounce/throttle em resize e scroll",
    description:
      "Limite a frequência de handlers que leem propriedades geométricas em eventos de alta frequência (resize, scroll, mousemove).",
    trigger: (r) => r.some((x) => x.warning && x.isReflow),
  },
  {
    id: "refs-memo",
    label: "Usar refs e memoização (useRef, useMemo, useCallback)",
    description:
      "Armazene referências a elementos DOM em refs e memoize cálculos derivados para evitar recálculos e leituras desnecessárias a cada render.",
    trigger: (r) =>
      r.some((x) => x.warning && (x.category === "Write-Read" || x.category === "Interleaved")),
  },
  {
    id: "reduce-reads",
    label: "Reduzir leituras geométricas redundantes",
    description:
      "Cache o resultado de offsetWidth/getBoundingClientRect em variáveis locais ao invés de ler múltiplas vezes no mesmo ciclo.",
    trigger: (r) => r.some((x) => x.warning && x.category === "Batch Read"),
  },
  {
    id: "css-transforms",
    label: "Preferir CSS transforms a propriedades de layout",
    description:
      "Use transform: translate() ao invés de top/left/margin para animações. Transforms não disparam reflow, apenas repaint/composite.",
    trigger: (r) => r.some((x) => x.warning && x.isReflow),
  },
  {
    id: "before-after",
    label: "Monitorar razão Before/After de leituras",
    description:
      "Se a razão entre leitura pós-mutação e pré-mutação for alta (>3×), significa que suas mutações estão forçando reflows caros. Revise o padrão write-read.",
    trigger: (r) => r.some((x) => x.warning && x.category === "Before/After"),
  },
  {
    id: "long-tasks",
    label: "Dividir Long Tasks (>50ms)",
    description:
      "Quebre tarefas longas em microtarefas usando setTimeout(fn, 0), scheduler.postTask() ou yield para manter a thread principal responsiva.",
    trigger: (r) => r.some((x) => x.warning && x.category === "Long Task"),
  },
];