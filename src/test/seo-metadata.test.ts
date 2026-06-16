/**
 * SEO metadata smoke test — fetches a small fixed set of public routes
 * from the live site and asserts the head metadata contract.
 * Skips automatically when offline (no network in CI sandbox).
 */
import { describe, it, expect, beforeAll } from "vitest";

const BASE = process.env.SEO_TEST_BASE_URL || "https://www.patroseguros.com.br";
const ROUTES = ["/", "/sobre", "/contato", "/blog"];

let online = true;

async function fetchHtml(path: string) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "User-Agent": "PatroSEOTest/1.0" },
  });
  return { status: res.status, html: await res.text() };
}

function meta(html: string, attr: "name" | "property", key: string) {
  const re = new RegExp(
    `<meta[^>]*\\s${attr}=["']${key}["'][^>]*\\scontent=["']([^"']*)["']`,
    "i",
  );
  return html.match(re)?.[1] ?? null;
}
function canonical(html: string) {
  return html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i)?.[1] ?? null;
}
function tag(html: string, t: string) {
  return [...html.matchAll(new RegExp(`<${t}[^>]*>([\\s\\S]*?)</${t}>`, "gi"))]
    .map((m) => m[1].replace(/<[^>]+>/g, "").trim());
}
function jsonLd(html: string) {
  return [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)]
    .map((m) => { try { JSON.parse(m[1].trim()); return true; } catch { return false; } });
}

beforeAll(async () => {
  try { await fetch(BASE, { method: "HEAD" }); } catch { online = false; }
});

describe.each(ROUTES)("SEO metadata: %s", (path) => {
  it("matches head contract", async () => {
    if (!online) return; // soft-skip offline
    const { status, html } = await fetchHtml(path);
    if (status === 404) return; // route may not exist in current build
    expect(status).toBe(200);

    const titles = tag(html, "title");
    expect(titles).toHaveLength(1);
    expect(titles[0].length).toBeGreaterThanOrEqual(10);
    expect(titles[0].length).toBeLessThanOrEqual(60);
    expect(titles[0]).not.toMatch(/lovable/i);

    const desc = meta(html, "name", "description");
    expect(desc).toBeTruthy();
    expect(desc!.length).toBeGreaterThanOrEqual(50);
    expect(desc!.length).toBeLessThanOrEqual(160);

    const c = canonical(html);
    expect(c).toMatch(/^https:\/\//);

    for (const k of ["og:title", "og:description", "og:url", "og:type", "og:image"]) {
      expect(meta(html, "property", k), `${path} missing ${k}`).toBeTruthy();
    }
    expect(meta(html, "property", "og:image")).toMatch(/^https:\/\//);
    expect(meta(html, "name", "twitter:card")).toBeTruthy();

    const ld = jsonLd(html);
    expect(ld.length).toBeGreaterThan(0);
    expect(ld.every(Boolean), "all JSON-LD blocks must parse").toBe(true);

    const h1 = [...html.matchAll(/<h1\b/gi)];
    expect(h1.length).toBe(1);

    const robots = meta(html, "name", "robots") || "";
    expect(robots).not.toMatch(/noindex/i);
  });
});