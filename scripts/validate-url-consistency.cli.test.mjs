import { afterEach, describe, expect, it } from "vitest";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const script = path.join(path.dirname(fileURLToPath(import.meta.url)), "validate-url-consistency.mjs");
const temporaryRoots = [];
const base = "https://www.patroseguros.com.br";

function html(canonical, ogUrl) {
  return `<link rel="canonical" href="${canonical}"><meta property="og:url" content="${ogUrl}">`;
}

function run(files) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "url-consistency-"));
  temporaryRoots.push(root);
  fs.mkdirSync(path.join(root, "scripts"));
  const isolatedScript = path.join(root, "scripts", "validate-url-consistency.mjs");
  fs.copyFileSync(script, isolatedScript);
  for (const [relative, content] of Object.entries(files)) {
    const file = path.join(root, "dist", relative);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, content);
  }
  return spawnSync(process.execPath, [isolatedScript], {
    encoding: "utf8",
    env: { ...process.env, EXPECTED_HOST: "www.patroseguros.com.br" },
  });
}

afterEach(() => {
  for (const root of temporaryRoots.splice(0)) fs.rmSync(root, { recursive: true, force: true });
});

describe("URL consistency CLI", () => {
  it("ignores both internal template formats while checking public pages", () => {
    const result = run({
      "index.html": html(`${base}/`, `${base}/`),
      "seguro-drone/index.html": html(`${base}/seguro-drone`, `${base}/seguro-drone`),
      ".index.template": html(base, `${base}/`),
      ".index.template.html": html(base, `${base}/`),
    });
    expect(result.status).toBe(0);
    expect(result.stdout).toContain("2 rotas");
  });

  it("still rejects a canonical/og:url mismatch on the public homepage", () => {
    const result = run({ "index.html": html(base, `${base}/`) });
    expect(result.status).toBe(1);
    expect(result.stderr).toContain("/: og:url divergente da canonical");
  });

  it("still checks standalone public HTML pages", () => {
    const result = run({ "seguro-drone.html": html(`${base}/seguro-drone`, base) });
    expect(result.status).toBe(1);
    expect(result.stderr).toContain("/seguro-drone: og:url divergente da canonical");
  });
});