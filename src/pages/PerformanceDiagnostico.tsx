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