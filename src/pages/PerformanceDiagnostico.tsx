import { useState, useCallback, useRef, useEffect } from "react";
import PageMeta from "@/components/PageMeta";

type Severity = "ok" | "low" | "medium" | "high" | "critical";

interface MeasureResult {
  id: number;
  label: string;
  duration: number;
  timestamp: string;
  isReflow: boolean;
  warning: boolean;
  severity: Severity;
  category: string;
}

const REFLOW_THRESHOLD_MS = 10;

const REFLOW_PROPERTIES = "offsetWidth, offsetHeight, offsetTop, offsetLeft, clientWidth, clientHeight, scrollWidth, scrollHeight, scrollTop, scrollLeft, getComputedStyle, getBoundingClientRect";

function classifySeverity(duration: number, threshold: number): Severity {
  if (duration <= threshold * 0.5) return "ok";
  if (duration <= threshold) return "low";
  if (duration <= threshold * 3) return "medium";
  if (duration <= threshold * 10) return "high";
  return "critical";
}

const SEVERITY_CONFIG: Record<Severity, { emoji: string; label: string; color: string; bgClass: string }> = {
  ok: { emoji: "✅", label: "OK", color: "text-green-600", bgClass: "even:bg-muted/20" },
  low: { emoji: "💚", label: "Baixo", color: "text-green-500", bgClass: "even:bg-muted/20" },
  medium: { emoji: "⚠️", label: "Médio", color: "text-yellow-600", bgClass: "bg-yellow-50 dark:bg-yellow-950/20" },
  high: { emoji: "🔶", label: "Alto", color: "text-orange-600", bgClass: "bg-orange-50 dark:bg-orange-950/20" },
  critical: { emoji: "🔴", label: "Crítico", color: "text-red-600", bgClass: "bg-red-50 dark:bg-red-950/30" },
};

export default function PerformanceDiagnostico() {
  const [results, setResults] = useState<MeasureResult[]>([]);
  const [threshold, setThreshold] = useState(REFLOW_THRESHOLD_MS);
  const [running, setRunning] = useState(false);
  const probeRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(0);

  const addResult = useCallback((r: Omit<MeasureResult, "id">) => {
    setResults((prev) => [{ ...r, id: ++idRef.current }, ...prev].slice(0, 200));
  }, []);

  const runReflowTest = useCallback(() => {
    const el = probeRef.current;
    if (!el) return;

    setRunning(true);

    // === CATEGORIA 1: Leituras Simples ===
    const t0 = performance.now();
    void el.offsetWidth;
    const readOnly = performance.now() - t0;
    addResult({
      label: "Leitura simples (offsetWidth)",
      duration: readOnly,
      timestamp: new Date().toISOString(),
      isReflow: false,
      warning: readOnly > threshold,
      severity: classifySeverity(readOnly, threshold),
      category: "Leitura",
    });

    // === CATEGORIA 2: Reflow Forçado — Write-Read ===
    // 2a) padding + offsetWidth
    const pad = el.style.padding === "1px" ? "2px" : "1px";
    el.style.padding = pad;
    const t1 = performance.now();
    void el.offsetWidth;
    const forcedReflow = performance.now() - t1;
    addResult({
      label: "Write→Read: padding + offsetWidth",
      duration: forcedReflow,
      timestamp: new Date().toISOString(),
      isReflow: true,
      warning: forcedReflow > threshold,
      severity: classifySeverity(forcedReflow, threshold),
      category: "Write-Read",
    });

    // 2b) margin + getBoundingClientRect
    const mrg = el.style.margin === "1px" ? "2px" : "1px";
    el.style.margin = mrg;
    const t2 = performance.now();
    el.getBoundingClientRect();
    const bcrReflow = performance.now() - t2;
    addResult({
      label: "Write→Read: margin + getBoundingClientRect",
      duration: bcrReflow,
      timestamp: new Date().toISOString(),
      isReflow: true,
      warning: bcrReflow > threshold,
      severity: classifySeverity(bcrReflow, threshold),
      category: "Write-Read",
    });

    // 2c) width + getComputedStyle
    const w = el.style.width === "100px" ? "101px" : "100px";
    el.style.width = w;
    const t3 = performance.now();
    window.getComputedStyle(el).width;
    const gcsReflow = performance.now() - t3;
    addResult({
      label: "Write→Read: width + getComputedStyle",
      duration: gcsReflow,
      timestamp: new Date().toISOString(),
      isReflow: true,
      warning: gcsReflow > threshold,
      severity: classifySeverity(gcsReflow, threshold),
      category: "Write-Read",
    });

    // 2d) className toggle + offsetHeight
    el.classList.toggle("perf-probe-toggle");
    const t3b = performance.now();
    void el.offsetHeight;
    const classReflow = performance.now() - t3b;
    addResult({
      label: "Write→Read: classList.toggle + offsetHeight",
      duration: classReflow,
      timestamp: new Date().toISOString(),
      isReflow: true,
      warning: classReflow > threshold,
      severity: classifySeverity(classReflow, threshold),
      category: "Write-Read",
    });

    // === CATEGORIA 3: Leituras Agrupadas (batch) ===
    const t4 = performance.now();
    void el.offsetHeight;
    void el.clientWidth;
    void el.scrollHeight;
    el.getBoundingClientRect();
    window.getComputedStyle(el).height;
    const batchRead = performance.now() - t4;
    addResult({
      label: "Batch Read: 5 leituras agrupadas sem escrita",
      duration: batchRead,
      timestamp: new Date().toISOString(),
      isReflow: false,
      warning: batchRead > threshold,
      severity: classifySeverity(batchRead, threshold),
      category: "Batch Read",
    });

    // === CATEGORIA 4: Interleaved Write-Read (pior caso) ===
    const t5 = performance.now();
    el.style.padding = "3px";
    void el.offsetWidth;
    el.style.margin = "3px";
    void el.offsetHeight;
    el.style.width = "102px";
    void el.clientWidth;
    const interleavedTotal = performance.now() - t5;
    addResult({
      label: "Interleaved: 3× write→read alternados (pior caso)",
      duration: interleavedTotal,
      timestamp: new Date().toISOString(),
      isReflow: true,
      warning: interleavedTotal > threshold,
      severity: classifySeverity(interleavedTotal, threshold),
      category: "Interleaved",
    });

    // === CATEGORIA 5: Batch Write → Batch Read (melhor prática) ===
    const t6 = performance.now();
    el.style.padding = "4px";
    el.style.margin = "4px";
    el.style.width = "103px";
    // todas as escritas primeiro, depois leituras
    void el.offsetWidth;
    void el.offsetHeight;
    void el.clientWidth;
    const batchWriteRead = performance.now() - t6;
    addResult({
      label: "Best Practice: batch write → batch read (1 reflow)",
      duration: batchWriteRead,
      timestamp: new Date().toISOString(),
      isReflow: true,
      warning: batchWriteRead > threshold,
      severity: classifySeverity(batchWriteRead, threshold),
      category: "Best Practice",
    });

    // === CATEGORIA 6: Comparação Before/After ===
    // Medir custo ANTES da mutação
    const tBefore = performance.now();
    void el.offsetWidth;
    const beforeWrite = performance.now() - tBefore;

    el.style.padding = "5px"; // mutação

    const tAfter = performance.now();
    void el.offsetWidth;
    const afterWrite = performance.now() - tAfter;

    const ratio = afterWrite > 0 && beforeWrite > 0 ? afterWrite / beforeWrite : 0;
    const ratioSeverity: Severity = ratio <= 1.5 ? "ok" : ratio <= 3 ? "low" : ratio <= 10 ? "medium" : ratio <= 50 ? "high" : "critical";

    addResult({
      label: `Before/After: leitura antes=${beforeWrite.toFixed(3)}ms → depois=${afterWrite.toFixed(3)}ms (${ratio.toFixed(1)}×)`,
      duration: afterWrite,
      timestamp: new Date().toISOString(),
      isReflow: true,
      warning: ratio > 3,
      severity: ratioSeverity,
      category: "Before/After",
    });

    setRunning(false);
  }, [threshold, addResult]);

  // Live PerformanceObserver for Long Tasks
  useEffect(() => {
    if (!("PerformanceObserver" in window)) return;
    try {
      const obs = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          addResult({
            label: `Long Task detectada (${entry.name})`,
            duration: entry.duration,
            timestamp: new Date().toISOString(),
            isReflow: false,
            warning: entry.duration > 50,
            severity: classifySeverity(entry.duration, 50),
            category: "Long Task",
          });
        }
      });
      obs.observe({ type: "longtask", buffered: true });
      return () => obs.disconnect();
    } catch {
      // longtask not supported
    }
  }, [addResult]);

  const warningCount = results.filter((r) => r.warning).length;
  const severityCounts = results.reduce((acc, r) => {
    acc[r.severity] = (acc[r.severity] || 0) + 1;
    return acc;
  }, {} as Record<Severity, number>);

  return (
    <>
      <PageMeta
        title="Diagnóstico de Performance | Patro Seguros"
        description="Ferramenta interna de diagnóstico de reflows forçados e performance do DOM."
      />

      <main className="min-h-screen bg-background pt-28 pb-16 px-4">
        <div className="container max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-primary mb-2">
            🔬 Diagnóstico de Performance
          </h1>
          <p className="text-muted-foreground mb-6">
            Mede o tempo de execução de operações geométricas no DOM e detecta
            reflows forçados acima do limite configurado.
          </p>

          {/* Config */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <label className="flex items-center gap-2 text-sm">
              Limite de alerta (ms):
              <input
                type="number"
                min={0}
                step={1}
                value={threshold}
                onChange={(e) => setThreshold(Number(e.target.value))}
                className="w-20 border rounded px-2 py-1 text-sm bg-background"
              />
            </label>
            <button
              onClick={runReflowTest}
              disabled={running}
              className="px-4 py-2 rounded bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 disabled:opacity-50"
            >
              {running ? "Medindo..." : "▶ Executar Testes de Reflow"}
            </button>
            <button
              onClick={() => setResults([])}
              className="px-4 py-2 rounded border text-sm hover:bg-muted"
            >
              Limpar
            </button>
          </div>

          {/* Summary */}
          {results.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
              <StatCard label="Medições" value={results.length} />
              <StatCard
                label="Alertas"
                value={warningCount}
                accent={warningCount > 0}
              />
              <StatCard
                label="Máx (ms)"
                value={Math.max(...results.map((r) => r.duration)).toFixed(2)}
              />
              <StatCard
                label="Média (ms)"
                value={(
                  results.reduce((s, r) => s + r.duration, 0) / results.length
                ).toFixed(2)}
              />
              <StatCard
                label="Críticos"
                value={(severityCounts.critical || 0) + (severityCounts.high || 0)}
                accent={(severityCounts.critical || 0) + (severityCounts.high || 0) > 0}
              />
            </div>
          )}

          {/* Severity legend */}
          {results.length > 0 && (
            <div className="flex flex-wrap gap-3 mb-4 text-xs">
              {(Object.keys(SEVERITY_CONFIG) as Severity[]).map((s) => (
                <span key={s} className={`${SEVERITY_CONFIG[s].color} font-medium`}>
                  {SEVERITY_CONFIG[s].emoji} {SEVERITY_CONFIG[s].label}: {severityCounts[s] || 0}
                </span>
              ))}
            </div>
          )}

          {/* Probe element */}
          <div
            ref={probeRef}
            className="w-24 h-8 bg-muted rounded mb-6 opacity-30"
            aria-hidden="true"
          />

          {/* Results table */}
          {results.length > 0 && (
            <div className="overflow-x-auto rounded-lg border">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left px-3 py-2">#</th>
                    <th className="text-left px-3 py-2">Categoria</th>
                    <th className="text-left px-3 py-2">Operação</th>
                    <th className="text-right px-3 py-2">Tempo (ms)</th>
                    <th className="text-center px-3 py-2">Reflow?</th>
                    <th className="text-center px-3 py-2">Severidade</th>
                    <th className="text-left px-3 py-2">Hora</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((r) => {
                    const sev = SEVERITY_CONFIG[r.severity];
                    return (
                      <tr key={r.id} className={sev.bgClass}>
                        <td className="px-3 py-1.5 text-muted-foreground">{r.id}</td>
                        <td className="px-3 py-1.5 text-xs font-medium text-muted-foreground">{r.category}</td>
                        <td className="px-3 py-1.5 font-medium">{r.label}</td>
                        <td className="px-3 py-1.5 text-right font-mono">{r.duration.toFixed(3)}</td>
                        <td className="px-3 py-1.5 text-center">{r.isReflow ? "⚡" : "—"}</td>
                        <td className="px-3 py-1.5 text-center">
                          <span className={`${sev.color} font-bold`}>{sev.emoji} {sev.label}</span>
                        </td>
                        <td className="px-3 py-1.5 text-muted-foreground text-xs">
                          {r.timestamp.split("T")[1]?.slice(0, 12)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Info */}
          {/* Mitigation Checklist */}
          {results.some((r) => r.warning) && (
            <MitigationChecklist results={results} />
          )}

          {/* Auto Recommendations */}
          {results.some((r) => r.warning) && (
            <AutoRecommendations results={results} threshold={threshold} />
          )}

          {/* Reference */}
          <div className="mt-8 p-4 bg-muted/30 rounded-lg text-sm text-muted-foreground space-y-2">
            <p className="font-semibold text-foreground">
              ℹ️ O que é um Reflow Forçado?
            </p>
            <p>
              Ocorre quando o JavaScript altera o DOM (ex: style.padding) e logo
              em seguida lê uma propriedade geométrica (ex: offsetWidth). Isso
              obriga o navegador a recalcular o layout imediatamente, bloqueando
              a thread principal.
            </p>
            <p>
              <strong>Propriedades que disparam reflow:</strong>{" "}
              {REFLOW_PROPERTIES}
            </p>
            <p>
              <strong>Mitigação:</strong> Agrupar leituras antes de escritas,
              usar requestAnimationFrame, debounce/throttle em handlers de
              resize.
            </p>
            <p>
              <strong>Testes realizados:</strong> Leitura simples, Write→Read
              (padding/margin/width/classList), Batch Read, Interleaved (pior
              caso), Best Practice (batch write → batch read), e comparação
              Before/After com razão de custo.
            </p>
            <p>
              <strong>Severidade:</strong> OK (≤50% do limite), Baixo (≤limite),
              Médio (≤3× limite), Alto (≤10× limite), Crítico (&gt;10× limite).
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

interface Recommendation {
  priority: number;
  severity: Severity;
  title: string;
  problem: string;
  codeBefore: string;
  codeAfter: string;
  explanation: string;
  categories: string[];
}

function generateRecommendations(results: MeasureResult[], threshold: number): Recommendation[] {
  const recs: Recommendation[] = [];
  const warned = results.filter((r) => r.warning);
  if (warned.length === 0) return recs;

  const maxSev = (cats: string[]): Severity => {
    const order: Severity[] = ["critical", "high", "medium", "low", "ok"];
    const matches = warned.filter((r) => cats.includes(r.category));
    for (const s of order) {
      if (matches.some((r) => r.severity === s)) return s;
    }
    return "ok";
  };

  const hasCat = (cat: string) => warned.some((r) => r.category === cat);

  if (hasCat("Interleaved")) {
    const sev = maxSev(["Interleaved"]);
    const worst = warned.filter((r) => r.category === "Interleaved").sort((a, b) => b.duration - a.duration)[0];
    recs.push({
      priority: sev === "critical" ? 1 : sev === "high" ? 2 : 3,
      severity: sev,
      title: "Eliminar padrão Write-Read intercalado",
      problem: `Detectado ${worst.duration.toFixed(2)}ms em operações intercaladas (${worst.severity}). Cada ciclo write→read força um reflow separado, multiplicando o custo.`,
      codeBefore: `// ❌ Intercalado: 3 reflows forçados
el.style.padding = '10px';
const w = el.offsetWidth;   // reflow 1
el.style.margin = '5px';
const h = el.offsetHeight;  // reflow 2
el.style.width = '200px';
const cw = el.clientWidth;  // reflow 3`,
      codeAfter: `// ✅ Agrupado: apenas 1 reflow
// 1) Todas as escritas primeiro
el.style.padding = '10px';
el.style.margin = '5px';
el.style.width = '200px';

// 2) Depois todas as leituras (1 único reflow)
const w = el.offsetWidth;
const h = el.offsetHeight;
const cw = el.clientWidth;`,
      explanation: "Agrupar todas as escritas antes de qualquer leitura reduz N reflows para 1. O navegador só recalcula o layout uma vez.",
      categories: ["Interleaved"],
    });
  }

  if (hasCat("Write-Read")) {
    const sev = maxSev(["Write-Read"]);
    recs.push({
      priority: sev === "critical" ? 1 : sev === "high" ? 2 : 4,
      severity: sev,
      title: "Separar escritas de leituras com requestAnimationFrame",
      problem: `Padrão write→read detectado com severidade ${SEVERITY_CONFIG[sev].label}. A leitura logo após a escrita força o navegador a recalcular o layout sincronamente.`,
      codeBefore: `// ❌ Write→Read direto
element.style.padding = '10px';
const width = element.offsetWidth; // força reflow

// Em React:
useEffect(() => {
  ref.current.style.height = 'auto';
  const h = ref.current.scrollHeight; // reflow!
  ref.current.style.height = h + 'px';
}, [content]);`,
      codeAfter: `// ✅ Usar rAF para separar write/read
element.style.padding = '10px';
requestAnimationFrame(() => {
  const width = element.offsetWidth; // leitura no próximo frame
});

// Em React com useRef + rAF:
useEffect(() => {
  const el = ref.current;
  if (!el) return;
  // Leitura primeiro (antes de qualquer escrita)
  const h = el.scrollHeight;
  // Depois a escrita
  el.style.height = h + 'px';
}, [content]);`,
      explanation: "Inverta a ordem: leia primeiro, depois escreva. Ou use requestAnimationFrame para adiar a leitura para o próximo frame de renderização.",
      categories: ["Write-Read"],
    });
  }

  if (hasCat("Batch Read")) {
    const sev = maxSev(["Batch Read"]);
    recs.push({
      priority: 5,
      severity: sev,
      title: "Cachear leituras geométricas em variáveis locais",
      problem: `Múltiplas leituras geométricas detectadas com severidade ${SEVERITY_CONFIG[sev].label}. Mesmo sem escritas, leituras repetidas têm custo.`,
      codeBefore: `// ❌ Leituras repetidas
function updateLayout(el: HTMLElement) {
  if (el.offsetWidth > 500) { /* ... */ }
  if (el.offsetWidth < 200) { /* ... */ }
  console.log(el.offsetWidth);
}`,
      codeAfter: `// ✅ Cache em variável local
function updateLayout(el: HTMLElement) {
  const w = el.offsetWidth; // leitura única
  if (w > 500) { /* ... */ }
  if (w < 200) { /* ... */ }
  console.log(w);
}

// Em React: memoizar com useRef
const cachedRect = useRef<DOMRect | null>(null);
useEffect(() => {
  cachedRect.current = ref.current?.getBoundingClientRect() ?? null;
}, [deps]); // só relê quando necessário`,
      explanation: "Armazene o resultado da leitura geométrica numa variável local e reutilize. Evita chamadas repetidas ao motor de layout.",
      categories: ["Batch Read"],
    });
  }

  if (hasCat("Before/After")) {
    const sev = maxSev(["Before/After"]);
    const baResults = warned.filter((r) => r.category === "Before/After");
    const ratioMatch = baResults[0]?.label.match(/([\d.]+)×/);
    const ratio = ratioMatch ? ratioMatch[1] : "N";
    recs.push({
      priority: sev === "critical" ? 1 : 4,
      severity: sev,
      title: "Reduzir custo de mutação (razão Before/After alta)",
      problem: `Razão de custo ${ratio}× detectada. A leitura pós-mutação está ${ratio}× mais cara que a pré-mutação, indicando reflow pesado.`,
      codeBefore: `// ❌ Mutação cara seguida de leitura
element.style.padding = '20px'; // invalida layout
const rect = element.getBoundingClientRect(); // reflow caro`,
      codeAfter: `// ✅ Usar classes CSS ao invés de style inline
element.classList.add('expanded');
// A leitura pode esperar o próximo frame:
requestAnimationFrame(() => {
  const rect = element.getBoundingClientRect();
});

// Ou usar CSS containment para limitar o escopo do reflow:
// .component { contain: layout style; }`,
      explanation: "CSS contain limita o escopo do recálculo de layout. Classes CSS são mais eficientes que style inline porque o browser pode otimizar o batch.",
      categories: ["Before/After"],
    });
  }

  if (hasCat("Long Task")) {
    const sev = maxSev(["Long Task"]);
    const worst = warned.filter((r) => r.category === "Long Task").sort((a, b) => b.duration - a.duration)[0];
    recs.push({
      priority: sev === "critical" ? 1 : 3,
      severity: sev,
      title: "Quebrar Long Tasks em microtarefas",
      problem: `Long Task de ${worst.duration.toFixed(0)}ms detectada. Tarefas >50ms bloqueiam a thread principal e prejudicam INP/FID.`,
      codeBefore: `// ❌ Loop pesado na thread principal
items.forEach(item => {
  processItem(item);       // CPU-intensivo
  updateDOM(item);         // escrita no DOM
  const h = el.offsetHeight; // leitura → reflow
});`,
      codeAfter: `// ✅ Quebrar com yield / scheduler
async function processInChunks(items: Item[]) {
  for (let i = 0; i < items.length; i++) {
    processItem(items[i]);
    updateDOM(items[i]);
    // Yield a cada 5 itens para não bloquear
    if (i % 5 === 4) {
      await new Promise(r => setTimeout(r, 0));
    }
  }
}

// Ou usar scheduler.postTask (quando disponível):
// scheduler.postTask(() => processItem(item), { priority: 'background' });`,
      explanation: "Dividir trabalho pesado com setTimeout(0) ou scheduler.postTask permite que o browser processe eventos de input entre as microtarefas.",
      categories: ["Long Task"],
    });
  }

  return recs.sort((a, b) => a.priority - b.priority);
}

function AutoRecommendations({ results, threshold }: { results: MeasureResult[]; threshold: number }) {
  const recs = generateRecommendations(results, threshold);
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  if (recs.length === 0) return null;

  const toggle = (i: number) => setExpanded((p) => ({ ...p, [i]: !p[i] }));

  return (
    <div className="mt-8 rounded-lg border-2 border-blue-300 bg-blue-50/50 p-5">
      <h2 className="text-lg font-bold text-foreground mb-1">
        🤖 Recomendações Automáticas
      </h2>
      <p className="text-sm text-muted-foreground mb-4">
        Geradas com base nas {results.filter((r) => r.warning).length} medições com alerta. Ordenadas por prioridade (severidade mais alta primeiro).
      </p>
      <div className="space-y-3">
        {recs.map((rec, i) => {
          const sev = SEVERITY_CONFIG[rec.severity];
          const open = expanded[i];
          return (
            <div key={i} className="rounded-lg border bg-white overflow-hidden">
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center gap-3 p-4 text-left hover:bg-muted/30 transition-colors"
              >
                <span className="text-lg flex-shrink-0">{sev.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-foreground">{rec.title}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{rec.problem}</div>
                </div>
                <span className={`text-xs font-bold px-2 py-0.5 rounded ${sev.color}`}>
                  {sev.label}
                </span>
                <span className="text-muted-foreground">{open ? "▲" : "▼"}</span>
              </button>
              {open && (
                <div className="px-4 pb-4 space-y-3 border-t pt-3">
                  <div>
                    <div className="text-xs font-bold text-red-600 mb-1">❌ Antes (problema):</div>
                    <pre className="text-xs bg-red-50 border border-red-200 rounded p-3 overflow-x-auto whitespace-pre-wrap font-mono">{rec.codeBefore}</pre>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-green-600 mb-1">✅ Depois (solução):</div>
                    <pre className="text-xs bg-green-50 border border-green-200 rounded p-3 overflow-x-auto whitespace-pre-wrap font-mono">{rec.codeAfter}</pre>
                  </div>
                  <div className="text-sm text-muted-foreground bg-muted/30 rounded p-3">
                    <strong>💡 Por quê:</strong> {rec.explanation}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Categorias afetadas: {rec.categories.join(", ")}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: string | number;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-lg border p-3 text-center ${
        accent ? "border-red-400 bg-red-50 dark:bg-red-950/20" : "bg-card"
      }`}
    >
      <div className="text-xs text-muted-foreground">{label}</div>
      <div
        className={`text-xl font-bold ${
          accent ? "text-red-600" : "text-foreground"
        }`}
      >
        {value}
      </div>
    </div>
  );
}

interface CheckItem {
  id: string;
  label: string;
  description: string;
  trigger: (results: MeasureResult[]) => boolean;
}

const CHECKLIST_ITEMS: CheckItem[] = [
  {
    id: "batch-reads",
    label: "Agrupar leituras geométricas",
    description: "Realize todas as leituras (offsetWidth, getBoundingClientRect, getComputedStyle) antes de qualquer escrita no DOM. Evita múltiplos reflows.",
    trigger: (r) => r.some((x) => x.warning && x.category === "Interleaved"),
  },
  {
    id: "batch-writes",
    label: "Agrupar escritas antes das leituras",
    description: "Faça todas as mutações de estilo/classes primeiro, depois leia as propriedades geométricas. Isso reduz reflows de N para 1.",
    trigger: (r) => r.some((x) => x.warning && x.category === "Write-Read"),
  },
  {
    id: "raf",
    label: "Usar requestAnimationFrame para mutações",
    description: "Agende escritas no DOM dentro de rAF para que ocorram no momento ideal do ciclo de renderização, evitando reflows síncronos.",
    trigger: (r) => r.some((x) => x.warning && x.isReflow),
  },
  {
    id: "debounce-resize",
    label: "Aplicar debounce/throttle em resize e scroll",
    description: "Limite a frequência de handlers que leem propriedades geométricas em eventos de alta frequência (resize, scroll, mousemove).",
    trigger: (r) => r.some((x) => x.warning && x.isReflow),
  },
  {
    id: "refs-memo",
    label: "Usar refs e memoização (useRef, useMemo, useCallback)",
    description: "Armazene referências a elementos DOM em refs e memoize cálculos derivados para evitar recálculos e leituras desnecessárias a cada render.",
    trigger: (r) => r.some((x) => x.warning && (x.category === "Write-Read" || x.category === "Interleaved")),
  },
  {
    id: "reduce-reads",
    label: "Reduzir leituras geométricas redundantes",
    description: "Cache o resultado de offsetWidth/getBoundingClientRect em variáveis locais ao invés de ler múltiplas vezes no mesmo ciclo.",
    trigger: (r) => r.some((x) => x.warning && x.category === "Batch Read"),
  },
  {
    id: "css-transforms",
    label: "Preferir CSS transforms a propriedades de layout",
    description: "Use transform: translate() ao invés de top/left/margin para animações. Transforms não disparam reflow, apenas repaint/composite.",
    trigger: (r) => r.some((x) => x.warning && x.isReflow),
  },
  {
    id: "before-after",
    label: "Monitorar razão Before/After de leituras",
    description: "Se a razão entre leitura pós-mutação e pré-mutação for alta (>3×), significa que suas mutações estão forçando reflows caros. Revise o padrão write-read.",
    trigger: (r) => r.some((x) => x.warning && x.category === "Before/After"),
  },
  {
    id: "long-tasks",
    label: "Dividir Long Tasks (>50ms)",
    description: "Quebre tarefas longas em microtarefas usando setTimeout(fn, 0), scheduler.postTask() ou yield para manter a thread principal responsiva.",
    trigger: (r) => r.some((x) => x.warning && x.category === "Long Task"),
  },
];

function MitigationChecklist({ results }: { results: MeasureResult[] }) {
  const activeItems = CHECKLIST_ITEMS.filter((item) => item.trigger(results));
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  if (activeItems.length === 0) return null;

  const toggle = (id: string) => setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  const doneCount = activeItems.filter((i) => checked[i.id]).length;

  return (
    <div className="mt-8 rounded-lg border-2 border-orange-300 dark:border-orange-700 bg-orange-50/50 dark:bg-orange-950/20 p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-foreground">
          🛠️ Checklist de Mitigação ({doneCount}/{activeItems.length})
        </h2>
        <div className="text-sm text-muted-foreground">
          Baseado nos {results.filter((r) => r.warning).length} alertas detectados
        </div>
      </div>
      <div className="w-full bg-muted rounded-full h-2 mb-4">
        <div
          className="bg-green-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${activeItems.length > 0 ? (doneCount / activeItems.length) * 100 : 0}%` }}
        />
      </div>
      <ul className="space-y-3">
        {activeItems.map((item) => (
          <li
            key={item.id}
            className={`flex gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
              checked[item.id]
                ? "bg-green-50 dark:bg-green-950/20 opacity-70"
                : "bg-white dark:bg-card hover:bg-muted/50"
            }`}
            onClick={() => toggle(item.id)}
          >
            <div className="mt-0.5 text-lg flex-shrink-0">
              {checked[item.id] ? "✅" : "⬜"}
            </div>
            <div>
              <div className={`font-semibold ${checked[item.id] ? "line-through text-muted-foreground" : "text-foreground"}`}>
                {item.label}
              </div>
              <div className="text-sm text-muted-foreground mt-0.5">{item.description}</div>
            </div>
          </li>
        ))}
      </ul>
      </div>
  );
}