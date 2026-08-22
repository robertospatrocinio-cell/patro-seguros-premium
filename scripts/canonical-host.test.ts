import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";

const ROOT = resolve(__dirname, "..");
const APEX_RE = /https:\/\/patroseguros\.com\.br/g;
const EXTS = [".ts", ".tsx", ".html", ".mjs", ".js"];
// fixtures que testam propositalmente o host errado
const ALLOWLIST = [
  "scripts/validate-url-consistency.test.ts",
  "scripts/lib/jsonld-validator.test.mjs",
  "scripts/lib/rich-results-fuzz.test.mjs",
  "scripts/canonical-host.test.ts",
];

function walk(dir: string, acc: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    if (["node_modules", "dist", ".git", "build"].includes(entry)) continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, acc);
    else if (EXTS.some((e) => full.endsWith(e))) acc.push(full);
  }
  return acc;
}

describe("canonicalização de host (apex -> www)", () => {
  it("nenhum arquivo de código usa o host apex sem www", () => {
    const files = [
      ...walk(join(ROOT, "src")),
      ...walk(join(ROOT, "scripts")),
      ...walk(join(ROOT, "supabase")),
      join(ROOT, "index.html"),
    ];
    const offenders = files.filter((f) => {
      const rel = f.replace(`${ROOT}/`, "");
      if (ALLOWLIST.includes(rel)) return false;
      return APEX_RE.test(readFileSync(f, "utf8"));
    });
    expect(offenders.map((f) => f.replace(`${ROOT}/`, ""))).toEqual([]);
  });

  it(".htaccess redireciona 301 para www + https preservando query", () => {
    const htaccess = readFileSync(join(ROOT, "public/.htaccess"), "utf8");
    expect(htaccess).toMatch(/RewriteCond %\{HTTP_HOST\} !\^www\\\.patroseguros\\\.com\\\.br\$/i);
    expect(htaccess).toMatch(/RewriteCond %\{HTTPS\} !=on/);
    expect(htaccess).toMatch(/https:\/\/www\.patroseguros\.com\.br\/\$1 \[R=301,L,QSA,NE\]/);
  });

  it("index.html expõe canonical e og:url self-referentes em www sem barra final", () => {
    const html = readFileSync(join(ROOT, "index.html"), "utf8");
    expect(html).toContain('<link rel="canonical" href="https://www.patroseguros.com.br" />');
    expect(html).toContain('<meta property="og:url" content="https://www.patroseguros.com.br" />');
  });
});
