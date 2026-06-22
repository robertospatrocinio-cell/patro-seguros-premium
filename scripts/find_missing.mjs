import { articles } from '../src/lib/blogData.ts';
import { blogContentIndex } from '../src/data/blogContentIndex.ts';
const missing = articles.filter(p => !blogContentIndex[p.slug]);
const byCat = {};
for (const p of missing) (byCat[p.category] = byCat[p.category] || []).push(p);
for (const c of Object.keys(byCat).sort()) {
  console.log(`\n=== ${c} (${byCat[c].length}) ===`);
  for (const p of byCat[c]) console.log(`  ${p.slug} :: ${p.title}`);
}
console.log(`\nTOTAL: ${missing.length}`);
