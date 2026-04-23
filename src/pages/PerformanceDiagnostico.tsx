import { useState, useCallback, useRef, useEffect } from "react";
import PageMeta from "@/components/PageMeta";

interface MeasureResult {
  id: number;
  label: string;
  duration: number;
  timestamp: string;
  isReflow: boolean;
  warning: boolean;
}

const REFLOW_THRESHOLD_MS = 10;

const REFLOW_PROPERTIES = [
  "offsetWidth",
  "offsetHeight",
  "offsetTop",
  "offsetLeft",
  "clientWidth",
  "clientHeight",
  "scrollWidth",
  "scrollHeight",
  "scrollTop",
  "scrollLeft",
  "getComputedStyle",
  "getBoundingClientRect",
] as const;

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

    // 1) Measure read-only (no reflow expected)
    const t0 = performance.now();
    void el.offsetWidth;
    const readOnly = performance.now() - t0;
    addResult({
      label: "Leitura simples (offsetWidth)",
      duration: readOnly,
      timestamp: new Date().toISOString(),
      isReflow: false,
      warning: readOnly > threshold,
    });

    // 2) Invalidate + read → forced reflow
    el.style.padding = el.style.padding === "1px" ? "2px" : "1px";
    const t1 = performance.now();
    void el.offsetWidth; // forced reflow
    const forcedReflow = performance.now() - t1;
    addResult({
      label: "Reflow forçado (style change + offsetWidth)",
      duration: forcedReflow,
      timestamp: new Date().toISOString(),
      isReflow: true,
      warning: forcedReflow > threshold,
    });

    // 3) getBoundingClientRect after mutation
    el.style.margin = el.style.margin === "1px" ? "2px" : "1px";
    const t2 = performance.now();
    el.getBoundingClientRect();
    const bcrReflow = performance.now() - t2;
    addResult({
      label: "Reflow forçado (mutation + getBoundingClientRect)",
      duration: bcrReflow,
      timestamp: new Date().toISOString(),
      isReflow: true,
      warning: bcrReflow > threshold,
    });

    // 4) getComputedStyle after mutation
    el.style.width = el.style.width === "100px" ? "101px" : "100px";
    const t3 = performance.now();
    window.getComputedStyle(el).width;
    const gcsReflow = performance.now() - t3;
    addResult({
      label: "Reflow forçado (mutation + getComputedStyle)",
      duration: gcsReflow,
      timestamp: new Date().toISOString(),
      isReflow: true,
      warning: gcsReflow > threshold,
    });

    // 5) Batch read (no intermediate writes)
    const t4 = performance.now();
    void el.offsetHeight;
    void el.clientWidth;
    void el.scrollHeight;
    const batchRead = performance.now() - t4;
    addResult({
      label: "Leitura em lote (sem mutação entre leituras)",
      duration: batchRead,
      timestamp: new Date().toISOString(),
      isReflow: false,
      warning: batchRead > threshold,
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
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
                    <th className="text-left px-3 py-2">Operação</th>
                    <th className="text-right px-3 py-2">Tempo (ms)</th>
                    <th className="text-center px-3 py-2">Reflow?</th>
                    <th className="text-center px-3 py-2">Status</th>
                    <th className="text-left px-3 py-2">Hora</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((r) => (
                    <tr
                      key={r.id}
                      className={
                        r.warning
                          ? "bg-red-50 dark:bg-red-950/30"
                          : "even:bg-muted/20"
                      }
                    >
                      <td className="px-3 py-1.5 text-muted-foreground">
                        {r.id}
                      </td>
                      <td className="px-3 py-1.5 font-medium">{r.label}</td>
                      <td className="px-3 py-1.5 text-right font-mono">
                        {r.duration.toFixed(3)}
                      </td>
                      <td className="px-3 py-1.5 text-center">
                        {r.isReflow ? "⚡" : "—"}
                      </td>
                      <td className="px-3 py-1.5 text-center">
                        {r.warning ? (
                          <span className="text-red-600 font-bold">⚠️ ALERTA</span>
                        ) : (
                          <span className="text-green-600">✅ OK</span>
                        )}
                      </td>
                      <td className="px-3 py-1.5 text-muted-foreground text-xs">
                        {r.timestamp.split("T")[1]?.slice(0, 12)}
                      </td>
                    </tr>
                  ))}
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
              {REFLOW_PROPERTIES.join(", ")}
            </p>
            <p>
              <strong>Mitigação:</strong> Agrupar leituras antes de escritas,
              usar requestAnimationFrame, debounce/throttle em handlers de
              resize.
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