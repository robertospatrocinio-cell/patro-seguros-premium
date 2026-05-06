import { describe, it, expect, beforeEach, vi } from "vitest";
import { trackInternalLinkClick, buildInternalLinkSource } from "@/lib/tracking";

type GtagCall = [string, string, Record<string, unknown>];

declare global {
  // eslint-disable-next-line no-var
  var gtag: ((...args: unknown[]) => void) | undefined;
  // eslint-disable-next-line no-var
  var fbq: ((...args: unknown[]) => void) | undefined;
}

describe("trackInternalLinkClick — normalization", () => {
  let gtagSpy: ReturnType<typeof vi.fn>;
  let fbqSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    gtagSpy = vi.fn();
    fbqSpy = vi.fn();
    (window as unknown as { gtag: unknown }).gtag = gtagSpy;
    (window as unknown as { fbq: unknown }).fbq = fbqSpy;
  });

  const lastGtagPayload = (): Record<string, unknown> => {
    const call = gtagSpy.mock.calls.at(-1) as GtagCall | undefined;
    expect(call, "gtag was not called").toBeDefined();
    return call![2];
  };

  const lastFbqPayload = (): Record<string, unknown> => {
    const call = fbqSpy.mock.calls.at(-1) as [string, string, Record<string, unknown>] | undefined;
    expect(call, "fbq was not called").toBeDefined();
    return call![2];
  };

  it("normalizes source to {surface}:{slug} with kebab-case and stripped accents", () => {
    trackInternalLinkClick({
      source: "FAQ-Product:Seguro de Vida Empresarial",
      destination: "/seguros/vida",
      label: "Seguro de Vida",
    });
    expect(lastGtagPayload().source).toBe("faq-product:seguro-de-vida-empresarial");
  });

  it("defaults missing source surface/slug to safe placeholders", () => {
    trackInternalLinkClick({ source: "", destination: "/x", label: "x" });
    expect(lastGtagPayload().source).toBe("unknown:unknown");

    trackInternalLinkClick({ source: "hub", destination: "/x", label: "x" });
    expect(lastGtagPayload().source).toBe("hub:geral");
  });

  it("normalizes placement to kebab-case and falls back to 'veja-tambem'", () => {
    trackInternalLinkClick({
      source: "hub:home",
      destination: "/x",
      label: "x",
      placement: "Smart Text",
    });
    expect(lastGtagPayload().placement).toBe("smart-text");

    trackInternalLinkClick({ source: "hub:home", destination: "/x", label: "x" });
    expect(lastGtagPayload().placement).toBe("veja-tambem");
  });

  it("normalizes destination: lowercase, leading slash, no trailing slash, no query/hash", () => {
    trackInternalLinkClick({
      source: "hub:home",
      destination: "Seguros/Vida/?utm=x#top",
      label: "x",
    });
    expect(lastGtagPayload().destination).toBe("/seguros/vida");
  });

  it("preserves root path and trims label", () => {
    trackInternalLinkClick({
      source: "hub:home",
      destination: "/",
      label: "  Seguro Auto  ",
    });
    const payload = lastGtagPayload();
    expect(payload.destination).toBe("/");
    expect(payload.event_label).toBe("Seguro Auto");
  });

  it("emits the same normalized values to Meta Pixel", () => {
    trackInternalLinkClick({
      source: "FAQ-Global:Saúde",
      destination: "/Planos-De-Saude/",
      label: "Plano de Saúde",
      placement: "Veja Também",
    });
    const fb = lastFbqPayload();
    expect(fb.source).toBe("faq-global:saude");
    expect(fb.placement).toBe("veja-tambem");
    expect(fb.destination).toBe("/planos-de-saude");
    expect(fb.label).toBe("Plano de Saúde");
  });
});

describe("buildInternalLinkSource", () => {
  it("produces canonical surface:slug strings", () => {
    expect(buildInternalLinkSource("faq-product", "Seguro Auto")).toBe("faq-product:seguro-auto");
    expect(buildInternalLinkSource("faq-global", "saúde")).toBe("faq-global:saude");
    expect(buildInternalLinkSource("hub", "")).toBe("hub:geral");
  });
});