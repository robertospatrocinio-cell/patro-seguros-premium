import { lazy, Suspense } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, render, screen } from "@testing-library/react";
import LazySection from "./LazySection";

vi.mock("@/lib/monitoringSession", () => ({ getLazyMarginMultiplier: () => 1 }));
vi.mock("@/lib/prefetch", () => ({ prefetchOnVisible: vi.fn(() => vi.fn()) }));

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

function mockVisibility() {
  let notify = () => {};
  const disconnect = vi.fn();
  vi.stubGlobal("IntersectionObserver", class {
    constructor(callback: IntersectionObserverCallback) {
      notify = () => callback(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        this as unknown as IntersectionObserver,
      );
    }
    observe = vi.fn();
    disconnect = disconnect;
  });
  return { approach: () => notify(), disconnect };
}

describe("Formulário de cotação abaixo da primeira tela", () => {
  it("só solicita o módulo do formulário quando a seção se aproxima", async () => {
    const visibility = mockVisibility();
    const loader = vi.fn(async () => ({
      default: () => <form aria-label="Solicitar cotação"><input aria-label="Nome" /></form>,
    }));
    const QuoteForm = lazy(loader);
    const { container } = render(
      <LazySection minHeight="400px" rootMargin="300px">
        <Suspense fallback={<p>Carregando formulário</p>}>
          <QuoteForm />
        </Suspense>
      </LazySection>,
    );

    expect(loader).not.toHaveBeenCalled();
    expect(screen.queryByRole("form")).not.toBeInTheDocument();
    expect((container.firstElementChild as HTMLElement).style.minHeight).toBe("400px");
    await act(async () => visibility.approach());
    expect(await screen.findByRole("form", { name: "Solicitar cotação" })).toBeInTheDocument();
    expect(loader).toHaveBeenCalledOnce();
    expect(visibility.disconnect).toHaveBeenCalled();
  });

  it("desconecta a observação ao sair antes de chegar ao formulário", () => {
    const visibility = mockVisibility();
    const loader = vi.fn(async () => ({ default: () => <form /> }));
    const QuoteForm = lazy(loader);
    const { unmount } = render(
      <LazySection minHeight="400px" rootMargin="300px">
        <Suspense fallback={null}><QuoteForm /></Suspense>
      </LazySection>,
    );
    unmount();
    expect(visibility.disconnect).toHaveBeenCalledOnce();
    expect(loader).not.toHaveBeenCalled();
  });
});
