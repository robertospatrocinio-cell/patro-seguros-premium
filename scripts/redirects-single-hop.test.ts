import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import {
  EXACT_REDIRECTS,
  GONE_PATTERNS,
  resolveRoute,
  CANONICAL_ORIGIN,
} from "../src/lib/redirects";

const htaccess = fs.readFileSync(path.resolve("public/.htaccess"), "utf-8");

describe("camada central de redirects", () => {
  it("resolve todo redirect exato em um único salto", () => {
    for (const r of EXACT_REDIRECTS) {
      const first = resolveRoute(r.from);
      expect(first.kind, `${r.from} deveria redirecionar`).toBe("redirect");
      // O destino não pode ser, por sua vez, outro redirect (sem chains).
      const second = resolveRoute((first as { to: string }).to);
      expect(second.kind, `${r.from} → ${r.to} cria uma cadeia`).not.toBe("redirect");
    }
  });

  it("nunca redireciona para uma URL com barra final ou host cru", () => {
    for (const r of EXACT_REDIRECTS) {
      expect(r.to.startsWith("/"), `${r.to} deve ser um caminho relativo`).toBe(true);
      expect(r.to.endsWith("/"), `${r.to} não pode ter barra final`).toBe(false);
    }
  });

  it("unifica /artigos/{slug} em /blog/{slug} preservando o slug", () => {
    const r = resolveRoute("/artigos/seguro-empresarial-guarulhos");
    expect(r).toMatchObject({ kind: "redirect", to: "/blog/seguro-empresarial-guarulhos" });
  });

  it("marca estruturas legadas de WordPress como 410", () => {
    for (const p of ["/tag/seguros", "/category/noticias", "/blog/feed", "/wp-content/uploads"]) {
      expect(resolveRoute(p).kind, `${p} deveria ser 410`).toBe("gone");
    }
    expect(GONE_PATTERNS.length).toBeGreaterThan(0);
  });

  it("não trata rotas válidas como redirect ou 410", () => {
    for (const p of ["/", "/blog", "/cotacao", "/seguro-auto", "/plano-de-saude-guarulhos"]) {
      expect(resolveRoute(p).kind, `${p} deveria passar direto`).toBe("none");
    }
  });

  it("usa a origem canônica https + www", () => {
    expect(CANONICAL_ORIGIN).toBe("https://www.patroseguros.com.br");
  });
});

describe(".htaccess gerado", () => {
  it("contém o bloco gerado a partir de src/lib/redirects.ts", () => {
    expect(htaccess).toContain("BEGIN generated-redirects");
    expect(htaccess).toContain("END generated-redirects");
  });

  it("declara cada redirect exato como 301", () => {
    for (const r of EXACT_REDIRECTS) {
      const slug = r.from.replace(/^\//, "");
      expect(htaccess, `faltando regra 301 para ${r.from}`).toContain(`^${slug}/?$ ${r.to} [R=301`);
    }
  });

  it("responde 410 (flag G) para tags, categorias e feeds", () => {
    expect(htaccess).toMatch(/\^tag\(\/\.\*\)\?\$ - \[G/);
    expect(htaccess).toMatch(/\^category\(\/\.\*\)\?\$ - \[G/);
    expect(htaccess).toMatch(/feed\/\?\$ - \[G/);
  });

  it("não mantém redirects legados com barra final (chain de 2 saltos)", () => {
    expect(htaccess).not.toContain("https://www.patroseguros.com.br/parceiros/ [R=301");
    expect(htaccess).not.toContain("https://www.patroseguros.com.br/cotacao/ [R=301");
  });
});
