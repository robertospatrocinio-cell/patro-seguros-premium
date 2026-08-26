import { describe, it, expect } from "vitest";
import { readdirSync, readFileSync, statSync } from "fs";
import path from "path";

const SRC = path.resolve(__dirname, "..");
const DOMAIN = "app.clubesantuu.com";
const ALLOWED = [
  path.join(SRC, "pages", "SeguroBike.tsx"),
  path.join(SRC, "test", "clubesantuu-link.test.ts"),
];

function walk(dir: string, files: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, files);
    else if (/\.(ts|tsx|js|jsx|html|css)$/.test(entry)) files.push(full);
  }
  return files;
}

describe("Clube Santuu quote link", () => {
  const files = walk(SRC);
  const matches = files.filter((f) => readFileSync(f, "utf8").includes(DOMAIN));

  it("aparece na página /seguro-bike", () => {
    expect(matches).toContain(path.join(SRC, "pages", "SeguroBike.tsx"));
  });

  it("não aparece em nenhuma outra rota/arquivo", () => {
    const unexpected = matches.filter((f) => !ALLOWED.includes(f));
    expect(unexpected.map((f) => path.relative(SRC, f))).toEqual([]);
  });
});
