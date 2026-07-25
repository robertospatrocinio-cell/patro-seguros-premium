import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createServer, Server } from "node:http";
import { readFileSync, existsSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { AddressInfo } from "node:net";

/**
 * Valida que GET /robots.txt no build final responde 200 + text/plain.
 *
 * Estratégia: sobe um servidor HTTP mínimo que serve o arquivo a partir de
 * `dist/` (build final) ou `public/` (fallback), aplicando o Content-Type
 * declarado em `public/_headers` — espelhando o comportamento do host estático.
 */

const ROOT = resolve(__dirname, "..");
const HEADERS_FILE = resolve(ROOT, "public/_headers");
const DIST_ROBOTS = resolve(ROOT, "dist/robots.txt");
const PUBLIC_ROBOTS = resolve(ROOT, "public/robots.txt");

function parseRobotsContentType(): string | null {
  const raw = readFileSync(HEADERS_FILE, "utf8");
  const lines = raw.split(/\r?\n/);
  let inBlock = false;
  for (const line of lines) {
    if (/^\/\S/.test(line)) {
      inBlock = line.trim() === "/robots.txt";
      continue;
    }
    if (inBlock && /^\s+/.test(line)) {
      const m = line.match(/^\s+Content-Type:\s*(.+?)\s*$/i);
      if (m) return m[1];
    }
  }
  return null;
}

let server: Server;
let baseUrl: string;
let robotsPath: string;

beforeAll(async () => {
  robotsPath = existsSync(DIST_ROBOTS) ? DIST_ROBOTS : PUBLIC_ROBOTS;
  const contentType = parseRobotsContentType() ?? "text/plain; charset=utf-8";

  server = createServer((req, res) => {
    if (req.url === "/robots.txt" && existsSync(robotsPath)) {
      const body = readFileSync(robotsPath);
      res.writeHead(200, {
        "Content-Type": contentType,
        "Content-Length": String(body.length),
      });
      res.end(body);
      return;
    }
    res.writeHead(404);
    res.end();
  });

  await new Promise<void>((r) => server.listen(0, "127.0.0.1", r));
  const { port } = server.address() as AddressInfo;
  baseUrl = `http://127.0.0.1:${port}`;
});

afterAll(async () => {
  await new Promise<void>((r) => server.close(() => r()));
});

describe("GET /robots.txt (build final)", () => {
  it("arquivo robots.txt existe em dist/ ou public/", () => {
    expect(existsSync(robotsPath)).toBe(true);
    expect(statSync(robotsPath).size).toBeGreaterThan(0);
  });

  it("_headers declara Content-Type text/plain para /robots.txt", () => {
    const ct = parseRobotsContentType();
    expect(ct, "bloco /robots.txt em public/_headers deve declarar Content-Type").not.toBeNull();
    expect(ct!.toLowerCase()).toMatch(/^text\/plain\b/);
  });

  it("retorna status 200", async () => {
    const res = await fetch(`${baseUrl}/robots.txt`);
    expect(res.status).toBe(200);
  });

  it("retorna Content-Type text/plain", async () => {
    const res = await fetch(`${baseUrl}/robots.txt`);
    const ct = res.headers.get("content-type") ?? "";
    expect(ct.toLowerCase()).toMatch(/^text\/plain\b/);
    await res.text();
  });

  it("corpo não-vazio contém diretiva User-agent", async () => {
    const res = await fetch(`${baseUrl}/robots.txt`);
    const body = await res.text();
    expect(body.length).toBeGreaterThan(0);
    expect(body).toMatch(/User-agent:/i);
  });
});