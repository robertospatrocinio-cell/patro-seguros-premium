import { afterEach, describe, expect, it, vi } from "vitest";
import { prefetchOnIdle, prefetchOnIdleAll, scheduleIdle } from "../prefetch";

function setConnection(effectiveType: string, saveData = false) {
  vi.stubGlobal("navigator", { connection: { effectiveType, saveData } });
  vi.stubGlobal("requestIdleCallback", undefined);
  vi.useFakeTimers();
}

afterEach(() => {
  vi.clearAllTimers();
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("Antecipação de downloads conforme a conexão", () => {
  it.each(["2g", "slow-2g"])("não antecipa downloads em %s", async (connection) => {
    setConnection(connection);
    const loader = vi.fn(() => Promise.resolve());
    prefetchOnIdle(loader);
    await vi.runAllTimersAsync();
    expect(loader).not.toHaveBeenCalled();
  });

  it("respeita economia de dados mesmo em 4g", async () => {
    setConnection("4g", true);
    const loader = vi.fn(() => Promise.resolve());
    prefetchOnIdleAll([loader]);
    await vi.runAllTimersAsync();
    expect(loader).not.toHaveBeenCalled();
  });

  it("deduplica loaders em uma conexão rápida", async () => {
    setConnection("4g");
    const loader = vi.fn(() => Promise.resolve());
    prefetchOnIdleAll([loader, loader]);
    expect(loader).not.toHaveBeenCalled();
    await vi.runAllTimersAsync();
    expect(loader).toHaveBeenCalledOnce();
  });

  it("reavalia a conexão antes de iniciar o download", async () => {
    setConnection("4g");
    const loader = vi.fn(() => Promise.resolve());
    prefetchOnIdle(loader);
    vi.stubGlobal("navigator", { connection: { effectiveType: "4g", saveData: true } });
    await vi.runAllTimersAsync();
    expect(loader).not.toHaveBeenCalled();
  });

  it("permite uma nova tentativa após falha de rede", async () => {
    setConnection("4g");
    const loader = vi.fn().mockRejectedValueOnce(new Error("offline")).mockResolvedValue(undefined);
    prefetchOnIdle(loader);
    await vi.runAllTimersAsync();
    prefetchOnIdle(loader);
    await vi.runAllTimersAsync();
    expect(loader).toHaveBeenCalledTimes(2);
  });

  it("não impede trabalho necessário agendado, como inicialização de sessão", async () => {
    setConnection("2g", true);
    const callback = vi.fn();
    scheduleIdle(callback);
    await vi.runAllTimersAsync();
    expect(callback).toHaveBeenCalledOnce();
  });
});
