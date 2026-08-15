import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { extractBlocks } from "../scripts/lib/jsonld-validator.mjs";
import { CHECKERS, flattenNodes, typeOf } from "../scripts/lib/rich-results-checkers.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");

async function validateStructuredData() {
  if (!fs.existsSync(DIST)) {
    console.log("dist/ folder not found. Please run 'npm run build' first.");
    return;
  }

  function walk(dir, out = []) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) walk(full, out);
      else if (e.isFile() && e.name.endsWith(".html")) out.push(full);
    }
    return out;
  }

  const files = walk(DIST);
  console.log(`🔎 Validating structured data for ${files.length} pages...`);

  let totalErrors = 0;
  let totalWarnings = 0;
  let totalNodes = 0;

  for (const file of files) {
    const html = fs.readFileSync(file, "utf-8");
    const blocks = extractBlocks(html);
    const relativePath = path.relative(DIST, file);

    for (const block of blocks) {
      try {
        const parsed = JSON.parse(block);
        const nodes = flattenNodes(parsed);
        totalNodes += nodes.length;

        for (const node of nodes) {
          const types = typeOf(node);
          const matched = types.find((t) => CHECKERS[t]);

          if (matched) {
            const result = CHECKERS[matched](node);
            if (result.req.length > 0) {
              totalErrors += result.req.length;
              console.error(`❌ [${relativePath}] ${matched} ERROR:`, result.req);
            }
            if (result.rec.length > 0) {
              totalWarnings += result.rec.length;
              console.warn(`⚠️ [${relativePath}] ${matched} WARN:`, result.rec);
            }
          }
        }
      } catch (e) {
        totalErrors++;
        console.error(`❌ [${relativePath}] Invalid JSON-LD block: ${e.message}`);
      }
    }
  }

  console.log("\n--- Validation Summary ---");
  console.log(`Total Nodes Checked: ${totalNodes}`);
  console.log(`Errors (Ineligible for Rich Results): ${totalErrors}`);
  console.log(`Warnings (Recommended Adjustments): ${totalWarnings}`);

  if (totalErrors > 0) {
    process.exit(1);
  }
}

validateStructuredData().catch(err => {
  console.error(err);
  process.exit(1);
});
