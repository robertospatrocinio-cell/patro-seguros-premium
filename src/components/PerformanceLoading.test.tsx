import { afterEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import OptimizedImage from "./OptimizedImage";
import LazySection from "./LazySection";
import { prefetchOnVisible } from "@/lib/prefetch";

vi.mock("@/lib/prefetch", () => ({ prefetchOnVisible: vi.fn(() => vi.fn()) }));
vi.mock("@/lib/monitoringSession", () => ({ getLazyMarginMultiplier: () => 1 }));

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
  vi.unstubAllGlobals();
});

describe("Carregamento das imagens compartilhadas", () => {
  it("expõe a imagem ao navegador sem depender de IntersectionObserver", () => {
    vi.stubGlobal("IntersectionObserver", undefined);
    render(<OptimizedImage src="/images/hero-home.webp" alt="Seguro" width={1280} height={720} />);
    const image = screen.getByRole("img", { name: "Seguro" });
    expect(image).toHaveAttribute("src", "/images/hero-home.webp");
    expect(image).toHaveAttribute("loading", "lazy");
    expect(image).toHaveAttribute("width", "1280");
    expect(image.parentElement?.style.aspectRatio).toBe("1280/720");
  });

  it("não oculta nem posterga a imagem crítica e preserva os callbacks", () => {
    const onLoad = vi.fn();
    const onError = vi.fn();
    render(<OptimizedImage src="/images/hero-home.webp" alt="Destaque" eager onLoad={onLoad} onError={onError} />);
    const image = screen.getByRole("img", { name: "Destaque" });
    expect(image).toHaveAttribute("loading", "eager");
    expect(image).toHaveAttribute("fetchpriority", "high");
    expect(image).toHaveClass("opacity-100");
    expect(image).not.toHaveClass("transition-opacity");
    fireEvent.load(image);
    fireEvent.error(image);
    expect(onLoad).toHaveBeenCalledOnce();
    expect(onError).toHaveBeenCalledOnce();
  });

  it("respeita loading eager e a prioridade definida pela página", () => {
    render(<OptimizedImage src="/images/logo-full.webp" alt="Logo" loading="eager" fetchPriority="low" />);
    const image = screen.getByRole("img", { name: "Logo" });
    expect(image).toHaveAttribute("loading", "eager");
    expect(image).toHaveAttribute("fetchpriority", "low");
    expect(image).toHaveClass("opacity-100");
  });
});

describe("Seções carregadas por proximidade", () => {
  it("exibe o conteúdo mesmo em navegadores sem IntersectionObserver", () => {
    vi.stubGlobal("IntersectionObserver", undefined);
    render(<LazySection><p>Conteúdo disponível</p></LazySection>);
    expect(screen.getByText("Conteúdo disponível")).toBeInTheDocument();
  });

  it("não executa loaders na montagem e libera o conteúdo quando se aproxima", () => {
    let notify = () => {};
    const disconnect = vi.fn();
    vi.stubGlobal("IntersectionObserver", class {
      constructor(callback: IntersectionObserverCallback) {
        notify = () => callback([{ isIntersecting: true } as IntersectionObserverEntry], this as unknown as IntersectionObserver);
      }
      observe = vi.fn();
      disconnect = disconnect;
    });
    const loader = vi.fn(() => Promise.resolve({}));
    const { unmount } = render(
      <LazySection rootMargin="300px" prefetch={[loader]} placeholderId="cotacao-express">
        <div id="cotacao-express"><p>Seção distante</p></div>
      </LazySection>,
    );
    expect(loader).not.toHaveBeenCalled();
    expect(document.querySelectorAll("#cotacao-express")).toHaveLength(1);
    expect(screen.queryByText("Seção distante")).not.toBeInTheDocument();
    const wrapper = document.getElementById("cotacao-express")!;
    expect(wrapper.style.minHeight).toBe("200px");
    expect(wrapper.style.containIntrinsicSize).toBe("auto 1px auto 200px");
    expect(prefetchOnVisible).toHaveBeenCalledWith(expect.any(HTMLElement), loader, { rootMargin: "600px" });
    act(() => notify());
    expect(screen.getByText("Seção distante")).toBeInTheDocument();
    expect(wrapper.style.minHeight).toBe("");
    expect(wrapper.style.containIntrinsicSize).toBe("auto 1px auto 200px");
    expect(document.querySelectorAll("#cotacao-express")).toHaveLength(1);
    unmount();
    expect(disconnect).toHaveBeenCalled();
    const dispose = vi.mocked(prefetchOnVisible).mock.results[0].value;
    expect(dispose).toHaveBeenCalledOnce();
  });
});
